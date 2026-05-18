'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const FLIERS = [
  { src: '/hero-fliers/hero1.png', alt: 'Promo 1' },
  { src: '/hero-fliers/hero2.png', alt: 'Promo 2' },
]

const INTERVAL_MS = 5000

export function HeroCarousel() {
  const [index, setIndex] = useState(0)

  const prev = useCallback(() => setIndex(i => (i - 1 + FLIERS.length) % FLIERS.length), [])
  const next = useCallback(() => setIndex(i => (i + 1) % FLIERS.length), [])

  useEffect(() => {
    const id = setInterval(next, INTERVAL_MS)
    return () => clearInterval(id)
  }, [next])

  return (
    <section className="py-4 md:py-6">
      <div className="relative rounded-2xl overflow-hidden group">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {FLIERS.map((flier, i) => (
            <div key={i} className="min-w-full relative aspect-[16/6] md:aspect-[16/5]">
              <Image
                src={flier.src}
                alt={flier.alt}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1280px"
              />
            </div>
          ))}
        </div>

        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {FLIERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all ${
                i === index ? 'bg-white w-5' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
