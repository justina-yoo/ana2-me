// Ingredient Analyzer — "Your Ingredient Profile"
// Pick a category, tag products as works/doesn't work, get AI pattern analysis
window.Analyzer = function Analyzer({ lang, density, setView, setProduct }) {
  const t = useL(lang);
  const isKo = lang === 'ko';
  const products = window.PRODUCTS;

  const [category, setCategory] = useState(null);
  const [works, setWorks] = useState([]);
  const [doesnt, setDoesnt] = useState([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const catPool = category
    ? products.filter(p => p.category === category)
    : products;
  const inWorks = new Set(works);
  const inDoesnt = new Set(doesnt);

  const reset = () => { setWorks([]); setDoesnt([]); setResult(null); setError(null); };
  const pickCat = (c) => { setCategory(c); reset(); };

  const addWorks = (name) => { setWorks(prev => [...prev, name]); setResult(null); setError(null); };
  const addDoesnt = (name) => { setDoesnt(prev => [...prev, name]); setResult(null); setError(null); };
  const rmWorks = (n) => { setWorks(prev => prev.filter(x => x !== n)); setResult(null); setError(null); };
  const rmDoesnt = (n) => { setDoesnt(prev => prev.filter(x => x !== n)); setResult(null); setError(null); };

  const canAnalyze = (works.length + doesnt.length) >= 1;

  const buildPrompt = () => {
    const describe = (names) => names.map(name => {
      const p = products.find(x => x.name === name);
      if (!p) return `- ${name}`;
      if (p.category === 'skincare' && p.ingredients) {
        return `- ${name} [Skincare]: ${p.ingredients.map(i => `${i.name}${i.percentage ? ` (${i.percentage}%)` : ''}`).join(', ')}`;
      }
      if (p.category === 'fragrance' && p.notes) {
        return `- ${name} [Fragrance]: ${p.notes.map(n => `${n.name} (${n.type})`).join(', ')}`;
      }
      if (p.category === 'wellness-food' && p.bioValues) {
        return `- ${name} [Wellness]: ${p.bioValues.map(b => `${b.name}${b.system ? ` (${b.system})` : ''}`).join(', ')}`;
      }
      return `- ${name}`;
    }).join('\n');
    const w = works.length ? `PRODUCTS THAT WORK FOR THIS PERSON:\n${describe(works)}` : '';
    const d = doesnt.length ? `PRODUCTS THAT DON'T WORK FOR THIS PERSON:\n${describe(doesnt)}` : '';
    const langI = isKo ? 'Respond ENTIRELY in Korean (한국어로만).' : 'Respond in English.';
    return `You are a friendly beauty ingredient expert. Based on the products below, give a short, simple summary of which ingredients work for this person and which to be cautious about.

${w}

${d}

Return two short sections only:
**Ingredients that work for you** — list 3-5 specific ingredient names from the working products and one brief sentence on why each suits them.
**Ingredients to watch out for** — list 2-4 specific ingredient names from the non-working products and one brief sentence on why each might not suit them.

Be concise and friendly. No jargon. ${langI}`;
  };

  const analyze = async () => {
    if (!canAnalyze || busy) return;
    setBusy(true); setResult(null); setError(null);
    try {
      const text = await window.claude.complete(buildPrompt());
      if (!text) throw new Error('Empty response.');
      setResult(text);
    } catch (e) {
      setError(e?.message || 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  // Render markdown-ish result: **bold** + paragraphs + bullet lines
  const renderResult = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={i} className="res-gap" />;
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const isBullet = /^[-•*]\s/.test(trimmed);
      const Tag = isBullet ? 'li' : 'p';
      const content = parts.map((p, j) => j % 2 === 1
        ? <strong key={j}>{p}</strong>
        : <React.Fragment key={j}>{p.replace(/^[-•*]\s/, '')}</React.Fragment>);
      return <Tag key={i} className={isBullet ? 'res-li' : 'res-p'}>{content}</Tag>;
    });
  };

  const cats = [
    { id: 'skincare', en: 'Skincare', ko: '스킨케어' },
    { id: 'fragrance', en: 'Fragrance', ko: '향수' },
    { id: 'wellness-food', en: 'Wellness', ko: '웰니스' },
  ];

  return (
    <div className={cn('profiler', `dens-${density}`)}>
      {/* Hero */}
      <header className="prof-hero">
        <Sticker color="accent" rotate={-5}>{t('ingredient profiler', '성분 프로파일러')}</Sticker>
        <h1 className="display">
          {t('Your Ingredient', '나의 성분')}<br />
          <span className="display-accent">{t('Profile', '프로필')}<span className="display-dot">.</span></span>
        </h1>
        <p className="prof-sub">
          {t(
            "Tell us what's worked (and what hasn't). We'll find the common thread.",
            '효과 있던 것, 없던 것을 알려주세요. 공통된 흐름을 찾아드립니다.'
          )}
        </p>
      </header>

      {/* Step 1 — pick a category */}
      <section className="prof-step">
        <div className="prof-step-head">
          <span className="prof-step-n">01</span>
          <div>
            <h2 className="sec-h">{t('Pick a category', '카테고리를 선택하세요')}</h2>
            <p className="sec-sub">{t('We match products within one category at a time.', '한 번에 한 카테고리씩 분석합니다.')}</p>
          </div>
        </div>
        <div className="prof-cats">
          {cats.map(c => (
            <button
              key={c.id}
              onClick={() => pickCat(c.id)}
              className={cn('prof-cat', category === c.id && 'prof-cat-on')}
            >
              <span className="prof-cat-dot" />
              <span>{t(c.en, c.ko)}</span>
              <span className="prof-cat-n">
                {products.filter(p => p.category === c.id).length}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Step 2 — tag products */}
      <section className={cn('prof-step', !category && 'prof-step-dim')}>
        <div className="prof-step-head">
          <span className="prof-step-n">02</span>
          <div>
            <h2 className="sec-h">{t('Tag your products', '제품을 분류하세요')}</h2>
            <p className="sec-sub">
              {category
                ? t('Add at least one on either side.', '양쪽 중 최소 하나는 추가하세요.')
                : t('Choose a category first.', '카테고리를 먼저 선택하세요.')}
            </p>
          </div>
        </div>

        {category && (
          <div className="prof-buckets">
            <ProfBucket
              tone="works"
              title={t('Works for me', '맞는 제품')}
              sub={t('these make your skin happy', '효과가 좋았던 제품')}
              icon="thumbs"
              products={catPool}
              selected={works}
              blocked={inDoesnt}
              onAdd={addWorks}
              onRemove={rmWorks}
              lang={lang}
            />
            <ProfBucket
              tone="doesnt"
              title={t("Doesn't work for me", '안 맞는 제품')}
              sub={t('these let you down', '맞지 않았던 제품')}
              icon="thumbsDown"
              products={catPool}
              selected={doesnt}
              blocked={inWorks}
              onAdd={addDoesnt}
              onRemove={rmDoesnt}
              lang={lang}
            />
          </div>
        )}
      </section>

      {/* Step 3 — analyze */}
      <section className={cn('prof-step', !canAnalyze && 'prof-step-dim')}>
        <div className="prof-step-head">
          <span className="prof-step-n">03</span>
          <div>
            <h2 className="sec-h">{t('Read the pattern', '패턴을 읽어드려요')}</h2>
            <p className="sec-sub">
              {t(
                'We cross-reference every ingredient to find what suits you.',
                '모든 성분을 교차 분석해 당신에게 맞는 조합을 찾아냅니다.'
              )}
            </p>
          </div>
        </div>

        <button
          className={cn('prof-go', !canAnalyze && 'prof-go-off')}
          onClick={analyze}
          disabled={!canAnalyze || busy}
        >
          {busy
            ? <><span className="prof-spin" /> {t('Reading…', '읽는 중…')}</>
            : <><Icon name="spark" size={16} /> {t('Analyze my ingredients', '내 성분 분석하기')}</>}
        </button>

        {error && (
          <div className="prof-err">
            {t(`Analysis failed: ${error}`, `분석 중 오류: ${error}`)}
          </div>
        )}

        {result && (
          <article className="prof-result">
            <header className="prof-result-head">
              <Sticker color="sage" rotate={-3}>{t('your profile', '당신의 프로필')}</Sticker>
              <span className="prof-result-meta">
                {works.length + doesnt.length} {t('products analyzed', '개 제품 분석')}
              </span>
            </header>
            <div className="prof-result-body">
              {renderResult(result)}
            </div>
            <p className="prof-disclaimer">
              {t(
                '* Generated by Claude. Not a substitute for medical advice.',
                '* Claude가 생성한 내용입니다. 의학적 조언을 대체하지 않습니다.'
              )}
            </p>
          </article>
        )}
      </section>
    </div>
  );
};

// Search-and-tag bucket used twice (works / doesn't)
window.ProfBucket = function ProfBucket({
  tone, title, sub, icon, products, selected, blocked, onAdd, onRemove, lang,
}) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const t = useL(lang);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const filtered = products.filter(p => {
    if (selected.includes(p.name) || blocked.has(p.name)) return false;
    if (!q.trim()) return true;
    const ql = q.toLowerCase();
    return p.name.toLowerCase().includes(ql) || (p.brand || '').toLowerCase().includes(ql)
      || (p.nameKo || '').toLowerCase().includes(ql);
  });

  return (
    <div className={cn('prof-bucket', `prof-bucket-${tone}`)}>
      <header className="prof-bucket-head">
        <span className={cn('prof-bucket-icon', `prof-bucket-icon-${tone}`)}>
          <Icon name={icon} size={14} />
        </span>
        <div>
          <p className="prof-bucket-title">{title}</p>
          <p className="prof-bucket-sub">{sub}</p>
        </div>
      </header>

      <div className="prof-search" ref={ref}>
        <Icon name="search" size={14} />
        <input
          className="prof-search-in"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={t('Search a product…', '제품 검색…')}
        />
        {q && <button className="prof-search-x" onClick={() => { setQ(''); setOpen(false); }}><Icon name="x" size={14} /></button>}

        {open && filtered.length > 0 && (
          <ul className="prof-drop">
            {filtered.slice(0, 8).map(p => (
              <li key={p.id}>
                <button
                  className="prof-drop-row"
                  onMouseDown={(e) => { e.preventDefault(); onAdd(p.name); setQ(''); setOpen(false); }}
                >
                  <ProductImg src={p.imageUrl} alt={p.name} className="prof-drop-img" />
                  <div className="prof-drop-txt">
                    <p className="prof-drop-name">{lang === 'ko' && p.nameKo ? p.nameKo : p.name}</p>
                    <p className="prof-drop-brand">{p.brand}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected.length > 0 && (
        <div className="prof-tags">
          {selected.map(name => {
            const p = products.find(x => x.name === name);
            const label = lang === 'ko' && p?.nameKo ? p.nameKo : name;
            return (
              <span key={name} className={cn('prof-tag', `prof-tag-${tone}`)}>
                {label}
                <button onClick={() => onRemove(name)} className="prof-tag-x">
                  <Icon name="x" size={12} />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {selected.length === 0 && (
        <div className="prof-empty">
          {t('No products yet — search above.', '제품이 없습니다 — 위에서 검색하세요.')}
        </div>
      )}
    </div>
  );
};
