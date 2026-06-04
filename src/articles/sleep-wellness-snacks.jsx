import React from 'react';
import { ArtTlDr, ArtFigure, ArtSection, ArtSectionHeading, ArtBody, ArtCallout, ArtStatCard, ArtProdCard } from '../pages/insights';
// Article: Korea's Sleep-Wellness Snack Boom
export default function KoreaSleepWellnessSnacksBody({ lang }) {
  const isKo = lang === 'ko';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      <ArtTlDr>
        {isKo ? (
          <><strong>요약:</strong> 한국 수면 건강기능식품 매출이 전년 대비 300% 급증했어요. 핵심은 형태의 변화 — GABA, 마그네슘, 식물성 멜라토닌을 구미, 젤리, 맛있는 스틱 형태로 만들어 "먹는 즐거움"과 "건강 관리"를 동시에 잡는 전략이에요. 한국의 "헬시플레저" 트렌드가 만든 새로운 카테고리입니다.</>
        ) : (
          <><strong>TL;DR:</strong> Korea's sleep health food sales surged 300% year-over-year. The driver isn't new ingredients — it's new formats. GABA, magnesium, and plant-based melatonin repackaged as gummies, jellies, and flavored sticks blur the line between snack and supplement. Korea's "healthy pleasure" trend just created a new category.</>
        )}
      </ArtTlDr>

      <ArtFigure
        src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200"
        alt="Colorful wellness gummies and supplements arranged on a clean surface"
        isKo={isKo}
      />

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '왜 갑자기 수면 간식이 폭발했을까요?' : 'Why are sleep snacks suddenly everywhere?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>한국 건강기능식품 시장에서 가장 빠르게 성장하는 카테고리는 "수면"이에요. 식품의약품안전처에 따르면 수면 관련 건강기능식품 시장이 최근 수년간 폭발적으로 성장했고, 올리브영은 수면 카테고리 매출이 <strong>전년 대비 300% 증가</strong>했다고 발표했어요. 그런데 성분이 바뀐 게 아니에요. <mark>형태가 바뀐 거예요 — 알약에서 간식으로</mark>.</>
          ) : (
            <>The fastest-growing category in Korean health functional foods is sleep. Korea's Ministry of Food and Drug Safety data shows explosive growth in sleep-related supplements, and Olive Young reported <strong>300% year-over-year sales growth</strong> in its sleep category. But the ingredients didn't change. <mark>The format did — from pills to snacks</mark>.</>
          )}
        </ArtBody>
        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
          {(isKo ? [
            { title: '+300%', desc: '올리브영 수면 건강식품 매출 전년 대비 증가율' },
            { title: '₩11조', desc: '한국 전체 수면 시장 규모 (수면 산업 전체 포함)' },
            { title: '135만 명', desc: '한국의 수면 장애 진단 환자 수' },
          ] : [
            { title: '+300%', desc: 'Olive Young sleep supplement sales growth year-over-year' },
            { title: '₩11 trillion', desc: 'Korea\'s total sleep market size (all sleep products and services)' },
            { title: '1.35M', desc: 'Diagnosed sleep disorder patients in Korea' },
          ]).map((item, i) => <ArtStatCard key={i} {...item} />)}
        </ul>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '"헬시플레저"가 뭔가요?' : 'What is "Healthy Pleasure"?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <><strong>헬시플레저(Healthy Pleasure)</strong>는 2024~2026년 한국 웰니스 시장을 관통하는 핵심 트렌드예요. 건강 관리를 "참고 하는 것"이 아니라 "즐기면서 하는 것"으로 재정의하는 소비 철학이죠. MZ세대(밀레니얼+Z세대)에게 건강식품은 맛없는 알약이 아니라 <mark>SNS에 올리고 싶은 예쁘고 맛있는 간식</mark>이어야 해요.</>
          ) : (
            <><strong>Healthy Pleasure (헬시플레저)</strong> is the defining consumer philosophy of Korea's 2024-2026 wellness market. It reframes health management from "endure it" to "enjoy it." For Korea's MZ generation (Millennials + Gen Z), supplements shouldn't feel like medicine. They should be <mark>pretty, tasty snacks worth posting on Instagram</mark>.</>
          )}
        </ArtBody>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ArtCallout icon="🍬" title={isKo ? '구미(Gummy) 형태의 부상' : 'The rise of gummy format'} borderColor="rgba(245,215,110,0.4)" bgColor="rgba(245,215,110,0.08)">
            {isKo ? '전통적인 알약이나 캡슐 대신 구미젤리 형태의 건강기능식품이 MZ세대 사이에서 폭발적으로 성장하고 있어요. "약을 먹는다"는 심리적 부담 없이 간식처럼 즐길 수 있기 때문이에요. 올리브영의 구미 카테고리는 전체 건강식품 중 가장 높은 성장률을 기록했습니다.' : 'Instead of traditional pills or capsules, gummy-format supplements are exploding among Korea\'s MZ generation. No psychological burden of "taking medicine" — it feels like eating candy. Olive Young\'s gummy category has the highest growth rate among all health food formats.'}
          </ArtCallout>
          <ArtCallout icon="📦" title={isKo ? '스틱형 + 젤리형 = 휴대성' : 'Sticks + jellies = portability'} borderColor="rgba(107,142,107,0.25)" bgColor="rgba(107,142,107,0.06)">
            {isKo ? '1회분씩 개별 포장된 스틱이나 젤리는 가방에 넣고 다니기 좋아요. 자기 전 침대에서, 야근 후 퇴근길에, 여행 중에도 물 없이 바로 먹을 수 있는 형태예요. "편의성"이 MZ세대 건강식품 구매의 최우선 기준이 됐습니다.' : 'Individually wrapped sticks and jellies fit in a bag. You can eat them in bed before sleep, on the subway after overtime, or while traveling — no water needed. "Convenience" has become the top purchase criterion for MZ generation health foods.'}
          </ArtCallout>
        </div>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '수면 간식 속 핵심 성분들' : 'The science inside sleep snacks'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>형태는 간식이지만 안에 든 성분은 진짜예요. 한국 식품의약품안전처가 수면 건강에 대한 기능성을 인정한 원료들이 주로 사용됩니다. <mark>핵심은 GABA, L-테아닌, 식물성 멜라토닌, 마그네슘 네 가지</mark>예요.</>
          ) : (
            <>The format is a snack, but the ingredients are real. Korea's MFDS (Ministry of Food and Drug Safety) has approved specific ingredients for sleep health functionality claims. <mark>The core four: GABA, L-theanine, plant-based melatonin, and magnesium</mark>.</>
          )}
        </ArtBody>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 22 }}>
          {(isKo ? [
            { title: 'GABA (감마아미노뷰티르산)', body: '뇌의 흥분을 가라앉히는 억제성 신경전달물질이에요. 경구 복용 시 수면 잠복기(잠들기까지 걸리는 시간)를 줄이고 비렘(NREM) 수면의 질을 높인다는 임상 연구가 있어요. 한국에서는 100~300mg이 일반적 용량이에요.' },
            { title: 'L-테아닌 (L-Theanine)', body: '녹차에서 발견되는 아미노산으로, 뇌파 중 알파파를 증가시켜 이완을 유도해요. 졸음을 유발하지 않으면서 수면의 질을 개선하는 게 특징이에요. GABA와 함께 복합 배합되는 경우가 많습니다.' },
            { title: '식물성 멜라토닌', body: '한국에서 합성 멜라토닌은 의약품이라 건강기능식품에 사용 불가해요. 대안으로 피스타치오, 타르트 체리, 쌀눈 등에서 추출한 천연 멜라토닌이 각광받고 있어요. 0.3~1mg 수준으로 함유됩니다.' },
            { title: '마그네슘 (Magnesium)', body: 'GABA 수용체 활성화를 돕고 코르티솔(스트레스 호르몬)을 조절하는 미네랄이에요. 수면 뿐 아니라 근이완에도 효과가 있어서 "잠들기 전 마그네슘" 루틴이 SNS에서 유행하고 있어요.' },
          ] : [
            { title: 'GABA (Gamma-Aminobutyric Acid)', body: 'An inhibitory neurotransmitter that calms brain excitability. Clinical studies show oral GABA reduces sleep latency (time to fall asleep) and improves NREM sleep quality. Korean products typically contain 100-300mg per serving.' },
            { title: 'L-Theanine', body: 'An amino acid found in green tea that increases alpha brain waves, promoting relaxation without drowsiness. Often combined with GABA for synergistic effects. It improves sleep quality without next-day grogginess.' },
            { title: 'Plant-based Melatonin', body: 'Synthetic melatonin is classified as medicine in Korea and cannot be used in health foods. Natural melatonin extracted from pistachios, tart cherries, or rice germ is the legal alternative. Products contain 0.3-1mg per serving.' },
            { title: 'Magnesium', body: 'A mineral that activates GABA receptors and regulates cortisol (the stress hormone). Aids both sleep onset and muscle relaxation. The "magnesium before bed" routine has gone viral on Korean social media.' },
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
          {isKo ? '올리브영이 바꾼 규칙' : 'How Olive Young rewrote the rules'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>올리브영은 수면 건강식품을 약국 코너가 아니라 <strong>간식 코너 옆에 진열</strong>하는 전략을 택했어요. "건강기능식품"이라는 무거운 카테고리명 대신 "슬립 케어"라는 라이프스타일 프레이밍을 사용하고, 패키징도 캔디처럼 컬러풀하고 귀엽게 디자인됐어요. <mark>구매 결정에서 "효능"보다 "경험"이 먼저 오도록 설계한 거예요</mark>.</>
          ) : (
            <>Olive Young made a strategic choice: display sleep supplements <strong>next to the snack aisle, not the pharmacy section</strong>. Instead of the heavy "health functional food" label, they use "sleep care" — a lifestyle framing. Packaging is candy-colored and cute. <mark>The purchase decision is designed so "experience" comes before "efficacy"</mark>.</>
          )}
        </ArtBody>
        <ArtBody>
          {isKo ? (
            <>CJ 올리브영의 2026년 뷰티 트렌드 키워드 "F.U.L.L.M.O.O.N"에서 핵심은 즐거운 자기관리예요. 수면은 더 이상 "부족하면 병원 가는 것"이 아니라 "매일 밤 스스로에게 주는 작은 보상"이 됐어요. 이 관점의 전환이 300% 성장을 만들었습니다.</>
          ) : (
            <>CJ Olive Young's 2026 beauty trend keyword "F.U.L.L.M.O.O.N" centers on joyful self-care. Sleep is no longer "see a doctor if you're sleep-deprived." It's "a small nightly reward you give yourself." This perspective shift — from medical necessity to daily ritual — drove the 300% growth.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '정말 효과가 있을까요?' : 'Do they actually work?'}
        </ArtSectionHeading>
        <ArtBody>
          {isKo ? (
            <>솔직하게 말하면 — 성분 자체의 효능은 임상 연구로 뒷받침돼요. GABA 100mg 복용 시 수면 잠복기가 평균 5.3분 단축됐다는 일본 연구(Pharma Foods International), L-테아닌 200mg이 수면의 질 지표를 개선했다는 연구 등이 있어요. 다만 구미나 젤리 형태에서 <strong>실제 흡수율</strong>이 캡슐과 동일한지는 아직 추가 연구가 필요한 영역이에요.</>
          ) : (
            <>Honestly — the ingredients themselves are backed by clinical research. A Japanese study (Pharma Foods International) showed 100mg GABA reduced average sleep latency by 5.3 minutes. 200mg L-theanine has been shown to improve sleep quality metrics. The caveat: whether <strong>actual bioavailability</strong> in gummy or jelly format equals capsule delivery is an area still needing more research.</>
          )}
        </ArtBody>
        <ArtBody>
          {isKo ? (
            <>또 하나 중요한 점 — 이 제품들은 수면 장애 치료제가 아니에요. 만성 불면증이라면 전문의 상담이 먼저예요. 수면 간식은 "잠드는 데 도움을 주는 가벼운 루틴"으로 자리잡은 거지, 의약품을 대체하는 건 아닙니다.</>
          ) : (
            <>One more important note — these products aren't treatments for sleep disorders. If you have chronic insomnia, see a specialist first. Sleep snacks occupy the space of "a gentle routine aid for falling asleep" — they don't replace medication.</>
          )}
        </ArtBody>
      </ArtSection>

      <ArtSection>
        <ArtSectionHeading>
          {isKo ? '✨ 추천 제품' : '✨ Products worth trying'}
        </ArtSectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
          {[
            { brand: 'GREEN MONSTER', name: 'MELADAY 구미 (Plant Melatonin Gummy)', note: isKo ? '타르트 체리 유래 식물성 멜라토닌 + GABA 배합. 올리브영 수면 간식 베스트셀러. 포도맛 구미 형태로 간식처럼 먹어요.' : 'Tart cherry-derived plant melatonin + GABA. Olive Young sleep snack bestseller. Grape-flavored gummy format that feels like candy.' },
            { brand: 'LACTO-FIT', name: '슬립핏 마그네슘 젤리 (SleepFit Magnesium Jelly)', note: isKo ? '종근당건강의 마그네슘 + L-테아닌 복합 젤리. 스틱 포장으로 휴대 간편하고, 요거트맛이라 부담 없어요.' : 'Chong Kun Dang Health\'s magnesium + L-theanine jelly. Stick packaging for portability, yogurt-flavored for easy consumption.' },
            { brand: '정관장', name: 'Good Night GABA Stick', note: isKo ? 'GABA 300mg + 홍삼 추출물 조합의 액상 스틱. 물 없이 바로 마시는 형태. 120년 전통 브랜드의 수면 라인이에요.' : 'GABA 300mg + red ginseng extract in liquid stick format. Drink directly without water. A sleep line from Korea\'s 120-year heritage brand.' },
          ].map((prod, i) => <ArtProdCard key={i} {...prod} accentColor="#a07850" />)}
        </div>
      </ArtSection>

    </div>
  );
};
