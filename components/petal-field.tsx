'use client'

import { useEffect, useRef } from 'react'

type Petal = {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  rot: number
  rotSpeed: number
  sway: number
  swaySpeed: number
  hue: number
  opacity: number
}

/**
 * Global fixed-position canvas that renders gently falling flower petals
 * and soft golden light particles. GPU-light, capped by device pixel ratio,
 * and paused when the tab is hidden.
 */
export function PetalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const setup = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setup()

    const count = width < 640 ? 26 : 48
    const petalColors = [
      [45, 92, 78], // jasmine warm ivory
      [40, 88, 70],
      [28, 95, 62], // marigold
      [352, 60, 55], // rose maroon
    ]

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    const makePetal = (initial = false): Petal => {
      const c = petalColors[Math.floor(Math.random() * petalColors.length)]
      return {
        x: rand(0, width),
        y: initial ? rand(0, height) : rand(-60, -10),
        size: rand(6, 14),
        speedY: rand(0.25, 0.9),
        speedX: rand(-0.3, 0.3),
        rot: rand(0, Math.PI * 2),
        rotSpeed: rand(-0.01, 0.01),
        sway: rand(0, Math.PI * 2),
        swaySpeed: rand(0.005, 0.02),
        hue: c[0],
        opacity: rand(0.35, 0.85),
      }
    }

    const petals: Petal[] = Array.from({ length: count }, () => makePetal(true))

    let frame = 0
    let running = true

    const drawPetal = (p: Petal) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.globalAlpha = p.opacity
      const grad = ctx.createLinearGradient(0, -p.size, 0, p.size)
      grad.addColorStop(0, `hsl(${p.hue} 70% 82%)`)
      grad.addColorStop(1, `hsl(${p.hue} 65% 62%)`)
      ctx.fillStyle = grad
      ctx.beginPath()
      // simple petal shape
      ctx.moveTo(0, -p.size)
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.4, p.size * 0.8, p.size * 0.4, 0, p.size)
      ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.4, -p.size * 0.8, -p.size * 0.4, 0, -p.size)
      ctx.fill()
      ctx.restore()
    }

    const render = () => {
      if (!running) return
      frame = requestAnimationFrame(render)
      ctx.clearRect(0, 0, width, height)

      for (const p of petals) {
        p.sway += p.swaySpeed
        p.x += p.speedX + Math.sin(p.sway) * 0.6
        p.y += p.speedY
        p.rot += p.rotSpeed
        if (p.y > height + 30) {
          Object.assign(p, makePetal(false))
        }
        drawPetal(p)
      }
    }

    if (!prefersReduced) render()

    const onResize = () => setup()
    const onVisibility = () => {
      running = !document.hidden && !prefersReduced
      if (running) render()
      else cancelAnimationFrame(frame)
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40"
    />
  )
}
