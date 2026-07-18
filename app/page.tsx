import { SmoothScroll } from '@/components/smooth-scroll'
import { PetalField } from '@/components/petal-field'
import { CursorJasmine } from '@/components/cursor-jasmine'
import { SoundToggle } from '@/components/sound-toggle'
import { Hero } from '@/components/sections/hero'
import { Procession } from '@/components/sections/procession'
import { Invitation } from '@/components/sections/invitation'
import { Events } from '@/components/sections/events'
import { Venue } from '@/components/sections/venue'
import { Story } from '@/components/sections/story'
import { Family } from '@/components/sections/family'
import { Gallery } from '@/components/sections/gallery'
import { Rsvp } from '@/components/sections/rsvp'
import { Finale } from '@/components/sections/finale'

export default function Page() {
  return (
    <SmoothScroll>
      {/* Global interactive atmosphere */}
      <PetalField />
      <CursorJasmine />
      <SoundToggle />

      <main className="relative">
        <Hero />
        <Procession />
        <Invitation />
        <Events />
        <Venue />
        <Story />
        <Family />
        <Gallery />
        <Rsvp />
        <Finale />
      </main>
    </SmoothScroll>
  )
}
