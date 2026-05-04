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
  return 'article/' + post.tag.en.toLowerCase().replace(/\s+/g, '-') + '/' + dateToPrefix(post.date) + '/' + post.id;
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
      id: 'ten-step-routine-dead',
      category: { en: 'Molecular Insights', ko: '분자 인사이트' },
      title: {
        en: "The 10-Step Routine Is Dead. Korean Dermatologists Now Say 3 Steps Is Enough.",
        ko: '10단계 루틴은 끝났습니다. 한국 피부과 전문의가 말하는 3단계의 힘',
      },
      excerpt: {
        en: "67% of Korean women aged 20-35 use five or fewer products daily. The 10-step routine was never real K-beauty — it was a Western invention. Korean dermatologists now recommend cleanse, treat, moisturize. That's it.",
        ko: '한국 20-35세 여성의 67%가 매일 5개 이하의 제품을 사용해요. 10단계 루틴은 한국이 아니라 서양이 만든 이미지였습니다. 한국 피부과 전문의의 답은 세정, 치료, 보습. 이 세 가지예요.',
      },
      readTime: { en: '5 min read', ko: '5분 읽기' },
      date: 'May 4, 2026',
      tag: { en: 'Skincare', ko: '스킨케어' },
      tagColor: 'var(--accent)',
      imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
      keywords: 'routine 10 step minimalist 3 step dermatologist Korean skincare simplified barrier damage fewer products cleanser moisturizer serum 루틴 단계 미니멀 피부과 세정 보습',
    },
    {
      id: 'celebrity-skincare-methods',
      category: { en: 'Molecular Insights', ko: '분자 인사이트' },
      title: {
        en: "Song Hye-kyo Washes Her Face with Milk. Suzy Does \"424.\" Which Celebrity Methods Actually Work?",
        ko: '송혜교는 우유 세안, 수지는 424 세안법 — 셀럽 스킨케어, 과학적으로 따져봤습니다',
      },
      excerpt: {
        en: "Korean celebrity skincare methods go viral every week — milk rinses, heated palm absorption, timed cleansing rituals. We asked dermatologists which ones are backed by science and which are just good PR.",
        ko: '우유 세안, 손바닥 온열법, 시간 맞춤 클렌징까지. 매주 바이럴되는 한국 셀럽 스킨케어 비법들, 피부과학으로 하나씩 검증해봤어요.',
      },
      readTime: { en: '6 min read', ko: '6분 읽기' },
      date: 'May 4, 2026',
      tag: { en: 'Skincare', ko: '스킨케어' },
      tagColor: 'var(--accent)',
      imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800',
      keywords: 'Song Hye-kyo milk rinse Suzy 424 method Jessica Jung heated palm IU Korean celebrity actress idol skincare routine lactic acid double cleansing 송혜교 수지 제시카 셀럽 우유세안',
    },
    {
      id: 'jjimjilbang-wellness-science',
      category: { en: 'Nutritional Intelligence', ko: '영양 인텔리전스' },
      title: {
        en: "Jjimjilbangs Are Going Global. The Science Behind Korea's Oldest Wellness Ritual.",
        ko: '찜질방이 세계로 갑니다. 한국 최고(最古)의 웰니스 의식, 과학이 증명하는 효과',
      },
      excerpt: {
        en: "Korean bathhouses are driving a global wellness tourism boom — fueled by K-dramas and TikTok. The hot-cold contrast therapy isn't just tradition. Studies show it creates a vascular pump effect, lowers cortisol for up to 3 hours, and boosts growth hormone by up to 24x.",
        ko: 'K-드라마와 틱톡이 만든 찜질방 관광 붐. 온냉 대비 요법은 단순한 전통이 아니에요. 혈관 펌프 효과, 코르티솔 3시간 저하, 성장호르몬 최대 24배 증가 — 과학이 뒷받침합니다.',
      },
      readTime: { en: '6 min read', ko: '6분 읽기' },
      date: 'May 4, 2026',
      tag: { en: 'Wellness', ko: '웰니스' },
      tagColor: '#a07850',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?auto=format&fit=crop&q=80&w=800',
      keywords: 'jjimjilbang Korean bathhouse sauna cold plunge contrast therapy cortisol circulation vascular pump growth hormone K-drama wellness tourism 찜질방 사우나 냉탕 온냉 대비 웰니스',
    },
    {
      id: 'korea-sleep-crisis',
      category: { en: 'Nutritional Intelligence', ko: '영양 인텔리전스' },
      title: {
        en: "Korea Sleeps Less Than Almost Any Country on Earth. It Built an ₩11 Trillion Industry to Fix It.",
        ko: 'OECD 최하위 수면 시간, 한국이 만든 11조 원 규모의 수면 산업',
      },
      excerpt: {
        en: "Korea's sleep market exploded from ₩500 billion to ₩11 trillion in a decade. Olive Young's sleep supplement sales are up 300%. Plant-based melatonin, GABA gummies, and sleep-specific skincare — Korea isn't sleeping, so it's buying solutions.",
        ko: '10년 만에 5천억에서 11조로 성장한 한국 수면 시장. 올리브영 수면 건강식품 매출 300% 증가. 식물성 멜라토닌, GABA 구미, 수면 전용 스킨케어까지 — 못 자는 나라가 만든 거대한 산업입니다.',
      },
      readTime: { en: '6 min read', ko: '6분 읽기' },
      date: 'May 4, 2026',
      tag: { en: 'Wellness', ko: '웰니스' },
      tagColor: '#a07850',
      imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800',
      keywords: 'Korea sleep crisis insomnia melatonin plant-based GABA Olive Young sleep market trillion won OECD supplement digital therapeutics 수면 불면증 멜라토닌 GABA 올리브영',
    },
    {
      id: 'creatine-women-brain',
      category: { en: 'Nutritional Intelligence', ko: '영양 인텔리전스' },
      title: {
        en: "Creatine Isn't Just for Gym Bros. Women Are Taking It for Their Brains Now.",
        ko: '크레아틴, 근육이 아니라 뇌를 위해 먹는 여성들이 늘고 있습니다',
      },
      excerpt: {
        en: "Creatine supplementation boosts ATP production in the brain, reduces cognitive fatigue during PMS, and alleviates menopause-related brain fog. Searches for 'creatine for women' are up 123% — and the science backs the hype.",
        ko: '크레아틴 보충이 뇌의 ATP 생산을 높이고, 생리 전 인지 피로를 줄이며, 갱년기 브레인포그를 완화한다는 연구 결과가 쏟아지고 있어요. "여성 크레아틴" 검색량은 123% 증가했습니다.',
      },
      readTime: { en: '6 min read', ko: '6분 읽기' },
      date: 'May 4, 2026',
      tag: { en: 'Wellness', ko: '웰니스' },
      tagColor: '#a07850',
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
      keywords: 'creatine women brain ATP cognitive PMS menopause fatigue supplement gummies monohydrate muscle recovery menstrual cycle estrogen 크레아틴 여성 뇌 인지기능 갱년기 생리전증후군',
    },
    {
      id: 'milk-perfume-lactonic',
      category: { en: 'Olfactory Science', ko: '후각 과학' },
      title: {
        en: "Milk Perfume Is 2026's Defining Scent. Here's the Chemistry Behind \"Soft.\"",
        ko: '밀크 퍼퓸이 2026년을 정의하는 향이 된 이유 — "부드러움"의 화학',
      },
      excerpt: {
        en: "Lactonic fragrances don't actually smell like milk. They're built from cyclic ester molecules — gamma-decalactone, delta-decalactone — that your brain reads as 'creamy warmth.' The science of why comfort has a smell.",
        ko: '락토닉 향수는 사실 우유 냄새가 아니에요. 감마데카락톤, 델타데카락톤 같은 고리형 에스테르 분자가 만드는 "크리미한 따뜻함"이라는 후각적 인상입니다. 편안함에도 화학이 있어요.',
      },
      readTime: { en: '5 min read', ko: '5분 읽기' },
      date: 'May 4, 2026',
      tag: { en: 'Fragrance', ko: '향수' },
      tagColor: 'var(--sage)',
      imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800',
      keywords: 'milk perfume lactonic lactone gamma-decalactone delta-decalactone creamy vanilla tonka bean sandalwood comfort scent TikTok gourmand skin scent Commodity 밀크퍼퓸 락토닉 락톤 크리미 바닐라',
    },
    {
      id: 'tropical-fruit-fragrance',
      category: { en: 'Olfactory Science', ko: '후각 과학' },
      title: {
        en: "Tropical Fruit Notes Are Up 1,200%. Your Nose Is Craving Something Feral.",
        ko: '열대 과일 향이 1,200% 급등했습니다. 코가 본능적으로 원하는 것',
      },
      excerpt: {
        en: "Guava, passionfruit, and watermelon searches have surged 1,200% year-over-year in fragrance. It's not random — volatile sulfur compounds in tropical fruits trigger a uniquely intense neurological response that clean musks can't replicate.",
        ko: '구아바, 패션프루트, 수박 향료 검색이 전년 대비 1,200% 급증했어요. 열대 과일의 휘발성 황 화합물이 만드는 강렬한 신경 반응은 클린 머스크로는 대체할 수 없습니다.',
      },
      readTime: { en: '5 min read', ko: '5분 읽기' },
      date: 'May 4, 2026',
      tag: { en: 'Fragrance', ko: '향수' },
      tagColor: 'var(--sage)',
      imageUrl: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&q=80&w=800',
      keywords: 'tropical fruit fragrance guava passionfruit watermelon raspberry sulfur compounds volatile esters mango pear gourmand feral juicy TikTok 열대과일 향수 구아바 패션프루트 수박',
    },
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
  'ten-step-routine-dead': 'TenStepRoutineBody',
  'celebrity-skincare-methods': 'CelebritySkincareBody',
  'jjimjilbang-wellness-science': 'JjimjilbangBody',
  'korea-sleep-crisis': 'KoreaSleepBody',
  'creatine-women-brain': 'CreatineWomenBody',
  'milk-perfume-lactonic': 'MilkPerfumeBody',
  'tropical-fruit-fragrance': 'TropicalFruitBody',
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

/* ─── Article: Creatine for Women ────────────────────────────────────────── */

window.CreatineWomenBody = function CreatineWomenBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 크레아틴은 근육뿐 아니라 뇌의 에너지 생산(ATP)에도 핵심적인 역할을 해요. 최신 연구에 따르면 저용량(750mg/일)으로도 갱년기 여성의 인지 기능, 반응 속도, 기분 변화가 유의미하게 개선됐습니다. 생리 주기 중 에스트로겐이 낮아지는 시기에 특히 효과적이에요.</>
        ) : (
          <><strong>TL;DR:</strong> Creatine isn't just for muscles — it's critical for brain ATP production. New research shows that even low doses (750mg/day) significantly improve cognitive function, reaction times, and mood swings in menopausal women. It's especially effective during low-estrogen phases of the menstrual cycle.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1200"
        alt="Woman exercising in a gym setting, representing creatine supplementation for women"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '크레아틴이 뇌에서 하는 일' : 'What creatine actually does in your brain'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>크레아틴은 체내에서 자연적으로 생성되는 화합물로, <strong>ATP(아데노신 삼인산)</strong>를 재충전하는 역할을 해요. ATP는 세포의 에너지 화폐예요. 근육이 ATP를 쓰듯, 뇌도 ATP를 소모합니다 — 특히 집중, 의사결정, 기억 같은 고차원 인지 작업에서요. <mark>뇌는 체중의 2%인데 전체 ATP의 20%를 사용해요</mark>.</>
          ) : (
            <>Creatine is a compound your body makes naturally. Its job is to recycle <strong>ATP (adenosine triphosphate)</strong> — the energy currency of every cell. Your muscles use ATP. So does your brain — especially during demanding cognitive tasks like focus, decision-making, and memory. <mark>Your brain is 2% of your body weight but uses 20% of its ATP</mark>.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '+123%', desc: '"여성 크레아틴" 검색량 전년 대비 증가율' },
            { title: '120%', desc: 'SPINS 데이터 기준 크레아틴 카테고리 매출 성장률' },
            { title: '550K', desc: '"creatine" 월간 글로벌 검색량' },
          ] : [
            { title: '+123%', desc: 'Year-over-year increase in "creatine for women" searches' },
            { title: '120%', desc: 'Category sales growth according to SPINS data' },
            { title: '550K', desc: 'Monthly global searches for "creatine"' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '여성 호르몬 주기와 크레아틴의 관계' : 'The hormone connection'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>여성의 뇌가 크레아틴에 더 반응하는 이유가 있어요. 에스트로겐이 낮아지는 생리 주기의 난포기(follicular phase)에 <mark>크레아틴 키나아제 수치도 함께 떨어집니다</mark>. 이 시기에 수면의 질이 떨어지고 인지 기능이 저하되는데, 크레아틴 보충이 이를 완충해줄 수 있어요.</>
          ) : (
            <>There's a reason women's brains may respond even more to creatine. During the follicular phase of the menstrual cycle — when estrogen is low — <mark>creatine kinase levels drop too</mark>. This is exactly when sleep quality tanks and cognitive function dips. Creatine supplementation can buffer against this hormonal energy dip.</>
          )}
        </ArtBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🧠" title={isKo ? '갱년기 인지 기능' : 'Menopause cognition'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? '이중맹검 연구에서 저용량 크레아틴 HCl(750mg/일)이 갱년기 여성의 주의력, 실행 기능, 처리 속도, 반응 시간을 유의미하게 개선했어요. 중간 용량(1500mg/일)은 기분 변동과 집중력 저하도 줄여줬습니다.' : 'A double-blind study found that low-dose creatine HCl (750mg/day) significantly improved alertness, executive control, processing speed, and reaction times in menopausal women. Medium-dose (1500mg/day) also reduced mood swings and concentration difficulties.'}
          </ArtCallout>
          <ArtCallout icon="😴" title={isKo ? '수면 부족과 인지력' : 'Sleep deprivation & cognition'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? '수면이 부족할 때 크레아틴 단일 복용만으로도 인지 능력이 개선됐다는 연구가 있어요. 뇌의 고에너지 인산 수치를 직접 높여주기 때문입니다.' : 'A single dose of creatine improved cognitive performance during sleep deprivation by directly increasing cerebral high-energy phosphate levels. Your brain literally gets more fuel when it needs it most.'}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '어떻게 먹어야 할까요?' : 'How to take it'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>크레아틴 모노하이드레이트 3-5g/일이 가장 많이 연구된 표준 용량이에요. 로딩(대량 복용 후 유지)은 필수가 아니고, 매일 꾸준히 복용하면 2-4주 안에 체내 저장량이 포화됩니다. 성별에 따른 크레아틴 차이는 없어요 — 같은 성분, 같은 효과예요.</>
          ) : (
            <>Creatine monohydrate at 3-5g/day is the most studied dose. Loading phases aren't necessary — consistent daily intake saturates your stores within 2-4 weeks. There's no gender-specific creatine. It's the same compound with the same benefits.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '✨ 추천 제품' : '✨ Products worth trying'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Momentous', name: 'Creatine Monohydrate', note: isKo ? 'NSF 스포츠 인증. 순도와 안전성이 제3자 검증된 크레아틴 모노하이드레이트예요.' : 'NSF Certified for Sport. Third-party tested for purity — the gold standard for supplement quality.' },
            { brand: 'Wellah', name: 'Creatine for Women', note: isKo ? '엽산, 민들레 추출물, 크랜베리 추출물을 함께 배합해 소화 부담을 줄인 여성 맞춤 포뮬러예요.' : 'Combines creatine monohydrate with folate, dandelion extract, and cranberry to reduce GI distress.' },
            { brand: 'Thorne', name: 'Creatine', note: isKo ? '크레아틴 모노하이드레이트 5g. 불필요한 첨가물 없는 심플한 포뮬러로 신뢰도 높은 브랜드예요.' : 'Simple 5g creatine monohydrate formula. No unnecessary additives from one of the most trusted supplement brands.' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="#a07850" />)}
        </div>
      </ArtSection>

    </div>
  );
};

/* ─── Article: Milk Perfume ──────────────────────────────────────────────── */

window.MilkPerfumeBody = function MilkPerfumeBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> "밀크 퍼퓸"은 실제 우유 냄새가 아니에요. 락톤이라는 고리형 에스테르 분자가 만드는 크리미하고 따뜻한 후각적 인상입니다. 감마데카락톤은 복숭아, 델타데카락톤은 버터 같은 코코넛 향을 내요. 이 분자들이 편안함과 안정감이라는 감정 반응을 유도합니다.</>
        ) : (
          <><strong>TL;DR:</strong> "Milk perfume" doesn't smell like milk. It's built from lactones — cyclic ester molecules. Gamma-decalactone gives peach, delta-decalactone gives buttery coconut. Together, they create what your brain reads as "creamy warmth" — a scent profile wired to comfort and safety.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=1200"
        alt="Warm creamy milk being poured, representing lactonic fragrance notes"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '"밀크 퍼퓸"이 우유 냄새가 아닌 이유' : 'Why "milk perfume" doesn\'t smell like milk'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>2026년 가장 주목받는 향수 트렌드는 <strong>락토닉(lactonic)</strong> 향이에요. TikTok에서 바이럴되고, Marie Claire가 "2026년을 정의하는 향"이라고 선언했죠. 하지만 이름에 속지 마세요. 락토닉 향수는 우유 냄새가 아닙니다. <mark>"락토닉"이라는 이름은 라틴어 lac(우유)에서 왔지만, 실제 향은 크리미하고 따뜻한 질감이에요</mark>.</>
          ) : (
            <>The biggest fragrance trend of 2026 is <strong>lactonic</strong> scents. Viral on TikTok, declared "the defining scent of 2026" by Marie Claire. But don't let the name fool you. Lactonic perfumes don't smell like milk. <mark>The name comes from the Latin "lac" (milk), but the actual scent is a creamy, warm texture</mark> — closer to cashmere than dairy.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '락톤의 분자 구조' : 'The molecular anatomy of a lactone'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>락톤은 같은 분자 안에서 하이드록실기와 카복실기가 반응해 만들어지는 <strong>고리형 에스테르</strong>예요. 고리의 크기가 향을 결정합니다. 감마(γ) 락톤은 5원 고리로 달콤하고 강렬하고, 델타(δ) 락톤은 6원 고리로 더 부드럽고 크리미해요.</>
          ) : (
            <>Lactones are <strong>cyclic esters</strong> — formed when a hydroxyl group and carboxyl group within the same molecule create an internal ring. The ring size determines the scent. Gamma (γ) lactones form five-membered rings — sweeter, more aggressive. Delta (δ) lactones form six-membered rings — softer, creamier, more naturalistic.</>
          )}
        </ArtBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🍑" title={isKo ? '감마데카락톤 (γ-Decalactone)' : 'Gamma-Decalactone'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? '복숭아의 핵심 향 분자예요. 달콤한 과일향 아래에 코코넛 크리미함이 깔려 있어서 일차원적이지 않아요. 밀크 퍼퓸의 과일 측면을 담당합니다.' : 'The core molecule of peach. Delivers pure stone fruit with an underlying coconut creaminess that prevents one-dimensional fruitiness. This is the fruit side of milk perfume.'}
          </ArtCallout>
          <ArtCallout icon="🥥" title={isKo ? '델타데카락톤 (δ-Decalactone)' : 'Delta-Decalactone'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? '감마데카락톤의 이성질체인데 향이 완전히 달라요. 복숭아 대신 버터 같은 코코넛 크리미함이 주가 됩니다. 코코넛, 복숭아, 라즈베리, 심지어 블루치즈에서도 자연적으로 발견돼요.' : 'A constitutional isomer of gamma-decalactone with one less carbon in its ring. Transforms pure peach into buttery coconut richness. Found naturally in coconut, peach, raspberry — and blue cheese.'}
          </ArtCallout>
          <ArtCallout icon="🌾" title={isKo ? '감마운데카락톤 (γ-Undecalactone)' : 'Gamma-Undecalactone'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? '"코코넛 락톤"이라고도 불려요. 많은 클래식 향수의 기반이 된 분자로, 밀크 퍼퓸의 따뜻하고 스킨라이크한 베이스를 만들어줍니다.' : 'Also called the "coconut lactone." The foundation molecule of many classic fragrances. It creates the warm, skin-like base that makes milk perfumes feel intimate rather than loud.'}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '왜 편안하게 느껴질까요?' : 'Why does it feel like comfort?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>밀크 퍼퓸이 강렬한 게 아니라 편안하게 느껴지는 건 우연이 아니에요. 우유라는 감각은 <mark>영양, 안전, 친숙함이라는 초기 경험과 연결되어 있어요</mark>. 락토닉 향은 이 감정적 기억을 활성화합니다 — 자극적이고 과포화된 세상에서 그라운딩(안정감)을 주는 향이죠.</>
          ) : (
            <>It's not an accident that milk perfumes feel comforting rather than intense. Milk, as a sensory idea, is linked to <mark>nourishment, safety, and familiarity — early experiences of comfort</mark>. Lactonic scents activate these emotional memories. In a fast, overstimulated world, they offer grounding.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '✨ 추천 제품' : '✨ Products worth trying'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Commodity', name: 'Milk Orchid', note: isKo ? '2026 Digital Fragrance Awards 바이럴 향수 부문 수상. 오키드와 밀크 노트의 조합으로 락토닉 트렌드의 중심에 선 제품이에요.' : 'Winner of the 2026 Digital Fragrance Awards for viral launch. The fragrance that put the milk trend on the map.' },
            { brand: 'Maison Margiela', name: "Replica Lazy Sunday Morning", note: isKo ? '화이트 머스크와 알데히드 위에 섬세한 락토닉 노트가 깔려 있어요. "깨끗한 침대 시트" 향의 원조격 제품이에요.' : 'Subtle lactonic notes layered over white musk and aldehydes. The original "clean sheets" scent that pioneered comfort fragrance.' },
            { brand: 'Glossier', name: 'You', note: isKo ? '머스크와 앰브렛 위에 크리미한 아이리스가 올라간 스킨 센트. 밀크 퍼퓸의 미니멀한 해석이에요.' : 'Creamy iris over musk and ambrette. A minimalist interpretation of the milk perfume concept — your skin, amplified.' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--sage)" />)}
        </div>
      </ArtSection>

    </div>
  );
};

/* ─── Article: Tropical Fruit Fragrance ──────────────────────────────────── */

window.TropicalFruitBody = function TropicalFruitBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 구아바, 패션프루트, 수박 향 검색이 1,200% 급등했어요. 열대 과일의 독특한 향은 휘발성 황 화합물(VSC)에서 나옵니다. 이 분자들은 클린 머스크나 우디 향으로는 만들 수 없는 강렬한 후각 반응을 유발해요. 라즈베리가 다음 대세로 예측됩니다.</>
        ) : (
          <><strong>TL;DR:</strong> Searches for guava, passionfruit, and watermelon fragrance notes have surged 1,200% year-over-year. The unique aroma of tropical fruits comes from volatile sulfur compounds (VSCs) that trigger a neurological intensity clean musks can't match. Raspberry is predicted to be next.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&q=80&w=1200"
        alt="Colorful tropical fruits including passionfruit and mango on a bright background"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '클린 향의 시대가 끝나고 있다' : 'The clean era is ending'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>지난 몇 년간 향수 시장을 지배한 건 클린 머스크, 시어 우드, 스킨 센트였어요. 하지만 2026년, <mark>소비자의 코가 더 강렬한 것을 원하기 시작했습니다</mark>. 구아바 향 관련 검색이 1,000% 이상 증가했고, 패션프루트와 수박도 비슷한 성장세를 보이고 있어요. 파우더리한 꽃향 대신 <strong>잘 익은 과일</strong>의 생생한 즙이 터지는 향을 원하는 거예요.</>
          ) : (
            <>Clean musks, sheer woods, and skin scents dominated fragrance for years. But in 2026, <mark>noses are craving something wilder</mark>. Google searches for guava in fragrance are up over 1,000%. Passionfruit and watermelon are surging at similar rates. Consumers are moving away from powdery, perfumey florals toward scents that smell like <strong>ripe, bursting fruit</strong>.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '+1,200%', desc: '열대 과일 향 노트(구아바, 패션프루트) 검색량 전년 대비 증가율' },
            { title: '+158%', desc: '수박, 배 등 워터 프루트 노트 검색량 증가율' },
            { title: '다음 주자: 라즈베리', desc: '업계에서 차기 지배적 과일 프로필로 예측하는 향' },
          ] : [
            { title: '+1,200%', desc: 'Year-over-year surge in tropical fruit note searches (guava, passionfruit)' },
            { title: '+158%', desc: 'Growth in water fruit searches (watermelon, pear)' },
            { title: 'Next up: Raspberry', desc: 'Predicted to become the next dominant fruit profile in fragrance' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '열대 과일이 특별한 이유: 황 화합물의 과학' : 'Why tropical fruits hit different: the sulfur science'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>열대 과일이 사과나 딸기와 다르게 느껴지는 건 <strong>휘발성 황 화합물(VSC)</strong> 때문이에요. 대부분의 과일향은 에스테르와 알코올로 만들어지지만, 구아바와 패션프루트에는 <mark>티오펜, 티아졸, 3-메르캅토헥사놀 같은 황 함유 분자가 독특한 즙 터지는 신선함</mark>을 만들어냅니다.</>
          ) : (
            <>What makes tropical fruits smell different from apples or strawberries is <strong>volatile sulfur compounds (VSCs)</strong>. Most fruit aromas come from esters and alcohols. But guava and passionfruit contain <mark>sulfur-bearing molecules — thiophenes, thiazoles, and 3-mercaptohexanol — that create a uniquely juicy, bursting freshness</mark>.</>
          )}
        </ArtBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🧬" title={isKo ? '구아바의 황 분자' : 'Guava\'s sulfur fingerprint'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? '구아바에서 9종의 휘발성 황 화합물이 발견됐어요. 특히 3-메르캅토헥사놀(3MH)은 자몽 같은 즙 터지는 느낌을, 3MHA는 블랙커런트 같은 선명한 과일향을 만들어요.' : 'Nine volatile sulfur compounds were discovered in guava. 3-Mercaptohexanol (3MH) creates a grapefruit-like juiciness. 3MHA delivers blackcurrant-like vibrancy. These are the molecules that make guava smell alive.'}
          </ArtCallout>
          <ArtCallout icon="💛" title={isKo ? '패션프루트의 에스테르 폭발' : 'Passionfruit\'s ester explosion'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? '패션프루트의 향 프로필은 에스테르, 알코올, 알데히드, 케톤, 테르펜, 황 화합물의 조합이에요. 3MH가 아세트알데히드와 반응해 만드는 독특한 티오헥실 에스테르가 그 즙이 터지는 열대감의 핵심입니다.' : 'Passionfruit\'s aroma is a complex blend of esters, alcohols, aldehydes, ketones, terpenes, and sulfur compounds. The interaction between 3MH and acetaldehyde creates unique thiohexyl esters — the core of that bursting tropical intensity.'}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '노스탤지어와 미래가 동시에' : 'Nostalgic and futuristic at once'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>이 트렌드가 흥미로운 건, 과거의 달달한 과일 향수와 다르다는 거예요. 2026년의 트로피컬 향은 <mark>성숙하고 복잡한 열대감을 추구합니다</mark> — 할라피뇨의 매운 열기, 카카오의 깊이, 아사이의 선명함이 과일과 어우러져요. 달콤하기만 한 게 아니라 다층적이고 의도적인 향이죠.</>
          ) : (
            <>What makes this trend interesting is that it's not a return to sweet, candy-like fruit fragrances. The 2026 tropical wave <mark>pursues sophistication</mark> — jalapeño heat colliding with lush guava, cacao depth layered under passionfruit brightness. These are layered, intentional compositions, not body sprays.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '✨ 추천 제품' : '✨ Products worth trying'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Sol de Janeiro', name: 'Brazilian Bum Bum Cream', note: isKo ? '살치 향(카라멜, 피스타치오, 바닐라)에 열대 과일 언더톤이 깔린 시그니처. 트로피컬 구르망 붐의 원조격이에요.' : 'The salted caramel-pistachio-vanilla signature with tropical fruit undertones. Arguably the fragrance that started the tropical gourmand boom.' },
            { brand: 'Floral Street', name: 'Arizona Bloom', note: isKo ? '선인장 꽃과 패션프루트 노트의 조합. 열대감과 건조한 사막 느낌을 동시에 구현한 실험적인 향이에요.' : 'Cactus flower meets passionfruit. An experimental take on tropical — arid desert warmth with bursting fruit.' },
            { brand: 'Vilhelm Parfumerie', name: 'Mango Skin', note: isKo ? '망고의 즙 터지는 상큼함에 재스민과 머스크를 겹쳐 성숙한 열대감을 만든 니치 향수예요.' : 'Juicy mango burst layered with jasmine and musk. Niche tropical done with restraint and sophistication.' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--sage)" />)}
        </div>
      </ArtSection>

    </div>
  );
};

/* ─── Article: 10-Step Routine Is Dead ───────────────────────────────────── */

window.TenStepRoutineBody = function TenStepRoutineBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 10단계 루틴은 한국이 만든 게 아니에요 — 서양 미디어가 K-뷰티를 포장한 마케팅이었습니다. 한국 20-35세 여성의 67%는 매일 5개 이하의 제품만 사용해요. 피부과 전문의들의 답은 간단합니다: 세정, 치료, 보습. 이 세 가지면 충분해요.</>
        ) : (
          <><strong>TL;DR:</strong> The 10-step routine was never real K-beauty — it was a Western media invention. 67% of Korean women aged 20-35 use five or fewer products daily. Korean dermatologists say the answer is simple: cleanse, treat, moisturize. Three steps. That's it.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200"
        alt="Minimalist skincare products on clean surface, representing simplified Korean skincare"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '10단계는 누가 만들었을까요?' : 'Who invented the 10-step routine?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>2014-2015년 즈음, K-뷰티가 서양에 상륙하면서 "10단계 스킨케어 루틴"이라는 개념이 탄생했어요. 하지만 이건 <mark>한국 여성들의 실제 습관이 아니라 마케팅 프레임이었습니다</mark>. 한국 뷰티 브랜드들이 여러 카테고리의 제품을 팔기 위한 스토리텔링이었고, 서양 미디어가 이국적인 "K-뷰티 비밀"로 포장한 거예요.</>
          ) : (
            <>Around 2014-2015, as K-beauty landed in the West, the "10-step skincare routine" was born. But <mark>it was never how Korean women actually cared for their skin — it was a marketing frame</mark>. Korean beauty brands needed a narrative to sell products across multiple categories. Western media turned it into an exotic "K-beauty secret."</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '67%', desc: '한국 20-35세 여성 중 매일 5개 이하 제품을 사용하는 비율' },
            { title: '3단계', desc: '피부과 전문의가 권장하는 핵심 루틴: 세정, 치료, 보습' },
            { title: '2026 키워드', desc: '"스킨 론제비티" — 제품 수가 아닌 피부 건강의 장기적 유지' },
          ] : [
            { title: '67%', desc: 'Of Korean women aged 20-35 use five or fewer products daily' },
            { title: '3 steps', desc: 'What dermatologists actually recommend: cleanse, treat, moisturize' },
            { title: '2026 keyword', desc: '"Skin longevity" — long-term skin health over product count' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '3단계가 10단계를 이기는 이유' : 'Why 3 steps beats 10'}
        </ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🧴" title={isKo ? '1단계: 세정' : 'Step 1: Cleanse'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? '아침에는 물 세안이나 저자극 클렌저. 저녁에는 오일 클렌저 → 워터 클렌저의 더블 클렌징. 피부 장벽을 지키면서 불순물만 제거하는 게 핵심이에요.' : 'Morning: water-only or gentle cleanser. Evening: oil cleanser → water cleanser (double cleanse). The goal is removing impurities without stripping the barrier.'}
          </ArtCallout>
          <ArtCallout icon="💧" title={isKo ? '2단계: 치료' : 'Step 2: Treat'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? '토너, 에센스, 세럼을 따로 바르던 시대는 끝났어요. 멀티 펑셔널 세럼 하나가 세 가지 역할을 합니다. 자신의 핵심 피부 고민에 맞는 활성 성분 하나에 집중하세요.' : 'The era of separate toner, essence, and serum is over. One multi-functional serum does the work of three. Focus on one active that addresses your primary concern — hydration, brightening, or wrinkles.'}
          </ArtCallout>
          <ArtCallout icon="🛡️" title={isKo ? '3단계: 보습' : 'Step 3: Moisturize'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? '지성 피부도 보습이 필요해요. 수분 손실(TEWL)을 막아 장벽을 유지하는 게 목적이에요. 아침에는 SPF가 포함된 보습제를 쓰면 한 단계를 더 줄일 수 있어요.' : 'Even oily skin needs this. The purpose is preventing transepidermal water loss (TEWL) to maintain the barrier. In the morning, a moisturizer with SPF eliminates yet another step.'}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '더 많이 바르면 더 나빠질 수 있어요' : 'More products can mean more damage'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>"50가지 세럼의 시대는 끝났습니다. 사람들은 지쳤고, 피부는 민감해졌고, 더 많은 단계가 더 많은 문제를 만든다는 걸 깨닫고 있어요." 2026년 피부과 전문의들의 공통된 메시지예요. <mark>과도한 제품 사용은 피부 장벽을 훼손하고 오히려 트러블을 유발합니다</mark>.</>
          ) : (
            <>"The days of 50 different serums are done. People are exhausted, their skin is sensitized, and they're realizing that more steps often mean more problems." That's the consensus from dermatologists in 2026. <mark>Overloading your skin with products compromises the barrier and can actually cause the problems you're trying to fix</mark>.</>
          )}
        </ArtBody>
        <ArtBody>
          {isKo ? (
            <>진짜 K-뷰티는 항상 느리고, 조용하고, 인내심 있는 접근법이었어요. 글래스 스킨도 시각적 비유일 뿐이었죠. 핵심은 제품 수가 아니라 <strong>피부의 장기적 건강</strong>이에요.</>
          ) : (
            <>Real K-beauty was always slower, quieter, and more patient. Glass skin was just visual shorthand. The core philosophy has always been about <strong>long-term skin health</strong> — not how many products you can layer.</>
          )}
        </ArtBody>
      </ArtSection>

    </div>
  );
};

/* ─── Article: Celebrity Skincare Methods ────────────────────────────────── */

window.CelebritySkincareBody = function CelebritySkincareBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 송혜교의 우유 세안은 락틱산(젖산)의 각질 제거 효과로 과학적 근거가 있어요. 수지의 424 세안법은 더블 클렌징의 체계적인 버전이에요. 제시카 정의 손바닥 온열법은 혈류 개선에 도움이 되지만 효과는 미미합니다.</>
        ) : (
          <><strong>TL;DR:</strong> Song Hye-kyo's milk rinse has scientific backing — lactic acid in milk genuinely exfoliates. Suzy's 424 method is a structured version of double cleansing. Jessica Jung's heated palm technique helps blood flow slightly, but the effect is modest.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=1200"
        alt="Korean beauty skincare products and routine items on a vanity"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '송혜교의 우유 세안 — 판정: 과학적 근거 있음' : 'Song Hye-kyo\'s milk rinse — Verdict: Science-backed'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>송혜교는 클렌징 마지막 단계에서 따뜻하게 데운 우유를 얼굴에 부어요. 이상하게 들릴 수 있지만, <mark>우유에 포함된 락틱산(Lactic Acid)은 실제로 각질 제거 효과가 있는 AHA 성분</mark>이에요. 클레오파트라가 우유 목욕을 한 것도 같은 원리예요. 우유의 지방 분해 효소 리파아제(lipase)가 유분성 불순물을 제거하고, 비타민과 미네랄이 피부를 부드럽게 해줍니다.</>
          ) : (
            <>Song Hye-kyo pours warmed milk over her face as the final step of cleansing. Sounds strange, but <mark>the lactic acid in milk is a genuine AHA that exfoliates dead skin cells</mark>. Cleopatra bathed in milk for the same reason. The fat-soluble enzyme lipase removes oil-based impurities, while vitamins and minerals soften the skin.</>
          )}
        </ArtBody>
        <ArtCallout icon="✅" title={isKo ? '피부과학 판정' : 'Dermatology verdict'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
          {isKo ? '효과 있어요. 단, 유제품 알레르기가 있다면 피하세요. 저온 살균 우유를 따뜻하게 데워서 사용하는 게 중요하고, 사용 후 반드시 물로 헹궈야 해요. 매일보다는 주 2-3회가 적당합니다.' : 'It works. The lactic acid concentration in milk is gentle enough for most skin types. Use pasteurized, warmed milk and always rinse with water afterward. 2-3 times per week is better than daily. Skip if you have dairy allergies.'}
        </ArtCallout>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '수지의 424 세안법 — 판정: 효과적 (하지만 10분은 길어요)' : 'Suzy\'s 424 method — Verdict: Effective (but 10 minutes is long)'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>배수지의 424 세안법: 오일 클렌저 4분 마사지 → 폼 클렌저 2분 → 물 헹굼 4분. 총 10분이에요. 기본적으로 <strong>더블 클렌징</strong>을 시간까지 정해서 체계적으로 하는 방법인데, <mark>피부과 전문의들은 더블 클렌징 자체는 지지하지만 각 단계에 그렇게 오래 시간을 쓸 필요는 없다</mark>고 말해요.</>
          ) : (
            <>Suzy's 424 method: 4 minutes of oil cleanser massage → 2 minutes with foam cleanser → 4 minutes of rinsing. Ten minutes total. It's essentially <strong>double cleansing</strong> with strict timing. <mark>Dermatologists support double cleansing but say you don't need to spend that long on each step</mark>.</>
          )}
        </ArtBody>
        <ArtCallout icon="⚠️" title={isKo ? '피부과학 판정' : 'Dermatology verdict'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
          {isKo ? '더블 클렌징은 좋아요. 하지만 4분 동안 오일 클렌저를 마사지하면 필요한 피지까지 제거될 수 있어요. 오일 1-2분, 폼 1분, 헹굼 1분이면 충분합니다. 방법은 맞지만 시간은 과해요.' : 'Double cleansing is great. But 4 minutes of oil massage can strip even the lipids your skin needs. Oil for 1-2 minutes, foam for 1 minute, rinse for 1 minute is sufficient. The method is right — the timing is excessive.'}
        </ArtCallout>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '제시카 정의 손바닥 온열법 — 판정: 해롭진 않지만 효과도 미미' : 'Jessica Jung\'s heated palm press — Verdict: Harmless but modest'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>제시카 정은 스킨케어 제품을 바른 후 양손을 비벼 열을 만들고 얼굴에 감싸듯 올려요. 열이 모공을 열어 흡수를 돕는다는 논리인데, <mark>실제로 손바닥의 열은 모공을 열 만큼 충분하지 않아요</mark>. 다만 가볍게 누르는 압력이 혈류를 자극하고, 제품이 증발하지 않고 피부에 머무는 시간을 늘려주는 효과는 있어요.</>
          ) : (
            <>Jessica Jung rubs her palms together to generate heat, then presses them over her face after applying skincare. The theory: heat opens pores for better absorption. <mark>In reality, palm heat isn't enough to meaningfully open pores</mark>. However, the gentle pressure does stimulate blood flow slightly, and holding product against the skin prevents evaporation and increases contact time.</>
          )}
        </ArtBody>
        <ArtCallout icon="🤷" title={isKo ? '피부과학 판정' : 'Dermatology verdict'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
          {isKo ? '해가 되진 않지만, 제품 흡수를 획기적으로 바꾸진 않아요. 릴렉싱 의식으로는 좋지만, 과학적으로 기대할 만한 효과는 크지 않습니다.' : 'Won\'t hurt you, won\'t transform your absorption. Nice as a relaxing ritual, but don\'t expect it to change how your products perform.'}
        </ArtCallout>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '진짜 배울 점은 따로 있어요' : 'What\'s actually worth stealing'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>셀럽 스킨케어 비법의 공통점은 특별한 제품이 아니에요. <strong>일관성</strong>이에요. 송혜교, 수지, 제시카 정 모두 자기 루틴을 수년간 꾸준히 유지해요. 피부과학에서 가장 확실한 건 — 최고의 루틴은 매일 하는 루틴이에요.</>
          ) : (
            <>The common thread across all celebrity skincare isn't special products. It's <strong>consistency</strong>. Song Hye-kyo, Suzy, and Jessica Jung all maintain their routines for years. The most proven principle in dermatology — the best routine is the one you actually do every day.</>
          )}
        </ArtBody>
      </ArtSection>

    </div>
  );
};

/* ─── Article: Jjimjilbang Science ───────────────────────────────────────── */

window.JjimjilbangBody = function JjimjilbangBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 찜질방의 온냉 대비 요법은 혈관을 확장·수축시켜 "혈관 펌프" 효과를 만들어요. 연구에 따르면 냉수 침수 15분만으로 코르티솔이 3시간 동안 낮아지고, 성장호르몬이 최대 24배 증가합니다. K-드라마가 만든 관광 붐 뒤에는 실제 과학이 있어요.</>
        ) : (
          <><strong>TL;DR:</strong> The hot-cold contrast therapy in jjimjilbangs creates a "vascular pump" effect by alternately dilating and constricting blood vessels. Studies show 15 minutes of cold immersion lowers cortisol for up to 3 hours, and growth hormone can spike up to 24x. Behind the K-drama tourism boom, there's real science.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1540555700478-4be289fbec6d?auto=format&fit=crop&q=80&w=1200"
        alt="Steam rising from a hot bath, representing Korean jjimjilbang sauna culture"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '동네 목욕탕이 글로벌 웰니스 명소가 되기까지' : 'From neighborhood bathhouse to global wellness destination'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>한국인에게 찜질방은 그냥 동네에 있는 곳이에요. 삶은 달걀 먹고, 바닥에 누워서 TV 보고, 때를 밀고, 냉탕과 온탕을 오가는 곳이죠. 하지만 K-드라마, K-팝, 틱톡의 영향으로 <mark>외국인 방문객이 급증하면서 찜질방은 글로벌 웰니스 관광의 핵심 콘텐츠</mark>가 됐어요.</>
          ) : (
            <>For Koreans, jjimjilbangs are just... there. You eat boiled eggs, lie on heated floors watching TV, scrub dead skin, and alternate between hot and cold pools. But fueled by K-dramas, K-pop, and TikTok, <mark>foreign visitors have surged, turning jjimjilbangs into headline attractions for wellness tourism</mark>.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '온냉 대비 요법의 과학' : 'The science of contrast therapy'}
        </ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🔴" title={isKo ? '혈관 펌프 효과' : 'The vascular pump effect'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? '열탕에서 혈관이 확장되고, 냉탕에서 수축돼요. 이 반복이 혈액 순환을 촉진하는 "펌프"를 만들어서 영양분 전달과 노폐물 제거를 동시에 가속합니다.' : 'Hot water dilates blood vessels. Cold water constricts them. The alternation creates a "pump" that accelerates circulation — delivering nutrients to tissues and removing metabolic waste more efficiently.'}
          </ArtCallout>
          <ArtCallout icon="😌" title={isKo ? '코르티솔 저하' : 'Cortisol reduction'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? '10°C 냉수에 15분 침수하면 코르티솔(스트레스 호르몬) 수치가 3시간까지 유의미하게 낮아진다는 연구 결과가 있어요. 정기적으로 하면 기저 스트레스 호르몬 수치 자체가 내려갑니다.' : 'Studies show 15 minutes of cold water immersion at 50°F (10°C) significantly lowers cortisol for up to 3 hours. Regular practice actually reduces baseline stress hormone levels — making your body more resilient to all stressors.'}
          </ArtCallout>
          <ArtCallout icon="💪" title={isKo ? '성장호르몬 & 회복' : 'Growth hormone & recovery'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? '냉수 노출 시 성장호르몬이 최대 24배까지 증가한다는 연구가 있어요. 엔돌핀(자연 진통제)도 분비됩니다. Journal of Science and Medicine in Sport에 게재된 연구에 따르면 근육 통증 감소와 회복 지표 개선이 확인됐어요.' : 'Cold exposure can increase growth hormone by up to 24x and triggers endorphin release. Studies in the Journal of Science and Medicine in Sport documented improved recovery markers and reduced muscle soreness in athletes using contrast therapy.'}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '한 가지 주의할 점' : 'One honest caveat'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>연구 결과는 유망하지만, <mark>많은 연구가 소규모 표본이고 자기 보고식 기분 측정은 편향될 수 있어요</mark>. 찜질방이 만병통치약은 아닙니다. 하지만 수천 년간 지속된 한국의 목욕 문화가 과학적 근거 없이 살아남았을 리도 없어요.</>
          ) : (
            <>The research is promising but <mark>many studies have small sample sizes, and self-reported mood measurements can be biased</mark>. Jjimjilbangs aren't a cure-all. But a bathing culture that has survived thousands of years in Korea didn't persist without reason.</>
          )}
        </ArtBody>
      </ArtSection>

    </div>
  );
};

/* ─── Article: Korea Sleep Crisis ────────────────────────────────────────── */

window.KoreaSleepBody = function KoreaSleepBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 한국은 OECD 국가 중 수면 시간이 가장 짧아요. 이 문제가 10년 만에 5천억에서 11조 원 규모의 수면 산업을 만들었습니다. 올리브영 수면 건강식품 매출은 300% 증가. 한국에서 합성 멜라토닌은 의약품으로 분류되기 때문에 식물성 멜라토닌이 대안으로 떠올랐어요.</>
        ) : (
          <><strong>TL;DR:</strong> Korea sleeps less than almost any OECD nation. That problem created an ₩11 trillion sleep industry in a decade — up from ₩500 billion. Olive Young's sleep supplement sales are up 300%. Because synthetic melatonin is classified as medicine in Korea, plant-based melatonin has emerged as the legal alternative.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200"
        alt="Person sleeping peacefully, representing Korea's growing sleep wellness industry"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '왜 한국은 잠을 못 잘까요?' : 'Why doesn\'t Korea sleep?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>한국은 OECD 국가 중 수면 시간이 최하위권이에요. 수면 장애 환자 수가 <strong>135만 명</strong>을 넘었어요. 장시간 노동 문화, 야간 학원, 스마트폰 사용, "4당5락"(4시간 자면 붙고 5시간 자면 떨어진다) 같은 수면 경시 문화가 복합적으로 작용합니다. <mark>못 자는 나라가 잠을 사기 시작한 거예요</mark>.</>
          ) : (
            <>Korea ranks near the bottom of OECD nations for sleep. Sleep disorder patients now exceed <strong>1.35 million</strong>. Long working hours, late-night cram schools, smartphone culture, and a deeply ingrained ethos that sleeping less equals working harder. <mark>A nation that doesn't sleep started buying it instead</mark>.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '₩11조', desc: '한국 수면 시장 규모 (10년 전 5천억에서 22배 성장)' },
            { title: '+300%', desc: '올리브영 수면 건강식품 매출 전년 대비 증가율' },
            { title: '135만 명', desc: '한국 수면 장애 환자 수' },
          ] : [
            { title: '₩11 trillion', desc: 'Korea\'s sleep market size (22x growth from ₩500B a decade ago)' },
            { title: '+300%', desc: 'Olive Young sleep supplement sales year-over-year growth' },
            { title: '1.35M', desc: 'Sleep disorder patients in Korea' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '한국의 수면 솔루션들' : 'What Korea is buying to sleep'}
        </ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🌿" title={isKo ? '식물성 멜라토닌' : 'Plant-based melatonin'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? '한국에서 합성 멜라토닌은 의약품이에요. 건강기능식품에 쓸 수 없어요. 그래서 피스타치오 추출물, 타르트 체리 등에서 유래한 식물성 멜라토닌이 대안으로 급성장했어요. CJ웰케어의 피스타치오 멜라토닌 제품이 대표적이에요.' : 'In Korea, synthetic melatonin is classified as medicine — it can\'t be used in health functional foods. So plant-derived melatonin from pistachio extract, tart cherry, and other sources has exploded as the legal alternative. CJ Wellcare\'s pistachio melatonin product is a prime example.'}
          </ArtCallout>
          <ArtCallout icon="🧠" title={isKo ? 'GABA (감마아미노뷰티르산)' : 'GABA (Gamma-Aminobutyric Acid)'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? '뇌의 신경 활동을 진정시키는 억제성 신경전달물질이에요. GABA 보충이 수면 잠복기를 줄이고 비렘(NREM) 수면의 질을 높인다는 연구가 있어요. 정관장의 GABA 복합체가 올리브영 베스트셀러예요.' : 'An inhibitory neurotransmitter that calms neural activity in the brain. Studies show GABA supplementation decreases sleep latency (time to fall asleep) and improves NREM sleep quality. Jung Kwan Jang\'s GABA complex is an Olive Young bestseller.'}
          </ArtCallout>
          <ArtCallout icon="✨" title={isKo ? '수면 전용 스킨케어' : 'Sleep-specific skincare'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? '올리브영은 멜라토닌, 마그네슘, 비타민을 함유한 스킨케어·바디케어·헤어케어 제품을 하나의 "수면 카테고리"로 묶고 있어요. 추가 시간 없이 일상 루틴에 수면 케어를 녹이는 전략이에요.' : 'Olive Young is bundling skincare, body care, and hair care products infused with melatonin, magnesium, and vitamins into a single "sleep category." The strategy: embed sleep wellness into your existing routine without adding extra steps.'}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '"건강한 쾌락"의 시대' : 'The era of "healthy pleasure"'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>CJ 올리브영의 2026년 트렌드 리포트 키워드는 <strong>"F.U.L.L.M.O.O.N"</strong>이에요. 핵심 메시지는 "건강한 쾌락" — 엄격한 루틴 대신 즐겁고 쉬운 웰니스 습관을 추구하는 거예요. <mark>수면은 더 이상 수동적인 행위가 아니라 적극적으로 투자하는 웰니스 카테고리</mark>가 됐습니다.</>
          ) : (
            <>CJ Olive Young's 2026 trend report is framed around <strong>"F.U.L.L.M.O.O.N"</strong> — code for "healthy pleasure." Instead of rigid regimens, consumers want easy, enjoyable wellness habits. <mark>Sleep is no longer passive. It's an active wellness category that Koreans are investing in</mark> — from what they swallow to what they put on their skin before bed.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '✨ 추천 제품' : '✨ Products worth trying'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'GREEN MONSTER', name: 'MELADAY Plant Melatonin', note: isKo ? '식물성 멜라토닌 1mg 함유. 올리브영 수면 카테고리 베스트셀러. 타르트 체리 추출물 베이스예요.' : 'Plant-based melatonin 1mg. Olive Young sleep category bestseller. Tart cherry extract base.' },
            { brand: '정관장', name: 'Sleep Support GABA Complex 500mg', note: isKo ? 'GABA 500mg + 홍삼 조합. 120년 역사의 한국 건강 브랜드가 만든 수면 보조제예요.' : 'GABA 500mg + Korean red ginseng. Sleep support from Korea\'s most trusted 120-year-old health brand.' },
            { brand: 'MelaMate', name: 'Plant-Based Melatonin Gummy', note: isKo ? '구미 형태의 식물성 멜라토닌. 먹기 편하고 올리브영에서 가장 빠르게 성장하는 수면 제품이에요.' : 'Plant melatonin in gummy form. Easy to take and one of the fastest-growing sleep products at Olive Young.' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="#a07850" />)}
        </div>
      </ArtSection>

    </div>
  );
};
