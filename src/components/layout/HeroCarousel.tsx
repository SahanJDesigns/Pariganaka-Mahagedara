'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Flier } from '@/types'

const INTERVAL_MS = 5000

interface HeroCarouselProps {
  fliers: Flier[]
}

export function HeroCarousel({ fliers }: HeroCarouselProps) {
  const [index, setIndex] = useState(0)

  const validFliers = fliers.filter((f) => f.image_url)

  const prev = useCallback(() => setIndex(i => (i - 1 + validFliers.length) % validFliers.length), [validFliers.length])
  const next = useCallback(() => setIndex(i => (i + 1) % validFliers.length), [validFliers.length])

  useEffect(() => {
    if (validFliers.length <= 1) return
    const id = setInterval(next, INTERVAL_MS)
    return () => clearInterval(id)
  }, [next, validFliers.length])

  if (validFliers.length === 0) return null

  return (
    <section className="py-4 md:py-6">
      <div className="relative rounded-2xl overflow-hidden group">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {validFliers.map((flier, i) => {
            const img = (
              <Image
                src={flier.image_url}
                alt={flier.alt_text ?? flier.title}
                fill
                unoptimized
                priority={i === 0}
                className="object-cover"
              />
            )
            const slide = (
              <div key={flier.id} className="min-w-full relative aspect-16/6 md:aspect-16/5">{img}</div>
            )
            return flier.link_url ? (
              <Link key={flier.id} href={flier.link_url} className="min-w-full block relative aspect-16/6 md:aspect-16/5">
                {img}
              </Link>
            ) : slide
          })}
        </div>

        {validFliers.length > 1 && (
          <>
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
              {validFliers.map((_, i) => (
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
          </>
        )}
      </div>
    </section>
  )
}
