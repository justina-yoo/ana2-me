
import React, { useState, useEffect } from 'react';
import { cn, useL, Icon, Sticker, ProductImg, Reveal } from '../components/primitives';
import SEO from '../lib/seo';

const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';
const headers = { apikey: SUPABASE_KEY, Authorization: 'Bearer ' + SUPABASE_KEY };

function supaGet(path) {
  return fetch(SUPABASE_URL + '/rest/v1/' + path, { headers }).then(r => r.json());
}

// Category colors for the symbol circle
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

function IngredientSkeleton() {
  const bar = (w, h, mb) => (
    <div className="skeleton" style={{ width: w, height: h, borderRadius: 6, marginBottom: mb || 0 }} />
  );
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 28px' }}>
      {bar('120px', 14, 16)}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div className="skeleton" style={{ width: 64, height: 64, borderRadius: 16 }} />
        <div>
          {bar('200px', 28, 8)}
          {bar('120px', 16, 0)}
        </div>
      </div>
      {bar('100%', 100, 24)}
      {bar('100%', 80, 24)}
      {bar('100%', 200, 0)}
    </div>
  );
}

export default function Ingredient({ lang, products, setView, setProduct }) {
  const t = useL(lang);
  const [ingredient, setIngredient] = useState(null);
  const [heroProducts, setHeroProducts] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Extract slug from URL
  const slug = window.location.pathname.replace(/\/$/, '').split('/').pop();

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return; }

    setLoading(true);
    setNotFound(false);

    // 1. Fetch ingredient from catalog
    supaGet('ingredients?id=eq.' + encodeURIComponent(slug))
      .then(data => {
        if (!data || !data[0]) { setNotFound(true); setLoading(false); return; }
        const ing = data[0];
        setIngredient(ing);
        if (SEO && SEO.setIngredient) SEO.setIngredient(ing);

        // 2. Fetch products containing this ingredient (hero only)
        supaGet('products_ingredients?ingredient_id=eq.' + encodeURIComponent(slug) + '&is_hero=eq.true&select=product_id')
          .then(piRows => {
            if (piRows && piRows.length > 0) {
              const productIds = piRows.map(r => r.product_id);
              // Fetch those products
              const idFilter = productIds.map(id => '"' + id + '"').join(',');
              supaGet('products?id=in.(' + productIds.join(',') + ')&select=id,name,name_ko,brand,image_url,category,summary')
                .then(prods => {
                  setHeroProducts(prods || []);
                });
            }
          });

        // 3. Fetch related articles by keyword match
        const ingName = ing.name.toLowerCase().replace(/\s+/g, '%');
        supaGet('articles?keywords=ilike.*' + encodeURIComponent(ingName) + '*&limit=10&order=created_at.desc&select=id,title,excerpt,tag,date,image_url,keywords')
          .then(articles => {
            setRelatedArticles(articles || []);
          });

        setLoading(false);
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  if (loading) return <IngredientSkeleton />;

  if (notFound || !ingredient) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '60px 28px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 24, color: 'var(--ink)', marginBottom: 12 }}>
          {t('Ingredient not found', '성분을 찾을 수 없어요')}
        </h1>
        <p style={{ fontSize: 14, color: 'var(--ink-faint)', marginBottom: 24 }}>
          {t('The ingredient you\'re looking for doesn\'t exist in our catalog yet.', '찾으시는 성분이 아직 카탈로그에 없어요.')}
        </p>
        <a href="/" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/'); setView('landing'); window.scrollTo(0, 0); }}
          style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
          {t('Go home', '홈으로')}
        </a>
      </div>
    );
  }

  const name = lang === 'ko' && ingredient.name_ko ? ingredient.name_ko : ingredient.name;
  const nameAlt = lang === 'ko' ? ingredient.name : (ingredient.name_ko || '');
  const catColor = CAT_COLORS[ingredient.category] || CAT_COLORS.default;
  const catLabel = ingredient.category
    ? ingredient.category.charAt(0).toUpperCase() + ingredient.category.slice(1)
    : '';

  const description = lang === 'ko' && ingredient.description_ko ? ingredient.description_ko : ingredient.description;
  const science = lang === 'ko' && ingredient.science_ko ? ingredient.science_ko : ingredient.science;

  // Safety flags
  const hasSafetyFlags = ingredient.is_known_sensitizer || ingredient.irritation_risk || ingredient.contains_flagged_component;

  function postSlug(post) {
    return 'article/' + post.tag.en.toLowerCase().replace(/\s+/g, '-') + '/' + dateToPrefix(post.date) + '/' + post.id;
  }
  function dateToPrefix(dateStr) {
    const d = new Date(dateStr);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '18px 0 60px' }}>

      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 500, color: 'var(--ink-faint)', margin: '6px 0 18px' }}>
        <a href="/" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/'); setView('landing'); window.scrollTo(0, 0); }}
          style={{ color: 'var(--ink-faint)', textDecoration: 'none', cursor: 'pointer' }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-faint)'}>{t('Home', '홈')}</a>
        <span style={{ opacity: 0.35 }}>/</span>
        <span style={{ color: 'var(--ink-soft)' }}>{t('Ingredients', '성분')}</span>
        <span style={{ opacity: 0.35 }}>/</span>
        <span style={{ color: 'var(--ink-soft)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
      </nav>

      {/* ── HERO ── */}
      <Reveal>
        <header className="ins-hero" style={{ paddingBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: catColor, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 600, flexShrink: 0,
            }}>
              {ingredient.symbol || name.charAt(0)}
            </div>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 'clamp(24px, 3vw, 32px)', lineHeight: 1.1,
                letterSpacing: '-0.015em', color: 'var(--ink)', margin: 0,
              }}>
                {name}
              </h1>
              {nameAlt && (
                <p style={{ fontSize: 14, color: 'var(--ink-faint)', margin: '4px 0 0' }}>{nameAlt}</p>
              )}
            </div>
          </div>
          {catLabel && (
            <Sticker color="accent" rotate={-3}>{catLabel}</Sticker>
          )}
        </header>
      </Reveal>

      {/* ── DESCRIPTION CARD ── */}
      {(description || science) && (
        <Reveal>
          <div style={{
            padding: '20px 22px', marginBottom: 20,
            background: 'var(--cream-card)', border: '1px solid var(--line)',
            borderRadius: 'var(--radius)',
          }}>
            {description && (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, color: 'var(--ink)', margin: '0 0 10px' }}>
                  {t('What it is', '어떤 성분인가요')}
                </h2>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>
                  {description}
                </p>
              </>
            )}
            {science && (
              <>
                <div style={{ height: 1, background: 'var(--line)', margin: '16px 0' }} />
                <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', margin: '0 0 8px' }}>
                  {t('The science', '과학적으로는')}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>
                  {science}
                </p>
              </>
            )}
          </div>
        </Reveal>
      )}

      {/* ── SAFETY FLAGS ── */}
      {hasSafetyFlags && (
        <Reveal>
          <div style={{
            padding: '16px 20px', marginBottom: 20,
            background: '#fdf6ec', border: '1px solid #f0dcc0',
            borderRadius: 'var(--radius)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 16 }}>&#9888;&#65039;</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 15, color: '#8a6d3b', margin: 0 }}>
                {t('Good to know', '알아두면 좋아요')}
              </h3>
            </div>
            <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: 13, lineHeight: 1.7, color: '#8a6d3b' }}>
              {ingredient.is_known_sensitizer && (
                <li>{t('This ingredient is a known sensitizer — it may cause reactions in sensitive individuals.', '이 성분은 민감성 반응을 유발할 수 있는 것으로 알려져 있어요.')}</li>
              )}
              {ingredient.contains_flagged_component && (
                <li>
                  {t('Contains an EU-26 flagged fragrance allergen.', 'EU-26 향료 알레르기 유발 물질을 포함하고 있어요.')}
                  {ingredient.flagged_component_reasons && ingredient.flagged_component_reasons.length > 0 && (
                    <span> ({ingredient.flagged_component_reasons.join(', ')})</span>
                  )}
                </li>
              )}
              {ingredient.irritation_risk && (
                <li>{t('Associated with a higher irritation risk for some skin types.', '일부 피부 타입에서 자극을 유발할 수 있어요.')}</li>
              )}
            </ul>
          </div>
        </Reveal>
      )}

      {/* ── PRODUCTS SECTION ── */}
      {heroProducts.length > 0 && (
        <Reveal>
          <section style={{ marginBottom: 32 }}>
            <h2 className="sec-h" style={{ marginBottom: 6 }}>
              {t('Products containing ' + ingredient.name, ingredient.name + ' 함유 제품')}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--ink-faint)', margin: '0 0 16px' }}>
              {t('Products where ' + ingredient.name + ' is a key ingredient.', ingredient.name + '을(를) 핵심 성분으로 포함한 제품이에요.')}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: 14,
            }}>
              {(showAllProducts ? heroProducts : heroProducts.slice(0, 3)).map(p => {
                const pName = lang === 'ko' && p.name_ko ? p.name_ko : p.name;
                const pSlug = (p.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/-+$/, '');
                return (
                  <a key={p.id} href={'/products/' + pSlug}
                    onClick={(e) => {
                      e.preventDefault();
                      // Find product in parent products array for full data
                      const fullProduct = (window.PRODUCTS || []).find(x => x.id === p.id);
                      if (fullProduct) {
                        setProduct(fullProduct);
                        history.pushState({}, '', '/products/' + pSlug);
                        window.scrollTo(0, 0);
                      } else {
                        window.location.href = '/products/' + pSlug;
                      }
                    }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                      padding: '18px 14px', background: 'var(--cream-card)',
                      border: '1px solid var(--line)', borderRadius: 'var(--radius)',
                      textDecoration: 'none', color: 'inherit',
                      transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
                  >
                    <ProductImg src={p.image_url} alt={p.brand + ' ' + pName}
                      style={{ width: 80, height: 80, objectFit: 'contain' }} />
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-faint)', display: 'block' }}>
                        {p.brand}
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 13, margin: '4px 0 0', color: 'var(--ink)', lineHeight: 1.25 }}>
                        {pName}
                      </h4>
                    </div>
                  </a>
                );
              })}
            </div>
            {!showAllProducts && heroProducts.length > 3 && (
              <button onClick={() => setShowAllProducts(true)} style={{ display: 'block', margin: '14px auto 0', background: 'none', border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', padding: '8px 20px', fontSize: 13, fontWeight: 500, color: 'var(--ink-soft)', cursor: 'pointer', fontFamily: 'var(--font-text)' }}>
                {t('See more (' + (heroProducts.length - 3) + ')', '더 보기 (' + (heroProducts.length - 3) + ')')}
              </button>
            )}
          </section>
        </Reveal>
      )}

      {/* ── RELATED ARTICLES ── */}
      {relatedArticles.length > 0 && (
        <Reveal>
          <section style={{ marginBottom: 32, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
            <h2 className="sec-h" style={{ marginBottom: 6 }}>
              {t('Articles about ' + ingredient.name, ingredient.name + ' 관련 아티클')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {(showAllArticles ? relatedArticles : relatedArticles.slice(0, 3)).map(a => {
                const href = '/' + postSlug(a);
                const d = new Date(a.date);
                const dateStr = d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0');
                return (
                  <a key={a.id} href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      history.pushState({}, '', href);
                      setView('insights');
                      window.scrollTo(0, 0);
                    }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14, width: '100%',
                      background: 'none', border: 'none', borderBottom: '1px solid var(--line)',
                      cursor: 'pointer', padding: '14px 0',
                      textDecoration: 'none', color: 'inherit',
                    }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{
                        fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 15,
                        lineHeight: 1.25, margin: 0, color: 'var(--ink)',
                        overflow: 'hidden', display: '-webkit-box',
                        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      }}>
                        {a.title[lang] || a.title.en}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                          {a.tag[lang] || a.tag.en}
                        </span>
                        <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--line)', display: 'inline-block' }} />
                        <span style={{ fontSize: 11, color: 'var(--ink-faint)' }}>{dateStr}</span>
                      </div>
                    </div>
                    {a.image_url && (
                      <ProductImg src={a.image_url} alt={a.title[lang] || a.title.en}
                        style={{ width: 64, height: 64, borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }} />
                    )}
                  </a>
                );
              })}
            </div>
            {!showAllArticles && relatedArticles.length > 3 && (
              <button onClick={() => setShowAllArticles(true)} style={{ display: 'block', margin: '14px auto 0', background: 'none', border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', padding: '8px 20px', fontSize: 13, fontWeight: 500, color: 'var(--ink-soft)', cursor: 'pointer', fontFamily: 'var(--font-text)' }}>
                {t('See more (' + (relatedArticles.length - 3) + ')', '더 보기 (' + (relatedArticles.length - 3) + ')')}
              </button>
            )}
          </section>
        </Reveal>
      )}

      {/* ── ANALYZER CTA ── */}
      <Reveal>
        <a href="/analyzer" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/analyzer'); setView('analyze'); window.scrollTo(0, 0); }}
          style={{
            display: 'flex', flexDirection: 'column', gap: 10,
            padding: '24px 22px', margin: '24px 0 0',
            background: 'var(--accent)', color: '#fff',
            borderRadius: 'var(--radius)', textDecoration: 'none',
            transition: 'all .15s ease',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>&#128300;</span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>
              {t('Ingredient Analyzer', '성분 분석기')}
            </span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.2)', opacity: 0.9 }}>
              Beta
            </span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 'var(--radius-pill)', background: 'rgba(245,215,110,0.5)', color: '#fff' }}>
              {t('Free', '무료')}
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(18px, 2.4vw, 22px)', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            {t('Find your ingredient pattern', '나에게 맞는 성분 패턴 찾기')}
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', marginTop: 4,
            background: '#fff', color: 'var(--accent)',
            borderRadius: 'var(--radius-pill)',
            fontSize: 13, fontWeight: 700,
            alignSelf: 'flex-start',
          }} className="cta-shake">
            {t('Try the analyzer', '분석기 사용하기')} &rarr;
          </span>
        </a>
      </Reveal>

      {/* ── DISCLAIMER ── */}
      <p style={{ fontSize: 11, color: 'var(--ink-faint)', margin: '40px 0 0', lineHeight: 1.6, fontStyle: 'italic' }}>
        {lang === 'ko'
          ? '성분 설명은 ana2me가 독립적으로 작성했습니다. 본 페이지는 정보 제공 목적으로만 사용되며, 전문적인 의료 조언을 대신하지 않습니다. 관련 문의는 ana2me2026@gmail.com으로 연락해 주세요.'
          : 'Ingredient descriptions are independently written by ana2me. This page is for informational purposes only and is not intended as medical or professional advice. For inquiries, contact ana2me2026@gmail.com.'}
      </p>
    </div>
  );
}
