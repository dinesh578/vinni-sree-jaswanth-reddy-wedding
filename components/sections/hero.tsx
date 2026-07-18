'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { OmMark } from '@/components/ornaments'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const mistOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0.9])

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-maroon-deep"
      aria-label="Wedding invitation opening"
    >
      {/* Parallax temple backdrop */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <Image
          src="/images/hero-temple.png"
          alt="Golden sunrise over an ancient South Indian temple with floating flower petals"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic grade + vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep/50 via-transparent to-maroon-deep/85" />
      <div className="absolute inset-0 [background:radial-gradient(120%_80%_at_50%_35%,transparent_40%,rgba(20,8,8,0.7)_100%)]" />

      {/* Drifting mist */}
      <motion.div
        style={{ opacity: mistOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ivory/25 to-transparent blur-2xl"
      />

      {/* Brass lamp glow accents */}
      <div className="animate-flicker absolute left-[12%] top-[58%] h-24 w-24 rounded-full bg-gold/30 blur-3xl" />
      <div
        className="animate-flicker absolute right-[14%] top-[52%] h-28 w-28 rounded-full bg-gold/25 blur-3xl"
        style={{ animationDelay: '1.1s' }}
      />

      {/* Hero content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mb-5 flex items-center gap-3 text-gold-soft"
        >
          <span className="h-px w-10 bg-gold/60" />
          <OmMark className="text-2xl" />
          <span className="h-px w-10 bg-gold/60" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mb-4 text-sm uppercase tracking-[0.42em] text-ivory/80 sm:text-base"
        >
          Together with our families
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.6, delay: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-gold-gradient animate-shimmer font-display text-5xl leading-[1.05] text-balance drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)] sm:text-7xl md:text-8xl"
        >
          Vinni Sree
          <span className="mx-3 inline-block align-middle text-2xl text-maroon sm:text-4xl">
            &#10084;
          </span>
          Jaswanth Reddy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-ivory/85 text-pretty sm:text-xl"
        >
          A sacred Telugu wedding beneath the golden sunrise
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-7 flex items-center gap-4 text-ivory/90"
        >
          <span className="font-display text-lg tracking-wide sm:text-xl">16 August 2026</span>
          <span className="h-4 w-px bg-gold/50" />
          <span className="font-display text-lg tracking-wide sm:text-xl">Nellore</span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory/70"
      >
        <span className="text-xs uppercase tracking-[0.3em]">Begin the journey</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
        </motion.span>
      </motion.div>
    </section>
  )
}
