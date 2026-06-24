
import { Zap, Shield, Truck, Headphones } from 'lucide-react'
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
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Best Sellers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">New Arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
