import { Suspense } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getShopProducts, getBrands, getCategoriesWithSubcategories, getFliersByCategory, getFliersBySubcategory } from '@/lib/queries'
import { ProductCard } from '@/components/product/ProductCard'
import { ShopFilters, MobileFiltersPanel } from '@/components/shop/ShopFilters'
import { HeroCarousel } from '@/components/layout/HeroCarousel'

interface Props {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<{
    q?: string; page?: string; brand?: string
    minPrice?: string; maxPrice?: string; inStock?: string
    rating?: string; sort?: string; tag?: string
  }>
}

function buildPageHref(
  base: string,
  sp: Record<string, string | undefined>,
  targetPage: number,
) {
  const p = new URLSearchParams()
  const keys = ['q', 'brand', 'minPrice', 'maxPrice', 'inStock', 'rating', 'sort', 'tag']
  for (const k of keys) if (sp[k]) p.set(k, sp[k]!)
  if (targetPage > 1) p.set('page', String(targetPage))
  const qs = p.toString()
  return base + (qs ? '?' + qs : '')
}

export default async function ShopPage({ params, searchParams }: Props) {
  const { slug } = await params
  const sp = await searchParams

  const { q, page: pageParam, brand, minPrice, maxPrice, inStock, rating, sort, tag } = sp

  const categorySlug    = slug?.[0]
  const subcategorySlug = slug?.[1]
  const page            = parseInt(pageParam ?? '1', 10)
  const pageSize        = 12

  const [navData, brands, fliers] = await Promise.all([
    getCategoriesWithSubcategories().catch(() => []),
    getBrands().catch(() => []),
    subcategorySlug
      ? getFliersBySubcategory(subcategorySlug).catch(() => [])
      : categorySlug
        ? getFliersByCategory(categorySlug).catch(() => [])
        : Promise.resolve([]),
  ])

  const currentCategory = navData.find((c) => c.slug === categorySlug)
  const subcategories   = currentCategory?.subcategories ?? []

  const { products, total } = await getShopProducts({
    categorySlug,
    subcategorySlug,
    q,
    brandSlug:  brand,
    minPrice:   minPrice  ? Number(minPrice)  : undefined,
    maxPrice:   maxPrice  ? Number(maxPrice)  : undefined,
    inStock:    inStock   === '1',
    minRating:  rating    ? Number(rating)    : undefined,
    isNew:      tag       === 'new',
    isBest:     tag       === 'best',
    sort,
    page,
    pageSize,
  }).catch(() => ({ products: [], total: 0 }))

  const totalPages = Math.ceil(total / pageSize)

  let pageTitle = 'All Products'
  if (q) pageTitle = `Search: "${q}"`
  else if (subcategorySlug) pageTitle = subcategories.find((s) => s.slug === subcategorySlug)?.name ?? subcategorySlug
  else if (categorySlug)    pageTitle = currentCategory?.name ?? categorySlug

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    ...(categorySlug    ? [{ label: currentCategory?.name ?? categorySlug, href: `/shop/${categorySlug}` }]                    : []),
    ...(subcategorySlug ? [{ label: pageTitle, href: `/shop/${categorySlug}/${subcategorySlug}` }] : []),
  ]

  const basePath = `/shop${categorySlug ? `/${categorySlug}` : ''}${subcategorySlug ? `/${subcategorySlug}` : ''}`

  const filterProps = { brands, subcategories, categorySlug, subcategorySlug }

  return (
    <div className="max-w-7xl mx-auto px-4 ">

      {/* Hero Flier Carousel — shown on category / subcategory pages */}
      {fliers.length > 0 && <HeroCarousel fliers={fliers} />}

      <div className="flex gap-8 items-start">

        {/* Filter Sidebar — desktop */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="bg-zinc-100 border border-zinc-200 rounded-xl p-4 sticky top-24">
            <Suspense fallback={<p className="text-sm text-zinc-400">Loading…</p>}>
              <ShopFilters {...filterProps} />
            </Suspense>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">

          {/* Mobile filter toggle */}
          <Suspense>
            <MobileFiltersPanel {...filterProps} />
          </Suspense>

          {/* Product grid */}
          {products.length === 0 ? (
            <div className="text-center py-24 text-zinc-500">
              <p className="text-lg mb-2">No products found</p>
              <p className="text-sm mb-4 text-zinc-400">Try adjusting or clearing the filters.</p>
              <Link href="/shop" className="text-sm text-brand-600 hover:underline">Browse all products</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={buildPageHref(basePath, sp as Record<string, string | undefined>, p)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    p === page
                      ? 'bg-brand-600 text-white'
                      : 'bg-zinc-100 border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-400'
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
