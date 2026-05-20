# /analyze Engine Test Scenarios

**Date:** 2026-05-20
**Page:** `localhost:3003/analyze`

---

## Scenario A — Sensitive skin persona (dogfood test)

This is the original dogfood test case. The persona tolerates barrier-focused, soothing products but reacts to actives (retinol), tea tree, and concentrated ferments.

**Works:**
1. `skincare-standard-seoul-barrier-glass` — Standard Seoul Barrier Glass Gel Cream (5 hero-only)
2. `skincare-12` — Lavida Calming Care Gel (7 hero-only)
3. `skincare-5` — La Roche-Posay Cicaplast Balm B5 (5 hero-only)

**Doesn't work:**
1. `skincare-eiom-trouble-patch-mask` — EIoM Trouble Patch Mask (6 hero-only)
2. `skincare-15` — Standard Seoul Firming Bouncy Boost Serum (7 hero-only)
3. `skincare-8` — mixsoon Bean Essence (5 hero-only)

### Expected output

**avoid_ingredients (should surface 1-3):**
- **Retinol** — `is_known_sensitizer=true`, `irritation_risk=moderate`, appears in skincare-15. Confidence: low (1/3). The engine should flag this because of the sensitizer flag + moderate risk.
- **Lactobacillus/Tea Tree Leaf Extract Ferment Filtrate** — `is_known_sensitizer=true`, `irritation_risk=moderate`, appears in skincare-eiom. Confidence: low (1/3). Flagged because tea tree compound is a known sensitizer.
- **Lactobacillus/Soybean Ferment Extract** — `is_known_sensitizer=true`, appears in skincare-8. Confidence: low (1/3). Soy is a known contact sensitizer.
- **Hinoki Water** — `is_known_sensitizer=true` in skincare-12 BUT it's in a "works" product. The engine should NOT flag it because it's in the works list — this tests that the engine correctly handles cross-list ingredients.

**positive_themes (should surface 1-3):**
- **Soothing botanicals** — Panthenol appears in both skincare-standard-seoul-barrier-glass and skincare-5. Madecassoside in skincare-5, Allantoin+Beta-Glucan in doesn't-work (so excluded). But Panthenol is NOT in all 3 works. Fructooligosaccharides and allantoin are in doesn't-work.
- **Active ingredients** — Niacinamide appears in skincare-standard-seoul-barrier-glass AND skincare-12 (2/3 works), but also in skincare-15 (doesn't work) → excluded.
- **Peptides** — 17-Amino-Acid-Complex and Copper-Tripeptide-1 in skincare-12 only (1/3) → not strong enough.

**Realistic expectation:** With hero-only data (5-7 ingredients per product), strong positive themes are unlikely. The 3 works products share Niacinamide and Adenosine but Niacinamide also appears in doesn't-work (skincare-15). Adenosine appears in skincare-standard-seoul-barrier-glass and skincare-12 (2/3). The engine may surface "Active ingredients (Adenosine)" as a weak positive or show the "no strong patterns found" message. This is correct behavior — the dogfood test proved that hero-only data produces limited positive signals.

**recommended_products:** Products with barrier-lipid / soothing-botanical ingredients and zero retinol / tea tree / soy ferment. Likely candidates: Dr. Jart+ Cicapair (skincare-3), COSRX Snail Cream (skincare-14), Biodance Sea Kelp Mask (skincare-13).

**data_quality:** `hero_only_products: 6`, `full_inci_products: 0`, confidence note should warn about limited data.

---

## Scenario B — Brightening seeker with full INCI data

Tests the engine with products that have full INCI lists (skincare-16 to skincare-20). Should produce richer signals.

**Works:**
1. `skincare-16` — Beauty of Joseon Glow Serum (29 ingredients, full INCI)
2. `skincare-17` — Anua Heartleaf 77% Soothing Toner (20 ingredients, full INCI)
3. `skincare-19` — numbuzin No.5+ Vitamin Concentrated Serum (46 ingredients, full INCI)

**Doesn't work:**
1. `skincare-20` — goodal Green Tangerine Vita C Serum (44 ingredients, full INCI)
2. `skincare-18` — SKIN1004 Madagascar Centella Ampoule (6 ingredients — likely incomplete)
3. `skincare-6` — Mediheal Tea Tree Trouble Calming Toner Pads (hero-only)

### Expected output

**avoid_ingredients:**
- goodal Vita C Serum (skincare-20) contains 4 essential oils: **Bergamot fruit oil** (`is_eu_26_fragrance_allergen`), **Lavender oil** (`is_essential_oil`/`is_eu_26_fragrance_allergen`), **Ylang-ylang oil** (`is_eu_26_fragrance_allergen`), **Lemon peel oil** (`is_eu_26_fragrance_allergen`). These should all be flagged as negative signals.
- If Mediheal Tea Tree (skincare-6) has sensitizer-flagged ingredients, those would appear too.

**positive_themes:**
- skincare-16, skincare-17, and skincare-19 all share: Butylene Glycol, 1,2-Hexanediol, Tromethamine, Ethylhexylglycerin, and several botanical extracts (Melia Azadirachta Flower/Leaf, Ocimum Sanctum, Curcuma Longa). If these botanicals are categorized as `soothing-botanical`, expect a theme like "Soothing botanicals" with those examples.
- Niacinamide appears in skincare-16 and skincare-19 (2/3 works) but check if it's also in a doesn't-work product.
- Centella Asiatica appears in skincare-16, skincare-17 (check), and skincare-20 (doesn't work — would exclude it).

**recommended_products:** Products heavy in soothing botanicals with zero essential oils / EU-26 allergens. Likely candidates: Dr. Jart+ Cicapair (skincare-3), Centellian24 Madeca Cream.

**data_quality:** `full_inci_products: 3-4`, `hero_only_products: 2-3`, better confidence than Scenario A.

---

## Scenario C — Minimal overlap test

Tests behavior when works and doesn't-work products are very different (no ingredient overlap). Should produce clear category separation.

**Works:**
1. `skincare-3` — Dr. Jart+ Cicapair Intensive Soothing Repair Cream (hero-only)
2. `skincare-14` — COSRX Advanced Snail 92 All in One Cream (hero-only)
3. `skincare-centellian24-madeca-cream-tight-lifting` — Centellian24 Madeca Cream (hero-only)

**Doesn't work:**
1. `skincare-11` — Round Lab Vita Niacinamide Dark Spot Serum (hero-only)
2. `skincare-9` — Arencia Holy Hyssop Serum 12 (hero-only)
3. `skincare-7` — Arencia Fresh Green Rice Mochi Cleanser (hero-only)

### Expected output

**avoid_ingredients:** Depends on which ingredients in the doesn't-work products have sensitizer flags. If Round Lab / Arencia products contain essential oils or EU-26 allergens in their hero lists, they'll appear. If not, the avoid list may be empty — which is an acceptable result for hero-only data.

**positive_themes:** The "works" products are all creams focused on centella/soothing. If Centella Asiatica Extract appears in all 3 (Dr. Jart+ Cicapair and Centellian24 both center on centella), expect "Soothing botanicals" as a strong theme. COSRX Snail is different — Snail Mucin is not a botanical. Madecassoside (from Centellian24 and Dr. Jart+) appearing in 2/3 works would be a weaker signal.

**recommended_products:** Products heavy in soothing botanicals / centella. Could include LRP Cicaplast (skincare-5), Standard Seoul Barrier Glass, etc.

**data_quality:** All hero-only → strong confidence warning.

---

## How to validate

1. Navigate to `localhost:3003/analyze`
2. Select the products for each scenario
3. Click "Analyze my ingredient pattern"
4. Compare the output against the expected results above
5. Check that:
   - All output strings are MFDS-safe (no banned phrases)
   - avoid_ingredients reasons use "may cause sensitivity" not "will trigger"
   - positive_themes are descriptive, not therapeutic
   - recommended_products link to actual product pages
   - data_quality note accurately reflects hero-only vs full INCI coverage
   - No data is saved (check localStorage, network tab for POSTs)
