import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/hooks';
import { supabase } from '@/lib/supabase'; // Import koneksi Supabase
import type { Category } from '@/types';
import { ProjectCard } from '@/components/ui';
import { SectionDivider } from '@/components/ui';

type Tab = 'all' | Category;

export const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('all');
  
  // STATE BARU: Menyimpan data dari Supabase
  const [projects, setProjects] = useState<any[]>([]);
  // STATE BARU: Mengontrol animasi loading
  const [isLoading, setIsLoading] = useState(true);

  // EFEK BARU: Menarik data secara otomatis saat komponen dimuat
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true); // Nyalakan animasi skeleton
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false }); // Proyek terbaru di atas

      if (data) {
        // Mapping kolom database agar sesuai dengan format yang diminta ProjectCard
        const formattedData = data.map(p => ({
          ...p,
          image: p.featured_image,
          techStack: p.tech_stack,
          liveUrl: p.live_url,
          githubUrl: p.github_url,
        }));
        setProjects(formattedData);
      }
      if (error) {
        console.error('Error fetching projects from Supabase:', error);
      }
      
      setIsLoading(false); // Matikan animasi setelah data selesai ditarik
    };

    fetchProjects();
  }, []);

  // Helper: Mencocokkan ID Tab frontend dengan Kategori Supabase
  const checkCategoryMatch = (projectCategory: string, tabId: string) => {
    if (tabId === 'web' && projectCategory === 'Web Application') return true;
    if (tabId === 'mobile' && projectCategory === 'Mobile Application') return true;
    if (tabId === 'computer_vision' && projectCategory === 'Computer Vision') return true;
    return projectCategory === tabId;
  };

  // Filter proyek berdasarkan Tab yang aktif
  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') return projects;
    return projects.filter(p => checkCategoryMatch(p.category, activeTab as string));
  }, [activeTab, projects]);

  // Hitung jumlah dinamis berdasarkan data dari database
  const counts: Record<Tab, number> = useMemo(() => ({
    all: projects.length,
    web: projects.filter(p => checkCategoryMatch(p.category, 'web')).length,
    mobile: projects.filter(p => checkCategoryMatch(p.category, 'mobile')).length,
    computer_vision: projects.filter(p => checkCategoryMatch(p.category, 'computer_vision')).length,
  }), [projects]);

  const tabs: { id: Tab; labelKey: string }[] = [
    { id: 'all', labelKey: 'grid.tab_all' },
    { id: 'web', labelKey: 'grid.tab_web' },
    { id: 'mobile', labelKey: 'grid.tab_mobile' },
    { id: 'computer_vision', labelKey: 'grid.tab_cv' },
  ];

  // KOMPONEN SKELETON LOADER (Tampil saat data sedang ditarik dari Supabase)
  const SkeletonCard = () => (
    <div className="flex flex-col rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm h-full animate-pulse">
      <div className="h-48 bg-slate-200 dark:bg-slate-700 w-full"></div>
      <div className="p-6 flex flex-col gap-3">
        <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-md mt-2"></div>
        <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
      </div>
    </div>
  );

  return (
    <>
      <section id="projects" className="bg-white dark:bg-slate-900 overflow-hidden pt-12 sm:pt-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center min-h-[60vh]">
            
            {/* Kolom Kiri: Teks & Penjelasan */}
            <div className="space-y-8 lg:pr-8 flex flex-col justify-center">
              <div className="space-y-4">
                <h2 className="text-5xl sm:text-6xl lg:text-[72px] font-normal text-body dark:text-slate-100 leading-[1.05] tracking-tight">
                  <span>{t('projects.my')}</span><br/>
                  <span className="font-semibold text-body dark:text-slate-100">{t('projects.title')}</span>
                </h2>
              </div>
              
              <p className="text-lg text-muted dark:text-slate-400 leading-relaxed max-w-lg">
                {t('projects.description')}
              </p>
              
              <div className="pt-2">
                <a href="#project-grid" className="btn-transition inline-flex items-center gap-2 px-6 py-3 bg-laravel hover:bg-laravel-dark text-white text-sm font-semibold rounded-lg shadow-sm shadow-laravel/20">
                  <span>{t('projects.view_button')}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
            </div>

            {/* Kolom Kanan: Mockup Smartphone */}
            <div className="flex justify-center lg:justify-end">
              <div className="phone-stage transform lg:-translate-y-4">
                <div className="phone-3d hover:scale-[1.02] transition-transform duration-500">
                  <div className="phone-3d-notch"></div>
                  <div className="phone-3d-screen">
                    <img src="/images/phone-mockup.png" alt="Mobile app project" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="project-grid" className="bg-surface dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {/* Tab Filter */}
          <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-4 py-2 text-sm font-semibold rounded-lg transition-colors hover:bg-white dark:hover:bg-slate-800 ${
                  activeTab === tab.id ? 'tab-active text-laravel' : 'text-muted dark:text-slate-400'
                }`}
              >
                <span>{t(tab.labelKey)}</span>
                <span className={`ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-md ${
                  activeTab === tab.id ? 'bg-laravel/10 text-laravel' : 'bg-surface dark:bg-slate-800 text-muted dark:text-slate-400 border border-border dark:border-slate-700'
                }`}>
                  {/* Tampilkan 0 saat loading agar angka tidak berantakan */}
                  {isLoading ? '0' : counts[tab.id]}
                </span>
              </button>
            ))}
          </div>

          {/* Bento Grid dengan Logika Loading */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              // Tampilkan 3 kartu skeleton berkedip saat data sedang ditarik
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : filteredProjects.length === 0 ? (
              // Tampilkan pesan kosong jika tidak ada data di kategori tersebut
              <div className="col-span-full py-12 text-center text-muted dark:text-slate-400">
                Belum ada proyek di kategori ini.
              </div>
            ) : (
              // Tampilkan kartu proyek asli
              filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};