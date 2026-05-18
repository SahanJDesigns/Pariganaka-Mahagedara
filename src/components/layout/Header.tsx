'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import type { CategoryWithSubcategories } from '@/types'
import Image from 'next/image'
import { Logo } from '../Logo'

const PRIMARY_COUNT = 4

interface HeaderProps {
  categories?: CategoryWithSubcategories[]
}

function MobileCatRow({
  cat,
  expanded,
  setExpanded,
  onClose,
}: {
  cat: CategoryWithSubcategories
  expanded: string | null
  setExpanded: (v: string | null) => void
  onClose: () => void
}) {
  const hasChildren = (cat.subcategories?.length ?? 0) > 0
  return (
    <div>
      <div className="flex items-center">
        <Link
          href={`/shop/${cat.slug}`}
          onClick={onClose}
          className="flex-1 px-3 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
        >
          {cat.name}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setExpanded(expanded === cat.slug ? null : cat.slug)}
            className="p-2.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <ChevronDown
              size={15}
              className={`transition-transform duration-200 ${expanded === cat.slug ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>
      {expanded === cat.slug && (
        <div className="ml-3 pl-3 border-l-2 border-zinc-200 dark:border-zinc-700 mt-0.5 mb-1 flex flex-col gap-0.5">
          {cat.subcategories?.map((sub) => (
            <Link
              key={sub.slug}
              href={`/shop/${cat.slug}/${sub.slug}`}
              onClick={onClose}
              className="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Header({ categories = [] }: HeaderProps) {
  const { totalItems, toggleCart } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState<string | null>(null)
  const [moreHovered, setMoreHovered] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const primary = categories.slice(0, PRIMARY_COUNT)
  const more = categories.slice(PRIMARY_COUNT)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  const openNav = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveNav(key)
    if (key !== 'more') setMoreHovered(null)
  }

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => {
      setActiveNav(null)
      setMoreHovered(null)
    }, 120)
  }

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  return (
    <header className={`sticky top-0 z-30 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 dark:bg-zinc-950/95 backdrop-blur border-b border-zinc-200 dark:border-zinc-800'
        : 'bg-white dark:bg-zinc-950 border-b border-zinc-200/50 dark:border-zinc-800/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <div className="overflow-hidden shrink-0">
             <Logo />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">

            {/* Primary categories — first 4 */}
            {primary.map((cat) => (
              <div
                key={cat.slug}
                className="relative"
                onMouseEnter={() => openNav(cat.slug)}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={`/shop/${cat.slug}`}
                  className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeNav === cat.slug
                      ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {cat.name}
                  {(cat.subcategories?.length ?? 0) > 0 && (
                    <ChevronDown
                      size={13}
                      className={`shrink-0 transition-transform duration-200 ${activeNav === cat.slug ? 'rotate-180' : ''}`}
                    />
                  )}
                </Link>

                {/* Subcategory dropdown */}
                {activeNav === cat.slug && (cat.subcategories?.length ?? 0) > 0 && (
                  <div
                    className="absolute top-[calc(100%+6px)] left-0 z-50 min-w-[200px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="p-1.5">
                      <Link
                        href={`/shop/${cat.slug}`}
                        className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                      >
                        View all {cat.name}
                        <ChevronRight size={12} />
                      </Link>
                      <div className="my-1.5 border-t border-zinc-100 dark:border-zinc-800" />
                      <div className={`grid ${(cat.subcategories?.length ?? 0) >= 5 ? 'grid-cols-2 w-[320px]' : 'grid-cols-1'}`}>
                        {cat.subcategories?.map((sub) => (
                          <Link
                            key={sub.slug}
                            href={`/shop/${cat.slug}/${sub.slug}`}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0" />
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* "More" dropdown for remaining categories */}
            {more.length > 0 && (
              <div
                className="relative"
                onMouseEnter={() => openNav('more')}
                onMouseLeave={scheduleClose}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeNav === 'more'
                      ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  More
                  <ChevronDown
                    size={13}
                    className={`shrink-0 transition-transform duration-200 ${activeNav === 'more' ? 'rotate-180' : ''}`}
                  />
                </button>

                {activeNav === 'more' && (
                  <div
                    className="absolute top-[calc(100%+6px)] left-0 z-50 flex bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    {/* Left panel: remaining categories */}
                    <div className="w-48 p-1.5">
                      {more.map((cat) => (
                        <div
                          key={cat.slug}
                          onMouseEnter={() => setMoreHovered(cat.slug)}
                        >
                          <Link
                            href={`/shop/${cat.slug}`}
                            className={`flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                              moreHovered === cat.slug
                                ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800'
                                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
                            }`}
                          >
                            {cat.name}
                            {(cat.subcategories?.length ?? 0) > 0 && (
                              <ChevronRight
                                size={13}
                                className={`shrink-0 transition-colors ${moreHovered === cat.slug ? 'text-zinc-600 dark:text-zinc-400' : 'text-zinc-400 dark:text-zinc-600'}`}
                              />
                            )}
                          </Link>
                        </div>
                      ))}
                    </div>

                    {/* Right panel: subcategories of hovered more-category */}
                    {moreHovered && (() => {
                      const cat = more.find((c) => c.slug === moreHovered)
                      if (!cat || (cat.subcategories?.length ?? 0) === 0) return null
                      return (
                        <div className="w-52 p-1.5 border-l border-zinc-100 dark:border-zinc-800">
                          <Link
                            href={`/shop/${cat.slug}`}
                            className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                          >
                            View all {cat.name}
                            <ChevronRight size={12} />
                          </Link>
                          <div className="my-1.5 border-t border-zinc-100 dark:border-zinc-800" />
                          {cat.subcategories?.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/shop/${cat.slug}/${sub.slug}`}
                              className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-600 shrink-0" />
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 gap-2">
                  <Search size={16} className="text-zinc-500 dark:text-zinc-400 shrink-0" />
                  <input
                    ref={searchRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        window.location.href = `/shop?q=${encodeURIComponent(searchQuery)}`
                      }
                      if (e.key === 'Escape') setSearchOpen(false)
                    }}
                    placeholder="Search products…"
                    className="bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 outline-none w-48"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <div className="hidden sm:flex items-center px-1">
              <ThemeToggle />
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav — accordion */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-zinc-200 dark:border-zinc-800 pt-3 flex flex-col gap-0.5">
            {/* Primary 4 categories */}
            {primary.map((cat) => (
              <MobileCatRow
                key={cat.slug}
                cat={cat}
                expanded={mobileExpanded}
                setExpanded={setMobileExpanded}
                onClose={() => setMobileOpen(false)}
              />
            ))}

            {/* More — collapsible group */}
            {more.length > 0 && (
              <div>
                <button
                  onClick={() => setMobileMoreOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <span>More</span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${mobileMoreOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {mobileMoreOpen && (
                  <div className="ml-3 pl-3 border-l-2 border-zinc-200 dark:border-zinc-700 mt-0.5 mb-1 flex flex-col gap-0.5">
                    {more.map((cat) => (
                      <MobileCatRow
                        key={cat.slug}
                        cat={cat}
                        expanded={mobileExpanded}
                        setExpanded={setMobileExpanded}
                        onClose={() => setMobileOpen(false)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Theme toggle for small screens */}
            <div className="sm:hidden flex items-center gap-3 px-3 py-2.5 mt-1 border-t border-zinc-200 dark:border-zinc-800 pt-3">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
