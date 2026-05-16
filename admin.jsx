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

  const handleSetRole = (id, role) => {
    // role: 'hero', 'featured', or false
    // If setting hero, unset any existing hero first
    const updates = [];
    if (role === 'hero') {
      const currentHero = articles.find(a => a.featured === 'hero');
      if (currentHero && currentHero.id !== id) {
        updates.push(window.__supabase.toggleFeatured(currentHero.id, 'featured'));
      }
    }
    updates.push(window.__supabase.toggleFeatured(id, role));
    Promise.all(updates).then(function() {
      setArticles(prev => prev.map(a => {
        if (a.id === id) return { ...a, featured: role };
        if (role === 'hero' && a.featured === 'hero') return { ...a, featured: 'featured' };
        return a;
      }));
    });
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
          }}>{t === 'featured' ? 'Featured Articles' : 'Reviews'}</button>
        ))}
      </div>

      {/* Featured Articles Tab */}
      {tab === 'featured' && (
        <div>
          <p style={{ fontSize: 13, color: 'var(--ink-faint)', marginBottom: 16 }}>
            Star articles to feature them. Then use the dropdown to assign one as <strong>Hero</strong> and up to 3 as <strong>Featured</strong>.
          </p>
          {loading ? <p style={{ color: 'var(--ink-faint)' }}>Loading...</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(() => {
                const starred = articles.filter(a => a.featured);
                const unstarred = articles.filter(a => !a.featured);
                return [...starred, ...unstarred].map(a => {
                  const isStarred = !!a.featured;
                  const role = a.featured; // 'hero', 'featured', or false
                  return (
                    <div key={a.id} style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                      background: role === 'hero' ? 'rgba(245,166,35,0.08)' : isStarred ? 'rgba(45,90,61,0.06)' : 'var(--cream-card)',
                      border: role === 'hero' ? '1px solid rgba(245,166,35,0.4)' : isStarred ? '1px solid rgba(45,90,61,0.3)' : '1px solid var(--line)',
                      borderRadius: 'var(--radius-sm)',
                    }}>
                      <button onClick={() => {
                        if (isStarred) {
                          // Unstar
                          window.__supabase.toggleFeatured(a.id, false).then(function() {
                            setArticles(prev => prev.map(x => x.id === a.id ? { ...x, featured: false } : x));
                          });
                        } else {
                          // Star as featured by default
                          window.__supabase.toggleFeatured(a.id, 'featured').then(function() {
                            setArticles(prev => prev.map(x => x.id === a.id ? { ...x, featured: 'featured' } : x));
                          });
                        }
                      }} style={{
                        fontSize: 20, background: 'none', border: 'none', cursor: 'pointer',
                        color: isStarred ? '#f5a623' : 'var(--line)',
                      }}>{isStarred ? '\u2605' : '\u2606'}</button>
                      {isStarred && (
                        <select
                          value={role || 'featured'}
                          onChange={(e) => handleSetRole(a.id, e.target.value)}
                          style={{
                            fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4,
                            border: '1px solid var(--line)', background: role === 'hero' ? '#f5a623' : 'var(--accent)',
                            color: '#fff', cursor: 'pointer', flexShrink: 0, appearance: 'auto',
                          }}
                        >
                          <option value="hero">Hero</option>
                          <option value="featured">Featured</option>
                        </select>
                      )}
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
