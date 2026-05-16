// Header / navigation
const { useState: _uS1, useEffect: _uE1 } = React;

window.Header = function Header({ lang, setLang, view, setView, category, setCategory, query, setQuery, density, headerStyle }) {
  const [searchOpen, setSearchOpen] = _uS1(false);
  const searchRef = React.useRef(null);
  const t = useL(lang);
  const cats = [
    { id: 'skincare', en: 'Skincare', ko: '스킨케어', icon: 'droplet' },
    { id: 'fragrance', en: 'Fragrance', ko: '향수', icon: 'leaf' },
    { id: 'wellness-food', en: 'Wellness', ko: '웰니스', icon: 'apple' },
  ];

  const goHome = () => {
    history.pushState({}, '', '/');
    if (window.SEO) window.SEO.setHome();
    setView('landing');
    setQuery('');
    window.dispatchEvent(new CustomEvent('ana2me:go-home'));
    setTimeout(() => window.scrollTo(0, 0), 10);
  };

  if (headerStyle === 'editorial') {
    // Editorial: centered wordmark, cats below as underline links
    return (
      <header className="hdr hdr-edit">
        <div className="hdr-row">
          <button onClick={goHome} className="wordmark-edit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1444 390" preserveAspectRatio="xMidYMid meet" role="img" aria-label="ANA2ME" style={{ height: 'clamp(22px, 3vw, 32px)', width: 'auto', display: 'block' }}>
              <g transform="translate(0,390) scale(1,-1)" fill="#111111" stroke="none" fillRule="evenodd">
                <path d="M134 285 c0 -1 -17 -46 -37 -100 l-36 -98 18 -1 c10 0 18 0 18 1 0 0 4 11 8 24 l9 23 40 0 40 0 8 -24 8 -24 19 0 18 0 -2 5 c-8 22 -69 190 -70 193 l-1 3 -20 0 c-17 0 -19 0 -20 -2z m35 -81 c8 -23 15 -43 15 -43 -1 0 -14 0 -31 0 l-30 1 15 42 c9 24 16 43 16 43 0 -1 7 -20 15 -43z M280 187 l0 -101 17 0 18 0 0 72 1 73 48 -73 48 -72 17 0 17 0 0 101 0 100 -17 0 -17 0 0 -72 0 -72 -49 72 -48 72 -18 0 -17 0 0 -100z M517 187 c-20 -54 -37 -100 -37 -100 0 -1 8 -1 18 -1 l18 0 7 20 c3 11 7 21 8 24 l2 4 40 0 40 0 7 -23 c5 -13 9 -24 9 -24 0 -1 8 -1 19 -1 l18 1 -25 66 c-13 36 -29 81 -36 100 l-13 34 -19 0 -19 0 -37 -100z m71 16 l15 -41 -30 -1 c-17 0 -30 0 -31 0 0 0 26 75 30 84 0 1 0 1 1 1 0 -1 7 -20 15 -43z M951 187 l0 -101 17 0 17 0 0 71 1 71 28 -57 29 -56 13 -1 14 0 28 57 29 58 0 -72 0 -71 17 0 17 0 0 101 0 100 -20 0 -21 0 -31 -64 c-17 -35 -32 -64 -32 -64 -1 -1 -15 28 -33 63 l-32 65 -20 0 -21 0 0 -100z M1208 187 l0 -101 65 0 65 0 0 14 0 14 -48 0 -48 0 0 30 1 31 43 0 43 0 0 14 0 13 -43 0 -44 0 0 29 0 29 48 0 48 0 0 14 0 13 -65 0 -65 0 0 -100z" />
              </g>
              <g transform="translate(0,390) scale(1,-1)" fill="#1F4435" stroke="none" fillRule="evenodd">
                <path d="M793 353 c-17 -2 -35 -9 -49 -18 -7 -6 -17 -16 -21 -23 -7 -13 -8 -25 -3 -35 3 -7 7 -11 14 -12 11 -3 21 1 28 11 2 4 2 5 2 13 0 7 0 9 -2 14 -3 5 -3 5 -2 7 8 13 24 20 41 19 10 -1 16 -3 22 -9 6 -5 10 -12 13 -20 2 -9 2 -33 0 -42 -2 -6 -11 -26 -12 -27 0 0 -2 -3 -4 -6 -6 -9 -19 -24 -29 -34 -5 -5 -9 -9 -10 -9 0 0 -32 -29 -38 -35 -23 -25 -36 -51 -39 -78 l0 -8 88 0 c49 0 89 0 89 1 1 0 2 14 4 31 3 28 3 30 1 31 -1 1 -5 1 -11 1 l-9 0 0 -3 c0 -10 -6 -18 -14 -22 -5 -1 -8 -1 -50 -1 -24 0 -47 0 -51 1 l-6 1 4 6 c1 4 3 8 3 8 0 1 2 3 3 5 2 2 7 7 11 12 8 9 24 23 44 39 16 12 38 33 47 42 13 14 24 28 24 31 0 0 0 1 1 1 1 0 7 13 9 22 2 7 2 10 2 20 -1 6 -2 13 -2 16 -3 8 -9 19 -14 25 -6 7 -18 15 -24 17 -2 1 -5 2 -7 3 -10 4 -38 7 -53 5z" />
              </g>
            </svg>
          </button>
        </div>
        <nav className="hdr-catrow" style={{ justifyContent: 'flex-start', gap: 16 }}>
          <a href="/insights" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/insights'); setView('insights'); setQuery(''); setTimeout(() => window.scrollTo(0, 0), 10); }} className={cn('cat-edit', view === 'insights' && 'cat-edit-active')}>
            {t('Insights', '인사이트')}
          </a>
          <a href="/products" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/products'); setView('feed'); setTimeout(() => window.scrollTo(0, 0), 10); }} className={cn('cat-edit', view === 'feed' && 'cat-edit-active')}>
            {t('Products', '제품')}
          </a>
          <a href="/about" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/about'); if (window.SEO) window.SEO.setAbout(); setView('about'); setTimeout(() => window.scrollTo(0, 0), 10); }} className={cn('cat-edit', view === 'about' && 'cat-edit-active')}>
            {t('About', '소개')}
          </a>
          <button onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')} style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--ink-faint)', background: 'none', border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', padding: '4px 10px', cursor: 'pointer' }}>
            {lang === 'ko' ? 'EN' : 'KR'}
          </button>
        </nav>
      </header>
    );
  }

  // Friendly (default)
  return (
    <header className="hdr hdr-friendly">
      <div className="hdr-row">
        <button onClick={goHome} className="wordmark">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1444 390" preserveAspectRatio="xMidYMid meet" role="img" aria-label="ANA2ME" style={{ height: 22, width: 'auto', display: 'block' }}>
            <g transform="translate(0,390) scale(1,-1)" fill="#111111" stroke="none" fillRule="evenodd">
              <path d="M134 285 c0 -1 -17 -46 -37 -100 l-36 -98 18 -1 c10 0 18 0 18 1 0 0 4 11 8 24 l9 23 40 0 40 0 8 -24 8 -24 19 0 18 0 -2 5 c-8 22 -69 190 -70 193 l-1 3 -20 0 c-17 0 -19 0 -20 -2z m35 -81 c8 -23 15 -43 15 -43 -1 0 -14 0 -31 0 l-30 1 15 42 c9 24 16 43 16 43 0 -1 7 -20 15 -43z M280 187 l0 -101 17 0 18 0 0 72 1 73 48 -73 48 -72 17 0 17 0 0 101 0 100 -17 0 -17 0 0 -72 0 -72 -49 72 -48 72 -18 0 -17 0 0 -100z M517 187 c-20 -54 -37 -100 -37 -100 0 -1 8 -1 18 -1 l18 0 7 20 c3 11 7 21 8 24 l2 4 40 0 40 0 7 -23 c5 -13 9 -24 9 -24 0 -1 8 -1 19 -1 l18 1 -25 66 c-13 36 -29 81 -36 100 l-13 34 -19 0 -19 0 -37 -100z m71 16 l15 -41 -30 -1 c-17 0 -30 0 -31 0 0 0 26 75 30 84 0 1 0 1 1 1 0 -1 7 -20 15 -43z M951 187 l0 -101 17 0 17 0 0 71 1 71 28 -57 29 -56 13 -1 14 0 28 57 29 58 0 -72 0 -71 17 0 17 0 0 101 0 100 -20 0 -21 0 -31 -64 c-17 -35 -32 -64 -32 -64 -1 -1 -15 28 -33 63 l-32 65 -20 0 -21 0 0 -100z M1208 187 l0 -101 65 0 65 0 0 14 0 14 -48 0 -48 0 0 30 1 31 43 0 43 0 0 14 0 13 -43 0 -44 0 0 29 0 29 48 0 48 0 0 14 0 13 -65 0 -65 0 0 -100z" />
            </g>
            <g transform="translate(0,390) scale(1,-1)" fill="#1F4435" stroke="none" fillRule="evenodd">
              <path d="M793 353 c-17 -2 -35 -9 -49 -18 -7 -6 -17 -16 -21 -23 -7 -13 -8 -25 -3 -35 3 -7 7 -11 14 -12 11 -3 21 1 28 11 2 4 2 5 2 13 0 7 0 9 -2 14 -3 5 -3 5 -2 7 8 13 24 20 41 19 10 -1 16 -3 22 -9 6 -5 10 -12 13 -20 2 -9 2 -33 0 -42 -2 -6 -11 -26 -12 -27 0 0 -2 -3 -4 -6 -6 -9 -19 -24 -29 -34 -5 -5 -9 -9 -10 -9 0 0 -32 -29 -38 -35 -23 -25 -36 -51 -39 -78 l0 -8 88 0 c49 0 89 0 89 1 1 0 2 14 4 31 3 28 3 30 1 31 -1 1 -5 1 -11 1 l-9 0 0 -3 c0 -10 -6 -18 -14 -22 -5 -1 -8 -1 -50 -1 -24 0 -47 0 -51 1 l-6 1 4 6 c1 4 3 8 3 8 0 1 2 3 3 5 2 2 7 7 11 12 8 9 24 23 44 39 16 12 38 33 47 42 13 14 24 28 24 31 0 0 0 1 1 1 1 0 7 13 9 22 2 7 2 10 2 20 -1 6 -2 13 -2 16 -3 8 -9 19 -14 25 -6 7 -18 15 -24 17 -2 1 -5 2 -7 3 -10 4 -38 7 -53 5z" />
            </g>
          </svg>
        </button>
        {searchOpen ? (
          <div className="hdr-search" style={{ flex: 1, marginLeft: 8 }}>
            <Icon name="search" size={15} />
            <input
              ref={searchRef}
              value={query}
              autoFocus
              onBlur={() => { if (!query) setTimeout(() => setSearchOpen(false), 150); }}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value.trim()) setView('insights');
                const q = e.target.value.trim();
                history.replaceState({}, '', q ? '/search?q=' + encodeURIComponent(q) : '/insights');
                if (q.length >= 3 && window.gtag) {
                  clearTimeout(window.__searchDebounce);
                  window.__searchDebounce = setTimeout(() => {
                    gtag('event', 'search', { search_term: q });
                  }, 800);
                }
              }}
              placeholder={t('Search', '검색')}
            />
            <button onClick={() => { setQuery(''); setSearchOpen(false); history.replaceState({}, '', '/insights'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-faint)', padding: 2 }}>
              <Icon name="x" size={14} />
            </button>
          </div>
        ) : (
          <>
            <button className="hdr-search-icon" onClick={() => setSearchOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-faint)', padding: 6 }}>
              <Icon name="search" size={18} />
            </button>
            <div className="hdr-search hdr-search-desktop" style={{ marginRight: 'auto' }}>
              <Icon name="search" size={15} />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (e.target.value.trim()) setView('insights');
                  const q = e.target.value.trim();
                  history.replaceState({}, '', q ? '/search?q=' + encodeURIComponent(q) : '/insights');
                  if (q.length >= 3 && window.gtag) {
                    clearTimeout(window.__searchDebounce);
                    window.__searchDebounce = setTimeout(() => {
                      gtag('event', 'search', { search_term: q });
                    }, 800);
                  }
                }}
                placeholder={t('Search', '검색')}
              />
            </div>
          </>
        )}
        {!searchOpen && (
          <div className="hdr-tabs" style={{ display: 'flex', alignItems: 'center', gap: 0, marginLeft: 'auto' }}>
            <a href="/insights" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/insights'); setView('insights'); setQuery(''); setTimeout(() => window.scrollTo(0, 0), 10); }} className={cn('page-tab', view === 'insights' && 'page-tab-active')}>
              {t('Insights', '인사이트')}
            </a>
            <a href="/products" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/products'); setView('feed'); setTimeout(() => window.scrollTo(0, 0), 10); }} className={cn('page-tab', view === 'feed' && 'page-tab-active')}>
              {t('Products', '제품')}
            </a>
            <a href="/about" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/about'); if (window.SEO) window.SEO.setAbout(); setView('about'); setTimeout(() => window.scrollTo(0, 0), 10); }} className={cn('page-tab', view === 'about' && 'page-tab-active')}>
              {t('About', '소개')}
            </a>
            <button onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')} style={{ marginLeft: 8, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--ink-faint)', background: 'none', border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', padding: '4px 10px', cursor: 'pointer' }}>
              {lang === 'ko' ? 'EN' : 'KR'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
