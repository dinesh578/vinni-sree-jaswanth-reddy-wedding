'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GoldDivider } from '@/components/ornaments'

export function Procession() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Families walk toward the center
  const brideX = useTransform(scrollYProgress, [0.05, 0.5], ['-60%', '0%'])
  const groomX = useTransform(scrollYProgress, [0.05, 0.5], ['60%', '0%'])
  const familiesOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.62, 0.72], [0, 1, 1, 0])

  // Golden meeting light + door opening
  const glowScale = useTransform(scrollYProgress, [0.55, 0.9], [0.2, 3.4])
  const glowOpacity = useTransform(scrollYProgress, [0.55, 0.78, 0.98], [0, 1, 0.4])
  // Doors fade in (closed) after the families meet, then slide fully apart before the section ends.
  const doorOpacity = useTransform(scrollYProgress, [0.48, 0.58], [0, 1])
  const leftDoorX = useTransform(scrollYProgress, [0.62, 0.9], ['0%', '-100%'])
  const rightDoorX = useTransform(scrollYProgress, [0.62, 0.9], ['0%', '100%'])
  const captionOpacity = useTransform(scrollYProgress, [0.6, 0.72, 0.92, 0.99], [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      className="relative h-[320vh] bg-cinematic"
      aria-label="The bride's and groom's families walk toward the temple"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        {/* Section intro */}
        <div className="absolute top-[8%] z-20 w-full px-6 text-center">
          <GoldDivider className="mb-4" />
          <h2 className="font-display text-3xl text-gold-gradient sm:text-4xl md:text-5xl">
            Two Families, One Blessing
          </h2>
          <p className="mx-auto mt-3 max-w-md text-ivory/70">
            As the temple bells ring, both families walk beneath the gopuram to meet in sacred joy.
          </p>
        </div>

        {/* Bride's family / left */}
        <motion.figure
          style={{ x: brideX, opacity: familiesOpacity }}
          className="absolute left-0 z-10 flex w-1/2 max-w-md flex-col items-center px-4 sm:px-8"
        >
          <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl border border-gold/40 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <Image
              src="/images/bride.png"
              alt="Bride Vinni Sree in an ivory and gold Kanchipuram silk saree"
              fill
              sizes="(max-width: 640px) 45vw, 280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/70 to-transparent" />
          </div>
          <figcaption className="mt-4 text-center">
            <span className="block text-xs uppercase tracking-[0.3em] text-gold-soft">The Bride</span>
            <span className="font-display text-2xl text-ivory sm:text-3xl">Vinni Sree</span>
          </figcaption>
        </motion.figure>

        {/* Groom's family / right */}
        <motion.figure
          style={{ x: groomX, opacity: familiesOpacity }}
          className="absolute right-0 z-10 flex w-1/2 max-w-md flex-col items-center px-4 sm:px-8"
        >
          <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl border border-gold/40 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <Image
              src="/images/groom.png"
              alt="Groom Jaswanth Reddy in a royal gold-bordered silk panchakattu"
              fill
              sizes="(max-width: 640px) 45vw, 280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/70 to-transparent" />
          </div>
          <figcaption className="mt-4 text-center">
            <span className="block text-xs uppercase tracking-[0.3em] text-gold-soft">The Groom</span>
            <span className="font-display text-2xl text-ivory sm:text-3xl">Jaswanth Reddy</span>
          </figcaption>
        </motion.figure>

        {/* Divine golden meeting light */}
        <motion.div
          style={{ scale: glowScale, opacity: glowOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,225,150,0.95),rgba(212,160,60,0.3)_45%,transparent_70%)]"
        />

        {/* Temple doors opening to reveal light */}
        <motion.div
          style={{ right: doorGap, opacity: doorOpacity }}
          className="absolute inset-y-0 left-0 z-40 bg-gradient-to-r from-maroon-deep via-maroon to-maroon-deep"
        >
          <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-gold/60 via-gold to-gold/60" />
        </motion.div>
        <motion.div
          style={{ left: doorGap, opacity: doorOpacity }}
          className="absolute inset-y-0 right-0 z-40 bg-gradient-to-l from-maroon-deep via-maroon to-maroon-deep"
        >
          <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-gold/60 via-gold to-gold/60" />
        </motion.div>

        {/* Doorway caption */}
        <motion.p
          style={{ opacity: captionOpacity }}
          className="absolute bottom-[12%] z-50 w-full px-6 text-center font-display text-xl text-gold-gradient sm:text-2xl"
        >
          The grand temple doors open to a divine golden light&hellip;
        </motion.p>
      </div>
    </section>
  )
}
