// ── MFDS banned-phrase checker ──
// mfds-ignore-start
export var BANNED_RE = /\b(heal|healing|heals|treat|treats|cure|cures|regenerate|regenerates|regeneration|anti-inflammatory|antibacterial|antimicrobial|calms?\s+inflammation|reduces?\s+inflammation|accelerates?\s+cell\s+turnover|stimulates?\s+collagen|boosts?\s+collagen|activates?\s+receptor|triggers?\s+\w+\s+process|inhibits?\s+\w+|eczema|psoriasis|rosacea|dermatitis|dermatologist-recommended|derma-grade|clinic-grade|medical-grade|hospital-grade|post-procedure|safe\s+for\s+infants|broken\s+skin|wound\s+healing|allergic\s+reaction)\b/gi;

export function mfdsSafe(str) {
  if (!str) return str;
  return str.replace(BANNED_RE, function(match) {
    var lower = match.toLowerCase();
    if (/heal|healing|heals/.test(lower)) return 'soothe';
    if (/treat|treats/.test(lower)) return 'support';
    if (/cure|cures/.test(lower)) return 'support';
    if (/anti-inflammatory/.test(lower)) return 'soothing';
    if (/antibacterial|antimicrobial/.test(lower)) return 'clarifying';
    if (/inflammation/.test(lower)) return 'the appearance of redness';
    if (/allergic reaction/.test(lower)) return 'sensitivity';
    if (/eczema|psoriasis|rosacea|dermatitis/.test(lower)) return 'sensitive skin';
    if (/broken skin/.test(lower)) return 'irritated skin';
    if (/wound healing/.test(lower)) return 'skin comfort';
    return '';
  });
}
// mfds-ignore-end

// ── Category display names ──
export var CATEGORY_LABELS = {
  'soothing-botanical': { en: 'Soothing', ko: '진정' },
  'active': { en: 'Active', ko: '활성' },
  'humectant': { en: 'Hydrating', ko: '보습' },
  'emollient': { en: 'Emollient', ko: '에몰리언트' },
  'barrier-lipid': { en: 'Barrier', ko: '장벽' },
  'ferment': { en: 'Ferment', ko: '발효' },
  'peptide': { en: 'Peptide', ko: '펩타이드' },
  'essential-oil': { en: 'Essential oil', ko: '에센셜 오일' },
  'fragrance-allergen': { en: 'Fragrance', ko: '향료' },
  'preservative': { en: 'Preservative', ko: '방부제' },
  'surfactant': { en: 'Surfactant', ko: '계면활성제' },
  'thickener-texture': { en: 'Texture', ko: '텍스처' },
  'antioxidant': { en: 'Antioxidant', ko: '항산화' },
  'solvent-alcohol': { en: 'Solvent', ko: '용매' },
  'ph-adjuster': { en: 'pH adjuster', ko: 'pH 조절' },
  'emulsifier': { en: 'Emulsifier', ko: '유화제' },
  'chelator': { en: 'Chelator', ko: '킬레이팅' },
  'uncategorized': { en: 'Other', ko: '기타' },
  'other': { en: 'Other', ko: '기타' },
};
