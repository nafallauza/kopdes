import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, UserCheck, Building2, Image as ImageIcon, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useKopdes } from '../../context/KopdesContext';

const AdminDashboard = () => {
  const { kopdesData } = useKopdes();

  const statCards = [
    {
      title: "Struktur Pengurus",
      count: "4 Posisi Resmi",
      sub: "Ketua, Sekretaris, Bendahara, Pengawas",
      icon: UserCheck,
      link: "/admin/profile",
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      title: "Unit Layanan Usaha",
      count: `${kopdesData.layanan.length} Unit`,
      sub: "Daftar unit layanan aktif",
      icon: Building2,
      link: "/admin/layanan",
      color: "bg-red-50 text-primary border-red-200"
    },
    {
      title: "Galeri Dokumentasi",
      count: `${kopdesData.galeri.length} Momen`,
      sub: "Foto & Video kegiatan",
      icon: ImageIcon,
      link: "/admin/galeri",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      title: "Kontak & Sosmed",
      count: "Aktif",
      sub: "Alamat, Telepon & Sosmed",
      icon: Phone,
      link: "/admin/footer",
      color: "bg-amber-50 text-amber-800 border-amber-200"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-red-50 text-primary border border-red-200 mb-2">
            Panel Pengelola Cabang
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Dasbor Utama Pengelolaan Content
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Kelola data profil, unit layanan usaha, galeri dokumentasi, dan kontak cabang {kopdesData.branchName}.
          </p>
        </div>

        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex-shrink-0"
        >
          <span>Lihat Tampilan Website</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${card.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
                <span className="text-xs font-semibold text-slate-500">{card.title}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{card.count}</h3>
              </div>
              <p className="text-[11px] text-slate-500 border-t border-slate-100 pt-2.5 mt-3">{card.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* Quick Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Profile Status */}
        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Profil & Badan Hukum Resmi</h3>
            <Link to="/admin/profile" className="text-xs text-primary font-bold hover:underline">
              Kelola &rarr;
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-600">Badan Hukum:</span>
              <span className="font-bold text-slate-900">{kopdesData.legal.badanHukum}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-600">Wilayah Operasional:</span>
              <span className="font-bold text-slate-900">{kopdesData.legal.wilayahKerja}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="font-semibold text-slate-600">Alamat Kantor:</span>
              <span className="font-bold text-slate-900 line-clamp-1">{kopdesData.kontak.alamat}</span>
            </div>
          </div>
        </div>

        {/* Pengurus Quick List */}
        <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Struktur Pengurus Cabang</h3>
            <Link to="/admin/profile" className="text-xs text-primary font-bold hover:underline">
              Edit Pengurus &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Ketua</span>
              <p className="font-bold text-slate-900 mt-0.5">{kopdesData.pengurus.ketua?.nama}</p>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Sekretaris</span>
              <p className="font-bold text-slate-900 mt-0.5">{kopdesData.pengurus.sekretaris?.nama}</p>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Bendahara</span>
              <p className="font-bold text-slate-900 mt-0.5">{kopdesData.pengurus.bendahara?.nama}</p>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Pengawas</span>
              <p className="font-bold text-slate-900 mt-0.5">{kopdesData.pengurus.pengawas?.nama}</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
