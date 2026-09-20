import React from 'react';
import { useLanguage } from '@/hooks';
import { motion, type Variants } from 'framer-motion';

// Konfigurasi animasi
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const floatingMain: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
  }
};

// Custom variant untuk ikon agar melayangnya bergantian
const floatingIcon = (delay: number): Variants => ({
  animate: {
    y: [0, -15, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay }
  }
});

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Padding dipertahankan untuk Optical Centering agar posisi pas */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 sm:pt-16 sm:pb-32 lg:pt-16 lg:pb-36 min-h-[85vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Kolom Kiri: Teks */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p variants={fadeInUp} className="text-sm font-semibold text-laravel tracking-wide uppercase">
              {t('hero.greeting')}
            </motion.p>

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-[64px] font-normal text-body leading-[1.05] tracking-tight">
              <span>{t('hero.name_line1')}</span><br/>
              <span className="text-body">{t('hero.name_line2')}</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-muted max-w-lg leading-relaxed">
              {t('hero.description')}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-2">
              <a href="#projects" className="btn-transition inline-flex items-center gap-2 px-6 py-3 bg-laravel hover:bg-laravel-dark text-white text-sm font-semibold rounded-lg shadow-sm shadow-laravel/20">
                <span>{t('hero.cta_primary')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
              <a href="#" className="btn-transition inline-flex items-center gap-2 px-6 py-3 border border-border text-body text-sm font-semibold rounded-lg hover:bg-surface">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>{t('hero.cta_secondary')}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Kolom Kanan: Ilustrasi Isometrik */}
          <motion.div 
            className="lg:col-span-5 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-md">
              {/* Class drop-shadow dihapus agar kotak putih hilang */}
              <motion.img 
                variants={floatingMain}
                animate="animate"
                src="/images/hero-illustration.png" 
                alt="Isometric illustration" 
                className="w-full h-auto hero-illustration" 
              />
              
              {/* Ikon Teknologi Melayang */}
              <motion.div 
                variants={floatingIcon(0)} 
                animate="animate" 
                className="absolute top-8 left-2 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-gray-100"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" alt="Laravel" className="w-7 h-7" />
              </motion.div>
              
              <motion.div 
                variants={floatingIcon(1.2)} 
                animate="animate" 
                className="absolute bottom-24 -right-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-gray-100"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" className="w-7 h-7" />
              </motion.div>

              <motion.div 
                variants={floatingIcon(2.4)} 
                animate="animate" 
                className="absolute top-1/2 -left-8 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-xl border border-gray-100"
              >
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" alt="Linux" className="w-7 h-7" />
              </motion.div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-laravel animate-pulse-soft"></span>
                  <span className="w-8 h-[2px] bg-border rounded-full"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse-soft" style={{ animationDelay: '0.5s' }}></span>
                  <span className="w-12 h-[2px] bg-border rounded-full"></span>
                  <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse-soft" style={{ animationDelay: '1s' }}></span>
                  <span className="w-8 h-[2px] bg-border rounded-full"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse-soft" style={{ animationDelay: '1.5s' }}></span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};