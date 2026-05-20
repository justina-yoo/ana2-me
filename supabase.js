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
      // Junction-primary: read hero ingredients from products_ingredients → ingredients catalog
      // TODO: remove JSONB fallback after 2026-05-27 if junction is stable
      return query('products', 'select=*,products_ingredients(sort_order,is_hero,display_group,display_copy,ingredient:ingredients(id,name,name_ko,symbol,category,is_known_sensitizer,irritation_risk,contains_flagged_component,flagged_component_reasons))&order=created_at.desc').then(function(rows) {
        return rows.map(function(r) {
          // Build hero ingredients from junction if available, fallback to JSONB
          var piRows = r.products_ingredients;
          var heroIngs;
          if (piRows && piRows.length > 0) {
            heroIngs = piRows
              .filter(function(pi) { return pi.is_hero; })
              .sort(function(a, b) { return (a.sort_order || 999) - (b.sort_order || 999); })
              .filter(function(pi) {
                // For display groups, only show the primary row (the one with display_copy)
                if (pi.display_group != null && !pi.display_copy) return false;
                return true;
              })
              .map(function(pi) {
                var ing = pi.ingredient || {};
                var dc = pi.display_copy || {};
                return {
                  id: ing.id,
                  name: ing.name,
                  nameKo: ing.name_ko,
                  symbol: dc.symbol || ing.symbol,
                  percentage: dc.percentage,
                  description: dc.description || ing.description,
                  descriptionKo: dc.descriptionKo || ing.description_ko,
                  science: dc.science || ing.science,
                  scienceKo: dc.scienceKo || ing.science_ko,
                  category: ing.category,
                  isSensitizer: ing.is_known_sensitizer,
                  irritationRisk: ing.irritation_risk,
                  containsFlaggedComponent: ing.contains_flagged_component,
                  flaggedComponentReasons: ing.flagged_component_reasons
                };
              });
          } else {
            // JSONB fallback — same shape as before
            heroIngs = r.ingredients;
          }
          return {
            id: r.id,
            category: r.category,
            name: r.name,
            nameKo: r.name_ko,
            brand: r.brand,
            imageUrl: r.image_url,
            summary: r.summary,
            ingredients: heroIngs,
            accords: r.accords,
            notes: r.notes,
            performance: r.performance,
            funFacts: r.fun_facts,
            bioValues: r.bio_values,
            reviews: r.reviews,
            createdAt: r.created_at
          };
        });
      });
    },
    fetchReviews: function(productId) {
      return query('reviews', 'product_id=eq.' + productId + '&order=created_at.desc');
    },
    submitReview: function(review) {
      return fetch(SUPABASE_URL + '/rest/v1/reviews', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(review)
      }).then(function(r) {
        if (!r.ok) return r.json().then(function(e) { throw new Error(e.message || 'Failed'); });
        return true;
      });
    },
    deleteReview: function(id) {
      return fetch(SUPABASE_URL + '/rest/v1/reviews?id=eq.' + id, {
        method: 'DELETE',
        headers: headers
      });
    },
    fetchAllReviews: function() {
      return query('reviews', 'order=created_at.desc');
    },
    fetchFeaturedArticles: function() {
      return query('articles', 'featured=not.is.null&order=created_at.desc').then(function(rows) {
        return rows.map(function(r) {
          return {
            id: r.id, category: r.category, title: r.title, excerpt: r.excerpt,
            readTime: r.read_time, date: r.date, tag: r.tag, tagColor: r.tag_color,
            imageUrl: r.image_url, keywords: r.keywords, bodyBlocks: r.body_blocks,
            featured: r.featured
          };
        });
      });
    },
    fetchLatestArticles: function(limit) {
      return query('articles', 'order=created_at.desc&limit=' + (limit || 3)).then(function(rows) {
        return rows.map(function(r) {
          return {
            id: r.id, category: r.category, title: r.title, excerpt: r.excerpt,
            readTime: r.read_time, date: r.date, tag: r.tag, tagColor: r.tag_color,
            imageUrl: r.image_url, keywords: r.keywords
          };
        });
      });
    },
    toggleFeatured: function(id, value) {
      return fetch(SUPABASE_URL + '/rest/v1/articles?id=eq.' + id, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({ featured: value })
      });
    },
    // Fetch full junction data for analysis — ALL products, ALL ingredients (not just heroes)
    fetchAnalyzeData: function(productIds) {
      // 1) Full junction rows for the input products
      var piQuery = 'product_id=in.(' + productIds.join(',') + ')&select=product_id,ingredient_id,sort_order,is_hero,ingredient:ingredients(id,name,name_ko,symbol,category,is_known_sensitizer,is_eu_26_fragrance_allergen,is_essential_oil,irritation_risk)&order=product_id.asc,sort_order.asc';
      // 2) All junction rows (for recommendation scoring)
      var allPiQuery = 'select=product_id,ingredient_id,is_hero,ingredient:ingredients(id,category,is_known_sensitizer,is_eu_26_fragrance_allergen,is_essential_oil,irritation_risk)&order=product_id.asc';
      return Promise.all([
        query('products_ingredients', piQuery),
        query('products_ingredients', allPiQuery)
      ]).then(function(results) {
        return { inputRows: results[0], allRows: results[1] };
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
            bodyBlocks: r.body_blocks,
            featured: r.featured
          };
        });
      });
    }
  };
})();
