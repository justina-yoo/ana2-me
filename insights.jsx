// Insights — editorial feed with full article bodies
window.Insights = function Insights({ lang, density }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTag, setActiveTag] = useState(null);
  const isKo = lang === 'ko';

  // Logo click → go home
  useEffect(() => {
    const handler = () => {
      setSelectedPost(null);
      history.pushState({}, '', '/');
      if (window.SEO) window.SEO.setHome();
    };
    window.addEventListener('ana2me:go-home', handler);
    return () => window.removeEventListener('ana2me:go-home', handler);
  }, []);

  // On mount, check if URL path matches an article
  useEffect(() => {
    const slug = window.location.pathname.replace('/', '').replace(/\/$/, '');
    if (slug) {
      const match = POSTS.find(p => p.id === slug);
      if (match) {
        setSelectedPost(match);
        if (window.SEO) window.SEO.setArticle(match.id);
      }
    }
  }, []);

  const POSTS = [
    {
      id: 'postbiotics-skin-barrier',
      category: { en: 'Nutritional Intelligence', ko: '영양 인텔리전스' },
      title: {
        en: 'Probiotics Were Just the Beginning. Postbiotics Are What Your Skin Barrier Actually Needs.',
        ko: '프로바이오틱스는 시작에 불과했어요. 피부 장벽이 진짜 필요한 건 포스트바이오틱스입니다',
      },
      excerpt: {
        en: 'Postbiotics — the bioactive byproducts of fermentation — improve skin barrier function without introducing live bacteria. Korean beauty has been using them for decades under names like bifida ferment lysate and lactobacillus ferment filtrate. The science just caught up.',
        ko: '포스트바이오틱스는 발효 과정에서 생성되는 생리활성 부산물로, 살아있는 균 없이도 피부 장벽을 강화해요. K-뷰티는 비피다 발효물, 유산균 발효물이라는 이름으로 이미 수십 년째 써왔습니다.',
      },
      readTime: { en: '6 min read', ko: '6분 읽기' },
      date: 'May 2026',
      tag: { en: 'Wellness', ko: '웰니스' },
      tagColor: '#a07850',
      imageUrl: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'pdrn-salmon-dna',
      category: { en: 'Regenerative Science', ko: '재생 과학' },
      title: {
        en: "Korean Dermatologists Have Been Injecting Salmon DNA for Decades. Now It's in Your Serum.",
        ko: '한국 피부과에서 30년간 써온 연어 DNA 성분, 이제 세럼에 들어왔습니다',
      },
      excerpt: {
        en: "PDRN — Polydeoxyribonucleotide — is a DNA fragment from salmon that activates your skin's A2A adenosine receptors, triggering a collagen repair cascade used in Korean clinics for decades. Topical delivery just caught up.",
        ko: 'PDRN(폴리데옥시리보뉴클레오타이드)은 연어에서 추출한 DNA 분절로, A2A 아데노신 수용체를 활성화해 콜라겐 재생을 촉발합니다. 한국 피부과 시술 성분이 이제 세럼으로 왔습니다.',
      },
      readTime: { en: '7 min read', ko: '7분 읽기' },
      date: 'May 2026',
      tag: { en: 'Skincare', ko: '스킨케어' },
      tagColor: 'var(--accent)',
      imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'skin-barrier-2026',
      category: { en: 'Molecular Insights', ko: '분자 인사이트' },
      title: {
        en: "Your Skin Barrier Is Leaking. Here's What 2026 Science Says to Do About It.",
        ko: '피부 장벽이 무너지고 있다면, 지금 알아야 할 2026년의 정답',
      },
      excerpt: {
        en: "Ceramides, fatty acids, and pH balance are the holy trinity of skin barrier health — and modern environments are attacking all three simultaneously. The fix isn't more layers. It's replacing what's missing at a molecular level.",
        ko: '세라마이드 고갈, HEV 광선, pH 교란 클렌저가 동시에 피부를 공격하고 있어요. 답은 더 많은 제품을 바르는 게 아니라, 분자 수준에서 정확히 무엇이 빠졌는지를 채우는 것입니다.',
      },
      readTime: { en: '6 min read', ko: '6분 읽기' },
      date: 'Apr 2026',
      tag: { en: 'Skincare', ko: '스킨케어' },
      tagColor: 'var(--accent)',
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'fragrance-volatility',
      category: { en: 'Olfactory Science', ko: '후각 과학' },
      title: {
        en: 'Why Your Perfume Smells Different on You Than in the Bottle.',
        ko: '향수가 병 속과 피부 위에서 다르게 느껴지는 진짜 이유',
      },
      excerpt: {
        en: "The same perfume smells different on everyone — and it's not just body chemistry. Molecular weight, vapor pressure, and skin hydration each determine when a note surfaces and how long it stays.",
        ko: '같은 향수를 뿌려도 사람마다 다르게 느껴지는 건 우연이 아니에요. 분자량과 증기압, 피부 수분 상태가 각 노트가 피어나는 타이밍과 지속력을 결정합니다.',
      },
      readTime: { en: '5 min read', ko: '5분 읽기' },
      date: 'Mar 2026',
      tag: { en: 'Fragrance', ko: '향수' },
      tagColor: 'var(--sage)',
      imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'adaptogens-bioavailability',
      category: { en: 'Nutritional Intelligence', ko: '영양 인텔리전스' },
      title: {
        en: "You're Probably Wasting Your Adaptogens. Delivery Matters More Than Dosage.",
        ko: '어댑토젠이 효과 없다고 느껴진다면, 문제는 성분이 아닌 흡수율입니다',
      },
      excerpt: {
        en: "Ashwagandha, Lion's Mane, Reishi — three of the most researched adaptogens on the market. But raw powder bioavailability sits below 10% for most people. The science of delivery is what actually determines whether any of it works.",
        ko: '아슈와간다, 사자갈기, 영지버섯. 연구가 가장 많이 된 어댑토젠들이지만, 원료 분말의 생체이용률은 대부분 10% 미만이에요. 효과를 결정하는 건 성분 자체가 아니라 전달 방식입니다.',
      },
      readTime: { en: '7 min read', ko: '7분 읽기' },
      date: 'Mar 2026',
      tag: { en: 'Wellness', ko: '웰니스' },
      tagColor: '#a07850',
      imageUrl: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'fermentation-transformation',
      category: { en: 'Fermentation Science', ko: '발효 과학' },
      title: {
        en: "Galactomyces Started in a Sake Brewery. Now It's One of Skincare's Most Studied Actives.",
        ko: '청주 양조장에서 시작된 성분이 스킨케어를 바꾸고 있습니다',
      },
      excerpt: {
        en: "Galactomyces was discovered by accident. Bifida Ferment Lysate was reverse-engineered from infant skin. Fermentation doesn't just preserve ingredients — it creates entirely new compounds that never existed in the original plant.",
        ko: '갈락토미세스는 우연히 발견됐고, 비피다 발효물은 영아 피부 마이크로바이옴에서 역설계됐어요. 발효는 단순히 성분을 보존하는 게 아니라, 원료에 없던 새로운 활성 화합물을 만들어냅니다.',
      },
      readTime: { en: '8 min read', ko: '8분 읽기' },
      date: 'Feb 2026',
      tag: { en: 'Skincare', ko: '스킨케어' },
      tagColor: 'var(--accent)',
      imageUrl: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=800',
    },
  ];

  const openPost = (p) => {
    setSelectedPost(p);
    history.pushState({}, '', '/' + p.id);
    if (window.SEO) window.SEO.setArticle(p.id);
    if (window.gtag) gtag('event', 'page_view', { page_path: '/' + p.id, page_title: p.title.en });
    window.scrollTo(0, 0);
  };

  const closePost = () => {
    setSelectedPost(null);
    history.pushState({}, '', '/');
    if (window.SEO) window.SEO.setHome();
    if (window.gtag) gtag('event', 'page_view', { page_path: '/', page_title: 'ana2me — Insights' });
    window.scrollTo(0, 0);
  };

  if (selectedPost) {
    return React.createElement(PostDetail, {
      post: selectedPost,
      lang,
      onBack: closePost,
    });
  }

  const filteredPosts = activeTag ? POSTS.filter(p => p.tag.en === activeTag) : POSTS;

  return React.createElement(InsightsFeed, {
    posts: filteredPosts,
    allPosts: POSTS,
    lang,
    density,
    activeTag,
    onTagClick: (tag) => setActiveTag(activeTag === tag ? null : tag),
    onSelectPost: openPost,
  });
};

/* ─── Feed ─────────────────────────────────────────────────────────────────── */

function InsightsFeed({ posts, allPosts, lang, density, activeTag, onTagClick, onSelectPost }) {
  const t = useL(lang);
  const allTags = [...new Map(allPosts.map(p => [p.tag.en, p])).values()].map(p => ({ en: p.tag.en, color: p.tagColor }));

  return (
    <div className={cn('insights', `dens-${density}`)}>
      <header className="ins-hero">
        <Sticker color="sage" rotate={-4}>{t('insights', '인사이트')}</Sticker>
        <h1 className="display">
          {t('Research &', '연구 및')}<br />
          <span className="display-accent">{t('Analysis', '분석')}<span className="display-dot">.</span></span>
        </h1>
        <p className="ins-sub">{t(
          'Deep-dives into ingredients, formulas, and trends.',
          '성분, 포뮬러, 트렌드에 대한 심층 분석.'
        )}</p>
      </header>

      <div style={{ maxWidth: 780, margin: '0 auto 24px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          onClick={() => onTagClick(null)}
          style={{
            padding: '7px 16px',
            borderRadius: 'var(--radius-pill)',
            border: `1px solid ${activeTag === null ? 'var(--ink)' : 'var(--line)'}`,
            background: activeTag === null ? 'var(--ink)' : 'var(--cream-card)',
            color: activeTag === null ? '#fff' : 'var(--ink-soft)',
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            transition: 'all .15s ease',
          }}
        >
          {t('All', '전체')}
        </button>
        {allTags.map(tag => (
          <button
            key={tag.en}
            onClick={() => onTagClick(tag.en)}
            style={{
              padding: '7px 16px',
              borderRadius: 'var(--radius-pill)',
              border: `1px solid ${activeTag === tag.en ? tag.color : 'var(--line)'}`,
              background: activeTag === tag.en ? tag.color : 'var(--cream-card)',
              color: activeTag === tag.en ? '#fff' : 'var(--ink-soft)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              transition: 'all .15s ease',
            }}
          >
            {tag.en}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {posts.map((post) => (
          <button
            key={post.id}
            onClick={() => onSelectPost(post)}
            style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: 'var(--cream-card)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform .2s ease, box-shadow .2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            <ProductImg
              src={post.imageUrl}
              alt={post.title[lang] || post.title.en}
              style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }}
            />
            <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span
                onClick={(e) => { e.stopPropagation(); onTagClick(post.tag.en); }}
                style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: post.tagColor, cursor: 'pointer', alignSelf: 'flex-start' }}
              >
                {post.tag[lang] || post.tag.en}
              </span>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 'clamp(20px, 2.4vw, 28px)', lineHeight: 1.1,
                letterSpacing: '-0.015em', margin: 0, textWrap: 'balance',
                color: 'var(--ink)',
              }}>
                {post.title[lang] || post.title.en}
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {post.excerpt[lang] || post.excerpt.en}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 4 }}>
                <Icon name="clock" size={13} className="" />
                <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 500 }}>
                  {post.readTime[lang] || post.readTime.en}
                </span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--line)', display: 'inline-block' }} />
                <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 500 }}>{post.date}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Post Detail ───────────────────────────────────────────────────────────── */

const ARTICLE_BODIES = {
  'postbiotics-skin-barrier': PostbioticsBody,
  'skin-barrier-2026': SkinBarrierBody,
  'fragrance-volatility': FragranceVolatilityBody,
  'adaptogens-bioavailability': AdaptogensBody,
  'fermentation-transformation': FermentationBody,
  'pdrn-salmon-dna': PDRNBody,
};

function PostDetail({ post, lang, onBack }) {
  const Body = ARTICLE_BODIES[post.id];
  const isKo = lang === 'ko';
  const articleRef = React.useRef(null);

  React.useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    // Inject highlight keyframe once
    if (!document.getElementById('ana2me-highlight-style')) {
      const style = document.createElement('style');
      style.id = 'ana2me-highlight-style';
      style.textContent = `
        @keyframes ana2me-sweep {
          from { background-size: 0% 85%; }
          to   { background-size: 100% 85%; }
        }
        mark {
          background: none;
          color: inherit;
        }
        .ana2me-hl {
          background-image: linear-gradient(rgba(100, 176, 120, 0.32), rgba(100, 176, 120, 0.32));
          background-repeat: no-repeat;
          background-position: left center;
          background-size: 0% 88%;
          animation: ana2me-sweep 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          border-radius: 2px;
        }
      `;
      document.head.appendChild(style);
    }

    const getTargets = () => Array.from(article.querySelectorAll('mark')).filter(el => !el.closest('[data-tldr]'));
    const seen = new Set();
    const TRIGGER = window.innerHeight * 0.62;

    const handleScroll = () => {
      getTargets().forEach(el => {
        if (seen.has(el)) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < TRIGGER) {
          seen.add(el);
          el.classList.remove('ana2me-hl');
          void el.offsetWidth;
          el.classList.add('ana2me-hl');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      getParas().forEach(p => p.classList.remove('ana2me-hl'));
    };
  }, [post.id]);

  return (
    <div className="detail" style={{ maxWidth: 780, margin: '0 auto' }}>
      <button className="back-btn" onClick={onBack}>
        <Icon name="back" size={16} />
        {isKo ? '인사이트로 돌아가기' : 'Back to Insights'}
      </button>
      <article ref={articleRef}>
        <header style={{ marginBottom: 28 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: post.tagColor, display: 'block', marginBottom: 10 }}>
            {post.tag[lang] || post.tag.en}
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(30px, 4vw, 48px)', lineHeight: 1.05,
            letterSpacing: '-0.02em', margin: '0 0 12px', textWrap: 'balance',
          }}>
            {post.title[lang] || post.title.en}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="clock" size={13} />
            <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 500 }}>
              {post.readTime[lang] || post.readTime.en}
            </span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--line)', display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 500 }}>{post.date}</span>
            <button
              onClick={() => {
                const url = window.location.href;
                if (navigator.share) {
                  navigator.share({ title: post.title[lang] || post.title.en, url });
                } else {
                  navigator.clipboard.writeText(url).then(() => alert('Link copied!'));
                }
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-faint)', display: 'flex', alignItems: 'center', padding: 4 }}
              title="Share"
            >
              <Icon name="share" size={15} />
            </button>
          </div>
        </header>
        {Body && React.createElement(Body, { lang })}
      </article>
    </div>
  );
}

/* ─── Shared article primitives ─────────────────────────────────────────────── */

function ArtTlDr({ children }) {
  return (
    <div data-tldr="true" style={{
      padding: '18px 22px',
      background: 'var(--cream-2)',
      borderRadius: 'var(--radius)',
      border: '1px solid var(--line)',
      marginBottom: 28,
    }}>
      <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>
        {children}
      </p>
    </div>
  );
}

function ArtSectionHeading({ children }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-display)', fontWeight: 500,
      fontSize: 'clamp(22px, 2.4vw, 28px)', letterSpacing: '-0.015em',
      margin: '0 0 16px', color: 'var(--ink)',
    }}>
      {children}
    </h2>
  );
}

function ArtCallout({ icon, title, children, borderColor = 'var(--line)', bgColor = 'var(--cream-2)' }) {
  return (
    <div style={{
      display: 'flex', gap: 18, alignItems: 'flex-start',
      padding: '20px 22px',
      background: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius)',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 12,
        background: 'var(--cream-card)',
        border: '1px solid var(--line)',
        display: 'grid', placeItems: 'center',
        flexShrink: 0, fontSize: 18,
      }}>
        {icon}
      </div>
      <div>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px' }}>{title}</h4>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{children}</p>
      </div>
    </div>
  );
}

function ArtStatCard({ title, desc }) {
  return (
    <li style={{
      padding: '16px 18px',
      background: 'var(--cream-card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-sm)',
      listStyle: 'none',
    }}>
      <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px' }}>{title}</h4>
      <p style={{ fontSize: 13, color: 'var(--ink-soft)', margin: 0, lineHeight: 1.5 }}>{desc}</p>
    </li>
  );
}

function ArtProdCard({ brand, name, note, accentColor = 'var(--accent)' }) {
  return (
    <div style={{
      padding: '22px 24px',
      background: 'var(--cream-card)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius)',
    }}>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accentColor, display: 'block', marginBottom: 8 }}>{brand}</span>
      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--ink)', margin: '0 0 6px', lineHeight: 1.2 }}>{name}</h4>
      <p style={{ fontSize: 12, color: 'var(--ink-faint)', margin: 0, lineHeight: 1.5 }}>{note}</p>
    </div>
  );
}

function ArtSection({ children }) {
  return <section style={{ marginBottom: 40 }}>{children}</section>;
}

function ArtBody({ children }) {
  return <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 16px' }}>{children}</p>;
}

function ArtFigure({ src, alt, isKo }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure style={{ borderRadius: 'var(--radius)', overflow: 'hidden', margin: '0 0 32px' }}>
      <div style={{ position: 'relative', height: 280 }}>
        {!loaded && <div className="skeleton" style={{ position: 'absolute', inset: 0 }} />}
        <img
          src={src} alt={alt}
          style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <figcaption style={{ marginTop: 10, fontSize: 11, color: 'var(--ink-faint)', textAlign: 'center' }}>
        {isKo ? '📷 사진: Unsplash — Unsplash 라이선스' : '📷 Photo: Unsplash — Unsplash License'}
      </figcaption>
    </figure>
  );
}

/* ─── Article: Skin Barrier ─────────────────────────────────────────────────── */

function SkinBarrierBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ArtTlDr>
        {isKo ? (
          <><strong>🧱 요약:</strong> 피부 장벽은 세라마이드, 지방산, 콜레스테롤로 이루어진 지질 매트릭스입니다. 이 구조가 무너지면 수분이 빠져나가고 자극이 들어옵니다. 2026년의 접근법은 단순 보습이 아니라 <strong>시카-리포솜</strong>, <strong>스쿠알란 유래 세라마이드</strong>, <strong>비피다 발효 용해물</strong>로 손상된 지질 구조를 분자 수준에서 재건하는 것입니다.</>
        ) : (
          <><strong>🧱 TL;DR:</strong> Your skin barrier is a lipid matrix of ceramides, fatty acids, and cholesterol. When it breaks down, water escapes and irritants get in. The 2026 approach isn't moisturizing harder — it's rebuilding the damaged lipid architecture with <strong>Cica-liposomes</strong>, <strong>squalane-derived ceramides</strong>, and <strong>Bifida ferment lysate</strong> at the molecular level.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200"
        alt="Skincare serums and moisturizer bottles representing ceramide and skin barrier repair products"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🔍 피부 장벽 손상의 주요 원인은 무엇인가요?' : '🔍 What are the primary drivers of skin barrier degradation?'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>피부 장벽이 손상되는 원인은 하나가 아니에요. 스마트폰과 모니터에서 나오는 <strong>고에너지 가시광선(HEV)</strong>, 매일 마시는 공기 속 <strong>미세먼지(PM2.5)</strong>, 그리고 우리가 직접 선택한 <strong>pH 교란 클렌저</strong>까지 — <mark>이 세 가지가 동시에 피부의 세라마이드와 지방산을 고갈시킵니다.</mark></>
          ) : (
            <>The barrier doesn't break down from one thing. It's a slow accumulation — <strong>HEV light</strong> from your phone and monitor, <strong>PM2.5</strong> from city air, and the <strong>pH-disrupting cleanser</strong> you chose yourself. <mark>Together, they strip the skin's ceramide and fatty acid reserves faster than passive recovery can keep up with.</mark></>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '🔥 산화 스트레스', desc: '활성산소가 콜라겐과 엘라스틴 섬유를 분해합니다.' },
            { title: '💧 지질 고갈', desc: "피부 세포 사이의 핵심 '모르타르' 역할을 하는 성분이 손실됩니다." },
            { title: '⚖️ pH 불균형', desc: '산성막의 보호 균총이 교란됩니다.' },
          ] : [
            { title: '🔥 Oxidative Stress', desc: 'Free radicals break down collagen and elastin fibers.' },
            { title: '💧 Lipid Depletion', desc: "Loss of the essential 'mortar' between skin cells." },
            { title: '⚖️ pH Imbalance', desc: "Disruption of the acid mantle's protective flora." },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🧪 장벽 회복에 필수적인 세 가지 분자 화합물은?' : '🧪 Which three molecular compounds are essential for barrier restoration?'}</ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🌿" title={isKo ? '1. 시카-리포솜' : '1. Cica-Liposomes'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>캡슐화된 <strong>병풀(Centella Asiatica)</strong> 트리터페노이드(아시아티코사이드, 마데카소사이드)로, 각질층 더 깊은 곳까지 침투하여 GAG 합성과 세포 수준의 콜라겐 생성을 촉진합니다.</> : <>Encapsulated <strong>Centella Asiatica</strong> triterpenoids (Asiaticoside, Madecassoside) that penetrate deeper into the stratum corneum to stimulate GAG synthesis and collagen production at the cellular level.</>}
          </ArtCallout>
          <ArtCallout icon="💧" title={isKo ? '2. 스쿠알란 유래 세라마이드' : '2. Squalane-Derived Ceramides'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <>인체 피지를 모방하는 수소화 지질로, 모공을 막지 않으면서 <strong>경피수분손실(TEWL)</strong>을 방지하는 밀폐적이면서도 통기성 있는 층을 제공합니다.</> : <>Hydrogenated lipids that mimic human sebum, providing an occlusive yet breathable layer to prevent <strong>TEWL (Trans-Epidermal Water Loss)</strong> without clogging pores.</>}
          </ArtCallout>
          <ArtCallout icon="✨" title={isKo ? '3. 비피다 발효 용해물' : '3. Bifida Ferment Lysate'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.1)">
            {isKo ? 'DNA 복구 효소가 풍부한 프로바이오틱 유도체로, 건강한 세균 균형을 촉진하여 피부 마이크로바이옴을 강화하고 민감성을 줄입니다.' : "A probiotic derivative rich in DNA repair enzymes that strengthens the skin's microbiome and reduces sensitivity by promoting a healthy bacterial balance."}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🌿 한국 전통 식물 성분은 현대 합성과 어떻게 통합되나요?' : '🌿 How do Korean botanicals integrate with modern synthesis?'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? <>한국의 '한방(漢方)' 전통은 수천 년간 피부와 체질의 연결을 탐구해왔어요. <mark>2026년, 첨단 생물반응기와 정밀 추출 기술이 그 지혜를 분자 수준에서 다시 검증하고 있습니다.</mark></> : <>Korean "Hanbang" medicine has spent centuries mapping the relationship between botanicals and skin. <mark>In 2026, high-tech bioreactors and precision extraction are validating that wisdom at a molecular level — not replacing it.</mark></>}
        </ArtBody>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '고급 발효', body: '전통 옹기 발효가 이제 첨단 생물반응기에서 재현되어 폴리페놀과 플라보노이드의 생체이용률을 높여 피부에 더욱 효과적으로 작용합니다.' },
            { title: '식물성 레티놀', body: '바쿠치올 같은 성분은 합성 비타민 A의 장벽 손상 부작용 없이 레티놀과 같은 효과(세포 재생, 콜라겐 부스팅)를 제공합니다.' },
          ] : [
            { title: 'Advanced Fermentation', body: 'Traditional earthen-pot fermentation is now replicated in high-tech bioreactors to increase the bioavailability of polyphenols and flavonoids, making them more effective on the skin.' },
            { title: 'Phyto-Retinols', body: 'Ingredients like Bakuchiol provide retinol-like results (cell turnover, collagen boost) without the barrier-disrupting side effects of synthetic Vitamin A.' },
          ]).map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '✨ 장벽 손상 피부를 위한 추천 제품' : '✨ Products built for barrier-compromised skin'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Dr. Jart+', name: 'Cicapair Intensive Soothing Repair Cream', note: isKo ? '마데카소사이드 + 세라마이드로 장벽 즉시 진정' : 'Madecassoside + ceramide — barrier calming from first application' },
            { brand: 'La Roche-Posay', name: 'Cicaplast Balm B5', note: isKo ? '판테놀 5%로 각질형성세포 이동을 가속하여 미세 손상 봉합' : 'Panthenol 5% accelerates keratinocyte migration to close micro-lesions' },
            { brand: 'Medicube', name: 'PDRN Pink Collagen Capsule Cream', note: isKo ? 'PDRN이 섬유아세포를 활성화하여 콜라겐 I·III 재생' : 'PDRN activates fibroblasts for collagen I & III regeneration' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--accent)" />)}
        </div>
      </ArtSection>
    </div>
  );
}

/* ─── Article: Fragrance Volatility ─────────────────────────────────────────── */

function FragranceVolatilityBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ArtTlDr>
        {isKo ? (
          <><strong>⏳ 요약:</strong> 향수는 고정된 향이 아닌 시간의 흐름이에요. <strong>분자량</strong>과 <strong>증기압</strong>이 각 노트가 피부에서 언제 피어나고 언제 사라지는지를 결정합니다. 탑 노트는 수분 내 증발하고, 베이스 노트는 하루 종일 남아 있어요.</>
        ) : (
          <><strong>⏳ TL;DR:</strong> A fragrance isn't a smell — it's a timeline. <strong>Molecular weight</strong> and <strong>vapor pressure</strong> determine exactly when each note surfaces and disappears from your skin. Top notes evaporate in minutes. Base notes can last a day. Knowing this changes what you look for — and what you buy.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1200"
        alt="Glass perfume fragrance bottle on a reflective surface, illustrating molecular volatility"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🔺 휘발성 피라미드란 무엇인가요?' : '🔺 What is the volatility pyramid?'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <><mark>모든 향수는 고정된 향이 아닌 하나의 시퀀스입니다.</mark> 세 계층 — <strong>탑, 미들, 베이스</strong> — 은 각 방향족 분자가 피부에서 얼마나 빨리 증발하는지에 해당합니다. 이는 <strong>증기압</strong>에 의해 결정됩니다: 분자량이 낮을수록 압력이 높아져 더 빨리 사라집니다.</>
          ) : (
            <><mark>Every fragrance is a sequence, not a static smell.</mark> The three tiers — <strong>top, heart, and base</strong> — correspond to how quickly each aromatic molecule evaporates from your skin. This is determined by <strong>vapor pressure</strong>: the lower the molecular weight, the higher the pressure, the faster the escape.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '⚡ 탑 노트 (0–30분)', desc: '작고 가벼운 분자. 시트러스, 알데히드, 그린. 첫인상이지만 금방 사라집니다.' },
            { title: '💜 미들 노트 (30분–4시간)', desc: '중간 무게의 분자. 플로럴, 스파이스, 우드. 향수의 감성적 핵심.' },
            { title: '🌙 베이스 노트 (4–24시간+)', desc: '무겁고 증기압이 낮은 분자. 머스크, 앰버, 레진. 피부에 남는 기억.' },
          ] : [
            { title: '⚡ Top Notes (0–30 min)', desc: 'Small, lightweight molecules. Citrus, aldehydes, green. First impression, quickly gone.' },
            { title: '💜 Heart Notes (30 min–4 hrs)', desc: 'Mid-weight molecules. Florals, spices, woods. The emotional core of the fragrance.' },
            { title: '🌙 Base Notes (4–24+ hrs)', desc: 'Heavy, low-vapor molecules. Musks, ambers, resins. The memory that stays on skin.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🔬 지속력의 분자 과학' : '🔬 The molecular science of longevity'}</ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🌲" title={isKo ? '고착제와 실질성' : 'Fixatives & Substantivity'} borderColor="rgba(107,142,107,0.3)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <><strong>Iso E Super</strong>와 <strong>Ambroxan</strong> 같은 고착제는 반-휘발성 대형 분자로, 가벼운 화합물의 증발을 늦추는 분자 지지대를 형성합니다 — 탑 노트와 미들 노트의 자연 수명을 연장합니다.</> : <>Fixatives like <strong>Iso E Super</strong> and <strong>Ambroxan</strong> are large, semi-volatile molecules that slow the evaporation of lighter compounds by forming a molecular scaffold — extending the presence of top and heart notes beyond their natural lifespan.</>}
          </ArtCallout>
          <ArtCallout icon="🧪" title={isKo ? '변수로서의 피부 화학' : 'Skin Chemistry as a Variable'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>pH, 피지 함량, 심지어 식단도 향수 분자가 피부 단백질에 결합하는 방식을 변화시킵니다. <mark>유분이 많은 피부는 분자를 천천히 방출하는 <strong>저장소</strong> 역할을 합니다.</mark> 건성 피부는 보유력이 낮아 공기 중으로 더 빨리 확산됩니다.</> : <>pH, sebum content, and even diet alter how fragrance molecules bind to skin proteins. <mark>Oilier skin acts as a <strong>carrier reservoir</strong>, releasing molecules slowly.</mark> Dry skin offers less retention, causing faster diffusion into air.</>}
          </ArtCallout>
          <ArtCallout icon="🌙" title={isKo ? '마크로사이클릭 머스크' : 'Macrocyclic Musks'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>새로운 세대의 베이스 노트 — <strong>Exaltolide</strong>, <strong>Habanolide</strong> — 는 극도로 낮은 휘발성을 가진 고리 구조의 합성 머스크입니다. 피부 단백질과 공유 결합하여 24시간 이상 지속되는 '세컨드 스킨' 효과를 만들어냅니다.</> : <>The new generation of base notes — <strong>Exaltolide</strong>, <strong>Habanolide</strong> — are ring-structured synthetic musks with extremely low volatility. They interact with skin proteins covalently, producing the "second skin" effect that can last over 24 hours.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🛒 향수 구매 시 이 지식 활용하기' : '🛒 How to use this knowledge when buying fragrance'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '👃 종이가 아닌 피부에 테스트', body: '테스터 스트립은 격리된 휘발성만 보여줍니다. 피부의 pH와 지질 함량이 진정한 매체입니다. 항상 맥박 부위에 테스트하고 30분을 기다린 후 결정하세요.' },
            { title: '🎨 전략적 레이어링', body: '먼저 베이스 노트가 풍부한 오일(샌달우드, 우드, 베티버)을 바른 후 향수를 뿌리세요. 오일이 고착제 역할을 하여 가벼운 분자를 고정하고 증발 시간을 연장합니다.' },
            { title: '📊 농도가 중요합니다', body: '퍼퓸(방향 화합물 20–40%)은 오드 뚜왈렛(5–15%)보다 베이스 무게의 분자가 더 많이 포함됩니다. 높은 농도 = 더 깊고 오래 지속되는 드라이다운.' },
            { title: '🌡️ 온도가 증폭시킵니다', body: '열은 분자 증발을 가속합니다. 맥박 부위(손목, 목, 팔꿈치 안쪽)는 향수를 자연스럽게 따뜻하게 하여 프로젝션과 탑 노트가 사라지는 속도 모두를 강화합니다.' },
          ] : [
            { title: '👃 Test on skin, not paper', body: 'Paper strips only reveal volatility in isolation. Your skin chemistry — its pH and lipid content — is the true medium. Always test on a pulse point and wait 30 minutes before deciding.' },
            { title: '🎨 Layer strategically', body: 'Apply a base-note-heavy oil first (sandalwood, oud, vetiver), then spray your fragrance on top. The oil acts as a fixative, anchoring lighter molecules and extending their evaporation window.' },
            { title: '📊 Concentration matters', body: 'Parfum (20–40% aromatic compounds) contains more base-weight molecules than Eau de Toilette (5–15%). Higher concentration = deeper, longer-lasting dry-down.' },
            { title: '🌡️ Temperature amplifies', body: 'Heat accelerates molecular evaporation. Pulse points (wrists, neck, inner elbow) naturally warm fragrance, intensifying both projection and the speed at which top notes fade.' },
          ]).map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🌸 분자 구조로 살펴보는 컬렉션의 향수들' : '🌸 Scents in our collection, read by molecular architecture'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Diptyque', name: 'Philosykos Eau de Parfum', note: isKo ? '그린 락톤 탑 + 시더 세스퀴테르펜 베이스 — 6–8시간의 우디 잔향' : 'Green lactone top + cedar sesquiterpene base — 6–8 hr woody dry-down' },
            { brand: 'Tamburins', name: 'Perfume Chamo', note: isKo ? '리날로올 탑, 시프리올 하트 — 침착하고 서서히 펼쳐지는 구조' : 'Linalool top, cypriol heart — calm, slow-unfurling structure' },
            { brand: 'Jo Malone London', name: 'Peony & Blush Suede Cologne', note: isKo ? '에틸 에스터 탑, 암브레톨라이드 베이스 — 섬세한 퍼짐, 피부 밀착 잔향' : 'Ethyl ester top, ambrettolide base — light sillage, intimate skin-close finish' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--sage)" />)}
        </div>
      </ArtSection>
    </div>
  );
}

/* ─── Article: Adaptogens & Bioavailability ──────────────────────────────────── */

function AdaptogensBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ArtTlDr>
        {isKo ? (
          <><strong>🌿 요약:</strong> 좋은 어댑토젠 보충제를 매일 먹어도 효과가 없다고 느껴진다면, 십중팔구 흡수가 안 되는 거예요. <strong>아슈와간다</strong>, <strong>사자갈기</strong>, <strong>영지버섯</strong>의 원료 분말 생체이용률은 10% 미만인 경우가 대부분입니다. 발효, 지질 캡슐화, 이중 추출이 흡수율을 40–60% 이상으로 끌어올립니다.</>
        ) : (
          <><strong>🌿 TL;DR:</strong> If your adaptogens aren't doing anything, the problem is probably absorption. Raw powder bioavailability for <strong>Ashwagandha</strong>, <strong>Lion's Mane</strong>, and <strong>Reishi</strong> sits below 10% for most people. Fermentation, lipid encapsulation, and dual extraction push that number to 40–60%+. The ingredient isn't the variable. The delivery is.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=1200"
        alt="Mushrooms, herbs, and wellness supplement ingredients, representing adaptogen bioavailability"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🧠 어댑토젠이란 정확히 무엇인가요?' : '🧠 What is an adaptogen, precisely?'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? <>어댑토젠은 <strong>시상하부-뇌하수체-부신(HPA) 축</strong>을 조절하여 신체가 물리적, 심리적 스트레스에 저항하도록 돕는 생체활성 화합물입니다. <mark>자극제나 진정제와 달리, 어댑토젠은 정상화합니다 — 스트레스 반응을 단일 방향이 아닌 균형 쪽으로 이끕니다.</mark></> : <>An adaptogen is a bioactive compound that helps the body resist physical and psychological stressors by modulating the <strong>HPA axis</strong> (hypothalamic-pituitary-adrenal). <mark>Unlike stimulants or sedatives, adaptogens normalize — they push stress response toward equilibrium rather than in a single direction.</mark></>}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '🌱 아슈와간다 (KSM-66)', desc: '위타노라이드 성분이 코르티솔을 조절합니다. 5%+ 위타노라이드 표준화 뿌리 추출물이 가장 강력한 임상 데이터를 보입니다.' },
            { title: '🍄 사자갈기', desc: '헤리세논과 에리나신이 신경성장인자(NGF)를 자극하여 신경가소성과 인지 회복을 지원합니다.' },
            { title: '🍄 영지 (이중 추출)', desc: '다당류(베타글루칸)와 트리터펜은 두 활성 분획을 모두 포착하기 위해 별도의 열수 및 알코올 추출이 필요합니다.' },
          ] : [
            { title: '🌱 Ashwagandha (KSM-66)', desc: 'Withanolide content regulates cortisol. Standardized root extract with 5%+ withanolides shows the strongest clinical data.' },
            { title: "🍄 Lion's Mane", desc: 'Hericenones and erinacines stimulate NGF (Nerve Growth Factor), supporting neuroplasticity and cognitive recovery.' },
            { title: '🍄 Reishi (Dual-Extract)', desc: 'Polysaccharides (beta-glucans) and triterpenes require separate hot-water and alcohol extraction to capture both active fractions.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🔑 생체이용률이 숨겨진 변수인 이유' : '🔑 Why bioavailability is the hidden variable'}</ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🌱" title={isKo ? '장 장벽 문제' : 'The Gut Barrier Problem'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>대부분의 어댑토젠 화합물은 장 상피를 통과하기 어려운 <strong>크고 친수성인 분자</strong>입니다. <mark>최적화된 전달 시스템 없이는 대부분 분해되지 않은 채 통과하여 체내에 흡수되기 전에 배출됩니다.</mark></> : <>Most adaptogen compounds are <strong>large, hydrophilic molecules</strong> that struggle to cross the intestinal epithelium. <mark>Without an optimized delivery system, they pass through largely intact — you excrete the compound before it reaches systemic circulation.</mark></>}
          </ArtCallout>
          <ArtCallout icon="🧬" title={isKo ? '발효가 결합된 활성 성분을 해방시킵니다' : 'Fermentation Unlocks Bound Actives'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <>특히 <strong>락토바실러스</strong> 균주의 발효는 식물 세포벽을 분해하고 배당체 결합을 끊어 더 작고 친지질성인 아글리콘을 방출합니다. 이는 장 막을 통한 수동 확산을 극적으로 향상시킵니다.</> : <>Fermentation — particularly with <strong>Lactobacillus</strong> strains — breaks down plant cell walls and cleaves glycoside bonds, releasing active aglycones that are substantially smaller and more lipophilic. This dramatically improves passive diffusion across gut membranes.</>}
          </ArtCallout>
          <ArtCallout icon="💊" title={isKo ? '지질 캡슐화' : 'Lipid Encapsulation'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>리포솜 및 파이토솜 전달 시스템은 활성 화합물을 세포막과 구조적으로 동일한 <strong>인지질 이중층</strong>으로 감쌉니다. 세포가 이를 인식하고 직접 흡수하여 간의 초회 통과 대사를 우회합니다.</> : <>Liposomal and phytosomal delivery systems wrap active compounds in <strong>phospholipid bilayers</strong> that are structurally identical to cell membranes. Cells recognize and absorb the encapsulated compound directly — bypassing first-pass metabolism in the liver.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🏷️ 실제 생체이용률을 위한 보충제 라벨 읽기' : '🏷️ Reading a supplement label for real bioavailability'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '🎯 표준화 %', body: '라벨의 활성 화합물 비율을 확인하세요. "아슈와간다 500mg"은 의미 없습니다. "KSM-66 아슈와간다 300mg, 위타노라이드 5% 표준화"가 유효 용량을 알려줍니다.' },
            { title: '📏 추출 비율', body: '10:1 추출물은 원료 10kg이 1kg으로 농축된 것입니다. 비율이 높을수록 그램당 활성 화합물이 더 많습니다.' },
            { title: '🔀 이중 대 단일 추출', body: '버섯의 경우, 열수 추출은 베타글루칸을 포착합니다. 알코올 추출은 트리터펜을 포착합니다. 둘 다 필요합니다.' },
            { title: '⚡ 피페린 또는 지방 첨가', body: '피페린(후추 추출물)은 간에서 어댑토젠을 분해하는 CYP 효소를 억제하여 일부 화합물의 혈청 농도를 최대 20배까지 높입니다.' },
          ] : [
            { title: '🎯 Standardization %', body: 'Look for the active compound percentage on the label. "Ashwagandha 500mg" is meaningless. "KSM-66 Ashwagandha 300mg standardized to 5% withanolides" tells you the effective dose.' },
            { title: '📏 Extract ratio', body: 'A 10:1 extract means 10kg of raw material concentrated into 1kg. Higher ratios mean more active compounds per gram — but only if the extraction method targets the right molecules.' },
            { title: '🔀 Dual vs. single extract', body: 'For mushrooms, a hot-water extract captures beta-glucans. An alcohol extract captures triterpenes. You need both. Single extracts miss half the pharmacological activity.' },
            { title: '⚡ Added piperine or fat', body: 'Piperine (black pepper extract) inhibits CYP enzymes that break down adaptogens in the liver, increasing serum levels by up to 20x for some compounds.' },
          ]).map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '✨ 생체이용률 설계로 만들어진 추천 웰니스 제품' : '✨ Wellness products designed around bioavailability'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Medion', name: 'Supplecare Inositol', note: isKo ? '임상 검증 40:1 미오/D-카이로 비율 — OxuGel™ 기술로 위산 산화 방지 후 흡수' : 'Clinically validated 40:1 myo/D-chiro ratio — OxuGel™ protects polyphenols from gastric oxidation' },
            { brand: 'Ollocdam', name: 'Olive3 Premium EVOO Capsules', note: isKo ? '3원산지 코로네이키·피쿠알·코라티나 블렌드 — 올레오칸탈 COX 억제 최적화' : 'Triple-origin Koroneiki, Picual, Coratina blend — oleocanthal COX inhibition optimised' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="#a07850" />)}
        </div>
      </ArtSection>
    </div>
  );
}

/* ─── Article: Fermentation & Skincare ──────────────────────────────────────── */

function FermentationBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ArtTlDr>
        {isKo ? (
          <><strong>🧫 요약:</strong> 발효는 성분을 보존하는 게 아니에요 — 변환합니다. <strong>갈락토미세스</strong>와 <strong>락토바실러스</strong> 같은 미생물이 원료 식물 성분을 분해해 더 작고 흡수율 높은 활성 성분으로 바꾸고, 원래 식물에는 존재하지 않았던 새로운 치료적 특성을 만들어냅니다. 청주 양조장의 우연한 발견이 스킨케어 역사를 바꿨습니다.</>
        ) : (
          <><strong>🧫 TL;DR:</strong> Fermentation doesn't preserve ingredients — it transforms them. Microbes like <strong>Galactomyces</strong> and <strong>Lactobacillus</strong> break down raw botanicals into smaller, more bioavailable actives with therapeutic properties the original plant never had. It started as an accident in a sake brewery. It became one of skincare's most studied technologies.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=1200"
        alt="Fermentation laboratory setup with glass flasks and scientific equipment"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🦠 발효 성분이 원료보다 뛰어난 이유' : '🦠 Why fermented ingredients outperform their raw counterparts'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? <>식물 세포벽은 <strong>셀룰로오스</strong>로 만들어집니다 — 인체 피부가 침투하거나 대사할 수 없는 분자. <mark>발효 효소 활동이 이 벽을 열어 이전에 잠겨 있던 화합물을 방출하고 분자 크기를 줄여 각질층으로 확산할 수 있게 합니다.</mark></> : <>Plant cell walls are made of <strong>cellulose</strong> — a molecule human skin cannot penetrate or metabolize. <mark>Fermentation-driven enzymatic activity breaks these walls open, releasing compounds that were previously locked inside and reducing their molecular size.</mark></>}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '🔬 더 작은 분자', desc: '발효가 큰 다당류를 각질층을 직접 침투하는 흡수 가능한 올리고당으로 분해합니다.' },
            { title: '✨ 새로운 화합물 형성', desc: '미생물 대사가 원료에 없는 완전히 새로운 생체활성 분자를 만들어냅니다.' },
            { title: '🛡️ 낮은 자극 가능성', desc: '발효가 원료 식물 추출물에 존재하는 일반적인 자극제와 알레르겐을 분해합니다.' },
          ] : [
            { title: '🔬 Smaller molecules', desc: 'Fermentation cleaves large polysaccharides into absorbable oligosaccharides that penetrate the stratum corneum directly.' },
            { title: '✨ New compounds formed', desc: 'Microbial metabolism creates entirely new bioactive molecules — like galactomyces-derived NADHP and amino acids — not present in the raw material.' },
            { title: '🛡️ Lower irritation potential', desc: 'Fermentation degrades common irritants and allergens (like certain proteins) that exist in raw botanical extracts.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🔭 스킨케어의 세 가지 핵심 발효 미생물' : '🔭 The three key fermentation organisms in skincare'}</ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🍶" title={isKo ? '갈락토미세스 발효 여과물' : 'Galactomyces Ferment Filtrate'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <><strong>비타민, 미네랄, 아미노산</strong>, <strong>알파-하이드록시산</strong>을 포함하는 효모 발효 여과물. <mark>청주 양조장 직원들의 손이 놀랍도록 매끈하다는 것이 발견되어 처음 알려졌습니다.</mark> 티로시나제를 억제하고 세포 재생을 가속하여 피부톤을 밝히고 모공을 조이며 결을 개선합니다.</> : <>A yeast-fermented filtrate containing <strong>vitamins, minerals, amino acids,</strong> and <strong>alpha-hydroxy acids</strong>. <mark>Originally discovered when sake brewery workers had remarkably smooth hands.</mark> It brightens, tightens pores, and improves texture by accelerating cell turnover and inhibiting tyrosinase.</>}
          </ArtCallout>
          <ArtCallout icon="🥛" title={isKo ? '락토바실러스 발효물' : 'Lactobacillus Ferment'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>젖산균이 <strong>포스트바이오틱스</strong> — 피부의 Toll-like 수용체와 직접 소통하는 세포벽 파편과 대사 부산물 — 를 생성합니다. 이것이 면역 시스템에 염증 반응을 줄이도록 신호를 보내어, 민감성, 주사비, 예민한 피부 유형에 이상적입니다.</> : <>Lactic acid bacteria produce <strong>postbiotics</strong> — cell wall fragments and metabolic byproducts that communicate directly with skin's Toll-like receptors. This signals the immune system to reduce inflammatory response, making Lactobacillus ferments ideal for reactive, rosacea-prone, and sensitive skin types.</>}
          </ArtCallout>
          <ArtCallout icon="👶" title={isKo ? '비피다 발효 용해물' : 'Bifida Ferment Lysate'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <>건강한 영아 피부 마이크로바이옴의 우세 종인 <em>Bifidobacterium longum</em>에서 유래합니다. 용해물은 <strong>DNA 복구 효소</strong>와 <strong>항산화 효소</strong>(슈퍼옥사이드 디스뮤타제, 카탈라제)를 포함하여 UV 유발 산화 손상을 직접 대응합니다.</> : <>Derived from <em>Bifidobacterium longum</em> — a dominant species in healthy infant skin microbiomes. The lysate contains <strong>DNA repair enzymes</strong> and <strong>antioxidant enzymes</strong> (Superoxide Dismutase, Catalase) that directly counteract UV-induced oxidative damage.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '📖 라벨에서 발효 성분 읽는 법' : '📖 How to read ferment ingredients on a label'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '"발효 여과물"', body: '발효 후 액체 분획 — 미생물로부터 가용성 대사물, 산, 효소를 포함합니다. 활성이 높고 수용성입니다.' },
            { title: '"발효 용해물"', body: '분해된(열려진) 미생물 자체. 효소, DNA 파편, 구조 단백질 등 세포 내 화합물을 포함합니다. 면역 조절에 더 강력합니다.' },
            { title: '"발효 추출물"', body: '발효된 식물 성분 — 식물 자료가 미생물이 아닌 기질입니다. 결과는 변환되고 강화된 특성을 가진 변형된 식물 성분입니다.' },
            { title: '피해야 할 것', body: 'INCI 목록 맨 끝에 나열된 발효 성분은 효과적이지 않은 농도로 존재합니다. 효과적인 사용을 위해서는 포뮬러의 무게 기준 상위 50% 내에 있어야 합니다.' },
          ] : [
            { title: '"Ferment Filtrate"', body: 'The liquid fraction after fermentation — contains soluble metabolites, acids, and enzymes from the organism. High activity, water-soluble.' },
            { title: '"Ferment Lysate"', body: 'The organism itself, lysed (broken open). Contains intracellular compounds including enzymes, DNA fragments, and structural proteins. More potent for immune modulation.' },
            { title: '"Fermented Extract"', body: 'A botanical ingredient that has been fermented — the plant material is the substrate, not the organism. The result is a transformed botanical with altered and enhanced properties.' },
            { title: 'What to avoid', body: 'Ferment ingredients listed at the very end of an INCI list are present in sub-effective concentrations. Effective use requires these ingredients in the top 50% of the formula by weight.' },
          ]).map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '💚 발효 기술이 적용된 컬렉션 제품' : '💚 Ferment-forward products in our collection'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Dr. Jart+', name: 'Cicapair Intensive Soothing Repair Cream', note: isKo ? '마데카소사이드 + 알란토인 — 마이크로바이옴 지원과 함께 즉각적인 진정·장벽 복구' : 'Madecassoside + Allantoin — immediate calming and barrier repair with microbiome support' },
            { brand: 'Mediheal', name: 'Tea Tree Trouble Calming Toner Pads', note: isKo ? '락토바실러스 발효물 포스트바이오틱스 — 트러블 유발 IL-8·TNF-α를 선택적으로 억제' : 'Lactobacillus ferment postbiotics — selectively suppresses acne-driving IL-8 and TNF-α' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--accent)" />)}
        </div>
      </ArtSection>
    </div>
  );
}

/* ─── Article: PDRN & Salmon DNA ─────────────────────────────────────────────── */

function PDRNBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ArtTlDr>
        {isKo ? (
          <><strong>🧬 요약:</strong> PDRN은 연어에서 추출한 성분으로, 피부에 바르면 <strong>콜라겐 재생 신호</strong>를 활성화합니다. 한국 피부과에서는 30년 전부터 주사 시술로 써왔고, 이제 세럼으로도 나왔습니다. 피부 재생, 색소 개선, 시술 후 회복에 효과가 있다는 임상 데이터가 있습니다.</>
        ) : (
          <><strong>🧬 TL;DR:</strong> PDRN is a molecule derived from salmon that signals your skin to rebuild collagen. Korean dermatology clinics have used it in injections for 30 years — it's now in serums. Clinical studies back it for skin repair, dark spots, and post-treatment recovery.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1200"
        alt="Skincare serum dropper bottle representing PDRN regenerative skincare science"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🐟 연어 DNA가 피부에서 하는 일' : '🐟 What salmon DNA actually does to your skin'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>PDRN은 연어에서 추출한 DNA 조각입니다. 이름은 복잡하지만 작동 방식은 단순해요 — 피부 세포 표면의 특정 수용체에 결합해서 <strong>"지금 복구 시작"</strong>이라는 신호를 보냅니다. <mark>이 신호를 받은 세포들은 콜라겐을 새로 만들고, 혈관을 재생하고, 손상된 부위를 빠르게 회복시킵니다.</mark> 피부과에서 레이저 시술 후에 자주 쓰는 이유가 바로 이것입니다.</>
          ) : (
            <>PDRN is a fragment of DNA taken from salmon. The name sounds complicated, but the mechanism is straightforward — it binds to specific receptors on your skin cells and sends a signal to <strong>start repairing</strong>. <mark>Cells respond by producing new collagen, rebuilding blood vessels, and speeding up recovery in damaged areas.</mark> That's why Korean dermatology clinics reach for it after laser treatments.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '🔬 재생 신호 활성화', desc: '피부 세포에 복구 신호를 보내 성장인자 분비를 늘립니다.' },
            { title: '💪 콜라겐 재생', desc: '피부 탄력과 밀도를 만드는 콜라겐을 새로 합성하도록 유도합니다.' },
            { title: '🩸 혈액순환 개선', desc: '진피 내 새로운 모세혈관 형성을 촉진해 피부 영양 공급을 늘립니다.' },
          ] : [
            { title: '🔬 Repair Signal', desc: 'Tells skin cells to start recovering — increasing growth factor output.' },
            { title: '💪 Collagen Rebuilding', desc: 'Prompts the skin to produce new collagen, restoring firmness and density over time.' },
            { title: '🩸 Better Circulation', desc: 'Encourages new capillary growth in the dermis, improving how well nutrients reach skin cells.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '💉 왜 처음엔 주사였고, 이제는 세럼인가' : '💉 Why it was an injectable first — and why serums work now'}</ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🏥" title={isKo ? '피부 속으로 직접 넣어야 했던 이유' : 'The original problem'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>PDRN 분자는 일반 세럼 성분보다 훨씬 큽니다. 그냥 피부에 바르면 표면에서 머물다 씻겨 내려가요. <mark>한국 피부과에서는 이 문제를 피부에 미세한 경로를 만들어 성분을 직접 전달하는 방식으로 해결했습니다.</mark> 효과는 확실하지만 클리닉에 가야 한다는 한계가 있었죠.</> : <>PDRN molecules are much larger than most serum ingredients. Applied to the surface, they just sit there and wash off. <mark>Korean dermatologists got around this by creating tiny channels in the skin — microneedling, injections — to deliver it directly.</mark> It worked well, but required a clinic visit.</>}
          </ArtCallout>
          <ArtCallout icon="💊" title={isKo ? '세럼으로 가능해진 방법' : 'How serums solved it'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <><mark>요즘 PDRN 세럼들은 성분을 아주 작은 지질 캡슐에 감싸서 피부 흡수를 돕습니다.</mark> 이 캡슐은 피부 세포막과 구조가 같아서 세포가 자연스럽게 흡수합니다. 연구에 따르면 이 방식이 일반 수용액 대비 침투율을 최대 <strong>4배</strong> 높인다고 합니다.</> : <><mark>Modern PDRN serums wrap the molecule in tiny lipid capsules that help it absorb into skin.</mark> These capsules are structurally similar to cell membranes, so cells recognize and absorb them naturally. Studies show this method achieves up to <strong>4× better penetration</strong> compared to an unencapsulated formula.</>}
          </ArtCallout>
          <ArtCallout icon="🔬" title={isKo ? 'PN과 PDRN — 라벨에서 뭘 봐야 하나' : 'PN vs. PDRN on a label'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.1)">
            {isKo ? <>두 이름이 같은 성분처럼 쓰이지만 실제로는 다릅니다. PDRN이 더 작은 분절이고, 작을수록 피부에 더 잘 흡수됩니다. <mark>세럼에서 효과를 기대한다면 PDRN 표기가 있는 제품을 고르는 게 유리합니다.</mark></> : <>The two names get used interchangeably, but they're different. PDRN is the shorter, smaller version — and smaller means better absorption through skin. <mark>If you're buying a topical product, PDRN on the label is the better bet over PN.</mark></>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🧪 실제로 뭐가 증명됐나' : '🧪 What the research actually shows'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '📉 다크스팟 개선', body: 'PDRN을 12주간 꾸준히 사용한 연구에서 색소침착이 눈에 띄게 줄었습니다. 멜라닌 생성을 억제하고 피부 세포 교체를 빠르게 하는 두 가지 경로가 동시에 작동하기 때문입니다.' },
            { title: '🔄 상처 회복 가속', body: '한국 의료 현장에서 가장 오래 쓰인 분야입니다. 수술 후 조직 회복 연구들에서 PDRN을 사용한 쪽이 그렇지 않은 쪽보다 회복 속도가 평균 30% 빨랐습니다.' },
            { title: '💧 수분 유지력 향상', body: '피부 속 히알루론산 생성을 도와 수분 손실을 줄입니다. 민감하고 건조한 피부 모델 연구에서 8주 후 피부 수분량이 평균 23% 증가했습니다.' },
            { title: '⚡ 시술 후 빠른 회복', body: '레이저나 필링 후 피부가 빨개지고 예민해지는 시간을 단축합니다. 한국 클리닉들이 시술 직후 PDRN을 루틴으로 쓰는 이유입니다.' },
          ] : [
            { title: '📉 Dark spots', body: 'A 12-week study found visible reduction in uneven skin tone with consistent PDRN use. It works on two fronts simultaneously — slowing melanin production and speeding up how quickly old skin cells turn over.' },
            { title: '🔄 Faster wound healing', body: 'The longest-standing clinical application. Post-surgical studies consistently show PDRN-treated tissue heals around 30% faster on average — which is why hospitals adopted it before skincare did.' },
            { title: '💧 Moisture retention', body: 'PDRN supports hyaluronic acid production inside the skin, reducing water loss. A study on dry, sensitive skin models found moisture levels up by an average of 23% after 8 weeks.' },
            { title: '⚡ Post-treatment recovery', body: 'Shortens the window of redness and sensitivity after lasers or peels. Korean clinics have made it a standard step right after ablative treatments for this reason.' },
          ]).map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '✨ 추천 PDRN 세럼' : '✨ PDRN serums worth using'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Medicube', name: 'PDRN Pink Collagen Capsule Cream', note: isKo ? 'PDRN + EGF 복합 — 콜라겐 재생과 탄력 회복에 집중' : 'PDRN + EGF combo — focused on collagen rebuilding and firmness' },
            { brand: 'Dr. FORHAIR', name: 'PDRN Rejuvenating Serum', note: isKo ? '고농도 PDRN + 나이아신아마이드 — 재생과 브라이트닝을 동시에' : 'High-concentration PDRN + niacinamide — repair and brightening together' },
            { brand: 'Some By Mi', name: 'PDRN Snail Truecica Miracle Repair Serum', note: isKo ? '스네일 + PDRN — 예민하고 손상된 피부 즉각 진정' : 'Snail + PDRN — calming and repairing compromised or reactive skin' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--accent)" />)}
        </div>
      </ArtSection>
    </div>
  );
}

/* ─── Article: Postbiotics ───────────────────────────────────────────────── */

function PostbioticsBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 포스트바이오틱스는 발효 과정에서 생성되는 생리활성 물질로, 살아있는 균이 필요 없어요. 비피다 발효물(Bifida Ferment Lysate)과 유산균 발효 여과물(Lactobacillus Ferment Filtrate)이 대표 성분이며, 임상 연구에서 8주 만에 피부 장벽 기능을 34% 개선한 것으로 나타났습니다. K-뷰티는 이미 수십 년째 써온 성분이에요.</>
        ) : (
          <><strong>TL;DR:</strong> Postbiotics are bioactive compounds produced during fermentation — no live bacteria needed. Key ingredients include Bifida Ferment Lysate and Lactobacillus Ferment Filtrate. Clinical studies show a 34% improvement in skin barrier function over 8 weeks. K-beauty has been using them for decades — the rest of the world is catching on.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=1200"
        alt="Fermented skincare serum bottles on minimal surface, K-beauty postbiotic ingredients"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '프로바이오틱스, 프리바이오틱스, 포스트바이오틱스 — 뭐가 다른가요?' : 'Probiotics, Prebiotics, Postbiotics — What\'s the Actual Difference?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>피부 마이크로바이옴 이야기가 나오면 항상 '프로바이오틱스'가 먼저 등장해요. 하지만 세 가지는 역할이 전혀 달라요. <strong>프로바이오틱스(Probiotics)</strong>는 살아있는 유익균, 프리바이오틱스(Prebiotics)는 그 균의 먹이, 그리고 <mark>포스트바이오틱스(Postbiotics)는 발효가 끝난 후 남는 생리활성 부산물</mark>입니다. 살아있는 균이 없어도 되니까 훨씬 안정적이고, 손상되거나 예민한 피부에도 안전하게 쓸 수 있어요.</>
          ) : (
            <>Skincare conversations about the microbiome almost always start with probiotics. But the three terms aren't interchangeable. <strong>Probiotics</strong> are live bacteria, prebiotics are their food source, and <mark>postbiotics are the bioactive byproducts left after fermentation completes</mark>. No live organisms required — which makes them far more stable on a shelf and safer for compromised or sensitive skin.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '프로바이오틱스', desc: '살아있는 유익균. 피부에 직접 적용할 경우 안정성 이슈가 있을 수 있어요.' },
            { title: '프리바이오틱스', desc: '피부 유익균의 먹이가 되는 성분. 균의 성장 환경을 조성해줍니다.' },
            { title: '포스트바이오틱스', desc: '발효 부산물. 살아있는 균 없이도 동일한 피부 이점을 줍니다.' },
          ] : [
            { title: 'Probiotics', desc: 'Live bacteria. Can have stability issues when applied topically to skin.' },
            { title: 'Prebiotics', desc: 'Food for beneficial bacteria. Sets the stage for a healthy microbiome.' },
            { title: 'Postbiotics', desc: 'Fermentation byproducts. Deliver the same skin benefits — no live organisms needed.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '왜 포스트바이오틱스가 피부 장벽에 효과적인가요?' : 'Why Do Postbiotics Work So Well on the Skin Barrier?'}
        </ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🧬" title={isKo ? '장벽 유전자를 직접 활성화' : 'Directly activates barrier genes'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? '비피다 발효물(Bifida Ferment Lysate)은 피부의 물리적 장벽 관련 유전자와 항균 펩타이드 유전자 발현을 높인다는 것이 연구로 확인됐어요. 피부가 스스로 더 두꺼운 보호막을 만들도록 신호를 보내는 거예요.' : 'Bifida Ferment Lysate has been shown in studies to upregulate the physical barrier genes and antimicrobial peptide genes in skin cells — essentially signalling skin to build a stronger protective layer on its own.'}
          </ArtCallout>
          <ArtCallout icon="🛡️" title={isKo ? '살아있는 균보다 안전한 이유' : 'Safer than live bacteria for compromised skin'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? '2026년 임상 스킨케어 트렌드 보고서에 따르면, 살아있는 균은 손상된 피부나 시술 후 피부에 적합하지 않을 수 있어요. 반면 포스트바이오틱스는 면역 조절 효과는 동일하게 가져가면서 균 자체를 도입하지 않기 때문에 훨씬 안전합니다.' : 'A 2026 clinical skincare report notes that live bacteria "are not always appropriate for compromised or post-procedure skin." Postbiotics deliver the same immune-modulating benefits without introducing organisms — making them the safer choice for reactive or damaged skin.'}
          </ArtCallout>
          <ArtCallout icon="📊" title={isKo ? '8주에 34% 장벽 개선' : '34% barrier improvement in 8 weeks'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>2025년 발표된 연구에서 <mark>국소 포스트바이오틱스를 8주 사용한 그룹은 대조군 대비 피부 장벽 기능이 34% 개선</mark>됐어요. 단순한 보습제가 아니라 장벽 자체를 구조적으로 강화하는 성분입니다.</> : <>A 2025 study found that topical postbiotics improved skin barrier function by <mark>34% over 8 weeks compared to controls</mark>. This isn't surface-level hydration — it's structural reinforcement of the barrier itself.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? 'K-뷰티가 이미 수십 년째 써온 포스트바이오틱스 성분들' : 'The Postbiotic Ingredients K-Beauty Has Used for Decades'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '비피다 발효물 (Bifida Ferment Lysate)', body: '비피도박테리움 발효에서 얻은 부산물로, 피부 장벽 유전자 발현을 높이고 산화 스트레스에 대한 저항력을 키워줘요. SK-II의 갈락토미세스 발효 여과물과 함께 K-뷰티 발효 라인업의 핵심입니다.' },
            { title: '유산균 발효 여과물 (Lactobacillus Ferment Filtrate)', body: '유산균 발효 과정에서 걸러낸 여과물로, 염증성 피부 병변을 50~70%까지 줄이고 피지 분비를 최대 42% 낮추는 임상 데이터가 있어요. 특히 트러블성 피부에 효과적입니다.' },
            { title: '갈락토미세스 발효 여과물 (Galactomyces Ferment Filtrate)', body: '청주 양조장 직원들의 손이 유달리 매끄럽다는 관찰에서 시작된 성분이에요. 비타민, 미네랄, AHA가 풍부하며 피부톤 균일화와 모공 케어에 탁월합니다.' },
          ] : [
            { title: 'Bifida Ferment Lysate', body: 'A byproduct of Bifidobacterium fermentation that upregulates skin barrier genes and builds resistance to oxidative stress. A cornerstone of K-beauty fermentation lineups alongside galactomyces.' },
            { title: 'Lactobacillus Ferment Filtrate', body: 'Clinical data shows this postbiotic reduces inflammatory skin lesions by 50–70% and sebum secretion by up to 42%. Particularly effective for acne-prone and congested skin types.' },
            { title: 'Galactomyces Ferment Filtrate', body: 'Discovered when sake brewery workers had remarkably smooth hands. Rich in vitamins, minerals, and AHAs — brightens skin tone, tightens pores, and accelerates cell turnover.' },
          ]).map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '✨ 추천 제품' : '✨ Products worth trying'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Ma:nyo Factory', name: 'Bifida Biome Complex Ampoule', note: isKo ? '비피다 발효물 고농도 앰플 — 예민하고 손상된 장벽 집중 회복' : 'High-concentration Bifida Ferment — intensive barrier recovery for reactive skin' },
            { brand: 'Benton', name: 'Fermentation Essence', note: isKo ? '갈락토미세스 + 유산균 발효물 조합 — 피부톤 균일화와 장벽 강화를 동시에' : 'Galactomyces + lactobacillus combo — brightening and barrier reinforcement together' },
            { brand: 'Haruharu Wonder', name: 'Black Rice Hyaluronic Toner', note: isKo ? '발효 흑미 추출물 기반 — 마이크로바이옴 친화적 수분 레이어링에 이상적' : 'Fermented black rice base — ideal for microbiome-friendly hydration layering' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="#a07850" />)}
        </div>
      </ArtSection>

    </div>
  );
}
