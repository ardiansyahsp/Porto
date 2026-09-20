import { useState } from 'react'
import { Navbar } from '@/components/layout'
import { Footer } from '@/components/layout'
import { Hero } from '@/components/sections'
import { Skills } from '@/components/sections'
import { Projects } from '@/components/sections'
import { Timeline } from '@/components/sections'
import { SearchModal } from '@/components/ui'
import { SectionDivider } from '@/components/ui'

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <div className="bg-white text-body min-h-screen">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      
      <Hero />
      <SectionDivider />
      
      <Skills />
      
      <Projects />
      <SectionDivider />
      
      <Timeline />
      <SectionDivider />
      
      <Footer />
      
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  )
}

export default App
