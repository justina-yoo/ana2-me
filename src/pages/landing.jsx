// Landing page — mixed feed with hero + interleaved articles & products
const LANDING_PAGE_SIZE = 20;

window.Landing = function Landing({ lang, products, setView, setProduct, density }) {
  const t = useL(lang);
  const isKo = lang === 'ko';
  const [hero, setHero] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    Promise.all([
      window.__supabase.fetchFeaturedArticles(),
      window.__supabase.fetchLatestArticles(LANDING_PAGE_SIZE)
    ]).then(function([feat, recent]) {
      // #1 = hero, #2-4 = featured section
      const sorted = feat.sort((a, b) => parseInt(a.featured) - parseInt(b.featured));
      const pin1 = sorted.find(a => a.featured === '1');
      const pins234 = sorted.filter(a => ['2','3','4'].includes(a.featured));
      if (pin1) {
        setHero(pin1);
      } else if (sorted.length > 0) {
        setHero(sorted[0]);
      } else if (recent.length > 0) {
        setHero(recent[0]);
      }
      setFeatured(pins234);
      setArticles(recent);
      setHasMore(recent.length === LANDING_PAGE_SIZE);
      setLoading(false);
    });
  }, []);

  // Load more articles on scroll
  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    window.__supabase.fetchLatestArticles(LANDING_PAGE_SIZE, articles.length).then(function(data) {
      setArticles(prev => [...prev, ...data]);
      setHasMore(data.length === LANDING_PAGE_SIZE);
      setLoadingMore(false);
    }).catch(function() {
      setLoadingMore(false);
    });
  };

  useEffect(() => {
    if (!hasMore || loadingMore) return;
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 600) {
        loadMore();
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasMore, loadingMore, articles.length]);

  function postSlug(post) {
    return 'article/' + post.tag.en.toLowerCase().replace(/\s+/g, '-') + '/' + dateToPrefix(post.date) + '/' + post.id;
  }
  function dateToPrefix(dateStr) {
    const d = new Date(dateStr);
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }

  const goArticle = (post) => {
    history.pushState({}, '', '/' + postSlug(post));
    setView('insights');
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 0' }}><FeedSkeleton /></div>;
  }

  const heroId = hero ? hero.id : null;
  const featuredIds = [heroId, ...featured.map(f => f.id)].filter(Boolean);
  const feedArticles = articles.filter(a => !featuredIds.includes(a.id));

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '18px 0 60px' }}>

      {/* ── TAGLINE ── */}
      <header className="ins-hero">
        <Sticker color="ink" rotate={-4}>{t('ingredient-first', '성분 중심')}</Sticker>
        <h1 className="display">
          {t("Know What's In", '당신이 바르는 것의')}<br />
          <span className="display-accent">{t('Your Bottle', '성분을 알아보세요')}<span className="display-dot">.</span></span>
        </h1>
        <p className="ins-sub">{t(
          'And whether it actually belongs in yours.',
          '유행하는 성분이 아닌, 내 몸에 맞는 성분을 찾으세요.'
        )}</p>
      </header>

      {/* ── HERO ── */}
      {hero && (<Reveal>
        <a href={'/' + postSlug(hero)} onClick={(e) => { e.preventDefault(); goArticle(hero); }}
          style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: '0 0 24px', borderBottom: '1px solid var(--line)', marginBottom: 0 }}>
          <ProductImg
            src={hero.imageUrl}
            alt={hero.title[lang] || hero.title.en}
            style={{ width: '100%', height: 'clamp(200px, 35vw, 360px)', objectFit: 'cover', display: 'block', borderRadius: 'var(--radius)' }}
          />
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: hero.tagColor }}>
                {hero.tag[lang] || hero.tag.en}
              </span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--line)', display: 'inline-block' }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--ink-faint)' }}>
                {t("Editor's Pick", '에디터 추천')}
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 500,
              fontSize: 'clamp(22px, 2.8vw, 32px)', lineHeight: 1.1,
              letterSpacing: '-0.015em', color: 'var(--ink)', margin: 0,
            }}>
              {hero.title[lang] || hero.title.en}
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {hero.excerpt[lang] || hero.excerpt.en}
            </p>
          </div>
        </a>
      </Reveal>)}

      {/* ── PRODUCTS — horizontal swipe ── */}
      {products.length > 0 && (<Reveal>
        <section style={{ margin: '24px 0 0' }}>
          <a href="/products" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/products'); setView('feed'); window.scrollTo(0,0); }}
            style={{ display: 'block', marginBottom: 14, textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, color: 'var(--ink)', margin: 0 }}>
                {t("What's in the bottle?", '그 안에 뭐가 들었을까?')}
              </h3>
              <span style={{ fontSize: 18, color: 'var(--ink-faint)' }}>›</span>
            </div>
            <p style={{ fontSize: 13, color: 'var(--ink-faint)', margin: '4px 0 0' }}>
              {t('We read the ingredients so you don\u2019t have to.', '성분을 대신 읽어드릴게요.')}
            </p>
          </a>
          <div style={{
            display: 'flex', gap: 14, overflowX: 'auto', scrollSnapType: 'x mandatory',
            paddingBottom: 8, paddingRight: 40,
            WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none',
          }}>
            {[...products].sort((a, b) => {
              const aP = (a.imageUrl || '').includes('placeholder');
              const bP = (b.imageUrl || '').includes('placeholder');
              return aP - bP;
            }).map(p => {
              const slug = p.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/,'');
              const name = isKo && p.nameKo ? p.nameKo : p.name;
              return (
                <a key={p.id} href={'/products/' + slug} onClick={(e) => { e.preventDefault(); setProduct(p); history.pushState({}, '', '/products/' + slug); window.scrollTo(0,0); }}
                  style={{
                    scrollSnapAlign: 'start', flexShrink: 0, width: 'calc(40vw - 20px)', maxWidth: 160, minWidth: 130,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                    padding: '18px 14px', background: 'var(--cream-card)',
                    border: '1px solid var(--line)', borderRadius: 'var(--radius)',
                    textDecoration: 'none', color: 'inherit',
                  }}>
                  <ProductImg src={p.imageUrl} alt={p.brand + ' ' + name}
                    style={{ width: 80, height: 80, objectFit: 'contain' }} />
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', display: 'block' }}>{p.brand}</span>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 13, margin: '4px 0 0', color: 'var(--ink)', lineHeight: 1.25 }}>{name}</h4>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </Reveal>)}

      {/* ── ANALYZER CTA ── */}
      <Reveal>
        <a href="/analyzer" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/analyzer'); setView('analyze'); window.scrollTo(0,0); }}
          style={{
            display: 'flex', flexDirection: 'column', gap: 10,
            padding: '24px 22px', margin: '24px 0 0',
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
            {t(
              "Tell us what works and what doesn't for your skin — we'll find the pattern.",
              '내 피부에 맞는 것과 안 맞는 것을 알려주세요. 패턴을 찾아드립니다.'
            )}
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', marginTop: 4,
            background: '#fff', color: 'var(--accent)',
            borderRadius: 'var(--radius-pill)',
            fontSize: 13, fontWeight: 700,
            alignSelf: 'flex-start',
          }} className="cta-shake">
            {t('Try the analyzer', '분석기 사용하기')} →
          </span>
        </a>
      </Reveal>

      {/* ── FEATURED ARTICLES ── */}
      {featured.length > 0 && (<Reveal>
        <div style={{ marginTop: 32 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, color: 'var(--ink)', margin: '0 0 8px' }}>
            {t('Read these first', '이거 먼저 읽어보세요')}
          </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {featured.map(post => (
            <a key={post.id} href={'/' + postSlug(post)} onClick={(e) => { e.preventDefault(); goArticle(post); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 16, padding: '18px 0',
                borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'inherit',
              }}>
              <ProductImg src={post.imageUrl} alt={post.title[lang] || post.title.en}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: post.tagColor }}>
                  {post.tag[lang] || post.tag.en}
                </span>
                <h4 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.2, margin: 0, color: 'var(--ink)',
                  overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  {post.title[lang] || post.title.en}
                </h4>
                <p style={{
                  fontSize: 13, lineHeight: 1.5, color: 'var(--ink-faint)', margin: 0,
                  overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  {post.excerpt[lang] || post.excerpt.en}
                </p>
              </div>
            </a>
          ))}
        </div>
        </div>
      </Reveal>)}

      {/* ── ARTICLES — alternating: big card then 3 compact rows ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 24 }}>
        {(() => {
          const items = [];
          const CTA = window.AnalyzerCTAs;
          const goAnalyzer = () => { history.pushState({}, '', '/analyzer'); setView('analyze'); window.scrollTo(0,0); };
          let ctaCount = 0;
          let i = 0;
          while (i < feedArticles.length) {
            const post = feedArticles[i];
            const posInBlock = i % 4;

            // Insert cycling analyzer CTA every INTERVAL articles
            if (CTA.shouldInsert(i)) {
              items.push(CTA.render(ctaCount, t, goAnalyzer));
              ctaCount++;
            }

            if (posInBlock === 0) {
              // Big card
              items.push(
                <Reveal key={post.id}><a href={'/' + postSlug(post)} onClick={(e) => { e.preventDefault(); goArticle(post); }}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left', textDecoration: 'none', color: 'inherit',
                    borderBottom: '1px solid var(--line)', padding: '20px 0',
                  }}>
                  <ProductImg src={post.imageUrl} alt={post.title[lang] || post.title.en}
                    style={{ width: '100%', height: 'clamp(180px, 28vw, 280px)', objectFit: 'cover', display: 'block', borderRadius: 'var(--radius-sm)' }} />
                  <div style={{ padding: '14px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: post.tagColor }}>
                      {post.tag[lang] || post.tag.en}
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(18px, 2.4vw, 24px)', lineHeight: 1.15, letterSpacing: '-0.01em', margin: 0, color: 'var(--ink)' }}>
                      {post.title[lang] || post.title.en}
                    </h2>
                    <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--ink-faint)', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {post.excerpt[lang] || post.excerpt.en}
                    </p>
                  </div>
                </a></Reveal>
              );
              i++;
            } else {
              // Compact row
              items.push(
                <Reveal key={post.id}><a href={'/' + postSlug(post)} onClick={(e) => { e.preventDefault(); goArticle(post); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0',
                    borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'inherit',
                  }}>
                  <ProductImg src={post.imageUrl} alt={post.title[lang] || post.title.en}
                    style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: post.tagColor }}>
                      {post.tag[lang] || post.tag.en}
                    </span>
                    <h4 style={{
                      fontFamily: 'var(--font-display)', fontWeight: 500,
                      fontSize: 15, lineHeight: 1.25, margin: '4px 0 0', color: 'var(--ink)',
                      overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    }}>
                      {post.title[lang] || post.title.en}
                    </h4>
                  </div>
                </a></Reveal>
              );
              i++;
            }
          }
          return items;
        })()}
      </div>

    </div>
  );
};
