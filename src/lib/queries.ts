import { sanityClient } from './sanity'
import type { Brand, Category, CategoryWithSubcategories, Flier, Subcategory, Product } from '@/types'

const BRAND_FIELDS = `
  "id": _id,
  name,
  "slug": slug.current,
  "logo_url": logo.asset->url,
  website_url,
  is_active,
  "created_at": _createdAt
`

const CATEGORY_FIELDS = `
  "id": _id,
  name,
  "slug": slug.current,
  description,
  "image_url": image.asset->url,
  icon,
  sort_order,
  is_active,
  "created_at": _createdAt
`

const SUBCATEGORY_FIELDS = `
  "id": _id,
  name,
  "slug": slug.current,
  description,
  "image_url": image.asset->url,
  sort_order,
  is_active,
  "created_at": _createdAt
`

const PRODUCT_FIELDS = `
  "id": _id,
  name,
  "slug": slug.current,
  short_description,
  description,
  sku,
  base_price,
  sale_price,
  cost_price,
  stock_qty,
  low_stock_threshold,
  weight_kg,
  is_featured,
  is_new_arrival,
  is_best_seller,
  is_active,
  meta_title,
  meta_description,
  rating_avg,
  rating_count,
  "created_at": _createdAt,
  "updated_at": _updatedAt,
  "brand": brand->{ ${BRAND_FIELDS} },
  "category": category->{ ${CATEGORY_FIELDS} },
  "subcategory": subcategory->{ ${SUBCATEGORY_FIELDS} },
  "images": images[]{ "id": _key, "url": coalesce(url, image.asset->url), alt_text, is_primary, sort_order }
`

const PRODUCT_FIELDS_FULL = `
  ${PRODUCT_FIELDS},
  "specifications": specifications[]{ "id": _key, spec_group, spec_name, spec_value, sort_order },
  "variants": variants[]{ "id": _key, variant_name, color, color_hex, storage_gb, ram_gb, extra_price, stock_qty, sku_suffix, is_active }
`

export async function getCategories(): Promise<Category[]> {
  return sanityClient.fetch(
    `*[_type == "category" && is_active == true] | order(sort_order asc) { ${CATEGORY_FIELDS} }`
  )
}

export async function getCategoriesWithSubcategories(): Promise<CategoryWithSubcategories[]> {
  return sanityClient.fetch(
    `*[_type == "category" && is_active == true] | order(sort_order asc) {
      ${CATEGORY_FIELDS},
      "subcategories": *[_type == "subcategory" && references(^._id) && is_active == true] | order(sort_order asc) {
        ${SUBCATEGORY_FIELDS}
      }
    }`
  )
}

export async function getSubcategoriesByCategory(categorySlug: string): Promise<Subcategory[]> {
  return sanityClient.fetch(
    `*[_type == "subcategory" && is_active == true && category->slug.current == $categorySlug] | order(sort_order asc) {
      ${SUBCATEGORY_FIELDS},
      "category": category->{ ${CATEGORY_FIELDS} }
    }`,
    { categorySlug }
  )
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && is_featured == true && is_active == true] | order(_createdAt desc) [0..7] { ${PRODUCT_FIELDS} }`
  )
}

export async function getNewArrivals(): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && is_new_arrival == true && is_active == true] | order(_createdAt desc) [0..3] { ${PRODUCT_FIELDS} }`
  )
}

export async function getBestSellers(): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && is_best_seller == true && is_active == true] [0..3] { ${PRODUCT_FIELDS} }`
  )
}

export async function getProductsByCategory(
  categorySlug: string,
  subcategorySlug?: string,
  page = 1,
  pageSize = 12
): Promise<{ products: Product[]; total: number }> {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  const hasSub = !!subcategorySlug

  return sanityClient.fetch(
    `{
      "total": count(*[
        _type == "product" && is_active == true &&
        category->slug.current == $categorySlug &&
        (!$hasSub || subcategory->slug.current == $subcategorySlug)
      ]),
      "products": *[
        _type == "product" && is_active == true &&
        category->slug.current == $categorySlug &&
        (!$hasSub || subcategory->slug.current == $subcategorySlug)
      ] | order(_createdAt desc) [$from..$to] { ${PRODUCT_FIELDS} }
    }`,
    { categorySlug, subcategorySlug: subcategorySlug ?? '', hasSub, from, to }
  )
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return sanityClient.fetch(
    `*[_type == "product" && slug.current == $slug && is_active == true][0] { ${PRODUCT_FIELDS_FULL} }`,
    { slug }
  )
}

export async function searchProducts(query: string): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && is_active == true && name match $q] [0..9] { ${PRODUCT_FIELDS} }`,
    { q: `*${query}*` }
  )
}

export async function getBrands(): Promise<Brand[]> {
  return sanityClient.fetch(
    `*[_type == "brand" && is_active == true] | order(name asc) { ${BRAND_FIELDS} }`
  )
}

export async function getFliers(): Promise<Flier[]> {
  return sanityClient.fetch(
    `*[_type == "flier" && is_active == true] | order(sort_order asc) {
      "id": _id,
      title,
      "image_url": coalesce(image_url, image.asset->url),
      alt_text,
      link_url,
      sort_order,
      is_active
    }`
  )
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

export async function getShopProducts(
  filters: ShopProductFilters = {}
): Promise<{ products: Product[]; total: number }> {
  const {
    categorySlug, subcategorySlug, brandSlug,
    minPrice, maxPrice, inStock, minRating, isNew, isBest,
    sort, q, page = 1, pageSize = 12,
  } = filters

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let orderClause: string
  switch (sort) {
    case 'price_asc':  orderClause = 'base_price asc';  break
    case 'price_desc': orderClause = 'base_price desc'; break
    case 'rating':     orderClause = 'rating_avg desc'; break
    default:           orderClause = '_createdAt desc'
  }

  const params = {
    hasCat:      !!categorySlug,
    categorySlug: categorySlug ?? '',
    hasSub:      !!subcategorySlug,
    subcategorySlug: subcategorySlug ?? '',
    hasBrand:    !!brandSlug,
    brandSlug:   brandSlug ?? '',
    hasQ:        !!q,
    q:           q ? `*${q}*` : '',
    hasMinPrice: minPrice !== undefined,
    minPrice:    minPrice ?? 0,
    hasMaxPrice: maxPrice !== undefined,
    maxPrice:    maxPrice ?? 0,
    inStock:     !!inStock,
    hasMinRating: minRating !== undefined,
    minRating:   minRating ?? 0,
    isNew:       !!isNew,
    isBest:      !!isBest,
    from,
    to,
  }

  const filter = `
    _type == "product" && is_active == true &&
    (!$hasCat      || category->slug.current    == $categorySlug) &&
    (!$hasSub      || subcategory->slug.current == $subcategorySlug) &&
    (!$hasBrand    || brand->slug.current       == $brandSlug) &&
    (!$hasQ        || name match $q) &&
    (!$hasMinPrice || base_price >= $minPrice) &&
    (!$hasMaxPrice || base_price <= $maxPrice) &&
    (!$inStock     || stock_qty > 0) &&
    (!$hasMinRating|| rating_avg >= $minRating) &&
    (!$isNew       || is_new_arrival == true) &&
    (!$isBest      || is_best_seller == true)
  `

  return sanityClient.fetch(
    `{
      "total": count(*[${filter}]),
      "products": *[${filter}] | order(${orderClause}) [$from..$to] { ${PRODUCT_FIELDS} }
    }`,
    params
  )
}
