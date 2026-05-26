'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import type { CategoryWithSubcategories } from '@/types'
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
          className="flex-1 px-3 py-2.5 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
        >
          {cat.name}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setExpanded(expanded === cat.slug ? null : cat.slug)}
            className="p-2.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
          >
            <ChevronDown
              size={15}
              className={`transition-transform duration-200 ${expanded === cat.slug ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>
      {expanded === cat.slug && (
        <div className="ml-3 pl-3 border-l-2 border-zinc-200 mt-0.5 mb-1 flex flex-col gap-0.5">
          {cat.subcategories?.map((sub) => (
            <Link
              key={sub.slug}
              href={`/shop/${cat.slug}/${sub.slug}`}
              onClick={onClose}
              className="px-3 py-2 text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
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

  // Lock body scroll while sidebar is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const closeSidebar = () => setMobileOpen(false)

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
    <>
      <header className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur border-b border-zinc-200'
          : 'bg-white border-b border-zinc-200/50'
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

              {/* Home */}
              <Link
                href="/"
                className="px-3 py-2 text-sm rounded-lg transition-colors text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              >
                Home
              </Link>

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
                        ? 'text-zinc-900 bg-zinc-100'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
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
                      className="absolute top-[calc(100%+6px)] left-0 z-50 min-w-50 bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden"
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="p-1.5">
                        <Link
                          href={`/shop/${cat.slug}`}
                          className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors"
                        >
                          View all {cat.name}
                          <ChevronRight size={12} />
                        </Link>
                        <div className="my-1.5 border-t border-zinc-100" />
                        <div className={`grid ${(cat.subcategories?.length ?? 0) >= 5 ? 'grid-cols-2 w-[320px]' : 'grid-cols-1'}`}>
                          {cat.subcategories?.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/shop/${cat.slug}/${sub.slug}`}
                              className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
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
                        ? 'text-zinc-900 bg-zinc-100'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
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
                      className="absolute top-[calc(100%+6px)] left-0 z-50 flex bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden"
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="w-48 p-1.5">
                        {more.map((cat) => (
                          <div key={cat.slug} onMouseEnter={() => setMoreHovered(cat.slug)}>
                            <Link
                              href={`/shop/${cat.slug}`}
                              className={`flex items-center justify-between gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                                moreHovered === cat.slug
                                  ? 'text-zinc-900 bg-zinc-100'
                                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                              }`}
                            >
                              {cat.name}
                              {(cat.subcategories?.length ?? 0) > 0 && (
                                <ChevronRight
                                  size={13}
                                  className={`shrink-0 transition-colors ${moreHovered === cat.slug ? 'text-zinc-600' : 'text-zinc-400'}`}
                                />
                              )}
                            </Link>
                          </div>
                        ))}
                      </div>

                      {moreHovered && (() => {
                        const cat = more.find((c) => c.slug === moreHovered)
                        if (!cat || (cat.subcategories?.length ?? 0) === 0) return null
                        return (
                          <div className="w-52 p-1.5 border-l border-zinc-100">
                            <Link
                              href={`/shop/${cat.slug}`}
                              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors"
                            >
                              View all {cat.name}
                              <ChevronRight size={12} />
                            </Link>
                            <div className="my-1.5 border-t border-zinc-100" />
                            {cat.subcategories?.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/shop/${cat.slug}/${sub.slug}`}
                                className="flex items-center gap-2.5 px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
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
                  <div className="flex items-center bg-zinc-100 border border-zinc-300 rounded-lg px-3 py-2 gap-2">
                    <Search size={16} className="text-zinc-500 shrink-0" />
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
                      className="bg-transparent text-sm text-zinc-900 placeholder-zinc-400 outline-none w-48"
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="text-zinc-500 hover:text-zinc-900"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                  >
                    <Search size={20} />
                  </button>
                )}
              </div>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeSidebar}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <div
          className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-zinc-200 shrink-0">
            <Link href="/" onClick={closeSidebar}>
              <Logo />
            </Link>
            <button
              onClick={closeSidebar}
              className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable nav links */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
            <Link
              href="/"
              onClick={closeSidebar}
              className="px-3 py-2.5 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
            >
              Home
            </Link>

            {primary.map((cat) => (
              <MobileCatRow
                key={cat.slug}
                cat={cat}
                expanded={mobileExpanded}
                setExpanded={setMobileExpanded}
                onClose={closeSidebar}
              />
            ))}

            {more.length > 0 && (
              <div>
                <button
                  onClick={() => setMobileMoreOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                >
                  <span>More</span>
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${mobileMoreOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {mobileMoreOpen && (
                  <div className="ml-3 pl-3 border-l-2 border-zinc-200 mt-0.5 mb-1 flex flex-col gap-0.5">
                    {more.map((cat) => (
                      <MobileCatRow
                        key={cat.slug}
                        cat={cat}
                        expanded={mobileExpanded}
                        setExpanded={setMobileExpanded}
                        onClose={closeSidebar}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}
