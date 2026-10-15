import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Sesuaikan path client Supabase-mu

interface CodingActivity {
  id: string;
  date: string;
  project_name: string;
  duration_seconds: number;
  last_updated: string;
}

export const CodingStats: React.FC = () => {
  const [activities, setActivities] = useState<CodingActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCodingData();
  }, []);

  const fetchCodingData = async () => {
    try {
      const { data, error } = await supabase
        .from('coding_activity')
        .select('*')
        .order('last_updated', { ascending: false });

      if (error) throw error;
      if (data) setActivities(data);
    } catch (err) {
      console.error('Gagal mengambil data coding:', err);
    } finally {
      setLoading(false);
    }
  };

  // Hitung total detik hari ini
  const todayStr = new Date().toISOString().split('T')[0];
  const todayActivities = activities.filter((act) => act.date === todayStr);
  const totalSecondsToday = todayActivities.reduce((acc, curr) => acc + curr.duration_seconds, 0);

  // Format detik ke jam & menit
  const formatTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    if (hours > 0) return `${hours}j ${minutes}m`;
    return `${minutes} menit`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 rounded-2xl border border-border dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-body dark:text-slate-100 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Live Coding Activity
          </h3>
          <p className="text-xs text-muted dark:text-slate-400 mt-1">
            Data dicatat otomatis dari VS Code lokal via Supabase
          </p>
        </div>
        <button
          onClick={fetchCodingData}
          className="text-xs px-3 py-1.5 rounded-lg border border-border dark:border-slate-700 hover:bg-surface dark:hover:bg-slate-800 text-muted dark:text-slate-300 transition-colors"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-sm text-muted dark:text-slate-500">Memuat statistik...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Total Hari Ini */}
          <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
            <p className="text-xs text-muted dark:text-slate-400 font-medium">Waktu Coding Hari Ini</p>
            <p className="text-2xl font-black text-laravel dark:text-red-400 mt-1">
              {formatTime(totalSecondsToday)}
            </p>
          </div>

          {/* Card 2: Proyek Aktif Terakhir */}
          <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
            <p className="text-xs text-muted dark:text-slate-400 font-medium">Proyek Terakhir</p>
            <p className="text-lg font-bold text-body dark:text-slate-200 mt-1 truncate">
              {activities[0]?.project_name || 'Belum ada'}
            </p>
          </div>

          {/* Card 3: Status System */}
          <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
            <p className="text-xs text-muted dark:text-slate-400 font-medium">Sistem Tracker</p>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1.5">
              <span>Self-hosted Active</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};