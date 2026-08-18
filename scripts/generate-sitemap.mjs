// Generate sitemap.xml from Supabase articles
// Run: node generate-sitemap.mjs

const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';
const SITE = 'https://ana2-me.com';

import { writeFileSync } from 'fs';

function dateToISO(dateStr) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

async function generate() {
  const [articlesRes, productsRes, ingredientsRes] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/articles?select=id,date,tag&order=created_at.desc`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    }),
    fetch(`${SUPABASE_URL}/rest/v1/products?select=id,brand,name,updated_at&order=updated_at.desc`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    }),
    fetch(`${SUPABASE_URL}/rest/v1/products_ingredients?is_hero=eq.true&select=ingredient_id`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    })
  ]);
  const articles = await articlesRes.json();
  const products = await productsRes.json();
  const heroIngredientRows = await ingredientsRes.json();
  const heroIngredientIds = [...new Set((heroIngredientRows || []).map(r => r.ingredient_id))].sort();

  const today = new Date().toISOString().slice(0, 10);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- Home / Insights -->
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE}/insights</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Static pages -->
  <url>
    <loc>${SITE}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE}/products</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE}/privacy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${SITE}/terms</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>

  <!-- Articles -->`;

  for (const a of articles) {
    const tag = a.tag.en.toLowerCase().replace(/\s+/g, '-');
    const isoDate = dateToISO(a.date);
    const enLoc = `${SITE}/article/${tag}/${isoDate}/${a.id}`;
    const koLoc = `${SITE}/ko/article/${tag}/${isoDate}/${a.id}`;
    xml += `
  <url>
    <loc>${enLoc}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="ko" href="${koLoc}"/>
  </url>
  <url>
    <loc>${koLoc}</loc>
    <lastmod>${isoDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enLoc}"/>
    <xhtml:link rel="alternate" hreflang="ko" href="${koLoc}"/>
  </url>`;
  }



  // Products
  const skincareProducts = products.filter(p => (p.category || 'skincare') === 'skincare');
  xml += `

  <!-- Products -->`;
  for (const p of skincareProducts) {
    const slug = (p.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/-+$/, '');
    const lastmod = p.updated_at ? p.updated_at.slice(0, 10) : today;
    xml += `
  <url>
    <loc>${SITE}/products/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }

  // Brands
  const brands = [...new Set(skincareProducts.map(p => p.brand))].sort();
  xml += `

  <!-- Brands -->
  <url>
    <loc>${SITE}/brands</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  for (const brand of brands) {
    const slug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    xml += `
  <url>
    <loc>${SITE}/brands/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }

  // Ingredients (those that are hero in at least one product)
  if (heroIngredientIds.length > 0) {
    xml += `

  <!-- Ingredients -->`;
    for (const ingId of heroIngredientIds) {
      xml += `
  <url>
    <loc>${SITE}/ingredients/${ingId}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }
  }

  xml += `
</urlset>
`;

  writeFileSync('sitemap.xml', xml);
  console.log(`✓ sitemap.xml generated with ${articles.length} articles + ${skincareProducts.length} products + ${brands.length} brands + ${heroIngredientIds.length} ingredients + 6 static pages`);
}

generate();
