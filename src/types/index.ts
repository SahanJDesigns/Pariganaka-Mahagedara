export interface Flier {
  id: string
  title: string
  mobile_image_url: string
  tablet_image_url: string
  desktop_image_url: string
  alt_text: string | null
  link_url: string | null
  sort_order: number
  is_active: boolean
  show_on_home: boolean
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo_url: string | null
  website_url: string | null
  is_active: boolean
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  icon: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface Subcategory {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  category?: Category
}

export type CategoryWithSubcategories = Category & {
  subcategories: Subcategory[]
}

export interface Product {
  id: string
  name: string
  slug: string
  short_description: string | null
  description: string | null
  sku: string | null
  base_price: number
  sale_price: number | null
  cost_price: number | null
  stock_qty: number
  low_stock_threshold: number
  weight_kg: number | null
  is_featured: boolean
  is_new_arrival: boolean
  is_best_seller: boolean
  is_active: boolean
  meta_title: string | null
  meta_description: string | null
  rating_avg: number
  rating_count: number
  created_at: string
  updated_at: string
  brand?: Brand
  category?: Category
  subcategory?: Subcategory
  images?: ProductImage[]
  specifications?: ProductSpecification[]
  variants?: ProductVariant[]
}

export interface ProductImage {
  id: string
  url: string
  alt_text: string | null
  is_primary: boolean
  sort_order: number
}

export interface ProductSpecification {
  id: string
  spec_group: string
  spec_name: string
  spec_value: string
  sort_order: number
}

export interface ProductVariant {
  id: string
  variant_name: string
  color: string | null
  color_hex: string | null
  storage_gb: number | null
  ram_gb: number | null
  extra_price: number
  stock_qty: number
  sku_suffix: string | null
  is_active: boolean
}

export interface CartItem {
  product: Product
  variant: ProductVariant | null
  quantity: number
}
