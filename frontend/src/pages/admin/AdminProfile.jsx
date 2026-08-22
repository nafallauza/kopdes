import React, { useState } from 'react';
import { Save, CheckCircle2, MapPin, Lock, FileText, UserCheck, Eye, Compass, Target } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { useKopdes } from '../../context/KopdesContext';

const AdminProfile = () => {
  const { kopdesData, updateProfileStatis, updateProfileDinamis } = useKopdes();
  const [successMessage, setSuccessMessage] = useState('');

  const [badanHukum, setBadanHukum] = useState(kopdesData.legal.badanHukum);
  const [wilayahKerja, setWilayahKerja] = useState(kopdesData.legal.wilayahKerja);
  const [visi, setVisi] = useState(kopdesData.visi);
  const [description, setDescription] = useState(kopdesData.description);

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

  const handleStatisSubmit = (e) => {
    e.preventDefault();
    updateProfileStatis({
      badanHukum,
      wilayahKerja,
      visi,
      description
    });
    setSuccessMessage('Data Profil Statis berhasil diperbarui!');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

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

  const [isUploading, setIsUploading] = useState(false);

  const handleUploadFoto = async (e, setter, currentState) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal adalah 5MB.');
      return;
    }

    setIsUploading(true);
    try {
      const options = {
        maxSizeMB: 0.3, 
        maxWidthOrHeight: 800,
        useWebWorker: true
      };
      
      const compressedFile = await imageCompression(file, options);
      
      const formData = new FormData();
      formData.append('gambar', compressedFile, compressedFile.name || 'profile.jpg');
      
      const apiUrl = `http://${window.location.hostname}:5000/api/v1/upload`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      if (result.success) {
        setter({ ...currentState, foto: result.data.url });
      } else {
        alert('Gagal mengupload: ' + result.message);
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">

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
          
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleStatisSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              1. Informational Statis (Konfigurasi)
            </h2>
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors"
          >
            
            <span>Simpan</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-700 flex items-center gap-1.5 mb-2">
               Nomor Badan Hukum Resmi
            </span>
            <input
              type="text"
              value={badanHukum}
              onChange={(e) => setBadanHukum(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:border-primary text-xs"
            />
            <p className="text-[11px] text-slate-500">Terdaftar di Kemenkumham RI & Kementerian Koperasi UKM</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-700 flex items-center gap-1.5 mb-2">
               Wilayah Operasional Resmi
            </span>
            <input
              type="text"
              value={wilayahKerja}
              onChange={(e) => setWilayahKerja(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:border-primary text-xs"
            />
            <p className="text-[11px] text-slate-500">Izin Usaha Kabupaten & Lembaga Desa</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-700 flex items-center gap-1.5 mb-2">
               Visi Utama
            </span>
            <textarea
              rows={3}
              value={visi}
              onChange={(e) => setVisi(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium italic text-slate-700 focus:outline-none focus:border-primary text-xs"
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-700 flex items-center gap-1.5 mb-2">
               Deskripsi Utama
            </span>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-700 leading-relaxed focus:outline-none focus:border-primary text-xs"
            />
          </div>
        </div>
      </form>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            
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

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              3. Data Dinamis - Struktur Pengurus & Pengawas Cabang
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">

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
                <label className="block font-bold text-slate-700 mb-1">Upload Foto Profil</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadFoto(e, setKetua, ketua)}
                    className="block w-full text-xs text-slate-700
                        file:mr-4 file:py-1.5 file:px-3
                        file:rounded-lg file:border-0
                        file:text-xs file:font-semibold
                        file:bg-slate-200 file:text-slate-700
                        hover:file:bg-slate-300 cursor-pointer border border-slate-300 rounded-lg p-1"
                  />
                  {ketua.foto && (
                    <div className="flex items-center gap-2">
                      <img src={ketua.foto} alt="Preview" className="w-8 h-8 rounded-full object-cover" />
                      <p className="text-[10px] text-slate-500">
                        Foto tersimpan. <a href={ketua.foto} target="_blank" rel="noreferrer" className="text-primary underline">Lihat penuh</a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                <label className="block font-bold text-slate-700 mb-1">Upload Foto Profil</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadFoto(e, setSekretaris, sekretaris)}
                    className="block w-full text-xs text-slate-700
                        file:mr-4 file:py-1.5 file:px-3
                        file:rounded-lg file:border-0
                        file:text-xs file:font-semibold
                        file:bg-slate-200 file:text-slate-700
                        hover:file:bg-slate-300 cursor-pointer border border-slate-300 rounded-lg p-1"
                  />
                  {sekretaris.foto && (
                    <div className="flex items-center gap-2">
                      <img src={sekretaris.foto} alt="Preview" className="w-8 h-8 rounded-full object-cover" />
                      <p className="text-[10px] text-slate-500">
                        Foto tersimpan. <a href={sekretaris.foto} target="_blank" rel="noreferrer" className="text-primary underline">Lihat penuh</a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                <label className="block font-bold text-slate-700 mb-1">Upload Foto Profil</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadFoto(e, setBendahara, bendahara)}
                    className="block w-full text-xs text-slate-700
                        file:mr-4 file:py-1.5 file:px-3
                        file:rounded-lg file:border-0
                        file:text-xs file:font-semibold
                        file:bg-slate-200 file:text-slate-700
                        hover:file:bg-slate-300 cursor-pointer border border-slate-300 rounded-lg p-1"
                  />
                  {bendahara.foto && (
                    <div className="flex items-center gap-2">
                      <img src={bendahara.foto} alt="Preview" className="w-8 h-8 rounded-full object-cover" />
                      <p className="text-[10px] text-slate-500">
                        Foto tersimpan. <a href={bendahara.foto} target="_blank" rel="noreferrer" className="text-primary underline">Lihat penuh</a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                <label className="block font-bold text-slate-700 mb-1">Upload Foto Profil</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUploadFoto(e, setPengawas, pengawas)}
                    className="block w-full text-xs text-slate-700
                        file:mr-4 file:py-1.5 file:px-3
                        file:rounded-lg file:border-0
                        file:text-xs file:font-semibold
                        file:bg-slate-200 file:text-slate-700
                        hover:file:bg-slate-300 cursor-pointer border border-slate-300 rounded-lg p-1"
                  />
                  {pengawas.foto && (
                    <div className="flex items-center gap-2">
                      <img src={pengawas.foto} alt="Preview" className="w-8 h-8 rounded-full object-cover" />
                      <p className="text-[10px] text-slate-500">
                        Foto tersimpan. <a href={pengawas.foto} target="_blank" rel="noreferrer" className="text-primary underline">Lihat penuh</a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            
            <span>Simpan Perubahan Profile</span>
          </button>
        </div>

      </form>

    </div>
  );
};

export default AdminProfile;
