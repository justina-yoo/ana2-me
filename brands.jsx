// Brands — browse products grouped by brand
const { useMemo, useState: _uS2, useRef: _uR2, useEffect: _uE2 } = React;

function BrandIngScroll({ children }) {
  const wrapRef = _uR2(null);
  const scrollRef = _uR2(null);
  const items = React.Children.toArray(children);
  const needsFade = items.length > 4;

  _uE2(() => {
    const el = scrollRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap || !needsFade) return;
    const onScroll = () => {
      const atEnd = el.scrollHeight - el.scrollTop - el.clientHeight < 10;
      wrap.classList.toggle('scrolled-end', atEnd);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [needsFade]);

  return (
    <div ref={wrapRef} className={cn('ing-scroll-wrap', !needsFade && 'scrolled-end')}>
      <div className="ing-scroll" ref={scrollRef}>
        {children}
      </div>
    </div>
  );
}

const BRAND_INFO = {
  'Arencia': {
    en: 'A vegan Korean brand that blends sustainability with artisanal skincare methods. Every product is built around ingredient integrity through slow, thoughtful refinement rooted in traditional herbal care.',
    ko: '지속 가능성과 장인 정신을 결합한 비건 한국 브랜드예요. 전통 한방 원료를 현대 피부 과학으로 정제하는 느린 제조 철학을 가지고 있어요.',
    origin: 'Seoul, Korea'
  },
  'Biodance': {
    en: 'A Seoul-based biotech skincare brand founded in 2021 that fuses biotechnology with dermatological science. Known for their viral Real Deep Collagen Mask and barrier-focused formulations using EWG-certified ingredients.',
    ko: '2021년 서울에서 설립된 바이오테크 스킨케어 브랜드예요. 바이럴 리얼 딥 콜라겐 마스크와 EWG 인증 성분을 사용한 장벽 중심 제형으로 유명해요.',
    origin: 'Seoul, Korea', founded: '2021'
  },
  'COSRX': {
    en: 'One of K-beauty\'s most recognized brands globally, built on the philosophy that skincare should be simple, effective, and affordable. Their ingredient-first approach focuses on proven actives like snail mucin, BHA, and centella.',
    ko: '심플하고 효과적이며 합리적인 스킨케어라는 철학으로 세계적으로 인정받는 K-뷰티 브랜드예요. 스네일 뮤신, BHA, 센텔라 같은 검증된 활성 성분 중심이에요.',
    origin: 'Seoul, Korea', founded: '2013'
  },
  'Chanel': {
    en: 'The French luxury house whose fragrance division has shaped modern perfumery since No. 5 debuted in 1921. Their in-house perfumers work with some of the rarest raw materials in the industry.',
    ko: '1921년 No. 5 출시 이후 현대 향수의 역사를 만들어 온 프랑스 럭셔리 하우스예요. 업계에서 가장 희귀한 원료를 사용하는 전속 조향사를 두고 있어요.',
    origin: 'Paris, France', founded: '1910'
  },
  'Diptyque': {
    en: 'A Parisian fragrance maison founded in 1961 by three artists. Known for sophisticated, unisex compositions that balance botanical precision with artistic storytelling.',
    ko: '1961년 세 명의 아티스트가 설립한 파리 프래그런스 메종이에요. 식물학적 정밀함과 예술적 스토리텔링을 균형 있게 조합한 유니섹스 향으로 유명해요.',
    origin: 'Paris, France', founded: '1961'
  },
  'Dr. Jart+': {
    en: 'A Korean dermocosmetic brand that bridges the gap between dermatology clinics and daily skincare. Their Ceramidin and Cicapair lines are built on clinical-grade actives made accessible for everyday use.',
    ko: '피부과 클리닉과 일상 스킨케어의 간극을 잇는 한국 더모코스메틱 브랜드예요. 세라마이딘과 시카페어 라인은 임상 등급 활성 성분을 일상에서 쉽게 쓸 수 있게 만든 거예요.',
    origin: 'Seoul, Korea', founded: '2004'
  },
  'EIoM': {
    en: 'A microbiome-focused K-beauty brand designed for acne-prone and sensitive skin. Their formulations center on fermented biotics and tea tree biome complexes to restore the skin\'s natural ecosystem.',
    ko: '여드름성, 민감성 피부를 위한 마이크로바이옴 중심 K-뷰티 브랜드예요. 발효 바이오틱스와 티트리 바이옴 복합체로 피부의 자연 생태계를 회복시키는 데 집중해요.',
    origin: 'Seoul, Korea'
  },
  'Jo Malone London': {
    en: 'A British fragrance house known for elegant simplicity and the art of layering. Each scent is designed to be worn alone or combined, creating a personalized fragrance wardrobe.',
    ko: '우아한 심플함과 레이어링 아트로 유명한 영국 프래그런스 하우스예요. 각 향은 단독 또는 조합하여 개인화된 향수 워드로브를 만들 수 있게 설계됐어요.',
    origin: 'London, UK', founded: '1994'
  },
  'La Roche-Posay': {
    en: 'A French dermocosmetic brand recommended by over 90,000 dermatologists worldwide. Every product is formulated with their proprietary thermal spring water and tested on sensitive skin.',
    ko: '전 세계 9만 명 이상의 피부과 전문의가 추천하는 프랑스 더모코스메틱 브랜드예요. 모든 제품이 독자적인 온천수로 제형화되고 민감성 피부에서 테스트돼요.',
    origin: 'La Roche-Posay, France', founded: '1975'
  },
  'Lavida': {
    en: 'A Korean anti-aging brand by Coreana Cosmetics that applies cell signaling science to skincare. Recognized with 12 consecutive Brand of the Year awards in the anti-aging category.',
    ko: '코리아나 화장품의 안티에이징 브랜드로, 세포 신호 과학을 스킨케어에 적용해요. 안티에이징 부문에서 12년 연속 올해의 브랜드상을 수상했어요.',
    origin: 'Seoul, Korea'
  },
  'Medicube': {
    en: 'A Korean beauty-tech brand that brings dermatology clinic technology into at-home devices and skincare. Known for their AGE-R device line and zero-pore formulations.',
    ko: '피부과 클리닉 기술을 홈케어 디바이스와 스킨케어에 접목한 한국 뷰티테크 브랜드예요. AGE-R 디바이스 라인과 제로포어 제형으로 유명해요.',
    origin: 'Seoul, Korea', founded: '2015'
  },
  'Mediheal': {
    en: 'Korea\'s #1 sheet mask brand that sells over 1 billion masks globally. Their mask technology delivers concentrated actives through bio-cellulose and hydrogel formats developed with dermatologists.',
    ko: '전 세계 누적 판매 10억 장 이상의 한국 1위 마스크팩 브랜드예요. 피부과 전문의와 함께 개발한 바이오셀룰로스, 하이드로젤 형태로 고농축 활성 성분을 전달해요.',
    origin: 'Seoul, Korea', founded: '2009'
  },
  'Medion': {
    en: 'A Japanese skincare brand founded by Dr. Masato Hiki, pioneer of carbonated beauty. Their CO2 gel masks use dissolved carbon dioxide to boost microcirculation and oxygen delivery to skin cells.',
    ko: '탄산 뷰티의 선구자 히키 마사토 박사가 설립한 일본 스킨케어 브랜드예요. CO2 젤 마스크가 용해된 이산화탄소로 미세순환과 피부 세포 산소 공급을 촉진해요.',
    origin: 'Osaka, Japan'
  },
  'Round Lab': {
    en: 'A Korean skincare brand built around Korea\'s natural water sources. Each line is formulated with a different regional mineral water \u2014 Dokdo deep sea water, Birch juice, Mugwort \u2014 for targeted hydration.',
    ko: '한국의 자연수를 중심으로 만든 스킨케어 브랜드예요. 독도 심층수, 자작나무 수액, 쑥 등 지역별 미네랄 워터로 맞춤 보습을 설계해요.',
    origin: 'Seoul, Korea', founded: '2019'
  },
  'Standard Seoul': {
    en: 'A K-beauty brand redefining fast-acting skincare with patented capsule formulas. Each product delivers visible clinical results through encapsulated actives that burst on contact with skin.',
    ko: '특허 캡슐 포뮬러로 빠른 효과의 스킨케어를 재정의하는 K-뷰티 브랜드예요. 피부에 닿으면 터지는 캡슐화 활성 성분으로 눈에 보이는 임상 결과를 전달해요.',
    origin: 'Seoul, Korea'
  },
  'Tamburins': {
    en: 'A Korean fragrance and body care brand under Gentle Monster\'s parent company. Their scents blend minimalist Korean aesthetics with bold, art-forward storytelling and gallery-like retail spaces.',
    ko: '젠틀몬스터 모회사 산하의 한국 프래그런스 & 바디케어 브랜드예요. 미니멀한 한국적 미학과 대담한 아트 스토리텔링, 갤러리 같은 매장 공간을 결합해요.',
    origin: 'Seoul, Korea', founded: '2017'
  },
  'beplain': {
    en: 'A Korean clean beauty pioneer committed to gentle, gender-neutral formulations. Their award-winning Mung Bean line earned over 20 beauty awards, built on a philosophy of returning to nature.',
    ko: '순하고 젠더 뉴트럴한 제형에 전념하는 한국 클린 뷰티 선구자예요. 자연으로 돌아간다는 철학 아래 녹두 라인이 20개 이상의 뷰티 어워드를 수상했어요.',
    origin: 'Seoul, Korea', founded: '2019'
  },
  'mixsoon': {
    en: 'A Korean skincare brand built around minimalism and single-core ingredients. The name combines "mix" with the Korean word soon (\u7d14), meaning pure \u2014 each product features one hero extract at maximum concentration.',
    ko: '미니멀리즘과 단일 핵심 성분을 중심으로 만든 한국 스킨케어 브랜드예요. 이름은 mix와 순(純)의 결합으로, 각 제품이 하나의 히어로 추출물을 최대 농도로 담아요.',
    origin: 'Seoul, Korea', founded: '2020'
  },
};

window.Brands = function Brands({ lang, products, setView, setProduct, density, brandSlug }) {
  const t = useL(lang);
  const [activeCat, setActiveCat] = _uS2(null);
  const [selIng, setSelIng] = _uS2(null);
  const [articles, setArticles] = _uS2([]);

  _uE2(() => {
    if (brandSlug && articles.length === 0) {
      window.__supabase.fetchArticles().then(data => setArticles(data)).catch(() => {});
    }
  }, [brandSlug]);

  // Canonical ingredient dictionary — first occurrence wins, one definition per ingredient
  const ingDict = useMemo(() => {
    const dict = {};
    products.forEach(p => {
      (p.ingredients || []).forEach(ing => {
        if (!dict[ing.name]) dict[ing.name] = ing;
      });
    });
    return dict;
  }, [products]);

  // Derive brands from products
  const brandMap = useMemo(() => {
    const map = {};
    products.forEach(p => {
      if (!map[p.brand]) map[p.brand] = { name: p.brand, slug: p.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, ''), products: [] };
      map[p.brand].products.push(p);
    });
    return map;
  }, [products]);

  const brands = useMemo(() => Object.values(brandMap).sort((a, b) => a.name.localeCompare(b.name)), [brandMap]);
  const selectedBrand = brandSlug ? brands.find(b => b.slug === brandSlug) : null;

  // Brand detail view
  if (selectedBrand) {
    const brandProducts = selectedBrand.products;
    const productSlug = (p) => p.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    const info = BRAND_INFO[selectedBrand.name];

    // Notable ingredients — sorted by frequency, then uniqueness (rarer across all brands = higher)
    const topIngredients = useMemo(() => {
      // Global frequency: how many brands use each ingredient
      const globalFreq = {};
      products.forEach(p => {
        const brand = p.brand;
        (p.ingredients || []).forEach(ing => {
          if (!globalFreq[ing.name]) globalFreq[ing.name] = new Set();
          globalFreq[ing.name].add(brand);
        });
      });

      const counts = {};
      brandProducts.forEach(p => {
        (p.ingredients || []).forEach(ing => {
          const key = ing.name;
          if (!counts[key]) counts[key] = { name: ing.name, nameKo: ing.nameKo, symbol: ing.symbol, count: 0 };
          counts[key].count++;
        });
      });
      return Object.values(counts).sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return (globalFreq[a.name]?.size || 0) - (globalFreq[b.name]?.size || 0);
      }).slice(0, 6);
    }, [brandProducts, products]);

    return (
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '8px 28px 48px' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 500, color: 'var(--ink-faint)', margin: '6px 0 18px' }}>
          <a href="/products" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/products'); window.dispatchEvent(new PopStateEvent('popstate')); }} style={{ color: 'var(--ink-faint)', textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-faint)'}>{t('Products', '제품')}</a>
          <span style={{ opacity: 0.35 }}>/</span>
          <span style={{ color: 'var(--ink-soft)' }}>{selectedBrand.name}</span>
        </nav>

        {/* Hero */}
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', margin: '0 0 8px' }}>
            <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.2, color: 'var(--ink)', margin: 0 }}>
              {selectedBrand.name}
            </h1>
            {info && info.origin && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--ink-faint)', padding: '4px 10px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--line)', background: 'var(--cream-card)' }}>
                {({'Korea': '\ud83c\uddf0\ud83c\uddf7', 'France': '\ud83c\uddeb\ud83c\uddf7', 'UK': '\ud83c\uddec\ud83c\udde7', 'Japan': '\ud83c\uddef\ud83c\uddf5', 'USA': '\ud83c\uddfa\ud83c\uddf8'})[info.origin.split(', ').pop()] || '\ud83c\udf0d'} {info.origin.split(', ').pop()}
              </span>
            )}
          </div>
          {info && (
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 28px', lineHeight: 1.65 }}>
              {t(info.en, info.ko)}
            </p>
          )}
        </Reveal>

        {/* Products */}
        <Reveal delay={80}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <Sticker color="sage" rotate={-3}>{brandProducts.length} {t('analyzed', '개 분석')}</Sticker>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {brandProducts.map((p) => {
              const name = lang === 'ko' && p.nameKo ? p.nameKo : p.name;
              const tagline = lang === 'ko' ? (p.summary?.taglineKo || p.summary?.tagline) : (p.summary?.tagline || '');
              const topIng = p.ingredients?.[0];
              return (
                <a key={p.id} href={'/products/' + productSlug(p)} onClick={(e) => { e.preventDefault(); setProduct(p); history.pushState({}, '', '/products/' + productSlug(p)); window.scrollTo(0, 0); }} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0',
                  borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'inherit', cursor: 'pointer',
                }}>
                  <ProductImg src={p.imageUrl} alt={name} style={{ width: 72, height: 72, borderRadius: 'var(--radius-sm)', objectFit: 'contain', flexShrink: 0, background: 'var(--cream-card)', padding: '6%' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 15, lineHeight: 1.3, margin: '0 0 3px', color: 'var(--ink)' }}>{name}</h4>
                    {tagline && <p style={{ fontSize: 12, color: 'var(--ink-faint)', margin: '0 0 3px', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tagline}</p>}
                    {topIng && <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{topIng.symbol} {lang === 'ko' && topIng.nameKo ? topIng.nameKo : topIng.name}</span>}
                  </div>
                  <Icon name="arrow" size={14} style={{ color: 'var(--ink-faint)', flexShrink: 0 }} />
                </a>
              );
            })}
          </div>
        </Reveal>

        {/* Notable Ingredients */}
        {topIngredients.length > 0 && (
          <Reveal delay={160}>
            <div style={{ marginTop: 36 }}>
              <Sticker color="butter" rotate={3}>{t('Notable Ingredients', '주목할 성분')}</Sticker>
              <p style={{ fontSize: 13, color: 'var(--ink-faint)', margin: '8px 0 14px' }}>
                {t('Tap any ingredient \u2014 we\u2019ll explain exactly what it does.', '성분을 눌러보세요. 정확히 뭘 하는지 알려드려요.')}
              </p>
              <BrandIngScroll>
                {topIngredients.map((ing, i) => (
                  <div key={ing.name} className="ing-card" style={{ '--i': i }}>
                    <button onClick={() => setSelIng(ingDict[ing.name] || ing)} className="ing-card-main">
                      <span className="ing-sym">{ing.symbol}</span>
                      <div className="ing-body">
                        <p className="ing-name">{t(ing.name, ing.nameKo || ing.name)}</p>
                      </div>
                      {brandProducts.length > 1 && <span className="ing-pct">{ing.count}/{brandProducts.length}</span>}
                    </button>
                  </div>
                ))}
              </BrandIngScroll>
            </div>
          </Reveal>
        )}

        {/* Mentioned in */}
        {(() => {
          const mentioned = (articles || []).filter(a =>
            (a.bodyBlocks || []).some(b =>
              b.type === 'prodCards' && (b.cards || []).some(c =>
                c.brand && c.brand.toLowerCase() === selectedBrand.name.toLowerCase()
              )
            )
          );
          if (!mentioned.length) return null;
          return (
            <Reveal delay={240}>
              <div style={{ marginTop: 36 }}>
                <Sticker color="accent" rotate={-2}>{t('editorial', '\uc5d0\ub514\ud1a0\ub9ac\uc5bc')}</Sticker>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 17, color: 'var(--ink)', margin: '8px 0 14px' }}>
                  {t('Mentioned in', '\uad00\ub828 \uc544\ud2f0\ud074')}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {mentioned.map(a => (
                    <a key={a.id} href={'/article/' + (a.tag?.en || 'skincare').toLowerCase().replace(/\s+/g, '-') + '/' + a.date + '/' + a.id}
                      onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/article/' + (a.tag?.en || 'skincare').toLowerCase().replace(/\s+/g, '-') + '/' + a.date + '/' + a.id); window.dispatchEvent(new PopStateEvent('popstate')); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                      {a.imageUrl && <img src={a.imageUrl} alt="" style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }} />}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', margin: 0, lineHeight: 1.3 }}>{lang === 'ko' ? a.title?.ko : a.title?.en}</p>
                        <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{a.tag?.[lang === 'ko' ? 'ko' : 'en']}</span>
                      </div>
                      <Icon name="arrow" size={14} style={{ color: 'var(--ink-faint)', flexShrink: 0 }} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })()}

        <p style={{ fontSize: 11, color: 'var(--ink-faint)', margin: '40px 0 0', lineHeight: 1.6, fontStyle: 'italic', maxWidth: '100%' }}>
          {t(
            `ana2me is not affiliated with, endorsed by, or sponsored by ${selectedBrand.name}. Product information is sourced from publicly available ingredient lists and independent analysis.`,
            `ana2me\ub294 ${selectedBrand.name}\uc640(\uacfc) \uc81c\ud734, \ubcf4\uc99d, \ud6c4\uc6d0 \uad00\uacc4\uac00 \uc5c6\uc2b5\ub2c8\ub2e4. \uc81c\ud488 \uc815\ubcf4\ub294 \uacf5\uac1c\ub41c \uc131\ubd84 \ubaa9\ub85d\uacfc \ub3c5\ub9bd\uc801 \ubd84\uc11d\uc744 \uae30\ubc18\uc73c\ub85c \ud569\ub2c8\ub2e4.`
          )}
        </p>

        <a href="/brands" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/brands'); window.dispatchEvent(new PopStateEvent('popstate')); }} style={{ fontSize: 12, fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: 3, color: '#a07850', display: 'inline-block', marginTop: 12 }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
          {t('See all brands', '모든 브랜드 보기')}
        </a>

        {(() => {
          const brandIngs = new Set(brandProducts.flatMap(p => (p.ingredients || []).map(i => i.name)));
          const scored = brands
            .filter(b => b.name !== selectedBrand.name)
            .map(b => {
              const otherIngNames = new Set(b.products.flatMap(p => (p.ingredients || []).map(i => i.name)));
              let shared = 0;
              brandIngs.forEach(name => { if (otherIngNames.has(name)) shared++; });
              const currentUnique = brandIngs.size - shared;
              const otherUnique = otherIngNames.size - shared;
              return { ...b, overlap: shared, currentUnique, otherUnique };
            })
            .sort((a, b) => b.overlap - a.overlap)
            .slice(0, 3);
          if (!scored.length) return null;
          return (
            <Reveal delay={320}>
              <section style={{ marginTop: 48 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, letterSpacing: '-0.01em', margin: '0 0 12px', color: 'var(--ink)' }}>
                  {t('You might also like', '이런 브랜드는 어때요')}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {scored.map(b => (
                    <a key={b.slug} href={'/brands/' + b.slug}
                      onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/brands/' + b.slug); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0, 0); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 'var(--radius)', background: 'var(--cream-card)', border: '1px solid var(--line)', textDecoration: 'none', color: 'inherit', transition: 'border-color 0.15s' }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 4px' }}>
                          <h4 style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0, color: 'var(--ink)' }}>{b.name}</h4>
                          {BRAND_INFO[b.name]?.origin && <span style={{ fontSize: 10, color: 'var(--ink-faint)' }}>{({'Korea': '\ud83c\uddf0\ud83c\uddf7', 'France': '\ud83c\uddeb\ud83c\uddf7', 'UK': '\ud83c\uddec\ud83c\udde7', 'Japan': '\ud83c\uddef\ud83c\uddf5', 'USA': '\ud83c\uddfa\ud83c\uddf8'})[BRAND_INFO[b.name].origin.split(', ').pop()] || '\ud83c\udf0d'}</span>}
                        </div>
                        {BRAND_INFO[b.name] && <p style={{ fontSize: 12, color: 'var(--ink-faint)', margin: 0, lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{t(BRAND_INFO[b.name].en, BRAND_INFO[b.name].ko)}</p>}
                      </div>
                      <Icon name="arrow" size={14} style={{ color: 'var(--ink-faint)', flexShrink: 0 }} />
                    </a>
                  ))}
                </div>
              </section>
            </Reveal>
          );
        })()}

        {selIng && (
          <div className="sheet-back" onClick={() => setSelIng(null)}>
            <div className="sheet" onClick={(e) => e.stopPropagation()}>
              <button className="sheet-close" onClick={() => setSelIng(null)}><Icon name="x" size={16} /></button>
              <div className="sheet-sym">{selIng.symbol}</div>
              <h3 className="sheet-name">{lang === 'ko' && selIng.nameKo ? selIng.nameKo : selIng.name}</h3>
              <p className="sheet-sci">{lang === 'ko' && selIng.scienceKo ? selIng.scienceKo : selIng.science}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Category filter for brand listing
  const cats = [
    { id: 'skincare', en: 'Skincare', ko: '\uc2a4\ud0a8\ucf00\uc5b4' },
    { id: 'fragrance', en: 'Fragrance', ko: '\ud5a5\uc218' },
    { id: 'wellness-food', en: 'Wellness', ko: '\uc6f0\ub2c8\uc2a4' },
  ];

  const filteredBrands = useMemo(() => {
    if (!activeCat) return brands;
    return brands.filter(b => b.products.some(p => p.category === activeCat));
  }, [brands, activeCat]);

  // Brand listing view
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '8px 28px 48px' }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 500, color: 'var(--ink-faint)', margin: '6px 0 18px' }}>
        <a href="/products" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/products'); window.dispatchEvent(new PopStateEvent('popstate')); }} style={{ color: 'var(--ink-faint)', textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-faint)'}>{t('Products', '제품')}</a>
        <span style={{ opacity: 0.35 }}>/</span>
        <span style={{ color: 'var(--ink-soft)' }}>{t('All Brands', '모든 브랜드')}</span>
      </nav>

      <div style={{ position: 'relative' }}>
        {/* Sticky alphabet sidebar */}
        {(() => {
          const letters = [...new Set(filteredBrands.map(b => b.name[0].toUpperCase()))].sort();
          return (
            <nav style={{ position: 'fixed', right: 'max(8px, calc((100vw - 720px) / 2 - 40px))', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, zIndex: 10 }}>
              {letters.map(l => (
                <a key={l} href={'#brand-' + l} onClick={(e) => { e.preventDefault(); document.getElementById('brand-' + l)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} style={{ width: 22, height: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: 10, fontWeight: 600, color: 'var(--ink-faint)', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.15s' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-faint)'; }}>
                  {l}
                </a>
              ))}
            </nav>
          );
        })()}

        {/* Brand list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, paddingRight: 32 }}>
          {(() => {
            let lastLetter = '';
            return filteredBrands.map((brand) => {
              const letter = brand.name[0].toUpperCase();
              const showLetter = letter !== lastLetter;
              lastLetter = letter;
              return (
                <div key={brand.slug}>
                  {showLetter && (
                    <div id={'brand-' + letter} style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--accent)', padding: '20px 0 8px', scrollMarginTop: 80 }}>
                      {letter}
                    </div>
                  )}
                  <a
                    href={'/brands/' + brand.slug}
                    onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/brands/' + brand.slug); window.dispatchEvent(new PopStateEvent('popstate')); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0',
                      borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'inherit', cursor: 'pointer',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 15, color: 'var(--ink)', margin: 0 }}>
                        {brand.name}
                      </h3>
                    </div>
                  </a>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
};
