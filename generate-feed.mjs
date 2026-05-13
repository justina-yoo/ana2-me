// Generate feed.xml (RSS 2.0) from Supabase articles
// Run: node generate-feed.mjs

const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';
const SITE = 'https://ana2-me.com';

import { writeFileSync } from 'fs';

function escXml(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function dateToRFC822(dateStr) {
  const d = new Date(dateStr);
  return d.toUTCString();
}

function dateToISO(dateStr) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

async function generate() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/articles?select=id,title,excerpt,tag,date,image_url&order=created_at.desc`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  });
  const articles = await res.json();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ana2me — Insights</title>
    <link>${SITE}</link>
    <description>Deep molecular analysis of skincare, fragrance, and wellness ingredients.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${SITE}/og-default.png</url>
      <title>ana2me</title>
      <link>${SITE}</link>
    </image>`;

  for (const a of articles) {
    const tag = (a.tag?.en || 'insights').toLowerCase().replace(/\s+/g, '-');
    const isoDate = dateToISO(a.date);
    const link = `${SITE}/article/${tag}/${isoDate}/${a.id}`;
    const category = a.tag?.en || '';

    xml += `
    <item>
      <title>${escXml(a.title?.en || '')}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escXml(a.excerpt?.en || '')}</description>
      <pubDate>${dateToRFC822(a.date)}</pubDate>${category ? `
      <category>${escXml(category)}</category>` : ''}${a.image_url ? `
      <enclosure url="${escXml(a.image_url)}" type="image/jpeg" />` : ''}
    </item>`;
  }

  xml += `
  </channel>
</rss>
`;

  writeFileSync('feed.xml', xml);
  console.log(`✓ feed.xml generated with ${articles.length} articles`);
}

generate();
