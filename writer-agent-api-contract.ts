/**
 * Writer Agent ↔ Payload CMS — API Contract
 * ------------------------------------------
 * What the ana2me writer agent sends to Payload to create an article draft.
 *
 * Flow:
 *   1. Agent queries Payload to discover real ingredient/product/concern IDs
 *   2. Agent writes article body in Markdown (easier than lexical JSON)
 *   3. Agent POSTs draft → Payload converts markdown → lexical → saves as draft
 *   4. You review in Payload admin → publish (or edit + publish)
 *
 * Auth: each agent gets its own Payload user with API key enabled.
 *       Header: `Authorization: users API-Key <KEY>`
 */

const CMS = 'https://cms.ana2me.com' // your Payload deployment

/* ────────────────────────────────────────────────────────────────────────── */
/*  STEP 1: DISCOVERY — agent queries the graph BEFORE writing                */
/*  This is the unlock. The agent only references things that actually exist. */
/* ────────────────────────────────────────────────────────────────────────── */

// Find an ingredient by name (handles INCI, Korean, common, and aliases)
async function findIngredient(query: string) {
  const res = await fetch(
    `${CMS}/api/ingredients?where[or][0][inciName][like]=${query}` +
    `&where[or][1][koreanName][like]=${query}` +
    `&where[or][2][commonName][like]=${query}` +
    `&limit=5`,
    { headers: { Authorization: `users API-Key ${process.env.AGENT_KEY}` } }
  )
  return res.json() // → { docs: [{ id, inciName, koreanName, function, ... }] }
}

// List products that target a given skin concern
async function findProductsForConcern(concernId: string) {
  const res = await fetch(
    `${CMS}/api/products?where[targetConcerns][in]=${concernId}&limit=20`,
    { headers: { Authorization: `users API-Key ${process.env.AGENT_KEY}` } }
  )
  return res.json()
}

// Get all skin concerns (small list — agent caches this)
async function listSkinConcerns() {
  const res = await fetch(`${CMS}/api/skin-concerns?limit=100`)
  return res.json()
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  STEP 2: AGENT PRODUCES THIS PAYLOAD                                        */
/*  Markdown body, real IDs in the relationship fields, draft status.         */
/* ────────────────────────────────────────────────────────────────────────── */

interface ArticleDraft {
  // Localized text — Payload expects { en: '...', ko: '...' } when localization is on
  title: { en: string; ko: string }
  slug:  { en: string; ko: string }
  excerpt: { en: string; ko: string }

  category:
    | 'ingredient' | 'routine' | 'review' | 'trend'
    | 'brand' | 'science' | 'comparison'

  // Body comes in as Markdown; a Payload `beforeChange` hook converts to lexical JSON.
  // (Saves you from making the agent emit lexical AST.)
  bodyMarkdown: { en: string; ko: string }

  // RELATIONSHIPS — IDs from STEP 1 discovery
  featuredIngredients: string[] // ingredient IDs
  featuredProducts:    string[] // product IDs
  skinConcerns:        string[] // skin-concern IDs
  relatedArticles?:    string[] // optional

  // Hero image: agent leaves blank or references an existing media ID.
  // Image generation/selection is a separate step — don't block drafts on it.
  heroImage?: string

  seo: {
    metaTitle:       { en: string; ko: string }
    metaDescription: { en: string; ko: string }
  }

  author:   string  // the agent's user ID in Payload
  _status:  'draft' // ALWAYS draft — never auto-publish in v1

  generationMeta: {
    agentName:    string  // 'ana2me-writer'
    agentVersion: string  // 'v1.0.0'
    promptHash:   string  // sha256 of the system prompt — lets you correlate quality to prompt
    modelName:    string  // 'claude-sonnet-4-6'
    generatedAt:  string  // ISO timestamp
  }
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  STEP 3: POST IT                                                            */
/* ────────────────────────────────────────────────────────────────────────── */

async function createDraft(draft: ArticleDraft) {
  const res = await fetch(`${CMS}/api/articles`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `users API-Key ${process.env.AGENT_KEY}`,
    },
    body: JSON.stringify(draft),
  })

  if (!res.ok) throw new Error(`Payload rejected draft: ${await res.text()}`)
  return res.json() // → { doc: { id, ... }, message: 'Article successfully created.' }
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  EXAMPLE: a real payload the agent might send                              */
/* ────────────────────────────────────────────────────────────────────────── */

const examplePayload: ArticleDraft = {
  title: {
    en: 'Niacinamide vs. Tranexamic Acid: Which One Actually Fades Hyperpigmentation?',
    ko: '나이아신아마이드 vs 트라넥사믹산: 색소침착에 진짜 효과 있는 건?',
  },
  slug: {
    en: 'niacinamide-vs-tranexamic-acid-hyperpigmentation',
    ko: '나이아신아마이드-트라넥사믹산-색소침착',
  },
  category: 'comparison',
  excerpt: {
    en: 'Two of the most-hyped brightening ingredients in K-beauty, head-to-head on the science.',
    ko: 'K-뷰티에서 가장 핫한 미백 성분 두 가지, 과학적 근거로 비교합니다.',
  },
  bodyMarkdown: {
    en: `## The short answer\n\nBoth work. Tranexamic acid has stronger clinical evidence for melasma...`,
    ko: `## 간단히 말하면\n\n둘 다 효과가 있습니다. 트라넥사믹산은 기미에 대한 임상 근거가 더 강하고...`,
  },

  // From STEP 1 discovery
  featuredIngredients: [
    '6634a1b2c3d4e5f6a7b8c9d0', // Niacinamide
    '6634a1b2c3d4e5f6a7b8c9d1', // Tranexamic Acid
  ],
  featuredProducts: [
    '6634b2c3d4e5f6a7b8c9d0e1', // Beauty of Joseon Glow Serum
    '6634b2c3d4e5f6a7b8c9d0e2', // Torriden DIVE-IN Serum
  ],
  skinConcerns: [
    '6634c3d4e5f6a7b8c9d0e1f2', // hyperpigmentation
    '6634c3d4e5f6a7b8c9d0e1f3', // melasma
  ],

  seo: {
    metaTitle: {
      en: 'Niacinamide vs Tranexamic Acid for Pigmentation | ana2me',
      ko: '나이아신아마이드 vs 트라넥사믹산 색소침착 비교 | ana2me',
    },
    metaDescription: {
      en: 'A science-backed comparison of two top brightening ingredients in K-beauty.',
      ko: '과학적 근거에 기반한 K-뷰티 미백 성분 비교 분석.',
    },
  },

  author: '6634d4e5f6a7b8c9d0e1f2a3', // ana2me-writer agent's user ID
  _status: 'draft',

  generationMeta: {
    agentName:    'ana2me-writer',
    agentVersion: 'v1.0.0',
    promptHash:   'sha256:a1b2c3d4...',
    modelName:    'claude-sonnet-4-6',
    generatedAt:  '2026-05-04T10:30:00Z',
  },
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  STEP 4 (server-side): markdown → lexical conversion                       */
/*  Add this as a `beforeChange` hook on the Articles collection so the       */
/*  agent never has to deal with lexical AST.                                 */
/* ────────────────────────────────────────────────────────────────────────── */

/*
import { convertMarkdownToLexical } from '@payloadcms/richtext-lexical'

export const articlesBeforeChange = async ({ data }) => {
  if (data.bodyMarkdown?.en && !data.body?.en) {
    data.body = {
      en: convertMarkdownToLexical({ markdown: data.bodyMarkdown.en }),
      ko: convertMarkdownToLexical({ markdown: data.bodyMarkdown.ko }),
    }
  }
  return data
}
*/

/* ────────────────────────────────────────────────────────────────────────── */
/*  GUARDRAILS to add in Payload (cheap, do them on day 1)                    */
/* ────────────────────────────────────────────────────────────────────────── */

/*
 *  1. Rate-limit the agent's user to N drafts/hour at the access layer.
 *     Prevents a runaway loop dumping 10,000 drafts overnight.
 *
 *  2. `access.create` rule on Articles: only allow `_status: 'draft'`
 *     when the request comes from an agent user. Humans can publish; agents can't.
 *
 *  3. Required-relationship validation: reject drafts where featuredIngredients
 *     references a non-existent ID. Catches hallucinations early.
 *
 *  4. Min/max length on bodyMarkdown — reject 50-word stubs and 20,000-word essays.
 *
 *  5. A nightly cron that emails you "X drafts pending review" so they don't pile up.
 */
