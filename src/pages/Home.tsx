// src/pages/Home.tsx
import { Hero, Skills, Projects, Timeline } from '@/components/sections'
import { SectionDivider } from '@/components/ui'
import { ContactForm } from '@/components/ContactForm';

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
      
      {/* Form Kontak ditambahkan di dalam bungkus fragment <> */}
      <ContactForm />
    </>
  );
}