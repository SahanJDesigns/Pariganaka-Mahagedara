import { supabase } from './supabase'
import type { Brand, Category, CategoryWithSubcategories, Subcategory, Product } from '@/types'

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  if (error) throw error
  return data
}

export async function getCategoriesWithSubcategories(): Promise<CategoryWithSubcategories[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*, subcategories(*)')
    .eq('is_active', true)
    .order('sort_order')
  if (error) throw error
  return (data ?? []) as CategoryWithSubcategories[]
}

export async function getSubcategoriesByCategory(categorySlug: string): Promise<Subcategory[]> {
  const { data, error } = await supabase
    .from('subcategories')
    .select('*, category:categories(*)')
    .eq('categories.slug', categorySlug)
    .eq('is_active', true)
    .order('sort_order')
  if (error) throw error
  return data
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, brand:brands(*), category:categories(*), subcategory:subcategories(*), images:product_images(*)')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(8)
  if (error) throw error
  return data
}

export async function getNewArrivals(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, brand:brands(*), category:categories(*), subcategory:subcategories(*), images:product_images(*)')
    .eq('is_new_arrival', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(4)
  if (error) throw error
  return data
}

export async function getBestSellers(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, brand:brands(*), category:categories(*), subcategory:subcategories(*), images:product_images(*)')
    .eq('is_best_seller', true)
    .eq('is_active', true)
    .limit(4)
  if (error) throw error
  return data
}

export async function getProductsByCategory(
  categorySlug: string,
  subcategorySlug?: string,
  page = 1,
  pageSize = 12
): Promise<{ products: Product[]; total: number }> {
  let query = supabase
    .from('products')
    .select(
      '*, brand:brands(*), category:categories!inner(*), subcategory:subcategories(*), images:product_images(*)',
      { count: 'exact' }
    )
    .eq('categories.slug', categorySlug)
    .eq('is_active', true)

  if (subcategorySlug) {
    query = query.eq('subcategories.slug', subcategorySlug)
  }

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  const { data, error, count } = await query.range(from, to).order('created_at', { ascending: false })
  if (error) throw error
  return { products: data ?? [], total: count ?? 0 }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select(
      '*, brand:brands(*), category:categories(*), subcategory:subcategories(*), images:product_images(*), specifications:product_specifications(*), variants:product_variants(*)'
    )
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  if (error) return null
  return data
}

export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, brand:brands(*), category:categories(*), subcategory:subcategories(*), images:product_images(*)')
    .ilike('name', `%${query}%`)
    .eq('is_active', true)
    .limit(10)
  if (error) throw error
  return data
}

export async function getBrands(): Promise<Brand[]> {
  const { data } = await supabase
    .from('brands')
    .select('*')
    .eq('is_active', true)
    .order('name')
  return (data ?? []) as Brand[]
}

export interface ShopProductFilters {
  categorySlug?: string
  subcategorySlug?: string
  brandSlug?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  minRating?: number
  isNew?: boolean
  isBest?: boolean
  sort?: string
  q?: string
  page?: number
  pageSize?: number
}

export async function getShopProducts(filters: ShopProductFilters = {}): Promise<{ products: Product[]; total: number }> {
  const {
    categorySlug, subcategorySlug, brandSlug,
    minPrice, maxPrice, inStock, minRating, isNew, isBest,
    sort, q, page = 1, pageSize = 12,
  } = filters

  let brandId: number | null = null
  if (brandSlug) {
    const { data } = await supabase.from('brands').select('id').eq('slug', brandSlug).eq('is_active', true).single()
    brandId = data?.id ?? null
    if (!brandId) return { products: [], total: 0 }
  }

  const sel = categorySlug
    ? '*, brand:brands(*), category:categories!inner(*), subcategory:subcategories(*), images:product_images(*)'
    : '*, brand:brands(*), category:categories(*), subcategory:subcategories(*), images:product_images(*)'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = supabase.from('products').select(sel, { count: 'exact' }).eq('is_active', true)

  if (categorySlug)            query = query.eq('categories.slug', categorySlug)
  if (subcategorySlug)         query = query.eq('subcategories.slug', subcategorySlug)
  if (q)                       query = query.ilike('name', `%${q}%`)
  if (brandId)                 query = query.eq('brand_id', brandId)
  if (minPrice !== undefined)  query = query.gte('base_price', minPrice)
  if (maxPrice !== undefined)  query = query.lte('base_price', maxPrice)
  if (inStock)                 query = query.gt('stock_qty', 0)
  if (minRating !== undefined) query = query.gte('rating_avg', minRating)
  if (isNew)                   query = query.eq('is_new_arrival', true)
  if (isBest)                  query = query.eq('is_best_seller', true)

  switch (sort) {
    case 'price_asc':  query = query.order('base_price', { ascending: true });  break
    case 'price_desc': query = query.order('base_price', { ascending: false }); break
    case 'rating':     query = query.order('rating_avg',  { ascending: false }); break
    default:           query = query.order('created_at',  { ascending: false })
  }

  const from = (page - 1) * pageSize
  const { data, count } = await query.range(from, from + pageSize - 1)
  return { products: (data ?? []) as Product[], total: count ?? 0 }
}
