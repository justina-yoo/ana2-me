// Header / navigation
const { useState: _uS1, useEffect: _uE1 } = React;

window.Header = function Header({ lang, setLang, view, setView, category, setCategory, query, setQuery, density, headerStyle }) {
  const t = useL(lang);
  const cats = [
    { id: 'skincare', en: 'Skincare', ko: '스킨케어', icon: 'droplet' },
    { id: 'fragrance', en: 'Fragrance', ko: '향수', icon: 'leaf' },
    { id: 'wellness-food', en: 'Wellness', ko: '웰니스', icon: 'apple' },
  ];

  const goFeed = () => {
    history.pushState({}, '', '/');
    if (window.SEO) window.SEO.setHome();
    setView('insights');
    setQuery('');
    window.dispatchEvent(new CustomEvent('ana2me:go-home'));
  };

  if (headerStyle === 'editorial') {
    // Editorial: centered wordmark, cats below as underline links
    return (
      <header className="hdr hdr-edit">
        <div className="hdr-row">
          <button onClick={goFeed} className="wordmark-edit">
            <img src="ana2me-logo.svg" alt="ANA2ME" style={{ height: 'clamp(22px, 3vw, 32px)', width: 'auto' }} />
          </button>
        </div>
        <nav className="hdr-catrow">
          <button onClick={() => { history.pushState({}, '', '/'); if (window.SEO) window.SEO.setHome(); setView('insights'); }} className={cn('cat-edit', view === 'insights' && 'cat-edit-active')}>
            {t('Insights', '인사이트')}
          </button>
          <button onClick={() => { history.pushState({}, '', '/about'); if (window.SEO) window.SEO.setAbout(); setView('about'); }} className={cn('cat-edit', view === 'about' && 'cat-edit-active')}>
            {t('About', '소개')}
          </button>
          <button onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')} className="cat-edit" style={{ marginLeft: 8, fontWeight: 700, letterSpacing: '0.04em' }}>
            {lang === 'ko' ? 'EN' : '한국어'}
          </button>
        </nav>
      </header>
    );
  }

  // Friendly (default)
  return (
    <header className="hdr hdr-friendly">
      <div className="hdr-row">
        <button onClick={goFeed} className="wordmark">
          <img src="ana2me-logo.svg" alt="ANA2ME" style={{ height: 28, width: 'auto' }} />
        </button>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
          <button onClick={() => { history.pushState({}, '', '/'); if (window.SEO) window.SEO.setHome(); setView('insights'); }} className={cn('page-tab', view === 'insights' && 'page-tab-active')}>
            {t('Insights', '인사이트')}
          </button>
          <button onClick={() => { history.pushState({}, '', '/about'); if (window.SEO) window.SEO.setAbout(); setView('about'); }} className={cn('page-tab', view === 'about' && 'page-tab-active')}>
            {t('About', '소개')}
          </button>
          <button onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')} className="page-tab" style={{ fontWeight: 700, letterSpacing: '0.04em' }}>
            {lang === 'ko' ? 'EN' : '한국어'}
          </button>
        </nav>
      </div>
      {(view === 'feed' || view === 'detail') && (
        <div className="hdr-cats">
          {cats.map(c => (
            <button key={c.id} onClick={() => { setCategory(c.id); setView('feed'); }} className={cn('page-tab', category === c.id && 'page-tab-active')}>
              {t(c.en, c.ko)}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
