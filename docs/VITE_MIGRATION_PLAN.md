# Vite Migration Plan — ana2me

## Current State

- React 18 SPA with **in-browser Babel transpilation** (no build step)
- 24 JSX files (~4,941 lines) + 241-line inline App component in index.html
- All components exported as `window.ComponentName` globals (no ES modules)
- React, ReactDOM, Babel loaded from unpkg CDN (~700KB Babel overhead)
- 15 product data files as `window.__product_*` globals
- Single CSS file (1,470 lines)
- Hosted on Netlify with Edge Functions for SSR/OG injection

## Why Migrate

| Issue | Impact |
|---|---|
| Babel standalone (~700KB) loaded on every page | +200ms load time |
| JSX transpiled in-browser on every visit | +100-200ms before content renders |
| No tree-shaking or dead code elimination | Larger runtime payload |
| No HMR (hot module replacement) | Slow dev iteration |
| No TypeScript support | No type safety |
| Cache-busted via `?v=` query params | Vite does content-hashed filenames |

## Migration Steps

### Step 1 — Initialize Vite project (15 min)

```bash
cd /Users/justina/Desktop/ana2me
npm init -y
npm install react react-dom
npm install -D vite @vitejs/plugin-react
```

Create `vite.config.js`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  }
})
```

### Step 2 — Create src/ directory structure (10 min)

```
src/
  main.jsx          ← extracted from inline script in index.html
  App.jsx           ← App + Tweaks components from inline script
  components/
    Header.jsx      ← from header.jsx
    Feed.jsx        ← from feed.jsx
    Detail.jsx      ← from detail.jsx
    Insights.jsx    ← from insights.jsx
    Analyzer.jsx    ← from analyzer.jsx
    About.jsx       ← from about.jsx
    Privacy.jsx     ← from privacy.jsx
    BlockRenderer.jsx ← from block-renderer.jsx
    primitives.jsx  ← from primitives.jsx (exports: useLocalState, cn, useL, Icon, Sticker, Chip, Card, ProductImg)
  lib/
    supabase.js     ← from supabase.js (convert to ES module)
    seo.js          ← from seo.js (convert to ES module)
  data/
    products.js     ← merge all 15 products/*.js into single ES module export
  articles/
    *.jsx           ← keep as-is, add import/export
  styles.css        ← move from root
```

### Step 3 — Convert window globals to ES module imports (45 min)

This is the bulk of the work. For each file:

**Pattern to replace:**
```js
// Before (every file)
window.Header = function Header({ lang, ... }) { ... };

// After
import { useL, cn, Icon } from './primitives';
export default function Header({ lang, ... }) { ... }
```

**Files by complexity:**

| File | Lines | Globals Used | Difficulty |
|---|---|---|---|
| primitives.jsx | ~200 | Exports 8 utilities | Easy — just add `export` |
| header.jsx | 130 | useL, cn, Icon | Easy |
| feed.jsx | 146 | useL, cn, ProductImg | Easy |
| block-renderer.jsx | 100 | ArtTlDr, ArtSection, etc. from primitives | Easy |
| about.jsx | 205 | useL | Easy |
| privacy.jsx | 112 | useL | Easy |
| analyzer.jsx | 278 | useL, cn | Easy |
| detail.jsx | 684 | useL, cn, Icon, ProductImg, Sticker, Chip + SEO + supabase | Medium |
| insights.jsx | 1,573 | Everything + article components + SEO + supabase | Hard |
| App (inline) | 241 | All components + supabase + SEO + tweaks | Hard |

**For each file:**
1. Add `import React from 'react'` (if using JSX — Vite plugin handles this automatically with new JSX transform, so may not be needed)
2. Replace `window.ComponentName = function` → `export default function`
3. Replace `window.useL(lang)` → `import { useL } from '../components/primitives'`
4. Replace `window.__supabase.fetchX()` → `import { fetchProducts, fetchArticles } from '../lib/supabase'`
5. Replace `window.SEO.setX()` → `import SEO from '../lib/seo'`

### Step 4 — Extract inline App from index.html (15 min)

The 241-line inline `<script type="text/babel">` block becomes:

**src/App.jsx** — App component, Tweaks component, TWEAK_DEFAULTS, FONT_PAIRS, ACCENTS constants

**src/main.jsx:**
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```

### Step 5 — Merge product data files (10 min)

Replace 15 individual `window.__product_*` files with:

**src/data/products.js:**
```js
export const products = [
  { id: 'skincare-3', ... },
  { id: 'skincare-4', ... },
  // ...all 15 products
]
```

Or better: delete them entirely since products are already fetched from Supabase at runtime.

### Step 6 — Update index.html (10 min)

**Before:** 30+ script tags (CDN + Babel + JSX files)
**After:**
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>ana2me — Know What's In Your Bottle</title>
  <!-- all existing meta/OG tags stay -->
  <link rel="alternate" type="application/rss+xml" title="ana2me Insights" href="/feed.xml" />
</head>
<body>
  <div id="top-anchor" style="height:0;overflow:hidden"></div>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
  <!-- Google Analytics stays -->
</body>
</html>
```

### Step 7 — Update Netlify config (5 min)

**netlify.toml** — add build command:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[edge_functions]]
  function = "og-inject"
  path = "/article/*"

[[edge_functions]]
  function = "og-inject"
  path = "/products/*"
```

Move `_redirects` into `public/` so Vite copies it to `dist/`.

Move static assets (favicon, og-default.png, robots.txt, sitemap.xml, feed.xml, product images) into `public/`.

### Step 8 — Test and verify (15 min)

1. `npm run dev` — verify all pages work locally
2. `npm run build` — verify production build
3. Check Edge Functions still work (SSR content injection)
4. Check all routes resolve correctly
5. Verify no visual changes
6. Push and verify on Netlify

## What Does NOT Change

- Visual design — zero CSS changes
- Editorial content — untouched
- Edge Functions — SSR injection stays the same
- Supabase backend — same API, same data
- Netlify hosting — same platform
- SEO/meta tags — same behavior
- Article body rendering — BlockRenderer stays the same

## Estimated Time

| Step | Time |
|---|---|
| 1. Init Vite | 15 min |
| 2. Directory structure | 10 min |
| 3. Convert globals → imports | 45 min |
| 4. Extract inline App | 15 min |
| 5. Merge product data | 10 min |
| 6. Update index.html | 10 min |
| 7. Update Netlify config | 5 min |
| 8. Test | 15 min |
| **Total** | **~2 hours** |

## Risks

| Risk | Mitigation |
|---|---|
| Article legacy components break | Test each article page after migration |
| Edge Function path mismatch | Verify `dist/` output matches current file structure |
| CSS specificity changes | CSS file is unchanged — just moved |
| Google Analytics breaks | GA script stays in index.html, no change |
| SEO regression | Curl-test 3 article URLs after deploy |

## Optional Enhancements (not in scope)

- Add TypeScript (rename .jsx → .tsx, add types)
- Code-split insights.jsx (1,573 lines) into smaller components
- Add React Router instead of manual history.pushState
- Add Vitest for unit testing
- Critical CSS extraction for faster first paint
