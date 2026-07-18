'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

/**
 * Ambient temple-bell atmosphere synthesized with the Web Audio API.
 * Plays soft, randomly-spaced bell shimmers over a low drone pad —
 * evoking veena + temple bells without shipping any audio files.
 * Off by default (autoplay policies require a user gesture).
 */
export function SoundToggle() {
  const [on, setOn] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dronesRef = useRef<OscillatorNode[]>([])

  const bellScale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5] // C major pentatonic-ish

  const ring = () => {
    const ctx = ctxRef.current
    const master = masterRef.current
    if (!ctx || !master) return
    const now = ctx.currentTime
    const base = bellScale[Math.floor(Math.random() * bellScale.length)]

    ;[1, 2.01, 2.76].forEach((mult, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = base * mult
      const peak = 0.12 / (i + 1)
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(peak, now + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.4 + i)
      osc.connect(gain).connect(master)
      osc.start(now)
      osc.stop(now + 4 + i)
    })

    const next = 2600 + Math.random() * 4200
    timerRef.current = setTimeout(ring, next)
  }

  const start = () => {
    const AudioCtx =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new AudioCtx()
    const master = ctx.createGain()
    master.gain.value = 0.5
    master.connect(ctx.destination)
    ctxRef.current = ctx
    masterRef.current = master

    // soft drone pad (veena-like)
    ;[130.81, 196.0].forEach((f) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.value = f
      g.gain.value = 0.015
      osc.connect(g).connect(master)
      osc.start()
      dronesRef.current.push(osc)
    })

    ring()
  }

  const stop = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    dronesRef.current.forEach((o) => {
      try {
        o.stop()
      } catch {}
    })
    dronesRef.current = []
    ctxRef.current?.close()
    ctxRef.current = null
    masterRef.current = null
  }

  const toggle = () => {
    if (on) {
      stop()
      setOn(false)
    } else {
      start()
      setOn(true)
    }
  }

  useEffect(() => () => stop(), [])

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Mute temple ambience' : 'Play temple ambience'}
      className="fixed right-4 top-4 z-[70] flex h-11 w-11 items-center justify-center rounded-full glass-gold text-gold-soft transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:right-6 sm:top-6"
    >
      {on ? (
        <Volume2 className="h-5 w-5 animate-flicker" strokeWidth={1.5} />
      ) : (
        <VolumeX className="h-5 w-5" strokeWidth={1.5} />
      )}
    </button>
  )
}
