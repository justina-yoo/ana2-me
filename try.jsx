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

  const MAX_PER_SIDE = 10;
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
            is_hero: r.is_hero,
            sort_order: r.sort_order,
            flagged: isFlagged,
            flag_type: ing.is_eu_26_fragrance_allergen ? 'eu26' : ing.is_essential_oil ? 'essential-oil' : ing.is_known_sensitizer ? 'sensitizer' : (ing.irritation_risk === 'high' || ing.irritation_risk === 'medium') ? 'irritant' : null,
            irritation_risk: ing.irritation_risk
          };
        }).filter(Boolean);

        // Group by category for breakdown
        var catGroups = {};
        allIngs.forEach(function(ing) {
          var cat = ing.category;
          if (!catGroups[cat]) catGroups[cat] = [];
          catGroups[cat].push(ing);
        });

        var breakdown = Object.entries(catGroups)
          .sort(function(a, b) { return b[1].length - a[1].length; })
          .map(function(entry) {
            var cat = entry[0], ings = entry[1];
            return {
              theme_name: catLabel(cat),
              function_category: cat,
              ingredients: ings
            };
          });

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

        var productCats = new Set(Object.keys(catGroups).filter(function(c) { return c !== 'uncategorized' && c !== 'other'; }));
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
          if (recIds.length >= 5) return;
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
          var conf = item.count >= totalD ? 'high' : item.count >= Math.ceil(totalD / 2) ? 'medium' : 'low';
          return {
            ingredient_name_en: item.ing.name,
            ingredient_name_ko: item.ing.name_ko,
            reason: negativeReason(item.ing, item.count, totalD),
            confidence: conf
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

      // Aggregate by function category
      var categoryGroups = {};
      positiveIngredients.forEach(function(item) {
        var cat = item.ing.category || 'uncategorized';
        if (cat === 'other' || cat === 'uncategorized') return;
        if (!categoryGroups[cat]) categoryGroups[cat] = [];
        categoryGroups[cat].push(item.ing);
      });

      var positiveThemes = Object.entries(categoryGroups)
        .sort(function(a, b) { return b[1].length - a[1].length; })
        .slice(0, 5)
        .map(function(entry) {
          var cat = entry[0], ings = entry[1];
          var examples = ings.slice(0, 3).map(function(ig) { return isKo ? (ig.name_ko || ig.name) : ig.name; });
          return { theme_name: catLabel(cat), example_ingredients_seen: examples, function_category: cat };
        });

      if (positiveThemes.length === 0 && positiveIngredients.length > 0) {
        var examples = positiveIngredients.slice(0, 5).map(function(item) { return isKo ? (item.ing.name_ko || item.ing.name) : item.ing.name; });
        positiveThemes.push({
          theme_name: t('Ingredients your skin responded well to', '피부에 잘 맞은 성분'),
          example_ingredients_seen: examples,
          function_category: 'mixed'
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
        if (recommendations.length >= 5) return;
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

  // ── Product Picker ──
  function ProductPicker({ label, labelKo, selected, setSelected, max, icon }) {
    var [q, setQ] = useState('');
    var [open, setOpen] = useState(false);
    var inputRef = useRef(null);

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

    return React.createElement('div', { className: 'try-picker' },
      React.createElement('h3', { className: 'try-picker-label' },
        React.createElement('span', { className: 'try-picker-icon' }, icon),
        ' ',
        t(label, labelKo),
        React.createElement('span', { className: 'try-picker-count' }, selected.length + '/' + max)
      ),
      selected.map(function(p) {
        var name = isKo && p.nameKo ? p.nameKo : p.name;
        return React.createElement('div', { key: p.id, className: 'try-chip' },
          React.createElement('div', { className: 'try-chip-img' },
            React.createElement(ProductImg, { src: p.imageUrl, alt: name })
          ),
          React.createElement('span', { className: 'try-chip-brand' }, p.brand),
          React.createElement('span', { className: 'try-chip-name' }, name),
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
                React.createElement(ProductImg, { src: p.imageUrl, alt: name })
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
  function NudgeMessage() {
    if (!result) return null;
    var w = works.length, d = doesnt.length;
    if (w >= 3 && d >= 3) return null;
    var msg;
    if (isSingleMode) {
      msg = t(
        'Add products to both lists for a comparative pattern analysis.',
        '양쪽 목록에 제품을 추가하면 비교 패턴 분석을 할 수 있습니다.'
      );
    } else {
      msg = t(
        'Add more products for a sharper analysis. Best results with 3+ in each list.',
        '더 많은 제품을 추가하면 더 정확한 분석이 가능합니다. 각 목록에 3개 이상이면 최적입니다.'
      );
    }
    return React.createElement('p', { className: 'try-nudge' }, msg);
  }

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
        React.createElement(ProductImg, { src: p.imageUrl, alt: name })
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
          'Add one product for a quick breakdown, or compare products that suit you vs. ones that don\u2019t for a full pattern analysis.',
          '제품 1개를 추가하면 성분 분석을, 잘 맞는 제품과 맞지 않는 제품을 비교하면 전체 패턴 분석을 해드립니다.'
        )
      )
    ),

    // Pickers
    React.createElement('section', { className: 'try-pickers' },
      React.createElement(ProductPicker, {
        label: 'Products that suit you', labelKo: '잘 맞는 제품',
        selected: works, setSelected: setWorks, max: MAX_PER_SIDE, icon: '\u2764\uFE0F'
      }),
      React.createElement(ProductPicker, {
        label: 'Products that don\u2019t suit you', labelKo: '맞지 않는 제품',
        selected: doesnt, setSelected: setDoesnt, max: MAX_PER_SIDE, icon: '\uD83D\uDEAB'
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
    result && React.createElement('section', { className: 'try-results' },

      // Mode badge + confidence
      React.createElement(Reveal, null,
        React.createElement('div', { className: 'try-mode-badge' },
          React.createElement(ConfBadge, { level: getConfidenceLevel() }),
          React.createElement('span', { className: 'try-mode-label' },
            result.mode === 'single'
              ? t('Single product analysis', '단일 제품 분석')
              : t('Comparative pattern analysis', '비교 패턴 분석')
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
                t('Full ingredient breakdown by function.', '기능별 전체 성분 분석.')
              )
            ),
            React.createElement(Sticker, { color: 'butter', rotate: -5 },
              (result.all_ingredients || []).length + ' ' + t('ingredients', '성분')
            )
          ),
          // Ingredient cards grouped by category
          (result.positive_themes || []).map(function(group, gi) {
            return React.createElement('div', { key: gi, className: 'try-cat-group' },
              React.createElement('h4', { className: 'try-cat-label' }, group.theme_name),
              React.createElement('div', { className: 'try-ing-list' },
                (group.ingredients || []).map(function(ing, ii) {
                  var name = isKo ? (ing.name_ko || ing.name) : ing.name;
                  var flagLabel = ing.flag_type === 'eu26' ? t('EU-26 allergen', 'EU-26 알레르겐')
                    : ing.flag_type === 'essential-oil' ? t('Essential oil', '에센셜 오일')
                    : ing.flag_type === 'sensitizer' ? t('Sensitizer', '민감 성분')
                    : ing.flag_type === 'irritant' ? t('Irritant', '자극 성분')
                    : null;
                  return React.createElement('div', { key: ing.id, className: cn('ing-card', ing.flagged && 'try-ing-flagged'), style: { '--i': gi * 10 + ii } },
                    React.createElement('div', { className: 'ing-card-main' },
                      React.createElement('span', { className: 'ing-sym' }, ing.symbol),
                      React.createElement('div', { className: 'ing-body' },
                        React.createElement('p', { className: 'ing-name' }, name),
                        flagLabel && React.createElement('span', { className: 'try-flag-badge' }, flagLabel)
                      )
                    )
                  );
                })
              )
            );
          }),
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
        React.createElement('div', { className: 'try-result-card' },
          React.createElement('h2', { className: 'try-result-title' },
            t('What you may want to avoid', '주의가 필요한 성분')
          ),
          result.avoid_ingredients.length === 0
            ? React.createElement('p', { className: 'try-result-empty' },
                t('No commonly flagged irritants were detected. Triggers may be in ingredients our database doesn\u2019t fully cover yet.',
                    '일반적으로 알려진 자극 성분이 감지되지 않았습니다. 아직 전성분 데이터가 완전하지 않아 원인 성분이 누락되었을 수 있습니다.')
              )
            : result.avoid_ingredients.map(function(item, i) {
                return React.createElement('div', { key: i, className: 'try-avoid-item' },
                  React.createElement('div', { className: 'try-avoid-head' },
                    React.createElement('strong', null, isKo ? (item.ingredient_name_ko || item.ingredient_name_en) : item.ingredient_name_en),
                    React.createElement(ConfBadge, { level: item.confidence })
                  ),
                  React.createElement('p', { className: 'try-avoid-reason' }, item.reason)
                );
              })
        )
      ),

      // ── Comparative mode: positive themes card ──
      result.mode !== 'single' && React.createElement(Reveal, { delay: 150 },
        React.createElement('div', { className: 'try-result-card' },
          React.createElement('h2', { className: 'try-result-title' },
            t('What your skin responds to', '피부가 반응하는 성분')
          ),
          result.positive_themes.length === 0
            ? React.createElement('p', { className: 'try-result-empty' },
                t('No strong ingredient patterns found.', '강한 성분 패턴이 발견되지 않았습니다.')
              )
            : result.positive_themes.map(function(theme, i) {
                return React.createElement('div', { key: i, className: 'try-theme-item' },
                  React.createElement('h4', { className: 'try-theme-name' }, theme.theme_name),
                  React.createElement('div', { className: 'try-theme-examples' },
                    (theme.example_ingredients_seen || []).map(function(ex, j) {
                      return React.createElement('span', { key: j, className: 'try-theme-pill' }, ex);
                    })
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

      // Nudge
      React.createElement(NudgeMessage),

      // Data quality
      React.createElement(Reveal, { delay: 350 },
        React.createElement('div', { className: 'try-quality' },
          React.createElement('p', null, result.data_quality.confidence_note),
          React.createElement('p', { style: { marginTop: 6, fontSize: 11 } },
            t(
              'This analysis is based on ingredient data, not clinical testing. Individual results vary. This is not medical advice.',
              '이 분석은 성분 데이터에 기반하며, 임상 테스트 결과가 아닙니다. 개인차가 있으며 의료 조언이 아닙니다.'
            )
          )
        )
      )
    )
  );
};
