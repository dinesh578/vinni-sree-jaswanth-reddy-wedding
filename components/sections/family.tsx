'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { GoldDivider, Reveal } from '@/components/ornaments'

const families = [
  {
    side: 'The Bride',
    name: 'Vinni Sree',
    lineage: "Daughter of Sri & Smt. Reddy",
    image: '/images/bride.png',
    members: ['Beloved Parents', 'Grandparents', 'Brothers & Sisters', 'Cousins & Children'],
  },
  {
    side: 'The Groom',
    name: 'Jaswanth Reddy',
    lineage: 'Son of Sri & Smt. Reddy',
    image: '/images/groom.png',
    members: ['Beloved Parents', 'Grandparents', 'Brothers & Sisters', 'Friends & Cousins'],
  },
]

export function Family() {
  return (
    <section
      id="family"
      className="relative bg-background px-6 py-24 sm:py-32"
      aria-label="Our families"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <GoldDivider className="mb-5" />
          <h2 className="font-display text-4xl text-maroon sm:text-5xl md:text-6xl text-balance">
            With Love, Our Families
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground text-pretty">
            The blessings of our elders and the joy of our loved ones make this union complete.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {families.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="relative overflow-hidden rounded-3xl border border-gold/40 bg-card p-1"
              >
                {/* ornate inner frame */}
                <div className="rounded-[1.4rem] border border-gold/25 p-6 sm:p-8">
                  <div className="flex items-center gap-5">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-gold/50">
                      <Image
                        src={f.image || '/placeholder.svg'}
                        alt={f.name}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-[0.3em] text-gold">{f.side}</span>
                      <h3 className="font-display text-3xl text-maroon">{f.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{f.lineage}</p>
                    </div>
                  </div>

                  <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

                  <ul className="grid grid-cols-2 gap-3">
                    {f.members.map((m) => (
                      <li key={m} className="flex items-center gap-2 text-sm text-foreground/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
