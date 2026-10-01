import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase'; // Pastikan path ini sesuai dengan letak file supabase-mu

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Mengecek sesi saat komponen pertama kali dimuat
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    // Memantau perubahan jika user tiba-tiba logout atau login
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Layar loading sebentar saat mengecek keamanan
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin h-8 w-8 border-4 border-laravel border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Jika tidak ada sesi (belum login), tendang ke /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika aman (sudah login), izinkan render komponen admin
  return <>{children}</>;
};