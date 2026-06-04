import { MIN_CONFIDENT_PER_SIDE } from './prevalence.js';

// Determine confidence tier for comparative analysis
// 'cold-start'  — too little data to show anything (1+0, 0+1)
// 'early-read'  — both sides have ≥1 but at least one side has only 1 (1+1, 2+1, 1+3)
// 'confident'   — both sides ≥2, OR one side ≥2 with other side 0 (C2/D1 one-sided)
export function determineConfidenceTier(totalW, totalD) {
  var hasBothSides = totalW >= 1 && totalD >= 1;
  var hasOneSideStrong = (totalW >= MIN_CONFIDENT_PER_SIDE || totalD >= MIN_CONFIDENT_PER_SIDE);
  if (hasBothSides && totalW >= MIN_CONFIDENT_PER_SIDE && totalD >= MIN_CONFIDENT_PER_SIDE) return 'confident';
  if (hasBothSides) return 'early-read';
  if (hasOneSideStrong) return 'confident';  // C2 (3+0) or D1 (0+3) — enough for one-sided analysis
  return 'cold-start'; // 1+0 or 0+1 — genuinely too little
}
