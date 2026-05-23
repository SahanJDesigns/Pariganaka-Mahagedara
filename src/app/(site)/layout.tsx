import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { getCategoriesWithSubcategories } from '@/lib/queries'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategoriesWithSubcategories().catch(() => [])

  return (
    <>
      <Header categories={categories} />
      <main className="min-h-screen">{children}</main>
      <Footer categories={categories.slice(0, 4)} />
      <CartDrawer />
    </>
  )
}
