import type { Metadata } from 'next'
import { Inter, Noto_Sans_Sinhala } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sinhala.variable}>
      <body className={`${inter.className} bg-white text-zinc-900 antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
