// Author page — /author/j-yoo
import React, { useEffect } from 'react';
import { useL } from '../components/primitives';

const BASE_URL = 'https://ana2-me.com';

export default function Author({ lang }) {
  const isKo = lang === 'ko';
  const t = useL(lang);

  useEffect(() => {
    document.title = 'J. Yoo — Editor, ana2me';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'J. Yoo is the editor of ana2me, an independent bilingual publication analyzing Korean cosmetic ingredients from primary research and regulatory sources.');
    const canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute('href', BASE_URL + '/author/j-yoo');

    // JSON-LD Person schema
    const existing = document.getElementById('ld-author');
    if (existing) existing.parentNode.removeChild(existing);
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'ld-author';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': BASE_URL + '/author/j-yoo',
      'name': 'J. Yoo',
      'url': BASE_URL + '/author/j-yoo',
      'jobTitle': 'Editor',
      'worksFor': { '@id': BASE_URL + '/#organization' },
      'email': 'ana2me2026@gmail.com',
      'description': 'Editor of ana2me, an independent bilingual publication analyzing Korean cosmetic ingredients.'
    });
    document.head.appendChild(script);
    return () => { const el = document.getElementById('ld-author'); if (el) el.parentNode.removeChild(el); };
  }, []);

  return (
    <div className="app" style={{ paddingTop: 40 }}>
      <div style={{ marginBottom: 48 }}>
        <span style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--ink)', color: '#fff', fontSize: 20, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>J</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(24px, 3vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 24px', color: 'var(--ink)' }}>
          {t('About J. Yoo', 'J. Yoo 소개')}
        </h1>

        {/* English bio */}
        {!isKo && (
          <div style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-soft)' }}>
            <p style={{ margin: '0 0 18px' }}>
              J. Yoo started ana2me to answer a simple question: what's actually in the bottle? Korean beauty brands often make claims — "activates the skin's regeneration cycle", "reverses aging at the cellular level" — that a shopper has no easy way to verify. ana2me is the result of trying to.
            </p>
            <p style={{ margin: '0 0 18px' }}>
              The work starts with ingredient lists, moves through the peer-reviewed research behind those ingredients, and cross-checks against the Korean regulatory filings that go with them. Every article is published in both English and Korean natively, because English K-beauty coverage often misses the nuance that lives in the original Korean sources.
            </p>
            <p style={{ margin: '0 0 18px' }}>
              J. Yoo isn't a dermatologist or a chemist — just someone who cares enough to read past the marketing and check the sources. Every article is written from primary references: peer-reviewed studies, INCI lists, regulatory records. When something isn't clear, the article says so.
            </p>
            <p style={{ margin: '0 0 18px' }}>
              ana2me is independent. No paid brand partnerships, no sponsorships. If a product link ever earns a commission, it's disclosed inline.
            </p>
          </div>
        )}

        {/* Korean bio */}
        {isKo && (
          <div style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-soft)' }}>
            <p style={{ margin: '0 0 18px' }}>
              J. Yoo는 단순한 질문에서 ana2me를 시작했어요: 이 제품 안에 진짜 뭐가 들어 있을까? 한국 뷰티 브랜드들은 종종 "피부 재생 사이클을 활성화", "세포 수준에서 노화를 되돌린다" 같은 주장을 하는데, 소비자가 이걸 직접 확인할 방법은 거의 없어요. ana2me는 그걸 확인해 보려는 시도의 결과예요.
            </p>
            <p style={{ margin: '0 0 18px' }}>
              작업은 성분 목록에서 시작해서, 그 성분들에 대한 동료 심사 연구를 거치고, 관련 한국 규제 자료까지 교차 검증해요. 모든 기사는 영어와 한국어 두 언어로 독립적으로 작성되는데, 영어권 K-뷰티 기사들이 한국어 원문에 담긴 뉘앙스를 놓치는 경우가 많기 때문이에요.
            </p>
            <p style={{ margin: '0 0 18px' }}>
              J. Yoo는 피부과 전문의도 화학자도 아니에요 — 마케팅 너머를 읽고 출처를 확인할 만큼 관심이 있는 사람일 뿐이에요. 모든 기사는 1차 자료를 기반으로 해요: 동료 심사 연구, INCI 목록, 규제 기록. 불확실한 부분이 있으면 기사에서 그렇다고 밝혀요.
            </p>
            <p style={{ margin: '0 0 18px' }}>
              ana2me는 독립적이에요. 유료 브랜드 파트너십도, 후원도 없어요. 제품 링크가 수수료를 발생시키는 경우, 해당 사실을 본문에 공개해요.
            </p>
          </div>
        )}

        <p style={{ fontSize: 14, color: 'var(--ink-faint)', margin: '24px 0 0' }}>
          {t('Contact', '연락처')}: <a href="mailto:ana2me2026@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}>ana2me2026@gmail.com</a>
        </p>
      </div>

      <a href="/insights" onClick={(e) => { e.preventDefault(); history.pushState({}, '', '/insights'); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo(0, 0); }}
        style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
        ← {t('Back to Insights', '인사이트로 돌아가기')}
      </a>
    </div>
  );
}
