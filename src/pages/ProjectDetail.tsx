// src/pages/ProjectDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Ambil data spesifik dari Supabase berdasarkan ID di URL
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchDetail = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single(); // Ambil 1 baris data saja

      if (data) setProject(data);
      if (error) console.error('Error fetching project:', error.message);
      
      setLoading(false);
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  // Tampilan saat data masih dimuat
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-laravel" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-muted dark:text-slate-400">Memuat detail proyek...</p>
        </div>
      </div>
    );
  }

  // Tampilan jika ID proyek tidak ada di database
  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-slate-900 transition-colors duration-300">
        <h1 className="text-3xl font-bold text-body dark:text-slate-100 mb-4">Proyek Tidak Ditemukan</h1>
        <Link className="px-6 py-2 bg-laravel text-white rounded-md hover:bg-red-600 transition" to="/">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    // Background Dark Mode menyelimuti seluruh layar
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300 pt-6 pb-20 md:pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tombol Back */}
        <div className="mb-8">
          <Link className="inline-flex items-center text-sm font-medium text-muted dark:text-slate-400 hover:text-laravel dark:hover:text-laravel transition-colors" to="/">
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Portofolio
          </Link>
        </div>

        {/* LAYOUT DUA KOLOM: STICKY KIRI, SCROLL KANAN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* KOLOM KIRI (Visual Utama - Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 z-10">
            {/* Header ala Mac OS Mini untuk membingkai gambar */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border dark:border-slate-800 bg-surface dark:bg-slate-800/50">
              <div className="h-10 bg-slate-100 dark:bg-slate-900 border-b border-border dark:border-slate-800 flex items-center px-4 gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
              </div>
              {/* Gambar Utama */}
              <div className="aspect-[4/5] sm:aspect-square relative overflow-hidden bg-white dark:bg-slate-800 flex items-center justify-center p-4">
                {project.featured_image ? (
                  <img 
                    src={project.featured_image} 
                    alt={project.title} 
                    className="w-full h-full object-cover rounded-lg shadow-sm"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-muted">
                    Tidak ada gambar
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (Konten Detail - Scrollable) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* 1. Header & Deskripsi */}
            <div className="space-y-6">
              <div>
                <p className="text-laravel font-bold text-sm tracking-widest uppercase mb-2">
                  {project.category} Project
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-body dark:text-slate-100 tracking-tight leading-tight">
                  {project.title}
                </h1>
              </div>
              <p className="text-lg md:text-xl text-muted dark:text-slate-400 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
              
              {/* Action Buttons (Link & Github) */}
              <div className="flex flex-wrap gap-4 pt-4">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-laravel hover:bg-red-600 text-white text-sm font-semibold rounded-lg shadow-md transition-colors">
                    Live Preview
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-800 border border-border dark:border-slate-700 hover:bg-surface dark:hover:bg-slate-700 text-body dark:text-slate-200 text-sm font-semibold rounded-lg shadow-sm transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    Source Code
                  </a>
                )}
              </div>
            </div>

            {/* 2. At a Glance (Bento Box Metrik) */}
            <div className="bg-surface dark:bg-slate-800/50 rounded-2xl p-6 sm:p-8 border border-border dark:border-slate-800">
              <h3 className="text-sm font-bold text-body dark:text-slate-100 uppercase tracking-widest mb-6">Informasi Proyek</h3>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-xs text-muted dark:text-slate-500 font-semibold uppercase mb-1">Peran Saya</p>
                  <p className="font-medium text-body dark:text-slate-200">Full-Stack Developer</p>
                </div>
                <div>
                  <p className="text-xs text-muted dark:text-slate-500 font-semibold uppercase mb-1">Lingkup Kerja</p>
                  <p className="font-medium text-body dark:text-slate-200">{project.category}</p>
                </div>
              </div>
              
              {/* Teknologi yang digunakan */}
              <div className="pt-6 border-t border-border dark:border-slate-700">
                <p className="text-xs text-muted dark:text-slate-500 font-semibold uppercase mb-3">Teknologi Utama</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack?.map((tech: string, idx: number) => (
                    <span key={idx} className="px-3 py-1 bg-white dark:bg-slate-700 border border-border dark:border-slate-600 text-body dark:text-slate-300 text-xs font-semibold rounded-full shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Detail & Fitur Utama */}
            <div className="space-y-4 pt-4">
              <h3 className="text-2xl font-bold text-body dark:text-slate-100">Fitur Utama</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-muted dark:text-slate-400">
                  <svg className="w-6 h-6 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  <span className="leading-relaxed">Dibangun dengan arsitektur modern yang skalabel dan efisien.</span>
                </li>
                <li className="flex items-start gap-3 text-muted dark:text-slate-400">
                  <svg className="w-6 h-6 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  <span className="leading-relaxed">Desain antarmuka responsif dengan pendekatan Mobile-first.</span>
                </li>
                <li className="flex items-start gap-3 text-muted dark:text-slate-400">
                  <svg className="w-6 h-6 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  <span className="leading-relaxed">Integrasi database real-time untuk memuat data secara langsung.</span>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}