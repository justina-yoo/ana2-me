const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';

const product = {
  id: "skincare-10",
  category: "skincare",
  name: "Mung Bean pH-Balanced Cleansing Foam",
  name_ko: "녹두 약산성 클렌징폼",
  brand: "beplain",
  image_url: "/img/beplain-mung-bean-cleansing-foam-nobg.png",
  summary: {
    tagline: "Amino acid-based cleanser with 9,000ppm mung bean powder that removes ultra-fine dust without stripping your barrier.",
    taglineKo: "녹두 파우더 9,000ppm 함유, 피부 장벽을 지키면서 초미세먼지까지 깔끔하게 씻어내는 약산성 아미노산 클렌저.",
    benefits: ["Gentle pH-balanced cleansing that preserves skin barrier", "Mung bean powder physically lifts ultra-fine dust and impurities", "Ceramide NP and hyaluronic acid prevent post-wash tightness"],
    benefitsKo: ["약산성 포뮬러로 피부 장벽을 지키며 세안", "녹두 파우더가 초미세먼지와 노폐물을 물리적으로 흡착", "세라마이드 NP와 히알루론산이 세안 후 당김 방지"],
    concerns: ["Sensitive skin", "Post-cleansing dryness", "Fine dust removal", "Gentle daily cleansing"],
    concernsKo: ["민감성 피부", "세안 후 건조함", "미세먼지 제거", "매일 순한 세안"],
    usage: "Wet face, dispense a small amount and lather between palms. Massage gently over face for 30-60 seconds, then rinse thoroughly with lukewarm water. Use morning and evening.",
    usageKo: "세안 시 적당량을 손바닥에 덜어 충분히 거품을 낸 후, 얼굴에 30~60초간 부드럽게 마사지하고 미온수로 깨끗이 헹궈주세요. 아침·저녁 사용."
  },
  ingredients: [
    { id: "mb", symbol: "MB", name: "Mung Bean Powder", nameKo: "녹두 파우더", description: "Finely milled mung bean seed powder at 9,000ppm — the star cleansing agent.", descriptionKo: "9,000ppm 고함량 녹두 씨앗 미세 분말로, 핵심 세정 성분이에요.", science: "Mung bean powder acts as a natural micro-exfoliant that physically adsorbs sebum, dead cells, and ultra-fine particulate matter (PM2.5) without abrasive friction.", scienceKo: "녹두 파우더는 천연 미세 각질 제거제로 피지, 각질, 초미세먼지(PM2.5)를 물리적으로 흡착해 자극 없이 제거해줘요.", percentage: 45 },
    { id: "scg", symbol: "AG", name: "Sodium Cocoyl Glycinate", nameKo: "소듐코코일글리시네이트", description: "Amino acid-based surfactant derived from coconut oil and glycine.", descriptionKo: "코코넛 오일과 글리신에서 유래한 아미노산계 계면활성제예요.", science: "One of the mildest surfactants available — it cleanses at a slightly acidic pH close to skin's natural 5.5, removing oil and impurities without disrupting the lipid barrier.", scienceKo: "가장 순한 계면활성제 중 하나로, 피부 고유 pH 5.5에 가까운 약산성에서 세정하며 지질 장벽을 손상시키지 않아요.", percentage: 25 },
    { id: "slg", symbol: "GL", name: "Sodium Lauroyl Glutamate", nameKo: "소듐라우로일글루타메이트", description: "Amino acid surfactant from glutamic acid — provides the foam.", descriptionKo: "글루탐산 유래 아미노산 계면활성제로, 풍성한 거품을 만들어줘요.", science: "A mild, biodegradable surfactant with excellent foaming properties that maintains skin hydration levels even after rinsing.", scienceKo: "순하고 생분해성인 계면활성제로, 거품력이 우수하면서도 세안 후 피부 수분을 유지해줘요.", percentage: 15 },
    { id: "mbe", symbol: "VR", name: "Mung Bean Extract", nameKo: "녹두 추출물", description: "Concentrated extract from mung bean seeds at 3,300ppm.", descriptionKo: "녹두 씨앗에서 추출한 3,300ppm 농축 추출물이에요.", science: "Rich in vitexin and isovitexin — flavonoids with antioxidant and anti-inflammatory activity that calm irritation during cleansing.", scienceKo: "항산화·항염 작용을 하는 플라보노이드인 비텍신, 이소비텍신이 풍부해 세안 중 자극을 진정시켜줘요.", percentage: 10 },
    { id: "cnp", symbol: "CE", name: "Ceramide NP", nameKo: "세라마이드 NP", description: "Skin-identical lipid that reinforces the moisture barrier.", descriptionKo: "피부와 동일한 지질 성분으로 수분 장벽을 강화해줘요.", science: "Ceramides make up ~50% of the stratum corneum lipid matrix. Adding Ceramide NP to a cleanser helps replenish barrier lipids lost during washing.", scienceKo: "세라마이드는 각질층 지질의 약 50%를 차지하며, 클렌저에 배합하면 세안 중 손실되는 장벽 지질을 보충해줘요.", percentage: 3 },
    { id: "ha", symbol: "HA", name: "Sodium Hyaluronate", nameKo: "소듐히알루로네이트", description: "Low-molecular-weight hyaluronic acid salt for deep hydration.", descriptionKo: "저분자 히알루론산 염으로 피부 깊이 수분을 공급해줘요.", science: "Binds up to 1,000x its weight in water. In a cleanser, it deposits a thin hydrating film that prevents the tight, stripped feeling after rinsing.", scienceKo: "자체 무게의 1,000배까지 수분을 끌어당기며, 세안 후에도 얇은 수분막을 남겨 당김을 방지해줘요.", percentage: 2 },
    { id: "ca", symbol: "CA", name: "Centella Asiatica Extract", nameKo: "병풀 추출물", description: "Classic K-beauty soothing ingredient from the cica plant.", descriptionKo: "시카 식물에서 추출한 대표적인 K-뷰티 진정 성분이에요.", science: "Contains madecassoside and asiaticoside that calm redness and support barrier repair — especially helpful in a cleanser for reactive skin.", scienceKo: "마데카소사이드와 아시아티코사이드가 홍조를 진정시키고 장벽 회복을 도와, 민감한 피부의 세안에 특히 좋아요.", percentage: 2 }
  ],
  accords: [
    { label: "Gentle Cleansing", labelKo: "순한 세정", percentage: 85, color: "bg-green-400" },
    { label: "Barrier Protection", labelKo: "장벽 보호", percentage: 75, color: "bg-cyan-400" },
    { label: "Anti-Dust", labelKo: "미세먼지 제거", percentage: 70, color: "bg-amber-400" },
    { label: "Hydrating", labelKo: "보습", percentage: 60, color: "bg-blue-400" }
  ],
  notes: null,
  performance: null,
  fun_facts: null,
  bio_values: null,
  reviews: null
};

async function run() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(product),
  });
  if (res.ok) {
    console.log('✓ Inserted skincare-10: beplain Mung Bean pH-Balanced Cleansing Foam');
  } else {
    console.log('✗ Error:', res.status, await res.text());
  }
}
run();
