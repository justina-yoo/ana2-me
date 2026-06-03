// Article: Edible Skincare — Gut-Skin Axis
window.EdibleSkincareBody = function EdibleSkincareBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 한국에서 '먹는 화장품'이 가장 빠르게 성장하는 웰니스 카테고리가 됐어요. 올리브영 이너뷰티 매출은 전년 대비 55% 증가했습니다. 핵심은 장-피부 축(gut-skin axis) — 장내 미생물이 만드는 단쇄지방산(SCFA)이 혈류를 타고 피부 염증, 피지, 장벽 기능을 직접 조절합니다. 콜라겐 음료, 프로바이오틱스, 발효 추출물이 임상 데이터를 갖춘 핵심 성분이에요.</>
        ) : (
          <><strong>TL;DR:</strong> "Edible skincare" is now the fastest-growing wellness category in Korea — Olive Young's inner beauty sales grew 55% year-over-year. The science behind it is the gut-skin axis: short-chain fatty acids produced by gut bacteria enter the bloodstream and directly regulate skin inflammation, sebum, and barrier function. Collagen drinks, probiotics, and fermented extracts are the ingredients with real clinical backing.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1620755901989-0f457a38011e?auto=format&fit=crop&q=80&w=1200"
        alt="Wellness supplement jars with probiotics and mushroom capsules for gut-skin health"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🍽️ 왜 한국은 화장품을 "먹기" 시작했을까요?' : '🍽️ Why is Korea "eating" its skincare?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>한국에서 '이너뷰티'는 더 이상 틈새 시장이 아니에요. 올리브영 이너뷰티 카테고리 매출이 <strong>전년 대비 55% 증가</strong>했고, 올해 1월에는 서울에 웰니스 전문 매장 '올리브 베러'까지 오픈했어요. <mark>피부에 바르는 것만으로는 한계가 있다는 인식이 퍼지면서, 안에서부터 피부를 관리하는 '먹는 스킨케어'가 주류가 됐습니다.</mark> 콜라겐 젤리, 프로바이오틱 민트, 수면 음료까지 — 형태도 알약을 넘어서 일상 속 간식으로 진화하고 있어요.</>
          ) : (
            <>In Korea, "inner beauty" is no longer niche. Olive Young's inner beauty category grew <strong>55% year-over-year</strong>, and in January 2026, the retailer opened its first wellness-focused store, Olive Better, in Seoul. <mark>The realization that topical skincare has limits has pushed "edible skincare" — supplements designed to improve skin from inside — into the mainstream.</mark> Collagen jellies, probiotic mints, herbal sleep drinks — the format has evolved far beyond pills into everyday snackable rituals.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '📈 55% 성장', desc: '올리브영 이너뷰티 카테고리의 전년 대비 매출 증가율.' },
            { title: '🏪 올리브 베러', desc: '2026년 1월 서울에 오픈한 올리브영 최초의 웰니스 전문 매장.' },
            { title: '💊 → 🍬', desc: '알약에서 젤리, 음료, 민트로 — 보충제가 간식이 되고 있어요.' },
          ] : [
            { title: '📈 55% growth', desc: "Olive Young's inner beauty category year-over-year sales increase." },
            { title: '🏪 Olive Better', desc: "Korea's first wellness-only Olive Young store, opened January 2026 in Seoul." },
            { title: '💊 → 🍬', desc: 'From pills to jellies, drinks, and mints — supplements becoming snacks.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🔬 장-피부 축이란 뭔가요?' : '🔬 What is the gut-skin axis?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>장과 피부는 서로 직접 대화해요. 이걸 <strong>장-피부 축(gut-skin axis)</strong>이라고 합니다. 장내 세균이 음식을 분해하면서 만드는 <strong>단쇄지방산(SCFA)</strong>이 혈류를 타고 피부 세포까지 도달해요. <mark>이 물질이 피부의 염증 반응, 피지 분비, 장벽 기능을 직접 조절합니다.</mark> 장이 건강하면 피부도 건강하고, 장에 문제가 생기면 피부에도 나타나요 — 여드름, 홍조, 민감성·예민성 피부 모두 장내 세균 불균형과 연결된다는 연구가 쏟아지고 있어요.</>
          ) : (
            <>Your gut and skin talk to each other directly. This communication channel is called the <strong>gut-skin axis</strong>. When gut bacteria break down food, they produce <strong>short-chain fatty acids (SCFAs)</strong> that enter the bloodstream and reach skin cells. <mark>These molecules directly regulate skin inflammation, sebum production, and barrier function.</mark> A healthy gut means healthier skin. A disrupted gut shows up on your face — acne, redness-prone skin, and sensitive or reactive skin types have all been linked to gut microbiome imbalance in recent studies.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🧬 장에서 피부까지 — 어떤 경로로 연결될까요?' : '🧬 How does your gut actually affect your skin?'}
        </ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🦠" title={isKo ? '단쇄지방산(SCFA) — 장이 만드는 항염 물질' : 'SCFAs — your gut\'s soothing output'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>장내 유익균이 식이섬유를 발효하면 부티레이트, 프로피오네이트 같은 단쇄지방산이 만들어져요. 이 물질들이 혈류를 통해 피부에 도달하면 <strong>염증성 사이토카인(IL-6, TNF-α)을 억제</strong>하고 피부 장벽의 세라마이드 생성을 돕습니다. 식이섬유가 부족하면 이 과정이 무너져요.</> : <>When beneficial gut bacteria ferment dietary fiber, they produce SCFAs like butyrate and propionate. These travel through the bloodstream to skin, where they <strong>suppress inflammatory cytokines (IL-6, TNF-α)</strong> and support ceramide production in the skin barrier. Without enough fiber, this entire chain breaks down.</>}
          </ArtCallout>
          <ArtCallout icon="🛡️" title={isKo ? '장벽 투과성 — "새는 장"이 피부를 공격하는 방법' : 'Gut permeability — how a "leaky gut" attacks skin'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <>장벽이 손상되면 독소와 미생물 파편이 혈류로 유출돼요. 이게 전신 염증을 일으키고, 그 염증이 피부에서 여드름, 홍조, 가려움으로 나타납니다. <mark>2026년 연구에 따르면 장내 미생물 다양성이 낮을수록 피부 질환 위험이 유의미하게 높아졌어요.</mark></> : <>When the gut barrier is compromised, toxins and microbial fragments leak into the bloodstream. This triggers systemic inflammation that manifests on skin as acne, redness, and irritation. <mark>A 2026 study found that lower gut microbial diversity significantly correlated with higher skin disease risk.</mark></>}
          </ArtCallout>
          <ArtCallout icon="🔄" title={isKo ? '양방향 소통 — 피부 손상도 장에 영향을 줘요' : 'It goes both ways — skin damage affects your gut too'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>최근 네이처 커뮤니케이션즈 연구에서 피부 손상이 장내 미생물 구성을 직접 바꾼다는 것이 확인됐어요. 장이 피부에 영향을 주는 것처럼, 피부도 장에 신호를 보냅니다. 진짜 양방향 소통이에요.</> : <>A recent Nature Communications study confirmed that skin injury directly remodels the gut microbiome. Just as the gut affects skin, skin sends signals back to the gut. It's a genuinely bidirectional relationship.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '💊 임상 데이터가 있는 이너뷰티 성분은?' : '💊 Which inner beauty ingredients actually have clinical data?'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '콜라겐 펩타이드', body: '경구 콜라겐 펩타이드(하루 2.5~10g)를 8주 이상 섭취하면 피부 수분량과 탄력이 개선된다는 메타분석 결과가 있어요. 핵심은 분자량 — 저분자 펩타이드(2,000Da 이하)가 장에서 흡수되어 피부 섬유아세포까지 도달합니다.' },
            { title: '프로바이오틱스 (유산균)', body: '특정 락토바실러스·비피도박테리움 균주가 염증성 피부 병변을 50~70% 줄이고, 피지 분비를 최대 42% 억제한다는 임상 데이터가 있어요. 모든 균주가 같은 효과를 내는 건 아니에요 — 균주 번호를 확인하세요.' },
            { title: '식이섬유 & 프리바이오틱스', body: '화려하진 않지만 가장 기본이에요. 식이섬유가 장내 유익균의 연료가 되어 SCFA 생산을 높입니다. 섬유소 섭취가 부족하면 아무리 좋은 프로바이오틱스를 먹어도 효과가 떨어져요.' },
            { title: '발효 추출물', body: '갈락토미세스, 비피다 발효물 같은 포스트바이오틱스를 경구로 섭취하면 장내 면역 조절과 피부 항산화 효과를 동시에 기대할 수 있어요. K-뷰티가 바르는 것에서 먹는 것으로 확장한 대표적 사례입니다.' },
          ] : [
            { title: 'Collagen peptides', body: 'Meta-analyses show oral collagen peptides (2.5–10g/day for 8+ weeks) improve skin hydration and elasticity. The key is molecular weight — low-molecular-weight peptides (under 2,000Da) survive digestion and reach skin fibroblasts.' },
            { title: 'Probiotics', body: 'Specific Lactobacillus and Bifidobacterium strains have been shown to reduce inflammatory skin lesions by 50–70% and sebum secretion by up to 42%. Not all strains work equally — check the strain number on the label.' },
            { title: 'Dietary fiber & prebiotics', body: "Not glamorous, but foundational. Fiber fuels beneficial gut bacteria to produce SCFAs. Without adequate fiber, even the best probiotic supplement underperforms — you're feeding soldiers without giving them ammunition." },
            { title: 'Fermented extracts', body: 'Postbiotics like galactomyces and bifida ferment — taken orally — can support gut immune modulation and skin antioxidant defense simultaneously. This is K-beauty expanding from topical to ingestible.' },
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
          {isKo ? '✨ 지금 써볼 만한 이너뷰티 제품' : '✨ Inner beauty products worth trying'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'BB Lab', name: 'The Collagen Jelly', note: isKo ? '저분자 콜라겐 펩타이드 젤리 — 하루 한 포, 간식처럼 먹는 콜라겐' : 'Low-molecular collagen peptide jelly — one stick a day, like a snack' },
            { brand: 'K-Nutra', name: 'Probiotic Bedtime Mints', note: isKo ? '수면 전 프로바이오틱 민트 — 장 건강과 수면 루틴을 동시에' : 'Pre-sleep probiotic mints — gut health meets bedtime ritual' },
            { brand: 'Foodology', name: 'Corebiome Collagen Plus', note: isKo ? '콜라겐 + 프로바이오틱스 복합 — 장-피부 축을 동시에 공략' : 'Collagen + probiotics combo — targeting the gut-skin axis from both sides' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="#a07850" />)}
        </div>
      </ArtSection>

    </div>
  );
};
