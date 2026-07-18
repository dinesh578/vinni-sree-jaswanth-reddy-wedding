'use client'

import { useEffect, useRef } from 'react'

/**
 * Spawns tiny floating jasmine blossoms that trail the cursor.
 * Desktop / fine-pointer only, throttled, and disabled for reduced motion.
 */
export function CursorJasmine() {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    const fine = window.matchMedia('(pointer: fine)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || prefersReduced) return

    let last = 0
    const onMove = (e: PointerEvent) => {
      const now = performance.now()
      if (now - last < 85) return
      last = now

      const el = document.createElement('span')
      el.className = 'jasmine-bloom'
      const size = 10 + Math.random() * 10
      el.style.cssText = `
        position:fixed;left:${e.clientX}px;top:${e.clientY}px;
        width:${size}px;height:${size}px;pointer-events:none;z-index:60;
        transform:translate(-50%,-50%) rotate(${Math.random() * 360}deg);
        will-change:transform,opacity;
      `
      el.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%">
        <g fill="none">
          ${[0, 72, 144, 216, 288]
            .map(
              (a) =>
                `<ellipse cx="12" cy="6" rx="3" ry="5.5" fill="hsl(45 80% 92%)" transform="rotate(${a} 12 12)"/>`,
            )
            .join('')}
          <circle cx="12" cy="12" r="2.4" fill="hsl(45 90% 70%)"/>
        </g>
      </svg>`
      layer.appendChild(el)

      const driftX = (Math.random() - 0.5) * 40
      const anim = el.animate(
        [
          { opacity: 0.9, transform: `translate(-50%,-50%) scale(0.6) rotate(0deg)` },
          {
            opacity: 0,
            transform: `translate(calc(-50% + ${driftX}px), 40px) scale(1) rotate(60deg)`,
          },
        ],
        { duration: 1600, easing: 'cubic-bezier(0.22,0.61,0.36,1)' },
      )
      anim.onfinish = () => el.remove()
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return <div ref={layerRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]" />
}
