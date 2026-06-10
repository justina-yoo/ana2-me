import React, { useState, useEffect, useRef } from 'react';
import { cn, useL, Icon, Sticker, ProductImg, Reveal } from '../components/primitives';
import { fetchAnalyzeData } from '../lib/supabase';
import {
  EU26_ALLERGENS, ESSENTIAL_OILS, KNOWN_SENSITIZERS, POTENT_ACTIVES,
  getFlaggedComponent, matchParsedIngredients,
  resetKnownNames, parseIngredientList,
  BANNED_RE, mfdsSafe, CATEGORY_LABELS,
  PREVALENCE_CEILING, MIN_CONFIDENT_PER_SIDE, POSITIVE_LIST_MAX, NEGATIVE_LIST_MAX,
  SKIP_BASE_NAMES, SKIP_CATS,
  resolveKoName, enrichIngredient, isFlaggedIng, isEligible, negSortCmp, posSortCmp, enrichForResult,
  determineConfidenceTier
} from '../domain/analyzer';

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

// Analyze — Ingredient Pattern Analysis (no login, no persistence)
// Mode 1: single-product breakdown | Mode 2: comparative pattern analysis
export default function Try({ lang, products, setView, setProduct }) {
  const t = useL(lang);
  const isKo = lang === 'ko';
  const [works, setWorks] = useState([]);     // Array of { id, name, ... } OR { id: 'pasted-X', name, _pasted: true, _rawIngredients: [...] }
  const [doesnt, setDoesnt] = useState([]);
  const [neutral, setNeutral] = useState([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selIng, setSelIng] = useState(null);
  const [expandedProducts, setExpandedProducts] = useState([]);
  const [fbState, setFbState] = useState('idle'); // idle | rated | commented | done
  const [fbRating, setFbRating] = useState(null);
  const [fbComment, setFbComment] = useState('');
  const [showFbModal, setShowFbModal] = useState(false);
  const pendingNav = useRef(null);
  const [catalogIngs, setCatalogIngs] = useState(null);
  const [searchLabelVal, setSearchLabelVal] = useState('doesnt');
  const [searchQ, setSearchQ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchShowCount, setSearchShowCount] = useState(8);
  const [searchEditable, setSearchEditable] = useState(false);
  const [scanIdx, setScanIdx] = useState(0);
  const SCAN_IMAGES = ['/img/placeholder-1.png','/img/placeholder-2.png','/img/placeholder-3.png','/img/placeholder-4.png','/img/placeholder-5.png','/img/placeholder-6.png'];
  const SCAN_INGREDIENTS = [
    [
      { type: 'good', en: 'These ingredients suit you well...', ko: '\uC774\uB7F0 \uC131\uBD84\uC774 \uC798 \uB9DE\uC544\uC694...' },
      { type: 'bad', en: 'These may be irritating...', ko: '\uC774\uB7F0 \uC131\uBD84\uC740 \uC790\uADF9\uC801\uC77C \uC218 \uC788\uC5B4\uC694...' }
    ],
    [
      { type: 'good', en: 'Your skin likes soothing actives...', ko: '\uC9C4\uC815 \uC131\uBD84\uC774 \uC798 \uB9DE\uB294 \uD53C\uBD80\uC608\uC694...' },
      { type: 'bad', en: 'Watch out for fragrance...', ko: '\uD5A5\uB8CC \uC131\uBD84\uC740 \uC8FC\uC758\uD574\uC694...' }
    ],
    [
      { type: 'good', en: 'Hydration works great for you...', ko: '\uBCF4\uC2B5 \uC131\uBD84\uC774 \uC798 \uB9DE\uC544\uC694...' },
      { type: 'bad', en: 'Strong actives may be too much...', ko: '\uAC15\uD55C \uD65C\uC131 \uC131\uBD84\uC740 \uC8FC\uC758\uD574\uC694...' }
    ],
    [
      { type: 'good', en: 'Barrier support suits you...', ko: '\uC7A5\uBCBD \uAC15\uD654 \uC131\uBD84\uC774 \uC798 \uB9DE\uC544\uC694...' },
      { type: 'bad', en: 'Some preservatives may sensitize...', ko: '\uC77C\uBD80 \uBC29\uBD80\uC81C\uB294 \uBBFC\uAC10\uD560 \uC218 \uC788\uC5B4\uC694...' }
    ],
    [
      { type: 'good', en: 'Calming ingredients work well...', ko: '\uC9C4\uC815 \uC131\uBD84\uACFC \uC798 \uB9DE\uC544\uC694...' },
      { type: 'bad', en: 'Alcohol-based formulas may dry...', ko: '\uC54C\uCF54\uC62C \uC81C\uD615\uC740 \uAC74\uC870\uD560 \uC218 \uC788\uC5B4\uC694...' }
    ],
    [
      { type: 'good', en: 'Brightening actives suit you...', ko: '\uBE0C\uB77C\uC774\uD2B8\uB2DD \uC131\uBD84\uC774 \uC798 \uB9DE\uC544\uC694...' },
      { type: 'bad', en: 'Essential oils may trigger...', ko: '\uC5D0\uC13C\uC15C \uC624\uC77C\uC740 \uC8FC\uC758\uD574\uC694...' }
    ]
  ];
  var hasProducts = works.length + doesnt.length + neutral.length > 0;
  useEffect(function() {
    if (hasProducts) return; // stop cycling once products are added
    var interval = setInterval(function() {
      setScanIdx(function(prev) { return (prev + 1) % 6; });
    }, 2500);
    return function() { clearInterval(interval); };
  }, [hasProducts]);
  var pastedCounter = useRef(0);
  var autoAnalyze = useRef(false);
  const resultsRef = useRef(null);
  const searchRef = useRef(null);
  useEffect(function() {
    if (result && resultsRef.current) {
      setTimeout(function() {
        var y = resultsRef.current.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 100);
    }
  }, [result]);

  // Lock body scroll when ingredient sheet is open (prevents iOS scroll-to-top)
  useEffect(function() {
    if (selIng) {
      document.body.style.overflow = 'hidden';
      return function() { document.body.style.overflow = ''; };
    }
  }, [selIng]);

  useEffect(function() {
    if (autoAnalyze.current && works.length + doesnt.length > 0) {
      autoAnalyze.current = false;
      runAnalysis();
    }
  }, [works, doesnt]);

  // Reset analyzer when navigating to it via header nav
  useEffect(function() {
    function onReset() {
      setWorks([]); setDoesnt([]); setNeutral([]);
      setResult(null); setError(null); setBusy(false);
    }
    window.addEventListener('ana2me:reset-analyzer', onReset);
    return function() { window.removeEventListener('ana2me:reset-analyzer', onReset); };
  }, []);

  // Set global flag so index.html's handleRoute can intercept navigation
  useEffect(function() {
    window.__analyzerFeedbackPending = !!(result && fbState === 'idle');
    return function() { window.__analyzerFeedbackPending = false; };
  }, [result, fbState]);

  // Listen for the intercept event from handleRoute
  useEffect(function() {
    function onShowModal() { setShowFbModal(true); }
    window.addEventListener('ana2me:show-fb-modal', onShowModal);
    return function() { window.removeEventListener('ana2me:show-fb-modal', onShowModal); };
  }, []);

  function dismissFbModal(navigate) {
    setShowFbModal(false);
    window.__analyzerFeedbackPending = false;
    if (fbState === 'idle') setFbState('done');
    if (navigate) {
      var dest = window.__analyzerPendingDest;
      var pendingView = window.__analyzerPendingView;
      window.__analyzerPendingDest = null;
      window.__analyzerPendingView = null;
      setTimeout(function() {
        if (dest) {
          history.pushState({}, '', dest);
          window.dispatchEvent(new PopStateEvent('popstate'));
        } else if (pendingView) {
          history.pushState({}, '', '/' + (pendingView === 'feed' ? 'products' : pendingView === 'landing' ? '' : pendingView));
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }, 0);
    }
  }

  const [pasteMode, setPasteMode] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [pasteConfirm, setPasteConfirm] = useState(null); // { chips: [{name, recognized}], addText: '' }
  const [pasteConfirmAdd, setPasteConfirmAdd] = useState('');
  const MAX_PER_SIDE = 3;
  const allSelected = [...works, ...doesnt, ...neutral].map(function(p) { return p.id; });
  const totalCount = works.length + doesnt.length + neutral.length;
  const canAnalyze = totalCount >= 1;
  const isSingleMode = totalCount === 1;
  var singleProduct = isSingleMode ? (works[0] || doesnt[0] || neutral[0]) : null;
  var singleIsWorks = isSingleMode && (works.length === 1 || neutral.length === 1);

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
    resetKnownNames(); // Reset so it rebuilds with fresh data
    var parsed = parseIngredientList(pasteText, catalog, _mfdsLookupEn, _mfdsLookupKo);
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

  function catLabel(cat) {
    var entry = CATEGORY_LABELS[cat] || CATEGORY_LABELS['other'];
    return isKo ? entry.ko : entry.en;
  }

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


  // ── ENGINE ──
  async function runAnalysis() {
    setBusy(true); setError(null); setResult(null); setFbState('idle'); setFbRating(null); setFbComment('');
    try {
      var allEntries = [...works, ...neutral, ...doesnt];
      var pickedEntries = allEntries.filter(function(p) { return !p._pasted; });
      var pastedEntries = allEntries.filter(function(p) { return p._pasted; });
      var pickedIds = pickedEntries.map(function(p) { return p.id; });
      var inputIds = allEntries.map(function(p) { return p.id; });

      // Fetch catalog data for picked products (if any)
      var data = pickedIds.length > 0
        ? await fetchAnalyzeData(pickedIds)
        : { inputRows: [], allRows: [] };

      // If allRows not cached yet, fetch it via a dummy product call
      if (!data.allRows || data.allRows.length === 0) {
        if (pickedIds.length > 0) {
          data.allRows = (await fetchAnalyzeData(pickedIds)).allRows;
        } else {
          // Force cache load by fetching with first available product
          var firstProd = (products || [])[0];
          if (firstProd) {
            data.allRows = (await fetchAnalyzeData([firstProd.id])).allRows;
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
        var matched = matchParsedIngredients(entry._rawIngredients, catalog || [], _mfdsLookupEn, _mfdsLookupKo);
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

      var worksIds = works.concat(neutral).map(function(p) { return p.id; });
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
        var allIngs = rows.map(function(r) { return enrichIngredient(r, _mfdsLookupEn); }).filter(Boolean);

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
            category: ing.category,
            flag_type: ing.flag_type,
            description: ing.description,
            description_ko: ing.description_ko,
            science: ing.science,
            science_ko: ing.science_ko,
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

      // ═══════════════════════════════════════════
      // UNIFIED FREQUENCY-BASED PIPELINE
      // One analysis, two outputs (positive / negative)
      // ═══════════════════════════════════════════

      // Step 1: Build frequency map for every ingredient across all products
      var freqMap = {}; // ingId -> { ing, worksCount, doesntCount }

      worksIds.forEach(function(pid) {
        var rows = byProduct[pid] || [];
        var seen = new Set();
        rows.forEach(function(r) {
          var ing = r.ingredient; if (!ing) return;
          if (SKIP_CATS[ing.category]) return;
          if (SKIP_BASE_NAMES.has((ing.name || '').toLowerCase().replace(/[\s\-]+/g, ' ').trim())) return;
          if (seen.has(ing.id)) return; seen.add(ing.id);
          if (!freqMap[ing.id]) freqMap[ing.id] = { ing: ing, worksCount: 0, doesntCount: 0 };
          freqMap[ing.id].worksCount++;
        });
      });
      doesntIds.forEach(function(pid) {
        var rows = byProduct[pid] || [];
        var seen = new Set();
        rows.forEach(function(r) {
          var ing = r.ingredient; if (!ing) return;
          if (SKIP_CATS[ing.category]) return;
          if (SKIP_BASE_NAMES.has((ing.name || '').toLowerCase().replace(/[\s\-]+/g, ' ').trim())) return;
          if (seen.has(ing.id)) return; seen.add(ing.id);
          if (!freqMap[ing.id]) freqMap[ing.id] = { ing: ing, worksCount: 0, doesntCount: 0 };
          freqMap[ing.id].doesntCount++;
        });
      });

      // Step 2: Score each ingredient
      var totalW = worksIds.length || 0;
      var totalD = doesntIds.length || 0;
      var totalAll = totalW + totalD;
      var scored = Object.values(freqMap).map(function(item) {
        var wRatio = totalW > 0 ? item.worksCount / totalW : 0;
        var dRatio = totalD > 0 ? item.doesntCount / totalD : 0;
        item.signal = wRatio - dRatio;
        item.worksRate = wRatio;
        item.doesntRate = dRatio;
        item.prevalence = totalAll > 0 ? (item.worksCount + item.doesntCount) / totalAll : 0;
        return item;
      });

      // Step 3: Determine confidence tier + split into positive / negative
      var confidenceTier = determineConfidenceTier(totalW, totalD);

      var minWorksThreshold = totalW > 0 ? Math.ceil(totalW / 2) : 1;
      var minDoesntThreshold = totalD > 0 ? Math.ceil(totalD / 2) : 1;

      var _enrichForResult = function(item) { return enrichForResult(item, _mfdsLookupEn); };

      var positiveIngredients, negativeIngredients;

      if (confidenceTier === 'cold-start') {
        // No contrast available — empty lists
        positiveIngredients = [];
        negativeIngredients = [];

      } else if (confidenceTier === 'early-read') {
        // Early read: set-difference approach (in works but NOT doesnt, and vice versa)
        // Still apply Fix 1 (base/ubiquity), Fix 3 (both-sides), Fix 4 (sort)
        positiveIngredients = scored
          .filter(function(item) {
            return item.worksCount > 0 && item.doesntCount === 0 && isEligible(item);
          })
          .sort(posSortCmp)
          .slice(0, POSITIVE_LIST_MAX)
          .map(_enrichForResult);

        negativeIngredients = scored
          .filter(function(item) {
            return item.doesntCount > 0 && item.worksCount === 0 && isEligible(item);
          })
          .sort(negSortCmp)
          .slice(0, NEGATIVE_LIST_MAX)
          .map(_enrichForResult);

      } else {
        // Confident: full frequency-based pipeline with 50% thresholds
        positiveIngredients = scored
          .filter(function(item) { return item.signal > 0 && item.worksCount >= minWorksThreshold && isEligible(item); })
          .sort(posSortCmp)
          .slice(0, POSITIVE_LIST_MAX)
          .map(_enrichForResult);

        negativeIngredients = scored
          .filter(function(item) { return item.signal < 0 && item.doesntCount >= minDoesntThreshold && isEligible(item); })
          .sort(negSortCmp)
          .slice(0, NEGATIVE_LIST_MAX)
          .map(_enrichForResult);
      }

      // Backward-compat aliases used by render + recommendations
      var negatives = negativeIngredients;
      var positiveThemes = positiveIngredients.length > 0 ? [{ ingredients: positiveIngredients }] : [];

      // ── AWARENESS INGREDIENTS — flagged ingredients in works products (all scenarios) ──
      // Exclude anything already in the positive or negative lists to avoid duplication
      var posNegNames = new Set();
      positiveIngredients.forEach(function(p) { posNegNames.add(p.ingredient_name_en); });
      negativeIngredients.forEach(function(n) { posNegNames.add(n.ingredient_name_en); });

      var awarenessIngredients = [];
      if (worksIds.length > 0) {
        awarenessIngredients = scored
          .filter(function(item) {
            var ing = item.ing;
            if (!item.worksCount) return false;
            if (posNegNames.has(ing.name)) return false;
            return ing.is_known_sensitizer || ing.is_eu_26_fragrance_allergen ||
                   ing.is_essential_oil || ing.irritation_risk === 'high' || ing.irritation_risk === 'medium' ||
                   POTENT_ACTIVES.has((ing.name || '').toLowerCase());
          })
          .sort(function(a, b) { return b.worksCount - a.worksCount; })
          .slice(0, 5)
          .map(_enrichForResult);
      }

      // ── RECOMMENDATIONS ──
      // Avoid ingredients from negative list; prefer ingredients from positive list
      var avoidIdSet = new Set();
      negatives.forEach(function(n) {
        // Find the ingredient ID from freqMap by name
        Object.values(freqMap).forEach(function(item) {
          if (item.ing.name === n.ingredient_name_en) avoidIdSet.add(item.ing.id);
        });
      });
      var positiveIngIdSet = new Set();
      positiveIngredients.forEach(function(p) {
        Object.values(freqMap).forEach(function(item) {
          if (item.ing.name === p.ingredient_name_en) positiveIngIdSet.add(item.ing.id);
        });
      });

      var productScores = (products || [])
        .filter(function(p) { return !excludeSet.has(p.id) && p.category === 'skincare'; })
        .map(function(p) {
          var pRows = allByProduct[p.id] || [];
          var hasAvoid = pRows.some(function(r) { return r.ingredient && avoidIdSet.has(r.ingredient.id); });
          if (hasAvoid) return null;
          var posScore = 0;
          pRows.forEach(function(r) { if (r.ingredient && positiveIngIdSet.has(r.ingredient.id)) posScore++; });
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
        var allIngs = rows.map(function(r) { return enrichIngredient(r, _mfdsLookupEn); }).filter(Boolean);
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
          allIngs: allIngs,
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
        confidenceTier: confidenceTier, // 'cold-start' | 'early-read' | 'confident'
        positive_ingredients: positiveIngredients,
        avoid_ingredients: negativeIngredients,
        awareness_ingredients: awarenessIngredients,
        positive_themes: positiveThemes, // backward compat: non-empty if positives exist
        product_breakdowns: productBreakdowns,
        recommended_products: recommendations,
        totalWorks: worksIds.length,
        totalDoesnt: doesntIds.length,
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
        var parsed = parseIngredientList(val, catalogIngs, _mfdsLookupEn, _mfdsLookupKo);
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
            placeholder: t('Add a product...', '제품 추가...'),
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

  // ── Unified Search Bar (above both cards) ──
  function UnifiedSearch() {
    var q = searchQ, setQ = setSearchQ;
    var open = searchOpen, setOpen = setSearchOpen;
    var showCount = searchShowCount, setShowCount = setSearchShowCount;
    var inputEditable = searchEditable, setInputEditable = setSearchEditable;
    var labelVal = searchLabelVal;
    var setLabelVal = setSearchLabelVal;
    var [labelOpen, setLabelOpen] = useState(false);
    useEffect(function() {
      if (!labelOpen) return;
      var close = function() { setLabelOpen(false); };
      document.addEventListener('click', close);
      return function() { document.removeEventListener('click', close); };
    }, [labelOpen]);
    var [pickerPaste, setPickerPaste] = useState(false);
    var [pickerPasteText, setPickerPasteText] = useState('');
    var [pickerChips, setPickerChips] = useState([]);
    var inputRef = useRef(null);
    var pasteRef = useRef(null);
    var dropdownScrollRef = useRef(null);

    var handlePasteInput = function(e) {
      var val = e.target.value;
      if (/[,\n\u00B7\uFF1B]/.test(val)) {
        var parsed = parseIngredientList(val, catalogIngs, _mfdsLookupEn, _mfdsLookupKo);
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
        name: t('Pasted product \u00B7 ' + names.length + ' ingredients', '\uBD99\uC5EC\uB123\uAE30 \uC81C\uD488 \u00B7 ' + names.length + '\uAC1C \uC131\uBD84'),
        nameKo: '\uBD99\uC5EC\uB123\uAE30 \uC81C\uD488 \u00B7 ' + names.length + '\uAC1C \uC131\uBD84',
        brand: '',
        imageUrl: null,
        _pasted: true,
        _rawIngredients: names
      };
      var setter = labelVal === 'doesnt' ? setDoesnt : labelVal === 'neutral' ? setNeutral : setWorks;
      setter(function(prev) { return prev.concat([entry]); });
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

    var targetSetter = labelVal === 'doesnt' ? setDoesnt : labelVal === 'neutral' ? setNeutral : setWorks;
    var targetList = labelVal === 'doesnt' ? doesnt : labelVal === 'neutral' ? neutral : works;

    var filtered = (products || []).filter(function(p) {
      if (p.category !== 'skincare') return false;
      if (allSelected.includes(p.id)) return false;
      if (!q.trim()) return true;
      var lower = q.toLowerCase();
      return p.name.toLowerCase().includes(lower) ||
             (p.nameKo || '').toLowerCase().includes(lower) ||
             p.brand.toLowerCase().includes(lower);
    });
    if (!q.trim()) filtered = filtered.slice().reverse();
    var visibleFiltered = filtered.slice(0, showCount);
    var hasMore = filtered.length > showCount;

    var add = function(p) {
      if (targetList.length >= MAX_PER_SIDE) return;
      targetSetter(function(prev) { return prev.concat([p]); });
      setQ(''); setOpen(false);
      setResult(null); setError(null);
    };

    // Close dropdown on outside tap
    useEffect(function() {
      if (!open) {
        setInputEditable(false);
        return;
      }
      var handleTap = function(e) {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
          setOpen(false);
          setInputEditable(false);
          if (inputRef.current) inputRef.current.blur();
        }
      };
      document.addEventListener('mousedown', handleTap);
      document.addEventListener('touchstart', handleTap);
      return function() {
        document.removeEventListener('mousedown', handleTap);
        document.removeEventListener('touchstart', handleTap);
      };
    }, [open]);

    return React.createElement('div', { className: 'try-unified-search', style: { marginBottom: 16 }, ref: searchRef },
      React.createElement('div', { className: 'try-search-wrap', style: { position: 'relative' } },
        React.createElement('div', { className: 'try-search' },
          !inputEditable
            ? React.createElement('div', {
                className: 'try-search-input try-search-input--placeholder',
                onClick: function() {
                  if (open) {
                    setInputEditable(true);
                  } else {
                    setOpen(true);
                  }
                },
              }, q || t('Select a product', '\uC81C\uD488\uC744 \uC785\uB825\uD558\uC138\uC694'))
            : React.createElement('input', {
                ref: inputRef,
                value: q,
                autoFocus: true,
                onChange: function(e) { setQ(e.target.value); setOpen(true); setShowCount(8); },
                onFocus: function() { setOpen(true); },
                placeholder: t('Select a product', '\uC81C\uD488\uC744 \uC785\uB825\uD558\uC138\uC694'),
                className: 'try-search-input'
              }),
          React.createElement('div', { className: 'try-label-dropdown', style: { position: 'relative' } },
            React.createElement('button', {
              className: 'try-label-trigger',
              onClick: function(e) { e.stopPropagation(); setLabelOpen(!labelOpen); }
            },
              labelVal === 'works' ? '\u2705 ' + t('Works', '\uB9DE\uC544\uC694')
                : labelVal === 'neutral' ? '\u2014 ' + t('Neutral', '\uBCF4\uD1B5')
                : '\uD83D\uDEAB ' + t('Doesn\u2019t suit', '\uC548 \uB9DE\uC544\uC694'),
              React.createElement('span', { className: 'try-label-arrow' })
            ),
            labelOpen && React.createElement('div', { className: 'try-label-menu' },
              React.createElement('button', {
                className: 'try-label-option' + (labelVal === 'doesnt' ? ' try-label-option--active' : ''),
                onMouseDown: function(e) { e.preventDefault(); },
                onClick: function() { setLabelVal('doesnt'); setLabelOpen(false); }
              }, '\uD83D\uDEAB ' + t('Didn\u2019t suit me', '\uB9DE\uC9C0 \uC54A\uC558\uC5B4\uC694')),
              React.createElement('button', {
                className: 'try-label-option' + (labelVal === 'works' ? ' try-label-option--active' : ''),
                onMouseDown: function(e) { e.preventDefault(); },
                onClick: function() { setLabelVal('works'); setLabelOpen(false); }
              }, '\u2705 ' + t('Works for me', '\uC798 \uB9DE\uC544\uC694')),
              React.createElement('button', {
                className: 'try-label-option' + (labelVal === 'neutral' ? ' try-label-option--active' : ''),
                onMouseDown: function(e) { e.preventDefault(); },
                onClick: function() { setLabelVal('neutral'); setLabelOpen(false); }
              }, '\u2014 ' + t('No effect', '\uD6A8\uACFC \uC5C6\uC74C'))
            )
          )
        ),
        open && React.createElement('div', {
          className: 'try-dropdown',
          onMouseDown: function(e) { e.preventDefault(); }
        },
          React.createElement('div', { className: 'try-dropdown-scroll', ref: dropdownScrollRef },
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
              onClick: function() {
                var scrollPos = dropdownScrollRef.current ? dropdownScrollRef.current.scrollTop : 0;
                setShowCount(function(c) { return c + 8; });
                requestAnimationFrame(function() {
                  if (dropdownScrollRef.current) dropdownScrollRef.current.scrollTop = scrollPos;
                });
              }
            }, t('Show more...', '\uB354 \uBCF4\uAE30...')),
            q.trim().length > 0 && filtered.length === 0 && React.createElement('p', { className: 'try-empty-search-text' },
              t('No results for \u201C' + q + '\u201D', '\u201C' + q + '\u201D \uAC80\uC0C9 \uACB0\uACFC\uAC00 \uC5C6\uC5B4\uC694')
            )
          ),
          React.createElement('button', {
            className: 'try-dropdown-paste-sticky',
            onMouseDown: function(e) { e.preventDefault(); },
            onClick: openPaste
          },
            '\uD83D\uDCCB ' + t('Paste its ingredient list instead \u2192', '\uC131\uBD84 \uBAA9\uB85D\uC744 \uB300\uC2E0 \uBD99\uC5EC\uB123\uAE30 \u2192')
          )
        )
      ),
      // Paste input
      pickerPaste && React.createElement('div', { className: 'try-chip-input-area', style: { marginTop: 8 }, onClick: function(e) { e.stopPropagation(); if (pasteRef.current) pasteRef.current.focus(); } },
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
              ? t('Paste ingredient list or type one at a time...', '\uC131\uBD84 \uBAA9\uB85D\uC744 \uBD99\uC5EC\uB123\uAC70\uB098 \uD558\uB098\uC529 \uC785\uB825\uD558\uC138\uC694...')
              : t('Add more...', '\uB354 \uCD94\uAC00...')
          }),
          pickerPasteText.trim() && React.createElement('button', {
            className: 'try-chip-input-add',
            onClick: function(e) { e.stopPropagation(); addChipFromInput(); }
          }, '+')
        ),
        React.createElement('div', { className: 'try-paste-actions' },
          React.createElement('button', {
            className: 'try-paste-cancel',
            onClick: function() { setPickerPaste(false); setPickerPasteText(''); setPickerChips([]); }
          }, t('Cancel', '\uCDE8\uC18C')),
          React.createElement('button', {
            className: 'try-paste-submit',
            disabled: pickerChips.length === 0,
            onClick: submitPickerPaste
          }, t('Done', '\uC644\uB8CC') + (pickerChips.length > 0 ? ' (' + pickerChips.length + ')' : ''))
        )
      ),
    );
  }

  // ── Chip Label Dropdown (custom, matches search bar dropdown) ──
  function ChipLabelDropdown({ label, onChange }) {
    var [open, setOpen] = useState(false);
    useEffect(function() {
      if (!open) return;
      var close = function() { setOpen(false); };
      document.addEventListener('click', close);
      return function() { document.removeEventListener('click', close); };
    }, [open]);

    var iconFor = function(l) {
      if (l === 'works') return '\u2705';
      if (l === 'doesnt') return '\uD83D\uDEAB';
      return '\u2014';
    };
    var textFor = function(l) {
      if (l === 'works') return t('Works for me', '\uC798 \uB9DE\uC544\uC694');
      if (l === 'doesnt') return t('Didn\u2019t suit me', '\uB9DE\uC9C0 \uC54A\uC558\uC5B4\uC694');
      return t('No effect', '\uD6A8\uACFC \uC5C6\uC74C');
    };
    var options = ['doesnt', 'works', 'neutral'];

    return React.createElement('div', { className: 'try-label-dropdown', style: { position: 'relative' } },
      React.createElement('button', {
        className: 'try-label-trigger',
        onClick: function(e) { e.stopPropagation(); setOpen(!open); }
      },
        iconFor(label) + ' ' + textFor(label),
        React.createElement('span', { className: 'try-label-arrow' })
      ),
      open && React.createElement('div', { className: 'try-label-menu' },
        options.map(function(opt) {
          return React.createElement('button', {
            key: opt,
            className: 'try-label-option' + (label === opt ? ' try-label-option--active' : ''),
            onMouseDown: function(e) { e.preventDefault(); },
            onClick: function() { onChange(opt); setOpen(false); }
          }, iconFor(opt) + ' ' + textFor(opt));
        })
      )
    );
  }

  // ── Move product between lists ──
  function moveProduct(productId, fromSetter, toLabelVal) {
    var product = null;
    fromSetter(function(prev) {
      var found = prev.find(function(p) { return p.id === productId; });
      if (found) product = found;
      return prev.filter(function(p) { return p.id !== productId; });
    });
    setTimeout(function() {
      if (!product) return;
      var toSetter = toLabelVal === 'doesnt' ? setDoesnt : toLabelVal === 'neutral' ? setNeutral : setWorks;
      toSetter(function(prev) { return prev.concat([product]); });
      setResult(null); setError(null);
    }, 0);
  }

  // ── Unified Product Card (single card, each product has label dropdown) ──
  function UnifiedProductCard() {
    var allProducts = [
      ...works.map(function(p) { return { p: p, label: 'works', setter: setWorks }; }),
      ...doesnt.map(function(p) { return { p: p, label: 'doesnt', setter: setDoesnt }; }),
      ...neutral.map(function(p) { return { p: p, label: 'neutral', setter: setNeutral }; })
    ];
    if (allProducts.length === 0) return null;

    var labelIcon = function(label) {
      if (label === 'works') return '\u2705';
      if (label === 'doesnt') return '\uD83D\uDEAB';
      return '\u2014';
    };
    var labelText = function(label) {
      if (label === 'works') return t('Works', '\uC798 \uB9DE\uC544\uC694');
      if (label === 'doesnt') return t('Didn\u2019t suit', '\uB9DE\uC9C0 \uC54A\uC558\uC5B4\uC694');
      return t('No effect', '\uD6A8\uACFC \uC5C6\uC74C');
    };
    var chipBorder = function(label) {
      if (label === 'works') return 'rgba(45,90,61,0.35)';
      if (label === 'doesnt') return 'rgba(180,80,70,0.3)';
      return 'rgba(120,120,110,0.3)';
    };

    return React.createElement('div', { style: { padding: '0', margin: '0' } },
      React.createElement('h3', { className: 'try-picker-label' },
        t('Your products', '\uB0B4 \uC81C\uD488'),
        React.createElement('span', { style: { fontSize: 12, fontWeight: 400, color: 'var(--ink-faint)', marginLeft: 6 } }, '(' + allProducts.length + ')')
      ),
      allProducts.map(function(item) {
        var p = item.p;
        var name = isKo && p.nameKo ? p.nameKo : p.name;
        var isPasted = !!p._pasted;
        return React.createElement('div', { key: p.id, className: 'try-chip', style: { borderLeftColor: chipBorder(item.label) } },
          isPasted
            ? React.createElement('div', { className: 'try-chip-paste-icon' }, '\uD83D\uDCCB')
            : React.createElement('div', { className: 'try-chip-img' },
                React.createElement(ProductImg, { src: p.imageUrl, alt: (p.brand || '') + ' ' + name })
              ),
          React.createElement('div', { className: 'try-chip-text', style: { flex: 1 } },
            isPasted
              ? React.createElement('span', { className: 'try-chip-name' }, name)
              : [
                  React.createElement('span', { key: 'b', className: 'try-chip-brand' }, p.brand),
                  React.createElement('span', { key: 'n', className: 'try-chip-name' }, name)
                ]
          ),
          React.createElement(ChipLabelDropdown, {
            label: item.label,
            onChange: function(newLabel) { moveProduct(p.id, item.setter, newLabel); }
          }),
          React.createElement('button', {
            className: 'try-chip-x',
            onClick: function() {
              item.setter(function(prev) { return prev.filter(function(x) { return x.id !== p.id; }); });
              setResult(null); setError(null);
            },
            'aria-label': 'Remove'
          }, React.createElement(Icon, { name: 'x', size: 12 }))
        );
      })
    );
  }

  // ── Loading text (cycles through messages) ──
  function LoadingText() {
    var messages = isKo
      ? ['\uC131\uBD84 \uB370\uC774\uD130 \uBD88\uB7EC\uC624\uB294 \uC911...', '\uC131\uBD84 \uD328\uD134 \uBD84\uC11D \uC911...', '\uACB0\uACFC \uC900\uBE44 \uC911...']
      : ['Fetching ingredient data...', 'Analyzing ingredient patterns...', 'Preparing your results...'];
    var [idx, setIdx] = useState(0);
    useEffect(function() {
      var interval = setInterval(function() {
        setIdx(function(prev) { return (prev + 1) % messages.length; });
      }, 1800);
      return function() { clearInterval(interval); };
    }, []);
    return React.createElement('span', { className: 'try-btn-loading' },
      messages[idx],
      React.createElement('span', { className: 'try-btn-dots' },
        React.createElement('span', null, '.'),
        React.createElement('span', null, '.'),
        React.createElement('span', null, '.')
      )
    );
  }

  // ── RENDER ──
  return React.createElement('div', { className: 'try-page' },
    // Hero — scanner style
    React.createElement('header', { className: 'try-hero try-hero--scan' },
      React.createElement('div', { style: { display: 'flex', gap: 6, marginBottom: 8 } },
        React.createElement(Sticker, { color: 'accent', rotate: -3 }, t('Beta', '\uBCA0\uD0C0')),
        React.createElement(Sticker, { color: 'butter', rotate: 2 }, t('Free', '\uBB34\uB8CC'))
      ),
      React.createElement('h1', { className: 'display', style: { margin: '0 0 16px' } },
        t('Find your ', '\uB098\uB9CC\uC758 \uC131\uBD84 \uD328\uD134\uC744 '),
        React.createElement('span', { className: 'display-accent' },
          t('ingredient pattern', '\uBD84\uC11D\uD574\uB4DC\uB824\uC694'),
          React.createElement('span', { className: 'display-dot' }, '.')
        )
      ),
    ),

    // Unified search bar with label dropdown
    React.createElement(UnifiedSearch, null),

    // Unified product card
    React.createElement(UnifiedProductCard, null),

    // (TIP text moved into preview card label)

    // Preview card — below search, hidden once products added
    !hasProducts && !result && React.createElement('div', { className: 'try-scan-row' },
      React.createElement('span', { className: 'try-scan-row-label' },
        React.createElement('span', { className: 'try-scan-row-label-badge' }, 'TIP'),
        t('Add multiple products to sharpen results', '\uC81C\uD488\uC744 \uB354 \uCD94\uAC00\uD558\uBA74 \uBD84\uC11D\uC774 \uC815\uD655\uD574\uC838\uC694')
      ),
      React.createElement('div', { className: 'try-scan-frame' },
        React.createElement('div', { className: 'try-scan-line' }),
        React.createElement('div', { className: 'try-scan-carousel' },
          SCAN_IMAGES.map(function(src, i) {
            return React.createElement('img', {
              key: i, src: src, alt: '',
              className: 'try-scan-icon',
              style: {
                opacity: i === scanIdx ? 1 : 0,
                transform: i === scanIdx ? 'translateX(0)' : (i === (scanIdx - 1 + 6) % 6 ? 'translateX(-30px)' : 'translateX(30px)')
              }
            });
          })
        )
      ),
      React.createElement('div', { className: 'try-scan-ings' },
        SCAN_INGREDIENTS.map(function(group, gi) {
          var isActive = gi === scanIdx;
          return React.createElement('div', {
            key: gi,
            className: 'try-scan-ing-group',
            style: { opacity: isActive ? 1 : 0, position: isActive ? 'relative' : 'absolute', pointerEvents: 'none' }
          },
            group.map(function(ing, ni) {
              return React.createElement('span', {
                key: ni,
                className: 'try-scan-ing-item try-scan-ing--' + ing.type + (isActive ? ' try-scan-ing-typing' : ''),
                style: isActive ? { animationDelay: (ni * 0.3) + 's' } : {}
              },
                React.createElement('span', { className: 'try-scan-ing-dot' }),
                isKo ? ing.ko : ing.en
              );
            })
          );
        })
      )
    ),

    // Sticky analyze bar — hidden when results are showing
    !result && React.createElement('div', { className: 'try-action-sticky' },
      React.createElement('button', {
        className: 'try-btn',
        disabled: !canAnalyze || busy,
        onClick: runAnalysis
      },
        busy
          ? React.createElement(LoadingText, null)
          : canAnalyze
            ? t('\u{1F449} Analyze my products', '\u{1F449} \uBD84\uC11D\uD574 \uBCF4\uAE30')
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
            : t('Based on what you told us', '알려주신 내용을 바탕으로')
        ),
        React.createElement('p', { className: 'try-quality-inline' },
          t('This analysis is based on ingredient data. For information only \u2014 not medical or dermatological advice. Reactions vary by person.',
            '\uC774 \uBD84\uC11D\uC740 \uC131\uBD84 \uB370\uC774\uD130\uC5D0 \uAE30\uBC18\uD574\uC694. \uC815\uBCF4 \uC81C\uACF5 \uBAA9\uC801\uC774\uBA70, \uC758\uB8CC\uB098 \uD53C\uBD80\uACFC \uC870\uC5B8\uC774 \uC544\uB2C8\uC5D0\uC694. \uBC18\uC751\uC740 \uC0AC\uB78C\uB9C8\uB2E4 \uB2EC\uB77C\uC694.')
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
              return React.createElement('div', { key: i, className: 'try-avoid-item', style: { cursor: 'pointer' }, onClick: function() { setSelIng({
                name: item.ingredient_name_en, name_ko: item.ingredient_name_ko,
                symbol: item.symbol, category: item.category, flagged: true, flag_type: item.flag_type,
                description: item.description, description_ko: item.description_ko,
                science: item.science, science_ko: item.science_ko
              }); } },
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
              t('No known irritants or allergens found in this product\u2019s ingredient list.',
                '\uC774 \uC81C\uD488\uC5D0\uC11C \uC54C\uB824\uC9C4 \uC790\uADF9 \uC131\uBD84\uC774\uB098 \uC54C\uB808\uB974\uAC90\uC774 \uBC1C\uACAC\uB418\uC9C0 \uC54A\uC558\uC5B4\uC694.')
            )
          )
        )
      ),

      // ── Comparative mode: cold-start nudge — not enough data for meaningful signal ──
      // FIX 2: triggers for 1+1, 2+0, 0+2, 1+0 etc. — anything where hasEnoughData is false
      result.mode !== 'single' && result.confidenceTier === 'cold-start' &&
        React.createElement(Reveal, { delay: 50 },
        React.createElement('div', { className: 'try-result-card try-card-nudge' },
          React.createElement('p', { className: 'try-nudge-text' },
            t(
              'We need a little more to find your pattern. You\u2019ve added ' + ((result.totalWorks || 0) + (result.totalDoesnt || 0)) + ' product' + (((result.totalWorks || 0) + (result.totalDoesnt || 0)) === 1 ? '' : 's') + ' \u2014 add one or two more on either side (especially ones that didn\u2019t suit you) and we\u2019ll find your pattern.',
              '\ud328\ud134\uc744 \ucc3e\uc73c\ub824\uba74 \ub370\uc774\ud130\uac00 \uc870\uae08 \ub354 \ud544\uc694\ud574\uc694. \ud604\uc7ac ' + ((result.totalWorks || 0) + (result.totalDoesnt || 0)) + '\uac1c \uc81c\ud488\uc744 \ucd94\uac00\ud558\uc168\ub294\ub370, \uc591\ucabd\uc5d0 \ud55c\ub450 \uac1c\ub9cc \ub354 \ucd94\uac00\ud574 \uc8fc\uc138\uc694 (\ud2b9\ud788 \ub9de\uc9c0 \uc54a\uc558\ub358 \uc81c\ud488). \ud328\ud134\uc744 \ucc3e\uc544\ub4dc\ub9b4\uac8c\uc694.'
            )
          )
        )
      ),

      // ── Comparative mode: EARLY-READ — both sides present but small sample ──
      result.mode !== 'single' && result.confidenceTier === 'early-read' &&
        React.createElement(Reveal, { delay: 50 },
          React.createElement('div', { className: 'try-result-card try-card-early' },
            // Confidence banner
            React.createElement('p', { className: 'try-early-banner' },
              t('Early read \u2014 based on a small sample. Add a few more products on each side and this will sharpen into a clearer pattern.',
                '\ucd08\uae30 \ubd84\uc11d \u2014 \uc801\uc740 \uc0d8\ud50c \uae30\ubc18. \uc591\ucabd\uc5d0 \uc81c\ud488\uc744 \ub354 \ucd94\uac00\ud558\uba74 \ub354 \uba85\ud655\ud55c \ud328\ud134\uc73c\ub85c \ubc1c\uc804\ud574\uc694.')
            ),
            // Positive slot
            (result.positive_ingredients || []).length > 0 && React.createElement('div', { className: 'try-early-section' },
              React.createElement('h3', { className: 'try-early-section-title try-early-positive' },
                '\u2713 ' + t('Looks like your skin may respond well to these', '\ud53c\ubd80\uac00 \uc88b\uc544\ud560 \uc218 \uc788\ub294 \uc131\ubd84')
              ),
              (function() {
                var SYM_COLORS = ['#C05A3C','#5F7A8A','#9A7B5B','#1A1916','#7B6180','#D4944C','#5A7D7C','#8B6F4E','#6B5B7B','#7A7570'];
                var items = (result.positive_ingredients || []).map(function(item, i) {
                  var name = isKo ? (item.ingredient_name_ko || item.ingredient_name_en) : item.ingredient_name_en;
                  return React.createElement('div', { key: 'ep-' + i, className: 'try-evidence-row' },
                    React.createElement('button', { className: 'ing-card-main', onClick: function() { setSelIng({
                      name: item.ingredient_name_en, name_ko: item.ingredient_name_ko,
                      symbol: item.symbol, category: item.category, flagged: false,
                      description: item.description, description_ko: item.description_ko,
                      science: item.science, science_ko: item.science_ko
                    }); } },
                      React.createElement('span', { className: 'ing-sym', style: { background: SYM_COLORS[i % SYM_COLORS.length] } }, item.symbol),
                      React.createElement('div', { className: 'ing-body' },
                        React.createElement('p', { className: 'ing-name' }, name)
                      )
                    )
                  );
                });
                return items.length > 4
                  ? React.createElement(TryIngScroll, null, items)
                  : items;
              })()
            ),
            // Watch slot
            (result.avoid_ingredients || []).length > 0 && React.createElement('div', { className: 'try-early-section' },
              React.createElement('h3', { className: 'try-early-section-title try-early-watch' },
                '\u26A0 ' + t('Worth keeping an eye on', '\uc8fc\uc758\ud574\uc11c \ubcfc \uc131\ubd84')
              ),
              React.createElement(TryIngScroll, null,
                (result.avoid_ingredients || []).map(function(item, i) {
                  var name = isKo ? (item.ingredient_name_ko || item.ingredient_name_en) : item.ingredient_name_en;
                  return React.createElement('div', { key: 'ew-' + i, className: 'try-evidence-row' },
                    React.createElement('button', { className: 'ing-card-main', onClick: function() { setSelIng({
                      name: item.ingredient_name_en, name_ko: item.ingredient_name_ko,
                      symbol: item.symbol, category: item.category, flagged: item.flagged, flag_type: item.flag_type,
                      description: item.description, description_ko: item.description_ko,
                      science: item.science, science_ko: item.science_ko
                    }); } },
                      React.createElement('span', { className: 'ing-sym', style: { background: '#c0392b' } }, item.symbol),
                      React.createElement('div', { className: 'ing-body' },
                        React.createElement('p', { className: 'ing-name' }, name),
                        item.flag_type && React.createElement('span', { className: 'try-flag-badge' },
                          item.flag_type === 'eu26' ? t('EU-26 allergen', 'EU-26 \uc54c\ub808\ub974\uac90')
                          : item.flag_type === 'essential-oil' ? t('Essential oil', '\uc5d0\uc13c\uc15c \uc624\uc77c')
                          : item.flag_type === 'sensitizer' ? t('Sensitizer', '\ubbfc\uac10 \uc131\ubd84')
                          : item.flag_type === 'potent-active' ? t('Potent active', '\uac15\ub825 \ud65c\uc131 \uc131\ubd84')
                          : null
                        )
                      )
                    )
                  );
                })
              )
            ),
            // Awareness section — flagged ingredients in works products
            (result.awareness_ingredients || []).length > 0 && React.createElement('div', { className: 'try-early-section' },
              React.createElement('h3', { className: 'try-early-section-title' },
                t('Also in your products', '\uc81c\ud488\uc5d0 \ud3ec\ud568\ub41c \uc131\ubd84')
              ),
              React.createElement('p', { className: 'try-early-section-sub' },
                t('Works for you and contains these \u2014 worth knowing about.',
                  '\uc798 \ub9de\ub294 \uc81c\ud488\uc5d0 \ud3ec\ud568\ub41c \uc131\ubd84 \u2014 \ucc38\uace0\ud558\uc138\uc694.')
              ),
              React.createElement(TryIngScroll, null,
                (result.awareness_ingredients || []).map(function(item, i) {
                  var name = isKo ? (item.ingredient_name_ko || item.ingredient_name_en) : item.ingredient_name_en;
                  return React.createElement('div', { key: 'ea-' + i, className: 'try-evidence-row' },
                    React.createElement('button', { className: 'ing-card-main', onClick: function() { setSelIng({
                      name: item.ingredient_name_en, name_ko: item.ingredient_name_ko,
                      symbol: item.symbol, category: item.category, flagged: true, flag_type: item.flag_type,
                      description: item.description, description_ko: item.description_ko,
                      science: item.science, science_ko: item.science_ko
                    }); } },
                      React.createElement('span', { className: 'ing-sym', style: { background: '#c0392b' } }, item.symbol),
                      React.createElement('div', { className: 'ing-body' },
                        React.createElement('p', { className: 'ing-name' }, name),
                        item.flag_type && React.createElement('span', { className: 'try-flag-badge' },
                          item.flag_type === 'eu26' ? t('EU-26 allergen', 'EU-26 \uc54c\ub808\ub974\uac90')
                          : item.flag_type === 'essential-oil' ? t('Essential oil', '\uc5d0\uc13c\uc15c \uc624\uc77c')
                          : item.flag_type === 'sensitizer' ? t('Sensitizer', '\ubbfc\uac10 \uc131\ubd84')
                          : item.flag_type === 'potent-active' ? t('Potent active', '\uac15\ub825 \ud65c\uc131 \uc131\ubd84')
                          : null
                        )
                      )
                  )
                );
              })
              )
            ),
            // Footer nudge
            React.createElement('p', { className: 'try-inline-nudge' },
              t('Add 2\u20133 more products on each side and we\u2019ll turn this early read into a confirmed pattern.',
                '\uc591\ucabd\uc5d0 2\u20133\uac1c \uc81c\ud488\uc744 \ub354 \ucd94\uac00\ud558\uba74 \uc774 \ucd08\uae30 \ubd84\uc11d\uc744 \ud655\uc778\ub41c \ud328\ud134\uc73c\ub85c \ubc1c\uc804\uc2dc\ucf1c \ub4dc\ub9b4\uac8c\uc694.')
            )
          )
        ),

      // ── Comparative mode: Scenario E — no positive AND no negative signals ──
      result.mode !== 'single' && result.confidenceTier === 'confident' &&
        result.positive_themes.length === 0 && result.avoid_ingredients.length === 0 &&
        React.createElement(Reveal, { delay: 50 },
          React.createElement('div', { className: 'try-result-card try-card-nudge' },
            React.createElement('p', { className: 'try-nudge-text' },
              t(
                'We couldn\u2019t find a consistent pattern yet. This usually means the products are too different from each other \u2014 try adding products in the same category (all serums, all moisturizers) for a clearer signal.',
                '\uc544\uc9c1 \uc77c\uad00\ub41c \ud328\ud134\uc744 \ucc3e\uc9c0 \ubabb\ud588\uc5b4\uc694. \uc81c\ud488\ub4e4\uc774 \uc11c\ub85c \ub108\ubb34 \ub2e4\ub97c \uc218 \uc788\uc5b4\uc694 \u2014 \uac19\uc740 \uce74\ud14c\uace0\ub9ac\uc758 \uc81c\ud488\uc744 \ucd94\uac00\ud574 \ubcf4\uc138\uc694 (\uc608: \uc138\ub7fc\ub07c\ub9ac, \ubaa8\uc774\uc2a4\ucc98\ub77c\uc774\uc800\ub07c\ub9ac).'
              )
            )
          )
        ),

      // ── Comparative mode: D1 — "Ingredients worth noting" (merged flagged + shared) ──
      result.mode !== 'single' && result.confidenceTier === 'confident' &&
        (result.totalWorks || 0) === 0 &&
        (function() {
          // Collect flagged from avoid list
          var flagged = (result.avoid_ingredients || []).filter(function(item) { return item.flagged; }).map(function(item) {
            return { name: item.ingredient_name_en, name_ko: item.ingredient_name_ko, symbol: item.symbol, category: item.category, flagged: true, flag_type: item.flag_type, description: item.description, description_ko: item.description_ko, science: item.science, science_ko: item.science_ko };
          });
          // Collect non-flagged actives from product breakdowns
          var SKIP = new Set(['water','glycerin','butylene glycol','1,2-hexanediol','pentylene glycol','propanediol','ethylhexylglycerin','carbomer','xanthan gum','disodium edta','phenoxyethanol']);
          var flaggedNames = new Set(flagged.map(function(f) { return (f.name || '').toLowerCase(); }));
          var sharedNonFlagged = [];
          // First try: shared across all products
          if (result.product_breakdowns && result.product_breakdowns.length >= 2) {
            var allIngSets = result.product_breakdowns.map(function(pb) {
              return new Set((pb.allIngs || []).map(function(ing) { return ing.id || ing.name; }));
            });
            var firstPbIngs = result.product_breakdowns[0].allIngs || [];
            var firstSet = allIngSets[0];
            firstSet.forEach(function(ingId) {
              var inAll = allIngSets.every(function(s) { return s.has(ingId); });
              if (inAll) {
                var ingData = firstPbIngs.find(function(ing) { return (ing.id || ing.name) === ingId; });
                if (ingData && !SKIP.has((ingData.name || '').toLowerCase()) && !ingData.flagged && !flaggedNames.has((ingData.name || '').toLowerCase())) {
                  sharedNonFlagged.push(ingData);
                }
              }
            });
          }
          // Fallback: if no shared found, collect all unique non-flagged actives across products
          var activeIngredients = [];
          if (sharedNonFlagged.length === 0 && result.product_breakdowns) {
            var seen = new Set();
            result.product_breakdowns.forEach(function(pb) {
              (pb.allIngs || []).forEach(function(ing) {
                var key = ing.id || ing.name;
                if (!seen.has(key) && !SKIP.has((ing.name || '').toLowerCase()) && !ing.flagged && !flaggedNames.has((ing.name || '').toLowerCase())) {
                  seen.add(key);
                  activeIngredients.push(ing);
                }
              });
            });
          }
          var displayIngs = sharedNonFlagged.length > 0 ? sharedNonFlagged : activeIngredients;
          var allItems = flagged.concat(displayIngs);
          var SYM_COLORS_D1 = ['#C05A3C','#5F7A8A','#9A7B5B','#1A1916','#7B6180','#D4944C'];
          return React.createElement(Reveal, { delay: 50 },
            React.createElement('div', { className: flagged.length > 0 ? 'try-result-card try-card-avoid' : 'try-result-card' },
              React.createElement('h2', { className: 'try-result-title' },
                t('Ingredients worth noting', '\uC8FC\uBAA9\uD560 \uC131\uBD84')
              ),
              flagged.length === 0 && React.createElement('div', { style: { padding: '12px 14px', background: 'rgba(45,90,61,0.04)', borderRadius: 'var(--radius-sm)', margin: '0 0 12px', border: '1px solid rgba(45,90,61,0.1)' } },
                React.createElement('p', { style: { fontSize: 13, color: 'var(--accent)', fontWeight: 600, margin: '0 0 4px' } },
                  '\u2705 ' + t('No common irritants detected.', '\uC77C\uBC18\uC801\uC778 \uC790\uADF9 \uC131\uBD84\uC740 \uAC10\uC9C0\uB418\uC9C0 \uC54A\uC558\uC5B4\uC694.')
                ),
                React.createElement('p', { style: { fontSize: 12, color: 'var(--ink-soft)', margin: 0, lineHeight: 1.5 } },
                  t('Your sensitivity may be to one of the actives below \u2014 tap any to learn more.', '\uC544\uB798 \uD65C\uC131 \uC131\uBD84 \uC911 \uD558\uB098\uAC00 \uB9DE\uC9C0 \uC54A\uC744 \uC218 \uC788\uC5B4\uC694 \u2014 \uD0ED\uD574\uC11C \uD655\uC778\uD574 \uBCF4\uC138\uC694.')
                )
              ),
              flagged.length > 0 && React.createElement('p', { className: 'try-result-disclaimer' },
                t('These appeared in your products.', '\uC774 \uC81C\uD488\uB4E4\uC5D0 \uD3EC\uD568\uB41C \uC131\uBD84\uC774\uC5D0\uC694.')
              ),
              React.createElement(TryIngScroll, null,
                allItems.map(function(ing, i) {
                  var name = isKo ? (ing.name_ko || ing.name) : ing.name;
                  return React.createElement('div', { key: i, className: 'try-evidence-row' },
                    React.createElement('button', { className: 'ing-card-main', onClick: function() { setSelIng({
                      name: ing.name, name_ko: ing.name_ko,
                      symbol: ing.symbol || (name || '').charAt(0).toUpperCase(),
                      category: ing.category, flagged: ing.flagged, flag_type: ing.flag_type,
                      description: ing.description, description_ko: ing.description_ko,
                      science: ing.science, science_ko: ing.science_ko
                    }); } },
                      React.createElement('span', { className: 'ing-sym', style: ing.flagged ? { background: '#c0392b' } : { background: SYM_COLORS_D1[i % SYM_COLORS_D1.length] } }, ing.symbol || (name || '').charAt(0).toUpperCase()),
                      React.createElement('div', { className: 'ing-body', style: { display: 'flex', alignItems: 'center' } },
                        React.createElement('p', { className: 'ing-name', style: { margin: 0 } }, name),
                        ing.flagged && ing.flag_type && React.createElement('span', { className: 'try-flag-badge' },
                          ing.flag_type === 'eu26' ? t('EU-26 allergen', 'EU-26 \uC54C\uB808\uB974\uAC90')
                          : ing.flag_type === 'essential-oil' ? t('Essential oil', '\uC5D0\uC13C\uC15C \uC624\uC77C')
                          : ing.flag_type === 'sensitizer' ? t('Sensitizer', '\uBBFC\uAC10 \uC131\uBD84')
                          : ing.flag_type === 'potent-active' ? t('Potent active', '\uAC15\uB825 \uD65C\uC131 \uC131\uBD84')
                          : null
                        )
                      )
                    )
                  );
                })
              ),
            )
          );
        })(),
      // ── Comparative mode: POSITIVE card ──
      // Renders for: B, C1, C2, D2. Skips for: D1 (no works), E (no signals)
      result.mode !== 'single' && result.confidenceTier === 'confident' &&
        (result.totalWorks || 0) > 0 && ((result.positive_ingredients || []).length > 0 || result.avoid_ingredients.length > 0) &&
        React.createElement(Reveal, { delay: 50 },
          React.createElement('div', { className: 'try-result-card try-card-positive' },
            React.createElement('h2', { className: 'try-result-title' },
              works.length > 0
                ? '\u2713 ' + t('Ingredients your skin seems to like', '\ud53c\ubd80\uac00 \uc88b\uc544\ud558\ub294 \uac83 \uac19\uc740 \uc131\ubd84')
                : t('Ingredients in your products', '\uC81C\uD488\uC5D0 \uD3EC\uD568\uB41C \uC131\uBD84')
            ),
            (result.positive_ingredients || []).length > 0 && React.createElement('p', { className: 'try-result-disclaimer' },
              works.length > 0
                ? t('These appear consistently in the products you marked as working. Tap any ingredient for details.',
                    '\uc798 \ub9de\ub294\ub2e4\uace0 \ud45c\uc2dc\ud55c \uc81c\ud488\uc5d0 \uc77c\uad00\ub418\uac8c \ub098\ud0c0\ub098\ub294 \uc131\ubd84. \ud0ed\ud558\uba74 \uc124\uba85\uc744 \ubcfc \uc218 \uc788\uc5b4\uc694.')
                : t('These are the key ingredients across your products. Tap any for details.',
                    '\uC81C\uD488\uB4E4\uC758 \uC8FC\uC694 \uC131\uBD84\uC774\uC5D0\uC694. \uD0ED\uD558\uBA74 \uC124\uBA85\uC744 \uBCFC \uC218 \uC788\uC5B4\uC694.')
            ),
            (result.positive_ingredients || []).length === 0
              ? React.createElement('p', { className: 'try-result-empty' },
                  t('No strong overlap yet across your \u201Cworks\u201D products. Try adding products in the same category for a clearer pattern.',
                    '\uc798 \ub9de\ub294 \uc81c\ud488\ub4e4 \uc0ac\uc774 \uacf5\ud1b5 \uc131\ubd84\uc774 \uc544\uc9c1 \ubd80\uc871\ud574\uc694. \uac19\uc740 \uce74\ud14c\uace0\ub9ac\uc758 \uc81c\ud488\uc744 \ucd94\uac00\ud574 \ubcf4\uc138\uc694.')
                )
              : (function() {
                  var SYM_COLORS = ['#C05A3C','#5F7A8A','#9A7B5B','#1A1916','#7B6180','#D4944C','#5A7D7C','#8B6F4E','#6B5B7B','#7A7570'];
                  var posItems = (result.positive_ingredients || []).map(function(item, i) {
                    var name = isKo ? (item.ingredient_name_ko || item.ingredient_name_en) : item.ingredient_name_en;
                    var symBg = SYM_COLORS[i % SYM_COLORS.length];
                    return React.createElement('div', { key: 'pos-' + i, className: 'try-evidence-row' },
                      React.createElement('button', { className: 'ing-card-main', onClick: function() { setSelIng({
                        name: item.ingredient_name_en, name_ko: item.ingredient_name_ko,
                        symbol: item.symbol, category: item.category, flagged: false,
                        description: item.description, description_ko: item.description_ko,
                        science: item.science, science_ko: item.science_ko
                      }); } },
                        React.createElement('span', { className: 'ing-sym', style: { background: symBg } }, item.symbol),
                        React.createElement('div', { className: 'ing-body' },
                          React.createElement('p', { className: 'ing-name' }, name)
                        )
                      )
                    );
                  });
                  return [].concat(
                    posItems.length > 4
                      ? [React.createElement(TryIngScroll, { key: 'pos-scroll' }, posItems)]
                      : posItems,
                    // Awareness section — flagged ingredients in works products (all scenarios)
                    (result.awareness_ingredients || []).length > 0 ? [
                      React.createElement('div', { key: 'awareness', className: 'try-awareness-section' },
                        React.createElement('h4', { className: 'try-awareness-title' },
                          (result.totalDoesnt || 0) === 0
                            ? t('Good to know', '\uc54c\uc544\ub450\uba74 \uc88b\uc740 \uc131\ubd84')
                            : t('Ingredients to be aware of', '\ucc38\uace0\ud560 \uc131\ubd84')
                        ),
                        React.createElement('p', { className: 'try-awareness-sub' },
                          (result.totalDoesnt || 0) === 0
                            ? t('These flagged ingredients are in products that work for you \u2014 your skin tolerates them, but they\u2019re worth knowing about.',
                                '\ud50c\ub798\uadf8\ub41c \uc131\ubd84\uc774\uc9c0\ub9cc \uc798 \ub9de\ub294 \uc81c\ud488\uc5d0 \ud3ec\ud568\ub41c \uc131\ubd84\uc774\uc5d0\uc694 \u2014 \ud53c\ubd80\uac00 \uacac\ub514\uace0 \uc788\uc9c0\ub9cc \uc54c\uc544\ub450\uba74 \uc88b\uc544\uc694.')
                            : t('These are in your current products \u2014 worth knowing about if your skin ever reacts.',
                                '\ud604\uc7ac \uc0ac\uc6a9 \uc911\uc778 \uc81c\ud488\uc5d0 \ud3ec\ud568\ub41c \uc131\ubd84\uc774\uc5d0\uc694. \ud53c\ubd80\uac00 \ubc18\uc751\ud560 \uacbd\uc6b0 \ucc38\uace0\ud558\uc138\uc694.')
                        ),
                        React.createElement(TryIngScroll, null,
                          (result.awareness_ingredients || []).map(function(item, i) {
                            var name = isKo ? (item.ingredient_name_ko || item.ingredient_name_en) : item.ingredient_name_en;
                            return React.createElement('div', { key: i, className: 'try-evidence-row' },
                              React.createElement('button', { className: 'ing-card-main', onClick: function() { setSelIng({
                                name: item.ingredient_name_en, name_ko: item.ingredient_name_ko,
                                symbol: item.symbol, category: item.category, flagged: true, flag_type: item.flag_type,
                                description: item.description, description_ko: item.description_ko,
                                science: item.science, science_ko: item.science_ko
                              }); } },
                                React.createElement('span', { className: 'ing-sym', style: { background: '#c0392b' } }, item.symbol),
                                React.createElement('div', { className: 'ing-body' },
                                  React.createElement('p', { className: 'ing-name' }, name),
                                  item.flag_type && React.createElement('span', { className: 'try-flag-badge' },
                                    item.flag_type === 'eu26' ? t('EU-26 allergen', 'EU-26 \uc54c\ub808\ub974\uac90')
                                    : item.flag_type === 'essential-oil' ? t('Essential oil', '\uc5d0\uc13c\uc15c \uc624\uc77c')
                                    : item.flag_type === 'sensitizer' ? t('Sensitizer', '\ubbfc\uac10 \uc131\ubd84')
                                    : item.flag_type === 'potent-active' ? t('Potent active', '\uac15\ub825 \ud65c\uc131 \uc131\ubd84')
                                    : null
                                  )
                                )
                              )
                            );
                          })
                        )
                      )
                    ] : [],
                    // C2: works-only → unlock nudge for the watch side
                    (result.totalDoesnt || 0) === 0 ? [React.createElement('div', { key: 'c2-unlock', className: 'try-unlock-nudge', style: { cursor: 'pointer' }, onClick: function() {
                      if (searchRef.current) {
                        var y = searchRef.current.getBoundingClientRect().top + window.scrollY - 20;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                        setTimeout(function() {
                          var input = searchRef.current.querySelector('input');
                          if (input) input.focus();
                        }, 500);
                      }
                    } },
                      React.createElement('strong', null,
                        t('Unlock "what to watch for"', '"\uc8fc\uc758\ud560 \uc131\ubd84" \ud655\uc778\ud558\uae30')
                      ),
                      React.createElement('p', null,
                        t('Add a product that didn\u2019t suit your skin and we\u2019ll compare both sides \u2014 that\u2019s how we find what your skin consistently reacts to.',
                          '\ub9de\uc9c0 \uc54a\uc558\ub358 \uc81c\ud488\uc744 \ucd94\uac00\ud558\uba74 \uc591\ucabd\uc744 \ube44\uad50\ud574\uc11c \ud53c\ubd80\uac00 \uc77c\uad00\ub418\uac8c \ubc18\uc751\ud558\ub294 \uc131\ubd84\uc744 \ucc3e\uc544\ub4dc\ub9b4\uac8c\uc694.')
                      )
                    )] : []
                  );
                })()
          )
        ),

      // ── Comparative mode: WATCH card ──
      // Renders for: B, C1, D2. Skips for: C2 (inline above), D1 (above), E (above)
      result.mode !== 'single' && result.confidenceTier === 'confident' &&
        (result.totalWorks || 0) > 0 && (result.totalDoesnt || 0) > 0 &&
        !((result.positive_ingredients || []).length === 0 && result.avoid_ingredients.length === 0) &&
        React.createElement(Reveal, { delay: 150 },
          React.createElement('div', { className: 'try-result-card try-card-avoid' },
            React.createElement('h2', { className: 'try-result-title' },
              '\u26A0 ' + t('Ingredients to watch', '\uc8fc\uc758\ud574\uc11c \ubcfc \uc131\ubd84')
            ),
            result.avoid_ingredients.length > 0 && React.createElement('p', { className: 'try-result-disclaimer' },
              t('These appear more often in the products that didn\u2019t suit you. Tap any ingredient for details.',
                '\ub9de\uc9c0 \uc54a\ub294 \uc81c\ud488\uc5d0 \ub354 \uc790\uc8fc \ub098\ud0c0\ub098\ub294 \uc131\ubd84. \ud0ed\ud558\uba74 \uc124\uba85\uc744 \ubcfc \uc218 \uc788\uc5b4\uc694.')
            ),
            result.avoid_ingredients.length === 0
              ? React.createElement('div', { className: 'try-no-trigger' },
                  React.createElement('p', { className: 'try-no-trigger-text' },
                    t('Nothing stands out as a consistent trigger yet \u2014 that\u2019s actually a good sign.',
                      '\uc544\uc9c1 \uc77c\uad00\ub41c \uc6d0\uc778 \uc131\ubd84\uc774 \ubcf4\uc774\uc9c0 \uc54a\uc544\uc694 \u2014 \uc624\ud788\ub824 \uae0d\uc815\uc801\uc778 \uc2e0\ud638\uc608\uc694.')
                  )
                )
              : result.avoid_ingredients.map(function(item, i) {
                  var name = isKo ? (item.ingredient_name_ko || item.ingredient_name_en) : item.ingredient_name_en;
                  return React.createElement('div', { key: i, className: 'try-evidence-row' },
                    React.createElement('button', { className: 'ing-card-main', onClick: function() { setSelIng({
                      name: item.ingredient_name_en, name_ko: item.ingredient_name_ko,
                      symbol: item.symbol, category: item.category, flagged: item.flagged, flag_type: item.flag_type,
                      description: item.description, description_ko: item.description_ko,
                      science: item.science, science_ko: item.science_ko
                    }); } },
                      React.createElement('span', { className: 'ing-sym', style: { background: '#c0392b' } }, item.symbol),
                      React.createElement('div', { className: 'ing-body' },
                        React.createElement('p', { className: 'ing-name' }, name),
                        item.flag_type && React.createElement('span', { className: 'try-flag-badge' },
                          item.flag_type === 'eu26' ? t('EU-26 allergen', 'EU-26 \uc54c\ub808\ub974\uac90')
                          : item.flag_type === 'essential-oil' ? t('Essential oil', '\uc5d0\uc13c\uc15c \uc624\uc77c')
                          : item.flag_type === 'sensitizer' ? t('Sensitizer', '\ubbfc\uac10 \uc131\ubd84')
                          : item.flag_type === 'potent-active' ? t('Potent active', '\uac15\ub825 \ud65c\uc131 \uc131\ubd84')
                          : null
                        )
                      )
                    )
                  );
                })
          )
        ),

      // ── Comparative mode: per-product ingredient breakdowns ──
      result.mode !== 'single' && result.product_breakdowns && result.product_breakdowns.length > 0 &&
        React.createElement(Reveal, { delay: 200 },
          React.createElement('div', { className: 'try-result-card' },
            React.createElement('h2', { className: 'try-result-title' },
              t('Your products', '내 제품')
            ),
            React.createElement('p', { className: 'try-result-disclaimer' },
              t('Tap to see full ingredient details.', '탭하면 전체 성분을 확인할 수 있어요.')
            ),
            result.product_breakdowns.filter(function(pb) { return !pb.isPasted; }).map(function(pb) {
              return renderProductLink(pb.id);
            })
          )
        ),

      // Unlock nudge — below ingredients by product card
      result.mode !== 'single' && result.confidenceTier === 'confident' &&
        (result.totalWorks || 0) === 0 &&
        React.createElement(Reveal, { delay: 220 },
          React.createElement('div', { key: 'd1-unlock', className: 'try-unlock-nudge', style: { cursor: 'pointer' }, onClick: function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(function() {
              if (searchRef.current) {
                var input = searchRef.current.querySelector('input');
                if (input) input.focus();
              }
            }, 500);
          } },
            React.createElement('strong', null,
              t('Unlock the full pattern', '\uC804\uCCB4 \uD328\uD134 \uD655\uC778\uD558\uAE30')
            ),
            React.createElement('p', null,
              t('Add a product that works for your skin and we\u2019ll compare both sides \u2014 that\u2019s how we find your ingredient pattern.',
                '\uC798 \uB9DE\uB294 \uC81C\uD488\uC744 \uCD94\uAC00\uD558\uBA74 \uC591\uCABD\uC744 \uBE44\uAD50\uD574\uC11C \uB0B4 \uC131\uBD84 \uD328\uD134\uC744 \uCC3E\uC544\uB4DC\uB9B4\uAC8C\uC694.')
            )
          )
        ),

      // Card 3: Recommendations — suppress in D1 (no works = no positive signal to match on)
      !(result.mode === 'comparative' && (result.totalWorks || 0) === 0) &&
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


      // ── Feedback prompt (two-step) ──
      fbState !== 'done' && React.createElement(Reveal, { delay: 400 },
        React.createElement('div', { className: 'try-feedback' },
          // Step 1: question + toggle (or "Thanks" after tap)
          !fbRating
            ? React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 } },
                React.createElement('p', { style: { fontSize: 13, color: 'var(--ink-soft)', margin: 0 } },
                  t('Was this useful?', '도움이 됐나요?')
                ),
                React.createElement('div', { className: 'try-feedback-toggle' },
                  React.createElement('button', {
                    className: 'try-feedback-tog',
                    onClick: function() { setFbRating('helpful'); }
                  }, '\uD83D\uDC4D'),
                  React.createElement('button', {
                    className: 'try-feedback-tog',
                    onClick: function() { setFbRating('not_helpful'); }
                  }, '\uD83D\uDC4E')
                )
              )
            : React.createElement('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } },
                React.createElement('span', { style: { fontSize: 13, color: 'var(--accent)', fontWeight: 600, flexShrink: 0 } },
                  fbRating === 'helpful' ? '\uD83D\uDC4D' : '\uD83D\uDC4E'
                ),
                  React.createElement('input', {
                    className: 'try-feedback-input',
                    value: fbComment,
                    onChange: function(e) { setFbComment(e.target.value); },
                    onKeyDown: function(e) {
                      if (e.key === 'Enter') {
                        fetch('https://hkyfggapijgedsizfqec.supabase.co/rest/v1/analyzer_feedback', {
                          method: 'POST',
                          headers: { apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
                          body: JSON.stringify({ rating: fbRating, comment: fbComment.trim() || null, input_count: result ? (result.totalWorks || 0) + (result.totalDoesnt || 0) : totalCount })
                        }).catch(function() {});
                        setFbState('done');
                      }
                    },
                    placeholder: t('Any feedback? (optional)', '\uD53C\uB4DC\uBC31 (\uC120\uD0DD)'),
                    style: { flex: 1, border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', padding: '8px 12px', fontSize: 13, fontFamily: 'var(--font-text)', color: 'var(--ink)', background: 'var(--cream)', outline: 'none' }
                  }),
                  React.createElement('button', {
                    className: 'try-feedback-submit',
                    onClick: function() {
                      fetch('https://hkyfggapijgedsizfqec.supabase.co/rest/v1/analyzer_feedback', {
                        method: 'POST',
                        headers: { apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
                        body: JSON.stringify({ rating: fbRating, comment: fbComment.trim() || null, input_count: result ? (result.totalWorks || 0) + (result.totalDoesnt || 0) : totalCount })
                      }).catch(function() {});
                      setFbState('done');
                    }
                  }, t('Submit', '\uBCF4\uB0B4\uAE30'))
              )
        )
      ),
      fbState === 'done' && React.createElement(Reveal, null,
        React.createElement('p', { className: 'try-feedback-thanks' },
          t('Thanks for your feedback!', '피드백 감사합니다!')
        )
      ),

    ),

    // ── Feedback modal on navigate away ──
    showFbModal && React.createElement('div', { className: 'sheet-back', onClick: function() { dismissFbModal(true); } },
      React.createElement('div', { className: 'sheet', onClick: function(e) { e.stopPropagation(); }, style: { maxWidth: 420, padding: '32px 28px', textAlign: 'center' } },
        React.createElement('button', { className: 'sheet-close', onClick: function() { dismissFbModal(true); } },
          React.createElement(Icon, { name: 'x', size: 16 })
        ),
        React.createElement('p', { style: { fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, color: 'var(--ink)', margin: '0 0 6px' } },
          t('Before you go...', '가시기 전에...')
        ),
        !fbRating
          ? React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 16px', lineHeight: 1.5 } },
                t('Was this useful?', '\uB3C4\uC6C0\uC774 \uB410\uB098\uC694?')
              ),
              React.createElement('div', { style: { display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 16 } },
                React.createElement('div', { className: 'try-feedback-toggle', style: { borderRadius: 'var(--radius-pill)', border: '1px solid var(--line)' } },
                  React.createElement('button', {
                    className: 'try-feedback-tog',
                    style: { fontSize: 20, padding: '10px 20px' },
                    onClick: function() { setFbRating('helpful'); }
                  }, '\uD83D\uDC4D'),
                  React.createElement('button', {
                    className: 'try-feedback-tog',
                    style: { fontSize: 20, padding: '10px 20px' },
                    onClick: function() { setFbRating('not_helpful'); }
                  }, '\uD83D\uDC4E')
                )
              ),
              React.createElement('button', {
                onClick: function() { dismissFbModal(true); },
                style: { background: 'none', border: 'none', fontSize: 13, color: 'var(--ink-faint)', cursor: 'pointer', textDecoration: 'underline' }
              }, t('Skip', '\uAC74\uB108\uB6F0\uAE30'))
            )
          : React.createElement('div', null,
              React.createElement('p', { style: { fontSize: 14, color: 'var(--accent)', fontWeight: 600, margin: '0 0 12px' } },
                fbRating === 'helpful' ? '\uD83D\uDC4D ' + t('Thanks!', '\uAC10\uC0AC\uD569\uB2C8\uB2E4!') : '\uD83D\uDC4E ' + t('Got it, thanks.', '\uC54C\uACA0\uC2B5\uB2C8\uB2E4, \uAC10\uC0AC\uD569\uB2C8\uB2E4.')
              ),
              React.createElement('div', { style: { display: 'flex', gap: 8, marginBottom: 16 } },
                React.createElement('input', {
                  className: 'try-feedback-input',
                  value: fbComment,
                  onChange: function(e) { setFbComment(e.target.value); },
                  onKeyDown: function(e) {
                    if (e.key === 'Enter') {
                      fetch('https://hkyfggapijgedsizfqec.supabase.co/rest/v1/analyzer_feedback', {
                        method: 'POST',
                        headers: { apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
                        body: JSON.stringify({ rating: fbRating, comment: fbComment.trim() || null, input_count: works.length + doesnt.length })
                      }).catch(function() {});
                      setFbState('done');
                      dismissFbModal(true);
                    }
                  },
                  placeholder: t('Any feedback? (optional)', '\uD53C\uB4DC\uBC31 (\uC120\uD0DD)'),
                  style: { flex: 1, border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', padding: '10px 14px', fontSize: 13, fontFamily: 'var(--font-text)', color: 'var(--ink)', background: 'var(--cream)', outline: 'none' }
                }),
                React.createElement('button', {
                  className: 'try-feedback-submit',
                  style: { padding: '10px 20px', fontSize: 13 },
                  onClick: function() {
                    fetch('https://hkyfggapijgedsizfqec.supabase.co/rest/v1/analyzer_feedback', {
                      method: 'POST',
                      headers: { apikey: SUPA_KEY, Authorization: 'Bearer ' + SUPA_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
                      body: JSON.stringify({ rating: fbRating, comment: fbComment.trim() || null, input_count: works.length + doesnt.length })
                    }).catch(function() {});
                    setFbState('done');
                    dismissFbModal(true);
                  }
                }, t('Submit', '\uBCF4\uB0B4\uAE30'))
              )
            )
      )
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
        ),
        React.createElement('a', {
          href: '/ingredients/' + (selIng.id || (selIng.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')),
          onClick: function(e) { e.preventDefault(); var slug = selIng.id || (selIng.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''); setSelIng(null); history.pushState({}, '', '/ingredients/' + slug); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0, 0); },
          style: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 16, fontSize: 13, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }
        }, t('Read more', '더 알아보기'), ' →')
      )
    )
  );
}
