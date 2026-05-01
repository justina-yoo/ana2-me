// Feed view — home with chat greeting + daily pick + product grid
const { useMemo: _uM1 } = React;

window.Feed = function Feed({ lang, category, query, setView, setProduct, density }) {
  const t = useL(lang);
  const products = window.PRODUCTS;

  const filtered = useMemo(() => {
    if (query) {
      const q = query.toLowerCase();
      return products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.nameKo || '').toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }
    return products.filter(p => p.category === category);
  }, [query, category, products]);

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

  return (
    <div className={cn('feed', `dens-${density}`)}>
      {/* Chat-style greeting */}
      {!query && (
        <section className="chat-intro">
          <div className="chat-bubble chat-from-us">
            <div className="chat-avatar">A</div>
            <div>
              <p className="chat-name">anatomy <span className="chat-dot">·</span> <span className="chat-time">{new Date().toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span></p>
              <p className="chat-msg"><strong>{greet()}.</strong> {t(
                'We pulled 3 things worth your attention today.',
                '오늘 눈여겨볼 만한 것 세 가지를 골라봤어요.'
              )}</p>
            </div>
          </div>
        </section>
      )}

      {/* Hero title */}
      {!query && (
        <section className="feed-hero">
          <div className="feed-hero-row">
            <h1 className="display">
              {t(`The anatomy of`, '성분 해부:')} <br/>
              <span className="display-accent">{t(catMeta.en, catMeta.ko)}<span className="display-dot">.</span></span>
            </h1>
            <div className="feed-hero-meta">
              <Sticker color="butter" rotate={-6}>{t('new this week', '이번 주 신규')}</Sticker>
              <p className="feed-hero-sub">{t(catMeta.blurb, catMeta.blurbKo)}</p>
            </div>
          </div>
        </section>
      )}

      {/* Daily pick module */}
      {!query && (
        <section className="daily">
          <div className="daily-label">
            <Sticker color="accent" rotate={-3}>{t("today's pick", '오늘의 추천')}</Sticker>
            <span className="daily-date">#{String(new Date().getDate()).padStart(2, '0')} · {new Date().toLocaleDateString(lang === 'ko' ? 'ko-KR' : 'en-US', { month: 'long' })}</span>
          </div>
          <button className="daily-card" onClick={() => { setProduct(daily); window.scrollTo(0,0); }}>
            <div className="daily-img-wrap">
              <Tape className="tape-tl" style={{ transform: 'rotate(-6deg) translate(-10px,-8px)' }} />
              <Tape className="tape-br" style={{ transform: 'rotate(8deg) translate(10px,8px)', right: 0, bottom: 0 }} />
              <ProductImg src={daily.imageUrl} alt={daily.name} className="daily-img" />
            </div>
            <div className="daily-body">
              <span className="daily-brand">{daily.brand}</span>
              <h3 className="daily-name">{lang === 'ko' && daily.nameKo ? daily.nameKo : daily.name}</h3>
              <p className="daily-tagline">{lang === 'ko' && daily.summary?.taglineKo ? daily.summary.taglineKo : daily.summary?.tagline}</p>
              <div className="daily-concerns">
                {((lang === 'ko' ? daily.summary?.concernsKo : daily.summary?.concerns) || []).slice(0, 3).map(c => (
                  <span key={c} className="concern-tag">{c}</span>
                ))}
              </div>
              <span className="daily-cta">
                {t('Read the breakdown', '분석 보러가기')} <Icon name="arrow" size={16} />
              </span>
            </div>
          </button>
        </section>
      )}

      {/* Grid */}
      <section className="grid-section">
        <div className="grid-head">
          <h2 className="grid-h">
            {query
              ? t(`Results for "${query}"`, `"${query}" 검색 결과`)
              : t(`All ${catMeta.en.toLowerCase()}`, `전체 ${catMeta.ko}`)}
          </h2>
          <span className="grid-count">{filtered.length} {t('items', '개')}</span>
        </div>
        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} lang={lang} onClick={() => { setProduct(p); window.scrollTo(0,0); }} index={i} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <Sticker color="sage" rotate={-4}>{t('nothing here', '결과 없음')}</Sticker>
            <p>{t("Try another word — we might have it under a different name.", '다른 키워드로 검색해보세요.')}</p>
          </div>
        )}
      </section>

      {/* Footnote */}
      <footer className="feed-foot">
        <p className="foot-mark">anatomy <span>·</span> <em>{t('clean, curious, kind to skin', '깨끗하게, 궁금하게, 피부에 친절하게')}</em></p>
      </footer>
    </div>
  );
};

window.ProductCard = function ProductCard({ product, lang, onClick, index }) {
  const t = useL(lang);
  const name = lang === 'ko' && product.nameKo ? product.nameKo : product.name;
  const tag = lang === 'ko' && product.summary?.taglineKo ? product.summary.taglineKo : product.summary?.tagline;
  const topIng = product.ingredients?.[0];
  return (
    <button className="pcard" onClick={onClick} style={{ '--i': index }}>
      <div className="pcard-img-wrap">
        <ProductImg src={product.imageUrl} alt={name} className="pcard-img" />
        {topIng && (
          <span className="pcard-ing-pill">
            <span className="pcard-ing-sym">{topIng.symbol}</span>
            <span>{lang === 'ko' && topIng.nameKo ? topIng.nameKo : topIng.name}</span>
          </span>
        )}
      </div>
      <div className="pcard-body">
        <span className="pcard-brand">{product.brand}</span>
        <h3 className="pcard-name">{name}</h3>
        <p className="pcard-tag">{tag}</p>
      </div>
      <span className="pcard-arrow"><Icon name="arrow" size={16} /></span>
    </button>
  );
};
