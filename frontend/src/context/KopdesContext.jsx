import React, { createContext, useContext, useState, useEffect } from 'react';
import { kopdesData as initialData } from '../data/dummyData';

import { supabase } from '../config/supabaseClient';

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

  // Fetch from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: dbData, error } = await supabase
          .from('profil_koperasi')
          .select('*')
          .eq('id', 1)
          .single();
          
        if (error && error.code !== 'PGRST116') throw error; 
        
        const { data: galeriData, error: galeriError } = await supabase
          .from('galeri')
          .select('*')
          .order('created_at', { ascending: false });

        if (galeriError) throw galeriError;

        setData(prev => {
          const dbKontak = dbData?.kontak_json || {};
          const dbPengurus = dbData?.pengurus_json || {};
          const dbLegal = dbData?.legal_json || {};

          return {
            ...prev,
            ...(dbData ? {
              namaKoperasi: dbData.nama_koperasi?.trim() || prev.namaKoperasi,
              heroImage: dbData.logo_url || prev.heroImage,
              description: dbData.deskripsi?.trim() || prev.description,
              visi: dbData.visi?.trim() || prev.visi,
              misi: dbData.misi?.trim() || prev.misi,
              layanan: (Array.isArray(dbData.layanan_json) && dbData.layanan_json.length > 0)
                ? dbData.layanan_json
                : prev.layanan,
              legal: {
                ...prev.legal,
                ...dbLegal,
                badanHukum: dbLegal.badanHukum?.trim() || prev.legal?.badanHukum,
                wilayahKerja: dbLegal.wilayahKerja?.trim() || prev.legal?.wilayahKerja,
                statusKeanggotaan: dbLegal.statusKeanggotaan?.trim() || prev.legal?.statusKeanggotaan,
              },
              kontak: {
                ...prev.kontak,
                ...dbKontak,
                alamat: dbKontak.alamat?.trim() || prev.kontak?.alamat,
                telepon: dbKontak.telepon?.trim() || prev.kontak?.telepon,
                whatsapp: dbKontak.whatsapp?.trim() || prev.kontak?.whatsapp,
                email: dbKontak.email?.trim() || prev.kontak?.email,
                jamKerja: dbKontak.jamKerja?.trim() || prev.kontak?.jamKerja,
                googleMapsLink: dbKontak.googleMapsLink?.trim() || prev.kontak?.googleMapsLink,
                googleMapsEmbedUrl: dbKontak.googleMapsEmbedUrl?.trim() || prev.kontak?.googleMapsEmbedUrl,
                sosialMedia: {
                  ...prev.kontak?.sosialMedia,
                  ...(dbKontak.sosialMedia || {})
                }
              },
              pengurus: {
                ketua: {
                  ...prev.pengurus?.ketua,
                  ...(dbPengurus.ketua || {}),
                  nama: dbPengurus.ketua?.nama?.trim() || prev.pengurus?.ketua?.nama,
                  foto: dbPengurus.ketua?.foto?.trim() || prev.pengurus?.ketua?.foto,
                  pesan: dbPengurus.ketua?.pesan?.trim() || prev.pengurus?.ketua?.pesan,
                },
                sekretaris: {
                  ...prev.pengurus?.sekretaris,
                  ...(dbPengurus.sekretaris || {}),
                  nama: dbPengurus.sekretaris?.nama?.trim() || prev.pengurus?.sekretaris?.nama,
                  foto: dbPengurus.sekretaris?.foto?.trim() || prev.pengurus?.sekretaris?.foto,
                  pesan: dbPengurus.sekretaris?.pesan?.trim() || prev.pengurus?.sekretaris?.pesan,
                },
                bendahara: {
                  ...prev.pengurus?.bendahara,
                  ...(dbPengurus.bendahara || {}),
                  nama: dbPengurus.bendahara?.nama?.trim() || prev.pengurus?.bendahara?.nama,
                  foto: dbPengurus.bendahara?.foto?.trim() || prev.pengurus?.bendahara?.foto,
                  pesan: dbPengurus.bendahara?.pesan?.trim() || prev.pengurus?.bendahara?.pesan,
                },
                pengawas: {
                  ...prev.pengurus?.pengawas,
                  ...(dbPengurus.pengawas || {}),
                  nama: dbPengurus.pengawas?.nama?.trim() || prev.pengurus?.pengawas?.nama,
                  foto: dbPengurus.pengawas?.foto?.trim() || prev.pengurus?.pengawas?.foto,
                  pesan: dbPengurus.pengawas?.pesan?.trim() || prev.pengurus?.pengawas?.pesan,
                },
              }
            } : {}),
            galeri: (galeriData && galeriData.length > 0) ? galeriData.map(g => ({
              id: g.id,
              mediaType: g.media_type,
              title: g.title,
              caption: g.caption,
              url: g.url,
              date: g.date
            })) : prev.galeri
          };
        });
      } catch (e) {
        console.error('Gagal mengambil data dari server:', e);
      }
    };
    fetchData();
  }, []);

  // Profile Update (Dinamis: Alamat, Ketua, Sekretaris, Bendahara, Pengawas)
  const updateProfileDinamis = async (updatedFields, token) => {
    try {
      const kontak = {
        ...data.kontak,
        alamat: updatedFields.alamat ?? data.kontak.alamat,
        googleMapsLink: updatedFields.googleMapsLink ?? data.kontak.googleMapsLink,
        googleMapsEmbedUrl: updatedFields.googleMapsEmbedUrl ?? data.kontak.googleMapsEmbedUrl,
      };
      const pengurus = {
        ...data.pengurus,
        ketua: updatedFields.ketua ? { ...data.pengurus.ketua, ...updatedFields.ketua } : data.pengurus.ketua,
        sekretaris: updatedFields.sekretaris ? { ...data.pengurus.sekretaris, ...updatedFields.sekretaris } : data.pengurus.sekretaris,
        bendahara: updatedFields.bendahara ? { ...data.pengurus.bendahara, ...updatedFields.bendahara } : data.pengurus.bendahara,
        pengawas: updatedFields.pengawas ? { ...data.pengurus.pengawas, ...updatedFields.pengawas } : data.pengurus.pengawas,
      };

      const { error } = await supabase
        .from('profil_koperasi')
        .update({
          kontak_json: kontak,
          pengurus_json: pengurus,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);

      if (error) throw error;

      setData((prev) => ({
        ...prev,
        kontak,
        pengurus
      }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Profile Update (Statis: Legal, Visi, Deskripsi)
  const updateProfileStatis = async (updatedFields, token) => {
    try {
      const legal = {
        ...data.legal,
        badanHukum: updatedFields.badanHukum ?? data.legal.badanHukum,
        wilayahKerja: updatedFields.wilayahKerja ?? data.legal.wilayahKerja,
      };
      const visi = updatedFields.visi ?? data.visi;
      const misi = updatedFields.misi ?? data.misi;
      const description = updatedFields.description ?? data.description;
      const namaKoperasi = updatedFields.namaKoperasi ?? data.namaKoperasi;
      const heroImage = updatedFields.heroImage ?? data.heroImage;

      const { error } = await supabase
        .from('profil_koperasi')
        .update({
          nama_koperasi: namaKoperasi,
          logo_url: heroImage,
          deskripsi: description,
          visi: visi,
          misi: misi,
          legal_json: legal,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);
        
      if (error) throw error;

      setData((prev) => ({
        ...prev,
        legal,
        visi,
        misi,
        description,
        namaKoperasi,
        heroImage
      }));
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Layanan CRUD (Dinamis - Sinkronisasi ke Supabase)
  const _syncLayananToSupabase = async (newLayananArray) => {
    const { error } = await supabase
      .from('profil_koperasi')
      .update({ layanan_json: newLayananArray })
      .eq('id', 1);
    if (error) {
      console.error('Gagal sinkronisasi layanan ke Supabase:', error);
      throw error;
    }
  };

  const addLayanan = async (newUnit) => {
    const unitWithId = {
      ...newUnit,
      id: newUnit.id || `unit-${Date.now()}`,
    };
    const newLayanan = [...data.layanan, unitWithId];
    await _syncLayananToSupabase(newLayanan);
    setData((prev) => ({
      ...prev,
      layanan: newLayanan
    }));
  };

  const updateLayanan = async (id, updatedUnit) => {
    const newLayanan = data.layanan.map((item) => (item.id === id ? { ...item, ...updatedUnit } : item));
    await _syncLayananToSupabase(newLayanan);
    setData((prev) => ({
      ...prev,
      layanan: newLayanan
    }));
  };

  const deleteLayanan = async (id) => {
    const newLayanan = data.layanan.filter((item) => item.id !== id);
    await _syncLayananToSupabase(newLayanan);
    setData((prev) => ({
      ...prev,
      layanan: newLayanan
    }));
  };

  // Galeri CRUD (Dinamis: Foto / Video + Caption)
  const addGaleri = async (newItem) => {
    try {
      const dateStr = newItem.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
      
      const { data: insertedData, error } = await supabase
        .from('galeri')
        .insert([{
          media_type: newItem.mediaType,
          title: newItem.title,
          caption: newItem.caption,
          url: newItem.url,
          date: dateStr
        }])
        .select()
        .single();
        
      if (error) throw error;
      
      const itemWithId = {
        id: insertedData.id,
        mediaType: insertedData.media_type,
        title: insertedData.title,
        caption: insertedData.caption,
        url: insertedData.url,
        date: insertedData.date
      };
      
      setData((prev) => ({
        ...prev,
        galeri: [itemWithId, ...prev.galeri]
      }));
    } catch (err) {
      console.error('Gagal tambah galeri:', err);
      throw err;
    }
  };

  const updateGaleri = async (id, updatedItem) => {
    try {
      const { error } = await supabase
        .from('galeri')
        .update({
          media_type: updatedItem.mediaType,
          title: updatedItem.title,
          caption: updatedItem.caption,
          url: updatedItem.url
        })
        .eq('id', id);
        
      if (error) throw error;
      
      setData((prev) => ({
        ...prev,
        galeri: prev.galeri.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
      }));
    } catch (err) {
      console.error('Gagal update galeri:', err);
      throw err;
    }
  };

  const deleteGaleri = async (id) => {
    try {
      const { error } = await supabase
        .from('galeri')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setData((prev) => ({
        ...prev,
        galeri: prev.galeri.filter((item) => item.id !== id)
      }));
    } catch (err) {
      console.error('Gagal hapus galeri:', err);
      throw err;
    }
  };

  // Footer Update (Dinamis: No Telp, Email, Sosmed)
  const updateFooter = async (updatedFooter) => {
    try {
      const kontak = {
        ...data.kontak,
        telepon: updatedFooter.telepon ?? data.kontak.telepon,
        whatsapp: updatedFooter.whatsapp ?? data.kontak.whatsapp,
        email: updatedFooter.email ?? data.kontak.email,
        jamKerja: updatedFooter.jamKerja ?? data.kontak.jamKerja,
        sosialMedia: {
          ...data.kontak.sosialMedia,
          ...(updatedFooter.sosialMedia || {})
        }
      };

      const { error } = await supabase
        .from('profil_koperasi')
        .update({
          kontak_json: kontak,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);

      if (error) throw error;

      setData((prev) => ({
        ...prev,
        kontak
      }));
    } catch (err) {
      console.error('Error saat updateFooter:', err);
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
      throw err;
    }
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
