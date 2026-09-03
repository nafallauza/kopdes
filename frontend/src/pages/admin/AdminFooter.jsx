import React, { useState } from 'react';
import { Save, CheckCircle2, Phone, Mail, Facebook, Instagram, Youtube, Clock } from 'lucide-react';
import { useKopdes } from '../../context/KopdesContext';

const AdminFooter = () => {
  const { kopdesData, updateFooter } = useKopdes();
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [telepon, setTelepon] = useState(kopdesData.kontak.telepon);
  const [whatsapp, setWhatsapp] = useState(kopdesData.kontak.whatsapp);
  const [email, setEmail] = useState(kopdesData.kontak.email);
  const [jamKerja, setJamKerja] = useState(kopdesData.kontak.jamKerja);

  const [facebook, setFacebook] = useState(kopdesData.kontak.sosialMedia?.facebook || '');
  const [instagram, setInstagram] = useState(kopdesData.kontak.sosialMedia?.instagram || '');
  const [youtube, setYoutube] = useState(kopdesData.kontak.sosialMedia?.youtube || '');

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateFooter({
        telepon,
        whatsapp,
        email,
        jamKerja,
        sosialMedia: {
          facebook,
          instagram,
          youtube
        }
      });

      setSuccessMessage('Data Footer & Kontak Resmi berhasil diperbarui!');
    } catch (error) {
      alert('Gagal menyimpan footer');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Pengelolaan Footer & Kontak Resmi</h1>
          <p className="text-xs text-slate-600 mt-1">
            Kelola nomor telepon, nomor WhatsApp, email resmi, dan link sosial media yang tampil pada Footer (Dinamis).
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Kontak Resmi */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Phone className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              1. Nomor Telepon & Email Sekretariat
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nomor Telepon Kantor
              </label>
              <input
                type="text"
                value={telepon}
                onChange={(e) => setTelepon(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nomor WhatsApp Resmi
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Email Resmi Koperasi
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Jam Pelayanan Kantor Sekretariat
              </label>
              <input
                type="text"
                value={jamKerja}
                onChange={(e) => setJamKerja(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:border-primary text-xs"
              />
            </div>
          </div>
        </div>

        {/* Sosial Media */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Facebook className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              2. Link Akun Media Sosial Resmi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Facebook className="w-3.5 h-3.5 text-blue-600" /> Link Facebook
              </label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-pink-600" /> Link Instagram
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-primary text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Youtube className="w-3.5 h-3.5 text-red-600" /> Link YouTube
              </label>
              <input
                type="text"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-primary text-xs"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary hover:bg-primary-700 text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{isSaving ? 'Menyimpan...' : 'Simpan'}</span>
          </button>
        </div>

      </form>

    </div>
  );
};

export default AdminFooter;
