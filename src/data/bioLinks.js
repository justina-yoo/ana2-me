// ─────────────────────────────────────────────────────────────────────
//  bio links — controls the /links page (your "link in bio" page)
// ─────────────────────────────────────────────────────────────────────
//
//  Edit this file to update the page. Top of the array = top of the page.
//  After editing, commit + deploy — no other code changes needed.
//
//  Each item:
//    id            unique key (used in UTM campaign tag)
//    label         small uppercase tag above title (optional, e.g. "NEW", "FREE")
//    title         the line people read first
//    description   one-sentence reason to tap
//    path          where the link goes (relative path on ana2-me.com, or absolute URL)
//    featured      true = larger card with accent color (use sparingly, ideally just one)
//    thumbnail     path to a small square image (carousel cover crop) — featured items only
//
//  UTM tags are auto-appended via buildBioLink().
//  Source default is "bio" — override if you want platform-specific tagging
//  (e.g. one bio link per platform pointing to /links?p=ig vs /links?p=tt).
//
// ─────────────────────────────────────────────────────────────────────

export const BIO_LINKS = [
  {
    id: 'sunscreen-2026-06',
    label: null,
    title: "Same brand, same bottle, different formula.",
    description: null,
    path: '/article/beauty-science/2026-06-13/korean-sunscreen-us-reformulated-different-product',
    featured: true,
    thumbnail: '/img/bio/sunscreen-cover.png',
  },
  {
    id: 'analyzer',
    label: 'TRY FREE',
    title: 'Ingredient Analyzer',
    description: "Paste any Korean cosmetic's INCI list. See what's in it, what's flagged, and what fits your skin.",
    path: '/analyzer',
  },
  {
    id: 'insights',
    title: 'Browse all articles',
    description: '140+ deep-dives on Korean skincare, fragrance, and wellness — molecule level.',
    path: '/insights',
  },
  {
    id: 'about',
    title: 'About ana2me',
    description: 'Independent Korean ingredient intelligence. No brand sponsorships, no PR samples.',
    path: '/about',
  },
];

// Build a UTM-tagged version of a link.
// source = where this view of /links was accessed from (default "bio")
export function buildBioLink(item, source = 'bio') {
  const path = item.path;
  if (path.startsWith('http')) return path; // external links — don't touch
  const sep = path.includes('?') ? '&' : '?';
  return `${path}${sep}utm_source=${source}&utm_medium=bio`;
}
