/*
  # Stock Market Data Schema

  1. New Tables
    - `stocks`
      - `symbol` (text, primary key) - Stock ticker symbol
      - `name` (text) - Company name
      - `type` (text) - Asset type (stock, etf, index)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `news_sources`
      - `id` (uuid, primary key)
      - `name` (text) - Source name
      - `url` (text) - Base URL of the news source
      - `created_at` (timestamptz)
    
    - `news_articles`
      - `id` (uuid, primary key)
      - `source_id` (uuid, foreign key)
      - `stock_symbol` (text, foreign key)
      - `headline` (text)
      - `description` (text)
      - `url` (text)
      - `image_url` (text)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

-- Create stocks table
CREATE TABLE IF NOT EXISTS stocks (
  symbol text PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('stock', 'etf', 'index')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create news sources table
CREATE TABLE IF NOT EXISTS news_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create news articles table
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid REFERENCES news_sources(id) ON DELETE CASCADE,
  stock_symbol text REFERENCES stocks(symbol) ON DELETE CASCADE,
  headline text NOT NULL,
  description text,
  url text NOT NULL,
  image_url text,
  published_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to stocks"
  ON stocks FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to news sources"
  ON news_sources FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to news articles"
  ON news_articles FOR SELECT
  TO public
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_stocks_name_search ON stocks USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_news_articles_published_at ON news_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_articles_stock_symbol ON news_articles(stock_symbol);

-- Insert initial news sources
INSERT INTO news_sources (name, url) VALUES
  ('CNBC', 'https://www.cnbc.com'),
  ('Bloomberg', 'https://www.bloomberg.com'),
  ('Yahoo Finance', 'https://finance.yahoo.com'),
  ('WSJ', 'https://www.wsj.com'),
  ('Economist', 'https://www.economist.com')
ON CONFLICT (name) DO NOTHING;