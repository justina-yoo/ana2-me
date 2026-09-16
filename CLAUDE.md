# ana2me — Project Conventions

This file is read by Claude Code at the start of every session. Honor every rule in it whenever you generate, edit, or review product page copy, article copy, ingredient descriptions, homepage cards, meta tags, or any other content that will be published to ana2-me.com.

## Context

ana2me serves Korean cosmetic consumers and is subject to **Korean MFDS (식약처) cosmetic advertising regulations** and **KFTC fair-trade disclosure rules**. Cosmetics in Korea cannot make medical, therapeutic, or pharmacological claims. Editorial articles have more leeway than product copy, but the BANNED phrases in this file should still be avoided in articles.

**If you are about to write or edit any copy intended for the site, you must apply the rules in this file.** When in doubt, delete the claim rather than soften it.

---

## CRITICAL: MFDS-safe copy rules

### BANNED phrases / patterns — never use anywhere on the site

**Medical / therapeutic verbs:** heal, healing, heals, "speeds up healing", "wound healing", treat, treats, cure, cures, regenerate, regenerates, regeneration. ("Repair" is banned when applied to skin; OK in the sense of "barrier-supporting".)

**Named medical conditions — never claim a cosmetic is "for" these:** eczema, psoriasis, rosacea, dermatitis, atopic dermatitis (아토피, except for products MFDS-registered as 기능성화장품 for atopic moisturization), and any other named disease.

**Pharmacology / mechanism-of-action claims:** "activates [receptor / pathway]", "triggers [biological process]", "inhibits [biological process]", "stimulates collagen synthesis", "boosts collagen production", "signals skin to produce…", "anti-inflammatory", "antibacterial", "antimicrobial", "calms inflammation", "reduces inflammation", "accelerates cell turnover".

**Medical-adjacent positioning:** "dermatologist-recommended" (only allowed with an inline citation), "derma-grade", "hospital-grade", "clinic-grade", "medical-grade", "clinic-level technology", "post-procedure recovery", "post-laser skin", "safe for infants".

**Clinic / injection equivalence:** any phrasing equating a topical cosmetic with a medical injectable or procedure, including "the same molecule used in clinic injections", "now in topical form" framing for PDRN / Rejuran / exosome / Botox / filler.

**Age claims:** "reduces skin age by X years" or any specific age-reversal numbers.

**Wound / injury language:** "broken skin", "damaged areas" (in the medical sense), "small cuts".

**Unsubstantiated superlatives & numbers:** "#1 in [category]", "the only ingredient that…", "the best for…", "most-requested", and specific efficacy percentages or multipliers (e.g. "reduces dryness by 30%", "172x stronger than vitamin C") **unless an inline citation is added with a verifiable date-specific source**.

**Special-flag ingredients (recent MFDS enforcement, extra caution):** exosome, stem cell, human-derived ingredients — do not make efficacy claims around these.

**"Natural" / "organic" claims:** do not use unless the specific product is registered with MFDS under the relevant scheme (Aug 2025 enforcement).

### Safer rephrase patterns

| Risky | Safer |
|---|---|
| heals damaged skin | soothes stressed-looking skin |
| speeds up skin healing | helps skin feel soothed |
| repair (verb, applied to skin) | support |
| anti-inflammatory | soothing |
| antibacterial | clarifying / for blemish-prone skin |
| calms inflammation | helps reduce the appearance of redness |
| treats acne / for acne | for blemish-prone skin |
| reduces wrinkles | helps minimize the appearance of fine lines |
| activates receptors / triggers collagen synthesis | associated with firmer-looking skin |
| dermatologist-recommended | widely recommended (or delete) |
| derma-grade / clinic-level | (delete) |
| post-procedure recovery | for stressed or sensitive-looking skin |
| safe for infants | suitable for sensitive skin |
| #1 ranked | (delete unless inline citation added) |
| eczema / psoriasis / rosacea | dry, sensitive skin |
| broken skin | irritated skin |
| accelerated cell turnover | (delete or rephrase as "renewing") |

### 기능성화장품 (functional cosmetic) registration

The following claim categories are legally restricted in Korea — a product can only make these claims if it is **registered with MFDS as a 기능성화장품** under that category:

- **Whitening / brightening** (미백)
- **Anti-wrinkle / anti-aging** (주름개선)
- **Sunscreen / SPF** (자외선차단)
- **Acne care / 여드름 완화**
- **Atopic moisturization / 아토피 보습**
- **Hair loss alleviation / 탈모 완화**
- **Stretch mark alleviation**
- **Hair coloring / bleaching** (염모 / 탈색)
- **Depilation** (제모)

**Rule when generating new product pages:** whenever copy uses brightening, anti-wrinkle, sunscreen, acne-care, or atopic claims, add an HTML comment directly above the claim:

```
<!-- TODO: Verify this product is registered with MFDS as a functional cosmetic for [category]. If not, soften or remove this claim. -->
```

Then mention the TODO in your closing report to the user so they can verify each one.

---

## When writing a NEW product page

1. Apply every rule above to the meta description, hero copy, every benefit bullet, the "Best For" list, "How to Use", and every Key Ingredient description.
2. Describe products in terms of **sensory and aesthetic outcomes** (texture, finish, feel, appearance), not biological mechanisms.
3. Describe ingredients in terms of **what they are and what they're associated with**, not what they "do" to skin cells.
4. The "Best For" list should describe **skin types and aesthetic concerns** (e.g. "dry skin", "dullness", "loss of elasticity"), never **medical conditions**.
5. If a brand's official marketing copy contains banned language, **do not republish it**. Rewrite it under these rules. We inherit liability for everything we publish, regardless of source.
6. Add 기능성화장품 TODO comments where required.
7. Korean translation (the section under `## 효능` and similar): apply the same rules. Do not translate banned English claims into legal-looking Korean. The Korean version is the version MFDS reads first.

## When writing a NEW article

1. Editorial articles have more leeway than product copy — you can discuss research, mechanisms of action, and even named medical conditions in a **journalistic** frame ("studies have examined…", "research has looked at…").
2. **You may not** present a cosmetic product as a treatment for a medical condition. The line: "azelaic acid has been studied for its effects on skin tone" is OK; "azelaic acid treats rosacea" is not, even in an article.
3. Titles are read as marketing claims under MFDS. Avoid: "the only ingredient that…", "fights [medical condition]", "cures…", "heals…", "#1…", "most-requested…", specific unverified percentage claims.
4. Body copy that quotes a brand's medical claim must contextualize it ("Brand X markets this as…") rather than presenting it as fact.
5. If the article links to or recommends specific products, those products are now under product-copy rules — apply this whole file to those recommendations.

## When editing existing content

Same rules apply. If you are asked to edit a page that contains banned phrases, **fix them in the same edit even if not explicitly asked**. Mention what you fixed in your closing report.

---

## Commercial disclosure (KFTC)

Any product link that is affiliate or sponsored, and any brand partnership content, must include clear disclosure (협찬 / 광고 / affiliate) in compliance with KFTC guidelines. Editorial product mentions without commercial relationships do not need this — but if you don't know which is which, **ask before publishing**.

## Personal data

Any feature that collects user skin information (saved products, "works for me / doesn't work for me", profile data) is collecting **sensitive personal information under PIPA**. Do not implement such features without:

- Explicit user consent at the point of collection
- A clear privacy policy explaining how data is used (especially if processed by AI)
- A user-facing data deletion mechanism
- A mechanism for users to reject automated decision-making (PIPA right)

If asked to implement saving / personalization features, flag these requirements in your response.

---

## Article style rules

**Highlighted phrases (`<mark>` tags):** Cap at **max 2 per language section per article**. Use only for the single most important insight and one secondary insight. Never more. Better to use zero than three. Excessive highlights read as templated AI output to manual reviewers.

---

## Disclaimer

These rules get the site out of the most egregious MFDS territory. They are **not** a substitute for review by a Korean cosmetic regulatory consultant or 화장품 광고 specialist before commercial scale-up. Surface any borderline call to the user; default to deletion when uncertain.
