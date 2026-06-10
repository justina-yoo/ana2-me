import { useState, useEffect } from 'react';

/**
 * Stale-while-revalidate hook backed by localStorage.
 * Returns { data, loading, error }.
 * - On mount: synchronously initializes state from localStorage if available.
 * - In useEffect: fetches fresh data and updates state + localStorage.
 * - Cache keyed on `key` string. Version your keys (e.g. 'latest-v1').
 * - Default TTL: 7 days. Stale entries are still shown but revalidated.
 * - localStorage failures fall back gracefully — just no cache.
 */
export function useCached(key, fetcher, options = {}) {
  const { ttl = 7 * 24 * 60 * 60 * 1000 } = options;

  const readCache = () => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > ttl) {
        try { localStorage.removeItem(key); } catch {}
        return null;
      }
      return { data, ts };
    } catch { return null; }
  };

  const cached = readCache();

  const [data, setData] = useState(cached ? cached.data : null);
  const [loading, setLoading] = useState(!cached);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then(fresh => {
        if (cancelled) return;
        setData(fresh);
        setLoading(false);
        try {
          localStorage.setItem(key, JSON.stringify({ data: fresh, ts: Date.now() }));
        } catch {}
      })
      .catch(err => {
        if (cancelled) return;
        setError(err);
        setLoading(false);
      });
    return () => { cancelled = true; };
  }, [key]);

  return { data, loading, error };
}
