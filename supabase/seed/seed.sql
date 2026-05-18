-- ============================================================
-- Seed Data — Tech Store (based on Figma template assets)
-- ============================================================

-- ============================================================
-- BRANDS
-- ============================================================
INSERT INTO brands (name, slug, logo_url, website_url) VALUES
('MSI',      'msi',      '/images/brands/msi.png',      'https://www.msi.com'),
('Alienware', 'alienware','/images/brands/alienware.png','https://www.alienware.com'),
('ROCCAT',   'roccat',   '/images/brands/roccat.png',   'https://www.roccat.com'),
('HP',       'hp',       '/images/brands/hp.png',       'https://www.hp.com'),
('NVIDIA',   'nvidia',   '/images/brands/nvidia.png',   'https://www.nvidia.com'),
('Asus',     'asus',     '/images/brands/asus.png',     'https://www.asus.com'),
('Logitech', 'logitech', '/images/brands/logitech.png', 'https://www.logitech.com'),
('Samsung',  'samsung',  '/images/brands/samsung.png',  'https://www.samsung.com');

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Laptops',     'laptops',     'Portable computers for every need',         1),
('Desktops',    'desktops',    'High-performance desktop computers',        2),
('Components',  'components',  'PC components and upgrade parts',           3),
('Peripherals', 'peripherals', 'Keyboards, mice, headsets and more',        4),
('Monitors',    'monitors',    'Displays for gaming, work and creative use',5),
('Storage',     'storage',     'SSDs, HDDs and portable storage solutions', 6),
('Networking',  'networking',  'Routers, switches and network adapters',    7),
('Accessories', 'accessories', 'Bags, cables, stands and other accessories',8);

-- ============================================================
-- SUBCATEGORIES
-- ============================================================

-- Laptops
INSERT INTO subcategories (category_id, name, slug, sort_order) VALUES
((SELECT id FROM categories WHERE slug='laptops'), 'Gaming Laptops',   'gaming-laptops',   1),
((SELECT id FROM categories WHERE slug='laptops'), 'Creator Laptops',  'creator-laptops',  2),
((SELECT id FROM categories WHERE slug='laptops'), 'Business Laptops', 'business-laptops', 3),
((SELECT id FROM categories WHERE slug='laptops'), 'Ultrabooks',       'ultrabooks',       4),
((SELECT id FROM categories WHERE slug='laptops'), 'Budget Laptops',   'budget-laptops',   5);

-- Desktops
INSERT INTO subcategories (category_id, name, slug, sort_order) VALUES
((SELECT id FROM categories WHERE slug='desktops'), 'Gaming Desktops', 'gaming-desktops', 1),
((SELECT id FROM categories WHERE slug='desktops'), 'Workstations',    'workstations',    2),
((SELECT id FROM categories WHERE slug='desktops'), 'All-in-One PCs',  'all-in-one',      3),
((SELECT id FROM categories WHERE slug='desktops'), 'Mini PCs',        'mini-pcs',        4);

-- Components
INSERT INTO subcategories (category_id, name, slug, sort_order) VALUES
((SELECT id FROM categories WHERE slug='components'), 'Graphics Cards', 'graphics-cards', 1),
((SELECT id FROM categories WHERE slug='components'), 'Processors',     'processors',     2),
((SELECT id FROM categories WHERE slug='components'), 'Motherboards',   'motherboards',   3),
((SELECT id FROM categories WHERE slug='components'), 'RAM',            'ram',            4),
((SELECT id FROM categories WHERE slug='components'), 'Cooling',        'cooling',        5),
((SELECT id FROM categories WHERE slug='components'), 'PC Cases',       'pc-cases',       6),
((SELECT id FROM categories WHERE slug='components'), 'Power Supplies', 'power-supplies', 7);

-- Peripherals
INSERT INTO subcategories (category_id, name, slug, sort_order) VALUES
((SELECT id FROM categories WHERE slug='peripherals'), 'Gaming Keyboards', 'gaming-keyboards', 1),
((SELECT id FROM categories WHERE slug='peripherals'), 'Gaming Mice',      'gaming-mice',      2),
((SELECT id FROM categories WHERE slug='peripherals'), 'Gaming Headsets',  'gaming-headsets',  3),
((SELECT id FROM categories WHERE slug='peripherals'), 'Webcams',          'webcams',          4),
((SELECT id FROM categories WHERE slug='peripherals'), 'Mouse Pads',       'mouse-pads',       5),
((SELECT id FROM categories WHERE slug='peripherals'), 'Controllers',      'controllers',      6);

-- Monitors
INSERT INTO subcategories (category_id, name, slug, sort_order) VALUES
((SELECT id FROM categories WHERE slug='monitors'), 'Gaming Monitors',  'gaming-monitors',  1),
((SELECT id FROM categories WHERE slug='monitors'), 'Professional',     'professional',     2),
((SELECT id FROM categories WHERE slug='monitors'), 'Ultrawide',        'ultrawide',        3),
((SELECT id FROM categories WHERE slug='monitors'), '4K Monitors',      '4k-monitors',      4);

-- Storage
INSERT INTO subcategories (category_id, name, slug, sort_order) VALUES
((SELECT id FROM categories WHERE slug='storage'), 'NVMe SSDs',       'nvme-ssds',       1),
((SELECT id FROM categories WHERE slug='storage'), 'SATA SSDs',       'sata-ssds',       2),
((SELECT id FROM categories WHERE slug='storage'), 'Hard Drives',     'hard-drives',     3),
((SELECT id FROM categories WHERE slug='storage'), 'Portable Storage','portable-storage', 4);

-- Networking
INSERT INTO subcategories (category_id, name, slug, sort_order) VALUES
((SELECT id FROM categories WHERE slug='networking'), 'Wi-Fi Routers',    'wifi-routers',    1),
((SELECT id FROM categories WHERE slug='networking'), 'Network Adapters', 'network-adapters',2),
((SELECT id FROM categories WHERE slug='networking'), 'Switches',         'switches',        3);

-- Accessories
INSERT INTO subcategories (category_id, name, slug, sort_order) VALUES
((SELECT id FROM categories WHERE slug='accessories'), 'Laptop Bags',   'laptop-bags',   1),
((SELECT id FROM categories WHERE slug='accessories'), 'Cables',        'cables',        2),
((SELECT id FROM categories WHERE slug='accessories'), 'Laptop Stands', 'laptop-stands', 3),
((SELECT id FROM categories WHERE slug='accessories'), 'USB Hubs',      'usb-hubs',      4),
((SELECT id FROM categories WHERE slug='accessories'), 'Chargers',      'chargers',      5);

-- ============================================================
-- PRODUCTS
-- ============================================================

-- 1. MSI GL65 Leopard
INSERT INTO products (
    brand_id, category_id, subcategory_id,
    name, slug, short_description,
    base_price, sale_price, stock_qty,
    is_featured, is_best_seller, rating_avg, rating_count
) VALUES (
    (SELECT id FROM brands WHERE slug='msi'),
    (SELECT id FROM categories WHERE slug='laptops'),
    (SELECT id FROM subcategories WHERE slug='gaming-laptops'),
    'MSI GL65 Leopard 10SFK',
    'msi-gl65-leopard-10sfk',
    'Powerful 15.6" gaming laptop with RTX 2070 Super & Intel Core i7',
    1299.00, 1149.00, 18,
    TRUE, TRUE, 4.70, 312
);

INSERT INTO product_specifications (product_id, spec_group, spec_name, spec_value, sort_order) VALUES
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Processor',   'CPU Model',     'Intel Core i7-10750H',          1),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Processor',   'CPU Cores',     '6 Cores / 12 Threads',          2),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Processor',   'Base Clock',    '2.6 GHz (5.0 GHz Boost)',       3),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Graphics',    'GPU Model',     'NVIDIA RTX 2070 Super',         1),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Graphics',    'VRAM',          '8 GB GDDR6',                    2),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Display',     'Screen Size',   '15.6"',                         1),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Display',     'Resolution',    '1920 x 1080 (FHD)',             2),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Display',     'Refresh Rate',  '144 Hz',                        3),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Display',     'Panel Type',    'IPS',                           4),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Memory',      'RAM',           '16 GB DDR4',                    1),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Memory',      'Max RAM',       '64 GB',                         2),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Storage',     'Primary Drive', '512 GB NVMe SSD',               1),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Storage',     'Extra Slot',    '1x HDD Slot (empty)',           2),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Design',      'Color',         'Black',                         1),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Design',      'Weight',        '2.2 kg',                        2),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Battery',     'Capacity',      '51 Whr',                        1),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Connectivity','Wi-Fi',         'Wi-Fi 6 (802.11ax)',            1),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Connectivity','Bluetooth',     'Bluetooth 5.1',                 2),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Ports',       'USB',           '3x USB 3.2 Gen1 Type-A',        1),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Ports',       'USB-C',         '1x USB 3.2 Gen2 Type-C',        2),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Ports',       'Video Out',     'HDMI 2.0b, Mini DP',            3);

INSERT INTO product_variants (product_id, variant_name, color, color_hex, storage_gb, ram_gb, extra_price, stock_qty) VALUES
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Black / 16GB / 512GB', 'Black', '#1A1A1A', 512,  16, 0.00,   18),
((SELECT id FROM products WHERE slug='msi-gl65-leopard-10sfk'), 'Black / 32GB / 1TB',   'Black', '#1A1A1A', 1000, 32, 200.00,  7);

-- 2. MSI Alpha 15
INSERT INTO products (
    brand_id, category_id, subcategory_id,
    name, slug, short_description,
    base_price, stock_qty,
    is_new_arrival, rating_avg, rating_count
) VALUES (
    (SELECT id FROM brands WHERE slug='msi'),
    (SELECT id FROM categories WHERE slug='laptops'),
    (SELECT id FROM subcategories WHERE slug='gaming-laptops'),
    'MSI Alpha 15 A4DEK',
    'msi-alpha-15-a4dek',
    'AMD-powered 15.6" gaming laptop with RX 5600M graphics',
    999.00, 24,
    TRUE, 4.40, 178
);

INSERT INTO product_specifications (product_id, spec_group, spec_name, spec_value, sort_order) VALUES
((SELECT id FROM products WHERE slug='msi-alpha-15-a4dek'), 'Processor', 'CPU Model',     'AMD Ryzen 7 4800H',     1),
((SELECT id FROM products WHERE slug='msi-alpha-15-a4dek'), 'Processor', 'CPU Cores',     '8 Cores / 16 Threads',  2),
((SELECT id FROM products WHERE slug='msi-alpha-15-a4dek'), 'Graphics',  'GPU Model',     'AMD Radeon RX 5600M',   1),
((SELECT id FROM products WHERE slug='msi-alpha-15-a4dek'), 'Graphics',  'VRAM',          '6 GB GDDR6',            2),
((SELECT id FROM products WHERE slug='msi-alpha-15-a4dek'), 'Display',   'Screen Size',   '15.6"',                 1),
((SELECT id FROM products WHERE slug='msi-alpha-15-a4dek'), 'Display',   'Resolution',    '1920 x 1080 (FHD)',     2),
((SELECT id FROM products WHERE slug='msi-alpha-15-a4dek'), 'Display',   'Refresh Rate',  '144 Hz',                3),
((SELECT id FROM products WHERE slug='msi-alpha-15-a4dek'), 'Memory',    'RAM',           '16 GB DDR4',            1),
((SELECT id FROM products WHERE slug='msi-alpha-15-a4dek'), 'Storage',   'Primary Drive', '512 GB NVMe SSD',       1),
((SELECT id FROM products WHERE slug='msi-alpha-15-a4dek'), 'Design',    'Color',         'Black',                 1),
((SELECT id FROM products WHERE slug='msi-alpha-15-a4dek'), 'Design',    'Weight',        '2.1 kg',                2);

-- 3. MSI Creator 17
INSERT INTO products (
    brand_id, category_id, subcategory_id,
    name, slug, short_description,
    base_price, sale_price, stock_qty,
    is_featured, rating_avg, rating_count
) VALUES (
    (SELECT id FROM brands WHERE slug='msi'),
    (SELECT id FROM categories WHERE slug='laptops'),
    (SELECT id FROM subcategories WHERE slug='creator-laptops'),
    'MSI Creator 17 A10SE',
    'msi-creator-17-a10se',
    'Professional 17.3" content creation laptop with Mini LED display',
    1799.00, 1599.00, 9,
    TRUE, 4.80, 95
);

INSERT INTO product_specifications (product_id, spec_group, spec_name, spec_value, sort_order) VALUES
((SELECT id FROM products WHERE slug='msi-creator-17-a10se'), 'Processor', 'CPU Model',     'Intel Core i7-10875H',      1),
((SELECT id FROM products WHERE slug='msi-creator-17-a10se'), 'Graphics',  'GPU Model',     'NVIDIA RTX 2060',           1),
((SELECT id FROM products WHERE slug='msi-creator-17-a10se'), 'Display',   'Screen Size',   '17.3"',                     1),
((SELECT id FROM products WHERE slug='msi-creator-17-a10se'), 'Display',   'Resolution',    '3840 x 2160 (4K)',          2),
((SELECT id FROM products WHERE slug='msi-creator-17-a10se'), 'Display',   'Panel Type',    'Mini LED, 100% DCI-P3',     3),
((SELECT id FROM products WHERE slug='msi-creator-17-a10se'), 'Memory',    'RAM',           '32 GB DDR4',                1),
((SELECT id FROM products WHERE slug='msi-creator-17-a10se'), 'Storage',   'Primary Drive', '1 TB NVMe SSD',             1),
((SELECT id FROM products WHERE slug='msi-creator-17-a10se'), 'Design',    'Color',         'Silver',                    1),
((SELECT id FROM products WHERE slug='msi-creator-17-a10se'), 'Design',    'Weight',        '2.5 kg',                    2);

-- 4. MSI Trident X
INSERT INTO products (
    brand_id, category_id, subcategory_id,
    name, slug, short_description,
    base_price, stock_qty,
    is_featured, rating_avg, rating_count
) VALUES (
    (SELECT id FROM brands WHERE slug='msi'),
    (SELECT id FROM categories WHERE slug='desktops'),
    (SELECT id FROM subcategories WHERE slug='gaming-desktops'),
    'MSI Trident X Plus 9SE',
    'msi-trident-x-plus-9se',
    'Compact yet powerful gaming desktop — the centerpiece of gaming',
    2199.00, 6,
    TRUE, 4.60, 143
);

INSERT INTO product_specifications (product_id, spec_group, spec_name, spec_value, sort_order) VALUES
((SELECT id FROM products WHERE slug='msi-trident-x-plus-9se'), 'Processor',   'CPU Model',    'Intel Core i9-9900K',   1),
((SELECT id FROM products WHERE slug='msi-trident-x-plus-9se'), 'Processor',   'CPU Cores',    '8 Cores / 16 Threads',  2),
((SELECT id FROM products WHERE slug='msi-trident-x-plus-9se'), 'Graphics',    'GPU Model',    'NVIDIA RTX 2080 Super', 1),
((SELECT id FROM products WHERE slug='msi-trident-x-plus-9se'), 'Graphics',    'VRAM',         '8 GB GDDR6',            2),
((SELECT id FROM products WHERE slug='msi-trident-x-plus-9se'), 'Memory',      'RAM',          '32 GB DDR4 3200MHz',    1),
((SELECT id FROM products WHERE slug='msi-trident-x-plus-9se'), 'Storage',     'Primary',      '1 TB NVMe SSD',         1),
((SELECT id FROM products WHERE slug='msi-trident-x-plus-9se'), 'Storage',     'Secondary',    '2 TB HDD',              2),
((SELECT id FROM products WHERE slug='msi-trident-x-plus-9se'), 'Design',      'Form Factor',  'Small Form Factor',     1),
((SELECT id FROM products WHERE slug='msi-trident-x-plus-9se'), 'Design',      'Color',        'Black / RGB',           2),
((SELECT id FROM products WHERE slug='msi-trident-x-plus-9se'), 'Connectivity','Wi-Fi',        'Wi-Fi 6 (802.11ax)',    1);

-- 5. Alienware Pro Gaming Keyboard
INSERT INTO products (
    brand_id, category_id, subcategory_id,
    name, slug, short_description,
    base_price, sale_price, stock_qty,
    is_featured, rating_avg, rating_count
) VALUES (
    (SELECT id FROM brands WHERE slug='alienware'),
    (SELECT id FROM categories WHERE slug='peripherals'),
    (SELECT id FROM subcategories WHERE slug='gaming-keyboards'),
    'Alienware Pro Gaming Keyboard AW768',
    'alienware-pro-gaming-keyboard-aw768',
    'Full-size mechanical gaming keyboard with per-key AlienFX RGB lighting',
    129.00, 109.00, 42,
    TRUE, 4.50, 267
);

INSERT INTO product_specifications (product_id, spec_group, spec_name, spec_value, sort_order) VALUES
((SELECT id FROM products WHERE slug='alienware-pro-gaming-keyboard-aw768'), 'Switch',       'Type',            'Cherry MX Red (Linear)',        1),
((SELECT id FROM products WHERE slug='alienware-pro-gaming-keyboard-aw768'), 'Switch',       'Actuation Force', '45g',                           2),
((SELECT id FROM products WHERE slug='alienware-pro-gaming-keyboard-aw768'), 'Switch',       'Travel Distance', '2 mm actuation / 4 mm total',  3),
((SELECT id FROM products WHERE slug='alienware-pro-gaming-keyboard-aw768'), 'Lighting',     'Type',            'Per-key AlienFX RGB',           1),
((SELECT id FROM products WHERE slug='alienware-pro-gaming-keyboard-aw768'), 'Lighting',     'Zones',           '105',                           2),
((SELECT id FROM products WHERE slug='alienware-pro-gaming-keyboard-aw768'), 'Connectivity', 'Interface',       'USB-A (wired)',                  1),
((SELECT id FROM products WHERE slug='alienware-pro-gaming-keyboard-aw768'), 'Connectivity', 'Cable Length',    '1.8 m braided',                 2),
((SELECT id FROM products WHERE slug='alienware-pro-gaming-keyboard-aw768'), 'Design',       'Layout',          'Full-size (US)',                 1),
((SELECT id FROM products WHERE slug='alienware-pro-gaming-keyboard-aw768'), 'Design',       'Color',           'Dark Side of the Moon',         2),
((SELECT id FROM products WHERE slug='alienware-pro-gaming-keyboard-aw768'), 'Design',       'Weight',          '1.36 kg',                       3);

INSERT INTO product_variants (product_id, variant_name, color, color_hex, extra_price, stock_qty) VALUES
((SELECT id FROM products WHERE slug='alienware-pro-gaming-keyboard-aw768'), 'Cherry MX Red',  'Dark Gray', '#2D2D2D', 0.00, 42),
((SELECT id FROM products WHERE slug='alienware-pro-gaming-keyboard-aw768'), 'Cherry MX Brown','Dark Gray', '#2D2D2D', 0.00, 15);

-- 6. ROCCAT Kain 200 AIMO
INSERT INTO products (
    brand_id, category_id, subcategory_id,
    name, slug, short_description,
    base_price, stock_qty,
    is_new_arrival, rating_avg, rating_count
) VALUES (
    (SELECT id FROM brands WHERE slug='roccat'),
    (SELECT id FROM categories WHERE slug='peripherals'),
    (SELECT id FROM subcategories WHERE slug='gaming-mice'),
    'ROCCAT Kain 200 AIMO',
    'roccat-kain-200-aimo',
    'Wireless gaming mouse with AIMO RGB lighting and 16000 DPI optical sensor',
    89.00, 35,
    TRUE, 4.30, 189
);

INSERT INTO product_specifications (product_id, spec_group, spec_name, spec_value, sort_order) VALUES
((SELECT id FROM products WHERE slug='roccat-kain-200-aimo'), 'Sensor',       'Type',         'Optical',              1),
((SELECT id FROM products WHERE slug='roccat-kain-200-aimo'), 'Sensor',       'Max DPI',      '16000 DPI',            2),
((SELECT id FROM products WHERE slug='roccat-kain-200-aimo'), 'Sensor',       'Polling Rate', '1000 Hz',              3),
((SELECT id FROM products WHERE slug='roccat-kain-200-aimo'), 'Connectivity', 'Type',         'Wireless 2.4 GHz',     1),
((SELECT id FROM products WHERE slug='roccat-kain-200-aimo'), 'Connectivity', 'Battery Life', 'Up to 100 hours',      2),
((SELECT id FROM products WHERE slug='roccat-kain-200-aimo'), 'Lighting',     'Type',         'AIMO RGB',             1),
((SELECT id FROM products WHERE slug='roccat-kain-200-aimo'), 'Buttons',      'Count',        '6 programmable',       1),
((SELECT id FROM products WHERE slug='roccat-kain-200-aimo'), 'Design',       'Weight',       '120 g',                1),
((SELECT id FROM products WHERE slug='roccat-kain-200-aimo'), 'Design',       'Color',        'White / Black',        2);

INSERT INTO product_variants (product_id, variant_name, color, color_hex, extra_price, stock_qty) VALUES
((SELECT id FROM products WHERE slug='roccat-kain-200-aimo'), 'White', 'White', '#FFFFFF', 0.00, 20),
((SELECT id FROM products WHERE slug='roccat-kain-200-aimo'), 'Black', 'Black', '#1A1A1A', 0.00, 15);

-- 7. HP EliteBook 840 G8
INSERT INTO products (
    brand_id, category_id, subcategory_id,
    name, slug, short_description,
    base_price, stock_qty,
    rating_avg, rating_count
) VALUES (
    (SELECT id FROM brands WHERE slug='hp'),
    (SELECT id FROM categories WHERE slug='laptops'),
    (SELECT id FROM subcategories WHERE slug='business-laptops'),
    'HP EliteBook 840 G8',
    'hp-elitebook-840-g8',
    'Enterprise-grade 14" business laptop with Intel vPro and military-grade durability',
    1399.00, 21,
    4.60, 204
);

INSERT INTO product_specifications (product_id, spec_group, spec_name, spec_value, sort_order) VALUES
((SELECT id FROM products WHERE slug='hp-elitebook-840-g8'), 'Processor', 'CPU Model',     'Intel Core i7-1165G7',     1),
((SELECT id FROM products WHERE slug='hp-elitebook-840-g8'), 'Processor', 'vPro',          'Intel vPro supported',     2),
((SELECT id FROM products WHERE slug='hp-elitebook-840-g8'), 'Display',   'Screen Size',   '14"',                      1),
((SELECT id FROM products WHERE slug='hp-elitebook-840-g8'), 'Display',   'Resolution',    '1920 x 1080 (FHD)',        2),
((SELECT id FROM products WHERE slug='hp-elitebook-840-g8'), 'Memory',    'RAM',           '16 GB DDR4 3200MHz',       1),
((SELECT id FROM products WHERE slug='hp-elitebook-840-g8'), 'Storage',   'Primary Drive', '512 GB NVMe SSD',          1),
((SELECT id FROM products WHERE slug='hp-elitebook-840-g8'), 'Security',  'Fingerprint',   'Yes',                      1),
((SELECT id FROM products WHERE slug='hp-elitebook-840-g8'), 'Security',  'IR Camera',     'Yes (Windows Hello)',      2),
((SELECT id FROM products WHERE slug='hp-elitebook-840-g8'), 'Battery',   'Capacity',      '53 Whr',                   1),
((SELECT id FROM products WHERE slug='hp-elitebook-840-g8'), 'Battery',   'Battery Life',  'Up to 13 hours',           2),
((SELECT id FROM products WHERE slug='hp-elitebook-840-g8'), 'Design',    'Color',         'Silver',                   1),
((SELECT id FROM products WHERE slug='hp-elitebook-840-g8'), 'Design',    'Weight',        '1.37 kg',                  2);

-- 8. NVIDIA RTX 3080
INSERT INTO products (
    brand_id, category_id, subcategory_id,
    name, slug, short_description,
    base_price, stock_qty,
    is_featured, is_best_seller, rating_avg, rating_count
) VALUES (
    (SELECT id FROM brands WHERE slug='nvidia'),
    (SELECT id FROM categories WHERE slug='components'),
    (SELECT id FROM subcategories WHERE slug='graphics-cards'),
    'NVIDIA GeForce RTX 3080 Founders Edition',
    'nvidia-rtx-3080-founders-edition',
    'Flagship Ampere GPU — the definitive 4K gaming card',
    699.00, 4,
    TRUE, TRUE, 4.90, 512
);

INSERT INTO product_specifications (product_id, spec_group, spec_name, spec_value, sort_order) VALUES
((SELECT id FROM products WHERE slug='nvidia-rtx-3080-founders-edition'), 'GPU',         'Architecture', 'NVIDIA Ampere',                     1),
((SELECT id FROM products WHERE slug='nvidia-rtx-3080-founders-edition'), 'GPU',         'CUDA Cores',   '8704',                              2),
((SELECT id FROM products WHERE slug='nvidia-rtx-3080-founders-edition'), 'GPU',         'Boost Clock',  '1710 MHz',                          3),
((SELECT id FROM products WHERE slug='nvidia-rtx-3080-founders-edition'), 'Memory',      'VRAM',         '10 GB GDDR6X',                      1),
((SELECT id FROM products WHERE slug='nvidia-rtx-3080-founders-edition'), 'Memory',      'Memory Bus',   '320-bit',                           2),
((SELECT id FROM products WHERE slug='nvidia-rtx-3080-founders-edition'), 'Memory',      'Bandwidth',    '760 GB/s',                          3),
((SELECT id FROM products WHERE slug='nvidia-rtx-3080-founders-edition'), 'Performance', 'Ray Tracing',  'Yes (2nd Gen)',                     1),
((SELECT id FROM products WHERE slug='nvidia-rtx-3080-founders-edition'), 'Performance', 'DLSS',         'Yes (2.0)',                          2),
((SELECT id FROM products WHERE slug='nvidia-rtx-3080-founders-edition'), 'Power',       'TDP',          '320W',                              1),
((SELECT id FROM products WHERE slug='nvidia-rtx-3080-founders-edition'), 'Power',       'Recommended PSU','750W',                            2),
((SELECT id FROM products WHERE slug='nvidia-rtx-3080-founders-edition'), 'Ports',       'Video Out',    '3x DisplayPort 1.4a, 1x HDMI 2.1', 1),
((SELECT id FROM products WHERE slug='nvidia-rtx-3080-founders-edition'), 'Design',      'Slot Width',   '2-slot',                            2),
((SELECT id FROM products WHERE slug='nvidia-rtx-3080-founders-edition'), 'Design',      'Length',       '285 mm',                            3);
