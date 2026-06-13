// seo.js — Dynamic meta tag and JSON-LD manager for ana2-me.com
// ARTICLE_META migrated to Supabase — see migrate-seo-meta.mjs
var BASE_URL = 'https://ana2-me.com';
var SITE_NAME = 'ana2me';
var DEFAULT_IMAGE = BASE_URL + '/og-default.png';

var AUTHOR = {
  '@type': 'Person',
  'name': 'Ana',
  'url': BASE_URL + '/about',
};

var PUBLISHER = {
  '@type': 'Organization',
  '@id': BASE_URL + '/#organization',
  'name': SITE_NAME,
  'url': BASE_URL + '/',
  'logo': {
    '@type': 'ImageObject',
    'url': BASE_URL + '/og-default.png',
  },
};

function setMeta(selector, value) {
  var el = document.querySelector(selector);
  if (el) el.setAttribute(el.hasAttribute('content') ? 'content' : 'href', value);
}

function setArticleJsonLd(data) {
  var existing = document.getElementById('ld-article');
  if (existing) existing.parentNode.removeChild(existing);
  if (!data) return;
  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'ld-article';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function buildArticleUrl(articleId, m) {
  return BASE_URL + '/article/' + (m.tag || 'skincare') + '/' + m.datePublished + '/' + articleId;
}

const SEO = {
  setHome: function () {
    var title = "ana2me \u2014 Korean Skincare, Fragrance & Wellness Decoded at the Molecular Level";
    var desc = 'Independent ingredient analysis of Korean skincare, fragrance, and wellness products. Science-backed articles, product breakdowns, and an ingredient analyzer \u2014 in English and Korean.';
    var url = BASE_URL + '/';
    document.title = title;
    setMeta('meta[name="description"]', desc);
    setMeta('link[rel="canonical"]', url);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:image"]', DEFAULT_IMAGE);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', desc);
    setMeta('meta[name="twitter:image"]', DEFAULT_IMAGE);
    setArticleJsonLd(null);
  },

  setAbout: function () {
    var title = 'About | ana2me';
    var desc = 'Ingredient-first K-beauty platform for skincare, fragrance & wellness.';
    var url = BASE_URL + '/about';
    document.title = title;
    setMeta('meta[name="description"]', desc);
    setMeta('link[rel="canonical"]', url);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', desc);
    setArticleJsonLd(null);
  },

  setTerms: function () {
    var title = 'Terms of Service \u2014 ana2me';
    var desc = 'Terms of Service for ana2me, an ingredient-discovery and personalization tool for Korean cosmetic products.';
    var url = BASE_URL + '/terms';
    document.title = title;
    setMeta('meta[name="description"]', desc);
    setMeta('link[rel="canonical"]', url);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', desc);
    setArticleJsonLd(null);
  },
  setPrivacy: function () {
    var title = 'Privacy Policy | ana2me';
    var desc = 'ana2me collects no personal data. We use Google Analytics for anonymous usage stats only. Read our full privacy policy.';
    var url = BASE_URL + '/privacy';
    document.title = title;
    setMeta('meta[name="description"]', desc);
    setMeta('link[rel="canonical"]', url);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', desc);
    setArticleJsonLd(null);
  },

  setAnalyzer: function () {
    var title = 'Korean Skincare Ingredient Analyzer \u2014 Find Your Ingredient Pattern | ana2me';
    var desc = 'Search any skincare product and get a full ingredient breakdown in plain language. Add products that work and don\u2019t work for you \u2014 we\u2019ll find the ingredient pattern your skin responds to. Free, no login required.';
    var url = BASE_URL + '/analyzer';
    document.title = title;
    setMeta('meta[name="description"]', desc);
    setMeta('link[rel="canonical"]', url);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:title"]', 'Korean Skincare Ingredient Analyzer | ana2me');
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:image"]', DEFAULT_IMAGE);
    setMeta('meta[property="og:image:alt"]', 'ana2me Ingredient Analyzer');
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'Korean Skincare Ingredient Analyzer | ana2me');
    setMeta('meta[name="twitter:description"]', desc);
    setMeta('meta[name="twitter:image"]', DEFAULT_IMAGE);
    setMeta('meta[name="twitter:image:alt"]', 'ana2me Ingredient Analyzer');
    setArticleJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          'name': 'ana2me Ingredient Analyzer',
          'url': url,
          'applicationCategory': 'HealthApplication',
          'operatingSystem': 'Web',
          'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
          'description': desc,
          'publisher': { '@id': BASE_URL + '/#organization' }
        },
        {
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'What does the ana2me ingredient analyzer do?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'The ana2me ingredient analyzer lets you search any skincare product and see a full breakdown of its ingredients in plain language. Add products that work for your skin and ones that don\u2019t, and the analyzer finds the ingredient patterns behind both \u2014 helping you identify what your skin responds to.'
              }
            },
            {
              '@type': 'Question',
              'name': 'How does the ingredient pattern analysis work?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'The analyzer compares the ingredient lists of products you mark as "works for me" and "didn\u2019t suit me." It identifies ingredients that appear more often in one group than the other, flags known sensitizers and allergens (EU-26 list, essential oils), and ranks the results by statistical signal strength. The more products you add, the more accurate the pattern becomes.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Is the ingredient analyzer free?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes, the ana2me ingredient analyzer is completely free. No login or account required. Your data stays in your browser and is not stored on our servers.'
              }
            }
          ]
        }
      ]
    });
  },

  // Set SEO for an article — reads from the Supabase article object directly.
  // Falls back to title/excerpt/imageUrl if dedicated SEO columns are empty.
  setArticle: function (article, lang) {
    if (!article) return;
    var l = lang || (document.documentElement.classList.contains('lang-ko') ? 'ko' : 'en');
    var articleId = article.id;

    // Parse date for URL and JSON-LD
    var dateStr = article.date_published || article.date || '';
    var d = new Date(dateStr);
    var isoDate = isNaN(d.getTime()) ? '' : d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');

    // Build SEO fields with fallbacks
    var seoTitle    = article.meta_title       || ((l === 'ko' && article.title && article.title.ko) ? article.title.ko : (article.title && article.title.en || ''));
    var description = article.meta_description || ((l === 'ko' && article.excerpt && article.excerpt.ko) ? article.excerpt.ko : (article.excerpt && article.excerpt.en || ''));
    var image       = article.og_image         || (article.imageUrl || article.image_url || '').replace('w=800', 'w=1200');
    var imageAlt    = article.og_image_alt     || (article.title && article.title.en || '');
    var keywords    = article.seo_keywords     || article.keywords || '';
    var category    = article.seo_category     || (article.category && article.category.en || '');
    var tag         = (article.tag && article.tag.en || 'skincare').toLowerCase().replace(/\s+/g, '-');
    var wordCount   = article.word_count       || 1000;
    var datePub     = article.date_published   || isoDate;
    var dateMod     = article.date_modified    || datePub;

    var m = { title: seoTitle, description: description, datePublished: datePub, dateModified: dateMod, image: image, imageAlt: imageAlt, keywords: keywords, category: category, tag: tag, wordCount: wordCount };

    var title = m.title + ' | ' + SITE_NAME;
    var url = buildArticleUrl(articleId, m);
    document.title = title;
    setMeta('meta[name="description"]', m.description);
    setMeta('link[rel="canonical"]', url);
    setMeta('meta[property="og:type"]', 'article');
    setMeta('meta[property="og:title"]', m.title);
    setMeta('meta[property="og:description"]', m.description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:image"]', m.image);
    setMeta('meta[property="og:image:alt"]', m.imageAlt);
    setMeta('meta[name="twitter:title"]', m.title);
    setMeta('meta[name="twitter:description"]', m.description);
    setMeta('meta[name="twitter:image"]', m.image);
    setMeta('meta[name="twitter:image:alt"]', m.imageAlt);
    // Summary meta for AEO
    var summaryVal = article.summary
      ? ((l === 'ko' && article.summary.ko) ? article.summary.ko : article.summary.en)
      : '';
    if (summaryVal) {
      var sumEl = document.querySelector('meta[name="summary"]');
      if (!sumEl) { sumEl = document.createElement('meta'); sumEl.name = 'summary'; document.head.appendChild(sumEl); }
      sumEl.setAttribute('content', summaryVal.replace(/<[^>]*>/g, ''));
    }
    var abstractVal = summaryVal ? summaryVal.replace(/<[^>]*>/g, '') : '';
    setArticleJsonLd({
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      '@id': url + '#article',
      'headline': m.title,
      'description': m.description,
      'abstract': abstractVal || m.description,
      'url': url,
      'datePublished': m.datePublished,
      'dateModified': m.dateModified,
      'image': {
        '@type': 'ImageObject',
        'url': m.image,
        'description': m.imageAlt,
        'width': 1200,
        'height': 630,
      },
      'keywords': m.keywords,
      'articleSection': m.category,
      'wordCount': m.wordCount,
      'inLanguage': ['en', 'ko'],
      'author': AUTHOR,
      'publisher': PUBLISHER,
      'mainEntityOfPage': { '@type': 'WebPage', '@id': url },
      'isPartOf': { '@id': BASE_URL + '/#website' },
    });
  },

  setProduct: function (product, lang) {
    var l = lang || (document.documentElement.classList.contains('lang-ko') ? 'ko' : 'en');
    var name = (l === 'ko' && product.nameKo) ? product.nameKo : product.name;
    var brand = product.brand;
    var title = brand + ' ' + name + ' | ' + SITE_NAME;
    var desc = (l === 'ko' && product.summary.taglineKo) ? product.summary.taglineKo : product.summary.tagline;
    var image = product.imageUrl || product.image_url || '';
    var slug = ((product.brand || '') + ' ' + (product.name || product.id)).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    var url = BASE_URL + '/products/' + slug;

    document.title = title;
    setMeta('meta[name="description"]', desc);
    setMeta('link[rel="canonical"]', url);
    setMeta('meta[property="og:type"]', 'product');
    setMeta('meta[property="og:title"]', brand + ' ' + name);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:image"]', image);
    setMeta('meta[property="og:image:alt"]', brand + ' ' + name);
    setMeta('meta[name="twitter:title"]', brand + ' ' + name);
    setMeta('meta[name="twitter:description"]', desc);
    setMeta('meta[name="twitter:image"]', image);
    setMeta('meta[name="twitter:image:alt"]', brand + ' ' + name);
    setArticleJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': url + '#product',
      'name': name,
      'brand': { '@type': 'Brand', 'name': brand },
      'description': product.summary.tagline,
      'image': image,
      'url': url,
      'category': product.category,
    });
  },

  setBrands: function () {
    var title = 'Brands | ana2me';
    var desc = 'Browse skincare, fragrance, and wellness brands with independent ingredient analysis on ana2me.';
    var url = BASE_URL + '/brands';
    document.title = title;
    setMeta('meta[name="description"]', desc);
    setMeta('link[rel="canonical"]', url);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', desc);
    setArticleJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': title,
      'description': desc,
      'url': url,
    });
  },

  setIngredient: function (ingredient) {
    var name = ingredient.name || ingredient.id;
    var title = name + ' \u2014 What It Does for Your Skin | ' + SITE_NAME;
    var desc = (ingredient.science || ingredient.description || '').slice(0, 160);
    var url = BASE_URL + '/ingredients/' + ingredient.id;
    document.title = title;
    setMeta('meta[name="description"]', desc);
    setMeta('link[rel="canonical"]', url);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', desc);
    setArticleJsonLd({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What does ' + name + ' do for skin?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': ingredient.science || ingredient.description || ''
          }
        }
      ]
    });
  },

  setIngredients: function () {
    var title = 'Skincare Ingredients Guide | ana2me';
    var desc = 'Browse 100+ skincare ingredients with plain-language explanations. Understand what each ingredient does, which products contain it, and whether it suits your skin.';
    var url = BASE_URL + '/ingredients';
    document.title = title;
    setMeta('meta[name="description"]', desc);
    setMeta('link[rel="canonical"]', url);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', desc);
    setArticleJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': title,
      'description': desc,
      'url': url,
    });
  },

  setBrand: function (brandName) {
    var slug = brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    var title = brandName + ' | ana2me';
    var desc = 'Independent ingredient analysis of ' + brandName + ' products on ana2me.';
    var url = BASE_URL + '/brands/' + slug;
    document.title = title;
    setMeta('meta[name="description"]', desc);
    setMeta('link[rel="canonical"]', url);
    setMeta('meta[property="og:type"]', 'website');
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', desc);
    setArticleJsonLd({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': title,
      'description': desc,
      'url': url,
    });
  },
};

export default SEO;
