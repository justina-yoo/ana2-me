// Article: Spicules — Microneedling in a Bottle
window.SpiculesBody = function SpiculesBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 스피큘(Spicules)은 민물 해면에서 추출한 미세 바늘 입자예요. 피부에 마사지하면 수천 개의 마이크로 채널을 만들어 활성 성분의 침투를 돕고, 콜라겐 재생을 유도합니다. 전문 마이크로니들링과 비슷한 원리지만 집에서 할 수 있고, 24시간 뒤 자연스럽게 빠져나와요. K-뷰티가 2026년 가장 밀고 있는 성분입니다.</>
        ) : (
          <><strong>TL;DR:</strong> Spicules are microscopic needle-shaped particles from freshwater sponges. Massaged into skin, they create thousands of micro-channels that boost active ingredient penetration and trigger collagen production. Same principle as professional microneedling, but at home — and the particles shed naturally within 24 hours. K-beauty's most-pushed ingredient of 2026.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1695479044464-67299fa84782?auto=format&fit=crop&q=80&w=1200"
        alt="Skincare serum dropper bottle representing spicule microneedling skincare trend"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🧫 스피큘이 뭔가요?' : '🧫 What are spicules?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>스피큘은 민물 해면(Spongilla) 같은 해양 생물의 골격을 이루는 <strong>천연 미세 바늘</strong>이에요. 칼슘과 실리카로 이루어져 있고, 크기는 머리카락 굵기의 수십 분의 일 정도입니다. 이걸 스킨케어 제품에 넣어서 피부에 마사지하면, <mark>표피에 수천 개의 미세한 통로가 생기면서 세럼과 활성 성분이 평소보다 훨씬 깊이 스며들어요.</mark> K-뷰티에서 '병 속의 마이크로니들링', '리퀴드 마이크로니들링'이라고 부르는 이유예요.</>
          ) : (
            <>Spicules are <strong>naturally occurring micro-needles</strong> that form the skeletal structure of freshwater sponges like Spongilla. Made of calcium and silica, they're a fraction of the width of a human hair. When massaged into skin via a serum or cream, <mark>they create thousands of temporary micro-channels in the epidermis, allowing active ingredients to penetrate far deeper than they normally would.</mark> That's why K-beauty calls them "microneedling in a bottle."</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '🪡 천연 미세 바늘', desc: '해면 골격에서 추출한 칼슘·실리카 바늘. 합성이 아닌 자연 유래.' },
            { title: '⏱️ 24시간 후 탈락', desc: '표피에 머물다 자연스럽게 빠져나와요. 금속 바늘처럼 남지 않아요.' },
            { title: '📈 2026년 K-뷰티 키워드', desc: '소셜미디어에서 "리퀴드 마이크로니들링"으로 급부상 중.' },
          ] : [
            { title: '🪡 Natural micro-needles', desc: 'Calcium and silica needles from sponge skeletons — not synthetic.' },
            { title: '⏱️ Shed in 24 hours', desc: 'Particles stay in the epidermis temporarily, then fall out naturally.' },
            { title: '📈 2026 K-beauty keyword', desc: 'Trending on social media as "liquid microneedling."' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🔬 어떻게 작동하나요?' : '🔬 How do spicules actually work?'}
        </ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🪡" title={isKo ? '1단계: 마이크로 채널 생성' : 'Step 1: Micro-channel creation'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>피부에 마사지하면 미세 바늘이 각질층에 수천 개의 통로를 만들어요. 이 채널을 통해 비타민 C, 레티놀, 나이아신아마이드 같은 활성 성분이 평소보다 <strong>훨씬 깊이 침투</strong>합니다. 성분의 효과가 극대화되는 거예요.</> : <>When massaged in, the micro-needles create thousands of tiny channels in the stratum corneum. Through these channels, actives like vitamin C, retinol, and niacinamide penetrate <strong>far deeper than surface application</strong> — maximizing their effectiveness.</>}
          </ArtCallout>
          <ArtCallout icon="🔄" title={isKo ? '2단계: 상처 치유 반응 유도' : 'Step 2: Wound-soothing response'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <>피부가 미세한 "손상"을 감지하면 즉시 복구 모드에 들어가요. <mark>콜라겐과 엘라스틴 생성이 촉진되고, 세포 재생(턴오버)이 빨라집니다.</mark> 전문 마이크로니들링과 같은 원리인데, 바늘 대신 자연 유래 입자를 사용하는 거예요.</> : <>Your skin detects the micro-injuries and immediately enters repair mode. <mark>Collagen and elastin production ramps up, and cell turnover accelerates.</mark> Same principle as professional microneedling — but using natural particles instead of metal needles.</>}
          </ArtCallout>
          <ArtCallout icon="✨" title={isKo ? '3단계: 자연 탈락' : 'Step 3: Natural shedding'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>금속 바늘과 달리 스피큘은 표피 안에 약 24시간 머문 뒤 자연스럽게 빠져나와요. 이 시간 동안 지속적으로 피부를 자극해서 활성 성분 흡수와 재생 반응이 이어집니다.</> : <>Unlike metal needles, spicules remain in the superficial skin for about 24 hours before naturally shedding. During this time, they continue stimulating the skin — extending both the absorption window for actives and the regenerative response.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '⚖️ 전문 마이크로니들링과 뭐가 다른가요?' : '⚖️ How does it compare to professional microneedling?'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '깊이의 차이', body: '전문 마이크로니들링은 진피층까지 도달하지만, 스피큘은 표피(각질층~과립층)에 머물러요. 더 얕지만 그만큼 다운타임이 거의 없습니다.' },
            { title: '누가 쓸 수 있나', body: '민감성 피부, 활성 여드름, 홍조가 잦은 피부에는 주의가 필요해요. 처음 사용 시 따끔거림과 홍조가 있을 수 있고, 이건 정상 반응이에요.' },
            { title: '효과의 한계', body: '깊은 흉터나 심한 주름에는 전문 시술이 더 효과적이에요. 스피큘은 피부결 개선, 톤 균일화, 활성 성분 부스팅에 강점이 있어요.' },
          ] : [
            { title: 'Depth difference', body: "Professional microneedling reaches the dermis. Spicules stay in the epidermis (stratum corneum to granular layer). Shallower, but virtually no downtime." },
            { title: 'Who should be careful', body: 'Sensitive skin, active blemishes, and redness-prone skin require caution. Tingling and mild redness after first use are normal — but irritation should be monitored.' },
            { title: 'What it can\'t do', body: 'Deep scars and severe wrinkles need professional treatments. Spicules excel at texture refinement, tone evening, and boosting active ingredient absorption.' },
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
          {isKo ? '✨ 스피큘 성분이 들어간 제품들' : '✨ Spicule products worth trying'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Biodance', name: 'Spicule Glow Ampoule', note: isKo ? '해면 스피큘 + 나이아신아마이드 — 피부결 개선과 톤업을 동시에' : 'Sponge spicules + niacinamide — texture and tone improvement in one' },
            { brand: 'Medicube', name: 'Deep Vita C Micro Needle Pad', note: isKo ? '스피큘 패드 + 비타민C — 닦아내는 마이크로니들링 경험' : 'Spicule pad + vitamin C — wipe-on microneedling experience' },
            { brand: 'Torriden', name: 'Cellmazing Micro Needle Serum', note: isKo ? '저자극 스피큘 세럼 — 민감 피부도 시도할 수 있는 엔트리 제품' : 'Gentle-formula spicule serum — entry point for sensitive skin types' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--accent)" />)}
        </div>
      </ArtSection>

    </div>
  );
};
