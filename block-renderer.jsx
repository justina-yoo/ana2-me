// BlockRenderer — renders structured JSON blocks using existing article primitives
window.BlockRenderer = function BlockRenderer({ blocks, lang }) {
  if (!blocks || !blocks.length) return null;
  const isKo = lang === 'ko';
  const t = (en, ko) => isKo ? ko : en;

  // Safe text accessor — handles missing fields, alternate keys, strings vs objects
  function txt(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    if (obj.en !== undefined) return t(obj.en, obj.ko);
    return '';
  }

  // Render HTML string safely
  function html(obj) {
    return { __html: txt(obj) };
  }

  function renderBlock(block, idx) {
    if (!block || !block.type) return null;
    switch (block.type) {
      case 'tldr': {
        const content = txt(block.text);
        const items = block.items && Array.isArray((block.items.en || block.items))
          ? t(block.items.en, block.items.ko).map((s, i) => <span key={i} style={{ display: 'block', marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: s }} />)
          : null;
        return (
          <ArtTlDr key={idx}>
            {items
              ? <><strong>{block.icon || '🧠'} {t('TL;DR:', '요약:')}</strong> {items}</>
              : <span dangerouslySetInnerHTML={{ __html: '<strong>' + (block.icon || '🧠') + ' ' + t('TL;DR:', '요약:') + '</strong> ' + content }} />
            }
          </ArtTlDr>
        );
      }

      case 'figure':
        return <ArtFigure key={idx} src={block.src} alt={block.alt || ''} isKo={isKo} />;

      case 'section':
        return (
          <ArtSection key={idx}>
            {(block.heading || block.title) && <ArtSectionHeading>{txt(block.heading || block.title)}</ArtSectionHeading>}
            {(block.body && !block.children) && <ArtBody key={idx+'-body'} dangerouslySetInnerHTML={html(block.body)} />}
            {block.children && block.children.map((child, ci) => renderBlock(child, `${idx}-${ci}`))}
          </ArtSection>
        );

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
        return (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
            {(block.cards || []).map((card, ci) => (
              <ArtProdCard key={ci} brand={card.brand} name={card.name} note={txt(card.note)} accentColor={card.accentColor || 'var(--accent)'} />
            ))}
          </div>
        );

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
      {blocks.map((block, idx) => {
        if (block.type === 'sources') {
          return React.createElement(React.Fragment, { key: idx },
            React.createElement('p', { style: { fontSize: 11, color: 'var(--ink-faint)', opacity: 0.6, margin: '-24px 0 0', lineHeight: 1.5 } },
              isKo
                ? '본 콘텐츠는 정보를 제공하기 위한 것이며, 전문적인 의료 조언을 대신하지 않습니다.'
                : 'For informational purposes only. Not intended as medical or professional advice.'
            ),
            renderBlock(block, idx)
          );
        }
        return renderBlock(block, idx);
      })}
    </div>
  );
};
