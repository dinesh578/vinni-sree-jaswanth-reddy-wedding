'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GoldDivider, OmMark } from '@/components/ornaments'

type Particle = { id: number; x: number; y: number; size: number; delay: number }

export function Invitation() {
  // Golden particles that gather inward to "form" the card.
  // Generated client-side only to avoid SSR/CSR hydration mismatch.
  const [particles, setParticles] = useState<Particle[]>([])
  useEffect(() => {
    setParticles(
      Array.from({ length: 34 }, (_, i) => {
        const angle = (i / 34) * Math.PI * 2
        const radius = 320 + Math.random() * 260
        return {
          id: i,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          size: 3 + Math.random() * 5,
          delay: Math.random() * 0.4,
        }
      }),
    )
  }, [])

  return (
    <section
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-cinematic px-6 py-24"
      aria-label="Wedding invitation card"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,160,60,0.18),transparent_65%)]" />

      {/* gathering particles */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-gold"
            style={{ width: p.size, height: p.size, boxShadow: '0 0 8px rgba(245,205,120,0.9)' }}
            initial={{ x: p.x, y: p.y, opacity: 0 }}
            whileInView={{ x: 0, y: 0, opacity: [0, 1, 0] }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.6, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* The card */}
      <motion.article
        initial={{ opacity: 0, scale: 0.86, filter: 'blur(14px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.3, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        className="glass-gold relative z-10 mx-auto w-full max-w-2xl rounded-[2rem] px-8 py-14 text-center sm:px-14 sm:py-16"
      >
        {/* corner flourishes */}
        {(['left-4 top-4', 'right-4 top-4 rotate-90', 'left-4 bottom-4 -rotate-90', 'right-4 bottom-4 rotate-180'] as const).map(
          (pos) => (
            <svg
              key={pos}
              className={`absolute ${pos} h-8 w-8 text-gold/70`}
              viewBox="0 0 40 40"
              fill="none"
              aria-hidden="true"
            >
              <path d="M2 2c0 12 8 20 20 20M2 2v14M2 2h14" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          ),
        )}

        <OmMark className="text-3xl" />
        <p className="mt-4 text-xs uppercase tracking-[0.4em] text-gold-soft">
          Wedding Invitation
        </p>

        <h2 className="mt-6 font-display text-4xl leading-tight text-gold-gradient sm:text-6xl">
          Vinni Sree
          <span className="my-2 block text-2xl text-maroon sm:text-3xl">&#10084;</span>
          Jaswanth Reddy
        </h2>

        <GoldDivider className="my-8" />

        <p className="mx-auto max-w-lg text-lg leading-relaxed text-ivory/85 text-pretty sm:text-xl">
          Together with their beloved families, joyfully invite you to celebrate their sacred
          wedding ceremony and seek your blessings as they begin a beautiful journey together.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 text-ivory sm:flex-row sm:gap-6">
          <span className="font-display text-xl">16 August 2026</span>
          <span className="hidden h-4 w-px bg-gold/50 sm:block" />
          <span className="font-display text-xl">Muhurtham 11:54 AM</span>
        </div>
      </motion.article>
    </section>
  )
}
