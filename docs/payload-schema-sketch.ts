/**
 * Payload CMS schema sketch — K-beauty platform
 * ----------------------------------------------
 * Core collections: Articles, Ingredients, Products, Brands, SkinConcerns, Media, Users
 *
 * Key design decisions:
 *  - All user-facing text fields are `localized: true` → Korean + English handled natively
 *  - Articles link to Ingredients & Products by relationship (not free text) → real graph
 *  - Drafts + versions enabled on Articles → write, preview, schedule, publish without deploy
 *  - SkinConcerns is its own taxonomy → shared between articles, ingredients, products
 *  - Ingredients on Products is an array w/ concentration → richer than just a list
 *
 * Run with: npx create-payload-app@latest  (pick TypeScript + Postgres)
 * Then drop these collections into payload.config.ts
 */

import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

/* -------------------------------------------------------------------------- */
/*  ARTICLES — editorial content (5/day target)                               */
/* -------------------------------------------------------------------------- */
export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: { read: () => true },
  versions: {
    drafts: {
      autosave: { interval: 2000 },
      schedulePublish: true, // line up your 5/day in advance
    },
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true, localized: true },

    /* ── Vertical: which side of the platform this belongs to ── */
    {
      name: 'vertical',
      type: 'select',
      required: true,
      index: true,
      admin: { description: 'The product line / surface area. Drives top-level navigation.' },
      options: [
        { label: 'Skincare',  value: 'skincare' },
        { label: 'Wellness',  value: 'wellness' },
        { label: 'Fragrance', value: 'fragrance' },
        // F&B etc. when you expand
      ],
    },

    /* ── Category: what KIND of article this is (orthogonal to vertical) ── */
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Ingredient Deep Dive', value: 'ingredient' },
        { label: 'Routine Guide',         value: 'routine' },
        { label: 'Product Review',        value: 'review' },
        { label: 'Trend Report',          value: 'trend' },
        { label: 'Brand Spotlight',       value: 'brand' },
        { label: 'Skin Science',          value: 'science' },
        { label: 'Comparison',            value: 'comparison' },
      ],
    },

    { name: 'excerpt', type: 'textarea', localized: true, maxLength: 200 },

    /* ── TL;DR: standalone, plain-language summary (replaces v1 ArtTlDr block) ── */
    {
      name: 'tldr',
      type: 'textarea',
      localized: true,
      admin: { description: '2–3 plain-language sentences. Names the key ingredient/mechanism. Stands alone.' },
    },

    /* ── Hero image: canonical (relationship) + URL intake (for the writer agent) ── */
    { name: 'heroImage',    type: 'upload', relationTo: 'media' }, // canonical, set by hook after side-load
    {
      name: 'heroImageUrl',
      type: 'text',
      admin: {
        description: 'Agent-submitted URL. A beforeChange hook side-loads it into Media and sets heroImage.',
        condition: (_, { heroImage }) => !heroImage, // hide once heroImage is populated
      },
    },

    /* ── Body: markdown intake + canonical lexical (kept in sync by hook) ── */
    {
      name: 'bodyMarkdown',
      type: 'textarea',
      localized: true,
      admin: { description: 'Agent-submitted markdown. Server converts to lexical on save.' },
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({}),
      localized: true,
      admin: { description: 'Canonical body. Auto-derived from bodyMarkdown unless edited directly.' },
    },

    /* ── Callouts: structured highlight blocks (replaces v1 ArtCallout JSX) ── */
    {
      name: 'callouts',
      type: 'array',
      maxRows: 3,
      labels: { singular: 'Callout', plural: 'Callouts' },
      fields: [
        {
          name: 'theme',
          type: 'select',
          required: true,
          options: [
            { label: 'Green (nature / positive)', value: 'green' },
            { label: 'Sage (mild / neutral)',     value: 'sage' },
            { label: 'Amber (warning / note)',    value: 'amber' },
          ],
        },
        { name: 'icon',  type: 'text', admin: { description: 'Single emoji, e.g. 🌿' } },
        { name: 'title', type: 'text',     localized: true },
        { name: 'body',  type: 'textarea', localized: true },
      ],
    },

    /* ── Relationships: the moat ── */
    {
      name: 'featuredIngredients',
      type: 'relationship',
      relationTo: 'ingredients',
      hasMany: true,
      admin: { description: 'Ingredients this article focuses on. Auto-renders cards inline.' },
    },
    {
      name: 'featuredProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'skinConcerns',
      type: 'relationship',
      relationTo: 'skin-concerns',
      hasMany: true,
      admin: { description: 'Powers "articles for acne / dryness / pigmentation" filters.' },
    },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      maxDepth: 1,
      filterOptions: ({ id }) => ({ id: { not_equals: id } }),
    },

    /* ── SEO ── */
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle',       type: 'text',     localized: true },
        { name: 'metaDescription', type: 'textarea', localized: true },
        { name: 'ogImage',         type: 'upload',   relationTo: 'media' },
      ],
    },

    /* ── Sidebar ── */
    { name: 'author',      type: 'relationship', relationTo: 'users', required: true, admin: { position: 'sidebar' } },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
    { name: 'readingTime', type: 'number', admin: { position: 'sidebar', readOnly: true } }, // computed in beforeChange hook

    /* ── Provenance: who/what generated this draft ── */
    {
      name: 'generationMeta',
      type: 'group',
      admin: {
        position: 'sidebar',
        description: 'Auto-filled by writer agent. Used later to evaluate which prompt versions produce the best content.',
      },
      fields: [
        { name: 'agentName',    type: 'text' },                            // e.g. "ana2me-writer"
        { name: 'agentVersion', type: 'text' },                            // e.g. "v1.3"
        { name: 'promptHash',   type: 'text' },                            // hash of the system prompt used
        { name: 'modelName',    type: 'text' },                            // e.g. "claude-sonnet-4-6"
        { name: 'generatedAt',  type: 'date' },
        { name: 'humanEdited',  type: 'checkbox', defaultValue: false, label: 'Edited before publish' },
        { name: 'editNotes',    type: 'textarea', admin: { description: 'What you changed and why. Future training signal.' } },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/*  INGREDIENTS — the core of the matching engine                             */
/* -------------------------------------------------------------------------- */
export const Ingredients: CollectionConfig = {
  slug: 'ingredients',
  admin: { useAsTitle: 'inciName', defaultColumns: ['inciName', 'koreanName', 'function'] },
  fields: [
    { name: 'inciName',    type: 'text', required: true, unique: true }, // not localized — INCI is standardized
    { name: 'koreanName',  type: 'text', index: true },
    { name: 'commonName',  type: 'text', localized: true },
    {
      name: 'aliases',
      type: 'array',
      fields: [{ name: 'name', type: 'text' }],
      admin: { description: 'For matching messy ingredient lists from product packaging.' },
    },
    {
      name: 'function',
      type: 'select',
      hasMany: true,
      options: [
        'humectant', 'emollient', 'occlusive', 'exfoliant',
        'antioxidant', 'preservative', 'fragrance', 'colorant',
        'surfactant', 'thickener', 'pH-adjuster', 'anti-inflammatory',
        'brightening', 'soothing', 'barrier-repair',
      ],
    },
    {
      name: 'targetsConcerns',
      type: 'relationship',
      relationTo: 'skin-concerns',
      hasMany: true,
    },
    { name: 'comedogenicRating', type: 'number', min: 0, max: 5 },
    { name: 'ewgRating',         type: 'number', min: 1, max: 10 },
    { name: 'pregnancySafe',     type: 'checkbox' },
    { name: 'description',       type: 'richText', localized: true },
    { name: 'safetyNotes',       type: 'richText', localized: true },
  ],
}

/* -------------------------------------------------------------------------- */
/*  PRODUCTS — actual SKUs                                                    */
/* -------------------------------------------------------------------------- */
export const Products: CollectionConfig = {
  slug: 'products',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'brand', 'category', 'priceKRW'] },
  fields: [
    { name: 'name',  type: 'text', required: true, localized: true },
    { name: 'brand', type: 'relationship', relationTo: 'brands', required: true },
    {
      name: 'category',
      type: 'select',
      options: [
        'cleanser', 'toner', 'essence', 'serum', 'ampoule',
        'moisturizer', 'sunscreen', 'mask', 'exfoliant',
        'oil', 'mist', 'eye-cream', 'spot-treatment',
      ],
    },
    {
      name: 'ingredients',
      type: 'array',
      labels: { singular: 'Ingredient', plural: 'Ingredients' },
      fields: [
        { name: 'ingredient',    type: 'relationship', relationTo: 'ingredients', required: true },
        { name: 'concentration', type: 'text', admin: { description: 'e.g. "5%", "trace", or leave blank' } },
        { name: 'isKey',         type: 'checkbox', label: 'Key ingredient' },
        { name: 'orderInList',   type: 'number', admin: { description: 'Order on package (1 = first)' } },
      ],
    },
    {
      name: 'targetSkinTypes',
      type: 'select',
      hasMany: true,
      options: ['dry', 'oily', 'combination', 'sensitive', 'normal', 'mature', 'acne-prone'],
    },
    {
      name: 'targetConcerns',
      type: 'relationship',
      relationTo: 'skin-concerns',
      hasMany: true,
    },
    { name: 'priceKRW',   type: 'number' },
    { name: 'sizeML',     type: 'number' },
    { name: 'paoMonths',  type: 'number', admin: { description: 'Period after opening, in months' } },
    { name: 'images',     type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'launchDate', type: 'date' },
    {
      name: 'purchaseLinks',
      type: 'array',
      fields: [
        { name: 'retailer', type: 'select', options: ['Olive Young', 'Coupang', 'Musinsa', 'Brand Site', 'YesStyle', 'Other'] },
        { name: 'url',      type: 'text' },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------- */
/*  BRANDS                                                                    */
/* -------------------------------------------------------------------------- */
export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name',          type: 'text', required: true },
    { name: 'koreanName',    type: 'text' },
    { name: 'logo',          type: 'upload', relationTo: 'media' },
    { name: 'description',   type: 'richText', localized: true },
    { name: 'foundedYear',   type: 'number' },
    { name: 'country',       type: 'text', defaultValue: 'KR' },
    { name: 'website',       type: 'text' },
    { name: 'parentCompany', type: 'text', admin: { description: 'e.g. AmorePacific, LG H&H' } },
  ],
}

/* -------------------------------------------------------------------------- */
/*  SKIN CONCERNS — shared taxonomy                                           */
/* -------------------------------------------------------------------------- */
export const SkinConcerns: CollectionConfig = {
  slug: 'skin-concerns',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name',        type: 'text', required: true, localized: true },
    { name: 'slug',        type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea', localized: true },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'skin-concerns',
      admin: { description: 'For hierarchy: "acne" → "hormonal acne", "fungal acne", etc.' },
    },
  ],
}

/* -------------------------------------------------------------------------- */
/*  MEDIA — handles all image uploads                                         */
/* -------------------------------------------------------------------------- */
export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400,  height: 300 },
      { name: 'card',      width: 768,  height: 512 },
      { name: 'hero',      width: 1920, height: 1080 },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    { name: 'alt',     type: 'text', required: true, localized: true },
    { name: 'caption', type: 'text', localized: true },
  ],
}
