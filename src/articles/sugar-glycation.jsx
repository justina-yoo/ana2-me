// Article: Sugar Glycation — Why Sugar Ages Your Skin
window.SugarGlycationBody = function SugarGlycationBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 당화 반응(Glycation)은 혈중 포도당이 콜라겐·엘라스틴에 달라붙어 영구적인 교차결합(AGEs)을 만드는 과정이에요. 피부가 뻣뻣해지고 누렇게 변하며 주름이 깊어져요. 에스티 로더의 2026년 4월 연구가 설탕 노출과 피부 세포 노화 가속의 직접적 연결을 확인했습니다. 카르노신, 나이아신아마이드가 핵심 방어 성분이에요.</>
        ) : (
          <><strong>TL;DR:</strong> Glycation is the process where blood glucose bonds permanently to collagen and elastin, forming AGEs (Advanced Glycation End-products). This makes skin stiff, yellowed, and wrinkle-prone. Estée Lauder's April 2026 research confirmed a direct link between sugar exposure and accelerated skin cell aging markers. Carnosine and niacinamide are the key defensive ingredients.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=1200"
        alt="Sugar cubes scattered on a surface, representing glycation and skin aging"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '당화 반응이란 정확히 뭘까요?' : 'What exactly is glycation?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>당화 반응은 혈류 속 포도당이나 과당 분자가 단백질에 비효소적으로 결합하는 과정이에요. 피부에서 가장 타격을 받는 단백질이 바로 <strong>콜라겐</strong>과 <strong>엘라스틴</strong> — 피부의 탄력과 구조를 지탱하는 두 핵심 단백질이에요. 설탕이 이 단백질에 달라붙으면 "쉬프 염기(Schiff base)"라는 초기 결합을 형성하고, 시간이 지나면 되돌릴 수 없는 <mark>최종당화산물 AGEs(Advanced Glycation End-products)</mark>로 변해요. AGEs가 축적되면 콜라겐 섬유끼리 교차결합(cross-link)이 생겨서 피부가 유연성을 잃어요.</>
          ) : (
            <>Glycation happens when glucose or fructose molecules in your bloodstream attach to proteins without any enzyme directing the process. The proteins hit hardest in skin are <strong>collagen</strong> and <strong>elastin</strong> — the two structural proteins responsible for firmness and bounce. Once sugar bonds to these proteins, it forms an initial "Schiff base" attachment, which over time becomes an irreversible compound called an <mark>AGE (Advanced Glycation End-product)</mark>. As AGEs accumulate, they create cross-links between collagen fibers, making skin lose its flexibility.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '콜라겐 반감기', desc: '피부 콜라겐의 교체 주기는 약 15년. 한번 당화되면 수십 년간 축적돼요.' },
            { title: 'AGEs 축적', desc: '35세 이후 매년 AGEs가 가속적으로 증가한다는 연구 결과가 있어요.' },
            { title: '누렇게 변하는 이유', desc: 'AGEs는 갈색-노란색 형광 색소예요. 축적되면 피부톤이 칙칙해져요.' },
          ] : [
            { title: 'Collagen half-life', desc: 'Skin collagen turns over roughly every 15 years. Once glycated, damage persists for decades.' },
            { title: 'AGE accumulation', desc: 'Studies show AGEs increase at an accelerating rate after age 35.' },
            { title: 'Why skin yellows', desc: 'AGEs are brown-yellow fluorescent pigments. As they build up, skin tone becomes sallow.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '에스티 로더 연구가 밝힌 것' : 'What the Estée Lauder research found'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>에스티 로더 연구소는 2026년 4월, 설탕에 노출된 피부 세포에서 <strong>노화 관련 유전자 발현</strong>이 유의미하게 증가한다는 결과를 발표했어요. 구체적으로, 고농도 포도당 환경에서 배양한 진피 섬유아세포(피부 깊은 층에서 콜라겐을 만드는 세포)가 텔로미어 단축, 미토콘드리아 기능 저하, 그리고 콜라겐 생성 감소를 보였어요. <mark>자외선 없이도 설탕만으로 세포 수준의 노화가 진행된다</mark>는 점이 핵심이에요.</>
          ) : (
            <>In April 2026, Estée Lauder Research published findings showing that skin cells exposed to elevated sugar concentrations exhibit significantly increased expression of <strong>aging-associated genes</strong>. Specifically, dermal fibroblasts (the deep-skin cells that produce collagen) cultured in high-glucose environments showed telomere shortening, mitochondrial dysfunction, and reduced collagen synthesis. <mark>The key finding: cellular aging progressed without any UV exposure — sugar alone was sufficient</mark>.</>
          )}
        </ArtBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🔬" title={isKo ? '연구 핵심 메커니즘' : 'The core mechanism'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? 'AGEs가 축적되면 RAGE(최종당화산물 수용체)라는 세포 표면 수용체가 활성화돼요. RAGE가 활성화되면 NF-κB 경로를 통해 만성 염증이 유발되고, 이 염증이 콜라겐 분해 효소(MMP)를 증가시켜 기존 콜라겐까지 파괴해요. 설탕은 새 콜라겐을 망가뜨리면서 동시에 기존 콜라겐도 분해하는 이중 공격을 해요.' : 'When AGEs accumulate, they activate a cell-surface receptor called RAGE (Receptor for AGEs). RAGE activation triggers the NF-κB inflammatory pathway, which increases production of MMPs (Matrix Metalloproteinases) — enzymes that break down existing collagen. Sugar launches a double attack: it damages new collagen while simultaneously degrading what you already have.'}
          </ArtCallout>
          <ArtCallout icon="⚡" title={isKo ? '자외선 vs 당화: 비교' : 'UV vs glycation: the comparison'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? 'UV 손상은 주로 표피와 진피 상부에 집중되고 선크림으로 90% 이상 차단 가능해요. 반면 당화 손상은 혈류를 통해 진피 전체에 영향을 주고, 한번 형성된 AGEs는 되돌릴 수 없어요. 자외선은 막을 수 있지만, 매일 먹는 설탕은 안에서부터 피부를 공격합니다.' : 'UV damage concentrates in the epidermis and upper dermis — sunscreen blocks over 90% of it. Glycation damage, by contrast, reaches the entire dermis via blood circulation, and once AGEs form, they are irreversible. You can block UV with sunscreen. But the sugar you eat every day attacks skin from the inside.'}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '당화를 막는 성분들' : 'Ingredients that fight glycation'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>당화 방지는 이제 독립적인 안티에이징 카테고리로 부상하고 있어요. <mark>기존 레티노이드 중심의 안티에이징과는 전혀 다른 접근</mark>이에요.</>
          ) : (
            <>Glycation prevention is emerging as its own anti-aging category — <mark>a fundamentally different approach from the retinoid-centered anti-aging</mark> most people know.</>
          )}
        </ArtBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🛡️" title={isKo ? '카르노신 (Carnosine)' : 'Carnosine'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? '디펩타이드(아미노산 2개가 결합한 분자)예요. 포도당이 콜라겐에 결합하기 전에 먼저 설탕과 반응해서 AGE 형성을 차단해요. "희생 분자"라고 불려요 — 콜라겐 대신 자기가 당화되는 거예요. 여러 in vitro 연구에서 AGE 형성을 유의미하게 억제하는 것으로 확인됐어요.' : 'A dipeptide (two amino acids bonded together) that reacts with sugar before it can attach to collagen — essentially sacrificing itself to prevent AGE formation. Called a "sacrificial molecule." Multiple in vitro studies confirm it significantly inhibits AGE formation.'}
          </ArtCallout>
          <ArtCallout icon="✨" title={isKo ? '나이아신아마이드 (Niacinamide, 비타민 B3)' : 'Niacinamide (Vitamin B3)'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? '이미 널리 사용되는 성분이지만, 당화 방지 효과는 덜 알려져 있어요. 나이아신아마이드는 NADPH 생성을 촉진해서 산화 스트레스를 줄이고, AGE-RAGE 경로에 의한 염증 반응을 완화해요. 동시에 콜라겐 합성도 촉진하니까 당화로 손실된 콜라겐을 보충하는 역할까지 해요.' : 'Already widely used, but its anti-glycation properties are less known. Niacinamide boosts NADPH production to reduce oxidative stress and dampens the inflammatory response triggered by the AGE-RAGE pathway. It also stimulates collagen synthesis — helping replenish what glycation destroys.'}
          </ArtCallout>
          <ArtCallout icon="🌿" title={isKo ? '아미노구아니딘 (Aminoguanidine)' : 'Aminoguanidine'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? '당화 연구에서 "골드 스탠다드" 억제제로 사용되는 성분이에요. 쉬프 염기가 AGE로 전환되는 중간 단계(아마도리 산물)를 차단해요. 의약품 연구에서는 당뇨 합병증 방지를 위해 연구됐고, 화장품에서는 고농도 적용이 어렵지만 일부 전문 포뮬레이션에 포함돼 있어요.' : 'The "gold standard" AGE inhibitor in glycation research. It blocks the intermediate Amadori products from converting into permanent AGEs. Studied in pharmaceutical research for preventing diabetic complications. Difficult to use at high concentrations in cosmetics, but included in some specialized formulations.'}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '생활 속 당화 방지법' : 'How to reduce glycation in daily life'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>토피컬 성분만으로는 부족해요. <mark>당화는 안에서 시작되기 때문에 식습관이 첫 번째 방어선</mark>이에요.</>
          ) : (
            <>Topical ingredients alone aren't enough. <mark>Because glycation starts from within, diet is your first line of defense</mark>.</>
          )}
        </ArtBody>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '혈당 스파이크를 줄이세요', body: '단순당(과자, 음료, 흰 빵)은 혈당을 급격히 올려 당화를 가속해요. 식이섬유와 단백질을 먼저 먹고 탄수화물을 나중에 먹는 순서만 바꿔도 혈당 스파이크가 줄어요.' },
            { title: '고온 조리를 줄이세요', body: '구이, 튀김, 바베큐 등 고온 조리된 음식에는 이미 형성된 AGEs(외인성 AGEs)가 많아요. 찜, 수비드, 저온 조리 방식이 AGE 섭취를 줄여줘요.' },
            { title: '항산화제를 섭취하세요', body: '비타민 C, 알파리포산, 녹차의 EGCG는 당화 과정에서 발생하는 산화 스트레스를 줄여 AGE 형성 속도를 늦출 수 있어요.' },
          ] : [
            { title: 'Reduce blood sugar spikes', body: 'Simple sugars (candy, sodas, white bread) spike blood glucose rapidly, accelerating glycation. Eating fiber and protein before carbohydrates — just changing the order — measurably reduces glucose spikes.' },
            { title: 'Reduce high-heat cooking', body: 'Grilled, fried, and barbecued foods contain pre-formed AGEs (exogenous AGEs). Steaming, sous vide, and low-temperature methods significantly reduce AGE intake from food.' },
            { title: 'Eat antioxidants', body: 'Vitamin C, alpha-lipoic acid, and green tea EGCG reduce the oxidative stress that accompanies glycation, slowing AGE formation.' },
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
          {isKo ? '✨ 추천 제품' : '✨ Products worth trying'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'The Ordinary', name: 'Niacinamide 10% + Zinc 1%', note: isKo ? '나이아신아마이드 고농도 세럼. AGE-RAGE 염증 경로를 완화하고 콜라겐 합성을 촉진해요. 가성비 최강.' : 'High-concentration niacinamide serum. Dampens AGE-RAGE inflammatory pathway and boosts collagen synthesis. Best value in the category.' },
            { brand: "Paula's Choice", name: 'Resist 10% Niacinamide Booster', note: isKo ? '나이아신아마이드 10% + 판테놀 + 비타민 C. 기존 세럼이나 모이스처라이저에 섞어 쓸 수 있는 부스터 형태예요.' : 'Niacinamide 10% + panthenol + vitamin C. Booster format you can mix into any existing serum or moisturizer.' },
            { brand: 'Dr. Jart+', name: 'Vital Hydra Solution Biome Essence', note: isKo ? '나이아신아마이드 + 프로바이오틱스 조합으로 당화 스트레스로 약해진 피부 장벽을 복구하면서 항산화 보호를 제공해요.' : 'Niacinamide + probiotics combination. Repairs barrier weakened by glycation stress while providing antioxidant protection.' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--accent)" />)}
        </div>
      </ArtSection>

    </div>
  );
};
