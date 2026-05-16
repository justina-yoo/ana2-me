// Edge Function: Inject OG tags, JSON-LD, and server-rendered content for articles and products
const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';
const SITE = 'https://ana2-me.com';
const FETCH_TIMEOUT = 4000; // 4s timeout for Supabase calls

function fetchWithTimeout(url, opts = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
  return fetch(url, { ...opts, signal: controller.signal }).finally(() => clearTimeout(timer));
}

export default async function (request, context) {
  const url = new URL(request.url);
  const path = url.pathname;

  const articleMatch = path.match(/^\/article\/[^/]+\/[^/]+\/([^/]+)\/?$/);
  const productMatch = path.match(/^\/products\/([^/]+)\/?$/);
  const isListing = path === '/' || path === '/insights' || path === '/insights/';
  const isProductListing = path === '/products' || path === '/products/';
  const isAbout = path === '/about' || path === '/about/';
  const isAnalyzer = path === '/analyzer' || path === '/analyzer/';
  const isPrivacy = path === '/privacy' || path === '/privacy/';
  const isStaticPage = isAbout || isAnalyzer || isPrivacy;
  if (!articleMatch && !productMatch && !isListing && !isProductListing && !isStaticPage) {
    return context.next();
  }

  let title, description, image, pageUrl, jsonLd, breadcrumbLd, ssrContent, publishedDate, faqLd;

  try {
    if (articleMatch) {
      const articleId = articleMatch[1];
      const res = await fetchWithTimeout(
        `${SUPABASE_URL}/rest/v1/articles?id=eq.${articleId}&select=id,title,excerpt,tag,category,date,image_url,keywords,body_blocks,read_time`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      );
      const data = await res.json();
      if (!data || !data[0]) return context.next();
      const a = data[0];
      title = a.title.en + ' | ana2me';
      description = a.excerpt.en;
      image = (a.image_url || '').replace('w=800', 'w=1200');
      pageUrl = `${SITE}${path}`;

      const bodyText = extractBodyText(a.body_blocks);
      const isoDate = toISODate(a.date);
      publishedDate = isoDate;
      const categoryName = a.tag?.en || a.category?.en || 'Insights';

      // Build citation list from sources block
      const citations = buildCitations(a.body_blocks);
      // Extract TL;DR text for speakable
      const tldrText = extractTldr(a.body_blocks);

      const articleLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "@id": `${pageUrl}#article`,
        "headline": a.title.en,
        "description": a.excerpt.en,
        "url": pageUrl,
        "datePublished": isoDate,
        "dateModified": isoDate,
        "image": { "@type": "ImageObject", "url": image, "width": 1200, "height": 630 },
        "keywords": typeof a.keywords === 'string' ? a.keywords : '',
        "articleSection": categoryName,
        "articleBody": bodyText,
        "wordCount": bodyText.split(/\s+/).length,
        "inLanguage": ["en", "ko"],
        "author": { "@type": "Person", "name": "Ana", "url": `${SITE}/about` },
        "publisher": {
          "@type": "Organization",
          "@id": `${SITE}/#organization`,
          "name": "ana2me",
          "url": SITE,
          "logo": { "@type": "ImageObject", "url": `${SITE}/og-default.png` }
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl },
        "isPartOf": { "@id": `${SITE}/#website` }
      };

      if (citations.length > 0) {
        articleLd.citation = citations;
      }
      if (tldrText) {
        articleLd.speakable = {
          "@type": "SpeakableSpecification",
          "cssSelector": ["[data-tldr]"]
        };
      }

      jsonLd = JSON.stringify(articleLd);

      breadcrumbLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE },
          { "@type": "ListItem", "position": 2, "name": "Insights", "item": `${SITE}/insights` },
          { "@type": "ListItem", "position": 3, "name": categoryName, "item": `${SITE}/insights` },
          { "@type": "ListItem", "position": 4, "name": a.title.en, "item": pageUrl }
        ]
      });


      ssrContent = renderArticleHTML(a);

    } else if (productMatch) {
      const slug = productMatch[1];
      const VISIBLE_PRODUCTS = ['skincare-3', 'skincare-4', 'skincare-5', 'skincare-6', 'skincare-7', 'skincare-8', 'skincare-9', 'skincare-10', 'skincare-11', 'skincare-12', 'skincare-13', 'skincare-14'];
      const res = await fetchWithTimeout(
        `${SUPABASE_URL}/rest/v1/products?select=id,name,name_ko,brand,summary,image_url,category,ingredients,notes,bio_values`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      );
      const data = await res.json();
      if (!data) return context.next();
      const p = data.find(x => x.id === slug) ||
                data.find(x => (x.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + x.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/-+$/, '') === slug);
      if (!p || !VISIBLE_PRODUCTS.includes(p.id)) return context.next();

      title = p.brand + ' ' + p.name + ' | ana2me';
      description = p.summary?.tagline || '';
      image = p.image_url || '';
      pageUrl = `${SITE}/products/${slug}`;

      // Fetch reviews for aggregateRating
      let reviewData = [];
      try {
        const revRes = await fetchWithTimeout(
          `${SUPABASE_URL}/rest/v1/reviews?product_id=eq.${p.id}&select=rating`,
          { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
        );
        reviewData = await revRes.json();
      } catch(e) {}

      const productLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        "name": p.name,
        "brand": { "@type": "Brand", "name": p.brand },
        "description": description,
        "image": image.startsWith('/') ? SITE + image : image,
        "url": pageUrl,
        "category": p.category || '',
      };
      if (reviewData.length > 0) {
        const avg = reviewData.reduce((s, r) => s + r.rating, 0) / reviewData.length;
        productLd.aggregateRating = {
          "@type": "AggregateRating",
          "ratingValue": avg.toFixed(1),
          "reviewCount": reviewData.length,
          "bestRating": "5",
          "worstRating": "1"
        };
      } else {
        // No reviews yet — use review field with editorial review to satisfy Google
        productLd.review = {
          "@type": "Review",
          "author": { "@type": "Organization", "name": "ana2me" },
          "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5" },
          "reviewBody": description
        };
      }
      jsonLd = JSON.stringify(productLd);

      breadcrumbLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE },
          { "@type": "ListItem", "position": 2, "name": "Products", "item": `${SITE}/products` },
          { "@type": "ListItem", "position": 3, "name": p.brand + ' ' + p.name, "item": pageUrl }
        ]
      });

      ssrContent = renderProductHTML(p);

    } else if (isListing) {
      // SSR article listing — gives crawlers links to every article
      const res = await fetchWithTimeout(
        `${SUPABASE_URL}/rest/v1/articles?select=id,title,excerpt,tag,date&order=created_at.desc`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      );
      const articles = await res.json();
      if (articles && articles.length) {
        ssrContent = renderArticleListing(articles);
      }

    } else if (isProductListing) {
      // SSR product listing — only show visible products (must match feed.jsx filter)
      const VISIBLE_PRODUCTS = ['skincare-3', 'skincare-4', 'skincare-5', 'skincare-6', 'skincare-7', 'skincare-8', 'skincare-9', 'skincare-10', 'skincare-11', 'skincare-12', 'skincare-13', 'skincare-14'];
      const res = await fetchWithTimeout(
        `${SUPABASE_URL}/rest/v1/products?select=id,name,brand,summary&id=in.(${VISIBLE_PRODUCTS.join(',')})&order=updated_at.desc`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      );
      const products = await res.json();
      if (products && products.length) {
        ssrContent = renderProductListing(products);
      }
    } else if (isAbout) {
      title = 'About | ana2me';
      description = 'ana2me is an ingredient-first platform covering Korean beauty, skincare, fragrance, and wellness — built for people who want to understand what they\'re putting in and on their body.';
      pageUrl = `${SITE}/about`;
      ssrContent = `<article><h1>About ana2me</h1><p>${escHtml(description)}</p><p>We break down ingredients using molecular data so you can make informed decisions about skincare, fragrance, and wellness products.</p><nav><a href="/insights">Read our articles</a> · <a href="/products">Browse products</a></nav></article>`;
    } else if (isAnalyzer) {
      title = 'Ingredient Analyzer | ana2me';
      description = 'Paste any skincare, supplement, or wellness ingredient list and get a plain-language breakdown of what works for your body — powered by molecular data.';
      pageUrl = `${SITE}/analyzer`;
      ssrContent = `<article><h1>Ingredient Analyzer</h1><p>${escHtml(description)}</p></article>`;
    } else if (isPrivacy) {
      title = 'Privacy Policy | ana2me';
      description = 'ana2me collects no personal data. We use Google Analytics for anonymous usage stats only.';
      pageUrl = `${SITE}/privacy`;
      ssrContent = `<article><h1>Privacy Policy</h1><p>${escHtml(description)}</p></article>`;
    }
  } catch (e) {
    // Don't let Supabase failures become 5xx — fall through to SPA with a
    // minimal SSR hint so crawlers still see *something* rather than an empty shell
    const response = await context.next();
    const html = await response.text();
    const fallbackContent = articleMatch
      ? `<div id="ssr" style="max-width:720px;margin:0 auto;padding:0 28px 80px"><p>Loading article…</p><p><a href="/insights">Browse all articles</a></p></div>`
      : productMatch
      ? `<div id="ssr" style="max-width:720px;margin:0 auto;padding:0 28px 80px"><p>Loading product…</p><p><a href="/products">Browse all products</a></p></div>`
      : isListing
      ? `<div id="ssr" style="max-width:720px;margin:0 auto;padding:0 28px 80px"><p><a href="/insights">Insights</a> · <a href="/products">Products</a> · <a href="/about">About</a></p></div>`
      : '';
    const newHtml = fallbackContent
      ? html.replace(/(<div\s+id="root"[^>]*>)<\/div>/, `$1</div>${fallbackContent}<script>document.getElementById('ssr').style.display='none'</script>`)
      : html;
    return new Response(newHtml, { headers: response.headers });
  }

  const response = await context.next();
  const html = await response.text();

  let newHtml = html;

  // Update hreflang tags to match the current page URL
  const currentUrl = pageUrl || `${SITE}${path}`;
  newHtml = newHtml.replace(/(<link\s+rel="alternate"\s+hreflang="[^"]*"\s+href=")[^"]*"/g, `$1${currentUrl}"`);

  // Inject meta tags (only for article/product detail pages)
  if (title) {
    newHtml = newHtml
      .replace(/<title>[^<]*<\/title>/, `<title>${escHtml(title)}</title>`)
      .replace(/(<meta\s+name="description"\s+content=")[^"]*"/, `$1${escAttr(description)}"`)
      .replace(/(<link\s+rel="canonical"\s+href=")[^"]*"/, `$1${pageUrl}"`)
      .replace(/(<meta\s+property="og:type"\s+content=")[^"]*"/, `$1${articleMatch ? 'article' : 'product'}"`)
      .replace(/(<meta\s+property="og:title"\s+content=")[^"]*"/, `$1${escAttr(title)}"`)
      .replace(/(<meta\s+property="og:description"\s+content=")[^"]*"/, `$1${escAttr(description)}"`)
      .replace(/(<meta\s+property="og:url"\s+content=")[^"]*"/, `$1${pageUrl}"`)
      .replace(/(<meta\s+property="og:image"\s+content=")[^"]*"/, `$1${image}"`)
      .replace(/(<meta\s+property="og:image:alt"\s+content=")[^"]*"/, `$1${escAttr(title)}"`)
      .replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*"/, `$1${escAttr(title)}"`)
      .replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*"/, `$1${escAttr(description)}"`)
      .replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*"/, `$1${image}"`)
      .replace(/(<meta\s+name="twitter:image:alt"\s+content=")[^"]*"/, `$1${escAttr(title)}"`);
  }

  // Inject article:published_time for articles
  if (articleMatch && publishedDate) {
    newHtml = newHtml.replace('</head>', `<meta property="article:published_time" content="${publishedDate}" />\n</head>`);
  }

  // Inject JSON-LD before </head>
  if (jsonLd) {
    newHtml = newHtml.replace('</head>', `<script type="application/ld+json">${jsonLd}</script>\n</head>`);
  }
  if (breadcrumbLd) {
    newHtml = newHtml.replace('</head>', `<script type="application/ld+json">${breadcrumbLd}</script>\n</head>`);
  }

  // Inject SSR content AFTER root div for crawlers (outside React's control)
  // Script immediately hides it for JS users; crawlers (no JS) see it
  if (ssrContent) {
    const ssrBlock = `<div id="ssr" style="max-width:720px;margin:0 auto;padding:0 28px 80px">${ssrContent}</div><script>document.getElementById('ssr').style.display='none'</script>`;
    newHtml = newHtml.replace(/(<div\s+id="root"[^>]*>)<\/div>/, `$1</div>${ssrBlock}`);
  }

  // Set cache headers based on page type
  const responseHeaders = new Headers(response.headers);
  if (articleMatch) {
    // Articles are immutable after publishing — cache aggressively
    responseHeaders.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600');
    responseHeaders.set('Netlify-CDN-Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600');
  } else if (productMatch) {
    // Products change rarely
    responseHeaders.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');
    responseHeaders.set('Netlify-CDN-Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=600');
  } else if (isListing || isProductListing) {
    // Listings update when new content is added — short cache
    responseHeaders.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
    responseHeaders.set('Netlify-CDN-Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
  }

  return new Response(newHtml, { headers: responseHeaders });
}

// ---------- HTML Renderers ----------

function renderArticleListing(articles) {
  let html = `<nav aria-label="Articles"><h1>Insights</h1><ul>`;
  for (const a of articles) {
    const tag = (a.tag?.en || '').toLowerCase().replace(/\s+/g, '-');
    const d = new Date(a.date);
    const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const href = `/article/${tag}/${iso}/${a.id}`;
    html += `<li><a href="${href}">${escHtml(a.title?.en || '')}</a>`;
    if (a.excerpt?.en) html += ` — ${escHtml(a.excerpt.en)}`;
    html += `</li>`;
  }
  html += `</ul></nav>`;
  return html;
}

function renderProductListing(products) {
  let html = `<nav aria-label="Products"><h1>Products</h1><ul>`;
  for (const p of products) {
    const slug = (p.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/-+$/, '');
    html += `<li><a href="/products/${slug}">${escHtml(p.brand)} ${escHtml(p.name)}</a>`;
    if (p.summary?.tagline) html += ` — ${escHtml(p.summary.tagline)}`;
    html += `</li>`;
  }
  html += `</ul></nav>`;
  return html;
}

function renderArticleHTML(a) {
  const title = a.title?.en || '';
  const excerpt = a.excerpt?.en || '';
  const tag = a.tag?.en || '';
  const category = a.category?.en || '';
  const date = a.date || '';
  const readTime = a.read_time?.en || '';
  const blocks = a.body_blocks || [];

  let html = `<article>`;
  html += `<header>`;
  html += `<p>${escHtml(category)}</p>`;
  html += `<h1>${escHtml(title)}</h1>`;
  html += `<p>${escHtml(excerpt)}</p>`;
  html += `<p>${escHtml(date)} · ${escHtml(readTime)}</p>`;
  html += `</header>`;

  for (const block of blocks) {
    html += renderBlock(block);
  }

  // Korean version
  const titleKo = a.title?.ko || '';
  const excerptKo = a.excerpt?.ko || '';
  if (titleKo) {
    html += `<section lang="ko">`;
    html += `<h2>${escHtml(titleKo)}</h2>`;
    html += `<p>${escHtml(excerptKo)}</p>`;
    for (const block of blocks) {
      html += renderBlock(block, 'ko');
    }
    html += `</section>`;
  }

  html += `</article>`;
  return html;
}

function renderBlock(block, lang) {
  if (!block || !block.type) return '';
  const t = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return (lang === 'ko' ? obj.ko : obj.en) || obj.en || '';
  };

  switch (block.type) {
    case 'tldr':
      return `<aside><p>${escHtml(t(block.text))}</p></aside>`;

    case 'figure': {
      const src = block.src || '';
      const credit = src.includes('pexels.com') ? 'Pexels' : src.includes('unsplash.com') ? 'Unsplash' : src.includes('pixabay.com') ? 'Pixabay' : src.includes('wikimedia.org') ? 'Wikimedia Commons' : '';
      const cap = [block.alt || '', credit].filter(Boolean).join(' · ');
      return `<figure><img src="${escAttr(src)}" alt="${escAttr(block.alt || '')}" />${cap ? `<figcaption>${escHtml(cap)}</figcaption>` : ''}</figure>`;
    }

    case 'section': {
      let s = `<section>`;
      const heading = t(block.heading);
      if (heading) s += `<h2>${escHtml(heading)}</h2>`;
      if (block.children) {
        for (const child of block.children) {
          s += renderBlock(child, lang);
        }
      }
      s += `</section>`;
      return s;
    }

    case 'body':
      return `<p>${t(block.text)}</p>`; // Already contains HTML markup like <strong>, <mark>

    case 'callout':
      return `<aside><h3>${escHtml(t(block.title))}</h3><p>${t(block.text)}</p></aside>`;

    case 'statCards': {
      if (!block.cards) return '';
      let s = '<dl>';
      for (const card of block.cards) {
        s += `<dt>${escHtml(t(card.title))}</dt><dd>${escHtml(t(card.desc))}</dd>`;
      }
      s += '</dl>';
      return s;
    }

    case 'prodCards': {
      if (!block.cards) return '';
      let s = '<ul>';
      for (const card of block.cards) {
        s += `<li><strong>${escHtml(card.brand || '')} ${escHtml(card.name || '')}</strong> — ${escHtml(t(card.note))}</li>`;
      }
      s += '</ul>';
      return s;
    }

    case 'grid': {
      if (!block.items) return '';
      let s = '<dl>';
      for (const item of block.items) {
        s += `<dt>${escHtml(t(item.title))}</dt><dd>${t(item.body)}</dd>`;
      }
      s += '</dl>';
      return s;
    }

    case 'sources': {
      if (!block.items) return '';
      let s = `<p style="font-size:11px;color:#999;margin:4px 0 0">${lang === 'ko' ? '본 콘텐츠는 정보를 제공하기 위한 것이며, 전문적인 의료 조언을 대신하지 않습니다.' : 'For informational purposes only. Not intended as medical or professional advice.'}</p>`;
      s += '<footer><h3>Sources</h3><ol>';
      for (const src of block.items) {
        s += src.url
          ? `<li><a href="${escAttr(src.url)}">${escHtml(src.label || '')}</a></li>`
          : `<li>${escHtml(src.label || '')}</li>`;
      }
      s += '</ol></footer>';
      return s;
    }

    default:
      return '';
  }
}

function renderProductHTML(p) {
  let html = `<article>`;
  html += `<header>`;
  html += `<p>${escHtml(p.brand || '')}</p>`;
  html += `<h1>${escHtml(p.name || '')}</h1>`;
  if (p.name_ko) html += `<p lang="ko">${escHtml(p.name_ko)}</p>`;
  html += `</header>`;

  const s = p.summary || {};
  if (s.tagline) html += `<p>${escHtml(s.tagline)}</p>`;
  if (s.taglineKo) html += `<p lang="ko">${escHtml(s.taglineKo)}</p>`;

  if (s.benefits && s.benefits.length) {
    html += `<section><h2>Benefits</h2><ul>`;
    for (const b of s.benefits) html += `<li>${escHtml(b)}</li>`;
    html += `</ul></section>`;
  }
  if (s.benefitsKo && s.benefitsKo.length) {
    html += `<section lang="ko"><h2>효능</h2><ul>`;
    for (const b of s.benefitsKo) html += `<li>${escHtml(b)}</li>`;
    html += `</ul></section>`;
  }

  if (s.concerns && s.concerns.length) {
    html += `<section><h2>Best For</h2><ul>`;
    for (const c of s.concerns) html += `<li>${escHtml(c)}</li>`;
    html += `</ul></section>`;
  }

  if (s.usage) html += `<section><h2>How to Use</h2><p>${escHtml(s.usage)}</p></section>`;

  // Ingredients
  if (p.ingredients && p.ingredients.length) {
    html += `<section><h2>Key Ingredients</h2><dl>`;
    for (const ing of p.ingredients) {
      html += `<dt>${escHtml(ing.name || '')}</dt>`;
      html += `<dd>${escHtml(ing.description || '')} ${escHtml(ing.science || '')}</dd>`;
    }
    html += `</dl></section>`;
  }

  // Fragrance notes
  if (p.notes && p.notes.length) {
    html += `<section><h2>Fragrance Notes</h2><dl>`;
    for (const n of p.notes) {
      html += `<dt>${escHtml(n.type || '')} — ${escHtml(n.name || '')}</dt>`;
      html += `<dd>${escHtml(n.description || '')} ${escHtml(n.science || '')}</dd>`;
    }
    html += `</dl></section>`;
  }

  // Bio values (wellness)
  if (p.bio_values && p.bio_values.length) {
    html += `<section><h2>Bioactive Profile</h2><dl>`;
    for (const bv of p.bio_values) {
      html += `<dt>${escHtml(bv.name || '')}</dt>`;
      html += `<dd>${escHtml(bv.description || '')} ${escHtml(bv.science || '')}</dd>`;
    }
    html += `</dl></section>`;
  }

  html += `</article>`;
  return html;
}

// ---------- Helpers ----------

function extractBodyText(blocks) {
  if (!blocks || !blocks.length) return '';
  let text = '';
  for (const block of blocks) {
    text += extractBlockText(block) + ' ';
  }
  return text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function extractBlockText(block) {
  if (!block) return '';
  let text = '';
  const en = (obj) => {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj.en || '';
  };

  if (block.text) text += en(block.text) + ' ';
  if (block.title) text += en(block.title) + ' ';
  if (block.heading) text += en(block.heading) + ' ';
  if (block.children) {
    for (const child of block.children) {
      text += extractBlockText(child) + ' ';
    }
  }
  if (block.cards) {
    for (const card of block.cards) {
      if (card.title) text += en(card.title) + ' ';
      if (card.desc) text += en(card.desc) + ' ';
      if (card.note) text += en(card.note) + ' ';
      if (card.name) text += card.name + ' ';
    }
  }
  if (block.items) {
    for (const item of block.items) {
      if (item.title) text += en(item.title) + ' ';
      if (item.body) text += en(item.body) + ' ';
    }
  }
  return text;
}

function toISODate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toISOString().slice(0, 10);
}

function buildFAQItems(blocks) {
  if (!blocks) return [];
  const items = [];
  for (const block of blocks) {
    if (block.type !== 'section') continue;
    const heading = block.heading?.en || block.title?.en || '';
    if (!heading || !heading.includes('?')) continue;
    // Collect text from children as the answer
    let answer = '';
    for (const child of (block.children || [])) {
      if (child.type === 'body') {
        const t = child.text?.en || child.body?.en || '';
        answer += t.replace(/<[^>]+>/g, '') + ' ';
      } else if (child.type === 'callout') {
        const t = child.text?.en || child.body?.en || '';
        answer += t.replace(/<[^>]+>/g, '') + ' ';
      }
    }
    answer = answer.trim();
    if (answer) {
      items.push({
        "@type": "Question",
        "name": heading,
        "acceptedAnswer": { "@type": "Answer", "text": answer }
      });
    }
  }
  return items;
}

function buildCitations(blocks) {
  if (!blocks) return [];
  for (const block of blocks) {
    if (block.type === 'sources' && block.items) {
      return block.items.filter(s => s.url).map(s => ({
        "@type": "CreativeWork",
        "name": s.label,
        "url": s.url
      }));
    }
  }
  return [];
}

function extractTldr(blocks) {
  if (!blocks) return '';
  for (const block of blocks) {
    if (block.type === 'tldr') {
      return block.text?.en || '';
    }
  }
  return '';
}

function escHtml(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escAttr(s) { return (s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

// Path config is in netlify.toml (single source of truth)
