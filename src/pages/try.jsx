// ── Hardcoded safety lists for pasted ingredient matching ──
var EU26_ALLERGENS = new Set([
  'limonene','linalool','citronellol','geraniol','citral','eugenol','coumarin',
  'benzyl alcohol','benzyl salicylate','benzyl benzoate','benzyl cinnamate',
  'cinnamal','cinnamyl alcohol','farnesol','hexyl cinnamal','hydroxycitronellal',
  'hydroxyisohexyl 3-cyclohexene carboxaldehyde','isoeugenol','butylphenyl methylpropional',
  'alpha-isomethyl ionone','amyl cinnamal','amylcinnamyl alcohol','anise alcohol',
  'evernia prunastri extract','evernia furfuracea extract','methyl 2-octynoate'
].map(function(s) { return s.toLowerCase(); }));

var ESSENTIAL_OILS = new Set([
  'tea tree oil','melaleuca alternifolia leaf oil','lavender oil','lavandula angustifolia oil',
  'peppermint oil','mentha piperita oil','eucalyptus oil','eucalyptus globulus leaf oil',
  'rosemary oil','rosmarinus officinalis leaf oil','lemon oil','citrus limon peel oil',
  'orange oil','citrus aurantium dulcis peel oil','bergamot oil','citrus aurantium bergamia fruit oil',
  'ylang ylang oil','cananga odorata flower oil','clove oil','eugenia caryophyllus bud oil',
  'cinnamon oil','cinnamomum zeylanicum bark oil','thyme oil','thymus vulgaris oil',
  'geranium oil','pelargonium graveolens oil','chamomile oil','anthemis nobilis flower oil'
].map(function(s) { return s.toLowerCase(); }));

var KNOWN_SENSITIZERS = new Set([
  'methylisothiazolinone','methylchloroisothiazolinone','dmdm hydantoin',
  'imidazolidinyl urea','diazolidinyl urea','quaternium-15','bronopol',
  'sodium lauryl sulfate','sls','alcohol denat','alcohol denat.',
  'hydroquinone','benzoyl peroxide','formaldehyde','2-bromo-2-nitropropane-1,3-diol'
].map(function(s) { return s.toLowerCase(); }));

// ── Build known-ingredient name sets for freeform matching ──
var _knownNames = null; // sorted longest-first array of { norm, display }
function getKnownNames(catalogIngredients) {
  if (_knownNames) return _knownNames;
  var nameMap = {}; // norm -> display
  // Hardcoded safety lists
  [EU26_ALLERGENS, ESSENTIAL_OILS, KNOWN_SENSITIZERS].forEach(function(s) {
    s.forEach(function(n) { if (!nameMap[n]) nameMap[n] = n; });
  });
  // MFDS reference
  if (_mfdsLookupEn) Object.keys(_mfdsLookupEn).forEach(function(k) {
    if (!nameMap[k]) nameMap[k] = _mfdsLookupEn[k].inci_name || k;
  });
  if (_mfdsLookupKo) Object.keys(_mfdsLookupKo).forEach(function(k) {
    if (!nameMap[k]) nameMap[k] = _mfdsLookupKo[k].standard_name_ko || k;
  });
  // Active catalog
  if (catalogIngredients) catalogIngredients.forEach(function(ing) {
    var enNorm = (ing.name || '').toLowerCase().replace(/[\s\-]+/g, ' ').trim();
    if (enNorm && !nameMap[enNorm]) nameMap[enNorm] = ing.name;
    var koNorm = (ing.name_ko || '').toLowerCase().replace(/[\s\-]+/g, ' ').trim();
    if (koNorm && !nameMap[koNorm]) nameMap[koNorm] = ing.name_ko;
  });
  // Sort longest-first for greedy matching
  _knownNames = Object.keys(nameMap).map(function(norm) {
    return { norm: norm, display: nameMap[norm] };
  }).sort(function(a, b) { return b.norm.length - a.norm.length; });
  return _knownNames;
}

// ── Freeform parser: longest-match-first against known ingredients ──
function parseFreeformIngredients(text, catalogIngredients) {
  var known = getKnownNames(catalogIngredients);
  var input = text.toLowerCase().replace(/[\s\-]+/g, ' ').trim();
  var results = [];
  var seen = new Set();
  var pos = 0;
  while (pos < input.length) {
    // Skip whitespace
    if (input[pos] === ' ') { pos++; continue; }
    var matched = false;
    for (var i = 0; i < known.length; i++) {
      var n = known[i].norm;
      if (input.substring(pos, pos + n.length) === n) {
        // Ensure word boundary (not mid-word)
        var afterEnd = pos + n.length;
        if (afterEnd < input.length && /[a-z0-9]/.test(input[afterEnd])) continue;
        if (!seen.has(n)) {
          seen.add(n);
          results.push({ name: known[i].display, recognized: true });
        }
        pos = afterEnd;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Collect unrecognized chunk until next known match or end
      var start = pos;
      pos++;
      while (pos < input.length) {
        if (input[pos] === ' ') {
          // Check if anything starting at next word matches
          var nextWord = pos + 1;
          var foundNext = false;
          for (var j = 0; j < known.length; j++) {
            if (input.substring(nextWord, nextWord + known[j].norm.length) === known[j].norm) {
              foundNext = true; break;
            }
          }
          if (foundNext) break;
        }
        pos++;
      }
      var chunk = text.substring(start, pos).trim();
      if (chunk && !seen.has(chunk.toLowerCase().replace(/[\s\-]+/g, ' ').trim())) {
        seen.add(chunk.toLowerCase().replace(/[\s\-]+/g, ' ').trim());
        results.push({ name: chunk, recognized: false });
      }
    }
  }
  return results;
}

// ── Parse pasted ingredient list ──
function parseIngredientList(text, catalogIngredients) {
  if (!text || !text.trim()) return [];
  // Strip leading labels
  var cleaned = text.replace(/^(전성분\s*[:：]?|ingredients?\s*[:：]?|성분\s*[:：]?|full\s+ingredients?\s*[:：]?)/i, '').trim();

  // Detect if input has standard delimiters
  var hasDelimiters = /[,\n\u00B7\uFF1B]/.test(cleaned);

  if (hasDelimiters) {
    // Delimited path — split normally
    var preserved = cleaned.replace(/(\d),(\d)/g, '$1\u00A7$2');
    var tokens = preserved.split(/[,\n\u00B7\uFF1B]+/).map(function(t) { return t.replace(/\u00A7/g, ','); });
    var seen = new Set();
    return tokens.map(function(tok) {
      var t = tok.trim();
      if (!t) return null;
      t = t.replace(/\s*[\(\[]\s*\d+[\d.]*\s*%?\s*[\)\]]\s*$/, '').trim();
      t = t.replace(/^\d+[\.\)]\s*/, '').trim();
      if (!t) return null;
      var key = t.toLowerCase().replace(/[\s\-]+/g, ' ').trim();
      if (seen.has(key)) return null;
      seen.add(key);
      return { name: t, recognized: true };
    }).filter(Boolean);
  } else {
    // Freeform path — longest-match-first
    return parseFreeformIngredients(cleaned, catalogIngredients);
  }
}

// ── MFDS reference cache (loaded from Supabase on first paste) ──
var _mfdsCache = null;
var _mfdsLookupEn = null;
var _mfdsLookupKo = null;
var SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';

async function loadMfdsCache() {
  if (_mfdsCache) return;
  try {
    // Fetch all 21K rows from mfds_ingredient_reference
    var allRows = [];
    var limit = 1000;
    var offset = 0;
    while (true) {
      var res = await fetch('https://hkyfggapijgedsizfqec.supabase.co/rest/v1/mfds_ingredient_reference?select=standard_name_ko,inci_name,alternate_names_json&limit=' + limit + '&offset=' + offset, {
        headers: { apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY }
      });
      var batch = await res.json();
      allRows = allRows.concat(batch);
      if (batch.length < limit) break;
      offset += limit;
    }
    _mfdsCache = allRows;
    _mfdsLookupEn = {};
    _mfdsLookupKo = {};
    allRows.forEach(function(entry) {
      if (entry.standard_name_ko) {
        var koKey = entry.standard_name_ko.toLowerCase().replace(/[\s\-]+/g, ' ').trim();
        _mfdsLookupKo[koKey] = entry;
      }
      if (entry.inci_name) {
        var enKey = entry.inci_name.toLowerCase().replace(/[\s\-]+/g, ' ').trim();
        if (enKey) _mfdsLookupEn[enKey] = entry;
      }
      if (entry.alternate_names_json && Array.isArray(entry.alternate_names_json)) {
        entry.alternate_names_json.forEach(function(syn) {
          var synKey = syn.toLowerCase().replace(/[\s\-]+/g, ' ').trim();
          if (synKey) _mfdsLookupKo[synKey] = entry;
        });
      }
    });
    console.log('MFDS cache loaded:', allRows.length, 'ingredients');
  } catch (e) {
    console.warn('MFDS cache not available:', e);
    _mfdsCache = [];
    _mfdsLookupEn = {};
    _mfdsLookupKo = {};
  }
}

// ── Match parsed ingredients against catalog + MFDS + hardcoded lists ──
function matchParsedIngredients(names, catalogIngredients) {
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
    var mfdsMatch = (_mfdsLookupEn && _mfdsLookupEn[norm]) || (_mfdsLookupKo && _mfdsLookupKo[norm]);
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

// Analyze — Ingredient Pattern Analysis (no login, no persistence)
// Mode 1: single-product breakdown | Mode 2: comparative pattern analysis
window.Try = function Try({ lang, products, setView, setProduct }) {
  const t = useL(lang);
  const isKo = lang === 'ko';
  const [works, setWorks] = useState([]);     // Array of { id, name, ... } OR { id: 'pasted-X', name, _pasted: true, _rawIngredients: [...] }
  const [doesnt, setDoesnt] = useState([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selIng, setSelIng] = useState(null);
  const [expandedProducts, setExpandedProducts] = useState([]);
  const [catalogIngs, setCatalogIngs] = useState(null);
  var pastedCounter = useRef(0);
  var autoAnalyze = useRef(false);
  const resultsRef = useRef(null);
  useEffect(function() {
    if (result && resultsRef.current) {
      setTimeout(function() {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [result]);

  useEffect(function() {
    if (autoAnalyze.current && works.length + doesnt.length > 0) {
      autoAnalyze.current = false;
      runAnalysis();
    }
  }, [works, doesnt]);

  const [pasteMode, setPasteMode] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [pasteConfirm, setPasteConfirm] = useState(null); // { chips: [{name, recognized}], addText: '' }
  const [pasteConfirmAdd, setPasteConfirmAdd] = useState('');
  const MAX_PER_SIDE = 3;
  const allSelected = [...works, ...doesnt].map(function(p) { return p.id; });
  const totalCount = works.length + doesnt.length;
  const canAnalyze = totalCount >= 1;
  const isSingleMode = totalCount === 1;
  var singleProduct = isSingleMode ? (works[0] || doesnt[0]) : null;
  var singleIsWorks = isSingleMode && works.length === 1;

  async function submitPasteToConfirm() {
    // Ensure caches are loaded for freeform matching
    await loadMfdsCache();
    var catalog = catalogIngs;
    if (!catalog) {
      var res = await fetch('https://hkyfggapijgedsizfqec.supabase.co/rest/v1/ingredients?select=*&limit=1000', {
        headers: { apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY }
      });
      catalog = await res.json();
      setCatalogIngs(catalog);
    }
    _knownNames = null; // Reset so it rebuilds with fresh data
    var parsed = parseIngredientList(pasteText, catalog);
    if (parsed.length === 0) return;
    setPasteConfirm(parsed);
    setPasteConfirmAdd('');
  }

  function confirmPasteRemoveChip(idx) {
    setPasteConfirm(function(prev) { return prev.filter(function(_, i) { return i !== idx; }); });
  }

  function confirmPasteAddChip() {
    var name = pasteConfirmAdd.trim();
    if (!name) return;
    setPasteConfirm(function(prev) { return prev.concat([{ name: name, recognized: false }]); });
    setPasteConfirmAdd('');
  }

  function confirmPasteFinalize(targetSetter) {
    if (!pasteConfirm || pasteConfirm.length === 0) return;
    var names = pasteConfirm.map(function(c) { return c.name; });
    pastedCounter.current++;
    var pastedId = 'pasted-' + pastedCounter.current;
    var entry = {
      id: pastedId,
      name: t('Pasted product \u00B7 ' + names.length + ' ingredients', '붙여넣기 제품 \u00B7 ' + names.length + '개 성분'),
      nameKo: '붙여넣기 제품 \u00B7 ' + names.length + '개 성분',
      brand: '',
      imageUrl: null,
      _pasted: true,
      _rawIngredients: names
    };
    (targetSetter || setWorks)(function(prev) { return prev.concat([entry]); });
    setPasteText('');
    setPasteMode(false);
    setPasteConfirm(null);
    setPasteConfirmAdd('');
    setResult(null); setError(null);
    autoAnalyze.current = true;
  }

  // Confidence level based on input counts
  function getConfidenceLevel() {
    if (isSingleMode) return 'single';
    var w = works.length, d = doesnt.length;
    if (w >= 3 && d >= 3) return 'high';
    if (w >= 2 && d >= 2) return 'medium';
    return 'low';
  }

  // ── MFDS banned-phrase checker ──
  var BANNED_RE = /\b(heal|healing|heals|treat|treats|cure|cures|regenerate|regenerates|regeneration|anti-inflammatory|antibacterial|antimicrobial|calms?\s+inflammation|reduces?\s+inflammation|accelerates?\s+cell\s+turnover|stimulates?\s+collagen|boosts?\s+collagen|activates?\s+receptor|triggers?\s+\w+\s+process|inhibits?\s+\w+|eczema|psoriasis|rosacea|dermatitis|dermatologist-recommended|derma-grade|clinic-grade|medical-grade|hospital-grade|post-procedure|safe\s+for\s+infants|broken\s+skin|wound\s+healing|allergic\s+reaction)\b/gi;

  function mfdsSafe(str) {
    if (!str) return str;
    return str.replace(BANNED_RE, function(match) {
      var lower = match.toLowerCase();
      if (/heal|healing|heals/.test(lower)) return 'soothe';
      if (/treat|treats/.test(lower)) return 'support';
      if (/cure|cures/.test(lower)) return 'support';
      if (/anti-inflammatory/.test(lower)) return 'soothing';
      if (/antibacterial|antimicrobial/.test(lower)) return 'clarifying';
      if (/inflammation/.test(lower)) return 'the appearance of redness';
      if (/allergic reaction/.test(lower)) return 'sensitivity';
      if (/eczema|psoriasis|rosacea|dermatitis/.test(lower)) return 'sensitive skin';
      if (/broken skin/.test(lower)) return 'irritated skin';
      if (/wound healing/.test(lower)) return 'skin comfort';
      return '';
    });
  }

  // ── Category display names ──
  var CATEGORY_LABELS = {
    'soothing-botanical': { en: 'Soothing botanicals', ko: '진정 식물 성분' },
    'active': { en: 'Active ingredients', ko: '활성 성분' },
    'humectant': { en: 'Hydrating humectants', ko: '보습 성분' },
    'emollient': { en: 'Nourishing emollients', ko: '에몰리언트 성분' },
    'barrier-lipid': { en: 'Barrier-supporting lipids', ko: '장벽 지질' },
    'ferment': { en: 'Fermented ingredients', ko: '발효 성분' },
    'peptide': { en: 'Peptides', ko: '펩타이드' },
    'essential-oil': { en: 'Essential oils', ko: '에센셜 오일' },
    'fragrance-allergen': { en: 'Fragrance allergens', ko: '향료 알레르겐' },
    'preservative': { en: 'Preservatives', ko: '방부제' },
    'surfactant': { en: 'Surfactants', ko: '계면활성제' },
    'thickener-texture': { en: 'Texture agents', ko: '텍스처 성분' },
    'antioxidant': { en: 'Antioxidants', ko: '항산화 성분' },
    'solvent-alcohol': { en: 'Solvent alcohols', ko: '알코올 용매' },
    'ph-adjuster': { en: 'pH adjusters', ko: 'pH 조절제' },
    'emulsifier': { en: 'Emulsifiers', ko: '유화제' },
    'chelator': { en: 'Chelating agents', ko: '킬레이팅제' },
    'uncategorized': { en: 'Other ingredients', ko: '기타 성분' },
    'other': { en: 'Other ingredients', ko: '기타 성분' },
  };

  function catLabel(cat) {
    var entry = CATEGORY_LABELS[cat] || CATEGORY_LABELS['other'];
    return isKo ? entry.ko : entry.en;
  }

  // ── Potent actives list (high-strength ingredients that can irritate) ──
  var POTENT_ACTIVES = new Set(['retinol', 'retinal', 'tretinoin', 'glycolic acid', 'salicylic acid',
    'lactic acid', 'mandelic acid', 'l-ascorbic acid', 'ascorbic acid', 'benzoyl peroxide', 'hydroquinone']);

  // ── Resolve product IDs to display names ──
  function productNamesFromIds(pids) {
    return pids.map(function(pid) {
      // Check doesnt list first, then works
      var entry = doesnt.find(function(p) { return p.id === pid; }) || works.find(function(p) { return p.id === pid; });
      if (!entry) return pid;
      if (entry._pasted) return isKo ? entry.nameKo : entry.name;
      return (entry.brand ? entry.brand + ' ' : '') + (isKo && entry.nameKo ? entry.nameKo : entry.name);
    });
  }

  // ── Check if ingredient is a compound containing a flagged component ──
  function getFlaggedComponent(ing) {
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

  // ── Reason templates (MFDS-safe, specific, metadata-driven) ──
  function negativeReason(ing, count, totalDoesnt, productIds) {
    var prodNames = productNamesFromIds(productIds || []);
    var foundIn = prodNames.length === 1
      ? t('Found in ' + prodNames[0] + ', which you marked as not suiting you.', prodNames[0] + '에 포함되어 있으며, 맞지 않는 제품으로 표시하셨어요.')
      : t('Found in ' + prodNames.join(' and ') + ', which you marked as not suiting you.', prodNames.join(', ') + '에 포함되어 있으며, 맞지 않는 제품으로 표시하셨어요.');

    // Check for compound ingredient with flagged component
    var component = getFlaggedComponent(ing);

    if (component && ing.is_essential_oil) {
      return mfdsSafe(t(
        'Contains ' + component + ', an essential oil that can irritate reactive skin. ' + foundIn,
        component + '을(를) 함유하며, 반응성 피부를 자극할 수 있는 에센셜 오일이에요. ' + foundIn
      ));
    }

    if (ing.is_eu_26_fragrance_allergen) {
      return mfdsSafe(t(
        'A fragrance compound on the EU allergen disclosure list. ' + foundIn,
        'EU 향료 알레르겐 공개 목록에 있는 향료 화합물이에요. ' + foundIn
      ));
    }
    if (ing.is_essential_oil) {
      return mfdsSafe(t(
        'An essential oil \u2014 a common irritant for sensitive or reactive skin. ' + foundIn,
        '에센셜 오일로, 민감하거나 반응성이 높은 피부에 자극이 될 수 있어요. ' + foundIn
      ));
    }
    // Potent actives
    if (POTENT_ACTIVES.has((ing.name || '').toLowerCase()) || POTENT_ACTIVES.has((ing.id || '').toLowerCase())) {
      return mfdsSafe(t(
        'A potent active \u2014 effective but can irritate sensitive or compromised skin. ' + foundIn,
        '강력한 활성 성분으로, 효과적이지만 민감하거나 손상된 피부를 자극할 수 있어요. ' + foundIn
      ));
    }
    if (ing.is_known_sensitizer) {
      // Distinguish preservatives vs other sensitizers
      var cat = (ing.category || '').toLowerCase();
      if (cat === 'preservative') {
        return mfdsSafe(t(
          'A preservative associated with sensitivity in some skin. ' + foundIn,
          '일부 피부에서 민감 반응과 관련된 방부제예요. ' + foundIn
        ));
      }
      if (cat === 'surfactant') {
        return mfdsSafe(t(
          'A surfactant that may be too stripping for sensitive skin types. ' + foundIn,
          '민감한 피부에 너무 강할 수 있는 계면활성제예요. ' + foundIn
        ));
      }
      return mfdsSafe(t(
        'An ingredient commonly flagged for sensitivity in some skin types. ' + foundIn,
        '일부 피부 유형에서 민감 반응이 보고된 성분이에요. ' + foundIn
      ));
    }
    if (ing.irritation_risk === 'high') {
      return mfdsSafe(t(
        'Has high irritation potential for some skin types. ' + foundIn,
        '일부 피부 유형에서 높은 자극 가능성이 있어요. ' + foundIn
      ));
    }
    if (ing.irritation_risk === 'medium') {
      return mfdsSafe(t(
        'May cause irritation in sensitive skin. ' + foundIn,
        '민감한 피부에 자극을 유발할 수 있어요. ' + foundIn
      ));
    }
    return mfdsSafe(t(
      'Worth monitoring \u2014 ' + foundIn.charAt(0).toLowerCase() + foundIn.slice(1),
      '주의가 필요한 성분이에요. ' + foundIn
    ));
  }

  function singleFlagReason(ing) {
    var ft = ing.flag_type || (ing.is_eu_26_fragrance_allergen ? 'eu26' : ing.is_essential_oil ? 'essential-oil' : ing.is_known_sensitizer ? 'sensitizer' : 'irritant');
    var component = getFlaggedComponent(ing);

    if (component && ft === 'essential-oil') {
      return mfdsSafe(t(
        'Contains ' + component + ', an essential oil that can irritate reactive skin.',
        component + '을(를) 함유하며, 반응성 피부를 자극할 수 있는 에센셜 오일이에요.'
      ));
    }
    if (ft === 'eu26') {
      return mfdsSafe(t(
        'A fragrance compound on the EU allergen disclosure list \u2014 worth noting if you\u2019ve reacted to fragrances before.',
        'EU 향료 알레르겐 공개 목록에 있는 향료 화합물이에요. 향료에 민감 반응 경험이 있다면 참고하세요.'
      ));
    }
    if (ft === 'essential-oil') {
      return mfdsSafe(t(
        'An essential oil \u2014 a likely candidate if you experience sensitivity with this product.',
        '에센셜 오일이에요. 이 제품에서 민감 반응이 있다면 주요 원인 후보예요.'
      ));
    }
    if (ft === 'sensitizer') {
      var cat = (ing.category || '').toLowerCase();
      if (cat === 'preservative') {
        return mfdsSafe(t(
          'A preservative that some skin types react to \u2014 worth checking if this product doesn\u2019t suit you.',
          '일부 피부 유형이 반응하는 방부제예요. 이 제품이 맞지 않다면 확인해 볼 가치가 있어요.'
        ));
      }
      return mfdsSafe(t(
        'A commonly flagged sensitizer \u2014 a likely candidate if this product doesn\u2019t suit you.',
        '민감 반응이 자주 보고되는 성분이에요. 이 제품이 맞지 않는다면 주요 원인 후보예요.'
      ));
    }
    if (POTENT_ACTIVES.has((ing.name || '').toLowerCase()) || POTENT_ACTIVES.has((ing.id || '').toLowerCase())) {
      return mfdsSafe(t(
        'A potent active ingredient \u2014 effective but can irritate sensitive or compromised skin.',
        '강력한 활성 성분으로, 효과적이지만 민감하거나 손상된 피부를 자극할 수 있어요.'
      ));
    }
    return mfdsSafe(t(
      'Has ' + (ing.irritation_risk === 'high' ? 'high' : 'moderate') + ' irritation potential for some skin types.',
      (ing.irritation_risk === 'high' ? '높은' : '중간') + ' 자극 가능성이 있는 성분이에요.'
    ));
  }

  // ── Resolve Korean name from MFDS reference ──
  function resolveKoName(ing) {
    if (ing.name_ko) return ing.name_ko;
    if (!_mfdsLookupEn) return null;
    var norm = (ing.name || '').toLowerCase().replace(/[\s\-]+/g, ' ').trim();
    var entry = _mfdsLookupEn[norm];
    return entry ? entry.standard_name_ko : null;
  }

  // ── Enrich ingredient row into display object ──
  function enrichIngredient(r) {
    var ing = r.ingredient; if (!ing) return null;
    var isFlagged = ing.is_known_sensitizer || ing.is_eu_26_fragrance_allergen ||
                    ing.is_essential_oil || ing.irritation_risk === 'high' || ing.irritation_risk === 'medium';
    return {
      id: ing.id,
      name: ing.name,
      name_ko: ing.name_ko || resolveKoName(ing),
      symbol: ing.symbol || (ing.name || '').substring(0, 2).toUpperCase(),
      category: ing.category || 'uncategorized',
      description: ing.description,
      description_ko: ing.description_ko,
      science: ing.science,
      science_ko: ing.science_ko,
      is_hero: r.is_hero,
      sort_order: r.sort_order,
      flagged: isFlagged,
      flag_type: ing.is_eu_26_fragrance_allergen ? 'eu26' : ing.is_essential_oil ? 'essential-oil' : ing.is_known_sensitizer ? 'sensitizer' : (ing.irritation_risk === 'high' || ing.irritation_risk === 'medium') ? 'irritant' : null,
      irritation_risk: ing.irritation_risk
    };
  }

  // ── ENGINE ──
  async function runAnalysis() {
    setBusy(true); setError(null); setResult(null);
    try {
      var allEntries = [...works, ...doesnt];
      var pickedEntries = allEntries.filter(function(p) { return !p._pasted; });
      var pastedEntries = allEntries.filter(function(p) { return p._pasted; });
      var pickedIds = pickedEntries.map(function(p) { return p.id; });
      var inputIds = allEntries.map(function(p) { return p.id; });

      // Fetch catalog data for picked products (if any)
      var data = pickedIds.length > 0
        ? await window.__supabase.fetchAnalyzeData(pickedIds)
        : { inputRows: [], allRows: window.__supabase._allRowsCache || [] };

      // If allRows not cached yet, fetch it via a dummy product call
      if (!data.allRows || data.allRows.length === 0) {
        if (pickedIds.length > 0) {
          data.allRows = (await window.__supabase.fetchAnalyzeData(pickedIds)).allRows;
        } else {
          // Force cache load by fetching with first available product
          var firstProd = (products || [])[0];
          if (firstProd) {
            data.allRows = (await window.__supabase.fetchAnalyzeData([firstProd.id])).allRows;
          } else {
            data.allRows = [];
          }
        }
      }

      // Load MFDS reference (for pasted matching + Korean name fallback)
      await loadMfdsCache();
      var catalog = catalogIngs;
      if (!catalog && pastedEntries.length > 0) {
        var KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';
        var res = await fetch('https://hkyfggapijgedsizfqec.supabase.co/rest/v1/ingredients?select=*&limit=1000', {
          headers: { apikey: KEY, Authorization: 'Bearer ' + KEY }
        });
        catalog = await res.json();
        setCatalogIngs(catalog);
      }

      // Merge pasted ingredient rows into inputRows + collect match stats
      var inputRows = data.inputRows.slice();
      var pasteStats = { total: 0, catalog: 0, mfds: 0, hardcoded: 0, unknown: 0 };
      var mfdsOnlyNames = []; // flywheel: ingredients recognized by MFDS but not in active catalog
      pastedEntries.forEach(function(entry) {
        var matched = matchParsedIngredients(entry._rawIngredients, catalog || []);
        matched.forEach(function(row) {
          row.product_id = entry.id;
          inputRows.push(row);
          pasteStats.total++;
          if (row.matchTier === 'catalog') pasteStats.catalog++;
          else if (row.matchTier === 'mfds') {
            pasteStats.mfds++;
            // Flywheel: log MFDS-recognized ingredients not yet in active catalog
            mfdsOnlyNames.push(row.ingredient.name);
          }
          else if (row.matchTier === 'hardcoded') pasteStats.hardcoded++;
          else pasteStats.unknown++;
        });
      });

      // Part 7: Flywheel — log MFDS-only ingredients to queue (deduped, anonymous)
      if (mfdsOnlyNames.length > 0) {
        try {
          var uniqueNames = [...new Set(mfdsOnlyNames)];
          var queueRows = uniqueNames.map(function(name) {
            return { ingredient_name: name, source: 'paste-analyzer', status: 'ready-to-classify' };
          });
          fetch('https://hkyfggapijgedsizfqec.supabase.co/rest/v1/ingredient_classify_queue', {
            method: 'POST',
            headers: {
              apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY,
              'Content-Type': 'application/json', 'Prefer': 'return=minimal',
              'on_conflict': 'ingredient_name'
            },
            body: JSON.stringify(queueRows)
          }).catch(function() {}); // fire-and-forget, don't block analysis
        } catch(e) {}
      }

      var allRows = data.allRows;

      // Group input rows by product
      var byProduct = {};
      inputRows.forEach(function(r) {
        if (!byProduct[r.product_id]) byProduct[r.product_id] = [];
        byProduct[r.product_id].push(r);
      });

      var worksIds = works.map(function(p) { return p.id; });
      var doesntIds = doesnt.map(function(p) { return p.id; });

      // Data quality
      var fullInciCount = 0, heroOnlyCount = 0, totalIngredientsAnalyzed = 0;
      inputIds.forEach(function(pid) {
        var rows = byProduct[pid] || [];
        totalIngredientsAnalyzed += rows.length;
        var hasNonHero = rows.some(function(r) { return !r.is_hero; });
        if (hasNonHero && rows.length > 10) fullInciCount++;
        else heroOnlyCount++;
      });

      // Group all junction rows by product (for recommendations)
      var allByProduct = {};
      allRows.forEach(function(r) {
        if (!allByProduct[r.product_id]) allByProduct[r.product_id] = [];
        allByProduct[r.product_id].push(r);
      });

      var excludeSet = new Set(inputIds);
      var confLevel = getConfidenceLevel();

      // ═══════════════════════════════════════════
      // MODE 1: Single-product analysis
      // ═══════════════════════════════════════════
      if (isSingleMode) {
        var pid = inputIds[0];
        var rows = byProduct[pid] || [];

        // Build full ingredient list with metadata for card rendering
        var allIngs = rows.map(enrichIngredient).filter(Boolean);

        // Group into user-intent sections
        var ACTIVE_CATS = { 'active': true, 'peptide': true, 'antioxidant': true, 'ferment': true };
        var COMFORT_CATS = { 'humectant': true, 'emollient': true, 'barrier-lipid': true, 'soothing-botanical': true };

        var activeIngs = [];
        var comfortIngs = [];
        allIngs.forEach(function(ing) {
          if (ACTIVE_CATS[ing.category]) activeIngs.push(ing);
          else if (COMFORT_CATS[ing.category]) comfortIngs.push(ing);
          // Everything else (thickeners, emulsifiers, pH adjusters, solvents, etc.) is hidden
        });

        var breakdown = [];
        if (activeIngs.length > 0) {
          breakdown.push({
            theme_name: t('\u2728 Key Actives', '\u2728 핵심 활성 성분'),
            subtitle: t('The active ingredients doing the heavy lifting.', '핵심적인 역할을 하는 활성 성분들.'),
            function_category: '_active',
            ingredients: activeIngs
          });
        }
        if (comfortIngs.length > 0) {
          breakdown.push({
            theme_name: t('\uD83E\uDEE7 Soothing Layer', '\uD83E\uDEE7 진정 레이어'),
            subtitle: t('Hydration, barrier support, and soothing ingredients.', '보습, 장벽 지원, 진정 성분들.'),
            function_category: '_comfort',
            ingredients: comfortIngs
          });
        }

        // Flag sensitizers / allergens
        var flags = allIngs.filter(function(ing) { return ing.flagged; }).map(function(ing) {
          return {
            ingredient_name_en: ing.name,
            ingredient_name_ko: ing.name_ko,
            symbol: ing.symbol,
            flag_type: ing.flag_type,
            reason: singleFlagReason(ing),
            confidence: 'single'
          };
        });

        // Recommendations: similar or alternative products
        var flaggedIds = new Set(flags.map(function(f) { return f.ingredient_name_en; }));
        var flaggedIngIds = new Set();
        rows.forEach(function(r) {
          var ing = r.ingredient; if (!ing) return;
          if (ing.is_known_sensitizer || ing.is_eu_26_fragrance_allergen || ing.is_essential_oil ||
              ing.irritation_risk === 'high' || ing.irritation_risk === 'medium') {
            flaggedIngIds.add(ing.id);
          }
        });

        var productCats = new Set(Object.keys(ACTIVE_CATS).concat(Object.keys(COMFORT_CATS)));
        var recs;

        if (singleIsWorks) {
          // "You might also like" — similar ingredient profiles
          recs = (products || [])
            .filter(function(p) { return !excludeSet.has(p.id) && p.category === 'skincare'; })
            .map(function(p) {
              var pRows = allByProduct[p.id] || [];
              var overlap = 0;
              pRows.forEach(function(r) {
                if (r.ingredient && productCats.has(r.ingredient.category)) overlap++;
              });
              return { product: p, score: overlap };
            })
            .sort(function(a, b) { return b.score - a.score; });
        } else {
          // "Alternatives that exclude these ingredients"
          recs = (products || [])
            .filter(function(p) { return !excludeSet.has(p.id) && p.category === 'skincare'; })
            .map(function(p) {
              var pRows = allByProduct[p.id] || [];
              var hasFlagged = pRows.some(function(r) { return r.ingredient && flaggedIngIds.has(r.ingredient.id); });
              if (hasFlagged) return null;
              var overlap = 0;
              pRows.forEach(function(r) {
                if (r.ingredient && productCats.has(r.ingredient.category)) overlap++;
              });
              return { product: p, score: overlap };
            })
            .filter(Boolean)
            .sort(function(a, b) { return b.score - a.score; });
        }

        var seenBrands = new Set();
        var recIds = [];
        recs.forEach(function(item) {
          if (recIds.length >= 3) return;
          if (seenBrands.has(item.product.brand)) return;
          seenBrands.add(item.product.brand);
          recIds.push(item.product.id);
        });

        var total = inputIds.length;
        var pasteNote = '';
        if (pasteStats.total > 0) {
          var recognized = pasteStats.catalog + pasteStats.mfds;
          pasteNote = t(
            ' Recognized ' + recognized + ' of ' + pasteStats.total + ' pasted ingredients' +
            (pasteStats.hardcoded > 0 ? '; flagged ' + pasteStats.hardcoded + ' by safety lists' : '') +
            (pasteStats.mfds > 0 ? '; ' + pasteStats.mfds + ' recognized via MFDS reference (detailed profiles in progress)' : '') +
            (pasteStats.unknown > 0 ? '; ' + pasteStats.unknown + ' not yet in our database' : '') + '.',
            ' 붙여넣기 성분 ' + pasteStats.total + '개 중 ' + recognized + '개 인식' +
            (pasteStats.hardcoded > 0 ? ', ' + pasteStats.hardcoded + '개 안전성 목록에서 플래그' : '') +
            (pasteStats.mfds > 0 ? ', ' + pasteStats.mfds + '개 MFDS 참조 인식 (상세 프로필 준비 중)' : '') +
            (pasteStats.unknown > 0 ? ', ' + pasteStats.unknown + '개 미등록' : '') + '.'
          );
        }
        var cNote = mfdsSafe(t(
          'Single product mode. ' + totalIngredientsAnalyzed + ' ingredients analyzed. ' +
          (heroOnlyCount > 0 ? 'This product has key-ingredient data only (not the full formula).' : 'Full ingredient list available.'),
          '단일 제품 모드. ' + totalIngredientsAnalyzed + '개 성분 분석. ' +
          (heroOnlyCount > 0 ? '이 제품은 주요 성분 데이터만 보유하고 있습니다 (전성분 아님).' : '전성분 데이터 사용.')
        ) + pasteNote);

        setResult({
          mode: 'single',
          singleIsWorks: singleIsWorks,
          avoid_ingredients: flags,
          positive_themes: breakdown,
          all_ingredients: allIngs,
          recommended_products: recIds,
          data_quality: {
            full_inci_products: fullInciCount,
            hero_only_products: heroOnlyCount,
            total_ingredients_analyzed: totalIngredientsAnalyzed,
            confidence_note: cNote
          }
        });
        setBusy(false);
        return;
      }

      // ═══════════════════════════════════════════
      // MODE 2: Comparative / pattern analysis
      // ═══════════════════════════════════════════

      // ── NEGATIVE SIGNALS ──
      var doesntIngredients = {};
      doesntIds.forEach(function(pid) {
        var rows = byProduct[pid] || [];
        rows.forEach(function(r) {
          var ing = r.ingredient; if (!ing) return;
          if (!doesntIngredients[ing.id]) {
            doesntIngredients[ing.id] = { ing: ing, count: 0, products: [] };
          }
          doesntIngredients[ing.id].count++;
          if (doesntIngredients[ing.id].products.indexOf(pid) < 0)
            doesntIngredients[ing.id].products.push(pid);
        });
      });

      // Also collect works ingredients for filtering
      var worksIngredientIds = new Set();
      worksIds.forEach(function(pid) {
        var rows = byProduct[pid] || [];
        rows.forEach(function(r) { if (r.ingredient) worksIngredientIds.add(r.ingredient.id); });
      });

      var negatives = Object.values(doesntIngredients)
        .filter(function(item) {
          var ing = item.ing;
          return ing.is_known_sensitizer || ing.is_eu_26_fragrance_allergen ||
                 ing.is_essential_oil || ing.irritation_risk === 'high' || ing.irritation_risk === 'medium';
        })
        .sort(function(a, b) {
          if (b.count !== a.count) return b.count - a.count;
          var riskOrder = { high: 3, medium: 2, low: 1 };
          return (riskOrder[b.ing.irritation_risk] || 0) - (riskOrder[a.ing.irritation_risk] || 0);
        })
        .slice(0, 5)
        .map(function(item) {
          var totalD = doesntIds.length;
          var ing = item.ing;
          var conf = item.count >= totalD ? 'high' : item.count >= Math.ceil(totalD / 2) ? 'medium' : 'low';
          return {
            ingredient_name_en: ing.name,
            ingredient_name_ko: ing.name_ko,
            symbol: ing.symbol || (ing.name || '').substring(0, 2).toUpperCase(),
            category: ing.category,
            flag_type: ing.is_eu_26_fragrance_allergen ? 'eu26' : ing.is_essential_oil ? 'essential-oil' : ing.is_known_sensitizer ? 'sensitizer' : 'irritant',
            description: ing.description,
            description_ko: ing.description_ko,
            science: ing.science,
            science_ko: ing.science_ko,
            reason: negativeReason(ing, item.count, totalD, item.products),
            confidence: conf,
            flagged: true
          };
        });

      // If doesnt is empty but works has products, run works-only positive analysis
      // If works is empty but doesnt has products, run doesnt-only negative analysis

      // ── POSITIVE SIGNALS ──
      var doesntIngredientSet = new Set(Object.keys(doesntIngredients));
      var worksIngredientSets = worksIds.map(function(pid) {
        var rows = byProduct[pid] || [];
        return new Set(rows.map(function(r) { return r.ingredient_id; }));
      });

      var positiveIngredients = [];
      var minWorksOverlap = worksIds.length >= 3 ? worksIds.length : Math.max(1, worksIds.length);

      if (worksIngredientSets.length > 0) {
        // Find ingredients in ALL works products not in any doesnt
        var allWorksIngs = new Set();
        worksIngredientSets.forEach(function(s) { s.forEach(function(id) { allWorksIngs.add(id); }); });

        allWorksIngs.forEach(function(ingId) {
          if (doesntIngredientSet.has(ingId)) return;
          var inCount = worksIngredientSets.filter(function(s) { return s.has(ingId); }).length;
          if (inCount >= minWorksOverlap) {
            var row = inputRows.find(function(r) { return r.ingredient_id === ingId && r.ingredient; });
            if (row) positiveIngredients.push({ ing: row.ingredient, count: inCount });
          }
        });

        // If no full overlap found, loosen to N-1
        if (positiveIngredients.length === 0 && worksIds.length >= 2) {
          allWorksIngs.forEach(function(ingId) {
            if (doesntIngredientSet.has(ingId)) return;
            var inCount = worksIngredientSets.filter(function(s) { return s.has(ingId); }).length;
            if (inCount >= worksIds.length - 1) {
              var row = inputRows.find(function(r) { return r.ingredient_id === ingId && r.ingredient; });
              if (row) positiveIngredients.push({ ing: row.ingredient, count: inCount });
            }
          });
        }
      }

      // Aggregate into intent groups (same as single mode)
      var ACTIVE_CATS_C = { 'active': true, 'peptide': true, 'antioxidant': true, 'ferment': true };
      var COMFORT_CATS_C = { 'humectant': true, 'emollient': true, 'barrier-lipid': true, 'soothing-botanical': true };
      var posActives = [], posComfort = [];
      positiveIngredients.forEach(function(item) {
        var ig = item.ing;
        var enriched = {
          id: ig.id, name: ig.name, name_ko: ig.name_ko,
          symbol: ig.symbol || (ig.name || '').substring(0, 2).toUpperCase(),
          category: ig.category,
          description: ig.description, description_ko: ig.description_ko,
          science: ig.science, science_ko: ig.science_ko,
          flagged: false
        };
        if (ACTIVE_CATS_C[ig.category]) posActives.push(enriched);
        else if (COMFORT_CATS_C[ig.category]) posComfort.push(enriched);
      });

      var positiveThemes = [];
      if (posActives.length > 0) {
        positiveThemes.push({
          theme_name: t('\u2728 Key Actives', '\u2728 핵심 활성 성분'),
          subtitle: t('Active ingredients shared across your "works" products.', '잘 맞는 제품들에 공통으로 포함된 활성 성분.'),
          function_category: '_active',
          ingredients: posActives
        });
      }
      if (posComfort.length > 0) {
        positiveThemes.push({
          theme_name: t('\uD83E\uDEE7 Soothing Layer', '\uD83E\uDEE7 진정 레이어'),
          subtitle: t('Hydration and soothing ingredients shared across your "works" products.', '잘 맞는 제품들에 공통으로 포함된 보습 및 진정 성분.'),
          function_category: '_comfort',
          ingredients: posComfort
        });
      }

      // ── RECOMMENDATIONS ──
      var avoidIdSet = new Set();
      negatives.forEach(function(n) {
        Object.values(doesntIngredients).forEach(function(item) {
          if (item.ing.name === n.ingredient_name_en) avoidIdSet.add(item.ing.id);
        });
      });
      var positiveCats = new Set(positiveThemes.map(function(th) { return th.function_category; }));

      var productScores = (products || [])
        .filter(function(p) { return !excludeSet.has(p.id) && p.category === 'skincare'; })
        .map(function(p) {
          var pRows = allByProduct[p.id] || [];
          var hasAvoid = pRows.some(function(r) { return r.ingredient && avoidIdSet.has(r.ingredient.id); });
          if (hasAvoid) return null;
          var posScore = 0;
          pRows.forEach(function(r) { if (r.ingredient && positiveCats.has(r.ingredient.category)) posScore++; });
          return { product: p, score: posScore };
        })
        .filter(Boolean)
        .sort(function(a, b) { return b.score - a.score; });

      var seenBrands = new Set();
      var recommendations = [];
      productScores.forEach(function(item) {
        if (recommendations.length >= 3) return;
        if (seenBrands.has(item.product.brand)) return;
        seenBrands.add(item.product.brand);
        recommendations.push(item.product.id);
      });

      // ── Per-product ingredient breakdowns ──
      var ACTIVE_CATS_BD = { 'active': true, 'peptide': true, 'antioxidant': true, 'ferment': true };
      var COMFORT_CATS_BD = { 'humectant': true, 'emollient': true, 'barrier-lipid': true, 'soothing-botanical': true };
      var productBreakdowns = inputIds.map(function(pid) {
        var rows = byProduct[pid] || [];
        var entry = works.find(function(p) { return p.id === pid; }) || doesnt.find(function(p) { return p.id === pid; });
        if (!entry) return null;
        var allIngs = rows.map(enrichIngredient).filter(Boolean);
        var activeIngs = [], comfortIngs = [];
        allIngs.forEach(function(ing) {
          if (ACTIVE_CATS_BD[ing.category]) activeIngs.push(ing);
          else if (COMFORT_CATS_BD[ing.category]) comfortIngs.push(ing);
        });
        return {
          id: pid,
          name: entry.name,
          nameKo: entry.nameKo,
          brand: entry.brand || '',
          isPasted: !!entry._pasted,
          isWorks: worksIds.indexOf(pid) >= 0,
          activeIngs: activeIngs,
          comfortIngs: comfortIngs,
          totalCount: allIngs.length
        };
      }).filter(Boolean);

      // Data quality note
      var total = inputIds.length;
      var confidenceNote;
      if (heroOnlyCount === 0) {
        confidenceNote = mfdsSafe(t(
          'All ' + total + ' products had full ingredient lists (' + totalIngredientsAnalyzed + ' ingredients analyzed). Strong data coverage.',
          total + '개 제품 모두 전성분 데이터 보유 (' + totalIngredientsAnalyzed + '개 성분 분석). 높은 데이터 신뢰도.'
        ));
      } else if (heroOnlyCount < total) {
        confidenceNote = mfdsSafe(t(
          heroOnlyCount + ' of ' + total + ' products had only key ingredient data. ' + totalIngredientsAnalyzed + ' ingredients analyzed total. Some triggers in full formulas may not be captured.',
          total + '개 중 ' + heroOnlyCount + '개 제품은 주요 성분 데이터만 보유. 총 ' + totalIngredientsAnalyzed + '개 성분 분석. 일부 자극 요인이 누락될 수 있습니다.'
        ));
      } else {
        confidenceNote = mfdsSafe(t(
          'All ' + total + ' products had only key ingredient data (' + totalIngredientsAnalyzed + ' ingredients). Results are approximate.',
          total + '개 제품 모두 주요 성분 데이터만 보유 (' + totalIngredientsAnalyzed + '개 성분). 참고 수준의 결과입니다.'
        ));
      }
      // Append paste match stats
      if (pasteStats.total > 0) {
        var recognized = pasteStats.catalog + pasteStats.mfds;
        confidenceNote += ' ' + t(
          'Recognized ' + recognized + ' of ' + pasteStats.total + ' pasted ingredients' +
          (pasteStats.hardcoded > 0 ? '; flagged ' + pasteStats.hardcoded + ' by safety lists' : '') +
          (pasteStats.mfds > 0 ? '; ' + pasteStats.mfds + ' recognized via MFDS reference (detailed profiles in progress)' : '') +
          (pasteStats.unknown > 0 ? '; ' + pasteStats.unknown + ' not yet in our database' : '') + '.',
          '붙여넣기 성분 ' + pasteStats.total + '개 중 ' + recognized + '개 인식' +
          (pasteStats.hardcoded > 0 ? ', ' + pasteStats.hardcoded + '개 안전성 목록에서 플래그' : '') +
          (pasteStats.mfds > 0 ? ', ' + pasteStats.mfds + '개 MFDS 참조 인식 (상세 프로필 준비 중)' : '') +
          (pasteStats.unknown > 0 ? ', ' + pasteStats.unknown + '개 미등록' : '') + '.'
        );
      }

      setExpandedProducts([]);
      setResult({
        mode: 'comparative',
        avoid_ingredients: negatives,
        positive_themes: positiveThemes,
        product_breakdowns: productBreakdowns,
        recommended_products: recommendations,
        data_quality: {
          full_inci_products: fullInciCount,
          hero_only_products: heroOnlyCount,
          total_ingredients_analyzed: totalIngredientsAnalyzed,
          confidence_note: confidenceNote
        }
      });
    } catch (e) {
      console.error('Analysis error:', e);
      setError(t('Something went wrong. Please try again.', '오류가 발생했습니다. 다시 시도해 주세요.'));
    }
    setBusy(false);
  }

  // ── Scrollable ingredient list (matches product page pattern) ──
  function TryIngScroll({ children }) {
    var wrapRef = useRef(null);
    var scrollRef = useRef(null);
    var items = React.Children.toArray(children);
    var needsFade = items.length > 4;

    useEffect(function() {
      var el = scrollRef.current;
      var wrap = wrapRef.current;
      if (!el || !wrap || !needsFade) return;
      var onScroll = function() {
        var atEnd = el.scrollHeight - el.scrollTop - el.clientHeight < 10;
        wrap.classList.toggle('scrolled-end', atEnd);
      };
      el.addEventListener('scroll', onScroll, { passive: true });
      return function() { el.removeEventListener('scroll', onScroll); };
    }, [needsFade]);

    return React.createElement('div', { ref: wrapRef, className: cn('try-ing-scroll-wrap', !needsFade && 'scrolled-end') },
      React.createElement('div', { className: 'try-ing-scroll', ref: scrollRef }, children)
    );
  }

  // ── Product Picker ──
  function ProductPicker({ label, labelKo, selected, setSelected, max, icon, accent }) {
    var [q, setQ] = useState('');
    var [open, setOpen] = useState(false);
    var [showCount, setShowCount] = useState(8);
    var [pickerPaste, setPickerPaste] = useState(false);
    var [pickerPasteText, setPickerPasteText] = useState('');
    var [pickerChips, setPickerChips] = useState([]);
    var inputRef = useRef(null);
    var pasteRef = useRef(null);
    var accentClass = accent === 'rose' ? 'try-picker--rose' : 'try-picker--green';

    var handlePasteInput = function(e) {
      var val = e.target.value;
      // If pasted content has delimiters, auto-parse into chips immediately
      if (/[,\n\u00B7\uFF1B]/.test(val)) {
        var parsed = parseIngredientList(val, catalogIngs);
        if (parsed.length > 0) {
          var newNames = parsed.map(function(c) { return c.name; });
          var existing = new Set(pickerChips.map(function(c) { return c.toLowerCase(); }));
          var unique = newNames.filter(function(n) { return !existing.has(n.toLowerCase()); });
          setPickerChips(function(prev) { return prev.concat(unique); });
          setPickerPasteText('');
          return;
        }
      }
      setPickerPasteText(val);
    };

    var addChipFromInput = function() {
      var name = pickerPasteText.trim();
      if (!name) return;
      var existing = new Set(pickerChips.map(function(c) { return c.toLowerCase(); }));
      if (!existing.has(name.toLowerCase())) {
        setPickerChips(function(prev) { return prev.concat([name]); });
      }
      setPickerPasteText('');
    };

    var removeChip = function(idx) {
      setPickerChips(function(prev) { return prev.filter(function(_, i) { return i !== idx; }); });
    };

    var submitPickerPaste = function() {
      var names = pickerChips;
      if (names.length === 0) return;
      pastedCounter.current++;
      var pastedId = 'pasted-' + pastedCounter.current;
      var entry = {
        id: pastedId,
        name: t('Pasted product \u00B7 ' + names.length + ' ingredients', '붙여넣기 제품 \u00B7 ' + names.length + '개 성분'),
        nameKo: '붙여넣기 제품 \u00B7 ' + names.length + '개 성분',
        brand: '',
        imageUrl: null,
        _pasted: true,
        _rawIngredients: names
      };
      setSelected(function(prev) { return prev.concat([entry]); });
      setPickerPasteText('');
      setPickerChips([]);
      setPickerPaste(false);
      setResult(null); setError(null);
    };

    var openPaste = function() {
      setPickerPaste(true);
      setQ(''); setOpen(false);
      setTimeout(function() { if (pasteRef.current) pasteRef.current.focus(); }, 50);
    };

    var filtered = (products || []).filter(function(p) {
      if (p.category !== 'skincare') return false;
      if (allSelected.includes(p.id)) return false;
      if (!q.trim()) return true;
      var lower = q.toLowerCase();
      return p.name.toLowerCase().includes(lower) ||
             (p.nameKo || '').toLowerCase().includes(lower) ||
             p.brand.toLowerCase().includes(lower);
    });
    // When no query, reverse to show newest first (products array comes sorted by created_at asc)
    if (!q.trim()) filtered = filtered.slice().reverse();
    var visibleFiltered = filtered.slice(0, showCount);
    var hasMore = filtered.length > showCount;

    var add = function(p) {
      if (selected.length >= max) return;
      setSelected(function(prev) { return prev.concat([p]); });
      setQ(''); setOpen(false);
      setResult(null); setError(null);
    };
    var remove = function(id) {
      setSelected(function(prev) { return prev.filter(function(p) { return p.id !== id; }); });
      setResult(null); setError(null);
    };
    var focusSearch = function() { if (inputRef.current) inputRef.current.focus(); };

    return React.createElement('div', { className: 'try-picker ' + accentClass, onClick: focusSearch, style: { cursor: selected.length < max ? 'text' : 'default' } },
      React.createElement('h3', { className: 'try-picker-label' },
        React.createElement('span', { className: 'try-picker-icon-wrap' }, icon),
        ' ',
        t(label, labelKo)
      ),
      selected.map(function(p) {
        var name = isKo && p.nameKo ? p.nameKo : p.name;
        var isPasted = !!p._pasted;
        return React.createElement('div', { key: p.id, className: 'try-chip' + (isPasted ? ' try-chip--pasted' : '') },
          isPasted
            ? React.createElement('div', { className: 'try-chip-paste-icon' }, '\uD83D\uDCCB')
            : React.createElement('div', { className: 'try-chip-img' },
                React.createElement(ProductImg, { src: p.imageUrl, alt: (p.brand || '') + ' ' + name })
              ),
          React.createElement('div', { className: 'try-chip-text' },
            isPasted
              ? React.createElement('span', { className: 'try-chip-name' }, name)
              : [
                  React.createElement('span', { key: 'b', className: 'try-chip-brand' }, p.brand),
                  React.createElement('span', { key: 'n', className: 'try-chip-name' }, name)
                ]
          ),
          React.createElement('button', { className: 'try-chip-x', onClick: function() { remove(p.id); }, 'aria-label': 'Remove' },
            React.createElement(Icon, { name: 'x', size: 12 })
          )
        );
      }),
      selected.length < max && React.createElement('div', { className: 'try-search-wrap', style: { position: 'relative' } },
        React.createElement('div', { className: 'try-search' },
          React.createElement(Icon, { name: 'search', size: 14 }),
          React.createElement('input', {
            ref: inputRef,
            value: q,
            onChange: function(e) { setQ(e.target.value); setOpen(true); setShowCount(8); },
            onFocus: function() { setOpen(true); },
            onBlur: function() { setTimeout(function() { setOpen(false); }, 200); },
            placeholder: t('Search products...', '제품 검색...'),
            className: 'try-search-input'
          })
        ),
        open && React.createElement('div', {
          className: 'try-dropdown' + (q.trim().length > 0 && filtered.length === 0 ? ' try-dropdown--empty' : ''),
          onMouseDown: function(e) { e.preventDefault(); }
        },
          visibleFiltered.map(function(p) {
            var name = isKo && p.nameKo ? p.nameKo : p.name;
            return React.createElement('button', {
              key: p.id, className: 'try-dropdown-item',
              onMouseDown: function(e) { e.preventDefault(); },
              onClick: function() { add(p); setShowCount(8); }
            },
              React.createElement('div', { className: 'try-dd-img' },
                React.createElement(ProductImg, { src: p.imageUrl, alt: p.brand + ' ' + name })
              ),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('span', { className: 'try-dd-brand' }, p.brand),
                React.createElement('span', { className: 'try-dd-name' }, name)
              )
            );
          }),
          hasMore && React.createElement('button', {
            className: 'try-dropdown-more',
            onMouseDown: function(e) { e.preventDefault(); },
            onClick: function() { setShowCount(function(c) { return c + 8; }); }
          }, t('Show more...', '더 보기...')),
          q.trim().length > 0 && filtered.length === 0 && React.createElement('p', { className: 'try-empty-search-text' },
            t('No results for \u201C' + q + '\u201D', '\u201C' + q + '\u201D 검색 결과가 없어요')
          ),
          React.createElement('button', {
            className: 'try-empty-search-paste',
            onMouseDown: function(e) { e.preventDefault(); },
            onClick: openPaste
          },
            '\uD83D\uDCCB ' + t('Paste its ingredient list instead \u2192', '성분 목록을 대신 붙여넣기 \u2192')
          )
        ),
        // Persistent hint below search
        !pickerPaste && React.createElement('p', { className: 'try-search-hint' },
          t('Can\u2019t find a product? ', '제품을 찾을 수 없나요? '),
          React.createElement('button', {
            className: 'try-search-hint-link',
            onClick: function(e) { e.stopPropagation(); openPaste(); }
          }, t('Paste its ingredient list.', '성분 목록을 붙여넣으세요.'))
        )
      ),
      // Inline chip-based paste input
      selected.length < max && pickerPaste && React.createElement('div', { className: 'try-chip-input-area', onClick: function(e) { e.stopPropagation(); if (pasteRef.current) pasteRef.current.focus(); } },
        React.createElement('div', { className: 'try-chip-input-field' },
          pickerChips.map(function(name, idx) {
            return React.createElement('span', { key: idx, className: 'try-paste-chip' },
              React.createElement('span', { className: 'try-paste-chip-name' }, name),
              React.createElement('button', {
                className: 'try-paste-chip-x',
                onClick: function(e) { e.stopPropagation(); removeChip(idx); },
                'aria-label': 'Remove'
              }, '\u00D7')
            );
          }),
          React.createElement('input', {
            ref: pasteRef,
            className: 'try-chip-input',
            value: pickerPasteText,
            onChange: handlePasteInput,
            onKeyDown: function(e) {
              if (e.key === 'Enter') { e.preventDefault(); addChipFromInput(); }
              if (e.key === 'Backspace' && !pickerPasteText && pickerChips.length > 0) { removeChip(pickerChips.length - 1); }
            },
            placeholder: pickerChips.length === 0
              ? t('Paste ingredient list or type one at a time...', '성분 목록을 붙여넣거나 하나씩 입력하세요...')
              : t('Add more...', '더 추가...')
          }),
          // Inline + button for adding one ingredient
          pickerPasteText.trim() && React.createElement('button', {
            className: 'try-chip-input-add',
            onClick: function(e) { e.stopPropagation(); addChipFromInput(); }
          }, '+')
        ),
        React.createElement('div', { className: 'try-paste-actions' },
          React.createElement('button', {
            className: 'try-paste-cancel',
            onClick: function() { setPickerPaste(false); setPickerPasteText(''); setPickerChips([]); }
          }, t('Cancel', '취소')),
          React.createElement('button', {
            className: 'try-paste-submit',
            disabled: pickerChips.length === 0,
            onClick: submitPickerPaste
          }, t('Done', '완료') + (pickerChips.length > 0 ? ' (' + pickerChips.length + ')' : ''))
        )
      ),
    );
  }

  // ── Confidence badge ──
  function ConfBadge({ level }) {
    var colors = { high: 'var(--accent)', medium: 'var(--sage)', low: 'var(--ink-faint)', single: 'var(--sage)' };
    var labels = {
      high: t('High', '높음'), medium: t('Medium', '중간'),
      low: t('Low', '낮음'), single: t('Single product', '단일 제품')
    };
    return React.createElement('span', {
      className: 'try-conf',
      style: { background: colors[level] || colors.low, color: '#fff' }
    }, labels[level] || level);
  }

  // ── Nudge message ──

  // ── Render helpers for result cards ──
  function renderProductLink(pid) {
    var p = (products || []).find(function(x) { return x.id === pid; });
    if (!p) return null;
    var name = isKo && p.nameKo ? p.nameKo : p.name;
    var slug = p.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    return React.createElement('a', {
      key: pid, className: 'try-rec-item', href: '/products/' + slug,
      onClick: function(e) {
        e.preventDefault();
        history.pushState({}, '', '/products/' + slug);
        setProduct(p);
        window.scrollTo(0, 0);
      }
    },
      React.createElement('div', { className: 'try-rec-img' },
        React.createElement(ProductImg, { src: p.imageUrl, alt: p.brand + ' ' + name })
      ),
      React.createElement('div', { style: { flex: 1, minWidth: 0 } },
        React.createElement('span', { className: 'try-rec-brand' }, p.brand),
        React.createElement('span', { className: 'try-rec-name' }, name)
      ),
      React.createElement(Icon, { name: 'arrow', size: 16, className: 'try-rec-arrow' })
    );
  }

  // ── RENDER ──
  return React.createElement('div', { className: 'try-page' },
    // Hero
    React.createElement('header', { className: 'try-hero' },
      React.createElement(Sticker, { color: 'accent', rotate: -3 }, t('Beta', '베타')),
      React.createElement('h1', { className: 'display' },
        t('Find your ', '나만의 '),
        React.createElement('br'),
        React.createElement('span', { className: 'display-accent' },
          t('ingredient pattern', '성분 패턴'),
          React.createElement('span', { className: 'display-dot' }, '.')
        )
      ),
      React.createElement('p', { className: 'try-subtitle' },
        t(
          'Tell us which products work for your skin and which don\u2019t. We\u2019ll find the ingredient patterns behind both.',
          '어떤 제품이 맞고 안 맞는지 알려주세요. 그 뒤에 숨겨진 성분 패턴을 찾아드려요.'
        )
      )
    ),

    // Pickers
    React.createElement('section', { className: 'try-pickers' },
      React.createElement(ProductPicker, {
        label: 'Products that suit you', labelKo: '잘 맞는 제품',
        selected: works, setSelected: setWorks, max: MAX_PER_SIDE, icon: '\u2705', accent: 'green'
      }),
      React.createElement(ProductPicker, {
        label: 'Products that don\u2019t suit you', labelKo: '맞지 않는 제품',
        selected: doesnt, setSelected: setDoesnt, max: MAX_PER_SIDE, icon: '\uD83D\uDEAB', accent: 'rose'
      })
    ),

    // Sticky analyze bar — hidden when results are showing
    !result && React.createElement('div', { className: 'try-action-sticky' },
      React.createElement('button', {
        className: 'try-btn',
        disabled: !canAnalyze || busy,
        onClick: runAnalysis
      },
        busy
          ? React.createElement('span', { className: 'try-btn-loading' },
              t('Analyzing', '분석 중'),
              React.createElement('span', { className: 'try-btn-dots' },
                React.createElement('span', null, '.'),
                React.createElement('span', null, '.'),
                React.createElement('span', null, '.')
              )
            )
          : canAnalyze
            ? (isSingleMode
                ? t('\u{1F449} Analyze this product', '\u{1F449} 이 제품 분석하기')
                : '\u{1F449} ' + t('Analyze', '분석하기') + ' (' + totalCount + ')')
            : t('Add a product to begin', '제품을 추가하세요')
      )
    ),

    // Error
    error && React.createElement('div', { className: 'try-error' }, error),

    // Results
    result && React.createElement('section', { className: 'try-results', ref: resultsRef },

      // Result headline + data quality
      React.createElement(Reveal, null,
        React.createElement('h2', { className: 'try-results-headline' },
          result.mode === 'single'
            ? (singleIsWorks
                ? t('Here\u2019s what\u2019s inside ', '이 제품의 성분 분석: ') + (isKo ? (singleProduct && singleProduct.nameKo || '') : (singleProduct && singleProduct.name || ''))
                : t('Here\u2019s why this might not suit you', '이 제품이 맞지 않을 수 있는 이유'))
            : t('Your ingredient pattern', '나의 성분 패턴')
        ),
        React.createElement('p', { className: 'try-quality-inline' },
          result.data_quality.confidence_note + ' ' + t(
            'This analysis is based on ingredient data, not clinical testing. Individual results vary.',
            '이 분석은 성분 데이터에 기반하며, 임상 테스트 결과가 아닙니다. 개인차가 있습니다.'
          )
        )
      ),

      // ── Single-product mode: rich ingredient breakdown ──
      result.mode === 'single' && React.createElement(Reveal, { delay: 50 },
        React.createElement('div', { className: 'try-result-card' },
          React.createElement('header', { className: 'ing-head', style: { marginBottom: 16 } },
            React.createElement('div', null,
              React.createElement('h2', { className: 'sec-h', style: { display: 'flex', alignItems: 'center', gap: 8 } },
                t('The anatomy', '이 제품의 아나토미')
              ),
              React.createElement('p', { className: 'sec-sub' },
                t('Tap any ingredient to read what it does.', '성분을 탭하면 설명을 볼 수 있어요.')
              )
            ),
            null
          ),
          // Intent groups — active story + comfort layer
          (function() {
            var SYM_COLORS = ['#C05A3C','#5F7A8A','#9A7B5B','#1A1916','#7B6180','#D4944C','#5A7D7C','#8B6F4E','#6B5B7B','#7A7570'];
            var colorIdx = 0;
            return (result.positive_themes || []).map(function(group, gi) {
              return React.createElement('div', { key: gi, className: 'try-cat-group' },
                React.createElement('h4', { className: 'try-cat-label' }, group.theme_name),
                React.createElement('p', { className: 'try-cat-sub' }, group.subtitle),
                React.createElement(TryIngScroll, null,
                  (group.ingredients || []).map(function(ing) {
                    var name = isKo ? (ing.name_ko || ing.name) : ing.name;
                    var flagLabel = ing.flag_type === 'eu26' ? t('EU-26 allergen', 'EU-26 알레르겐')
                      : ing.flag_type === 'essential-oil' ? t('Essential oil', '에센셜 오일')
                      : ing.flag_type === 'sensitizer' ? t('Sensitizer', '민감 성분')
                      : null; // irritation_risk badge removed — not calibrated enough to display yet
                    var symBg = ing.flagged ? '#c0392b' : SYM_COLORS[colorIdx % SYM_COLORS.length];
                    colorIdx++;
                    return React.createElement('div', { key: ing.id, className: cn('ing-card', ing.flagged && 'try-ing-flagged') },
                      React.createElement('button', { className: 'ing-card-main', onClick: function() { setSelIng(ing); } },
                        React.createElement('span', { className: 'ing-sym', style: { background: symBg } }, ing.symbol),
                        React.createElement('div', { className: 'ing-body' },
                          React.createElement('p', { className: 'ing-name' }, name),
                          flagLabel && React.createElement('span', { className: 'try-flag-badge' }, flagLabel)
                        )
                      )
                    );
                  })
                )
              );
            });
          })(),
          // Flagged ingredients callout (if any)
          result.avoid_ingredients.length > 0 && React.createElement('div', { className: 'try-flags-callout' },
            React.createElement('h4', { className: 'try-flags-title' },
              singleIsWorks
                ? t('Ingredients to be aware of', '참고할 성분')
                : t('Likely sensitivity candidates', '민감 반응 후보 성분')
            ),
            result.avoid_ingredients.map(function(item, i) {
              return React.createElement('div', { key: i, className: 'try-avoid-item' },
                React.createElement('div', { className: 'try-avoid-head' },
                  React.createElement('div', { className: 'ing-sym', style: { width: 32, height: 32, fontSize: 13, borderRadius: 8, background: '#c0392b' } }, item.symbol || '!'),
                  React.createElement('strong', null, isKo ? (item.ingredient_name_ko || item.ingredient_name_en) : item.ingredient_name_en)
                ),
                React.createElement('p', { className: 'try-avoid-reason' }, item.reason)
              );
            })
          ),
          result.avoid_ingredients.length === 0 && React.createElement('div', { className: 'try-flags-callout try-flags-clear' },
            React.createElement('p', null,
              t('No commonly flagged sensitizers or allergens found in this product\u2019s ingredient list.',
                '이 제품의 성분 목록에서 일반적으로 알려진 민감 성분이나 알레르겐이 발견되지 않았습니다.')
            )
          )
        )
      ),

      // ── Comparative mode: avoid card ──
      result.mode !== 'single' && React.createElement(Reveal, { delay: 50 },
        React.createElement('div', { className: 'try-result-card try-card-avoid' },
          React.createElement('h2', { className: 'try-result-title' },
            t('What you may want to avoid', '주의가 필요한 성분')
          ),
          result.avoid_ingredients.length === 0
            ? React.createElement('p', { className: 'try-result-empty' },
                t('No commonly flagged irritants were detected. Triggers may be in ingredients our database doesn\u2019t fully cover yet.',
                    '일반적으로 알려진 자극 성분이 감지되지 않았습니다. 아직 전성분 데이터가 완전하지 않아 원인 성분이 누락되었을 수 있습니다.')
              )
            : React.createElement(TryIngScroll, null,
                result.avoid_ingredients.map(function(item, i) {
                  var name = isKo ? (item.ingredient_name_ko || item.ingredient_name_en) : item.ingredient_name_en;
                  return React.createElement('div', { key: i, className: 'ing-card try-ing-flagged' },
                    React.createElement('button', { className: 'ing-card-main', onClick: function() { setSelIng({
                      name: item.ingredient_name_en, name_ko: item.ingredient_name_ko,
                      symbol: item.symbol, category: item.category, flagged: true, flag_type: item.flag_type,
                      description: item.description, description_ko: item.description_ko,
                      science: item.science, science_ko: item.science_ko
                    }); } },
                      React.createElement('span', { className: 'ing-sym', style: { background: '#c0392b' } }, item.symbol),
                      React.createElement('div', { className: 'ing-body' },
                        React.createElement('p', { className: 'ing-name' }, name),
                        (item.flag_type === 'eu26' || item.flag_type === 'essential-oil' || item.flag_type === 'sensitizer') &&
                          React.createElement('span', { className: 'try-flag-badge' },
                            item.flag_type === 'eu26' ? t('EU-26 allergen', 'EU-26 알레르겐')
                            : item.flag_type === 'essential-oil' ? t('Essential oil', '에센셜 오일')
                            : t('Sensitizer', '민감 성분')
                          )
                      )
                    )
                  );
                })
              ),
          // Show reasons below the cards
          result.avoid_ingredients.length > 0 && React.createElement('div', { style: { marginTop: 12 } },
            result.avoid_ingredients.map(function(item, i) {
              return React.createElement('p', { key: i, className: 'try-avoid-reason', style: { margin: '6px 0' } },
                React.createElement('strong', null, isKo ? (item.ingredient_name_ko || item.ingredient_name_en) : item.ingredient_name_en),
                ' — ', item.reason
              );
            })
          )
        )
      ),

      // ── Comparative mode: positive themes card ──
      result.mode !== 'single' && React.createElement(Reveal, { delay: 150 },
        React.createElement('div', { className: 'try-result-card try-card-positive' },
          React.createElement('h2', { className: 'try-result-title' },
            t('What your skin responds to', '피부가 반응하는 성분')
          ),
          result.positive_themes.length === 0
            ? React.createElement('p', { className: 'try-result-empty' },
                t('No strong ingredient patterns found.', '강한 성분 패턴이 발견되지 않았습니다.')
              )
            : (function() {
                var SYM_COLORS = ['#C05A3C','#5F7A8A','#9A7B5B','#1A1916','#7B6180','#D4944C','#5A7D7C','#8B6F4E','#6B5B7B','#7A7570'];
                var cIdx = 0;
                return result.positive_themes.map(function(theme, i) {
                  return React.createElement('div', { key: i, className: 'try-cat-group' },
                    React.createElement('h4', { className: 'try-cat-label' }, theme.theme_name),
                    theme.subtitle && React.createElement('p', { className: 'try-cat-sub' }, theme.subtitle),
                    React.createElement(TryIngScroll, null,
                      (theme.ingredients || []).map(function(ing) {
                        var name = isKo ? (ing.name_ko || ing.name) : ing.name;
                        var symBg = SYM_COLORS[cIdx % SYM_COLORS.length];
                        cIdx++;
                        return React.createElement('div', { key: ing.id, className: 'ing-card' },
                          React.createElement('button', { className: 'ing-card-main', onClick: function() { setSelIng(ing); } },
                            React.createElement('span', { className: 'ing-sym', style: { background: symBg } }, ing.symbol),
                            React.createElement('div', { className: 'ing-body' },
                              React.createElement('p', { className: 'ing-name' }, name)
                            )
                          )
                        );
                      })
                    )
                  );
                });
              })()
        )
      ),

      // ── Comparative mode: per-product ingredient breakdowns ──
      result.mode !== 'single' && result.product_breakdowns && result.product_breakdowns.length > 0 &&
        React.createElement(Reveal, { delay: 200 },
          React.createElement('div', { className: 'try-result-card' },
            React.createElement('h2', { className: 'try-result-title' },
              t('Ingredients by product', '제품별 성분')
            ),
            React.createElement('p', { className: 'try-result-disclaimer' },
              t('Tap a product to expand its ingredient list. Tap any ingredient to read what it does.',
                '제품을 탭하면 성분 목록이 펼쳐져요. 성분을 탭하면 설명을 볼 수 있어요.')
            ),
            result.product_breakdowns.map(function(pb) {
              var isExpanded = expandedProducts.indexOf(pb.id) >= 0;
              var displayName = isKo ? (pb.nameKo || pb.name) : pb.name;
              var toggleExpand = function() {
                setExpandedProducts(function(prev) {
                  return isExpanded
                    ? prev.filter(function(id) { return id !== pb.id; })
                    : prev.concat([pb.id]);
                });
              };
              var SYM_COLORS_PB = ['#C05A3C','#5F7A8A','#9A7B5B','#1A1916','#7B6180','#D4944C','#5A7D7C','#8B6F4E','#6B5B7B','#7A7570'];
              var pbColorIdx = 0;

              return React.createElement('div', { key: pb.id, className: 'try-product-breakdown' },
                React.createElement('button', { className: 'try-product-toggle', onClick: toggleExpand },
                  React.createElement('div', { className: 'try-product-toggle-left' },
                    !pb.isPasted && pb.brand && React.createElement('span', { className: 'try-product-brand' }, pb.brand),
                    React.createElement('span', { className: 'try-product-name' }, displayName),
                    React.createElement('span', {
                      className: 'try-product-badge' + (pb.isWorks ? ' try-product-badge--works' : ' try-product-badge--doesnt')
                    }, pb.isWorks ? '\u2705' : '\uD83D\uDEAB')
                  ),
                  React.createElement('div', { className: 'try-product-toggle-right' },
                    React.createElement('span', { className: 'try-product-count' },
                      pb.totalCount + ' ' + t('ingredients', '성분')
                    ),
                    React.createElement('span', { className: 'try-product-chevron' + (isExpanded ? ' try-product-chevron--open' : '') }, '\u203A')
                  )
                ),
                isExpanded && React.createElement('div', { className: 'try-product-body' },
                  pb.activeIngs.length > 0 && React.createElement('div', { className: 'try-cat-group' },
                    React.createElement('h4', { className: 'try-cat-label' },
                      t('\u2728 Active ingredients', '\u2728 활성 성분')
                    ),
                    React.createElement(TryIngScroll, null,
                      pb.activeIngs.map(function(ing) {
                        var name = isKo ? (ing.name_ko || ing.name) : ing.name;
                        var symBg = ing.flagged ? '#c0392b' : SYM_COLORS_PB[pbColorIdx % SYM_COLORS_PB.length];
                        pbColorIdx++;
                        return React.createElement('div', { key: ing.id, className: cn('ing-card', ing.flagged && 'try-ing-flagged') },
                          React.createElement('button', { className: 'ing-card-main', onClick: function() { setSelIng(ing); } },
                            React.createElement('span', { className: 'ing-sym', style: { background: symBg } }, ing.symbol),
                            React.createElement('div', { className: 'ing-body' },
                              React.createElement('p', { className: 'ing-name' }, name)
                            )
                          )
                        );
                      })
                    )
                  ),
                  pb.comfortIngs.length > 0 && React.createElement('div', { className: 'try-cat-group' },
                    React.createElement('h4', { className: 'try-cat-label' },
                      t('\uD83E\uDEE7 Comfort & hydration', '\uD83E\uDEE7 보습 & 진정')
                    ),
                    React.createElement(TryIngScroll, null,
                      pb.comfortIngs.map(function(ing) {
                        var name = isKo ? (ing.name_ko || ing.name) : ing.name;
                        var symBg = ing.flagged ? '#c0392b' : SYM_COLORS_PB[pbColorIdx % SYM_COLORS_PB.length];
                        pbColorIdx++;
                        return React.createElement('div', { key: ing.id, className: cn('ing-card', ing.flagged && 'try-ing-flagged') },
                          React.createElement('button', { className: 'ing-card-main', onClick: function() { setSelIng(ing); } },
                            React.createElement('span', { className: 'ing-sym', style: { background: symBg } }, ing.symbol),
                            React.createElement('div', { className: 'ing-body' },
                              React.createElement('p', { className: 'ing-name' }, name)
                            )
                          )
                        );
                      })
                    )
                  ),
                  pb.activeIngs.length === 0 && pb.comfortIngs.length === 0 &&
                    React.createElement('p', { className: 'try-result-empty' },
                      t('Only base/filler ingredients found for this product.', '이 제품은 기본/충전 성분만 확인됐어요.')
                    )
                )
              );
            })
          )
        ),

      // Card 3: Recommendations
      React.createElement(Reveal, { delay: 250 },
        React.createElement('div', { className: 'try-result-card' },
          React.createElement('h2', { className: 'try-result-title' },
            result.mode === 'single'
              ? (singleIsWorks
                  ? t('You might also like', '이런 제품도 좋아할 수 있어요')
                  : t('Alternatives to consider', '대안이 될 수 있는 제품'))
              : t('You might also try', '이런 제품도 추천해요')
          ),
          React.createElement('p', { className: 'try-result-disclaimer' },
            result.mode === 'single'
              ? (singleIsWorks
                  ? t('Products with a similar ingredient profile.', '유사한 성분 구성을 가진 제품입니다.')
                  : t('Products that exclude the flagged ingredients above.', '위에서 표시된 주의 성분을 포함하지 않는 제품입니다.'))
              : t('Products whose ingredient profile matches your positive signals and avoids your flagged ingredients.',
                  '긍정 신호와 일치하고 주의 성분을 포함하지 않는 제품입니다.')
          ),
          result.recommended_products.length === 0
            ? React.createElement('p', { className: 'try-result-empty' },
                t('No recommendations available with current data.', '현재 데이터로는 추천을 제공할 수 없습니다.')
              )
            : result.recommended_products.map(renderProductLink)
        )
      ),

    ),

    // ── Ingredient detail sheet (reuses product-page sheet UI) ──
    selIng && React.createElement('div', { className: 'sheet-back', onClick: function() { setSelIng(null); } },
      React.createElement('div', { className: 'sheet', onClick: function(e) { e.stopPropagation(); } },
        React.createElement('button', { className: 'sheet-close', onClick: function() { setSelIng(null); } },
          React.createElement(Icon, { name: 'x', size: 16 })
        ),
        React.createElement('div', { className: 'sheet-sym', style: selIng.flagged ? { background: '#c0392b' } : undefined }, selIng.symbol),
        React.createElement('h3', { className: 'sheet-name' }, isKo ? (selIng.name_ko || selIng.name) : selIng.name),
        React.createElement('p', { style: { fontSize: 12, color: 'var(--ink-faint)', margin: '4px 0 12px', textTransform: 'uppercase', letterSpacing: '0.04em' } }, catLabel(selIng.category)),
        (isKo ? (selIng.science_ko || selIng.science) : selIng.science)
          ? React.createElement('p', { className: 'sheet-sci' }, isKo ? (selIng.science_ko || selIng.science) : selIng.science)
          : (isKo ? (selIng.description_ko || selIng.description) : selIng.description)
            ? React.createElement('p', { className: 'sheet-sci' }, isKo ? (selIng.description_ko || selIng.description) : selIng.description)
            : React.createElement('p', { className: 'sheet-sci', style: { color: 'var(--ink-faint)', fontStyle: 'italic' } },
                t('No description available yet for this ingredient.', '아직 이 성분에 대한 설명이 없습니다.')
              ),
        selIng.flagged && React.createElement('div', { style: { marginTop: 12, padding: '10px 14px', background: 'rgba(192,57,44,0.06)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(192,57,44,0.15)' } },
          React.createElement('span', { className: 'try-flag-badge', style: { marginBottom: 6, display: 'inline-block' } },
            selIng.flag_type === 'eu26' ? t('EU-26 fragrance allergen', 'EU-26 향료 알레르겐')
            : selIng.flag_type === 'essential-oil' ? t('Essential oil', '에센셜 오일')
            : selIng.flag_type === 'sensitizer' ? t('Known sensitizer', '알려진 민감 성분')
            : t('Irritation potential', '자극 가능성')
          )
        )
      )
    )
  );
};
