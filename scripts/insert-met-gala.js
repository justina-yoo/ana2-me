const SUPABASE_URL = "https://hkyfggapijgedsizfqec.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ";

const article = {
  id: "met-gala-2026-skin-prep",
  category: { en: "Molecular Insights", ko: "분자 인사이트" },
  title: {
    en: "Met Gala 2026 Skin Prep — What Celebrities Actually Did to Their Faces Before the Red Carpet.",
    ko: "멧 갈라 2026 스킨 프렙 — 셀럽들이 레드카펫 전에 얼굴에 한 진짜 시술"
  },
  tag: { en: "Skincare", ko: "스킨케어" },
  tag_color: "var(--accent)",
  date: "May 7, 2026",
  read_time: { en: "6 min read", ko: "6분 읽기" },
  image_url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800",
  excerpt: {
    en: "The 2026 Met Gala just wrapped, and celebrity facialists are finally spilling the protocols behind that red-carpet glow. From Edyta Jarosz's signature buccal massage to Augustinus Bader's oxygen infusion method, the real secret is that prep starts <strong>5 weeks before</strong> — not the night before. Here's every treatment, mapped molecule by molecule.",
    ko: "2026 멧 갈라가 끝나고, 셀럽 전담 피부 관리사들이 레드카펫 글로우 비하인드를 공개하고 있어요. 이반 폴의 시그니처 버칼 마사지부터 아우구스티누스 바더의 산소 주입 프로토콜까지 — 진짜 비결은 <strong>5주 전부터</strong> 시작된다는 거예요. 모든 시술을 분자 단위로 분석해 봤어요."
  },
  keywords: {
    en: ["Met Gala 2026", "celebrity skincare", "red carpet prep", "buccal massage", "lymphatic drainage", "LED therapy", "oxygen facial", "peptide infusion", "Augustinus Bader", "Edyta Jarosz", "kobido massage", "meditation facial", "gua sha", "collagen boost"],
    ko: ["멧 갈라 2026", "셀럽 스킨케어", "레드카펫 준비", "버칼 마사지", "림프 드레니지", "LED 테라피", "산소 페이셜", "펩타이드 주입", "아우구스티누스 바더", "이반 폴", "코비도 마사지", "명상 페이셜", "구아샤", "콜라겐 부스트"]
  },
  body_blocks: [
    {
      type: "tldr",
      icon: "✨",
      items: {
        en: [
          "Celebrity Met Gala skin prep starts <strong>5 weeks</strong> before the event, not the night before.",
          "Three dominant protocols this year: buccal massage, oxygen infusion, and the new \"meditation facial.\"",
          "Lymphatic drainage is the <mark>single most repeated step</mark> across every facialist's routine.",
          "You can replicate ~70% of the results at home with the right tools and timing."
        ],
        ko: [
          "셀럽들의 멧 갈라 피부 준비는 행사 <strong>5주 전</strong>부터 시작돼요, 전날 밤이 아니에요.",
          "올해 3대 프로토콜: 버칼 마사지, 산소 주입, 그리고 새로운 '명상 페이셜'이에요.",
          "림프 드레니지는 모든 피부 관리사의 루틴에서 <mark>가장 반복되는 단계</mark>예요.",
          "적절한 도구와 타이밍만 있으면 집에서도 결과의 ~70%를 재현할 수 있어요."
        ]
      }
    },
    {
      type: "figure",
      src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200",
      alt: {
        en: "Elegant skincare preparation setup with luxury products and tools",
        ko: "럭셔리 제품과 도구가 세팅된 스킨케어 준비 장면"
      },
      caption: {
        en: "Behind the glow: the 5-week protocol that built this year's Met Gala red-carpet skin.",
        ko: "글로우의 비밀: 올해 멧 갈라 레드카펫 피부를 만든 5주 프로토콜."
      }
    },
    {
      type: "section",
      title: { en: "The 5-Week Timeline", ko: "5주 타임라인" },
      body: {
        en: "Contrary to popular belief, Met Gala skin isn't made overnight. Celebrity facialists begin their protocols <strong>five full weeks</strong> before the event. Week 1–2 focuses on <mark>barrier repair and deep hydration</mark> — retinoids are paused, and gentle acids replace aggressive exfoliants. Week 3 introduces targeted treatments like microcurrent and LED. Week 4 ramps up collagen-stimulating peptides and oxygen infusions. The final week is all about lymphatic drainage, sculpting, and locking in luminosity with hydrogel masks and cryo tools.",
        ko: "일반적인 생각과 달리, 멧 갈라 피부는 하루아침에 만들어지지 않아요. 셀럽 전담 피부 관리사들은 행사 <strong>5주 전</strong>부터 프로토콜을 시작해요. 1~2주차는 <mark>피부 장벽 회복과 딥 하이드레이션</mark>에 집중하고, 레티노이드를 중단하고 자극적인 각질 제거제 대신 순한 산을 사용해요. 3주차에는 마이크로커런트와 LED 같은 타깃 시술이 들어가요. 4주차에는 콜라겐 촉진 펩타이드와 산소 주입이 강화돼요. 마지막 주에는 림프 드레니지, 스컬프팅, 하이드로겔 마스크와 크라이오 도구로 광채를 고정시켜요."
      },
      statCards: [
        {
          label: { en: "Prep Duration", ko: "준비 기간" },
          value: { en: "5 weeks", ko: "5주" },
          note: { en: "Average timeline used by top celebrity facialists", ko: "톱 셀럽 피부 관리사들의 평균 타임라인" }
        },
        {
          label: { en: "Lymphatic Drainage", ko: "림프 드레니지" },
          value: { en: "40% reduction", ko: "40% 감소" },
          note: { en: "In facial puffiness after consistent sessions", ko: "꾸준한 시술 후 얼굴 붓기 감소율" }
        },
        {
          label: { en: "LED Wavelengths", ko: "LED 파장" },
          value: { en: "633 nm + 830 nm", ko: "633 nm + 830 nm" },
          note: { en: "Red light (collagen) + near-infrared (deep healing)", ko: "적색광(콜라겐) + 근적외선(심부 치유)" }
        }
      ]
    },
    {
      type: "section",
      title: { en: "The Signature Treatments", ko: "시그니처 시술들" },
      body: {
        en: "Three protocols dominated the 2026 Met Gala prep circuit. Each takes a fundamentally different approach to achieving the same goal: <strong>sculpted, lit-from-within skin</strong> that photographs flawlessly under any lighting.",
        ko: "2026 멧 갈라 준비 현장에서는 세 가지 프로토콜이 지배적이었어요. 각각 근본적으로 다른 접근법을 취하지만 목표는 같아요: 어떤 조명 아래서든 완벽하게 찍히는 <strong>스컬프팅된 이너 글로우 피부</strong>예요."
      },
      callouts: [
        {
          color: "green",
          title: { en: "Buccal Massage & Lymphatic Sculpting", ko: "버칼 마사지 & 림프 스컬프팅" },
          body: {
            en: "The most requested pre-Met Gala treatment is <strong>buccal massage</strong> — working facial muscles from inside the mouth to release tension in the jaw, lift cheekbones, and define the jawline. Combined with intense lymphatic drainage, <mark>the treatment targets deep fascia layers that topical products can't reach.</mark> Celebrity facialist Edyta Jarosz's \"Lift, Sculpt & Slap\" protocol adds rapid percussive movements to boost circulation. Results include visibly sharper cheekbones, reduced puffiness, and a sculpted jawline lasting 5–7 days.",
            ko: "멧 갈라 전 가장 많이 요청되는 시술은 <strong>버칼 마사지</strong>예요 — 입 안에서 안면 근육을 풀어 턱 긴장을 완화하고 광대뼈를 올리고 턱선을 잡아주는 기법이에요. 강도 높은 림프 드레니지와 결합하면 <mark>토피컬 제품이 닿지 않는 깊은 근막층까지 타깃해요.</mark> 셀럽 페이셜리스트 에디타 야로시의 '리프트, 스컬프트 & 슬랩' 프로토콜은 빠른 타격 동작으로 혈액순환을 극대화해요. 눈에 띄게 살아나는 광대뼈, 줄어든 붓기, 5~7일 유지되는 스컬프팅된 턱선이 결과예요."
          }
        },
        {
          color: "sage",
          title: { en: "\"The Method\" — Augustinus Bader Protocol", ko: "\"더 메소드\" — 아우구스티누스 바더 프로토콜" },
          body: {
            en: "Augustinus Bader's \"The Method\" is a multi-step oxygen infusion protocol built around their hero product, <strong>The Elixir</strong>. The treatment begins with a Kobido massage — a traditional Japanese sculpting technique — followed by pressurized oxygen infusion that drives active ingredients deep into the epidermis. <mark>Hydrogel masks saturated with TFC8 complex</mark> are applied while cryo sticks work to seal everything in and de-puff. The protocol takes 75 minutes and delivers visible plumping and radiance within hours.",
            ko: "아우구스티누스 바더의 '더 메소드'는 히어로 제품인 <strong>디 엘릭서</strong>를 중심으로 구성된 다단계 산소 주입 프로토콜이에요. 시술은 일본 전통 스컬프팅 기법인 코비도 마사지로 시작하고, 가압 산소 주입으로 활성 성분을 표피 깊숙이 전달해요. <mark>TFC8 컴플렉스가 포화된 하이드로겔 마스크</mark>를 붙인 상태에서 크라이오 스틱으로 성분을 밀봉하고 붓기를 빼요. 프로토콜은 75분 소요되며, 몇 시간 안에 눈에 보이는 플럼핑과 광채를 만들어 줘요."
          }
        },
        {
          color: "amber",
          title: { en: "The \"Meditation Facial\" — 2026's Breakout Trend", ko: "\"명상 페이셜\" — 2026년 브레이크아웃 트렌드" },
          body: {
            en: "The newest protocol making waves this year combines <strong>guided breathwork with advanced skin tech</strong>. Sessions begin with 10 minutes of diaphragmatic breathing to activate the parasympathetic nervous system — reducing cortisol that causes inflammation and breakouts. While in this relaxed state, therapists layer LED therapy (633 nm red + 830 nm near-infrared), <mark>radio frequency for collagen stimulation</mark>, and a peptide infusion cocktail. Advocates say the stress-reduction component makes treatments 30% more effective because the skin absorbs actives better when cortisol is low.",
            ko: "올해 가장 주목받는 새로운 프로토콜은 <strong>가이드 호흡법과 첨단 피부 기술</strong>을 결합한 거예요. 세션은 10분간의 횡격막 호흡으로 시작해서 부교감 신경계를 활성화하고, 염증과 트러블을 유발하는 코르티솔을 줄여요. 이 이완 상태에서 테라피스트가 LED 테라피(633 nm 적색 + 830 nm 근적외선), <mark>콜라겐 촉진을 위한 고주파</mark>, 펩타이드 주입 칵테일을 순서대로 적용해요. 스트레스 감소 요소 덕분에 시술 효과가 30% 높아진다고 하는데, 코르티솔이 낮을 때 피부가 활성 성분을 더 잘 흡수하기 때문이에요."
          }
        }
      ]
    },
    {
      type: "section",
      title: { en: "At-Home Alternatives", ko: "홈케어 대안" },
      body: {
        en: "You don't need a celebrity facialist to borrow from these protocols. Here are the <mark>four most impactful techniques</mark> you can do yourself with accessible tools.",
        ko: "이 프로토콜들을 따라 하는 데 셀럽 전담 관리사가 필요하지 않아요. 접근 가능한 도구로 직접 할 수 있는 <mark>가장 효과적인 네 가지 기법</mark>을 소개해요."
      },
      grid: [
        {
          title: { en: "Gua Sha for Lymphatic Drainage", ko: "림프 드레니지를 위한 구아샤" },
          body: {
            en: "A <strong>jade or stainless steel gua sha</strong> tool mimics professional lymphatic drainage when used with proper technique. Always stroke upward and outward, starting from the neck. Use light pressure — you're moving lymph fluid, not reshaping bone. 5 minutes daily delivers visible de-puffing within a week.",
            ko: "<strong>옥이나 스테인리스 스틸 구아샤</strong> 도구는 올바른 기법으로 사용하면 전문적인 림프 드레니지를 재현할 수 있어요. 항상 목부터 시작해서 위쪽과 바깥쪽으로 쓸어줘요. 가벼운 압력으로 — 림프액을 움직이는 거지 뼈를 재형성하는 게 아니에요. 매일 5분이면 일주일 안에 눈에 보이는 디퍼핑 효과가 있어요."
          }
        },
        {
          title: { en: "At-Home LED Mask Devices", ko: "홈 LED 마스크 디바이스" },
          body: {
            en: "Consumer LED masks now offer the same <strong>633 nm and 830 nm wavelengths</strong> used in professional settings. Look for FDA-cleared devices with at least 100 mW/cm² irradiance. Use 3–4 times per week for 10 minutes per session. Consistency matters more than intensity.",
            ko: "가정용 LED 마스크도 이제 전문 시술에서 사용하는 것과 같은 <strong>633 nm, 830 nm 파장</strong>을 제공해요. FDA 승인을 받은 100 mW/cm² 이상의 조사량을 가진 기기를 찾아보세요. 주 3~4회, 세션당 10분 사용해요. 강도보다 꾸준함이 더 중요해요."
          }
        },
        {
          title: { en: "Peptide Serums", ko: "펩타이드 세럼" },
          body: {
            en: "Peptides like <strong>Matrixyl (palmitoyl tripeptide-1)</strong> and copper peptides signal your skin to produce more collagen. Apply on slightly damp skin after cleansing. Layer under a moisturizer to lock in. These are the same active categories used in professional infusion protocols.",
            ko: "<strong>마트릭실(팔미토일 트리펩타이드-1)</strong>과 구리 펩타이드 같은 펩타이드는 피부에 콜라겐 생성 신호를 보내요. 세안 후 약간 축축한 피부에 발라요. 모이스처라이저 아래 레이어링해서 밀봉해 줘요. 전문 주입 프로토콜에서 사용하는 것과 같은 활성 성분 카테고리예요."
          }
        },
        {
          title: { en: "Pre-Event Hydrating Sheet Masks", ko: "이벤트 전 수분 시트 마스크" },
          body: {
            en: "Apply a <strong>hyaluronic acid-rich sheet mask</strong> 2–3 hours before an event (not immediately before — give skin time to absorb). Look for masks with multiple HA molecular weights for multi-depth hydration. Refrigerate beforehand for a cryo-like de-puffing bonus.",
            ko: "<strong>히알루론산이 풍부한 시트 마스크</strong>를 이벤트 2~3시간 전에 사용해요(직전이 아니라 흡수할 시간을 줘야 해요). 다양한 분자량의 HA가 들어간 마스크를 찾아서 다층 수분 공급을 해줘요. 미리 냉장 보관하면 크라이오 같은 디퍼핑 보너스도 얻을 수 있어요."
          }
        }
      ]
    },
    {
      type: "section",
      title: { en: "Products to Try at Home", ko: "집에서 써볼 만한 제품" },
      body: {
        en: "These three products let you replicate key steps from the celebrity protocols above. They won't replace a professional treatment, but they're the <mark>closest over-the-counter equivalents</mark> available right now.",
        ko: "이 세 가지 제품으로 위 셀럽 프로토콜의 핵심 단계를 재현할 수 있어요. 전문 시술을 대체할 순 없지만, 현재 구할 수 있는 <mark>가장 가까운 일반 판매 대안</mark>이에요."
      },
      prodCards: [
        {
          name: { en: "Augustinus Bader The Rich Cream", ko: "아우구스티누스 바더 더 리치 크림" },
          desc: {
            en: "The same TFC8 complex used in \"The Method\" protocol. Provides deep hydration and supports the skin's natural renewal process. Apply as the last step in your PM routine.",
            ko: "'더 메소드' 프로토콜에서 사용되는 TFC8 컴플렉스와 동일한 성분이에요. 깊은 수분 공급과 피부 자연 재생 과정을 지원해요. PM 루틴의 마지막 단계로 발라요."
          },
          accentColor: "var(--accent)"
        },
        {
          name: { en: "ZIIP HALO Device", ko: "ZIIP 헤일로 디바이스" },
          desc: {
            en: "Professional-grade microcurrent and nanocurrent in one device. Mimics the sculpting and lifting effects of in-office treatments. Pair with a conductive gel for best results — 3 sessions per week recommended.",
            ko: "하나의 디바이스에 프로페셔널급 마이크로커런트와 나노커런트가 담겨 있어요. 인오피스 시술의 스컬프팅과 리프팅 효과를 재현해요. 전도성 젤과 함께 사용하면 최고 — 주 3회 사용 권장이에요."
          },
          accentColor: "var(--accent)"
        },
        {
          name: { en: "The Ordinary Multi-Peptide + HA Serum", ko: "디오디너리 멀티 펩타이드 + HA 세럼" },
          desc: {
            en: "An accessible peptide serum with Matrixyl 3000, Matrixyl Synthe'6, and multiple HA weights. Delivers collagen-signaling peptides at a fraction of professional treatment costs. Use AM and PM on damp skin.",
            ko: "마트릭실 3000, 마트릭실 신세6, 다양한 분자량의 HA가 포함된 합리적인 가격의 펩타이드 세럼이에요. 전문 시술 비용의 일부로 콜라겐 촉진 펩타이드를 전달해요. AM, PM 모두 축축한 피부에 사용해요."
          },
          accentColor: "var(--accent)"
        }
      ]
    }
  ]
};

async function insertArticle() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/articles`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal"
    },
    body: JSON.stringify(article)
  });

  if (res.ok) {
    console.log(`SUCCESS: Article "${article.id}" inserted (HTTP ${res.status})`);
  } else {
    const text = await res.text();
    console.error(`ERROR: HTTP ${res.status} — ${text}`);
  }
}

insertArticle();
