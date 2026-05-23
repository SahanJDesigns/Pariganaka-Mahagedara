'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react'
import type { Brand, Subcategory } from '@/types'

interface Props {
  brands: Brand[]
  subcategories?: Subcategory[]
  categorySlug?: string
  subcategorySlug?: string
}

const SORT_OPTIONS = [
  { value: '',           label: 'Newest' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Best Rated' },
]

const RATING_OPTIONS = [
  { value: '',  label: 'Any rating' },
  { value: '4', label: '4★ & up' },
  { value: '3', label: '3★ & up' },
]

export function ShopFilters({ brands, subcategories, categorySlug, subcategorySlug }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pSort    = searchParams.get('sort')     ?? ''
  const pBrand   = searchParams.get('brand')    ?? ''
  const pMin     = searchParams.get('minPrice') ?? ''
  const pMax     = searchParams.get('maxPrice') ?? ''
  const pInStock = searchParams.get('inStock')  === '1'
  const pRating  = searchParams.get('rating')   ?? ''
  const pTag     = searchParams.get('tag')      ?? ''

  const [minPrice, setMinPrice] = useState(pMin)
  const [maxPrice, setMaxPrice] = useState(pMax)

  useEffect(() => { setMinPrice(pMin) }, [pMin])
  useEffect(() => { setMaxPrice(pMax) }, [pMax])

  const hasFilters = !!(pBrand || pMin || pMax || pInStock || pRating || pTag)

  const setParam = useCallback((key: string, value: string | null) => {
    const p = new URLSearchParams(searchParams.toString())
    if (value) p.set(key, value)
    else p.delete(key)
    p.delete('page')
    router.push(`${pathname}?${p.toString()}`, { scroll: false })
  }, [searchParams, pathname, router])

  const clearAll = () => router.push(pathname, { scroll: false })

  const applyPrice = () => {
    const p = new URLSearchParams(searchParams.toString())
    if (minPrice) p.set('minPrice', minPrice); else p.delete('minPrice')
    if (maxPrice) p.set('maxPrice', maxPrice); else p.delete('maxPrice')
    p.delete('page')
    router.push(`${pathname}?${p.toString()}`, { scroll: false })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
          <SlidersHorizontal size={14} /> Filters
        </h3>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 transition-colors"
          >
            <X size={11} /> Clear all
          </button>
        )}
      </div>

      {/* Sort */}
      <FilterSection title="Sort By" defaultOpen>
        <select
          value={pSort}
          onChange={(e) => setParam('sort', e.target.value || null)}
          className="w-full bg-white border border-zinc-200 text-zinc-900 text-sm rounded-lg px-3 py-2 outline-none focus:border-brand-600 transition-colors cursor-pointer"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" defaultOpen>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min Rs."
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full bg-white border border-zinc-200 text-zinc-900 text-sm rounded-lg px-2.5 py-1.5 outline-none focus:border-brand-600 transition-colors placeholder-zinc-400"
          />
          <span className="text-zinc-400 text-xs shrink-0">–</span>
          <input
            type="number"
            min={0}
            placeholder="Max Rs."
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-white border border-zinc-200 text-zinc-900 text-sm rounded-lg px-2.5 py-1.5 outline-none focus:border-brand-600 transition-colors placeholder-zinc-400"
          />
        </div>
        <button
          onClick={applyPrice}
          className="mt-2 w-full py-1.5 rounded-lg text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-700 transition-colors"
        >
          Apply
        </button>
      </FilterSection>

      {/* Brand */}
      {brands.length > 0 && (
        <FilterSection title="Brand" defaultOpen>
          <div className="space-y-0.5 max-h-44 overflow-y-auto pr-1">
            {brands.map((b) => (
              <label
                key={b.id}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-zinc-200/60 cursor-pointer"
              >
                <input
                  type="radio"
                  name="brand-filter"
                  checked={pBrand === b.slug}
                  onChange={() => setParam('brand', pBrand === b.slug ? null : b.slug)}
                  onClick={() => { if (pBrand === b.slug) setParam('brand', null) }}
                  className="accent-brand-600 shrink-0"
                />
                <span className="text-sm text-zinc-700 leading-none">{b.name}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      )}

      {/* Availability */}
      <FilterSection title="Availability" defaultOpen>
        <label className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-zinc-200/60 cursor-pointer">
          <input
            type="checkbox"
            checked={pInStock}
            onChange={(e) => setParam('inStock', e.target.checked ? '1' : null)}
            className="accent-brand-600 shrink-0"
          />
          <span className="text-sm text-zinc-700">In Stock Only</span>
        </label>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Min Rating" defaultOpen>
        <div className="space-y-0.5">
          {RATING_OPTIONS.map((o) => (
            <label
              key={o.value}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-zinc-200/60 cursor-pointer"
            >
              <input
                type="radio"
                name="rating-filter"
                checked={pRating === o.value}
                onChange={() => setParam('rating', o.value || null)}
                className="accent-brand-600 shrink-0"
              />
              <span className="text-sm text-zinc-700">{o.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Collection */}
      <FilterSection title="Collection" defaultOpen>
        <div className="space-y-0.5">
          {[
            { value: '',     label: 'All' },
            { value: 'new',  label: 'New Arrivals' },
            { value: 'best', label: 'Best Sellers' },
          ].map((o) => (
            <label
              key={o.value}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-zinc-200/60 cursor-pointer"
            >
              <input
                type="radio"
                name="tag-filter"
                checked={pTag === o.value}
                onChange={() => setParam('tag', o.value || null)}
                className="accent-brand-600 shrink-0"
              />
              <span className="text-sm text-zinc-700">{o.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Subcategories — only shown when on a category page */}
      {subcategories && subcategories.length > 0 && categorySlug && (
        <FilterSection title="Subcategory" defaultOpen>
          <div className="space-y-0.5">
            <Link
              href={`/shop/${categorySlug}`}
              className={`block px-2 py-1.5 rounded-lg text-sm transition-colors ${
                !subcategorySlug
                  ? 'text-brand-600 font-medium'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60'
              }`}
            >
              All
            </Link>
            {subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/shop/${categorySlug}/${sub.slug}`}
                className={`block px-2 py-1.5 rounded-lg text-sm transition-colors ${
                  subcategorySlug === sub.slug
                    ? 'text-brand-600 font-medium'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60'
                }`}
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </FilterSection>
      )}
    </div>
  )
}

function FilterSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-t border-zinc-200 py-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-sm font-medium text-zinc-800 mb-2"
      >
        {title}
        <ChevronDown
          size={14}
          className={`text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && children}
    </div>
  )
}

/* ── Mobile wrapper ─────────────────────────────────────────── */

export function MobileFiltersPanel(props: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden mb-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-4 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={15} />
          Filters &amp; Sort
        </span>
        <ChevronDown
          size={15}
          className={`text-zinc-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="mt-2 bg-zinc-100 border border-zinc-200 rounded-xl p-4">
          <ShopFilters {...props} />
        </div>
      )}
    </div>
  )
}
