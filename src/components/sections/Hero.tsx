import React, { useState } from 'react';
import { useLanguage } from '@/hooks';
import { motion, type Variants } from 'framer-motion';
import { LiveMetricsWidget } from '@/components/sections/LiveMetricsWidget';

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Data Sertifikasi (Tipe baru: 'certificate')
  const col1Items = [
    {
      id: 1,
      type: 'certificate',
      title: 'Python Coder',
      subtitle: 'Kaggle Badge',
      icon: <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.34-.246.527-.246h3.279c.212 0 .305.082.281.246-.046.07-.152.188-.316.352l-5.283 5.156 6.362 8.766c.141.211.141.375.059.502z" /></svg>,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 2,
      type: 'certificate',
      title: 'Database Foundations',
      subtitle: 'Oracle Academy',
      icon: <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M16.143 2.246c-2.327-.47-5.01-.223-7.142.668-2.613 1.09-4.707 3.324-5.69 5.952-1.393 3.712-.325 8.125 2.721 10.825 2.508 2.222 6.078 3.125 9.28 2.378 2.553-.596 4.88-2.292 6.15-4.66 1.488-2.766 1.542-6.28.14-9.083-1.258-2.52-3.61-4.482-6.326-5.263l.867 5.182zm-4.314 13.926c-2.316.376-4.717-.988-5.578-3.178-.853-2.172.185-4.767 2.368-5.83 2.155-1.05 4.89-.133 6.02 1.99.746 1.397.667 3.23-.217 4.542-.718 1.066-1.84 1.846-3.13 2.115l.537 3.36z" /></svg>,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 3,
      type: 'certificate',
      title: 'IoT Development',
      subtitle: 'Capstone Project',
      icon: <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop'
    },
  ];

  const col2Items = [
    {
      id: 4,
      type: 'certificate',
      title: 'Full-Stack Web',
      subtitle: 'Professional Course',
      icon: <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 5,
      type: 'certificate',
      title: 'Computer Vision',
      subtitle: 'Advanced AI',
      icon: <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 6,
      type: 'certificate',
      title: 'Cloud Computing',
      subtitle: 'Infrastructure',
      icon: <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop'
    },
  ];

  // Gandakan array agar scroll tidak pernah putus (Infinite Loop)
  const loopCol1 = [...col1Items, ...col1Items, ...col1Items];
  const loopCol2 = [...col2Items, ...col2Items, ...col2Items];

  // Desain Card untuk Sertifikat
  const renderCard = (item: any, index: number) => (
    <div
      key={`${item.id}-${index}`}
      onClick={() => setSelectedImage(item.image)}
      className="w-full p-6 mb-4 rounded-2xl border border-border dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md shadow-sm min-h-[140px] flex flex-col justify-center transition-all duration-300 hover:border-laravel dark:hover:border-slate-500 cursor-pointer group"
    >
      <div className="flex flex-col gap-3">
        <div className="group-hover:scale-110 transition-transform origin-left w-fit">
          {item.icon}
        </div>
        <div>
          <h3 className="font-bold text-body dark:text-slate-100 text-[15px] mb-0.5 leading-tight">{item.title}</h3>
          <p className="text-xs text-muted dark:text-slate-400 font-medium">{item.subtitle}</p>
        </div>
      </div>
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
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-[64px] font-normal text-body dark:text-slate-100 leading-[1.05] tracking-tight">
              <span>{t('hero.name_line1')}</span><br />
              <span className="text-body dark:text-slate-100">{t('hero.name_line2')}</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-muted dark:text-slate-400 max-w-lg leading-relaxed">
              {t('hero.description')}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex items-center gap-4 pt-2">
              <a href="#projects" className="btn-transition inline-flex items-center gap-2 px-6 py-3 bg-laravel hover:bg-laravel-dark text-white text-sm font-semibold rounded-lg shadow-sm shadow-laravel/20">
                <span>{t('hero.cta_primary')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="#" className="btn-transition inline-flex items-center gap-2 px-6 py-3 border border-border dark:border-slate-700 text-body dark:text-slate-200 text-sm font-semibold rounded-lg hover:bg-surface dark:hover:bg-slate-800 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <span>{t('hero.cta_secondary')}</span>
              </a>
            </motion.div>

            {/* --- WIDGET DITAMBAHKAN DI SINI --- */}
            <motion.div variants={fadeInUp} className="pt-6">
              <LiveMetricsWidget />
            </motion.div>
            {/* ---------------------------------- */}

          </motion.div>

          {/* KOLOM KANAN: ANIMASI GALERI BERJALAN */}
          <motion.div
            className="lg:col-span-5 flex justify-center relative h-[480px]"
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
                  animate={{ y: ["0%", "-33.33%"] }}
                  transition={{ ease: "linear", duration: 15, repeat: Infinity }}
                >
                  {loopCol1.map((item, idx) => renderCard(item, idx))}
                </motion.div>
              </div>

              {/* Track 2 (Kanan) */}
              <div className="flex-1 relative">
                <motion.div
                  className="flex flex-col w-full"
                  animate={{ y: ["-33.33%", "0%"] }}
                  transition={{ ease: "linear", duration: 18, repeat: Infinity }}
                >
                  {loopCol2.map((item, idx) => renderCard(item, idx))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal / Lightbox Pop-up untuk Gambar Sertifikat */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-900/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full flex justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-red-500 p-2 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <img
              src={selectedImage}
              alt="Sertifikat"
              className="w-full max-w-3xl h-auto rounded-xl shadow-2xl object-contain max-h-[85vh] bg-slate-800"
            />
          </div>
        </div>
      )}
    </section>
  );
};