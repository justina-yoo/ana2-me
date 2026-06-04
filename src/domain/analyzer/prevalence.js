// ── Tunable constants ──
export var PREVALENCE_CEILING = 0.8;        // FIX 1b: ingredient in ≥80% of ALL products → excluded
export var MIN_CONFIDENT_PER_SIDE = 2;      // FIX 2: both sides need ≥2 for confident mode
export var POSITIVE_LIST_MAX = 10;
export var NEGATIVE_LIST_MAX = 8;

// FIX 1a: base/vehicle ingredients that never carry signal
export var SKIP_BASE_NAMES = new Set([
  'water', 'aqua', 'glycerin', 'butylene glycol', 'propanediol', '1,2-hexanediol',
  'dipropylene glycol', 'pentylene glycol', 'caprylyl glycol', 'ethylhexylglycerin',
  'hexylene glycol', 'propylene glycol', 'methylpropanediol'
]);

export var SKIP_CATS = { 'uncategorized': true, 'thickener-texture': true, 'ph-adjuster': true,
  'emulsifier': true, 'chelator': true, 'solvent-alcohol': true, 'other': true };
