import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { kopdesData } from '../data/dummyData';
import SectionTitle from '../components/SectionTitle/SectionTitle';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactItems = [
    {
      icon: MapPin,
      title: "Alamat Kantor Sekretariat",
      details: kopdesData.kontak.alamat,
      action: "Buka Google Maps",
      link: `https://maps.google.com/?q=${encodeURIComponent(kopdesData.kontak.alamat)}`
    },
    {
      icon: Phone,
      title: "Telepon & WhatsApp Resmi",
      details: `${kopdesData.kontak.telepon} / ${kopdesData.kontak.whatsapp}`,
      action: "Hubungi Langsung",
      link: `https://wa.me/${kopdesData.kontak.whatsapp.replace(/[^0-9]/g, '')}`
    },
    {
      icon: Mail,
      title: "Email Respon Sekretariat",
      details: kopdesData.kontak.email,
      action: "Kirim Pesan Email",
      link: `mailto:${kopdesData.kontak.email}`
    },
    {
      icon: Clock,
      title: "Jam Pelayanan Kantor",
      details: kopdesData.kontak.jamKerja,
      action: "Buka Hari Kerja",
      link: "#"
    }
  ];

  return (
    <div className="pt-24 lg:pt-32">
      {/* Banner */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-slate-900 to-slate-950"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase mb-4"
          >
            Sekretariat & Informasi
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold font-poppins mb-4"
          >
            Hubungi Pengurus Kopdes
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
            Kami siap melayani kebutuhan informasi keanggotaan, pendaftaran unit layanan usaha, dan kerjasama kemitraan desa.
          </p>
        </div>
      </section>

      {/* Main Form & Cards */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionTitle
            subtitle="Pusat Informasi"
            title="Lokasi Kantor & Formulir Pesan"
            highlight="Kopdes"
            badge="Pelayanan Warga"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Info Cards */}
            <div className="lg:col-span-5 space-y-5">
              {contactItems.map((item, index) => {
                const IconComp = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-soft transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
                      <IconComp className="w-6 h-6 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-poppins">{item.title}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">{item.details}</p>
                      {item.link !== "#" && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block text-xs font-bold text-primary hover:underline mt-2"
                        >
                          {item.action} &rarr;
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right Form Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm"
            >
              <h3 className="text-xl font-bold text-slate-900 font-poppins mb-2">
                Kirim Pesan Ke Pengurus
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mb-6">
                Sampaikan pertanyaan atau permohonan informasi mengenai program Koperasi Desa Merah Putih.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Pesan Anda berhasil terkirim ke sekretariat Kopdes Merah Putih. Pengurus kami akan menghubungi Anda.</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      {...register("name", { required: "Nama wajib diisi" })}
                      className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm focus:outline-none transition-colors ${
                        errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-primary focus:ring-2 focus:ring-red-100'
                      }`}
                    />
                    {errors.name && (
                      <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Nomor WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="0821xxxxxxxx"
                      {...register("phone", { required: "Nomor WhatsApp wajib diisi" })}
                      className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-primary focus:ring-2 focus:ring-red-100'
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Subjek Keperluan
                  </label>
                  <select
                    {...register("subject")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-primary"
                  >
                    <option value="Pendaftaran Anggota">Informasi Pendaftaran Anggota</option>
                    <option value="Unit Layanan">Pengajuan Unit Layanan Usaha</option>
                    <option value="Kemitraan">Penawaran Kemitraan / Offtaker Panen</option>
                    <option value="Lainnya">Pertanyaan Umum Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Isi Pesan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tuliskan isi pertanyaan atau permohonan informasi Anda..."
                    {...register("message", { required: "Isi pesan wajib diisi" })}
                    className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm focus:outline-none transition-colors ${
                      errors.message ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-primary focus:ring-2 focus:ring-red-100'
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
                  className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-600 shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Mengirim Pesan...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Pesan Sekretariat</span>
                    </>
                  )}
                </button>
              </form>

            </motion.div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
