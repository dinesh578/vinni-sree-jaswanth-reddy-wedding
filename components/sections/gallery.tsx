'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { GoldDivider, Reveal } from '@/components/ornaments'

const photos = [
  { src: '/images/gallery-1.png', alt: 'The couple sharing a joyful moment', span: 'sm:row-span-2' },
  { src: '/images/gallery-6.png', alt: 'Ornate temple gopuram at sunrise', span: '' },
  { src: '/images/gallery-3.png', alt: 'A decorated pooja plate with flowers and diyas', span: '' },
  { src: '/images/gallery-2.png', alt: 'Intricate flower rangoli with brass lamps', span: 'sm:row-span-2' },
  { src: '/images/gallery-5.png', alt: "Bride's hands with mehndi and gold bangles", span: '' },
  { src: '/images/gallery-4.png', alt: 'Mango leaf toran over a temple doorway', span: '' },
]

export function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((a) => (a === null ? a : (a + 1) % photos.length)),
    [],
  )
  const prev = useCallback(
    () => setActive((a) => (a === null ? a : (a - 1 + photos.length) % photos.length)),
    [],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close, next, prev])

  return (
    <section
      id="gallery"
      className="relative bg-cinematic px-6 py-24 sm:py-32"
      aria-label="Wedding gallery"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <GoldDivider className="mb-5" />
          <h2 className="font-display text-4xl text-gold-gradient sm:text-5xl md:text-6xl">
            Moments &amp; Memories
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ivory/70 text-pretty">
            A glimpse of the colours, rituals and joy that surround our celebration.
          </p>
        </Reveal>

        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 sm:grid-cols-3 sm:auto-rows-[220px]">
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={(i % 3) * 0.08} className={p.span}>
              <button
                onClick={() => setActive(i)}
                className={`group relative h-full w-full overflow-hidden rounded-2xl border border-gold/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${p.span ? 'sm:min-h-full' : ''}`}
                aria-label={`Open image: ${p.alt}`}
              >
                <Image
                  src={p.src || '/placeholder.svg'}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/60 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-40" />
                <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/50" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-maroon-deep/95 p-4 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 text-gold-soft transition-colors hover:bg-gold hover:text-maroon-deep"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold-soft transition-colors hover:bg-gold hover:text-maroon-deep sm:left-8"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold-soft transition-colors hover:bg-gold hover:text-maroon-deep sm:right-8"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative max-h-[82vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-gold/40"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[active].src || '/placeholder.svg'}
                alt={photos[active].alt}
                width={1200}
                height={800}
                className="h-auto max-h-[82vh] w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
