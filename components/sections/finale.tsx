'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

type Spark = { id: number; left: number; delay: number; duration: number; size: number }

export function Finale() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1])
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '0%'])

  // Generated client-side only to avoid SSR/CSR hydration mismatch.
  const [sparks, setSparks] = useState<Spark[]>([])
  useEffect(() => {
    setSparks(
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 6,
        size: 2 + Math.random() * 4,
      })),
    )
  }, [])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-maroon-deep px-6 py-28 text-center"
      aria-label="The grand finale and Saptapadi"
    >
      {/* Ceremony backdrop */}
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
        <Image
          src="/images/finale-mandapam.png"
          alt="The couple performing Saptapadi around the sacred Agni Kund"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-deep/70 via-maroon-deep/55 to-maroon-deep/92" />

      {/* Rising agni sparks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {sparks.map((s) => (
          <motion.span
            key={s.id}
            className="absolute bottom-0 rounded-full bg-gold"
            style={{
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              boxShadow: '0 0 8px rgba(245,205,120,0.9)',
            }}
            animate={{ y: ['0vh', '-80vh'], opacity: [0, 1, 0] }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Final message */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <p className="mx-auto max-w-2xl font-display text-2xl leading-snug text-gold-gradient text-balance sm:text-4xl md:text-5xl">
          &ldquo;With the blessings of our families, we invite you to witness the beginning of our
          forever.&rdquo;
        </p>

        <div className="my-10 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <h2 className="font-display text-4xl text-ivory sm:text-6xl">
          Vinni Sree
          <span className="mx-3 text-maroon">&#10084;</span>
          Jaswanth Reddy
        </h2>
        <p className="mt-5 text-lg text-ivory/80 sm:text-xl">16 August 2026</p>
        <p className="mt-1 text-ivory/70">Jetti Sesha Reddy Kalyana Mandapam, Nellore</p>

        {/* Glowing Om */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
          className="relative mt-14 flex h-28 w-28 items-center justify-center"
        >
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(245,205,120,0.5),transparent_70%)] blur-md" />
          <span className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-gold/40" />
          <span className="font-display text-6xl text-gold-gradient drop-glow-gold">ॐ</span>
        </motion.div>

        <p className="mt-8 text-xs uppercase tracking-[0.4em] text-ivory/50">
          Made with love &amp; blessings
        </p>
      </motion.div>
    </section>
  )
}
