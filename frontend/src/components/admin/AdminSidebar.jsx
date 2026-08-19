import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UserCheck, Building2, Image as ImageIcon, Phone, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';
import { useKopdes } from '../../context/KopdesContext';

const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  const { kopdesData } = useKopdes();
  const location = useLocation();

  const menuItems = [
    { name: "Overview Dasbor", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "1. Profile & Pengurus", path: "/admin/profile", icon: UserCheck },
    { name: "2. Unit Layanan Usaha", path: "/admin/layanan", icon: Building2 },
    { name: "3. Galeri Dokumentasi", path: "/admin/galeri", icon: ImageIcon },
    { name: "4. Footer & Kontak", path: "/admin/footer", icon: Phone },
  ];

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white text-slate-800 z-50 flex flex-col justify-between transition-transform duration-200 border-r border-slate-200 shadow-sm ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header Brand */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3">
            <img
              src={kopdesData.logo}
              alt="Logo Kopdes"
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col border-l border-slate-200 pl-3">
              <span className="font-extrabold text-sm text-slate-900 leading-tight">
                {kopdesData.shortName}
              </span>
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider mt-0.5">
                Panel Administrasi
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu Pengelolaan Content
            </div>
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-red-50 text-primary border border-red-100 shadow-xs'
                      : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-slate-500'}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-primary" />}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors shadow-xs"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-primary" />
              <span>Lihat Situs Publik</span>
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live
            </span>
          </Link>

          <div className="px-2 pt-1 text-[11px] text-slate-500 flex items-center justify-between font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Kopdes Merah Putih</span>
            </span>
            <span className="text-[10px] text-slate-400">v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
