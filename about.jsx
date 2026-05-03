// About + FAQ page
window.About = function About({ lang, density }) {
  const [openFaq, setOpenFaq] = useState(null);
  const isKo = lang === 'ko';
  const t = useL(lang);
  const aboutRef = React.useRef(null);

  React.useEffect(() => {
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
      aKo: "세 단어의 조합이에요 — anatomy(해부), analyze(분석), 그리고 'to me(나에게)'. 제품 안에 뭐가 들었는지 아는 것이 절반이라면, 나머지 절반은 내 몸을 이해하는 거예요. 저희는 그 교차점에 있습니다.",
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
      aKo: "피부 마이크로바이옴, pH, 피지 분비량, 장내 세균, 호르몬 프로필, 심지어 식습관까지 — 이 모든 것이 사람마다 다르기 때문이에요. 습한 기후의 복합성 피부에 최적화된 제품이 추운 지역의 건성 피부에는 전혀 다르게 작용합니다. 마케팅은 이걸 반영할 수 없어요. 저희는 여러분이 스스로 판단할 수 있는 도구를 드리려고 합니다.",
    },
    {
      q: "Will there be more features beyond articles and the Analyzer?",
      qKo: "아티클과 Analyzer 외에 더 많은 기능이 생기나요?",
      a: "Yes — we're building toward a platform where you can explore products by ingredient, track what works for your body over time, and get recommendations grounded in molecular data rather than marketing spend. We're moving deliberately, not fast.",
      aKo: "네 — 성분으로 제품을 탐색하고, 내 몸에 맞는 것들을 시간을 두고 추적하며, 마케팅 예산이 아닌 분자 데이터 기반 추천을 받을 수 있는 플랫폼을 만들어가고 있어요. 빠르게보다는, 제대로 만들고 있습니다.",
    },
  ];

  // Inject FAQPage JSON-LD (always English for SEO)
  React.useEffect(() => {
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
    if (window.SEO) window.SEO.setAbout();
    return () => {
      const el = document.getElementById('ld-faq');
      if (el) el.parentNode.removeChild(el);
    };
  }, []);

  return (
    <div ref={aboutRef} className={cn('insights', `dens-${density}`)}>

      {/* Hero */}
      <header className="ins-hero" style={{ paddingTop: 12, paddingBottom: 24 }}>
        <Sticker color="ink" rotate={3}>{t('about', '소개')}</Sticker>
        <h1 className="display">
          {isKo ? <>무엇이<br /><span className="display-accent">들어있는지<span className="display-dot">.</span></span></> : <>Know what's<br /><span className="display-accent">in your bottle<span className="display-dot">.</span></span></>}
        </h1>
        <p className="ins-sub" style={{ maxWidth: '54ch' }}>
          {t('And whether it actually belongs in yours.', '그리고 그게 나에게 맞는 건지.')}
        </p>
      </header>

      {/* Mission */}
      <section style={{ maxWidth: 680, margin: '0 auto 72px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(20px, 2.4vw, 26px)', lineHeight: 1.45, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
            {t(
              'The beauty and wellness industry is very good at one thing: making you feel like you\'re missing something.',
              '뷰티와 웰니스 산업은 한 가지를 매우 잘합니다. 당신이 뭔가를 놓치고 있다는 느낌을 만드는 것.'
            )}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
            {isKo ? (
              <>새로운 성분이 바이럴되고, 인플루언서는 보충제를 극찬하고, 임상적인 라벨은 변화를 약속합니다. 그렇게 구매하지만 — 기대했던 대로 작동하지 않아요. 제품이 나빠서가 아니라. <mark>아무도 그게 <em>내</em> 몸에 맞는지 알려주지 않았기 때문이에요.</mark></>
            ) : (
              <>A new ingredient goes viral. An influencer swears by a supplement. A clinical-sounding label promises transformation. And so you buy — only to find it doesn't work the way it was supposed to. Not because the product is bad. <mark>But because no one told you whether it was right for <em>your</em> body.</mark></>
            )}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
            {isKo ? (
              <><strong style={{ color: 'var(--ink)' }}>ana2me</strong>는 그것을 바꾸기 위해 존재해요. 이름은 세 단어의 의도적인 충돌입니다 — <em>anatomy(해부)</em>, <em>analyze(분석)</em>, 그리고 <em>to me(나에게)</em>. <mark>중요한 유일한 분석은 당신이 실제로 누구인지를 고려한 것이니까요.</mark></>
            ) : (
              <><strong style={{ color: 'var(--ink)' }}>ana2me</strong> exists to change that. The name is a deliberate collision of three words — <em>anatomy</em>, <em>analyze</em>, and <em>to me</em>. <mark>Because the only analysis that matters is the one that accounts for who you actually are.</mark></>
            )}
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
            {isKo ? (
              <>저희의 출발점은 한국 뷰티와 웰니스입니다 — <mark>세계에서 가장 엄격한 포뮬레이션 과학을 가진 동시에, 가장 공격적인 마케팅을 구사하는 산업.</mark> K-뷰티는 갈락토미세스, 비피다 발효 추출물, PDRN 같은 성분을 글로벌 시장에 소개했어요. 저희는 그것들이 트렌드 사이클이 아닌 제대로 된 설명을 받을 자격이 있다고 생각합니다. 저희 커버리지는 K-뷰티를 넘어 글로벌 스킨케어, 향수, 식품 기반 웰니스까지 — 항상 같은 성분 중심적 관점으로.</>
            ) : (
              <>Our starting point is Korean beauty and wellness — <mark>an industry with some of the most rigorous formulation science in the world, and also some of the most aggressive marketing.</mark> K-beauty introduced ingredients like galactomyces, bifida ferment lysate, and PDRN to global audiences. We think those deserve a proper explanation, not just a trend cycle. Our coverage spans K-beauty and beyond: global skincare, fragrance, and food-based wellness — always through the same ingredient-first lens.</>
            )}
          </p>
        </div>

        {/* Coming soon callout */}
        <div style={{
          marginTop: 20,
          background: 'var(--cream-2)', border: '1px dashed var(--line)',
          borderRadius: 'var(--radius)', padding: '28px 36px',
          display: 'flex', gap: 18, alignItems: 'flex-start',
        }}>
          <Sticker color="butter" rotate={-3} style={{ flexShrink: 0 }}>{t('coming soon', '곧 출시')}</Sticker>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0 }}>
            {t(
              "The Insights library is just the beginning. We're developing a full ingredient Analyzer, personalized product matching, and category databases for skincare, fragrance, and wellness food — built on molecular data, not marketing.",
              '인사이트 라이브러리는 시작에 불과해요. 전체 성분 Analyzer, 개인화된 제품 매칭, 그리고 스킨케어·향수·웰니스 푸드 카테고리 데이터베이스를 개발 중입니다 — 마케팅이 아닌 분자 데이터 기반으로.'
            )}
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 680, margin: '0 auto 80px' }}>
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
};
