import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { useKopdes } from '../../context/KopdesContext';

const Navbar = () => {
  const { kopdesData } = useKopdes();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Scrollspy untuk mendeteksi section yang sedang dilihat di halaman Beranda
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScrollSection = () => {
      const scrollPos = window.scrollY + 180;
      const sectionIds = ['struktur', 'visi-misi', 'tentang'];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            return;
          }
        }
      }

      if (window.scrollY < 250) {
        setActiveSection('beranda');
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScrollSection);
    handleScrollSection();
    return () => window.removeEventListener('scroll', handleScrollSection);
  }, [location.pathname]);

  // Handle auto-scroll jika navigasi datang dari halaman lain dengan hash (#tentang, dll)
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  const navItems = [
    { name: "Beranda", href: "/", type: "route" },
    { name: "Tentang", href: "/#tentang", sectionId: "tentang", type: "hash" },
    { name: "Visi & Misi", href: "/#visi-misi", sectionId: "visi-misi", type: "hash" },
    { name: "Struktur", href: "/#struktur", sectionId: "struktur", type: "hash" },
    { name: "Layanan", href: "/layanan", type: "route" },
    { name: "Galeri", href: "/galeri", type: "route" },
  ];

  const handleNavClick = (e, item) => {
    setMobileMenuOpen(false);

    if (item.type === 'hash') {
      e.preventDefault();
      if (location.pathname === '/') {
        const el = document.getElementById(item.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/#${item.sectionId}`);
      }
    } else if (item.href === '/') {
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const isItemActive = (item) => {
    if (location.pathname === '/') {
      if (item.type === 'hash') {
        return activeSection === item.sectionId;
      }
      if (item.href === '/') {
        return activeSection === 'beranda' || !activeSection;
      }
      return false;
    }
    return location.pathname === item.href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white shadow-sm py-3 border-b border-slate-200'
          : 'bg-white py-4 border-b border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-3.5 focus:outline-none">
            <img
              src={kopdesData.logo}
              alt="Logo Kopdes"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col border-l border-slate-200 pl-3.5">
              <span className="font-bold text-base leading-none text-slate-900 tracking-tight">
                KOPDES <span className="uppercase">{kopdesData.namaKoperasi || 'Desa Anda'}</span>
              </span>
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider mt-1">
                Portal Resmi Koperasi Desa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-colors ${
                    active
                      ? 'text-primary bg-red-50 border border-red-100'
                      : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none border border-slate-200"
              aria-label="Toggle Menu Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-slate-200 shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-1.5">
              {navItems.map((item) => {
                const active = isItemActive(item);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-red-50 text-primary border border-red-100'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronRight className={`w-4 h-4 ${active ? 'text-primary' : 'text-slate-400'}`} />
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
