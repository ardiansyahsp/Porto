// src/pages/Home.tsx
import { Hero, Skills, Projects, Timeline } from '@/components/sections'
import { SectionDivider } from '@/components/ui'

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <Skills />
      <Projects />
      <SectionDivider />
      <Timeline />
      <SectionDivider />
    </>
  )
}