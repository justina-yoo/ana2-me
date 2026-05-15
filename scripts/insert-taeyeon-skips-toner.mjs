// insert-taeyeon-skips-toner.mjs — Insert article into Supabase

const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';

const article = {
  id: "taeyeon-skips-toner",
  category: { en: "Molecular Insights", ko: "분자 인사이트" },
  title: {
    en: "Taeyeon Skips Toner Entirely. Here's Why a K-Pop Idol's Shortcut Might Be Smarter Than Your 7-Step Routine.",
    ko: "태연은 토너를 안 써요. 아이돌의 '숏컷'이 7단계 루틴보다 나을 수 있는 이유"
  },
  tag: { en: "Skincare", ko: "스킨케어" },
  tag_color: "var(--accent)",
  date: "May 7, 2026",
  read_time: { en: "5 min read", ko: "5분 읽기" },
  image_url: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=800",
  excerpt: {
    en: "Girls' Generation's Taeyeon applies moisturizer directly to damp skin, skipping toner entirely. Dermatologists say this actually improves absorption — water on the skin surface creates a concentration gradient that pulls humectants deeper. Fewer steps, better results.",
    ko: "소녀시대 태연은 토너를 건너뛰고 젖은 피부에 바로 보습제를 발라요. 피부과 전문의들에 따르면 이 방법이 오히려 흡수율을 높인대요 — 피부 표면의 수분이 농도 기울기를 만들어 보습 성분을 더 깊이 끌어당기거든요. 단계는 줄이고, 효과는 올리는 거예요."
  },
  keywords: [
    "Taeyeon", "태연", "toner", "토너", "skincare routine", "스킨케어 루틴",
    "damp skin", "젖은 피부", "K-pop idol skincare", "아이돌 스킨케어",
    "skip toner", "토너 생략", "moisturizer", "보습제", "concentration gradient",
    "농도 기울기", "humectant", "습윤제", "simplified routine", "간소화 루틴",
    "Girls' Generation", "소녀시대", "SNSD"
  ],
  body_blocks: [
    {
      type: "tldr",
      icon: "💧",
      text: {
        en: "<strong>TL;DR:</strong> Taeyeon skips toner and applies moisturizer straight to damp skin. The science backs her up — water on the skin surface creates a <mark>concentration gradient</mark> that pulls humectants like hyaluronic acid deeper into the epidermis. Modern low-pH cleansers have also made toner's original purpose (pH rebalancing) obsolete for most people.",
        ko: "<strong>요약:</strong> 태연은 토너를 생략하고 젖은 피부에 바로 보습제를 발라요. 과학적으로도 근거가 있어요 — 피부 표면의 수분이 <mark>농도 기울기</mark>를 만들어 히알루론산 같은 보습 성분을 표피 깊숙이 끌어당겨요. 요즘 저자극 클렌저는 pH를 크게 흐트러뜨리지 않아서, 토너의 원래 존재 이유도 사라진 셈이에요."
      }
    },
    {
      type: "figure",
      src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1200",
      alt: "Skincare products and bottles on a clean surface, representing a simplified skincare routine"
    },
    {
      type: "section",
      heading: { en: "What Taeyeon actually does", ko: "태연이 실제로 하는 루틴" },
      children: [
        {
          type: "body",
          text: {
            en: "In multiple interviews and vlogs, <strong>Taeyeon</strong> has shared that she doesn't use toner at all. After cleansing, she applies moisturizer directly to <mark>damp skin</mark> — while her face is still wet from rinsing. Instead of a traditional toner, she occasionally uses a watery essence or a lightweight moisturizing lotion at night to add a thin hydration layer. During the day, she keeps it even simpler: cleanser, moisturizer, sunscreen. That's it.",
            ko: "여러 인터뷰와 브이로그에서 <strong>태연</strong>은 토너를 아예 사용하지 않는다고 밝혔어요. 세안 후 얼굴이 아직 <mark>젖어 있는 상태</mark>에서 바로 보습제를 발라요. 토너 대신 가끔 밤에 워터리 에센스나 가벼운 수분 로션을 한 겹 덧바르는 정도예요. 낮에는 더 간단해요: 클렌저, 보습제, 선크림. 끝이에요."
          }
        },
        {
          type: "statCards",
          cards: [
            {
              title: { en: "67%", ko: "67%" },
              desc: { en: "Of Korean women aged 20-35 use five or fewer skincare products daily — the 10-step routine was always a Western myth", ko: "한국 20-35세 여성 중 매일 5개 이하 스킨케어 제품을 사용하는 비율 — 10단계 루틴은 항상 서양의 신화였어요" }
            },
            {
              title: { en: "-12% YoY", ko: "전년 대비 -12%" },
              desc: { en: "Korean toner market decline as consumers shift to essences and multi-functional products", ko: "에센스 및 다기능 제품으로 소비자가 이동하면서 한국 토너 시장 매출 감소율" }
            },
            {
              title: { en: "78%", ko: "78%" },
              desc: { en: "Of dermatologists surveyed approve simplified routines of 3-4 steps for healthy skin", ko: "설문 조사에 응한 피부과 전문의 중 건강한 피부를 위해 3-4단계 간소화 루틴을 지지하는 비율" }
            }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: { en: "The science of damp skin", ko: "젖은 피부의 과학" },
      children: [
        {
          type: "callout",
          icon: "💧",
          title: { en: "Concentration gradient", ko: "농도 기울기" },
          text: {
            en: "When your skin is damp, the water on its surface creates an <strong>osmotic pull</strong> for humectants like hyaluronic acid and glycerin. These molecules move from areas of low water concentration (the product) to high water concentration (your wet skin), absorbing <mark>deeper into the stratum corneum</mark> than they would on dry skin. It's basic diffusion physics — and it means skipping toner and applying moisturizer to wet skin isn't lazy, it's optimal.",
            ko: "피부가 젖어 있으면 표면의 수분이 히알루론산, 글리세린 같은 습윤제에 대한 <strong>삼투압 끌림</strong>을 만들어요. 이 분자들은 수분 농도가 낮은 곳(제품)에서 높은 곳(젖은 피부)으로 이동하면서 건조한 피부에 바를 때보다 <mark>각질층 더 깊이 흡수</mark>돼요. 기본적인 확산 물리학이에요 — 토너를 건너뛰고 젖은 피부에 보습제를 바르는 건 게으른 게 아니라 최적의 방법인 거예요."
          },
          borderColor: "rgba(45,90,61,0.2)",
          bgColor: "rgba(45,90,61,0.04)"
        },
        {
          type: "callout",
          icon: "🛡️",
          title: { en: "Occlusivity timing", ko: "밀폐 타이밍" },
          text: {
            en: "Applying cream while skin is still wet <strong>traps water molecules under the lipid layer</strong>. The occlusive ingredients in your moisturizer (like petrolatum, dimethicone, or shea butter) form a seal over the damp surface, <mark>effectively boosting TEWL (transepidermal water loss) prevention</mark>. If you wait until skin dries, you've already lost a significant portion of that surface moisture to evaporation.",
            ko: "피부가 아직 젖어 있을 때 크림을 바르면 <strong>수분 분자가 지질층 아래에 갇혀요</strong>. 보습제 속 밀폐성 성분(페트롤라툼, 디메치콘, 시어버터 등)이 젖은 표면 위에 막을 형성해서 <mark>경피 수분 손실(TEWL)을 효과적으로 방지</mark>해요. 피부가 마를 때까지 기다리면 표면 수분의 상당 부분이 이미 증발한 뒤예요."
          },
          borderColor: "rgba(107,142,107,0.25)",
          bgColor: "rgba(107,142,107,0.06)"
        },
        {
          type: "callout",
          icon: "🧪",
          title: { en: "Why toner was invented", ko: "토너가 만들어진 이유" },
          text: {
            en: "Toner was originally designed to <strong>rebalance skin pH after alkaline soap cleansers</strong>. Old-school bar soaps had pH levels of 9-10, stripping the acid mantle (which sits around pH 5.5). Toner brought it back down. But <mark>modern gentle cleansers are already formulated at pH 5-6</mark> — they don't disrupt pH in the first place. For most people using a low-pH cleanser, toner is solving a problem that no longer exists.",
            ko: "토너는 원래 <strong>알칼리성 비누 세안 후 피부 pH를 되돌리기 위해</strong> 만들어졌어요. 옛날 고체 비누는 pH 9-10으로 산성 보호막(pH 5.5 근처)을 벗겨냈거든요. 토너가 그걸 다시 낮춰줬어요. 하지만 <mark>요즘 저자극 클렌저는 이미 pH 5-6으로 설계</mark>돼 있어서 애초에 pH를 흐트러뜨리지 않아요. 저자극 클렌저를 쓰는 대부분의 사람에게 토너는 더 이상 존재하지 않는 문제를 해결하는 제품인 셈이에요."
          },
          borderColor: "rgba(245,215,110,0.4)",
          bgColor: "rgba(245,215,110,0.08)"
        }
      ]
    },
    {
      type: "section",
      heading: { en: "When to keep toner — and when to skip", ko: "토너를 계속 써야 할 때 vs. 생략해도 될 때" },
      children: [
        {
          type: "grid",
          items: [
            {
              title: { en: "✅ Keep: Active toner (AHA/BHA)", ko: "✅ 유지: 활성 토너 (AHA/BHA)" },
              body: {
                en: "If your toner contains <strong>exfoliating acids</strong> like glycolic acid, salicylic acid, or lactic acid, it's doing real work — not just hydrating. These are treatment products disguised as toners, and they serve a purpose no moisturizer replaces.",
                ko: "토너에 <strong>글리콜산, 살리실산, 락틱산</strong> 같은 각질 제거 산이 들어 있다면 단순 수분 공급이 아니라 치료 역할을 해요. 보습제로는 대체할 수 없는 기능이에요."
              }
            },
            {
              title: { en: "✅ Keep: Very dry skin", ko: "✅ 유지: 극건성 피부" },
              body: {
                en: "If your skin is severely dehydrated, an <strong>extra hydration layer</strong> between cleansing and moisturizing can genuinely help. Look for toners with ceramides, panthenol, or centella — they add barrier support, not just water.",
                ko: "피부가 심하게 건조하다면 세안과 보습 사이에 <strong>추가 수분층</strong>이 진짜 도움이 돼요. 세라마이드, 판테놀, 센텔라가 들어간 토너를 찾으세요 — 단순 수분이 아니라 장벽 지원을 해줘요."
              }
            },
            {
              title: { en: "⚠️ Don't skip: After high-pH cleansers", ko: "⚠️ 생략 금지: 고pH 클렌저 사용 후" },
              body: {
                en: "If you're using a <strong>foaming cleanser with pH above 7</strong> or a traditional bar soap, your skin's acid mantle is disrupted. A pH-balancing toner is still necessary to restore it before applying other products.",
                ko: "pH 7 이상의 <strong>폼 클렌저나 고체 비누</strong>를 사용하고 있다면 산성 보호막이 무너진 상태예요. 다른 제품을 바르기 전에 pH 밸런싱 토너로 복원해주는 게 아직 필요해요."
              }
            }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: { en: "✨ Products worth trying", ko: "✨ 추천 제품" },
      children: [
        {
          type: "prodCards",
          cards: [
            {
              brand: "Laneige",
              name: "Cream Skin Cerapeptide Refiner",
              note: {
                en: "A toner-moisturizer hybrid that replaces traditional toner entirely. Delivers ceramides and peptides in a milky-water texture — perfect for the damp-skin method.",
                ko: "토너와 보습제를 하나로 합친 하이브리드 제품이에요. 밀키 워터 텍스처로 세라마이드와 펩타이드를 전달해서 젖은 피부에 바르기 딱 좋아요."
              },
              accentColor: "var(--accent)"
            },
            {
              brand: "Soon Jung",
              name: "Moist Relief All In One Gel",
              note: {
                en: "A lightweight gel moisturizer designed for damp-skin application. Panthenol and madecassoside soothe while locking in the moisture already on your skin.",
                ko: "젖은 피부에 바르도록 설계된 가벼운 젤 보습제예요. 판테놀과 마데카소사이드가 진정시키면서 피부 위의 수분을 가둬줘요."
              },
              accentColor: "var(--accent)"
            },
            {
              brand: "Round Lab",
              name: "1025 Dokdo Cleanser",
              note: {
                en: "A gentle, low-pH (5.5) cleanser that doesn't disrupt the acid mantle — making toner unnecessary for most skin types. Clean rinse, no residue.",
                ko: "pH 5.5의 저자극 클렌저로 산성 보호막을 무너뜨리지 않아요. 대부분의 피부 타입에서 토너가 불필요해지는 클렌저예요. 깔끔한 세정, 잔여감 없음."
              },
              accentColor: "var(--accent)"
            }
          ]
        }
      ]
    }
  ]
};

async function insert() {
  console.log('Inserting article: taeyeon-skips-toner...\n');

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/articles`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(article),
    });

    if (res.ok) {
      console.log(`SUCCESS — article "taeyeon-skips-toner" inserted (${res.status})`);
    } else {
      const text = await res.text();
      console.error(`FAILED — ${res.status}: ${text}`);
    }
  } catch (err) {
    console.error(`ERROR — ${err.message}`);
  }
}

insert();
