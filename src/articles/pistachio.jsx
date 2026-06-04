import React from 'react';
import { ArtTlDr, ArtFigure, ArtSection, ArtSectionHeading, ArtBody, ArtCallout, ArtStatCard, ArtProdCard } from '../pages/insights';
// Article: Pistachio Fragrance Note
export default function PistachioBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 피스타치오가 2026년 향수 업계에서 전년 대비 852% 성장한 노트로 떠올랐어요. 견과류 자체를 쓰는 게 아니라, 락톤(γ-운데카락톤), 피라진(2-아세틸 피라진), 벤즈알데히드를 조합해 '크리미하고 따뜻한' 후각적 인상을 합성합니다. 두바이 초콜릿 바이럴에서 시작된 이 트렌드는 구르망 향수의 진화를 보여줘요.</>
        ) : (
          <><strong>TL;DR:</strong> Pistachio is 2026's fastest-rising fragrance note — up 852% year-over-year. Perfumers don't use the nut itself. They build a synthetic accord from lactones (γ-undecalactone), pyrazines (2-acetyl pyrazine), and benzaldehyde to create the impression of "creamy warmth." What started with a viral Dubai chocolate moment is now reshaping gourmand perfumery.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1502825751399-28baa9b81efe?auto=format&fit=crop&q=80&w=1200"
        alt="Pistachios in a bowl, representing the trending pistachio fragrance note in perfumery"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '📈 왜 갑자기 피스타치오인가요?' : '📈 Why pistachio, why now?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>2024년 말, 두바이 초콜릿 바이럴이 피스타치오를 전 세계적인 '맛의 아이콘'으로 만들었어요. 그 물결이 향수까지 왔습니다. <mark>피스타치오 노트는 전년 대비 852% 성장하며 2026년 가장 빠르게 뜨는 향료가 됐어요.</mark> 달콤하기만 한 기존 구르망 향수에 질린 소비자들이 <strong>질감이 있고 깊이 있는 따뜻함</strong>을 찾기 시작한 거예요.</>
          ) : (
            <>The Dubai chocolate viral moment of late 2024 turned pistachio into a global flavor icon. That wave reached perfumery. <mark>Pistachio notes are up 852% year-over-year, making it 2026's fastest-rising fragrance ingredient.</mark> Consumers tired of one-dimensional sweet gourmands are looking for <strong>warmth with texture and depth</strong> — and pistachio delivers exactly that.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '📊 852% 성장', desc: '피스타치오 향료 노트의 전년 대비 인기 상승률.' },
            { title: '🍫 두바이 초콜릿 효과', desc: '2024년 바이럴에서 시작된 피스타치오 열풍이 향수 산업까지 확산.' },
            { title: '🧪 합성 어코드', desc: '진짜 견과류가 아닌, 여러 분자를 조합해 만든 후각적 인상.' },
          ] : [
            { title: '📊 852% growth', desc: 'Pistachio note popularity increase year-over-year.' },
            { title: '🍫 Dubai chocolate effect', desc: 'The 2024 viral moment that launched pistachio into fragrance.' },
            { title: '🧪 Synthetic accord', desc: 'Not the actual nut — a combination of molecules that creates the impression.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🔬 피스타치오 향은 어떤 분자로 만들까요?' : '🔬 What molecules make a pistachio scent?'}
        </ArtSectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🥜" title={isKo ? '피라진 — 고소한 따뜻함의 정체' : 'Pyrazines — the source of nutty warmth'} borderColor="rgba(107,142,107,0.3)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? <><strong>2-아세틸 피라진(2-Acetyl Pyrazine)</strong>은 "팝콘 피라진"이라고도 불리는 분자로, 볶은 견과류·빵·팝콘에서 나는 고소한 향의 원인이에요. 피스타치오 어코드의 '따뜻하고 구운 느낌'을 만드는 핵심 원료입니다.</> : <><strong>2-Acetyl pyrazine</strong> — sometimes called "popcorn pyrazine" — is the molecule behind the toasted, nutty aroma in roasted nuts, bread, and popcorn. It's the backbone of the "warm, baked" quality in pistachio accords.</>}
          </ArtCallout>
          <ArtCallout icon="🍑" title={isKo ? '락톤 — 벨벳 같은 크리미함' : 'Lactones — velvety creaminess'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? <><strong>γ-운데카락톤(γ-Undecalactone)</strong>은 "피치 락톤"이라고 불리며, <mark>피스타치오 향 포뮬러의 20~25%를 차지하는 크리미한 중간 단계</mark>를 만들어요. 여기에 <strong>γ-노나락톤</strong>이 더해지면 열대 과일 같은 부드러움이 생깁니다. 이 두 락톤이 피스타치오를 "음식"이 아닌 "향수"로 느끼게 하는 비결이에요.</> : <><strong>γ-Undecalactone</strong> — the "peach lactone" — creates <mark>the velvety mid-phase that makes up 20–25% of a pistachio formula</mark>. Add <strong>γ-nonalactone</strong> for tropical creaminess. These two lactones are what make pistachio smell like perfume rather than food.</>}
          </ArtCallout>
          <ArtCallout icon="🍬" title={isKo ? '벤즈알데히드 — 마지팬의 달콤함' : 'Benzaldehyde — marzipan sweetness'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? <>벤즈알데히드 유도체는 아몬드·마지팬 같은 달콤한 견과류 느낌을 더해요. 피라진의 고소함, 락톤의 크리미함과 합쳐지면 <strong>'따뜻하고 포근하지만 무겁지 않은'</strong> 현대 구르망 향수의 시그니처가 완성됩니다.</> : <>Benzaldehyde derivatives add the sweet, almond-marzipan facet. Combined with pyrazine warmth and lactone creaminess, they complete the signature of modern gourmand pistachio — <strong>warm and cozy without being heavy</strong>.</>}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '🧊 좋은 피스타치오 향수 vs 나쁜 피스타치오 향수' : '🧊 What separates a good pistachio fragrance from a bad one?'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '균형이 핵심', body: '피라진만 많으면 팝콘 냄새, 락톤만 많으면 인공적인 크림 냄새가 나요. 좋은 피스타치오 향수는 세 분자군의 비율이 정확하게 맞아야 합니다.' },
            { title: '달콤함의 절제', body: '2026년 구르망 트렌드는 "다크 구르망" — 디저트처럼 달기만 한 향은 사라지고 있어요. 피스타치오도 짠맛, 쓴맛, 우디 노트와 대비를 이뤄야 세련됩니다.' },
            { title: '니치에서 빛나는 이유', body: '피스타치오 오일을 15%까지 사용하는 니치 브랜드도 있어요. 합성 어코드만으로는 낼 수 없는 진짜 로스팅된 따뜻함을 원한다면 원료 투자가 필요합니다.' },
          ] : [
            { title: 'Balance is everything', body: 'Too many pyrazines = popcorn. Too many lactones = artificial cream. A good pistachio fragrance gets the ratio between all three molecular families exactly right.' },
            { title: 'Restraint on sweetness', body: "The 2026 gourmand trend is 'dark gourmand' — dessert-sweet is fading. Pistachio needs salt, bitterness, and woody contrast to feel sophisticated, not juvenile." },
            { title: 'Why niche does it better', body: 'Some niche houses use cold-pressed pistachio oil at up to 15% concentration. That genuine roasted warmth is expensive — and impossible to replicate with synthetics alone.' },
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
          {isKo ? '✨ 피스타치오 노트가 빛나는 향수들' : '✨ Pistachio fragrances worth smelling'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Maison Margiela', name: "Replica Coffee Break", note: isKo ? '라벤더 + 피스타치오 어코드 — 고소한 카페 라떼의 후각적 재현' : 'Lavender + pistachio accord — an olfactory latte moment' },
            { brand: 'Xerjoff', name: 'Pikovaya Dama', note: isKo ? '진짜 피스타치오 오일 사용 — 깊고 로스팅된 따뜻함이 하루 종일' : 'Real pistachio oil — deep roasted warmth that lasts all day' },
            { brand: 'Sol de Janeiro', name: 'Cheirosa 87', note: isKo ? '피스타치오 + 살티 카라멜 — 달콤함과 짠맛의 완벽한 긴장감' : 'Pistachio + salted caramel — perfect sweet-salty tension' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--sage)" />)}
        </div>
      </ArtSection>

    </div>
  );
}
