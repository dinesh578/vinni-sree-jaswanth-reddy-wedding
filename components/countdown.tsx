'use client'

import { useEffect, useState } from 'react'

const TARGET = new Date('2026-08-16T11:54:00+05:30').getTime()

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now())
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000) / 60_000)
  const seconds = Math.floor((diff % 60_000) / 1000)
  return { days, hours, minutes, seconds, done: diff === 0 }
}

export function Countdown() {
  const [t, setT] = useState<ReturnType<typeof getRemaining> | null>(null)

  useEffect(() => {
    setT(getRemaining())
    const id = setInterval(() => setT(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  const units: { label: string; value: number }[] = t
    ? [
        { label: 'Days', value: t.days },
        { label: 'Hours', value: t.hours },
        { label: 'Minutes', value: t.minutes },
        { label: 'Seconds', value: t.seconds },
      ]
    : [
        { label: 'Days', value: 0 },
        { label: 'Hours', value: 0 },
        { label: 'Minutes', value: 0 },
        { label: 'Seconds', value: 0 },
      ]

  return (
    <div>
      <div className="flex items-center justify-center gap-3 sm:gap-5" aria-live="polite">
        {units.map((u) => (
          <div
            key={u.label}
            className="glass-gold flex min-w-[68px] flex-col items-center rounded-2xl px-3 py-4 sm:min-w-[92px] sm:px-5 sm:py-5"
          >
            <span
              className="font-display text-3xl tabular-nums text-gold-gradient sm:text-5xl"
              suppressHydrationWarning
            >
              {String(u.value).padStart(2, '0')}
            </span>
            <span className="mt-1 text-[0.6rem] uppercase tracking-[0.25em] text-ivory/70 sm:text-xs">
              {u.label}
            </span>
          </div>
        ))}
      </div>
      {t?.done && (
        <p className="mt-5 text-center font-display text-xl text-gold-gradient">
          The sacred Muhurtham has arrived. Blessings to the couple!
        </p>
      )}
    </div>
  )
}
