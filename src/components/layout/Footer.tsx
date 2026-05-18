import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { Logo } from '../Logo'

const LINKS = {
  Shop: [
    { label: 'Laptops', href: '/shop/laptops' },
    { label: 'Desktops', href: '/shop/desktops' },
    { label: 'Components', href: '/shop/components' },
    { label: 'Peripherals', href: '/shop/peripherals' },
    { label: 'Monitors', href: '/shop/monitors' },
  ],
  Support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Returns', href: '/returns' },
    { label: 'Warranty', href: '/warranty' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex mb-4">
             <Logo />
            </Link>
            <p className="text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed">
              Your one-stop shop for gaming PCs, laptops, components, and peripherals.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {['Twitter', 'YouTube', 'Instagram', 'GitHub'].map((name) => (
                <a key={name} href="#" className="p-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg transition-colors" title={name}>
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-zinc-900 dark:text-white font-semibold text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 text-sm transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-400 dark:text-zinc-600 text-xs">
          <p>© {new Date().getFullYear()} TechStore. All rights reserved.</p>
          <p>Built with Next.js + Supabase</p>
        </div>
      </div>
    </footer>
  )
}
