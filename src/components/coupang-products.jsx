// ─────────────────────────────────────────────────────────────────────
//  <CoupangProducts /> — inline product recommendations from Coupang
// ─────────────────────────────────────────────────────────────────────
//
//  Two paths:
//    1. Manual — article.coupangProducts is a non-empty array of hand-picked
//       products. Renders directly, skips API and shouldShowCoupang gate.
//    2. API fallback — fetches from /api/coupang-search (Netlify edge function).
//       Uses shouldShowCoupang gate. Silent-fails if no results.
//
//  Both paths are gated by:
//    - lang === 'ko' (Coupang links only make sense for Korean readers)
//    - PILOT_MODE (when true, only renders on articles in PILOT_SLUGS)
//
//  Props:
//    article  — the article object (must include .id and optionally .coupangProducts)
//    lang     — 'en' | 'ko'
//    limit    — max products to show (default 1, max 3)
//    query    — optional override for API search string
//
// ─────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { coupangKeywordsFor, shouldShowCoupang } from '../lib/coupang-keywords';

// ─────────────────────────────────────────────────────────────────────
// PILOT MODE — set false to enable Coupang block on all eligible articles
// ─────────────────────────────────────────────────────────────────────
const PILOT_MODE = true;
const PILOT_SLUGS = [
  // Add slug(s) here to enable Coupang on specific articles during pilot
  // e.g., 'dasima-kelp-scalp-serum-korea'
];

export default function CoupangProducts({ article, lang, limit = 1, query }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const isKo = lang === 'ko';

  // ── Gate 1: Korean-only ──────────────────────────────────────────
  if (lang !== 'ko') return null;

  // ── Gate 2: Pilot mode ───────────────────────────────────────────
  if (PILOT_MODE && !PILOT_SLUGS.includes(article?.id)) return null;

  // ── Manual path: hand-picked products from Supabase ──────────────
  const manualProducts = article?.coupangProducts;
  const hasManual = Array.isArray(manualProducts) && manualProducts.length > 0;

  // ── API path: eligibility check ──────────────────────────────────
  const searchQuery = query || (article ? coupangKeywordsFor(article) : null);
  const eligible = hasManual || (article ? shouldShowCoupang(article) : !!query);

  useEffect(() => {
    // Skip fetch entirely for manual products
    if (hasManual) {
      setLoading(false);
      return;
    }
    if (!eligible || !searchQuery) {
      setLoading(false);
      return;
    }
    const controller = new AbortController();
    const params = new URLSearchParams({ q: searchQuery, limit: String(limit) });
    if (article?.id) params.set('article_id', article.id);

    fetch(`/api/coupang-search?${params.toString()}`, { signal: controller.signal })
      .then((r) => r.ok ? r.json() : Promise.reject(r.status))
      .then((data) => {
        setProducts(Array.isArray(data.products) ? data.products : []);
        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
        setLoading(false);
      });
    return () => controller.abort();
  }, [searchQuery, limit, eligible, hasManual]);

  // Resolve which products to render
  const displayProducts = hasManual
    ? manualProducts.map((p, i) => ({ ...p, id: p.id || p.url || String(i) }))
    : products;

  // Silent fail: don't render anything if no products
  if (!hasManual && (loading || failed || products.length === 0)) return null;
  if (hasManual && displayProducts.length === 0) return null;

  return (
    <div style={{ margin: '40px 0' }}>
      {/* Section heading, outside the card */}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        fontSize: 'clamp(20px, 2.4vw, 24px)',
        color: 'var(--ink)',
        marginBottom: 14,
        letterSpacing: '-0.01em',
      }}>
        {isKo ? '관련 제품을 찾아봤어요.' : 'Related products on Coupang.'}
      </h2>

      <div style={{
        padding: 20,
        background: '#fff',
        border: '1px solid var(--line)',
        borderRadius: 'var(--radius)',
      }}>
        {/* Mandatory KFTC disclosure (경제적 이해관계 표시) */}
        <div style={{
          background: 'var(--cream-card)',
          border: '1px solid var(--line)',
          borderLeft: '4px solid #A96E38',
          padding: '12px 16px',
          borderRadius: '0 8px 8px 0',
          marginBottom: 16,
          display: 'flex',
          gap: 10,
          alignItems: 'flex-start',
        }}>
          <span style={{
            flexShrink: 0,
            width: 20, height: 20,
            borderRadius: '50%',
            background: '#A96E38',
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 2,
          }}>i</span>
          <p style={{
            fontFamily: 'var(--font-text)',
            fontSize: 12,
            lineHeight: 1.55,
            color: 'var(--ink)',
            margin: 0,
            fontWeight: 500,
            wordBreak: 'keep-all',
          }}>
            {isKo
              ? '본 제품 추천은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.'
              : 'These product recommendations are part of the Coupang Partners program; we may earn a commission at no extra cost to you.'}
          </p>
        </div>

        {/* Product cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {displayProducts.map((p) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              style={{
                display: 'flex',
                gap: 16,
                padding: 14,
                background: 'var(--cream-card)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                color: 'inherit',
                alignItems: 'center',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#A96E38'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--line)'; }}
            >
              {p.image && (
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  style={{
                    width: 84,
                    height: 84,
                    objectFit: 'contain',
                    borderRadius: 8,
                    flexShrink: 0,
                    background: '#fff',
                    border: '1px solid var(--line)',
                    padding: 4,
                  }}
                  onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-text)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#FF3B30',
                  marginBottom: 4,
                }}>
                  COUPANG{p.isRocket && ' · 로켓배송'}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: 1.35,
                  color: 'var(--ink)',
                  marginBottom: 4,
                  wordBreak: 'keep-all',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {p.name}
                </div>
                {p.price && (
                  <div style={{
                    fontFamily: 'var(--font-text)',
                    fontSize: 13,
                    color: 'var(--ink)',
                    fontWeight: 600,
                  }}>
                    {p.price.toLocaleString('ko-KR')}원
                    {p.rating && (
                      <span style={{
                        marginLeft: 8,
                        color: 'var(--ink-faint)',
                        fontWeight: 400,
                      }}>
                        ★ {p.rating.toFixed(1)} ({p.reviewCount?.toLocaleString('ko-KR') || 0})
                      </span>
                    )}
                  </div>
                )}
              </div>
              <span style={{
                padding: '8px 16px',
                background: 'var(--accent)',
                color: '#fff',
                borderRadius: 'var(--radius-pill)',
                fontFamily: 'var(--font-text)',
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}>
                {isKo ? '보러가기 →' : 'View →'}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
