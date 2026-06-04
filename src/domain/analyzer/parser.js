import { EU26_ALLERGENS, ESSENTIAL_OILS, KNOWN_SENSITIZERS } from './flags.js';

// ── Build known-ingredient name sets for freeform matching ──
var _knownNames = null; // sorted longest-first array of { norm, display }
export function getKnownNames(catalogIngredients, mfdsLookupEn, mfdsLookupKo) {
  if (_knownNames) return _knownNames;
  var nameMap = {}; // norm -> display
  // Hardcoded safety lists
  [EU26_ALLERGENS, ESSENTIAL_OILS, KNOWN_SENSITIZERS].forEach(function(s) {
    s.forEach(function(n) { if (!nameMap[n]) nameMap[n] = n; });
  });
  // MFDS reference
  if (mfdsLookupEn) Object.keys(mfdsLookupEn).forEach(function(k) {
    if (!nameMap[k]) nameMap[k] = mfdsLookupEn[k].inci_name || k;
  });
  if (mfdsLookupKo) Object.keys(mfdsLookupKo).forEach(function(k) {
    if (!nameMap[k]) nameMap[k] = mfdsLookupKo[k].standard_name_ko || k;
  });
  // Active catalog
  if (catalogIngredients) catalogIngredients.forEach(function(ing) {
    var enNorm = (ing.name || '').toLowerCase().replace(/[\s\-]+/g, ' ').trim();
    if (enNorm && !nameMap[enNorm]) nameMap[enNorm] = ing.name;
    var koNorm = (ing.name_ko || '').toLowerCase().replace(/[\s\-]+/g, ' ').trim();
    if (koNorm && !nameMap[koNorm]) nameMap[koNorm] = ing.name_ko;
  });
  // Sort longest-first for greedy matching
  _knownNames = Object.keys(nameMap).map(function(norm) {
    return { norm: norm, display: nameMap[norm] };
  }).sort(function(a, b) { return b.norm.length - a.norm.length; });
  return _knownNames;
}

export function resetKnownNames() {
  _knownNames = null;
}

// ── Freeform parser: longest-match-first against known ingredients ──
export function parseFreeformIngredients(text, catalogIngredients, mfdsLookupEn, mfdsLookupKo) {
  var known = getKnownNames(catalogIngredients, mfdsLookupEn, mfdsLookupKo);
  var input = text.toLowerCase().replace(/[\s\-]+/g, ' ').trim();
  var results = [];
  var seen = new Set();
  var pos = 0;
  while (pos < input.length) {
    // Skip whitespace
    if (input[pos] === ' ') { pos++; continue; }
    var matched = false;
    for (var i = 0; i < known.length; i++) {
      var n = known[i].norm;
      if (input.substring(pos, pos + n.length) === n) {
        // Ensure word boundary (not mid-word)
        var afterEnd = pos + n.length;
        if (afterEnd < input.length && /[a-z0-9]/.test(input[afterEnd])) continue;
        if (!seen.has(n)) {
          seen.add(n);
          results.push({ name: known[i].display, recognized: true });
        }
        pos = afterEnd;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Collect unrecognized chunk until next known match or end
      var start = pos;
      pos++;
      while (pos < input.length) {
        if (input[pos] === ' ') {
          // Check if anything starting at next word matches
          var nextWord = pos + 1;
          var foundNext = false;
          for (var j = 0; j < known.length; j++) {
            if (input.substring(nextWord, nextWord + known[j].norm.length) === known[j].norm) {
              foundNext = true; break;
            }
          }
          if (foundNext) break;
        }
        pos++;
      }
      var chunk = text.substring(start, pos).trim();
      if (chunk && !seen.has(chunk.toLowerCase().replace(/[\s\-]+/g, ' ').trim())) {
        seen.add(chunk.toLowerCase().replace(/[\s\-]+/g, ' ').trim());
        results.push({ name: chunk, recognized: false });
      }
    }
  }
  return results;
}

// ── Parse pasted ingredient list ──
export function parseIngredientList(text, catalogIngredients, mfdsLookupEn, mfdsLookupKo) {
  if (!text || !text.trim()) return [];
  // Strip leading labels
  var cleaned = text.replace(/^(전성분\s*[:：]?|ingredients?\s*[:：]?|성분\s*[:：]?|full\s+ingredients?\s*[:：]?)/i, '').trim();

  // Detect if input has standard delimiters
  var hasDelimiters = /[,\n\u00B7\uFF1B]/.test(cleaned);

  if (hasDelimiters) {
    // Delimited path — split normally
    var preserved = cleaned.replace(/(\d),(\d)/g, '$1\u00A7$2');
    var tokens = preserved.split(/[,\n\u00B7\uFF1B]+/).map(function(t) { return t.replace(/\u00A7/g, ','); });
    var seen = new Set();
    return tokens.map(function(tok) {
      var t = tok.trim();
      if (!t) return null;
      t = t.replace(/\s*[\(\[]\s*\d+[\d.]*\s*%?\s*[\)\]]\s*$/, '').trim();
      t = t.replace(/^\d+[\.\)]\s*/, '').trim();
      if (!t) return null;
      var key = t.toLowerCase().replace(/[\s\-]+/g, ' ').trim();
      if (seen.has(key)) return null;
      seen.add(key);
      return { name: t, recognized: true };
    }).filter(Boolean);
  } else {
    // Freeform path — longest-match-first
    return parseFreeformIngredients(cleaned, catalogIngredients, mfdsLookupEn, mfdsLookupKo);
  }
}
