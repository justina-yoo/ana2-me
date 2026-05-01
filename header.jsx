// Header / navigation
const { useState: _uS1, useEffect: _uE1 } = React;

window.Header = function Header({ lang, setLang, view, setView, category, setCategory, query, setQuery, density, headerStyle }) {
  const t = useL(lang);
  const cats = [
    { id: 'skincare', en: 'Skincare', ko: '스킨케어', icon: 'droplet' },
    { id: 'fragrance', en: 'Fragrance', ko: '향수', icon: 'leaf' },
    { id: 'wellness-food', en: 'Wellness', ko: '웰니스', icon: 'apple' },
  ];

  const goFeed = () => { setView('feed'); setQuery(''); };

  if (headerStyle === 'editorial') {
    // Editorial: centered wordmark, cats below as underline links
    return (
      <header className="hdr hdr-edit">
        <div className="hdr-row">
          <button onClick={() => setLang(lang === 'en' ? 'ko' : 'en')} className="icon-btn" aria-label="Language">
            <Icon name="globe" /><span className="hdr-lang">{lang === 'en' ? 'KO' : 'EN'}</span>
          </button>
          <button onClick={goFeed} className="wordmark-edit">
            <span className="wm-serif">anatomy</span>
            <span className="wm-dot" />
          </button>
          <div className="hdr-search-mini">
            <Icon name="search" size={16} />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setView('feed'); }}
              placeholder={t('Search anything…', '검색…')}
            />
          </div>
        </div>
        <nav className="hdr-catrow">
          {cats.map(c => (
            <span key={c.id} className="cat-edit" style={{ opacity: 0.35, cursor: 'default', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              {t(c.en, c.ko)} <Icon name="lock" size={11} />
            </span>
          ))}
          <span className="hdr-pipe" />
          <button onClick={() => setView('insights')} className={cn('cat-edit', view === 'insights' && 'cat-edit-active')}>
            {t('Insights', '인사이트')}
          </button>
          <button onClick={() => setView('analyzer')} className={cn('cat-edit', view === 'analyzer' && 'cat-edit-active')}>
            {t('Analyzer', '분석기')}
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
          <span className="wm-text">anatomy</span>
        </button>
        <div className="hdr-search">
          <Icon name="search" size={16} />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setView('feed'); }}
            placeholder={t('Search products, brands, or ingredients…', '제품·브랜드·성분 검색…')}
          />
          {query && <button className="icon-btn sm" onClick={() => setQuery('')}><Icon name="x" size={14} /></button>}
        </div>
        <button onClick={() => setLang(lang === 'en' ? 'ko' : 'en')} className="icon-btn pill" aria-label="Language">
          <Icon name="globe" size={16} /><span className="hdr-lang">{lang === 'en' ? 'KO' : 'EN'}</span>
        </button>
      </div>
      <nav className="hdr-nav">
        <div className="hdr-cats">
          {cats.map(c => (
            <span key={c.id} className="chip" style={{ opacity: 0.35, cursor: 'default', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              {t(c.en, c.ko)} <Icon name="lock" size={11} />
            </span>
          ))}
        </div>
        <div className="hdr-pages">
          <button onClick={() => setView('insights')} className={cn('page-tab', view === 'insights' && 'page-tab-active')}>
            {t('Insights', '인사이트')}
          </button>
          <button onClick={() => setView('analyzer')} className={cn('page-tab page-tab-accent', view === 'analyzer' && 'page-tab-active')}>
            <Icon name="spark" size={14} /> {t('Analyzer', '분석기')}
          </button>
        </div>
      </nav>
    </header>
  );
};
