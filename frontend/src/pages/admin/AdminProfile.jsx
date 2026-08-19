import React, { useState } from 'react';
import { Save, CheckCircle2, MapPin, Lock, FileText, UserCheck, Eye, Compass, Target } from 'lucide-react';
import { useKopdes } from '../../context/KopdesContext';

const AdminProfile = () => {
  const { kopdesData, updateProfileDinamis } = useKopdes();
  const [successMessage, setSuccessMessage] = useState('');

  // Local state for editable forms (Dinamis)
  const [alamat, setAlamat] = useState(kopdesData.kontak.alamat);
  const [googleMapsLink, setGoogleMapsLink] = useState(kopdesData.kontak.googleMapsLink);
  const [googleMapsEmbedUrl, setGoogleMapsEmbedUrl] = useState(kopdesData.kontak.googleMapsEmbedUrl);

  const [ketua, setKetua] = useState({
    nama: kopdesData.pengurus.ketua?.nama || '',
    foto: kopdesData.pengurus.ketua?.foto || '',
    pesan: kopdesData.pengurus.ketua?.pesan || ''
  });

  const [sekretaris, setSekretaris] = useState({
    nama: kopdesData.pengurus.sekretaris?.nama || '',
    foto: kopdesData.pengurus.sekretaris?.foto || '',
    pesan: kopdesData.pengurus.sekretaris?.pesan || ''
  });

  const [bendahara, setBendahara] = useState({
    nama: kopdesData.pengurus.bendahara?.nama || '',
    foto: kopdesData.pengurus.bendahara?.foto || '',
    pesan: kopdesData.pengurus.bendahara?.pesan || ''
  });

  const [pengawas, setPengawas] = useState({
    nama: kopdesData.pengurus.pengawas?.nama || '',
    foto: kopdesData.pengurus.pengawas?.foto || '',
    pesan: kopdesData.pengurus.pengawas?.pesan || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileDinamis({
      alamat,
      googleMapsLink,
      googleMapsEmbedUrl,
      ketua,
      sekretaris,
      bendahara,
      pengawas
    });

    setSuccessMessage('Data Profil Dinamis (Alamat & Pengurus) berhasil diperbarui!');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Pengelolaan Profile</h1>
          <p className="text-xs text-slate-600 mt-1">
            Kelola data statis (informasi resmi) dan data dinamis (Alamat & Struktur Pengurus).
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* SECTION 1: STATIS (READ ONLY) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Lock className="w-4 h-4 text-slate-500" />
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            1. Informational Statis (Konfigurasi Tetap)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-primary" /> Nomor Badan Hukum Resmi
            </span>
            <p className="font-semibold text-slate-900">{kopdesData.legal.badanHukum}</p>
            <p className="text-[11px] text-slate-500">Terdaftar di Kemenkumham RI & Kementerian Koperasi UKM</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" /> Wilayah Operasional Resmi
            </span>
            <p className="font-semibold text-slate-900">{kopdesData.legal.wilayahKerja}</p>
            <p className="text-[11px] text-slate-500">Izin Usaha Kabupaten & Lembaga Desa</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-primary" /> Visi Utama
            </span>
            <p className="italic text-slate-700">"{kopdesData.visi}"</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-primary" /> Deskripsi Utama
            </span>
            <p className="text-slate-700 leading-relaxed">{kopdesData.description}</p>
          </div>
        </div>
      </div>

      {/* SECTION 2: DINAMIS (EDITABLE FORM) */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Alamat & Maps Embed Form */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              2. Data Dinamis - Alamat Kantor & Peta Google Maps
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                Alamat Lengkap Sekretariat Cabang
              </label>
              <textarea
                rows={2}
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Link Tombol Google Maps ("Buka di Google Maps")
                </label>
                <input
                  type="text"
                  value={googleMapsLink}
                  onChange={(e) => setGoogleMapsLink(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-primary text-xs"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  URL Embed Google Maps (Iframe Src)
                </label>
                <input
                  type="text"
                  value={googleMapsEmbedUrl}
                  onChange={(e) => setGoogleMapsEmbedUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-primary text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Executive Board Forms (Ketua, Sekretaris, Bendahara, Pengawas) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <UserCheck className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              3. Data Dinamis - Struktur Pengurus & Pengawas Cabang
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            
            {/* Ketua */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
              <span className="font-bold text-primary uppercase tracking-wider block border-b border-slate-200 pb-2">
                👤 Ketua Pengurus
              </span>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  value={ketua.nama}
                  onChange={(e) => setKetua({ ...ketua, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Foto Profil</label>
                <input
                  type="text"
                  value={ketua.foto}
                  onChange={(e) => setKetua({ ...ketua, foto: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>

            {/* Sekretaris */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
              <span className="font-bold text-slate-900 uppercase tracking-wider block border-b border-slate-200 pb-2">
                👤 Sekretaris
              </span>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  value={sekretaris.nama}
                  onChange={(e) => setSekretaris({ ...sekretaris, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Foto Profil</label>
                <input
                  type="text"
                  value={sekretaris.foto}
                  onChange={(e) => setSekretaris({ ...sekretaris, foto: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>

            {/* Bendahara */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
              <span className="font-bold text-slate-800 uppercase tracking-wider block border-b border-slate-200 pb-2">
                👤 Bendahara
              </span>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  value={bendahara.nama}
                  onChange={(e) => setBendahara({ ...bendahara, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Foto Profil</label>
                <input
                  type="text"
                  value={bendahara.foto}
                  onChange={(e) => setBendahara({ ...bendahara, foto: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>

            {/* Pengawas */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
              <span className="font-bold text-red-700 uppercase tracking-wider block border-b border-slate-200 pb-2">
                👤 Ketua Pengawas
              </span>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  value={pengawas.nama}
                  onChange={(e) => setPengawas({ ...pengawas, nama: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Foto Profil</label>
                <input
                  type="text"
                  value={pengawas.foto}
                  onChange={(e) => setPengawas({ ...pengawas, foto: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profile</span>
          </button>
        </div>

      </form>

    </div>
  );
};

export default AdminProfile;
