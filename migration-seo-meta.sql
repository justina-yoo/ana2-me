-- Migration: Add SEO metadata columns to articles table
-- Run via Supabase SQL Editor

ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS meta_title       TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS og_image         TEXT,
  ADD COLUMN IF NOT EXISTS og_image_alt     TEXT,
  ADD COLUMN IF NOT EXISTS seo_keywords     TEXT,
  ADD COLUMN IF NOT EXISTS word_count       INTEGER,
  ADD COLUMN IF NOT EXISTS date_published   DATE,
  ADD COLUMN IF NOT EXISTS date_modified    DATE,
  ADD COLUMN IF NOT EXISTS seo_category     TEXT;

CREATE INDEX IF NOT EXISTS idx_articles_date_published ON articles(date_published);
