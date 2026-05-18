import Link from 'next/link'
import { ArrowRight, Zap, Shield, Truck, Headphones } from 'lucide-react'
import { getFeaturedProducts, getNewArrivals, getBestSellers } from '@/lib/queries'
import { ProductCard } from '@/components/product/ProductCard'
import { HeroCarousel } from '@/components/layout/HeroCarousel'

const CATEGORIES = [
  { name: 'Gaming Laptops',  slug: 'laptops/gaming-laptops',    icon: '💻', color: 'from-red-100 to-red-50 dark:from-red-900/40 dark:to-red-800/20' },
  { name: 'Gaming Desktops', slug: 'desktops/gaming-desktops',  icon: '🖥️', color: 'from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-800/20' },
  { name: 'Graphics Cards',  slug: 'components/graphics-cards', icon: '🎮', color: 'from-green-100 to-green-50 dark:from-green-900/40 dark:to-green-800/20' },
  { name: 'Peripherals',     slug: 'peripherals',                icon: '⌨️', color: 'from-orange-100 to-orange-50 dark:from-orange-900/40 dark:to-orange-800/20' },
  { name: 'Monitors',        slug: 'monitors',                   icon: '🖥', color: 'from-pink-100 to-pink-50 dark:from-pink-900/40 dark:to-pink-800/20' },
  { name: 'Storage',         slug: 'storage',                    icon: '💾', color: 'from-cyan-100 to-cyan-50 dark:from-cyan-900/40 dark:to-cyan-800/20' },
]

const PERKS = [
  { icon: Truck,      title: 'Free Shipping',   desc: 'On orders over $100' },
  { icon: Shield,     title: '2-Year Warranty', desc: 'On all products' },
  { icon: Zap,        title: 'Fast Delivery',   desc: '1-3 business days' },
  { icon: Headphones, title: '24/7 Support',    desc: 'Always here to help' },
]

export default async function HomePage() {
  const [featured, newArrivals, bestSellers] = await Promise.all([
    getFeaturedProducts().catch(() => []),
    getNewArrivals().catch(() => []),
    getBestSellers().catch(() => []),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4">

      <HeroCarousel />

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Featured Products</h2>
            <Link href="/shop?featured=true" className="text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 flex items-center gap-1">
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
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Best Sellers</h2>
                <Link href="/shop?best=true" className="text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 flex items-center gap-1">
                  More <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {bestSellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
          {newArrivals.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">New Arrivals</h2>
                <Link href="/shop?new=true" className="text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 flex items-center gap-1">
                  More <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Promo Banner */}
      <section className="mb-16 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/40 dark:to-orange-900/40 border border-red-200 dark:border-red-800/40 p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Build Your Dream PC</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">Get expert advice on choosing the right components for your setup.</p>
        <Link href="/shop/components" className="inline-flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-100 px-6 py-3 rounded-xl font-semibold transition-colors">
          Browse Components <ArrowRight size={16} />
        </Link>
      </section>

    </div>
  )
}
