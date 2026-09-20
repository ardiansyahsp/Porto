// src/pages/ProjectDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { projects } from '@/data/projects'; // Pastikan path ini benar

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  
  // Cari proyek berdasarkan ID dari URL
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-body mb-4">Proyek Tidak Ditemukan</h1>
        <Link to="/" className="px-6 py-2 bg-laravel text-white rounded-md hover:bg-red-600 transition">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    // Jarak atas (padding top) dikurangi agar tombol back lebih naik
    <div className="max-w-5xl mx-auto px-6 pt-6 pb-16 md:pt-10 md:pb-24">
      
      {/* Tombol Back */}
      <Link to="/" className="inline-flex items-center text-muted hover:text-laravel mb-6 transition">
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Portofolio
      </Link>

      {/* Header Proyek */}
      <div className="mb-12">
        <span className="text-sm font-bold tracking-widest text-laravel uppercase">
          {project.categoryLabel} Project
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-body mt-3 mb-6 leading-tight">
          {project.title}
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-3xl">
          {project.fullDescription || project.description}
        </p>
      </div>

      {/* Hero Image / Mockup Besar */}
      <div className="rounded-2xl overflow-hidden shadow-2xl border border-border mb-16 bg-surface aspect-video">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Grid Informasi Proyek (Peran, Tech, Link) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        
        {/* Kolom 1: Peran & Deskripsi */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold text-body mb-4">Tentang Proyek</h2>
          <p className="text-muted leading-relaxed mb-8">
            {project.fullDescription || "Aplikasi ini dibangun untuk mengoptimalkan proses bisnis dan memberikan antarmuka yang intuitif bagi pengguna. Fokus utama adalah pada kecepatan, responsivitas, dan arsitektur yang mudah di-maintain (scalable)."}
          </p>

          <h3 className="text-xl font-bold text-body mb-4">Fitur Utama</h3>
          <ul className="list-disc list-inside text-muted space-y-2">
            {project.features ? project.features.map((feat, i) => (
              <li key={i}>{feat}</li>
            )) : (
              <>
                <li>Sistem Autentikasi & Otorisasi yang aman</li>
                <li>Desain antarmuka responsif (Mobile-first)</li>
                <li>Integrasi API untuk data real-time</li>
              </>
            )}
          </ul>
        </div>

        {/* Kolom 2: Metadata */}
        <div className="bg-surface p-8 rounded-xl border border-border h-fit">
          <div className="mb-6">
            <h4 className="text-sm font-bold text-body uppercase tracking-wider mb-2">My Role</h4>
            <p className="text-muted">{project.role || "Web Developer"}</p>
          </div>
          
          <div className="mb-8">
            <h4 className="text-sm font-bold text-body uppercase tracking-wider mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech, idx) => (
                <span key={idx} className="px-3 py-1 text-xs font-bold text-body bg-white border border-border rounded-md shadow-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-center px-4 py-3 bg-laravel text-white font-semibold rounded-lg hover:bg-red-600 transition shadow-md">
                Kunjungi Website
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-center px-4 py-3 bg-white border border-border text-body font-semibold rounded-lg hover:bg-surface transition">
                Lihat Source Code
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}