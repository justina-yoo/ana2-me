// BlockRenderer — renders structured JSON blocks using existing article primitives
window.BlockRenderer = function BlockRenderer({ blocks, lang }) {
  if (!blocks || !blocks.length) return null;
  const isKo = lang === 'ko';
  const t = (en, ko) => isKo ? ko : en;

  // Safe text accessor — handles missing fields, items arrays, etc.
  function txt(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    if (obj.en !== undefined) return t(obj.en, obj.ko);
    return '';
  }
  function txtArr(obj) {
    if (!obj) return null;
    if (Array.isArray(obj.en)) return t(obj.en, obj.ko).map((s, i) => <span key={i} style={{ display: 'block', marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: s }} />);
    return null;
  }

  function renderBlock(block, idx) {
    if (!block || !block.type) return null;
    switch (block.type) {
      case 'tldr': {
        const content = block.text ? txt(block.text) : null;
        const items = block.items ? txtArr(block.items) : null;
        return <ArtTlDr key={idx}><strong>{block.icon || '🧠'} {t('TL;DR:', '요약:')}</strong> {items || content}</ArtTlDr>;
      }

      case 'figure':
        return <ArtFigure key={idx} src={block.src} alt={block.alt || ''} isKo={isKo} />;

      case 'section':
        return (
          <ArtSection key={idx}>
            {(block.heading || block.title) && <ArtSectionHeading>{txt(block.heading || block.title)}</ArtSectionHeading>}
            {(block.body && !block.children) && <ArtBody key={idx+'-body'} dangerouslySetInnerHTML={{ __html: txt(block.body) }} />}
            {block.children && block.children.map((child, ci) => renderBlock(child, `${idx}-${ci}`))}
          </ArtSection>
        );

      case 'body':
        return <ArtBody key={idx} dangerouslySetInnerHTML={{ __html: txt(block.text || block.body) }} />;

      case 'callout':
        return (
          <ArtCallout key={idx} icon={block.icon} title={txt(block.title)} borderColor={block.borderColor} bgColor={block.bgColor}>
            {txt(block.text || block.body)}
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
                <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{txt(item.title)}</h4>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{txt(item.body)}</p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {blocks.map((block, idx) => renderBlock(block, idx))}
    </div>
  );
};
