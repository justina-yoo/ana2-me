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
      id: 'k-fragrance-skin-scents',
      category: { en: 'Olfactory Science', ko: '후각 과학' },
      title: {
        en: "K-Fragrance Just Hit Record Exports. Here's the Molecular Reason Korean Perfume Smells Different.",
        ko: 'K-프래그런스 수출이 역대 최고를 찍었습니다. 한국 향수는 왜 다를까요?',
      },
      excerpt: {
        en: "South Korea's fragrance exports hit $6.52 million in January 2026 — the highest monthly figure since records began in 1988. The secret isn't marketing. It's a fundamentally different approach to scent design: skin-close, low-sillage, built on synthetic musks and sheer woods rather than projection.",
        ko: '2026년 1월, 한국 향수 수출이 월 652만 달러로 사상 최고치를 기록했어요. 마케팅이 아닌 제조 철학이 다릅니다 — 피부에 밀착되는 머스크와 시어 우드 중심의 설계, 강하게 퍼지는 대신 가까이에서 느끼는 향.',
      },
      readTime: { en: '7 min read', ko: '7분 읽기' },
      date: 'May 2026',
      tag: { en: 'Fragrance', ko: '향수' },
      tagColor: 'var(--sage)',
      imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'pistachio-fragrance-note',
      category: { en: 'Olfactory Science', ko: '후각 과학' },
      title: {
        en: "Pistachio Is Up 852%. Here's Why Your Nose Can't Resist It.",
        ko: '피스타치오 향이 852% 급등한 이유 — 코가 거부할 수 없는 분자 구조',
      },
      excerpt: {
        en: "Pistachio is 2026's breakout fragrance note — up 852% year-over-year. It's not about the nut. It's about what happens when lactones, pyrazines, and aldehydes combine to create a scent your brain reads as 'creamy warmth' rather than 'food.'",
        ko: '피스타치오가 2026년 가장 뜨거운 향료로 떠올랐어요. 비결은 견과류 자체가 아니라, 락톤과 피라진이 만드는 "크리미한 따뜻함"이라는 후각적 인상에 있습니다.',
      },
      readTime: { en: '6 min read', ko: '6분 읽기' },
      date: 'May 2026',
      tag: { en: 'Fragrance', ko: '향수' },
      tagColor: 'var(--sage)',
      imageUrl: 'https://images.unsplash.com/photo-1502825751399-28baa9b81efe?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'fragrance-wardrobing',
      category: { en: 'Olfactory Science', ko: '후각 과학' },
      title: {
        en: "Your Brain Stops Smelling Your Perfume After 20 Minutes. Science Says Stop Fighting It.",
        ko: '20분이면 내 향수가 안 느껴져요. 뇌과학이 알려주는 해결법',
      },
      excerpt: {
        en: "Olfactory habituation isn't a flaw — it's an evolutionary survival mechanism. Your brain categorizes familiar scents as 'safe background.' Rotating fragrances resets this filter. The signature scent is dead. The fragrance wardrobe is what works.",
        ko: '후각 피로는 결함이 아니라 생존 본능이에요. 익숙한 냄새를 "안전한 배경"으로 분류하는 뇌의 필터링 시스템입니다. 시그니처 향수 대신, 향수 옷장을 만들어보세요.',
      },
      readTime: { en: '5 min read', ko: '5분 읽기' },
      date: 'May 2026',
      tag: { en: 'Fragrance', ko: '향수' },
      tagColor: 'var(--sage)',
      imageUrl: 'https://images.unsplash.com/photo-1615634260830-85d92cd1b769?auto=format&fit=crop&q=80&w=800',
    },
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
          {t('Research &', '성분을')}<br />
          <span className="display-accent">{t('Analysis', '읽다')}<span className="display-dot">.</span></span>
        </h1>
        <p className="ins-sub">{t(
          'Deep-dives into ingredients, formulas, and trends.',
          '성분, 포뮬러, 트렌드를 깊이 파헤칩니다.'
        )}</p>
      </header>

      <div style={{ maxWidth: 780, margin: '0 auto 0', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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

      <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {posts.map((post, idx) => {
          // Pattern: hero at 0, compact 1-3, hero at 4, compact 5-7, ...
          const isHero = idx % 4 === 0;

          if (isHero) {
            return (
              <button
                key={post.id}
                onClick={() => onSelectPost(post)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--line)',
                  borderRadius: 0,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: '20px 0',
                }}
              >
                <ProductImg
                  src={post.imageUrl}
                  alt={post.title[lang] || post.title.en}
                  style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block', borderRadius: 'var(--radius-sm)' }}
                />
                <div style={{ padding: '16px 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 500 }}>
                      {post.readTime[lang] || post.readTime.en}
                    </span>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--line)', display: 'inline-block' }} />
                    <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 500 }}>{post.date}</span>
                  </div>
                </div>
              </button>
            );
          }

          // Compact horizontal row for cards #2+
          return (
            <button
              key={post.id}
              onClick={() => onSelectPost(post)}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                width: '100%', textAlign: 'left',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--line)',
                borderRadius: 0,
                cursor: 'pointer',
                padding: '14px 0',
              }}
            >
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 'clamp(15px, 1.8vw, 18px)', lineHeight: 1.25,
                  letterSpacing: '-0.01em', margin: 0,
                  color: 'var(--ink)',
                  overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                }}>
                  {post.title[lang] || post.title.en}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    onClick={(e) => { e.stopPropagation(); onTagClick(post.tag.en); }}
                    style={{ fontSize: 11, fontWeight: 600, color: post.tagColor, cursor: 'pointer' }}
                  >
                    {post.tag[lang] || post.tag.en}
                  </span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--line)', display: 'inline-block' }} />
                  <span style={{ fontSize: 12, color: 'var(--ink-faint)', fontWeight: 500 }}>{post.date}</span>
                </div>
              </div>
              <ProductImg
                src={post.imageUrl}
                alt={post.title[lang] || post.title.en}
                style={{ width: 88, height: 88, borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Post Detail ───────────────────────────────────────────────────────────── */

const ARTICLE_BODIES = {
  'k-fragrance-skin-scents': KFragranceBody,
  'pistachio-fragrance-note': PistachioBody,
  'fragrance-wardrobing': FragranceWardrobingBody,
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
      getTargets().forEach(p => p.classList.remove('ana2me-hl'));
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
        <ArtSectionHeading>{isKo ? '🔍 피부 장벽은 왜 무너질까요?' : '🔍 What are the primary drivers of skin barrier degradation?'}</ArtSectionHeading>
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
        <ArtSectionHeading>{isKo ? '🧪 장벽을 다시 세우는 핵심 성분 세 가지' : '🧪 Which three molecular compounds are essential for barrier restoration?'}</ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🌿" title={isKo ? '1. 시카-리포솜' : '1. Cica-Liposomes'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <><strong>병풀(Centella Asiatica)</strong>의 핵심 성분인 아시아티코사이드와 마데카소사이드를 캡슐에 감싸서 피부 깊숙이 전달해요. 콜라겐 합성과 보습 인자 생성을 촉진합니다.</> : <>Encapsulated <strong>Centella Asiatica</strong> triterpenoids (Asiaticoside, Madecassoside) that penetrate deeper into the stratum corneum to stimulate GAG synthesis and collagen production at the cellular level.</>}
          </ArtCallout>
          <ArtCallout icon="💧" title={isKo ? '2. 스쿠알란 유래 세라마이드' : '2. Squalane-Derived Ceramides'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <>우리 피부 피지와 구조가 비슷한 지질이에요. 모공을 막지 않으면서 <strong>수분 증발(TEWL)</strong>을 막아주는 보호막을 만들어줍니다.</> : <>Hydrogenated lipids that mimic human sebum, providing an occlusive yet breathable layer to prevent <strong>TEWL (Trans-Epidermal Water Loss)</strong> without clogging pores.</>}
          </ArtCallout>
          <ArtCallout icon="✨" title={isKo ? '3. 비피다 발효 용해물' : '3. Bifida Ferment Lysate'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.1)">
            {isKo ? 'DNA 복구 효소가 풍부한 발효 유래 성분이에요. 피부 위의 유익균 균형을 도와 마이크로바이옴을 건강하게 유지하고 민감성을 낮춰줍니다.' : "A probiotic derivative rich in DNA repair enzymes that strengthens the skin's microbiome and reduces sensitivity by promoting a healthy bacterial balance."}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🌿 한방 성분, 첨단 기술을 만나다' : '🌿 How do Korean botanicals integrate with modern synthesis?'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? <>한국의 한방(漢方) 전통은 수천 년간 피부와 체질의 관계를 연구해왔어요. <mark>2026년, 첨단 바이오리액터와 정밀 추출 기술이 그 경험을 분자 수준에서 과학적으로 증명하고 있습니다.</mark></> : <>Korean "Hanbang" medicine has spent centuries mapping the relationship between botanicals and skin. <mark>In 2026, high-tech bioreactors and precision extraction are validating that wisdom at a molecular level — not replacing it.</mark></>}
        </ArtBody>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '발효 기술의 진화', body: '전통 옹기 발효를 첨단 바이오리액터로 재현하면서 폴리페놀과 플라보노이드의 흡수율이 크게 높아졌어요. 같은 원료도 피부에 더 잘 스며듭니다.' },
            { title: '식물성 레티놀', body: '바쿠치올은 레티놀과 같은 효과(세포 재생, 콜라겐 촉진)를 주지만, 합성 비타민 A처럼 장벽을 자극하지 않아요.' },
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
        <ArtSectionHeading>{isKo ? '✨ 장벽이 무너졌을 때 쓸 제품' : '✨ Products built for barrier-compromised skin'}</ArtSectionHeading>
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
        <ArtSectionHeading>{isKo ? '🔺 향은 왜 시간에 따라 변할까요?' : '🔺 What is the volatility pyramid?'}</ArtSectionHeading>
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
        <ArtSectionHeading>{isKo ? '🔬 향이 오래 남는 이유, 분자에 있습니다' : '🔬 The molecular science of longevity'}</ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🌲" title={isKo ? '고착제 — 향을 붙잡는 분자' : 'Fixatives & Substantivity'} borderColor="rgba(107,142,107,0.3)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <><strong>Iso E Super</strong>나 <strong>Ambroxan</strong> 같은 고착제는 크고 잘 날아가지 않는 분자예요. 가벼운 향 분자가 너무 빨리 증발하지 않도록 잡아주는 역할을 합니다 — 덕분에 탑 노트와 미들 노트가 더 오래 남아요.</> : <>Fixatives like <strong>Iso E Super</strong> and <strong>Ambroxan</strong> are large, semi-volatile molecules that slow the evaporation of lighter compounds by forming a molecular scaffold — extending the presence of top and heart notes beyond their natural lifespan.</>}
          </ArtCallout>
          <ArtCallout icon="🧪" title={isKo ? '내 피부에서 다르게 느껴지는 이유' : 'Skin Chemistry as a Variable'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>피부의 pH, 유분량, 심지어 식단까지 향수 분자가 피부에 달라붙는 방식을 바꿔요. <mark>유분기 많은 피부는 향 분자를 천천히 내보내는 <strong>저장소</strong> 역할을 합니다.</mark> 건성 피부는 향을 잡아두는 힘이 약해서 더 빨리 날아가요.</> : <>pH, sebum content, and even diet alter how fragrance molecules bind to skin proteins. <mark>Oilier skin acts as a <strong>carrier reservoir</strong>, releasing molecules slowly.</mark> Dry skin offers less retention, causing faster diffusion into air.</>}
          </ArtCallout>
          <ArtCallout icon="🌙" title={isKo ? '마크로사이클릭 머스크' : 'Macrocyclic Musks'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>차세대 베이스 노트인 <strong>Exaltolide</strong>, <strong>Habanolide</strong>는 고리형 합성 머스크로 거의 날아가지 않아요. 피부 단백질에 직접 결합해서 24시간 넘게 은은하게 남는 '세컨드 스킨' 효과를 만들어냅니다.</> : <>The new generation of base notes — <strong>Exaltolide</strong>, <strong>Habanolide</strong> — are ring-structured synthetic musks with extremely low volatility. They interact with skin proteins covalently, producing the "second skin" effect that can last over 24 hours.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🛒 향수 고를 때 이렇게 써보세요' : '🛒 How to use this knowledge when buying fragrance'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '👃 시향은 반드시 피부에', body: '시향지는 향의 일부만 보여줘요. 내 피부의 pH와 유분이 향을 완전히 바꿉니다. 맥박 부위에 뿌리고 30분 이상 기다린 후 판단하세요.' },
            { title: '🎨 레이어링의 기술', body: '먼저 샌달우드, 우드, 베티버 같은 무거운 오일을 바르고 그 위에 향수를 뿌려보세요. 오일이 가벼운 향 분자를 잡아줘서 지속력이 훨씬 길어집니다.' },
            { title: '📊 농도에 따라 달라요', body: '퍼퓸(향료 20–40%)은 오드 뚜왈렛(5–15%)보다 무거운 베이스 분자가 훨씬 많아요. 농도가 높을수록 깊고 오래가는 잔향을 느낄 수 있습니다.' },
            { title: '🌡️ 체온이 향을 키워요', body: '열은 향 분자의 증발을 빠르게 해요. 손목, 목, 팔꿈치 안쪽 같은 맥박 부위는 체온이 높아 향이 더 잘 퍼지지만, 탑 노트가 빨리 사라지기도 합니다.' },
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
        <ArtSectionHeading>{isKo ? '🌸 이 향수들, 분자로 읽어봤습니다' : '🌸 Scents in our collection, read by molecular architecture'}</ArtSectionHeading>
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
        <ArtSectionHeading>{isKo ? '🔑 왜 먹어도 흡수가 안 될까요?' : '🔑 Why bioavailability is the hidden variable'}</ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🌱" title={isKo ? '장에서 막히는 이유' : 'The Gut Barrier Problem'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>어댑토젠 성분 대부분은 분자가 크고 물에 잘 녹아서 장벽을 통과하기 어려워요. <mark>전달 기술 없이 그냥 먹으면 대부분 흡수되지 못한 채 그대로 빠져나갑니다.</mark></> : <>Most adaptogen compounds are <strong>large, hydrophilic molecules</strong> that struggle to cross the intestinal epithelium. <mark>Without an optimized delivery system, they pass through largely intact — you excrete the compound before it reaches systemic circulation.</mark></>}
          </ArtCallout>
          <ArtCallout icon="🧬" title={isKo ? '발효하면 흡수가 달라져요' : 'Fermentation Unlocks Bound Actives'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <><strong>락토바실러스</strong> 균주로 발효하면 식물 세포벽이 분해되고, 활성 성분이 더 작고 지용성 높은 형태로 풀려나요. 이렇게 바뀌면 장벽을 훨씬 쉽게 통과합니다.</> : <>Fermentation — particularly with <strong>Lactobacillus</strong> strains — breaks down plant cell walls and cleaves glycoside bonds, releasing active aglycones that are substantially smaller and more lipophilic. This dramatically improves passive diffusion across gut membranes.</>}
          </ArtCallout>
          <ArtCallout icon="💊" title={isKo ? '지질 캡슐로 감싸기' : 'Lipid Encapsulation'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>리포솜이나 파이토솜 기술은 활성 성분을 세포막과 같은 구조의 <strong>인지질 캡슐</strong>로 감싸요. 세포가 자기 것처럼 인식해서 바로 흡수하기 때문에, 간에서 먼저 분해되는 걸 피할 수 있습니다.</> : <>Liposomal and phytosomal delivery systems wrap active compounds in <strong>phospholipid bilayers</strong> that are structurally identical to cell membranes. Cells recognize and absorb the encapsulated compound directly — bypassing first-pass metabolism in the liver.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🏷️ 보충제 라벨, 이것만 보세요' : '🏷️ Reading a supplement label for real bioavailability'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '🎯 표준화 % 확인', body: '"아슈와간다 500mg"만으로는 아무것도 알 수 없어요. "KSM-66 아슈와간다 300mg, 위타노라이드 5% 표준화"처럼 활성 성분 함량이 적혀 있어야 유효 용량을 판단할 수 있습니다.' },
            { title: '📏 추출 비율', body: '10:1 추출물이란 원료 10kg을 1kg으로 농축했다는 뜻이에요. 비율이 높을수록 그램당 활성 성분이 많지만, 어떤 성분을 추출했느냐가 더 중요합니다.' },
            { title: '🔀 이중 추출 vs 단일 추출', body: '버섯류는 열수 추출(베타글루칸)과 알코올 추출(트리터펜)을 둘 다 해야 해요. 한 가지만으로는 약리 활성의 절반을 놓칩니다.' },
            { title: '⚡ 피페린·지방 함께 먹기', body: '피페린(후추 추출물)은 간에서 어댑토젠을 분해하는 효소를 억제해요. 일부 성분의 혈중 농도를 최대 20배까지 높여줍니다.' },
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
        <ArtSectionHeading>{isKo ? '✨ 흡수율까지 고려한 웰니스 제품' : '✨ Wellness products designed around bioavailability'}</ArtSectionHeading>
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
        <ArtSectionHeading>{isKo ? '🦠 왜 발효하면 달라질까요?' : '🦠 Why fermented ingredients outperform their raw counterparts'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? <>식물 세포벽은 <strong>셀룰로오스</strong>로 되어 있어요 — 우리 피부가 뚫거나 분해할 수 없는 물질이죠. <mark>발효 과정의 효소가 이 벽을 열어서 안에 갇혀 있던 활성 성분을 꺼내고, 분자 크기를 줄여 피부 속까지 스며들 수 있게 만듭니다.</mark></> : <>Plant cell walls are made of <strong>cellulose</strong> — a molecule human skin cannot penetrate or metabolize. <mark>Fermentation-driven enzymatic activity breaks these walls open, releasing compounds that were previously locked inside and reducing their molecular size.</mark></>}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '🔬 분자가 작아져요', desc: '큰 다당류가 작은 올리고당으로 쪼개져서 피부 속까지 직접 침투할 수 있어요.' },
            { title: '✨ 새로운 성분이 생겨요', desc: '미생물이 대사하면서 원래 원료에는 없던 완전히 새로운 활성 물질이 만들어집니다.' },
            { title: '🛡️ 자극이 줄어들어요', desc: '원료 식물 추출물에 있던 자극 성분과 알레르겐이 발효 과정에서 분해됩니다.' },
          ] : [
            { title: '🔬 Smaller molecules', desc: 'Fermentation cleaves large polysaccharides into absorbable oligosaccharides that penetrate the stratum corneum directly.' },
            { title: '✨ New compounds formed', desc: 'Microbial metabolism creates entirely new bioactive molecules — like galactomyces-derived NADHP and amino acids — not present in the raw material.' },
            { title: '🛡️ Lower irritation potential', desc: 'Fermentation degrades common irritants and allergens (like certain proteins) that exist in raw botanical extracts.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🔭 스킨케어를 바꾼 발효 미생물 세 가지' : '🔭 The three key fermentation organisms in skincare'}</ArtSectionHeading>
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
            { title: '"Ferment Filtrate" (발효 여과물)', body: '발효 후 걸러낸 액체예요. 미생물이 만든 대사물, 산, 효소가 녹아 있습니다. 활성이 높고 피부에 바로 흡수돼요.' },
            { title: '"Ferment Lysate" (발효 용해물)', body: '미생물 세포를 터뜨려서 안에 있는 효소, DNA 파편, 단백질을 꺼낸 거예요. 면역 조절 효과가 더 강합니다.' },
            { title: '"Fermented Extract" (발효 추출물)', body: '식물 성분을 미생물로 발효시킨 거예요. 미생물이 아니라 식물이 주인공이고, 발효를 거치면서 성분이 변하고 강화됩니다.' },
            { title: '이건 피하세요', body: '성분표 맨 끝에 적힌 발효 성분은 함량이 너무 적어서 효과를 기대하기 어려워요. 전체 포뮬러의 상위 절반 안에 들어야 의미가 있습니다.' },
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
        <ArtSectionHeading>{isKo ? '💚 발효 성분이 핵심인 제품들' : '💚 Ferment-forward products in our collection'}</ArtSectionHeading>
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

/* ─── Article: K-Fragrance ───────────────────────────────────────────────── */

function KFragranceBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> K-프래그런스가 세계 시장에서 주목받는 건 마케팅이 아니라 설계 철학 때문이에요. 한국 향수는 강하게 퍼지는 대신 피부에 밀착되는 '스킨 센트'를 지향하며, 합성 머스크와 시어 우드 같은 저휘발성 분자를 중심으로 만들어집니다. 2026년 1월 수출 652만 달러 — 1988년 이래 최고 기록.</>
        ) : (
          <><strong>TL;DR:</strong> K-fragrance is gaining global traction not because of marketing, but because of a fundamentally different design philosophy. Korean perfumes prioritize skin-close "skin scents" built on low-volatility synthetic musks and sheer woods — not projection. January 2026 exports hit $6.52 million, the highest monthly figure since records began in 1988.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1200"
        alt="Minimal perfume bottles on a clean surface, representing K-fragrance skin scent design"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🌏 K-프래그런스가 갑자기 주목받는 이유' : '🌏 Why is K-fragrance suddenly everywhere?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>2026년 1월, 한국 향수 수출이 <strong>월 652만 달러</strong>를 기록하며 1988년 통계 작성 이래 최고치를 찍었어요. 더 놀라운 건 미국과의 향수 무역에서 <mark>28년 만에 처음으로 흑자를 달성</mark>했다는 점이에요. K-뷰티가 스킨케어로 세계를 바꿨듯이, 이제 향수 차례가 온 겁니다.</>
          ) : (
            <>In January 2026, South Korea's fragrance exports hit <strong>$6.52 million</strong> — the highest monthly figure since records began in 1988. Even more striking: Korea achieved a <mark>fragrance trade surplus with the US for the first time in 28 years</mark>. K-beauty rewrote the rules for skincare. Now it's fragrance's turn.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '📈 652만 달러', desc: '2026년 1월 월간 향수 수출액. 역대 최고 기록.' },
            { title: '🇺🇸 28년 만의 흑자', desc: '미국 향수 수출 184만 달러 vs 수입 127만 달러.' },
            { title: '📊 연 9.1% 성장', desc: '니치 향수 시장의 연평균 성장률. 대중 향수(2.69%)의 3배 이상.' },
          ] : [
            { title: '📈 $6.52M', desc: 'January 2026 monthly fragrance exports — an all-time high.' },
            { title: '🇺🇸 28-year first', desc: 'Fragrance trade surplus with the US: $1.84M exports vs $1.27M imports.' },
            { title: '📊 9.1% CAGR', desc: 'Niche fragrance market growth rate — more than 3× the mass market.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🧪 "스킨 센트"란 정확히 뭘까요?' : '🧪 What exactly is a "skin scent"?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>서양 향수가 '프로젝션(projection)' — 얼마나 멀리 퍼지느냐 — 을 중시한다면, 한국 향수는 정반대를 추구해요. <mark>가까이 다가와야 느낄 수 있는 향, 피부 위에서 체온과 섞여 나만의 냄새가 되는 향.</mark> 이걸 '스킨 센트'라고 부릅니다. 머스크, 파우더, 차, 시어 우드처럼 <strong>증기압이 낮고 분자량이 큰</strong> 원료를 중심으로 설계되기 때문에, 공기 중으로 빠르게 날아가지 않고 피부에 오래 밀착돼요.</>
          ) : (
            <>Western perfumery has long valued projection — how far a scent travels. Korean fragrance design pursues the opposite. <mark>A scent you can only smell up close, one that merges with your body heat and becomes uniquely yours.</mark> That's a skin scent. It's built on <strong>low-vapor-pressure, high-molecular-weight</strong> ingredients — musks, clean powders, tea, sheer woods — that don't rush into the air. They stay close to skin, evolving slowly over hours.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🔬 K-프래그런스를 만드는 핵심 분자들' : '🔬 The molecules behind the K-fragrance signature'}
        </ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🤍" title={isKo ? '화이트 머스크 — 실험실에서 만든 친밀함' : 'White Musk — intimacy, engineered'} borderColor="rgba(107,142,107,0.3)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <>화이트 머스크는 자연에서 추출한 단일 원료가 아니에요. 실험실에서 여러 합성 분자를 조합해 '깨끗함, 부드러움, 친밀함'이라는 후각적 인상을 만든 어코드입니다. 한국 향수의 베이스에 가장 많이 쓰이며, <strong>피부 위에서 체온에 반응해 은은하게 올라오는 특성</strong>이 있어요.</> : <>White musk isn't a single natural ingredient — it's a lab-engineered accord of multiple synthetic molecules designed to evoke cleanliness, softness, and intimacy. It's the most common base in Korean fragrances, and it has a unique property: <strong>it responds to body heat, rising gently from skin rather than projecting into a room</strong>.</>}
          </ArtCallout>
          <ArtCallout icon="🌊" title={isKo ? '앰브록산(Ambroxan) — 피부처럼 느껴지는 분자' : 'Ambroxan — the molecule that smells like skin'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>앰브록산은 용연향(Ambergris)의 합성 버전으로, 짠맛과 미네랄 느낌이 나는 따뜻한 머스크예요. <mark>피부 자체의 냄새를 더 좋게 만드는 것처럼 느껴지기 때문에</mark> "세컨드 스킨" 분자라고 불립니다. K-프래그런스에서 자주 쓰이는 핵심 원료 중 하나예요.</> : <>Ambroxan is the synthetic version of ambergris — a warm, salty, mineral musk. <mark>It's called the "second skin" molecule because it doesn't smell like perfume — it makes your skin smell better.</mark> It's one of the most frequently used ingredients in K-fragrance formulation.</>}
          </ArtCallout>
          <ArtCallout icon="🌿" title={isKo ? '시어 우드 — 가볍게 스치는 나무' : 'Sheer Woods — timber, thinned to a whisper'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>전통 우디 향수가 묵직한 샌달우드나 시더를 쓴다면, K-프래그런스는 같은 나무 원료를 극도로 희석해서 사용해요. 나무 향이 존재하지만 느낌만 남을 정도로 가볍고, 머스크와 섞이면서 '깨끗한 따뜻함'을 만들어냅니다.</> : <>Where traditional woody perfumes lean on heavy sandalwood or cedar, K-fragrance uses the same materials at extreme dilution. The wood is there — but as a feeling, not a statement. Blended with musk, it creates what perfumers call "clean warmth" — present but never imposing.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🇰🇷 한국 향수 브랜드는 뭐가 다른가요?' : '🇰🇷 What makes Korean fragrance brands different?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>프랑스 향수가 '나를 드러내는 도구'라면, 한국 향수는 '나를 감싸는 공기'에 가까워요. <mark>탬버린즈, 논픽션, 그랑핸드 같은 브랜드들은 향수를 감각적 의식(ritual)의 일부로 포지셔닝합니다</mark> — 핸드크림, 캔들, 디퓨저까지 하나의 향 세계관으로 확장하죠. 성분도 설페이트, 파라벤, 프탈레이트 프리를 기본으로 하며, '클린 포뮬레이션'을 향수에도 적용하고 있어요.</>
          ) : (
            <>French perfume is a tool for self-expression. Korean perfume is closer to the air around you. <mark>Brands like Tamburins, Nonfiction, and Granhand position fragrance as part of a sensory ritual</mark> — extending a single scent world across hand creams, candles, diffusers, and car fragrances. Formulations default to sulfate-, paraben-, and phthalate-free, applying the same "clean" philosophy K-beauty brought to skincare.</>
          )}
        </ArtBody>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '탬버린즈 (Tamburins)', body: '달걀형 병으로 유명한 브랜드. 시소잎과 생강을 얹은 코코넛 밀크 향(Pumpkini) 같은 독특한 조합으로, 익숙한 듯 낯선 향을 만들어요.' },
            { title: '논픽션 (Nonfiction)', body: '식물 유래 원료 중심으로 "절대 과하지 않은" 향을 지향해요. 자연에서 영감받은 이름과 내면의 평온을 테마로 합니다.' },
            { title: '그랑핸드 (Granhand)', body: '서울 성수동에서 시작한 브랜드로, 향을 일상의 감각 경험으로 확장합니다. 핸드크림부터 공간 향까지 하나의 세계관.' },
          ] : [
            { title: 'Tamburins', body: 'Known for egg-shaped bottles and unexpected combinations — like Pumpkini (pumpkin + coconut milk + shiso leaf + ginger). Familiar notes made unfamiliar.' },
            { title: 'Nonfiction', body: 'Plant-derived ingredients, never overpowering. Names inspired by nature, designed around the idea of finding calm through scent rituals.' },
            { title: 'Granhand', body: 'Born in Seoul\'s Seongsu-dong. Extends fragrance into everyday sensory experience — hand cream, room spray, candles, all one world.' },
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
          {isKo ? '✨ 지금 써볼 만한 K-프래그런스' : '✨ K-fragrances worth trying now'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Tamburins', name: 'Perfume Chamo', note: isKo ? '리날로올 탑, 시프리올 하트 — 침착하고 서서히 펼쳐지는 스킨 센트' : 'Linalool top, cypriol heart — calm, slow-unfurling skin scent' },
            { brand: 'Nonfiction', name: 'Gentle Night Eau de Parfum', note: isKo ? '화이트 머스크 + 시어 우드 — 잠들기 전 의식처럼 쓰는 향' : 'White musk + sheer wood — a bedtime ritual in scent form' },
            { brand: 'Borntostandout', name: 'Naked Mind', note: isKo ? '앰브록산 베이스의 미니멀 머스크 — "향수를 안 뿌린 것 같은" 향수' : 'Ambroxan-based minimal musk — perfume that smells like not wearing perfume' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--sage)" />)}
        </div>
      </ArtSection>

    </div>
  );
}

/* ─── Article: Pistachio Fragrance Note ──────────────────────────────────── */

function PistachioBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 피스타치오가 2026년 향수 업계에서 전년 대비 852% 성장한 노트로 떠올랐어요. 견과류 자체를 쓰는 게 아니라, 락톤(γ-운데카락톤), 피라진(2-아세틸 피라진), 벤즈알데히드를 조합해 '크리미하고 따뜻한' 후각적 인상을 합성합니다. 두바이 초콜릿 바이럴에서 시작된 이 트렌드는 구르망 향수의 진화를 보여줘요.</>
        ) : (
          <><strong>TL;DR:</strong> Pistachio is 2026's fastest-rising fragrance note — up 852% year-over-year. Perfumers don't use the nut itself. They build a synthetic accord from lactones (γ-undecalactone), pyrazines (2-acetyl pyrazine), and benzaldehyde to create the impression of "creamy warmth." What started with a viral Dubai chocolate moment is now reshaping gourmand perfumery.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1502825751399-28baa9b81efe?auto=format&fit=crop&q=80&w=1200"
        alt="Pistachios in a bowl, representing the trending pistachio fragrance note in perfumery"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '📈 왜 갑자기 피스타치오인가요?' : '📈 Why pistachio, why now?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>2024년 말, 두바이 초콜릿 바이럴이 피스타치오를 전 세계적인 '맛의 아이콘'으로 만들었어요. 그 물결이 향수까지 왔습니다. <mark>피스타치오 노트는 전년 대비 852% 성장하며 2026년 가장 빠르게 뜨는 향료가 됐어요.</mark> 달콤하기만 한 기존 구르망 향수에 질린 소비자들이 <strong>질감이 있고 깊이 있는 따뜻함</strong>을 찾기 시작한 거예요.</>
          ) : (
            <>The Dubai chocolate viral moment of late 2024 turned pistachio into a global flavor icon. That wave reached perfumery. <mark>Pistachio notes are up 852% year-over-year, making it 2026's fastest-rising fragrance ingredient.</mark> Consumers tired of one-dimensional sweet gourmands are looking for <strong>warmth with texture and depth</strong> — and pistachio delivers exactly that.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '📊 852% 성장', desc: '피스타치오 향료 노트의 전년 대비 인기 상승률.' },
            { title: '🍫 두바이 초콜릿 효과', desc: '2024년 바이럴에서 시작된 피스타치오 열풍이 향수 산업까지 확산.' },
            { title: '🧪 합성 어코드', desc: '진짜 견과류가 아닌, 여러 분자를 조합해 만든 후각적 인상.' },
          ] : [
            { title: '📊 852% growth', desc: 'Pistachio note popularity increase year-over-year.' },
            { title: '🍫 Dubai chocolate effect', desc: 'The 2024 viral moment that launched pistachio into fragrance.' },
            { title: '🧪 Synthetic accord', desc: 'Not the actual nut — a combination of molecules that creates the impression.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🔬 피스타치오 향은 어떤 분자로 만들까요?' : '🔬 What molecules make a pistachio scent?'}
        </ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🥜" title={isKo ? '피라진 — 고소한 따뜻함의 정체' : 'Pyrazines — the source of nutty warmth'} borderColor="rgba(107,142,107,0.3)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <><strong>2-아세틸 피라진(2-Acetyl Pyrazine)</strong>은 "팝콘 피라진"이라고도 불리는 분자로, 볶은 견과류·빵·팝콘에서 나는 고소한 향의 원인이에요. 피스타치오 어코드의 '따뜻하고 구운 느낌'을 만드는 핵심 원료입니다.</> : <><strong>2-Acetyl pyrazine</strong> — sometimes called "popcorn pyrazine" — is the molecule behind the toasted, nutty aroma in roasted nuts, bread, and popcorn. It's the backbone of the "warm, baked" quality in pistachio accords.</>}
          </ArtCallout>
          <ArtCallout icon="🍑" title={isKo ? '락톤 — 벨벳 같은 크리미함' : 'Lactones — velvety creaminess'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <><strong>γ-운데카락톤(γ-Undecalactone)</strong>은 "피치 락톤"이라고 불리며, <mark>피스타치오 향 포뮬러의 20~25%를 차지하는 크리미한 중간 단계</mark>를 만들어요. 여기에 <strong>γ-노나락톤</strong>이 더해지면 열대 과일 같은 부드러움이 생깁니다. 이 두 락톤이 피스타치오를 "음식"이 아닌 "향수"로 느끼게 하는 비결이에요.</> : <><strong>γ-Undecalactone</strong> — the "peach lactone" — creates <mark>the velvety mid-phase that makes up 20–25% of a pistachio formula</mark>. Add <strong>γ-nonalactone</strong> for tropical creaminess. These two lactones are what make pistachio smell like perfume rather than food.</>}
          </ArtCallout>
          <ArtCallout icon="🍬" title={isKo ? '벤즈알데히드 — 마지팬의 달콤함' : 'Benzaldehyde — marzipan sweetness'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>벤즈알데히드 유도체는 아몬드·마지팬 같은 달콤한 견과류 느낌을 더해요. 피라진의 고소함, 락톤의 크리미함과 합쳐지면 <strong>'따뜻하고 포근하지만 무겁지 않은'</strong> 현대 구르망 향수의 시그니처가 완성됩니다.</> : <>Benzaldehyde derivatives add the sweet, almond-marzipan facet. Combined with pyrazine warmth and lactone creaminess, they complete the signature of modern gourmand pistachio — <strong>warm and cozy without being heavy</strong>.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🧊 좋은 피스타치오 향수 vs 나쁜 피스타치오 향수' : '🧊 What separates a good pistachio fragrance from a bad one?'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '균형이 핵심', body: '피라진만 많으면 팝콘 냄새, 락톤만 많으면 인공적인 크림 냄새가 나요. 좋은 피스타치오 향수는 세 분자군의 비율이 정확하게 맞아야 합니다.' },
            { title: '달콤함의 절제', body: '2026년 구르망 트렌드는 "다크 구르망" — 디저트처럼 달기만 한 향은 사라지고 있어요. 피스타치오도 짠맛, 쓴맛, 우디 노트와 대비를 이뤄야 세련됩니다.' },
            { title: '니치에서 빛나는 이유', body: '피스타치오 오일을 15%까지 사용하는 니치 브랜드도 있어요. 합성 어코드만으로는 낼 수 없는 진짜 로스팅된 따뜻함을 원한다면 원료 투자가 필요합니다.' },
          ] : [
            { title: 'Balance is everything', body: 'Too many pyrazines = popcorn. Too many lactones = artificial cream. A good pistachio fragrance gets the ratio between all three molecular families exactly right.' },
            { title: 'Restraint on sweetness', body: "The 2026 gourmand trend is 'dark gourmand' — dessert-sweet is fading. Pistachio needs salt, bitterness, and woody contrast to feel sophisticated, not juvenile." },
            { title: 'Why niche does it better', body: 'Some niche houses use cold-pressed pistachio oil at up to 15% concentration. That genuine roasted warmth is expensive — and impossible to replicate with synthetics alone.' },
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
          {isKo ? '✨ 피스타치오 노트가 빛나는 향수들' : '✨ Pistachio fragrances worth smelling'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Maison Margiela', name: "Replica Coffee Break", note: isKo ? '라벤더 + 피스타치오 어코드 — 고소한 카페 라떼의 후각적 재현' : 'Lavender + pistachio accord — an olfactory latte moment' },
            { brand: 'Xerjoff', name: 'Pikovaya Dama', note: isKo ? '진짜 피스타치오 오일 사용 — 깊고 로스팅된 따뜻함이 하루 종일' : 'Real pistachio oil — deep roasted warmth that lasts all day' },
            { brand: 'Sol de Janeiro', name: 'Cheirosa 87', note: isKo ? '피스타치오 + 살티 카라멜 — 달콤함과 짠맛의 완벽한 긴장감' : 'Pistachio + salted caramel — perfect sweet-salty tension' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--sage)" />)}
        </div>
      </ArtSection>

    </div>
  );
}

/* ─── Article: Fragrance Wardrobing ──────────────────────────────────────── */

function FragranceWardrobingBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 같은 향수를 매일 뿌리면 15~20분 후 내 코가 감지를 멈춰요. 이건 후각 피로(olfactory habituation)라는 뇌의 생존 메커니즘입니다. 해결법은 더 많이 뿌리는 게 아니라, 향수를 옷장처럼 돌려 쓰는 "프래그런스 워드로빙"이에요. 2026년, 시그니처 향수의 시대는 끝나고 향수 옷장의 시대가 왔습니다.</>
        ) : (
          <><strong>TL;DR:</strong> If you wear the same perfume daily, your nose stops registering it after 15–20 minutes. That's olfactory habituation — a survival mechanism, not a flaw. The fix isn't spraying more. It's rotating scents like a wardrobe. In 2026, the signature scent is dead. The fragrance wardrobe is what works.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1615634260830-85d92cd1b769?auto=format&fit=crop&q=80&w=1200"
        alt="Collection of perfume bottles arranged like a wardrobe, representing fragrance rotation"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🧠 왜 내 향수가 안 느껴질까요?' : '🧠 Why can\'t you smell your own perfume?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>향수를 뿌리고 20분이 지나면 "향이 날아갔나?" 생각하게 되죠. 하지만 향은 그대로 있어요 — <mark>내 코가 더 이상 감지하지 않는 것뿐입니다.</mark> 이걸 <strong>후각 습관화(olfactory habituation)</strong>라고 해요. 같은 냄새에 계속 노출되면 후각 수용체의 반응이 둔해지면서, 뇌가 그 향을 "안전한 배경 정보"로 분류하고 무시합니다. 고장이 아니라 <strong>새로운 냄새를 감지하기 위한 생존 메커니즘</strong>이에요.</>
          ) : (
            <>Twenty minutes after spraying, you think your perfume has faded. It hasn't — <mark>your nose just stopped registering it.</mark> This is <strong>olfactory habituation</strong>. When your olfactory receptors are continuously exposed to the same scent molecules, they become less responsive. Your brain categorizes that smell as "safe background information" and filters it out — freeing resources to detect new, potentially important smells. It's not a flaw. <strong>It's a survival mechanism.</strong></>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '⏱️ 15~20분', desc: '같은 향에 대한 후각 수용체 반응이 둔해지기 시작하는 시간.' },
            { title: '🧬 진화적 설계', desc: '익숙한 냄새를 무시해야 새로운 위험 신호를 빠르게 감지할 수 있어요.' },
            { title: '👃 향은 그대로', desc: '주변 사람은 여전히 내 향수를 맡아요. 못 느끼는 건 나뿐입니다.' },
          ] : [
            { title: '⏱️ 15–20 minutes', desc: 'Time before your olfactory receptors start tuning out a constant scent.' },
            { title: '🧬 Evolutionary design', desc: 'Filtering out familiar smells lets you detect new danger signals faster.' },
            { title: '👃 The scent is still there', desc: "Others can still smell your perfume. You're the only one who can't." },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '👗 프래그런스 워드로빙이란?' : '👗 What is fragrance wardrobing?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>옷을 매일 같은 걸 입지 않듯이, 향수도 돌려 쓰는 거예요. <mark>다른 향 계열(시트러스, 우디, 머스크, 플로럴)을 번갈아 뿌리면 후각 수용체가 매번 "새로운 자극"으로 인식</mark>합니다. 월요일에 뿌린 시트러스 향을 다음 주 월요일에 다시 뿌리면, 코가 쉬었다 돌아왔기 때문에 처음처럼 신선하게 느껴져요.</>
          ) : (
            <>You don't wear the same outfit every day. Why wear the same scent? <mark>Rotating between different fragrance families — citrus, woody, musky, floral — keeps your olfactory receptors recognizing each one as a "new stimulus."</mark> When you return to Monday's citrus scent the following week, your nose has had enough time away to experience it as fresh again.</>
          )}
        </ArtBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🔄" title={isKo ? '3~4개면 충분해요' : '3–4 scents is all you need'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>향수 옷장은 수십 병이 필요한 게 아니에요. 서로 다른 향 계열에서 3~4개만 골라 2~3일 간격으로 돌리면 후각 피로를 효과적으로 방지할 수 있어요. 핵심은 양이 아니라 다양성입니다.</> : <>You don't need dozens of bottles. Pick 3–4 fragrances from different scent families and rotate every 2–3 days. That's enough to prevent habituation. The key isn't quantity — it's variety across molecular profiles.</>}
          </ArtCallout>
          <ArtCallout icon="🌬️" title={isKo ? '일주일에 1~2일은 쉬세요' : 'Go fragrance-free 1–2 days a week'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <>향수를 아예 안 뿌리는 날을 만들면 후각 시스템이 완전히 리셋돼요. 다음에 향수를 뿌렸을 때 훨씬 생생하게 느껴지고, 향에 대한 전반적인 둔감화도 예방됩니다.</> : <>Complete fragrance-free days give your olfactory system a full reset. When you spray again, the scent hits with renewed clarity — and you prevent the gradual overall desensitization that comes from never giving your nose a break.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🧪 향 계열별 워드로빙 가이드' : '🧪 How to build your fragrance wardrobe by family'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '🍋 시트러스 / 프레시', body: '베르가못, 자몽, 네롤리. 가벼운 분자라 빠르게 날아가지만 후각 리셋 효과가 탁월해요. 워드로빙의 "클렌저" 역할.' },
            { title: '🌲 우디 / 앰버', body: '샌달우드, 시더, 베티버, 앰브록산. 무거운 분자라 피부에 오래 남아요. 워드로빙에서 "앵커" 역할을 합니다.' },
            { title: '🤍 머스크 / 스킨 센트', body: '화이트 머스크, 클린 노트. 다른 향과의 대비가 적어 쉬는 날 대용으로 좋아요. K-프래그런스가 여기에 해당.' },
            { title: '🌸 플로럴 / 스파이시', body: '로즈, 자스민, 사프란, 카다몸. 중간 무게의 분자들이라 시트러스와 우디 사이에서 균형을 잡아줘요.' },
          ] : [
            { title: '🍋 Citrus / Fresh', body: "Bergamot, grapefruit, neroli. Light molecules that fade fast but are excellent for resetting your nose. The 'cleanser' of your wardrobe." },
            { title: '🌲 Woody / Amber', body: "Sandalwood, cedar, vetiver, ambroxan. Heavy molecules that linger on skin. The 'anchor' of your rotation." },
            { title: '🤍 Musk / Skin Scent', body: "White musk, clean notes. Low contrast with other scents — good as a rest-day alternative. K-fragrance lives here." },
            { title: '🌸 Floral / Spicy', body: "Rose, jasmine, saffron, cardamom. Mid-weight molecules that bridge citrus and woody days." },
          ]).map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </ArtSection>

    </div>
  );
}
