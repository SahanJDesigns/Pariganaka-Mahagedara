import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.NEXT_PUBLIC_SANITY_API_KEY,
  useCdn: false,
})

// ── Helpers ──────────────────────────────────────────────────────────────────

function slug(s: string) { return { _type: 'slug', current: s } }
function ref(id: string) { return { _type: 'reference', _ref: id } }

// ── Brands ───────────────────────────────────────────────────────────────────

const brands = [
  { _id: 'brand-msi',       _type: 'brand', name: 'MSI',       slug: slug('msi'),       website_url: 'https://msi.com',       is_active: true },
  { _id: 'brand-alienware', _type: 'brand', name: 'Alienware', slug: slug('alienware'), website_url: 'https://alienware.com',  is_active: true },
  { _id: 'brand-asus-rog',  _type: 'brand', name: 'ASUS ROG',  slug: slug('asus-rog'),  website_url: 'https://rog.asus.com',   is_active: true },
  { _id: 'brand-hp',        _type: 'brand', name: 'HP',        slug: slug('hp'),        website_url: 'https://hp.com',         is_active: true },
  { _id: 'brand-nvidia',    _type: 'brand', name: 'NVIDIA',    slug: slug('nvidia'),    website_url: 'https://nvidia.com',     is_active: true },
  { _id: 'brand-logitech',  _type: 'brand', name: 'Logitech',  slug: slug('logitech'),  website_url: 'https://logitech.com',   is_active: true },
  { _id: 'brand-samsung',   _type: 'brand', name: 'Samsung',   slug: slug('samsung'),   website_url: 'https://samsung.com',    is_active: true },
  { _id: 'brand-seagate',   _type: 'brand', name: 'Seagate',   slug: slug('seagate'),   website_url: 'https://seagate.com',    is_active: true },
]

// ── Categories ───────────────────────────────────────────────────────────────

const categories = [
  { _id: 'cat-laptops',     _type: 'category', name: 'Laptops',     slug: slug('laptops'),     description: 'Gaming and business laptops',     icon: '💻', sort_order: 1, is_active: true },
  { _id: 'cat-desktops',    _type: 'category', name: 'Desktops',    slug: slug('desktops'),    description: 'Gaming and workstation desktops',  icon: '🖥️', sort_order: 2, is_active: true },
  { _id: 'cat-components',  _type: 'category', name: 'Components',  slug: slug('components'),  description: 'PC components and upgrade parts',  icon: '⚙️', sort_order: 3, is_active: true },
  { _id: 'cat-peripherals', _type: 'category', name: 'Peripherals', slug: slug('peripherals'), description: 'Gaming and office peripherals',    icon: '🎮', sort_order: 4, is_active: true },
  { _id: 'cat-monitors',    _type: 'category', name: 'Monitors',    slug: slug('monitors'),    description: 'Gaming and professional monitors', icon: '🖥', sort_order: 5, is_active: true },
  { _id: 'cat-storage',     _type: 'category', name: 'Storage',     slug: slug('storage'),     description: 'SSDs, HDDs and external storage',  icon: '💾', sort_order: 6, is_active: true },
]

// ── Subcategories ─────────────────────────────────────────────────────────────

const subcategories = [
  // Laptops
  { _id: 'sub-gaming-laptops',   _type: 'subcategory', name: 'Gaming Laptops',   slug: slug('gaming-laptops'),   category: ref('cat-laptops'),     sort_order: 1, is_active: true, description: null },
  { _id: 'sub-business-laptops', _type: 'subcategory', name: 'Business Laptops', slug: slug('business-laptops'), category: ref('cat-laptops'),     sort_order: 2, is_active: true, description: null },
  { _id: 'sub-ultrabooks',       _type: 'subcategory', name: 'Ultrabooks',       slug: slug('ultrabooks'),       category: ref('cat-laptops'),     sort_order: 3, is_active: true, description: null },
  // Desktops
  { _id: 'sub-gaming-desktops',  _type: 'subcategory', name: 'Gaming Desktops',  slug: slug('gaming-desktops'),  category: ref('cat-desktops'),    sort_order: 1, is_active: true, description: null },
  { _id: 'sub-workstations',     _type: 'subcategory', name: 'Workstations',     slug: slug('workstations'),     category: ref('cat-desktops'),    sort_order: 2, is_active: true, description: null },
  // Components
  { _id: 'sub-gpus',             _type: 'subcategory', name: 'Graphics Cards',   slug: slug('graphics-cards'),   category: ref('cat-components'),  sort_order: 1, is_active: true, description: null },
  { _id: 'sub-cpus',             _type: 'subcategory', name: 'Processors',       slug: slug('processors'),       category: ref('cat-components'),  sort_order: 2, is_active: true, description: null },
  { _id: 'sub-memory',           _type: 'subcategory', name: 'Memory',           slug: slug('memory'),           category: ref('cat-components'),  sort_order: 3, is_active: true, description: null },
  { _id: 'sub-motherboards',     _type: 'subcategory', name: 'Motherboards',     slug: slug('motherboards'),     category: ref('cat-components'),  sort_order: 4, is_active: true, description: null },
  // Peripherals
  { _id: 'sub-keyboards',        _type: 'subcategory', name: 'Gaming Keyboards', slug: slug('gaming-keyboards'), category: ref('cat-peripherals'), sort_order: 1, is_active: true, description: null },
  { _id: 'sub-mice',             _type: 'subcategory', name: 'Gaming Mice',      slug: slug('gaming-mice'),      category: ref('cat-peripherals'), sort_order: 2, is_active: true, description: null },
  { _id: 'sub-headsets',         _type: 'subcategory', name: 'Headsets',         slug: slug('headsets'),         category: ref('cat-peripherals'), sort_order: 3, is_active: true, description: null },
  // Monitors
  { _id: 'sub-gaming-monitors',  _type: 'subcategory', name: 'Gaming Monitors',  slug: slug('gaming-monitors'),  category: ref('cat-monitors'),    sort_order: 1, is_active: true, description: null },
  { _id: 'sub-pro-monitors',     _type: 'subcategory', name: 'Pro Monitors',     slug: slug('pro-monitors'),     category: ref('cat-monitors'),    sort_order: 2, is_active: true, description: null },
  // Storage
  { _id: 'sub-ssds',             _type: 'subcategory', name: 'SSDs',             slug: slug('ssds'),             category: ref('cat-storage'),     sort_order: 1, is_active: true, description: null },
  { _id: 'sub-hdds',             _type: 'subcategory', name: 'Hard Drives',      slug: slug('hdds'),             category: ref('cat-storage'),     sort_order: 2, is_active: true, description: null },
]

// ── Fliers ───────────────────────────────────────────────────────────────────

const fliers = [
  {
    _id: 'flier-hero-1',
    _type: 'flier',
    title: 'Gaming Laptops Sale',
    alt_text: 'Gaming laptops sale — up to 20% off',
    link_url: '/shop/laptops',
    sort_order: 1,
    is_active: true,
  },
  {
    _id: 'flier-hero-2',
    _type: 'flier',
    title: 'New RTX 4080 In Stock',
    alt_text: 'ASUS ROG RTX 4080 — now in stock',
    link_url: '/shop/components/graphics-cards',
    sort_order: 2,
    is_active: true,
  },
  {
    _id: 'flier-hero-3',
    _type: 'flier',
    title: 'Build Your Dream PC',
    alt_text: 'Build your dream PC — browse components',
    link_url: '/shop/components',
    sort_order: 3,
    is_active: true,
  },
]

// ── Products ──────────────────────────────────────────────────────────────────

const products = [
  // ── 1. MSI GL65 Leopard ──────────────────────────────────────────────────
  {
    _id: 'product-msi-gl65-leopard',
    _type: 'product',
    name: 'MSI GL65 Leopard',
    slug: slug('msi-gl65-leopard'),
    brand: ref('brand-msi'),
    category: ref('cat-laptops'),
    subcategory: ref('sub-gaming-laptops'),
    short_description: 'High-performance gaming laptop with RTX 3070 and 144Hz display.',
    description: 'The MSI GL65 Leopard delivers desktop-class gaming performance in a portable chassis. Powered by Intel Core i7 and NVIDIA GeForce RTX 3070, it handles the most demanding titles with ease. The 15.6" 144Hz IPS display ensures fluid, tear-free gameplay.',
    sku: 'MSI-GL65-9SEK',
    base_price: 389900,
    sale_price: 344900,
    cost_price: 270000,
    stock_qty: 24,
    low_stock_threshold: 5,
    weight_kg: 2.2,
    is_featured: true,
    is_new_arrival: false,
    is_best_seller: true,
    is_active: true,
    meta_title: 'MSI GL65 Leopard Gaming Laptop | RTX 3070 144Hz',
    meta_description: 'Buy the MSI GL65 Leopard gaming laptop with RTX 3070, i7 CPU and 144Hz display.',
    rating_avg: 4.6,
    rating_count: 128,
    images: [],
    specifications: [
      { _key: 's1', spec_group: 'Processor', spec_name: 'CPU',      spec_value: 'Intel Core i7-10750H (2.6GHz, 6 Cores)', sort_order: 0 },
      { _key: 's2', spec_group: 'Graphics',  spec_name: 'GPU',      spec_value: 'NVIDIA GeForce RTX 3070 8GB GDDR6',     sort_order: 1 },
      { _key: 's3', spec_group: 'Memory',    spec_name: 'RAM',      spec_value: '16GB DDR4 2933MHz',                     sort_order: 2 },
      { _key: 's4', spec_group: 'Storage',   spec_name: 'SSD',      spec_value: '512GB NVMe PCIe SSD',                   sort_order: 3 },
      { _key: 's5', spec_group: 'Display',   spec_name: 'Screen',   spec_value: '15.6" FHD IPS 144Hz Anti-Glare',        sort_order: 4 },
      { _key: 's6', spec_group: 'Network',   spec_name: 'Wi-Fi',    spec_value: 'Wi-Fi 6 (802.11ax)',                     sort_order: 5 },
      { _key: 's7', spec_group: 'Battery',   spec_name: 'Capacity', spec_value: '51Whr',                                  sort_order: 6 },
      { _key: 's8', spec_group: 'OS',        spec_name: 'System',   spec_value: 'Windows 11 Home',                        sort_order: 7 },
    ],
    variants: [
      { _key: 'v1', variant_name: '16GB / 512GB', color: null, color_hex: null, storage_gb: 512, ram_gb: 16, extra_price: 0,   stock_qty: 15, sku_suffix: 'A', is_active: true },
      { _key: 'v2', variant_name: '32GB / 1TB',   color: null, color_hex: null, storage_gb: 1000, ram_gb: 32, extra_price: 60000, stock_qty: 9,  sku_suffix: 'B', is_active: true },
    ],
  },

  // ── 2. MSI Alpha 15 ──────────────────────────────────────────────────────
  {
    _id: 'product-msi-alpha-15',
    _type: 'product',
    name: 'MSI Alpha 15',
    slug: slug('msi-alpha-15'),
    brand: ref('brand-msi'),
    category: ref('cat-laptops'),
    subcategory: ref('sub-gaming-laptops'),
    short_description: 'AMD-powered gaming laptop with RX 6600M and 144Hz display.',
    description: 'The MSI Alpha 15 is an AMD-centric gaming powerhouse featuring the Ryzen 7 CPU and Radeon RX 6600M GPU. Perfect for gamers who prefer the AMD ecosystem without compromising on performance.',
    sku: 'MSI-ALPHA15-A4DEK',
    base_price: 299900,
    sale_price: null,
    cost_price: 216000,
    stock_qty: 18,
    low_stock_threshold: 5,
    weight_kg: 2.1,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: false,
    is_active: true,
    meta_title: 'MSI Alpha 15 AMD Gaming Laptop | RX 6600M',
    meta_description: 'AMD Ryzen-powered MSI Alpha 15 gaming laptop with Radeon RX 6600M.',
    rating_avg: 4.3,
    rating_count: 54,
    images: [],
    specifications: [
      { _key: 's1', spec_group: 'Processor', spec_name: 'CPU',    spec_value: 'AMD Ryzen 7 5800H (3.2GHz, 8 Cores)', sort_order: 0 },
      { _key: 's2', spec_group: 'Graphics',  spec_name: 'GPU',    spec_value: 'AMD Radeon RX 6600M 8GB GDDR6',       sort_order: 1 },
      { _key: 's3', spec_group: 'Memory',    spec_name: 'RAM',    spec_value: '16GB DDR4 3200MHz',                   sort_order: 2 },
      { _key: 's4', spec_group: 'Storage',   spec_name: 'SSD',    spec_value: '512GB NVMe PCIe SSD',                 sort_order: 3 },
      { _key: 's5', spec_group: 'Display',   spec_name: 'Screen', spec_value: '15.6" FHD IPS 144Hz',                 sort_order: 4 },
    ],
    variants: [
      { _key: 'v1', variant_name: '16GB / 512GB', color: null, color_hex: null, storage_gb: 512, ram_gb: 16, extra_price: 0,   stock_qty: 18, sku_suffix: null, is_active: true },
    ],
  },

  // ── 3. Alienware Aurora R13 ───────────────────────────────────────────────
  {
    _id: 'product-alienware-aurora-r13',
    _type: 'product',
    name: 'Alienware Aurora R13',
    slug: slug('alienware-aurora-r13'),
    brand: ref('brand-alienware'),
    category: ref('cat-desktops'),
    subcategory: ref('sub-gaming-desktops'),
    short_description: 'Flagship gaming desktop with RTX 3090 and Intel Core i9.',
    description: 'The Alienware Aurora R13 redefines desktop gaming with its Legend 2.0 design and legendary performance. Featuring the Intel Core i9 and NVIDIA RTX 3090, it is built for extreme 4K gaming and streaming.',
    sku: 'AW-AURORA-R13-9910',
    base_price: 749900,
    sale_price: 659900,
    cost_price: 540000,
    stock_qty: 10,
    low_stock_threshold: 3,
    weight_kg: 11.5,
    is_featured: true,
    is_new_arrival: false,
    is_best_seller: false,
    is_active: true,
    meta_title: 'Alienware Aurora R13 Gaming Desktop | RTX 3090',
    meta_description: 'The ultimate Alienware Aurora R13 gaming desktop featuring i9 CPU and RTX 3090.',
    rating_avg: 4.8,
    rating_count: 76,
    images: [],
    specifications: [
      { _key: 's1', spec_group: 'Processor', spec_name: 'CPU',      spec_value: 'Intel Core i9-12900KF (3.2GHz, 16 Cores)', sort_order: 0 },
      { _key: 's2', spec_group: 'Graphics',  spec_name: 'GPU',      spec_value: 'NVIDIA GeForce RTX 3090 24GB GDDR6X',      sort_order: 1 },
      { _key: 's3', spec_group: 'Memory',    spec_name: 'RAM',      spec_value: '32GB DDR5 4400MHz',                        sort_order: 2 },
      { _key: 's4', spec_group: 'Storage',   spec_name: 'SSD',      spec_value: '1TB NVMe PCIe Gen 4 SSD',                  sort_order: 3 },
      { _key: 's5', spec_group: 'Cooling',   spec_name: 'Cooling',  spec_value: '240mm Liquid Cooling',                     sort_order: 4 },
      { _key: 's6', spec_group: 'Power',     spec_name: 'PSU',      spec_value: '1000W 80 PLUS Gold',                       sort_order: 5 },
      { _key: 's7', spec_group: 'OS',        spec_name: 'System',   spec_value: 'Windows 11 Home',                          sort_order: 6 },
    ],
    variants: [],
  },

  // ── 4. ASUS ROG Strix RTX 4080 ───────────────────────────────────────────
  {
    _id: 'product-asus-rog-strix-rtx4080',
    _type: 'product',
    name: 'ASUS ROG Strix GeForce RTX 4080',
    slug: slug('asus-rog-strix-rtx-4080'),
    brand: ref('brand-asus-rog'),
    category: ref('cat-components'),
    subcategory: ref('sub-gpus'),
    short_description: 'Triple-fan RTX 4080 with 16GB GDDR6X for extreme 4K gaming.',
    description: 'The ASUS ROG Strix GeForce RTX 4080 features a 16GB GDDR6X memory buffer and a triple Axial-tech fan design. With DLSS 3 and hardware ray tracing, it delivers unmatched 4K gaming performance.',
    sku: 'ROG-STRIX-RTX4080-O16G',
    base_price: 359900,
    sale_price: null,
    cost_price: 270000,
    stock_qty: 15,
    low_stock_threshold: 3,
    weight_kg: 1.6,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: false,
    is_active: true,
    meta_title: 'ASUS ROG Strix RTX 4080 16GB | DLSS 3 GPU',
    meta_description: 'ASUS ROG Strix RTX 4080 16GB graphics card for extreme 4K gaming with DLSS 3.',
    rating_avg: 4.9,
    rating_count: 203,
    images: [],
    specifications: [
      { _key: 's1', spec_group: 'Core',    spec_name: 'Architecture', spec_value: 'NVIDIA Ada Lovelace',        sort_order: 0 },
      { _key: 's2', spec_group: 'Core',    spec_name: 'CUDA Cores',   spec_value: '9728',                       sort_order: 1 },
      { _key: 's3', spec_group: 'Memory',  spec_name: 'VRAM',         spec_value: '16GB GDDR6X',                sort_order: 2 },
      { _key: 's4', spec_group: 'Memory',  spec_name: 'Bus Width',    spec_value: '256-bit',                    sort_order: 3 },
      { _key: 's5', spec_group: 'Clocks',  spec_name: 'Boost Clock',  spec_value: '2625 MHz (OC Mode)',         sort_order: 4 },
      { _key: 's6', spec_group: 'Outputs', spec_name: 'Ports',        spec_value: '3x DisplayPort 1.4, 2x HDMI 2.1', sort_order: 5 },
      { _key: 's7', spec_group: 'Power',   spec_name: 'TDP',          spec_value: '320W',                       sort_order: 6 },
      { _key: 's8', spec_group: 'Power',   spec_name: 'Connector',    spec_value: '1x 16-pin PCIe 5.0',         sort_order: 7 },
    ],
    variants: [],
  },

  // ── 5. Logitech G915 TKL ─────────────────────────────────────────────────
  {
    _id: 'product-logitech-g915-tkl',
    _type: 'product',
    name: 'Logitech G915 TKL Wireless Gaming Keyboard',
    slug: slug('logitech-g915-tkl'),
    brand: ref('brand-logitech'),
    category: ref('cat-peripherals'),
    subcategory: ref('sub-keyboards'),
    short_description: 'Ultra-slim tenkeyless wireless gaming keyboard with LIGHTSPEED technology.',
    description: 'The Logitech G915 TKL brings pro-grade wireless performance to a compact tenkeyless layout. With LIGHTSPEED wireless, LIGHTSYNC RGB, and advanced low-profile GL mechanical switches, it is the choice of esports professionals.',
    sku: 'LOG-G915-TKL-CLICKY',
    base_price: 68900,
    sale_price: 59900,
    cost_price: 39000,
    stock_qty: 45,
    low_stock_threshold: 10,
    weight_kg: 0.81,
    is_featured: false,
    is_new_arrival: false,
    is_best_seller: true,
    is_active: true,
    meta_title: 'Logitech G915 TKL Wireless Gaming Keyboard | LIGHTSPEED',
    meta_description: 'Logitech G915 TKL wireless gaming keyboard with LIGHTSPEED and RGB.',
    rating_avg: 4.7,
    rating_count: 312,
    images: [],
    specifications: [
      { _key: 's1', spec_group: 'Switch',      spec_name: 'Type',       spec_value: 'Logitech GL Clicky (Low Profile)',      sort_order: 0 },
      { _key: 's2', spec_group: 'Wireless',    spec_name: 'Technology', spec_value: 'LIGHTSPEED 2.4GHz / Bluetooth',        sort_order: 1 },
      { _key: 's3', spec_group: 'Wireless',    spec_name: 'Battery',    spec_value: 'Up to 40 hours (RGB off)',              sort_order: 2 },
      { _key: 's4', spec_group: 'Lighting',    spec_name: 'RGB',        spec_value: 'LIGHTSYNC RGB per-key',                 sort_order: 3 },
      { _key: 's5', spec_group: 'Dimensions',  spec_name: 'Size',       spec_value: '368 × 150 × 22 mm',                    sort_order: 4 },
    ],
    variants: [
      { _key: 'v1', variant_name: 'Black / Clicky',  color: 'Black', color_hex: '#111111', storage_gb: null, ram_gb: null, extra_price: 0,  stock_qty: 25, sku_suffix: 'BLK', is_active: true },
      { _key: 'v2', variant_name: 'White / Linear',  color: 'White', color_hex: '#f5f5f5', storage_gb: null, ram_gb: null, extra_price: 0,  stock_qty: 12, sku_suffix: 'WHT', is_active: true },
      { _key: 'v3', variant_name: 'Black / Tactile', color: 'Black', color_hex: '#111111', storage_gb: null, ram_gb: null, extra_price: 3000, stock_qty: 8,  sku_suffix: 'TCT', is_active: true },
    ],
  },

  // ── 6. Logitech G Pro X Superlight 2 ─────────────────────────────────────
  {
    _id: 'product-logitech-gpro-superlight2',
    _type: 'product',
    name: 'Logitech G Pro X Superlight 2',
    slug: slug('logitech-g-pro-x-superlight-2'),
    brand: ref('brand-logitech'),
    category: ref('cat-peripherals'),
    subcategory: ref('sub-mice'),
    short_description: 'Featherweight 60g wireless gaming mouse with HERO 2 sensor.',
    description: 'The G Pro X Superlight 2 weighs just 60 grams and is engineered with the HERO 2 sensor for pinpoint accuracy. Trusted by pro esports players across the globe, it offers 95-hour battery life and LIGHTSPEED wireless.',
    sku: 'LOG-GPROX-SL2',
    base_price: 47900,
    sale_price: null,
    cost_price: 27000,
    stock_qty: 60,
    low_stock_threshold: 10,
    weight_kg: 0.06,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: true,
    is_active: true,
    meta_title: 'Logitech G Pro X Superlight 2 Wireless Mouse | 60g',
    meta_description: 'Logitech G Pro X Superlight 2: 60g wireless gaming mouse with HERO 2 sensor.',
    rating_avg: 4.9,
    rating_count: 541,
    images: [],
    specifications: [
      { _key: 's1', spec_group: 'Sensor',     spec_name: 'Type',          spec_value: 'HERO 2 Optical',             sort_order: 0 },
      { _key: 's2', spec_group: 'Sensor',     spec_name: 'DPI',           spec_value: '100 – 32,000 DPI',           sort_order: 1 },
      { _key: 's3', spec_group: 'Wireless',   spec_name: 'Technology',    spec_value: 'LIGHTSPEED 2.4GHz',          sort_order: 2 },
      { _key: 's4', spec_group: 'Wireless',   spec_name: 'Battery Life',  spec_value: 'Up to 95 hours',             sort_order: 3 },
      { _key: 's5', spec_group: 'Build',      spec_name: 'Weight',        spec_value: '60g',                        sort_order: 4 },
      { _key: 's6', spec_group: 'Buttons',    spec_name: 'Main Switches', spec_value: 'Optical mechanical (70M)',   sort_order: 5 },
    ],
    variants: [
      { _key: 'v1', variant_name: 'Black', color: 'Black', color_hex: '#111111', storage_gb: null, ram_gb: null, extra_price: 0, stock_qty: 35, sku_suffix: 'BLK', is_active: true },
      { _key: 'v2', variant_name: 'White', color: 'White', color_hex: '#f5f5f5', storage_gb: null, ram_gb: null, extra_price: 0, stock_qty: 25, sku_suffix: 'WHT', is_active: true },
    ],
  },

  // ── 7. Samsung Odyssey G7 ─────────────────────────────────────────────────
  {
    _id: 'product-samsung-odyssey-g7',
    _type: 'product',
    name: 'Samsung Odyssey G7 32"',
    slug: slug('samsung-odyssey-g7-32'),
    brand: ref('brand-samsung'),
    category: ref('cat-monitors'),
    subcategory: ref('sub-gaming-monitors'),
    short_description: '32" WQHD 240Hz curved QLED gaming monitor with 1ms response time.',
    description: 'The Samsung Odyssey G7 features a 1000R curved QLED display at 240Hz refresh rate and 1ms response time. With VESA DisplayHDR 600, G-Sync compatibility and a 32" WQHD panel, it immerses you completely in the game.',
    sku: 'SAM-LC32G75TQSNXZA',
    base_price: 194900,
    sale_price: 164900,
    cost_price: 120000,
    stock_qty: 22,
    low_stock_threshold: 5,
    weight_kg: 6.4,
    is_featured: true,
    is_new_arrival: false,
    is_best_seller: false,
    is_active: true,
    meta_title: 'Samsung Odyssey G7 32" 240Hz WQHD Gaming Monitor',
    meta_description: 'Samsung Odyssey G7 32" 240Hz 1ms WQHD curved QLED gaming monitor.',
    rating_avg: 4.7,
    rating_count: 189,
    images: [],
    specifications: [
      { _key: 's1', spec_group: 'Display',    spec_name: 'Size',         spec_value: '32 inches',                sort_order: 0 },
      { _key: 's2', spec_group: 'Display',    spec_name: 'Resolution',   spec_value: '2560 × 1440 (WQHD)',       sort_order: 1 },
      { _key: 's3', spec_group: 'Display',    spec_name: 'Panel',        spec_value: 'QLED VA, 1000R curve',     sort_order: 2 },
      { _key: 's4', spec_group: 'Performance',spec_name: 'Refresh Rate', spec_value: '240Hz',                    sort_order: 3 },
      { _key: 's5', spec_group: 'Performance',spec_name: 'Response',     spec_value: '1ms (MPRT)',               sort_order: 4 },
      { _key: 's6', spec_group: 'HDR',        spec_name: 'Standard',     spec_value: 'VESA DisplayHDR 600',      sort_order: 5 },
      { _key: 's7', spec_group: 'Sync',       spec_name: 'Technology',   spec_value: 'G-Sync Compatible, FreeSync Premium Pro', sort_order: 6 },
      { _key: 's8', spec_group: 'Ports',      spec_name: 'Connectivity', spec_value: '2× HDMI 2.0, 1× DP 1.4, 2× USB 3.0', sort_order: 7 },
    ],
    variants: [],
  },

  // ── 8. Samsung 980 Pro SSD ────────────────────────────────────────────────
  {
    _id: 'product-samsung-980-pro',
    _type: 'product',
    name: 'Samsung 980 PRO NVMe SSD',
    slug: slug('samsung-980-pro-nvme'),
    brand: ref('brand-samsung'),
    category: ref('cat-storage'),
    subcategory: ref('sub-ssds'),
    short_description: 'PCIe Gen 4 NVMe SSD with up to 7,000 MB/s sequential read.',
    description: 'The Samsung 980 PRO is the ultimate NVMe SSD for gamers and creators. With PCIe Gen 4 interface delivering sequential reads up to 7,000 MB/s, it dramatically reduces load times and enables lightning-fast data transfers.',
    sku: 'SAM-MZ-V8P1T0B-AM',
    base_price: 44900,
    sale_price: 35900,
    cost_price: 24000,
    stock_qty: 80,
    low_stock_threshold: 15,
    weight_kg: 0.009,
    is_featured: false,
    is_new_arrival: false,
    is_best_seller: true,
    is_active: true,
    meta_title: 'Samsung 980 PRO PCIe Gen 4 NVMe SSD | 7000 MB/s',
    meta_description: 'Samsung 980 PRO PCIe Gen 4 NVMe SSD — fastest read speeds up to 7000 MB/s.',
    rating_avg: 4.8,
    rating_count: 876,
    images: [],
    specifications: [
      { _key: 's1', spec_group: 'Interface',   spec_name: 'Type',       spec_value: 'PCIe Gen 4.0 x4, NVMe 1.3c', sort_order: 0 },
      { _key: 's2', spec_group: 'Form Factor', spec_name: 'Size',       spec_value: 'M.2 2280',                   sort_order: 1 },
      { _key: 's3', spec_group: 'Performance', spec_name: 'Seq. Read',  spec_value: '7,000 MB/s',                 sort_order: 2 },
      { _key: 's4', spec_group: 'Performance', spec_name: 'Seq. Write', spec_value: '5,100 MB/s (1TB)',            sort_order: 3 },
      { _key: 's5', spec_group: 'Endurance',   spec_name: 'TBW',        spec_value: '600 TBW (1TB)',               sort_order: 4 },
      { _key: 's6', spec_group: 'Warranty',    spec_name: 'Period',     spec_value: '5 Years',                    sort_order: 5 },
    ],
    variants: [
      { _key: 'v1', variant_name: '250GB',  color: null, color_hex: null, storage_gb: 250,  ram_gb: null, extra_price: -15000, stock_qty: 20, sku_suffix: '250', is_active: true },
      { _key: 'v2', variant_name: '500GB',  color: null, color_hex: null, storage_gb: 500,  ram_gb: null, extra_price: -6000,  stock_qty: 25, sku_suffix: '500', is_active: true },
      { _key: 'v3', variant_name: '1TB',    color: null, color_hex: null, storage_gb: 1000, ram_gb: null, extra_price: 0,      stock_qty: 25, sku_suffix: '1TB', is_active: true },
      { _key: 'v4', variant_name: '2TB',    color: null, color_hex: null, storage_gb: 2000, ram_gb: null, extra_price: 24000,  stock_qty: 10, sku_suffix: '2TB', is_active: true },
    ],
  },

  // ── 9. HP EliteBook 840 G9 ────────────────────────────────────────────────
  {
    _id: 'product-hp-elitebook-840-g9',
    _type: 'product',
    name: 'HP EliteBook 840 G9',
    slug: slug('hp-elitebook-840-g9'),
    brand: ref('brand-hp'),
    category: ref('cat-laptops'),
    subcategory: ref('sub-business-laptops'),
    short_description: 'Premium business laptop with 12th Gen Intel Core i7 and 14" IPS display.',
    description: 'The HP EliteBook 840 G9 is the gold standard for enterprise laptops. Built with a durable aluminium chassis, featuring a MIL-SPEC tested design, integrated Intel Iris Xe graphics, and Windows 11 Pro out of the box.',
    sku: 'HP-EB840G9-I7-512',
    base_price: 359900,
    sale_price: null,
    cost_price: 255000,
    stock_qty: 30,
    low_stock_threshold: 5,
    weight_kg: 1.37,
    is_featured: false,
    is_new_arrival: true,
    is_best_seller: false,
    is_active: true,
    meta_title: 'HP EliteBook 840 G9 Business Laptop | i7 12th Gen',
    meta_description: 'HP EliteBook 840 G9 — premium 14" business laptop with 12th Gen Intel Core i7.',
    rating_avg: 4.5,
    rating_count: 62,
    images: [],
    specifications: [
      { _key: 's1', spec_group: 'Processor', spec_name: 'CPU',     spec_value: 'Intel Core i7-1255U (3.5GHz, 10 Cores)', sort_order: 0 },
      { _key: 's2', spec_group: 'Graphics',  spec_name: 'GPU',     spec_value: 'Intel Iris Xe Graphics',                  sort_order: 1 },
      { _key: 's3', spec_group: 'Memory',    spec_name: 'RAM',     spec_value: '16GB DDR5 4800MHz',                       sort_order: 2 },
      { _key: 's4', spec_group: 'Storage',   spec_name: 'SSD',     spec_value: '512GB PCIe NVMe SSD',                     sort_order: 3 },
      { _key: 's5', spec_group: 'Display',   spec_name: 'Screen',  spec_value: '14" FHD IPS Anti-Glare (400 nits)',       sort_order: 4 },
      { _key: 's6', spec_group: 'Security',  spec_name: 'Features',spec_value: 'Fingerprint Reader, IR Camera, TPM 2.0',  sort_order: 5 },
      { _key: 's7', spec_group: 'OS',        spec_name: 'System',  spec_value: 'Windows 11 Pro',                          sort_order: 6 },
    ],
    variants: [
      { _key: 'v1', variant_name: '16GB / 512GB', color: null, color_hex: null, storage_gb: 512,  ram_gb: 16, extra_price: 0,   stock_qty: 20, sku_suffix: null, is_active: true },
      { _key: 'v2', variant_name: '32GB / 1TB',   color: null, color_hex: null, storage_gb: 1000, ram_gb: 32, extra_price: 90000, stock_qty: 10, sku_suffix: null, is_active: true },
    ],
  },

  // ── 10. NVIDIA GeForce RTX 4060 Founders Edition ─────────────────────────
  {
    _id: 'product-nvidia-rtx4060-fe',
    _type: 'product',
    name: 'NVIDIA GeForce RTX 4060 Founders Edition',
    slug: slug('nvidia-rtx-4060-founders-edition'),
    brand: ref('brand-nvidia'),
    category: ref('cat-components'),
    subcategory: ref('sub-gpus'),
    short_description: 'Efficient 1080p/1440p gaming GPU with DLSS 3 and 8GB GDDR6.',
    description: 'The RTX 4060 Founders Edition brings Ada Lovelace efficiency to the mainstream. With 8GB of GDDR6 memory, DLSS 3 Frame Generation, and NVIDIA Reflex, it is the ideal GPU for 1080p and 1440p gaming at a competitive price point.',
    sku: 'NV-RTX4060-FE-8G',
    base_price: 89900,
    sale_price: null,
    cost_price: 66000,
    stock_qty: 40,
    low_stock_threshold: 8,
    weight_kg: 0.78,
    is_featured: true,
    is_new_arrival: true,
    is_best_seller: false,
    is_active: true,
    meta_title: 'NVIDIA RTX 4060 Founders Edition 8GB | DLSS 3',
    meta_description: 'NVIDIA GeForce RTX 4060 Founders Edition with 8GB GDDR6 and DLSS 3 Frame Generation.',
    rating_avg: 4.5,
    rating_count: 421,
    images: [],
    specifications: [
      { _key: 's1', spec_group: 'Core',    spec_name: 'Architecture', spec_value: 'NVIDIA Ada Lovelace',        sort_order: 0 },
      { _key: 's2', spec_group: 'Core',    spec_name: 'CUDA Cores',   spec_value: '3072',                       sort_order: 1 },
      { _key: 's3', spec_group: 'Memory',  spec_name: 'VRAM',         spec_value: '8GB GDDR6',                  sort_order: 2 },
      { _key: 's4', spec_group: 'Memory',  spec_name: 'Bus Width',    spec_value: '128-bit',                    sort_order: 3 },
      { _key: 's5', spec_group: 'Clocks',  spec_name: 'Boost Clock',  spec_value: '2460 MHz',                   sort_order: 4 },
      { _key: 's6', spec_group: 'Power',   spec_name: 'TDP',          spec_value: '115W',                       sort_order: 5 },
      { _key: 's7', spec_group: 'Power',   spec_name: 'Connector',    spec_value: '1x 16-pin PCIe 5.0',         sort_order: 6 },
    ],
    variants: [],
  },
]

// ── Main ──────────────────────────────────────────────────────────────────────

async function seed() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const all: any[] = [...brands, ...categories, ...subcategories, ...fliers, ...products]
  console.log(`Seeding ${all.length} documents…`)

  let done = 0
  for (const doc of all) {
    await client.createOrReplace(doc)
    done++
    process.stdout.write(`\r  ${done}/${all.length} created`)
  }

  console.log('\n✅  Seed complete!')
  console.log(`   ${brands.length} brands`)
  console.log(`   ${categories.length} categories`)
  console.log(`   ${subcategories.length} subcategories`)
  console.log(`   ${fliers.length} fliers`)
  console.log(`   ${products.length} products`)
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
