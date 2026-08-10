import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { companyInfo } from '../../data/dummyData';

const ContactCard = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactItems = [
    {
      icon: MapPin,
      title: "Alamat Kantor Pusat",
      details: companyInfo.address,
      action: "Lihat di Google Maps",
      link: `https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}`
    },
    {
      icon: Phone,
      title: "Telepon & WhatsApp",
      details: `${companyInfo.phone} / ${companyInfo.whatsapp}`,
      action: "Hubungi Langsung",
      link: `tel:${companyInfo.phone}`
    },
    {
      icon: Mail,
      title: "Email Respon Cepat",
      details: companyInfo.email,
      action: "Kirim Pesan Email",
      link: `mailto:${companyInfo.email}`
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      details: companyInfo.operatingHours,
      action: "Buka Setiap Hari Kerja",
      link: "#"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      <div className="lg:col-span-5 space-y-6">
        {contactItems.map((item, index) => {
          const IconComp = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft hover:shadow-card-hover transition-all duration-300 flex items-start gap-5 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <IconComp className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 font-poppins">{item.title}</h4>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed">{item.details}</p>
                {item.link !== "#" && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-bold text-primary-600 hover:text-primary-700 mt-2 hover:underline"
                  >
                    {item.action} &rarr;
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-soft-lg"
      >
        <h3 className="text-2xl font-bold text-slate-900 font-poppins mb-2">
          Kirim Pesan / Pertanyaan
        </h3>
        <p className="text-slate-500 text-sm mb-8">
          Tim pengurus Koperasi Tani Pangan Mandiri siap melayani informasi keanggotaan dan pembiayaan.
        </p>

        {isSubmitted && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Pesan Anda telah berhasil terkirim. Tim kami akan menghubungi Anda sesegera mungkin.</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Ahmad Budiman"
                {...register("name", { required: "Nama wajib diisi" })}
                className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm focus:outline-none transition-colors ${
                  errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
                }`}
              />
              {errors.name && (
                <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Nomor WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="0821xxxxxxxx"
                {...register("phone", { required: "Nomor WhatsApp wajib diisi" })}
                className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm focus:outline-none transition-colors ${
                  errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
                }`}
              />
              {errors.phone && (
                <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Kategori Keperluan
            </label>
            <select
              {...register("subject")}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
            >
              <option value="Pendaftaran Anggota">Pendaftaran Anggota Baru</option>
              <option value="Pembiayaan Usaha">Informasi Pembiayaan UMKM/Tani</option>
              <option value="Simpanan">Simpanan & Tabungan</option>
              <option value="Kerjasama">Kemitraan & Penyerapan Hasil Panen</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Isi Pesan <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Tuliskan pertanyaan atau deskripsi kebutuhan Anda di sini..."
              {...register("message", { required: "Isi pesan wajib diisi" })}
              className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm focus:outline-none transition-colors ${
                errors.message ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'
              }`}
            ></textarea>
            {errors.message && (
              <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.message.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md shadow-primary-600/30 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Mengirim Pesan...</span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Kirim Pesan Now</span>
              </>
            )}
          </button>
        </form>

      </motion.div>

    </div>
  );
};

export default ContactCard;
