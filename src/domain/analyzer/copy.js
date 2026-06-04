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
  'soothing-botanical': { en: 'Soothing botanicals', ko: '진정 식물 성분' },
  'active': { en: 'Active ingredients', ko: '활성 성분' },
  'humectant': { en: 'Hydrating humectants', ko: '보습 성분' },
  'emollient': { en: 'Nourishing emollients', ko: '에몰리언트 성분' },
  'barrier-lipid': { en: 'Barrier-supporting lipids', ko: '장벽 지질' },
  'ferment': { en: 'Fermented ingredients', ko: '발효 성분' },
  'peptide': { en: 'Peptides', ko: '펩타이드' },
  'essential-oil': { en: 'Essential oils', ko: '에센셜 오일' },
  'fragrance-allergen': { en: 'Fragrance allergens', ko: '향료 알레르겐' },
  'preservative': { en: 'Preservatives', ko: '방부제' },
  'surfactant': { en: 'Surfactants', ko: '계면활성제' },
  'thickener-texture': { en: 'Texture agents', ko: '텍스처 성분' },
  'antioxidant': { en: 'Antioxidants', ko: '항산화 성분' },
  'solvent-alcohol': { en: 'Solvent alcohols', ko: '알코올 용매' },
  'ph-adjuster': { en: 'pH adjusters', ko: 'pH 조절제' },
  'emulsifier': { en: 'Emulsifiers', ko: '유화제' },
  'chelator': { en: 'Chelating agents', ko: '킬레이팅제' },
  'uncategorized': { en: 'Other ingredients', ko: '기타 성분' },
  'other': { en: 'Other ingredients', ko: '기타 성분' },
};
