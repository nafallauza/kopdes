import React, { createContext, useContext, useState, useEffect } from 'react';
import { kopdesData as initialData } from '../data/dummyData';

const KopdesContext = createContext();

const STORAGE_KEY = 'kopdes_app_data_v1';

export const KopdesProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const local = localStorage.getItem(STORAGE_KEY);
      return local ? JSON.parse(local) : initialData;
    } catch (e) {
      console.error('Failed to load data from localStorage:', e);
      return initialData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save data to localStorage:', e);
    }
  }, [data]);

  // Profile Update (Dinamis: Alamat, Ketua, Sekretaris, Bendahara, Pengawas)
  const updateProfileDinamis = (updatedFields) => {
    setData((prev) => ({
      ...prev,
      kontak: {
        ...prev.kontak,
        alamat: updatedFields.alamat ?? prev.kontak.alamat,
        googleMapsLink: updatedFields.googleMapsLink ?? prev.kontak.googleMapsLink,
        googleMapsEmbedUrl: updatedFields.googleMapsEmbedUrl ?? prev.kontak.googleMapsEmbedUrl,
      },
      pengurus: {
        ...prev.pengurus,
        ketua: updatedFields.ketua ? { ...prev.pengurus.ketua, ...updatedFields.ketua } : prev.pengurus.ketua,
        sekretaris: updatedFields.sekretaris ? { ...prev.pengurus.sekretaris, ...updatedFields.sekretaris } : prev.pengurus.sekretaris,
        bendahara: updatedFields.bendahara ? { ...prev.pengurus.bendahara, ...updatedFields.bendahara } : prev.pengurus.bendahara,
        pengawas: updatedFields.pengawas ? { ...prev.pengurus.pengawas, ...updatedFields.pengawas } : prev.pengurus.pengawas,
      }
    }));
  };

  // Profile Update (Statis: Legal, Visi, Deskripsi)
  const updateProfileStatis = (updatedFields) => {
    setData((prev) => ({
      ...prev,
      legal: {
        ...prev.legal,
        badanHukum: updatedFields.badanHukum ?? prev.legal.badanHukum,
        wilayahKerja: updatedFields.wilayahKerja ?? prev.legal.wilayahKerja,
      },
      visi: updatedFields.visi ?? prev.visi,
      description: updatedFields.description ?? prev.description,
    }));
  };

  // Layanan CRUD (Dinamis)
  const addLayanan = (newUnit) => {
    const unitWithId = {
      ...newUnit,
      id: newUnit.id || `unit-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      layanan: [...prev.layanan, unitWithId]
    }));
  };

  const updateLayanan = (id, updatedUnit) => {
    setData((prev) => ({
      ...prev,
      layanan: prev.layanan.map((item) => (item.id === id ? { ...item, ...updatedUnit } : item))
    }));
  };

  const deleteLayanan = (id) => {
    setData((prev) => ({
      ...prev,
      layanan: prev.layanan.filter((item) => item.id !== id)
    }));
  };

  // Galeri CRUD (Dinamis: Foto / Video + Caption)
  const addGaleri = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: newItem.id || Date.now(),
      date: newItem.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    setData((prev) => ({
      ...prev,
      galeri: [itemWithId, ...prev.galeri]
    }));
  };

  const updateGaleri = (id, updatedItem) => {
    setData((prev) => ({
      ...prev,
      galeri: prev.galeri.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    }));
  };

  const deleteGaleri = (id) => {
    setData((prev) => ({
      ...prev,
      galeri: prev.galeri.filter((item) => item.id !== id)
    }));
  };

  // Footer Update (Dinamis: No Telp, Email, Sosmed)
  const updateFooter = (updatedFooter) => {
    setData((prev) => ({
      ...prev,
      kontak: {
        ...prev.kontak,
        telepon: updatedFooter.telepon ?? prev.kontak.telepon,
        whatsapp: updatedFooter.whatsapp ?? prev.kontak.whatsapp,
        email: updatedFooter.email ?? prev.kontak.email,
        jamKerja: updatedFooter.jamKerja ?? prev.kontak.jamKerja,
        sosialMedia: {
          ...prev.kontak.sosialMedia,
          ...(updatedFooter.sosialMedia || {})
        }
      }
    }));
  };

  // Reset to default initialData
  const resetData = () => {
    setData(initialData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <KopdesContext.Provider
      value={{
        kopdesData: data,
        updateProfileStatis,
        updateProfileDinamis,
        addLayanan,
        updateLayanan,
        deleteLayanan,
        addGaleri,
        updateGaleri,
        deleteGaleri,
        updateFooter,
        resetData
      }}
    >
      {children}
    </KopdesContext.Provider>
  );
};

export const useKopdes = () => {
  const context = useContext(KopdesContext);
  if (!context) {
    throw new Error('useKopdes must be used within a KopdesProvider');
  }
  return context;
};
