// Shared analyzer CTA components for landing + insights feeds
// 3 types cycle: card → compact-right → compact-left → card → ...

import React from 'react';
import { Reveal } from './primitives';

const AnalyzerCTAs = {
  // How many articles between each CTA
  INTERVAL: 4,

  // Copy variants that cycle independently of layout
  copy: [
    { en: 'Not Sure Which Ingredients Work for You? Find Your Pattern.', ko: '어떤 성분이 나한테 맞는지 모르겠다면? 패턴을 찾아보세요.' },
    { en: 'Paste Any Ingredient List. We\u2019ll Decode It.', ko: '성분표를 붙여넣어 보세요. 해석해 드릴게요.' },
    { en: 'Which Ingredients Keep Showing Up in Products That Work for You?', ko: '나한테 맞는 제품에 자꾸 등장하는 성분, 뭔지 알고 싶다면?' },
    { en: 'Your Skin Has a Pattern. Let\u2019s Find It Together.', ko: '당신의 피부에도 패턴이 있어요. 같이 찾아볼까요?' },
  ],

  // Returns whether a CTA should be inserted at article index i
  shouldInsert: function(i) {
    return i > 0 && i % this.INTERVAL === 0;
  },

  // Returns the CTA type for the nth CTA (0-indexed): 0=card, 1=compact-right, 2=compact-left
  typeFor: function(ctaIndex) {
    return ctaIndex % 3;
  },

  // Build a CTA React element
  render: function(ctaIndex, t, goAnalyzer) {
    var type = this.typeFor(ctaIndex);
    var copyItem = this.copy[ctaIndex % this.copy.length];
    var key = 'analyzer-cta-' + ctaIndex;

    if (type === 0) {
      // Card CTA (the green accent block)
      return React.createElement(Reveal, { key: key },
        React.createElement('a', {
          href: '/analyzer', onClick: function(e) { e.preventDefault(); goAnalyzer(); },
          style: {
            display: 'flex', flexDirection: 'column', gap: 10,
            padding: '24px 22px', margin: '4px 0',
            background: 'var(--accent)', color: '#fff',
            borderRadius: 'var(--radius)', textDecoration: 'none',
            transition: 'all .15s ease',
          }
        },
          React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
            React.createElement('span', { style: { fontSize: 20 } }, '\uD83D\uDD2C'),
            React.createElement('span', { style: { fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 } }, t('Ingredient Analyzer', '\uC131\uBD84 \uBD84\uC11D\uAE30')),
            React.createElement('span', { style: { fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 'var(--radius-pill)', background: 'rgba(255,255,255,0.2)', opacity: 0.9 } }, 'Beta'),
            React.createElement('span', { style: { fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 'var(--radius-pill)', background: 'rgba(245,215,110,0.5)', color: '#fff' } }, t('Free', '\uBB34\uB8CC'))
          ),
          React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(18px, 2.4vw, 22px)', lineHeight: 1.2, letterSpacing: '-0.01em' } }, t(copyItem.en, copyItem.ko)),
          React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', marginTop: 4, background: '#fff', color: 'var(--accent)', borderRadius: 'var(--radius-pill)', fontSize: 13, fontWeight: 700, alignSelf: 'flex-start' }, className: 'cta-shake' }, t('Try the analyzer', '\uBD84\uC11D\uAE30 \uC0AC\uC6A9\uD558\uAE30'), ' \u2192')
        )
      );
    }

    // Compact row CTAs (type 1 = thumb right, type 2 = thumb left)
    var thumb = React.createElement('div', {
      style: {
        width: 72, height: 72, borderRadius: 'var(--radius-sm)', flexShrink: 0,
        background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }
    }, React.createElement('span', { style: { fontSize: 28 } }, '\uD83D\uDD2C'));

    var text = React.createElement('div', { style: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 } },
      React.createElement('h4', {
        style: {
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(16px, 2vw, 19px)', lineHeight: 1.2, margin: 0, color: 'var(--ink)',
        }
      }, t(copyItem.en, copyItem.ko)),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 6 } },
        React.createElement('span', { style: { fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' } }, t('Analyzer', '\uBD84\uC11D\uAE30')),
        React.createElement('span', { style: { width: 3, height: 3, borderRadius: '50%', background: 'var(--line)', display: 'inline-block' } }),
        React.createElement('span', { style: { fontSize: 11, color: 'var(--ink-faint)' } }, t('Free tool', '\uBB34\uB8CC \uB3C4\uAD6C'))
      )
    );

    var children = type === 2 ? [thumb, text] : [text, thumb];

    return React.createElement(Reveal, { key: key },
      React.createElement('a', {
        href: '/analyzer', onClick: function(e) { e.preventDefault(); goAnalyzer(); },
        style: {
          display: 'flex', alignItems: 'center', gap: 16, padding: '18px 0',
          borderBottom: '1px solid var(--line)', textDecoration: 'none', color: 'inherit',
        }
      }, children[0], children[1])
    );
  }
};

export default AnalyzerCTAs;
