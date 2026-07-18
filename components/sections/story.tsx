'use client'

import { motion } from 'framer-motion'
import { GoldDivider, Reveal } from '@/components/ornaments'

const chapters = [
  {
    year: 'The Beginning',
    title: 'Two Families, One Prayer',
    text: 'In the tradition of our ancestors, two respected families of Nellore sought the blessings of the divine for a union rooted in values, devotion and love.',
  },
  {
    year: 'The Meeting',
    title: 'A Blessing Foretold',
    text: 'When Vinni Sree and Jaswanth Reddy first met, the elders felt the quiet certainty of destiny — two souls whose paths were always meant to converge.',
  },
  {
    year: 'The Promise',
    title: 'Hearts United',
    text: 'Through laughter, shared dreams and the warmth of both households, a gentle friendship blossomed into a promise to walk together for seven lifetimes.',
  },
  {
    year: 'The Union',
    title: 'A Sacred Beginning',
    text: 'Now, beneath the golden temple sky, both families joyfully come together to bless the beginning of their forever.',
  },
]

export function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-cinematic px-6 py-24 sm:py-32"
      aria-label="The couple's story"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <GoldDivider className="mb-5" />
          <h2 className="font-display text-4xl text-gold-gradient sm:text-5xl md:text-6xl text-balance">
            How Two Families United
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ivory/70 text-pretty">
            A story written in the stars and blessed by generations.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* center line */}
          <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent sm:left-1/2" />

          <div className="flex flex-col gap-12">
            {chapters.map((c, i) => (
              <Reveal key={c.year} delay={i * 0.05}>
                <div
                  className={`relative flex flex-col pl-12 sm:w-1/2 sm:pl-0 ${
                    i % 2 === 0 ? 'sm:self-start sm:pr-12 sm:text-right' : 'sm:self-end sm:pl-12'
                  }`}
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className={`absolute left-4 top-2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gold ring-4 ring-maroon-deep sm:left-auto ${
                      i % 2 === 0 ? 'sm:-right-[1.68rem]' : 'sm:-left-[0.42rem]'
                    }`}
                  />
                  <span className="text-xs uppercase tracking-[0.3em] text-gold-soft">
                    {c.year}
                  </span>
                  <h3 className="mt-2 font-display text-2xl text-ivory sm:text-3xl">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-ivory/70">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
