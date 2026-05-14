// Edge Function: Inject OG tags, JSON-LD, and server-rendered content for articles and products
const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';
const SITE = 'https://ana2-me.com';

export default async function (request, context) {
  const url = new URL(request.url);
  const path = url.pathname;

  const articleMatch = path.match(/^\/article\/[^/]+\/[^/]+\/([^/]+)\/?$/);
  const productMatch = path.match(/^\/products\/([^/]+)\/?$/);
  if (!articleMatch && !productMatch) {
    return context.next();
  }

  let title, description, image, pageUrl, jsonLd, breadcrumbLd, ssrContent, publishedDate;

  try {
    if (articleMatch) {
      const articleId = articleMatch[1];
      const res = await fetch(
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

      // Build FAQPage JSON-LD from question-format section headings
      const faqItems = buildFAQItems(a.body_blocks);
      var faqLd = faqItems.length > 0 ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems
      }) : null;

      ssrContent = renderArticleHTML(a);

    } else {
      const slug = productMatch[1];
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/products?select=id,name,name_ko,brand,summary,image_url,category,ingredients,notes,bio_values`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      );
      const data = await res.json();
      if (!data) return context.next();
      const p = data.find(x => x.id === slug) ||
                data.find(x => (x.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + x.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/-+$/, '') === slug);
      if (!p) return context.next();

      title = p.brand + ' ' + p.name + ' | ana2me';
      description = p.summary?.tagline || '';
      image = p.image_url || '';
      pageUrl = `${SITE}/products/${slug}`;

      jsonLd = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        "name": p.name,
        "brand": { "@type": "Brand", "name": p.brand },
        "description": description,
        "image": image.startsWith('/') ? SITE + image : image,
        "url": pageUrl,
        "category": p.category || ''
      });

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
    }
  } catch (e) {
    return context.next();
  }

  const response = await context.next();
  const html = await response.text();

  // Inject meta tags
  let newHtml = html
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
  if (typeof faqLd === 'string') {
    newHtml = newHtml.replace('</head>', `<script type="application/ld+json">${faqLd}</script>\n</head>`);
  }

  // Inject SSR content inside <div id="root"> for crawlers
  // Wrapped in <main> for semantic landmark
  // React replaces it on mount — no visual change for users
  if (ssrContent) {
    newHtml = newHtml.replace('<div id="root"></div>', `<div id="root"><main>${ssrContent}</main></div>`);
  }

  return new Response(newHtml, { headers: response.headers });
}

// ---------- HTML Renderers ----------

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

    case 'figure':
      return `<figure><img src="${escAttr(block.src || '')}" alt="${escAttr(block.alt || '')}" />${block.alt ? `<figcaption>${escHtml(block.alt)}</figcaption>` : ''}</figure>`;

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
      let s = '<footer><h3>Sources</h3><ol>';
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

export const config = {
  path: ["/article/*", "/products/*"],
};
