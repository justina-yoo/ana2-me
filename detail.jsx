
// Product detail page — editorial long-read
window.Detail = function Detail({ product, lang, setView, setProduct, density }) {
  const t = useL(lang);
  const [selIng, setSelIng] = useState(null);
  const [selNote, setSelNote] = useState(null);
  const [saved, setSaved] = window.useLocalState('saved', {});
  const isSaved = !!saved[product.id];

  const isFragrance = product.category === 'fragrance';
  const isSkincare = product.category === 'skincare';

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

  // Benefits framing per category
  const benefitsHeadline = isFragrance
    ? t('You\'ll love this if you\'re:', '이런 분께 추천해요:')
    : t('What it does for you', '이 제품이 해주는 일');
  const concernsHeadline = isFragrance
    ? t('Maybe skip if:', '이런 분께는 권하지 않아요:')
    : t('Best for these concerns', '이런 피부 고민에 좋아요');

  return (
    <div className={cn('detail', `dens-${density}`)}>
      <button className="back-btn" onClick={() => { setProduct(null); setView('feed'); }}>
        <Icon name="back" size={16} /> {t('Back', '뒤로')}
      </button>

      {/* ---------- HERO ---------- */}
      <section className="detail-hero">
        <div className="detail-img-wrap">
          <Tape className="tape" style={{ top: -8, left: 20, transform: 'rotate(-8deg)' }} />
          <Tape className="tape" style={{ bottom: -6, right: 30, transform: 'rotate(6deg)' }} />
          <ProductImg src={product.imageUrl} alt={name} className="detail-img" />
          <Sticker color="accent" rotate={8} className="detail-sticker">
            {t(catLabel.en, catLabel.ko)}
          </Sticker>
        </div>
        <div className="detail-head">
          <span className="detail-brand">{product.brand}</span>
          <h1 className="detail-name">{name}</h1>
          <p className="detail-tag">{tag}</p>

          <div className="detail-actions">
            <button
              className={cn('act-btn', isSaved && 'act-btn-on')}
              onClick={() => setSaved(s => ({ ...s, [product.id]: !s[product.id] }))}
            >
              <Icon name="bookmark" size={16} /> {isSaved ? t('Saved', '저장됨') : t('Save', '저장')}
            </button>
            <button className="act-btn"><Icon name="share" size={16} /> {t('Share', '공유')}</button>
          </div>

          {/* Accords for skincare / Performance for fragrance */}
          {isSkincare && product.accords && (
            <div className="accords">
              {product.accords.map((a, i) => {
                const label = lang === 'ko' && a.labelKo ? a.labelKo : a.label;
                return (
                  <div key={i} className="accord-row">
                    <span className="accord-label">{label}</span>
                    <div className="accord-bar-wrap">
                      <div className="accord-bar" style={{ width: `${a.percentage}%` }} />
                    </div>
                    <span className="accord-pct">{a.percentage}</span>
                  </div>
                );
              })}
            </div>
          )}
          {isFragrance && product.performance && (
            <div className="accords">
              <div className="accord-row">
                <span className="accord-label">{t('Sillage', '시야주')}</span>
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

      {/* ---------- USAGE ---------- */}
      {usage && (
        <section className="usage-card">
          <div className="usage-head">
            <Sticker color="butter" rotate={-4}>{t('How to use', '사용법')}</Sticker>
          </div>
          <p className="usage-body">{usage}</p>
        </section>
      )}

      {/* ---------- ANATOMY: ingredients (skincare) or notes pyramid (fragrance) ---------- */}
      {isSkincare && product.ingredients && (
        <section className="ing-section">
          <header className="ing-head">
            <div>
              <h2 className="sec-h">{t('The anatomy', '이 제품의 해부도')}</h2>
              <p className="sec-sub">{t('Tap any ingredient — we\'ll explain exactly what it does.', '성분을 눌러보세요. 정확히 뭘 하는지 알려드려요.')}</p>
            </div>
            <Sticker color="butter" rotate={-5}>{product.ingredients.length} {t('actives', '성분')}</Sticker>
          </header>

          <div className="ing-grid">
            {product.ingredients.map((ing, i) => (
              <button
                key={ing.id}
                onClick={() => setSelIng(ing)}
                className="ing-card"
                style={{ '--i': i }}
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
            ))}
          </div>
        </section>
      )}

      {isFragrance && notes.length > 0 && (
        <section className="notes-section">
          <header className="ing-head">
            <div>
              <h2 className="sec-h">{t('The anatomy', '이 향의 해부도')}</h2>
              <p className="sec-sub">{t('How the scent unfolds — from first spray to dry-down.', '첫 뿌림부터 드라이다운까지, 향이 펼쳐지는 순서예요.')}</p>
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

      {/* ---------- FUN FACTS ---------- */}
      {product.funFacts && product.funFacts.length > 0 && (
        <section className="facts-section">
          <header className="facts-head">
            <h2 className="sec-h">{t('In the wild', '소소한 이야기')}</h2>
            <p className="sec-sub">{t('Stories, trivia, and cultural footnotes.', '이 제품에 얽힌 이야기들.')}</p>
          </header>
          <div className="facts-grid">
            {product.funFacts.map((f, i) => (
              <article key={i} className="fact-card">
                <span className="fact-quote">&ldquo;</span>
                <p className="fact-body">{lang === 'ko' ? f.ko : f.en}</p>
                <span className="fact-num">No. {String(i + 1).padStart(2, '0')}</span>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ---------- RELATED ---------- */}
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
    </div>
  );
};
