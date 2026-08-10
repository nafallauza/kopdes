import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { kopdesData } from '../../data/dummyData';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  const navItems = [
    { name: "Profile", href: "/" },
    { name: "Layanan", href: "/layanan" },
    { name: "Galeri", href: "/galeri" },
  ];

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
              alt={kopdesData.name}
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col border-l border-slate-200 pl-3.5">
              <span className="font-bold text-base leading-none text-slate-900 tracking-tight">
                {kopdesData.shortName}
              </span>
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wider mt-1">
                Portal Resmi Koperasi Desa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Profile, Layanan, Galeri) */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
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
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-red-50 text-primary border border-red-100'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
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
