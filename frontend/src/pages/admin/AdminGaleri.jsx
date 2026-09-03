import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Save, X, Image as ImageIcon, Video } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { useKopdes } from '../../context/KopdesContext';
import { supabase } from '../../config/supabaseClient';

const AdminGaleri = () => {
  const { kopdesData, addGaleri, updateGaleri, deleteGaleri } = useKopdes();
  const [successMessage, setSuccessMessage] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [mediaType, setMediaType] = useState('image'); 
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);

  const handleOpenAdd = () => {
    setEditingId(null);
    setMediaType('image');
    setTitle('');
    setCaption('');
    setUrl('');
    setSelectedFile(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setMediaType(item.mediaType || 'image');
    setTitle(item.title);
    setCaption(item.caption);
    setUrl(item.url);
    setSelectedFile(null);
    setModalOpen(true);
  };

  const handleDelete = (id, itemTitle) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus item galeri "${itemTitle}"?`)) {
      deleteGaleri(id);
      setSuccessMessage(`Item Galeri "${itemTitle}" berhasil dihapus.`);
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!title.trim() || !caption.trim()) {
      alert('Judul dan deskripsi/caption wajib diisi.');
      return;
    }

    if (mediaType === 'video' && !url.trim()) {
      alert('URL video wajib diisi.');
      return;
    }

    if (mediaType === 'image' && !url.trim() && !selectedFile) {
      alert('Gambar wajib dipilih.');
      return;
    }

    try {
      let finalUrl = url;

      if (mediaType === 'image' && selectedFile) {
        const fileExt = selectedFile.name.split('.').pop() || 'jpg';
        const fileName = `galeri_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const filePath = `galeri/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('kopdes_images')
          .upload(filePath, selectedFile);

        if (uploadError) {
          console.error('Storage upload error:', uploadError);
          if (uploadError.statusCode === '404' || uploadError.message?.toLowerCase().includes('bucket')) {
            alert('Upload file gagal: Bucket storage "kopdes_images" belum dibuat di Supabase.\n\nTips: Anda dapat memasukkan "URL Gambar online" (misal link Unsplash/link web) pada kolom URL gambar di bawah, atau buat bucket "kopdes_images" (Public) di menu Storage Supabase.');
            return;
          }
          throw uploadError;
        }

        const { data } = supabase.storage
          .from('kopdes_images')
          .getPublicUrl(filePath);

        if (data?.publicUrl) {
          finalUrl = data.publicUrl;
        }
      }

      if (editingId) {
        await updateGaleri(editingId, {
          mediaType,
          title,
          caption,
          url: finalUrl
        });
        setSuccessMessage(`Item Galeri "${title}" berhasil diperbarui.`);
      } else {
        await addGaleri({
          mediaType,
          title,
          caption,
          url: finalUrl
        });
        setSuccessMessage(`Item Galeri baru "${title}" berhasil ditambahkan.`);
      }
      
      setModalOpen(false);
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      console.error(err);
      alert(`Terjadi kesalahan: ${err.message || 'Gagal menyimpan item galeri'}`);
    }
  };

  const getEmbedUrl = (urlStr) => {
    if (!urlStr) return '';
    try {
      
      if (urlStr.includes('youtube.com') || urlStr.includes('youtu.be')) {
        let videoId = '';
        if (urlStr.includes('youtu.be/')) videoId = urlStr.split('youtu.be/')[1].split('?')[0];
        else if (urlStr.includes('youtube.com/watch')) videoId = new URL(urlStr).searchParams.get('v');
        else if (urlStr.includes('youtube.com/shorts/')) videoId = urlStr.split('shorts/')[1].split('?')[0];
        else if (urlStr.includes('youtube.com/embed/')) return urlStr;
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      }
      
      else if (urlStr.includes('tiktok.com')) {
        if (urlStr.includes('/embed/')) return urlStr;
        const match = urlStr.match(/\/video\/(\d+)/);
        if (match && match[1]) return `https://www.tiktok.com/embed/v2/${match[1]}`;
      }
      
      else if (urlStr.includes('instagram.com')) {
        if (urlStr.includes('/embed')) return urlStr;
        const cleanUrl = urlStr.split('?')[0].replace(/\/$/, '');
        return `${cleanUrl}/embed`;
      }
      
      else if (urlStr.includes('facebook.com') && (urlStr.includes('/videos/') || urlStr.includes('/watch'))) {
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(urlStr)}&show_text=false`;
      }
    } catch (e) {
      console.error('Invalid URL:', e);
    }
    return urlStr;
  };

  return (
    <div className="space-y-6">

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Pengelolaan Galeri Dokumentasi</h1>
          <p className="text-xs text-slate-600 mt-1">
            Tambah, edit, dan hapus foto & link video kegiatan (Dinamis). Total item: {kopdesData.galeri.length} Momen.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-700 text-white font-bold text-xs shadow-sm transition-colors flex-shrink-0"
        >
          
          <span>Tambah Foto / Video</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          
          <span>{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kopdesData.galeri.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              
              <div className="relative aspect-[4/3] bg-slate-100 border-b border-slate-200">
                {item.mediaType === 'video' ? (
                  <iframe
                    className="w-full h-full object-cover"
                    src={getEmbedUrl(item.url)}
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-2 left-2 pointer-events-none">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.mediaType === 'video' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'
                    }`}>
                    {item.mediaType === 'video' ? 'Video Link' : '📷 Foto'}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <span className="text-[11px] text-slate-400 font-semibold">{item.date}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2">{item.title}</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">{item.caption}</p>
              </div>
            </div>

            <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">{item.url}</span>

              <div className="flex items-center gap-1 text-[11px] font-bold">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="px-2 py-1 rounded text-slate-600 hover:text-primary hover:bg-slate-200 transition-colors"
                  title="Edit Item"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="px-2 py-1 rounded text-slate-600 hover:text-red-600 hover:bg-red-100 transition-colors"
                  title="Hapus Item"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">
                {editingId ? 'Edit Item Galeri' : 'Tambah Foto / Link Video Baru'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white text-xs font-bold">
                Tutup
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Tipe Media</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMediaType('image')}
                    className={`py-2 rounded-lg font-bold border flex items-center justify-center gap-1.5 ${mediaType === 'image'
                        ? 'bg-red-50 text-primary border-red-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                  >
                    
                    <span>📷 Foto</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaType('video')}
                    className={`py-2 rounded-lg font-bold border flex items-center justify-center gap-1.5 ${mediaType === 'video'
                        ? 'bg-red-50 text-primary border-red-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                  >
                    
                    <span>Link Video</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Judul Momen / Kegiatan *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Musyawarah Anggota Tahunan 2026"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  {mediaType === 'video' ? 'URL Embed / YouTube Video Link *' : 'Upload Foto / Gambar *'}
                </label>
                {mediaType === 'video' ? (
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-primary"
                  />
                ) : (
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            alert('Ukuran file awal maksimal adalah 5MB.');
                            return;
                          }

                          setIsCompressing(true);
                          try {
                            const options = {
                              maxSizeMB: 0.3, 
                              maxWidthOrHeight: 1280,
                              useWebWorker: true
                            };
                            const compressedFile = await imageCompression(file, options);
                            setSelectedFile(compressedFile);
                            setUrl(URL.createObjectURL(compressedFile));
                          } catch (error) {
                            console.error('Error compressing image:', error);
                            alert('Gagal mengompres gambar');
                          } finally {
                            setIsCompressing(false);
                          }
                        }
                      }}
                      className="block w-full text-xs text-slate-700
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-xs file:font-semibold
                        file:bg-slate-100 file:text-slate-700
                        hover:file:bg-slate-200 cursor-pointer border border-slate-300 rounded-lg p-1.5"
                    />

                    <div className="flex items-center gap-2 my-1.5">
                      <div className="h-px bg-slate-200 flex-1"></div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">atau masukkan URL gambar online</span>
                      <div className="h-px bg-slate-200 flex-1"></div>
                    </div>

                    <input
                      type="text"
                      value={selectedFile ? '' : url}
                      onChange={(e) => {
                        setSelectedFile(null);
                        setUrl(e.target.value);
                      }}
                      placeholder="https://images.unsplash.com/... atau URL foto langsung"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-primary text-xs"
                    />

                    {url && (
                      <p className="text-[10px] text-slate-500">
                        {selectedFile ? 'File foto lokal terpilih' : (
                          <>URL Gambar saat ini: <a href={url} target="_blank" rel="noreferrer" className="text-primary underline font-bold">Lihat Preview</a></>
                        )}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Caption / Deskripsi Kegiatan *</label>
                <textarea
                  rows={3}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Tuliskan keterangan singkat mengenai kegiatan ini..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary-700 flex items-center gap-1.5"
                >
                  
                  <span>{isCompressing ? 'Mengompresi...' : 'Simpan Galeri'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminGaleri;
