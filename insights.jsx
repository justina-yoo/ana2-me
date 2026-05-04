// Insights — editorial feed with full article bodies

// Convert "May 3, 2026" → "2026-05-03"
function dateToPrefix(dateStr) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function postSlug(post) {
  return dateToPrefix(post.date) + '/' + post.id;
}

window.Insights = function Insights({ lang, density, query }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [activeTag, setActiveTag] = useState(null);
  const isKo = lang === 'ko';

  // Logo click → go home
  useEffect(() => {
    const handler = () => {
      setSelectedPost(null);
      setActiveTag(null);
      history.pushState({}, '', '/insights');
      if (window.SEO) window.SEO.setHome();
      setTimeout(() => window.scrollTo(0, 0), 10);
    };
    window.addEventListener('ana2me:go-home', handler);
    return () => window.removeEventListener('ana2me:go-home', handler);
  }, []);

  // On mount, check if URL path matches an article
  // Supports both /2026-05-04/article-id and legacy /article-id
  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
    if (path && path !== 'insights') {
      const parts = path.split('/');
      const articleId = parts.length >= 2 ? parts[parts.length - 1] : parts[0];
      const match = POSTS.find(p => p.id === articleId);
      if (match) {
        setSelectedPost(match);
        if (window.SEO) window.SEO.setArticle(match.id);
      }
    }
  }, []);

  const POSTS = [
    {
      id: 'centella-superbug-discovery',
      category: { en: 'Molecular Insights', ko: '분자 인사이트' },
      title: {
        en: "The \"Cica\" Ingredient in Every K-Beauty Cream Just Got a Radical New Superpower.",
        ko: '모든 시카 크림에 든 그 성분, 항생제 내성균까지 잡는다는 연구가 나왔습니다',
      },
      excerpt: {
        en: "Madecassic acid — the active compound behind every cica cream on the market — can kill antibiotic-resistant E. coli by targeting a protein humans don't have. A University of Kent study just gave K-beauty's most familiar ingredient a completely unexpected second act.",
        ko: '시카 크림의 핵심 성분인 마데카소산이 항생제 내성 대장균을 죽일 수 있다는 연구 결과가 나왔어요. 인간에게 없는 세균 단백질만 공격하는 방식으로, K-뷰티의 가장 익숙한 성분이 완전히 새로운 가능성을 열었습니다.',
      },
      readTime: { en: '6 min read', ko: '6분 읽기' },
      date: 'May 4, 2026',
      tag: { en: 'Skincare', ko: '스킨케어' },
      tagColor: 'var(--accent)',
      imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800',
      keywords: 'centella asiatica cica madecassic acid madecassoside asiaticoside antibiotic resistance cytochrome bd antibacterial E. coli superbug barrier repair collagen inflammation 센텔라 시카 마데카소산 항생제 내성균',
    },
    {
      id: 'spicules-microneedling',
      category: { en: 'Molecular Insights', ko: '분자 인사이트' },
      title: {
        en: "\"Microneedling in a Bottle\" Is K-Beauty's Most Controversial New Ingredient. Here's the Science.",
        ko: '"병 속의 마이크로니들링" — K-뷰티 최대 논란의 성분, 과학으로 따져봤습니다',
      },
      excerpt: {
        en: "Spicules are microscopic needles from freshwater sponges that create micro-channels in skin, boosting active ingredient penetration and triggering collagen production. Same principle as professional microneedling — but at home. K-beauty's hottest ingredient of 2026.",
        ko: '스피큘은 해면에서 추출한 미세 바늘로, 피부에 마이크로 채널을 만들어 성분 흡수와 콜라겐 재생을 유도해요. 전문 마이크로니들링과 같은 원리를 집에서. 2026년 K-뷰티 최대 화제 성분입니다.',
      },
      readTime: { en: '6 min read', ko: '6분 읽기' },
      date: 'May 3, 2026',
      tag: { en: 'Skincare', ko: '스킨케어' },
      tagColor: 'var(--accent)',
      imageUrl: 'https://images.unsplash.com/photo-1695479044464-67299fa84782?auto=format&fit=crop&q=80&w=800',
      keywords: 'spicules microneedling marine sponge spongilla collagen micro-channels wound healing calcium silicate keratinocyte stratum corneum 스피큘 마이크로니들링 해면 콜라겐',
    },
    {
      id: 'myo-inositol-hormonal-health',
      category: { en: 'Nutritional Intelligence', ko: '영양 인텔리전스' },
      title: {
        en: "Myo-Inositol Is Quietly Becoming the Most Important Women's Wellness Supplement.",
        ko: '미오이노시톨, 여성 웰니스에서 가장 주목받는 성분이 된 이유',
      },
      excerpt: {
        en: "Myo-inositol improves insulin signaling — the upstream trigger behind PCOS, hormonal acne, and ovulation problems. Clinical studies show the 40:1 myo/D-chiro ratio reduces fasting insulin and restores hormonal balance. It's becoming the go-to before prescriptions.",
        ko: '미오이노시톨은 인슐린 신호 전달을 개선해 PCOS, 호르몬성 여드름, 배란 장애의 근본 원인에 작용해요. 40:1 비율이 핵심이며, 처방 전 첫 번째 선택지로 떠오르고 있습니다.',
      },
      readTime: { en: '7 min read', ko: '7분 읽기' },
      date: 'May 3, 2026',
      tag: { en: 'Wellness', ko: '웰니스' },
      tagColor: '#a07850',
      imageUrl: 'https://images.unsplash.com/photo-1596572934426-52ac4e95e014?auto=format&fit=crop&q=80&w=800',
      keywords: 'myo-inositol D-chiro-inositol PCOS insulin resistance hormonal acne ovulation menstrual cycle androgens 40:1 ratio supplement 미오이노시톨 인슐린 호르몬 여드름 배란',
    },
    {
      id: 'edible-skincare-gut-skin',
      category: { en: 'Nutritional Intelligence', ko: '영양 인텔리전스' },
      title: {
        en: "Korea Is Eating Its Skincare Now. The Gut-Skin Science Says They're Right.",
        ko: '한국이 화장품을 "먹기" 시작했습니다. 장-피부 과학이 증명하는 이유',
      },
      excerpt: {
        en: "Olive Young's inner beauty category grew 55% year-over-year. The science behind it is the gut-skin axis — short-chain fatty acids from gut bacteria directly regulate skin inflammation and barrier function. Collagen drinks and probiotics aren't hype. They're biology.",
        ko: '올리브영 이너뷰티 매출이 55% 급증했어요. 핵심은 장-피부 축 — 장내 세균이 만드는 단쇄지방산이 피부 염증과 장벽 기능을 직접 조절합니다. 먹는 스킨케어는 마케팅이 아니라 생물학이에요.',
      },
      readTime: { en: '7 min read', ko: '7분 읽기' },
      date: 'May 3, 2026',
      tag: { en: 'Wellness', ko: '웰니스' },
      tagColor: '#a07850',
      imageUrl: 'https://images.unsplash.com/photo-1620755901989-0f457a38011e?auto=format&fit=crop&q=80&w=800',
      keywords: 'edible skincare inner beauty gut-skin axis SCFA short-chain fatty acids collagen peptides probiotics postbiotics Lactobacillus Bifidobacterium prebiotics Olive Young 이너뷰티 장피부축 프로바이오틱스 콜라겐',
    },
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
      date: 'May 1, 2026',
      tag: { en: 'Fragrance', ko: '향수' },
      tagColor: 'var(--sage)',
      imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800',
      keywords: 'K-fragrance skin scent Korean perfume white musk ambroxan sheer woods synthetic musks Tamburins Nonfiction Granhand clean fragrance exports 한국향수 머스크 탐버린즈 논픽션',
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
      date: 'May 1, 2026',
      tag: { en: 'Fragrance', ko: '향수' },
      tagColor: 'var(--sage)',
      imageUrl: 'https://images.unsplash.com/photo-1502825751399-28baa9b81efe?auto=format&fit=crop&q=80&w=800',
      keywords: 'pistachio fragrance note gourmand pyrazine lactones benzaldehyde marzipan synthetic accord Dubai chocolate aroma molecules perfumery olfactory 피스타치오 향료 구르망',
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
      date: 'May 1, 2026',
      tag: { en: 'Fragrance', ko: '향수' },
      tagColor: 'var(--sage)',
      imageUrl: 'https://images.unsplash.com/photo-1615634260830-85d92cd1b769?auto=format&fit=crop&q=80&w=800',
      keywords: 'olfactory habituation fragrance rotation wardrobe scent families nose blindness perfume tolerance olfactory receptors signature scent 후각피로 향수옷장 시그니처향',
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
      date: 'May 1, 2026',
      tag: { en: 'Wellness', ko: '웰니스' },
      tagColor: '#a07850',
      imageUrl: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=800',
      keywords: 'postbiotics probiotics prebiotics bifida ferment lysate lactobacillus galactomyces fermentation microbiome skin barrier sensitivity immune 포스트바이오틱스 비피다 유산균 발효',
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
      date: 'May 1, 2026',
      tag: { en: 'Skincare', ko: '스킨케어' },
      tagColor: 'var(--accent)',
      imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800',
      keywords: 'PDRN salmon DNA polydeoxyribonucleotide nucleotides collagen regeneration fibroblasts A2A adenosine receptor growth factors melasma dark spots injectable topical liposomal 연어 DNA 콜라겐 재생',
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
      date: 'Apr 1, 2026',
      tag: { en: 'Skincare', ko: '스킨케어' },
      tagColor: 'var(--accent)',
      imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      keywords: 'skin barrier ceramides lipids TEWL cica madecassoside squalane sebum HEV light PM2.5 pH acid mantle barrier repair bakuchiol 피부장벽 세라마이드 수분손실',
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
      date: 'Mar 15, 2026',
      tag: { en: 'Fragrance', ko: '향수' },
      tagColor: 'var(--sage)',
      imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=800',
      keywords: 'volatility molecular weight vapor pressure top notes heart base fixatives Iso E Super ambroxan macrocyclic musks citrus aldehydes dry-down sillage skin chemistry 분자량 증기압 향수노트',
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
      date: 'Mar 15, 2026',
      tag: { en: 'Wellness', ko: '웰니스' },
      tagColor: '#a07850',
      imageUrl: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=800',
      keywords: 'adaptogens ashwagandha lion\'s mane reishi bioavailability HPA axis cortisol withanolides KSM-66 NGF nerve growth factor piperine liposomal phytosomal 어댑토젠 아슈와간다 영지버섯 생체이용률',
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
      date: 'Feb 1, 2026',
      tag: { en: 'Skincare', ko: '스킨케어' },
      tagColor: 'var(--accent)',
      imageUrl: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=800',
      keywords: 'fermentation galactomyces lactobacillus bifidobacterium microbial metabolism bioavailability ferment filtrate lysate enzyme polysaccharides amino acids sake brewery 발효 갈락토미세스 비피다 효소',
    },
  ];

  const openPost = (p) => {
    setSelectedPost(p);
    const slug = postSlug(p);
    history.pushState({}, '', '/' + slug);
    if (window.SEO) window.SEO.setArticle(p.id);
    if (window.gtag) gtag('event', 'page_view', { page_path: '/' + slug, page_title: p.title.en });
    window.scrollTo(0, 0);
  };

  const closePost = () => {
    setSelectedPost(null);
    history.pushState({}, '', '/insights');
    if (window.SEO) window.SEO.setHome();
    if (window.gtag) gtag('event', 'page_view', { page_path: '/insights', page_title: 'ana2me — Insights' });
    window.scrollTo(0, 0);
  };

  if (selectedPost) {
    return React.createElement(PostDetail, {
      post: selectedPost,
      lang,
      onBack: closePost,
      allPosts: POSTS,
      onSelectPost: openPost,
    });
  }

  const q = (query || '').trim().toLowerCase();
  let filteredPosts = activeTag ? POSTS.filter(p => p.tag.en === activeTag) : POSTS;
  if (q) {
    filteredPosts = filteredPosts.filter(p => {
      const haystack = [
        p.title.en, p.title.ko,
        p.excerpt.en, p.excerpt.ko,
        p.tag.en, p.tag.ko,
        p.category.en, p.category.ko,
        p.keywords || '',
      ].join(' ').toLowerCase();
      return q.split(/\s+/).every(word => haystack.includes(word));
    });
  }

  return React.createElement(InsightsFeed, {
    posts: filteredPosts,
    allPosts: POSTS,
    lang,
    density,
    activeTag,
    query: q,
    onTagClick: (tag) => setActiveTag(activeTag === tag ? null : tag),
    onSelectPost: openPost,
  });
};

/* ─── Feed ─────────────────────────────────────────────────────────────────── */

function InsightsFeed({ posts, allPosts, lang, density, activeTag, query, onTagClick, onSelectPost }) {
  const t = useL(lang);
  const allTags = [...new Map(allPosts.map(p => [p.tag.en, p])).values()].map(p => ({ en: p.tag.en, color: p.tagColor }));

  return (
    <div className={cn('insights', `dens-${density}`)}>
      {!query && (
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
      )}

      {!query && (
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
      )}

      <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 0 }}>
        {posts.length === 0 && query && (
          <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--ink-faint)' }}>
            <p style={{ fontSize: 15, margin: 0 }}>{t('No articles found for', '검색 결과가 없습니다:')} "{query}"</p>
          </div>
        )}
        {posts.map((post, idx) => {
          // Pattern: hero at 0, compact 1-3, hero at 4, compact 5-7, ...
          // When searching, show all as compact
          const isHero = !query && idx % 4 === 0;

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
  'centella-superbug-discovery': 'CentellaSuperbugBody',
  'spicules-microneedling': 'SpiculesBody',
  'myo-inositol-hormonal-health': 'MyoInositolBody',
  'edible-skincare-gut-skin': 'EdibleSkincareBody',
  'k-fragrance-skin-scents': 'KFragranceBody',
  'pistachio-fragrance-note': 'PistachioBody',
  'fragrance-wardrobing': 'FragranceWardrobingBody',
  'postbiotics-skin-barrier': 'PostbioticsBody',
  'skin-barrier-2026': 'SkinBarrierBody',
  'fragrance-volatility': 'FragranceVolatilityBody',
  'adaptogens-bioavailability': 'AdaptogensBody',
  'fermentation-transformation': 'FermentationBody',
  'pdrn-salmon-dna': 'PDRNBody',
};

function PostDetail({ post, lang, onBack, allPosts, onSelectPost }) {
  const Body = window[ARTICLE_BODIES[post.id]] || null;
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
            fontSize: 'clamp(24px, 3.2vw, 38px)', lineHeight: 1.1,
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

        {/* Related articles */}
        {allPosts && (() => {
          const related = allPosts
            .filter(p => p.id !== post.id)
            .sort((a, b) => (a.tag.en === post.tag.en ? -1 : 1) - (b.tag.en === post.tag.en ? -1 : 1))
            .slice(0, 3);
          return (
            <section style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, letterSpacing: '-0.01em', margin: '0 0 18px', color: 'var(--ink)' }}>
                {isKo ? '📖 다음에 읽어볼 글' : '📖 Read next'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {related.map(r => (
                  <button
                    key={r.id}
                    onClick={() => { onSelectPost(r); window.scrollTo(0, 0); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      width: '100%', textAlign: 'left',
                      background: 'none', border: 'none',
                      borderBottom: '1px solid var(--line)',
                      cursor: 'pointer', padding: '14px 0',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <h4 style={{
                        fontFamily: 'var(--font-display)', fontWeight: 500,
                        fontSize: 'clamp(14px, 1.6vw, 17px)', lineHeight: 1.25,
                        margin: 0, color: 'var(--ink)',
                        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      }}>
                        {r.title[lang] || r.title.en}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: r.tagColor }}>{r.tag[lang] || r.tag.en}</span>
                        <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--line)', display: 'inline-block' }} />
                        <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{r.date}</span>
                      </div>
                    </div>
                    <ProductImg
                      src={r.imageUrl}
                      alt={r.title[lang] || r.title.en}
                      style={{ width: 72, height: 72, borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }}
                    />
                  </button>
                ))}
              </div>
            </section>
          );
        })()}
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

/* ─── Article: Centella Superbug Discovery ────────────────────────────────── */

window.CentellaSuperbugBody = function CentellaSuperbugBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 시카 크림의 핵심 활성 성분인 마데카소산(Madecassic Acid)이 항생제 내성 대장균을 억제할 수 있다는 연구가 발표됐어요. 세균이 호흡에 사용하는 시토크롬 bd 복합체를 차단하는 방식인데, 이 단백질은 인간에겐 없어서 부작용 가능성이 낮습니다.</>
        ) : (
          <><strong>TL;DR:</strong> Madecassic acid — the active compound in every cica cream — can halt antibiotic-resistant E. coli by blocking the cytochrome bd complex, a protein bacteria need to breathe but humans don't have. A University of Kent study just opened a completely new chapter for K-beauty's most familiar ingredient.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1200"
        alt="Green herbal leaves close-up, representing Centella asiatica used in K-beauty skincare"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '시카 크림 속 그 성분, 정확히 뭘까요?' : 'What exactly is inside your cica cream?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>센텔라 아시아티카(Centella Asiatica)는 K-뷰티에서 가장 많이 쓰이는 진정 성분이에요. 흔히 "시카"라고 부르죠. 이 식물에는 네 가지 핵심 화합물이 들어 있는데 — <strong>마데카소사이드</strong>, 아시아티코사이드, 아시아틱산, 그리고 <mark>마데카소산(Madecassic Acid)</mark>이에요. 대부분의 시카 크림은 이 네 가지를 함께 추출해서 사용합니다.</>
          ) : (
            <>Centella asiatica is the most widely used calming ingredient in K-beauty — the plant behind every product labeled "cica." It contains four key compounds: <strong>madecassoside</strong>, asiaticoside, asiatic acid, and <mark>madecassic acid</mark>. Most cica creams extract all four together. Until now, the conversation has been almost entirely about soothing irritation and repairing the skin barrier.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '마데카소사이드', desc: '센텔라에서 가장 많이 함유된 성분. 콜라겐 합성과 피부 장벽 회복을 촉진해요.' },
            { title: '아시아티코사이드', desc: '섬유아세포를 활성화해서 1형 콜라겐 생산을 늘려줍니다.' },
            { title: '마데카소산', desc: '항염 효과로 알려졌고, 이번에 항균 능력까지 발견됐어요.' },
          ] : [
            { title: 'Madecassoside', desc: 'The most abundant compound in centella. Drives collagen synthesis and barrier recovery.' },
            { title: 'Asiaticoside', desc: 'Activates fibroblasts — the cells that build your skin\'s structural framework — to produce type I collagen.' },
            { title: 'Madecassic Acid', desc: 'Known for anti-inflammatory effects. Now discovered to have antibacterial powers too.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '세균을 "질식"시키는 메커니즘' : 'How it suffocates bacteria'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>2026년 4월, 켄트 대학교와 UCL 공동 연구팀이 RSC Medicinal Chemistry에 발표한 논문이 주목받고 있어요. 연구팀은 컴퓨터 시뮬레이션과 실험실 테스트를 병행해서 <mark>마데카소산이 세균의 호흡 시스템을 직접 차단한다</mark>는 걸 밝혀냈습니다.</>
          ) : (
            <>In April 2026, a team at the University of Kent and UCL published a study in RSC Medicinal Chemistry that changed the conversation. Using computational screening combined with lab experiments, they discovered that <mark>madecassic acid directly blocks the respiratory system of bacteria</mark> — essentially suffocating them.</>
          )}
        </ArtBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🔬" title={isKo ? '시토크롬 bd 복합체' : 'Cytochrome bd Complex'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? '세균이 감염 중 생존하기 위해 사용하는 호흡 단백질이에요. 마데카소산은 이 단백질에 결합해서 ATP(에너지) 생산을 막습니다. 세균은 에너지를 만들 수 없으니 성장이 멈추는 거예요.' : 'A protein system that bacteria rely on to breathe and survive during infection. Madecassic acid binds to this complex, blocking ATP (energy) production. Without energy, the bacteria can\'t grow.'}
          </ArtCallout>
          <ArtCallout icon="🛡️" title={isKo ? '인간에게는 없는 단백질' : 'Humans don\'t have it'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? '시토크롬 bd 복합체는 인간이나 동물의 세포에 존재하지 않아요. 즉, 이 메커니즘으로 세균만 선택적으로 공격할 수 있어서 부작용 가능성이 매우 낮습니다.' : 'The cytochrome bd complex doesn\'t exist in human or animal cells. This means the compound can selectively target bacteria without damaging our own cells — a rare and valuable trait for any potential antibiotic.'}
          </ArtCallout>
          <ArtCallout icon="🧪" title={isKo ? '변형 화합물도 효과적' : 'Modified versions worked too'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? '연구팀은 베트남산 식물 샘플에서 마데카소산을 추출한 뒤 세 가지 변형 버전을 만들었어요. 세 가지 모두 시토크롬 bd 복합체를 차단했고, 한 버전은 높은 농도에서 대장균을 완전히 사멸시켰습니다.' : 'The team extracted madecassic acid from a Vietnamese plant sample and created three modified versions. All three blocked the cytochrome bd complex. One version killed E. coli outright at higher concentrations.'}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '내 시카 크림이 슈퍼버그를 죽인다는 뜻일까요?' : 'So does my cica cream kill superbugs?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>솔직하게 말하면 — 아직은 아니에요. 이 연구는 실험실 환경에서 진행된 초기 단계이고, 시카 크림을 피부에 바른다고 체내 감염이 치료되는 건 아닙니다. 하지만 <mark>의미 있는 건 방향성이에요</mark>. K-뷰티의 가장 흔한 성분 안에 항생제 개발의 실마리가 있었다는 거죠.</>
          ) : (
            <>Let's be honest — not yet. This is early-stage lab research, not a clinical trial. Applying cica cream to your face won't treat an internal infection. But <mark>the direction matters</mark>. One of the most common ingredients in K-beauty contains the blueprint for a potential new class of antibiotics — one that targets bacteria through a mechanism existing drugs don't use.</>
          )}
        </ArtBody>
        <ArtBody>
          {isKo ? (
            <>항생제 내성은 세계보건기구(WHO)가 '인류 건강에 대한 10대 위협' 중 하나로 꼽는 문제예요. 기존 항생제가 듣지 않는 세균이 늘어나는 상황에서, 완전히 새로운 작용 메커니즘을 가진 화합물의 발견은 그 자체로 의미가 큽니다.</>
          ) : (
            <>Antibiotic resistance is one of the WHO's top 10 global health threats. As existing antibiotics lose effectiveness against evolving bacteria, discovering a compound with an entirely new mechanism of action — from a plant already mass-produced for cosmetics — is significant on its own.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '시카 성분, 피부에는 여전히 최고입니다' : 'For your skin, cica is still as good as ever'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>항균 연구와 별개로, 센텔라 아시아티카는 피부 진정과 장벽 회복에 여전히 가장 검증된 성분 중 하나예요. 마데카소사이드는 콜라겐 합성을 촉진하고, 아시아티코사이드는 피부 조직 강화를 돕고, 마데카소산은 염증을 줄여줍니다. <mark>세 가지가 함께 작용할 때 가장 효과적이에요</mark>.</>
          ) : (
            <>Antibacterial research aside, centella asiatica remains one of the most well-validated ingredients for skin calming and barrier repair. Madecassoside drives collagen synthesis. Asiaticoside strengthens skin tissue. Madecassic acid reduces inflammation. <mark>The three work best together</mark> — which is exactly how most K-beauty cica products are formulated.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '✨ 추천 제품' : '✨ Products worth trying'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'SKIN1004', name: 'Madagascar Centella Ampoule', note: isKo ? '100% 센텔라 추출물. 즉각적인 진정과 장벽 회복에 집중한 가벼운 앰플이에요.' : '100% centella extract. Lightweight, fast-absorbing ampoule focused on instant calming and barrier recovery.' },
            { brand: 'COSRX', name: 'Pure Fit Cica Cream Intense', note: isKo ? 'Cica-7 복합체 61.2% 함유. 깊은 보습과 오래가는 진정 효과가 특징이에요.' : '61.2% Cica-7 Complex. Deep hydration with long-lasting calming — especially good for nighttime repair.' },
            { brand: 'Dr. Jart+', name: 'Cicapair Calming Gel Cream', note: isKo ? '시카페어 라인의 젤 크림. 센텔라와 미네랄을 결합한 독자적인 Green Science 포뮬러예요.' : 'The gel cream from the line that made cica mainstream. Combines centella with minerals in Dr. Jart\'s proprietary Green Science formula.' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--accent)" />)}
        </div>
      </ArtSection>

    </div>
  );
};

