-- ============================================================
-- Migration: Create Tech Store tables
-- ============================================================

-- ============================================================
-- BRANDS
-- ============================================================
CREATE TABLE brands (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    slug        TEXT NOT NULL UNIQUE,
    logo_url    TEXT,
    website_url TEXT,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE categories (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    slug        TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url   TEXT,
    icon        TEXT,
    sort_order  SMALLINT NOT NULL DEFAULT 0,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SUBCATEGORIES
-- ============================================================
CREATE TABLE subcategories (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL,
    description TEXT,
    image_url   TEXT,
    sort_order  SMALLINT NOT NULL DEFAULT 0,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (category_id, slug)
);

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE products (
    id                   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand_id             BIGINT NOT NULL REFERENCES brands(id),
    category_id          BIGINT NOT NULL REFERENCES categories(id),
    subcategory_id       BIGINT NOT NULL REFERENCES subcategories(id),
    name                 TEXT NOT NULL,
    slug                 TEXT NOT NULL UNIQUE,
    short_description    TEXT,
    description          TEXT,
    sku                  TEXT UNIQUE,
    base_price           NUMERIC(10, 2) NOT NULL,
    sale_price           NUMERIC(10, 2),
    cost_price           NUMERIC(10, 2),
    stock_qty            INTEGER NOT NULL DEFAULT 0,
    low_stock_threshold  INTEGER NOT NULL DEFAULT 5,
    weight_kg            NUMERIC(6, 3),
    is_featured          BOOLEAN NOT NULL DEFAULT FALSE,
    is_new_arrival       BOOLEAN NOT NULL DEFAULT FALSE,
    is_best_seller       BOOLEAN NOT NULL DEFAULT FALSE,
    is_active            BOOLEAN NOT NULL DEFAULT TRUE,
    meta_title           TEXT,
    meta_description     TEXT,
    rating_avg           NUMERIC(3, 2) DEFAULT 0.00,
    rating_count         INTEGER NOT NULL DEFAULT 0,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PRODUCT IMAGES
-- ============================================================
CREATE TABLE product_images (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id  BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url         TEXT NOT NULL,
    alt_text    TEXT,
    is_primary  BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order  SMALLINT NOT NULL DEFAULT 0
);

-- ============================================================
-- PRODUCT SPECIFICATIONS
-- ============================================================
CREATE TABLE product_specifications (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id  BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    spec_group  TEXT NOT NULL,
    spec_name   TEXT NOT NULL,
    spec_value  TEXT NOT NULL,
    sort_order  SMALLINT NOT NULL DEFAULT 0
);

-- ============================================================
-- PRODUCT VARIANTS
-- ============================================================
CREATE TABLE product_variants (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id   BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_name TEXT NOT NULL,
    color        TEXT,
    color_hex    CHAR(7),
    storage_gb   SMALLINT,
    ram_gb       SMALLINT,
    extra_price  NUMERIC(8, 2) NOT NULL DEFAULT 0.00,
    stock_qty    INTEGER NOT NULL DEFAULT 0,
    sku_suffix   TEXT,
    is_active    BOOLEAN NOT NULL DEFAULT TRUE
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_products_category     ON products(category_id);
CREATE INDEX idx_products_subcategory  ON products(subcategory_id);
CREATE INDEX idx_products_brand        ON products(brand_id);
CREATE INDEX idx_products_active       ON products(is_active);
CREATE INDEX idx_products_featured     ON products(is_featured);
CREATE INDEX idx_subcategories_cat     ON subcategories(category_id);
CREATE INDEX idx_product_images_prod   ON product_images(product_id);
CREATE INDEX idx_product_specs_prod    ON product_specifications(product_id);
CREATE INDEX idx_product_variants_prod ON product_variants(product_id);

-- ============================================================
-- Auto-update updated_at on products
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
ALTER TABLE brands               ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories           ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories        ENABLE ROW LEVEL SECURITY;
ALTER TABLE products             ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images       ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants     ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (storefront)
CREATE POLICY "Public read brands"               ON brands               FOR SELECT USING (true);
CREATE POLICY "Public read categories"           ON categories           FOR SELECT USING (true);
CREATE POLICY "Public read subcategories"        ON subcategories        FOR SELECT USING (true);
CREATE POLICY "Public read products"             ON products             FOR SELECT USING (is_active = true);
CREATE POLICY "Public read product_images"       ON product_images       FOR SELECT USING (true);
CREATE POLICY "Public read product_specifications" ON product_specifications FOR SELECT USING (true);
CREATE POLICY "Public read product_variants"     ON product_variants     FOR SELECT USING (is_active = true);
