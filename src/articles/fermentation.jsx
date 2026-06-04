import React from 'react';
import { ArtTlDr, ArtFigure, ArtSection, ArtSectionHeading, ArtBody, ArtCallout, ArtStatCard, ArtProdCard } from '../pages/insights';
// Article: Fermentation & Skincare
export default function FermentationBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ArtTlDr>
        {isKo ? (
          <><strong>🧫 요약:</strong> 발효는 성분을 보존하는 게 아니에요 — 변환합니다. <strong>갈락토미세스</strong>와 <strong>락토바실러스</strong> 같은 미생물이 원료 식물 성분을 분해해 더 작고 흡수율 높은 활성 성분으로 바꾸고, 원래 식물에는 존재하지 않았던 새로운 치료적 특성을 만들어냅니다. 청주 양조장의 우연한 발견이 스킨케어 역사를 바꿨습니다.</>
        ) : (
          <><strong>🧫 TL;DR:</strong> Fermentation doesn't preserve ingredients — it transforms them. Microbes like <strong>Galactomyces</strong> and <strong>Lactobacillus</strong> break down raw botanicals into smaller, more bioavailable actives with therapeutic properties the original plant never had. It started as an accident in a sake brewery. It became one of skincare's most studied technologies.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=1200"
        alt="Fermentation laboratory setup with glass flasks and scientific equipment"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🦠 왜 발효하면 달라질까요?' : '🦠 Why fermented ingredients outperform their raw counterparts'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? <>식물 세포벽은 <strong>셀룰로오스</strong>로 되어 있어요 — 우리 피부가 뚫거나 분해할 수 없는 물질이죠. <mark>발효 과정의 효소가 이 벽을 열어서 안에 갇혀 있던 활성 성분을 꺼내고, 분자 크기를 줄여 피부 속까지 스며들 수 있게 만듭니다.</mark></> : <>Plant cell walls are made of <strong>cellulose</strong> — a molecule human skin cannot penetrate or metabolize. <mark>Fermentation-driven enzymatic activity breaks these walls open, releasing compounds that were previously locked inside and reducing their molecular size.</mark></>}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '🔬 분자가 작아져요', desc: '큰 다당류가 작은 올리고당으로 쪼개져서 피부 속까지 직접 침투할 수 있어요.' },
            { title: '✨ 새로운 성분이 생겨요', desc: '미생물이 대사하면서 원래 원료에는 없던 완전히 새로운 활성 물질이 만들어집니다.' },
            { title: '🛡️ 자극이 줄어들어요', desc: '원료 식물 추출물에 있던 자극 성분과 알레르겐이 발효 과정에서 분해됩니다.' },
          ] : [
            { title: '🔬 Smaller molecules', desc: 'Fermentation cleaves large polysaccharides into absorbable oligosaccharides that penetrate the stratum corneum directly.' },
            { title: '✨ New compounds formed', desc: 'Microbial metabolism creates entirely new bioactive molecules — like galactomyces-derived NADHP and amino acids — not present in the raw material.' },
            { title: '🛡️ Lower irritation potential', desc: 'Fermentation degrades common irritants and allergens (like certain proteins) that exist in raw botanical extracts.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🔭 스킨케어를 바꾼 발효 미생물 세 가지' : '🔭 The three key fermentation organisms in skincare'}</ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🍶" title={isKo ? '갈락토미세스 발효 여과물' : 'Galactomyces Ferment Filtrate'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <><strong>비타민, 미네랄, 아미노산</strong>, <strong>알파-하이드록시산</strong>을 포함하는 효모 발효 여과물. <mark>청주 양조장 직원들의 손이 놀랍도록 매끈하다는 것이 발견되어 처음 알려졌습니다.</mark> 티로시나제를 억제하고 세포 재생을 가속하여 피부톤을 밝히고 모공을 조이며 결을 개선합니다.</> : <>A yeast-fermented filtrate containing <strong>vitamins, minerals, amino acids,</strong> and <strong>alpha-hydroxy acids</strong>. <mark>Originally discovered when sake brewery workers had remarkably smooth hands.</mark> It brightens, tightens pores, and improves texture by accelerating cell turnover and inhibiting tyrosinase.</>}
          </ArtCallout>
          <ArtCallout icon="🥛" title={isKo ? '락토바실러스 발효물' : 'Lactobacillus Ferment'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>젖산균이 <strong>포스트바이오틱스</strong> — 피부의 Toll-like 수용체와 직접 소통하는 세포벽 파편과 대사 부산물 — 를 생성합니다. 이것이 피부의 진정된 느낌을 도와, 민감성, 홍조가 있는 피부, 예민한 피부 유형에 잘 맞습니다.</> : <>Lactic acid bacteria produce <strong>postbiotics</strong> — cell wall fragments and metabolic byproducts that communicate directly with skin's Toll-like receptors. This supports a soothed-feeling skin response, making Lactobacillus ferments well-suited for reactive, redness-prone, and sensitive skin types.</>}
          </ArtCallout>
          <ArtCallout icon="👶" title={isKo ? '비피다 발효 용해물' : 'Bifida Ferment Lysate'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <>건강한 영아 피부 마이크로바이옴의 우세 종인 <em>Bifidobacterium longum</em>에서 유래합니다. 용해물은 <strong>DNA 복구 효소</strong>와 <strong>항산화 효소</strong>(슈퍼옥사이드 디스뮤타제, 카탈라제)를 포함하여 UV 유발 산화 손상을 직접 대응합니다.</> : <>Derived from <em>Bifidobacterium longum</em> — a dominant species in healthy infant skin microbiomes. The lysate contains <strong>DNA repair enzymes</strong> and <strong>antioxidant enzymes</strong> (Superoxide Dismutase, Catalase) that directly counteract UV-induced oxidative damage.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '📖 라벨에서 발효 성분 읽는 법' : '📖 How to read ferment ingredients on a label'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '"Ferment Filtrate" (발효 여과물)', body: '발효 후 걸러낸 액체예요. 미생물이 만든 대사물, 산, 효소가 녹아 있습니다. 활성이 높고 피부에 바로 흡수돼요.' },
            { title: '"Ferment Lysate" (발효 용해물)', body: '미생물 세포를 터뜨려서 안에 있는 효소, DNA 파편, 단백질을 꺼낸 거예요. 면역 조절 효과가 더 강합니다.' },
            { title: '"Fermented Extract" (발효 추출물)', body: '식물 성분을 미생물로 발효시킨 거예요. 미생물이 아니라 식물이 주인공이고, 발효를 거치면서 성분이 변하고 강화됩니다.' },
            { title: '이건 피하세요', body: '성분표 맨 끝에 적힌 발효 성분은 함량이 너무 적어서 효과를 기대하기 어려워요. 전체 포뮬러의 상위 절반 안에 들어야 의미가 있습니다.' },
          ] : [
            { title: '"Ferment Filtrate"', body: 'The liquid fraction after fermentation — contains soluble metabolites, acids, and enzymes from the organism. High activity, water-soluble.' },
            { title: '"Ferment Lysate"', body: 'The organism itself, lysed (broken open). Contains intracellular compounds including enzymes, DNA fragments, and structural proteins. More potent for immune modulation.' },
            { title: '"Fermented Extract"', body: 'A botanical ingredient that has been fermented — the plant material is the substrate, not the organism. The result is a transformed botanical with altered and enhanced properties.' },
            { title: 'What to avoid', body: 'Ferment ingredients listed at the very end of an INCI list are present in sub-effective concentrations. Effective use requires these ingredients in the top 50% of the formula by weight.' },
          ]).map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '💚 발효 성분이 핵심인 제품들' : '💚 Ferment-forward products in our collection'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Dr. Jart+', name: 'Cicapair Intensive Soothing Repair Cream', note: isKo ? '마데카소사이드 + 알란토인 — 마이크로바이옴 지원과 함께 즉각적인 진정·장벽 복구' : 'Madecassoside + Allantoin — immediate calming and barrier repair with microbiome support' },
            { brand: 'Mediheal', name: 'Tea Tree Trouble Calming Toner Pads', note: isKo ? '락토바실러스 발효물 포스트바이오틱스 — 트러블 유발 IL-8·TNF-α를 선택적으로 억제' : 'Lactobacillus ferment postbiotics — selectively suppresses acne-driving IL-8 and TNF-α' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--accent)" />)}
        </div>
      </ArtSection>
    </div>
  );
}
