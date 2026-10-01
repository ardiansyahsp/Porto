import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase'; // Import Supabase

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');

  // State baru untuk menyimpan data dari Supabase
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Ambil data dari Supabase hanya saat modal dibuka pertama kali
  useEffect(() => {
    const fetchSearchData = async () => {
      // Jika data sudah ada, tidak perlu fetch lagi agar cepat
      if (projects.length > 0) return;

      setIsLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setProjects(data);
      if (error) console.error('Gagal mengambil data pencarian:', error);

      setIsLoading(false);
    };

    if (isOpen) {
      fetchSearchData();
    }
  }, [isOpen, projects.length]);

  // Efek untuk shortcut keyboard (Cmd+K / Ctrl+K dan Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Efek untuk auto-focus dan mereset form saat modal dibuka/ditutup
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      setSearchQuery(''); // Bersihkan pencarian saat ditutup
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Logika Filter Data disesuaikan dengan kolom di Supabase
  const filteredProjects = projects.filter((project) => {
    if (!searchQuery) return false;
    const lowerQuery = searchQuery.toLowerCase();

    return (
      project.title?.toLowerCase().includes(lowerQuery) ||
      project.category?.toLowerCase().includes(lowerQuery) ||
      project.description?.toLowerCase().includes(lowerQuery) ||
      (project.tech_stack && project.tech_stack.some((tech: string) => tech.toLowerCase().includes(lowerQuery)))
    );
  });

  const handleSelectProject = (projectId: string) => {
    navigate(`/project/${projectId}`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4 search-overlay bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-dropdownIn border border-border dark:border-slate-700 transition-colors duration-300">

        {/* Area Input */}
        <div className="flex items-center border-b border-border dark:border-slate-700 px-4 py-4 transition-colors duration-300">
          <svg className="w-5 h-5 text-laravel mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari proyek berdasarkan nama, fitur, atau teknologi..."
            className="flex-1 text-base outline-none bg-transparent text-body dark:text-slate-100 placeholder-muted dark:placeholder-slate-500"
          />
          <button onClick={onClose} className="hidden sm:inline-flex items-center px-2 py-1 text-[10px] font-bold tracking-wider text-muted dark:text-slate-400 hover:text-body dark:hover:text-slate-100 bg-surface dark:bg-slate-800 rounded border border-border dark:border-slate-700 ml-2 transition-colors">
            ESC
          </button>
        </div>

        {/* Area Hasil Pencarian */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="px-4 py-12 text-center text-sm text-muted dark:text-slate-400">
              <svg className="animate-spin h-6 w-6 text-laravel mx-auto mb-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Menghubungkan ke database...
            </div>
          ) : searchQuery.length === 0 ? (
            <div className="px-4 py-12 text-center text-sm text-muted dark:text-slate-400">
              Ketik sesuatu untuk mencari portofolio...
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="p-2 space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-muted dark:text-slate-400 uppercase tracking-wider">
                Hasil Pencarian
              </div>
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleSelectProject(project.id)}
                  className="w-full flex items-start gap-4 px-3 py-3 text-left rounded-lg hover:bg-surface dark:hover:bg-slate-800 group transition-colors"
                >
                  <div className="w-12 h-12 rounded bg-gray-100 dark:bg-slate-800 shrink-0 overflow-hidden border border-border dark:border-slate-700 transition-colors flex items-center justify-center">
                    {project.featured_image ? (
                      <img src={project.featured_image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-muted">No Img</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-body dark:text-slate-100 group-hover:text-laravel truncate transition-colors">
                        {project.title}
                      </span>
                      <span className="px-1.5 py-0.5 text-[10px] font-bold text-muted dark:text-slate-400 bg-white dark:bg-slate-900 border border-border dark:border-slate-700 rounded uppercase transition-colors">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted dark:text-slate-400 truncate transition-colors">
                      {project.description}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-gray-300 dark:text-slate-600 group-hover:text-laravel shrink-0 mt-3 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-12 text-center text-sm text-muted dark:text-slate-400">
              Tidak ada proyek yang cocok dengan pencarian <span className="font-semibold text-body dark:text-slate-100">"{searchQuery}"</span>.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};