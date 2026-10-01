import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase'; // Sesuaikan path ini dengan letak file supabase.ts kamu

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Proses autentikasi ke Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (data.session) {
      // Jika berhasil, arahkan ke halaman admin
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-slate-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-border dark:border-slate-700 p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-body dark:text-slate-100 tracking-tight">Admin Area</h1>
          <p className="text-sm text-muted dark:text-slate-400 mt-2">Masuk untuk mengelola portofolio</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-body dark:text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-border dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-laravel focus:border-transparent outline-none text-body dark:text-slate-100 transition-all"
              placeholder="admin@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-body dark:text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-border dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-laravel focus:border-transparent outline-none text-body dark:text-slate-100 transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-laravel hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              'Masuk'
            )}
          </button>
        </form>

      </div>
    </div>
  );
}