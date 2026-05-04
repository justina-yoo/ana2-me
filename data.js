// Product data aggregator — collects from individual product files in /products/
(function() {
  var keys = Object.keys(window).filter(function(k) { return k.startsWith('__product_'); });
  window.PRODUCTS = keys.map(function(k) { return window[k]; });
})();
