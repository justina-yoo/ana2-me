// Article: PDRN & Salmon DNA
window.PDRNBody = function PDRNBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ArtTlDr>
        {isKo ? (
          <><strong>🧬 요약:</strong> PDRN은 연어에서 추출한 성분으로, 피부에 바르면 <strong>콜라겐 재생 신호</strong>를 활성화합니다. 한국 피부과에서는 30년 전부터 주사 시술로 써왔고, 이제 세럼으로도 나왔습니다. 피부 재생, 색소 개선, 시술 후 회복에 효과가 있다는 임상 데이터가 있습니다.</>
        ) : (
          <><strong>🧬 TL;DR:</strong> PDRN is a molecule derived from salmon that signals your skin to rebuild collagen. Korean dermatology clinics have used it in injections for 30 years — it's now in serums. Clinical studies back it for skin repair, dark spots, and post-treatment recovery.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1200"
        alt="Skincare serum dropper bottle representing PDRN regenerative skincare science"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🐟 연어 DNA가 피부에서 하는 일' : '🐟 What salmon DNA actually does to your skin'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>PDRN은 연어에서 추출한 DNA 조각입니다. 이름은 복잡하지만 작동 방식은 단순해요 — 피부 세포 표면의 특정 수용체에 결합해서 <strong>"지금 복구 시작"</strong>이라는 신호를 보냅니다. <mark>이 신호를 받은 세포들은 콜라겐을 새로 만들고, 혈관을 재생하고, 손상된 부위를 빠르게 회복시킵니다.</mark> 피부과에서 레이저 시술 후에 자주 쓰는 이유가 바로 이것입니다.</>
          ) : (
            <>PDRN is a fragment of DNA taken from salmon. The name sounds complicated, but the mechanism is straightforward — it binds to specific receptors on your skin cells and sends a signal to <strong>start repairing</strong>. <mark>Cells respond by producing new collagen, rebuilding blood vessels, and speeding up recovery in damaged areas.</mark> That's why Korean dermatology clinics reach for it after laser treatments.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '🔬 재생 신호 활성화', desc: '피부 세포에 복구 신호를 보내 성장인자 분비를 늘립니다.' },
            { title: '💪 콜라겐 재생', desc: '피부 탄력과 밀도를 만드는 콜라겐을 새로 합성하도록 유도합니다.' },
            { title: '🩸 혈액순환 개선', desc: '진피 내 새로운 모세혈관 형성을 촉진해 피부 영양 공급을 늘립니다.' },
          ] : [
            { title: '🔬 Repair Signal', desc: 'Tells skin cells to start recovering — increasing growth factor output.' },
            { title: '💪 Collagen Rebuilding', desc: 'Prompts the skin to produce new collagen, restoring firmness and density over time.' },
            { title: '🩸 Better Circulation', desc: 'Encourages new capillary growth in the dermis, improving how well nutrients reach skin cells.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '💉 왜 처음엔 주사였고, 이제는 세럼인가' : '💉 Why it was an injectable first — and why serums work now'}</ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🏥" title={isKo ? '피부 속으로 직접 넣어야 했던 이유' : 'The original problem'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>PDRN 분자는 일반 세럼 성분보다 훨씬 큽니다. 그냥 피부에 바르면 표면에서 머물다 씻겨 내려가요. <mark>한국 피부과에서는 이 문제를 피부에 미세한 경로를 만들어 성분을 직접 전달하는 방식으로 해결했습니다.</mark> 효과는 확실하지만 클리닉에 가야 한다는 한계가 있었죠.</> : <>PDRN molecules are much larger than most serum ingredients. Applied to the surface, they just sit there and wash off. <mark>Korean dermatologists got around this by creating tiny channels in the skin — microneedling, injections — to deliver it directly.</mark> It worked well, but required a clinic visit.</>}
          </ArtCallout>
          <ArtCallout icon="💊" title={isKo ? '세럼으로 가능해진 방법' : 'How serums solved it'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <><mark>요즘 PDRN 세럼들은 성분을 아주 작은 지질 캡슐에 감싸서 피부 흡수를 돕습니다.</mark> 이 캡슐은 피부 세포막과 구조가 같아서 세포가 자연스럽게 흡수합니다. 연구에 따르면 이 방식이 일반 수용액 대비 침투율을 최대 <strong>4배</strong> 높인다고 합니다.</> : <><mark>Modern PDRN serums wrap the molecule in tiny lipid capsules that help it absorb into skin.</mark> These capsules are structurally similar to cell membranes, so cells recognize and absorb them naturally. Studies show this method achieves up to <strong>4× better penetration</strong> compared to an unencapsulated formula.</>}
          </ArtCallout>
          <ArtCallout icon="🔬" title={isKo ? 'PN과 PDRN — 라벨에서 뭘 봐야 하나' : 'PN vs. PDRN on a label'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.1)">
            {isKo ? <>두 이름이 같은 성분처럼 쓰이지만 실제로는 다릅니다. PDRN이 더 작은 분절이고, 작을수록 피부에 더 잘 흡수됩니다. <mark>세럼에서 효과를 기대한다면 PDRN 표기가 있는 제품을 고르는 게 유리합니다.</mark></> : <>The two names get used interchangeably, but they're different. PDRN is the shorter, smaller version — and smaller means better absorption through skin. <mark>If you're buying a topical product, PDRN on the label is the better bet over PN.</mark></>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🧪 실제로 뭐가 증명됐나' : '🧪 What the research actually shows'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '📉 다크스팟 개선', body: 'PDRN을 12주간 꾸준히 사용한 연구에서 색소침착이 눈에 띄게 줄었습니다. 멜라닌 생성을 억제하고 피부 세포 교체를 빠르게 하는 두 가지 경로가 동시에 작동하기 때문입니다.' },
            { title: '🔄 상처 회복 가속', body: '한국 의료 현장에서 가장 오래 쓰인 분야입니다. 수술 후 조직 회복 연구들에서 PDRN을 사용한 쪽이 그렇지 않은 쪽보다 회복 속도가 평균 30% 빨랐습니다.' },
            { title: '💧 수분 유지력 향상', body: '피부 속 히알루론산 생성을 도와 수분 손실을 줄입니다. 민감하고 건조한 피부 모델 연구에서 8주 후 피부 수분량이 평균 23% 증가했습니다.' },
            { title: '⚡ 시술 후 빠른 회복', body: '레이저나 필링 후 피부가 빨개지고 예민해지는 시간을 단축합니다. 한국 클리닉들이 시술 직후 PDRN을 루틴으로 쓰는 이유입니다.' },
          ] : [
            { title: '📉 Dark spots', body: 'A 12-week study found visible reduction in uneven skin tone with consistent PDRN use. It works on two fronts simultaneously — slowing melanin production and speeding up how quickly old skin cells turn over.' },
            { title: '🔄 Faster skin-soothing', body: 'The longest-standing clinical application. Post-surgical studies consistently show PDRN-treated tissue soothes around 30% faster on average — which is why hospitals adopted it before skincare did.' },
            { title: '💧 Moisture retention', body: 'PDRN supports hyaluronic acid production inside the skin, reducing water loss. A study on dry, sensitive skin models found moisture levels up by an average of 23% after 8 weeks.' },
            { title: '⚡ Post-treatment recovery', body: 'Shortens the window of redness and sensitivity after lasers or peels. Korean clinics have made it a standard step right after ablative treatments for this reason.' },
          ]).map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '✨ 추천 PDRN 세럼' : '✨ PDRN serums worth using'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Medicube', name: 'PDRN Pink Collagen Capsule Cream', note: isKo ? 'PDRN + EGF 복합 — 콜라겐 재생과 탄력 회복에 집중' : 'PDRN + EGF combo — focused on collagen rebuilding and firmness' },
            { brand: 'Dr. FORHAIR', name: 'PDRN Rejuvenating Serum', note: isKo ? '고농도 PDRN + 나이아신아마이드 — 재생과 브라이트닝을 동시에' : 'High-concentration PDRN + niacinamide — repair and brightening together' },
            { brand: 'Some By Mi', name: 'PDRN Snail Truecica Miracle Repair Serum', note: isKo ? '스네일 + PDRN — 예민하고 손상된 피부 즉각 진정' : 'Snail + PDRN — calming and repairing compromised or reactive skin' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--accent)" />)}
        </div>
      </ArtSection>
    </div>
  );
}
