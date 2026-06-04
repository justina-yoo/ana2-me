// Ingredient Analyzer — "Your Ingredient Profile"
// Compact chip-based input → AI ingredient pattern analysis
import React, { useState } from 'react';
import { cn, useL, Icon, Sticker, ProductImg } from '../components/primitives';

export default function Analyzer({ lang, density }) {
  const t = useL(lang);
  const isKo = lang === 'ko';

  const [works, setWorks] = useState([]);     // [{ name, image?, brand? }]
  const [doesnt, setDoesnt] = useState([]);
  const [activeList, setActiveList] = useState('works'); // which list gets new items
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const products = window.PRODUCTS || []; // TODO: replace with proper product state once data layer is migrated
  const allNames = [...works, ...doesnt].map(p => p.name.toLowerCase());
  const canAnalyze = (works.length + doesnt.length) >= 1;

  const matchProduct = (name) => {
    const lower = name.toLowerCase();
    const match = products.find(p =>
      p.name.toLowerCase() === lower ||
      (p.nameKo && p.nameKo.toLowerCase() === lower)
    );
    if (match) return { name: match.name, nameKo: match.nameKo, image: match.imageUrl, brand: match.brand };
    return { name };
  };

  const addProduct = (nameOrProduct) => {
    const item = typeof nameOrProduct === 'string' ? matchProduct(nameOrProduct) : nameOrProduct;
    if (allNames.includes(item.name.toLowerCase())) return;
    const setter = activeList === 'works' ? setWorks : setDoesnt;
    setter(prev => [...prev, item]);
    setQuery('');
    setResult(null); setError(null);
  };

  const removeProduct = (name, list) => {
    const setter = list === 'works' ? setWorks : setDoesnt;
    setter(prev => prev.filter(p => p.name !== name));
    setResult(null); setError(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      e.preventDefault();
      addProduct(query.trim());
    }
  };

  // Suggestions from DB that haven't been added yet
  const suggestions = products
    .filter(p => !allNames.includes(p.name.toLowerCase()))
    .slice(0, 8);

  const buildPrompt = () => {
    const w = works.length
      ? `PRODUCTS THAT WORK FOR THIS PERSON:\n${works.map(p => `- ${p.name}`).join('\n')}`
      : '';
    const d = doesnt.length
      ? `PRODUCTS THAT DON'T WORK FOR THIS PERSON:\n${doesnt.map(p => `- ${p.name}`).join('\n')}`
      : '';
    const langI = isKo ? 'Respond ENTIRELY in Korean (한국어로만).' : 'Respond in English.';
    return `You are a friendly beauty ingredient expert. The user has listed products by name. Use your knowledge of these products' formulations and key ingredients to analyze patterns.

${w}

${d}

Based on these products and their known ingredient profiles, return two short sections:
**Ingredients that work for you** — list 3-5 specific ingredient names commonly found in the working products and one brief sentence on why each likely suits them.
**Ingredients to watch out for** — list 2-4 specific ingredient names commonly found in the non-working products and one brief sentence on why each might not suit them.

If you don't recognize a product, skip it and work with the ones you do know. Be concise and friendly. No jargon. ${langI}`;
  };

  const analyze = async () => {
    if (!canAnalyze || busy) return;
    setBusy(true); setResult(null); setError(null);
    try {
      const text = await window.__ai.complete(buildPrompt());
      if (!text) throw new Error('Empty response.');
      setResult(text);
    } catch (e) {
      setError(e?.message || 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  const renderResult = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="res-gap" />;
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const isBullet = /^[-•*]\s/.test(trimmed);
      const Tag = isBullet ? 'li' : 'p';
      const content = parts.map((p, j) => j % 2 === 1
        ? <strong key={j}>{p}</strong>
        : <React.Fragment key={j}>{p.replace(/^[-•*]\s/, '')}</React.Fragment>);
      return <Tag key={i} className={isBullet ? 'res-li' : 'res-p'}>{content}</Tag>;
    });
  };

  const label = (item) => isKo && item.nameKo ? item.nameKo : item.name;

  return (
    <div className={cn('insights', `dens-${density}`)} style={{ maxWidth: 780, margin: '0 auto' }}>
      {/* Hero */}
      <header className="ins-hero">
        <Sticker color="accent" rotate={-5}>{t('ingredient profiler', '성분 프로파일러')}</Sticker>
        <h1 className="display">
          {t('Your Ingredient', '나의 성분')}<br />
          <span className="display-accent">{t('Profile', '프로필')}<span className="display-dot">.</span></span>
        </h1>
        <p className="ins-sub">
          {t(
            "Tell us what's worked (and what hasn't). We'll find the common thread.",
            '효과 있던 것, 없던 것을 알려주세요. 공통된 흐름을 찾아드립니다.'
          )}
        </p>
      </header>

      {/* Toggle: adding to works or doesn't */}
      <div className="prof-toggle">
        <button
          className={cn('prof-toggle-btn', activeList === 'works' && 'prof-toggle-on prof-toggle-works')}
          onClick={() => setActiveList('works')}
        >
          <Icon name="thumbs" size={14} />
          {t('Works for me', '맞는 제품')}
          {works.length > 0 && <span className="prof-toggle-count">{works.length}</span>}
        </button>
        <button
          className={cn('prof-toggle-btn', activeList === 'doesnt' && 'prof-toggle-on prof-toggle-doesnt')}
          onClick={() => setActiveList('doesnt')}
        >
          <Icon name="thumbsDown" size={14} />
          {t("Doesn't work", '안 맞는 제품')}
          {doesnt.length > 0 && <span className="prof-toggle-count">{doesnt.length}</span>}
        </button>
      </div>

      {/* Search input */}
      <div className="prof-input-wrap">
        <Icon name="search" size={16} />
        <input
          className="prof-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('Type a product name and press Enter', '제품 이름을 입력하고 Enter')}
        />
        {query && (
          <button className="prof-input-x" onClick={() => setQuery('')}>
            <Icon name="x" size={14} />
          </button>
        )}
      </div>

      {/* Quick add suggestions */}
      {suggestions.length > 0 && (
        <div className="prof-suggest">
          {suggestions.map(p => (
            <button key={p.id} className="prof-suggest-chip" onClick={() => addProduct({
              name: p.name, nameKo: p.nameKo, image: p.imageUrl, brand: p.brand
            })}>
              {p.imageUrl && <ProductImg src={p.imageUrl} alt={p.brand + ' ' + (isKo && p.nameKo ? p.nameKo : p.name)} className="prof-suggest-img" />}
              <span>{isKo && p.nameKo ? p.nameKo : p.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Product slots */}
      {works.length > 0 && (
        <div className="prof-slot-section">
          <div className="prof-slot-label prof-slot-label-works">
            <Icon name="thumbs" size={12} />
            {t('Works', '맞는 제품')} ({works.length})
          </div>
          <div className="prof-slots">
            {works.map(item => (
              <div key={item.name} className="prof-slot prof-slot-works">
                {item.image && <ProductImg src={item.image} alt={(item.brand || '') + ' ' + label(item)} className="prof-slot-img" />}
                <div className="prof-slot-info">
                  {item.brand && <span className="prof-slot-brand">{item.brand}</span>}
                  <span className="prof-slot-name">{label(item)}</span>
                </div>
                <button className="prof-slot-x" onClick={() => removeProduct(item.name, 'works')}>
                  <Icon name="x" size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {doesnt.length > 0 && (
        <div className="prof-slot-section">
          <div className="prof-slot-label prof-slot-label-doesnt">
            <Icon name="thumbsDown" size={12} />
            {t("Doesn't work", '안 맞는 제품')} ({doesnt.length})
          </div>
          <div className="prof-slots">
            {doesnt.map(item => (
              <div key={item.name} className="prof-slot prof-slot-doesnt">
                {item.image && <ProductImg src={item.image} alt={(item.brand || '') + ' ' + label(item)} className="prof-slot-img" />}
                <div className="prof-slot-info">
                  {item.brand && <span className="prof-slot-brand">{item.brand}</span>}
                  <span className="prof-slot-name">{label(item)}</span>
                </div>
                <button className="prof-slot-x" onClick={() => removeProduct(item.name, 'doesnt')}>
                  <Icon name="x" size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analyze */}
      <div style={{ paddingTop: 24 }}>
        <button
          className={cn('prof-go', !canAnalyze && 'prof-go-off')}
          onClick={analyze}
          disabled={!canAnalyze || busy}
        >
          {busy
            ? <><span className="prof-spin" /> {t('Reading…', '읽는 중…')}</>
            : <><Icon name="spark" size={16} /> {t('Analyze my ingredients', '내 성분 분석하기')}</>}
        </button>

        {error && (
          <div className="prof-err">
            {t(`Analysis failed: ${error}`, `분석 중 오류: ${error}`)}
          </div>
        )}

        {busy && (
          <article className="prof-result" aria-busy="true">
            <div className="prof-result-body" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '4px 0' }}>
              <div className="skeleton" style={{ height: 14, width: '55%', borderRadius: 4 }} />
              <div className="skeleton" style={{ height: 14, width: '80%', borderRadius: 4 }} />
              <div className="skeleton" style={{ height: 14, width: '65%', borderRadius: 4 }} />
              <div className="skeleton" style={{ height: 14, width: '72%', borderRadius: 4 }} />
              <div style={{ marginTop: 8 }} />
              <div className="skeleton" style={{ height: 14, width: '50%', borderRadius: 4 }} />
              <div className="skeleton" style={{ height: 14, width: '70%', borderRadius: 4 }} />
              <div className="skeleton" style={{ height: 14, width: '60%', borderRadius: 4 }} />
            </div>
          </article>
        )}

        {result && (
          <article className="prof-result">
            <header className="prof-result-head">
              <Sticker color="sage" rotate={-3}>{t('your profile', '당신의 프로필')}</Sticker>
              <span className="prof-result-meta">
                {works.length + doesnt.length} {t('products analyzed', '개 제품 분석')}
              </span>
            </header>
            <div className="prof-result-body">
              {renderResult(result)}
            </div>
            <p className="prof-disclaimer">
              {t(
                '* AI-generated analysis. Not a substitute for medical advice.',
                '* AI가 생성한 분석입니다. 의학적 조언을 대체하지 않습니다.'
              )}
            </p>
          </article>
        )}
      </div>
    </div>
  );
}
