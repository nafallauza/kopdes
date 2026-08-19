import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Save, X, Building2 } from 'lucide-react';
import { useKopdes } from '../../context/KopdesContext';

const AdminLayanan = () => {
  const { kopdesData, addLayanan, updateLayanan, deleteLayanan } = useKopdes();
  const [successMessage, setSuccessMessage] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Wallet');
  const [featuresText, setFeaturesText] = useState('');

  const iconOptions = [
    'Wallet', 'ShoppingBag', 'Wheat', 'Tractor', 'Store', 'Truck', 'PiggyBank', 'ShieldCheck', 'Smartphone', 'Building2'
  ];

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setIcon('Wallet');
    setFeaturesText('');
    setModalOpen(true);
  };

  const handleOpenEdit = (unit) => {
    setEditingId(unit.id);
    setTitle(unit.title);
    setDescription(unit.description);
    setIcon(unit.icon || 'Wallet');
    setFeaturesText(unit.features ? unit.features.join(', ') : '');
    setModalOpen(true);
  };

  const handleDelete = (id, unitTitle) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus unit layanan "${unitTitle}"?`)) {
      deleteLayanan(id);
      setSuccessMessage(`Unit Layanan "${unitTitle}" berhasil dihapus.`);
      setTimeout(() => setSuccessMessage(''), 4000);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Judul dan deskripsi unit layanan wajib diisi.');
      return;
    }

    const featuresArray = featuresText
      ? featuresText.split(',').map((f) => f.trim()).filter(Boolean)
      : [];

    const unitPayload = {
      title,
      description,
      icon,
      features: featuresArray
    };

    if (editingId) {
      updateLayanan(editingId, unitPayload);
      setSuccessMessage(`Unit Layanan "${title}" berhasil diperbarui.`);
    } else {
      addLayanan(unitPayload);
      setSuccessMessage(`Unit Layanan baru "${title}" berhasil ditambahkan.`);
    }

    setModalOpen(false);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Pengelolaan Unit Layanan Usaha</h1>
          <p className="text-xs text-slate-600 mt-1">
            Tambah, edit, dan hapus unit layanan usaha Kopdes (Dinamis). Total aktif: {kopdesData.layanan.length} Unit.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-700 text-white font-bold text-xs shadow-sm transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Unit Layanan</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Services List Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kopdesData.layanan.map((unit, index) => (
          <div
            key={unit.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-primary border border-red-100 uppercase">
                  Unit {index + 1}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(unit)}
                    className="p-1.5 rounded text-slate-600 hover:text-primary hover:bg-slate-100 transition-colors"
                    title="Edit Layanan"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(unit.id, unit.title)}
                    className="p-1.5 rounded text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Hapus Layanan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1.5">{unit.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-3">{unit.description}</p>
              
              {unit.features && unit.features.length > 0 && (
                <div className="pt-3 border-t border-slate-100 space-y-1">
                  {unit.features.map((f, i) => (
                    <div key={i} className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span>Icon: {unit.icon || 'Default'}</span>
              <span className="font-semibold text-slate-600">ID: {unit.id}</span>
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
                {editingId ? 'Edit Unit Layanan' : 'Tambah Unit Layanan Baru'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Judul Unit Layanan *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Unit Simpan Pinjam Syariah"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-semibold text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Pilih Icon Lucide</label>
                <select
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-primary"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Deskripsi Layanan *</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Penjelasan ringkas mengenai unit layanan..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium text-slate-900 focus:outline-none focus:border-primary"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Poin Fitur Layanan (Dipisahkan koma)</label>
                <input
                  type="text"
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Contoh: Bebas Bunga, Syarat Mudah, Jaminan Aman"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium"
                />
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
                  <span>Simpan Layanan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminLayanan;
