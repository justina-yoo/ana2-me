// Landing page — mixed feed with hero + interleaved articles & products
window.Landing = function Landing({ lang, products, setView, setProduct, density }) {
  const t = useL(lang);
  const isKo = lang === 'ko';
  const [hero, setHero] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      window.__supabase.fetchFeaturedArticles(),
      window.__supabase.fetchLatestArticles(20)
    ]).then(function([feat, recent]) {
      // Hero = article with featured='hero', Featured = articles with featured='featured'
      const heroArticle = feat.find(a => a.featured === 'hero');
      const featArticles = feat.filter(a => a.featured === 'featured').slice(0, 3);
      if (heroArticle) {
        setHero(heroArticle);
      } else if (feat.length > 0) {
        setHero(feat[0]);
      } else if (recent.length > 0) {
        setHero(recent[0]);
      }
      setFeatured(featArticles);
      setArticles(recent);
      setLoading(false);
    });
  }, []);

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
            style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14, textDecoration: 'none' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, color: 'var(--ink)', margin: 0 }}>
              {t("What's in the bottle?", '그 안에 뭐가 들었을까?')}
            </h3>
            <span style={{ fontSize: 18, color: 'var(--ink-faint)' }}>›</span>
          </a>
          <div style={{
            display: 'flex', gap: 14, overflowX: 'auto', scrollSnapType: 'x mandatory',
            paddingBottom: 8, paddingRight: 40,
            WebkitOverflowScrolling: 'touch', msOverflowStyle: 'none', scrollbarWidth: 'none',
          }}>
            {products.map(p => {
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
                  <ProductImg src={p.imageUrl} alt={name}
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
          let i = 0;
          while (i < feedArticles.length) {
            const post = feedArticles[i];
            const blockIndex = Math.floor(i / 4);
            const posInBlock = i % 4;

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
