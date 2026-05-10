-- =============================================
-- ana2me Supabase Schema
-- Run this in the SQL Editor (Dashboard → SQL Editor → New query)
-- =============================================

-- 1. ARTICLES TABLE
create table articles (
  id text primary key,
  category jsonb not null,       -- { "en": "...", "ko": "..." }
  title jsonb not null,          -- { "en": "...", "ko": "..." }
  excerpt jsonb not null,        -- { "en": "...", "ko": "..." }
  read_time jsonb not null,      -- { "en": "6 min read", "ko": "6분 읽기" }
  date text not null,            -- "May 6, 2026"
  tag jsonb not null,            -- { "en": "Fragrance", "ko": "향수" }
  tag_color text not null,       -- "var(--sage)" or "#a07850"
  image_url text not null,
  keywords text,
  body_blocks jsonb,             -- array of structured blocks for article body
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. PRODUCTS TABLE
create table products (
  id text primary key,
  category text not null,        -- "skincare", "fragrance", "wellness-food"
  name text not null,
  name_ko text not null,
  brand text not null,
  image_url text not null,
  summary jsonb not null,        -- { tagline, taglineKo, benefits, benefitsKo, concerns, concernsKo, usage, usageKo }
  ingredients jsonb,             -- skincare: array of { id, symbol, name, nameKo, description, descriptionKo, science, scienceKo, percentage }
  accords jsonb,                 -- skincare: array of { label, labelKo, percentage, color }
  notes jsonb,                   -- fragrance: array of { id, type, name, nameKo, icon, description, descriptionKo, science, scienceKo }
  performance jsonb,             -- fragrance: { sillage, longevity }
  fun_facts jsonb,               -- fragrance: array of { en, ko }
  bio_values jsonb,              -- wellness: array of { id, system, name, nameKo, value, description, descriptionKo, science, scienceKo }
  reviews jsonb,                 -- array of { author, date, rating, body, bodyKo }
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. RLS POLICIES — public read, no anonymous writes
alter table articles enable row level security;
alter table products enable row level security;

create policy "Anyone can read articles"
  on articles for select
  using (true);

create policy "Anyone can read products"
  on products for select
  using (true);

-- 4. INDEX for faster article queries
create index articles_date_idx on articles (date);
create index products_category_idx on products (category);
