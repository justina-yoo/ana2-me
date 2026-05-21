// Feed view — home with chat greeting + daily pick + product grid
const { useMemo: _uM1 } = React;

window.Feed = function Feed({ lang, category, setCategory, query, setView, setProduct, density, products }) {
  const t = useL(lang);
  const [sort, setSort] = _uS1('default');
  const [concern, setConcern] = _uS1(null);

  // Grouped concern filters — map messy labels to clean categories
  const CONCERN_MAP = {
    'Acne': ['Acne-prone skin', 'Acne & breakouts', 'Blemishes', 'Post-acne marks', 'Post-breakout redness', 'Excess sebum and oiliness', 'Excess oil', 'Oily skin', 'Clogged pores and surface buildup'],
    'Hydration': ['Dehydration', 'Hydration', 'Dry or very dry skin', 'Post-cleansing dryness', 'Overnight hydration', 'Multi-layer hydration'],
    'Sensitivity': ['Sensitive skin', 'Sensitive & troubled skin', 'Reactive skin', 'Redness', 'Rosacea', 'Eczema & psoriasis', 'Compromised barrier', 'Chapped or cracked skin', 'Microbiome imbalance'],
    'Anti-aging': ['Fine lines', 'Loss of elasticity', 'Early signs of aging', 'Pore firming', 'Pore care', 'Enlarged pores'],
    'Brightening': ['Dull skin', 'Dullness', 'Dark spots', 'Uneven tone', 'Uneven skin tone', 'Brightening', 'Rough texture'],
  };
  const CONCERN_MAP_KO = { 'Acne': '여드름', 'Hydration': '보습', 'Sensitivity': '민감', 'Anti-aging': '안티에이징', 'Brightening': '미백' };

  const activeConcerns = useMemo(() => {
    const available = [];
    Object.entries(CONCERN_MAP).forEach(([group, labels]) => {
      if (products.some(p => (p.summary?.concerns || []).some(c => labels.includes(c)))) {
        available.push(group);
      }
    });
    return available;
  }, [products]);

  const filtered = useMemo(() => {
    let list = products;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.nameKo || '').toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }
    if (concern && CONCERN_MAP[concern]) {
      const labels = CONCERN_MAP[concern];
      list = list.filter(p => (p.summary?.concerns || []).some(c => labels.includes(c)));
    }
    if (sort === 'brand') list = [...list].sort((a, b) => a.brand.localeCompare(b.brand));
    else if (sort === 'newest') list = [...list].sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    return list;
  }, [query, products, sort, concern]);

  const dailyPool = useMemo(
    () => products.filter(p => p.category === category),
    [products, category]
  );
  const daily = dailyPool[new Date().getDate() % (dailyPool.length || 1)] || products[0];

  const greet = () => {
    const h = new Date().getHours();
    if (lang === 'ko') {
      if (h < 11) return '좋은 아침이에요';
      if (h < 18) return '안녕, 오늘 컨디션 어때요?';
      return '오늘 하루 수고했어요';
    }
    if (h < 11) return 'Morning, friend';
    if (h < 18) return 'Hey — how\'s skin today?';
    return 'Evening wind-down';
  };

  const catMeta = {
    'skincare': { en: 'Skincare', ko: '스킨케어', blurb: 'every molecule, demystified', blurbKo: '모든 분자, 쉽게 풀어드려요' },
    'fragrance': { en: 'Fragrance', ko: '향수', blurb: 'the science of how you smell', blurbKo: '향이 피어나는 과학' },
    'wellness-food': { en: 'Wellness', ko: '웰니스', blurb: 'supplements that actually absorb', blurbKo: '진짜 흡수되는 보충제' },
  }[category];

  const cats = [
    { id: 'skincare', en: 'Skincare', ko: '스킨케어' },
    { id: 'fragrance', en: 'Fragrance', ko: '향수' },
    { id: 'wellness-food', en: 'Wellness', ko: '웰니스' },
  ];

  return (
    <div className={cn('feed', `dens-${density}`)}>
      {/* Hero title */}
      {!query && (
        <header className="ins-hero">
          <Sticker color="sage" rotate={-4}>{t('products', '제품')}</Sticker>
          <h1 className="display">
            {t(`The anatomy of`, '성분 해부:')} <br/>
            <span className="display-accent">{t(catMeta.en, catMeta.ko)}<span className="display-dot">.</span></span>
          </h1>
          <p className="ins-sub">{t(
            'Every molecule, demystified.',
            '모든 분자, 쉽게 풀어드려요.'
          )}</p>
        </header>
      )}

      {/* Sort + Filter + Browse by brand */}
      {!query && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 0 12px' }}>
          <a href="/brands" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/brands'); window.dispatchEvent(new PopStateEvent('popstate')); }} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', color: '#a07850', display: 'inline-flex', alignItems: 'center', gap: 4 }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
            {t('Browse by brand', '브랜드별 보기')} <Icon name="arrow" size={11} />
          </a>
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', paddingBottom: 2 }}>
            {activeConcerns.map(c => (
              <button key={c} onClick={() => setConcern(concern === c ? null : c)} style={{
                background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer',
                fontSize: 13, fontWeight: concern === c ? 600 : 500, whiteSpace: 'nowrap', flexShrink: 0,
                color: concern === c ? 'var(--ink)' : 'var(--ink-faint)',
                borderBottom: concern === c ? '2px solid var(--ink)' : '2px solid transparent',
                transition: 'all 0.15s',
              }} onMouseEnter={(e) => { if (concern !== c) e.currentTarget.style.color = 'var(--ink-soft)'; }}
                 onMouseLeave={(e) => { if (concern !== c) e.currentTarget.style.color = 'var(--ink-faint)'; }}>
                #{lang === 'ko' ? CONCERN_MAP_KO[c] || c : c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <section className="grid-section">
        {(category === 'fragrance' || category === 'wellness-food') && !query ? (
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <p style={{ fontSize: 18, fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--ink)', margin: '0 0 8px' }}>
              {t('Coming soon', '곧 공개됩니다')}
            </p>
            <p style={{ fontSize: 14, color: 'var(--ink-faint)', margin: 0 }}>
              {t('We\'re working on adding products for this category.', '이 카테고리의 제품을 준비하고 있어요.')}
            </p>
          </div>
        ) : (
          <>
            {query && (
              <div className="grid-head">
                <h2 className="grid-h">
                  {t(`Results for "${query}"`, `"${query}" 검색 결과`)}
                </h2>
                <span className="grid-count">{filtered.length} {t('items', '개')}</span>
              </div>
            )}
            {filtered.length > 0 ? (
              <div className="product-grid">
                {filtered.map((p, i) => {
                  const slug = p.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/,'');
                  const isPlaceholder = (p.imageUrl || '').includes('placeholder');
                  return <Reveal key={p.id}><ProductCard product={p} lang={lang} href={'/products/' + slug} onClick={(e) => { e.preventDefault(); setProduct(p); history.pushState({}, '', '/products/' + slug); window.scrollTo(0,0); }} index={i} isPlaceholder={isPlaceholder} /></Reveal>;
                })}
              </div>
            ) : (
              <div className="empty">
                <Sticker color="sage" rotate={-4}>{t('nothing here', '결과 없음')}</Sticker>
                <p>{t("Try another word — we might have it under a different name.", '다른 키워드로 검색해보세요.')}</p>
              </div>
            )}
          </>
        )}
      </section>

    </div>
  );
};

window.ProductCard = function ProductCard({ product, lang, onClick, href, index, isPlaceholder }) {
  const t = useL(lang);
  const name = lang === 'ko' && product.nameKo ? product.nameKo : product.name;
  const tag = lang === 'ko' && product.summary?.taglineKo ? product.summary.taglineKo : product.summary?.tagline;
  const topIng = product.ingredients?.[0];
  const isNew = product.createdAt && (Date.now() - new Date(product.createdAt).getTime()) < 2 * 24 * 60 * 60 * 1000;
  return (
    <a className="pcard" href={href || '#'} onClick={onClick} style={{ '--i': index, textDecoration: 'none', color: 'inherit' }}>
      <div className="pcard-img-wrap">
        <ProductImg src={product.imageUrl} alt={product.brand + ' ' + name} className="pcard-img" />
        {isNew && (
          <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff', background: 'var(--accent)', padding: '3px 8px', borderRadius: 'var(--radius-pill)' }}>
            {t('New', '신규')}
          </span>
        )}
        {isPlaceholder && (
          <span style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontWeight: 500, fontStyle: 'italic', color: 'var(--ink-faint)', opacity: 0.6, whiteSpace: 'nowrap' }}>
            {t('Photo coming soon', '사진 준비 중')}
          </span>
        )}
        {!isPlaceholder && topIng && (
          <span className="pcard-ing-pill">
            <span className="pcard-ing-sym">{topIng.symbol}</span>
            <span>{lang === 'ko' && topIng.nameKo ? topIng.nameKo : topIng.name}</span>
          </span>
        )}
      </div>
      <div className="pcard-body">
        <span className="pcard-brand">{product.brand}</span>
        <h3 className="pcard-name">{name}</h3>
      </div>
      <span className="pcard-arrow"><Icon name="arrow" size={16} /></span>
    </a>
  );
};
