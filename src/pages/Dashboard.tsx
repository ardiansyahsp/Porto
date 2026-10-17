import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

interface CodingActivity {
  id: string;
  date: string;
  project_name: string;
  duration_seconds: number;
  last_updated: string;
  category?: string; // <-- Kolom baru
  language?: string; // <-- Kolom baru
}

const getLocalDateString = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Palet warna untuk grafik donat Tech Stack
const PIE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  const [activities, setActivities] = useState<CodingActivity[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [githubStats, setGithubStats] = useState({ repos: 0, stars: 0, followers: 0 });
  const [loadingGithub, setLoadingGithub] = useState(true);
  const [totalViews, setTotalViews] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetchCodingData();
    fetchGithubStats(); 
    fetchViews(); 
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

  const fetchGithubStats = async () => {
    try {
      const userRes = await fetch('https://api.github.com/users/ardiansyahsp');
      const userData = await userRes.json();
      const reposRes = await fetch('https://api.github.com/users/ardiansyahsp/repos?per_page=100');
      const reposData = await reposRes.json();
      
      const totalStars = Array.isArray(reposData) 
        ? reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0) : 0;

      setGithubStats({
        repos: userData.public_repos || 0,
        stars: totalStars || 0,
        followers: userData.followers || 0
      });
    } catch (error) {
      console.error('Gagal mengambil data GitHub:', error);
    } finally {
      setLoadingGithub(false);
    }
  };

 const fetchViews = async () => {
    try {
      const { data, error } = await supabase
        .from('web_stats')
        .select('total_views')
        .eq('id', 1)
        .single();
        
      if (error) throw error;
      if (data) setTotalViews(data.total_views);
    } catch (err) {
      console.error('Gagal mengambil data views:', err);
    }
  };

  // --- LOGIKA DATA: HARI INI ---
  const todayStr = getLocalDateString(new Date());
  const todayActivities = activities.filter((act) => act.date === todayStr);
  const totalSecondsToday = todayActivities.reduce((acc, curr) => acc + curr.duration_seconds, 0);

  const formatTime = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // --- LOGIKA DATA: CHART 7 HARI TERAKHIR ---
  const getWeeklyData = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = getLocalDateString(d);
      
      const dayActs = activities.filter(act => act.date === dateStr);
      const sumSeconds = dayActs.reduce((acc, curr) => acc + curr.duration_seconds, 0);
      
      days.push({
        date: dateStr,
        displayDate: d.toLocaleDateString('id-ID', { weekday: 'short' }), 
        hours: Number((sumSeconds / 3600).toFixed(2)), 
        rawSeconds: sumSeconds 
      });
    }
    return days;
  };
  const weeklyData = getWeeklyData();

  // --- NEW: LOGIKA DATA TECH STACK ---
  const getTechStackData = () => {
    const stats: Record<string, number> = {};
    activities.forEach(act => {
      // Jika kolom language kosong/belum ada (dari data lama), masukkan ke "Lainnya"
      const lang = act.language && act.language !== 'Unknown' ? act.language : 'Lainnya';
      stats[lang] = (stats[lang] || 0) + act.duration_seconds;
    });

    // Ubah ke format array, filter yang > 0, urutkan terbanyak, ambil top 5
    return Object.entries(stats)
      .map(([name, value]) => ({ name, value }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };
  const techStackData = getTechStackData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-body dark:text-slate-100 tracking-tight">
          Developer Dashboard
        </h1>
        <p className="text-muted dark:text-slate-400 mt-2 text-sm sm:text-base">
          Metrik real-time mengenai aktivitas coding, statistik GitHub, dan performa portofolio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Live Coding Today */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 bg-slate-50 dark:bg-slate-800/50 border border-border dark:border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-slate-400 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              VS Code Activity Today
            </span>
            <button onClick={fetchCodingData} className="text-xs text-laravel hover:underline transition-colors">Refresh</button>
          </div>
          <div className="my-2">
            <h2 className="text-4xl sm:text-5xl font-black text-laravel dark:text-red-400">
              {loading ? '...' : formatTime(totalSecondsToday)}
            </h2>
            <p className="text-xs text-muted dark:text-slate-400 mt-2">
              Proyek Aktif Terakhir: <strong className="text-body dark:text-slate-200">{activities[0]?.project_name || 'Tidak ada'}</strong>
              {activities[0]?.category && (
                <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-slate-200 dark:bg-slate-700 font-medium">
                  {activities[0].category}
                </span>
              )}
            </p>
          </div>
          <div className="pt-4 border-t border-border dark:border-slate-700/50 text-[11px] text-muted dark:text-slate-400">
            Data dikirim otomatis dari skrip tracker lokal Windows via Supabase.
          </div>
        </motion.div>

        {/* Card 2: Location & Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-slate-50 dark:bg-slate-800/50 border border-border dark:border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-slate-400">Location & Time</span>
          <div className="my-4">
            <p className="text-2xl font-bold text-body dark:text-slate-100">Semarang, ID</p>
            <p className="text-sm text-emerald-500 font-medium mt-1">Available for work</p>
          </div>
          <p className="text-xs text-muted dark:text-slate-400">Timezone UTC+7 (WIB)</p>
        </motion.div>

        {/* Card 3: Visitor Counter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-slate-50 dark:bg-slate-800/50 border border-border dark:border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-slate-400">Total Views</span>
          <div className="my-4">
            <p className="text-3xl font-black text-body dark:text-slate-100">{totalViews}</p>
            <p className="text-xs text-emerald-500 mt-1">Pengunjung Unik (Live)</p>
          </div>
          <p className="text-xs text-muted dark:text-slate-400">Diperbarui otomatis via Supabase RPC</p>
        </motion.div>

        {/* --- WEEKLY BAR CHART (Disesuaikan ukurannya) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="md:col-span-3 lg:col-span-2 bg-slate-50 dark:bg-slate-800/50 border border-border dark:border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm flex flex-col"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-slate-400 mb-6">
            Weekly Activity Trend
          </span>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="displayDate" stroke={isDarkMode ? "#94a3b8" : "#64748b"} fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-lg shadow-xl text-xs">
                          <p className="font-bold text-slate-800 dark:text-white mb-1">{payload[0].payload.displayDate}</p>
                          <p className="text-emerald-500 font-medium">{formatTime(payload[0].payload.rawSeconds)} Terlacak</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                  {weeklyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.date === todayStr ? (isDarkMode ? '#f87171' : '#ef4444') : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* --- NEW CARD: TECH STACK PIE CHART --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
          className="md:col-span-3 lg:col-span-2 bg-slate-50 dark:bg-slate-800/50 border border-border dark:border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm flex flex-col"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-slate-400 mb-6">
            Top Tech Stack & Activity
          </span>
          <div className="w-full h-48 flex items-center justify-center">
            {techStackData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={techStackData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {techStackData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-lg shadow-xl text-xs">
                            <p className="font-bold text-slate-800 dark:text-white mb-1">{payload[0].payload.name}</p>
                            <p className="text-emerald-500 font-medium">
                              {formatTime(payload[0].payload.value)}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value) => <span className="text-xs text-muted dark:text-slate-400 ml-1">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-muted dark:text-slate-400">Menunggu data baru...</p>
            )}
          </div>
        </motion.div>

        {/* Card 4: GITHUB CONTRIBUTION GRAPH */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="md:col-span-3 lg:col-span-4 bg-slate-50 dark:bg-slate-800/50 border border-border dark:border-slate-700/60 rounded-2xl p-6 backdrop-blur-sm overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted dark:text-slate-400">
              GitHub Insights
            </span>
            <a href="https://github.com/ardiansyahsp" target="_blank" rel="noreferrer" className="text-xs text-laravel hover:underline flex items-center gap-1">
              github.com/ardiansyahsp <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-8">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-border dark:border-slate-700/40">
              <p className="text-2xl font-bold text-body dark:text-slate-100">{loadingGithub ? '...' : githubStats.repos}</p>
              <p className="text-xs text-muted dark:text-slate-400 mt-1">Public Repos</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-border dark:border-slate-700/40">
              <p className="text-2xl font-bold text-laravel dark:text-red-400">{loadingGithub ? '...' : githubStats.stars}</p>
              <p className="text-xs text-muted dark:text-slate-400 mt-1">Total Stars Earned</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-border dark:border-slate-700/40">
              <p className="text-2xl font-bold text-body dark:text-slate-100">{loadingGithub ? '...' : githubStats.followers}</p>
              <p className="text-xs text-muted dark:text-slate-400 mt-1">Followers</p>
            </div>
          </div>

          <div className="w-full flex justify-center text-sm">
            <GitHubCalendar 
              username="ardiansyahsp" 
              colorScheme={isDarkMode ? 'dark' : 'light'}
              blockSize={12}
              blockMargin={4}
              fontSize={12}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}