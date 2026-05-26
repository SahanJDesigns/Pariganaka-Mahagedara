import Link from 'next/link'
import { ArrowRight, Zap, Shield, Truck, Headphones } from 'lucide-react'
import { getFeaturedProducts, getNewArrivals, getBestSellers, getFliers } from '@/lib/queries'
import { ProductCard } from '@/components/product/ProductCard'
import { HeroCarousel } from '@/components/layout/HeroCarousel'

const PERKS = [
  { icon: Truck,      title: 'Free Shipping',   desc: 'On orders over Rs. 15,000' },
  { icon: Shield,     title: '2-Year Warranty', desc: 'On all products' },
  { icon: Zap,        title: 'Fast Delivery',   desc: '1-3 business days' },
  { icon: Headphones, title: '24/7 Support',    desc: 'Always here to help' },
]

export const revalidate = 60

export default async function HomePage() {
  const [featured, newArrivals, bestSellers, fliers] = await Promise.all([
    getFeaturedProducts().catch(() => []),
    getNewArrivals().catch(() => []),
    getBestSellers().catch(() => []),
    getFliers().catch(() => []),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4">

      <HeroCarousel fliers={fliers} />

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-zinc-900">Featured Products</h2>
            <Link href="/shop?featured=true" className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Best Sellers + New Arrivals */}
      {(bestSellers.length > 0 || newArrivals.length > 0) && (
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {bestSellers.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-zinc-900">Best Sellers</h2>
                <Link href="/shop?best=true" className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1">
                  More <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bestSellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
          {newArrivals.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-zinc-900">New Arrivals</h2>
                <Link href="/shop?new=true" className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1">
                  More <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

    </div>
  )
}
