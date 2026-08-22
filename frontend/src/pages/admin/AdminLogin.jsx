import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useKopdes } from '../../context/KopdesContext';

const AdminLogin = () => {
  const { login } = useAuth();
  const { kopdesData } = useKopdes();
  const navigate = useNavigate();

  const [view, setView] = useState('login'); // 'login', 'register', 'forgot'
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const switchView = (newView) => {
    setView(newView);
    setError('');
    setSuccessMsg('');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username/Email dan password wajib diisi');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`http://${window.location.hostname}:5000/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const result = await response.json();
      
      if (result.success) {
        login({
          username: result.data.user.username,
          name: result.data.user.username === 'admin' ? 'Administrator Kopdes' : result.data.user.username,
          role: result.data.user.role,
          loginTime: new Date().toISOString(),
          token: result.data.token
        });
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(result.message || 'Gagal masuk, periksa kembali username/email/password.');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan jaringan, pastikan server aktif.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('Username, Email, dan password wajib diisi');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`http://${window.location.hostname}:5000/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSuccessMsg('Pengguna berhasil ditambahkan. Silakan masuk.');
        setUsername('');
        setPassword('');
        setView('login');
      } else {
        setError(result.message || 'Gagal menambahkan pengguna.');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!username.trim() || !password.trim()) {
      setError('Username dan kata sandi baru wajib diisi');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`http://${window.location.hostname}:5000/api/v1/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, newPassword: password })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSuccessMsg('Kata sandi berhasil direset. Silakan masuk.');
        setUsername('');
        setPassword('');
        setView('login');
      } else {
        setError(result.message || 'Gagal mereset kata sandi.');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan jaringan.');
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
              {view === 'login' && 'Masuk Ke Panel Pengelola'}
              {view === 'register' && 'Tambah Pengguna Baru'}
              {view === 'forgot' && 'Reset Kata Sandi'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {view === 'login' && 'Silakan masukkan kredensial akun administrator Anda.'}
              {view === 'register' && 'Buat akun administrator baru.'}
              {view === 'forgot' && 'Masukkan username dan kata sandi baru Anda.'}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={view === 'login' ? handleLogin : view === 'register' ? handleRegister : handleForgot} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {view === 'register' ? 'Username' : 'Username / Email'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={view === 'register' ? 'admin' : 'admin atau email'}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {view === 'register' && (
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
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {view === 'forgot' ? 'Kata Sandi Baru' : 'Kata Sandi'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            {view === 'login' && (
              <div className="flex justify-end">
                <button type="button" onClick={() => switchView('forgot')} className="text-xs font-bold text-primary hover:underline">
                  Lupa Kata Sandi?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-lg bg-primary hover:bg-primary-700 text-white font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              <span>
                {isSubmitting ? 'Memproses...' : (view === 'login' ? 'Masuk Dasbor' : view === 'register' ? 'Daftar' : 'Simpan Sandi Baru')}
              </span>
            </button>
          </form>

          {view === 'login' ? (
            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-500 font-medium">
                Belum punya akun? <button onClick={() => switchView('register')} className="text-primary font-bold hover:underline">Tambah Pengguna</button>
              </p>
            </div>
          ) : (
            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-500 font-medium">
                Sudah ingat akun Anda? <button onClick={() => switchView('login')} className="text-primary font-bold hover:underline">Kembali Masuk</button>
              </p>
            </div>
          )}
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
