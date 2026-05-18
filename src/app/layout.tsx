import type { Metadata } from 'next'
import { Inter, Noto_Sans_Sinhala } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { CartProvider } from '@/context/CartContext'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { getCategoriesWithSubcategories } from '@/lib/queries'

const inter = Inter({ subsets: ['latin'] })

const sinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-sinhala',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'TechStore — Gaming PCs, Laptops & Components', template: '%s | TechStore' },
  description: 'Your one-stop shop for gaming laptops, desktops, components, and peripherals.',
}

const themeScript = `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t!=='light')}catch(e){document.documentElement.classList.add('dark')}})();`

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategoriesWithSubcategories().catch(() => [])

  return (
    <html lang="en" className={`dark ${sinhala.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white antialiased`}>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>
          <CartProvider>
            <Header categories={categories} />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
