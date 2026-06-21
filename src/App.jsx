import React, { useState, useEffect } from 'react';
import { useLocalState, cn, useL, Sticker, ProductImg, ErrorCard, ProductFeedSkeleton, ProductDetailSkeleton } from './components/primitives';
import { fetchProducts } from './lib/supabase';
import SEO from './lib/seo';
import Header from './components/header';
import Feed from './components/feed';
import Detail from './pages/detail';
import Brands from './pages/brands';
import Landing from './pages/landing';
import Insights from './pages/insights';
import Try from './pages/try';
import Analyzer from './pages/analyzer';
import About from './pages/about';
import Privacy from './pages/privacy';
import Terms from './pages/terms';
import Admin from './pages/admin';
import Ingredient from './pages/ingredient';
import IngredientsList from './pages/ingredients-list';
import Links from './pages/links';

// Ingredient match card for search results
const SUPA_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';

function IngredientMatch({ query, lang }) {
  const [ingredients, setIngredients] = useState([]);
  const isKo = lang === 'ko';

  useEffect(() => {
    if (!query || query.length < 2) { setIngredients([]); return; }
    fetch(SUPA_URL + '/rest/v1/ingredients?or=(name.ilike.*' + encodeURIComponent(query) + '*,name_ko.ilike.*' + encodeURIComponent(query) + '*)&limit=3&select=id,name,name_ko,symbol,category,description,description_ko,science,science_ko,is_known_sensitizer,irritation_risk,contains_flagged_component', {
      headers: { apikey: SUPA_KEY }
    }).then(r => r.json()).then(data => {
      setIngredients(data || []);
    }).catch(() => setIngredients([]));
  }, [query]);

  if (ingredients.length === 0) return null;

  var SYM_COLORS = ['#C05A3C','#5F7A8A','#9A7B5B','#1A1916','#7B6180','#D4944C','#5A7D7C','#8B6F4E','#6B5B7B','#7A7570'];
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 0 20px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--ink)', margin: '0 0 12px' }}>
        {isKo ? '성분' : 'Ingredients'}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ingredients.map((ing, i) => {
          const name = isKo ? (ing.name_ko || ing.name) : ing.name;
          return (
            <a key={ing.id} href={'/ingredients/' + ing.id}
              onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/ingredients/' + ing.id); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0, 0); }}
              className="ing-card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px' }}>
              <span className="ing-sym" style={{ background: SYM_COLORS[i % SYM_COLORS.length], width: 42, height: 42, borderRadius: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                {ing.symbol || name.charAt(0).toUpperCase()}
              </span>
              <span style={{ flex: 1, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 15, color: 'var(--ink)' }}>{name}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', flexShrink: 0 }}>
                {isKo ? '보기 →' : 'View →'}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// Fuzzy match helper (simple edit distance)
function fuzzyScore(a, b) {
  a = a.toLowerCase(); b = b.toLowerCase();
  if (a === b) return 0;
  if (b.includes(a) || a.includes(b)) return 1;
  // Simple character overlap score
  var matches = 0;
  for (var i = 0; i < a.length; i++) {
    if (b.includes(a[i])) matches++;
  }
  var overlap = matches / Math.max(a.length, b.length);
  return overlap > 0.6 ? 2 : (overlap > 0.4 ? 3 : 99);
}

// "Did you mean?" suggestions when search returns no exact results
function SearchSuggestions({ query, lang, hasResults, setView, setQuery }) {
  if (hasResults || !query || query.length < 3) return null;
  const isKo = lang === 'ko';
  const lower = query.toLowerCase();

  // Fuzzy match ingredients
  const ingIndex = window.__ingredientIndex || [];
  const ingMatches = ingIndex
    .map(ing => ({ ...ing, score: Math.min(fuzzyScore(lower, ing.name), fuzzyScore(lower, ing.name_ko || '')) }))
    .filter(ing => ing.score <= 2)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  // Fuzzy match brands (skincare only)
  const prods = (window.PRODUCTS || []).filter(p => p.category === 'skincare');
  const allBrands = [...new Set(prods.map(p => p.brand).filter(Boolean))];
  const brandMatches = allBrands
    .map(b => ({ name: b, score: fuzzyScore(lower, b) }))
    .filter(b => b.score <= 2)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  // Fuzzy match products
  const prodMatches = prods
    .map(p => ({ ...p, score: Math.min(fuzzyScore(lower, p.name), fuzzyScore(lower, p.brand + ' ' + p.name)) }))
    .filter(p => p.score <= 2)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  if (ingMatches.length === 0 && brandMatches.length === 0 && prodMatches.length === 0) return null;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 0 20px' }}>
      <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', margin: '0 0 12px' }}>
        {isKo ? '혹시 이것을 찾으셨나요?' : 'Did you mean?'}
      </p>
      {ingMatches.length > 0 && (
        <div style={{ marginBottom: brandMatches.length > 0 || prodMatches.length > 0 ? 14 : 0 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-faint)', margin: '0 0 8px' }}>{isKo ? '성분' : 'Ingredients'}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ingMatches.map(ing => (
              <a key={'ing-' + ing.id} href={'/ingredients/' + ing.id}
                onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/ingredients/' + ing.id); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0, 0); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px 6px 6px', background: 'var(--cream-card)', border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', textDecoration: 'none', color: 'var(--ink)', fontSize: 13, fontWeight: 500 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', color: '#fff', fontSize: 10, fontWeight: 700 }}>{ing.symbol || ing.name.charAt(0)}</span>
                {isKo ? (ing.name_ko || ing.name) : ing.name}
              </a>
            ))}
          </div>
        </div>
      )}
      {brandMatches.length > 0 && (
        <div style={{ marginBottom: prodMatches.length > 0 ? 14 : 0 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-faint)', margin: '0 0 8px' }}>{isKo ? '브랜드' : 'Brands'}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {brandMatches.map(b => {
              const bSlug = b.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
              return (
                <a key={'br-' + b.name} href={'/brands/' + bSlug}
                  onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/brands/' + bSlug); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0, 0); }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px 6px 6px', background: 'var(--cream-card)', border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', textDecoration: 'none', color: 'var(--ink)', fontSize: 13, fontWeight: 500 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: 'var(--ink-faint)', color: '#fff', fontSize: 10, fontWeight: 700 }}>{b.name.charAt(0)}</span>
                  {b.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
      {prodMatches.length > 0 && (
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--ink-faint)', margin: '0 0 8px' }}>{isKo ? '제품' : 'Products'}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {prodMatches.map(p => {
              const pSlug = (p.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/-+$/, '');
              return (
                <a key={'pr-' + p.id} href={'/products/' + pSlug}
                  onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/products/' + pSlug); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0, 0); }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: 'var(--cream-card)', border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', textDecoration: 'none', color: 'var(--ink)', fontSize: 13, fontWeight: 500 }}>
                  {p.brand} {isKo && p.nameKo ? p.nameKo : p.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Search results: products (show 3, expandable)
function SearchProducts({ products, lang, setProduct }) {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 3;
  const visible = products.slice(0, page * PAGE_SIZE);
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 0 24px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--ink)', margin: '0 0 12px' }}>
        {lang === 'ko' ? '제품' : 'Products'}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {visible.map(p => {
          const slug = p.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/,'');
          const name = lang === 'ko' && p.nameKo ? p.nameKo : p.name;
          return (
            <a key={p.id} href={'/products/' + slug} onClick={(e) => { e.preventDefault(); setProduct(p); history.pushState({}, '', '/products/' + slug); window.scrollTo(0,0); }} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0',
              borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'inherit', cursor: 'pointer',
            }}>
              <ProductImg src={p.imageUrl} alt={p.brand + ' ' + name} style={{ width: 56, height: 56, borderRadius: 'var(--radius-sm)', objectFit: 'contain', flexShrink: 0, background: 'var(--cream-card)', padding: 4 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-faint)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{p.brand}</span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 15, lineHeight: 1.25, margin: '2px 0 0', color: 'var(--ink)' }}>{name}</h4>
              </div>
            </a>
          );
        })}
      </div>
      {products.length > page * PAGE_SIZE && (
        <button onClick={() => setPage(p => p + 1)} style={{ display: 'block', margin: '12px auto 0', background: 'none', border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', padding: '8px 20px', fontSize: 13, fontWeight: 500, color: 'var(--ink-soft)', cursor: 'pointer', fontFamily: 'var(--font-text)' }}>
          {lang === 'ko' ? '더 보기' : 'Show more'}
        </button>
      )}
    </div>
  );
}

// Error Boundary — catches any child component crash
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      const isKo = (localStorage.getItem('lang') || '').includes('ko');
      return <ErrorCard
        icon={'\u26A0\uFE0F'}
        title={isKo ? '\uD398\uC774\uC9C0\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC5B4\uC694' : 'This page couldn\u2019t load'}
        message={isKo ? '\uC608\uC0C1\uCE58 \uBABB\uD55C \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC5B4\uC694.' : 'An unexpected error occurred.'}
        lang={isKo ? 'ko' : 'en'}
      />;
    }
    return this.props.children;
  }
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "fontPair": "sourceserif-inter",

  "density": "cozy",
  "accent": "forest",
  "night": false
}/*EDITMODE-END*/;

const FONT_PAIRS = {
  'sourceserif-inter': { display: "'Source Serif 4', Georgia, serif", text: "'Inter', system-ui, sans-serif", label: 'Source Serif · Inter' },
  'newsreader-inter':  { display: "'Newsreader', Georgia, serif", text: "'Inter', system-ui, sans-serif", label: 'Newsreader · Inter' },
  'sourceserif-plex':  { display: "'Source Serif 4', Georgia, serif", text: "'IBM Plex Sans', system-ui, sans-serif", label: 'Source Serif · Plex' },
};

const ACCENTS = {
  forest:    { hex: '#2d5a3d', label: 'Forest' },
  clay:      { hex: '#a44a3f', label: 'Clay' },
  indigo:    { hex: '#2e3d8f', label: 'Indigo' },
  plum:      { hex: '#6b3a5c', label: 'Plum' },
  ink:       { hex: '#1a1916', label: 'Ink' },
};

function Tweaks({ tweaks, setTweak, lang, setLang }) {
  const t = useL(lang);
  return (
    <aside className="tweaks">
      <h4>Tweaks <Sticker color="butter" rotate={-4}>live</Sticker></h4>

      <div className="tweak-row">
        <label>{t('Font pair', '폰트 조합')}</label>
        <div className="tweak-opts">
          {Object.entries(FONT_PAIRS).map(([k, v]) => (
            <button key={k} className={cn('tweak-opt', tweaks.fontPair === k && 'tweak-opt-on')} onClick={() => setTweak('fontPair', k)}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tweak-row" style={{display:'none'}}>
        <label>{t('Header style', '헤더 스타일')}</label>
        <div className="tweak-opts">
        </div>
      </div>

      <div className="tweak-row">
        <label>{t('Density', '여백')}</label>
        <div className="tweak-opts">
          {['snug', 'cozy', 'airy'].map(o => (
            <button key={o} className={cn('tweak-opt', tweaks.density === o && 'tweak-opt-on')} onClick={() => setTweak('density', o)}>
              {o}
            </button>
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>{t('Accent', '강조색')}</label>
        <div className="tweak-swatch">
          {Object.entries(ACCENTS).map(([k, v]) => (
            <button
              key={k}
              className={cn('tweak-swatch-btn', tweaks.accent === k && 'on')}
              style={{ background: v.hex }}
              title={v.label}
              onClick={() => setTweak('accent', k)}
            />
          ))}
        </div>
      </div>

      <div className="tweak-row">
        <label>{t('Mode', '모드')}</label>
        <div className="tweak-opts">
          <button className={cn('tweak-opt', !tweaks.night && 'tweak-opt-on')} onClick={() => setTweak('night', false)}>day</button>
          <button className={cn('tweak-opt', tweaks.night && 'tweak-opt-on')} onClick={() => setTweak('night', true)}>night</button>
        </div>
      </div>
    </aside>
  );
}

// Derive initial view from URL to prevent flash on direct/UTM article links
function getInitialView() {
  const p = window.location.pathname.replace(/\/$/, '');
  if (p === '') return 'landing';
  if (p === '/insights' || p.startsWith('/article/')) return 'insights';
  if (p === '/products' || p.startsWith('/products/')) return p === '/products' ? 'feed' : 'detail';
  if (p === '/brands' || p.startsWith('/brands/')) return 'brands';
  if (p === '/about') return 'about';
  if (p === '/privacy') return 'privacy';
  if (p === '/terms') return 'terms';
  if (p === '/admin') return 'admin';
  if (p === '/analyze' || p === '/analyzer') return 'analyze';
  if (p === '/links') return 'links';
  if (p === '/ingredients') return 'ingredients-list';
  if (p.startsWith('/ingredients/')) return 'ingredient';
  if (p === '/search') return 'insights';
  try { return JSON.parse(localStorage.getItem('view')) || 'landing'; } catch(e) { return 'landing'; }
}

const initialView = getInitialView();

function App() {
  const [view, _setView] = useState(initialView);
  useEffect(() => { try { localStorage.setItem('view', JSON.stringify(view)); } catch {} }, [view]);
  const setView = (v) => {
    if (window.__analyzerFeedbackPending && view === 'analyze' && v !== 'analyze') {
      window.__analyzerPendingDest = window.location.pathname;
      window.__analyzerPendingView = v;
      history.pushState({}, '', '/analyzer');
      window.dispatchEvent(new CustomEvent('ana2me:show-fb-modal'));
      return;
    }
    _setView(v);
  };
  const [category, setCategory] = useLocalState('cat', 'skincare');
  const [productId, setProductId] = useLocalState('pid', null);
  const [query, setQuery] = useLocalState('q', '');
  const detectedLang = (navigator.languages || [navigator.language]).some(l => l.startsWith('ko')) ? 'ko' : 'en';
  const [lang, setLang] = useLocalState('lang', detectedLang);

  const [products, setProducts] = useState(window.PRODUCTS || []);
  const [fetchError, setFetchError] = useState(null);
  const [brandSlug, setBrandSlug] = useState(null);
  useEffect(() => {
    fetchProducts().then(function(data) {
      window.PRODUCTS = data;
      setProducts(data.filter(p => p.category === 'skincare'));
    }).catch(function() {
      setFetchError('products');
    });
    // Pre-fetch ingredient IDs for instant search matching
    fetch(SUPA_URL + '/rest/v1/ingredients?select=id,name,name_ko', { headers: { apikey: SUPA_KEY } })
      .then(r => r.json())
      .then(data => { window.__ingredientIndex = data || []; })
      .catch(() => { window.__ingredientIndex = []; });
  }, []);

  const product = productId ? products.find(p => p.id === productId) : null;
  const setProduct = (p) => {
    setProductId(p ? p.id : null);
    setView(p ? 'detail' : 'feed');
  };

  // Tweaks
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);

  const setTweak = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  // Handle URL navigation (initial load + browser back/forward)
  const handleRoute = () => {
    const path = window.location.pathname.replace(/\/$/, '');
    if (window.__analyzerFeedbackPending && view === 'analyze' && path !== '/analyze' && path !== '/analyzer') {
      history.pushState({}, '', '/analyzer');
      window.__analyzerPendingDest = path;
      window.dispatchEvent(new CustomEvent('ana2me:show-fb-modal'));
      return;
    }
    if (path === '') {
      setView('landing'); setProductId(null); setQuery('');
      SEO.setHome();
      window.scrollTo(0, 0);
    }
    else if (path === '/insights') {
      setView('insights'); setProductId(null); setQuery('');
      window.dispatchEvent(new CustomEvent('ana2me:go-home'));
      SEO.setHome();
      window.scrollTo(0, 0);
    }
    else if (path === '/products') {
      setView('feed'); setProductId(null); setQuery('');
      window.scrollTo(0, 0);
    }
    else if (path.startsWith('/products/')) {
      const slug = path.split('/').pop();
      setQuery('');
      const tryOpen = () => {
        const prods = window.PRODUCTS || [];
        const p = prods.find(x => x.id === slug) || prods.find(x => x.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/,'') === slug) || prods.find(x => (x.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + x.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/,'')) === slug);
        if (p) { setProductId(p.id); setView('detail'); if (SEO.setProduct) SEO.setProduct(p); }
        else if (prods.length === 0) setTimeout(tryOpen, 200);
        else { setView('feed'); setProductId(null); }
      };
      tryOpen();
      window.scrollTo(0, 0);
    }
    else if (path.startsWith('/article/')) {
      setView('insights'); setProductId(null); setQuery('');
      window.dispatchEvent(new CustomEvent('ana2me:navigate-article'));
      window.scrollTo(0, 0);
    }
    else if (path === '/brands') {
      setView('brands'); setBrandSlug(null); setProductId(null); setQuery('');
      SEO.setBrands();
      window.scrollTo(0, 0);
    }
    else if (path.startsWith('/brands/')) {
      const slug = path.split('/').pop();
      setView('brands'); setBrandSlug(slug); setProductId(null); setQuery('');
      SEO.setBrand(slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()));
      window.scrollTo(0, 0);
    }
    else if (path === '/search') {
      const q = new URLSearchParams(window.location.search).get('q') || '';
      setQuery(q); setView('insights'); setProductId(null);
      SEO.setHome();
    }
    else if (path === '/admin') { setView('admin'); }
    else if (path === '/ingredients') { setView('ingredients-list'); setProductId(null); setQuery(''); SEO.setIngredients(); window.scrollTo(0, 0); }
    else if (path.startsWith('/ingredients/')) { setView('ingredient'); setProductId(null); setQuery(''); window.scrollTo(0, 0); }
    else if (path === '/analyze' || path === '/analyzer') { setView('analyze'); setProductId(null); setQuery(''); window.scrollTo(0, 0); }
    else if (path === '/links') { setView('links'); setProductId(null); setQuery(''); window.scrollTo(0, 0); }
    else if (path === '/about') { setView('about'); setProductId(null); setQuery(''); SEO.setAbout(); window.scrollTo(0, 0); }
    else if (path === '/privacy') { setView('privacy'); setProductId(null); setQuery(''); SEO.setPrivacy(); window.scrollTo(0, 0); }
    else if (path === '/terms') { setView('terms'); setProductId(null); setQuery(''); SEO.setTerms(); window.scrollTo(0, 0); }
  };
  useEffect(() => {
    handleRoute();
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
  }, []);

  // Update SEO meta on view changes
  useEffect(() => {
    if (view === 'privacy') SEO.setPrivacy();
    if (view === 'terms') SEO.setTerms();
    if (view === 'analyze') SEO.setAnalyzer();
  }, [view]);

  // Edit-mode protocol
  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Apply tweaks to CSS vars
  useEffect(() => {
    const fp = FONT_PAIRS[tweaks.fontPair] || FONT_PAIRS['sourceserif-inter'];
    document.documentElement.style.setProperty('--font-display', fp.display);
    document.documentElement.style.setProperty('--font-text', fp.text);
    const accent = ACCENTS[tweaks.accent] || ACCENTS.forest;
    document.documentElement.style.setProperty('--accent', accent.hex);
    document.body.classList.toggle('night', !!tweaks.night);
  }, [tweaks]);

  // Apply lang class for Korean word-break
  useEffect(() => {
    document.documentElement.classList.toggle('lang-ko', lang === 'ko');
  }, [lang]);

  const density = tweaks.density;

  const isLinksView = view === 'links';

  return (
    <div className="app" data-screen-label={`${view}`}>
      {!isLinksView && (
        <Header
          lang={lang} setLang={setLang}
          view={view} setView={setView}
          category={category} setCategory={setCategory}
          query={query} setQuery={setQuery}
          density={density}
        />
      )}
      {view === 'landing' && <Landing lang={lang} products={products} setView={setView} setProduct={(p) => { setProductId(p.id); setView('detail'); }} density={density} />}
      {fetchError === 'products' && view === 'feed' && <ErrorCard icon="📡" title={lang === 'ko' ? '제품을 불러올 수 없어요' : 'Couldn\u2019t load products'} message={lang === 'ko' ? '연결을 확인하고 다시 시도해 주세요.' : 'Check your connection and try again.'} lang={lang} />}
      {!fetchError && view === 'feed' && products.length === 0 && <ProductFeedSkeleton />}
      {!fetchError && view === 'feed' && products.length > 0 && <Feed lang={lang} category={category} setCategory={setCategory} query={query} setView={setView} setProduct={setProduct} density={density} products={products} />}
      {view === 'detail' && product && <Detail product={product} lang={lang} setView={setView} setProduct={setProduct} density={density} />}
      {view === 'detail' && !product && <ProductDetailSkeleton />}
      {view === 'insights' && (() => {
        const q = (query || '').trim().toLowerCase();
        const qWords = q.split(/\s+/).filter(w => w.length >= 2);
        const matchedProducts = q ? products.filter(p => {
          const haystack = [p.name, p.nameKo || '', p.brand, p.summary?.tagline || '', ...(p.ingredients || []).map(ing => ing.name + ' ' + (ing.nameKo || ''))].join(' ').toLowerCase();
          // Match if ALL words appear somewhere in the product data
          return qWords.every(w => haystack.includes(w));
        }) : [];

        const allBrandsForSearch = [...new Set(products.map(p => p.brand).filter(Boolean))];
        const matchedBrands = q ? allBrandsForSearch.filter(b => qWords.some(w => b.toLowerCase().includes(w))) : [];
        const hasAnyResults = matchedProducts.length > 0 || matchedBrands.length > 0;

        return (
          <>
            {q && (
              <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px 0 8px' }}>
                <p style={{ fontSize: 13, color: 'var(--ink-faint)', margin: 0 }}>
                  {lang === 'ko' ? '검색 결과:' : 'Results for:'}
                </p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 22, color: 'var(--ink)', margin: '4px 0 16px' }}>
                  "{query.trim()}"
                </h2>
              </div>
            )}
            {q && <IngredientMatch query={q} lang={lang} />}
            {q && matchedProducts.length > 0 && <SearchProducts products={matchedProducts} lang={lang} setProduct={setProduct} />}
            {q && (() => {
              if (matchedBrands.length === 0) return null;
              return (
                <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 0 20px' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--ink)', margin: '0 0 12px' }}>
                    {lang === 'ko' ? '브랜드' : 'Brands'}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {matchedBrands.map(b => {
                      const bSlug = b.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
                      return (
                        <a key={b} href={'/brands/' + bSlug} onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/brands/' + bSlug); setView('brands'); window.scrollTo(0, 0); }}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px 6px 6px', background: 'var(--cream-card)', border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', textDecoration: 'none', color: 'var(--ink)', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-text)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: 'var(--ink-faint)', color: '#fff', fontSize: 11, fontWeight: 700 }}>{b.charAt(0).toUpperCase()}</span>
                          {b.toUpperCase()}
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
            {q && <SearchSuggestions query={q} lang={lang} hasResults={hasAnyResults} setView={setView} setQuery={setQuery} />}
            {q && (
              <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 0 0' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--ink)', margin: '0 0 -8px' }}>
                  {matchedProducts.length > 0
                    ? (lang === 'ko' ? '아티클' : 'Articles')
                    : (lang === 'ko' ? '추천 아티클' : 'Suggested articles')}
                </h3>
              </div>
            )}
            <Insights lang={lang} density={density} query={query} />
            {q && (
              <div style={{ maxWidth: 720, margin: '24px auto 0' }}>
                <a href="/analyzer" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/analyzer'); setView('analyze'); setQuery(''); window.dispatchEvent(new CustomEvent('ana2me:reset-analyzer')); window.scrollTo(0,0); }}
                  style={{
                    display: 'flex', flexDirection: 'column', gap: 10,
                    padding: '24px 22px',
                    background: 'var(--accent)', color: '#fff',
                    borderRadius: 'var(--radius)', textDecoration: 'none',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>🔬</span>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>
                      {lang === 'ko' ? '성분 분석기' : 'Ingredient Analyzer'}
                    </span>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.2)' }}>Beta</span>
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 'var(--radius-pill)', background: 'rgba(245,215,110,0.5)', color: '#fff' }}>
                      {lang === 'ko' ? '무료' : 'Free'}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(18px, 2.4vw, 22px)', lineHeight: 1.2 }}>
                    {lang === 'ko' ? '나에게 맞는 성분 패턴 찾기' : 'Find your ingredient pattern'}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', marginTop: 4, background: '#fff', color: 'var(--accent)', borderRadius: 'var(--radius-pill)', fontSize: 13, fontWeight: 700, alignSelf: 'flex-start' }}>
                    {lang === 'ko' ? '내 성분패턴 분석하기' : 'Try the analyzer'} →
                  </span>
                </a>
              </div>
            )}
          </>
        );
      })()}
      {view === 'brands' && products.length === 0 && <ProductFeedSkeleton />}
      {view === 'brands' && products.length > 0 && <Brands lang={lang} products={products} setView={setView} setProduct={setProduct} density={density} brandSlug={brandSlug} />}
      {view === 'analyze' && <Try lang={lang} products={products} setView={setView} setProduct={setProduct} />}
      {view === 'about' && <About lang={lang} density={density} />}
      {view === 'privacy' && <Privacy lang={lang} />}
      {view === 'terms' && <Terms lang={lang} />}
      {view === 'ingredients-list' && <IngredientsList lang={lang} setView={setView} />}
      {view === 'ingredient' && <Ingredient lang={lang} products={products} setView={setView} setProduct={setProduct} />}
      {view === 'admin' && <Admin />}
      {view === 'links' && <Links lang={lang} setView={setView} />}

      {!isLinksView && <footer style={{
        maxWidth: 720, margin: '0 auto', padding: '24px 28px 36px',
        borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/about" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/about'); SEO.setAbout(); setView('about'); window.scrollTo(0, 0); }} style={{ fontSize: 12, color: 'var(--ink-faint)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            {lang === 'ko' ? '소개' : 'About'}
          </a>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--ink-faint)', display: 'inline-block', opacity: 0.4 }} />
          <a href="/privacy" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/privacy'); SEO.setPrivacy(); setView('privacy'); }} style={{ fontSize: 12, color: 'var(--ink-faint)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            {lang === 'ko' ? '개인정보처리방침' : 'Privacy'}
          </a>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--ink-faint)', display: 'inline-block', opacity: 0.4 }} />
          <a href="/terms" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/terms'); SEO.setTerms(); setView('terms'); window.scrollTo(0, 0); }} style={{ fontSize: 12, color: 'var(--ink-faint)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: 3 }}>
            {lang === 'ko' ? '이용약관' : 'Terms'}
          </a>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--ink-faint)', display: 'inline-block', opacity: 0.4 }} />
          <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>Contact: ana2me2026@gmail.com</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--ink-faint)', display: 'inline-block', opacity: 0.4 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a href="https://x.com/ana2me2026" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)', color: 'var(--cream)', transition: 'opacity 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.instagram.com/ana2me.official/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)', color: 'var(--cream)', transition: 'opacity 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://medium.com/@ana2me2026" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)', color: 'var(--cream)', transition: 'opacity 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@ana2me" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: 'var(--ink)', color: 'var(--cream)', transition: 'opacity 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/></svg>
            </a>
          </div>
        </div>
        <span style={{ fontSize: 11, color: 'var(--ink-faint)', opacity: 0.5 }}>© {new Date().getFullYear()} ana2me</span>
      </footer>}

      {tweaksOpen && <Tweaks tweaks={tweaks} setTweak={setTweak} lang={lang} setLang={setLang} />}
    </div>
  );
}

export { ErrorBoundary };
export default App;
