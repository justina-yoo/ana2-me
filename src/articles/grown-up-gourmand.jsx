import React from 'react';
import { ArtTlDr, ArtFigure, ArtSection, ArtSectionHeading, ArtBody, ArtCallout, ArtStatCard, ArtProdCard } from '../pages/insights';
// Article: Grown-Up Gourmand — Matcha, Pistachio, Roasted Sesame
export default function GrownUpGourmandBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 구르망 향수가 달콤한 디저트에서 고소하고 쌉싸름한 방향으로 진화하고 있어요. 피스타치오 향료 검색은 전년 대비 852% 급등했고, 말차는 2026년 구르망의 대표 노트가 됐습니다. 피라진(볶은 향), 락톤(크리미한 질감), L-테아닌(쓴맛) 같은 분자들이 "미식가의 향수"를 만들어요.</>
        ) : (
          <><strong>TL;DR:</strong> Gourmand fragrance is evolving from candy-sweet to savory-sophisticated. Pistachio searches are up 852% YoY, matcha is 2026's flagship gourmand note, and roasted sesame is emerging fast. Pyrazines (toasted aroma), lactones (creamy texture), and L-theanine (bitter-sweet depth) are the molecules behind the "culinary perfumery" movement.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=1200"
        alt="Matcha green tea powder with bamboo whisk, representing savory gourmand fragrance"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '구르망 향수가 왜 갑자기 "어른"이 됐을까요?' : 'Why did gourmand fragrance suddenly grow up?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>2010년대의 구르망 향수를 떠올려보세요. 바닐라 컵케이크, 솜사탕, 카라멜 — 달콤하고 직관적이었어요. 그런데 2025년부터 흐름이 바뀌기 시작했습니다. <strong>피스타치오</strong> 향료 검색이 전년 대비 852% 급등하고, 말차와 볶은 참깨 같은 노트가 니치 브랜드를 중심으로 확산됐어요. <mark>사탕 같은 달콤함 대신 고소함, 쓴맛, 감칠맛 — 미식의 언어가 향수에 들어온 거예요</mark>. 이 변화의 배경에는 두 가지 흐름이 있어요. 첫째, 미식 문화의 폭발적 성장. 넷플릭스 셰프 다큐, 오마카세 붐, 스페셜티 커피 — 우리의 미각이 정교해지면서 후각 취향도 따라간 거예요. 둘째, <strong>솔리노트(solinote)</strong>의 부활. 하나의 노트만 집중 조명하는 싱글노트 향수가 다시 인기를 끌면서, "말차 하나"나 "참깨 하나"로도 충분히 매력적인 향이 가능해졌습니다.</>
          ) : (
            <>Think about gourmand fragrances in the 2010s. Vanilla cupcakes, cotton candy, caramel — sweet and obvious. Starting in 2025, the direction shifted decisively. <strong>Pistachio</strong> fragrance searches surged 852% year-over-year, while matcha and roasted sesame notes spread from niche houses into mainstream collections. <mark>Instead of candy-sweet, the new gourmand speaks in umami, bitter-sweet, and texture — the language of culinary sophistication</mark>. Two forces drove this shift. First, the explosion of food culture: Netflix chef documentaries, the omakase boom, specialty coffee — as our palates grew more refined, our olfactory preferences followed. Second, the <strong>solinote</strong> revival. Single-note fragrances — perfumes built around one hero ingredient — came back in force, proving that "just matcha" or "just sesame" could carry a fragrance entirely on its own.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '852%', desc: '피스타치오 향료의 전년 대비 검색 증가율. 2025-2026년 가장 빠르게 성장한 구르망 노트예요.' },
            { title: '솔리노트 부활', desc: '하나의 노트에 집중하는 싱글노트 향수가 다시 주목받고 있어요. 말차, 참깨 등 단일 소재의 매력을 보여줍니다.' },
            { title: '미식 → 향수', desc: '오마카세, 스페셜티 커피 등 미식 문화의 성장이 후각 취향을 함께 정교하게 만들었어요.' },
          ] : [
            { title: '852%', desc: 'Year-over-year search growth for pistachio in fragrance. The fastest-growing gourmand note of 2025-2026.' },
            { title: 'Solinote Revival', desc: 'Single-note fragrances are surging back. Matcha, sesame, and pistachio prove one ingredient can carry an entire perfume.' },
            { title: 'Kitchen → Perfumery', desc: 'Omakase culture, specialty coffee, chef documentaries — culinary sophistication is reshaping what we want to smell like.' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '고소함, 쓴맛, 감칠맛 — 이 향을 만드는 분자들' : 'The molecules behind toasted, bitter, and umami'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>구르망이 "어른"이 된 비결은 분자 수준에서 찾을 수 있어요. 전통 구르망의 핵심은 <strong>바닐린</strong>(vanillin)과 <strong>에틸 말톨</strong>(ethyl maltol) — 설탕과 카라멜 향을 내는 분자였어요. 새로운 구르망은 완전히 다른 분자 팔레트를 써요. <mark>피라진, 락톤, L-테아닌이 "미식가의 코"를 만족시키는 세 기둥이에요</mark>.</>
          ) : (
            <>The secret to gourmand's "growing up" lies at the molecular level. Traditional gourmand was built on <strong>vanillin</strong> and <strong>ethyl maltol</strong> — molecules that smell like sugar and caramel. The new gourmand uses an entirely different molecular palette. <mark>Pyrazines, lactones, and L-theanine are the three pillars satisfying the "gourmet nose"</mark>.</>
          )}
        </ArtBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🔥" title={isKo ? '피라진 — 볶은 향의 정체' : 'Pyrazines — the science of "roasted"'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? '피라진(pyrazine)은 아미노산과 당이 고온에서 만나는 마이야르 반응(Maillard reaction)의 산물이에요. 볶은 커피, 볶은 참깨, 구운 빵에서 나는 그 고소한 향의 핵심 분자입니다. 피스타치오 향의 폭발적 인기도 피라진 덕분이에요 — 볶은 피스타치오의 2-아세틸피라진이 "따뜻한 고소함"을 만들거든요.' : 'Pyrazines are products of the Maillard reaction — what happens when amino acids and sugars meet high heat. They\'re responsible for the toasted aroma of roasted coffee, sesame seeds, and fresh bread. Pistachio\'s explosive popularity traces back to pyrazines too: 2-acetylpyrazine in roasted pistachios creates that characteristic "warm nuttiness" perfumers are chasing.'}
          </ArtCallout>
          <ArtCallout icon="🍵" title={isKo ? 'L-테아닌 — 말차의 쓴맛과 깊이' : 'L-theanine — matcha\'s bitter-sweet depth'} borderColor="rgba(45,90,61,0.2)" bgColor="rgba(45,90,61,0.04)">
            {isKo ? 'L-테아닌(L-theanine)은 말차 특유의 감칠맛과 쓴맛을 만드는 아미노산이에요. 흥미로운 건 L-테아닌이 뇌의 알파파를 증가시켜 이완 효과를 낸다는 점이에요. 말차 향수가 "차분한 편안함"을 주는 이유가 분자 수준에서 설명됩니다. 향수에서는 쿠마린(coumarin)과 조합해 건초 같은 쓴 단맛을 연출해요.' : 'L-theanine is the amino acid behind matcha\'s characteristic umami and bitter-sweet taste. What\'s fascinating: L-theanine increases alpha brain waves, producing a calming effect. This helps explain why matcha fragrances feel "serenely comforting" — there\'s a molecular logic to it. In perfumery, it\'s paired with coumarin to create a dry, hay-like bitter sweetness.'}
          </ArtCallout>
          <ArtCallout icon="🥜" title={isKo ? '락톤 — 크리미한 질감의 비밀' : 'Lactones — the creamy texture secret'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? '락톤(lactone)은 고리형 에스테르 분자로, 피부가 "크리미하다"고 느끼는 향의 정체예요. 감마데카락톤(복숭아), 델타데카락톤(코코넛 버터) 등이 대표적이에요. 새로운 구르망에서 락톤은 피라진의 날카로운 볶은 향을 부드럽게 감싸는 역할을 해요 — 피스타치오나 참깨 향수에서 "고소하면서도 부드러운" 느낌의 핵심이에요.' : 'Lactones are cyclic ester molecules — the reason your nose reads certain scents as "creamy." Gamma-decalactone (peach) and delta-decalactone (buttery coconut) are the most common. In the new gourmand, lactones serve as the soft cushion around sharp roasted notes — they\'re why pistachio and sesame fragrances feel "nutty yet smooth" rather than harsh.'}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '왜 고소한 향이 달콤한 향보다 더 편안하게 느껴질까요?' : 'Why do toasted scents feel more comforting than sweet ones?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>여기에는 신경과학적 이유가 있어요. <strong>바닐린</strong>처럼 달콤한 향은 뇌의 보상 회로(복측 피개 영역)를 자극해요 — 즉각적인 쾌감이지만 빠르게 후각 피로를 일으키죠. 반면 <strong>피라진</strong> 같은 볶은 향은 해마(hippocampus)와 연결된 기억 경로를 활성화해요. <mark>볶은 빵 냄새가 "어린 시절 아침"을 떠올리게 하는 건 후각 기억의 힘이에요</mark>. 이것이 구르망이 "캔디"에서 "토스트"로 이동한 심리적 이유입니다. 피라진은 바닐린보다 덜 즉각적이지만 더 깊고 오래가는 정서적 반응을 만들어요. 향수 업계에서 이걸 "편안함의 깊이(comfort depth)"라고 부르기 시작했어요.</>
          ) : (
            <>There's a neuroscience explanation. <strong>Vanillin</strong>-type sweet scents stimulate the brain's reward circuit (the ventral tegmental area) — instant pleasure, but quick olfactory fatigue. <strong>Pyrazines</strong> and roasted aromas, by contrast, activate memory pathways connected to the hippocampus. <mark>The reason toasted bread reminds you of childhood mornings is the power of olfactory memory</mark> — scent is the only sense that routes directly to the limbic system without passing through the thalamus. This is the psychological reason gourmand moved from "candy" to "toast." Pyrazines produce a less immediate but deeper, longer-lasting emotional response than vanillin. The fragrance industry has started calling this "comfort depth."</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '2026년 구르망의 세 기둥: 말차, 피스타치오, 볶은 참깨' : 'The three pillars of 2026 gourmand: matcha, pistachio, roasted sesame'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: '🍵 말차 — 2026년의 대표 구르망 노트', body: '말차는 쓴맛, 감칠맛, 풀 향이 공존하는 복합적 노트예요. L-테아닌의 차분한 쓴맛에 쿠마린의 건초 향, 약간의 크리미한 락톤이 더해져요. Maison Margiela의 Matcha Meditation이 이 카테고리를 대중에게 열었고, 니치 브랜드들이 뒤따르고 있어요.' },
            { title: '🥜 피스타치오 — 852%의 비밀', body: '피스타치오의 매력은 피라진(고소함) + 벤즈알데히드(마지팬 같은 아몬드 향) + 락톤(크리미함)의 조합이에요. Tom Ford Lost Cherry가 피스타치오 어코드를 대중화했고, 두바이 초콜릿 바이럴이 피스타치오에 대한 관심을 증폭시켰어요.' },
            { title: '🫘 볶은 참깨 — 아시아에서 온 새 구르망', body: '참깨를 볶으면 세사몰린이 분해되면서 2-퓨릴메탄티올 등 강렬한 향 분자가 생겨요. 한국과 일본의 참기름 문화에서 영감받은 이 노트는 서양 니치 향수계에서 "가장 대담한 구르망 실험"으로 주목받고 있어요.' },
          ] : [
            { title: '🍵 Matcha — 2026\'s flagship gourmand note', body: 'Matcha combines bitter, umami, and green in one complex note. L-theanine\'s calm bitterness meets coumarin\'s hay-like sweetness and a touch of creamy lactones. Maison Margiela\'s Matcha Meditation opened this category to mainstream audiences, and niche houses are following fast.' },
            { title: '🥜 Pistachio — the 852% story', body: 'Pistachio\'s appeal lies in a trio: pyrazines (toasty), benzaldehyde (marzipan-like almond), and lactones (creamy). Tom Ford Lost Cherry helped popularize pistachio accords, and the Dubai chocolate viral moment amplified consumer curiosity about pistachio as a luxury flavor — and scent.' },
            { title: '🫘 Roasted sesame — gourmand\'s Asian frontier', body: 'When sesame seeds are roasted, sesamolin breaks down into intensely aromatic molecules like 2-furylmethanethiol. Inspired by Korean and Japanese sesame oil traditions, this note is being called "the boldest gourmand experiment" in Western niche perfumery.' },
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
          {isKo ? '구르망의 미래 — 어디까지 갈까요?' : 'Where gourmand goes from here'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>업계 관계자들은 다음 구르망 트렌드로 <strong>발효(fermented)</strong> 노트를 지목해요. 된장, 미소, 콤부차에서 영감을 받은 향 — 아직 실험 단계지만, 고소한 구르망이 성공한 뒤라면 <mark>발효의 복잡한 감칠맛이 다음 프런티어가 될 가능성은 충분해요</mark>. 구르망 향수의 진화는 결국 우리 미각의 진화를 반영합니다. 설탕물 대신 내추럴 와인을, 케이크 대신 크루아상을 선택하는 세대가 향수에서도 같은 정교함을 원하는 거예요. "맛있는 냄새"의 정의 자체가 바뀌고 있습니다.</>
          ) : (
            <>Industry insiders point to <strong>fermented</strong> notes as the next gourmand frontier. Doenjang (Korean fermented soybean paste), miso, kombucha-inspired accords — still experimental, but after savory gourmand's proven success, <mark>the complex umami of fermentation is a plausible next step</mark>. Gourmand's evolution ultimately mirrors our palates. The generation choosing natural wine over sugary cocktails and croissants over cake wants the same sophistication in fragrance. The definition of "smelling delicious" itself is changing.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '✨ 추천 제품' : '✨ Products worth trying'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'Maison Margiela', name: 'Matcha Meditation (Replica)', note: isKo ? "말차의 쓴맛과 크리미한 우유가 만나는 명상적인 향이에요. 구르망인데 달지 않은, '어른 구르망'의 교과서예요." : "Bitter matcha meets creamy milk in a meditative blend. The textbook for 'grown-up gourmand' — comforting without being sweet." },
            { brand: 'Tom Ford', name: 'Lost Cherry', note: isKo ? '체리와 피스타치오 어코드가 조합된 구르망이에요. 피스타치오의 고소한 락톤이 체리의 달콤함을 잡아줘요.' : 'Cherry and pistachio accord in a gourmand framework. The nutty lactones of pistachio balance cherry\'s sweetness — savory-sweet done right.' },
            { brand: 'D.S. & Durga', name: 'Pistachio', note: isKo ? '볶은 피스타치오를 중심으로 한 대담한 솔리노트 향수. 피라진의 고소함이 그대로 살아있는 니치 걸작이에요.' : 'A bold solinote fragrance built around roasted pistachio. The pyrazine-driven nuttiness is uncompromising — a niche masterpiece for the culinary-minded nose.' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="var(--sage)" />)}
        </div>
      </ArtSection>

    </div>
  );
};
