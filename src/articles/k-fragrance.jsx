import React from 'react';
import { ArtTlDr, ArtFigure, ArtSection, ArtSectionHeading, ArtBody, ArtCallout, ArtStatCard, ArtProdCard } from '../pages/insights';
// Article: K-Fragrance
export default function KFragranceBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> K-프래그런스가 세계 시장에서 주목받는 건 마케팅이 아니라 설계 철학 때문이에요. 한국 향수는 강하게 퍼지는 대신 피부에 밀착되는 '스킨 센트'를 지향하며, 합성 머스크와 시어 우드 같은 저휘발성 분자를 중심으로 만들어집니다. 2026년 1월 수출 652만 달러 — 1988년 이래 최고 기록.</>
        ) : (
          <><strong>TL;DR:</strong> K-fragrance is gaining global traction not because of marketing, but because of a fundamentally different design philosophy. Korean perfumes prioritize skin-close "skin scents" built on low-volatility synthetic musks and sheer woods — not projection. January 2026 exports hit $6.52 million, the highest monthly figure since records began in 1988.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=1200"
        alt="Minimal perfume bottles on a clean surface, representing K-fragrance skin scent design"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🌏 K-프래그런스가 갑자기 주목받는 이유' : '🌏 Why is K-fragrance suddenly everywhere?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>2026년 1월, 한국 향수 수출이 <strong>월 652만 달러</strong>를 기록하며 1988년 통계 작성 이래 최고치를 찍었어요. 더 놀라운 건 미국과의 향수 무역에서 <mark>28년 만에 처음으로 흑자를 달성</mark>했다는 점이에요. K-뷰티가 스킨케어로 세계를 바꿨듯이, 이제 향수 차례가 온 겁니다.</>
          ) : (
            <>In January 2026, South Korea's fragrance exports hit <strong>$6.52 million</strong> — the highest monthly figure since records began in 1988. Even more striking: Korea achieved a <mark>fragrance trade surplus with the US for the first time in 28 years</mark>. K-beauty rewrote the rules for skincare. Now it's fragrance's turn.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '📈 652만 달러', desc: '2026년 1월 월간 향수 수출액. 역대 최고 기록.' },
            { title: '🇺🇸 28년 만의 흑자', desc: '미국 향수 수출 184만 달러 vs 수입 127만 달러.' },
            { title: '📊 연 9.1% 성장', desc: '니치 향수 시장의 연평균 성장률. 대중 향수(2.69%)의 3배 이상.' },
          ] : [
            { title: '📈 $6.52M', desc: 'January 2026 monthly fragrance exports — an all-time high.' },
            { title: '🇺🇸 28-year first', desc: 'Fragrance trade surplus with the US: $1.84M exports vs $1.27M imports.' },
            { title: '📊 9.1% CAGR', desc: 'Niche fragrance market growth rate — more than 3× the mass market.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🧪 "스킨 센트"란 정확히 뭘까요?' : '🧪 What exactly is a "skin scent"?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>서양 향수가 '프로젝션(projection)' — 얼마나 멀리 퍼지느냐 — 을 중시한다면, 한국 향수는 정반대를 추구해요. <mark>가까이 다가와야 느낄 수 있는 향, 피부 위에서 체온과 섞여 나만의 냄새가 되는 향.</mark> 이걸 '스킨 센트'라고 부릅니다. 머스크, 파우더, 차, 시어 우드처럼 <strong>증기압이 낮고 분자량이 큰</strong> 원료를 중심으로 설계되기 때문에, 공기 중으로 빠르게 날아가지 않고 피부에 오래 밀착돼요.</>
          ) : (
            <>Western perfumery has long valued projection — how far a scent travels. Korean fragrance design pursues the opposite. <mark>A scent you can only smell up close, one that merges with your body heat and becomes uniquely yours.</mark> That's a skin scent. It's built on <strong>low-vapor-pressure, high-molecular-weight</strong> ingredients — musks, clean powders, tea, sheer woods — that don't rush into the air. They stay close to skin, evolving slowly over hours.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🔬 K-프래그런스를 만드는 핵심 분자들' : '🔬 The molecules behind the K-fragrance signature'}
        </ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🤍" title={isKo ? '화이트 머스크 — 실험실에서 만든 친밀함' : 'White Musk — intimacy, engineered'} borderColor="rgba(107,142,107,0.3)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <>화이트 머스크는 자연에서 추출한 단일 원료가 아니에요. 실험실에서 여러 합성 분자를 조합해 '깨끗함, 부드러움, 친밀함'이라는 후각적 인상을 만든 어코드입니다. 한국 향수의 베이스에 가장 많이 쓰이며, <strong>피부 위에서 체온에 반응해 은은하게 올라오는 특성</strong>이 있어요.</> : <>White musk isn't a single natural ingredient — it's a lab-engineered accord of multiple synthetic molecules designed to evoke cleanliness, softness, and intimacy. It's the most common base in Korean fragrances, and it has a unique property: <strong>it responds to body heat, rising gently from skin rather than projecting into a room</strong>.</>}
          </ArtCallout>
          <ArtCallout icon="🌊" title={isKo ? '앰브록산(Ambroxan) — 피부처럼 느껴지는 분자' : 'Ambroxan — the molecule that smells like skin'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <>앰브록산은 용연향(Ambergris)의 합성 버전으로, 짠맛과 미네랄 느낌이 나는 따뜻한 머스크예요. <mark>피부 자체의 냄새를 더 좋게 만드는 것처럼 느껴지기 때문에</mark> "세컨드 스킨" 분자라고 불립니다. K-프래그런스에서 자주 쓰이는 핵심 원료 중 하나예요.</> : <>Ambroxan is the synthetic version of ambergris — a warm, salty, mineral musk. <mark>It's called the "second skin" molecule because it doesn't smell like perfume — it makes your skin smell better.</mark> It's one of the most frequently used ingredients in K-fragrance formulation.</>}
          </ArtCallout>
          <ArtCallout icon="🌿" title={isKo ? '시어 우드 — 가볍게 스치는 나무' : 'Sheer Woods — timber, thinned to a whisper'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>전통 우디 향수가 묵직한 샌달우드나 시더를 쓴다면, K-프래그런스는 같은 나무 원료를 극도로 희석해서 사용해요. 나무 향이 존재하지만 느낌만 남을 정도로 가볍고, 머스크와 섞이면서 '깨끗한 따뜻함'을 만들어냅니다.</> : <>Where traditional woody perfumes lean on heavy sandalwood or cedar, K-fragrance uses the same materials at extreme dilution. The wood is there — but as a feeling, not a statement. Blended with musk, it creates what perfumers call "clean warmth" — present but never imposing.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🇰🇷 한국 향수 브랜드는 뭐가 다른가요?' : '🇰🇷 What makes Korean fragrance brands different?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>프랑스 향수가 '나를 드러내는 도구'라면, 한국 향수는 '나를 감싸는 공기'에 가까워요. <mark>탬버린즈, 논픽션, 그랑핸드 같은 브랜드들은 향수를 감각적 의식(ritual)의 일부로 포지셔닝합니다</mark> — 핸드크림, 캔들, 디퓨저까지 하나의 향 세계관으로 확장하죠. 성분도 설페이트, 파라벤, 프탈레이트 프리를 기본으로 하며, '클린 포뮬레이션'을 향수에도 적용하고 있어요.</>
          ) : (
            <>French perfume is a tool for self-expression. Korean perfume is closer to the air around you. <mark>Brands like Tamburins, Nonfiction, and Granhand position fragrance as part of a sensory ritual</mark> — extending a single scent world across hand creams, candles, diffusers, and car fragrances. Formulations default to sulfate-, paraben-, and phthalate-free, applying the same "clean" philosophy K-beauty brought to skincare.</>
          )}
        </ArtBody>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '탬버린즈 (Tamburins)', body: '달걀형 병으로 유명한 브랜드. 시소잎과 생강을 얹은 코코넛 밀크 향(Pumpkini) 같은 독특한 조합으로, 익숙한 듯 낯선 향을 만들어요.' },
            { title: '논픽션 (Nonfiction)', body: '식물 유래 원료 중심으로 "절대 과하지 않은" 향을 지향해요. 자연에서 영감받은 이름과 내면의 평온을 테마로 합니다.' },
            { title: '그랑핸드 (Granhand)', body: '서울 성수동에서 시작한 브랜드로, 향을 일상의 감각 경험으로 확장합니다. 핸드크림부터 공간 향까지 하나의 세계관.' },
          ] : [
            { title: 'Tamburins', body: 'Known for egg-shaped bottles and unexpected combinations — like Pumpkini (pumpkin + coconut milk + shiso leaf + ginger). Familiar notes made unfamiliar.' },
            { title: 'Nonfiction', body: 'Plant-derived ingredients, never overpowering. Names inspired by nature, designed around the idea of finding calm through scent rituals.' },
            { title: 'Granhand', body: 'Born in Seoul\'s Seongsu-dong. Extends fragrance into everyday sensory experience — hand cream, room spray, candles, all one world.' },
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
          {isKo ? '✨ 지금 써볼 만한 K-프래그런스' : '✨ K-fragrances worth trying now'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Tamburins', name: 'Perfume Chamo', note: isKo ? '리날로올 탑, 시프리올 하트 — 침착하고 서서히 펼쳐지는 스킨 센트' : 'Linalool top, cypriol heart — calm, slow-unfurling skin scent' },
            { brand: 'Nonfiction', name: 'Gentle Night Eau de Parfum', note: isKo ? '화이트 머스크 + 시어 우드 — 잠들기 전 의식처럼 쓰는 향' : 'White musk + sheer wood — a bedtime ritual in scent form' },
            { brand: 'Borntostandout', name: 'Naked Mind', note: isKo ? '앰브록산 베이스의 미니멀 머스크 — "향수를 안 뿌린 것 같은" 향수' : 'Ambroxan-based minimal musk — perfume that smells like not wearing perfume' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--sage)" />)}
        </div>
      </ArtSection>

    </div>
  );
}
