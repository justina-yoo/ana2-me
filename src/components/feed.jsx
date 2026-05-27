// Feed view — product listing grouped by concern
const { useMemo: _uM1 } = React;

window.Feed = function Feed({ lang, category, setCategory, query, setView, setProduct, density, products }) {
  const t = useL(lang);
  const tickerRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const pausedRef = React.useRef(false);

  React.useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let pos = 0;
    const half = el.scrollWidth / 2;
    const step = () => {
      if (!pausedRef.current) {
        pos += 0.4;
        if (pos >= half) pos -= half;
        el.scrollLeft = pos;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    const onDown = () => { pausedRef.current = true; pos = el.scrollLeft; };
    const onUp = () => { const half2 = el.scrollWidth / 2; pos = el.scrollLeft % half2; pausedRef.current = false; };
    el.addEventListener('mousedown', onDown);
    el.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('touchstart', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [products]);

  const CONCERN_MAP = {
    'Hydration': ['Dehydration', 'Hydration', 'Dry or very dry skin', 'Post-cleansing dryness', 'Overnight hydration', 'Multi-layer hydration'],
    'Sensitivity': ['Sensitive skin', 'Sensitive & troubled skin', 'Reactive skin', 'Redness', 'Rosacea', 'Eczema & psoriasis', 'Compromised barrier', 'Chapped or cracked skin', 'Microbiome imbalance'],
    'Acne': ['Acne-prone skin', 'Acne & breakouts', 'Blemishes', 'Post-acne marks', 'Post-breakout redness', 'Excess sebum and oiliness', 'Excess oil', 'Oily skin', 'Clogged pores and surface buildup'],
    'Anti-aging': ['Fine lines', 'Loss of elasticity', 'Early signs of aging', 'Pore firming', 'Pore care', 'Enlarged pores'],
    'Brightening': ['Dull skin', 'Dullness', 'Dark spots', 'Uneven tone', 'Uneven skin tone', 'Brightening', 'Rough texture'],
  };
  const CONCERN_MAP_KO = { 'Acne': '여드름', 'Hydration': '보습', 'Sensitivity': '민감', 'Anti-aging': '안티에이징', 'Brightening': '브라이트닝' };

  // Newly added products (same window as "New" badge — 2 days)
  const newProducts = _uM1(() => {
    const cutoff = Date.now() - 2 * 24 * 60 * 60 * 1000;
    return products.filter(p => p.createdAt && new Date(p.createdAt).getTime() > cutoff)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [products]);

  // Group products by concern
  const sections = _uM1(() => {
    const result = [];
    Object.entries(CONCERN_MAP).forEach(([group, labels]) => {
      const matches = products.filter(p => (p.summary?.concerns || []).some(c => labels.includes(c)));
      if (matches.length) result.push({ name: group, nameKo: CONCERN_MAP_KO[group] || group, products: matches });
    });
    return result;
  }, [products]);

  // Search filtering
  const searchResults = _uM1(() => {
    if (!query) return null;
    const q = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.nameKo || '').toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  }, [query, products]);

  const catMeta = {
    'skincare': { en: 'Skincare', ko: '스킨케어' },
    'fragrance': { en: 'Fragrance', ko: '향수' },
    'wellness-food': { en: 'Wellness', ko: '웰니스' },
  }[category];

  const renderCard = (p, i) => {
    const slug = p.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/,'');
    const isPlaceholder = (p.imageUrl || '').includes('placeholder');
    return <Reveal key={p.id}><ProductCard product={p} lang={lang} href={'/products/' + slug} onClick={(e) => { e.preventDefault(); setProduct(p); history.pushState({}, '', '/products/' + slug); window.scrollTo(0,0); }} index={i} isPlaceholder={isPlaceholder} /></Reveal>;
  };

  return (
    <div className={cn('feed', `dens-${density}`)}>
      {/* Hero */}
      {!query && (
        <header className="ins-hero">
          <Sticker color="sage" rotate={-4}>{t('products', '제품')}</Sticker>
          <h1 className="display">
            {t('The anatomy of', '성분 해부:')} <br/>
            <span className="display-accent">{t(catMeta.en, catMeta.ko)}<span className="display-dot">.</span></span>
          </h1>
          <p className="ins-sub">{t('Every molecule, demystified.', '모든 분자, 쉽게 풀어드려요.')}</p>
        </header>
      )}

      {/* Browse by brand + brand chips */}
      {!query && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 0 12px' }}>
          <a href="/brands" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/brands'); window.dispatchEvent(new PopStateEvent('popstate')); }} style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', color: '#a07850', display: 'inline-flex', alignItems: 'center', gap: 4 }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
            {t('Browse by brand', '브랜드별 보기')} &gt;
          </a>
          {(() => {
            const FEATURED = ['COSRX', 'Dr. Jart+', 'Round Lab', 'Sulwhasoo', 'Arencia', 'AESTURA', 'Anua', 'Beauty of Joseon'];
            const available = FEATURED.filter(b => products.some(p => p.brand === b));
            if (!available.length) return null;
            const goToBrand = (name) => { const s = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''); history.pushState({}, '', '/brands/' + s); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0, 0); };
            const chipStyle = {
              padding: '6px 16px 6px 6px', borderRadius: 'var(--radius-pill)', fontSize: 13, fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              background: 'var(--cream-card)', border: '1px solid var(--line)',
              color: 'var(--ink-faint)', cursor: 'pointer', transition: 'all .15s ease',
              whiteSpace: 'nowrap', flexShrink: 0,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            };
            const avatarStyle = {
              width: 28, height: 28, borderRadius: '50%', background: 'var(--ink-faint)', color: '#fff',
              display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, letterSpacing: 0, flexShrink: 0,
            };
            const renderChip = (b, keySuffix) => (
              <button key={b + keySuffix} onClick={() => goToBrand(b)} style={chipStyle}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--ink)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.color = 'var(--ink-faint)'; }}>
                <span style={avatarStyle}>{b.charAt(0).toUpperCase()}</span>
                {b}
              </button>
            );
            return (
              <div ref={tickerRef} style={{ display: 'flex', gap: 8, overflow: 'hidden', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', paddingBottom: 2, cursor: 'grab' }}>
                {available.map(b => renderChip(b, ''))}
                {available.map(b => renderChip(b, '-dup'))}
              </div>
            );
          })()}
        </div>
      )}

      {/* Content */}
      {(category === 'fragrance' || category === 'wellness-food') && !query ? (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <p style={{ fontSize: 18, fontFamily: 'var(--font-display)', fontWeight: 500, color: 'var(--ink)', margin: '0 0 8px' }}>
            {t('Coming soon', '곧 공개됩니다')}
          </p>
          <p style={{ fontSize: 14, color: 'var(--ink-faint)', margin: 0 }}>
            {t('We\'re working on adding products for this category.', '이 카테고리의 제품을 준비하고 있어요.')}
          </p>
        </div>
      ) : query ? (
        /* Search results */
        <section className="grid-section">
          <div className="grid-head">
            <h2 className="grid-h">{t(`Results for "${query}"`, `"${query}" 검색 결과`)}</h2>
            <span className="grid-count">{searchResults.length} {t('items', '개')}</span>
          </div>
          {searchResults.length > 0 ? (
            <div className="product-grid">
              {searchResults.map((p, i) => renderCard(p, i))}
            </div>
          ) : (
            <div className="empty">
              <Sticker color="sage" rotate={-4}>{t('nothing here', '결과 없음')}</Sticker>
              <p>{t("Try another word — we might have it under a different name.", '다른 키워드로 검색해보세요.')}</p>
            </div>
          )}
        </section>
      ) : (
        /* Grouped sections by concern */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          {/* Newly Added */}
          {newProducts.length > 0 && (
            <section className="grid-section">
              <div className="grid-head">
                <h2 className="grid-h">{t('Newly Added', '새로 추가됨')}</h2>
              </div>
              <div className="scroll-row">
                {newProducts.map((p, i) => renderCard(p, i))}
              </div>
            </section>
          )}
          {sections.map((section, si) => (
            <React.Fragment key={section.name}>
              <section className="grid-section">
                <div className="grid-head">
                  <h2 className="grid-h">#{t(section.name, section.nameKo)}</h2>
                </div>
                <div className="scroll-row">
                  {section.products.map((p, i) => renderCard(p, i))}
                </div>
              </section>
              {/* Analyzer CTA after 2nd section */}
              {si === 1 && (
                <Reveal>
                  <a href="/analyzer" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/analyzer'); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0,0); }}
                    style={{
                      display: 'flex', flexDirection: 'column', gap: 10,
                      padding: '24px 22px',
                      background: 'var(--accent)', color: '#fff',
                      borderRadius: 'var(--radius)', textDecoration: 'none',
                      transition: 'all .15s ease',
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 20 }}>🔬</span>
                      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>
                        {t('Ingredient Analyzer', '성분 분석기')}
                      </span>
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.2)', opacity: 0.9 }}>
                        Beta
                      </span>
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 'var(--radius-pill)', background: 'rgba(245,215,110,0.5)', color: '#fff' }}>
                        {t('Free', '무료')}
                      </span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(18px, 2.4vw, 22px)', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                      {t('Find your ingredient pattern', '나에게 맞는 성분 패턴 찾기')}
                    </span>
                    <span style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.8 }}>
                      {t("Tell us what works and what doesn't for your skin — we'll find the pattern.", '내 피부에 맞는 것과 안 맞는 것을 알려주세요. 패턴을 찾아드립니다.')}
                    </span>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      padding: '10px 20px', marginTop: 4,
                      background: '#fff', color: 'var(--accent)',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: 13, fontWeight: 700, alignSelf: 'flex-start',
                    }} className="cta-shake">
                      {t('Try the analyzer', '분석기 사용하기')} →
                    </span>
                  </a>
                </Reveal>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

    </div>
  );
};

window.ProductCard = function ProductCard({ product, lang, onClick, href, index, isPlaceholder }) {
  const t = useL(lang);
  const name = lang === 'ko' && product.nameKo ? product.nameKo : product.name;
  const topIng = product.ingredients?.[0];
  const isNew = product.createdAt && (Date.now() - new Date(product.createdAt).getTime()) < 2 * 24 * 60 * 60 * 1000;
  return (
    <a className="pcard" href={href || '#'} onClick={onClick} style={{ '--i': index, textDecoration: 'none', color: 'inherit' }}>
      <div className="pcard-img-wrap">
        <ProductImg src={product.imageUrl} alt={product.brand + ' ' + name} className="pcard-img" />
        {isNew && (
          <span style={{ position: 'absolute', top: 8, right: 8, fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--ink)', background: 'var(--butter)', padding: '3px 8px', borderRadius: 'var(--radius-pill)' }}>
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
