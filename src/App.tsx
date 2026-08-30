import { useState } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Timeline } from './components/sections/Timeline'
import { SearchModal } from './components/ui/SearchModal'
import { SectionDivider } from './components/ui/SectionDivider'

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
