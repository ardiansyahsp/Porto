import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Untuk pindah halaman
import { projects } from '@/data/projects'; // Mengambil data proyek

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // State untuk menyimpan teks pencarian
  const [searchQuery, setSearchQuery] = useState('');

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

  // Logika Filter Data: Cari berdasarkan judul, kategori, deskripsi, atau tech stack
  const filteredProjects = projects.filter((project) => {
    if (!searchQuery) return false; // Jangan tampilkan apa-apa jika belum mengetik
    const lowerQuery = searchQuery.toLowerCase();
    
    return (
      project.title.toLowerCase().includes(lowerQuery) ||
      project.categoryLabel.toLowerCase().includes(lowerQuery) ||
      project.description.toLowerCase().includes(lowerQuery) ||
      (project.techStack && project.techStack.some(tech => tech.toLowerCase().includes(lowerQuery)))
    );
  });

  // Fungsi saat hasil pencarian diklik
  const handleSelectProject = (projectId: string) => {
    navigate(`/project/${projectId}`); // Pindah ke halaman detail
    onClose(); // Tutup modal pencarian
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4 search-overlay bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-dropdownIn border border-border">
        
        {/* Area Input */}
        <div className="flex items-center border-b border-border px-4 py-4">
          <svg className="w-5 h-5 text-laravel mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari proyek berdasarkan nama, fitur, atau teknologi (misal: Laravel)..."
            className="flex-1 text-base outline-none bg-transparent text-body placeholder-muted"
          />
          <button onClick={onClose} className="hidden sm:inline-flex items-center px-2 py-1 text-[10px] font-bold tracking-wider text-muted hover:text-body bg-surface rounded border border-border ml-2 transition-colors">
            ESC
          </button>
        </div>

        {/* Area Hasil Pencarian */}
        <div className="max-h-[60vh] overflow-y-auto">
          {searchQuery.length === 0 ? (
            // State: Belum mengetik
            <div className="px-4 py-12 text-center text-sm text-muted">
              Ketik sesuatu untuk mencari portofolio...
            </div>
          ) : filteredProjects.length > 0 ? (
            // State: Hasil ditemukan
            <div className="p-2 space-y-1">
              <div className="px-3 py-2 text-xs font-semibold text-muted uppercase tracking-wider">
                Hasil Pencarian
              </div>
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleSelectProject(project.id)}
                  className="w-full flex items-start gap-4 px-3 py-3 text-left rounded-lg hover:bg-surface group transition-colors"
                >
                  <div className="w-12 h-12 rounded bg-gray-100 shrink-0 overflow-hidden border border-border">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-bold text-body group-hover:text-laravel truncate">
                        {project.title}
                      </span>
                      <span className="px-1.5 py-0.5 text-[10px] font-bold text-muted bg-white border border-border rounded uppercase">
                        {project.categoryLabel}
                      </span>
                    </div>
                    <p className="text-xs text-muted truncate">
                      {project.description}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-gray-300 group-hover:text-laravel shrink-0 mt-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              ))}
            </div>
          ) : (
            // State: Tidak ditemukan
            <div className="px-4 py-12 text-center text-sm text-muted">
              Tidak ada proyek yang cocok dengan pencarian <span className="font-semibold text-body">"{searchQuery}"</span>.
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};