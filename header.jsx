// Header / navigation
const { useState: _uS1, useEffect: _uE1 } = React;

window.Header = function Header({ lang, setLang, view, setView, category, setCategory, query, setQuery, density, headerStyle }) {
  const t = useL(lang);
  const cats = [
    { id: 'skincare', en: 'Skincare', ko: '스킨케어', icon: 'droplet' },
    { id: 'fragrance', en: 'Fragrance', ko: '향수', icon: 'leaf' },
    { id: 'wellness-food', en: 'Wellness', ko: '웰니스', icon: 'apple' },
  ];

  const goFeed = () => { setView('insights'); setQuery(''); };

  if (headerStyle === 'editorial') {
    // Editorial: centered wordmark, cats below as underline links
    return (
      <header className="hdr hdr-edit">
        <div className="hdr-row">
          <button onClick={goFeed} className="wordmark-edit">
            <span className="wm-serif">ana2me</span>
            <span className="wm-dot" />
          </button>
        </div>
        <nav className="hdr-catrow">
          <button onClick={() => setView('insights')} className={cn('cat-edit', view === 'insights' && 'cat-edit-active')}>
            {t('Insights', '인사이트')}
          </button>
          <button onClick={() => setView('about')} className={cn('cat-edit', view === 'about' && 'cat-edit-active')}>
            {t('About', '소개')}
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
          <span className="wm-mark">A</span>
          <span className="wm-text">ana2me</span>
        </button>
      </div>
      <nav className="hdr-nav">
        <div className="hdr-pages">
          <button onClick={() => setView('insights')} className={cn('page-tab', view === 'insights' && 'page-tab-active')}>
            {t('Insights', '인사이트')}
          </button>
          <button onClick={() => setView('about')} className={cn('page-tab', view === 'about' && 'page-tab-active')}>
            {t('About', '소개')}
          </button>
        </div>
      </nav>
    </header>
  );
};
