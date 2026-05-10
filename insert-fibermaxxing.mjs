// Insert fibermaxxing article into Supabase
// Run: node insert-fibermaxxing.mjs

const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';

const article = {
  id: 'fibermaxxing-gut-skin-hormones',
  category: { en: 'Nutritional Intelligence', ko: '영양 인텔리전스' },
  title: {
    en: '"Fibermaxxing" — TikTok\'s Obsession With Eating 40g of Fiber a Day Is Actually Backed by Science.',
    ko: '"파이버맥싱" — 하루 식이섬유 40g, 틱톡 트렌드가 과학적으로 맞는 이유'
  },
  tag: { en: 'Wellness', ko: '웰니스' },
  tag_color: '#a07850',
  date: 'May 7, 2026',
  read_time: { en: '7 min read', ko: '7분 읽기' },
  image_url: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=800',
  excerpt: {
    en: 'Most Americans eat just 15g of fiber a day — less than half the recommended amount. New research shows that hitting 25–38g rewires your gut microbiome diversity within weeks, which directly controls skin inflammation, hormone metabolism, and immune function. TikTok calls it "fibermaxxing." Science calls it overdue.',
    ko: '미국인 평균 식이섬유 섭취량은 하루 15g에 불과해요. 최신 연구에 따르면 25~38g만 섭취해도 몇 주 안에 장내 미생물 다양성이 변하고, 이것이 피부 염증, 호르몬 대사, 면역 기능을 직접 조절합니다. 틱톡은 "파이버맥싱"이라 부르고, 과학은 "진작 했어야 할 일"이라고 말해요.'
  },
  keywords: 'fiber fibermaxxing gut microbiome diversity SCFA short-chain fatty acids butyrate skin inflammation hormone metabolism estrogen estrobolome immunity prebiotics soluble insoluble psyllium 식이섬유 파이버맥싱 장내미생물 다양성 단쇄지방산 부티레이트 피부 염증 호르몬 에스트로겐 에스트로볼롬 면역 프리바이오틱스',
  body_blocks: [
    // ─── TL;DR ───
    {
      type: 'tldr',
      icon: '🌾',
      text: {
        en: '<strong>🌾 TL;DR:</strong> "Fibermaxxing" — eating 30–40g of fiber daily — isn\'t just a TikTok trend. <strong>Dietary fiber is the single most powerful lever for gut microbiome diversity</strong>, which in turn controls skin clarity, hormone balance, and immune resilience. Most people get barely 15g. <mark>The gap between what we eat and what science recommends is the root of more problems than you think.</mark>',
        ko: '<strong>🌾 요약:</strong> 하루 30~40g의 식이섬유를 먹는 "파이버맥싱"은 단순한 틱톡 유행이 아니에요. <strong>식이섬유는 장내 미생물 다양성을 결정하는 가장 강력한 변수</strong>이고, 이 다양성이 피부 투명도, 호르몬 균형, 면역력을 좌우합니다. 대부분의 사람은 15g도 못 먹고 있어요. <mark>권장량과 실제 섭취량의 격차가 생각보다 훨씬 많은 문제의 근원입니다.</mark>'
      }
    },

    // ─── Hero Figure ───
    {
      type: 'figure',
      src: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1200',
      alt: 'Colorful array of high-fiber fruits, vegetables, and whole grains on a wooden table'
    },

    // ─── Section 1: The Fiber Gap + statCards ───
    {
      type: 'section',
      heading: {
        en: '🔍 How big is the fiber gap — and why does it matter?',
        ko: '🔍 식이섬유 격차, 얼마나 심각할까요?'
      },
      children: [
        {
          type: 'body',
          text: {
            en: 'The average American consumes just <strong>15g of fiber per day</strong> — a number that hasn\'t meaningfully changed in 20 years. The USDA recommends 25g for women and 38g for men. But emerging microbiome research from the <strong>Human Microbiome Project</strong> and the <strong>American Gut Project</strong> suggests that <mark>30–40g daily is the threshold where gut bacterial diversity truly shifts</mark>, unlocking cascading benefits for skin, hormones, and immunity.',
            ko: '미국인의 하루 평균 식이섬유 섭취량은 <strong>15g</strong>으로, 20년째 거의 변하지 않았어요. 미국 식이지침은 여성 25g, 남성 38g을 권장하지만, <strong>Human Microbiome Project</strong>와 <strong>American Gut Project</strong>의 최신 연구에 따르면 <mark>하루 30~40g이 장내 세균 다양성이 실질적으로 변하는 임계점</mark>이에요. 이 변화가 피부, 호르몬, 면역에 연쇄 효과를 만듭니다.'
          }
        },
        {
          type: 'statCards',
          cards: [
            {
              title: { en: '🥗 15g vs. 38g', ko: '🥗 15g vs. 38g' },
              desc: { en: 'Average daily fiber intake vs. USDA recommended amount for men. Most people eat less than half.', ko: '실제 평균 섭취량 대 남성 권장량. 대부분이 절반도 못 채우고 있어요.' }
            },
            {
              title: { en: '🦠 39 Trillion', ko: '🦠 39조 개' },
              desc: { en: 'Estimated number of bacteria in the human gut. Fiber is their primary fuel source.', ko: '인간 장내 세균의 추정 수. 식이섬유가 이들의 주요 에너지원이에요.' }
            },
            {
              title: { en: '📈 +4,900%', ko: '📈 +4,900%' },
              desc: { en: '"Fibermaxxing" search volume growth on TikTok since January 2026.', ko: '2026년 1월 이후 틱톡에서 "fibermaxxing" 검색량 증가율.' }
            }
          ]
        }
      ]
    },

    // ─── Section 2: Three Mechanisms — Callouts ───
    {
      type: 'section',
      heading: {
        en: '🧬 Three ways fiber rewires your body from the inside',
        ko: '🧬 식이섬유가 몸을 안에서부터 바꾸는 세 가지 경로'
      },
      children: [
        {
          type: 'callout',
          icon: '🌿',
          title: { en: '1. The Gut-Skin Axis', ko: '1. 장-피부 축 (Gut-Skin Axis)' },
          text: {
            en: 'Your gut bacteria ferment soluble fiber into <strong>short-chain fatty acids (SCFAs)</strong> — especially butyrate — which strengthen the intestinal lining and reduce systemic inflammation. <mark>When gut permeability drops, inflammatory cytokines that trigger acne, eczema, and rosacea decrease measurably.</mark> A 2025 meta-analysis in <em>Nutrients</em> found that high-fiber diets reduced acne severity scores by 32% over 12 weeks.',
            ko: '장내 세균이 수용성 식이섬유를 발효시키면 <strong>단쇄지방산(SCFA)</strong>, 특히 부티레이트가 생성돼요. 이 물질이 장벽을 강화하고 전신 염증을 줄입니다. <mark>장 투과성이 낮아지면 여드름, 습진, 주사비를 유발하는 염증성 사이토카인이 측정 가능한 수준으로 감소해요.</mark> 2025년 <em>Nutrients</em> 메타분석에서 고식이섬유 식단이 12주간 여드름 심각도를 32% 줄였어요.'
          },
          borderColor: 'rgba(45,90,61,0.2)',
          bgColor: 'rgba(45,90,61,0.04)'
        },
        {
          type: 'callout',
          icon: '⚖️',
          title: { en: '2. Hormone Metabolism & Estrogen Excretion', ko: '2. 호르몬 대사와 에스트로겐 배출' },
          text: {
            en: 'Fiber binds to excess estrogen in the gut through a process called the <strong>estrobolome</strong> — the collection of gut bacteria that metabolize estrogen. Without adequate fiber, estrogen gets reabsorbed into the bloodstream instead of excreted. <strong>This estrogen recirculation is linked to hormonal acne, PMS severity, and increased breast cancer risk.</strong> Insoluble fiber accelerates transit time, reducing reabsorption by up to 25%.',
            ko: '식이섬유는 <strong>에스트로볼롬</strong>이라 불리는 장내 세균 집단을 통해 과잉 에스트로겐을 결합시켜요. 식이섬유가 부족하면 에스트로겐이 배출되지 못하고 혈류로 재흡수됩니다. <strong>이 재순환이 호르몬성 여드름, PMS 악화, 유방암 위험 증가와 연결돼요.</strong> 불용성 식이섬유는 장 통과 시간을 빠르게 해서 재흡수를 최대 25% 줄입니다.'
          },
          borderColor: 'rgba(107,142,107,0.25)',
          bgColor: 'rgba(107,142,107,0.06)'
        },
        {
          type: 'callout',
          icon: '⚡',
          title: { en: '3. SCFA Production & Immune Programming', ko: '3. 단쇄지방산 생성과 면역 프로그래밍' },
          text: {
            en: 'Butyrate, propionate, and acetate — the three major SCFAs — don\'t just feed your gut lining. They <strong>program regulatory T-cells (Tregs)</strong> that prevent your immune system from overreacting. <mark>Low-fiber diets produce fewer SCFAs, leading to a pro-inflammatory immune state that shows up as chronic skin sensitivity, food intolerances, and autoimmune flares.</mark>',
            ko: '부티레이트, 프로피오네이트, 아세테이트 — 3대 단쇄지방산은 장벽만 먹여 살리는 게 아니에요. <strong>면역 조절 T세포(Treg)</strong>를 프로그래밍해서 면역 과잉 반응을 막아줍니다. <mark>저식이섬유 식단은 SCFA 생산을 줄여 만성 피부 민감성, 음식 불내증, 자가면역 악화로 이어지는 염증 상태를 만들어요.</mark>'
          },
          borderColor: 'rgba(245,215,110,0.4)',
          bgColor: 'rgba(245,215,110,0.1)'
        }
      ]
    },

    // ─── Section 3: Practical Tips — Grid ───
    {
      type: 'section',
      heading: {
        en: '🌿 How to actually fibermax without wrecking your gut',
        ko: '🌿 장을 망가뜨리지 않고 파이버맥싱하는 법'
      },
      children: [
        {
          type: 'body',
          text: {
            en: 'Going from 15g to 40g overnight is a recipe for bloating, gas, and misery. <strong>The science says go slow.</strong> Your gut bacteria need time to upregulate the enzymes that ferment fiber efficiently.',
            ko: '15g에서 갑자기 40g으로 올리면 복부팽만, 가스, 고통이 찾아와요. <strong>과학이 말하는 정답은 천천히 늘리는 것.</strong> 장내 세균이 섬유소를 효율적으로 발효하는 효소를 만들 시간이 필요합니다.'
          }
        },
        {
          type: 'grid',
          minWidth: '280px',
          gap: 22,
          items: [
            {
              title: { en: 'Gradual Increase', ko: '점진적 증량' },
              body: { en: 'Add <strong>5g per week</strong> over 4–5 weeks. This gives your microbiome time to adapt. Start with an extra serving of vegetables at lunch, then add legumes, then whole grains.', ko: '<strong>매주 5g씩</strong> 4~5주에 걸쳐 늘려보세요. 장내 미생물이 적응할 시간이 필요해요. 점심에 채소 한 접시 추가 → 콩류 추가 → 통곡물 순으로 올리면 됩니다.' }
            },
            {
              title: { en: 'Diversity Over Quantity', ko: '양보다 다양성' },
              body: { en: 'Eating <strong>30+ different plant foods per week</strong> — the American Gut Project\'s golden rule — matters more than hitting a number. Each fiber type feeds different bacterial species.', ko: '<strong>주당 30종 이상의 식물성 식품</strong>을 먹는 것이 American Gut Project의 황금 법칙이에요. 섬유질 종류마다 다른 세균종을 먹여 살리기 때문에, 총량보다 다양성이 중요해요.' }
            },
            {
              title: { en: 'Hydration Is Non-Negotiable', ko: '수분 섭취는 필수' },
              body: { en: 'Soluble fiber absorbs water to form a gel. Without enough water, high-fiber diets cause constipation instead of relief. <strong>Aim for 2.5–3L daily</strong> when increasing fiber.', ko: '수용성 식이섬유는 물을 흡수해서 젤을 만들어요. 물이 부족하면 고식이섬유 식단이 오히려 변비를 유발합니다. 식이섬유를 늘릴 때는 <strong>하루 2.5~3L</strong>을 목표로 드세요.' }
            },
            {
              title: { en: 'Fermented Foods as Amplifiers', ko: '발효식품으로 증폭하기' },
              body: { en: 'Kimchi, yogurt, kefir, and miso <strong>introduce live bacteria</strong> that work synergistically with fiber. A Stanford study found fermented foods increased microbiome diversity more than fiber alone.', ko: '김치, 요거트, 케피어, 된장은 <strong>살아있는 유산균</strong>을 공급해서 식이섬유와 시너지를 내요. 스탠포드 연구에서 발효식품이 식이섬유 단독보다 미생물 다양성을 더 많이 높였어요.' }
            }
          ]
        }
      ]
    },

    // ─── Section 4: Product Recommendations — prodCards ───
    {
      type: 'section',
      heading: {
        en: '✨ Products to support your fibermaxxing journey',
        ko: '✨ 파이버맥싱을 도와줄 제품들'
      },
      children: [
        {
          type: 'prodCards',
          cards: [
            {
              brand: 'Benefiber',
              name: 'Prebiotic Fiber Supplement (Wheat Dextrin)',
              note: {
                en: 'Tasteless, dissolvable prebiotic fiber — 3g per serving. Mixes into any drink without texture change. Clinically shown to nourish beneficial gut bacteria.',
                ko: '무맛·무취 수용성 프리바이오틱 섬유소로, 1회 3g을 어떤 음료에든 타서 마실 수 있어요. 장내 유익균 성장을 임상적으로 입증했어요.'
              },
              accentColor: '#a07850'
            },
            {
              brand: 'ChongKunDang',
              name: '종근당 프리바이오틱스 식이섬유 (Prebiotics Dietary Fiber)',
              note: {
                en: 'Korean functional health food with fructooligosaccharides (FOS) and resistant dextrin. 5g fiber per stick — designed for daily gut health support. KFDA-certified.',
                ko: '프락토올리고당(FOS)과 난소화성말토덱스트린 배합으로, 스틱 1포당 식이섬유 5g을 제공해요. 식약처 인증 건강기능식품으로 매일 장 건강 관리에 최적이에요.'
              },
              accentColor: '#a07850'
            },
            {
              brand: 'Seed',
              name: 'DS-01 Daily Synbiotic',
              note: {
                en: '24-strain probiotic + prebiotic outer capsule. Peer-reviewed and clinically tested for gut barrier integrity, SCFA production, and microbiome diversity.',
                ko: '24종 프로바이오틱스와 프리바이오틱스 외층 캡슐의 신바이오틱 제품이에요. 장벽 건강, SCFA 생성, 미생물 다양성에 대한 임상 논문이 발표된 제품입니다.'
              },
              accentColor: '#a07850'
            }
          ]
        }
      ]
    }
  ]
};

async function insert() {
  console.log('Inserting fibermaxxing article into Supabase...');
  const res = await fetch(`${SUPABASE_URL}/rest/v1/articles`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(article)
  });
  if (!res.ok) {
    const err = await res.text();
    console.error('ERROR:', res.status, err);
    process.exit(1);
  }
  console.log('SUCCESS: fibermaxxing-gut-skin-hormones inserted into Supabase.');
}

insert();
