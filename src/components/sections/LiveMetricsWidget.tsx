import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Pastikan path import Supabase ini sesuai dengan milikmu!

interface RecentActivity {
  project_name: string;
  duration_seconds: number;
  last_updated: string;
}

export const LiveMetricsWidget: React.FC = () => {
  const [latestActivity, setLatestActivity] = useState<RecentActivity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk menarik 1 data coding terakhir dari Supabase
    const fetchLatestCoding = async () => {
      try {
        const { data, error } = await supabase
          .from('coding_activity')
          .select('*')
          .order('last_updated', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') throw error; // Abaikan error jika tabel masih kosong
        if (data) setLatestActivity(data);
      } catch (err) {
        console.error('Gagal mengambil data coding:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCoding();
    
    // (Opsional: Kamu bisa menambahkan interval untuk refresh tiap 30 detik di sini nanti)
  }, []);

  return (
    <div className="w-full max-w-sm bg-white/5 dark:bg-slate-800/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-5 shadow-lg relative overflow-hidden group hover:border-laravel/50 transition-colors duration-300">
      
      {/* Efek glow di background */}
      <div className="absolute -right-10 -top-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-laravel/20 transition-colors"></div>

      <div className="relative z-10 flex flex-col gap-4">
        {/* Status Ketersediaan */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              Available for work
            </span>
          </div>
          <span className="text-[10px] text-slate-400">ID (WIB)</span>
        </div>

        {/* Live Coding Status */}
        <div className="space-y-1">
          <p className="text-[11px] text-slate-500 font-semibold tracking-wider uppercase">Live Activity</p>
          {loading ? (
             <p className="text-sm text-slate-400 animate-pulse">Menghubungkan ke terminal...</p>
          ) : latestActivity ? (
            <div className="flex items-start gap-3">
              <span className="text-2xl">💻</span>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-white leading-tight">
                  Membangun <span className="text-laravel dark:text-red-400">{latestActivity.project_name}</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                   Terakhir aktif: {new Date(latestActivity.last_updated).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                </p>
              </div>
            </div>
          ) : (
             <p className="text-sm text-slate-400">Sedang mencari ide proyek baru ☕</p>
          )}
        </div>

        {/* Tombol CTA ke Dashboard */}
        <div className="pt-2">
          {/* Nanti href-nya bisa diubah jadi router link misal <Link to="/dashboard"> */}
          <a href="/dashboard" className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 dark:bg-slate-100 hover:bg-laravel dark:hover:bg-laravel text-white dark:text-slate-900 font-semibold text-xs rounded-xl transition-all duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            Jelajahi Developer Metrics
          </a>
        </div>
      </div>
    </div>
  );
};