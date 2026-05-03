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
            <svg viewBox="0 0 47 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ana2me" style={{ height: 'clamp(26px, 3.5vw, 40px)', width: 'auto' }}>
              <path d="M5.4 14L4.896 12.152H2.196L1.704 14H0.168L2.508 5.744H4.632L6.972 14H5.4ZM3.576 7.196H3.516L2.544 10.832H4.536L3.576 7.196ZM12.7287 14L9.87272 8.78H9.82472V14H8.34872V5.744H9.90872L12.6567 10.7H12.7047V5.744H14.1807V14H12.7287ZM20.7919 14L20.2879 12.152H17.5879L17.0959 14H15.5599L17.8999 5.744H20.0239L22.3639 14H20.7919ZM18.9679 7.196H18.9079L17.9359 10.832H19.9279L18.9679 7.196Z" fill="currentColor"/>
              <path d="M23.672 12.752C24.208 12.376 24.752 11.928 25.304 11.408C25.856 10.88 26.328 10.312 26.72 9.704C27.112 9.096 27.308 8.516 27.308 7.964C27.308 7.62 27.212 7.348 27.02 7.148C26.828 6.948 26.564 6.848 26.228 6.848C25.86 6.848 25.508 6.948 25.172 7.148C24.844 7.34 24.576 7.6 24.368 7.928L23.444 6.968C23.724 6.496 24.108 6.132 24.596 5.876C25.092 5.612 25.64 5.48 26.24 5.48C27.112 5.48 27.796 5.696 28.292 6.128C28.796 6.552 29.048 7.144 29.048 7.904C29.048 8.608 28.772 9.364 28.22 10.172C27.668 10.98 26.916 11.828 25.964 12.716H29.336V14H23.672V12.752Z" fill="#00704A"/>
              <path d="M37.26 14V7.964H37.2L35.4 14H34.152L32.364 7.964H32.304V14H30.852V5.744H33.072L34.776 11.504H34.848L36.552 5.744H38.736V14H37.26ZM40.8217 14V5.744H45.6457V7.064H42.3457V9.164H45.1897V10.496H42.3457V12.68H45.6457V14H40.8217Z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <nav className="hdr-catrow">
          <button onClick={() => setView('insights')} className={cn('cat-edit', view === 'insights' && 'cat-edit-active')}>
            {t('Insights', '인사이트')}
          </button>
          <button onClick={() => setView('about')} className={cn('cat-edit', view === 'about' && 'cat-edit-active')}>
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
          <svg viewBox="0 0 47 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ana2me" style={{ height: 28, width: 'auto' }}>
            <path d="M5.4 14L4.896 12.152H2.196L1.704 14H0.168L2.508 5.744H4.632L6.972 14H5.4ZM3.576 7.196H3.516L2.544 10.832H4.536L3.576 7.196ZM12.7287 14L9.87272 8.78H9.82472V14H8.34872V5.744H9.90872L12.6567 10.7H12.7047V5.744H14.1807V14H12.7287ZM20.7919 14L20.2879 12.152H17.5879L17.0959 14H15.5599L17.8999 5.744H20.0239L22.3639 14H20.7919ZM18.9679 7.196H18.9079L17.9359 10.832H19.9279L18.9679 7.196Z" fill="currentColor"/>
            <path d="M23.672 12.752C24.208 12.376 24.752 11.928 25.304 11.408C25.856 10.88 26.328 10.312 26.72 9.704C27.112 9.096 27.308 8.516 27.308 7.964C27.308 7.62 27.212 7.348 27.02 7.148C26.828 6.948 26.564 6.848 26.228 6.848C25.86 6.848 25.508 6.948 25.172 7.148C24.844 7.34 24.576 7.6 24.368 7.928L23.444 6.968C23.724 6.496 24.108 6.132 24.596 5.876C25.092 5.612 25.64 5.48 26.24 5.48C27.112 5.48 27.796 5.696 28.292 6.128C28.796 6.552 29.048 7.144 29.048 7.904C29.048 8.608 28.772 9.364 28.22 10.172C27.668 10.98 26.916 11.828 25.964 12.716H29.336V14H23.672V12.752Z" fill="#00704A"/>
            <path d="M37.26 14V7.964H37.2L35.4 14H34.152L32.364 7.964H32.304V14H30.852V5.744H33.072L34.776 11.504H34.848L36.552 5.744H38.736V14H37.26ZM40.8217 14V5.744H45.6457V7.064H42.3457V9.164H45.1897V10.496H42.3457V12.68H45.6457V14H40.8217Z" fill="currentColor"/>
          </svg>
        </button>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
          <button onClick={() => setView('insights')} className={cn('page-tab', view === 'insights' && 'page-tab-active')}>
            {t('Insights', '인사이트')}
          </button>
          <button onClick={() => setView('about')} className={cn('page-tab', view === 'about' && 'page-tab-active')}>
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
