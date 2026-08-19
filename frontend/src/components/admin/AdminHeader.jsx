import React from 'react';
import { Menu, LogOut, User, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useKopdes } from '../../context/KopdesContext';

const AdminHeader = ({ setMobileOpen }) => {
  const { logout, user } = useAuth();
  const { kopdesData, resetData } = useKopdes();

  const handleResetData = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh data ke standar default?')) {
      resetData();
      alert('Data telah dikembalikan ke standar awal.');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
      
      {/* Left: Mobile Toggle & Branch Info */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden border border-slate-200 transition-colors"
          aria-label="Open Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-slate-900">{kopdesData.branchName}</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Online
            </span>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline font-medium">
            Badan Hukum: {kopdesData.legal.badanHukum}
          </span>
        </div>
      </div>

      {/* Right: Actions, User Info & Logout */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleResetData}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
          title="Reset data ke default"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset Default</span>
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-primary border border-red-100 flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {user?.name || 'Administrator Kopdes'}
            </span>
            <span className="text-[10px] text-primary font-semibold">Pengelola Cabang</span>
          </div>
        </div>

        <button
          onClick={logout}
          className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-red-50 border border-slate-200 transition-colors"
          title="Keluar / Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

    </header>
  );
};

export default AdminHeader;
