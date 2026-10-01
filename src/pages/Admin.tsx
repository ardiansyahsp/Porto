import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Inbox } from '@/components/Inbox'; // Sesuaikan lokasi file jika berbeda

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  
  // State untuk UI
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Application',
    description: '',
    featured_image: '',
    tech_stack: '',
    live_url: '',
    github_url: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProjects(data);
    if (error) console.error('Gagal menarik data:', error.message);
  };

  // Kalkulasi Statistik
  const stats = useMemo(() => {
    return {
      total: projects.length,
      web: projects.filter(p => p.category === 'Web Application').length,
      mobile: projects.filter(p => p.category === 'Mobile Application').length,
      cv: projects.filter(p => p.category === 'Computer Vision').length,
    };
  }, [projects]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Web Application',
      description: '',
      featured_image: '',
      tech_stack: '',
      live_url: '',
      github_url: ''
    });
    setEditingId(null);
    setImageFile(null);
    setMessage(null);
    setIsModalOpen(false); // Tutup modal
  };

  const handleEditClick = (project: any) => {
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      featured_image: project.featured_image || '',
      tech_stack: project.tech_stack ? project.tech_stack.join(', ') : '',
      live_url: project.live_url || '',
      github_url: project.github_url || ''
    });
    setEditingId(project.id);
    setImageFile(null);
    setIsModalOpen(true); // Buka modal
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    let finalImageUrl = formData.featured_image;

    if (imageFile) {
      setUploadingImg(true);
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, imageFile);

      if (uploadError) {
        setMessage({ type: 'error', text: `Gagal upload gambar: ${uploadError.message}` });
        setUploadingImg(false);
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      finalImageUrl = publicUrlData.publicUrl;
      setUploadingImg(false);
    }

    const techArray = formData.tech_stack
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const projectData = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      featured_image: finalImageUrl,
      tech_stack: techArray,
      live_url: formData.live_url,
      github_url: formData.github_url
    };

    if (editingId) {
      const { error } = await supabase.from('projects').update(projectData).eq('id', editingId);
      if (error) {
        setMessage({ type: 'error', text: `Gagal mengupdate: ${error.message}` });
      } else {
        fetchProjects();
        resetForm();
      }
    } else {
      const { error } = await supabase.from('projects').insert([projectData]);
      if (error) {
        setMessage({ type: 'error', text: `Gagal menyimpan: ${error.message}` });
      } else {
        fetchProjects();
        resetForm();
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus proyek ini? Data tidak bisa dikembalikan.');
    if (!confirmDelete) return;

    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      alert(`Gagal menghapus: ${error.message}`);
    } else {
      if (editingId === id) resetForm(); 
      fetchProjects();
    }
  };

  // Fungsi helper untuk warna badge kategori
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Web Application': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/20';
      case 'Mobile Application': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20';
      case 'Computer Vision': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-200 dark:border-purple-500/20';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400 border-slate-200 dark:border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-300">
      
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-laravel rounded-lg flex items-center justify-center shadow-lg shadow-laravel/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Admin Workspace</h1>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Portfolio Manager</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              Keluar
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Proyek</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Web Apps</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">{stats.web}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Mobile Apps</p>
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">{stats.mobile}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">AI / Vision</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">{stats.cv}</p>
          </div>
        </div>

        {/* Main Table Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 overflow-hidden">
          {/* Table Header Controls */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Daftar Portofolio</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Kelola data proyek yang akan ditampilkan ke publik.</p>
            </div>
            <button 
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold rounded-xl shadow-md hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
              Tambah Proyek
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/50 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  <th className="px-6 py-4 w-16">Cover</th>
                  <th className="px-6 py-4">Informasi Proyek</th>
                  <th className="px-6 py-4">Teknologi</th>
                  <th className="px-6 py-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
                      </div>
                      <h3 className="text-sm font-medium text-slate-900 dark:text-white">Belum ada proyek</h3>
                      <p className="text-sm text-slate-500 mt-1">Mulai tambahkan karya pertamamu ke dalam portofolio.</p>
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        {project.featured_image ? (
                          <img src={project.featured_image} alt={project.title} className="w-14 h-14 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm" />
                        ) : (
                          <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center text-[10px] text-slate-400 text-center leading-tight">No Img</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900 dark:text-white mb-1">{project.title}</p>
                        <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${getCategoryColor(project.category)}`}>
                          {project.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1.5 max-w-xs">
                          {project.tech_stack?.map((tech: string, i: number) => (
                            <span key={i} className="px-2 py-1 text-[11px] font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-md shadow-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEditClick(project)} className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors" title="Edit">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={() => handleDelete(project.id)} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Hapus">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- KOMPONEN INBOX DITAMBAHKAN DI SINI --- */}
        <Inbox />
        
      </div>

      {/* MODAL OVERLAY & FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Blur */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={resetForm}></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 scrollbar-hide">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {editingId ? 'Edit Data Proyek' : 'Tambah Proyek Baru'}
                </h2>
                {editingId && <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-0.5">Mode Edit Aktif - ID: {editingId.slice(0,8)}...</p>}
              </div>
              <button onClick={resetForm} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {message && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-medium border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400' : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400'}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Judul Proyek <span className="text-red-500">*</span></label>
                    <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-laravel outline-none text-slate-900 dark:text-white transition-all" placeholder="Misal: Aplikasi Inventori" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Kategori <span className="text-red-500">*</span></label>
                    <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-laravel outline-none text-slate-900 dark:text-white transition-all">
                      <option value="Web Application">Web Application</option>
                      <option value="Mobile Application">Mobile Application</option>
                      <option value="Computer Vision">Computer Vision</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Deskripsi Singkat <span className="text-red-500">*</span></label>
                  <textarea required name="description" rows={3} value={formData.description} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-laravel outline-none text-slate-900 dark:text-white transition-all" placeholder="Jelaskan fitur utama dan studi kasus..." />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tech Stack <span className="text-red-500">*</span></label>
                  <input required type="text" name="tech_stack" value={formData.tech_stack} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-laravel outline-none text-slate-900 dark:text-white transition-all" placeholder="Pisahkan dengan koma (Misal: React, Tailwind, Supabase)" />
                </div>

                {/* Area Upload File */}
                <div className="p-5 border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 rounded-xl hover:border-laravel transition-colors">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Gambar Cover (Upload)</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <input 
                      id="imageUpload" type="file" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} 
                      className="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-slate-200 file:text-slate-700 dark:file:bg-slate-700 dark:file:text-slate-200 hover:file:bg-slate-300 dark:hover:file:bg-slate-600 transition-colors cursor-pointer"
                    />
                    {editingId && formData.featured_image && !imageFile && (
                      <div className="shrink-0">
                        <img src={formData.featured_image} alt="Preview" className="h-12 w-12 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">URL Live Preview</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg></span>
                      <input type="url" name="live_url" value={formData.live_url} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-laravel outline-none text-sm text-slate-900 dark:text-white" placeholder="https://..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">URL GitHub</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg></span>
                      <input type="url" name="github_url" value={formData.github_url} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-laravel outline-none text-sm text-slate-900 dark:text-white" placeholder="https://github.com/..." />
                    </div>
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="sticky bottom-0 -mx-6 -mb-6 p-6 bg-slate-50 dark:bg-slate-800/90 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 rounded-b-2xl">
                  <button type="button" onClick={resetForm} className="px-6 py-2.5 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors">
                    Batal
                  </button>
                  <button disabled={loading || uploadingImg} type="submit" className="px-8 py-2.5 bg-laravel hover:bg-red-600 text-white font-semibold rounded-xl shadow-lg shadow-laravel/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2">
                    {(loading || uploadingImg) ? (
                      <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Memproses...</>
                    ) : (editingId ? 'Simpan Perubahan' : 'Tambahkan Proyek')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}