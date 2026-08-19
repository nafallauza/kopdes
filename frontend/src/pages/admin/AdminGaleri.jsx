import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Save, X, Image as ImageIcon, Video } from 'lucide-react';
import { useKopdes } from '../../context/KopdesContext';

const AdminGaleri = () => {
  const { kopdesData, addGaleri, updateGaleri, deleteGaleri } = useKopdes();
  const [successMessage, setSuccessMessage] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [mediaType, setMediaType] = useState('image'); // 'image' | 'video'
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [url, setUrl] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setMediaType('image');
    setTitle('');
    setCaption('');
    setUrl('');
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setMediaType(item.mediaType || 'image');
    setTitle(item.title);
    setCaption(item.caption);
    setUrl(item.url);
    setModalOpen(true);
  };

  const handleDelete = (id, itemTitle) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus item galeri "${itemTitle}"?`)) {
      deleteGaleri(id);
      setSuccessMessage(`Item Galeri "${itemTitle}" berhasil dihapus.`);
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!title.trim() || !caption.trim() || !url.trim()) {
      alert('Judul, deskripsi/caption, dan URL media wajib diisi.');
      return;
    }

    const galeriPayload = {
      mediaType,
      title,
      caption,
      url
    };

    if (editingId) {
      updateGaleri(editingId, galeriPayload);
      setSuccessMessage(`Item Galeri "${title}" berhasil diperbarui.`);
    } else {
      addGaleri(galeriPayload);
      setSuccessMessage(`Item Galeri baru "${title}" berhasil ditambahkan.`);
    }

    setModalOpen(false);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
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
          <Plus className="w-4 h-4" />
          <span>Tambah Foto / Video</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Gallery Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kopdesData.galeri.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Media Preview */}
              <div className="relative aspect-[4/3] bg-slate-100 border-b border-slate-200">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    item.mediaType === 'video' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'
                  }`}>
                    {item.mediaType === 'video' ? '🎬 Video Link' : '📷 Foto'}
                  </span>
                </div>
              </div>

              {/* Caption Content */}
              <div className="p-4">
                <span className="text-[11px] text-slate-400 font-semibold">{item.date}</span>
                <h4 className="text-sm font-bold text-slate-900 mt-1 line-clamp-2">{item.title}</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-3">{item.caption}</p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">{item.url}</span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 rounded text-slate-600 hover:text-primary hover:bg-slate-200 transition-colors"
                  title="Edit Item"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="p-1.5 rounded text-slate-600 hover:text-red-600 hover:bg-red-100 transition-colors"
                  title="Hapus Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-bold">
                {editingId ? 'Edit Item Galeri' : 'Tambah Foto / Link Video Baru'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Tipe Media</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setMediaType('image')}
                    className={`py-2 rounded-lg font-bold border flex items-center justify-center gap-1.5 ${
                      mediaType === 'image'
                        ? 'bg-red-50 text-primary border-red-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>📷 Foto</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaType('video')}
                    className={`py-2 rounded-lg font-bold border flex items-center justify-center gap-1.5 ${
                      mediaType === 'video'
                        ? 'bg-red-50 text-primary border-red-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>🎬 Link Video</span>
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
                  {mediaType === 'video' ? 'URL Embed / YouTube Video Link *' : 'URL Foto / Gambar *'}
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={mediaType === 'video' ? 'https://www.youtube.com/watch?v=...' : 'https://images.unsplash.com/...'}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-primary"
                />
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
                  <Save className="w-4 h-4" />
                  <span>Simpan Galeri</span>
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
