import React, { useState, useEffect, useMemo } from 'react';
import { cn, useL, Icon, Sticker, Reveal } from '../components/primitives';
import SEO from '../lib/seo';

const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';
const headers = { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY };

function supaGet(path) {
  return fetch(SUPABASE_URL + '/rest/v1/' + path, { headers }).then(r => r.json());
}

const CAT_COLORS = {
  humectant: '#4a90d9',
  emollient: '#e8a838',
  antioxidant: '#c0392b',
  exfoliant: '#8e44ad',
  preservative: '#7f8c8d',
  surfactant: '#16a085',
  solvent: '#95a5a6',
  active: '#2d5a3d',
  fragrance: '#d4a0c0',
  botanical: '#27ae60',
  peptide: '#2980b9',
  vitamin: '#f39c12',
  acid: '#e74c3c',
  mineral: '#7f8c8d',
  default: 'var(--accent)',
};

function IngredientListSkeleton() {
  const bar = (w, h, mb) => (
    <div className="skeleton" style={{ width: w, height: h, borderRadius: 6, marginBottom: mb || 0 }} />
  );
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '8px 28px 48px' }}>
      {bar('200px', 28, 16)}
      {bar('100%', 44, 24)}
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
          <div className="skeleton" style={{ width: 42, height: 42, borderRadius: 10 }} />
          {bar('180px', 16, 0)}
        </div>
      ))}
    </div>
  );
}

export default function IngredientsList({ lang, setView }) {
  const t = useL(lang);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    SEO.setIngredients();

    // 1. Fetch distinct hero ingredient IDs
    supaGet('products_ingredients?is_hero=eq.true&select=ingredient_id')
      .then(piRows => {
        if (!piRows || piRows.length === 0) { setLoading(false); return; }
        const uniqueIds = [...new Set(piRows.map(r => r.ingredient_id))];
        // 2. Fetch those ingredients
        const idFilter = uniqueIds.map(id => '"' + id + '"').join(',');
        return supaGet('ingredients?id=in.(' + uniqueIds.join(',') + ')&select=id,name,name_ko,symbol,category&order=name.asc');
      })
      .then(data => {
        if (data) setIngredients(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter by search
  const filtered = useMemo(() => {
    if (!search.trim()) return ingredients;
    const q = search.trim().toLowerCase();
    return ingredients.filter(ing =>
      ing.name.toLowerCase().includes(q) ||
      (ing.name_ko && ing.name_ko.toLowerCase().includes(q))
    );
  }, [ingredients, search]);

  // Group alphabetically
  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach(ing => {
      const letter = ing.name[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(ing);
    });
    return Object.keys(groups).sort().map(letter => ({ letter, items: groups[letter] }));
  }, [filtered]);

  const letters = grouped.map(g => g.letter);

  if (loading) return <IngredientListSkeleton />;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '8px 28px 48px' }}>
      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 500, color: 'var(--ink-faint)', margin: '6px 0 18px' }}>
        <a href="/" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/'); setView('landing'); window.scrollTo(0, 0); }}
          style={{ color: 'var(--ink-faint)', textDecoration: 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-faint)'}>{t('Home', '\ud648')}</a>
        <span style={{ opacity: 0.35 }}>/</span>
        <span style={{ color: 'var(--ink-soft)' }}>{t('Ingredients', '\uc131\ubd84')}</span>
      </nav>

      <Reveal>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(22px, 3vw, 28px)', lineHeight: 1.2,
          letterSpacing: '-0.015em', color: 'var(--ink)', margin: '0 0 6px',
        }}>
          {t('Skincare Ingredients', '\uc2a4\ud0a8\ucf00\uc5b4 \uc131\ubd84 \uac00\uc774\ub4dc')}
        </h1>
        <p style={{ fontSize: 13, color: 'var(--ink-faint)', margin: '0 0 20px' }}>
          {t(filtered.length + ' ingredients', filtered.length + '\uac1c \uc131\ubd84')}
        </p>
      </Reveal>

      {/* Search input */}
      <Reveal delay={40}>
        <div style={{ position: 'relative', marginBottom: 24 }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('Search ingredients...', '\uc131\ubd84 \uac80\uc0c9...')}
            style={{
              width: '100%', padding: '12px 16px 12px 40px',
              fontSize: 14, fontFamily: 'var(--font-text)',
              border: '1px solid var(--line)', borderRadius: 'var(--radius)',
              background: 'var(--cream-card)', color: 'var(--ink)',
              outline: 'none', boxSizing: 'border-box',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
          />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-faint)"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
      </Reveal>

      <div style={{ position: 'relative' }}>
        {/* Sticky alphabet sidebar */}
        {letters.length > 1 && (
          <nav style={{ position: 'fixed', right: 'max(8px, calc((100vw - 720px) / 2 - 40px))', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, zIndex: 10 }}>
            {letters.map(l => (
              <a key={l} href={'#ing-' + l} onClick={(e) => { e.preventDefault(); document.getElementById('ing-' + l)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                style={{ width: 22, height: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: 10, fontWeight: 600, color: 'var(--ink-faint)', textDecoration: 'none', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-faint)'; }}>
                {l}
              </a>
            ))}
          </nav>
        )}

        {/* Ingredient list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, paddingRight: 32 }}>
          {grouped.map(group => (
            <div key={group.letter}>
              <div id={'ing-' + group.letter} style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--accent)', padding: '20px 0 8px', scrollMarginTop: 80 }}>
                {group.letter}
              </div>
              {group.items.map(ing => {
                const name = lang === 'ko' && ing.name_ko ? ing.name_ko : ing.name;
                const nameAlt = lang === 'ko' ? ing.name : (ing.name_ko || '');
                const catColor = CAT_COLORS[ing.category] || CAT_COLORS.default;
                return (
                  <a
                    key={ing.id}
                    href={'/ingredients/' + ing.id}
                    onClick={(e) => {
                      e.preventDefault();
                      history.pushState({}, '', '/ingredients/' + ing.id);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                      window.scrollTo(0, 0);
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0',
                      borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'inherit', cursor: 'pointer',
                    }}
                  >
                    <span style={{
                      width: 42, height: 42, borderRadius: 10,
                      background: catColor, color: '#fff',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, flexShrink: 0,
                    }}>
                      {ing.symbol || name.charAt(0).toUpperCase()}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 15, color: 'var(--ink)', margin: 0 }}>
                        {name}
                      </h3>
                      {nameAlt && (
                        <p style={{ fontSize: 12, color: 'var(--ink-faint)', margin: '2px 0 0' }}>{nameAlt}</p>
                      )}
                    </div>
                    <Icon name="arrow" size={14} style={{ color: 'var(--ink-faint)', flexShrink: 0 }} />
                  </a>
                );
              })}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: 14, color: 'var(--ink-faint)' }}>
              {t('No ingredients found for "' + search + '"', '"' + search + '"\uc5d0 \ub300\ud55c \uc131\ubd84\uc744 \ucc3e\uc744 \uc218 \uc5c6\uc5b4\uc694')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
