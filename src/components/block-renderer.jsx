// BlockRenderer — renders structured JSON blocks using existing article primitives
window.BlockRenderer = function BlockRenderer({ blocks, lang }) {
  if (!blocks || !blocks.length) return null;
  const isKo = lang === 'ko';
  const t = (en, ko) => isKo ? ko : en;
  var firstFigureSeen = false;

  // Safe text accessor — handles missing fields, alternate keys, strings vs objects
  function txt(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    if (obj.en !== undefined) return t(obj.en, obj.ko);
    return '';
  }

  // Render HTML string safely — sanitized with DOMPurify
  var purify = typeof DOMPurify !== 'undefined' ? DOMPurify : null;
  function html(obj) {
    var raw = txt(obj);
    return { __html: purify ? purify.sanitize(raw, { ALLOWED_TAGS: ['strong', 'em', 'mark', 'br', 'a', 'span', 'sub', 'sup'], ALLOWED_ATTR: ['href', 'target', 'rel', 'style', 'class'] }) : raw };
  }

  function renderBlock(block, idx) {
    if (!block || !block.type) return null;
    switch (block.type) {
      case 'tldr': {
        const content = txt(block.text);
        const items = block.items && Array.isArray((block.items.en || block.items))
          ? t(block.items.en, block.items.ko).map((s, i) => <span key={i} style={{ display: 'block', marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: purify ? purify.sanitize(s) : s }} />)
          : null;
        return (
          <ArtTlDr key={idx}>
            {items
              ? <><strong>{block.icon || '🧠'} {t('Summary:', '요약:')}</strong> {items}</>
              : <span dangerouslySetInnerHTML={html({ en: '<strong>' + (block.icon || '🧠') + ' ' + t('Summary:', '요약:') + '</strong> ' + content })} />
            }
          </ArtTlDr>
        );
      }

      case 'figure': {
        var isHero = !firstFigureSeen;
        firstFigureSeen = true;
        return <ArtFigure key={idx} src={block.src} alt={block.alt || ''} isKo={isKo} loading={isHero ? 'eager' : 'lazy'} />;
      }

      case 'section': {
        // Hide sections whose only children are prodCards (now hidden)
        const hasVisibleChildren = (block.children || []).some(c => c.type !== 'prodCards');
        const hasBody = block.body && !block.children;
        if (!hasVisibleChildren && !hasBody) return null;
        return (
          <ArtSection key={idx}>
            {(block.heading || block.title) && <ArtSectionHeading>{txt(block.heading || block.title)}</ArtSectionHeading>}
            {hasBody && <ArtBody key={idx+'-body'} dangerouslySetInnerHTML={html(block.body)} />}
            {block.children && <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{block.children.map((child, ci) => renderBlock(child, `${idx}-${ci}`))}</div>}
          </ArtSection>
        );
      }

      case 'body':
        return <ArtBody key={idx} dangerouslySetInnerHTML={html(block.text || block.body)} />;

      case 'callout':
        return (
          <ArtCallout key={idx} icon={block.icon} title={txt(block.title)} borderColor={block.borderColor} bgColor={block.bgColor}>
            <span dangerouslySetInnerHTML={html(block.text || block.body)} />
          </ArtCallout>
        );

      case 'statCards':
        return (
          <ul key={idx} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
            {(block.cards || []).map((card, ci) => (
              <ArtStatCard key={ci} title={txt(card.title)} desc={txt(card.desc || card.description)} />
            ))}
          </ul>
        );

      case 'prodCards':
        // Replaced by auto-matched "Related products" section in insights.jsx
        return null;

      case 'grid':
        return (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${block.minWidth || '280px'}, 1fr))`, gap: block.gap || 22 }}>
            {(block.items || []).map((item, ci) => (
              <div key={ci}>
                <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }} dangerouslySetInnerHTML={html(item.title)} />
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }} dangerouslySetInnerHTML={html(item.body)} />
              </div>
            ))}
          </div>
        );

      case 'sources':
        return (
          <footer key={idx} style={{ marginTop: 0 }}>
            <details style={{ margin: 0 }}>
              <summary style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--ink-faint)',
                cursor: 'pointer', listStyle: 'none', display: 'flex',
                alignItems: 'center', gap: 6, userSelect: 'none',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transition: 'transform 0.2s', flexShrink: 0 }}
                  className="sources-chevron">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
                {t('Sources', '출처')}
              </summary>
              <ol style={{
                margin: 0, padding: '10px 0 0 16px',
                display: 'flex', flexDirection: 'column', gap: 4,
              }}>
                {(block.items || []).map((src, si) => (
                  <li key={si} style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--ink-faint)' }}>
                    {src.url
                      ? <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-faint)', textDecoration: 'underline', textUnderlineOffset: 2 }}>{src.label}</a>
                      : src.label
                    }
                  </li>
                ))}
              </ol>
            </details>
          </footer>
        );

      default:
        return null;
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {blocks.map((block, idx) => renderBlock(block, idx))}
      <p style={{ fontSize: 11, color: 'var(--ink-faint)', opacity: 0.6, margin: '8px 0 0', padding: '12px 0 0', borderTop: '1px solid var(--line)', lineHeight: 1.5, width: '100%' }}>
        {isKo
          ? '이 글은 정보를 제공하기 위한 것이며, 전문적인 의료 조언을 대신하지 않습니다.'
          : 'This article is for informational purposes only. Not intended as medical or professional advice.'}
      </p>
    </div>
  );
};
