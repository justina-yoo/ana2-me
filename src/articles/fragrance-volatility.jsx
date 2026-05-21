// Article: Fragrance Volatility
window.FragranceVolatilityBody = function FragranceVolatilityBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ArtTlDr>
        {isKo ? (
          <><strong>⏳ 요약:</strong> 향수는 고정된 향이 아닌 시간의 흐름이에요. <strong>분자량</strong>과 <strong>증기압</strong>이 각 노트가 피부에서 언제 피어나고 언제 사라지는지를 결정합니다. 탑 노트는 수분 내 증발하고, 베이스 노트는 하루 종일 남아 있어요.</>
        ) : (
          <><strong>⏳ TL;DR:</strong> A fragrance isn't a smell — it's a timeline. <strong>Molecular weight</strong> and <strong>vapor pressure</strong> determine exactly when each note surfaces and disappears from your skin. Top notes evaporate in minutes. Base notes can last a day. Knowing this changes what you look for — and what you buy.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1200"
        alt="Glass perfume fragrance bottle on a reflective surface, illustrating molecular volatility"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🔺 향은 왜 시간에 따라 변할까요?' : '🔺 What is the volatility pyramid?'}</ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <><mark>모든 향수는 고정된 향이 아닌 하나의 시퀀스입니다.</mark> 세 계층 — <strong>탑, 미들, 베이스</strong> — 은 각 방향족 분자가 피부에서 얼마나 빨리 증발하는지에 해당합니다. 이는 <strong>증기압</strong>에 의해 결정됩니다: 분자량이 낮을수록 압력이 높아져 더 빨리 사라집니다.</>
          ) : (
            <><mark>Every fragrance is a sequence, not a static smell.</mark> The three tiers — <strong>top, heart, and base</strong> — correspond to how quickly each aromatic molecule evaporates from your skin. This is determined by <strong>vapor pressure</strong>: the lower the molecular weight, the higher the pressure, the faster the escape.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '⚡ 탑 노트 (0–30분)', desc: '작고 가벼운 분자. 시트러스, 알데히드, 그린. 첫인상이지만 금방 사라집니다.' },
            { title: '💜 미들 노트 (30분–4시간)', desc: '중간 무게의 분자. 플로럴, 스파이스, 우드. 향수의 감성적 핵심.' },
            { title: '🌙 베이스 노트 (4–24시간+)', desc: '무겁고 증기압이 낮은 분자. 머스크, 앰버, 레진. 피부에 남는 기억.' },
          ] : [
            { title: '⚡ Top Notes (0–30 min)', desc: 'Small, lightweight molecules. Citrus, aldehydes, green. First impression, quickly gone.' },
            { title: '💜 Heart Notes (30 min–4 hrs)', desc: 'Mid-weight molecules. Florals, spices, woods. The emotional core of the fragrance.' },
            { title: '🌙 Base Notes (4–24+ hrs)', desc: 'Heavy, low-vapor molecules. Musks, ambers, resins. The memory that stays on skin.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🔬 향이 오래 남는 이유, 분자에 있습니다' : '🔬 The molecular science of longevity'}</ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🌲" title={isKo ? '고착제 — 향을 붙잡는 분자' : 'Fixatives & Substantivity'} borderColor="rgba(107,142,107,0.3)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <><strong>Iso E Super</strong>나 <strong>Ambroxan</strong> 같은 고착제는 크고 잘 날아가지 않는 분자예요. 가벼운 향 분자가 너무 빨리 증발하지 않도록 잡아주는 역할을 합니다 — 덕분에 탑 노트와 미들 노트가 더 오래 남아요.</> : <>Fixatives like <strong>Iso E Super</strong> and <strong>Ambroxan</strong> are large, semi-volatile molecules that slow the evaporation of lighter compounds by forming a molecular scaffold — extending the presence of top and heart notes beyond their natural lifespan.</>}
          </ArtCallout>
          <ArtCallout icon="🧪" title={isKo ? '내 피부에서 다르게 느껴지는 이유' : 'Skin Chemistry as a Variable'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>피부의 pH, 유분량, 심지어 식단까지 향수 분자가 피부에 달라붙는 방식을 바꿔요. <mark>유분기 많은 피부는 향 분자를 천천히 내보내는 <strong>저장소</strong> 역할을 합니다.</mark> 건성 피부는 향을 잡아두는 힘이 약해서 더 빨리 날아가요.</> : <>pH, sebum content, and even diet alter how fragrance molecules bind to skin proteins. <mark>Oilier skin acts as a <strong>carrier reservoir</strong>, releasing molecules slowly.</mark> Dry skin offers less retention, causing faster diffusion into air.</>}
          </ArtCallout>
          <ArtCallout icon="🌙" title={isKo ? '마크로사이클릭 머스크' : 'Macrocyclic Musks'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>차세대 베이스 노트인 <strong>Exaltolide</strong>, <strong>Habanolide</strong>는 고리형 합성 머스크로 거의 날아가지 않아요. 피부 단백질에 직접 결합해서 24시간 넘게 은은하게 남는 '세컨드 스킨' 효과를 만들어냅니다.</> : <>The new generation of base notes — <strong>Exaltolide</strong>, <strong>Habanolide</strong> — are ring-structured synthetic musks with extremely low volatility. They interact with skin proteins covalently, producing the "second skin" effect that can last over 24 hours.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🛒 향수 고를 때 이렇게 써보세요' : '🛒 How to use this knowledge when buying fragrance'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '👃 시향은 반드시 피부에', body: '시향지는 향의 일부만 보여줘요. 내 피부의 pH와 유분이 향을 완전히 바꿉니다. 맥박 부위에 뿌리고 30분 이상 기다린 후 판단하세요.' },
            { title: '🎨 레이어링의 기술', body: '먼저 샌달우드, 우드, 베티버 같은 무거운 오일을 바르고 그 위에 향수를 뿌려보세요. 오일이 가벼운 향 분자를 잡아줘서 지속력이 훨씬 길어집니다.' },
            { title: '📊 농도에 따라 달라요', body: '퍼퓸(향료 20–40%)은 오드 뚜왈렛(5–15%)보다 무거운 베이스 분자가 훨씬 많아요. 농도가 높을수록 깊고 오래가는 잔향을 느낄 수 있습니다.' },
            { title: '🌡️ 체온이 향을 키워요', body: '열은 향 분자의 증발을 빠르게 해요. 손목, 목, 팔꿈치 안쪽 같은 맥박 부위는 체온이 높아 향이 더 잘 퍼지지만, 탑 노트가 빨리 사라지기도 합니다.' },
          ] : [
            { title: '👃 Test on skin, not paper', body: 'Paper strips only reveal volatility in isolation. Your skin chemistry — its pH and lipid content — is the true medium. Always test on a pulse point and wait 30 minutes before deciding.' },
            { title: '🎨 Layer strategically', body: 'Apply a base-note-heavy oil first (sandalwood, oud, vetiver), then spray your fragrance on top. The oil acts as a fixative, anchoring lighter molecules and extending their evaporation window.' },
            { title: '📊 Concentration matters', body: 'Parfum (20–40% aromatic compounds) contains more base-weight molecules than Eau de Toilette (5–15%). Higher concentration = deeper, longer-lasting dry-down.' },
            { title: '🌡️ Temperature amplifies', body: 'Heat accelerates molecular evaporation. Pulse points (wrists, neck, inner elbow) naturally warm fragrance, intensifying both projection and the speed at which top notes fade.' },
          ]).map((item, i) => (
            <div key={i}>
              <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{item.title}</h4>
              <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>{isKo ? '🌸 이 향수들, 분자로 읽어봤습니다' : '🌸 Scents in our collection, read by molecular architecture'}</ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Diptyque', name: 'Philosykos Eau de Parfum', note: isKo ? '그린 락톤 탑 + 시더 세스퀴테르펜 베이스 — 6–8시간의 우디 잔향' : 'Green lactone top + cedar sesquiterpene base — 6–8 hr woody dry-down' },
            { brand: 'Tamburins', name: 'Perfume Chamo', note: isKo ? '리날로올 탑, 시프리올 하트 — 침착하고 서서히 펼쳐지는 구조' : 'Linalool top, cypriol heart — calm, slow-unfurling structure' },
            { brand: 'Jo Malone London', name: 'Peony & Blush Suede Cologne', note: isKo ? '에틸 에스터 탑, 암브레톨라이드 베이스 — 섬세한 퍼짐, 피부 밀착 잔향' : 'Ethyl ester top, ambrettolide base — light sillage, intimate skin-close finish' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--sage)" />)}
        </div>
      </ArtSection>
    </div>
  );
}
