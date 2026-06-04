// Barrel export for analyzer domain
export { EU26_ALLERGENS, ESSENTIAL_OILS, KNOWN_SENSITIZERS, POTENT_ACTIVES, getFlaggedComponent, matchParsedIngredients } from './flags.js';
export { getKnownNames, resetKnownNames, parseFreeformIngredients, parseIngredientList } from './parser.js';
export { BANNED_RE, mfdsSafe, CATEGORY_LABELS } from './copy.js';
export { PREVALENCE_CEILING, MIN_CONFIDENT_PER_SIDE, POSITIVE_LIST_MAX, NEGATIVE_LIST_MAX, SKIP_BASE_NAMES, SKIP_CATS } from './prevalence.js';
export { resolveKoName, enrichIngredient, isFlaggedIng, isEligible, negSortCmp, posSortCmp, enrichForResult } from './engine.js';
export { determineConfidenceTier } from './scenarios.js';
