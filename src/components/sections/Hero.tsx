import React from 'react';
import { useLanguage } from '@/hooks';
import { motion, type Variants } from 'framer-motion';

// Konfigurasi animasi bawaan
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

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  // Data Dummy untuk Galeri Animasi
  const col1Items = [
    { id: 1, type: 'tech', label: 'React & Tailwind', icon: '⚛️' },
    { id: 2, type: 'project', title: 'Sistem Absensi', subtitle: 'Admin POV UI' },
    { id: 3, type: 'code', title: 'auth.ts', code: 'const token = verify();\nreturn user;' },
    { id: 4, type: 'project', title: 'INVENTRA', subtitle: 'Inventory System' },
  ];

  const col2Items = [
    { id: 5, type: 'project', title: 'Bipartite Graph', subtitle: 'Recommendation Engine' },
    { id: 6, type: 'tech', label: 'Python & FastAPI', icon: '🐍' },
    { id: 7, type: 'badge', title: 'Python Coder', subtitle: 'Kaggle Badge' },
    { id: 8, type: 'code', title: 'api.py', code: 'def get_data():\n  return success' },
  ];

  // Gandakan array agar scroll tidak pernah putus (Infinite Loop)
  const loopCol1 = [...col1Items, ...col1Items];
  const loopCol2 = [...col2Items, ...col2Items];

  // Desain Card yang menyesuaikan warna Light/Dark
  const renderCard = (item: any, index: number) => (
    <div key={`${item.id}-${index}`} className="w-full p-4 mb-4 rounded-2xl border border-border dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-sm h-32 flex flex-col justify-center transition-colors duration-300">
      {item.type === 'code' ? (
        <div className="font-mono text-[11px] leading-relaxed">
          <div className="flex gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
          </div>
          <p className="text-muted dark:text-slate-400 mb-0.5">{item.title}</p>
          <pre className="text-laravel dark:text-red-400 whitespace-pre-wrap">{item.code}</pre>
        </div>
      ) : item.type === 'tech' ? (
        <div className="text-center">
          <span className="text-3xl block mb-1.5">{item.icon}</span>
          <p className="font-semibold text-sm text-body dark:text-slate-200">{item.label}</p>
        </div>
      ) : (
        <div>
          <h3 className="font-bold text-body dark:text-slate-100 text-sm mb-1">{item.title}</h3>
          <p className="text-xs text-muted dark:text-slate-400">{item.subtitle}</p>
        </div>
      )}
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 sm:pt-16 sm:pb-32 lg:pt-16 lg:pb-36 min-h-[85vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* KOLOM KIRI: TEKS */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* TAG <motion.p> BERISI "HI, I'M" SUDAH DIHAPUS DARI SINI */}

            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-[64px] font-normal text-body dark:text-slate-100 leading-[1.05] tracking-tight">
              <span>{t('hero.name_line1')}</span><br/>
              <span className="text-body dark:text-slate-100">{t('hero.name_line2')}</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-muted dark:text-slate-400 max-w-lg leading-relaxed">
              {t('hero.description')}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-2">
              <a href="#projects" className="btn-transition inline-flex items-center gap-2 px-6 py-3 bg-laravel hover:bg-laravel-dark text-white text-sm font-semibold rounded-lg shadow-sm shadow-laravel/20">
                <span>{t('hero.cta_primary')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
              <a href="#" className="btn-transition inline-flex items-center gap-2 px-6 py-3 border border-border dark:border-slate-700 text-body dark:text-slate-200 text-sm font-semibold rounded-lg hover:bg-surface dark:hover:bg-slate-800 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>{t('hero.cta_secondary')}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* KOLOM KANAN: ANIMASI GALERI BERJALAN */}
          <motion.div 
            className="lg:col-span-5 flex justify-center relative h-[450px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div 
              className="relative w-full max-w-md h-full flex gap-4 overflow-hidden"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
              }}
            >
              
              {/* Track 1 (Kiri) */}
              <div className="flex-1 relative">
                <motion.div 
                  className="flex flex-col w-full"
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{ ease: "linear", duration: 15, repeat: Infinity }}
                >
                  {loopCol1.map((item, idx) => renderCard(item, idx))}
                </motion.div>
              </div>

              {/* Track 2 (Kanan) */}
              <div className="flex-1 relative">
                <motion.div 
                  className="flex flex-col w-full"
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{ ease: "linear", duration: 18, repeat: Infinity }}
                >
                  {loopCol2.map((item, idx) => renderCard(item, idx))}
                </motion.div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};