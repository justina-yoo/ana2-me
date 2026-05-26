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
    en: 'A Seoul-based skincare brand founded in 2021 by Mihwa Kim under Beautyselection Co. Their flagship Bio-Collagen Real Deep Mask uses low-molecular-weight collagen and EWG Verified\u2122 ingredients, with a focus on barrier-supportive formulations.',
    ko: '2021\ub144 \uae40\ubbf8\ud654\uac00 \ubdf0\ud2f0\uc140\ub809\uc158 \uc0b0\ud558\ub85c \uc124\ub9bd\ud55c \uc11c\uc6b8 \uae30\ubc18 \uc2a4\ud0a8\ucf00\uc5b4 \ube0c\ub79c\ub4dc\uc608\uc694. \ub300\ud45c \uc81c\ud488\uc778 \ubc14\uc774\uc624\ucf5c\ub77c\uac90 \ub9ac\uc5bc \ub525 \ub9c8\uc2a4\ud06c\ub294 \uc800\ubd84\uc790 \ucf5c\ub77c\uac90\uacfc EWG Verified\u2122 \uc131\ubd84\uc744 \uc0ac\uc6a9\ud574\uc694.',
    origin: 'Seoul, Korea', founded: '2021',
    sources: [
      { label: 'Biodance Brand Story \u2014 Mistia Shop', url: 'https://mistiashop.ca/blogs/news/brand-story-biodance' },
      { label: 'Biodance Official Site', url: 'https://biodance.com/' },
    ]
  },
  'COSRX': {
    en: 'A Korean skincare brand founded in 2013 by Jun Sang-hun, now a subsidiary of Amorepacific Group. The name stands for "Cosmetics + RX (Prescription)," reflecting their ingredient-first approach built on actives like snail mucin, BHA, and centella.',
    ko: '2013\ub144 \uc804\uc0c1\ud6c8\uc774 \uc124\ub9bd\ud55c \uc2a4\ud0a8\ucf00\uc5b4 \ube0c\ub79c\ub4dc\ub85c, \ud604\uc7ac \uc544\ubaa8\ub808\ud37c\uc2dc\ud53d \uadf8\ub8f9 \uc0b0\ud558\uc608\uc694. \uc774\ub984\uc740 "Cosmetics + RX(\ucc98\ubc29)"\uc758 \uc57d\uc790\ub85c, \uc2a4\ub124\uc77c \ubba4\uc2e0, BHA, \uc13c\ud154\ub77c \uac19\uc740 \ud65c\uc131 \uc131\ubd84 \uc911\uc2ec\uc758 \ucca0\ud559\uc744 \ub2f4\uace0 \uc788\uc5b4\uc694.',
    origin: 'Seoul, Korea', founded: '2013',
    sources: [
      { label: 'Amorepacific acquires COSRX \u2014 PR Newswire', url: 'https://www.prnewswire.com/news-releases/amorepacific-incorporates-cosrx-as-a-subsidiary-through-additional-stake-acquisition-301972048.html' },
      { label: 'History of COSRX \u2014 Arktastic', url: 'https://www.arktastic.com/blog/skincare/history-of-cosrx' },
    ]
  },
  'Centellian24': {
    en: 'Dongguk Pharmaceutical\'s dermocosmetic brand, drawing on the company\'s centella asiatica expertise since 1968. Their Madeca Cream line uses proprietary fermented centella technology and madecassic acid for barrier support.',
    ko: '\ub3d9\uad6d\uc81c\uc57d\uc758 \ub354\ub9c8\ucf54\uc2a4\uba54\ud2f1 \ube0c\ub79c\ub4dc\ub85c, 1968\ub144\ubd80\ud130 \uc774\uc5b4\uc628 \ubcd1\ud480 \uc5f0\uad6c \ub178\ud558\uc6b0\ub97c \uae30\ubc18\uc73c\ub85c \ud574\uc694. \ub9c8\ub370\uce74\ud06c\ub9bc \ub77c\uc778\uc740 \ub3c5\uc790\uc801\uc778 \ubc1c\ud6a8 \uc13c\ud154\ub77c \uae30\uc220\uacfc \ub9c8\ub370\uce74\uc2dd\uc0b0\uc73c\ub85c \uc7a5\ubcbd\uc744 \ub3c4\uc640\uc918\uc694.',
    origin: 'Seoul, Korea', founded: '2015'
  },
  'Chanel': {
    en: 'The French luxury house whose fragrance division dates back to No. 5 in 1921. Their in-house perfumers (including Olivier Polge, house perfumer since 2013) work with dedicated flower fields in Grasse, France.',
    ko: '1921\ub144 No. 5\ub85c \uc2dc\uc791\ub41c \ud5a5\uc218 \ubd80\ubb38\uc744 \uac00\uc9c4 \ud504\ub791\uc2a4 \ub7ed\uc154\ub9ac \ud558\uc6b0\uc2a4\uc608\uc694. 2013\ub144\ubd80\ud130 \uc804\uc18d \uc870\ud5a5\uc0ac\uc778 \uc62c\ub9ac\ube44\uc5d0 \ud3f4\uc8fc\uac00 \uadf8\ub77c\uc2a4 \uc9c0\uc5ed \uc804\uc6a9 \uaf43\ubc2d\uc5d0\uc11c \uc6d0\ub8cc\ub97c \uc870\ub2ec\ud574\uc694.',
    origin: 'Paris, France', founded: '1910'
  },
  'Diptyque': {
    en: 'A Parisian fragrance maison founded in 1961 by three artists. Known for sophisticated, unisex compositions that balance botanical precision with artistic storytelling.',
    ko: '1961년 세 명의 아티스트가 설립한 파리 프래그런스 메종이에요. 식물학적 정밀함과 예술적 스토리텔링을 균형 있게 조합한 유니섹스 향으로 유명해요.',
    origin: 'Paris, France', founded: '1961'
  },
  'Dr. Jart+': {
    en: 'A Korean dermocosmetic brand that bridges the gap between professional skincare and daily routines. Their Ceramidin and Cicapair lines are built on potent actives made accessible for everyday use.',
    ko: '전문 스킨케어와 일상 루틴의 간극을 잇는 한국 더모코스메틱 브랜드예요. 세라마이딘과 시카페어 라인은 고효능 활성 성분을 일상에서 쉽게 쓸 수 있게 만든 거예요.',
    origin: 'Seoul, Korea', founded: '2004'
  },
  'EIoM': {
    en: 'A microbiome-focused K-beauty brand designed for blemish-prone and sensitive skin. Their formulations center on fermented biotics and tea tree biome complexes to support the skin\'s natural balance.',
    ko: '트러블성, 민감성 피부를 위한 마이크로바이옴 중심 K-뷰티 브랜드예요. 발효 바이오틱스와 티트리 바이옴 복합체로 피부의 자연 밸런스를 돕는 데 집중해요.',
    origin: 'Seoul, Korea'
  },
  'Jo Malone London': {
    en: 'A British fragrance house known for elegant simplicity and the art of layering. Each scent is designed to be worn alone or combined, creating a personalized fragrance wardrobe.',
    ko: '우아한 심플함과 레이어링 아트로 유명한 영국 프래그런스 하우스예요. 각 향은 단독 또는 조합하여 개인화된 향수 워드로브를 만들 수 있게 설계됐어요.',
    origin: 'London, UK', founded: '1994'
  },
  'La Roche-Posay': {
    en: 'A French dermocosmetic brand widely used in dermatological practice. Every product is formulated with their proprietary La Roche-Posay thermal spring water and tested on sensitive skin.',
    ko: '피부과에서 널리 사용되는 프랑스 더모코스메틱 브랜드예요. 모든 제품이 독자적인 라로슈포제 온천수로 제형화되고 민감성 피부에서 테스트돼요.',
    origin: 'La Roche-Posay, France', founded: '1975'
  },
  'Lavida': {
    en: 'A Korean skincare brand by Coreana Cosmetics focused on age-care formulations. Their product lines combine traditional Korean herbal ingredients with modern delivery systems.',
    ko: '코리아나 화장품의 에이지 케어 스킨케어 브랜드예요. 한국 전통 한방 원료와 현대적 전달 기술을 결합한 제품 라인을 선보여요.',
    origin: 'Seoul, Korea'
  },
  'Meditherapy': {
    en: 'A Korean dermocosmetic brand specializing in lifting and firming treatments for home use. Their Inmotox Tension Up Mask uses elastic hydrogel technology that physically lifts facial contours during wear.',
    ko: '리프팅·탄력 트리트먼트를 홈케어로 구현한 한국 더마코스메틱 브랜드예요. 인모톡스 텐션 업 마스크는 착용 시 얼굴 윤곽을 물리적으로 리프팅하는 탄력 하이드로젤 기술을 사용해요.',
    origin: 'Seoul, Korea'
  },
  'Medicube': {
    en: 'A Korean beauty-tech brand that brings advanced skincare technology into at-home devices and formulations. Known for their AGE-R device line and pore-focused products.',
    ko: '첨단 스킨케어 기술을 홈케어 디바이스와 제형에 접목한 한국 뷰티테크 브랜드예요. AGE-R 디바이스 라인과 모공 중심 제품으로 유명해요.',
    origin: 'Seoul, Korea', founded: '2015'
  },
  'Mediheal': {
    en: 'A Korean sheet mask brand founded in 2009 by Kwon Oh-sub under L&P Cosmetic. Their masks use bio-cellulose and hydrogel formats to deliver concentrated actives.',
    ko: '2009\ub144 \uad8c\uc624\uc12d\uc774 L&P \ucf54\uc2a4\uba54\ud2f1 \uc0b0\ud558\ub85c \uc124\ub9bd\ud55c \ub9c8\uc2a4\ud06c\ud329 \ube0c\ub79c\ub4dc\uc608\uc694. \ubc14\uc774\uc624\uc140\ub8f0\ub85c\uc2a4\uc640 \ud558\uc774\ub4dc\ub85c\uac94 \ud615\ud0dc\ub85c \uace0\ub18d\ucd95 \ud65c\uc131 \uc131\ubd84\uc744 \uc804\ub2ec\ud574\uc694.',
    origin: 'Seoul, Korea', founded: '2009',
    sources: [
      { label: 'Mediheal US Launch \u2014 PR Newswire', url: 'https://www.prnewswire.com/news-releases/mediheal-koreas-1-sheet-mask-brand-launches-in-united-states-300887933.html' },
      { label: 'Mediheal Founder \u2014 Korea Times', url: 'https://www.koreatimes.co.kr/www/tech/2025/01/129_223052.html' },
    ]
  },
  'Medion': {
    en: 'A Japanese skincare brand founded by Dr. Masato Hiki (MD/PhD, Osaka City University), who developed the first dermatology-grade carbonated gel mask. Their CO2 gel masks use dissolved carbon dioxide based on carboxytherapy principles.',
    ko: '\uc624\uc0ac\uce74 \uc2dc\ub9bd\ub300 \uc758\ud559\ubc15\uc0ac \ud788\ud0a4 \ub9c8\uc0ac\ud1a0\uac00 \uc124\ub9bd\ud55c \uc77c\ubcf8 \uc2a4\ud0a8\ucf00\uc5b4 \ube0c\ub79c\ub4dc\uc608\uc694. \ud53c\ubd80\uacfc \uc6a9 \ud0c4\uc0b0 \uc824 \ub9c8\uc2a4\ud06c\ub97c \ucd5c\ucd08\ub85c \uac1c\ubc1c\ud588\uc73c\uba70, CO2 \uc824 \ub9c8\uc2a4\ud06c\ub294 \uce74\ubcf5\uc2dc\ud14c\ub77c\ud53c \uc6d0\ub9ac\ub97c \uae30\ubc18\uc73c\ub85c \ud574\uc694.',
    origin: 'Osaka, Japan',
    sources: [
      { label: 'About Dr. Medion \u2014 Official EU Site', url: 'https://drmedion.eu/en/about-us/' },
    ]
  },
  'Round Lab': {
    en: 'A Korean skincare brand built around Korea\'s natural water sources. Each line is formulated with a different regional mineral water \u2014 Dokdo deep sea water, Birch juice, Mugwort \u2014 for targeted hydration.',
    ko: '한국의 자연수를 중심으로 만든 스킨케어 브랜드예요. 독도 심층수, 자작나무 수액, 쑥 등 지역별 미네랄 워터로 맞춤 보습을 설계해요.',
    origin: 'Seoul, Korea', founded: '2019'
  },
  'Standard Seoul': {
    en: 'A K-beauty brand known for their patented capsule formulas. Each product uses encapsulated actives that release on contact with skin for targeted delivery.',
    ko: '\ud2b9\ud5c8 \uce85\uc290 \ud3ec\ubbac\ub7ec\ub85c \uc54c\ub824\uc9c4 K-\ubdf0\ud2f0 \ube0c\ub79c\ub4dc\uc608\uc694. \ud53c\ubd80\uc5d0 \ub2ff\uc73c\uba74 \ud130\uc9c0\ub294 \uce85\uc290\ud654 \ud65c\uc131 \uc131\ubd84\uc73c\ub85c \ud0c0\uae43 \uc804\ub2ec\uc744 \ub3c4\uc640\uc918\uc694.',
    origin: 'Seoul, Korea'
  },
  'Tamburins': {
    en: 'A Korean fragrance and body care brand under Gentle Monster\'s parent company. Their scents blend minimalist Korean aesthetics with bold, art-forward storytelling and gallery-like retail spaces.',
    ko: '젠틀몬스터 모회사 산하의 한국 프래그런스 & 바디케어 브랜드예요. 미니멀한 한국적 미학과 대담한 아트 스토리텔링, 갤러리 같은 매장 공간을 결합해요.',
    origin: 'Seoul, Korea', founded: '2017'
  },
  'beplain': {
    en: 'A Korean clean beauty brand under Moments Company, an affiliate of Birdview (operator of the Hwahae beauty review platform). Their formulations emphasize gentle, gender-neutral ingredients, with the Mung Bean line as their signature range.',
    ko: '\ud654\ud574 \uc6b4\uc601\uc0ac \ubc84\ub4dc\ubdf0 \uacc4\uc5f4 \ubaa8\uba3c\uce20\ucef4\ud37c\ub2c8 \uc0b0\ud558\uc758 \ud55c\uad6d \ud074\ub9b0 \ubdf0\ud2f0 \ube0c\ub79c\ub4dc\uc608\uc694. \uc21c\ud558\uace0 \uc820\ub354 \ub274\ud2b8\ub7f4\ud55c \uc131\ubd84\uc744 \uac15\uc870\ud558\uba70, \ub179\ub450 \ub77c\uc778\uc774 \ub300\ud45c \uc81c\ud488\uad70\uc774\uc5d0\uc694.',
    origin: 'Seoul, Korea', founded: '2019',
    sources: [
      { label: 'beplain Brand Deep Dive \u2014 Hey K-Beauty', url: 'https://heykbeauty.com/brand-deep-dive-beplain/' },
    ]
  },
  'mixsoon': {
    en: 'A Korean skincare brand built around minimalism and single-core ingredients. The name combines "mix" with the Korean word soon (\u7d14), meaning pure \u2014 each product features one hero extract at maximum concentration.',
    ko: '미니멀리즘과 단일 핵심 성분을 중심으로 만든 한국 스킨케어 브랜드예요. 이름은 mix와 순(純)의 결합으로, 각 제품이 하나의 히어로 추출물을 최대 농도로 담아요.',
    origin: 'Seoul, Korea', founded: '2020'
  },
  'Anua': {
    en: 'A Korean skincare brand founded in 2019 by The Founders, a brand incubator led by Lee Sunhyung and Lee Changjoo. Built around heartleaf (\uc5b4\uc131\ucd08, Houttuynia Cordata) and birch juice, the brand was designed from inception for global DTC distribution.',
    ko: '2019\ub144 \ube0c\ub79c\ub4dc \uc778\ud050\ubca0\uc774\ud130 \ub354\ud30c\uc6b4\ub354\uc2a4\uac00 \ub9cc\ub4e0 \uc2a4\ud0a8\ucf00\uc5b4 \ube0c\ub79c\ub4dc\uc608\uc694. \uc5b4\uc131\ucd08\uc640 \uc790\uc791\ub098\ubb34 \uc218\uc561\uc744 \ud575\uc2ec \uc131\ubd84\uc73c\ub85c, \ucc98\uc74c\ubd80\ud130 \uae00\ub85c\ubc8c DTC \uc720\ud1b5\uc744 \uc704\ud574 \uc124\uacc4\ub41c \ube0c\ub79c\ub4dc\uc608\uc694.',
    origin: 'Seoul, Korea', founded: '2020',
    sources: [
      { label: 'History of Anua \u2014 Arktastic', url: 'https://www.arktastic.com/blog/skincare/the-history-of-anua' },
      { label: 'Anua lands at every Ulta store \u2014 GCI Magazine', url: 'https://www.gcimagazine.com/brands-products/skin-care/news/22929488/kbeauty-brand-anua-is-landing-at-every-ulta-store-in-2025' },
    ]
  },
  'Beauty of Joseon': {
    en: 'A Korean skincare brand that reinterprets Joseon Dynasty (조선시대) beauty rituals with modern formulation science. Their hero ingredients — propolis, ginseng, rice — are drawn from historical Korean beauty texts.',
    ko: '조선시대 미용 비법을 현대 제형 과학으로 재해석한 한국 스킨케어 브랜드예요. 프로폴리스, 인삼, 쌀 등 한국 전통 미용서에서 영감받은 히어로 성분을 사용해요.',
    origin: 'Seoul, Korea', founded: '2017'
  },
  'goodal': {
    en: 'A Korean skincare brand under Clio Cosmetics (a publicly traded company also behind Peripera). Their Green Tangerine Vita C line uses organic green tangerine extract from Jeju Island as a natural vitamin C source.',
    ko: '\uc0c1\uc7a5\uc0ac \ud074\ub9ac\uc624 \ucf54\uc2a4\uba54\ud2f1(\ud398\ub9ac\ud398\ub77c \ub4f1 \uc6b4\uc601) \uc0b0\ud558\uc758 \ud55c\uad6d \uc2a4\ud0a8\ucf00\uc5b4 \ube0c\ub79c\ub4dc\uc608\uc694. \uccad\uadc0 \ube44\ud0c0C \ub77c\uc778\uc740 \uc81c\uc8fc\ub3c4 \uc720\uae30\ub18d \uccad\uadc0 \ucd94\ucd9c\ubb3c\uc744 \ucc9c\uc5f0 \ube44\ud0c0\ubbfc C \uc6d0\ub8cc\ub85c \ud65c\uc6a9\ud574\uc694.',
    origin: 'Seoul, Korea', founded: '2012',
    sources: [
      { label: 'goodal Green Tangerine line upgrade \u2014 PR Newswire', url: 'https://www.prnewswire.com/news-releases/goodal-leans-into-advanced-korean-skincare-technology-with-upgraded-green-tangerine-line-building-us-leadership-302704341.html' },
      { label: 'Clio Cosmetics \u2014 Wikipedia', url: 'https://en.wikipedia.org/wiki/Clio_Cosmetics' },
    ]
  },
  'numbuzin': {
    en: 'A Korean skincare brand that numbers each product by skin concern — No.3 for pores, No.5 for brightening. Their multi-vitamin formulations combine glutathione, tranexamic acid, and niacinamide for a data-driven approach to tone evening.',
    ko: '피부 고민별로 제품에 번호를 매기는 한국 스킨케어 브랜드예요 — 3번은 모공, 5번은 브라이트닝. 글루타치온, 트라넥삼산, 나이아신아마이드를 조합한 멀티비타민 제형으로 피부톤 관리에 집중해요.',
    origin: 'Seoul, Korea', founded: '2022'
  },
  'SKIN1004': {
    en: 'A Korean skincare brand founded by Kim Yoonjin, specializing in Centella Asiatica sourced from Madagascar. Their Madagascar Centella Ampoule is a minimal-ingredient formula built around a single-origin centella extract.',
    ko: '\uae40\uc724\uc9c4\uc774 \uc124\ub9bd\ud55c \ud55c\uad6d \uc2a4\ud0a8\ucf00\uc5b4 \ube0c\ub79c\ub4dc\ub85c, \ub9c8\ub2e4\uac00\uc2a4\uce74\ub974\uc0b0 \uc13c\ud154\ub77c \uc544\uc2dc\uc544\ud2f0\uce74\ub97c \uc804\ubb38\uc73c\ub85c \ud574\uc694. \ub300\ud45c \uc81c\ud488\uc778 \uc13c\ud154\ub77c \uc568\ud480\uc740 \ub2e8\uc77c \uc0b0\uc9c0 \uc13c\ud154\ub77c \ucd94\ucd9c\ubb3c\uc744 \uc911\uc2ec\uc73c\ub85c \ud55c \ubbf8\ub2c8\ub9d0 \ud3ec\ubbac\ub7ec\uc608\uc694.',
    origin: 'Seoul, Korea', founded: '2017',
    sources: [
      { label: 'SKIN1004 K-beauty range \u2014 Arktastic', url: 'https://www.arktastic.com/blog/skincare/skin1004-kbeauty-range' },
      { label: 'Madagascar Centella Ampoule \u2014 Mirai Skin', url: 'https://www.mirai-skin.com/blogs/news/skin-1004-madagascar-centella-ampoule' },
    ]
  },
  'Ollocdam': {
    en: 'A Korean wellness brand focused on premium extra virgin olive oil supplements. Their Olive3 capsules use cold-pressed EVOO rich in polyphenols and oleocanthal for daily antioxidant support.',
    ko: '프리미엄 엑스트라 버진 올리브 오일 건강기능식품에 집중하는 한국 웰니스 브랜드예요. 올리브3 캡슐은 폴리페놀과 올레오칸탈이 풍부한 냉압착 EVOO를 사용해요.',
    origin: 'Seoul, Korea'
  },
  'AESTURA': {
    en: 'A Korean dermocosmetic brand by Amore Pacific focused on barrier care for dry and sensitive skin. Their patented DermaON® technology uses multi-lamellar ceramide capsules that mimic the skin\'s own lipid structure. The Atobarrier365 line is widely recommended in Korean dermatology clinics.',
    ko: '아모레퍼시픽 산하의 한국 더모코스메틱 브랜드로, 건성·민감 피부의 장벽 케어에 집중해요. 특허 DermaON® 기술은 피부 자체 지질 구조를 모방하는 다중층 세라마이드 캡슐을 사용해요. 아토배리어365 라인은 한국 피부과에서 널리 추천돼요.',
    origin: 'Seoul, Korea'
  },
  'AP Beauty': {
    en: 'Amore Pacific\'s prestige skincare brand, backed by 70+ years of Korean skin research. Their formulations feature patented ingredients like PDRN and EXOYNE, combining traditional Korean botanical science with advanced biotechnology.',
    ko: '70년 이상의 한국 피부 연구를 기반으로 한 아모레퍼시픽의 프레스티지 스킨케어 브랜드예요. PDRN, 엑소인 등 특허 성분을 활용해 한국 전통 식물 과학과 첨단 바이오 기술을 결합해요.',
    origin: 'Seoul, Korea', founded: '1945'
  },
  'The Ordinary': {
    en: 'A Canadian skincare brand under DECIEM, known for single-ingredient, high-concentration formulas at accessible prices. Their clinical approach strips away marketing and focuses on active percentages, pH levels, and formulation transparency.',
    ko: 'DECIEM 산하의 캐나다 스킨케어 브랜드로, 합리적인 가격에 단일 성분 고농축 포뮬라로 유명해요. 마케팅을 걷어내고 활성 성분 함량, pH, 제형 투명성에 집중하는 클리니컬 접근 방식이에요.',
    origin: 'Toronto, Canada', founded: '2016'
  },
  'Torriden': {
    en: 'A Korean skincare brand specializing in low-molecular-weight hyaluronic acid hydration. Their DIVE IN line uses 5 types of hyaluronic acid at different molecular weights for multi-depth moisture delivery.',
    ko: '저분자 히알루론산 보습을 전문으로 하는 한국 스킨케어 브랜드예요. DIVE IN 라인은 5종의 다른 분자량 히알루론산으로 다층 깊이 수분 전달을 해요.',
    origin: 'Seoul, Korea', founded: '2020'
  },
  'Sulwhasoo': {
    en: 'Amore Pacific\'s flagship luxury brand, rooted in over 50 years of Korean herbal medicine (한방) research. Their formulations blend traditional hanbang ingredients — ginseng, plum, lotus — with modern skin science. The Gentle Cleansing Oil and First Care Activating Serum are category benchmarks.',
    ko: '50년 이상의 한방 연구를 기반으로 한 아모레퍼시픽의 대표 럭셔리 브랜드예요. 인삼, 매실, 연꽃 등 전통 한방 원료를 현대 피부 과학과 결합한 제형을 선보여요. 순행 클렌징 오일과 퍼스트 케어 액티베이팅 세럼은 카테고리 벤치마크예요.',
    origin: 'Seoul, Korea', founded: '1966'
  },
  'celimax': {
    en: 'A Korean skincare brand that combines clinical-grade actives with gentle, non-irritating formulas. Their Vita-A Retinal Shot uses proprietary A-Shot™ microparticles — 16x smaller than pores — for deeper active delivery without the irritation.',
    ko: '클리니컬 등급 활성 성분과 순한 제형을 결합한 한국 스킨케어 브랜드예요. 비타-A 레티날 샷은 모공보다 16배 작은 독자 A-Shot™ 마이크로 입자로 자극 없이 깊은 전달을 해요.',
    origin: 'Seoul, Korea'
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
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 12px', lineHeight: 1.65 }}>
              {t(info.en, info.ko)}
            </p>
          )}
          {info && info.sources && info.sources.length > 0 && (
            <details style={{ margin: '0 0 28px' }}>
              <summary style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--ink-faint)',
                cursor: 'pointer', listStyle: 'none', display: 'flex',
                alignItems: 'center', gap: 6, userSelect: 'none',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: 'transform 0.2s', flexShrink: 0 }}
                  className="sources-chevron">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
                {t('Sources', '\ucd9c\ucc98')}
              </summary>
              <ol style={{
                margin: 0, padding: '10px 0 0 16px',
                display: 'flex', flexDirection: 'column', gap: 4,
              }}>
                {info.sources.map((src, si) => (
                  <li key={si} style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--ink-faint)' }}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-faint)', textDecoration: 'underline', textUnderlineOffset: 2 }}>{src.label}</a>
                  </li>
                ))}
              </ol>
            </details>
          )}
          {info && !info.sources && <div style={{ marginBottom: 16 }} />}
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
                  <div style={{ width: 72, height: 72, borderRadius: 'var(--radius-sm)', flexShrink: 0, background: 'var(--cream-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src={p.imageUrl} alt={p.brand + ' ' + name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                  </div>
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
