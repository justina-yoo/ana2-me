// seo.js — Dynamic meta tag and JSON-LD manager for ana2-me.com
(function () {
  var BASE_URL = 'https://ana2-me.com';
  var SITE_NAME = 'ana2me';
  var DEFAULT_IMAGE = BASE_URL + '/og-default.jpg';

  var ARTICLE_META = {
    'k-fragrance-skin-scents': {
      title: "K-Fragrance Just Hit Record Exports. Here's the Molecular Reason Korean Perfume Smells Different.",
      description: "K-fragrance exports hit $6.52M in January 2026. The secret isn't marketing — it's a fundamentally different approach to scent design built on synthetic musks and sheer woods.",
      datePublished: '2026-05-03',
      dateModified: '2026-05-03',
      image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Minimal perfume bottles representing K-fragrance skin scent design',
      keywords: 'K-fragrance, Korean perfume, skin scent, quiet fragrance, Tamburins, Nonfiction, ambroxan, white musk',
      category: 'Olfactory Science',
    },
    'pistachio-fragrance-note': {
      title: "Pistachio Is Up 852%. Here's Why Your Nose Can't Resist It.",
      description: "Pistachio is 2026's breakout fragrance note. The molecular science behind lactones, pyrazines, and benzaldehyde — and what separates a great pistachio perfume from a bad one.",
      datePublished: '2026-05-03',
      dateModified: '2026-05-03',
      image: 'https://images.unsplash.com/photo-1502825751399-28baa9b81efe?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Pistachios representing the trending pistachio fragrance note',
      keywords: 'pistachio fragrance, pistachio perfume, gourmand fragrance, lactone, pyrazine, fragrance trends 2026',
      category: 'Olfactory Science',
    },
    'fragrance-wardrobing': {
      title: "Your Brain Stops Smelling Your Perfume After 20 Minutes. Science Says Stop Fighting It.",
      description: "Olfactory habituation is why you can't smell your own perfume. The neuroscience behind fragrance fatigue — and why rotating scents like a wardrobe is the fix.",
      datePublished: '2026-05-03',
      dateModified: '2026-05-03',
      image: 'https://images.unsplash.com/photo-1615634260830-85d92cd1b769?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Perfume bottle collection representing fragrance wardrobing',
      keywords: 'olfactory habituation, fragrance fatigue, fragrance wardrobing, perfume rotation, signature scent',
      category: 'Olfactory Science',
    },
    'postbiotics-skin-barrier': {
      title: "The Bacteria That Aren't Alive Anymore Are Still Fixing Your Skin.",
      description: "Postbiotics — the bioactive byproducts of fermentation — strengthen the skin barrier without requiring live cultures. K-beauty has used them for decades as bifida ferment and lactobacillus filtrate.",
      datePublished: '2026-05-01',
      dateModified: '2026-05-01',
      image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Fermentation flasks representing postbiotic skincare science',
      keywords: 'postbiotics, skin barrier, bifida ferment, lactobacillus, fermentation, K-beauty, microbiome',
      category: 'Nutritional Intelligence',
    },
    'pdrn-salmon-dna': {
      title: "Korean Dermatologists Have Been Injecting Salmon DNA for Decades. Now It's in Your Serum.",
      description: "PDRN — Polydeoxyribonucleotide — is a DNA fragment from salmon that activates A2A adenosine receptors, triggering collagen repair. Used in Korean clinics for decades, topical delivery has finally caught up.",
      datePublished: '2026-05-01',
      dateModified: '2026-05-01',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Skincare serum bottle representing PDRN and regenerative skincare science',
      keywords: 'PDRN, polydeoxyribonucleotide, salmon DNA, collagen, regenerative skincare, K-beauty, adenosine receptor',
      category: 'Molecular Insights',
    },
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
      var title = "ana2me — Know What's In Your Bottle";
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
      var title = 'Ingredient Analyzer | ana2me';
      var desc = 'Paste any skincare, supplement, or wellness ingredient list and get a plain-language breakdown of what works for your body — powered by molecular data.';
      var url = BASE_URL + '/';
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
