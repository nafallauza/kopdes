import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useKopdes } from '../../context/KopdesContext';
import { supabase } from '../../config/supabaseClient';

const AdminLogin = () => {
  const { kopdesData } = useKopdes();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email dan password wajib diisi');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      
      if (error) throw error;
      
      if (data.session) {
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Gagal masuk, periksa kembali email/password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">

      <div className="w-full max-w-md bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">

        <div className="bg-white p-8 text-center border-b border-slate-200">
          <img
            src={kopdesData.logo}
            alt="Logo Kopdes"
            className="h-16 w-auto object-contain mx-auto mb-3"
          />
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{kopdesData.shortName}</h2>
          <p className="text-xs text-primary font-bold uppercase tracking-wider mt-1">
            Portal Administrasi Resmi Cabang
          </p>
        </div>

        <div className="p-8">
          <div className="mb-6 text-center">
            <h3 className="text-base font-bold text-slate-900">
              Masuk Ke Panel Pengelola
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Silakan masukkan kredensial akun administrator Anda.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kopdes.com"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors pr-10"
                />
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-primary hover:bg-primary-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                <span>
                  {isSubmitting ? 'Memproses...' : 'Masuk Dasbor'}
                </span>
              </button>
            </div>
          </form>
        </div>

        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
            <span>Kembali ke Situs Utama</span>
          </Link>

          <span className="flex items-center gap-1 text-[11px]">
            <span>Kopdes Merah Putih</span>
          </span>
        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
