// ── Hardcoded safety lists for pasted ingredient matching ──
export var EU26_ALLERGENS = new Set([
  'limonene','linalool','citronellol','geraniol','citral','eugenol','coumarin',
  'benzyl alcohol','benzyl salicylate','benzyl benzoate','benzyl cinnamate',
  'cinnamal','cinnamyl alcohol','farnesol','hexyl cinnamal','hydroxycitronellal',
  'hydroxyisohexyl 3-cyclohexene carboxaldehyde','isoeugenol','butylphenyl methylpropional',
  'alpha-isomethyl ionone','amyl cinnamal','amylcinnamyl alcohol','anise alcohol',
  'evernia prunastri extract','evernia furfuracea extract','methyl 2-octynoate'
].map(function(s) { return s.toLowerCase(); }));

export var ESSENTIAL_OILS = new Set([
  'tea tree oil','melaleuca alternifolia leaf oil','lavender oil','lavandula angustifolia oil',
  'peppermint oil','mentha piperita oil','eucalyptus oil','eucalyptus globulus leaf oil',
  'rosemary oil','rosmarinus officinalis leaf oil','lemon oil','citrus limon peel oil',
  'orange oil','citrus aurantium dulcis peel oil','bergamot oil','citrus aurantium bergamia fruit oil',
  'ylang ylang oil','cananga odorata flower oil','clove oil','eugenia caryophyllus bud oil',
  'cinnamon oil','cinnamomum zeylanicum bark oil','thyme oil','thymus vulgaris oil',
  'geranium oil','pelargonium graveolens oil','chamomile oil','anthemis nobilis flower oil'
].map(function(s) { return s.toLowerCase(); }));

export var KNOWN_SENSITIZERS = new Set([
  'methylisothiazolinone','methylchloroisothiazolinone','dmdm hydantoin',
  'imidazolidinyl urea','diazolidinyl urea','quaternium-15','bronopol',
  'sodium lauryl sulfate','sls','alcohol denat','alcohol denat.',
  'hydroquinone','benzoyl peroxide','formaldehyde','2-bromo-2-nitropropane-1,3-diol'
].map(function(s) { return s.toLowerCase(); }));

// ── Potent actives list (high-strength ingredients that can irritate) ──
export var POTENT_ACTIVES = new Set(['retinol', 'retinal', 'tretinoin', 'glycolic acid', 'salicylic acid',
  'lactic acid', 'mandelic acid', 'l-ascorbic acid', 'ascorbic acid', 'benzoyl peroxide', 'hydroquinone']);

// ── Check if ingredient is a compound containing a flagged component ──
export function getFlaggedComponent(ing) {
  if (ing.contains_flagged_component && ing.flagged_component_reasons) {
    var reasons = ing.flagged_component_reasons;
    if (Array.isArray(reasons) && reasons.length > 0) return reasons[0];
    if (typeof reasons === 'string') return reasons;
  }
  // Heuristic: check if name contains known irritant substrings
  var n = (ing.name || '').toLowerCase();
  if (/tea\s*tree|melaleuca/.test(n)) return 'Tea Tree';
  if (/lavender|lavandula/.test(n)) return 'Lavender';
  if (/eucalyptus/.test(n)) return 'Eucalyptus';
  if (/peppermint|mentha/.test(n)) return 'Peppermint';
  if (/citrus|lemon|orange|bergamot|lime/.test(n) && /oil|peel/.test(n)) return 'Citrus Oil';
  return null;
}

// ── Match parsed ingredients against catalog + MFDS + hardcoded lists ──
export function matchParsedIngredients(names, catalogIngredients, mfdsLookupEn, mfdsLookupKo) {
  // Build lookup maps from active catalog (189 ingredients)
  var byNameEn = {};
  var byNameKo = {};
  catalogIngredients.forEach(function(ing) {
    byNameEn[ing.name.toLowerCase().replace(/[\s\-]+/g, ' ').trim()] = ing;
    if (ing.name_ko) byNameKo[ing.name_ko.toLowerCase().replace(/[\s\-]+/g, ' ').trim()] = ing;
  });

  return names.map(function(rawName, idx) {
    var norm = rawName.toLowerCase().replace(/[\s\-]+/g, ' ').trim();

    // Tier A: Match against active catalog (full metadata)
    if (byNameEn[norm]) {
      var ing = byNameEn[norm];
      return { product_id: '__pasted__', ingredient_id: ing.id, sort_order: idx + 1, is_hero: false,
        ingredient: ing, matched: true, matchTier: 'catalog' };
    }
    if (byNameKo[norm]) {
      var ing = byNameKo[norm];
      return { product_id: '__pasted__', ingredient_id: ing.id, sort_order: idx + 1, is_hero: false,
        ingredient: ing, matched: true, matchTier: 'catalog' };
    }

    // Tier B: Match against MFDS reference (21K, gives canonical names)
    var mfdsMatch = (mfdsLookupEn && mfdsLookupEn[norm]) || (mfdsLookupKo && mfdsLookupKo[norm]);
    if (mfdsMatch) {
      var inciName = mfdsMatch.inci_name || rawName;
      var koName = mfdsMatch.standard_name_ko || rawName;
      // Check hardcoded lists for flagging even though it's MFDS-recognized
      var inciNorm = inciName.toLowerCase().replace(/[\s\-]+/g, ' ').trim();
      var flagType = null, isSensitizer = false, isEu26 = false, isEO = false, irritRisk = 'low';
      if (EU26_ALLERGENS.has(inciNorm) || EU26_ALLERGENS.has(norm)) { isEu26 = true; flagType = 'eu26'; irritRisk = 'medium'; }
      else if (ESSENTIAL_OILS.has(inciNorm) || ESSENTIAL_OILS.has(norm)) { isEO = true; flagType = 'essential-oil'; irritRisk = 'medium'; }
      else if (KNOWN_SENSITIZERS.has(inciNorm) || KNOWN_SENSITIZERS.has(norm)) { isSensitizer = true; flagType = 'sensitizer'; irritRisk = 'high'; }

      return {
        product_id: '__pasted__', ingredient_id: 'mfds-' + idx, sort_order: idx + 1, is_hero: false,
        ingredient: {
          id: 'mfds-' + idx, name: inciName, name_ko: koName,
          symbol: inciName.substring(0, 2).toUpperCase(),
          category: flagType ? (isEO ? 'essential-oil' : isEu26 ? 'fragrance-allergen' : 'active') : 'uncategorized',
          description: null, description_ko: null, science: null, science_ko: null,
          is_known_sensitizer: isSensitizer, is_eu_26_fragrance_allergen: isEu26,
          is_essential_oil: isEO, irritation_risk: irritRisk
        },
        matched: true, matchTier: 'mfds', mfdsEntry: mfdsMatch
      };
    }

    // Tier C: Hardcoded safety lists only
    var flagType = null, isSensitizer = false, isEu26 = false, isEO = false, irritRisk = 'low';
    if (EU26_ALLERGENS.has(norm)) { isEu26 = true; flagType = 'eu26'; irritRisk = 'medium'; }
    else if (ESSENTIAL_OILS.has(norm)) { isEO = true; flagType = 'essential-oil'; irritRisk = 'medium'; }
    else if (KNOWN_SENSITIZERS.has(norm)) { isSensitizer = true; flagType = 'sensitizer'; irritRisk = 'high'; }

    return {
      product_id: '__pasted__', ingredient_id: 'pasted-' + idx, sort_order: idx + 1, is_hero: false,
      ingredient: {
        id: 'pasted-' + idx, name: rawName, name_ko: rawName, symbol: rawName.substring(0, 2).toUpperCase(),
        category: flagType ? (isEO ? 'essential-oil' : isEu26 ? 'fragrance-allergen' : 'active') : 'uncategorized',
        description: null, description_ko: null, science: null, science_ko: null,
        is_known_sensitizer: isSensitizer, is_eu_26_fragrance_allergen: isEu26,
        is_essential_oil: isEO, irritation_risk: irritRisk
      },
      matched: false, matchTier: flagType ? 'hardcoded' : 'unknown'
    };
  });
}
