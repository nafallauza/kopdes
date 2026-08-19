import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, Flag, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useKopdes } from '../../context/KopdesContext';

const AdminLogin = () => {
  const { login } = useAuth();
  const { kopdesData } = useKopdes();
  const navigate = useNavigate();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username dan password wajib diisi');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      login({
        username: username,
        name: username === 'admin' ? 'Administrator Kopdes' : username,
        role: 'admin',
        loginTime: new Date().toISOString()
      });
      setIsSubmitting(false);
      navigate('/admin/dashboard', { replace: true });
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
      
      {/* Container */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
        
        {/* Header Branding */}
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

        {/* Form Area */}
        <div className="p-8">
          <div className="mb-6 text-center">
            <h3 className="text-base font-bold text-slate-900">Masuk Ke Panel Pengelola</h3>
            <p className="text-xs text-slate-500 mt-1">
              Silakan masukkan kredensial akun administrator Anda.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Username / Email Administrator
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-primary hover:bg-primary-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                <span>Memproses Masuk...</span>
              ) : (
                <>
                  <span>Masuk Dasbor Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Credential Hint */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500 font-medium">
              Kredensial Default: Username: <code className="text-primary font-bold">admin</code> | Password: <code className="text-primary font-bold">admin123</code>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-semibold">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-primary transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Situs Utama</span>
          </Link>

          <span className="flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>Kopdes Merah Putih</span>
          </span>
        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
