// About + FAQ page
import React, { useState, useEffect, useRef } from 'react';
import { cn, useL, Icon, Sticker, Reveal } from '../components/primitives';
import SEO from '../lib/seo';

export default function About({ lang, density }) {
  const [openFaq, setOpenFaq] = useState(null);
  const isKo = lang === 'ko';
  const t = useL(lang);
  const aboutRef = useRef(null);

  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;

    if (!document.getElementById('ana2me-highlight-style')) {
      const style = document.createElement('style');
      style.id = 'ana2me-highlight-style';
      style.textContent = `
        @keyframes ana2me-sweep {
          from { background-size: 0% 85%; }
          to   { background-size: 100% 85%; }
        }
        mark {
          background: none;
          color: inherit;
        }
        .ana2me-hl {
          background-image: linear-gradient(rgba(100, 176, 120, 0.32), rgba(100, 176, 120, 0.32));
          background-repeat: no-repeat;
          background-position: left center;
          background-size: 0% 88%;
          animation: ana2me-sweep 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          border-radius: 2px;
        }
      `;
      document.head.appendChild(style);
    }

    const marks = Array.from(el.querySelectorAll('mark'));
    const delays = [300, 700, 1100];

    marks.forEach((m, i) => {
      setTimeout(() => {
        m.classList.remove('ana2me-hl');
        void m.offsetWidth;
        m.classList.add('ana2me-hl');
      }, delays[i] || (300 + i * 400));
    });
  }, []);

  const faqs = [
    {
      q: "What does 'ana2me' mean?",
      qKo: "'ana2me'는 무슨 뜻인가요?",
      a: "It's a play on three words: anatomy, analyze, and 'to me'. The idea is that understanding what's inside a product is only half the equation — the other half is understanding your own body. We sit at that intersection.",
      aKo: "세 단어를 합쳤어요 — anatomy(해부), analyze(분석), 그리고 'to me(나에게)'. 제품 속에 뭐가 들었는지 아는 게 절반이고, 그게 내 몸에 맞는지 아는 게 나머지 절반이에요. 저희는 그 둘이 만나는 지점에 있습니다.",
    },
    {
      q: "Who is this for?",
      qKo: "누구를 위한 사이트인가요?",
      a: "For anyone who has ever bought something because an ad was convincing, an influencer raved about it, or it had a beautiful label — and then it just didn't work. If you've ever wished someone would just cut through the noise and tell you what's actually in the bottle and whether it's right for you, this is for you.",
      aKo: "광고가 설득력 있어서, 인플루언서가 극찬해서, 패키지가 예뻐서 샀는데 결국 효과가 없었던 경험이 있는 분들을 위한 공간이에요. '이 제품 뭐가 들어있고 내 피부에 맞는 건지' 누군가 솔직하게 알려줬으면 했던 분이라면, 여기가 맞는 곳입니다.",
    },
    {
      q: "What is the Analyzer?",
      qKo: "Analyzer가 뭔가요?",
      a: "The Analyzer is a tool that lets you paste in an ingredient list — from any skincare, supplement, or wellness product — and get a plain-language breakdown of what's actually in it, what it does, and whether the formula makes sense for your concerns. It's currently in development and coming soon.",
      aKo: "어떤 스킨케어, 보충제, 웰니스 제품이든 성분표를 붙여넣으면 — 각 성분이 뭔지, 어떤 역할을 하는지, 내 피부 고민에 맞는 포뮬러인지 쉬운 언어로 분석해주는 도구예요. 현재 개발 중이며 곧 출시됩니다.",
    },
    {
      q: "Why do products work differently on different people?",
      qKo: "같은 제품이 사람마다 다르게 반응하는 이유가 뭔가요?",
      a: "Because your skin microbiome, pH levels, sebum production, gut bacteria, hormone profile, and even diet are unique to you. A product optimized for combination skin in a humid climate behaves entirely differently on dry skin in a cold one. Marketing can't account for that. We try to give you the tools to.",
      aKo: "피부 마이크로바이옴, pH, 피지량, 장내 세균, 호르몬, 심지어 식습관까지 사람마다 전부 달라요. 습한 기후의 복합성 피부에 맞춘 제품이 추운 지역 건성 피부에선 전혀 다르게 작용해요. 마케팅이 이걸 반영할 수는 없죠. 저희는 스스로 판단할 수 있는 도구를 드리고 싶습니다.",
    },
    {
      q: "Will there be more features beyond articles and the Analyzer?",
      qKo: "아티클과 Analyzer 외에 더 많은 기능이 생기나요?",
      a: "Yes — we're building toward a platform where you can explore products by ingredient, track what works for your body over time, and get recommendations grounded in molecular data rather than marketing spend. We're moving deliberately, not fast.",
      aKo: "네 — 성분별로 제품을 탐색하고, 내 몸에 맞는 걸 기록하면서 추적하고, 광고비가 아니라 분자 데이터로 추천받을 수 있는 플랫폼을 만들고 있어요. 빠르게보다는 제대로, 하나씩 만들어가고 있습니다.",
    },
  ];

  // Inject FAQPage JSON-LD (always English for SEO)
  useEffect(() => {
    const existing = document.getElementById('ld-faq');
    if (existing) existing.parentNode.removeChild(existing);
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'ld-faq';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(f => ({
        '@type': 'Question',
        'name': f.q,
        'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
      })),
    });
    document.head.appendChild(script);
    if (SEO) SEO.setAbout();
    return () => {
      const el = document.getElementById('ld-faq');
      if (el) el.parentNode.removeChild(el);
    };
  }, []);

  return (
    <div ref={aboutRef} className={cn('insights', `dens-${density}`)}>

      {/* Hero */}
      <header className="ins-hero">
        <Sticker color="ink" rotate={3}>{t('about', '소개')}</Sticker>
        <h1 className="display">
          {isKo ? <>보틀 속의<br /><span className="display-accent">진실<span className="display-dot">.</span></span></> : <>Know what's<br /><span className="display-accent">in your bottle<span className="display-dot">.</span></span></>}
        </h1>
        <p className="ins-sub" style={{ maxWidth: '54ch' }}>
          {t('And whether it actually belongs in yours.', '유행하는 성분이 아닌, 내 몸에 맞는 성분을 찾으세요.')}
        </p>
      </header>

      {/* Mission */}
      <section style={{ maxWidth: 780, margin: '0 auto 72px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(20px, 2.4vw, 26px)', lineHeight: 1.45, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
            {t(
              'The beauty and wellness industry is very good at one thing: making you feel like you\'re missing something.',
              '뷰티와 웰니스 업계가 가장 잘하는 건 하나예요. 뭔가 부족하다는 불안감을 만드는 것.'
            )}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
            {isKo ? (
              <>새 성분이 바이럴되고, 인플루언서가 보충제를 극찬하고, 있어 보이는 라벨이 변화를 약속해요. 그래서 사지만 — 기대만큼 효과가 없어요. 제품 탓이 아니에요. <mark>그게 <em>내</em> 몸에 맞는 건지 아무도 말해준 적이 없으니까요.</mark></>
            ) : (
              <>A new ingredient goes viral. An influencer swears by a supplement. A clinical-sounding label promises transformation. And so you buy — only to find it doesn't work the way it was supposed to. Not because the product is bad. <mark>But because no one told you whether it was right for <em>your</em> body.</mark></>
            )}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
            {isKo ? (
              <><strong style={{ color: 'var(--ink)' }}>ana2me</strong>는 그걸 바꾸려고 만들었어요. 이름은 세 단어를 합친 거예요 — <em>anatomy(해부)</em>, <em>analyze(분석)</em>, 그리고 <em>to me(나에게)</em>. <mark>내 몸을 모르고 하는 분석은 의미가 없으니까요.</mark></>
            ) : (
              <><strong style={{ color: 'var(--ink)' }}>ana2me</strong> exists to change that. The name is a deliberate collision of three words — <em>anatomy</em>, <em>analyze</em>, and <em>to me</em>. <mark>Because the only analysis that matters is the one that accounts for who you actually are.</mark></>
            )}
          </p>
          <div style={{ margin: '32px 0', textAlign: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1444 390" preserveAspectRatio="xMidYMid meet" role="img" aria-label="ANA2ME logo" style={{ height: 48, width: 'auto', display: 'inline-block', opacity: 0.8 }}>
              <g transform="translate(0,390) scale(1,-1)" fill="#111111" stroke="none" fillRule="evenodd">
                <path d="M134 285 c0 -1 -17 -46 -37 -100 l-36 -98 18 -1 c10 0 18 0 18 1 0 0 4 11 8 24 l9 23 40 0 40 0 8 -24 8 -24 19 0 18 0 -2 5 c-8 22 -69 190 -70 193 l-1 3 -20 0 c-17 0 -19 0 -20 -2z m35 -81 c8 -23 15 -43 15 -43 -1 0 -14 0 -31 0 l-30 1 15 42 c9 24 16 43 16 43 0 -1 7 -20 15 -43z M280 187 l0 -101 17 0 18 0 0 72 1 73 48 -73 48 -72 17 0 17 0 0 101 0 100 -17 0 -17 0 0 -72 0 -72 -49 72 -48 72 -18 0 -17 0 0 -100z M517 187 c-20 -54 -37 -100 -37 -100 0 -1 8 -1 18 -1 l18 0 7 20 c3 11 7 21 8 24 l2 4 40 0 40 0 7 -23 c5 -13 9 -24 9 -24 0 -1 8 -1 19 -1 l18 1 -25 66 c-13 36 -29 81 -36 100 l-13 34 -19 0 -19 0 -37 -100z m71 16 l15 -41 -30 -1 c-17 0 -30 0 -31 0 0 0 26 75 30 84 0 1 0 1 1 1 0 -1 7 -20 15 -43z M951 187 l0 -101 17 0 17 0 0 71 1 71 28 -57 29 -56 13 -1 14 0 28 57 29 58 0 -72 0 -71 17 0 17 0 0 101 0 100 -20 0 -21 0 -31 -64 c-17 -35 -32 -64 -32 -64 -1 -1 -15 28 -33 63 l-32 65 -20 0 -21 0 0 -100z M1208 187 l0 -101 65 0 65 0 0 14 0 14 -48 0 -48 0 0 30 1 31 43 0 43 0 0 14 0 13 -43 0 -44 0 0 29 0 29 48 0 48 0 0 14 0 13 -65 0 -65 0 0 -100z" />
              </g>
              <g transform="translate(0,390) scale(1,-1)" fill="#1F4435" stroke="none" fillRule="evenodd">
                <path d="M793 353 c-17 -2 -35 -9 -49 -18 -7 -6 -17 -16 -21 -23 -7 -13 -8 -25 -3 -35 3 -7 7 -11 14 -12 11 -3 21 1 28 11 2 4 2 5 2 13 0 7 0 9 -2 14 -3 5 -3 5 -2 7 8 13 24 20 41 19 10 -1 16 -3 22 -9 6 -5 10 -12 13 -20 2 -9 2 -33 0 -42 -2 -6 -11 -26 -12 -27 0 0 -2 -3 -4 -6 -6 -9 -19 -24 -29 -34 -5 -5 -9 -9 -10 -9 0 0 -32 -29 -38 -35 -23 -25 -36 -51 -39 -78 l0 -8 88 0 c49 0 89 0 89 1 1 0 2 14 4 31 3 28 3 30 1 31 -1 1 -5 1 -11 1 l-9 0 0 -3 c0 -10 -6 -18 -14 -22 -5 -1 -8 -1 -50 -1 -24 0 -47 0 -51 1 l-6 1 4 6 c1 4 3 8 3 8 0 1 2 3 3 5 2 2 7 7 11 12 8 9 24 23 44 39 16 12 38 33 47 42 13 14 24 28 24 31 0 0 0 1 1 1 1 0 7 13 9 22 2 7 2 10 2 20 -1 6 -2 13 -2 16 -3 8 -9 19 -14 25 -6 7 -18 15 -24 17 -2 1 -5 2 -7 3 -10 4 -38 7 -53 5z" />
              </g>
            </svg>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
            {isKo ? (
              <>시작은 한국 뷰티와 웰니스예요 — <mark>세계에서 가장 정교한 포뮬레이션 과학과, 가장 공격적인 마케팅이 공존하는 산업.</mark> K-뷰티가 갈락토미세스, 비피다 발효물, PDRN 같은 성분을 세계에 알렸잖아요. 저희는 이런 성분들이 유행이 아니라 제대로 된 설명을 받아야 한다고 생각합니다. 다루는 범위는 K-뷰티를 넘어 글로벌 스킨케어, 향수, 식품 웰니스까지 — 언제나 성분 중심으로.</>
            ) : (
              <>Our starting point is Korean beauty and wellness — <mark>an industry with some of the most rigorous formulation science in the world, and also some of the most aggressive marketing.</mark> K-beauty introduced ingredients like galactomyces, bifida ferment lysate, and PDRN to global audiences. We think those deserve a proper explanation, not just a trend cycle. Our coverage spans K-beauty and beyond: global skincare, fragrance, and food-based wellness — always through the same ingredient-first lens.</>
            )}
          </p>
        </div>

        {/* Analyzer CTA */}
        <Reveal>
          <a href="/analyzer" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/analyzer'); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0,0); }}
            style={{
              display: 'flex', flexDirection: 'column', gap: 10,
              padding: '24px 22px', marginTop: 20,
              background: 'var(--accent)', color: '#fff',
              borderRadius: 'var(--radius)', textDecoration: 'none',
              transition: 'all .15s ease',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>🔬</span>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>
                {t('Ingredient Analyzer', '성분 분석기')}
              </span>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.2)', opacity: 0.9 }}>
                Beta
              </span>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 'var(--radius-pill)', background: 'rgba(245,215,110,0.5)', color: '#fff' }}>
                {t('Free', '무료')}
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(18px, 2.4vw, 22px)', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              {t('Find your ingredient pattern', '나에게 맞는 성분 패턴 찾기')}
            </span>
            <span style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.8 }}>
              {t("Tell us what works and what doesn't for your skin — we'll find the pattern.", '내 피부에 맞는 것과 안 맞는 것을 알려주세요. 패턴을 찾아드립니다.')}
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', marginTop: 4,
              background: '#fff', color: 'var(--accent)',
              borderRadius: 'var(--radius-pill)',
              fontSize: 13, fontWeight: 700, alignSelf: 'flex-start',
            }} className="cta-shake">
              {t('Try the analyzer', '분석기 사용하기')} →
            </span>
          </a>
        </Reveal>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 780, margin: '0 auto 80px' }}>
        <div style={{ marginBottom: 32 }}>
          <Sticker color="sage" rotate={-2}>FAQ</Sticker>
        </div>
        <ol className="ins-list" style={{ maxWidth: '100%' }}>
          {faqs.map((f, i) => (
            <li key={i} className={cn('ins-item', openFaq === i && 'ins-open')}>
              <button className="ins-card" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="ins-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="ins-content">
                  <h2 className="ins-title" style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>{isKo ? f.qKo : f.q}</h2>
                </div>
                <span className="ins-arrow"><Icon name={openFaq === i ? 'x' : 'plus'} size={16} /></span>
              </button>
              {openFaq === i && (
                <div className="ins-body">
                  <p className="ins-lede">{isKo ? f.aKo : f.a}</p>
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

    </div>
  );
}
