
// Profanity filter — masks explicit words with ****
const PROFANITY_LIST = [
  // English
  'fuck','shit','ass','bitch','dick','cock','pussy','bastard','damn','crap',
  'asshole','bullshit','motherfucker','wtf','stfu','lmao','penis','vagina',
  'slut','whore','porn','sexy','nude','naked','boob','tits',
  // Korean
  '시발','씨발','씨빨','ㅅㅂ','ㅆㅂ','병신','ㅂㅅ','지랄','ㅈㄹ','개새끼',
  '미친','ㅁㅊ','좆','씹','꺼져','닥쳐','년','놈','새끼','개같',
];
function filterProfanity(text) {
  let filtered = text;
  for (const word of PROFANITY_LIST) {
    const re = new RegExp(word, 'gi');
    filtered = filtered.replace(re, '*'.repeat(word.length));
  }
  return filtered;
}
function containsUrl(text) {
  return /https?:\/\/|www\.|\.com|\.co|\.kr|\.net|\.org|\.io/i.test(text);
}

// Scrollable list with fade-out hint at bottom
function IngScrollFade({ children }) {
  const wrapRef = useRef(null);
  const scrollRef = useRef(null);
  const items = React.Children.toArray(children);
  const needsFade = items.length > 4;

  useEffect(() => {
    const el = scrollRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap || !needsFade) return;
    const onScroll = () => {
      const atEnd = el.scrollHeight - el.scrollTop - el.clientHeight < 10;
      wrap.classList.toggle('scrolled-end', atEnd);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [needsFade]);

  return (
    <div ref={wrapRef} className={cn('ing-scroll-wrap', !needsFade && 'scrolled-end')}>
      <div className="ing-scroll" ref={scrollRef}>
        {children}
      </div>
    </div>
  );
}

// Product detail page — editorial long-read
window.Detail = function Detail({ product, lang, setView, setProduct, density }) {
  const t = useL(lang);
  const [selIng, setSelIng] = useState(null);
  const [selNote, setSelNote] = useState(null);
  const [selBio, setSelBio] = useState(null);
  const [saved, setSaved] = window.useLocalState('saved', {});
  const [savedIngs, setSavedIngs] = window.useLocalState('savedIngs', {});
  const isSaved = !!saved[product.id];

  const isFragrance = product.category === 'fragrance';
  const isSkincare = product.category === 'skincare';
  const detailRef = useRef(null);

  // Set SEO tags for product page
  useEffect(() => {
    if (window.SEO && window.SEO.setProduct) window.SEO.setProduct(product, lang);
  }, [product.id, lang]);

  // Floating share bar
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowShare(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Wrap quoted text and key phrases in <mark> for highlight animation
  const markUp = (text) => {
    // Match quoted strings ("..." or \"...\")
    const parts = text.split(/([""][^""]+[""]|「[^」]+」)/g);
    if (parts.length > 1) {
      return parts.map((p, i) => /^["「"]/.test(p) ? <mark key={i}>{p}</mark> : p);
    }
    // If no quotes, wrap text after an em dash or colon as the key phrase
    const dashSplit = text.split(/(—.+$|：.+$)/);
    if (dashSplit.length > 1) {
      return dashSplit.map((p, i) => /^[—：]/.test(p) ? <mark key={i}>{p}</mark> : p);
    }
    return text;
  };

  // Scroll-triggered highlight sweep for fun facts + summary items
  useEffect(() => {
    const container = detailRef.current;
    if (!container) return;

    // Inject keyframe once
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

    const getTargets = () => [
      ...container.querySelectorAll('.fact-body mark'),
    ];
    const seen = new Set();
    const TRIGGER = window.innerHeight * 0.62;

    const handleScroll = () => {
      getTargets().forEach(el => {
        if (seen.has(el)) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < TRIGGER) {
          seen.add(el);
          el.classList.remove('ana2me-hl');
          void el.offsetWidth;
          el.classList.add('ana2me-hl');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      getTargets().forEach(el => el.classList.remove('ana2me-hl'));
    };
  }, [product.id]);

  const name = lang === 'ko' && product.nameKo ? product.nameKo : product.name;

  // Data — some products use product.tagline (old shape), newer use product.summary.tagline
  const summary = product.summary || {};
  const tag =
    (lang === 'ko' && (summary.taglineKo || product.taglineKo)) ||
    summary.tagline || product.tagline || '';
  const benefits = (lang === 'ko' ? (summary.benefitsKo || product.benefitsKo) : (summary.benefits || product.benefits)) || [];
  const concerns = (lang === 'ko' ? (summary.concernsKo || product.concernsKo) : (summary.concerns || product.concerns)) || [];
  const usage = (lang === 'ko' ? (summary.usageKo) : summary.usage) || '';

  const catLabel = {
    'skincare': { en: 'Skincare', ko: '스킨케어' },
    'fragrance': { en: 'Fragrance', ko: '향수' },
    'wellness-food': { en: 'Wellness', ko: '웰니스' },
  }[product.category];

  // Fragrance: group notes by type
  const notes = product.notes || [];
  const notesByType = {
    top: notes.filter(n => n.type === 'top'),
    heart: notes.filter(n => n.type === 'heart'),
    base: notes.filter(n => n.type === 'base'),
  };

  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewsShown, setReviewsShown] = useState(3);
  const reviewCount = reviews.length;

  // Quick rating — autofills review form and scrolls to it
  const [quickRated, setQuickRated] = useState(0);
  const submitQuickRating = (stars) => {
    if (quickRated) return;
    setQuickRated(stars);
    setReviewRating(stars);
    setShowReviewForm(true);
    setTimeout(() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  useEffect(() => {
    setReviewLoading(true);
    window.__supabase.fetchReviews(product.id).then(function(data) {
      setReviews(data);
      setReviewLoading(false);
    }).catch(function() { setReviewLoading(false); });
  }, [product.id]);

  const submitReview = () => {
    setReviewError('');
    if (reviewRating === 0) { setReviewError(t('Please select a rating.', '별점을 선택해주세요.')); return; }
    if (reviewBody.trim().length < 5) { setReviewError(t('Review must be at least 5 characters.', '리뷰는 최소 5자 이상이어야 해요.')); return; }
    if (containsUrl(reviewBody) || containsUrl(reviewAuthor)) { setReviewError(t('URLs are not allowed in reviews.', '리뷰에 URL을 포함할 수 없어요.')); return; }
    // Honeypot check
    const hp = document.getElementById('rev-hp');
    if (hp && hp.value) return;
    // Rate limit
    const rlKey = 'rl_' + product.id;
    const lastSubmit = localStorage.getItem(rlKey);
    if (lastSubmit) {
      setReviewError(t('You already reviewed this product.', '이 제품에 이미 리뷰를 작성했어요.'));
      return;
    }
    setReviewSubmitting(true);
    window.__supabase.submitReview({
      product_id: product.id,
      author: filterProfanity(reviewAuthor.trim()) || 'Anonymous',
      rating: reviewRating,
      body: filterProfanity(reviewBody.trim())
    }).then(function() {
      localStorage.setItem(rlKey, Date.now().toString());
      setReviewRating(0); setReviewAuthor(''); setReviewBody('');
      setShowReviewForm(false); setReviewSubmitting(false);
      // Refresh reviews
      window.__supabase.fetchReviews(product.id).then(setReviews);
    }).catch(function(e) {
      setReviewError(e.message || t('Failed to submit. Please try again.', '제출에 실패했어요. 다시 시도해주세요.'));
      setReviewSubmitting(false);
    });
  };

  // Benefits framing per category
  const benefitsHeadline = isFragrance
    ? t('You\'ll love this if you\'re:', '이런 분께 추천해요:')
    : t('What it does for you', '이런 효과가 있어요');
  const concernsHeadline = isFragrance
    ? t('Maybe skip if:', '이런 분은 참고하세요:')
    : t('Best for these concerns', '이런 피부 고민에 좋아요');

  return (
    <div ref={detailRef} className={cn('detail', `dens-${density}`)}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 500, color: 'var(--ink-faint)', margin: '6px 0 18px' }}>
        <a href="/products" onClick={(e) => { e.preventDefault(); setProduct(null); setView('feed'); history.pushState({}, '', '/products'); }} style={{ color: 'var(--ink-faint)', textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-faint)'}>{t('Products', '제품')}</a>
        <span style={{ opacity: 0.35 }}>/</span>
        <a href={'/brands/' + product.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')} onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/brands/' + product.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')); window.dispatchEvent(new PopStateEvent('popstate')); }} style={{ color: 'var(--ink-faint)', textDecoration: 'none', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-faint)'}>{product.brand}</a>
        <span style={{ opacity: 0.35 }}>/</span>
        <span style={{ color: 'var(--ink-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lang === 'ko' && product.nameKo ? product.nameKo : product.name}</span>
      </nav>

      {/* ---------- HERO ---------- */}
      <section className="detail-hero">
        <div className="detail-img-wrap">
          <Tape className="tape" style={{ top: -8, left: 20, transform: 'rotate(-8deg)' }} />
          <Tape className="tape" style={{ bottom: -6, right: 30, transform: 'rotate(6deg)' }} />
          <ProductImg src={product.imageUrl} alt={name} className="detail-img" />
          {(product.imageUrl || '').includes('placeholder') && (
            <span style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', fontSize: 11, fontWeight: 500, fontStyle: 'italic', color: 'var(--ink-faint)', opacity: 0.6, whiteSpace: 'nowrap' }}>
              {t('Photo coming soon', '사진 준비 중')}
            </span>
          )}
          <Sticker color="accent" rotate={8} className="detail-sticker">
            {t(catLabel.en, catLabel.ko)}
          </Sticker>
        </div>
        <div className="detail-head">
          <a className="detail-brand" href={'/brands/' + product.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')} onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/brands/' + product.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')); window.dispatchEvent(new PopStateEvent('popstate')); }} style={{ textDecoration: 'none', color: 'inherit' }} onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>{product.brand}</a>
          <h1 className="detail-name">{name}</h1>
          {/* Rating — average if exists, or "be first" prompt */}
          {(() => {
            if (reviewCount > 0) {
              const avg = reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewCount;
              return (
                <div onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '6px 0 0', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1,2,3,4,5].map(s => (
                      <span key={s} style={{ fontSize: 14, color: s <= Math.round(avg) ? '#f5a623' : 'var(--line)' }}>★</span>
                    ))}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)' }}>{avg.toFixed(1)}</span>
                  <span style={{ fontSize: 12, color: 'var(--ink-faint)', textDecoration: 'underline', textUnderlineOffset: 3 }}>({reviewCount} {t('ratings', '개 평가')})</span>
                </div>
              );
            }
            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0 0' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[1,2,3,4,5].map(s => (
                    <button key={s} onClick={() => submitQuickRating(s)} style={{
                      background: 'none', border: 'none', cursor: quickRated ? 'default' : 'pointer',
                      fontSize: 16, color: s <= quickRated ? '#f5a623' : 'var(--line)',
                      transition: 'color 0.15s, transform 0.15s', padding: 0, lineHeight: 1,
                      animation: !quickRated ? `starPulse 2s ease ${s * 0.15}s infinite` : 'none',
                    }} onMouseEnter={(e) => { if (!quickRated) { e.currentTarget.style.color = '#f5a623'; e.currentTarget.style.transform = 'scale(1.2)'; } }}
                       onMouseLeave={(e) => { if (!quickRated && s > quickRated) { e.currentTarget.style.color = 'var(--line)'; } e.currentTarget.style.transform = 'scale(1)'; }}>
                      ★
                    </button>
                  ))}
                </div>
                <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{t('Be the first to rate', '첫 번째 평가를 남겨주세요')}</span>
              </div>
            );
          })()}
          <p className="detail-tag">{tag}</p>



          <div className="detail-actions">
            <button
              className={cn('act-btn', isSaved && 'act-btn-on')}
              onClick={() => setSaved(s => ({ ...s, [product.id]: !s[product.id] }))}
            >
              <Icon name="bookmark" size={16} /> {isSaved ? t('Saved', '저장됨') : t('Save', '저장')}
            </button>
            <button className="act-btn"><Icon name="share" size={16} /> {t('Share', '공유')}</button>
            {reviewCount > 0 && (
              <button className="act-btn" onClick={() => {
                const el = document.getElementById('reviews-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>
                <Icon name="chat" size={16} /> {reviewCount} {t('Reviews', '리뷰')}
              </button>
            )}
          </div>

          {/* Accords for skincare / Performance for fragrance */}
          {false && isSkincare && product.accords && (
            <div className="accords">
              {product.accords.map((a, i) => {
                const label = lang === 'ko' && a.labelKo ? a.labelKo : a.label;
                return (
                  <div key={i} className="accord-row" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: 'var(--accent)', fontSize: 16 }}>✓</span>
                    <span className="accord-label">{label}</span>
                  </div>
                );
              })}
            </div>
          )}
          {isFragrance && product.performance && (
            <div className="accords">
              <div className="accord-row">
                <span className="accord-label">{t('Sillage', '확산력')}</span>
                <div className="accord-bar-wrap">
                  <div className="accord-bar accord-bar-sage" style={{ width: `${product.performance.sillage}%` }} />
                </div>
                <span className="accord-pct">{product.performance.sillage}</span>
              </div>
              <div className="accord-row">
                <span className="accord-label">{t('Longevity', '지속력')}</span>
                <div className="accord-bar-wrap">
                  <div className="accord-bar accord-bar-butter" style={{ width: `${product.performance.longevity}%` }} />
                </div>
                <span className="accord-pct">{product.performance.longevity}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------- ANATOMY: ingredients (skincare) or notes pyramid (fragrance) or bioValues (wellness) ---------- */}
      {isSkincare && product.ingredients && (
        <section className="ing-section">
          <header className="ing-head">
            <div>
              <h2 className="sec-h" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {t('The anatomy', '이 제품의 아나토미')}
              </h2>
              <p className="sec-sub">
                {t('Tap any ingredient — we\'ll explain exactly what it does.', '성분을 눌러보세요. 정확히 뭘 하는지 알려드려요.')}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                className={cn('act-btn', product.ingredients.every(ing => savedIngs[ing.id]) && 'act-btn-on')}
                onClick={() => setSavedIngs(s => {
                  const next = { ...s };
                  const allSaved = product.ingredients.every(ing => s[ing.id]);
                  product.ingredients.forEach(ing => { allSaved ? delete next[ing.id] : next[ing.id] = true; });
                  return next;
                })}
              >
                <Icon name="bookmark" size={14} /> {product.ingredients.every(ing => savedIngs[ing.id]) ? t('Unsave all', '전체 해제') : t('Save all', '전체 저장')}
              </button>
              <Sticker color="butter" rotate={-5}>{product.ingredients.length} {t('key ingredients', '핵심 성분')}</Sticker>
            </div>
          </header>

          <IngScrollFade>
            {product.ingredients.map((ing, i) => (
              <div key={ing.id} className="ing-card" style={{ '--i': i }}>
                <button
                  onClick={() => setSelIng(ing)}
                  className="ing-card-main"
                >
                  <span className="ing-sym">{ing.symbol}</span>
                  <div className="ing-body">
                    <p className="ing-name">{lang === 'ko' && ing.nameKo ? ing.nameKo : ing.name}</p>
                    <div className="ing-bar-wrap">
                      <div className="ing-bar" style={{ width: `${Math.min(100, ing.percentage * 2)}%` }} />
                    </div>
                  </div>
                  <span className="ing-pct">{ing.percentage}%</span>
                </button>
                <button
                  className={cn('ing-save-btn', savedIngs[ing.id] && 'ing-save-btn-on')}
                  onClick={() => setSavedIngs(s => ({ ...s, [ing.id]: !s[ing.id] }))}
                >
                  <Icon name="bookmark" size={14} />
                </button>
              </div>
            ))}
          </IngScrollFade>
        </section>
      )}

      {isFragrance && notes.length > 0 && (
        <section className="notes-section">
          <header className="ing-head">
            <div>
              <h2 className="sec-h">{t('The anatomy', '이 향의 아나토미')}</h2>
              <p className="sec-sub">{t('How the scent unfolds — from first spray to dry-down.', '처음부터 끝까지, 향이 펼쳐지는 순서')}</p>
            </div>
            <Sticker color="butter" rotate={-5}>{notes.length} {t('notes', '노트')}</Sticker>
          </header>

          <div className="pyramid">
            {['top', 'heart', 'base'].map((tier, ti) => {
              const tierNotes = notesByType[tier];
              if (!tierNotes.length) return null;
              const tierLabel = {
                top: { en: 'Top', ko: '탑' },
                heart: { en: 'Heart', ko: '하트' },
                base: { en: 'Base', ko: '베이스' },
              }[tier];
              const tierDesc = {
                top: { en: 'First 15 minutes', ko: '처음 15분' },
                heart: { en: '30 min – 2 hours', ko: '30분 – 2시간' },
                base: { en: '2 hours onward', ko: '2시간 이후' },
              }[tier];
              return (
                <div key={tier} className={cn('pyramid-tier', `tier-${tier}`)}>
                  <div className="tier-meta">
                    <span className="tier-num">0{ti + 1}</span>
                    <div>
                      <h3 className="tier-name">{t(tierLabel.en, tierLabel.ko)}</h3>
                      <p className="tier-desc">{t(tierDesc.en, tierDesc.ko)}</p>
                    </div>
                  </div>
                  <div className="tier-notes">
                    {tierNotes.map(n => (
                      <button key={n.id} className="note-chip" onClick={() => setSelNote(n)}>
                        <span className="note-chip-name">{lang === 'ko' && n.nameKo ? n.nameKo : n.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {product.bioValues && product.bioValues.length > 0 && (
        <section className="ing-section">
          <header className="ing-head">
            <div>
              <h2 className="sec-h">{t('The anatomy', '이 제품의 아나토미')}</h2>
              <p className="sec-sub">{t('Tap any compound — we\'ll explain what it does in your body.', '성분을 눌러보세요. 몸에서 어떤 역할을 하는지 알려드려요.')}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                className={cn('act-btn', product.bioValues.every(bv => savedIngs[bv.id]) && 'act-btn-on')}
                onClick={() => setSavedIngs(s => {
                  const next = { ...s };
                  const allSaved = product.bioValues.every(bv => s[bv.id]);
                  product.bioValues.forEach(bv => { allSaved ? delete next[bv.id] : next[bv.id] = true; });
                  return next;
                })}
              >
                <Icon name="bookmark" size={14} /> {product.bioValues.every(bv => savedIngs[bv.id]) ? t('Unsave all', '전체 해제') : t('Save all', '전체 저장')}
              </button>
              <Sticker color="butter" rotate={-5}>{product.bioValues.length} {t('key ingredients', '핵심 성분')}</Sticker>
            </div>
          </header>

          <IngScrollFade>
            {product.bioValues.map((bv, i) => (
              <div key={bv.id} className="ing-card" style={{ '--i': i }}>
                <button
                  onClick={() => setSelBio(bv)}
                  className="ing-card-main"
                >
                  <span className="ing-sym">{bv.system === 'brain' ? '🧠' : bv.system === 'energy' ? '⚡' : '✦'}</span>
                  <div className="ing-body">
                    <p className="ing-name">{lang === 'ko' && bv.nameKo ? bv.nameKo : bv.name}</p>
                    <div className="ing-bar-wrap">
                      <div className="ing-bar" style={{ width: `${bv.value}%` }} />
                    </div>
                  </div>
                  <span className="ing-pct">{bv.value}</span>
                </button>
                <button
                  className={cn('ing-save-btn', savedIngs[bv.id] && 'ing-save-btn-on')}
                  onClick={() => setSavedIngs(s => ({ ...s, [bv.id]: !s[bv.id] }))}
                >
                  <Icon name="bookmark" size={14} />
                </button>
              </div>
            ))}
          </IngScrollFade>
        </section>
      )}

      {/* ---------- FUN FACTS (not for wellness) ---------- */}
      {product.funFacts && product.funFacts.length > 0 && product.category !== 'wellness-food' && (
        <section className="facts-section">
          <header className="facts-head">
            <h2 className="sec-h">{t('In the wild', '알아두면 재밌는 이야기')}</h2>
            <p className="sec-sub">{t('Stories, trivia, and cultural footnotes.', '이 제품에 얽힌 이야기들.')}</p>
          </header>
          <div className="facts-grid">
            {product.funFacts.map((f, i) => (
              <article key={i} className="fact-card">
                <span className="fact-quote">&ldquo;</span>
                <p className="fact-body">{markUp(lang === 'ko' ? f.ko : f.en)}</p>
                <span className="fact-num">No. {String(i + 1).padStart(2, '0')}</span>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ---------- SUMMARY: benefits / concerns side by side ---------- */}
      <section className="summary-grid">
        <div className="summary-col summary-col-yes">
          <div className="summary-col-head">
            <span className="summary-mark summary-mark-yes">+</span>
            <h2 className="summary-h">{benefitsHeadline}</h2>
          </div>
          <ul className="summary-list">
            {benefits.map((b, i) => (
              <li key={i} className="summary-item">
                <span className="summary-dot summary-dot-yes" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="summary-col summary-col-no">
          <div className="summary-col-head">
            <span className={cn('summary-mark', isFragrance ? 'summary-mark-no' : 'summary-mark-concern')}>
              {isFragrance ? '−' : '•'}
            </span>
            <h2 className="summary-h">{concernsHeadline}</h2>
          </div>
          {isFragrance ? (
            <ul className="summary-list">
              {concerns.map((c, i) => (
                <li key={i} className="summary-item">
                  <span className="summary-dot summary-dot-no" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="concern-chips concern-chips-big">
              {concerns.map((c, i) => (
                <span key={i} className="concern-tag tag-sage">{c}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- USAGE (skincare/wellness only) ---------- */}
      {usage && !isFragrance && (
        <section className="usage-card">
          <div className="usage-head">
            <Sticker color="butter" rotate={-4}>{t('How to use', '사용법')}</Sticker>
          </div>
          <p className="usage-body">{usage}</p>
          {product.summary?.caution && (
            <div style={{ marginTop: 20, padding: '14px 18px', background: 'var(--cream-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--line)' }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-soft)', margin: '0 0 6px' }}>{t('Precautions', '주의사항')}</p>
              <p style={{ fontSize: 13, color: 'var(--ink-faint)', lineHeight: 1.6, margin: 0 }}>
                {lang === 'ko' && product.summary.cautionKo ? product.summary.cautionKo : product.summary.caution}
              </p>
            </div>
          )}
        </section>
      )}

      {/* ---------- REVIEWS ---------- */}
      <section id="reviews-section" className="reviews-section">
        {/* Rating summary + write link */}
        {(() => {
          const avg = reviewCount > 0 ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewCount : 0;
          return (
            <>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 22, color: '#f5a623' }}>★</span>
                  {reviewCount > 0 ? (
                    <>
                      <span style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>{avg.toFixed(1)}</span>
                      <span style={{ fontSize: 13, color: 'var(--ink-faint)' }}>|</span>
                      <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{t('Reviews', '리뷰')} {reviewCount}{t('', '건')}</span>
                    </>
                  ) : (
                    <span style={{ fontSize: 14, color: 'var(--ink-soft)' }}>{t('Reviews', '리뷰')}</span>
                  )}
                </div>
                <button onClick={() => setShowReviewForm(true)} style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer', padding: '6px 14px', borderRadius: 'var(--radius-pill)', border: 'none', background: 'var(--accent)', transition: 'opacity 0.15s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                  {t('Rate & Review', '평가 및 리뷰')}
                </button>
              </div>
            </>
          );
        })()}

        {/* Text reviews — paginated */}
        {(() => {
          const textReviews = reviews.filter(r => r.body && r.body.trim());
          if (!textReviews.length) return null;
          const visible = textReviews.slice(0, reviewsShown);
          const hasMore = textReviews.length > reviewsShown;
          return (
            <>
              <div className="reviews-list">
                {visible.map((r) => {
                  const stars = r.rating || 5;
                  const d = new Date(r.created_at);
                  const dateStr = d.getFullYear() + '.' + String(d.getMonth()+1).padStart(2,'0') + '.' + String(d.getDate()).padStart(2,'0');
                  const avatarColors = ['#2d5a3d','#a44a3f','#2e3d8f','#6b3a5c','#a07850','#3a6b5c','#8f5a2e'];
                  const charCode = (r.author || 'A').charCodeAt(0);
                  const avatarColor = avatarColors[charCode % avatarColors.length];
                  return (
                    <article key={r.id} className="review-card">
                      <div className="review-top">
                        <div className="review-author">
                          <span className="review-avatar" style={{ background: avatarColor }}>{(r.author || 'A')[0].toUpperCase()}</span>
                          <div>
                            <span className="review-name">{r.author || t('Anonymous', '익명')}</span>
                            <span className="review-date">{dateStr}</span>
                          </div>
                        </div>
                        <div className="review-stars">
                          {Array.from({ length: 5 }, (_, si) => (
                            <span key={si} className={cn('review-star', si < stars && 'review-star-on')}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="review-body">{filterProfanity(r.body)}</p>
                    </article>
                  );
                })}
              </div>
              {hasMore && (
                <button onClick={() => setReviewsShown(n => n + 3)} style={{ display: 'block', margin: '16px auto 0', padding: '8px 20px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--line)', background: 'var(--cream-card)', fontSize: 13, fontWeight: 500, color: 'var(--ink-soft)', cursor: 'pointer' }}>
                  {t('Show more reviews', '리뷰 더 보기')} ({textReviews.length - reviewsShown})
                </button>
              )}
            </>
          );
        })()}


        {/* Review form modal */}
        {showReviewForm && (
          <div className="sheet-back" onClick={() => { setShowReviewForm(false); setReviewError(''); }}>
            <div className="sheet" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420, padding: '28px 24px' }}>
              <button className="sheet-close" onClick={() => { setShowReviewForm(false); setReviewError(''); }}><Icon name="x" size={16} /></button>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, color: 'var(--ink)', margin: '0 0 20px' }}>{t('Rate & Review', '평가 및 리뷰')}</h3>

              <input id="rev-hp" type="text" style={{ position: 'absolute', left: '-9999px', tabIndex: -1 }} autoComplete="off" />

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)', display: 'block', marginBottom: 8 }}>{t('Rating', '별점')}</label>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[1,2,3,4,5].map(s => (
                    <button key={s} onClick={() => setReviewRating(s)} style={{
                      fontSize: 28, background: 'none', border: 'none', cursor: 'pointer',
                      color: s <= reviewRating ? '#f5a623' : 'var(--line)', transition: 'color 0.1s',
                    }}>★</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)', display: 'block', marginBottom: 6 }}>{t('Name (optional)', '이름 (선택)')}</label>
                <input value={reviewAuthor} onChange={e => setReviewAuthor(e.target.value)} placeholder={t('Anonymous', '익명')} maxLength={30} style={{ width: '100%', padding: '10px 14px', fontSize: 14, border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', background: 'var(--cream-card)', color: 'var(--ink)', outline: 'none', boxSizing: 'border-box' }} />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)', display: 'block', marginBottom: 6 }}>{t('Your review', '리뷰 내용')}</label>
                <textarea value={reviewBody} onChange={e => setReviewBody(e.target.value)} placeholder={t('Share your experience with this product (min 5 characters)', '이 제품에 대한 경험을 공유해주세요 (최소 5자)')} rows={4} maxLength={1000} style={{ width: '100%', padding: '10px 14px', fontSize: 14, border: '1px solid var(--line)', borderRadius: 'var(--radius-sm)', background: 'var(--cream-card)', color: 'var(--ink)', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                <span style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 4, display: 'block' }}>{reviewBody.length}/1000</span>
              </div>

              {reviewError && <p style={{ fontSize: 13, color: '#c0392b', margin: '0 0 12px' }}>{reviewError}</p>}

              <p style={{ fontSize: 11, color: 'var(--ink-faint)', margin: '0 0 14px', lineHeight: 1.5 }}>
                {t('By submitting, you agree that your review may be displayed publicly on ana2me. Do not include personal information.', '제출 시 리뷰가 ana2me에 공개적으로 표시될 수 있음에 동의합니다. 개인정보를 포함하지 마세요.')}
              </p>

              <button onClick={submitReview} disabled={reviewSubmitting} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-pill)', border: 'none', background: 'var(--ink)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: reviewSubmitting ? 'not-allowed' : 'pointer', opacity: reviewSubmitting ? 0.6 : 1 }}>
                {reviewSubmitting ? t('Submitting...', '제출 중...') : t('Submit Review', '리뷰 제출')}
              </button>
            </div>
          </div>
        )}
      </section>

      {false && (
      <section className="related">
        <h2 className="sec-h">{t('You might also like', '이런 제품도 있어요')}</h2>
        <div className="related-row">
          {window.PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3).map(p => {
            const pTag =
              (lang === 'ko' && (p.summary?.taglineKo || p.taglineKo)) ||
              p.summary?.tagline || p.tagline || '';
            return (
              <button key={p.id} className="rel-card" onClick={() => { setProduct(p); window.scrollTo(0, 0); }}>
                <ProductImg src={p.imageUrl} alt={p.name} className="rel-img" />
                <div>
                  <span className="rel-brand">{p.brand}</span>
                  <p className="rel-name">{lang === 'ko' && p.nameKo ? p.nameKo : p.name}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
      )}

      {/* ---------- RECOMMENDED ARTICLES ---------- */}
      {window.__supabase && (() => {
        const [recArticles, setRecArticles] = React.useState([]);
        React.useEffect(() => {
          // Build relevance keywords from product data
          const terms = [
            product.brand, product.name, product.category,
            ...(product.ingredients || []).map(i => i.name),
            ...(product.ingredients || []).map(i => i.nameKo || ''),
            ...(product.notes || []).map(n => n.name),
          ].join(' ').toLowerCase().split(/[\s,\-\/]+/).filter(w => w.length > 2);

          window.__supabase.fetchArticles(50, 0).then(articles => {
            // Score each article by keyword overlap
            const scored = articles.map(a => {
              const haystack = [
                a.title.en, a.title.ko || '',
                a.keywords || '',
                a.excerpt?.en || '', a.excerpt?.ko || '',
              ].join(' ').toLowerCase();
              const score = terms.reduce((s, t) => s + (haystack.includes(t) ? 1 : 0), 0);
              return { ...a, _score: score };
            });
            scored.sort((a, b) => b._score - a._score);
            // Take top 3 with score > 0, fall back to same-category
            const relevant = scored.filter(a => a._score > 0).slice(0, 3);
            if (relevant.length >= 3) {
              setRecArticles(relevant);
            } else {
              const tag = product.category === 'fragrance' ? 'Fragrance' : product.category === 'wellness-food' ? 'Wellness' : 'Skincare';
              const fallback = articles.filter(a => a.tag && a.tag.en === tag).slice(0, 3);
              setRecArticles(fallback.length ? fallback : articles.slice(0, 3));
            }
          });
        }, [product.id]);
        if (!recArticles.length) return null;
        return (
          <section style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid var(--line)' }}>
            <h2 className="sec-h">{t('Recommended reads', '추천 아티클')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {recArticles.map(a => {
                const tag = a.tag.en.toLowerCase().replace(/\s+/g, '-');
                const d = new Date(a.date);
                const iso = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
                const href = '/article/' + tag + '/' + iso + '/' + a.id;
                return (
                <a key={a.id} href={href} style={{
                  display: 'flex', alignItems: 'center', gap: 14, width: '100%', textAlign: 'left',
                  background: 'none', border: 'none', borderBottom: '1px solid var(--line)', cursor: 'pointer', padding: '12px 0',
                  textDecoration: 'none', color: 'inherit',
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 15, lineHeight: 1.25, margin: 0, color: 'var(--ink)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {a.title[lang] || a.title.en}
                    </h4>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: a.tagColor }}>{a.tag[lang] || a.tag.en}</span>
                  </div>
                  <ProductImg src={a.imageUrl} alt={a.title[lang] || a.title.en} style={{ width: 64, height: 64, borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }} />
                </a>
                );
              })}
            </div>
          </section>
        );
      })()}

      {/* ---------- DISCLAIMER ---------- */}
      <p style={{ fontSize: 11, color: 'var(--ink-faint)', margin: '40px 0 0', lineHeight: 1.6, fontStyle: 'italic' }}>
        {lang === 'ko' ? '성분 설명은 ana2me가 독립적으로 작성했습니다. 이 페이지의 공식 제품 정보의 저작권은 해당 브랜드에 있습니다. 본 사이트는 해당 자료에 대한 소유권을 주장하지 않으며, 정보 제공 목적으로만 사용됩니다. 관련 문의는 ana2me2026@gmail.com으로 연락해 주세요.' : 'Ingredient descriptions are independently written by ana2me. Official product information on this page are copyrighted by their respective brands. We do not claim ownership of these materials and use them for informational purposes only. For inquiries, contact ana2me2026@gmail.com.'}
      </p>

      {/* ---------- INGREDIENT SHEET ---------- */}
      {selIng && (
        <div className="sheet-back" onClick={() => setSelIng(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <button className="sheet-close" onClick={() => setSelIng(null)}><Icon name="x" size={16} /></button>
            <div className="sheet-sym">{selIng.symbol}</div>
            <h3 className="sheet-name">{lang === 'ko' && selIng.nameKo ? selIng.nameKo : selIng.name}</h3>
            <p className="sheet-pct">{selIng.percentage}% {t('of formula', '포뮬러 중')}</p>
            <p className="sheet-sci">{lang === 'ko' && selIng.scienceKo ? selIng.scienceKo : selIng.science}</p>
          </div>
        </div>
      )}

      {/* ---------- NOTE SHEET ---------- */}
      {selNote && (
        <div className="sheet-back" onClick={() => setSelNote(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <button className="sheet-close" onClick={() => setSelNote(null)}><Icon name="x" size={16} /></button>
            <span className="sheet-tier">
              {selNote.type === 'top' && t('Top note', '탑 노트')}
              {selNote.type === 'heart' && t('Heart note', '하트 노트')}
              {selNote.type === 'base' && t('Base note', '베이스 노트')}
            </span>
            <h3 className="sheet-name">{lang === 'ko' && selNote.nameKo ? selNote.nameKo : selNote.name}</h3>
            <p className="sheet-desc">{lang === 'ko' && selNote.descriptionKo ? selNote.descriptionKo : selNote.description}</p>
            <div className="sheet-divider" />
            <p className="sheet-sci-label">{t('The science', '과학적으로는')}</p>
            <p className="sheet-sci">{lang === 'ko' && selNote.scienceKo ? selNote.scienceKo : selNote.science}</p>
          </div>
        </div>
      )}

      {/* ---------- BIO SHEET (wellness) ---------- */}
      {selBio && (
        <div className="sheet-back" onClick={() => setSelBio(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <button className="sheet-close" onClick={() => setSelBio(null)}><Icon name="x" size={16} /></button>
            <span className="sheet-tier">
              {selBio.system === 'brain' && t('Brain & Mood', '두뇌 & 기분')}
              {selBio.system === 'energy' && t('Energy & Metabolism', '에너지 & 대사')}
              {selBio.system === 'skin' && t('Skin & Repair', '피부 & 회복')}
            </span>
            <h3 className="sheet-name">{lang === 'ko' && selBio.nameKo ? selBio.nameKo : selBio.name}</h3>
            <p className="sheet-desc">{lang === 'ko' && selBio.descriptionKo ? selBio.descriptionKo : selBio.description}</p>
            <div className="sheet-divider" />
            <p className="sheet-sci-label">{t('The science', '과학적으로는')}</p>
            <p className="sheet-sci">{lang === 'ko' && selBio.scienceKo ? selBio.scienceKo : selBio.science}</p>
          </div>
        </div>
      )}

      {/* Floating share bar */}
      <div style={{
        position: 'fixed', bottom: 24, left: '50%',
        transform: showShare ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(calc(100% + 40px))',
        background: '#2d5a3d',
        padding: '10px 8px',
        borderRadius: 'var(--radius-pill)',
        zIndex: 30,
        display: 'flex', alignItems: 'center', gap: 6,
        transition: 'transform 0.3s ease',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
      }}>
        <button onClick={() => {
          navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          });
          if (window.gtag) gtag('event', 'copy_link', { event_category: 'product_share', event_label: product.id });
        }} style={{
          display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 'var(--radius-pill)',
          border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.15)',
          fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', whiteSpace: 'nowrap',
        }}>
          <Icon name="link" size={14} />
          {copied ? (t('Copied!', '복사됨!')) : (t('Copy link', '링크 복사'))}
        </button>
        <button onClick={() => {
          if (navigator.share) navigator.share({ title: product.brand + ' ' + product.name, url: window.location.href });
          else { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); }
          if (window.gtag) gtag('event', 'share_native', { event_category: 'product_share', event_label: product.id });
        }} style={{
          display: 'flex', alignItems: 'center', gap: 7, padding: '10px 20px', borderRadius: 'var(--radius-pill)',
          border: 'none', background: 'rgba(255,255,255,0.95)', color: 'var(--ink)',
          fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
        }}>
          <Icon name="share" size={14} />
          {t('Share', '공유하기')}
        </button>
      </div>
    </div>
  );
};
