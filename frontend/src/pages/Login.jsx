import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, LogIn, UserPlus, Lock, Phone } from 'lucide-react';
import { companyInfo } from '../data/dummyData';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-slate-900 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(#2E7D32_1px,transparent_1px)] [background-size:32px_32px] opacity-15"></div>
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-md w-full px-4 sm:px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white flex items-center justify-center shadow-lg shadow-primary-600/30 mb-3">
              <Sprout className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-poppins">
              {isRegister ? 'Pendaftaran Anggota Baru' : 'Portal Masuk Anggota'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {companyInfo.name}
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Nama Lengkap Sesuai KTP
                </label>
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Nomor Telepon / WhatsApp
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="0821xxxxxxxx"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Kata Sandi / PIN 6 Digit
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="******"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Kategori Anggota
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary-500">
                  <option>Petani / Pangan</option>
                  <option>Pelaku UMKM / Perdagangan</option>
                  <option>Peternak / Perikanan</option>
                  <option>Masyarakat Umum (Simpanan)</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md shadow-primary-600/30 transition-all flex items-center justify-center gap-2 mt-6"
            >
              {isRegister ? (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Kirim Pendaftaran</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Masuk Akun</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              {isRegister
                ? 'Sudah punya akun? Masuk di sini'
                : 'Belum jadi anggota? Daftar di sini'}
            </button>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default Login;
