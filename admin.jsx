// Admin — review moderation
window.Admin = function Admin() {
  const [authed, setAuthed] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_auth');
    if (saved === 'true') setAuthed(true);
  }, []);

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    Promise.all([
      window.__supabase.fetchAllReviews(),
      window.__supabase.fetchProducts()
    ]).then(function([revData, prodData]) {
      setReviews(revData);
      const map = {};
      prodData.forEach(function(p) { map[p.id] = p.brand + ' ' + p.name; });
      setProducts(map);
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

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 28px 80px' }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Review Moderation</h1>

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
    </div>
  );
};
