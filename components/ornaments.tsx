'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/** Temple-inspired golden divider with a central lamp motif. */
export function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-gold ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold sm:w-28" />
      <svg width="34" height="34" viewBox="0 0 48 48" className="drop-glow-gold shrink-0">
        <g fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M24 6c3 4 3 7 0 10-3-3-3-6 0-10Z" fill="currentColor" opacity="0.9" />
          <path d="M14 20h20l-3 8H17l-3-8Z" />
          <path d="M24 28v8m-7 0h14" />
          <circle cx="24" cy="17" r="1.6" fill="currentColor" />
        </g>
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold sm:w-28" />
    </div>
  )
}

/** Small om symbol used as a section accent. */
export function OmMark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display text-gold ${className}`} aria-hidden="true">
      ॐ
    </span>
  )
}

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 42 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] },
  },
}

/** Fade + rise on scroll into view. */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
