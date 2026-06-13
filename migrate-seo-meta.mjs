// migrate-seo-meta.mjs — Backfill SEO metadata from seo.js ARTICLE_META into Supabase
// Run: node migrate-seo-meta.mjs

const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';

// Hardcoded ARTICLE_META from seo.js (the data we're migrating OUT of seo.js)
const ARTICLE_META = {
  'ten-step-routine-dead': {
    title: "The 10-Step Routine Is Dead. Korean Dermatologists Now Say 3 Steps Is Enough.",
    description: "67% of Korean women aged 20-35 use five or fewer products daily. The 10-step routine was a Western invention. Korean dermatologists now recommend cleanse, treat, moisturize.",
    datePublished: '2026-05-04', dateModified: '2026-05-04',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Minimalist skincare products representing simplified Korean skincare routine',
    keywords: '10 step routine, K-beauty, minimalist skincare, Korean dermatologist, 3 step routine, skin barrier',
    category: 'Molecular Insights', tag: 'skincare', wordCount: 900,
  },
  'celebrity-skincare-methods': {
    title: "Song Hye-kyo Washes Her Face with Milk. Suzy Does \"424.\" Which Celebrity Methods Actually Work?",
    description: "Korean celebrity skincare methods go viral constantly. We asked dermatologists which ones are backed by science — milk rinses, timed cleansing, heated palm absorption.",
    datePublished: '2026-05-04', dateModified: '2026-05-04',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Korean skincare products and beauty routine items',
    keywords: 'Song Hye-kyo, Suzy, 424 method, milk rinse, Korean celebrity skincare, lactic acid, double cleansing',
    category: 'Molecular Insights', tag: 'skincare', wordCount: 1000,
  },
  'jjimjilbang-wellness-science': {
    title: "Jjimjilbangs Are Going Global. The Science Behind Korea's Oldest Wellness Ritual.",
    description: "Korean bathhouses are driving a global wellness tourism boom. Hot-cold contrast therapy creates a vascular pump effect, lowers cortisol, and supports growth hormone levels.",
    datePublished: '2026-05-04', dateModified: '2026-05-04',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Steam rising from a hot bath representing Korean jjimjilbang culture',
    keywords: 'jjimjilbang, Korean bathhouse, contrast therapy, cortisol, cold plunge, sauna, wellness tourism',
    category: 'Nutritional Intelligence', tag: 'wellness', wordCount: 850,
  },
  'korea-sleep-crisis': {
    title: "Korea Sleeps Less Than Almost Any Country on Earth. It Built an \u20A911 Trillion Industry to Fix It.",
    description: "Korea's sleep market exploded from \u20A9500B to \u20A911T in a decade. Plant-based melatonin, GABA gummies, sleep skincare — the OECD's worst sleepers are buying solutions.",
    datePublished: '2026-05-04', dateModified: '2026-05-04',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Person sleeping peacefully representing Korean sleep wellness industry',
    keywords: 'Korea sleep, melatonin, GABA, Olive Young, sleep market, insomnia, plant melatonin, sleep supplement',
    category: 'Nutritional Intelligence', tag: 'wellness', wordCount: 950,
  },
  'creatine-women-brain': {
    title: "Creatine Isn't Just for Gym Bros. Women Are Taking It for Their Brains Now.",
    description: "Research has examined creatine's role in brain ATP production, cognitive fatigue during PMS, and menopause-related brain fog. Searches for 'creatine for women' are up 123%.",
    datePublished: '2026-05-04', dateModified: '2026-05-04',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Woman exercising representing creatine supplementation for women',
    keywords: 'creatine, women, brain, ATP, cognitive, PMS, menopause, supplement, monohydrate',
    category: 'Nutritional Intelligence', tag: 'wellness', wordCount: 900,
  },
  'milk-perfume-lactonic': {
    title: "Milk Perfume Is 2026's Defining Scent. Here's the Chemistry Behind \"Soft.\"",
    description: "Lactonic fragrances are built from cyclic ester molecules — gamma-decalactone, delta-decalactone — that your brain reads as creamy warmth. The science of comfort in a bottle.",
    datePublished: '2026-05-04', dateModified: '2026-05-04',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Warm creamy milk representing lactonic fragrance notes',
    keywords: 'milk perfume, lactonic, lactone, gamma-decalactone, delta-decalactone, fragrance trend 2026, comfort scent',
    category: 'Olfactory Science', tag: 'fragrance', wordCount: 850,
  },
  'tropical-fruit-fragrance': {
    title: "Tropical Fruit Notes Are Up 1,200%. Your Nose Is Craving Something Feral.",
    description: "Guava, passionfruit, and watermelon searches surged 1,200% in fragrance. Volatile sulfur compounds in tropical fruits trigger intense neurological responses clean musks can't match.",
    datePublished: '2026-05-04', dateModified: '2026-05-04',
    image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Colorful tropical fruits including passionfruit and mango',
    keywords: 'tropical fruit, fragrance, guava, passionfruit, sulfur compounds, gourmand, fragrance trends 2026',
    category: 'Olfactory Science', tag: 'fragrance', wordCount: 850,
  },
  'centella-superbug-discovery': {
    title: "The \"Cica\" Ingredient in Every K-Beauty Cream Just Got a Radical New Superpower.",
    description: "Research has examined madecassic acid — the compound behind every cica cream — for its effects on antibiotic-resistant bacteria, targeting a protein humans don't have.",
    datePublished: '2026-05-04', dateModified: '2026-05-04',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Laboratory science equipment representing centella asiatica research',
    keywords: 'centella asiatica, cica, madecassic acid, antibiotic resistance, K-beauty',
    category: 'Molecular Insights', tag: 'skincare', wordCount: 1000,
  },
  'spicules-microneedling': {
    title: "\"Microneedling in a Bottle\" Is K-Beauty's Most Controversial New Ingredient.",
    description: "Spicules are marine sponge micro-needles that create channels in skin for deeper active ingredient penetration. How they work, how they compare, and who should use them.",
    datePublished: '2026-05-03', dateModified: '2026-05-03',
    image: 'https://images.unsplash.com/photo-1695479044464-67299fa84782?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Skincare serum bottle representing spicule microneedling trend',
    keywords: 'spicules, microneedling, K-beauty, liquid microneedling, skincare 2026, marine sponge',
    category: 'Molecular Insights', tag: 'skincare', wordCount: 1100,
  },
  'myo-inositol-hormonal-health': {
    title: "Myo-Inositol Is Quietly Becoming the Most Important Women's Wellness Supplement.",
    description: "Research has examined myo-inositol's role in insulin signaling — linked to PCOS, hormonal skin concerns, and ovulation. The 40:1 ratio and what to look for on a label.",
    datePublished: '2026-05-03', dateModified: '2026-05-03',
    image: 'https://images.unsplash.com/photo-1596572934426-52ac4e95e014?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Supplement capsules for women hormonal wellness',
    keywords: 'myo-inositol, PCOS, hormonal wellness, insulin, women wellness, D-chiro-inositol, 40:1 ratio',
    category: 'Nutritional Intelligence', tag: 'wellness', wordCount: 1200,
  },
  'edible-skincare-gut-skin': {
    title: "Korea Is Eating Its Skincare Now. The Gut-Skin Science Says They're Right.",
    description: "Olive Young's inner beauty category grew 55%. The gut-skin axis explains why — gut bacteria produce molecules associated with skin comfort, sebum balance, and barrier function.",
    datePublished: '2026-05-03', dateModified: '2026-05-03',
    image: 'https://images.unsplash.com/photo-1620755901989-0f457a38011e?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Wellness supplement jars for gut-skin health',
    keywords: 'edible skincare, inner beauty, gut-skin axis, probiotics, collagen, K-beauty supplements, Olive Young',
    category: 'Nutritional Intelligence', tag: 'wellness', wordCount: 1100,
  },
  'k-fragrance-skin-scents': {
    title: "K-Fragrance Just Hit Record Exports. Here's the Molecular Reason Korean Perfume Smells Different.",
    description: "K-fragrance exports hit $6.52M in January 2026. The secret isn't marketing — it's a fundamentally different approach to scent design built on synthetic musks and sheer woods.",
    datePublished: '2026-05-01', dateModified: '2026-05-01',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Minimal perfume bottles representing K-fragrance skin scent design',
    keywords: 'K-fragrance, Korean perfume, skin scent, quiet fragrance, Tamburins, Nonfiction, ambroxan, white musk',
    category: 'Olfactory Science', tag: 'fragrance', wordCount: 1100,
  },
  'pistachio-fragrance-note': {
    title: "Pistachio Is Up 852%. Here's Why Your Nose Can't Resist It.",
    description: "Pistachio is 2026's breakout fragrance note. The molecular science behind lactones, pyrazines, and benzaldehyde — and what separates a great pistachio perfume from a bad one.",
    datePublished: '2026-05-01', dateModified: '2026-05-01',
    image: 'https://images.unsplash.com/photo-1502825751399-28baa9b81efe?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Pistachios representing the trending pistachio fragrance note',
    keywords: 'pistachio fragrance, pistachio perfume, gourmand fragrance, lactone, pyrazine, fragrance trends 2026',
    category: 'Olfactory Science', tag: 'fragrance', wordCount: 1000,
  },
  'fragrance-wardrobing': {
    title: "Your Brain Stops Smelling Your Perfume After 20 Minutes. Science Says Stop Fighting It.",
    description: "Olfactory habituation is why you can't smell your own perfume. The neuroscience behind fragrance fatigue — and why rotating scents like a wardrobe is the fix.",
    datePublished: '2026-05-01', dateModified: '2026-05-01',
    image: 'https://images.unsplash.com/photo-1615634260830-85d92cd1b769?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Perfume bottle collection representing fragrance wardrobing',
    keywords: 'olfactory habituation, fragrance fatigue, fragrance wardrobing, perfume rotation, signature scent',
    category: 'Olfactory Science', tag: 'fragrance', wordCount: 900,
  },
  'postbiotics-skin-barrier': {
    title: "Probiotics Were Just the Beginning. Postbiotics Are What Your Skin Barrier Actually Needs.",
    description: "Postbiotics — the bioactive byproducts of fermentation — support the skin barrier without requiring live cultures. K-beauty has used them for decades.",
    datePublished: '2026-05-01', dateModified: '2026-05-01',
    image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Fermentation flasks representing postbiotic skincare science',
    keywords: 'postbiotics, skin barrier, bifida ferment, lactobacillus, fermentation, K-beauty, microbiome',
    category: 'Nutritional Intelligence', tag: 'wellness', wordCount: 1000,
  },
  'pdrn-salmon-dna': {
    title: "Korean Dermatologists Have Been Injecting Salmon DNA for Decades. Now It's in Your Serum.",
    description: "PDRN is a DNA fragment from salmon associated with skin firmness. Used in Korean clinics for decades, topical delivery has finally caught up.",
    datePublished: '2026-05-01', dateModified: '2026-05-01',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Skincare serum bottle representing PDRN skincare science',
    keywords: 'PDRN, polydeoxyribonucleotide, salmon DNA, skincare, K-beauty, adenosine',
    category: 'Molecular Insights', tag: 'skincare', wordCount: 1100,
  },
  'skin-barrier-2026': {
    title: "Your Skin Barrier Is Leaking. Here's What 2026 Science Says to Do About It.",
    description: "Ceramides, fatty acids, and pH balance are the holy trinity of skin barrier health. Modern environments are challenging all three simultaneously.",
    datePublished: '2026-04-01', dateModified: '2026-04-01',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Skincare serums and moisturizer bottles representing ceramide and skin barrier support',
    keywords: 'skin barrier, ceramides, fatty acids, pH balance, TEWL, bifida ferment lysate',
    category: 'Molecular Insights', tag: 'skincare', wordCount: 1000,
  },
  'fragrance-volatility': {
    title: 'Why Your Perfume Smells Different on You Than in the Bottle.',
    description: "The same perfume smells different on everyone. Molecular weight, vapor pressure, and skin hydration each determine when a note surfaces and how long it stays.",
    datePublished: '2026-03-15', dateModified: '2026-03-15',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Glass perfume bottle on a reflective surface, illustrating molecular volatility',
    keywords: 'perfume, fragrance volatility, top notes, base notes, vapor pressure, molecular weight',
    category: 'Olfactory Science', tag: 'fragrance', wordCount: 900,
  },
  'adaptogens-bioavailability': {
    title: "You're Probably Wasting Your Adaptogens. Delivery Matters More Than Dosage.",
    description: "Ashwagandha, Lion's Mane, Reishi — raw powder bioavailability sits below 10%. Fermentation, lipid encapsulation, and dual extraction change everything.",
    datePublished: '2026-03-15', dateModified: '2026-03-15',
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Mushrooms, herbs, and wellness supplement ingredients representing adaptogen bioavailability',
    keywords: 'adaptogens, bioavailability, ashwagandha, lions mane, reishi, liposomal delivery, fermentation',
    category: 'Nutritional Intelligence', tag: 'wellness', wordCount: 1100,
  },
  'fermentation-transformation': {
    title: "Galactomyces Started in a Sake Brewery. Now It's One of Skincare's Most Studied Actives.",
    description: "Galactomyces was discovered by accident. Bifida Ferment Lysate was reverse-engineered from infant skin. Fermentation creates entirely new compounds.",
    datePublished: '2026-02-01', dateModified: '2026-02-01',
    image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Fermentation laboratory setup with glass flasks, representing skincare fermentation science',
    keywords: 'galactomyces, fermentation, bifida ferment lysate, lactobacillus, skincare actives, postbiotics',
    category: 'Fermentation Science', tag: 'skincare', wordCount: 1200,
  },
};

async function backfill() {
  let success = 0, fail = 0, skip = 0;
  const ids = Object.keys(ARTICLE_META);
  console.log(`Backfilling ${ids.length} articles...`);

  for (const id of ids) {
    const m = ARTICLE_META[id];
    const body = {
      meta_title: m.title,
      meta_description: m.description,
      og_image: m.image,
      og_image_alt: m.imageAlt,
      seo_keywords: m.keywords,
      word_count: m.wordCount || null,
      date_published: m.datePublished,
      date_modified: m.dateModified,
      seo_category: m.category,
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/articles?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        console.log(`  ✓ ${id}`);
        success++;
      } else {
        const err = await res.text();
        console.log(`  ✗ ${id}: ${res.status} ${err}`);
        fail++;
      }
    } catch (e) {
      console.log(`  ✗ ${id}: ${e.message}`);
      fail++;
    }
  }

  console.log(`\nDone: ${success} updated, ${fail} failed, ${skip} skipped`);
}

backfill();
