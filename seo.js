// seo.js — Dynamic meta tag and JSON-LD manager for ana2-me.com
(function () {
  var BASE_URL = 'https://ana2-me.com';
  var SITE_NAME = 'ana2me';
  var DEFAULT_IMAGE = BASE_URL + '/og-default.jpg';

  var ARTICLE_META = {
    'skin-barrier-2026': {
      title: "Your Skin Barrier Is Leaking. Here's What 2026 Science Says to Do About It.",
      description: "Ceramides, fatty acids, and pH balance are the holy trinity of skin barrier health. Modern environments are attacking all three simultaneously. Here's the molecular fix.",
      datePublished: '2026-04-01',
      dateModified: '2026-04-01',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Skincare serums and moisturizer bottles representing ceramide and skin barrier repair',
      keywords: 'skin barrier, ceramides, fatty acids, pH balance, TEWL, bifida ferment lysate',
      category: 'Molecular Insights',
    },
    'fragrance-volatility': {
      title: 'Why Your Perfume Smells Different on You Than in the Bottle.',
      description: "The same perfume smells different on everyone — and it's not just body chemistry. Molecular weight, vapor pressure, and skin hydration each determine when a note surfaces.",
      datePublished: '2026-03-15',
      dateModified: '2026-03-15',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Glass perfume bottle on a reflective surface, illustrating molecular volatility',
      keywords: 'perfume, fragrance volatility, top notes, base notes, vapor pressure, molecular weight',
      category: 'Olfactory Science',
    },
    'adaptogens-bioavailability': {
      title: "You're Probably Wasting Your Adaptogens. Delivery Matters More Than Dosage.",
      description: "Ashwagandha, Lion's Mane, Reishi — raw powder bioavailability sits below 10% for most people. Fermentation, lipid encapsulation, and dual extraction change everything.",
      datePublished: '2026-03-01',
      dateModified: '2026-03-01',
      image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Mushrooms, herbs, and wellness supplement ingredients representing adaptogen bioavailability',
      keywords: 'adaptogens, bioavailability, ashwagandha, lions mane, reishi, liposomal delivery, fermentation',
      category: 'Nutritional Intelligence',
    },
    'fermentation-transformation': {
      title: "Galactomyces Started in a Sake Brewery. Now It's One of Skincare's Most Studied Actives.",
      description: "Galactomyces was discovered by accident. Bifida Ferment Lysate was reverse-engineered from infant skin. Fermentation creates entirely new compounds the original plant never had.",
      datePublished: '2026-02-01',
      dateModified: '2026-02-01',
      image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Fermentation laboratory setup with glass flasks, representing skincare fermentation science',
      keywords: 'galactomyces, fermentation, bifida ferment lysate, lactobacillus, skincare actives, postbiotics',
      category: 'Fermentation Science',
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

  window.SEO = {
    setHome: function () {
      var title = 'ana2me — Clean Beauty, Demystified';
      var desc = 'Deep molecular analysis of skincare, fragrance, and wellness ingredients.';
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
      var desc = 'ana2me is an ingredient-first platform covering Korean beauty, skincare, fragrance, and wellness — built for people who want to understand what they\'re putting in and on their body.';
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

    setArticle: function (articleId) {
      var m = ARTICLE_META[articleId];
      if (!m) { window.SEO.setHome(); return; }
      var title = m.title + ' | ' + SITE_NAME;
      var url = BASE_URL + '/' + articleId;
      document.title = title;
      setMeta('meta[name="description"]', m.description);
      setMeta('link[rel="canonical"]', url);
      setMeta('meta[property="og:type"]', 'article');
      setMeta('meta[property="og:title"]', m.title);
      setMeta('meta[property="og:description"]', m.description);
      setMeta('meta[property="og:url"]', url);
      setMeta('meta[property="og:image"]', m.image);
      setMeta('meta[name="twitter:title"]', m.title);
      setMeta('meta[name="twitter:description"]', m.description);
      setMeta('meta[name="twitter:image"]', m.image);
      setArticleJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Article',
        '@id': url + '#article',
        'headline': m.title,
        'description': m.description,
        'url': url,
        'datePublished': m.datePublished,
        'dateModified': m.dateModified,
        'image': { '@type': 'ImageObject', 'url': m.image, 'description': m.imageAlt },
        'keywords': m.keywords,
        'articleSection': m.category,
        'inLanguage': 'en',
        'publisher': { '@type': 'Organization', '@id': BASE_URL + '/#organization', 'name': SITE_NAME, 'url': BASE_URL + '/' },
        'mainEntityOfPage': { '@type': 'WebPage', '@id': url },
        'isPartOf': { '@id': BASE_URL + '/#website' },
      });
    },
  };
})();
