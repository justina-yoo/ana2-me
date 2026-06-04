import React from 'react';
import { ArtTlDr, ArtFigure, ArtSection, ArtSectionHeading, ArtBody, ArtCallout, ArtStatCard, ArtProdCard } from '../pages/insights';
// Article: Postbiotics
export default function PostbioticsBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 포스트바이오틱스는 발효 과정에서 생성되는 생리활성 물질로, 살아있는 균이 필요 없어요. 비피다 발효물(Bifida Ferment Lysate)과 유산균 발효 여과물(Lactobacillus Ferment Filtrate)이 대표 성분이며, 임상 연구에서 8주 만에 피부 장벽 기능을 34% 개선한 것으로 나타났습니다. K-뷰티는 이미 수십 년째 써온 성분이에요.</>
        ) : (
          <><strong>TL;DR:</strong> Postbiotics are bioactive compounds produced during fermentation — no live bacteria needed. Key ingredients include Bifida Ferment Lysate and Lactobacillus Ferment Filtrate. Clinical studies show a 34% improvement in skin barrier function over 8 weeks. K-beauty has been using them for decades — the rest of the world is catching on.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&q=80&w=1200"
        alt="Fermented skincare serum bottles on minimal surface, K-beauty postbiotic ingredients"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '프로바이오틱스, 프리바이오틱스, 포스트바이오틱스 — 뭐가 다른가요?' : 'Probiotics, Prebiotics, Postbiotics — What\'s the Actual Difference?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>피부 마이크로바이옴 이야기가 나오면 항상 '프로바이오틱스'가 먼저 등장해요. 하지만 세 가지는 역할이 전혀 달라요. <strong>프로바이오틱스(Probiotics)</strong>는 살아있는 유익균, 프리바이오틱스(Prebiotics)는 그 균의 먹이, 그리고 <mark>포스트바이오틱스(Postbiotics)는 발효가 끝난 후 남는 생리활성 부산물</mark>입니다. 살아있는 균이 없어도 되니까 훨씬 안정적이고, 손상되거나 예민한 피부에도 안전하게 쓸 수 있어요.</>
          ) : (
            <>Skincare conversations about the microbiome almost always start with probiotics. But the three terms aren't interchangeable. <strong>Probiotics</strong> are live bacteria, prebiotics are their food source, and <mark>postbiotics are the bioactive byproducts left after fermentation completes</mark>. No live organisms required — which makes them far more stable on a shelf and safer for compromised or sensitive skin.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '프로바이오틱스', desc: '살아있는 유익균. 피부에 직접 적용할 경우 안정성 이슈가 있을 수 있어요.' },
            { title: '프리바이오틱스', desc: '피부 유익균의 먹이가 되는 성분. 균의 성장 환경을 조성해줍니다.' },
            { title: '포스트바이오틱스', desc: '발효 부산물. 살아있는 균 없이도 동일한 피부 이점을 줍니다.' },
          ] : [
            { title: 'Probiotics', desc: 'Live bacteria. Can have stability issues when applied topically to skin.' },
            { title: 'Prebiotics', desc: 'Food for beneficial bacteria. Sets the stage for a healthy microbiome.' },
            { title: 'Postbiotics', desc: 'Fermentation byproducts. Deliver the same skin benefits — no live organisms needed.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '왜 포스트바이오틱스가 피부 장벽에 효과적인가요?' : 'Why Do Postbiotics Work So Well on the Skin Barrier?'}
        </ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🧬" title={isKo ? '장벽 유전자를 직접 활성화' : 'Directly activates barrier genes'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? '비피다 발효물(Bifida Ferment Lysate)은 피부의 물리적 장벽 관련 유전자와 항균 펩타이드 유전자 발현을 높인다는 것이 연구로 확인됐어요. 피부가 스스로 더 두꺼운 보호막을 만들도록 신호를 보내는 거예요.' : 'Bifida Ferment Lysate has been shown in studies to upregulate the physical barrier genes and clarifying peptide genes in skin cells — essentially signalling skin to build a stronger protective layer on its own.'}
          </ArtCallout>
          <ArtCallout icon="🛡️" title={isKo ? '살아있는 균보다 안전한 이유' : 'Safer than live bacteria for compromised skin'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? '2026년 임상 스킨케어 트렌드 보고서에 따르면, 살아있는 균은 손상된 피부나 시술 후 피부에 적합하지 않을 수 있어요. 반면 포스트바이오틱스는 면역 조절 효과는 동일하게 가져가면서 균 자체를 도입하지 않기 때문에 훨씬 안전합니다.' : 'A 2026 clinical skincare report notes that live bacteria "are not always appropriate for compromised or post-procedure skin." Postbiotics deliver the same immune-modulating benefits without introducing organisms — making them the safer choice for reactive or damaged skin.'}
          </ArtCallout>
          <ArtCallout icon="📊" title={isKo ? '8주에 34% 장벽 개선' : '34% barrier improvement in 8 weeks'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>2025년 발표된 연구에서 <mark>국소 포스트바이오틱스를 8주 사용한 그룹은 대조군 대비 피부 장벽 기능이 34% 개선</mark>됐어요. 단순한 보습제가 아니라 장벽 자체를 구조적으로 강화하는 성분입니다.</> : <>A 2025 study found that topical postbiotics improved skin barrier function by <mark>34% over 8 weeks compared to controls</mark>. This isn't surface-level hydration — it's structural reinforcement of the barrier itself.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? 'K-뷰티가 이미 수십 년째 써온 포스트바이오틱스 성분들' : 'The Postbiotic Ingredients K-Beauty Has Used for Decades'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '비피다 발효물 (Bifida Ferment Lysate)', body: '비피도박테리움 발효에서 얻은 부산물로, 피부 장벽 유전자 발현을 높이고 산화 스트레스에 대한 저항력을 키워줘요. SK-II의 갈락토미세스 발효 여과물과 함께 K-뷰티 발효 라인업의 핵심입니다.' },
            { title: '유산균 발효 여과물 (Lactobacillus Ferment Filtrate)', body: '유산균 발효 과정에서 걸러낸 여과물로, 염증성 피부 병변을 50~70%까지 줄이고 피지 분비를 최대 42% 낮추는 임상 데이터가 있어요. 특히 트러블성 피부에 효과적입니다.' },
            { title: '갈락토미세스 발효 여과물 (Galactomyces Ferment Filtrate)', body: '청주 양조장 직원들의 손이 유달리 매끄럽다는 관찰에서 시작된 성분이에요. 비타민, 미네랄, AHA가 풍부하며 피부톤 균일화와 모공 케어에 탁월합니다.' },
          ] : [
            { title: 'Bifida Ferment Lysate', body: 'A byproduct of Bifidobacterium fermentation that upregulates skin barrier genes and builds resistance to oxidative stress. A cornerstone of K-beauty fermentation lineups alongside galactomyces.' },
            { title: 'Lactobacillus Ferment Filtrate', body: 'Clinical data shows this postbiotic reduces inflammatory skin lesions by 50–70% and sebum secretion by up to 42%. Particularly effective for acne-prone and congested skin types.' },
            { title: 'Galactomyces Ferment Filtrate', body: 'Discovered when sake brewery workers had remarkably smooth hands. Rich in vitamins, minerals, and AHAs — brightens skin tone, tightens pores, and renewing.' },
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
            { brand: 'Ma:nyo Factory', name: 'Bifida Biome Complex Ampoule', note: isKo ? '비피다 발효물 고농도 앰플 — 예민하고 손상된 장벽 집중 회복' : 'High-concentration Bifida Ferment — intensive barrier recovery for reactive skin' },
            { brand: 'Benton', name: 'Fermentation Essence', note: isKo ? '갈락토미세스 + 유산균 발효물 조합 — 피부톤 균일화와 장벽 강화를 동시에' : 'Galactomyces + lactobacillus combo — brightening and barrier reinforcement together' },
            { brand: 'Haruharu Wonder', name: 'Black Rice Hyaluronic Toner', note: isKo ? '발효 흑미 추출물 기반 — 마이크로바이옴 친화적 수분 레이어링에 이상적' : 'Fermented black rice base — ideal for microbiome-friendly hydration layering' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="#a07850" />)}
        </div>
      </ArtSection>

    </div>
  );
}
