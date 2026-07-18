'use client'

import { MapPin, Navigation } from 'lucide-react'
import { GoldDivider, Reveal } from '@/components/ornaments'

const QUERY = encodeURIComponent(
  'Jetti Sesha Reddy Kalyana Mandapam, Muthukur Road, Nellore',
)

export function Venue() {
  return (
    <section
      id="venue"
      className="relative bg-background px-6 py-24 sm:py-32"
      aria-label="Wedding venue and directions"
    >
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <GoldDivider className="mb-5" />
          <h2 className="font-display text-4xl text-maroon sm:text-5xl md:text-6xl">The Venue</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="grid overflow-hidden rounded-3xl border border-gold/40 shadow-[0_30px_80px_-40px_rgba(80,20,20,0.5)] md:grid-cols-2">
            {/* Details */}
            <div className="flex flex-col justify-center gap-6 bg-cinematic p-8 sm:p-12">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/50 text-gold">
                <MapPin className="h-7 w-7" strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-3xl text-gold-gradient sm:text-4xl">
                  Jetti Sesha Reddy
                  <br />
                  Kalyana Mandapam
                </h3>
                <address className="mt-4 not-italic leading-relaxed text-ivory/80">
                  Opposite Apollo Hospital,
                  <br />
                  Muthukur Road,
                  <br />
                  Nellore, Andhra Pradesh
                </address>
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-3 rounded-full border border-gold bg-gold/15 px-7 py-3 font-display text-lg text-ivory transition-all duration-300 hover:bg-gold hover:text-maroon-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Navigation
                  className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
                Navigate
              </a>
            </div>

            {/* Map */}
            <div className="relative min-h-[320px] bg-muted">
              <iframe
                title="Map to Jetti Sesha Reddy Kalyana Mandapam, Nellore"
                src={`https://maps.google.com/maps?q=${QUERY}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.15] contrast-[1.05]"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
