import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const { error } = await supabase
      .from('messages')
      .insert([{ name: formData.name, email: formData.email, message: formData.message }]);

    if (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    } else {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="max-w-2xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Get In Touch</h2>
        <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm sm:text-base">
          Punya pertanyaan atau tawaran kerja sama? Kirimkan pesan di bawah ini.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nama</label>
          <input 
            type="text" id="name" name="name" required placeholder="John Doe"
            value={formData.name} onChange={handleChange} 
            className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-red-500" 
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
          <input 
            type="email" id="email" name="email" required placeholder="john@example.com"
            value={formData.email} onChange={handleChange} 
            className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-red-500" 
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Pesan</label>
          <textarea 
            id="message" name="message" rows={5} required placeholder="Halo, saya tertarik untuk mendiskusikan proyek..."
            value={formData.message} onChange={handleChange} 
            className="block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-red-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all resize-y dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-red-500"
          />
        </div>

        <button 
          type="submit" 
          disabled={status === 'loading'} 
          className="w-full flex justify-center items-center py-3.5 px-4 mt-2 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Mengirim...
            </span>
          ) : 'Kirim Pesan'}
        </button>

        {status === 'success' && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl dark:bg-green-900/20 dark:border-green-800 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-green-600 dark:text-green-400 text-center text-sm font-medium">
              ✨ Pesan berhasil terkirim! Saya akan segera membalasnya.
            </p>
          </div>
        )}
        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl dark:bg-red-900/20 dark:border-red-800 animate-in fade-in slide-in-from-bottom-2">
            <p className="text-red-600 dark:text-red-400 text-center text-sm font-medium">
              Gagal mengirim pesan. Pastikan koneksi internet stabil.
            </p>
          </div>
        )}
      </form>
    </section>
  );
};