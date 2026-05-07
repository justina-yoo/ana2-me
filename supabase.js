// Supabase client — fetches articles and products
(function() {
  var SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
  var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';

  var headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY,
    'Content-Type': 'application/json'
  };

  function query(table, params) {
    var url = SUPABASE_URL + '/rest/v1/' + table;
    if (params) url += '?' + params;
    return fetch(url, { headers: headers }).then(function(r) { return r.json(); });
  }

  // Fetch products and map snake_case → camelCase to match existing components
  window.__supabase = {
    fetchProducts: function() {
      return query('products', 'order=created_at.asc').then(function(rows) {
        return rows.map(function(r) {
          return {
            id: r.id,
            category: r.category,
            name: r.name,
            nameKo: r.name_ko,
            brand: r.brand,
            imageUrl: r.image_url,
            summary: r.summary,
            ingredients: r.ingredients,
            accords: r.accords,
            notes: r.notes,
            performance: r.performance,
            funFacts: r.fun_facts,
            bioValues: r.bio_values,
            reviews: r.reviews
          };
        });
      });
    },
    fetchArticles: function(limit, offset) {
      var params = 'order=created_at.desc';
      if (limit) params += '&limit=' + limit;
      if (offset) params += '&offset=' + offset;
      return query('articles', params).then(function(rows) {
        return rows.map(function(r) {
          return {
            id: r.id,
            category: r.category,
            title: r.title,
            excerpt: r.excerpt,
            readTime: r.read_time,
            date: r.date,
            tag: r.tag,
            tagColor: r.tag_color,
            imageUrl: r.image_url,
            keywords: r.keywords,
            bodyBlocks: r.body_blocks
          };
        });
      });
    }
  };
})();
