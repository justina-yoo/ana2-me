// Article: Fragrance Wardrobing
window.FragranceWardrobingBody = function FragranceWardrobingBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 같은 향수를 매일 뿌리면 15~20분 후 내 코가 감지를 멈춰요. 이건 후각 피로(olfactory habituation)라는 뇌의 생존 메커니즘입니다. 해결법은 더 많이 뿌리는 게 아니라, 향수를 옷장처럼 돌려 쓰는 "프래그런스 워드로빙"이에요. 2026년, 시그니처 향수의 시대는 끝나고 향수 옷장의 시대가 왔습니다.</>
        ) : (
          <><strong>TL;DR:</strong> If you wear the same perfume daily, your nose stops registering it after 15–20 minutes. That's olfactory habituation — a survival mechanism, not a flaw. The fix isn't spraying more. It's rotating scents like a wardrobe. In 2026, the signature scent is dead. The fragrance wardrobe is what works.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1615634260830-85d92cd1b769?auto=format&fit=crop&q=80&w=1200"
        alt="Collection of perfume bottles arranged like a wardrobe, representing fragrance rotation"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🧠 왜 내 향수가 안 느껴질까요?' : '🧠 Why can\'t you smell your own perfume?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>향수를 뿌리고 20분이 지나면 "향이 날아갔나?" 생각하게 되죠. 하지만 향은 그대로 있어요 — <mark>내 코가 더 이상 감지하지 않는 것뿐입니다.</mark> 이걸 <strong>후각 습관화(olfactory habituation)</strong>라고 해요. 같은 냄새에 계속 노출되면 후각 수용체의 반응이 둔해지면서, 뇌가 그 향을 "안전한 배경 정보"로 분류하고 무시합니다. 고장이 아니라 <strong>새로운 냄새를 감지하기 위한 생존 메커니즘</strong>이에요.</>
          ) : (
            <>Twenty minutes after spraying, you think your perfume has faded. It hasn't — <mark>your nose just stopped registering it.</mark> This is <strong>olfactory habituation</strong>. When your olfactory receptors are continuously exposed to the same scent molecules, they become less responsive. Your brain categorizes that smell as "safe background information" and filters it out — freeing resources to detect new, potentially important smells. It's not a flaw. <strong>It's a survival mechanism.</strong></>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '⏱️ 15~20분', desc: '같은 향에 대한 후각 수용체 반응이 둔해지기 시작하는 시간.' },
            { title: '🧬 진화적 설계', desc: '익숙한 냄새를 무시해야 새로운 위험 신호를 빠르게 감지할 수 있어요.' },
            { title: '👃 향은 그대로', desc: '주변 사람은 여전히 내 향수를 맡아요. 못 느끼는 건 나뿐입니다.' },
          ] : [
            { title: '⏱️ 15–20 minutes', desc: 'Time before your olfactory receptors start tuning out a constant scent.' },
            { title: '🧬 Evolutionary design', desc: 'Filtering out familiar smells lets you detect new danger signals faster.' },
            { title: '👃 The scent is still there', desc: "Others can still smell your perfume. You're the only one who can't." },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '👗 프래그런스 워드로빙이란?' : '👗 What is fragrance wardrobing?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>옷을 매일 같은 걸 입지 않듯이, 향수도 돌려 쓰는 거예요. <mark>다른 향 계열(시트러스, 우디, 머스크, 플로럴)을 번갈아 뿌리면 후각 수용체가 매번 "새로운 자극"으로 인식</mark>합니다. 월요일에 뿌린 시트러스 향을 다음 주 월요일에 다시 뿌리면, 코가 쉬었다 돌아왔기 때문에 처음처럼 신선하게 느껴져요.</>
          ) : (
            <>You don't wear the same outfit every day. Why wear the same scent? <mark>Rotating between different fragrance families — citrus, woody, musky, floral — keeps your olfactory receptors recognizing each one as a "new stimulus."</mark> When you return to Monday's citrus scent the following week, your nose has had enough time away to experience it as fresh again.</>
          )}
        </ArtBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🔄" title={isKo ? '3~4개면 충분해요' : '3–4 scents is all you need'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>향수 옷장은 수십 병이 필요한 게 아니에요. 서로 다른 향 계열에서 3~4개만 골라 2~3일 간격으로 돌리면 후각 피로를 효과적으로 방지할 수 있어요. 핵심은 양이 아니라 다양성입니다.</> : <>You don't need dozens of bottles. Pick 3–4 fragrances from different scent families and rotate every 2–3 days. That's enough to prevent habituation. The key isn't quantity — it's variety across molecular profiles.</>}
          </ArtCallout>
          <ArtCallout icon="🌬️" title={isKo ? '일주일에 1~2일은 쉬세요' : 'Go fragrance-free 1–2 days a week'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <>향수를 아예 안 뿌리는 날을 만들면 후각 시스템이 완전히 리셋돼요. 다음에 향수를 뿌렸을 때 훨씬 생생하게 느껴지고, 향에 대한 전반적인 둔감화도 예방됩니다.</> : <>Complete fragrance-free days give your olfactory system a full reset. When you spray again, the scent hits with renewed clarity — and you prevent the gradual overall desensitization that comes from never giving your nose a break.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🧪 향 계열별 워드로빙 가이드' : '🧪 How to build your fragrance wardrobe by family'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '🍋 시트러스 / 프레시', body: '베르가못, 자몽, 네롤리. 가벼운 분자라 빠르게 날아가지만 후각 리셋 효과가 탁월해요. 워드로빙의 "클렌저" 역할.' },
            { title: '🌲 우디 / 앰버', body: '샌달우드, 시더, 베티버, 앰브록산. 무거운 분자라 피부에 오래 남아요. 워드로빙에서 "앵커" 역할을 합니다.' },
            { title: '🤍 머스크 / 스킨 센트', body: '화이트 머스크, 클린 노트. 다른 향과의 대비가 적어 쉬는 날 대용으로 좋아요. K-프래그런스가 여기에 해당.' },
            { title: '🌸 플로럴 / 스파이시', body: '로즈, 자스민, 사프란, 카다몸. 중간 무게의 분자들이라 시트러스와 우디 사이에서 균형을 잡아줘요.' },
          ] : [
            { title: '🍋 Citrus / Fresh', body: "Bergamot, grapefruit, neroli. Light molecules that fade fast but are excellent for resetting your nose. The 'cleanser' of your wardrobe." },
            { title: '🌲 Woody / Amber', body: "Sandalwood, cedar, vetiver, ambroxan. Heavy molecules that linger on skin. The 'anchor' of your rotation." },
            { title: '🤍 Musk / Skin Scent', body: "White musk, clean notes. Low contrast with other scents — good as a rest-day alternative. K-fragrance lives here." },
            { title: '🌸 Floral / Spicy', body: "Rose, jasmine, saffron, cardamom. Mid-weight molecules that bridge citrus and woody days." },
          ]).map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </ArtSection>

    </div>
  );
}
