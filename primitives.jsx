// UI atoms & primitives
const { useState, useEffect, useMemo, useRef } = React;

window.useLocalState = function useLocalState(key, initial) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key); return s !== null ? JSON.parse(s) : initial; } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
};

window.cn = (...c) => c.filter(Boolean).join(' ');

// i18n helper
window.useL = function useL(lang) {
  return (en, ko) => (lang === 'ko' ? (ko ?? en) : en);
};

// Tiny inline icons (stroke, rounded) — we avoid a full icon lib
window.Icon = function Icon({ name, size = 18, className = '' }) {
  const s = { width: size, height: size };
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    x: <><path d="M18 6 6 18M6 6l18 12" transform="scale(.66) translate(4 4)"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"/></>,
    bookmark: <path d="M6 3h12v18l-6-4-6 4z"/>,
    share: <><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="5" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8 11 8-5M8 13l8 5"/></>,
    spark: <path d="M12 3v6m0 6v6M3 12h6m6 0h6M6 6l3 3m6 6 3 3M6 18l3-3m6-6 3-3"/>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>,
    back: <path d="M19 12H5m5-5-5 5 5 5"/>,
    heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>,
    chat: <path d="M4 5h16v11H9l-5 4z"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    thumbs: <path d="M7 11h3V6a2 2 0 0 1 4 0v5h4l-1 8H8z"/>,
    thumbsDown: <path d="M7 13h3v5a2 2 0 0 0 4 0v-5h4l-1-8H8z"/>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/></>,
    leaf: <path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14zM5 19l7-7"/>,
    droplet: <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>,
    apple: <path d="M12 8c0-2 2-4 5-4-1 2-2 3-5 4zm0 0C9 7 6 8 6 13s3 8 6 8 6-3 6-8-3-6-6-5z"/>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
    link: <><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1"/></>,
  };
  return (
    <svg {...s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
};

// Sticker — playful rotated badge
window.Sticker = function Sticker({ children, color = 'accent', rotate = -4, className = '' }) {
  const bg = {
    accent: 'var(--accent)',
    sage: 'var(--sage)',
    butter: 'var(--butter)',
    ink: 'var(--ink)',
  }[color] || color;
  const fg = color === 'butter' ? 'var(--ink)' : (color === 'ink' ? 'var(--cream)' : '#fff');
  return (
    <span
      className={cn('sticker', className)}
      style={{
        background: bg, color: fg, transform: `rotate(${rotate}deg)`,
      }}
    >
      {children}
    </span>
  );
};

// Category chip — rounded pill
window.Chip = function Chip({ active, children, onClick, size = 'md' }) {
  return (
    <button onClick={onClick} className={cn('chip', active && 'chip-active', size === 'sm' && 'chip-sm')}>
      {children}
    </button>
  );
};

// Rounded card wrapper
window.Card = function Card({ children, className = '', as: As = 'div', ...rest }) {
  return <As className={cn('card', className)} {...rest}>{children}</As>;
};

// Placeholder image with skeleton loader and striped fallback
window.ProductImg = function ProductImg({ src, alt, className = '', style }) {
  const [err, setErr] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (err || !src) {
    return <div className={cn('img-fallback', className)} style={style} aria-label={alt} />;
  }

  if (!loaded) {
    return (
      <div className={cn('skeleton', className)} style={style} aria-hidden="true">
        <img
          src={src}
          alt=""
          style={{ visibility: 'hidden', width: '100%', height: '100%', display: 'block' }}
          referrerPolicy="no-referrer"
          onError={() => setErr(true)}
          onLoad={(e) => { if (!e.target.naturalWidth) setErr(true); else setLoaded(true); }}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      referrerPolicy="no-referrer"
      onError={() => setErr(true)}
      loading="lazy"
    />
  );
};

// Tape sticker - paper-tape decoration
window.Tape = function Tape({ className = '', style }) {
  return <span className={cn('tape', className)} style={style} aria-hidden="true" />;
};
