// BlockRenderer — renders structured JSON blocks using existing article primitives
window.BlockRenderer = function BlockRenderer({ blocks, lang }) {
  if (!blocks || !blocks.length) return null;
  const isKo = lang === 'ko';
  const t = (en, ko) => isKo ? ko : en;

  function renderBlock(block, idx) {
    switch (block.type) {
      case 'tldr':
        return <ArtTlDr key={idx}><strong>{block.icon || '🧠'} {t('TL;DR:', '요약:')}</strong> {t(block.text.en, block.text.ko)}</ArtTlDr>;

      case 'figure':
        return <ArtFigure key={idx} src={block.src} alt={block.alt || ''} isKo={isKo} />;

      case 'section':
        return (
          <ArtSection key={idx}>
            {block.heading && <ArtSectionHeading>{t(block.heading.en, block.heading.ko)}</ArtSectionHeading>}
            {block.children && block.children.map((child, ci) => renderBlock(child, `${idx}-${ci}`))}
          </ArtSection>
        );

      case 'body':
        return <ArtBody key={idx} dangerouslySetInnerHTML={{ __html: t(block.text.en, block.text.ko) }} />;

      case 'callout':
        return (
          <ArtCallout key={idx} icon={block.icon} title={t(block.title.en, block.title.ko)} borderColor={block.borderColor} bgColor={block.bgColor}>
            {t(block.text.en, block.text.ko)}
          </ArtCallout>
        );

      case 'statCards':
        return (
          <ul key={idx} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, padding: 0, margin: 0 }}>
            {block.cards.map((card, ci) => (
              <ArtStatCard key={ci} title={t(card.title.en, card.title.ko)} desc={t(card.desc.en, card.desc.ko)} />
            ))}
          </ul>
        );

      case 'prodCards':
        return (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 14 }}>
            {block.cards.map((card, ci) => (
              <ArtProdCard key={ci} brand={card.brand} name={card.name} note={t(card.note.en, card.note.ko)} accentColor={card.accentColor || 'var(--accent)'} />
            ))}
          </div>
        );

      case 'grid':
        return (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${block.minWidth || '280px'}, 1fr))`, gap: block.gap || 22 }}>
            {block.items.map((item, ci) => (
              <div key={ci}>
                <h4 style={{ fontWeight: 700, color: 'var(--ink)', margin: '0 0 8px', fontSize: 15 }}>{t(item.title.en, item.title.ko)}</h4>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0 }}>{t(item.body.en, item.body.ko)}</p>
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
