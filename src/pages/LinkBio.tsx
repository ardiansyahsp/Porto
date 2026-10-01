import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export const LinkBio: React.FC = () => {
  const profileImage = "/images/foto.png";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    // Dikunci ke bg-black agar selalu gelap
    <div className="relative min-h-screen flex items-center justify-center sm:p-4 overflow-hidden bg-black">

      {/* Background Desktop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 hidden sm:block"
      >
        <img
          src={profileImage}
          alt="Background Blur"
          className="w-full h-full object-cover blur-3xl scale-125 opacity-40"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </motion.div>

      {/* Kontainer Utama Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full min-h-screen sm:min-h-[800px] sm:max-w-[420px] sm:rounded-[2.5rem] overflow-hidden sm:shadow-2xl sm:shadow-black/50 bg-black flex flex-col justify-end border border-white/5 sm:border-white/10"
      >
        {/* Area Foto Profil */}
        <div className="absolute top-0 left-0 w-full h-[65%] sm:h-[70%]">
          <img
            src={profileImage}
            alt="Ardiansyah Sisworo"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-black via-black/95 to-transparent"></div>
        </div>

        {/* KONTEN UTAMA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full flex flex-col items-center px-6 pb-8"
        >

          <motion.div variants={itemVariants} className="flex flex-col items-center w-full">
            <h1 className="text-[28px] font-bold text-white mb-1 tracking-tight text-center">
              Ardiansyah Sisworo
            </h1>
            <p className="text-gray-400 text-sm mb-4 text-center">@ardiansp</p>
          </motion.div>

          {/* AREA BADGE (Profesi & Status) */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2.5 mb-8">

            {/* Badge Profesi */}
            <motion.div
              animate={{
                boxShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 12px rgba(255,255,255,0.4)", "0px 0px 0px rgba(255,255,255,0)"],
                borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.2)"]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="px-4 py-1.5 rounded-full bg-white/10 border backdrop-blur-md"
            >
              <p className="text-white text-[11px] sm:text-xs font-semibold tracking-wide uppercase">
                Full-Stack Developer
              </p>
            </motion.div>

            {/* Badge Open to Work */}
            <motion.div
              animate={{
                boxShadow: ["0px 0px 0px rgba(52,211,153,0)", "0px 0px 12px rgba(52,211,153,0.4)", "0px 0px 0px rgba(52,211,153,0)"],
                borderColor: ["rgba(52,211,153,0.2)", "rgba(52,211,153,0.6)", "rgba(52,211,153,0.2)"]
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.25 }}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border backdrop-blur-md flex items-center gap-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <p className="text-gray-200 text-[11px] sm:text-xs font-semibold tracking-wide uppercase">
                Open to Work
              </p>
            </motion.div>

          </motion.div>

          {/* Deretan Ikon Sosial Media */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-10">
            <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.125 2.062 2.062 0 01-.001 4.125zM7.114 20.452H3.558V9h3.556v11.452z" /></svg>
            </a>
            <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="https://github.com/ardiansyahsp" aria-label="GitHub" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
            <a href="#" aria-label="TikTok" className="w-10 h-10 rounded-full bg-black border border-gray-700 flex items-center justify-center text-white hover:scale-110 transition-transform">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" /></svg>
            </a>
          </motion.div>

          {/* Tombol Utama menuju Portofolio Web */}
          <motion.div variants={itemVariants} className="w-full max-w-[320px] mb-10">
            <Link
              to="/portfolio"
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Masuk ke Web Portofolio</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </motion.div>

          {/* Footer Hak Cipta Pribadi */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 text-[11px] text-gray-500 mt-auto">
            <span>© 2026 Ardiansyah Sisworo. All rights reserved.</span>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
};