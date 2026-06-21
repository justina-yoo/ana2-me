import React, { useEffect } from 'react';
import { BIO_LINKS, buildBioLink } from '../data/bioLinks';

// /links — minimal "link in bio" page (Linktree-style, on your own domain)
// Renders without the site header/footer (see App.jsx for the conditional).
// Source-of-truth data: src/data/bioLinks.js

export default function Links({ lang, setView }) {
  const isKo = lang === 'ko';

  // Read ?p=ig|tt|x from URL for per-platform UTM tagging
  const source = (() => {
    try {
      const p = new URLSearchParams(window.location.search).get('p');
      const map = { ig: 'instagram', tt: 'tiktok', x: 'twitter', tw: 'twitter', pn: 'pinterest', md: 'medium', th: 'threads' };
      return map[p] || 'bio';
    } catch { return 'bio'; }
  })();

  // Set page title / SEO
  useEffect(() => {
    document.title = isKo ? 'ana2me — 링크' : 'ana2me — Links';
  }, [isKo]);

  const navigate = (e, item) => {
    const url = buildBioLink(item, source);
    if (item.path.startsWith('http')) return; // external — let default <a> behavior fire
    e.preventDefault();
    history.pushState({}, '', url);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 12px 48px',
      background: 'var(--cream)',
    }}>
      <div style={{ width: '100%', maxWidth: 480 }}>

        {/* ── Brand mark ── */}
        <header style={{ textAlign: 'center', marginBottom: 24 }}>
          <a
            href={`/?utm_source=${source}&utm_medium=bio`}
            style={{ textDecoration: 'none', display: 'inline-block' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1444 390" preserveAspectRatio="xMidYMid meet" role="img" aria-label="ANA2ME" style={{ height: 32, width: 'auto', display: 'block', margin: '0 auto 6px' }}>
              <g transform="translate(0,390) scale(1,-1)" fill="#111111" stroke="none" fillRule="evenodd">
                <path d="M134 285 c0 -1 -17 -46 -37 -100 l-36 -98 18 -1 c10 0 18 0 18 1 0 0 4 11 8 24 l9 23 40 0 40 0 8 -24 8 -24 19 0 18 0 -2 5 c-8 22 -69 190 -70 193 l-1 3 -20 0 c-17 0 -19 0 -20 -2z m35 -81 c8 -23 15 -43 15 -43 -1 0 -14 0 -31 0 l-30 1 15 42 c9 24 16 43 16 43 0 -1 7 -20 15 -43z M280 187 l0 -101 17 0 18 0 0 72 1 73 48 -73 48 -72 17 0 17 0 0 101 0 100 -17 0 -17 0 0 -72 0 -72 -49 72 -48 72 -18 0 -17 0 0 -100z M517 187 c-20 -54 -37 -100 -37 -100 0 -1 8 -1 18 -1 l18 0 7 20 c3 11 7 21 8 24 l2 4 40 0 40 0 7 -23 c5 -13 9 -24 9 -24 0 -1 8 -1 19 -1 l18 1 -25 66 c-13 36 -29 81 -36 100 l-13 34 -19 0 -19 0 -37 -100z m71 16 l15 -41 -30 -1 c-17 0 -30 0 -31 0 0 0 26 75 30 84 0 1 0 1 1 1 0 -1 7 -20 15 -43z M951 187 l0 -101 17 0 17 0 0 71 1 71 28 -57 29 -56 13 -1 14 0 28 57 29 58 0 -72 0 -71 17 0 17 0 0 101 0 100 -20 0 -21 0 -31 -64 c-17 -35 -32 -64 -32 -64 -1 -1 -15 28 -33 63 l-32 65 -20 0 -21 0 0 -100z M1208 187 l0 -101 65 0 65 0 0 14 0 14 -48 0 -48 0 0 30 1 31 43 0 43 0 0 14 0 13 -43 0 -44 0 0 29 0 29 48 0 48 0 0 14 0 13 -65 0 -65 0 0 -100z" />
              </g>
              <g transform="translate(0,390) scale(1,-1)" fill="#1F4435" stroke="none" fillRule="evenodd">
                <path d="M793 353 c-17 -2 -35 -9 -49 -18 -7 -6 -17 -16 -21 -23 -7 -13 -8 -25 -3 -35 3 -7 7 -11 14 -12 11 -3 21 1 28 11 2 4 2 5 2 13 0 7 0 9 -2 14 -3 5 -3 5 -2 7 8 13 24 20 41 19 10 -1 16 -3 22 -9 6 -5 10 -12 13 -20 2 -9 2 -33 0 -42 -2 -6 -11 -26 -12 -27 0 0 -2 -3 -4 -6 -6 -9 -19 -24 -29 -34 -5 -5 -9 -9 -10 -9 0 0 -32 -29 -38 -35 -23 -25 -36 -51 -39 -78 l0 -8 88 0 c49 0 89 0 89 1 1 0 2 14 4 31 3 28 3 30 1 31 -1 1 -5 1 -11 1 l-9 0 0 -3 c0 -10 -6 -18 -14 -22 -5 -1 -8 -1 -50 -1 -24 0 -47 0 -51 1 l-6 1 4 6 c1 4 3 8 3 8 0 1 2 3 3 5 2 2 7 7 11 12 8 9 24 23 44 39 16 12 38 33 47 42 13 14 24 28 24 31 0 0 0 1 1 1 1 0 7 13 9 22 2 7 2 10 2 20 -1 6 -2 13 -2 16 -3 8 -9 19 -14 25 -6 7 -18 15 -24 17 -2 1 -5 2 -7 3 -10 4 -38 7 -53 5z" />
              </g>
            </svg>
          </a>
          <p style={{
            fontSize: 13,
            color: 'var(--ink-faint)',
            margin: '0 0 16px',
            lineHeight: 1.5,
            letterSpacing: '0.01em',
          }}>
            {isKo
              ? '내 화장품 속 성분, 제대로 알고 쓰세요.'
              : 'Know what\u2019s in your bottle.'}
          </p>
          <a
            href={`/?utm_source=${source}&utm_medium=bio`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--font-text)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--accent)',
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            {isKo ? '웹사이트 방문' : 'Visit website'} <span style={{ fontSize: 11 }}>&rarr;</span>
          </a>
        </header>

        {/* ── Link list ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {BIO_LINKS.map(item => (
            <a
              key={item.id}
              href={buildBioLink(item, source)}
              onClick={(e) => navigate(e, item)}
              target={item.path.startsWith('http') ? '_blank' : undefined}
              rel={item.path.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                display: 'block',
                padding: item.featured && item.thumbnail ? 0 : '18px 22px',
                overflow: 'hidden',
                background: item.featured ? 'var(--accent)' : '#fff',
                color: item.featured ? '#fff' : 'var(--ink)',
                border: item.featured ? 'none' : '1px solid rgba(26,25,22,0.10)',
                boxShadow: item.featured ? 'none' : '0 2px 8px rgba(26,25,22,0.06)',
                borderRadius: 'var(--radius)',
                textDecoration: 'none',
                transition: 'transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                if (!item.featured) {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.04)';
                } else {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.borderColor = item.featured ? 'transparent' : 'var(--line)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {item.featured && item.thumbnail ? (
                <>
                  <img
                    src={item.thumbnail}
                    alt=""
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div style={{ padding: '14px 18px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      {item.label && (
                        <span style={{
                          display: 'inline-block',
                          fontFamily: 'var(--font-text)',
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.85)',
                          marginBottom: 4,
                        }}>{item.label}</span>
                      )}
                      <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                        fontSize: 16,
                        lineHeight: 1.28,
                        margin: 0,
                        color: '#fff',
                        letterSpacing: '-0.005em',
                      }}>{item.title}</h2>
                    </div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontFamily: 'var(--font-text)',
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.7)',
                      flexShrink: 0,
                      marginLeft: 12,
                    }}>
                      Read more
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2h8v8" /><path d="M14 2L6 10" /><path d="M2 6v8h8" />
                      </svg>
                    </span>
                  </div>
                </>
              ) : (
                <div>
                  {item.label && (
                    <span style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-text)',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      marginBottom: 8,
                    }}>{item.label}</span>
                  )}
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 17,
                    lineHeight: 1.28,
                    margin: '0 0 6px',
                    color: 'inherit',
                    letterSpacing: '-0.005em',
                  }}>{item.title}</h2>
                  <p style={{
                    fontFamily: 'var(--font-text)',
                    fontSize: 13,
                    lineHeight: 1.5,
                    margin: 0,
                    color: 'var(--ink-soft)',
                  }}>{item.description}</p>
                </div>
              )}
            </a>
          ))}
        </div>

        {/* ── Footer / domain mark ── */}
        <div style={{
          marginTop: 40,
          textAlign: 'center',
          fontSize: 11,
          color: 'var(--ink-faint)',
          opacity: 0.7,
          letterSpacing: '0.04em',
        }}>
          ana2-me.com
        </div>

      </div>
    </div>
  );
}
