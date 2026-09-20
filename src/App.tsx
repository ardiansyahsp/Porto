// src/App.tsx
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar, Footer } from '@/components/layout'
import { SearchModal } from '@/components/ui'

import Home from '@/pages/Home'
import ProjectDetail from '@/pages/ProjectDetail'

// Komponen untuk scroll ke atas setiap ganti halaman
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <Router>
      <ScrollToTop />
      <div className="bg-white text-body min-h-screen flex flex-col">
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
        
        {/* Area Dinamis (Berubah sesuai URL) */}
        <main className="flex-grow pt-20"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </main>
        
        <Footer />
        
        <SearchModal 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
        />
      </div>
    </Router>
  )
}

export default App