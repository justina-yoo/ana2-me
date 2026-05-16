// Admin — review moderation + featured articles
window.Admin = function Admin() {
  const [authed, setAuthed] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState({});
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [tab, setTab] = useState('featured');

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_auth');
    if (saved === 'true') setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    Promise.all([
      window.__supabase.fetchAllReviews(),
      window.__supabase.fetchProducts(),
      window.__supabase.fetchArticles()
    ]).then(function([revData, prodData, artData]) {
      setReviews(revData);
      const map = {};
      prodData.forEach(function(p) { map[p.id] = p.brand + ' ' + p.name; });
      setProducts(map);
      setArticles(artData);
      setLoading(false);
    });
  }, [authed]);

  const handleLogin = () => {
    const pw = prompt('Admin password:');
    if (pw === 'ana2me2026') {
      setAuthed(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      alert('Wrong password');
    }
  };

  const handleDelete = (id) => {
    if (!confirm('Delete this review?')) return;
    window.__supabase.deleteReview(id).then(function() {
      setReviews(prev => prev.filter(r => r.id !== id));
    });
  };

  if (!authed) {
    return (
      <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center', padding: '0 28px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Admin</h1>
        <button onClick={handleLogin} style={{
          padding: '12px 32px', fontSize: 14, fontWeight: 600, borderRadius: 8,
          border: '1px solid var(--line)', background: 'var(--cream-card)', cursor: 'pointer',
        }}>
          Login
        </button>
      </div>
    );
  }

  const filtered = filter ? reviews.filter(r => r.product_id === filter) : reviews;
  const productIds = [...new Set(reviews.map(r => r.product_id))];

  const handleToggleFeatured = (id, current) => {
    const newVal = !current ? 'featured' : false;
    window.__supabase.toggleFeatured(id, newVal).then(function() {
      setArticles(prev => prev.map(a => a.id === id ? { ...a, featured: newVal } : a));
    });
  };

  const handleSetPin = (id, num) => {
    if (!num) {
      // Unpin
      window.__supabase.toggleFeatured(id, null).then(function() {
        setArticles(prev => prev.map(a => a.id === id ? { ...a, featured: null } : a));
      });
    } else {
      // If another article has this number, swap it out
      const existing = articles.find(a => a.featured === num && a.id !== id);
      const updates = [window.__supabase.toggleFeatured(id, num)];
      if (existing) updates.push(window.__supabase.toggleFeatured(existing.id, null));
      Promise.all(updates).then(function() {
        setArticles(prev => prev.map(a => {
          if (a.id === id) return { ...a, featured: num };
          if (existing && a.id === existing.id) return { ...a, featured: null };
          return a;
        }));
      });
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 28px 80px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>Admin</h1>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['featured', 'reviews'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 20px', fontSize: 13, fontWeight: 600, borderRadius: 20,
            border: tab === t ? '1px solid var(--ink)' : '1px solid var(--line)',
            background: tab === t ? 'var(--ink)' : 'var(--cream-card)',
            color: tab === t ? '#fff' : 'var(--ink-soft)', cursor: 'pointer', textTransform: 'capitalize',
          }}>{t === 'featured' ? 'Homepage Pins' : 'Reviews'}</button>
        ))}
      </div>

      {/* Homepage Pins Tab */}
      {tab === 'featured' && (
        <div>
          <p style={{ fontSize: 13, color: 'var(--ink-faint)', marginBottom: 16 }}>
            Pin up to 4 articles. <strong>#1</strong> = hero (big card). <strong>#2-4</strong> = "Read these first" section below.
          </p>
          {loading ? <p style={{ color: 'var(--ink-faint)' }}>Loading...</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(() => {
                const pinned = articles.filter(a => a.featured).sort((a, b) => parseInt(a.featured) - parseInt(b.featured));
                const unpinned = articles.filter(a => !a.featured);
                return [...pinned, ...unpinned].map(a => {
                  const num = a.featured ? parseInt(a.featured) : 0;
                  const isPinned = num > 0;
                  return (
                    <div key={a.id} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                      background: num === 1 ? 'rgba(245,166,35,0.08)' : isPinned ? 'rgba(45,90,61,0.06)' : 'var(--cream-card)',
                      border: num === 1 ? '1px solid rgba(245,166,35,0.4)' : isPinned ? '1px solid rgba(45,90,61,0.3)' : '1px solid var(--line)',
                      borderRadius: 'var(--radius-sm)',
                    }}>
                      <select
                        value={a.featured || ''}
                        onChange={(e) => handleSetPin(a.id, e.target.value || null)}
                        style={{
                          fontSize: 12, fontWeight: 700, padding: '4px 6px', borderRadius: 6,
                          border: '1px solid var(--line)', cursor: 'pointer', flexShrink: 0, width: 44,
                          background: num === 1 ? '#f5a623' : isPinned ? 'var(--accent)' : 'var(--cream-card)',
                          color: isPinned ? '#fff' : 'var(--ink-faint)',
                        }}
                      >
                        <option value="">—</option>
                        <option value="1">#1</option>
                        <option value="2">#2</option>
                        <option value="3">#3</option>
                        <option value="4">#4</option>
                      </select>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: a.tagColor }}>{a.tag.en}</span>
                        <h4 style={{ fontSize: 14, fontWeight: 500, margin: '2px 0 0', color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title.en}</h4>
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--ink-faint)', flexShrink: 0 }}>{a.date}</span>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      )}

      {/* Reviews Tab */}
      {tab === 'reviews' && <>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Review Moderation</h2>

      <div style={{ marginBottom: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilter('')}
          style={{
            padding: '6px 14px', fontSize: 12, fontWeight: 600, borderRadius: 20,
            border: filter === '' ? '1px solid var(--ink)' : '1px solid var(--line)',
            background: filter === '' ? 'var(--ink)' : 'var(--cream-card)',
            color: filter === '' ? '#fff' : 'var(--ink-soft)', cursor: 'pointer',
          }}
        >All ({reviews.length})</button>
        {productIds.map(pid => (
          <button
            key={pid}
            onClick={() => setFilter(pid)}
            style={{
              padding: '6px 14px', fontSize: 12, fontWeight: 600, borderRadius: 20,
              border: filter === pid ? '1px solid var(--ink)' : '1px solid var(--line)',
              background: filter === pid ? 'var(--ink)' : 'var(--cream-card)',
              color: filter === pid ? '#fff' : 'var(--ink-soft)', cursor: 'pointer',
            }}
          >{products[pid] || pid} ({reviews.filter(r => r.product_id === pid).length})</button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: 'var(--ink-faint)' }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: 'var(--ink-faint)' }}>No reviews yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(r => {
            const d = new Date(r.created_at);
            const dateStr = d.getFullYear() + '.' + String(d.getMonth()+1).padStart(2,'0') + '.' + String(d.getDate()).padStart(2,'0') + ' ' + String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
            return (
              <div key={r.id} style={{
                padding: '14px 18px', background: 'var(--cream-card)', border: '1px solid var(--line)',
                borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', marginRight: 8 }}>{products[r.product_id] || r.product_id}</span>
                    <span style={{ fontSize: 12, color: 'var(--ink-faint)' }}>{dateStr}</span>
                  </div>
                  <button onClick={() => handleDelete(r.id)} style={{
                    padding: '4px 12px', fontSize: 11, fontWeight: 600, borderRadius: 4,
                    border: '1px solid #c0392b', background: 'transparent', color: '#c0392b', cursor: 'pointer',
                  }}>Delete</button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, color: '#f5a623' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{r.author || 'Anonymous'}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: 0, lineHeight: 1.5 }}>{r.body}</p>
              </div>
            );
          })}
        </div>
      )}
      </>}
    </div>
  );
};
