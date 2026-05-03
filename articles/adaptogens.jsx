// Article: Adaptogens & Bioavailability
window.AdaptogensBody = function AdaptogensBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ArtTlDr>
        {isKo ? (
          <><strong>🌿 요약:</strong> 좋은 어댑토젠 보충제를 매일 먹어도 효과가 없다고 느껴진다면, 십중팔구 흡수가 안 되는 거예요. <strong>아슈와간다</strong>, <strong>사자갈기</strong>, <strong>영지버섯</strong>의 원료 분말 생체이용률은 10% 미만인 경우가 대부분입니다. 발효, 지질 캡슐화, 이중 추출이 흡수율을 40–60% 이상으로 끌어올립니다.</>
        ) : (
          <><strong>🌿 TL;DR:</strong> If your adaptogens aren't doing anything, the problem is probably absorption. Raw powder bioavailability for <strong>Ashwagandha</strong>, <strong>Lion's Mane</strong>, and <strong>Reishi</strong> sits below 10% for most people. Fermentation, lipid encapsulation, and dual extraction push that number to 40–60%+. The ingredient isn't the variable. The delivery is.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=1200"
        alt="Mushrooms, herbs, and wellness supplement ingredients, representing adaptogen bioavailability"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🧠 어댑토젠이란 정확히 무엇인가요?' : '🧠 What is an adaptogen, precisely?'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? <>어댑토젠은 <strong>시상하부-뇌하수체-부신(HPA) 축</strong>을 조절하여 신체가 물리적, 심리적 스트레스에 저항하도록 돕는 생체활성 화합물입니다. <mark>자극제나 진정제와 달리, 어댑토젠은 정상화합니다 — 스트레스 반응을 단일 방향이 아닌 균형 쪽으로 이끕니다.</mark></> : <>An adaptogen is a bioactive compound that helps the body resist physical and psychological stressors by modulating the <strong>HPA axis</strong> (hypothalamic-pituitary-adrenal). <mark>Unlike stimulants or sedatives, adaptogens normalize — they push stress response toward equilibrium rather than in a single direction.</mark></>}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '🌱 아슈와간다 (KSM-66)', desc: '위타노라이드 성분이 코르티솔을 조절합니다. 5%+ 위타노라이드 표준화 뿌리 추출물이 가장 강력한 임상 데이터를 보입니다.' },
            { title: '🍄 사자갈기', desc: '헤리세논과 에리나신이 신경성장인자(NGF)를 자극하여 신경가소성과 인지 회복을 지원합니다.' },
            { title: '🍄 영지 (이중 추출)', desc: '다당류(베타글루칸)와 트리터펜은 두 활성 분획을 모두 포착하기 위해 별도의 열수 및 알코올 추출이 필요합니다.' },
          ] : [
            { title: '🌱 Ashwagandha (KSM-66)', desc: 'Withanolide content regulates cortisol. Standardized root extract with 5%+ withanolides shows the strongest clinical data.' },
            { title: "🍄 Lion's Mane", desc: 'Hericenones and erinacines stimulate NGF (Nerve Growth Factor), supporting neuroplasticity and cognitive recovery.' },
            { title: '🍄 Reishi (Dual-Extract)', desc: 'Polysaccharides (beta-glucans) and triterpenes require separate hot-water and alcohol extraction to capture both active fractions.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🔑 왜 먹어도 흡수가 안 될까요?' : '🔑 Why bioavailability is the hidden variable'}</ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🌱" title={isKo ? '장에서 막히는 이유' : 'The Gut Barrier Problem'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>어댑토젠 성분 대부분은 분자가 크고 물에 잘 녹아서 장벽을 통과하기 어려워요. <mark>전달 기술 없이 그냥 먹으면 대부분 흡수되지 못한 채 그대로 빠져나갑니다.</mark></> : <>Most adaptogen compounds are <strong>large, hydrophilic molecules</strong> that struggle to cross the intestinal epithelium. <mark>Without an optimized delivery system, they pass through largely intact — you excrete the compound before it reaches systemic circulation.</mark></>}
          </ArtCallout>
          <ArtCallout icon="🧬" title={isKo ? '발효하면 흡수가 달라져요' : 'Fermentation Unlocks Bound Actives'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <><strong>락토바실러스</strong> 균주로 발효하면 식물 세포벽이 분해되고, 활성 성분이 더 작고 지용성 높은 형태로 풀려나요. 이렇게 바뀌면 장벽을 훨씬 쉽게 통과합니다.</> : <>Fermentation — particularly with <strong>Lactobacillus</strong> strains — breaks down plant cell walls and cleaves glycoside bonds, releasing active aglycones that are substantially smaller and more lipophilic. This dramatically improves passive diffusion across gut membranes.</>}
          </ArtCallout>
          <ArtCallout icon="💊" title={isKo ? '지질 캡슐로 감싸기' : 'Lipid Encapsulation'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>리포솜이나 파이토솜 기술은 활성 성분을 세포막과 같은 구조의 <strong>인지질 캡슐</strong>로 감싸요. 세포가 자기 것처럼 인식해서 바로 흡수하기 때문에, 간에서 먼저 분해되는 걸 피할 수 있습니다.</> : <>Liposomal and phytosomal delivery systems wrap active compounds in <strong>phospholipid bilayers</strong> that are structurally identical to cell membranes. Cells recognize and absorb the encapsulated compound directly — bypassing first-pass metabolism in the liver.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🏷️ 보충제 라벨, 이것만 보세요' : '🏷️ Reading a supplement label for real bioavailability'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '🎯 표준화 % 확인', body: '"아슈와간다 500mg"만으로는 아무것도 알 수 없어요. "KSM-66 아슈와간다 300mg, 위타노라이드 5% 표준화"처럼 활성 성분 함량이 적혀 있어야 유효 용량을 판단할 수 있습니다.' },
            { title: '📏 추출 비율', body: '10:1 추출물이란 원료 10kg을 1kg으로 농축했다는 뜻이에요. 비율이 높을수록 그램당 활성 성분이 많지만, 어떤 성분을 추출했느냐가 더 중요합니다.' },
            { title: '🔀 이중 추출 vs 단일 추출', body: '버섯류는 열수 추출(베타글루칸)과 알코올 추출(트리터펜)을 둘 다 해야 해요. 한 가지만으로는 약리 활성의 절반을 놓칩니다.' },
            { title: '⚡ 피페린·지방 함께 먹기', body: '피페린(후추 추출물)은 간에서 어댑토젠을 분해하는 효소를 억제해요. 일부 성분의 혈중 농도를 최대 20배까지 높여줍니다.' },
          ] : [
            { title: '🎯 Standardization %', body: 'Look for the active compound percentage on the label. "Ashwagandha 500mg" is meaningless. "KSM-66 Ashwagandha 300mg standardized to 5% withanolides" tells you the effective dose.' },
            { title: '📏 Extract ratio', body: 'A 10:1 extract means 10kg of raw material concentrated into 1kg. Higher ratios mean more active compounds per gram — but only if the extraction method targets the right molecules.' },
            { title: '🔀 Dual vs. single extract', body: 'For mushrooms, a hot-water extract captures beta-glucans. An alcohol extract captures triterpenes. You need both. Single extracts miss half the pharmacological activity.' },
            { title: '⚡ Added piperine or fat', body: 'Piperine (black pepper extract) inhibits CYP enzymes that break down adaptogens in the liver, increasing serum levels by up to 20x for some compounds.' },
          ]).map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '✨ 흡수율까지 고려한 웰니스 제품' : '✨ Wellness products designed around bioavailability'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Medion', name: 'Supplecare Inositol', note: isKo ? '임상 검증 40:1 미오/D-카이로 비율 — OxuGel™ 기술로 위산 산화 방지 후 흡수' : 'Clinically validated 40:1 myo/D-chiro ratio — OxuGel™ protects polyphenols from gastric oxidation' },
            { brand: 'Ollocdam', name: 'Olive3 Premium EVOO Capsules', note: isKo ? '3원산지 코로네이키·피쿠알·코라티나 블렌드 — 올레오칸탈 COX 억제 최적화' : 'Triple-origin Koroneiki, Picual, Coratina blend — oleocanthal COX inhibition optimised' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="#a07850" />)}
        </div>
      </ArtSection>
    </div>
  );
}
