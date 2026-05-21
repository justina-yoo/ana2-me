// Analyze — Ingredient Pattern Analysis (no login, no persistence)
// Mode 1: single-product breakdown | Mode 2: comparative pattern analysis
window.Try = function Try({ lang, products, setView, setProduct }) {
  const t = useL(lang);
  const isKo = lang === 'ko';
  const [works, setWorks] = useState([]);
  const [doesnt, setDoesnt] = useState([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selIng, setSelIng] = useState(null);
  const resultsRef = useRef(null);
  useEffect(function() {
    if (result && resultsRef.current) {
      setTimeout(function() {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [result]);

  const MAX_PER_SIDE = 3;
  const allSelected = [...works, ...doesnt].map(function(p) { return p.id; });
  const totalCount = works.length + doesnt.length;
  const canAnalyze = totalCount >= 1;
  const isSingleMode = totalCount === 1;
  var singleProduct = isSingleMode ? (works[0] || doesnt[0]) : null;
  var singleIsWorks = isSingleMode && works.length === 1;

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

  // ── Reason templates (MFDS-safe) ──
  function negativeReason(ing, count, totalDoesnt) {
    var name = isKo ? (ing.name_ko || ing.name) : ing.name;
    var freq = count >= totalDoesnt
      ? t('appeared in all ' + totalDoesnt + ' products', totalDoesnt + '개 제품 모두에 포함')
      : count === 1
        ? t('appeared in 1 product', '1개 제품에 포함')
        : t('appeared in ' + count + ' of ' + totalDoesnt + ' products', totalDoesnt + '개 중 ' + count + '개 제품에 포함');

    if (ing.is_eu_26_fragrance_allergen) {
      return mfdsSafe(t(
        name + ' is an EU-listed fragrance allergen that may cause sensitivity in some skin types. ' + freq + ' that did not suit you.',
        name + '은(는) EU 지정 향료 알레르겐으로, 일부 피부 유형에서 민감 반응을 유발할 수 있습니다. ' + freq + '.'
      ));
    }
    if (ing.is_essential_oil) {
      return mfdsSafe(t(
        name + ' is an essential oil that may cause sensitivity in some skin types. ' + freq + ' that did not suit you.',
        name + '은(는) 에센셜 오일로, 일부 피부 유형에서 민감 반응을 유발할 수 있습니다. ' + freq + '.'
      ));
    }
    if (ing.is_known_sensitizer) {
      return mfdsSafe(t(
        name + ' is a commonly flagged ingredient that may cause sensitivity. ' + freq + ' that did not suit you.',
        name + '은(는) 일반적으로 민감 반응이 보고된 성분입니다. ' + freq + '.'
      ));
    }
    if (ing.irritation_risk === 'high' || ing.irritation_risk === 'medium') {
      return mfdsSafe(t(
        name + ' has a ' + ing.irritation_risk + ' irritation potential for some skin types. ' + freq + ' that did not suit you.',
        name + '은(는) ' + (ing.irritation_risk === 'high' ? '높은' : '중간') + ' 자극 가능성이 있는 성분입니다. ' + freq + '.'
      ));
    }
    return mfdsSafe(t(
      name + ' ' + freq + ' that did not suit you and is worth monitoring.',
      name + ' ' + freq + '. 주의가 필요한 성분일 수 있습니다.'
    ));
  }

  function singleFlagReason(ing) {
    var name = isKo ? (ing.name_ko || ing.name) : ing.name;
    // Support both raw Supabase shape (is_eu_26_fragrance_allergen) and enriched shape (flag_type)
    var ft = ing.flag_type || (ing.is_eu_26_fragrance_allergen ? 'eu26' : ing.is_essential_oil ? 'essential-oil' : ing.is_known_sensitizer ? 'sensitizer' : 'irritant');
    if (ft === 'eu26') {
      return mfdsSafe(t(
        name + ' is an EU-listed fragrance allergen — if you\u2019ve reacted to similar ingredients before, be aware.',
        name + '은(는) EU 지정 향료 알레르겐입니다. 유사 성분에 민감 반응 경험이 있다면 참고하세요.'
      ));
    }
    if (ft === 'essential-oil') {
      return mfdsSafe(t(
        name + ' is an essential oil — a likely candidate if you experience sensitivity with this product.',
        name + '은(는) 에센셜 오일입니다. 이 제품에서 민감 반응이 있다면 주요 원인 후보입니다.'
      ));
    }
    if (ft === 'sensitizer') {
      return mfdsSafe(t(
        name + ' is a commonly flagged sensitizer — a likely candidate if this product doesn\u2019t suit you.',
        name + '은(는) 일반적으로 민감 반응이 보고된 성분입니다. 이 제품이 맞지 않는다면 주요 원인 후보입니다.'
      ));
    }
    return mfdsSafe(t(
      name + ' has ' + (ing.irritation_risk || 'moderate') + ' irritation potential for some skin types.',
      name + '은(는) ' + (ing.irritation_risk === 'high' ? '높은' : '중간') + ' 자극 가능성이 있는 성분입니다.'
    ));
  }

  // ── ENGINE ──
  async function runAnalysis() {
    setBusy(true); setError(null); setResult(null);
    try {
      var inputIds = [...works, ...doesnt].map(function(p) { return p.id; });
      var data = await window.__supabase.fetchAnalyzeData(inputIds);
      var inputRows = data.inputRows;
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
        var allIngs = rows.map(function(r) {
          var ing = r.ingredient; if (!ing) return null;
          var isFlagged = ing.is_known_sensitizer || ing.is_eu_26_fragrance_allergen ||
                          ing.is_essential_oil || ing.irritation_risk === 'high' || ing.irritation_risk === 'medium';
          return {
            id: ing.id,
            name: ing.name,
            name_ko: ing.name_ko,
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
        }).filter(Boolean);

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
            theme_name: t('\u2728 What makes it special', '\u2728 이 제품을 특별하게 만드는 성분'),
            subtitle: t('The active ingredients doing the heavy lifting.', '핵심적인 역할을 하는 활성 성분들.'),
            function_category: '_active',
            ingredients: activeIngs
          });
        }
        if (comfortIngs.length > 0) {
          breakdown.push({
            theme_name: t('\uD83E\uDEE7 What makes it gentle', '\uD83E\uDEE7 왜 편안한지'),
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
        var cNote = mfdsSafe(t(
          'Single product mode. ' + totalIngredientsAnalyzed + ' ingredients analyzed. ' +
          (heroOnlyCount > 0 ? 'This product has key-ingredient data only (not the full formula).' : 'Full ingredient list available.'),
          '단일 제품 모드. ' + totalIngredientsAnalyzed + '개 성분 분석. ' +
          (heroOnlyCount > 0 ? '이 제품은 주요 성분 데이터만 보유하고 있습니다 (전성분 아님).' : '전성분 데이터 사용.')
        ));

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
            reason: negativeReason(ing, item.count, totalD),
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
          theme_name: t('\u2728 What makes it special', '\u2728 이 제품을 특별하게 만드는 성분'),
          subtitle: t('Active ingredients shared across your "works" products.', '잘 맞는 제품들에 공통으로 포함된 활성 성분.'),
          function_category: '_active',
          ingredients: posActives
        });
      }
      if (posComfort.length > 0) {
        positiveThemes.push({
          theme_name: t('\uD83E\uDEE7 What makes it gentle', '\uD83E\uDEE7 왜 편안한지'),
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

      setResult({
        mode: 'comparative',
        avoid_ingredients: negatives,
        positive_themes: positiveThemes,
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
    var inputRef = useRef(null);
    var accentClass = accent === 'rose' ? 'try-picker--rose' : 'try-picker--green';

    var filtered = (products || []).filter(function(p) {
      if (p.category !== 'skincare') return false;
      if (allSelected.includes(p.id)) return false;
      if (!q.trim()) return true;
      var lower = q.toLowerCase();
      return p.name.toLowerCase().includes(lower) ||
             (p.nameKo || '').toLowerCase().includes(lower) ||
             p.brand.toLowerCase().includes(lower);
    });

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

    // Progress dots
    var dots = [];
    for (var di = 0; di < max; di++) {
      dots.push(React.createElement('span', {
        key: di,
        className: 'try-dot' + (di < selected.length ? ' try-dot--filled' : '')
      }));
    }

    var focusSearch = function() { if (inputRef.current) inputRef.current.focus(); };

    return React.createElement('div', { className: 'try-picker ' + accentClass, onClick: focusSearch, style: { cursor: selected.length < max ? 'text' : 'default' } },
      React.createElement('h3', { className: 'try-picker-label' },
        React.createElement('span', { className: 'try-picker-icon-wrap' }, icon),
        ' ',
        t(label, labelKo),
        React.createElement('span', { className: 'try-picker-dots' }, dots)
      ),
      selected.map(function(p) {
        var name = isKo && p.nameKo ? p.nameKo : p.name;
        return React.createElement('div', { key: p.id, className: 'try-chip' },
          React.createElement('div', { className: 'try-chip-img' },
            React.createElement(ProductImg, { src: p.imageUrl, alt: p.brand + ' ' + name })
          ),
          React.createElement('div', { className: 'try-chip-text' },
            React.createElement('span', { className: 'try-chip-brand' }, p.brand),
            React.createElement('span', { className: 'try-chip-name' }, name)
          ),
          React.createElement('button', { className: 'try-chip-x', onClick: function() { remove(p.id); }, 'aria-label': 'Remove' },
            React.createElement(Icon, { name: 'x', size: 12 })
          )
        );
      }),
      selected.length === 0 && selected.length < max && React.createElement('div', { className: 'try-empty' },
        React.createElement('span', { className: 'try-empty-text' },
          t('Search and add up to ' + max + ' products', '제품을 검색해서 최대 ' + max + '개 추가하세요')
        )
      ),
      selected.length < max && React.createElement('div', { className: 'try-search-wrap', style: { position: 'relative' } },
        React.createElement('div', { className: 'try-search' },
          React.createElement(Icon, { name: 'search', size: 14 }),
          React.createElement('input', {
            ref: inputRef,
            value: q,
            onChange: function(e) { setQ(e.target.value); setOpen(true); },
            onFocus: function() { setOpen(true); },
            onBlur: function() { setTimeout(function() { setOpen(false); }, 200); },
            placeholder: t('Search products...', '제품 검색...'),
            className: 'try-search-input'
          })
        ),
        open && filtered.length > 0 && React.createElement('div', { className: 'try-dropdown', onMouseDown: function(e) { e.preventDefault(); } },
          filtered.map(function(p) {
            var name = isKo && p.nameKo ? p.nameKo : p.name;
            return React.createElement('button', {
              key: p.id, className: 'try-dropdown-item',
              onMouseDown: function(e) { e.preventDefault(); },
              onClick: function() { add(p); }
            },
              React.createElement('div', { className: 'try-dd-img' },
                React.createElement(ProductImg, { src: p.imageUrl, alt: p.brand + ' ' + name })
              ),
              React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                React.createElement('span', { className: 'try-dd-brand' }, p.brand),
                React.createElement('span', { className: 'try-dd-name' }, name)
              )
            );
          })
        )
      )
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

    // Analyze button
    React.createElement('div', { className: 'try-action' },
      React.createElement('button', {
        className: 'try-btn',
        disabled: !canAnalyze || busy,
        onClick: runAnalysis
      },
        busy
          ? t('Analyzing...', '분석 중...')
          : isSingleMode
            ? t('Analyze this product', '이 제품 분석하기')
            : t('Analyze my ingredient pattern', '내 성분 패턴 분석하기')
      ),
      totalCount === 0 &&
        React.createElement('p', { className: 'try-hint' },
          t('Add at least one product to begin.', '시작하려면 제품을 1개 이상 추가하세요.')
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
                t('Scroll each section to see all ingredients.', '각 섹션을 스크롤하여 모든 성분을 확인하세요.')
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
                      : ing.flag_type === 'irritant' ? t('Irritant', '자극 성분')
                      : null;
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
                        React.createElement('span', { className: 'try-flag-badge' },
                          item.flag_type === 'eu26' ? t('EU-26 allergen', 'EU-26 알레르겐')
                          : item.flag_type === 'essential-oil' ? t('Essential oil', '에센셜 오일')
                          : item.flag_type === 'sensitizer' ? t('Sensitizer', '민감 성분')
                          : t('Irritant', '자극 성분')
                        )
                      ),
                      React.createElement(ConfBadge, { level: item.confidence })
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
