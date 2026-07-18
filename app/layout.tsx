import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Marcellus } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const marcellus = Marcellus({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-marcellus',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vinni Sree ❤ Jaswanth Reddy | A Sacred Telugu Wedding',
  description:
    'Together with their families, Vinni Sree & Jaswanth Reddy joyfully invite you to celebrate their sacred wedding — 16 August 2026, Jetti Sesha Reddy Kalyana Mandapam, Nellore.',
  keywords: [
    'Vinni Sree',
    'Jaswanth Reddy',
    'Telugu wedding',
    'Hindu wedding invitation',
    'Nellore wedding',
    'South Indian wedding',
  ],
  openGraph: {
    title: 'Vinni Sree ❤ Jaswanth Reddy | A Sacred Telugu Wedding',
    description:
      'Seek our blessings as we begin a beautiful journey together — 16 August 2026, Nellore.',
    images: ['/images/hero-temple.png'],
    type: 'website',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#2a0f10',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${marcellus.variable} bg-background`}>
      <body className="antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
