// Post article threads to X (Twitter)
// Usage: node post-to-x.mjs <article-id>
// Or: node post-to-x.mjs --latest (posts the most recent article)

import crypto from 'crypto';

const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';

const X_CONSUMER_KEY = 'lXVSCuZpPy1lJ7dhcVsAN1jbV';
const X_CONSUMER_SECRET = 'CZaQpMxYRwHVqk66S8dedrLBCEttMTGBLJTfxGFdJelgpFzku9';
const X_ACCESS_TOKEN = '2053359653770387456-WfkU8aBGfO8LJ96HFJIpUQRx1ec1tQ';
const X_ACCESS_TOKEN_SECRET = '9L4odAQ8j7RgPcy6S08KnE8eWqk7BnAFn78VHoRPntF6C';

// OAuth 1.0a signature
function oauthSign(method, url, params) {
  const sigBase = Object.keys(params).sort().map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join('&');
  const baseString = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(sigBase)}`;
  const sigKey = `${encodeURIComponent(X_CONSUMER_SECRET)}&${encodeURIComponent(X_ACCESS_TOKEN_SECRET)}`;
  return crypto.createHmac('sha1', sigKey).update(baseString).digest('base64');
}

async function postTweet(text, replyToId = null) {
  const url = 'https://api.twitter.com/2/tweets';
  const oauthParams = {
    oauth_consumer_key: X_CONSUMER_KEY,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: X_ACCESS_TOKEN,
    oauth_version: '1.0',
  };

  const signature = oauthSign('POST', url, oauthParams);
  oauthParams.oauth_signature = signature;

  const authHeader = 'OAuth ' + Object.keys(oauthParams).sort().map(k => `${encodeURIComponent(k)}="${encodeURIComponent(oauthParams[k])}"`).join(', ');

  const body = { text };
  if (replyToId) body.reply = { in_reply_to_tweet_id: replyToId };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': authHeader, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error('Tweet failed:', JSON.stringify(data));
    return null;
  }
  return data.data.id;
}

function dateToISO(dateStr) {
  const d = new Date(dateStr);
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

function buildArticleUrl(article) {
  const tag = article.tag.en.toLowerCase().replace(/\s+/g, '-');
  const iso = dateToISO(article.date);
  return `https://ana2-me.com/article/${tag}/${iso}/${article.id}`;
}

function generateThread(article) {
  const url = buildArticleUrl(article);
  const title = article.title.en;
  const excerpt = article.excerpt.en;
  const tldr = article.body_blocks?.find(b => b.type === 'tldr');
  const tldrText = tldr?.text?.en || '';

  // Build 3-4 tweet thread
  const tweets = [];

  // Tweet 1: Hook — bold claim or question from the title
  tweets.push(title);

  // Tweet 2: Key insight from TL;DR
  if (tldrText) {
    tweets.push(tldrText);
  }

  // Tweet 3: Excerpt (the "why it matters")
  const excerptShort = excerpt.length > 250 ? excerpt.slice(0, 247) + '...' : excerpt;
  tweets.push(excerptShort);

  // Tweet 4: Link
  tweets.push(`Full deep-dive 👇\n${url}`);

  return tweets;
}

async function main() {
  const arg = process.argv[2] || '--latest';

  // Fetch article
  let query = 'order=created_at.desc&limit=1';
  if (arg !== '--latest') query = `id=eq.${arg}`;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/articles?${query}&select=id,title,excerpt,tag,date,body_blocks`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  const articles = await res.json();
  if (!articles.length) { console.error('Article not found'); process.exit(1); }

  const article = articles[0];
  console.log(`Posting thread for: ${article.title.en}`);

  const tweets = generateThread(article);
  let lastId = null;

  for (let i = 0; i < tweets.length; i++) {
    console.log(`  Tweet ${i + 1}/${tweets.length}: ${tweets[i].slice(0, 50)}...`);
    lastId = await postTweet(tweets[i], lastId);
    if (!lastId) { console.error('Thread broken at tweet ' + (i + 1)); break; }
    // Small delay between tweets
    if (i < tweets.length - 1) await new Promise(r => setTimeout(r, 1000));
  }

  if (lastId) console.log(`✓ Thread posted successfully`);
}

main();
