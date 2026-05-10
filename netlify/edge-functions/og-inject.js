// Edge Function: Inject OG tags for articles and products
const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';
const SITE = 'https://ana2-me.com';

export default async function (request, context) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Match article URLs
  const articleMatch = path.match(/^\/article\/[^/]+\/[^/]+\/([^/]+)\/?$/);
  // Match product URLs
  const productMatch = path.match(/^\/products\/([^/]+)\/?$/);

  if (!articleMatch && !productMatch) {
    return context.next();
  }

  let title, description, image, pageUrl;

  try {
    if (articleMatch) {
      const articleId = articleMatch[1];
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/articles?id=eq.${articleId}&select=id,title,excerpt,tag,date,image_url`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      );
      const data = await res.json();
      if (!data || !data[0]) return context.next();
      const a = data[0];
      title = a.title.en + ' | ana2me';
      description = a.excerpt.en;
      image = (a.image_url || '').replace('w=800', 'w=1200');
      pageUrl = `${SITE}${path}`;
    } else {
      const productId = productMatch[1];
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/products?id=eq.${productId}&select=id,name,brand,summary,image_url`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      );
      const data = await res.json();
      if (!data || !data[0]) return context.next();
      const p = data[0];
      title = p.brand + ' ' + p.name + ' | ana2me';
      description = p.summary.tagline;
      image = p.image_url || '';
      pageUrl = `${SITE}/products/${p.id}`;
    }
  } catch (e) {
    return context.next();
  }

  const response = await context.next();
  const html = await response.text();

  let newHtml = html
    .replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*"/, `$1${escAttr(description)}"`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*"/, `$1${pageUrl}"`)
    .replace(/(<meta\s+property="og:type"\s+content=")[^"]*"/, `$1${articleMatch ? 'article' : 'product'}"`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*"/, `$1${escAttr(title)}"`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*"/, `$1${escAttr(description)}"`)
    .replace(/(<meta\s+property="og:url"\s+content=")[^"]*"/, `$1${pageUrl}"`)
    .replace(/(<meta\s+property="og:image"\s+content=")[^"]*"/, `$1${escAttr(image)}"`)
    .replace(/(<meta\s+property="og:image:alt"\s+content=")[^"]*"/, `$1${escAttr(title)}"`)
    .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*"/, `$1${escAttr(title)}"`)
    .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*"/, `$1${escAttr(description)}"`)
    .replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*"/, `$1${escAttr(image)}"`)
    .replace(/(<meta\s+name="twitter:image:alt"\s+content=")[^"]*"/, `$1${escAttr(title)}"`);

  return new Response(newHtml, { headers: response.headers });
}

function escHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escAttr(s) { return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

export const config = {
  path: ["/article/*", "/products/*"],
};
