// Migrate body_blocks for 7 articles to Supabase
// Run: node migrate-bodies-2.mjs

const SUPABASE_URL = 'https://hkyfggapijgedsizfqec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhreWZnZ2FwaWpnZWRzaXpmcWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzY5MDksImV4cCI6MjA5MzY1MjkwOX0.huZi2uDRI0EnVWkg6HTo-VK1V3fz3DyR-ZNGpMd0yLQ';

const articles = {

  // ─── 1. Fragrance Wardrobing ───
  'fragrance-wardrobing': [
    {
      type: "tldr",
      icon: "📋",
      text: {
        en: "<strong>TL;DR:</strong> If you wear the same perfume daily, your nose stops registering it after 15\u201320 minutes. That\u2019s olfactory habituation \u2014 a survival mechanism, not a flaw. The fix isn\u2019t spraying more. It\u2019s rotating scents like a wardrobe. In 2026, the signature scent is dead. The fragrance wardrobe is what works.",
        ko: "<strong>\uc694\uc57d:</strong> \uac19\uc740 \ud5a5\uc218\ub97c \ub9e4\uc77c \ubfcc\ub9ac\uba74 15~20\ubd84 \ud6c4 \ub0b4 \ucf54\uac00 \uac10\uc9c0\ub97c \uba48\ucdb0\uc694. \uc774\uac74 \ud6c4\uac01 \ud53c\ub85c(olfactory habituation)\ub77c\ub294 \ub1cc\uc758 \uc0dd\uc874 \uba54\ucee4\ub2c8\uc998\uc785\ub2c8\ub2e4. \ud574\uacb0\ubc95\uc740 \ub354 \ub9ce\uc774 \ubfcc\ub9ac\ub294 \uac8c \uc544\ub2c8\ub77c, \ud5a5\uc218\ub97c \uc637\uc7a5\ucc98\ub7fc \ub3cc\ub824 \uc4f0\ub294 \u201c\ud504\ub798\uadf8\ub7f0\uc2a4 \uc6cc\ub4dc\ub85c\ube59\u201d\uc774\uc5d0\uc694. 2026\ub144, \uc2dc\uadf8\ub2c8\ucc98 \ud5a5\uc218\uc758 \uc2dc\ub300\ub294 \ub05d\ub098\uace0 \ud5a5\uc218 \uc637\uc7a5\uc758 \uc2dc\ub300\uac00 \uc654\uc2b5\ub2c8\ub2e4."
      }
    },
    {
      type: "figure",
      src: "https://images.unsplash.com/photo-1615634260830-85d92cd1b769?auto=format&fit=crop&q=80&w=1200",
      alt: "Collection of perfume bottles arranged like a wardrobe, representing fragrance rotation"
    },
    {
      type: "section",
      heading: {
        en: "\ud83e\udde0 Why can't you smell your own perfume?",
        ko: "\ud83e\udde0 \uc65c \ub0b4 \ud5a5\uc218\uac00 \uc548 \ub290\uaef4\uc9c8\uae4c\uc694?"
      },
      children: [
        {
          type: "body",
          text: {
            en: "Twenty minutes after spraying, you think your perfume has faded. It hasn\u2019t \u2014 <mark>your nose just stopped registering it.</mark> This is <strong>olfactory habituation</strong>. When your olfactory receptors are continuously exposed to the same scent molecules, they become less responsive. Your brain categorizes that smell as \u201csafe background information\u201d and filters it out \u2014 freeing resources to detect new, potentially important smells. It\u2019s not a flaw. <strong>It\u2019s a survival mechanism.</strong>",
            ko: "\ud5a5\uc218\ub97c \ubfcc\ub9ac\uace0 20\ubd84\uc774 \uc9c0\ub098\uba74 \u201c\ud5a5\uc774 \ub0a0\uc544\uac14\ub098?\u201d \uc0dd\uac01\ud558\uac8c \ub418\uc8e0. \ud558\uc9c0\ub9cc \ud5a5\uc740 \uadf8\ub300\ub85c \uc788\uc5b4\uc694 \u2014 <mark>\ub0b4 \ucf54\uac00 \ub354 \uc774\uc0c1 \uac10\uc9c0\ud558\uc9c0 \uc54a\ub294 \uac83\ubfd0\uc785\ub2c8\ub2e4.</mark> \uc774\uac78 <strong>\ud6c4\uac01 \uc2b5\uad00\ud654(olfactory habituation)</strong>\ub77c\uace0 \ud574\uc694. \uac19\uc740 \ub0c4\uc0c8\uc5d0 \uacc4\uc18d \ub178\ucd9c\ub418\uba74 \ud6c4\uac01 \uc218\uc6a9\uccb4\uc758 \ubc18\uc751\uc774 \ub454\ud574\uc9c0\uba74\uc11c, \ub1cc\uac00 \uadf8 \ud5a5\uc744 \u201c\uc548\uc804\ud55c \ubc30\uacbd \uc815\ubcf4\u201d\ub85c \ubd84\ub958\ud558\uace0 \ubb34\uc2dc\ud569\ub2c8\ub2e4. \uace0\uc7a5\uc774 \uc544\ub2c8\ub77c <strong>\uc0c8\ub85c\uc6b4 \ub0c4\uc0c8\ub97c \uac10\uc9c0\ud558\uae30 \uc704\ud55c \uc0dd\uc874 \uba54\ucee4\ub2c8\uc998</strong>\uc774\uc5d0\uc694."
          }
        },
        {
          type: "statCards",
          cards: [
            { title: { en: "\u23f1\ufe0f 15\u201320 minutes", ko: "\u23f1\ufe0f 15~20\ubd84" }, desc: { en: "Time before your olfactory receptors start tuning out a constant scent.", ko: "\uac19\uc740 \ud5a5\uc5d0 \ub300\ud55c \ud6c4\uac01 \uc218\uc6a9\uccb4 \ubc18\uc751\uc774 \ub454\ud574\uc9c0\uae30 \uc2dc\uc791\ud558\ub294 \uc2dc\uac04." } },
            { title: { en: "\ud83e\uddec Evolutionary design", ko: "\ud83e\uddec \uc9c4\ud654\uc801 \uc124\uacc4" }, desc: { en: "Filtering out familiar smells lets you detect new danger signals faster.", ko: "\uc775\uc219\ud55c \ub0c4\uc0c8\ub97c \ubb34\uc2dc\ud574\uc57c \uc0c8\ub85c\uc6b4 \uc704\ud5d8 \uc2e0\ud638\ub97c \ube68\ub9ac \uac10\uc9c0\ud560 \uc218 \uc788\uc5b4\uc694." } },
            { title: { en: "\ud83d\udc43 The scent is still there", ko: "\ud83d\udc43 \ud5a5\uc740 \uadf8\ub300\ub85c" }, desc: { en: "Others can still smell your perfume. You\u2019re the only one who can\u2019t.", ko: "\uc8fc\ubcc0 \uc0ac\ub78c\uc740 \uc5ec\uc804\ud788 \ub0b4 \ud5a5\uc218\ub97c \ub9e1\uc544\uc694. \ubabb \ub290\ub07c\ub294 \uac74 \ub098\ubfd0\uc785\ub2c8\ub2e4." } }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\ud83d\udc57 What is fragrance wardrobing?",
        ko: "\ud83d\udc57 \ud504\ub798\uadf8\ub7f0\uc2a4 \uc6cc\ub4dc\ub85c\ube59\uc774\ub780?"
      },
      children: [
        {
          type: "body",
          text: {
            en: "You don\u2019t wear the same outfit every day. Why wear the same scent? <mark>Rotating between different fragrance families \u2014 citrus, woody, musky, floral \u2014 keeps your olfactory receptors recognizing each one as a \u201cnew stimulus.\u201d</mark> When you return to Monday\u2019s citrus scent the following week, your nose has had enough time away to experience it as fresh again.",
            ko: "\uc637\uc744 \ub9e4\uc77c \uac19\uc740 \uac78 \uc785\uc9c0 \uc54a\ub4ef\uc774, \ud5a5\uc218\ub3c4 \ub3cc\ub824 \uc4f0\ub294 \uac70\uc608\uc694. <mark>\ub2e4\ub978 \ud5a5 \uacc4\uc5f4(\uc2dc\ud2b8\ub7ec\uc2a4, \uc6b0\ub514, \uba38\uc2a4\ud06c, \ud50c\ub85c\ub7f4)\uc744 \ubc88\uac08\uc544 \ubfcc\ub9ac\uba74 \ud6c4\uac01 \uc218\uc6a9\uccb4\uac00 \ub9e4\ubc88 \u201c\uc0c8\ub85c\uc6b4 \uc790\uadf9\u201d\uc73c\ub85c \uc778\uc2dd</mark>\ud569\ub2c8\ub2e4. \uc6d4\uc694\uc77c\uc5d0 \ubfcc\ub9b0 \uc2dc\ud2b8\ub7ec\uc2a4 \ud5a5\uc744 \ub2e4\uc74c \uc8fc \uc6d4\uc694\uc77c\uc5d0 \ub2e4\uc2dc \ubfcc\ub9ac\uba74, \ucf54\uac00 \uc26c\uc5c8\ub2e4 \ub3cc\uc544\uc654\uae30 \ub54c\ubb38\uc5d0 \ucc98\uc74c\ucc98\ub7fc \uc2e0\uc120\ud558\uac8c \ub290\uaef4\uc838\uc694."
          }
        },
        {
          type: "callout",
          icon: "\ud83d\udd04",
          title: { en: "3\u20134 scents is all you need", ko: "3~4\uac1c\uba74 \ucda9\ubd84\ud574\uc694" },
          text: {
            en: "You don\u2019t need dozens of bottles. Pick 3\u20134 fragrances from different scent families and rotate every 2\u20133 days. That\u2019s enough to prevent habituation. The key isn\u2019t quantity \u2014 it\u2019s variety across molecular profiles.",
            ko: "\ud5a5\uc218 \uc637\uc7a5\uc740 \uc218\uc2ed \ubcd1\uc774 \ud544\uc694\ud55c \uac8c \uc544\ub2c8\uc5d0\uc694. \uc11c\ub85c \ub2e4\ub978 \ud5a5 \uacc4\uc5f4\uc5d0\uc11c 3~4\uac1c\ub9cc \uace8\ub77c 2~3\uc77c \uac04\uaca9\uc73c\ub85c \ub3cc\ub9ac\uba74 \ud6c4\uac01 \ud53c\ub85c\ub97c \ud6a8\uacfc\uc801\uc73c\ub85c \ubc29\uc9c0\ud560 \uc218 \uc788\uc5b4\uc694. \ud575\uc2ec\uc740 \uc591\uc774 \uc544\ub2c8\ub77c \ub2e4\uc591\uc131\uc785\ub2c8\ub2e4."
          },
          borderColor: "rgba(45,90,61,0.2)",
          bgColor: "rgba(45,90,61,0.04)"
        },
        {
          type: "callout",
          icon: "\ud83c\udf2c\ufe0f",
          title: { en: "Go fragrance-free 1\u20132 days a week", ko: "\uc77c\uc8fc\uc77c\uc5d0 1~2\uc77c\uc740 \uc26c\uc138\uc694" },
          text: {
            en: "Complete fragrance-free days give your olfactory system a full reset. When you spray again, the scent hits with renewed clarity \u2014 and you prevent the gradual overall desensitization that comes from never giving your nose a break.",
            ko: "\ud5a5\uc218\ub97c \uc544\uc608 \uc548 \ubfcc\ub9ac\ub294 \ub0a0\uc744 \ub9cc\ub4e4\uba74 \ud6c4\uac01 \uc2dc\uc2a4\ud15c\uc774 \uc644\uc804\ud788 \ub9ac\uc14b\ub3fc\uc694. \ub2e4\uc74c\uc5d0 \ud5a5\uc218\ub97c \ubfcc\ub838\uc744 \ub54c \ud6e8\uc52c \uc0dd\uc0dd\ud558\uac8c \ub290\uaef4\uc9c0\uace0, \ud5a5\uc5d0 \ub300\ud55c \uc804\ubc18\uc801\uc778 \ub454\uac10\ud654\ub3c4 \uc608\ubc29\ub429\ub2c8\ub2e4."
          },
          borderColor: "rgba(107,142,107,0.25)",
          bgColor: "rgba(107,142,107,0.06)"
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\ud83e\uddea How to build your fragrance wardrobe by family",
        ko: "\ud83e\uddea \ud5a5 \uacc4\uc5f4\ubcc4 \uc6cc\ub4dc\ub85c\ube59 \uac00\uc774\ub4dc"
      },
      children: [
        {
          type: "grid",
          minWidth: "280px",
          gap: 22,
          items: [
            { title: { en: "\ud83c\udf4b Citrus / Fresh", ko: "\ud83c\udf4b \uc2dc\ud2b8\ub7ec\uc2a4 / \ud504\ub808\uc2dc" }, body: { en: "Bergamot, grapefruit, neroli. Light molecules that fade fast but are excellent for resetting your nose. The 'cleanser' of your wardrobe.", ko: "\ubca0\ub974\uac00\ubabb, \uc790\ubabd, \ub124\ub864\ub9ac. \uac00\ubcbc\uc6b4 \ubd84\uc790\ub77c \ube68\ub9ac \ub0a0\uc544\uac00\uc9c0\ub9cc \ud6c4\uac01 \ub9ac\uc14b \ud6a8\uacfc\uac00 \ud0c1\uc6d4\ud574\uc694. \uc6cc\ub4dc\ub85c\ube59\uc758 \u201c\ud074\ub80c\uc800\u201d \uc5ed\ud560." } },
            { title: { en: "\ud83c\udf32 Woody / Amber", ko: "\ud83c\udf32 \uc6b0\ub514 / \uc568\ubc84" }, body: { en: "Sandalwood, cedar, vetiver, ambroxan. Heavy molecules that linger on skin. The 'anchor' of your rotation.", ko: "\uc0cc\ub2ec\uc6b0\ub4dc, \uc2dc\ub354, \ubca0\ud2f0\ubc84, \uc568\ube0c\ub85d\uc0b0. \ubb34\uac70\uc6b4 \ubd84\uc790\ub77c \ud53c\ubd80\uc5d0 \uc624\ub798 \ub0a8\uc544\uc694. \uc6cc\ub4dc\ub85c\ube59\uc5d0\uc11c \u201c\uc575\ucee4\u201d \uc5ed\ud560\uc744 \ud569\ub2c8\ub2e4." } },
            { title: { en: "\ud83e\udd0d Musk / Skin Scent", ko: "\ud83e\udd0d \uba38\uc2a4\ud06c / \uc2a4\ud0a8 \uc13c\ud2b8" }, body: { en: "White musk, clean notes. Low contrast with other scents \u2014 good as a rest-day alternative. K-fragrance lives here.", ko: "\ud654\uc774\ud2b8 \uba38\uc2a4\ud06c, \ud074\ub9b0 \ub178\ud2b8. \ub2e4\ub978 \ud5a5\uacfc\uc758 \ub300\ube44\uac00 \uc801\uc5b4 \uc26c\ub294 \ub0a0 \ub300\uc6a9\uc73c\ub85c \uc88b\uc544\uc694. K-\ud504\ub798\uadf8\ub7f0\uc2a4\uac00 \uc5ec\uae30\uc5d0 \ud574\ub2f9." } },
            { title: { en: "\ud83c\udf38 Floral / Spicy", ko: "\ud83c\udf38 \ud50c\ub85c\ub7f4 / \uc2a4\ud30c\uc774\uc2dc" }, body: { en: "Rose, jasmine, saffron, cardamom. Mid-weight molecules that bridge citrus and woody days.", ko: "\ub85c\uc988, \uc790\uc2a4\ubbfc, \uc0ac\ud504\ub780, \uce74\ub2e4\ubab8. \uc911\uac04 \ubb34\uac8c\uc758 \ubd84\uc790\ub4e4\uc774\ub77c \uc2dc\ud2b8\ub7ec\uc2a4\uc640 \uc6b0\ub514 \uc0ac\uc774\uc5d0\uc11c \uade0\ud615\uc744 \uc7a1\uc544\uc918\uc694." } }
          ]
        }
      ]
    }
  ],

  // ─── 2. Edible Skincare ───
  'edible-skincare-gut-skin': [
    {
      type: "tldr",
      icon: "\ud83d\udccb",
      text: {
        en: "<strong>TL;DR:</strong> \u201cEdible skincare\u201d is now the fastest-growing wellness category in Korea \u2014 Olive Young\u2019s inner beauty sales grew 55% year-over-year. The science behind it is the gut-skin axis: short-chain fatty acids produced by gut bacteria enter the bloodstream and directly regulate skin inflammation, sebum, and barrier function. Collagen drinks, probiotics, and fermented extracts are the ingredients with real clinical backing.",
        ko: "<strong>\uc694\uc57d:</strong> \ud55c\uad6d\uc5d0\uc11c \u2018\uba39\ub294 \ud654\uc7a5\ud488\u2019\uc774 \uac00\uc7a5 \ube60\ub974\uac8c \uc131\uc7a5\ud558\ub294 \uc6f0\ub2c8\uc2a4 \uce74\ud14c\uace0\ub9ac\uac00 \ub410\uc5b4\uc694. \uc62c\ub9ac\ube0c\uc601 \uc774\ub108\ubdf0\ud2f0 \ub9e4\ucd9c\uc740 \uc804\ub144 \ub300\ube44 55% \uc99d\uac00\ud588\uc2b5\ub2c8\ub2e4. \ud575\uc2ec\uc740 \uc7a5-\ud53c\ubd80 \ucd95(gut-skin axis) \u2014 \uc7a5\ub0b4 \ubbf8\uc0dd\ubb3c\uc774 \ub9cc\ub4dc\ub294 \ub2e8\uc1c4\uc9c0\ubc29\uc0b0(SCFA)\uc774 \ud608\ub958\ub97c \ud0c0\uace0 \ud53c\ubd80 \uc5fc\uc99d, \ud53c\uc9c0, \uc7a5\ubcbd \uae30\ub2a5\uc744 \uc9c1\uc811 \uc870\uc808\ud569\ub2c8\ub2e4. \ucf5c\ub77c\uac90 \uc74c\ub8cc, \ud504\ub85c\ubc14\uc774\uc624\ud2f1\uc2a4, \ubc1c\ud6a8 \ucd94\ucd9c\ubb3c\uc774 \uc784\uc0c1 \ub370\uc774\ud130\ub97c \uac16\ucd98 \ud575\uc2ec \uc131\ubd84\uc774\uc5d0\uc694."
      }
    },
    {
      type: "figure",
      src: "https://images.unsplash.com/photo-1620755901989-0f457a38011e?auto=format&fit=crop&q=80&w=1200",
      alt: "Wellness supplement jars with probiotics and mushroom capsules for gut-skin health"
    },
    {
      type: "section",
      heading: {
        en: "\ud83c\udf7d\ufe0f Why is Korea \u201ceating\u201d its skincare?",
        ko: "\ud83c\udf7d\ufe0f \uc65c \ud55c\uad6d\uc740 \ud654\uc7a5\ud488\uc744 \u201c\uba39\uae30\u201d \uc2dc\uc791\ud588\uc744\uae4c\uc694?"
      },
      children: [
        {
          type: "body",
          text: {
            en: "In Korea, \u201cinner beauty\u201d is no longer niche. Olive Young\u2019s inner beauty category grew <strong>55% year-over-year</strong>, and in January 2026, the retailer opened its first wellness-focused store, Olive Better, in Seoul. <mark>The realization that topical skincare has limits has pushed \u201cedible skincare\u201d \u2014 supplements designed to improve skin from inside \u2014 into the mainstream.</mark> Collagen jellies, probiotic mints, herbal sleep drinks \u2014 the format has evolved far beyond pills into everyday snackable rituals.",
            ko: "\ud55c\uad6d\uc5d0\uc11c \u2018\uc774\ub108\ubdf0\ud2f0\u2019\ub294 \ub354 \uc774\uc0c1 \ud2c8\uc0c8 \uc2dc\uc7a5\uc774 \uc544\ub2c8\uc5d0\uc694. \uc62c\ub9ac\ube0c\uc601 \uc774\ub108\ubdf0\ud2f0 \uce74\ud14c\uace0\ub9ac \ub9e4\ucd9c\uc774 <strong>\uc804\ub144 \ub300\ube44 55% \uc99d\uac00</strong>\ud588\uace0, \uc62c\ud574 1\uc6d4\uc5d0\ub294 \uc11c\uc6b8\uc5d0 \uc6f0\ub2c8\uc2a4 \uc804\ubb38 \ub9e4\uc7a5 \u2018\uc62c\ub9ac\ube0c \ubca0\ub7ec\u2019\uae4c\uc9c0 \uc624\ud508\ud588\uc5b4\uc694. <mark>\ud53c\ubd80\uc5d0 \ubc14\ub974\ub294 \uac83\ub9cc\uc73c\ub85c\ub294 \ud55c\uacc4\uac00 \uc788\ub2e4\ub294 \uc778\uc2dd\uc774 \ud37c\uc9c0\uba74\uc11c, \uc548\uc5d0\uc11c\ubd80\ud130 \ud53c\ubd80\ub97c \uad00\ub9ac\ud558\ub294 \u2018\uba39\ub294 \uc2a4\ud0a8\ucf00\uc5b4\u2019\uac00 \uc8fc\ub958\uac00 \ub410\uc2b5\ub2c8\ub2e4.</mark> \ucf5c\ub77c\uac90 \uc824\ub9ac, \ud504\ub85c\ubc14\uc774\uc624\ud2f1 \ubbfc\ud2b8, \uc218\uba74 \uc74c\ub8cc\uae4c\uc9c0 \u2014 \ud615\ud0dc\ub3c4 \uc54c\uc57d\uc744 \ub118\uc5b4\uc11c \uc77c\uc0c1 \uc18d \uac04\uc2dd\uc73c\ub85c \uc9c4\ud654\ud558\uace0 \uc788\uc5b4\uc694."
          }
        },
        {
          type: "statCards",
          cards: [
            { title: { en: "\ud83d\udcc8 55% growth", ko: "\ud83d\udcc8 55% \uc131\uc7a5" }, desc: { en: "Olive Young\u2019s inner beauty category year-over-year sales increase.", ko: "\uc62c\ub9ac\ube0c\uc601 \uc774\ub108\ubdf0\ud2f0 \uce74\ud14c\uace0\ub9ac\uc758 \uc804\ub144 \ub300\ube44 \ub9e4\ucd9c \uc99d\uac00\uc728." } },
            { title: { en: "\ud83c\udfea Olive Better", ko: "\ud83c\udfea \uc62c\ub9ac\ube0c \ubca0\ub7ec" }, desc: { en: "Korea\u2019s first wellness-only Olive Young store, opened January 2026 in Seoul.", ko: "2026\ub144 1\uc6d4 \uc11c\uc6b8\uc5d0 \uc624\ud508\ud55c \uc62c\ub9ac\ube0c\uc601 \ucd5c\ucd08\uc758 \uc6f0\ub2c8\uc2a4 \uc804\ubb38 \ub9e4\uc7a5." } },
            { title: { en: "\ud83d\udc8a \u2192 \ud83c\udf6c", ko: "\ud83d\udc8a \u2192 \ud83c\udf6c" }, desc: { en: "From pills to jellies, drinks, and mints \u2014 supplements becoming snacks.", ko: "\uc54c\uc57d\uc5d0\uc11c \uc824\ub9ac, \uc74c\ub8cc, \ubbfc\ud2b8\ub85c \u2014 \ubcf4\ucda9\uc81c\uac00 \uac04\uc2dd\uc774 \ub418\uace0 \uc788\uc5b4\uc694." } }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\ud83d\udd2c What is the gut-skin axis?",
        ko: "\ud83d\udd2c \uc7a5-\ud53c\ubd80 \ucd95\uc774\ub780 \ubb58\uac00\uc694?"
      },
      children: [
        {
          type: "body",
          text: {
            en: "Your gut and skin talk to each other directly. This communication channel is called the <strong>gut-skin axis</strong>. When gut bacteria break down food, they produce <strong>short-chain fatty acids (SCFAs)</strong> that enter the bloodstream and reach skin cells. <mark>These molecules directly regulate skin inflammation, sebum production, and barrier function.</mark> A healthy gut means healthier skin. A disrupted gut shows up on your face \u2014 acne, rosacea, eczema, and psoriasis have all been linked to gut microbiome imbalance in recent studies.",
            ko: "\uc7a5\uacfc \ud53c\ubd80\ub294 \uc11c\ub85c \uc9c1\uc811 \ub300\ud654\ud574\uc694. \uc774\uac78 <strong>\uc7a5-\ud53c\ubd80 \ucd95(gut-skin axis)</strong>\uc774\ub77c\uace0 \ud569\ub2c8\ub2e4. \uc7a5\ub0b4 \uc138\uade0\uc774 \uc74c\uc2dd\uc744 \ubd84\ud574\ud558\uba74\uc11c \ub9cc\ub4dc\ub294 <strong>\ub2e8\uc1c4\uc9c0\ubc29\uc0b0(SCFA)</strong>\uc774 \ud608\ub958\ub97c \ud0c0\uace0 \ud53c\ubd80 \uc138\ud3ec\uae4c\uc9c0 \ub3c4\ub2ec\ud574\uc694. <mark>\uc774 \ubb3c\uc9c8\uc774 \ud53c\ubd80\uc758 \uc5fc\uc99d \ubc18\uc751, \ud53c\uc9c0 \ubd84\ube44, \uc7a5\ubcbd \uae30\ub2a5\uc744 \uc9c1\uc811 \uc870\uc808\ud569\ub2c8\ub2e4.</mark> \uc7a5\uc774 \uac74\uac15\ud558\uba74 \ud53c\ubd80\ub3c4 \uac74\uac15\ud558\uace0, \uc7a5\uc5d0 \ubb38\uc81c\uac00 \uc0dd\uae30\uba74 \ud53c\ubd80\uc5d0\ub3c4 \ub098\ud0c0\ub098\uc694 \u2014 \uc5ec\ub4dc\ub984, \uc8fc\uc0ac\ube44, \uc544\ud1a0\ud53c, \uac74\uc120 \ubaa8\ub450 \uc7a5\ub0b4 \uc138\uade0 \ubd88\uade0\ud615\uacfc \uc5f0\uacb0\ub41c\ub2e4\ub294 \uc5f0\uad6c\uac00 \uc3df\uc544\uc9c0\uace0 \uc788\uc5b4\uc694."
          }
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\ud83e\uddec How does your gut actually affect your skin?",
        ko: "\ud83e\uddec \uc7a5\uc5d0\uc11c \ud53c\ubd80\uae4c\uc9c0 \u2014 \uc5b4\ub5a4 \uacbd\ub85c\ub85c \uc5f0\uacb0\ub420\uae4c\uc694?"
      },
      children: [
        {
          type: "callout",
          icon: "\ud83e\udda0",
          title: { en: "SCFAs \u2014 your gut's anti-inflammatory output", ko: "\ub2e8\uc1c4\uc9c0\ubc29\uc0b0(SCFA) \u2014 \uc7a5\uc774 \ub9cc\ub4dc\ub294 \ud56d\uc5fc \ubb3c\uc9c8" },
          text: {
            en: "When beneficial gut bacteria ferment dietary fiber, they produce SCFAs like butyrate and propionate. These travel through the bloodstream to skin, where they <strong>suppress inflammatory cytokines (IL-6, TNF-\u03b1)</strong> and support ceramide production in the skin barrier. Without enough fiber, this entire chain breaks down.",
            ko: "\uc7a5\ub0b4 \uc720\uc775\uade0\uc774 \uc2dd\uc774\uc12c\uc720\ub97c \ubc1c\ud6a8\ud558\uba74 \ubd80\ud2f0\ub808\uc774\ud2b8, \ud504\ub85c\ud53c\uc624\ub124\uc774\ud2b8 \uac19\uc740 \ub2e8\uc1c4\uc9c0\ubc29\uc0b0\uc774 \ub9cc\ub4e4\uc5b4\uc838\uc694. \uc774 \ubb3c\uc9c8\ub4e4\uc774 \ud608\ub958\ub97c \ud1b5\ud574 \ud53c\ubd80\uc5d0 \ub3c4\ub2ec\ud558\uba74 <strong>\uc5fc\uc99d\uc131 \uc0ac\uc774\ud1a0\uce74\uc778(IL-6, TNF-\u03b1)\uc744 \uc5b5\uc81c</strong>\ud558\uace0 \ud53c\ubd80 \uc7a5\ubcbd\uc758 \uc138\ub77c\ub9c8\uc774\ub4dc \uc0dd\uc131\uc744 \ub3d5\uc2b5\ub2c8\ub2e4. \uc2dd\uc774\uc12c\uc720\uac00 \ubd80\uc871\ud558\uba74 \uc774 \uacfc\uc815\uc774 \ubb34\ub108\uc838\uc694."
          },
          borderColor: "rgba(45,90,61,0.2)",
          bgColor: "rgba(45,90,61,0.04)"
        },
        {
          type: "callout",
          icon: "\ud83d\udee1\ufe0f",
          title: { en: "Gut permeability \u2014 how a \u201cleaky gut\u201d attacks skin", ko: "\uc7a5\ubcbd \ud22c\uacfc\uc131 \u2014 \u201c\uc0c8\ub294 \uc7a5\u201d\uc774 \ud53c\ubd80\ub97c \uacf5\uaca9\ud558\ub294 \ubc29\ubc95" },
          text: {
            en: "When the gut barrier is compromised, toxins and microbial fragments leak into the bloodstream. This triggers systemic inflammation that manifests on skin as acne, redness, and irritation. <mark>A 2026 study found that lower gut microbial diversity significantly correlated with higher skin disease risk.</mark>",
            ko: "\uc7a5\ubcbd\uc774 \uc190\uc0c1\ub418\uba74 \ub3c5\uc18c\uc640 \ubbf8\uc0dd\ubb3c \ud30c\ud3b8\uc774 \ud608\ub958\ub85c \uc720\ucd9c\ub3fc\uc694. \uc774\uac8c \uc804\uc2e0 \uc5fc\uc99d\uc744 \uc77c\uc73c\ud0a4\uace0, \uadf8 \uc5fc\uc99d\uc774 \ud53c\ubd80\uc5d0\uc11c \uc5ec\ub4dc\ub984, \ud64d\uc870, \uac00\ub824\uc6c0\uc73c\ub85c \ub098\ud0c0\ub0a9\ub2c8\ub2e4. <mark>2026\ub144 \uc5f0\uad6c\uc5d0 \ub530\ub974\uba74 \uc7a5\ub0b4 \ubbf8\uc0dd\ubb3c \ub2e4\uc591\uc131\uc774 \ub0ae\uc744\uc218\ub85d \ud53c\ubd80 \uc9c8\ud658 \uc704\ud5d8\uc774 \uc720\uc758\ubbf8\ud558\uac8c \ub192\uc544\uc84c\uc5b4\uc694.</mark>"
          },
          borderColor: "rgba(107,142,107,0.25)",
          bgColor: "rgba(107,142,107,0.06)"
        },
        {
          type: "callout",
          icon: "\ud83d\udd04",
          title: { en: "It goes both ways \u2014 skin damage affects your gut too", ko: "\uc591\ubc29\ud5a5 \uc18c\ud1b5 \u2014 \ud53c\ubd80 \uc190\uc0c1\ub3c4 \uc7a5\uc5d0 \uc601\ud5a5\uc744 \uc918\uc694" },
          text: {
            en: "A recent Nature Communications study confirmed that skin injury directly remodels the gut microbiome. Just as the gut affects skin, skin sends signals back to the gut. It\u2019s a genuinely bidirectional relationship.",
            ko: "\ucd5c\uadfc \ub124\uc774\ucc98 \ucee4\ubba4\ub2c8\ucf00\uc774\uc158\uc988 \uc5f0\uad6c\uc5d0\uc11c \ud53c\ubd80 \uc190\uc0c1\uc774 \uc7a5\ub0b4 \ubbf8\uc0dd\ubb3c \uad6c\uc131\uc744 \uc9c1\uc811 \ubc14\uafbc\ub2e4\ub294 \uac83\uc774 \ud655\uc778\ub410\uc5b4\uc694. \uc7a5\uc774 \ud53c\ubd80\uc5d0 \uc601\ud5a5\uc744 \uc8fc\ub294 \uac83\ucc98\ub7fc, \ud53c\ubd80\ub3c4 \uc7a5\uc5d0 \uc2e0\ud638\ub97c \ubcf4\ub0c5\ub2c8\ub2e4. \uc9c4\uc9dc \uc591\ubc29\ud5a5 \uc18c\ud1b5\uc774\uc5d0\uc694."
          },
          borderColor: "rgba(245,215,110,0.4)",
          bgColor: "rgba(245,215,110,0.08)"
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\ud83d\udc8a Which inner beauty ingredients actually have clinical data?",
        ko: "\ud83d\udc8a \uc784\uc0c1 \ub370\uc774\ud130\uac00 \uc788\ub294 \uc774\ub108\ubdf0\ud2f0 \uc131\ubd84\uc740?"
      },
      children: [
        {
          type: "grid",
          minWidth: "280px",
          gap: 22,
          items: [
            { title: { en: "Collagen peptides", ko: "\ucf5c\ub77c\uac90 \ud39d\ud0c0\uc774\ub4dc" }, body: { en: "Meta-analyses show oral collagen peptides (2.5\u201310g/day for 8+ weeks) improve skin hydration and elasticity. The key is molecular weight \u2014 low-molecular-weight peptides (under 2,000Da) survive digestion and reach skin fibroblasts.", ko: "\uacbd\uad6c \ucf5c\ub77c\uac90 \ud39d\ud0c0\uc774\ub4dc(\ud558\ub8e8 2.5~10g)\ub97c 8\uc8fc \uc774\uc0c1 \uc12d\ucde8\ud558\uba74 \ud53c\ubd80 \uc218\ubd84\ub7c9\uacfc \ud0c4\ub825\uc774 \uac1c\uc120\ub41c\ub2e4\ub294 \uba54\ud0c0\ubd84\uc11d \uacb0\uacfc\uac00 \uc788\uc5b4\uc694. \ud575\uc2ec\uc740 \ubd84\uc790\ub7c9 \u2014 \uc800\ubd84\uc790 \ud39d\ud0c0\uc774\ub4dc(2,000Da \uc774\ud558)\uac00 \uc7a5\uc5d0\uc11c \ud761\uc218\ub418\uc5b4 \ud53c\ubd80 \uc12c\uc720\uc544\uc138\ud3ec\uae4c\uc9c0 \ub3c4\ub2ec\ud569\ub2c8\ub2e4." } },
            { title: { en: "Probiotics", ko: "\ud504\ub85c\ubc14\uc774\uc624\ud2f1\uc2a4 (\uc720\uc0b0\uade0)" }, body: { en: "Specific Lactobacillus and Bifidobacterium strains have been shown to reduce inflammatory skin lesions by 50\u201370% and sebum secretion by up to 42%. Not all strains work equally \u2014 check the strain number on the label.", ko: "\ud2b9\uc815 \ub77d\ud1a0\ubc14\uc2e4\ub7ec\uc2a4\xb7\ube44\ud53c\ub3c4\ubc15\ud14c\ub9ac\uc6c0 \uade0\uc8fc\uac00 \uc5fc\uc99d\uc131 \ud53c\ubd80 \ubcd1\ubcc0\uc744 50~70% \uc904\uc774\uace0, \ud53c\uc9c0 \ubd84\ube44\ub97c \ucd5c\ub300 42% \uc5b5\uc81c\ud55c\ub2e4\ub294 \uc784\uc0c1 \ub370\uc774\ud130\uac00 \uc788\uc5b4\uc694. \ubaa8\ub4e0 \uade0\uc8fc\uac00 \uac19\uc740 \ud6a8\uacfc\ub97c \ub0b4\ub294 \uac74 \uc544\ub2c8\uc5d0\uc694 \u2014 \uade0\uc8fc \ubc88\ud638\ub97c \ud655\uc778\ud558\uc138\uc694." } },
            { title: { en: "Dietary fiber & prebiotics", ko: "\uc2dd\uc774\uc12c\uc720 & \ud504\ub9ac\ubc14\uc774\uc624\ud2f1\uc2a4" }, body: { en: "Not glamorous, but foundational. Fiber fuels beneficial gut bacteria to produce SCFAs. Without adequate fiber, even the best probiotic supplement underperforms \u2014 you\u2019re feeding soldiers without giving them ammunition.", ko: "\ud654\ub824\ud558\uc9c4 \uc54a\uc9c0\ub9cc \uac00\uc7a5 \uae30\ubcf8\uc774\uc5d0\uc694. \uc2dd\uc774\uc12c\uc720\uac00 \uc7a5\ub0b4 \uc720\uc775\uade0\uc758 \uc5f0\ub8cc\uac00 \ub418\uc5b4 SCFA \uc0dd\uc0b0\uc744 \ub192\uc785\ub2c8\ub2e4. \uc12c\uc720\uc18c \uc12d\ucde8\uac00 \ubd80\uc871\ud558\uba74 \uc544\ubb34\ub9ac \uc88b\uc740 \ud504\ub85c\ubc14\uc774\uc624\ud2f1\uc2a4\ub97c \uba39\uc5b4\ub3c4 \ud6a8\uacfc\uac00 \ub5a8\uc5b4\uc838\uc694." } },
            { title: { en: "Fermented extracts", ko: "\ubc1c\ud6a8 \ucd94\ucd9c\ubb3c" }, body: { en: "Postbiotics like galactomyces and bifida ferment \u2014 taken orally \u2014 can support gut immune modulation and skin antioxidant defense simultaneously. This is K-beauty expanding from topical to ingestible.", ko: "\uac08\ub77d\ud1a0\ubbf8\uc138\uc2a4, \ube44\ud53c\ub2e4 \ubc1c\ud6a8\ubb3c \uac19\uc740 \ud3ec\uc2a4\ud2b8\ubc14\uc774\uc624\ud2f1\uc2a4\ub97c \uacbd\uad6c\ub85c \uc12d\ucde8\ud558\uba74 \uc7a5\ub0b4 \uba74\uc5ed \uc870\uc808\uacfc \ud53c\ubd80 \ud56d\uc0b0\ud654 \ud6a8\uacfc\ub97c \ub3d9\uc2dc\uc5d0 \uae30\ub300\ud560 \uc218 \uc788\uc5b4\uc694. K-\ubdf0\ud2f0\uac00 \ubc14\ub974\ub294 \uac83\uc5d0\uc11c \uba39\ub294 \uac83\uc73c\ub85c \ud655\uc7a5\ud55c \ub300\ud45c\uc801 \uc0ac\ub840\uc785\ub2c8\ub2e4." } }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\u2728 Inner beauty products worth trying",
        ko: "\u2728 \uc9c0\uae08 \uc368\ubcfc \ub9cc\ud55c \uc774\ub108\ubdf0\ud2f0 \uc81c\ud488"
      },
      children: [
        {
          type: "prodCards",
          cards: [
            { brand: "BB Lab", name: "The Collagen Jelly", note: { en: "Low-molecular collagen peptide jelly \u2014 one stick a day, like a snack", ko: "\uc800\ubd84\uc790 \ucf5c\ub77c\uac90 \ud39d\ud0c0\uc774\ub4dc \uc824\ub9ac \u2014 \ud558\ub8e8 \ud55c \ud3ec, \uac04\uc2dd\ucc98\ub7fc \uba39\ub294 \ucf5c\ub77c\uac90" }, accentColor: "#a07850" },
            { brand: "K-Nutra", name: "Probiotic Bedtime Mints", note: { en: "Pre-sleep probiotic mints \u2014 gut health meets bedtime ritual", ko: "\uc218\uba74 \uc804 \ud504\ub85c\ubc14\uc774\uc624\ud2f1 \ubbfc\ud2b8 \u2014 \uc7a5 \uac74\uac15\uacfc \uc218\uba74 \ub8e8\ud2f4\uc744 \ub3d9\uc2dc\uc5d0" }, accentColor: "#a07850" },
            { brand: "Foodology", name: "Corebiome Collagen Plus", note: { en: "Collagen + probiotics combo \u2014 targeting the gut-skin axis from both sides", ko: "\ucf5c\ub77c\uac90 + \ud504\ub85c\ubc14\uc774\uc624\ud2f1\uc2a4 \ubcf5\ud569 \u2014 \uc7a5-\ud53c\ubd80 \ucd95\uc744 \ub3d9\uc2dc\uc5d0 \uacf5\ub7b5" }, accentColor: "#a07850" }
          ]
        }
      ]
    }
  ],

  // ─── 3. Myo-Inositol ───
  'myo-inositol-hormonal-health': [
    {
      type: "tldr",
      icon: "\ud83d\udccb",
      text: {
        en: "<strong>TL;DR:</strong> Myo-inositol is a naturally occurring compound involved in insulin signaling that\u2019s showing clinical promise for PCOS, hormonal acne, and ovulation support. The key is the 40:1 ratio of myo-inositol to D-chiro-inositol, taken at 2\u20134g daily for at least 6 months. It\u2019s becoming the go-to supplement before prescription options for hormonal health.",
        ko: "<strong>\uc694\uc57d:</strong> \ubbf8\uc624\uc774\ub178\uc2dc\ud1a8(Myo-Inositol)\uc740 \uc778\uc290\ub9b0 \uc2e0\ud638 \uc804\ub2ec\uc5d0 \uad00\uc5ec\ud558\ub294 \ucc9c\uc5f0 \ud654\ud569\ubb3c\ub85c, PCOS(\ub2e4\ub0ad\uc131 \ub09c\uc18c \uc99d\ud6c4\uad70), \ud638\ub974\ubaac\uc131 \uc5ec\ub4dc\ub984, \ubc30\ub780 \uc7a5\uc560\uc5d0 \ub300\ud55c \uc784\uc0c1 \ub370\uc774\ud130\uac00 \ucd95\uc801\ub418\uace0 \uc788\uc5b4\uc694. \ud575\uc2ec\uc740 \ubbf8\uc624\uc774\ub178\uc2dc\ud1a8\uacfc D-\uce74\uc774\ub85c\uc774\ub178\uc2dc\ud1a8\uc758 40:1 \ube44\uc728\uc774\uba70, \ud558\ub8e8 2~4g\uc744 6\uac1c\uc6d4 \uc774\uc0c1 \uafb8\uc900\ud788 \uc12d\ucde8\ud574\uc57c \ud6a8\uacfc\ub97c \uae30\ub300\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
      }
    },
    {
      type: "figure",
      src: "https://images.unsplash.com/photo-1596572934426-52ac4e95e014?auto=format&fit=crop&q=80&w=1200",
      alt: "Supplement capsules and botanical ingredients for women's hormonal wellness"
    },
    {
      type: "section",
      heading: {
        en: "\ud83d\udc8a What is myo-inositol?",
        ko: "\ud83d\udc8a \ubbf8\uc624\uc774\ub178\uc2dc\ud1a8\uc774 \ubb58\uac00\uc694?"
      },
      children: [
        {
          type: "body",
          text: {
            en: "Myo-inositol is a <strong>naturally occurring sugar alcohol</strong> structurally similar to B vitamins. Your body makes it, and it\u2019s found in fruits, grains, and beans. Its job is straightforward \u2014 <mark>it acts as a \u201cmessenger\u201d that helps insulin signal cells properly</mark>. When insulin resistance develops, hormonal balance breaks down \u2014 leading to PCOS, hormonal acne, and ovulation problems. Myo-inositol works at the very beginning of that chain.",
            ko: "\ubbf8\uc624\uc774\ub178\uc2dc\ud1a8\uc740 \ube44\ud0c0\ubbfc B\uad70\uacfc \uad6c\uc870\uac00 \ube44\uc2b7\ud55c <strong>\ucc9c\uc5f0 \ub2f9\uc54c\ucf54\uc62c</strong>\uc774\uc5d0\uc694. \uc6b0\ub9ac \ubab8\uc5d0\uc11c\ub3c4 \uc790\uc5f0\uc801\uc73c\ub85c \ub9cc\ub4e4\uc5b4\uc9c0\uace0, \uacfc\uc77c\xb7\uace1\ubb3c\xb7\ucf69\uc5d0\ub3c4 \ub4e4\uc5b4 \uc788\uc5b4\uc694. \ud558\ub294 \uc77c\uc740 \uac04\ub2e8\ud574\uc694 \u2014 <mark>\uc778\uc290\ub9b0\uc774 \uc138\ud3ec\uc5d0 \uc81c\ub300\ub85c \uc2e0\ud638\ub97c \ubcf4\ub0b4\ub3c4\ub85d \ub3d5\ub294 \u201c\uba54\uc2e0\uc800\u201d \uc5ed\ud560</mark>\uc744 \ud569\ub2c8\ub2e4. \uc778\uc290\ub9b0 \uc800\ud56d\uc131\uc774 \uc0dd\uae30\uba74 \ud638\ub974\ubaac \uade0\ud615\uc774 \ubb34\ub108\uc9c0\uace0, \uadf8 \uacb0\uacfc\uac00 PCOS, \ud638\ub974\ubaac\uc131 \uc5ec\ub4dc\ub984, \ubc30\ub780 \uc7a5\uc560\ub85c \ub098\ud0c0\ub098\uc694. \ubbf8\uc624\uc774\ub178\uc2dc\ud1a8\uc740 \uc774 \uc5f0\uacb0 \uace0\ub9ac\uc758 \ub9e8 \uc55e\uc5d0\uc11c \uc791\uc6a9\ud569\ub2c8\ub2e4."
          }
        },
        {
          type: "statCards",
          cards: [
            { title: { en: "\ud83d\udd2c Insulin messenger", ko: "\ud83d\udd2c \uc778\uc290\ub9b0 \uba54\uc2e0\uc800" }, desc: { en: "An intracellular signaling molecule that helps cells respond to insulin properly.", ko: "\uc138\ud3ec\uac00 \uc778\uc290\ub9b0 \uc2e0\ud638\ub97c \uc81c\ub300\ub85c \ubc1b\ub3c4\ub85d \ub3d5\ub294 \uc138\ud3ec \ub0b4 \uc804\ub2ec \ubb3c\uc9c8." } },
            { title: { en: "\ud83d\udcca 40:1 ratio", ko: "\ud83d\udcca 40:1 \ube44\uc728" }, desc: { en: "Optimal myo-inositol to D-chiro-inositol ratio \u2014 the most clinically validated formulation.", ko: "\ubbf8\uc624\uc774\ub178\uc2dc\ud1a8\uacfc D-\uce74\uc774\ub85c\uc774\ub178\uc2dc\ud1a8\uc758 \ucd5c\uc801 \ube44\uc728. \uc784\uc0c1\uc5d0\uc11c \uac00\uc7a5 \ub9ce\uc774 \uac80\uc99d\ub428." } },
            { title: { en: "\u23f1\ufe0f 6+ months", ko: "\u23f1\ufe0f 6\uac1c\uc6d4 \uc774\uc0c1" }, desc: { en: "Consistent daily intake of 2\u20134g for at least 6 months needed for visible results.", ko: "\ud6a8\uacfc\ub97c \ubcf4\ub824\uba74 \ud558\ub8e8 2~4g\uc744 \ucd5c\uc18c 6\uac1c\uc6d4 \uafb8\uc900\ud788 \uc12d\ucde8\ud574\uc57c \ud574\uc694." } }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\ud83e\uddec How insulin resistance drives skin and hormonal problems",
        ko: "\ud83e\uddec \uc778\uc290\ub9b0 \uc800\ud56d\uc131\uc774 \ud53c\ubd80\uc640 \ud638\ub974\ubaac\uc5d0 \ubbf8\uce58\ub294 \uc601\ud5a5"
      },
      children: [
        {
          type: "callout",
          icon: "\ud83d\udcc8",
          title: { en: "Insulin \u2192 androgens \u2192 acne", ko: "\uc778\uc290\ub9b0 \u2192 \uc548\ub4dc\ub85c\uac90 \u2192 \uc5ec\ub4dc\ub984" },
          text: {
            en: "When insulin resistance develops, insulin levels rise. High insulin stimulates the ovaries to produce more <strong>androgens (male hormones)</strong>, which overstimulate sebaceous glands \u2014 causing hormonal acne along the jawline, cheeks, and chin. <mark>Myo-inositol targets the first step in this cascade: improving insulin sensitivity.</mark>",
            ko: "\uc778\uc290\ub9b0 \uc800\ud56d\uc131\uc774 \uc0dd\uae30\uba74 \uccb4\ub0b4 \uc778\uc290\ub9b0 \uc218\uce58\uac00 \uc62c\ub77c\uac00\uc694. \ub192\uc740 \uc778\uc290\ub9b0\uc740 \ub09c\uc18c\uc5d0\uc11c <strong>\uc548\ub4dc\ub85c\uac90(\ub0a8\uc131\ud638\ub974\ubaac)</strong> \ubd84\ube44\ub97c \uc790\uadf9\ud558\uace0, \uc548\ub4dc\ub85c\uac90\uc774 \ud53c\uc9c0\uc120\uc744 \uacfc\ud65c\uc131\ud654\uc2dc\ucf1c \ud131\xb7\ubfc0\xb7\ud131\uc120\uc744 \ub530\ub77c \ud638\ub974\ubaac\uc131 \uc5ec\ub4dc\ub984\uc774 \uc0dd\uae41\ub2c8\ub2e4. <mark>\ubbf8\uc624\uc774\ub178\uc2dc\ud1a8\uc740 \uc774 \uc5f0\uc1c4 \ubc18\uc751\uc758 \uccab \ub2e8\uacc4\uc778 \uc778\uc290\ub9b0 \uc800\ud56d\uc131\uc744 \uac1c\uc120\ud574\uc694.</mark>"
          },
          borderColor: "rgba(45,90,61,0.2)",
          bgColor: "rgba(45,90,61,0.04)"
        },
        {
          type: "callout",
          icon: "\ud83e\udd5a",
          title: { en: "PCOS and ovulation recovery", ko: "PCOS\uc640 \ubc30\ub780 \ud68c\ubcf5" },
          text: {
            en: "One of the core problems in PCOS is disrupted ovulation. Meta-analyses show myo-inositol supplementation <strong>significantly reduces fasting insulin and HOMA index (a measure of insulin resistance)</strong>, helping restore ovulation. The effect is strongest in hyperandrogenic PCOS phenotypes.",
            ko: "PCOS \ud658\uc790\uc758 \ud575\uc2ec \ubb38\uc81c \uc911 \ud558\ub098\uac00 \ubc30\ub780 \uc7a5\uc560\uc608\uc694. \uba54\ud0c0\ubd84\uc11d\uc5d0 \ub530\ub974\uba74 \ubbf8\uc624\uc774\ub178\uc2dc\ud1a8 \ubcf4\ucda9\uc774 <strong>\uacf5\ubcf5 \uc778\uc290\ub9b0\uacfc HOMA \uc9c0\uc218(\uc778\uc290\ub9b0 \uc800\ud56d\uc131 \uc9c0\ud45c)\ub97c \uc720\uc758\ubbf8\ud558\uac8c \ub0ae\ucd94\uace0</strong>, \ubc30\ub780 \ud68c\ubcf5\uc744 \ub3c4\uc654\uc5b4\uc694. \ud2b9\ud788 \uace0\uc548\ub4dc\ub85c\uac90\ud615 PCOS\uc5d0\uc11c \ud6a8\uacfc\uac00 \ub69c\ub837\ud588\uc2b5\ub2c8\ub2e4."
          },
          borderColor: "rgba(107,142,107,0.25)",
          bgColor: "rgba(107,142,107,0.06)"
        },
        {
          type: "callout",
          icon: "\u2696\ufe0f",
          title: { en: "Why the 40:1 ratio matters", ko: "40:1 \ube44\uc728\uc774 \uc911\uc694\ud55c \uc774\uc720" },
          text: {
            en: "Inositol comes in two forms: myo and D-chiro. The healthy body ratio is 40:1, but this balance is disrupted in PCOS. Supplements need to match this ratio \u2014 too much D-chiro can actually impair ovarian function instead of helping it.",
            ko: "\uc774\ub178\uc2dc\ud1a8\uc5d0\ub294 \ubbf8\uc624(myo)\uc640 D-\uce74\uc774\ub85c(D-chiro) \ub450 \ud615\ud0dc\uac00 \uc788\uc5b4\uc694. \uac74\uac15\ud55c \uccb4\ub0b4 \ube44\uc728\uc774 40:1\uc778\ub370, PCOS\uc5d0\uc11c\ub294 \uc774 \uade0\ud615\uc774 \ubb34\ub108\uc838\uc694. \ubcf4\ucda9\uc81c\ub3c4 \uc774 \ube44\uc728\uc744 \ub9de\ucdb0\uc57c \ud6a8\uacfc\uc801\uc774\uc5d0\uc694 \u2014 D-\uce74\uc774\ub85c\uac00 \ub108\ubb34 \ub9ce\uc73c\uba74 \uc624\ud788\ub824 \ub09c\uc18c \uae30\ub2a5\uc5d0 \uc5ed\ud6a8\uacfc\ub97c \uc904 \uc218 \uc788\uc2b5\ub2c8\ub2e4."
          },
          borderColor: "rgba(245,215,110,0.4)",
          bgColor: "rgba(245,215,110,0.08)"
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\ud83d\udccb What does the research actually say?",
        ko: "\ud83d\udccb \uc5f0\uad6c\ub294 \ubb50\ub77c\uace0 \ud558\ub098\uc694?"
      },
      children: [
        {
          type: "grid",
          minWidth: "280px",
          gap: 22,
          items: [
            { title: { en: "Acne improvement", ko: "\uc5ec\ub4dc\ub984 \uac1c\uc120" }, body: { en: "Studies show significant improvement in hormonal acne and hirsutism after 6+ months of inositol supplementation. Minimum 6 months of consistent use needed for visible skin changes.", ko: "\uc774\ub178\uc2dc\ud1a8\uc744 6\uac1c\uc6d4 \uc774\uc0c1 \ubcf5\uc6a9\ud55c \uc5f0\uad6c\uc5d0\uc11c \ud638\ub974\ubaac\uc131 \uc5ec\ub4dc\ub984\uacfc \ub2e4\ubaa8\uc99d\uc774 \uc720\uc758\ubbf8\ud558\uac8c \uac1c\uc120\ub410\uc5b4\uc694. \ucd5c\uc18c 6\uac1c\uc6d4\uc740 \uafb8\uc900\ud788 \uba39\uc5b4\uc57c \ud53c\ubd80 \ubcc0\ud654\uac00 \ubcf4\uc785\ub2c8\ub2e4." } },
            { title: { en: "Insulin resistance reduction", ko: "\uc778\uc290\ub9b0 \uc800\ud56d\uc131 \uac10\uc18c" }, body: { en: "A 2026 Frontiers review found myo-inositol enhances insulin sensitivity, helping PCOS patients restore ovulation and hormonal balance.", ko: "2026\ub144 \ud504\ub7f0\ud2f0\uc5b4\uc2a4 \ub9ac\ubdf0\uc5d0 \ub530\ub974\uba74 \ubbf8\uc624\uc774\ub178\uc2dc\ud1a8\uc774 \uc778\uc290\ub9b0 \uac10\uc218\uc131\uc744 \ub192\uc5ec PCOS \ud658\uc790\uc758 \ubc30\ub780\uacfc \ud638\ub974\ubaac \uade0\ud615 \ud68c\ubcf5\uc744 \ub3c4\uc654\uc5b4\uc694." } },
            { title: { en: "Evidence limitations", ko: "\uadfc\uac70\uc758 \ud55c\uacc4" }, body: { en: "The same 2026 review found no high-quality evidence among 85 items reviewed \u2014 18.9% moderate, 40% low quality. Promising but more large-scale studies are needed.", ko: "\uac19\uc740 2026\ub144 \ub9ac\ubdf0\uc5d0\uc11c 85\uac1c \uadfc\uac70 \ud56d\ubaa9 \uc911 \uace0\ud488\uc9c8 \uadfc\uac70\ub294 \uc5c6\uc5c8\uace0, 18.9%\uac00 \uc911\ub4f1\ub3c4\uc600\uc5b4\uc694. \uc720\ub9dd\ud558\uc9c0\ub9cc \uc544\uc9c1 \ub354 \ub9ce\uc740 \ub300\uaddc\ubaa8 \uc5f0\uad6c\uac00 \ud544\uc694\ud569\ub2c8\ub2e4." } },
            { title: { en: "Not all PCOS responds equally", ko: "PCOS \uc720\ud615\uc5d0 \ub530\ub77c \ub2e4\ub984" }, body: { en: "Hyperandrogenic PCOS showed significant improvement. Non-hyperandrogenic PCOS showed negligible effects. It's not a universal solution for all PCOS types.", ko: "\uace0\uc548\ub4dc\ub85c\uac90\ud615 PCOS\uc5d0\uc11c\ub294 \ud6a8\uacfc\uac00 \ub69c\ub837\ud588\uc9c0\ub9cc, \ube44\uace0\uc548\ub4dc\ub85c\uac90\ud615\uc5d0\uc11c\ub294 \ud6a8\uacfc\uac00 \ubbf8\ubbf8\ud588\uc5b4\uc694. \ubaa8\ub4e0 PCOS\uc5d0 \ub9cc\ub2a5\uc740 \uc544\ub2d9\ub2c8\ub2e4." } }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\u2728 Myo-inositol supplements worth trying",
        ko: "\u2728 \ubbf8\uc624\uc774\ub178\uc2dc\ud1a8 \ubcf4\ucda9\uc81c \ucd94\ucc9c"
      },
      children: [
        {
          type: "prodCards",
          cards: [
            { brand: "Ovasitol", name: "Inositol Powder", note: { en: "40:1 ratio verified \u2014 the most clinically referenced formula for PCOS", ko: "40:1 \ube44\uc728 \uc778\uc99d \u2014 PCOS \uc784\uc0c1\uc5d0\uc11c \uac00\uc7a5 \ub9ce\uc774 \uc0ac\uc6a9\ub41c \ud3ec\ubbac\ub7ec" }, accentColor: "#a07850" },
            { brand: "Wholesome Story", name: "Myo & D-Chiro Inositol Blend", note: { en: "40:1 ratio capsules + folate \u2014 convenient daily format", ko: "40:1 \ube44\uc728 \uce21\uc220 + \uc5fd\uc0b0 \u2014 \uac04\ud3b8\ud55c \uc77c\uc77c \ubcf5\uc6a9 \ud615\ud0dc" }, accentColor: "#a07850" },
            { brand: "Medion", name: "Supplecare Inositol", note: { en: "OxuGel\u2122 technology prevents gastric oxidation \u2014 leading Korean inositol brand", ko: "OxuGel\u2122 \uae30\uc220\ub85c \uc704\uc0b0 \uc0b0\ud654 \ubc29\uc9c0 \u2014 \ud55c\uad6d \uc2dc\uc7a5 \uc774\ub178\uc2dc\ud1a8 \uc120\ub450 \ube0c\ub79c\ub4dc" }, accentColor: "#a07850" }
          ]
        }
      ]
    }
  ],

  // ─── 4. Spicules ───
  'spicules-microneedling': [
    {
      type: "tldr",
      icon: "\ud83d\udccb",
      text: {
        en: "<strong>TL;DR:</strong> Spicules are microscopic needle-shaped particles from freshwater sponges. Massaged into skin, they create thousands of micro-channels that boost active ingredient penetration and trigger collagen production. Same principle as professional microneedling, but at home \u2014 and the particles shed naturally within 24 hours. K-beauty\u2019s most-pushed ingredient of 2026.",
        ko: "<strong>\uc694\uc57d:</strong> \uc2a4\ud53c\ud050(Spicules)\uc740 \ubbfc\ubb3c \ud574\uba74\uc5d0\uc11c \ucd94\ucd9c\ud55c \ubbf8\uc138 \ubc14\ub298 \uc785\uc790\uc608\uc694. \ud53c\ubd80\uc5d0 \ub9c8\uc0ac\uc9c0\ud558\uba74 \uc218\ucc9c \uac1c\uc758 \ub9c8\uc774\ud06c\ub85c \ucc44\ub110\uc744 \ub9cc\ub4e4\uc5b4 \ud65c\uc131 \uc131\ubd84\uc758 \uce68\ud22c\ub97c \ub3d5\uace0, \ucf5c\ub77c\uac90 \uc7ac\uc0dd\uc744 \uc720\ub3c4\ud569\ub2c8\ub2e4. \uc804\ubb38 \ub9c8\uc774\ud06c\ub85c\ub2c8\ub4e4\ub9c1\uacfc \ube44\uc2b7\ud55c \uc6d0\ub9ac\uc9c0\ub9cc \uc9d1\uc5d0\uc11c \ud560 \uc218 \uc788\uace0, 24\uc2dc\uac04 \ub4a4 \uc790\uc5f0\uc2a4\ub7fd\uac8c \ube60\uc838\ub098\uc640\uc694. K-\ubdf0\ud2f0\uac00 2026\ub144 \uac00\uc7a5 \ubc00\uace0 \uc788\ub294 \uc131\ubd84\uc785\ub2c8\ub2e4."
      }
    },
    {
      type: "figure",
      src: "https://images.unsplash.com/photo-1695479044464-67299fa84782?auto=format&fit=crop&q=80&w=1200",
      alt: "Skincare serum dropper bottle representing spicule microneedling skincare trend"
    },
    {
      type: "section",
      heading: {
        en: "\ud83e\uddeb What are spicules?",
        ko: "\ud83e\uddeb \uc2a4\ud53c\ud050\uc774 \ubb58\uac00\uc694?"
      },
      children: [
        {
          type: "body",
          text: {
            en: "Spicules are <strong>naturally occurring micro-needles</strong> that form the skeletal structure of freshwater sponges like Spongilla. Made of calcium and silica, they\u2019re a fraction of the width of a human hair. When massaged into skin via a serum or cream, <mark>they create thousands of temporary micro-channels in the epidermis, allowing active ingredients to penetrate far deeper than they normally would.</mark> That\u2019s why K-beauty calls them \u201cmicroneedling in a bottle.\u201d",
            ko: "\uc2a4\ud53c\ud050\uc740 \ubbfc\ubb3c \ud574\uba74(Spongilla) \uac19\uc740 \ud574\uc591 \uc0dd\ubb3c\uc758 \uace8\uaca9\uc744 \uc774\ub8e8\ub294 <strong>\ucc9c\uc5f0 \ubbf8\uc138 \ubc14\ub298</strong>\uc774\uc5d0\uc694. \uce7c\uc298\uacfc \uc2e4\ub9ac\uce74\ub85c \uc774\ub8e8\uc5b4\uc838 \uc788\uace0, \ud06c\uae30\ub294 \uba38\ub9ac\uce74\ub77d \uad75\uae30\uc758 \uc218\uc2ed \ubd84\uc758 \uc77c \uc815\ub3c4\uc785\ub2c8\ub2e4. \uc774\uac78 \uc2a4\ud0a8\ucf00\uc5b4 \uc81c\ud488\uc5d0 \ub123\uc5b4\uc11c \ud53c\ubd80\uc5d0 \ub9c8\uc0ac\uc9c0\ud558\uba74, <mark>\ud45c\ud53c\uc5d0 \uc218\ucc9c \uac1c\uc758 \ubbf8\uc138\ud55c \ud1b5\ub85c\uac00 \uc0dd\uae30\uba74\uc11c \uc138\ub7fc\uacfc \ud65c\uc131 \uc131\ubd84\uc774 \ud3c9\uc18c\ubcf4\ub2e4 \ud6e8\uc52c \uae4a\uc774 \uc2a4\uba70\ub4e4\uc5b4\uc694.</mark> K-\ubdf0\ud2f0\uc5d0\uc11c \u2018\ubcd1 \uc18d\uc758 \ub9c8\uc774\ud06c\ub85c\ub2c8\ub4e4\ub9c1\u2019, \u2018\ub9ac\ud034\ub4dc \ub9c8\uc774\ud06c\ub85c\ub2c8\ub4e4\ub9c1\u2019\uc774\ub77c\uace0 \ubd80\ub974\ub294 \uc774\uc720\uc608\uc694."
          }
        },
        {
          type: "statCards",
          cards: [
            { title: { en: "\ud83e\udea1 Natural micro-needles", ko: "\ud83e\udea1 \ucc9c\uc5f0 \ubbf8\uc138 \ubc14\ub298" }, desc: { en: "Calcium and silica needles from sponge skeletons \u2014 not synthetic.", ko: "\ud574\uba74 \uace8\uaca9\uc5d0\uc11c \ucd94\ucd9c\ud55c \uce7c\uc298\xb7\uc2e4\ub9ac\uce74 \ubc14\ub298. \ud569\uc131\uc774 \uc544\ub2cc \uc790\uc5f0 \uc720\ub798." } },
            { title: { en: "\u23f1\ufe0f Shed in 24 hours", ko: "\u23f1\ufe0f 24\uc2dc\uac04 \ud6c4 \ud0c8\ub77d" }, desc: { en: "Particles stay in the epidermis temporarily, then fall out naturally.", ko: "\ud45c\ud53c\uc5d0 \uba38\ubb3c\ub2e4 \uc790\uc5f0\uc2a4\ub7fd\uac8c \ube60\uc838\ub098\uc640\uc694. \uae08\uc18d \ubc14\ub298\ucc98\ub7fc \ub0a8\uc9c0 \uc54a\uc544\uc694." } },
            { title: { en: "\ud83d\udcc8 2026 K-beauty keyword", ko: "\ud83d\udcc8 2026\ub144 K-\ubdf0\ud2f0 \ud0a4\uc6cc\ub4dc" }, desc: { en: "Trending on social media as \u201cliquid microneedling.\u201d", ko: "\uc18c\uc15c\ubbf8\ub514\uc5b4\uc5d0\uc11c \u201c\ub9ac\ud034\ub4dc \ub9c8\uc774\ud06c\ub85c\ub2c8\ub4e4\ub9c1\u201d\uc73c\ub85c \uae09\ubd80\uc0c1 \uc911." } }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\ud83d\udd2c How do spicules actually work?",
        ko: "\ud83d\udd2c \uc5b4\ub5bb\uac8c \uc791\ub3d9\ud558\ub098\uc694?"
      },
      children: [
        {
          type: "callout",
          icon: "\ud83e\udea1",
          title: { en: "Step 1: Micro-channel creation", ko: "1\ub2e8\uacc4: \ub9c8\uc774\ud06c\ub85c \ucc44\ub110 \uc0dd\uc131" },
          text: {
            en: "When massaged in, the micro-needles create thousands of tiny channels in the stratum corneum. Through these channels, actives like vitamin C, retinol, and niacinamide penetrate <strong>far deeper than surface application</strong> \u2014 maximizing their effectiveness.",
            ko: "\ud53c\ubd80\uc5d0 \ub9c8\uc0ac\uc9c0\ud558\uba74 \ubbf8\uc138 \ubc14\ub298\uc774 \uac01\uc9c8\uce35\uc5d0 \uc218\ucc9c \uac1c\uc758 \ud1b5\ub85c\ub97c \ub9cc\ub4e4\uc5b4\uc694. \uc774 \ucc44\ub110\uc744 \ud1b5\ud574 \ube44\ud0c0\ubbfc C, \ub808\ud2f0\ub180, \ub098\uc774\uc2e0\uc544\ub9c8\uc774\ub4dc \uac19\uc740 \ud65c\uc131 \uc131\ubd84\uc774 \ud3c9\uc18c\ubcf4\ub2e4 <strong>\ud6e8\uc52c \uae4a\uc774 \uce68\ud22c</strong>\ud569\ub2c8\ub2e4. \uc131\ubd84\uc758 \ud6a8\uacfc\uac00 \uadf9\ub300\ud654\ub418\ub294 \uac70\uc608\uc694."
          },
          borderColor: "rgba(45,90,61,0.2)",
          bgColor: "rgba(45,90,61,0.04)"
        },
        {
          type: "callout",
          icon: "\ud83d\udd04",
          title: { en: "Step 2: Wound-healing response", ko: "2\ub2e8\uacc4: \uc0c1\ucc98 \uce58\uc720 \ubc18\uc751 \uc720\ub3c4" },
          text: {
            en: "Your skin detects the micro-injuries and immediately enters repair mode. <mark>Collagen and elastin production ramps up, and cell turnover accelerates.</mark> Same principle as professional microneedling \u2014 but using natural particles instead of metal needles.",
            ko: "\ud53c\ubd80\uac00 \ubbf8\uc138\ud55c \u201c\uc190\uc0c1\u201d\uc744 \uac10\uc9c0\ud558\uba74 \uc989\uc2dc \ubcf5\uad6c \ubaa8\ub4dc\uc5d0 \ub4e4\uc5b4\uac00\uc694. <mark>\ucf5c\ub77c\uac90\uacfc \uc5d8\ub77c\uc2a4\ud2f4 \uc0dd\uc131\uc774 \ucd09\uc9c4\ub418\uace0, \uc138\ud3ec \uc7ac\uc0dd(\ud134\uc624\ubc84)\uc774 \ube68\ub77c\uc9d1\ub2c8\ub2e4.</mark> \uc804\ubb38 \ub9c8\uc774\ud06c\ub85c\ub2c8\ub4e4\ub9c1\uacfc \uac19\uc740 \uc6d0\ub9ac\uc778\ub370, \ubc14\ub298 \ub300\uc2e0 \uc790\uc5f0 \uc720\ub798 \uc785\uc790\ub97c \uc0ac\uc6a9\ud558\ub294 \uac70\uc608\uc694."
          },
          borderColor: "rgba(107,142,107,0.25)",
          bgColor: "rgba(107,142,107,0.06)"
        },
        {
          type: "callout",
          icon: "\u2728",
          title: { en: "Step 3: Natural shedding", ko: "3\ub2e8\uacc4: \uc790\uc5f0 \ud0c8\ub77d" },
          text: {
            en: "Unlike metal needles, spicules remain in the superficial skin for about 24 hours before naturally shedding. During this time, they continue stimulating the skin \u2014 extending both the absorption window for actives and the regenerative response.",
            ko: "\uae08\uc18d \ubc14\ub298\uacfc \ub2ec\ub9ac \uc2a4\ud53c\ud050\uc740 \ud45c\ud53c \uc548\uc5d0 \uc57d 24\uc2dc\uac04 \uba38\ubb48 \ub4a4 \uc790\uc5f0\uc2a4\ub7fd\uac8c \ube60\uc838\ub098\uc640\uc694. \uc774 \uc2dc\uac04 \ub3d9\uc548 \uc9c0\uc18d\uc801\uc73c\ub85c \ud53c\ubd80\ub97c \uc790\uadf9\ud574\uc11c \ud65c\uc131 \uc131\ubd84 \ud761\uc218\uc640 \uc7ac\uc0dd \ubc18\uc751\uc774 \uc774\uc5b4\uc9d1\ub2c8\ub2e4."
          },
          borderColor: "rgba(245,215,110,0.4)",
          bgColor: "rgba(245,215,110,0.08)"
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\u2696\ufe0f How does it compare to professional microneedling?",
        ko: "\u2696\ufe0f \uc804\ubb38 \ub9c8\uc774\ud06c\ub85c\ub2c8\ub4e4\ub9c1\uacfc \ubb50\uac00 \ub2e4\ub978\uac00\uc694?"
      },
      children: [
        {
          type: "grid",
          minWidth: "280px",
          gap: 22,
          items: [
            { title: { en: "Depth difference", ko: "\uae4a\uc774\uc758 \ucc28\uc774" }, body: { en: "Professional microneedling reaches the dermis. Spicules stay in the epidermis (stratum corneum to granular layer). Shallower, but virtually no downtime.", ko: "\uc804\ubb38 \ub9c8\uc774\ud06c\ub85c\ub2c8\ub4e4\ub9c1\uc740 \uc9c4\ud53c\uce35\uae4c\uc9c0 \ub3c4\ub2ec\ud558\uc9c0\ub9cc, \uc2a4\ud53c\ud050\uc740 \ud45c\ud53c(\uac01\uc9c8\uce35~\uacfc\ub9bd\uce35)\uc5d0 \uba38\ubb3c\ub7ec\uc694. \ub354 \uc58a\uc9c0\ub9cc \uadf8\ub9cc\ud07c \ub2e4\uc6b4\ud0c0\uc784\uc774 \uac70\uc758 \uc5c6\uc2b5\ub2c8\ub2e4." } },
            { title: { en: "Who should be careful", ko: "\ub204\uac00 \uc4f8 \uc218 \uc788\ub098" }, body: { en: "Sensitive skin, active acne, and rosacea require caution. Tingling and mild redness after first use are normal \u2014 but irritation should be monitored.", ko: "\ubbfc\uac10\uc131 \ud53c\ubd80, \ud65c\uc131 \uc5ec\ub4dc\ub984, \uc8fc\uc0ac\ube44\uac00 \uc788\ub294 \ubd84\uc740 \uc8fc\uc758\uac00 \ud544\uc694\ud574\uc694. \ucc98\uc74c \uc0ac\uc6a9 \uc2dc \ub530\ub054\uac70\ub9bc\uacfc \ud64d\uc870\uac00 \uc788\uc744 \uc218 \uc788\uace0, \uc774\uac74 \uc815\uc0c1 \ubc18\uc751\uc774\uc5d0\uc694." } },
            { title: { en: "What it can't do", ko: "\ud6a8\uacfc\uc758 \ud55c\uacc4" }, body: { en: "Deep scars and severe wrinkles need professional treatments. Spicules excel at texture refinement, tone evening, and boosting active ingredient absorption.", ko: "\uae4a\uc740 \ud754\ud130\ub098 \uc2ec\ud55c \uc8fc\ub984\uc5d0\ub294 \uc804\ubb38 \uc2dc\uc220\uc774 \ub354 \ud6a8\uacfc\uc801\uc774\uc5d0\uc694. \uc2a4\ud53c\ud050\uc740 \ud53c\ubd80\uacb0 \uac1c\uc120, \ud1a4 \uade0\uc77c\ud654, \ud65c\uc131 \uc131\ubd84 \ubd80\uc2a4\ud305\uc5d0 \uac15\uc810\uc774 \uc788\uc5b4\uc694." } }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\u2728 Spicule products worth trying",
        ko: "\u2728 \uc2a4\ud53c\ud050 \uc131\ubd84\uc774 \ub4e4\uc5b4\uac04 \uc81c\ud488\ub4e4"
      },
      children: [
        {
          type: "prodCards",
          cards: [
            { brand: "Biodance", name: "Spicule Glow Ampoule", note: { en: "Sponge spicules + niacinamide \u2014 texture and tone improvement in one", ko: "\ud574\uba74 \uc2a4\ud53c\ud050 + \ub098\uc774\uc2e0\uc544\ub9c8\uc774\ub4dc \u2014 \ud53c\ubd80\uacb0 \uac1c\uc120\uacfc \ud1a4\uc5c5\uc744 \ub3d9\uc2dc\uc5d0" }, accentColor: "var(--accent)" },
            { brand: "Medicube", name: "Deep Vita C Micro Needle Pad", note: { en: "Spicule pad + vitamin C \u2014 wipe-on microneedling experience", ko: "\uc2a4\ud53c\ud050 \ud328\ub4dc + \ube44\ud0c0\ubbfcC \u2014 \ub2e6\uc544\ub0b4\ub294 \ub9c8\uc774\ud06c\ub85c\ub2c8\ub4e4\ub9c1 \uacbd\ud5d8" }, accentColor: "var(--accent)" },
            { brand: "Torriden", name: "Cellmazing Micro Needle Serum", note: { en: "Gentle-formula spicule serum \u2014 entry point for sensitive skin types", ko: "\uc800\uc790\uadf9 \uc2a4\ud53c\ud050 \uc138\ub7fc \u2014 \ubbfc\uac10 \ud53c\ubd80\ub3c4 \uc2dc\ub3c4\ud560 \uc218 \uc788\ub294 \uc5d4\ud2b8\ub9ac \uc81c\ud488" }, accentColor: "var(--accent)" }
          ]
        }
      ]
    }
  ],

  // ─── 5. Sugar Glycation ───
  'sugar-glycation-skin-aging': [
    {
      type: "tldr",
      icon: "\ud83d\udccb",
      text: {
        en: "<strong>TL;DR:</strong> Glycation is the process where blood glucose bonds permanently to collagen and elastin, forming AGEs (Advanced Glycation End-products). This makes skin stiff, yellowed, and wrinkle-prone. Est\u00e9e Lauder\u2019s April 2026 research confirmed a direct link between sugar exposure and accelerated skin cell aging markers. Carnosine and niacinamide are the key defensive ingredients.",
        ko: "<strong>\uc694\uc57d:</strong> \ub2f9\ud654 \ubc18\uc751(Glycation)\uc740 \ud608\uc911 \ud3ec\ub3c4\ub2f9\uc774 \ucf5c\ub77c\uac90\xb7\uc5d8\ub77c\uc2a4\ud2f4\uc5d0 \ub2ec\ub77c\ubd99\uc5b4 \uc601\uad6c\uc801\uc778 \uad50\ucc28\uacb0\ud569(AGEs)\uc744 \ub9cc\ub4dc\ub294 \uacfc\uc815\uc774\uc5d0\uc694. \ud53c\ubd80\uac00 \ubbb3\ubbb3\ud574\uc9c0\uace0 \ub204\ub807\uac8c \ubcc0\ud558\uba70 \uc8fc\ub984\uc774 \uae4a\uc5b4\uc838\uc694. \uc5d0\uc2a4\ud2f0 \ub85c\ub354\uc758 2026\ub144 4\uc6d4 \uc5f0\uad6c\uac00 \uc124\ud0d5 \ub178\ucd9c\uacfc \ud53c\ubd80 \uc138\ud3ec \ub178\ud654 \uac00\uc18d\uc758 \uc9c1\uc811\uc801 \uc5f0\uacb0\uc744 \ud655\uc778\ud588\uc2b5\ub2c8\ub2e4. \uce74\ub974\ub178\uc2e0, \ub098\uc774\uc2e0\uc544\ub9c8\uc774\ub4dc\uac00 \ud575\uc2ec \ubc29\uc5b4 \uc131\ubd84\uc774\uc5d0\uc694."
      }
    },
    {
      type: "figure",
      src: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=1200",
      alt: "Sugar cubes scattered on a surface, representing glycation and skin aging"
    },
    {
      type: "section",
      heading: {
        en: "What exactly is glycation?",
        ko: "\ub2f9\ud654 \ubc18\uc751\uc774\ub780 \uc815\ud655\ud788 \ubb58\uae4c\uc694?"
      },
      children: [
        {
          type: "body",
          text: {
            en: "Glycation happens when glucose or fructose molecules in your bloodstream attach to proteins without any enzyme directing the process. The proteins hit hardest in skin are <strong>collagen</strong> and <strong>elastin</strong> \u2014 the two structural proteins responsible for firmness and bounce. Once sugar bonds to these proteins, it forms an initial \u201cSchiff base\u201d attachment, which over time becomes an irreversible compound called an <mark>AGE (Advanced Glycation End-product)</mark>. As AGEs accumulate, they create cross-links between collagen fibers, making skin lose its flexibility.",
            ko: "\ub2f9\ud654 \ubc18\uc751\uc740 \ud608\ub958 \uc18d \ud3ec\ub3c4\ub2f9\uc774\ub098 \uacfc\ub2f9 \ubd84\uc790\uac00 \ub2e8\ubc31\uc9c8\uc5d0 \ube44\ud6a8\uc18c\uc801\uc73c\ub85c \uacb0\ud569\ud558\ub294 \uacfc\uc815\uc774\uc5d0\uc694. \ud53c\ubd80\uc5d0\uc11c \uac00\uc7a5 \ud0c0\uaca9\uc744 \ubc1b\ub294 \ub2e8\ubc31\uc9c8\uc774 \ubc14\ub85c <strong>\ucf5c\ub77c\uac90</strong>\uacfc <strong>\uc5d8\ub77c\uc2a4\ud2f4</strong> \u2014 \ud53c\ubd80\uc758 \ud0c4\ub825\uacfc \uad6c\uc870\ub97c \uc9c0\ud0f1\ud558\ub294 \ub450 \ud575\uc2ec \ub2e8\ubc31\uc9c8\uc774\uc5d0\uc694. \uc124\ud0d5\uc774 \uc774 \ub2e8\ubc31\uc9c8\uc5d0 \ub2ec\ub77c\ubd99\uc73c\uba74 \u201c\uc274\ud504 \uc5fc\uae30(Schiff base)\u201d\ub77c\ub294 \ucd08\uae30 \uacb0\ud569\uc744 \ud615\uc131\ud558\uace0, \uc2dc\uac04\uc774 \uc9c0\ub098\uba74 \ub418\ub3cc\ub9b4 \uc218 \uc5c6\ub294 <mark>\ucd5c\uc885\ub2f9\ud654\uc0b0\ubb3c AGEs(Advanced Glycation End-products)</mark>\ub85c \ubcc0\ud574\uc694. AGEs\uac00 \ucd95\uc801\ub418\uba74 \ucf5c\ub77c\uac90 \uc12c\uc720\ub07c\ub9ac \uad50\ucc28\uacb0\ud569(cross-link)\uc774 \uc0dd\uacb8\uc11c \ud53c\ubd80\uac00 \uc720\uc5f0\uc131\uc744 \uc783\uc5b4\uc694."
          }
        },
        {
          type: "statCards",
          cards: [
            { title: { en: "Collagen half-life", ko: "\ucf5c\ub77c\uac90 \ubc18\uac10\uae30" }, desc: { en: "Skin collagen turns over roughly every 15 years. Once glycated, damage persists for decades.", ko: "\ud53c\ubd80 \ucf5c\ub77c\uac90\uc758 \uad50\uccb4 \uc8fc\uae30\ub294 \uc57d 15\ub144. \ud55c\ubc88 \ub2f9\ud654\ub418\uba74 \uc218\uc2ed \ub144\uac04 \ucd95\uc801\ub3fc\uc694." } },
            { title: { en: "AGE accumulation", ko: "AGEs \ucd95\uc801" }, desc: { en: "Studies show AGEs increase at an accelerating rate after age 35.", ko: "35\uc138 \uc774\ud6c4 \ub9e4\ub144 AGEs\uac00 \uac00\uc18d\uc801\uc73c\ub85c \uc99d\uac00\ud55c\ub2e4\ub294 \uc5f0\uad6c \uacb0\uacfc\uac00 \uc788\uc5b4\uc694." } },
            { title: { en: "Why skin yellows", ko: "\ub204\ub807\uac8c \ubcc0\ud558\ub294 \uc774\uc720" }, desc: { en: "AGEs are brown-yellow fluorescent pigments. As they build up, skin tone becomes sallow.", ko: "AGEs\ub294 \uac08\uc0c9-\ub178\ub780\uc0c9 \ud615\uad11 \uc0c9\uc18c\uc608\uc694. \ucd95\uc801\ub418\uba74 \ud53c\ubd80\ud1a4\uc774 \uce59\uce59\ud574\uc838\uc694." } }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "What the Est\u00e9e Lauder research found",
        ko: "\uc5d0\uc2a4\ud2f0 \ub85c\ub354 \uc5f0\uad6c\uac00 \ubc1d\ud78c \uac83"
      },
      children: [
        {
          type: "body",
          text: {
            en: "In April 2026, Est\u00e9e Lauder Research published findings showing that skin cells exposed to elevated sugar concentrations exhibit significantly increased expression of <strong>aging-associated genes</strong>. Specifically, dermal fibroblasts (the deep-skin cells that produce collagen) cultured in high-glucose environments showed telomere shortening, mitochondrial dysfunction, and reduced collagen synthesis. <mark>The key finding: cellular aging progressed without any UV exposure \u2014 sugar alone was sufficient</mark>.",
            ko: "\uc5d0\uc2a4\ud2f0 \ub85c\ub354 \uc5f0\uad6c\uc18c\ub294 2026\ub144 4\uc6d4, \uc124\ud0d5\uc5d0 \ub178\ucd9c\ub41c \ud53c\ubd80 \uc138\ud3ec\uc5d0\uc11c <strong>\ub178\ud654 \uad00\ub828 \uc720\uc804\uc790 \ubc1c\ud604</strong>\uc774 \uc720\uc758\ubbf8\ud558\uac8c \uc99d\uac00\ud55c\ub2e4\ub294 \uacb0\uacfc\ub97c \ubc1c\ud45c\ud588\uc5b4\uc694. \uad6c\uccb4\uc801\uc73c\ub85c, \uace0\ub18d\ub3c4 \ud3ec\ub3c4\ub2f9 \ud658\uacbd\uc5d0\uc11c \ubc30\uc591\ud55c \uc9c4\ud53c \uc12c\uc720\uc544\uc138\ud3ec(\ud53c\ubd80 \uae4a\uc740 \uce35\uc5d0\uc11c \ucf5c\ub77c\uac90\uc744 \ub9cc\ub4dc\ub294 \uc138\ud3ec)\uac00 \ud154\ub85c\ubbf8\uc5b4 \ub2e8\ucd95, \ubbf8\ud1a0\ucf58\ub4dc\ub9ac\uc544 \uae30\ub2a5 \uc800\ud558, \uadf8\ub9ac\uace0 \ucf5c\ub77c\uac90 \uc0dd\uc131 \uac10\uc18c\ub97c \ubcf4\uc600\uc5b4\uc694. <mark>\uc790\uc678\uc120 \uc5c6\uc774\ub3c4 \uc124\ud0d5\ub9cc\uc73c\ub85c \uc138\ud3ec \uc218\uc900\uc758 \ub178\ud654\uac00 \uc9c4\ud589\ub41c\ub2e4</mark>\ub294 \uc810\uc774 \ud575\uc2ec\uc774\uc5d0\uc694."
          }
        },
        {
          type: "callout",
          icon: "\ud83d\udd2c",
          title: { en: "The core mechanism", ko: "\uc5f0\uad6c \ud575\uc2ec \uba54\ucee4\ub2c8\uc998" },
          text: {
            en: "When AGEs accumulate, they activate a cell-surface receptor called RAGE (Receptor for AGEs). RAGE activation triggers the NF-\u03baB inflammatory pathway, which increases production of MMPs (Matrix Metalloproteinases) \u2014 enzymes that break down existing collagen. Sugar launches a double attack: it damages new collagen while simultaneously degrading what you already have.",
            ko: "AGEs\uac00 \ucd95\uc801\ub418\uba74 RAGE(\ucd5c\uc885\ub2f9\ud654\uc0b0\ubb3c \uc218\uc6a9\uccb4)\ub77c\ub294 \uc138\ud3ec \ud45c\uba74 \uc218\uc6a9\uccb4\uac00 \ud65c\uc131\ud654\ub3fc\uc694. RAGE\uac00 \ud65c\uc131\ud654\ub418\uba74 NF-\u03baB \uacbd\ub85c\ub97c \ud1b5\ud574 \ub9cc\uc131 \uc5fc\uc99d\uc774 \uc720\ubc1c\ub418\uace0, \uc774 \uc5fc\uc99d\uc774 \ucf5c\ub77c\uac90 \ubd84\ud574 \ud6a8\uc18c(MMP)\ub97c \uc99d\uac00\uc2dc\ucf1c \uae30\uc874 \ucf5c\ub77c\uac90\uae4c\uc9c0 \ud30c\uad34\ud574\uc694. \uc124\ud0d5\uc740 \uc0c8 \ucf5c\ub77c\uac90\uc744 \ub9dd\uac00\ub728\ub9ac\uba74\uc11c \ub3d9\uc2dc\uc5d0 \uae30\uc874 \ucf5c\ub77c\uac90\ub3c4 \ubd84\ud574\ud558\ub294 \uc774\uc911 \uacf5\uaca9\uc744 \ud574\uc694."
          },
          borderColor: "rgba(245,215,110,0.4)",
          bgColor: "rgba(245,215,110,0.08)"
        },
        {
          type: "callout",
          icon: "\u26a1",
          title: { en: "UV vs glycation: the comparison", ko: "\uc790\uc678\uc120 vs \ub2f9\ud654: \ube44\uad50" },
          text: {
            en: "UV damage concentrates in the epidermis and upper dermis \u2014 sunscreen blocks over 90% of it. Glycation damage, by contrast, reaches the entire dermis via blood circulation, and once AGEs form, they are irreversible. You can block UV with sunscreen. But the sugar you eat every day attacks skin from the inside.",
            ko: "UV \uc190\uc0c1\uc740 \uc8fc\ub85c \ud45c\ud53c\uc640 \uc9c4\ud53c \uc0c1\ubd80\uc5d0 \uc9d1\uc911\ub418\uace0 \uc120\ud06c\ub9bc\uc73c\ub85c 90% \uc774\uc0c1 \ucc28\ub2e8 \uac00\ub2a5\ud574\uc694. \ubc18\uba74 \ub2f9\ud654 \uc190\uc0c1\uc740 \ud608\ub958\ub97c \ud1b5\ud574 \uc9c4\ud53c \uc804\uccb4\uc5d0 \uc601\ud5a5\uc744 \uc8fc\uace0, \ud55c\ubc88 \ud615\uc131\ub41c AGEs\ub294 \ub418\ub3cc\ub9b4 \uc218 \uc5c6\uc5b4\uc694. \uc790\uc678\uc120\uc740 \ub9c9\uc744 \uc218 \uc788\uc9c0\ub9cc, \ub9e4\uc77c \uba39\ub294 \uc124\ud0d5\uc740 \uc548\uc5d0\uc11c\ubd80\ud130 \ud53c\ubd80\ub97c \uacf5\uaca9\ud569\ub2c8\ub2e4."
          },
          borderColor: "rgba(245,215,110,0.4)",
          bgColor: "rgba(245,215,110,0.08)"
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "Ingredients that fight glycation",
        ko: "\ub2f9\ud654\ub97c \ub9c9\ub294 \uc131\ubd84\ub4e4"
      },
      children: [
        {
          type: "body",
          text: {
            en: "Glycation prevention is emerging as its own anti-aging category \u2014 <mark>a fundamentally different approach from the retinoid-centered anti-aging</mark> most people know.",
            ko: "\ub2f9\ud654 \ubc29\uc9c0\ub294 \uc774\uc81c \ub3c5\ub9bd\uc801\uc778 \uc548\ud2f0\uc5d0\uc774\uc9d5 \uce74\ud14c\uace0\ub9ac\ub85c \ubd80\uc0c1\ud558\uace0 \uc788\uc5b4\uc694. <mark>\uae30\uc874 \ub808\ud2f0\ub178\uc774\ub4dc \uc911\uc2ec\uc758 \uc548\ud2f0\uc5d0\uc774\uc9d5\uacfc\ub294 \uc804\ud600 \ub2e4\ub978 \uc811\uadfc</mark>\uc774\uc5d0\uc694."
          }
        },
        {
          type: "callout",
          icon: "\ud83d\udee1\ufe0f",
          title: { en: "Carnosine", ko: "\uce74\ub974\ub178\uc2e0 (Carnosine)" },
          text: {
            en: "A dipeptide (two amino acids bonded together) that reacts with sugar before it can attach to collagen \u2014 essentially sacrificing itself to prevent AGE formation. Called a \u201csacrificial molecule.\u201d Multiple in vitro studies confirm it significantly inhibits AGE formation.",
            ko: "\ub514\ud39d\ud0c0\uc774\ub4dc(\uc544\ubbf8\ub178\uc0b0 2\uac1c\uac00 \uacb0\ud569\ud55c \ubd84\uc790)\uc608\uc694. \ud3ec\ub3c4\ub2f9\uc774 \ucf5c\ub77c\uac90\uc5d0 \uacb0\ud569\ud558\uae30 \uc804\uc5d0 \uba3c\uc800 \uc124\ud0d5\uacfc \ubc18\uc751\ud574\uc11c AGE \ud615\uc131\uc744 \ucc28\ub2e8\ud574\uc694. \u201c\ud76c\uc0dd \ubd84\uc790\u201d\ub77c\uace0 \ubd88\ub824\uc694 \u2014 \ucf5c\ub77c\uac90 \ub300\uc2e0 \uc790\uae30\uac00 \ub2f9\ud654\ub418\ub294 \uac70\uc608\uc694. \uc5ec\ub7ec in vitro \uc5f0\uad6c\uc5d0\uc11c AGE \ud615\uc131\uc744 \uc720\uc758\ubbf8\ud558\uac8c \uc5b5\uc81c\ud558\ub294 \uac83\uc73c\ub85c \ud655\uc778\ub410\uc5b4\uc694."
          },
          borderColor: "rgba(45,90,61,0.2)",
          bgColor: "rgba(45,90,61,0.04)"
        },
        {
          type: "callout",
          icon: "\u2728",
          title: { en: "Niacinamide (Vitamin B3)", ko: "\ub098\uc774\uc2e0\uc544\ub9c8\uc774\ub4dc (Niacinamide, \ube44\ud0c0\ubbfc B3)" },
          text: {
            en: "Already widely used, but its anti-glycation properties are less known. Niacinamide boosts NADPH production to reduce oxidative stress and dampens the inflammatory response triggered by the AGE-RAGE pathway. It also stimulates collagen synthesis \u2014 helping replenish what glycation destroys.",
            ko: "\uc774\ubbf8 \ub110\ub9ac \uc0ac\uc6a9\ub418\ub294 \uc131\ubd84\uc774\uc9c0\ub9cc, \ub2f9\ud654 \ubc29\uc9c0 \ud6a8\uacfc\ub294 \ub35c \uc54c\ub824\uc838 \uc788\uc5b4\uc694. \ub098\uc774\uc2e0\uc544\ub9c8\uc774\ub4dc\ub294 NADPH \uc0dd\uc131\uc744 \ucd09\uc9c4\ud574\uc11c \uc0b0\ud654 \uc2a4\ud2b8\ub808\uc2a4\ub97c \uc904\uc774\uace0, AGE-RAGE \uacbd\ub85c\uc5d0 \uc758\ud55c \uc5fc\uc99d \ubc18\uc751\uc744 \uc644\ud654\ud574\uc694. \ub3d9\uc2dc\uc5d0 \ucf5c\ub77c\uac90 \ud569\uc131\ub3c4 \ucd09\uc9c4\ud558\ub2c8\uae4c \ub2f9\ud654\ub85c \uc190\uc2e4\ub41c \ucf5c\ub77c\uac90\uc744 \ubcf4\ucda9\ud558\ub294 \uc5ed\ud560\uae4c\uc9c0 \ud574\uc694."
          },
          borderColor: "rgba(45,90,61,0.2)",
          bgColor: "rgba(45,90,61,0.04)"
        },
        {
          type: "callout",
          icon: "\ud83c\udf3f",
          title: { en: "Aminoguanidine", ko: "\uc544\ubbf8\ub178\uad6c\uc544\ub2c8\ub518 (Aminoguanidine)" },
          text: {
            en: "The \u201cgold standard\u201d AGE inhibitor in glycation research. It blocks the intermediate Amadori products from converting into permanent AGEs. Studied in pharmaceutical research for preventing diabetic complications. Difficult to use at high concentrations in cosmetics, but included in some specialized formulations.",
            ko: "\ub2f9\ud654 \uc5f0\uad6c\uc5d0\uc11c \u201c\uace8\ub4dc \uc2a4\ud0e0\ub354\ub4dc\u201d \uc5b5\uc81c\uc81c\ub85c \uc0ac\uc6a9\ub418\ub294 \uc131\ubd84\uc774\uc5d0\uc694. \uc274\ud504 \uc5fc\uae30\uac00 AGE\ub85c \uc804\ud658\ub418\ub294 \uc911\uac04 \ub2e8\uacc4(\uc544\ub9c8\ub3c4\ub9ac \uc0b0\ubb3c)\ub97c \ucc28\ub2e8\ud574\uc694. \uc758\uc57d\ud488 \uc5f0\uad6c\uc5d0\uc11c\ub294 \ub2f9\ub1e8 \ud569\ubcd1\uc99d \ubc29\uc9c0\ub97c \uc704\ud574 \uc5f0\uad6c\ub410\uace0, \ud654\uc7a5\ud488\uc5d0\uc11c\ub294 \uace0\ub18d\ub3c4 \uc801\uc6a9\uc774 \uc5b4\ub835\uc9c0\ub9cc \uc77c\ubd80 \uc804\ubb38 \ud3ec\ubbac\ub808\uc774\uc158\uc5d0 \ud3ec\ud568\ub3fc \uc788\uc5b4\uc694."
          },
          borderColor: "rgba(45,90,61,0.2)",
          bgColor: "rgba(45,90,61,0.04)"
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "How to reduce glycation in daily life",
        ko: "\uc0dd\ud65c \uc18d \ub2f9\ud654 \ubc29\uc9c0\ubc95"
      },
      children: [
        {
          type: "body",
          text: {
            en: "Topical ingredients alone aren\u2019t enough. <mark>Because glycation starts from within, diet is your first line of defense</mark>.",
            ko: "\ud1a0\ud53c\uce7c \uc131\ubd84\ub9cc\uc73c\ub85c\ub294 \ubd80\uc871\ud574\uc694. <mark>\ub2f9\ud654\ub294 \uc548\uc5d0\uc11c \uc2dc\uc791\ub418\uae30 \ub54c\ubb38\uc5d0 \uc2dd\uc2b5\uad00\uc774 \uccab \ubc88\uc9f8 \ubc29\uc5b4\uc120</mark>\uc774\uc5d0\uc694."
          }
        },
        {
          type: "grid",
          minWidth: "280px",
          gap: 22,
          items: [
            { title: { en: "Reduce blood sugar spikes", ko: "\ud608\ub2f9 \uc2a4\ud30c\uc774\ud06c\ub97c \uc904\uc774\uc138\uc694" }, body: { en: "Simple sugars (candy, sodas, white bread) spike blood glucose rapidly, accelerating glycation. Eating fiber and protein before carbohydrates \u2014 just changing the order \u2014 measurably reduces glucose spikes.", ko: "\ub2e8\uc21c\ub2f9(\uacfc\uc790, \uc74c\ub8cc, \ud770 \ube75)\uc740 \ud608\ub2f9\uc744 \uae09\uaca9\ud788 \uc62c\ub824 \ub2f9\ud654\ub97c \uac00\uc18d\ud574\uc694. \uc2dd\uc774\uc12c\uc720\uc640 \ub2e8\ubc31\uc9c8\uc744 \uba3c\uc800 \uba39\uace0 \ud0c4\uc218\ud654\ubb3c\uc744 \ub098\uc911\uc5d0 \uba39\ub294 \uc21c\uc11c\ub9cc \ubc14\uafd4\ub3c4 \ud608\ub2f9 \uc2a4\ud30c\uc774\ud06c\uac00 \uc904\uc5b4\uc694." } },
            { title: { en: "Reduce high-heat cooking", ko: "\uace0\uc628 \uc870\ub9ac\ub97c \uc904\uc774\uc138\uc694" }, body: { en: "Grilled, fried, and barbecued foods contain pre-formed AGEs (exogenous AGEs). Steaming, sous vide, and low-temperature methods significantly reduce AGE intake from food.", ko: "\uad6c\uc774, \ud280\uae40, \ubc14\ubca0\ud050 \ub4f1 \uace0\uc628 \uc870\ub9ac\ub41c \uc74c\uc2dd\uc5d0\ub294 \uc774\ubbf8 \ud615\uc131\ub41c AGEs(\uc678\uc778\uc131 AGEs)\uac00 \ub9ce\uc544\uc694. \ucc1c, \uc218\ube44\ub4dc, \uc800\uc628 \uc870\ub9ac \ubc29\uc2dd\uc774 AGE \uc12d\ucde8\ub97c \uc904\uc5ec\uc918\uc694." } },
            { title: { en: "Eat antioxidants", ko: "\ud56d\uc0b0\ud654\uc81c\ub97c \uc12d\ucde8\ud558\uc138\uc694" }, body: { en: "Vitamin C, alpha-lipoic acid, and green tea EGCG reduce the oxidative stress that accompanies glycation, slowing AGE formation.", ko: "\ube44\ud0c0\ubbfc C, \uc54c\ud30c\ub9ac\ud3ec\uc0b0, \ub179\ucc28\uc758 EGCG\ub294 \ub2f9\ud654 \uacfc\uc815\uc5d0\uc11c \ubc1c\uc0dd\ud558\ub294 \uc0b0\ud654 \uc2a4\ud2b8\ub808\uc2a4\ub97c \uc904\uc5ec AGE \ud615\uc131 \uc18d\ub3c4\ub97c \ub2a6\ucd9c \uc218 \uc788\uc5b4\uc694." } }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\u2728 Products worth trying",
        ko: "\u2728 \ucd94\ucc9c \uc81c\ud488"
      },
      children: [
        {
          type: "prodCards",
          cards: [
            { brand: "The Ordinary", name: "Niacinamide 10% + Zinc 1%", note: { en: "High-concentration niacinamide serum. Dampens AGE-RAGE inflammatory pathway and boosts collagen synthesis. Best value in the category.", ko: "\ub098\uc774\uc2e0\uc544\ub9c8\uc774\ub4dc \uace0\ub18d\ub3c4 \uc138\ub7fc. AGE-RAGE \uc5fc\uc99d \uacbd\ub85c\ub97c \uc644\ud654\ud558\uace0 \ucf5c\ub77c\uac90 \ud569\uc131\uc744 \ucd09\uc9c4\ud574\uc694. \uac00\uc131\ube44 \ucd5c\uac15." }, accentColor: "var(--accent)" },
            { brand: "Paula's Choice", name: "Resist 10% Niacinamide Booster", note: { en: "Niacinamide 10% + panthenol + vitamin C. Booster format you can mix into any existing serum or moisturizer.", ko: "\ub098\uc774\uc2e0\uc544\ub9c8\uc774\ub4dc 10% + \ud310\ud14c\ub180 + \ube44\ud0c0\ubbfc C. \uae30\uc874 \uc138\ub7fc\uc774\ub098 \ubaa8\uc774\uc2a4\ucc98\ub77c\uc774\uc800\uc5d0 \uc11e\uc5b4 \uc4f8 \uc218 \uc788\ub294 \ubd80\uc2a4\ud130 \ud615\ud0dc\uc608\uc694." }, accentColor: "var(--accent)" },
            { brand: "Dr. Jart+", name: "Vital Hydra Solution Biome Essence", note: { en: "Niacinamide + probiotics combination. Repairs barrier weakened by glycation stress while providing antioxidant protection.", ko: "\ub098\uc774\uc2e0\uc544\ub9c8\uc774\ub4dc + \ud504\ub85c\ubc14\uc774\uc624\ud2f1\uc2a4 \uc870\ud569\uc73c\ub85c \ub2f9\ud654 \uc2a4\ud2b8\ub808\uc2a4\ub85c \uc57d\ud574\uc9c4 \ud53c\ubd80 \uc7a5\ubcbd\uc744 \ubcf5\uad6c\ud558\uba74\uc11c \ud56d\uc0b0\ud654 \ubcf4\ud638\ub97c \uc81c\uacf5\ud574\uc694." }, accentColor: "var(--accent)" }
          ]
        }
      ]
    }
  ],

  // ─── 6. Grown-Up Gourmand ───
  'grown-up-gourmand-matcha-pistachio': [
    {
      type: "tldr",
      icon: "\ud83d\udccb",
      text: {
        en: "<strong>TL;DR:</strong> Gourmand fragrance is evolving from candy-sweet to savory-sophisticated. Pistachio searches are up 852% YoY, matcha is 2026\u2019s flagship gourmand note, and roasted sesame is emerging fast. Pyrazines (toasted aroma), lactones (creamy texture), and L-theanine (bitter-sweet depth) are the molecules behind the \u201cculinary perfumery\u201d movement.",
        ko: "<strong>\uc694\uc57d:</strong> \uad6c\ub974\ub9dd \ud5a5\uc218\uac00 \ub2ec\ucf64\ud55c \ub514\uc800\ud2b8\uc5d0\uc11c \uace0\uc18c\ud558\uace0 \uc409\uc2f8\ub984\ud55c \ubc29\ud5a5\uc73c\ub85c \uc9c4\ud654\ud558\uace0 \uc788\uc5b4\uc694. \ud53c\uc2a4\ud0c0\uce58\uc624 \ud5a5\ub8cc \uac80\uc0c9\uc740 \uc804\ub144 \ub300\ube44 852% \uae09\ub4f1\ud588\uace0, \ub9d0\ucc28\ub294 2026\ub144 \uad6c\ub974\ub9dd\uc758 \ub300\ud45c \ub178\ud2b8\uac00 \ub410\uc2b5\ub2c8\ub2e4. \ud53c\ub77c\uc9c4(\ubcf6\uc740 \ud5a5), \ub77d\ud1a4(\ud06c\ub9ac\ubbf8\ud55c \uc9c8\uac10), L-\ud14c\uc544\ub2cc(\uc4f4\ub9db) \uac19\uc740 \ubd84\uc790\ub4e4\uc774 \u201c\ubbf8\uc2dd\uac00\uc758 \ud5a5\uc218\u201d\ub97c \ub9cc\ub4e4\uc5b4\uc694."
      }
    },
    {
      type: "figure",
      src: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=1200",
      alt: "Matcha green tea powder with bamboo whisk, representing savory gourmand fragrance"
    },
    {
      type: "section",
      heading: {
        en: "Why did gourmand fragrance suddenly grow up?",
        ko: "\uad6c\ub974\ub9dd \ud5a5\uc218\uac00 \uc65c \uac11\uc790\uae30 \u201c\uc5b4\ub978\u201d\uc774 \ub410\uc744\uae4c\uc694?"
      },
      children: [
        {
          type: "body",
          text: {
            en: "Think about gourmand fragrances in the 2010s. Vanilla cupcakes, cotton candy, caramel \u2014 sweet and obvious. Starting in 2025, the direction shifted decisively. <strong>Pistachio</strong> fragrance searches surged 852% year-over-year, while matcha and roasted sesame notes spread from niche houses into mainstream collections. <mark>Instead of candy-sweet, the new gourmand speaks in umami, bitter-sweet, and texture \u2014 the language of culinary sophistication</mark>. Two forces drove this shift. First, the explosion of food culture: Netflix chef documentaries, the omakase boom, specialty coffee \u2014 as our palates grew more refined, our olfactory preferences followed. Second, the <strong>solinote</strong> revival. Single-note fragrances \u2014 perfumes built around one hero ingredient \u2014 came back in force, proving that \u201cjust matcha\u201d or \u201cjust sesame\u201d could carry a fragrance entirely on its own.",
            ko: "2010\ub144\ub300\uc758 \uad6c\ub974\ub9dd \ud5a5\uc218\ub97c \ub5a0\uc62c\ub824\ubcf4\uc138\uc694. \ubc14\ub2d0\ub77c \ucef5\ucf00\uc774\ud06c, \uc19c\uc0ac\ud0d5, \uce74\ub77c\uba5c \u2014 \ub2ec\ucf64\ud558\uace0 \uc9c1\uad00\uc801\uc774\uc5c8\uc5b4\uc694. \uadf8\ub7f0\ub370 2025\ub144\ubd80\ud130 \ud750\ub984\uc774 \ubc14\ub00c\uae30 \uc2dc\uc791\ud588\uc2b5\ub2c8\ub2e4. <strong>\ud53c\uc2a4\ud0c0\uce58\uc624</strong> \ud5a5\ub8cc \uac80\uc0c9\uc774 \uc804\ub144 \ub300\ube44 852% \uae09\ub4f1\ud558\uace0, \ub9d0\ucc28\uc640 \ubcf6\uc740 \ucc38\uae68 \uac19\uc740 \ub178\ud2b8\uac00 \ub2c8\uce58 \ube0c\ub79c\ub4dc\ub97c \uc911\uc2ec\uc73c\ub85c \ud655\uc0b0\ub410\uc5b4\uc694. <mark>\uc0ac\ud0d5 \uac19\uc740 \ub2ec\ucf64\ud568 \ub300\uc2e0 \uace0\uc18c\ud568, \uc4f4\ub9db, \uac10\uce60\ub9db \u2014 \ubbf8\uc2dd\uc758 \uc5b8\uc5b4\uac00 \ud5a5\uc218\uc5d0 \ub4e4\uc5b4\uc628 \uac70\uc608\uc694</mark>. \uc774 \ubcc0\ud654\uc758 \ubc30\uacbd\uc5d0\ub294 \ub450 \uac00\uc9c0 \ud750\ub984\uc774 \uc788\uc5b4\uc694. \uccab\uc9f8, \ubbf8\uc2dd \ubb38\ud654\uc758 \ud3ed\ubc1c\uc801 \uc131\uc7a5. \ub137\ud50c\ub9ad\uc2a4 \uc170\ud504 \ub2e4\ud050, \uc624\ub9c8\uce74\uc138 \ubd90, \uc2a4\ud398\uc15c\ud2f0 \ucee4\ud53c \u2014 \uc6b0\ub9ac\uc758 \ubbf8\uac01\uc774 \uc815\uad50\ud574\uc9c0\uba74\uc11c \ud6c4\uac01 \ucde8\ud5a5\ub3c4 \ub530\ub77c\uac04 \uac70\uc608\uc694. \ub458\uc9f8, <strong>\uc194\ub9ac\ub178\ud2b8(solinote)</strong>\uc758 \ubd80\ud65c. \ud558\ub098\uc758 \ub178\ud2b8\ub9cc \uc9d1\uc911 \uc870\uba85\ud558\ub294 \uc2f1\uae00\ub178\ud2b8 \ud5a5\uc218\uac00 \ub2e4\uc2dc \uc778\uae30\ub97c \ub04c\uba74\uc11c, \u201c\ub9d0\ucc28 \ud558\ub098\u201d\ub098 \u201c\ucc38\uae68 \ud558\ub098\u201d\ub85c\ub3c4 \ucda9\ubd84\ud788 \ub9e4\ub825\uc801\uc778 \ud5a5\uc774 \uac00\ub2a5\ud574\uc84c\uc2b5\ub2c8\ub2e4."
          }
        },
        {
          type: "statCards",
          cards: [
            { title: { en: "852%", ko: "852%" }, desc: { en: "Year-over-year search growth for pistachio in fragrance. The fastest-growing gourmand note of 2025-2026.", ko: "\ud53c\uc2a4\ud0c0\uce58\uc624 \ud5a5\ub8cc\uc758 \uc804\ub144 \ub300\ube44 \uac80\uc0c9 \uc99d\uac00\uc728. 2025-2026\ub144 \uac00\uc7a5 \ube60\ub974\uac8c \uc131\uc7a5\ud55c \uad6c\ub974\ub9dd \ub178\ud2b8\uc608\uc694." } },
            { title: { en: "Solinote Revival", ko: "\uc194\ub9ac\ub178\ud2b8 \ubd80\ud65c" }, desc: { en: "Single-note fragrances are surging back. Matcha, sesame, and pistachio prove one ingredient can carry an entire perfume.", ko: "\ud558\ub098\uc758 \ub178\ud2b8\uc5d0 \uc9d1\uc911\ud558\ub294 \uc2f1\uae00\ub178\ud2b8 \ud5a5\uc218\uac00 \ub2e4\uc2dc \uc8fc\ubaa9\ubc1b\uace0 \uc788\uc5b4\uc694. \ub9d0\ucc28, \ucc38\uae68 \ub4f1 \ub2e8\uc77c \uc18c\uc7ac\uc758 \ub9e4\ub825\uc744 \ubcf4\uc5ec\uc90d\ub2c8\ub2e4." } },
            { title: { en: "Kitchen \u2192 Perfumery", ko: "\ubbf8\uc2dd \u2192 \ud5a5\uc218" }, desc: { en: "Omakase culture, specialty coffee, chef documentaries \u2014 culinary sophistication is reshaping what we want to smell like.", ko: "\uc624\ub9c8\uce74\uc138, \uc2a4\ud398\uc15c\ud2f0 \ucee4\ud53c \ub4f1 \ubbf8\uc2dd \ubb38\ud654\uc758 \uc131\uc7a5\uc774 \ud6c4\uac01 \ucde8\ud5a5\uc744 \ud568\uaed8 \uc815\uad50\ud558\uac8c \ub9cc\ub4e4\uc5c8\uc5b4\uc694." } }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "The molecules behind toasted, bitter, and umami",
        ko: "\uace0\uc18c\ud568, \uc4f4\ub9db, \uac10\uce60\ub9db \u2014 \uc774 \ud5a5\uc744 \ub9cc\ub4dc\ub294 \ubd84\uc790\ub4e4"
      },
      children: [
        {
          type: "body",
          text: {
            en: "The secret to gourmand\u2019s \u201cgrowing up\u201d lies at the molecular level. Traditional gourmand was built on <strong>vanillin</strong> and <strong>ethyl maltol</strong> \u2014 molecules that smell like sugar and caramel. The new gourmand uses an entirely different molecular palette. <mark>Pyrazines, lactones, and L-theanine are the three pillars satisfying the \u201cgourmet nose\u201d</mark>.",
            ko: "\uad6c\ub974\ub9dd\uc774 \u201c\uc5b4\ub978\u201d\uc774 \ub41c \ube44\uacb0\uc740 \ubd84\uc790 \uc218\uc900\uc5d0\uc11c \ucc3e\uc744 \uc218 \uc788\uc5b4\uc694. \uc804\ud1b5 \uad6c\ub974\ub9dd\uc758 \ud575\uc2ec\uc740 <strong>\ubc14\ub2d0\ub9b0</strong>(vanillin)\uacfc <strong>\uc5d0\ud2f8 \ub9d0\ud1a8</strong>(ethyl maltol) \u2014 \uc124\ud0d5\uacfc \uce74\ub77c\uba5c \ud5a5\uc744 \ub0b4\ub294 \ubd84\uc790\uc600\uc5b4\uc694. \uc0c8\ub85c\uc6b4 \uad6c\ub974\ub9dd\uc740 \uc644\uc804\ud788 \ub2e4\ub978 \ubd84\uc790 \ud314\ub808\ud2b8\ub97c \uc368\uc694. <mark>\ud53c\ub77c\uc9c4, \ub77d\ud1a4, L-\ud14c\uc544\ub2cc\uc774 \u201c\ubbf8\uc2dd\uac00\uc758 \ucf54\u201d\ub97c \ub9cc\uc871\uc2dc\ud0a4\ub294 \uc138 \uae30\ub465\uc774\uc5d0\uc694</mark>."
          }
        },
        {
          type: "callout",
          icon: "\ud83d\udd25",
          title: { en: "Pyrazines \u2014 the science of \u201croasted\u201d", ko: "\ud53c\ub77c\uc9c4 \u2014 \ubcf6\uc740 \ud5a5\uc758 \uc815\uccb4" },
          text: {
            en: "Pyrazines are products of the Maillard reaction \u2014 what happens when amino acids and sugars meet high heat. They're responsible for the toasted aroma of roasted coffee, sesame seeds, and fresh bread. Pistachio's explosive popularity traces back to pyrazines too: 2-acetylpyrazine in roasted pistachios creates that characteristic \"warm nuttiness\" perfumers are chasing.",
            ko: "\ud53c\ub77c\uc9c4(pyrazine)\uc740 \uc544\ubbf8\ub178\uc0b0\uacfc \ub2f9\uc774 \uace0\uc628\uc5d0\uc11c \ub9cc\ub098\ub294 \ub9c8\uc774\uc57c\ub974 \ubc18\uc751(Maillard reaction)\uc758 \uc0b0\ubb3c\uc774\uc5d0\uc694. \ubcf6\uc740 \ucee4\ud53c, \ubcf6\uc740 \ucc38\uae68, \uad6c\uc6b4 \ube75\uc5d0\uc11c \ub098\ub294 \uadf8 \uace0\uc18c\ud55c \ud5a5\uc758 \ud575\uc2ec \ubd84\uc790\uc785\ub2c8\ub2e4. \ud53c\uc2a4\ud0c0\uce58\uc624 \ud5a5\uc758 \ud3ed\ubc1c\uc801 \uc778\uae30\ub3c4 \ud53c\ub77c\uc9c4 \ub355\ubd84\uc774\uc5d0\uc694 \u2014 \ubcf6\uc740 \ud53c\uc2a4\ud0c0\uce58\uc624\uc758 2-\uc544\uc138\ud2f8\ud53c\ub77c\uc9c4\uc774 \u201c\ub530\ub73b\ud55c \uace0\uc18c\ud568\u201d\uc744 \ub9cc\ub4e4\uac70\ub4e0\uc694."
          },
          borderColor: "rgba(245,215,110,0.4)",
          bgColor: "rgba(245,215,110,0.08)"
        },
        {
          type: "callout",
          icon: "\ud83c\udf75",
          title: { en: "L-theanine \u2014 matcha's bitter-sweet depth", ko: "L-\ud14c\uc544\ub2cc \u2014 \ub9d0\ucc28\uc758 \uc4f4\ub9db\uacfc \uae4a\uc774" },
          text: {
            en: "L-theanine is the amino acid behind matcha's characteristic umami and bitter-sweet taste. What's fascinating: L-theanine increases alpha brain waves, producing a calming effect. This helps explain why matcha fragrances feel \"serenely comforting\" \u2014 there's a molecular logic to it. In perfumery, it's paired with coumarin to create a dry, hay-like bitter sweetness.",
            ko: "L-\ud14c\uc544\ub2cc(L-theanine)\uc740 \ub9d0\ucc28 \ud2b9\uc720\uc758 \uac10\uce60\ub9db\uacfc \uc4f4\ub9db\uc744 \ub9cc\ub4dc\ub294 \uc544\ubbf8\ub178\uc0b0\uc774\uc5d0\uc694. \ud765\ubbf8\ub85c\uc6b4 \uac74 L-\ud14c\uc544\ub2cc\uc774 \ub1cc\uc758 \uc54c\ud30c\ud30c\ub97c \uc99d\uac00\uc2dc\ucf1c \uc774\uc644 \ud6a8\uacfc\ub97c \ub0b8\ub2e4\ub294 \uc810\uc774\uc5d0\uc694. \ub9d0\ucc28 \ud5a5\uc218\uac00 \u201c\ucc28\ubd84\ud55c \ud3b8\uc548\ud568\u201d\uc744 \uc8fc\ub294 \uc774\uc720\uac00 \ubd84\uc790 \uc218\uc900\uc5d0\uc11c \uc124\uba85\ub429\ub2c8\ub2e4. \ud5a5\uc218\uc5d0\uc11c\ub294 \ucfe0\ub9c8\ub9b0(coumarin)\uacfc \uc870\ud569\ud574 \uac74\ucd08 \uac19\uc740 \uc4f4 \ub2e8\ub9db\uc744 \uc5f0\ucd9c\ud574\uc694."
          },
          borderColor: "rgba(45,90,61,0.2)",
          bgColor: "rgba(45,90,61,0.04)"
        },
        {
          type: "callout",
          icon: "\ud83e\udd5c",
          title: { en: "Lactones \u2014 the creamy texture secret", ko: "\ub77d\ud1a4 \u2014 \ud06c\ub9ac\ubbf8\ud55c \uc9c8\uac10\uc758 \ube44\ubc00" },
          text: {
            en: "Lactones are cyclic ester molecules \u2014 the reason your nose reads certain scents as \"creamy.\" Gamma-decalactone (peach) and delta-decalactone (buttery coconut) are the most common. In the new gourmand, lactones serve as the soft cushion around sharp roasted notes \u2014 they're why pistachio and sesame fragrances feel \"nutty yet smooth\" rather than harsh.",
            ko: "\ub77d\ud1a4(lactone)\uc740 \uace0\ub9ac\ud615 \uc5d0\uc2a4\ud14c\ub974 \ubd84\uc790\ub85c, \ud53c\ubd80\uac00 \u201c\ud06c\ub9ac\ubbf8\ud558\ub2e4\u201d\uace0 \ub290\ub07c\ub294 \ud5a5\uc758 \uc815\uccb4\uc608\uc694. \uac10\ub9c8\ub370\uce74\ub77d\ud1a4(\ubcf5\uc22d\uc544), \ub378\ud0c0\ub370\uce74\ub77d\ud1a4(\ucf54\ucf54\ub11b \ubc84\ud130) \ub4f1\uc774 \ub300\ud45c\uc801\uc774\uc5d0\uc694. \uc0c8\ub85c\uc6b4 \uad6c\ub974\ub9dd\uc5d0\uc11c \ub77d\ud1a4\uc740 \ud53c\ub77c\uc9c4\uc758 \ub0a0\uce74\ub85c\uc6b4 \ubcf6\uc740 \ud5a5\uc744 \ubd80\ub4dc\ub7fd\uac8c \uac10\uc2f8\ub294 \uc5ed\ud560\uc744 \ud574\uc694 \u2014 \ud53c\uc2a4\ud0c0\uce58\uc624\ub098 \ucc38\uae68 \ud5a5\uc218\uc5d0\uc11c \u201c\uace0\uc18c\ud558\uba74\uc11c\ub3c4 \ubd80\ub4dc\ub7ec\uc6b4\u201d \ub290\ub08c\uc758 \ud575\uc2ec\uc774\uc5d0\uc694."
          },
          borderColor: "rgba(245,215,110,0.4)",
          bgColor: "rgba(245,215,110,0.08)"
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "Why do toasted scents feel more comforting than sweet ones?",
        ko: "\uc65c \uace0\uc18c\ud55c \ud5a5\uc774 \ub2ec\ucf64\ud55c \ud5a5\ubcf4\ub2e4 \ub354 \ud3b8\uc548\ud558\uac8c \ub290\uaef4\uc9c8\uae4c\uc694?"
      },
      children: [
        {
          type: "body",
          text: {
            en: "There\u2019s a neuroscience explanation. <strong>Vanillin</strong>-type sweet scents stimulate the brain\u2019s reward circuit (the ventral tegmental area) \u2014 instant pleasure, but quick olfactory fatigue. <strong>Pyrazines</strong> and roasted aromas, by contrast, activate memory pathways connected to the hippocampus. <mark>The reason toasted bread reminds you of childhood mornings is the power of olfactory memory</mark> \u2014 scent is the only sense that routes directly to the limbic system without passing through the thalamus. This is the psychological reason gourmand moved from \u201ccandy\u201d to \u201ctoast.\u201d Pyrazines produce a less immediate but deeper, longer-lasting emotional response than vanillin. The fragrance industry has started calling this \u201ccomfort depth.\u201d",
            ko: "\uc5ec\uae30\uc5d0\ub294 \uc2e0\uacbd\uacfc\ud559\uc801 \uc774\uc720\uac00 \uc788\uc5b4\uc694. <strong>\ubc14\ub2d0\ub9b0</strong>\ucc98\ub7fc \ub2ec\ucf64\ud55c \ud5a5\uc740 \ub1cc\uc758 \ubcf4\uc0c1 \ud68c\ub85c(\ubcf5\uce21 \ud53c\uac1c \uc601\uc5ed)\ub97c \uc790\uadf9\ud574\uc694 \u2014 \uc989\uac01\uc801\uc778 \ucf8c\uac10\uc774\uc9c0\ub9cc \ube60\ub974\uac8c \ud6c4\uac01 \ud53c\ub85c\ub97c \uc77c\uc73c\ud0a4\uc8e0. \ubc18\uba74 <strong>\ud53c\ub77c\uc9c4</strong> \uac19\uc740 \ubcf6\uc740 \ud5a5\uc740 \ud574\ub9c8(\ud574\ub9c8\uccb4, hippocampus)\uc640 \uc5f0\uacb0\ub41c \uae30\uc5b5 \uacbd\ub85c\ub97c \ud65c\uc131\ud654\ud574\uc694. <mark>\ubcf6\uc740 \ube75 \ub0c4\uc0c8\uac00 \u201c\uc5b4\ub9b0 \uc2dc\uc808 \uc544\uce68\u201d\uc744 \ub5a0\uc62c\ub9ac\uac8c \ud558\ub294 \uac74 \ud6c4\uac01 \uae30\uc5b5\uc758 \ud798\uc774\uc5d0\uc694</mark>. \uc774\uac83\uc774 \uad6c\ub974\ub9dd\uc774 \u201c\uce94\ub514\u201d\uc5d0\uc11c \u201c\ud1a0\uc2a4\ud2b8\u201d\ub85c \uc774\ub3d9\ud55c \uc2ec\ub9ac\uc801 \uc774\uc720\uc785\ub2c8\ub2e4. \ud53c\ub77c\uc9c4\uc740 \ubc14\ub2d0\ub9b0\ubcf4\ub2e4 \ub35c \uc989\uac01\uc801\uc774\uc9c0\ub9cc \ub354 \uae4a\uace0 \uc624\ub798\uac00\ub294 \uc815\uc11c\uc801 \ubc18\uc751\uc744 \ub9cc\ub4e4\uc5b4\uc694. \ud5a5\uc218 \uc5c5\uacc4\uc5d0\uc11c \uc774\uac78 \u201c\ud3b8\uc548\ud568\uc758 \uae4a\uc774(comfort depth)\u201d\ub77c\uace0 \ubd80\ub974\uae30 \uc2dc\uc791\ud588\uc5b4\uc694."
          }
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "The three pillars of 2026 gourmand: matcha, pistachio, roasted sesame",
        ko: "2026\ub144 \uad6c\ub974\ub9dd\uc758 \uc138 \uae30\ub465: \ub9d0\ucc28, \ud53c\uc2a4\ud0c0\uce58\uc624, \ubcf6\uc740 \ucc38\uae68"
      },
      children: [
        {
          type: "grid",
          minWidth: "280px",
          gap: 22,
          items: [
            { title: { en: "\ud83c\udf75 Matcha \u2014 2026's flagship gourmand note", ko: "\ud83c\udf75 \ub9d0\ucc28 \u2014 2026\ub144\uc758 \ub300\ud45c \uad6c\ub974\ub9dd \ub178\ud2b8" }, body: { en: "Matcha combines bitter, umami, and green in one complex note. L-theanine's calm bitterness meets coumarin's hay-like sweetness and a touch of creamy lactones. Maison Margiela's Matcha Meditation opened this category to mainstream audiences, and niche houses are following fast.", ko: "\ub9d0\ucc28\ub294 \uc4f4\ub9db, \uac10\uce60\ub9db, \ud480 \ud5a5\uc774 \uacf5\uc874\ud558\ub294 \ubcf5\ud569\uc801 \ub178\ud2b8\uc608\uc694. L-\ud14c\uc544\ub2cc\uc758 \ucc28\ubd84\ud55c \uc4f4\ub9db\uc5d0 \ucfe0\ub9c8\ub9b0\uc758 \uac74\ucd08 \ud5a5, \uc57d\uac04\uc758 \ud06c\ub9ac\ubbf8\ud55c \ub77d\ud1a4\uc774 \ub354\ud574\uc838\uc694. Maison Margiela\uc758 Matcha Meditation\uc774 \uc774 \uce74\ud14c\uace0\ub9ac\ub97c \ub300\uc911\uc5d0\uac8c \uc5f4\uc5c8\uace0, \ub2c8\uce58 \ube0c\ub79c\ub4dc\ub4e4\uc774 \ub4a4\ub530\ub974\uace0 \uc788\uc5b4\uc694." } },
            { title: { en: "\ud83e\udd5c Pistachio \u2014 the 852% story", ko: "\ud83e\udd5c \ud53c\uc2a4\ud0c0\uce58\uc624 \u2014 852%\uc758 \ube44\ubc00" }, body: { en: "Pistachio's appeal lies in a trio: pyrazines (toasty), benzaldehyde (marzipan-like almond), and lactones (creamy). Tom Ford Lost Cherry helped popularize pistachio accords, and the Dubai chocolate viral moment amplified consumer curiosity about pistachio as a luxury flavor \u2014 and scent.", ko: "\ud53c\uc2a4\ud0c0\uce58\uc624\uc758 \ub9e4\ub825\uc740 \ud53c\ub77c\uc9c4(\uace0\uc18c\ud568) + \ubca4\uc988\uc54c\ub370\ud788\ub4dc(\ub9c8\uc9c0\ud32c \uac19\uc740 \uc544\ubaac\ub4dc \ud5a5) + \ub77d\ud1a4(\ud06c\ub9ac\ubbf8\ud568)\uc758 \uc870\ud569\uc774\uc5d0\uc694. Tom Ford Lost Cherry\uac00 \ud53c\uc2a4\ud0c0\uce58\uc624 \uc5b4\ucf54\ub4dc\ub97c \ub300\uc911\ud654\ud588\uace0, \ub450\ubc14\uc774 \ucd08\ucf5c\ub9bf \ubc14\uc774\ub7f4\uc774 \ud53c\uc2a4\ud0c0\uce58\uc624\uc5d0 \ub300\ud55c \uad00\uc2ec\uc744 \uc99d\ud3ed\uc2dc\ucf30\uc5b4\uc694." } },
            { title: { en: "\ud83e\uded8 Roasted sesame \u2014 gourmand's Asian frontier", ko: "\ud83e\uded8 \ubcf6\uc740 \ucc38\uae28 \u2014 \uc544\uc2dc\uc544\uc5d0\uc11c \uc628 \uc0c8 \uad6c\ub974\ub9dd" }, body: { en: "When sesame seeds are roasted, sesamolin breaks down into intensely aromatic molecules like 2-furylmethanethiol. Inspired by Korean and Japanese sesame oil traditions, this note is being called \"the boldest gourmand experiment\" in Western niche perfumery.", ko: "\ucc38\uae68\ub97c \ubcf6\uc73c\uba74 \uc138\uc0ac\ubab0\ub9b0\uc774 \ubd84\ud574\ub418\uba74\uc11c 2-\ud4e8\ub9b4\uba54\ud0c4\ud2f0\uc62c \ub4f1 \uac15\ub82c\ud55c \ud5a5 \ubd84\uc790\uac00 \uc0dd\uacbc\uc5b4\uc694. \ud55c\uad6d\uacfc \uc77c\ubcf8\uc758 \ucc38\uae30\ub984 \ubb38\ud654\uc5d0\uc11c \uc601\uac10\ubc1b\uc740 \uc774 \ub178\ud2b8\ub294 \uc11c\uc591 \ub2c8\uce58 \ud5a5\uc218\uacc4\uc5d0\uc11c \u201c\uac00\uc7a5 \ub300\ub2f4\ud55c \uad6c\ub974\ub9dd \uc2e4\ud5d8\u201d\uc73c\ub85c \uc8fc\ubaa9\ubc1b\uace0 \uc788\uc5b4\uc694." } }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "Where gourmand goes from here",
        ko: "\uad6c\ub974\ub9dd\uc758 \ubbf8\ub798 \u2014 \uc5b4\ub514\uae4c\uc9c0 \uac08\uae4c\uc694?"
      },
      children: [
        {
          type: "body",
          text: {
            en: "Industry insiders point to <strong>fermented</strong> notes as the next gourmand frontier. Doenjang (Korean fermented soybean paste), miso, kombucha-inspired accords \u2014 still experimental, but after savory gourmand\u2019s proven success, <mark>the complex umami of fermentation is a plausible next step</mark>. Gourmand\u2019s evolution ultimately mirrors our palates. The generation choosing natural wine over sugary cocktails and croissants over cake wants the same sophistication in fragrance. The definition of \u201csmelling delicious\u201d itself is changing.",
            ko: "\uc5c5\uacc4 \uad00\uacc4\uc790\ub4e4\uc740 \ub2e4\uc74c \uad6c\ub974\ub9dd \ud2b8\ub80c\ub4dc\ub85c <strong>\ubc1c\ud6a8(fermented)</strong> \ub178\ud2b8\ub97c \uc9c0\ubaa9\ud574\uc694. \ub41c\uc7a5, \ubbf8\uc18c, \ucf64\ubd80\ucc28\uc5d0\uc11c \uc601\uac10\uc744 \ubc1b\uc740 \ud5a5 \u2014 \uc544\uc9c1 \uc2e4\ud5d8 \ub2e8\uacc4\uc9c0\ub9cc, \uace0\uc18c\ud55c \uad6c\ub974\ub9dd\uc774 \uc131\uacf5\ud55c \ub4a4\ub77c\uba74 <mark>\ubc1c\ud6a8\uc758 \ubcf5\uc7a1\ud55c \uac10\uce60\ub9db\uc774 \ub2e4\uc74c \ud504\ub7f0\ud2f0\uc5b4\uac00 \ub420 \uac00\ub2a5\uc131\uc740 \ucda9\ubd84\ud574\uc694</mark>. \uad6c\ub974\ub9dd \ud5a5\uc218\uc758 \uc9c4\ud654\ub294 \uacb0\uad6d \uc6b0\ub9ac \ubbf8\uac01\uc758 \uc9c4\ud654\ub97c \ubc18\uc601\ud569\ub2c8\ub2e4. \uc124\ud0d5\ubb3c \ub300\uc2e0 \ub0b4\ucd94\ub7f4 \uc640\uc778\uc744, \ucf00\uc774\ud06c \ub300\uc2e0 \ud06c\ub8e8\uc544\uc0c1\uc744 \uc120\ud0dd\ud558\ub294 \uc138\ub300\uac00 \ud5a5\uc218\uc5d0\uc11c\ub3c4 \uac19\uc740 \uc815\uad50\ud568\uc744 \uc6d0\ud558\ub294 \uac70\uc608\uc694. \u201c\ub9db\uc788\ub294 \ub0c4\uc0c8\u201d\uc758 \uc815\uc758 \uc790\uccb4\uac00 \ubc14\ub00c\uace0 \uc788\uc2b5\ub2c8\ub2e4."
          }
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\u2728 Products worth trying",
        ko: "\u2728 \ucd94\ucc9c \uc81c\ud488"
      },
      children: [
        {
          type: "prodCards",
          cards: [
            { brand: "Maison Margiela", name: "Matcha Meditation (Replica)", note: { en: "Bitter matcha meets creamy milk in a meditative blend. The textbook for 'grown-up gourmand' \u2014 comforting without being sweet.", ko: "\ub9d0\ucc28\uc758 \uc4f4\ub9db\uacfc \ud06c\ub9ac\ubbf8\ud55c \uc6b0\uc720\uac00 \ub9cc\ub098\ub294 \uba85\uc0c1\uc801\uc778 \ud5a5\uc774\uc5d0\uc694. \uad6c\ub974\ub9dd\uc778\ub370 \ub2ec\uc9c0 \uc54a\uc740, '\uc5b4\ub978 \uad6c\ub974\ub9dd'\uc758 \uad50\uacfc\uc11c\uc608\uc694." }, accentColor: "var(--sage)" },
            { brand: "Tom Ford", name: "Lost Cherry", note: { en: "Cherry and pistachio accord in a gourmand framework. The nutty lactones of pistachio balance cherry's sweetness \u2014 savory-sweet done right.", ko: "\uccb4\ub9ac\uc640 \ud53c\uc2a4\ud0c0\uce58\uc624 \uc5b4\ucf54\ub4dc\uac00 \uc870\ud569\ub41c \uad6c\ub974\ub9dd\uc774\uc5d0\uc694. \ud53c\uc2a4\ud0c0\uce58\uc624\uc758 \uace0\uc18c\ud55c \ub77d\ud1a4\uc774 \uccb4\ub9ac\uc758 \ub2ec\ucf64\ud568\uc744 \uc7a1\uc544\uc918\uc694." }, accentColor: "var(--sage)" },
            { brand: "D.S. & Durga", name: "Pistachio", note: { en: "A bold solinote fragrance built around roasted pistachio. The pyrazine-driven nuttiness is uncompromising \u2014 a niche masterpiece for the culinary-minded nose.", ko: "\ubcf6\uc740 \ud53c\uc2a4\ud0c0\uce58\uc624\ub97c \uc911\uc2ec\uc73c\ub85c \ud55c \ub300\ub2f4\ud55c \uc194\ub9ac\ub178\ud2b8 \ud5a5\uc218. \ud53c\ub77c\uc9c4\uc758 \uace0\uc18c\ud568\uc774 \uadf8\ub300\ub85c \uc0b4\uc544\uc788\ub294 \ub2c8\uce58 \uac78\uc791\uc774\uc5d0\uc694." }, accentColor: "var(--sage)" }
          ]
        }
      ]
    }
  ],

  // ─── 7. Sleep Wellness Snacks ───
  'korea-sleep-wellness-snacks': [
    {
      type: "tldr",
      icon: "\ud83d\udccb",
      text: {
        en: "<strong>TL;DR:</strong> Korea\u2019s sleep health food sales surged 300% year-over-year. The driver isn\u2019t new ingredients \u2014 it\u2019s new formats. GABA, magnesium, and plant-based melatonin repackaged as gummies, jellies, and flavored sticks blur the line between snack and supplement. Korea\u2019s \u201chealthy pleasure\u201d trend just created a new category.",
        ko: "<strong>\uc694\uc57d:</strong> \ud55c\uad6d \uc218\uba74 \uac74\uac15\uae30\ub2a5\uc2dd\ud488 \ub9e4\ucd9c\uc774 \uc804\ub144 \ub300\ube44 300% \uae09\uc99d\ud588\uc5b4\uc694. \ud575\uc2ec\uc740 \ud615\ud0dc\uc758 \ubcc0\ud654 \u2014 GABA, \ub9c8\uadf8\ub124\uc298, \uc2dd\ubb3c\uc131 \uba5c\ub77c\ud1a0\ub2cc\uc744 \uad6c\ubbf8, \uc824\ub9ac, \ub9db\uc788\ub294 \uc2a4\ud2f1 \ud615\ud0dc\ub85c \ub9cc\ub4e4\uc5b4 \u201c\uba39\ub294 \uc990\uac70\uc6c0\u201d\uacfc \u201c\uac74\uac15 \uad00\ub9ac\u201d\ub97c \ub3d9\uc2dc\uc5d0 \uc7a1\ub294 \uc804\ub7b5\uc774\uc5d0\uc694. \ud55c\uad6d\uc758 \u201c\ud5ec\uc2dc\ud50c\ub808\uc800\u201d \ud2b8\ub80c\ub4dc\uac00 \ub9cc\ub4e0 \uc0c8\ub85c\uc6b4 \uce74\ud14c\uace0\ub9ac\uc785\ub2c8\ub2e4."
      }
    },
    {
      type: "figure",
      src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200",
      alt: "Colorful wellness gummies and supplements arranged on a clean surface"
    },
    {
      type: "section",
      heading: {
        en: "Why are sleep snacks suddenly everywhere?",
        ko: "\uc65c \uac11\uc790\uae30 \uc218\uba74 \uac04\uc2dd\uc774 \ud3ed\ubc1c\ud588\uc744\uae4c\uc694?"
      },
      children: [
        {
          type: "body",
          text: {
            en: "The fastest-growing category in Korean health functional foods is sleep. Korea\u2019s Ministry of Food and Drug Safety data shows explosive growth in sleep-related supplements, and Olive Young reported <strong>300% year-over-year sales growth</strong> in its sleep category. But the ingredients didn\u2019t change. <mark>The format did \u2014 from pills to snacks</mark>.",
            ko: "\ud55c\uad6d \uac74\uac15\uae30\ub2a5\uc2dd\ud488 \uc2dc\uc7a5\uc5d0\uc11c \uac00\uc7a5 \ube60\ub974\uac8c \uc131\uc7a5\ud558\ub294 \uce74\ud14c\uace0\ub9ac\ub294 \u201c\uc218\uba74\u201d\uc774\uc5d0\uc694. \uc2dd\ud488\uc758\uc57d\ud488\uc548\uc804\ucc98\uc5d0 \ub530\ub974\uba74 \uc218\uba74 \uad00\ub828 \uac74\uac15\uae30\ub2a5\uc2dd\ud488 \uc2dc\uc7a5\uc774 \ucd5c\uadfc \uc218\ub144\uac04 \ud3ed\ubc1c\uc801\uc73c\ub85c \uc131\uc7a5\ud588\uace0, \uc62c\ub9ac\ube0c\uc601\uc740 \uc218\uba74 \uce74\ud14c\uace0\ub9ac \ub9e4\ucd9c\uc774 <strong>\uc804\ub144 \ub300\ube44 300% \uc99d\uac00</strong>\ud588\ub2e4\uace0 \ubc1c\ud45c\ud588\uc5b4\uc694. \uadf8\ub7f0\ub370 \uc131\ubd84\uc774 \ubc14\ub010 \uac8c \uc544\ub2c8\uc5d0\uc694. <mark>\ud615\ud0dc\uac00 \ubc14\ub010 \uac70\uc608\uc694 \u2014 \uc54c\uc57d\uc5d0\uc11c \uac04\uc2dd\uc73c\ub85c</mark>."
          }
        },
        {
          type: "statCards",
          cards: [
            { title: { en: "+300%", ko: "+300%" }, desc: { en: "Olive Young sleep supplement sales growth year-over-year", ko: "\uc62c\ub9ac\ube0c\uc601 \uc218\uba74 \uac74\uac15\uc2dd\ud488 \ub9e4\ucd9c \uc804\ub144 \ub300\ube44 \uc99d\uac00\uc728" } },
            { title: { en: "\u20a911 trillion", ko: "\u20a911\uc870" }, desc: { en: "Korea's total sleep market size (all sleep products and services)", ko: "\ud55c\uad6d \uc804\uccb4 \uc218\uba74 \uc2dc\uc7a5 \uaddc\ubaa8 (\uc218\uba74 \uc0b0\uc5c5 \uc804\uccb4 \ud3ec\ud568)" } },
            { title: { en: "1.35M", ko: "135\ub9cc \uba85" }, desc: { en: "Diagnosed sleep disorder patients in Korea", ko: "\ud55c\uad6d\uc758 \uc218\uba74 \uc7a5\uc560 \uc9c4\ub2e8 \ud658\uc790 \uc218" } }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "What is \u201cHealthy Pleasure\u201d?",
        ko: "\u201c\ud5ec\uc2dc\ud50c\ub808\uc800\u201d\uac00 \ubb58\uac00\uc694?"
      },
      children: [
        {
          type: "body",
          text: {
            en: "<strong>Healthy Pleasure (\ud5ec\uc2dc\ud50c\ub808\uc800)</strong> is the defining consumer philosophy of Korea\u2019s 2024-2026 wellness market. It reframes health management from \u201cendure it\u201d to \u201cenjoy it.\u201d For Korea\u2019s MZ generation (Millennials + Gen Z), supplements shouldn\u2019t feel like medicine. They should be <mark>pretty, tasty snacks worth posting on Instagram</mark>.",
            ko: "<strong>\ud5ec\uc2dc\ud50c\ub808\uc800(Healthy Pleasure)</strong>\ub294 2024~2026\ub144 \ud55c\uad6d \uc6f0\ub2c8\uc2a4 \uc2dc\uc7a5\uc744 \uad00\ud1b5\ud558\ub294 \ud575\uc2ec \ud2b8\ub80c\ub4dc\uc608\uc694. \uac74\uac15 \uad00\ub9ac\ub97c \u201c\ucc38\uace0 \ud558\ub294 \uac83\u201d\uc774 \uc544\ub2c8\ub77c \u201c\uc990\uae30\uba74\uc11c \ud558\ub294 \uac83\u201d\uc73c\ub85c \uc7ac\uc815\uc758\ud558\ub294 \uc18c\ube44 \ucca0\ud559\uc774\uc8e0. MZ\uc138\ub300(\ubc00\ub808\ub2c8\uc5bc+Z\uc138\ub300)\uc5d0\uac8c \uac74\uac15\uc2dd\ud488\uc740 \ub9db\uc5c6\ub294 \uc54c\uc57d\uc774 \uc544\ub2c8\ub77c <mark>SNS\uc5d0 \uc62c\ub9ac\uace0 \uc2f6\uc740 \uc608\uc058\uace0 \ub9db\uc788\ub294 \uac04\uc2dd</mark>\uc774\uc5b4\uc57c \ud574\uc694."
          }
        },
        {
          type: "callout",
          icon: "\ud83c\udf6c",
          title: { en: "The rise of gummy format", ko: "\uad6c\ubbf8(Gummy) \ud615\ud0dc\uc758 \ubd80\uc0c1" },
          text: {
            en: "Instead of traditional pills or capsules, gummy-format supplements are exploding among Korea's MZ generation. No psychological burden of \"taking medicine\" \u2014 it feels like eating candy. Olive Young's gummy category has the highest growth rate among all health food formats.",
            ko: "\uc804\ud1b5\uc801\uc778 \uc54c\uc57d\uc774\ub098 \uce21\uc220 \ub300\uc2e0 \uad6c\ubbf8\uc824\ub9ac \ud615\ud0dc\uc758 \uac74\uac15\uae30\ub2a5\uc2dd\ud488\uc774 MZ\uc138\ub300 \uc0ac\uc774\uc5d0\uc11c \ud3ed\ubc1c\uc801\uc73c\ub85c \uc131\uc7a5\ud558\uace0 \uc788\uc5b4\uc694. \u201c\uc57d\uc744 \uba39\ub294\ub2e4\u201d\ub294 \uc2ec\ub9ac\uc801 \ubd80\ub2f4 \uc5c6\uc774 \uac04\uc2dd\ucc98\ub7fc \uc990\uae38 \uc218 \uc788\uae30 \ub54c\ubb38\uc774\uc5d0\uc694. \uc62c\ub9ac\ube0c\uc601\uc758 \uad6c\ubbf8 \uce74\ud14c\uace0\ub9ac\ub294 \uc804\uccb4 \uac74\uac15\uc2dd\ud488 \uc911 \uac00\uc7a5 \ub192\uc740 \uc131\uc7a5\ub960\uc744 \uae30\ub85d\ud588\uc2b5\ub2c8\ub2e4."
          },
          borderColor: "rgba(245,215,110,0.4)",
          bgColor: "rgba(245,215,110,0.08)"
        },
        {
          type: "callout",
          icon: "\ud83d\udce6",
          title: { en: "Sticks + jellies = portability", ko: "\uc2a4\ud2f1\ud615 + \uc824\ub9ac\ud615 = \ud734\ub300\uc131" },
          text: {
            en: "Individually wrapped sticks and jellies fit in a bag. You can eat them in bed before sleep, on the subway after overtime, or while traveling \u2014 no water needed. \"Convenience\" has become the top purchase criterion for MZ generation health foods.",
            ko: "1\ud68c\ubd84\uc529 \uac1c\ubcc4 \ud3ec\uc7a5\ub41c \uc2a4\ud2f1\uc774\ub098 \uc824\ub9ac\ub294 \uac00\ubc29\uc5d0 \ub123\uace0 \ub2e4\ub2c8\uae30 \uc88b\uc544\uc694. \uc790\uae30 \uc804 \uce68\ub300\uc5d0\uc11c, \uc57c\uadfc \ud6c4 \ud1f4\uadfc\uae38\uc5d0, \uc5ec\ud589 \uc911\uc5d0\ub3c4 \ubb3c \uc5c6\uc774 \ubc14\ub85c \uba39\uc744 \uc218 \uc788\ub294 \ud615\ud0dc\uc608\uc694. \u201c\ud3b8\uc758\uc131\u201d\uc774 MZ\uc138\ub300 \uac74\uac15\uc2dd\ud488 \uad6c\ub9e4\uc758 \ucd5c\uc6b0\uc120 \uae30\uc900\uc774 \ub410\uc2b5\ub2c8\ub2e4."
          },
          borderColor: "rgba(107,142,107,0.25)",
          bgColor: "rgba(107,142,107,0.06)"
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "The science inside sleep snacks",
        ko: "\uc218\uba74 \uac04\uc2dd \uc18d \ud575\uc2ec \uc131\ubd84\ub4e4"
      },
      children: [
        {
          type: "body",
          text: {
            en: "The format is a snack, but the ingredients are real. Korea\u2019s MFDS (Ministry of Food and Drug Safety) has approved specific ingredients for sleep health functionality claims. <mark>The core four: GABA, L-theanine, plant-based melatonin, and magnesium</mark>.",
            ko: "\ud615\ud0dc\ub294 \uac04\uc2dd\uc774\uc9c0\ub9cc \uc548\uc5d0 \ub4e0 \uc131\ubd84\uc740 \uc9c4\uc9dc\uc608\uc694. \ud55c\uad6d \uc2dd\ud488\uc758\uc57d\ud488\uc548\uc804\ucc98\uac00 \uc218\uba74 \uac74\uac15\uc5d0 \ub300\ud55c \uae30\ub2a5\uc131\uc744 \uc778\uc815\ud55c \uc6d0\ub8cc\ub4e4\uc774 \uc8fc\ub85c \uc0ac\uc6a9\ub429\ub2c8\ub2e4. <mark>\ud575\uc2ec\uc740 GABA, L-\ud14c\uc544\ub2cc, \uc2dd\ubb3c\uc131 \uba5c\ub77c\ud1a0\ub2cc, \ub9c8\uadf8\ub124\uc298 \ub124 \uac00\uc9c0</mark>\uc608\uc694."
          }
        },
        {
          type: "grid",
          minWidth: "280px",
          gap: 22,
          items: [
            { title: { en: "GABA (Gamma-Aminobutyric Acid)", ko: "GABA (\uac10\ub9c8\uc544\ubbf8\ub178\ubdf0\ud2f0\ub974\uc0b0)" }, body: { en: "An inhibitory neurotransmitter that calms brain excitability. Clinical studies show oral GABA reduces sleep latency (time to fall asleep) and improves NREM sleep quality. Korean products typically contain 100-300mg per serving.", ko: "\ub1cc\uc758 \ud765\ubd84\uc744 \uac00\ub77c\uc55e\ud788\ub294 \uc5b5\uc81c\uc131 \uc2e0\uacbd\uc804\ub2ec\ubb3c\uc9c8\uc774\uc5d0\uc694. \uacbd\uad6c \ubcf5\uc6a9 \uc2dc \uc218\uba74 \uc7a0\ubcf5\uae30(\uc7a0\ub4e4\uae30\uae4c\uc9c0 \uac78\ub9ac\ub294 \uc2dc\uac04)\ub97c \uc904\uc774\uace0 \ube44\ub818(\uBE44\ub808\uBA54, NREM) \uc218\uba74\uc758 \uc9c8\uc744 \ub192\uc778\ub2e4\ub294 \uc784\uc0c1 \uc5f0\uad6c\uac00 \uc788\uc5b4\uc694. \ud55c\uad6d\uc5d0\uc11c\ub294 100~300mg\uc774 \uc77c\ubc18\uc801 \uc6a9\ub7c9\uc774\uc5d0\uc694." } },
            { title: { en: "L-Theanine", ko: "L-\ud14c\uc544\ub2cc (L-Theanine)" }, body: { en: "An amino acid found in green tea that increases alpha brain waves, promoting relaxation without drowsiness. Often combined with GABA for synergistic effects. It improves sleep quality without next-day grogginess.", ko: "\ub179\ucc28\uc5d0\uc11c \ubc1c\uacac\ub418\ub294 \uc544\ubbf8\ub178\uc0b0\uc73c\ub85c, \ub1cc\ud30c \uc911 \uc54c\ud30c\ud30c\ub97c \uc99d\uac00\uc2dc\ucf1c \uc774\uc644\uc744 \uc720\ub3c4\ud574\uc694. \uc320\ub9bc\uc744 \uc720\ubc1c\ud558\uc9c0 \uc54a\uc73c\uba74\uc11c \uc218\uba74\uc758 \uc9c8\uc744 \uac1c\uc120\ud558\ub294 \uac8c \ud2b9\uc9d5\uc774\uc5d0\uc694. GABA\uc640 \ud568\uaed8 \ubcf5\ud569 \ubc30\ud569\ub418\ub294 \uacbd\uc6b0\uac00 \ub9ce\uc2b5\ub2c8\ub2e4." } },
            { title: { en: "Plant-based Melatonin", ko: "\uc2dd\ubb3c\uc131 \uba5c\ub77c\ud1a0\ub2cc" }, body: { en: "Synthetic melatonin is classified as medicine in Korea and cannot be used in health foods. Natural melatonin extracted from pistachios, tart cherries, or rice germ is the legal alternative. Products contain 0.3-1mg per serving.", ko: "\ud55c\uad6d\uc5d0\uc11c \ud569\uc131 \uba5c\ub77c\ud1a0\ub2cc\uc740 \uc758\uc57d\ud488\uc774\ub77c \uac74\uac15\uae30\ub2a5\uc2dd\ud488\uc5d0 \uc0ac\uc6a9 \ubd88\uac00\ud574\uc694. \ub300\uc548\uc73c\ub85c \ud53c\uc2a4\ud0c0\uce58\uc624, \ud0c0\ub974\ud2b8 \uccb4\ub9ac, \uc300\ub208 \ub4f1\uc5d0\uc11c \ucd94\ucd9c\ud55c \ucc9c\uc5f0 \uba5c\ub77c\ud1a0\ub2cc\uc774 \uac01\uad11\ubc1b\uace0 \uc788\uc5b4\uc694. 0.3~1mg \uc218\uc900\uc73c\ub85c \ud568\uc720\ub429\ub2c8\ub2e4." } },
            { title: { en: "Magnesium", ko: "\ub9c8\uadf8\ub124\uc298 (Magnesium)" }, body: { en: "A mineral that activates GABA receptors and regulates cortisol (the stress hormone). Aids both sleep onset and muscle relaxation. The \"magnesium before bed\" routine has gone viral on Korean social media.", ko: "GABA \uc218\uc6a9\uccb4 \ud65c\uc131\ud654\ub97c \ub3d5\uace0 \ucf54\ub974\ud2f0\uc194(\uc2a4\ud2b8\ub808\uc2a4 \ud638\ub974\ubaac)\uc744 \uc870\uc808\ud558\ub294 \ubbf8\ub124\ub784\uc774\uc5d0\uc694. \uc218\uba74 \ubfd0 \uc544\ub2c8\ub77c \uadfc\uc774\uc644\uc5d0\ub3c4 \ud6a8\uacfc\uac00 \uc788\uc5b4\uc11c \u201c\uc7a0\ub4e4\uae30 \uc804 \ub9c8\uadf8\ub124\uc298\u201d \ub8e8\ud2f4\uc774 SNS\uc5d0\uc11c \uc720\ud589\ud558\uace0 \uc788\uc5b4\uc694." } }
          ]
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "How Olive Young rewrote the rules",
        ko: "\uc62c\ub9ac\ube0c\uc601\uc774 \ubc14\uafc8 \uaddc\uce59"
      },
      children: [
        {
          type: "body",
          text: {
            en: "Olive Young made a strategic choice: display sleep supplements <strong>next to the snack aisle, not the pharmacy section</strong>. Instead of the heavy \u201chealth functional food\u201d label, they use \u201csleep care\u201d \u2014 a lifestyle framing. Packaging is candy-colored and cute. <mark>The purchase decision is designed so \u201cexperience\u201d comes before \u201cefficacy\u201d</mark>.",
            ko: "\uc62c\ub9ac\ube0c\uc601\uc740 \uc218\uba74 \uac74\uac15\uc2dd\ud488\uc744 \uc57d\uad6d \ucf54\ub108\uac00 \uc544\ub2c8\ub77c <strong>\uac04\uc2dd \ucf54\ub108 \uc606\uc5d0 \uc9c4\uc5f4</strong>\ud558\ub294 \uc804\ub7b5\uc744 \ud0dd\ud588\uc5b4\uc694. \u201c\uac74\uac15\uae30\ub2a5\uc2dd\ud488\u201d\uc774\ub77c\ub294 \ubb34\uac70\uc6b4 \uce74\ud14c\uace0\ub9ac\uba85 \ub300\uc2e0 \u201c\uc2ac\ub9bd \ucf00\uc5b4\u201d\ub77c\ub294 \ub77c\uc774\ud504\uc2a4\ud0c0\uc77c \ud504\ub808\uc774\ubc0d\uc744 \uc0ac\uc6a9\ud558\uace0, \ud328\ud0a4\uc9d5\ub3c4 \uce94\ub514\ucc98\ub7fc \ucef4\ub7ec\ud480\ud558\uace0 \uadc0\uc5fd\uac8c \ub514\uc790\uc778\ub410\uc5b4\uc694. <mark>\uad6c\ub9e4 \uacb0\uc815\uc5d0\uc11c \u201c\ud6a8\ub2a5\u201d\ubcf4\ub2e4 \u201c\uacbd\ud5d8\u201d\uc774 \uba3c\uc800 \uc624\ub3c4\ub85d \uc124\uacc4\ud55c \uac70\uc608\uc694</mark>."
          }
        },
        {
          type: "body",
          text: {
            en: "CJ Olive Young\u2019s 2026 beauty trend keyword \u201cF.U.L.L.M.O.O.N\u201d centers on joyful self-care. Sleep is no longer \u201csee a doctor if you\u2019re sleep-deprived.\u201d It\u2019s \u201ca small nightly reward you give yourself.\u201d This perspective shift \u2014 from medical necessity to daily ritual \u2014 drove the 300% growth.",
            ko: "CJ \uc62c\ub9ac\ube0c\uc601\uc758 2026\ub144 \ubdf0\ud2f0 \ud2b8\ub80c\ub4dc \ud0a4\uc6cc\ub4dc \u201cF.U.L.L.M.O.O.N\u201d\uc5d0\uc11c \ud575\uc2ec\uc740 \uc990\uac70\uc6b4 \uc790\uae30\uad00\ub9ac\uc608\uc694. \uc218\uba74\uc740 \ub354 \uc774\uc0c1 \u201c\ubd80\uc871\ud558\uba74 \ubcd1\uc6d0 \uac00\ub294 \uac83\u201d\uc774 \uc544\ub2c8\ub77c \u201c\ub9e4\uc77c \ubc24 \uc2a4\uc2a4\ub85c\uc5d0\uac8c \uc8fc\ub294 \uc791\uc740 \ubcf4\uc0c1\u201d\uc774 \ub410\uc5b4\uc694. \uc774 \uad00\uc810\uc758 \uc804\ud658\uc774 300% \uc131\uc7a5\uc744 \ub9cc\ub4e4\uc5c8\uc2b5\ub2c8\ub2e4."
          }
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "Do they actually work?",
        ko: "\uc815\ub9d0 \ud6a8\uacfc\uac00 \uc788\uc744\uae4c\uc694?"
      },
      children: [
        {
          type: "body",
          text: {
            en: "Honestly \u2014 the ingredients themselves are backed by clinical research. A Japanese study (Pharma Foods International) showed 100mg GABA reduced average sleep latency by 5.3 minutes. 200mg L-theanine has been shown to improve sleep quality metrics. The caveat: whether <strong>actual bioavailability</strong> in gummy or jelly format equals capsule delivery is an area still needing more research.",
            ko: "\uc194\uc9c1\ud558\uac8c \ub9d0\ud558\uba74 \u2014 \uc131\ubd84 \uc790\uccb4\uc758 \ud6a8\ub2a5\uc740 \uc784\uc0c1 \uc5f0\uad6c\ub85c \ub4b7\ubc1b\uce68\ub3fc\uc694. GABA 100mg \ubcf5\uc6a9 \uc2dc \uc218\uba74 \uc7a0\ubcf5\uae30\uac00 \ud3c9\uade0 5.3\ubd84 \ub2e8\ucd95\ub410\ub2e4\ub294 \uc77c\ubcf8 \uc5f0\uad6c(Pharma Foods International), L-\ud14c\uc544\ub2cc 200mg\uc774 \uc218\uba74\uc758 \uc9c8 \uc9c0\ud45c\ub97c \uac1c\uc120\ud588\ub2e4\ub294 \uc5f0\uad6c \ub4f1\uc774 \uc788\uc5b4\uc694. \ub2e4\ub9cc \uad6c\ubbf8\ub098 \uc824\ub9ac \ud615\ud0dc\uc5d0\uc11c <strong>\uc2e4\uc81c \ud761\uc218\uc728</strong>\uc774 \uce21\uc220\uacfc \ub3d9\uc77c\ud55c\uc9c0\ub294 \uc544\uc9c1 \ucd94\uac00 \uc5f0\uad6c\uac00 \ud544\uc694\ud55c \uc601\uc5ed\uc774\uc5d0\uc694."
          }
        },
        {
          type: "body",
          text: {
            en: "One more important note \u2014 these products aren\u2019t treatments for sleep disorders. If you have chronic insomnia, see a specialist first. Sleep snacks occupy the space of \u201ca gentle routine aid for falling asleep\u201d \u2014 they don\u2019t replace medication.",
            ko: "\ub610 \ud558\ub098 \uc911\uc694\ud55c \uc810 \u2014 \uc774 \uc81c\ud488\ub4e4\uc740 \uc218\uba74 \uc7a5\uc560 \uce58\ub8cc\uc81c\uac00 \uc544\ub2c8\uc5d0\uc694. \ub9cc\uc131 \ubd88\uba74\uc99d\uc774\ub77c\uba74 \uc804\ubb38\uc758 \uc0c1\ub2f4\uc774 \uba3c\uc800\uc608\uc694. \uc218\uba74 \uac04\uc2dd\uc740 \u201c\uc7a0\ub4dc\ub294 \ub370 \ub3c4\uc6c0\uc744 \uc8fc\ub294 \uac00\ubcbc\uc6b4 \ub8e8\ud2f4\u201d\uc73c\ub85c \uc790\ub9ac\uc7a1\uc740 \uac70\uc9c0, \uc758\uc57d\ud488\uc744 \ub300\uccb4\ud558\ub294 \uac74 \uc544\ub2d9\ub2c8\ub2e4."
          }
        }
      ]
    },
    {
      type: "section",
      heading: {
        en: "\u2728 Products worth trying",
        ko: "\u2728 \ucd94\ucc9c \uc81c\ud488"
      },
      children: [
        {
          type: "prodCards",
          cards: [
            { brand: "GREEN MONSTER", name: "MELADAY \uad6c\ubbf8 (Plant Melatonin Gummy)", note: { en: "Tart cherry-derived plant melatonin + GABA. Olive Young sleep snack bestseller. Grape-flavored gummy format that feels like candy.", ko: "\ud0c0\ub974\ud2b8 \uccb4\ub9ac \uc720\ub798 \uc2dd\ubb3c\uc131 \uba5c\ub77c\ud1a0\ub2cc + GABA \ubc30\ud569. \uc62c\ub9ac\ube0c\uc601 \uc218\uba74 \uac04\uc2dd \ubca0\uc2a4\ud2b8\uc140\ub7ec. \ud3ec\ub3c4\ub9db \uad6c\ubbf8 \ud615\ud0dc\ub85c \uac04\uc2dd\ucc98\ub7fc \uba39\uc5b4\uc694." }, accentColor: "#a07850" },
            { brand: "LACTO-FIT", name: "\uc2ac\ub9bd\ud54f \ub9c8\uadf8\ub124\uc298 \uc824\ub9ac (SleepFit Magnesium Jelly)", note: { en: "Chong Kun Dang Health's magnesium + L-theanine jelly. Stick packaging for portability, yogurt-flavored for easy consumption.", ko: "\uc885\uadfc\ub2f9\uac74\uac15\uc758 \ub9c8\uadf8\ub124\uc298 + L-\ud14c\uc544\ub2cc \ubcf5\ud569 \uc824\ub9ac. \uc2a4\ud2f1 \ud3ec\uc7a5\uc73c\ub85c \ud734\ub300 \uac04\ud3b8\ud558\uace0, \uc694\uac70\ud2b8\ub9db\uc774\ub77c \ubd80\ub2f4 \uc5c6\uc5b4\uc694." }, accentColor: "#a07850" },
            { brand: "\uc815\uad00\uc7a5", name: "Good Night GABA Stick", note: { en: "GABA 300mg + red ginseng extract in liquid stick format. Drink directly without water. A sleep line from Korea's 120-year heritage brand.", ko: "GABA 300mg + \ud64d\uc0bc \ucd94\ucd9c\ubb3c \uc870\ud569\uc758 \uc561\uc0c1 \uc2a4\ud2f1. \ubb3c \uc5c6\uc774 \ubc14\ub85c \ub9c8\uc2dc\ub294 \ud615\ud0dc. 120\ub144 \uc804\ud1b5 \ube0c\ub79c\ub4dc\uc758 \uc218\uba74 \ub77c\uc778\uc774\uc5d0\uc694." }, accentColor: "#a07850" }
          ]
        }
      ]
    }
  ]

};

async function patchArticle(id, bodyBlocks) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/articles?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ body_blocks: bodyBlocks })
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`FAIL ${id}:`, res.status, err);
    return false;
  }
  console.log(`OK   ${id}`);
  return true;
}

async function main() {
  const ids = Object.keys(articles);
  console.log(`Patching body_blocks for ${ids.length} articles...\n`);

  let ok = 0;
  let fail = 0;
  for (const id of ids) {
    const success = await patchArticle(id, articles[id]);
    if (success) ok++; else fail++;
  }

  console.log(`\nDone: ${ok} succeeded, ${fail} failed.`);
  if (fail > 0) process.exit(1);
}

main();
