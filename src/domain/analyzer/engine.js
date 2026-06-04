import { POTENT_ACTIVES } from './flags.js';
import { PREVALENCE_CEILING } from './prevalence.js';

// ── Resolve Korean name from MFDS reference ──
export function resolveKoName(ing, mfdsLookupEn) {
  if (ing.name_ko) return ing.name_ko;
  if (!mfdsLookupEn) return null;
  var norm = (ing.name || '').toLowerCase().replace(/[\s\-]+/g, ' ').trim();
  var entry = mfdsLookupEn[norm];
  return entry ? entry.standard_name_ko : null;
}

// ── Enrich ingredient row into display object ──
export function enrichIngredient(r, mfdsLookupEn) {
  var ing = r.ingredient; if (!ing) return null;
  var isFlagged = ing.is_known_sensitizer || ing.is_eu_26_fragrance_allergen ||
                  ing.is_essential_oil || ing.irritation_risk === 'high' || ing.irritation_risk === 'medium';
  return {
    id: ing.id,
    name: ing.name,
    name_ko: ing.name_ko || resolveKoName(ing, mfdsLookupEn),
    symbol: ing.symbol || (ing.name || '').substring(0, 2).toUpperCase(),
    category: ing.category || 'uncategorized',
    description: ing.description,
    description_ko: ing.description_ko,
    science: ing.science,
    science_ko: ing.science_ko,
    is_hero: r.is_hero,
    sort_order: r.sort_order,
    flagged: isFlagged,
    flag_type: ing.is_eu_26_fragrance_allergen ? 'eu26' : ing.is_essential_oil ? 'essential-oil' : ing.is_known_sensitizer ? 'sensitizer' : (ing.irritation_risk === 'high' || ing.irritation_risk === 'medium') ? 'irritant' : null,
    irritation_risk: ing.irritation_risk,
    contains_flagged_component: ing.contains_flagged_component,
    flagged_component_reasons: ing.flagged_component_reasons
  };
}

export function isFlaggedIng(ing) {
  return ing.is_known_sensitizer || ing.is_eu_26_fragrance_allergen ||
         ing.is_essential_oil || ing.irritation_risk === 'high' || ing.irritation_risk === 'medium' ||
         POTENT_ACTIVES.has((ing.name || '').toLowerCase());
}

export function isEligible(item) {
  // FIX 1b: prevalence ceiling — too ubiquitous to discriminate
  if (item.prevalence >= PREVALENCE_CEILING) return false;
  // FIX 3: present on both sides above 50% — common/tolerated, not a trigger
  if (item.worksRate >= 0.5 && item.doesntRate >= 0.5) return false;
  return true;
}

// FIX 4: negative sort comparator (flagged first → |signal| desc → prevalence asc)
export function negSortCmp(a, b) {
  var af = isFlaggedIng(a.ing) ? 1 : 0;
  var bf = isFlaggedIng(b.ing) ? 1 : 0;
  if (bf !== af) return bf - af;
  if (Math.abs(a.signal) !== Math.abs(b.signal)) return Math.abs(b.signal) - Math.abs(a.signal);
  return a.prevalence - b.prevalence;
}

// FIX 4: positive sort comparator (|signal| desc → prevalence asc, no flag boost)
export function posSortCmp(a, b) {
  if (b.signal !== a.signal) return b.signal - a.signal;
  return a.prevalence - b.prevalence;
}

export function enrichForResult(item, mfdsLookupEn) {
  var ing = item.ing;
  var flagType = ing.is_eu_26_fragrance_allergen ? 'eu26' : ing.is_essential_oil ? 'essential-oil'
               : ing.is_known_sensitizer ? 'sensitizer'
               : POTENT_ACTIVES.has((ing.name || '').toLowerCase()) ? 'potent-active'
               : (ing.irritation_risk === 'high' || ing.irritation_risk === 'medium') ? 'irritant' : null;
  return {
    ingredient_name_en: ing.name,
    ingredient_name_ko: ing.name_ko || resolveKoName(ing, mfdsLookupEn),
    symbol: ing.symbol || (ing.name || '').substring(0, 2).toUpperCase(),
    category: ing.category,
    description: ing.description, description_ko: ing.description_ko,
    science: ing.science, science_ko: ing.science_ko,
    flagged: isFlaggedIng(ing),
    flag_type: flagType,
    contains_flagged_component: ing.contains_flagged_component,
    flagged_component_reasons: ing.flagged_component_reasons,
    worksCount: item.worksCount,
    doesntCount: item.doesntCount,
    signal: item.signal,
    prevalence: item.prevalence
  };
}
