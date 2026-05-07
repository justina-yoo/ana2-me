// Edge Function: Inject article-specific OG tags for social media crawlers
// This replaces the Prerender extension — much lighter, nearly zero usage

const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';
const SITE = 'https://ana2-me.com';

export default async function (request, context) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Only intercept article URLs
  const articleMatch = path.match(/^\/article\/[^/]+\/[^/]+\/([^/]+)\/?$/);
  if (!articleMatch) {
    return context.next();
  }

  const articleId = articleMatch[1];

  // Fetch article metadata from Supabase
  let article;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/articles?id=eq.${articleId}&select=id,title,excerpt,tag,date,image_url,category,keywords`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    const data = await res.json();
    if (!data || !data[0]) return context.next();
    article = data[0];
  } catch (e) {
    return context.next();
  }

  // Get the original HTML response
  const response = await context.next();
  const html = await response.text();

  // Build article metadata
  const title = article.title.en + ' | ana2me';
  const description = article.excerpt.en;
  const image = (article.image_url || '').replace('w=800', 'w=1200');
  const tag = article.tag.en.toLowerCase().replace(/\s+/g, '-');
  const d = new Date(article.date);
  const isoDate = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const articleUrl = `${SITE}/article/${tag}/${isoDate}/${article.id}`;

  // Replace OG tags in the HTML
  let newHtml = html
    .replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*"/, `$1${escAttr(description)}"`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*"/, `$1${articleUrl}"`)
    .replace(/(<meta\s+property="og:type"\s+content=")[^"]*"/, `$1article"`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*"/, `$1${escAttr(article.title.en)}"`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*"/, `$1${escAttr(description)}"`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*"/, `$1${articleUrl}"`)
    .replace(/(<meta\s+property="og:image"\s+content=")[^"]*"/, `$1${escAttr(image)}"`)
    .replace(/(<meta\s+property="og:image:alt"\s+content=")[^"]*"/, `$1${escAttr(article.title.en)}"`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*"/, `$1${escAttr(article.title.en)}"`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*"/, `$1${escAttr(description)}"`)
    .replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*"/, `$1${escAttr(image)}"`)
    .replace(/(<meta\s+name="twitter:image:alt"\s+content=")[^"]*"/, `$1${escAttr(article.title.en)}"`);

  return new Response(newHtml, {
    headers: response.headers,
  });
}

function escHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escAttr(s) { return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

export const config = {
  path: "/article/*",
};
