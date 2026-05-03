// Article: Myo-Inositol — Women's Hormonal Wellness
window.MyoInositolBody = function MyoInositolBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 미오이노시톨(Myo-Inositol)은 인슐린 신호 전달에 관여하는 천연 화합물로, PCOS(다낭성 난소 증후군), 호르몬성 여드름, 배란 장애에 대한 임상 데이터가 축적되고 있어요. 핵심은 미오이노시톨과 D-카이로이노시톨의 40:1 비율이며, 하루 2~4g을 6개월 이상 꾸준히 섭취해야 효과를 기대할 수 있습니다.</>
        ) : (
          <><strong>TL;DR:</strong> Myo-inositol is a naturally occurring compound involved in insulin signaling that's showing clinical promise for PCOS, hormonal acne, and ovulation support. The key is the 40:1 ratio of myo-inositol to D-chiro-inositol, taken at 2–4g daily for at least 6 months. It's becoming the go-to supplement before prescription options for hormonal health.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1596572934426-52ac4e95e014?auto=format&fit=crop&q=80&w=1200"
        alt="Supplement capsules and botanical ingredients for women's hormonal wellness"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '💊 미오이노시톨이 뭔가요?' : '💊 What is myo-inositol?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>미오이노시톨은 비타민 B군과 구조가 비슷한 <strong>천연 당알코올</strong>이에요. 우리 몸에서도 자연적으로 만들어지고, 과일·곡물·콩에도 들어 있어요. 하는 일은 간단해요 — <mark>인슐린이 세포에 제대로 신호를 보내도록 돕는 "메신저" 역할</mark>을 합니다. 인슐린 저항성이 생기면 호르몬 균형이 무너지고, 그 결과가 PCOS, 호르몬성 여드름, 배란 장애로 나타나요. 미오이노시톨은 이 연결 고리의 맨 앞에서 작용합니다.</>
          ) : (
            <>Myo-inositol is a <strong>naturally occurring sugar alcohol</strong> structurally similar to B vitamins. Your body makes it, and it's found in fruits, grains, and beans. Its job is straightforward — <mark>it acts as a "messenger" that helps insulin signal cells properly</mark>. When insulin resistance develops, hormonal balance breaks down — leading to PCOS, hormonal acne, and ovulation problems. Myo-inositol works at the very beginning of that chain.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '🔬 인슐린 메신저', desc: '세포가 인슐린 신호를 제대로 받도록 돕는 세포 내 전달 물질.' },
            { title: '📊 40:1 비율', desc: '미오이노시톨과 D-카이로이노시톨의 최적 비율. 임상에서 가장 많이 검증됨.' },
            { title: '⏱️ 6개월 이상', desc: '효과를 보려면 하루 2~4g을 최소 6개월 꾸준히 섭취해야 해요.' },
          ] : [
            { title: '🔬 Insulin messenger', desc: 'An intracellular signaling molecule that helps cells respond to insulin properly.' },
            { title: '📊 40:1 ratio', desc: 'Optimal myo-inositol to D-chiro-inositol ratio — the most clinically validated formulation.' },
            { title: '⏱️ 6+ months', desc: 'Consistent daily intake of 2–4g for at least 6 months needed for visible results.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🧬 인슐린 저항성이 피부와 호르몬에 미치는 영향' : '🧬 How insulin resistance drives skin and hormonal problems'}
        </ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="📈" title={isKo ? '인슐린 → 안드로겐 → 여드름' : 'Insulin → androgens → acne'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>인슐린 저항성이 생기면 체내 인슐린 수치가 올라가요. 높은 인슐린은 난소에서 <strong>안드로겐(남성호르몬)</strong> 분비를 자극하고, 안드로겐이 피지선을 과활성화시켜 턱·볼·턱선을 따라 호르몬성 여드름이 생깁니다. <mark>미오이노시톨은 이 연쇄 반응의 첫 단계인 인슐린 저항성을 개선해요.</mark></> : <>When insulin resistance develops, insulin levels rise. High insulin stimulates the ovaries to produce more <strong>androgens (male hormones)</strong>, which overstimulate sebaceous glands — causing hormonal acne along the jawline, cheeks, and chin. <mark>Myo-inositol targets the first step in this cascade: improving insulin sensitivity.</mark></>}
          </ArtCallout>
          <ArtCallout icon="🥚" title={isKo ? 'PCOS와 배란 회복' : 'PCOS and ovulation recovery'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <>PCOS 환자의 핵심 문제 중 하나가 배란 장애예요. 메타분석에 따르면 미오이노시톨 보충이 <strong>공복 인슐린과 HOMA 지수(인슐린 저항성 지표)를 유의미하게 낮추고</strong>, 배란 회복을 도왔어요. 특히 고안드로겐형 PCOS에서 효과가 뚜렷했습니다.</> : <>One of the core problems in PCOS is disrupted ovulation. Meta-analyses show myo-inositol supplementation <strong>significantly reduces fasting insulin and HOMA index (a measure of insulin resistance)</strong>, helping restore ovulation. The effect is strongest in hyperandrogenic PCOS phenotypes.</>}
          </ArtCallout>
          <ArtCallout icon="⚖️" title={isKo ? '40:1 비율이 중요한 이유' : 'Why the 40:1 ratio matters'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>이노시톨에는 미오(myo)와 D-카이로(D-chiro) 두 형태가 있어요. 건강한 체내 비율이 40:1인데, PCOS에서는 이 균형이 무너져요. 보충제도 이 비율을 맞춰야 효과적이에요 — D-카이로가 너무 많으면 오히려 난소 기능에 역효과를 줄 수 있습니다.</> : <>Inositol comes in two forms: myo and D-chiro. The healthy body ratio is 40:1, but this balance is disrupted in PCOS. Supplements need to match this ratio — too much D-chiro can actually impair ovarian function instead of helping it.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '📋 연구는 뭐라고 하나요?' : '📋 What does the research actually say?'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '여드름 개선', body: '이노시톨을 6개월 이상 복용한 연구에서 호르몬성 여드름과 다모증이 유의미하게 개선됐어요. 최소 6개월은 꾸준히 먹어야 피부 변화가 보입니다.' },
            { title: '인슐린 저항성 감소', body: '2026년 프런티어스 리뷰에 따르면 미오이노시톨이 인슐린 감수성을 높여 PCOS 환자의 배란과 호르몬 균형 회복을 도왔어요.' },
            { title: '근거의 한계', body: '같은 2026년 리뷰에서 85개 근거 항목 중 고품질 근거는 없었고, 18.9%가 중등도였어요. 유망하지만 아직 더 많은 대규모 연구가 필요합니다.' },
            { title: 'PCOS 유형에 따라 다름', body: '고안드로겐형 PCOS에서는 효과가 뚜렷했지만, 비고안드로겐형에서는 효과가 미미했어요. 모든 PCOS에 만능은 아닙니다.' },
          ] : [
            { title: 'Acne improvement', body: 'Studies show significant improvement in hormonal acne and hirsutism after 6+ months of inositol supplementation. Minimum 6 months of consistent use needed for visible skin changes.' },
            { title: 'Insulin resistance reduction', body: 'A 2026 Frontiers review found myo-inositol enhances insulin sensitivity, helping PCOS patients restore ovulation and hormonal balance.' },
            { title: 'Evidence limitations', body: 'The same 2026 review found no high-quality evidence among 85 items reviewed — 18.9% moderate, 40% low quality. Promising but more large-scale studies are needed.' },
            { title: 'Not all PCOS responds equally', body: 'Hyperandrogenic PCOS showed significant improvement. Non-hyperandrogenic PCOS showed negligible effects. It\'s not a universal solution for all PCOS types.' },
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
          {isKo ? '✨ 미오이노시톨 보충제 추천' : '✨ Myo-inositol supplements worth trying'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Ovasitol', name: 'Inositol Powder', note: isKo ? '40:1 비율 인증 — PCOS 임상에서 가장 많이 사용된 포뮬러' : '40:1 ratio verified — the most clinically referenced formula for PCOS' },
            { brand: 'Wholesome Story', name: 'Myo & D-Chiro Inositol Blend', note: isKo ? '40:1 비율 캡슐 + 엽산 — 간편한 일일 복용 형태' : '40:1 ratio capsules + folate — convenient daily format' },
            { brand: 'Medion', name: 'Supplecare Inositol', note: isKo ? 'OxuGel™ 기술로 위산 산화 방지 — 한국 시장 이노시톨 선두 브랜드' : 'OxuGel™ technology prevents gastric oxidation — leading Korean inositol brand' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="#a07850" />)}
        </div>
      </ArtSection>

    </div>
  );
};
