// About + FAQ page
window.About = function About({ lang, density }) {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "What does 'ana2me' mean?",
      a: "It's a play on three words: anatomy, analyze, and 'to me'. The idea is that understanding what's inside a product is only half the equation — the other half is understanding your own body. We sit at that intersection.",
    },
    {
      q: "Who is this for?",
      a: "For anyone who has ever bought something because an ad was convincing, an influencer raved about it, or it had a beautiful label — and then it just didn't work. If you've ever wished someone would just cut through the noise and tell you what's actually in the bottle and whether it's right for you, this is for you.",
    },
    {
      q: "What is the Analyzer?",
      a: "The Analyzer is a tool that lets you paste in an ingredient list — from any skincare, supplement, or wellness product — and get a plain-language breakdown of what's actually in it, what it does, and whether the formula makes sense for your concerns. It's currently in development and coming soon.",
    },
    {
      q: "Why do products work differently on different people?",
      a: "Because your skin microbiome, pH levels, sebum production, gut bacteria, hormone profile, and even diet are unique to you. A product optimized for combination skin in a humid climate behaves entirely differently on dry skin in a cold one. Marketing can't account for that. We try to give you the tools to.",
    },
    {
      q: "Will there be more features beyond articles and the Analyzer?",
      a: "Yes — we're building toward a platform where you can explore products by ingredient, track what works for your body over time, and get recommendations grounded in molecular data rather than marketing spend. We're moving deliberately, not fast.",
    },
  ];

  // Inject FAQPage JSON-LD
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
    <div className={cn('insights', `dens-${density}`)}>

      {/* Hero */}
      <header className="ins-hero" style={{ paddingTop: 12, paddingBottom: 24 }}>
        <Sticker color="ink" rotate={3}>about</Sticker>
        <h1 className="display">
          Know what's<br />
          <span className="display-accent">in your bottle<span className="display-dot">.</span></span>
        </h1>
        <p className="ins-sub" style={{ maxWidth: '54ch' }}>
          And whether it actually belongs in yours.
        </p>
      </header>

      {/* Mission */}
      <section style={{ maxWidth: 680, margin: '0 auto 72px' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'clamp(20px, 2.4vw, 26px)', lineHeight: 1.45, color: 'var(--ink)', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
            The beauty and wellness industry is very good at one thing: making you feel like you're missing something.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
            A new ingredient goes viral. An influencer swears by a supplement. A clinical-sounding label promises transformation. And so you buy — only to find it doesn't work the way it was supposed to. Not because the product is bad. But because no one told you whether it was right for <em>your</em> body.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
            <strong style={{ color: 'var(--ink)' }}>ana2me</strong> exists to change that. The name is a deliberate collision of three words — <em>anatomy</em>, <em>analyze</em>, and <em>to me</em>. Because the only analysis that matters is the one that accounts for who you actually are.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
            Our starting point is Korean beauty and wellness — an industry with some of the most rigorous formulation science in the world, and also some of the most aggressive marketing. K-beauty introduced ingredients like galactomyces, bifida ferment lysate, and PDRN to global audiences. We think those deserve a proper explanation, not just a trend cycle. Our coverage spans K-beauty and beyond: global skincare, fragrance, and food-based wellness — always through the same ingredient-first lens.
          </p>
        </div>

        {/* Coming soon callout */}
        <div style={{
          marginTop: 20,
          background: 'var(--cream-2)', border: '1px dashed var(--line)',
          borderRadius: 'var(--radius)', padding: '28px 36px',
          display: 'flex', gap: 18, alignItems: 'flex-start',
        }}>
          <Sticker color="butter" rotate={-3} style={{ flexShrink: 0 }}>coming soon</Sticker>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)', margin: 0 }}>
            The Insights library is just the beginning. We're developing a full ingredient Analyzer, personalized product matching, and category databases for skincare, fragrance, and wellness food — built on molecular data, not marketing.
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
                  <h2 className="ins-title" style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>{f.q}</h2>
                </div>
                <span className="ins-arrow"><Icon name={openFaq === i ? 'x' : 'plus'} size={16} /></span>
              </button>
              {openFaq === i && (
                <div className="ins-body">
                  <p className="ins-lede">{f.a}</p>
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>

    </div>
  );
};
