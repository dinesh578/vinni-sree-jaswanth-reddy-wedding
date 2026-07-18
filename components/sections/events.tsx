'use client'

import { motion } from 'framer-motion'
import { Flower2, Bell } from 'lucide-react'
import { Countdown } from '@/components/countdown'
import { GoldDivider, Reveal } from '@/components/ornaments'

const events = [
  {
    icon: Flower2,
    tag: 'Haldi Ceremony',
    date: '15 August 2026',
    desc: 'A joyful morning of turmeric blessings, marigold garlands and festive music as we prepare for the sacred union.',
    accent: 'from-gold/25',
  },
  {
    icon: Bell,
    tag: 'Wedding Ceremony',
    date: '16 August 2026',
    desc: 'A traditional Telugu Hindu wedding, performed with Vedic rites, temple bells and the blessings of both families.',
    accent: 'from-maroon/30',
  },
]

export function Events() {
  return (
    <section
      id="events"
      className="relative overflow-hidden bg-background px-6 py-24 sm:py-32"
      aria-label="Wedding events and Muhurtham"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-maroon-deep/10 to-transparent" />

      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <GoldDivider className="mb-5" />
          <h2 className="font-display text-4xl text-maroon sm:text-5xl md:text-6xl text-balance">
            Wedding Celebrations
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground text-pretty">
            Two days of sacred rituals, colour and celebration. We would be honoured by your presence.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {events.map((e, i) => {
            const Icon = e.icon
            return (
              <Reveal key={e.tag} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className={`group relative h-full overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-b ${e.accent} to-card p-8 shadow-[0_24px_60px_-30px_rgba(80,20,20,0.4)]`}
                >
                  <div className="absolute right-6 top-6 h-16 w-16 rounded-full bg-gold/10 blur-xl transition-opacity group-hover:opacity-100" />
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/50 bg-background text-gold">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-display text-3xl text-maroon">{e.tag}</h3>
                  <p className="mt-1 text-lg font-medium text-gold">{e.date}</p>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{e.desc}</p>
                </motion.div>
              </Reveal>
            )
          })}
        </div>

        {/* Muhurtham countdown */}
        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-cinematic px-6 py-14 text-center sm:px-12">
            <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl" />
            <p className="text-xs uppercase tracking-[0.4em] text-gold-soft">Sacred Muhurtham</p>
            <h3 className="mt-4 font-display text-4xl text-gold-gradient sm:text-5xl">
              11:54 AM &ndash; 11:58 AM
            </h3>
            <p className="mt-3 text-ivory/70">
              As the auspicious moment nears, the temple bells will gently ring.
            </p>
            <div className="mt-10">
              <Countdown />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
