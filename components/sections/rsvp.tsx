'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Check, Loader2 } from 'lucide-react'
import { GoldDivider, Reveal } from '@/components/ornaments'

export function Rsvp() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')
  const [attending, setAttending] = useState<'yes' | 'no'>('yes')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('loading')
    // Simulated confirmation — swap for a server action / DB when ready.
    setTimeout(() => setStatus('done'), 1400)
  }

  const fieldClass =
    'w-full rounded-xl border border-gold/40 bg-ivory/5 px-4 py-3 text-ivory placeholder:text-ivory/40 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/40'

  return (
    <section
      id="rsvp"
      className="relative bg-cinematic px-6 py-24 sm:py-32"
      aria-label="RSVP and blessings"
    >
      <div className="mx-auto max-w-xl">
        <Reveal className="text-center">
          <GoldDivider className="mb-5" />
          <h2 className="font-display text-4xl text-gold-gradient sm:text-5xl md:text-6xl">
            Bless Our Union
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg text-ivory/70 text-pretty">
            Kindly share your presence and blessings for our new beginning.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="glass-gold rounded-3xl p-7 sm:p-10">
            <AnimatePresence mode="wait">
              {status === 'done' ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-gold/20 text-gold"
                  >
                    <Check className="h-8 w-8" />
                  </motion.span>
                  <h3 className="mt-6 font-display text-3xl text-gold-gradient">Thank You!</h3>
                  <p className="mt-3 leading-relaxed text-ivory/80">
                    Your blessings mean the world to us. We look forward to celebrating this sacred
                    day in your loving presence.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm text-gold-soft">
                      Guest Name
                    </label>
                    <input id="name" name="name" required placeholder="Your full name" className={fieldClass} />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm text-gold-soft">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 00000 00000"
                      className={fieldClass}
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label htmlFor="guests" className="mb-2 block text-sm text-gold-soft">
                        No. of Guests
                      </label>
                      <input
                        id="guests"
                        name="guests"
                        type="number"
                        min={1}
                        max={20}
                        defaultValue={2}
                        className={fieldClass}
                      />
                    </div>
                    <div className="flex-1">
                      <span className="mb-2 block text-sm text-gold-soft">Attending</span>
                      <div className="flex overflow-hidden rounded-xl border border-gold/40">
                        {(['yes', 'no'] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setAttending(opt)}
                            className={`flex-1 py-3 text-sm capitalize transition ${
                              attending === opt
                                ? 'bg-gold text-maroon-deep'
                                : 'text-ivory/70 hover:bg-ivory/10'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm text-gold-soft">
                      Blessing Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Share your heartfelt wishes for the couple..."
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileTap={{ scale: 0.97 }}
                    className="group relative mt-2 flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold via-gold-soft to-gold px-8 py-4 font-display text-lg text-maroon-deep shadow-[0_10px_40px_-10px_rgba(212,160,60,0.7)] transition disabled:opacity-80"
                  >
                    <span className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    {status === 'loading' ? (
                      <Loader2 className="relative h-5 w-5 animate-spin" />
                    ) : (
                      <Heart className="relative h-5 w-5" strokeWidth={2} />
                    )}
                    <span className="relative">
                      {status === 'loading' ? 'Sending...' : 'Send Blessings'}
                    </span>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
