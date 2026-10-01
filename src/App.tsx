// src/App.tsx
import Admin from './pages/Admin';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { SearchModal } from '@/components/ui';
import { ProtectedRoute } from '@/components/ProtectedRoute'; // <-- Import file satpam (ProtectedRoute)

import Home from '@/pages/Home';
import ProjectDetail from '@/pages/ProjectDetail';
import { LinkBio } from '@/pages/LinkBio';
import Login from './pages/Login'; 

// Komponen untuk scroll ke atas setiap ganti halaman
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout khusus untuk halaman portofolio (yang butuh Navbar & Footer)
const PortfolioLayout = ({ onOpenSearch }: { onOpenSearch: () => void }) => {
  return (
    <div className="bg-white dark:bg-slate-900 text-body dark:text-slate-200 min-h-screen flex flex-col transition-colors duration-300">
      <Navbar onOpenSearch={onOpenSearch} />
      
      <main className="flex-grow pt-20"> 
        <Outlet /> {/* <-- Komponen Home atau ProjectDetail akan dirender di dalam sini */}
      </main>
      
      <Footer />
    </div>
  );
}

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      
      <Routes>
        {/* Rute Admin Dashboard - SEKARANG DIGEMBOK OLEH PROTECTED ROUTE */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } 
        />

        {/* 1. Halaman Utama: Link Bio (Berdiri sendiri TANPA Navbar/Footer) */}
        <Route path="/" element={<LinkBio />} />
        
        {/* 2. Halaman Login Admin (Berdiri sendiri TANPA Navbar/Footer) */}
        <Route path="/login" element={<Login />} />
        
        {/* 3. Rute Portofolio: Dibungkus dengan Navbar dan Footer */}
        <Route element={<PortfolioLayout onOpenSearch={() => setIsSearchOpen(true)} />}>
          <Route path="/portfolio" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Route>
      </Routes>
        
      {/* Modal Pencarian tetap di luar agar bisa dipanggil */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </Router>
  )
}

export default App;