import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  currentPage: 'home' | 'about' | 'contact';
  onPageChange: (page: 'home' | 'about' | 'contact') => void;
  onValuateClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, onValuateClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const menuItems = [
    { label: 'Home', id: 'home' as const, icon: Home },
    { label: 'Chi Siamo', id: 'about' as const, icon: Info },
    { label: 'Contatti', id: 'contact' as const, icon: PhoneCall },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-primary/95 backdrop-blur-md py-3 shadow-glass border-b border-white/10 text-white'
            : 'bg-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => { onPageChange('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-primary-dark font-bold text-xl shadow-accent group-hover:scale-105 transition-transform">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-wider uppercase">
                  Mameli <span className="text-accent">24</span>
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-300 font-medium">
                  Immobiliare
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onPageChange(item.id)}
                  className={`font-semibold text-sm transition-colors relative py-1 cursor-pointer hover:text-accent ${
                    currentPage === item.id 
                      ? 'text-accent border-b-2 border-accent' 
                      : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={onValuateClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(0, 168, 232, 0.4)',
                    '0 0 0 10px rgba(0, 168, 232, 0)',
                    '0 0 0 0 rgba(0, 168, 232, 0.4)',
                  ],
                }}
                transition={{
                  boxShadow: {
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut',
                  },
                }}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-accent text-primary-dark font-black text-sm hover:bg-accent-hover transition-colors shadow-accent hover:shadow-accent-hover border border-accent/25 cursor-pointer"
              >
                Valuta la tua Casa
              </motion.button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-primary-dark/80 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-primary-dark border-l border-white/10 z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden text-white"
            >
              <div className="flex flex-col gap-8 mt-10">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-primary-dark font-bold text-base">
                      M
                    </div>
                    <span className="font-bold text-md uppercase tracking-wider">
                      Mameli <span className="text-accent">24</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 rounded-lg hover:bg-white/10 cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-6">
                  {menuItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onPageChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-4 text-left font-semibold text-lg hover:text-accent transition-colors py-2 border-b border-white/5 cursor-pointer ${
                        currentPage === item.id ? 'text-accent' : 'text-white'
                      }`}
                    >
                      <item.icon className="text-accent" size={20} />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onValuateClick();
                  }}
                  className="w-full py-3 rounded-xl bg-accent text-primary-dark font-black text-center hover:bg-accent-hover transition-colors shadow-accent cursor-pointer"
                >
                  Valuta la tua Casa
                </button>
                <div className="text-center text-xs text-neutral-450">
                  Via Nino Bixio 1/D, Busto Arsizio (VA)
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
