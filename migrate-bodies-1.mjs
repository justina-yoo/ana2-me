// Migration script: Convert article body JSX to body_blocks JSON
// Run with: node migrate-bodies-1.mjs

const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';

const articles = [
  // ─── 1. skin-barrier-2026 ───
  {
    id: 'skin-barrier-2026',
    body_blocks: [
      {
        type: 'tldr',
        icon: '🧱',
        text: {
          en: '<strong>🧱 TL;DR:</strong> Your skin barrier is a lipid matrix of ceramides, fatty acids, and cholesterol. When it breaks down, water escapes and irritants get in. The 2026 approach isn\'t moisturizing harder — it\'s rebuilding the damaged lipid architecture with <strong>Cica-liposomes</strong>, <strong>squalane-derived ceramides</strong>, and <strong>Bifida ferment lysate</strong> at the molecular level.',
          ko: '<strong>🧱 요약:</strong> 피부 장벽은 세라마이드, 지방산, 콜레스테롤로 이루어진 지질 매트릭스입니다. 이 구조가 무너지면 수분이 빠져나가고 자극이 들어옵니다. 2026년의 접근법은 단순 보습이 아니라 <strong>시카-리포솜</strong>, <strong>스쿠알란 유래 세라마이드</strong>, <strong>비피다 발효 용해물</strong>로 손상된 지질 구조를 분자 수준에서 재건하는 것입니다.'
        }
      },
      {
        type: 'figure',
        src: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200',
        alt: 'Skincare serums and moisturizer bottles representing ceramide and skin barrier repair products'
      },
      {
        type: 'section',
        heading: {
          en: '🔍 What are the primary drivers of skin barrier degradation?',
          ko: '🔍 피부 장벽은 왜 무너질까요?'
        },
        children: [
          {
            type: 'body',
            text: {
              en: 'The barrier doesn\'t break down from one thing. It\'s a slow accumulation — <strong>HEV light</strong> from your phone and monitor, <strong>PM2.5</strong> from city air, and the <strong>pH-disrupting cleanser</strong> you chose yourself. <mark>Together, they strip the skin\'s ceramide and fatty acid reserves faster than passive recovery can keep up with.</mark>',
              ko: '피부 장벽이 손상되는 원인은 하나가 아니에요. 스마트폰과 모니터에서 나오는 <strong>고에너지 가시광선(HEV)</strong>, 매일 마시는 공기 속 <strong>미세먼지(PM2.5)</strong>, 그리고 우리가 직접 선택한 <strong>pH 교란 클렌저</strong>까지 — <mark>이 세 가지가 동시에 피부의 세라마이드와 지방산을 고갈시킵니다.</mark>'
            }
          },
          {
            type: 'statCards',
            cards: [
              { title: { en: '🔥 Oxidative Stress', ko: '🔥 산화 스트레스' }, desc: { en: 'Free radicals break down collagen and elastin fibers.', ko: '활성산소가 콜라겐과 엘라스틴 섬유를 분해합니다.' } },
              { title: { en: '💧 Lipid Depletion', ko: '💧 지질 고갈' }, desc: { en: "Loss of the essential 'mortar' between skin cells.", ko: "피부 세포 사이의 핵심 '모르타르' 역할을 하는 성분이 손실됩니다." } },
              { title: { en: '⚖️ pH Imbalance', ko: '⚖️ pH 불균형' }, desc: { en: "Disruption of the acid mantle's protective flora.", ko: '산성막의 보호 균총이 교란됩니다.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🧪 Which three molecular compounds are essential for barrier restoration?',
          ko: '🧪 장벽을 다시 세우는 핵심 성분 세 가지'
        },
        children: [
          {
            type: 'callout',
            icon: '🌿',
            title: { en: '1. Cica-Liposomes', ko: '1. 시카-리포솜' },
            text: {
              en: 'Encapsulated <strong>Centella Asiatica</strong> triterpenoids (Asiaticoside, Madecassoside) that penetrate deeper into the stratum corneum to stimulate GAG synthesis and collagen production at the cellular level.',
              ko: '<strong>병풀(Centella Asiatica)</strong>의 핵심 성분인 아시아티코사이드와 마데카소사이드를 캡슐에 감싸서 피부 깊숙이 전달해요. 콜라겐 합성과 보습 인자 생성을 촉진합니다.'
            },
            borderColor: 'rgba(45,90,61,0.2)',
            bgColor: 'rgba(45,90,61,0.04)'
          },
          {
            type: 'callout',
            icon: '💧',
            title: { en: '2. Squalane-Derived Ceramides', ko: '2. 스쿠알란 유래 세라마이드' },
            text: {
              en: 'Hydrogenated lipids that mimic human sebum, providing an occlusive yet breathable layer to prevent <strong>TEWL (Trans-Epidermal Water Loss)</strong> without clogging pores.',
              ko: '우리 피부 피지와 구조가 비슷한 지질이에요. 모공을 막지 않으면서 <strong>수분 증발(TEWL)</strong>을 막아주는 보호막을 만들어줍니다.'
            },
            borderColor: 'rgba(107,142,107,0.25)',
            bgColor: 'rgba(107,142,107,0.06)'
          },
          {
            type: 'callout',
            icon: '✨',
            title: { en: '3. Bifida Ferment Lysate', ko: '3. 비피다 발효 용해물' },
            text: {
              en: "A probiotic derivative rich in DNA repair enzymes that strengthens the skin's microbiome and reduces sensitivity by promoting a healthy bacterial balance.",
              ko: 'DNA 복구 효소가 풍부한 발효 유래 성분이에요. 피부 위의 유익균 균형을 도와 마이크로바이옴을 건강하게 유지하고 민감성을 낮춰줍니다.'
            },
            borderColor: 'rgba(245,215,110,0.4)',
            bgColor: 'rgba(245,215,110,0.1)'
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🌿 How do Korean botanicals integrate with modern synthesis?',
          ko: '🌿 한방 성분, 첨단 기술을 만나다'
        },
        children: [
          {
            type: 'body',
            text: {
              en: 'Korean "Hanbang" medicine has spent centuries mapping the relationship between botanicals and skin. <mark>In 2026, high-tech bioreactors and precision extraction are validating that wisdom at a molecular level — not replacing it.</mark>',
              ko: '한국의 한방(漢方) 전통은 수천 년간 피부와 체질의 관계를 연구해왔어요. <mark>2026년, 첨단 바이오리액터와 정밀 추출 기술이 그 경험을 분자 수준에서 과학적으로 증명하고 있습니다.</mark>'
            }
          },
          {
            type: 'grid',
            minWidth: '280px',
            gap: 22,
            items: [
              {
                title: { en: 'Advanced Fermentation', ko: '발효 기술의 진화' },
                body: { en: 'Traditional earthen-pot fermentation is now replicated in high-tech bioreactors to increase the bioavailability of polyphenols and flavonoids, making them more effective on the skin.', ko: '전통 옹기 발효를 첨단 바이오리액터로 재현하면서 폴리페놀과 플라보노이드의 흡수율이 크게 높아졌어요. 같은 원료도 피부에 더 잘 스며듭니다.' }
              },
              {
                title: { en: 'Phyto-Retinols', ko: '식물성 레티놀' },
                body: { en: 'Ingredients like Bakuchiol provide retinol-like results (cell turnover, collagen boost) without the barrier-disrupting side effects of synthetic Vitamin A.', ko: '바쿠치올은 레티놀과 같은 효과(세포 재생, 콜라겐 촉진)를 주지만, 합성 비타민 A처럼 장벽을 자극하지 않아요.' }
              }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '✨ Products built for barrier-compromised skin',
          ko: '✨ 장벽이 무너졌을 때 쓸 제품'
        },
        children: [
          {
            type: 'prodCards',
            cards: [
              { brand: 'Dr. Jart+', name: 'Cicapair Intensive Soothing Repair Cream', note: { en: 'Madecassoside + ceramide — barrier calming from first application', ko: '마데카소사이드 + 세라마이드로 장벽 즉시 진정' }, accentColor: 'var(--accent)' },
              { brand: 'La Roche-Posay', name: 'Cicaplast Balm B5', note: { en: 'Panthenol 5% accelerates keratinocyte migration to close micro-lesions', ko: '판테놀 5%로 각질형성세포 이동을 가속하여 미세 손상 봉합' }, accentColor: 'var(--accent)' },
              { brand: 'Medicube', name: 'PDRN Pink Collagen Capsule Cream', note: { en: 'PDRN activates fibroblasts for collagen I & III regeneration', ko: 'PDRN이 섬유아세포를 활성화하여 콜라겐 I·III 재생' }, accentColor: 'var(--accent)' }
            ]
          }
        ]
      }
    ]
  },

  // ─── 2. fragrance-volatility ───
  {
    id: 'fragrance-volatility',
    body_blocks: [
      {
        type: 'tldr',
        icon: '⏳',
        text: {
          en: '<strong>⏳ TL;DR:</strong> A fragrance isn\'t a smell — it\'s a timeline. <strong>Molecular weight</strong> and <strong>vapor pressure</strong> determine exactly when each note surfaces and disappears from your skin. Top notes evaporate in minutes. Base notes can last a day. Knowing this changes what you look for — and what you buy.',
          ko: '<strong>⏳ 요약:</strong> 향수는 고정된 향이 아닌 시간의 흐름이에요. <strong>분자량</strong>과 <strong>증기압</strong>이 각 노트가 피부에서 언제 피어나고 언제 사라지는지를 결정합니다. 탑 노트는 수분 내 증발하고, 베이스 노트는 하루 종일 남아 있어요.'
        }
      },
      {
        type: 'figure',
        src: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1200',
        alt: 'Glass perfume fragrance bottle on a reflective surface, illustrating molecular volatility'
      },
      {
        type: 'section',
        heading: {
          en: '🔺 What is the volatility pyramid?',
          ko: '🔺 향은 왜 시간에 따라 변할까요?'
        },
        children: [
          {
            type: 'body',
            text: {
              en: '<mark>Every fragrance is a sequence, not a static smell.</mark> The three tiers — <strong>top, heart, and base</strong> — correspond to how quickly each aromatic molecule evaporates from your skin. This is determined by <strong>vapor pressure</strong>: the lower the molecular weight, the higher the pressure, the faster the escape.',
              ko: '<mark>모든 향수는 고정된 향이 아닌 하나의 시퀀스입니다.</mark> 세 계층 — <strong>탑, 미들, 베이스</strong> — 은 각 방향족 분자가 피부에서 얼마나 빨리 증발하는지에 해당합니다. 이는 <strong>증기압</strong>에 의해 결정됩니다: 분자량이 낮을수록 압력이 높아져 더 빨리 사라집니다.'
            }
          },
          {
            type: 'statCards',
            cards: [
              { title: { en: '⚡ Top Notes (0–30 min)', ko: '⚡ 탑 노트 (0–30분)' }, desc: { en: 'Small, lightweight molecules. Citrus, aldehydes, green. First impression, quickly gone.', ko: '작고 가벼운 분자. 시트러스, 알데히드, 그린. 첫인상이지만 금방 사라집니다.' } },
              { title: { en: '💜 Heart Notes (30 min–4 hrs)', ko: '💜 미들 노트 (30분–4시간)' }, desc: { en: 'Mid-weight molecules. Florals, spices, woods. The emotional core of the fragrance.', ko: '중간 무게의 분자. 플로럴, 스파이스, 우드. 향수의 감성적 핵심.' } },
              { title: { en: '🌙 Base Notes (4–24+ hrs)', ko: '🌙 베이스 노트 (4–24시간+)' }, desc: { en: 'Heavy, low-vapor molecules. Musks, ambers, resins. The memory that stays on skin.', ko: '무겁고 증기압이 낮은 분자. 머스크, 앰버, 레진. 피부에 남는 기억.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🔬 The molecular science of longevity',
          ko: '🔬 향이 오래 남는 이유, 분자에 있습니다'
        },
        children: [
          {
            type: 'callout',
            icon: '🌲',
            title: { en: 'Fixatives & Substantivity', ko: '고착제 — 향을 붙잡는 분자' },
            text: {
              en: 'Fixatives like <strong>Iso E Super</strong> and <strong>Ambroxan</strong> are large, semi-volatile molecules that slow the evaporation of lighter compounds by forming a molecular scaffold — extending the presence of top and heart notes beyond their natural lifespan.',
              ko: '<strong>Iso E Super</strong>나 <strong>Ambroxan</strong> 같은 고착제는 크고 잘 날아가지 않는 분자예요. 가벼운 향 분자가 너무 빨리 증발하지 않도록 잡아주는 역할을 합니다 — 덕분에 탑 노트와 미들 노트가 더 오래 남아요.'
            },
            borderColor: 'rgba(107,142,107,0.3)',
            bgColor: 'rgba(107,142,107,0.06)'
          },
          {
            type: 'callout',
            icon: '🧪',
            title: { en: 'Skin Chemistry as a Variable', ko: '내 피부에서 다르게 느껴지는 이유' },
            text: {
              en: 'pH, sebum content, and even diet alter how fragrance molecules bind to skin proteins. <mark>Oilier skin acts as a <strong>carrier reservoir</strong>, releasing molecules slowly.</mark> Dry skin offers less retention, causing faster diffusion into air.',
              ko: '피부의 pH, 유분량, 심지어 식단까지 향수 분자가 피부에 달라붙는 방식을 바꿔요. <mark>유분기 많은 피부는 향 분자를 천천히 내보내는 <strong>저장소</strong> 역할을 합니다.</mark> 건성 피부는 향을 잡아두는 힘이 약해서 더 빨리 날아가요.'
            },
            borderColor: 'rgba(245,215,110,0.4)',
            bgColor: 'rgba(245,215,110,0.08)'
          },
          {
            type: 'callout',
            icon: '🌙',
            title: { en: 'Macrocyclic Musks', ko: '마크로사이클릭 머스크' },
            text: {
              en: 'The new generation of base notes — <strong>Exaltolide</strong>, <strong>Habanolide</strong> — are ring-structured synthetic musks with extremely low volatility. They interact with skin proteins covalently, producing the "second skin" effect that can last over 24 hours.',
              ko: '차세대 베이스 노트인 <strong>Exaltolide</strong>, <strong>Habanolide</strong>는 고리형 합성 머스크로 거의 날아가지 않아요. 피부 단백질에 직접 결합해서 24시간 넘게 은은하게 남는 \'세컨드 스킨\' 효과를 만들어냅니다.'
            },
            borderColor: 'rgba(45,90,61,0.2)',
            bgColor: 'rgba(45,90,61,0.04)'
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🛒 How to use this knowledge when buying fragrance',
          ko: '🛒 향수 고를 때 이렇게 써보세요'
        },
        children: [
          {
            type: 'grid',
            minWidth: '280px',
            gap: 22,
            items: [
              { title: { en: '👃 Test on skin, not paper', ko: '👃 시향은 반드시 피부에' }, body: { en: 'Paper strips only reveal volatility in isolation. Your skin chemistry — its pH and lipid content — is the true medium. Always test on a pulse point and wait 30 minutes before deciding.', ko: '시향지는 향의 일부만 보여줘요. 내 피부의 pH와 유분이 향을 완전히 바꿉니다. 맥박 부위에 뿌리고 30분 이상 기다린 후 판단하세요.' } },
              { title: { en: '🎨 Layer strategically', ko: '🎨 레이어링의 기술' }, body: { en: 'Apply a base-note-heavy oil first (sandalwood, oud, vetiver), then spray your fragrance on top. The oil acts as a fixative, anchoring lighter molecules and extending their evaporation window.', ko: '먼저 샌달우드, 우드, 베티버 같은 무거운 오일을 바르고 그 위에 향수를 뿌려보세요. 오일이 가벼운 향 분자를 잡아줘서 지속력이 훨씬 길어집니다.' } },
              { title: { en: '📊 Concentration matters', ko: '📊 농도에 따라 달라요' }, body: { en: 'Parfum (20–40% aromatic compounds) contains more base-weight molecules than Eau de Toilette (5–15%). Higher concentration = deeper, longer-lasting dry-down.', ko: '퍼퓸(향료 20–40%)은 오드 뚜왈렛(5–15%)보다 무거운 베이스 분자가 훨씬 많아요. 농도가 높을수록 깊고 오래가는 잔향을 느낄 수 있습니다.' } },
              { title: { en: '🌡️ Temperature amplifies', ko: '🌡️ 체온이 향을 키워요' }, body: { en: 'Heat accelerates molecular evaporation. Pulse points (wrists, neck, inner elbow) naturally warm fragrance, intensifying both projection and the speed at which top notes fade.', ko: '열은 향 분자의 증발을 빠르게 해요. 손목, 목, 팔꿈치 안쪽 같은 맥박 부위는 체온이 높아 향이 더 잘 퍼지지만, 탑 노트가 빨리 사라지기도 합니다.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🌸 Scents in our collection, read by molecular architecture',
          ko: '🌸 이 향수들, 분자로 읽어봤습니다'
        },
        children: [
          {
            type: 'prodCards',
            cards: [
              { brand: 'Diptyque', name: 'Philosykos Eau de Parfum', note: { en: 'Green lactone top + cedar sesquiterpene base — 6–8 hr woody dry-down', ko: '그린 락톤 탑 + 시더 세스퀴테르펜 베이스 — 6–8시간의 우디 잔향' }, accentColor: 'var(--sage)' },
              { brand: 'Tamburins', name: 'Perfume Chamo', note: { en: 'Linalool top, cypriol heart — calm, slow-unfurling structure', ko: '리날로올 탑, 시프리올 하트 — 침착하고 서서히 펼쳐지는 구조' }, accentColor: 'var(--sage)' },
              { brand: 'Jo Malone London', name: 'Peony & Blush Suede Cologne', note: { en: 'Ethyl ester top, ambrettolide base — light sillage, intimate skin-close finish', ko: '에틸 에스터 탑, 암브레톨라이드 베이스 — 섬세한 퍼짐, 피부 밀착 잔향' }, accentColor: 'var(--sage)' }
            ]
          }
        ]
      }
    ]
  },

  // ─── 3. adaptogens-bioavailability ───
  {
    id: 'adaptogens-bioavailability',
    body_blocks: [
      {
        type: 'tldr',
        icon: '🌿',
        text: {
          en: '<strong>🌿 TL;DR:</strong> If your adaptogens aren\'t doing anything, the problem is probably absorption. Raw powder bioavailability for <strong>Ashwagandha</strong>, <strong>Lion\'s Mane</strong>, and <strong>Reishi</strong> sits below 10% for most people. Fermentation, lipid encapsulation, and dual extraction push that number to 40–60%+. The ingredient isn\'t the variable. The delivery is.',
          ko: '<strong>🌿 요약:</strong> 좋은 어댑토젠 보충제를 매일 먹어도 효과가 없다고 느껴진다면, 십중팔구 흡수가 안 되는 거예요. <strong>아슈와간다</strong>, <strong>사자갈기</strong>, <strong>영지버섯</strong>의 원료 분말 생체이용률은 10% 미만인 경우가 대부분입니다. 발효, 지질 캡슐화, 이중 추출이 흡수율을 40–60% 이상으로 끌어올립니다.'
        }
      },
      {
        type: 'figure',
        src: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=1200',
        alt: 'Mushrooms, herbs, and wellness supplement ingredients, representing adaptogen bioavailability'
      },
      {
        type: 'section',
        heading: {
          en: '🧠 What is an adaptogen, precisely?',
          ko: '🧠 어댑토젠이란 정확히 무엇인가요?'
        },
        children: [
          {
            type: 'body',
            text: {
              en: 'An adaptogen is a bioactive compound that helps the body resist physical and psychological stressors by modulating the <strong>HPA axis</strong> (hypothalamic-pituitary-adrenal). <mark>Unlike stimulants or sedatives, adaptogens normalize — they push stress response toward equilibrium rather than in a single direction.</mark>',
              ko: '어댑토젠은 <strong>시상하부-뇌하수체-부신(HPA) 축</strong>을 조절하여 신체가 물리적, 심리적 스트레스에 저항하도록 돕는 생체활성 화합물입니다. <mark>자극제나 진정제와 달리, 어댑토젠은 정상화합니다 — 스트레스 반응을 단일 방향이 아닌 균형 쪽으로 이끕니다.</mark>'
            }
          },
          {
            type: 'statCards',
            cards: [
              { title: { en: '🌱 Ashwagandha (KSM-66)', ko: '🌱 아슈와간다 (KSM-66)' }, desc: { en: 'Withanolide content regulates cortisol. Standardized root extract with 5%+ withanolides shows the strongest clinical data.', ko: '위타노라이드 성분이 코르티솔을 조절합니다. 5%+ 위타노라이드 표준화 뿌리 추출물이 가장 강력한 임상 데이터를 보입니다.' } },
              { title: { en: "🍄 Lion's Mane", ko: '🍄 사자갈기' }, desc: { en: 'Hericenones and erinacines stimulate NGF (Nerve Growth Factor), supporting neuroplasticity and cognitive recovery.', ko: '헤리세논과 에리나신이 신경성장인자(NGF)를 자극하여 신경가소성과 인지 회복을 지원합니다.' } },
              { title: { en: '🍄 Reishi (Dual-Extract)', ko: '🍄 영지 (이중 추출)' }, desc: { en: 'Polysaccharides (beta-glucans) and triterpenes require separate hot-water and alcohol extraction to capture both active fractions.', ko: '다당류(베타글루칸)와 트리터펜은 두 활성 분획을 모두 포착하기 위해 별도의 열수 및 알코올 추출이 필요합니다.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🔑 Why bioavailability is the hidden variable',
          ko: '🔑 왜 먹어도 흡수가 안 될까요?'
        },
        children: [
          {
            type: 'callout',
            icon: '🌱',
            title: { en: 'The Gut Barrier Problem', ko: '장에서 막히는 이유' },
            text: {
              en: 'Most adaptogen compounds are <strong>large, hydrophilic molecules</strong> that struggle to cross the intestinal epithelium. <mark>Without an optimized delivery system, they pass through largely intact — you excrete the compound before it reaches systemic circulation.</mark>',
              ko: '어댑토젠 성분 대부분은 분자가 크고 물에 잘 녹아서 장벽을 통과하기 어려워요. <mark>전달 기술 없이 그냥 먹으면 대부분 흡수되지 못한 채 그대로 빠져나갑니다.</mark>'
            },
            borderColor: 'rgba(45,90,61,0.2)',
            bgColor: 'rgba(45,90,61,0.04)'
          },
          {
            type: 'callout',
            icon: '🧬',
            title: { en: 'Fermentation Unlocks Bound Actives', ko: '발효하면 흡수가 달라져요' },
            text: {
              en: 'Fermentation — particularly with <strong>Lactobacillus</strong> strains — breaks down plant cell walls and cleaves glycoside bonds, releasing active aglycones that are substantially smaller and more lipophilic. This dramatically improves passive diffusion across gut membranes.',
              ko: '<strong>락토바실러스</strong> 균주로 발효하면 식물 세포벽이 분해되고, 활성 성분이 더 작고 지용성 높은 형태로 풀려나요. 이렇게 바뀌면 장벽을 훨씬 쉽게 통과합니다.'
            },
            borderColor: 'rgba(107,142,107,0.25)',
            bgColor: 'rgba(107,142,107,0.06)'
          },
          {
            type: 'callout',
            icon: '💊',
            title: { en: 'Lipid Encapsulation', ko: '지질 캡슐로 감싸기' },
            text: {
              en: 'Liposomal and phytosomal delivery systems wrap active compounds in <strong>phospholipid bilayers</strong> that are structurally identical to cell membranes. Cells recognize and absorb the encapsulated compound directly — bypassing first-pass metabolism in the liver.',
              ko: '리포솜이나 파이토솜 기술은 활성 성분을 세포막과 같은 구조의 <strong>인지질 캡슐</strong>로 감싸요. 세포가 자기 것처럼 인식해서 바로 흡수하기 때문에, 간에서 먼저 분해되는 걸 피할 수 있습니다.'
            },
            borderColor: 'rgba(245,215,110,0.4)',
            bgColor: 'rgba(245,215,110,0.08)'
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🏷️ Reading a supplement label for real bioavailability',
          ko: '🏷️ 보충제 라벨, 이것만 보세요'
        },
        children: [
          {
            type: 'grid',
            minWidth: '280px',
            gap: 22,
            items: [
              { title: { en: '🎯 Standardization %', ko: '🎯 표준화 % 확인' }, body: { en: '"Ashwagandha 500mg" is meaningless. "KSM-66 Ashwagandha 300mg standardized to 5% withanolides" tells you the effective dose.', ko: '"아슈와간다 500mg"만으로는 아무것도 알 수 없어요. "KSM-66 아슈와간다 300mg, 위타노라이드 5% 표준화"처럼 활성 성분 함량이 적혀 있어야 유효 용량을 판단할 수 있습니다.' } },
              { title: { en: '📏 Extract ratio', ko: '📏 추출 비율' }, body: { en: 'A 10:1 extract means 10kg of raw material concentrated into 1kg. Higher ratios mean more active compounds per gram — but only if the extraction method targets the right molecules.', ko: '10:1 추출물이란 원료 10kg을 1kg으로 농축했다는 뜻이에요. 비율이 높을수록 그램당 활성 성분이 많지만, 어떤 성분을 추출했느냐가 더 중요합니다.' } },
              { title: { en: '🔀 Dual vs. single extract', ko: '🔀 이중 추출 vs 단일 추출' }, body: { en: 'For mushrooms, a hot-water extract captures beta-glucans. An alcohol extract captures triterpenes. You need both. Single extracts miss half the pharmacological activity.', ko: '버섯류는 열수 추출(베타글루칸)과 알코올 추출(트리터펜)을 둘 다 해야 해요. 한 가지만으로는 약리 활성의 절반을 놓칩니다.' } },
              { title: { en: '⚡ Added piperine or fat', ko: '⚡ 피페린·지방 함께 먹기' }, body: { en: 'Piperine (black pepper extract) inhibits CYP enzymes that break down adaptogens in the liver, increasing serum levels by up to 20x for some compounds.', ko: '피페린(후추 추출물)은 간에서 어댑토젠을 분해하는 효소를 억제해요. 일부 성분의 혈중 농도를 최대 20배까지 높여줍니다.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '✨ Wellness products designed around bioavailability',
          ko: '✨ 흡수율까지 고려한 웰니스 제품'
        },
        children: [
          {
            type: 'prodCards',
            cards: [
              { brand: 'Medion', name: 'Supplecare Inositol', note: { en: 'Clinically validated 40:1 myo/D-chiro ratio — OxuGel™ protects polyphenols from gastric oxidation', ko: '임상 검증 40:1 미오/D-카이로 비율 — OxuGel™ 기술로 위산 산화 방지 후 흡수' }, accentColor: '#a07850' },
              { brand: 'Ollocdam', name: 'Olive3 Premium EVOO Capsules', note: { en: 'Triple-origin Koroneiki, Picual, Coratina blend — oleocanthal COX inhibition optimised', ko: '3원산지 코로네이키·피쿠알·코라티나 블렌드 — 올레오칸탈 COX 억제 최적화' }, accentColor: '#a07850' }
            ]
          }
        ]
      }
    ]
  },

  // ─── 4. fermentation-transformation ───
  {
    id: 'fermentation-transformation',
    body_blocks: [
      {
        type: 'tldr',
        icon: '🧫',
        text: {
          en: '<strong>🧫 TL;DR:</strong> Fermentation doesn\'t preserve ingredients — it transforms them. Microbes like <strong>Galactomyces</strong> and <strong>Lactobacillus</strong> break down raw botanicals into smaller, more bioavailable actives with therapeutic properties the original plant never had. It started as an accident in a sake brewery. It became one of skincare\'s most studied technologies.',
          ko: '<strong>🧫 요약:</strong> 발효는 성분을 보존하는 게 아니에요 — 변환합니다. <strong>갈락토미세스</strong>와 <strong>락토바실러스</strong> 같은 미생물이 원료 식물 성분을 분해해 더 작고 흡수율 높은 활성 성분으로 바꾸고, 원래 식물에는 존재하지 않았던 새로운 치료적 특성을 만들어냅니다. 청주 양조장의 우연한 발견이 스킨케어 역사를 바꿨습니다.'
        }
      },
      {
        type: 'figure',
        src: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=1200',
        alt: 'Fermentation laboratory setup with glass flasks and scientific equipment'
      },
      {
        type: 'section',
        heading: {
          en: '🦠 Why fermented ingredients outperform their raw counterparts',
          ko: '🦠 왜 발효하면 달라질까요?'
        },
        children: [
          {
            type: 'body',
            text: {
              en: 'Plant cell walls are made of <strong>cellulose</strong> — a molecule human skin cannot penetrate or metabolize. <mark>Fermentation-driven enzymatic activity breaks these walls open, releasing compounds that were previously locked inside and reducing their molecular size.</mark>',
              ko: '식물 세포벽은 <strong>셀룰로오스</strong>로 되어 있어요 — 우리 피부가 뚫거나 분해할 수 없는 물질이죠. <mark>발효 과정의 효소가 이 벽을 열어서 안에 갇혀 있던 활성 성분을 꺼내고, 분자 크기를 줄여 피부 속까지 스며들 수 있게 만듭니다.</mark>'
            }
          },
          {
            type: 'statCards',
            cards: [
              { title: { en: '🔬 Smaller molecules', ko: '🔬 분자가 작아져요' }, desc: { en: 'Fermentation cleaves large polysaccharides into absorbable oligosaccharides that penetrate the stratum corneum directly.', ko: '큰 다당류가 작은 올리고당으로 쪼개져서 피부 속까지 직접 침투할 수 있어요.' } },
              { title: { en: '✨ New compounds formed', ko: '✨ 새로운 성분이 생겨요' }, desc: { en: 'Microbial metabolism creates entirely new bioactive molecules — like galactomyces-derived NADHP and amino acids — not present in the raw material.', ko: '미생물이 대사하면서 원래 원료에는 없던 완전히 새로운 활성 물질이 만들어집니다.' } },
              { title: { en: '🛡️ Lower irritation potential', ko: '🛡️ 자극이 줄어들어요' }, desc: { en: 'Fermentation degrades common irritants and allergens (like certain proteins) that exist in raw botanical extracts.', ko: '원료 식물 추출물에 있던 자극 성분과 알레르겐이 발효 과정에서 분해됩니다.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🔭 The three key fermentation organisms in skincare',
          ko: '🔭 스킨케어를 바꾼 발효 미생물 세 가지'
        },
        children: [
          {
            type: 'callout',
            icon: '🍶',
            title: { en: 'Galactomyces Ferment Filtrate', ko: '갈락토미세스 발효 여과물' },
            text: {
              en: 'A yeast-fermented filtrate containing <strong>vitamins, minerals, amino acids,</strong> and <strong>alpha-hydroxy acids</strong>. <mark>Originally discovered when sake brewery workers had remarkably smooth hands.</mark> It brightens, tightens pores, and improves texture by accelerating cell turnover and inhibiting tyrosinase.',
              ko: '<strong>비타민, 미네랄, 아미노산</strong>, <strong>알파-하이드록시산</strong>을 포함하는 효모 발효 여과물. <mark>청주 양조장 직원들의 손이 놀랍도록 매끈하다는 것이 발견되어 처음 알려졌습니다.</mark> 티로시나제를 억제하고 세포 재생을 가속하여 피부톤을 밝히고 모공을 조이며 결을 개선합니다.'
            },
            borderColor: 'rgba(45,90,61,0.2)',
            bgColor: 'rgba(45,90,61,0.04)'
          },
          {
            type: 'callout',
            icon: '🥛',
            title: { en: 'Lactobacillus Ferment', ko: '락토바실러스 발효물' },
            text: {
              en: "Lactic acid bacteria produce <strong>postbiotics</strong> — cell wall fragments and metabolic byproducts that communicate directly with skin's Toll-like receptors. This signals the immune system to reduce inflammatory response, making Lactobacillus ferments ideal for reactive, rosacea-prone, and sensitive skin types.",
              ko: '젖산균이 <strong>포스트바이오틱스</strong> — 피부의 Toll-like 수용체와 직접 소통하는 세포벽 파편과 대사 부산물 — 를 생성합니다. 이것이 면역 시스템에 염증 반응을 줄이도록 신호를 보내어, 민감성, 주사비, 예민한 피부 유형에 이상적입니다.'
            },
            borderColor: 'rgba(245,215,110,0.4)',
            bgColor: 'rgba(245,215,110,0.08)'
          },
          {
            type: 'callout',
            icon: '👶',
            title: { en: 'Bifida Ferment Lysate', ko: '비피다 발효 용해물' },
            text: {
              en: 'Derived from <em>Bifidobacterium longum</em> — a dominant species in healthy infant skin microbiomes. The lysate contains <strong>DNA repair enzymes</strong> and <strong>antioxidant enzymes</strong> (Superoxide Dismutase, Catalase) that directly counteract UV-induced oxidative damage.',
              ko: '건강한 영아 피부 마이크로바이옴의 우세 종인 <em>Bifidobacterium longum</em>에서 유래합니다. 용해물은 <strong>DNA 복구 효소</strong>와 <strong>항산화 효소</strong>(슈퍼옥사이드 디스뮤타제, 카탈라제)를 포함하여 UV 유발 산화 손상을 직접 대응합니다.'
            },
            borderColor: 'rgba(107,142,107,0.25)',
            bgColor: 'rgba(107,142,107,0.06)'
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '📖 How to read ferment ingredients on a label',
          ko: '📖 라벨에서 발효 성분 읽는 법'
        },
        children: [
          {
            type: 'grid',
            minWidth: '280px',
            gap: 22,
            items: [
              { title: { en: '"Ferment Filtrate"', ko: '"Ferment Filtrate" (발효 여과물)' }, body: { en: 'The liquid fraction after fermentation — contains soluble metabolites, acids, and enzymes from the organism. High activity, water-soluble.', ko: '발효 후 걸러낸 액체예요. 미생물이 만든 대사물, 산, 효소가 녹아 있습니다. 활성이 높고 피부에 바로 흡수돼요.' } },
              { title: { en: '"Ferment Lysate"', ko: '"Ferment Lysate" (발효 용해물)' }, body: { en: 'The organism itself, lysed (broken open). Contains intracellular compounds including enzymes, DNA fragments, and structural proteins. More potent for immune modulation.', ko: '미생물 세포를 터뜨려서 안에 있는 효소, DNA 파편, 단백질을 꺼낸 거예요. 면역 조절 효과가 더 강합니다.' } },
              { title: { en: '"Fermented Extract"', ko: '"Fermented Extract" (발효 추출물)' }, body: { en: 'A botanical ingredient that has been fermented — the plant material is the substrate, not the organism. The result is a transformed botanical with altered and enhanced properties.', ko: '식물 성분을 미생물로 발효시킨 거예요. 미생물이 아니라 식물이 주인공이고, 발효를 거치면서 성분이 변하고 강화됩니다.' } },
              { title: { en: 'What to avoid', ko: '이건 피하세요' }, body: { en: 'Ferment ingredients listed at the very end of an INCI list are present in sub-effective concentrations. Effective use requires these ingredients in the top 50% of the formula by weight.', ko: '성분표 맨 끝에 적힌 발효 성분은 함량이 너무 적어서 효과를 기대하기 어려워요. 전체 포뮬러의 상위 절반 안에 들어야 의미가 있습니다.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '💚 Ferment-forward products in our collection',
          ko: '💚 발효 성분이 핵심인 제품들'
        },
        children: [
          {
            type: 'prodCards',
            cards: [
              { brand: 'Dr. Jart+', name: 'Cicapair Intensive Soothing Repair Cream', note: { en: 'Madecassoside + Allantoin — immediate calming and barrier repair with microbiome support', ko: '마데카소사이드 + 알란토인 — 마이크로바이옴 지원과 함께 즉각적인 진정·장벽 복구' }, accentColor: 'var(--accent)' },
              { brand: 'Mediheal', name: 'Tea Tree Trouble Calming Toner Pads', note: { en: 'Lactobacillus ferment postbiotics — selectively suppresses acne-driving IL-8 and TNF-α', ko: '락토바실러스 발효물 포스트바이오틱스 — 트러블 유발 IL-8·TNF-α를 선택적으로 억제' }, accentColor: 'var(--accent)' }
            ]
          }
        ]
      }
    ]
  },

  // ─── 5. pdrn-salmon-dna ───
  {
    id: 'pdrn-salmon-dna',
    body_blocks: [
      {
        type: 'tldr',
        icon: '🧬',
        text: {
          en: '<strong>🧬 TL;DR:</strong> PDRN is a molecule derived from salmon that signals your skin to rebuild collagen. Korean dermatology clinics have used it in injections for 30 years — it\'s now in serums. Clinical studies back it for skin repair, dark spots, and post-treatment recovery.',
          ko: '<strong>🧬 요약:</strong> PDRN은 연어에서 추출한 성분으로, 피부에 바르면 <strong>콜라겐 재생 신호</strong>를 활성화합니다. 한국 피부과에서는 30년 전부터 주사 시술로 써왔고, 이제 세럼으로도 나왔습니다. 피부 재생, 색소 개선, 시술 후 회복에 효과가 있다는 임상 데이터가 있습니다.'
        }
      },
      {
        type: 'figure',
        src: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1200',
        alt: 'Skincare serum dropper bottle representing PDRN regenerative skincare science'
      },
      {
        type: 'section',
        heading: {
          en: '🐟 What salmon DNA actually does to your skin',
          ko: '🐟 연어 DNA가 피부에서 하는 일'
        },
        children: [
          {
            type: 'body',
            text: {
              en: 'PDRN is a fragment of DNA taken from salmon. The name sounds complicated, but the mechanism is straightforward — it binds to specific receptors on your skin cells and sends a signal to <strong>start repairing</strong>. <mark>Cells respond by producing new collagen, rebuilding blood vessels, and speeding up recovery in damaged areas.</mark> That\'s why Korean dermatology clinics reach for it after laser treatments.',
              ko: 'PDRN은 연어에서 추출한 DNA 조각입니다. 이름은 복잡하지만 작동 방식은 단순해요 — 피부 세포 표면의 특정 수용체에 결합해서 <strong>"지금 복구 시작"</strong>이라는 신호를 보냅니다. <mark>이 신호를 받은 세포들은 콜라겐을 새로 만들고, 혈관을 재생하고, 손상된 부위를 빠르게 회복시킵니다.</mark> 피부과에서 레이저 시술 후에 자주 쓰는 이유가 바로 이것입니다.'
            }
          },
          {
            type: 'statCards',
            cards: [
              { title: { en: '🔬 Repair Signal', ko: '🔬 재생 신호 활성화' }, desc: { en: 'Tells skin cells to start recovering — increasing growth factor output.', ko: '피부 세포에 복구 신호를 보내 성장인자 분비를 늘립니다.' } },
              { title: { en: '💪 Collagen Rebuilding', ko: '💪 콜라겐 재생' }, desc: { en: 'Prompts the skin to produce new collagen, restoring firmness and density over time.', ko: '피부 탄력과 밀도를 만드는 콜라겐을 새로 합성하도록 유도합니다.' } },
              { title: { en: '🩸 Better Circulation', ko: '🩸 혈액순환 개선' }, desc: { en: 'Encourages new capillary growth in the dermis, improving how well nutrients reach skin cells.', ko: '진피 내 새로운 모세혈관 형성을 촉진해 피부 영양 공급을 늘립니다.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '💉 Why it was an injectable first — and why serums work now',
          ko: '💉 왜 처음엔 주사였고, 이제는 세럼인가'
        },
        children: [
          {
            type: 'callout',
            icon: '🏥',
            title: { en: 'The original problem', ko: '피부 속으로 직접 넣어야 했던 이유' },
            text: {
              en: 'PDRN molecules are much larger than most serum ingredients. Applied to the surface, they just sit there and wash off. <mark>Korean dermatologists got around this by creating tiny channels in the skin — microneedling, injections — to deliver it directly.</mark> It worked well, but required a clinic visit.',
              ko: 'PDRN 분자는 일반 세럼 성분보다 훨씬 큽니다. 그냥 피부에 바르면 표면에서 머물다 씻겨 내려가요. <mark>한국 피부과에서는 이 문제를 피부에 미세한 경로를 만들어 성분을 직접 전달하는 방식으로 해결했습니다.</mark> 효과는 확실하지만 클리닉에 가야 한다는 한계가 있었죠.'
            },
            borderColor: 'rgba(45,90,61,0.2)',
            bgColor: 'rgba(45,90,61,0.04)'
          },
          {
            type: 'callout',
            icon: '💊',
            title: { en: 'How serums solved it', ko: '세럼으로 가능해진 방법' },
            text: {
              en: '<mark>Modern PDRN serums wrap the molecule in tiny lipid capsules that help it absorb into skin.</mark> These capsules are structurally similar to cell membranes, so cells recognize and absorb them naturally. Studies show this method achieves up to <strong>4\u00d7 better penetration</strong> compared to an unencapsulated formula.',
              ko: '<mark>요즘 PDRN 세럼들은 성분을 아주 작은 지질 캡슐에 감싸서 피부 흡수를 돕습니다.</mark> 이 캡슐은 피부 세포막과 구조가 같아서 세포가 자연스럽게 흡수합니다. 연구에 따르면 이 방식이 일반 수용액 대비 침투율을 최대 <strong>4배</strong> 높인다고 합니다.'
            },
            borderColor: 'rgba(107,142,107,0.25)',
            bgColor: 'rgba(107,142,107,0.06)'
          },
          {
            type: 'callout',
            icon: '🔬',
            title: { en: 'PN vs. PDRN on a label', ko: 'PN과 PDRN — 라벨에서 뭘 봐야 하나' },
            text: {
              en: 'The two names get used interchangeably, but they\'re different. PDRN is the shorter, smaller version — and smaller means better absorption through skin. <mark>If you\'re buying a topical product, PDRN on the label is the better bet over PN.</mark>',
              ko: '두 이름이 같은 성분처럼 쓰이지만 실제로는 다릅니다. PDRN이 더 작은 분절이고, 작을수록 피부에 더 잘 흡수됩니다. <mark>세럼에서 효과를 기대한다면 PDRN 표기가 있는 제품을 고르는 게 유리합니다.</mark>'
            },
            borderColor: 'rgba(245,215,110,0.4)',
            bgColor: 'rgba(245,215,110,0.1)'
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🧪 What the research actually shows',
          ko: '🧪 실제로 뭐가 증명됐나'
        },
        children: [
          {
            type: 'grid',
            minWidth: '280px',
            gap: 22,
            items: [
              { title: { en: '📉 Dark spots', ko: '📉 다크스팟 개선' }, body: { en: 'A 12-week study found visible reduction in uneven skin tone with consistent PDRN use. It works on two fronts simultaneously — slowing melanin production and speeding up how quickly old skin cells turn over.', ko: 'PDRN을 12주간 꾸준히 사용한 연구에서 색소침착이 눈에 띄게 줄었습니다. 멜라닌 생성을 억제하고 피부 세포 교체를 빠르게 하는 두 가지 경로가 동시에 작동하기 때문입니다.' } },
              { title: { en: '🔄 Faster wound healing', ko: '🔄 상처 회복 가속' }, body: { en: 'The longest-standing clinical application. Post-surgical studies consistently show PDRN-treated tissue heals around 30% faster on average — which is why hospitals adopted it before skincare did.', ko: '한국 의료 현장에서 가장 오래 쓰인 분야입니다. 수술 후 조직 회복 연구들에서 PDRN을 사용한 쪽이 그렇지 않은 쪽보다 회복 속도가 평균 30% 빨랐습니다.' } },
              { title: { en: '💧 Moisture retention', ko: '💧 수분 유지력 향상' }, body: { en: 'PDRN supports hyaluronic acid production inside the skin, reducing water loss. A study on dry, sensitive skin models found moisture levels up by an average of 23% after 8 weeks.', ko: '피부 속 히알루론산 생성을 도와 수분 손실을 줄입니다. 민감하고 건조한 피부 모델 연구에서 8주 후 피부 수분량이 평균 23% 증가했습니다.' } },
              { title: { en: '⚡ Post-treatment recovery', ko: '⚡ 시술 후 빠른 회복' }, body: { en: 'Shortens the window of redness and sensitivity after lasers or peels. Korean clinics have made it a standard step right after ablative treatments for this reason.', ko: '레이저나 필링 후 피부가 빨개지고 예민해지는 시간을 단축합니다. 한국 클리닉들이 시술 직후 PDRN을 루틴으로 쓰는 이유입니다.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '✨ PDRN serums worth using',
          ko: '✨ 추천 PDRN 세럼'
        },
        children: [
          {
            type: 'prodCards',
            cards: [
              { brand: 'Medicube', name: 'PDRN Pink Collagen Capsule Cream', note: { en: 'PDRN + EGF combo — focused on collagen rebuilding and firmness', ko: 'PDRN + EGF 복합 — 콜라겐 재생과 탄력 회복에 집중' }, accentColor: 'var(--accent)' },
              { brand: 'Dr. FORHAIR', name: 'PDRN Rejuvenating Serum', note: { en: 'High-concentration PDRN + niacinamide — repair and brightening together', ko: '고농도 PDRN + 나이아신아마이드 — 재생과 브라이트닝을 동시에' }, accentColor: 'var(--accent)' },
              { brand: 'Some By Mi', name: 'PDRN Snail Truecica Miracle Repair Serum', note: { en: 'Snail + PDRN — calming and repairing compromised or reactive skin', ko: '스네일 + PDRN — 예민하고 손상된 피부 즉각 진정' }, accentColor: 'var(--accent)' }
            ]
          }
        ]
      }
    ]
  },

  // ─── 6. postbiotics-skin-barrier ───
  {
    id: 'postbiotics-skin-barrier',
    body_blocks: [
      {
        type: 'tldr',
        icon: '🧫',
        text: {
          en: '<strong>TL;DR:</strong> Postbiotics are bioactive compounds produced during fermentation — no live bacteria needed. Key ingredients include Bifida Ferment Lysate and Lactobacillus Ferment Filtrate. Clinical studies show a 34% improvement in skin barrier function over 8 weeks. K-beauty has been using them for decades — the rest of the world is catching on.',
          ko: '<strong>요약:</strong> 포스트바이오틱스는 발효 과정에서 생성되는 생리활성 물질로, 살아있는 균이 필요 없어요. 비피다 발효물(Bifida Ferment Lysate)과 유산균 발효 여과물(Lactobacillus Ferment Filtrate)이 대표 성분이며, 임상 연구에서 8주 만에 피부 장벽 기능을 34% 개선한 것으로 나타났습니다. K-뷰티는 이미 수십 년째 써온 성분이에요.'
        }
      },
      {
        type: 'figure',
        src: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=1200',
        alt: 'Fermented skincare serum bottles on minimal surface, K-beauty postbiotic ingredients'
      },
      {
        type: 'section',
        heading: {
          en: "Probiotics, Prebiotics, Postbiotics — What's the Actual Difference?",
          ko: '프로바이오틱스, 프리바이오틱스, 포스트바이오틱스 — 뭐가 다른가요?'
        },
        children: [
          {
            type: 'body',
            text: {
              en: 'Skincare conversations about the microbiome almost always start with probiotics. But the three terms aren\'t interchangeable. <strong>Probiotics</strong> are live bacteria, prebiotics are their food source, and <mark>postbiotics are the bioactive byproducts left after fermentation completes</mark>. No live organisms required — which makes them far more stable on a shelf and safer for compromised or sensitive skin.',
              ko: '피부 마이크로바이옴 이야기가 나오면 항상 \'프로바이오틱스\'가 먼저 등장해요. 하지만 세 가지는 역할이 전혀 달라요. <strong>프로바이오틱스(Probiotics)</strong>는 살아있는 유익균, 프리바이오틱스(Prebiotics)는 그 균의 먹이, 그리고 <mark>포스트바이오틱스(Postbiotics)는 발효가 끝난 후 남는 생리활성 부산물</mark>입니다. 살아있는 균이 없어도 되니까 훨씬 안정적이고, 손상되거나 예민한 피부에도 안전하게 쓸 수 있어요.'
            }
          },
          {
            type: 'statCards',
            cards: [
              { title: { en: 'Probiotics', ko: '프로바이오틱스' }, desc: { en: 'Live bacteria. Can have stability issues when applied topically to skin.', ko: '살아있는 유익균. 피부에 직접 적용할 경우 안정성 이슈가 있을 수 있어요.' } },
              { title: { en: 'Prebiotics', ko: '프리바이오틱스' }, desc: { en: 'Food for beneficial bacteria. Sets the stage for a healthy microbiome.', ko: '피부 유익균의 먹이가 되는 성분. 균의 성장 환경을 조성해줍니다.' } },
              { title: { en: 'Postbiotics', ko: '포스트바이오틱스' }, desc: { en: 'Fermentation byproducts. Deliver the same skin benefits — no live organisms needed.', ko: '발효 부산물. 살아있는 균 없이도 동일한 피부 이점을 줍니다.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: 'Why Do Postbiotics Work So Well on the Skin Barrier?',
          ko: '왜 포스트바이오틱스가 피부 장벽에 효과적인가요?'
        },
        children: [
          {
            type: 'callout',
            icon: '🧬',
            title: { en: 'Directly activates barrier genes', ko: '장벽 유전자를 직접 활성화' },
            text: {
              en: "Bifida Ferment Lysate has been shown in studies to upregulate the physical barrier genes and antimicrobial peptide genes in skin cells — essentially signalling skin to build a stronger protective layer on its own.",
              ko: '비피다 발효물(Bifida Ferment Lysate)은 피부의 물리적 장벽 관련 유전자와 항균 펩타이드 유전자 발현을 높인다는 것이 연구로 확인됐어요. 피부가 스스로 더 두꺼운 보호막을 만들도록 신호를 보내는 거예요.'
            },
            borderColor: 'rgba(45,90,61,0.2)',
            bgColor: 'rgba(45,90,61,0.04)'
          },
          {
            type: 'callout',
            icon: '🛡️',
            title: { en: 'Safer than live bacteria for compromised skin', ko: '살아있는 균보다 안전한 이유' },
            text: {
              en: 'A 2026 clinical skincare report notes that live bacteria "are not always appropriate for compromised or post-procedure skin." Postbiotics deliver the same immune-modulating benefits without introducing organisms — making them the safer choice for reactive or damaged skin.',
              ko: '2026년 임상 스킨케어 트렌드 보고서에 따르면, 살아있는 균은 손상된 피부나 시술 후 피부에 적합하지 않을 수 있어요. 반면 포스트바이오틱스는 면역 조절 효과는 동일하게 가져가면서 균 자체를 도입하지 않기 때문에 훨씬 안전합니다.'
            },
            borderColor: 'rgba(107,142,107,0.25)',
            bgColor: 'rgba(107,142,107,0.06)'
          },
          {
            type: 'callout',
            icon: '📊',
            title: { en: '34% barrier improvement in 8 weeks', ko: '8주에 34% 장벽 개선' },
            text: {
              en: 'A 2025 study found that topical postbiotics improved skin barrier function by <mark>34% over 8 weeks compared to controls</mark>. This isn\'t surface-level hydration — it\'s structural reinforcement of the barrier itself.',
              ko: '2025년 발표된 연구에서 <mark>국소 포스트바이오틱스를 8주 사용한 그룹은 대조군 대비 피부 장벽 기능이 34% 개선</mark>됐어요. 단순한 보습제가 아니라 장벽 자체를 구조적으로 강화하는 성분입니다.'
            },
            borderColor: 'rgba(245,215,110,0.4)',
            bgColor: 'rgba(245,215,110,0.08)'
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: 'The Postbiotic Ingredients K-Beauty Has Used for Decades',
          ko: 'K-뷰티가 이미 수십 년째 써온 포스트바이오틱스 성분들'
        },
        children: [
          {
            type: 'grid',
            minWidth: '280px',
            gap: 22,
            items: [
              { title: { en: 'Bifida Ferment Lysate', ko: '비피다 발효물 (Bifida Ferment Lysate)' }, body: { en: 'A byproduct of Bifidobacterium fermentation that upregulates skin barrier genes and builds resistance to oxidative stress. A cornerstone of K-beauty fermentation lineups alongside galactomyces.', ko: '비피도박테리움 발효에서 얻은 부산물로, 피부 장벽 유전자 발현을 높이고 산화 스트레스에 대한 저항력을 키워줘요. SK-II의 갈락토미세스 발효 여과물과 함께 K-뷰티 발효 라인업의 핵심입니다.' } },
              { title: { en: 'Lactobacillus Ferment Filtrate', ko: '유산균 발효 여과물 (Lactobacillus Ferment Filtrate)' }, body: { en: 'Clinical data shows this postbiotic reduces inflammatory skin lesions by 50–70% and sebum secretion by up to 42%. Particularly effective for acne-prone and congested skin types.', ko: '유산균 발효 과정에서 걸러낸 여과물로, 염증성 피부 병변을 50~70%까지 줄이고 피지 분비를 최대 42% 낮추는 임상 데이터가 있어요. 특히 트러블성 피부에 효과적입니다.' } },
              { title: { en: 'Galactomyces Ferment Filtrate', ko: '갈락토미세스 발효 여과물 (Galactomyces Ferment Filtrate)' }, body: { en: "Discovered when sake brewery workers had remarkably smooth hands. Rich in vitamins, minerals, and AHAs — brightens skin tone, tightens pores, and accelerates cell turnover.", ko: '청주 양조장 직원들의 손이 유달리 매끄럽다는 관찰에서 시작된 성분이에요. 비타민, 미네랄, AHA가 풍부하며 피부톤 균일화와 모공 케어에 탁월합니다.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '✨ Products worth trying',
          ko: '✨ 추천 제품'
        },
        children: [
          {
            type: 'prodCards',
            cards: [
              { brand: "Ma:nyo Factory", name: 'Bifida Biome Complex Ampoule', note: { en: 'High-concentration Bifida Ferment — intensive barrier recovery for reactive skin', ko: '비피다 발효물 고농도 앰플 — 예민하고 손상된 장벽 집중 회복' }, accentColor: '#a07850' },
              { brand: 'Benton', name: 'Fermentation Essence', note: { en: 'Galactomyces + lactobacillus combo — brightening and barrier reinforcement together', ko: '갈락토미세스 + 유산균 발효물 조합 — 피부톤 균일화와 장벽 강화를 동시에' }, accentColor: '#a07850' },
              { brand: 'Haruharu Wonder', name: 'Black Rice Hyaluronic Toner', note: { en: 'Fermented black rice base — ideal for microbiome-friendly hydration layering', ko: '발효 흑미 추출물 기반 — 마이크로바이옴 친화적 수분 레이어링에 이상적' }, accentColor: '#a07850' }
            ]
          }
        ]
      }
    ]
  },

  // ─── 7. k-fragrance-skin-scents ───
  {
    id: 'k-fragrance-skin-scents',
    body_blocks: [
      {
        type: 'tldr',
        icon: '🌸',
        text: {
          en: '<strong>TL;DR:</strong> K-fragrance is gaining global traction not because of marketing, but because of a fundamentally different design philosophy. Korean perfumes prioritize skin-close "skin scents" built on low-volatility synthetic musks and sheer woods — not projection. January 2026 exports hit $6.52 million, the highest monthly figure since records began in 1988.',
          ko: '<strong>요약:</strong> K-프래그런스가 세계 시장에서 주목받는 건 마케팅이 아니라 설계 철학 때문이에요. 한국 향수는 강하게 퍼지는 대신 피부에 밀착되는 \'스킨 센트\'를 지향하며, 합성 머스크와 시어 우드 같은 저휘발성 분자를 중심으로 만들어집니다. 2026년 1월 수출 652만 달러 — 1988년 이래 최고 기록.'
        }
      },
      {
        type: 'figure',
        src: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1200',
        alt: 'Minimal perfume bottles on a clean surface, representing K-fragrance skin scent design'
      },
      {
        type: 'section',
        heading: {
          en: '🌏 Why is K-fragrance suddenly everywhere?',
          ko: '🌏 K-프래그런스가 갑자기 주목받는 이유'
        },
        children: [
          {
            type: 'body',
            text: {
              en: 'In January 2026, South Korea\'s fragrance exports hit <strong>$6.52 million</strong> — the highest monthly figure since records began in 1988. Even more striking: Korea achieved a <mark>fragrance trade surplus with the US for the first time in 28 years</mark>. K-beauty rewrote the rules for skincare. Now it\'s fragrance\'s turn.',
              ko: '2026년 1월, 한국 향수 수출이 <strong>월 652만 달러</strong>를 기록하며 1988년 통계 작성 이래 최고치를 찍었어요. 더 놀라운 건 미국과의 향수 무역에서 <mark>28년 만에 처음으로 흑자를 달성</mark>했다는 점이에요. K-뷰티가 스킨케어로 세계를 바꿨듯이, 이제 향수 차례가 온 겁니다.'
            }
          },
          {
            type: 'statCards',
            cards: [
              { title: { en: '📈 $6.52M', ko: '📈 652만 달러' }, desc: { en: "January 2026 monthly fragrance exports — an all-time high.", ko: '2026년 1월 월간 향수 수출액. 역대 최고 기록.' } },
              { title: { en: '🇺🇸 28-year first', ko: '🇺🇸 28년 만의 흑자' }, desc: { en: 'Fragrance trade surplus with the US: $1.84M exports vs $1.27M imports.', ko: '미국 향수 수출 184만 달러 vs 수입 127만 달러.' } },
              { title: { en: '📊 9.1% CAGR', ko: '📊 연 9.1% 성장' }, desc: { en: "Niche fragrance market growth rate — more than 3\u00d7 the mass market.", ko: '니치 향수 시장의 연평균 성장률. 대중 향수(2.69%)의 3배 이상.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🧪 What exactly is a "skin scent"?',
          ko: '🧪 "스킨 센트"란 정확히 뭘까요?'
        },
        children: [
          {
            type: 'body',
            text: {
              en: 'Western perfumery has long valued projection — how far a scent travels. Korean fragrance design pursues the opposite. <mark>A scent you can only smell up close, one that merges with your body heat and becomes uniquely yours.</mark> That\'s a skin scent. It\'s built on <strong>low-vapor-pressure, high-molecular-weight</strong> ingredients — musks, clean powders, tea, sheer woods — that don\'t rush into the air. They stay close to skin, evolving slowly over hours.',
              ko: '서양 향수가 \'프로젝션(projection)\' — 얼마나 멀리 퍼지느냐 — 을 중시한다면, 한국 향수는 정반대를 추구해요. <mark>가까이 다가와야 느낄 수 있는 향, 피부 위에서 체온과 섞여 나만의 냄새가 되는 향.</mark> 이걸 \'스킨 센트\'라고 부릅니다. 머스크, 파우더, 차, 시어 우드처럼 <strong>증기압이 낮고 분자량이 큰</strong> 원료를 중심으로 설계되기 때문에, 공기 중으로 빠르게 날아가지 않고 피부에 오래 밀착돼요.'
            }
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🔬 The molecules behind the K-fragrance signature',
          ko: '🔬 K-프래그런스를 만드는 핵심 분자들'
        },
        children: [
          {
            type: 'callout',
            icon: '🤍',
            title: { en: 'White Musk — intimacy, engineered', ko: '화이트 머스크 — 실험실에서 만든 친밀함' },
            text: {
              en: "White musk isn't a single natural ingredient — it's a lab-engineered accord of multiple synthetic molecules designed to evoke cleanliness, softness, and intimacy. It's the most common base in Korean fragrances, and it has a unique property: <strong>it responds to body heat, rising gently from skin rather than projecting into a room</strong>.",
              ko: '화이트 머스크는 자연에서 추출한 단일 원료가 아니에요. 실험실에서 여러 합성 분자를 조합해 \'깨끗함, 부드러움, 친밀함\'이라는 후각적 인상을 만든 어코드입니다. 한국 향수의 베이스에 가장 많이 쓰이며, <strong>피부 위에서 체온에 반응해 은은하게 올라오는 특성</strong>이 있어요.'
            },
            borderColor: 'rgba(107,142,107,0.3)',
            bgColor: 'rgba(107,142,107,0.06)'
          },
          {
            type: 'callout',
            icon: '🌊',
            title: { en: 'Ambroxan — the molecule that smells like skin', ko: '앰브록산(Ambroxan) — 피부처럼 느껴지는 분자' },
            text: {
              en: 'Ambroxan is the synthetic version of ambergris — a warm, salty, mineral musk. <mark>It\'s called the "second skin" molecule because it doesn\'t smell like perfume — it makes your skin smell better.</mark> It\'s one of the most frequently used ingredients in K-fragrance formulation.',
              ko: '앰브록산은 용연향(Ambergris)의 합성 버전으로, 짠맛과 미네랄 느낌이 나는 따뜻한 머스크예요. <mark>피부 자체의 냄새를 더 좋게 만드는 것처럼 느껴지기 때문에</mark> "세컨드 스킨" 분자라고 불립니다. K-프래그런스에서 자주 쓰이는 핵심 원료 중 하나예요.'
            },
            borderColor: 'rgba(45,90,61,0.2)',
            bgColor: 'rgba(45,90,61,0.04)'
          },
          {
            type: 'callout',
            icon: '🌿',
            title: { en: 'Sheer Woods — timber, thinned to a whisper', ko: '시어 우드 — 가볍게 스치는 나무' },
            text: {
              en: "Where traditional woody perfumes lean on heavy sandalwood or cedar, K-fragrance uses the same materials at extreme dilution. The wood is there — but as a feeling, not a statement. Blended with musk, it creates what perfumers call \"clean warmth\" — present but never imposing.",
              ko: '전통 우디 향수가 묵직한 샌달우드나 시더를 쓴다면, K-프래그런스는 같은 나무 원료를 극도로 희석해서 사용해요. 나무 향이 존재하지만 느낌만 남을 정도로 가볍고, 머스크와 섞이면서 \'깨끗한 따뜻함\'을 만들어냅니다.'
            },
            borderColor: 'rgba(245,215,110,0.4)',
            bgColor: 'rgba(245,215,110,0.08)'
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🇰🇷 What makes Korean fragrance brands different?',
          ko: '🇰🇷 한국 향수 브랜드는 뭐가 다른가요?'
        },
        children: [
          {
            type: 'body',
            text: {
              en: "French perfume is a tool for self-expression. Korean perfume is closer to the air around you. <mark>Brands like Tamburins, Nonfiction, and Granhand position fragrance as part of a sensory ritual</mark> — extending a single scent world across hand creams, candles, diffusers, and car fragrances. Formulations default to sulfate-, paraben-, and phthalate-free, applying the same \"clean\" philosophy K-beauty brought to skincare.",
              ko: '프랑스 향수가 \'나를 드러내는 도구\'라면, 한국 향수는 \'나를 감싸는 공기\'에 가까워요. <mark>탬버린즈, 논픽션, 그랑핸드 같은 브랜드들은 향수를 감각적 의식(ritual)의 일부로 포지셔닝합니다</mark> — 핸드크림, 캔들, 디퓨저까지 하나의 향 세계관으로 확장하죠. 성분도 설페이트, 파라벤, 프탈레이트 프리를 기본으로 하며, \'클린 포뮬레이션\'을 향수에도 적용하고 있어요.'
            }
          },
          {
            type: 'grid',
            minWidth: '280px',
            gap: 22,
            items: [
              { title: { en: 'Tamburins', ko: '탬버린즈 (Tamburins)' }, body: { en: 'Known for egg-shaped bottles and unexpected combinations — like Pumpkini (pumpkin + coconut milk + shiso leaf + ginger). Familiar notes made unfamiliar.', ko: '달걀형 병으로 유명한 브랜드. 시소잎과 생강을 얹은 코코넛 밀크 향(Pumpkini) 같은 독특한 조합으로, 익숙한 듯 낯선 향을 만들어요.' } },
              { title: { en: 'Nonfiction', ko: '논픽션 (Nonfiction)' }, body: { en: 'Plant-derived ingredients, never overpowering. Names inspired by nature, designed around the idea of finding calm through scent rituals.', ko: '식물 유래 원료 중심으로 "절대 과하지 않은" 향을 지향해요. 자연에서 영감받은 이름과 내면의 평온을 테마로 합니다.' } },
              { title: { en: 'Granhand', ko: '그랑핸드 (Granhand)' }, body: { en: "Born in Seoul's Seongsu-dong. Extends fragrance into everyday sensory experience — hand cream, room spray, candles, all one world.", ko: '서울 성수동에서 시작한 브랜드로, 향을 일상의 감각 경험으로 확장합니다. 핸드크림부터 공간 향까지 하나의 세계관.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '✨ K-fragrances worth trying now',
          ko: '✨ 지금 써볼 만한 K-프래그런스'
        },
        children: [
          {
            type: 'prodCards',
            cards: [
              { brand: 'Tamburins', name: 'Perfume Chamo', note: { en: 'Linalool top, cypriol heart — calm, slow-unfurling skin scent', ko: '리날로올 탑, 시프리올 하트 — 침착하고 서서히 펼쳐지는 스킨 센트' }, accentColor: 'var(--sage)' },
              { brand: 'Nonfiction', name: 'Gentle Night Eau de Parfum', note: { en: 'White musk + sheer wood — a bedtime ritual in scent form', ko: '화이트 머스크 + 시어 우드 — 잠들기 전 의식처럼 쓰는 향' }, accentColor: 'var(--sage)' },
              { brand: 'Borntostandout', name: 'Naked Mind', note: { en: 'Ambroxan-based minimal musk — perfume that smells like not wearing perfume', ko: '앰브록산 베이스의 미니멀 머스크 — "향수를 안 뿌린 것 같은" 향수' }, accentColor: 'var(--sage)' }
            ]
          }
        ]
      }
    ]
  },

  // ─── 8. pistachio-fragrance-note ───
  {
    id: 'pistachio-fragrance-note',
    body_blocks: [
      {
        type: 'tldr',
        icon: '🥜',
        text: {
          en: '<strong>TL;DR:</strong> Pistachio is 2026\'s fastest-rising fragrance note — up 852% year-over-year. Perfumers don\'t use the nut itself. They build a synthetic accord from lactones (\u03b3-undecalactone), pyrazines (2-acetyl pyrazine), and benzaldehyde to create the impression of "creamy warmth." What started with a viral Dubai chocolate moment is now reshaping gourmand perfumery.',
          ko: '<strong>요약:</strong> 피스타치오가 2026년 향수 업계에서 전년 대비 852% 성장한 노트로 떠올랐어요. 견과류 자체를 쓰는 게 아니라, 락톤(\u03b3-운데카락톤), 피라진(2-아세틸 피라진), 벤즈알데히드를 조합해 \'크리미하고 따뜻한\' 후각적 인상을 합성합니다. 두바이 초콜릿 바이럴에서 시작된 이 트렌드는 구르망 향수의 진화를 보여줘요.'
        }
      },
      {
        type: 'figure',
        src: 'https://images.unsplash.com/photo-1502825751399-28baa9b81efe?auto=format&fit=crop&q=80&w=1200',
        alt: 'Pistachios in a bowl, representing the trending pistachio fragrance note in perfumery'
      },
      {
        type: 'section',
        heading: {
          en: '📈 Why pistachio, why now?',
          ko: '📈 왜 갑자기 피스타치오인가요?'
        },
        children: [
          {
            type: 'body',
            text: {
              en: 'The Dubai chocolate viral moment of late 2024 turned pistachio into a global flavor icon. That wave reached perfumery. <mark>Pistachio notes are up 852% year-over-year, making it 2026\'s fastest-rising fragrance ingredient.</mark> Consumers tired of one-dimensional sweet gourmands are looking for <strong>warmth with texture and depth</strong> — and pistachio delivers exactly that.',
              ko: '2024년 말, 두바이 초콜릿 바이럴이 피스타치오를 전 세계적인 \'맛의 아이콘\'으로 만들었어요. 그 물결이 향수까지 왔습니다. <mark>피스타치오 노트는 전년 대비 852% 성장하며 2026년 가장 빠르게 뜨는 향료가 됐어요.</mark> 달콤하기만 한 기존 구르망 향수에 질린 소비자들이 <strong>질감이 있고 깊이 있는 따뜻함</strong>을 찾기 시작한 거예요.'
            }
          },
          {
            type: 'statCards',
            cards: [
              { title: { en: '📊 852% growth', ko: '📊 852% 성장' }, desc: { en: 'Pistachio note popularity increase year-over-year.', ko: '피스타치오 향료 노트의 전년 대비 인기 상승률.' } },
              { title: { en: '🍫 Dubai chocolate effect', ko: '🍫 두바이 초콜릿 효과' }, desc: { en: 'The 2024 viral moment that launched pistachio into fragrance.', ko: '2024년 바이럴에서 시작된 피스타치오 열풍이 향수 산업까지 확산.' } },
              { title: { en: '🧪 Synthetic accord', ko: '🧪 합성 어코드' }, desc: { en: 'Not the actual nut — a combination of molecules that creates the impression.', ko: '진짜 견과류가 아닌, 여러 분자를 조합해 만든 후각적 인상.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🔬 What molecules make a pistachio scent?',
          ko: '🔬 피스타치오 향은 어떤 분자로 만들까요?'
        },
        children: [
          {
            type: 'callout',
            icon: '🥜',
            title: { en: 'Pyrazines — the source of nutty warmth', ko: '피라진 — 고소한 따뜻함의 정체' },
            text: {
              en: '<strong>2-Acetyl pyrazine</strong> — sometimes called "popcorn pyrazine" — is the molecule behind the toasted, nutty aroma in roasted nuts, bread, and popcorn. It\'s the backbone of the "warm, baked" quality in pistachio accords.',
              ko: '<strong>2-아세틸 피라진(2-Acetyl Pyrazine)</strong>은 "팝콘 피라진"이라고도 불리는 분자로, 볶은 견과류·빵·팝콘에서 나는 고소한 향의 원인이에요. 피스타치오 어코드의 \'따뜻하고 구운 느낌\'을 만드는 핵심 원료입니다.'
            },
            borderColor: 'rgba(107,142,107,0.3)',
            bgColor: 'rgba(107,142,107,0.06)'
          },
          {
            type: 'callout',
            icon: '🍑',
            title: { en: 'Lactones — velvety creaminess', ko: '락톤 — 벨벳 같은 크리미함' },
            text: {
              en: '<strong>\u03b3-Undecalactone</strong> — the "peach lactone" — creates <mark>the velvety mid-phase that makes up 20–25% of a pistachio formula</mark>. Add <strong>\u03b3-nonalactone</strong> for tropical creaminess. These two lactones are what make pistachio smell like perfume rather than food.',
              ko: '<strong>\u03b3-운데카락톤(\u03b3-Undecalactone)</strong>은 "피치 락톤"이라고 불리며, <mark>피스타치오 향 포뮬러의 20~25%를 차지하는 크리미한 중간 단계</mark>를 만들어요. 여기에 <strong>\u03b3-노나락톤</strong>이 더해지면 열대 과일 같은 부드러움이 생깁니다. 이 두 락톤이 피스타치오를 "음식"이 아닌 "향수"로 느끼게 하는 비결이에요.'
            },
            borderColor: 'rgba(45,90,61,0.2)',
            bgColor: 'rgba(45,90,61,0.04)'
          },
          {
            type: 'callout',
            icon: '🍬',
            title: { en: 'Benzaldehyde — marzipan sweetness', ko: '벤즈알데히드 — 마지팬의 달콤함' },
            text: {
              en: 'Benzaldehyde derivatives add the sweet, almond-marzipan facet. Combined with pyrazine warmth and lactone creaminess, they complete the signature of modern gourmand pistachio — <strong>warm and cozy without being heavy</strong>.',
              ko: '벤즈알데히드 유도체는 아몬드·마지팬 같은 달콤한 견과류 느낌을 더해요. 피라진의 고소함, 락톤의 크리미함과 합쳐지면 <strong>\'따뜻하고 포근하지만 무겁지 않은\'</strong> 현대 구르망 향수의 시그니처가 완성됩니다.'
            },
            borderColor: 'rgba(245,215,110,0.4)',
            bgColor: 'rgba(245,215,110,0.08)'
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '🧊 What separates a good pistachio fragrance from a bad one?',
          ko: '🧊 좋은 피스타치오 향수 vs 나쁜 피스타치오 향수'
        },
        children: [
          {
            type: 'grid',
            minWidth: '280px',
            gap: 22,
            items: [
              { title: { en: 'Balance is everything', ko: '균형이 핵심' }, body: { en: 'Too many pyrazines = popcorn. Too many lactones = artificial cream. A good pistachio fragrance gets the ratio between all three molecular families exactly right.', ko: '피라진만 많으면 팝콘 냄새, 락톤만 많으면 인공적인 크림 냄새가 나요. 좋은 피스타치오 향수는 세 분자군의 비율이 정확하게 맞아야 합니다.' } },
              { title: { en: 'Restraint on sweetness', ko: '달콤함의 절제' }, body: { en: "The 2026 gourmand trend is 'dark gourmand' — dessert-sweet is fading. Pistachio needs salt, bitterness, and woody contrast to feel sophisticated, not juvenile.", ko: '2026년 구르망 트렌드는 "다크 구르망" — 디저트처럼 달기만 한 향은 사라지고 있어요. 피스타치오도 짠맛, 쓴맛, 우디 노트와 대비를 이뤄야 세련됩니다.' } },
              { title: { en: 'Why niche does it better', ko: '니치에서 빛나는 이유' }, body: { en: 'Some niche houses use cold-pressed pistachio oil at up to 15% concentration. That genuine roasted warmth is expensive — and impossible to replicate with synthetics alone.', ko: '피스타치오 오일을 15%까지 사용하는 니치 브랜드도 있어요. 합성 어코드만으로는 낼 수 없는 진짜 로스팅된 따뜻함을 원한다면 원료 투자가 필요합니다.' } }
            ]
          }
        ]
      },
      {
        type: 'section',
        heading: {
          en: '✨ Pistachio fragrances worth smelling',
          ko: '✨ 피스타치오 노트가 빛나는 향수들'
        },
        children: [
          {
            type: 'prodCards',
            cards: [
              { brand: 'Maison Margiela', name: 'Replica Coffee Break', note: { en: 'Lavender + pistachio accord — an olfactory latte moment', ko: '라벤더 + 피스타치오 어코드 — 고소한 카페 라떼의 후각적 재현' }, accentColor: 'var(--sage)' },
              { brand: 'Xerjoff', name: 'Pikovaya Dama', note: { en: 'Real pistachio oil — deep roasted warmth that lasts all day', ko: '진짜 피스타치오 오일 사용 — 깊고 로스팅된 따뜻함이 하루 종일' }, accentColor: 'var(--sage)' },
              { brand: 'Sol de Janeiro', name: 'Cheirosa 87', note: { en: 'Pistachio + salted caramel — perfect sweet-salty tension', ko: '피스타치오 + 살티 카라멜 — 달콤함과 짠맛의 완벽한 긴장감' }, accentColor: 'var(--sage)' }
            ]
          }
        ]
      }
    ]
  }
];

async function migrate() {
  let success = 0;
  let failed = 0;

  for (const article of articles) {
    const url = `${SUPABASE_URL}/rest/v1/articles?id=eq.${article.id}`;
    try {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ body_blocks: article.body_blocks })
      });

      if (res.ok) {
        console.log(`  [OK] ${article.id}`);
        success++;
      } else {
        const text = await res.text();
        console.error(`  [FAIL] ${article.id} — ${res.status}: ${text}`);
        failed++;
      }
    } catch (err) {
      console.error(`  [ERROR] ${article.id} — ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. ${success} updated, ${failed} failed.`);
}

console.log('Migrating body_blocks for 8 articles...\n');
migrate();
