import React from 'react';
import { ArtTlDr, ArtFigure, ArtSection, ArtSectionHeading, ArtBody, ArtCallout, ArtStatCard, ArtProdCard } from '../pages/insights';
// Article: Skin Barrier 2026
export default function SkinBarrierBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ArtTlDr>
        {isKo ? (
          <><strong>🧱 요약:</strong> 피부 장벽은 세라마이드, 지방산, 콜레스테롤로 이루어진 지질 매트릭스입니다. 이 구조가 무너지면 수분이 빠져나가고 자극이 들어옵니다. 2026년의 접근법은 단순 보습이 아니라 <strong>시카-리포솜</strong>, <strong>스쿠알란 유래 세라마이드</strong>, <strong>비피다 발효 용해물</strong>로 손상된 지질 구조를 분자 수준에서 재건하는 것입니다.</>
        ) : (
          <><strong>🧱 TL;DR:</strong> Your skin barrier is a lipid matrix of ceramides, fatty acids, and cholesterol. When it breaks down, water escapes and irritants get in. The 2026 approach isn't moisturizing harder — it's rebuilding the damaged lipid architecture with <strong>Cica-liposomes</strong>, <strong>squalane-derived ceramides</strong>, and <strong>Bifida ferment lysate</strong> at the molecular level.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1200"
        alt="Skincare serums and moisturizer bottles representing ceramide and skin barrier repair products"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🔍 피부 장벽은 왜 무너질까요?' : '🔍 What are the primary drivers of skin barrier degradation?'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>피부 장벽이 손상되는 원인은 하나가 아니에요. 스마트폰과 모니터에서 나오는 <strong>고에너지 가시광선(HEV)</strong>, 매일 마시는 공기 속 <strong>미세먼지(PM2.5)</strong>, 그리고 우리가 직접 선택한 <strong>pH 교란 클렌저</strong>까지 — <mark>이 세 가지가 동시에 피부의 세라마이드와 지방산을 고갈시킵니다.</mark></>
          ) : (
            <>The barrier doesn't break down from one thing. It's a slow accumulation — <strong>HEV light</strong> from your phone and monitor, <strong>PM2.5</strong> from city air, and the <strong>pH-disrupting cleanser</strong> you chose yourself. <mark>Together, they strip the skin's ceramide and fatty acid reserves faster than passive recovery can keep up with.</mark></>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '🔥 산화 스트레스', desc: '활성산소가 콜라겐과 엘라스틴 섬유를 분해합니다.' },
            { title: '💧 지질 고갈', desc: "피부 세포 사이의 핵심 '모르타르' 역할을 하는 성분이 손실됩니다." },
            { title: '⚖️ pH 불균형', desc: '산성막의 보호 균총이 교란됩니다.' },
          ] : [
            { title: '🔥 Oxidative Stress', desc: 'Free radicals break down collagen and elastin fibers.' },
            { title: '💧 Lipid Depletion', desc: "Loss of the essential 'mortar' between skin cells." },
            { title: '⚖️ pH Imbalance', desc: "Disruption of the acid mantle's protective flora." },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🧪 장벽을 다시 세우는 핵심 성분 세 가지' : '🧪 Which three molecular compounds are essential for barrier restoration?'}</ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🌿" title={isKo ? '1. 시카-리포솜' : '1. Cica-Liposomes'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <><strong>병풀(Centella Asiatica)</strong>의 핵심 성분인 아시아티코사이드와 마데카소사이드를 캡슐에 감싸서 피부 깊숙이 전달해요. 콜라겐 합성과 보습 인자 생성을 촉진합니다.</> : <>Encapsulated <strong>Centella Asiatica</strong> triterpenoids (Asiaticoside, Madecassoside) that penetrate deeper into the stratum corneum to stimulate GAG synthesis and collagen production at the cellular level.</>}
          </ArtCallout>
          <ArtCallout icon="💧" title={isKo ? '2. 스쿠알란 유래 세라마이드' : '2. Squalane-Derived Ceramides'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <>우리 피부 피지와 구조가 비슷한 지질이에요. 모공을 막지 않으면서 <strong>수분 증발(TEWL)</strong>을 막아주는 보호막을 만들어줍니다.</> : <>Hydrogenated lipids that mimic human sebum, providing an occlusive yet breathable layer to prevent <strong>TEWL (Trans-Epidermal Water Loss)</strong> without clogging pores.</>}
          </ArtCallout>
          <ArtCallout icon="✨" title={isKo ? '3. 비피다 발효 용해물' : '3. Bifida Ferment Lysate'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.1)">
            {isKo ? 'DNA 복구 효소가 풍부한 발효 유래 성분이에요. 피부 위의 유익균 균형을 도와 마이크로바이옴을 건강하게 유지하고 민감성을 낮춰줍니다.' : "A probiotic derivative rich in DNA repair enzymes that strengthens the skin's microbiome and reduces sensitivity by promoting a healthy bacterial balance."}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🌿 한방 성분, 첨단 기술을 만나다' : '🌿 How do Korean botanicals integrate with modern synthesis?'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? <>한국의 한방(漢方) 전통은 수천 년간 피부와 체질의 관계를 연구해왔어요. <mark>2026년, 첨단 바이오리액터와 정밀 추출 기술이 그 경험을 분자 수준에서 과학적으로 증명하고 있습니다.</mark></> : <>Korean "Hanbang" medicine has spent centuries mapping the relationship between botanicals and skin. <mark>In 2026, high-tech bioreactors and precision extraction are validating that wisdom at a molecular level — not replacing it.</mark></>}
        </ArtBody>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '발효 기술의 진화', body: '전통 옹기 발효를 첨단 바이오리액터로 재현하면서 폴리페놀과 플라보노이드의 흡수율이 크게 높아졌어요. 같은 원료도 피부에 더 잘 스며듭니다.' },
            { title: '식물성 레티놀', body: '바쿠치올은 레티놀과 같은 효과(세포 재생, 콜라겐 촉진)를 주지만, 합성 비타민 A처럼 장벽을 자극하지 않아요.' },
          ] : [
            { title: 'Advanced Fermentation', body: 'Traditional earthen-pot fermentation is now replicated in high-tech bioreactors to increase the bioavailability of polyphenols and flavonoids, making them more effective on the skin.' },
            { title: 'Phyto-Retinols', body: 'Ingredients like Bakuchiol provide retinol-like results (cell turnover, collagen boost) without the barrier-disrupting side effects of synthetic Vitamin A.' },
          ]).map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '✨ 장벽이 무너졌을 때 쓸 제품' : '✨ Products built for barrier-compromised skin'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Dr. Jart+', name: 'Cicapair Intensive Soothing Repair Cream', note: isKo ? '마데카소사이드 + 세라마이드로 장벽 즉시 진정' : 'Madecassoside + ceramide — barrier calming from first application' },
            { brand: 'La Roche-Posay', name: 'Cicaplast Balm B5', note: isKo ? '판테놀 5%로 각질형성세포 이동을 가속하여 미세 손상 봉합' : 'Panthenol 5% accelerates keratinocyte migration to close micro-lesions' },
            { brand: 'Medicube', name: 'PDRN Pink Collagen Capsule Cream', note: isKo ? 'PDRN·콜라겐 포뮬러 — 탄탄하고 회복력 있어 보이는 피부와 연관' : 'PDRN + collagen formula associated with firmer, more resilient-looking skin' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--accent)" />)}
        </div>
      </ArtSection>
    </div>
  );
}
