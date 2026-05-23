import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Phone, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onValuateClick: () => void;
  onSearchClick: (type?: 'vendita' | 'affitto') => void;
  onAboutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onValuateClick, onSearchClick, onAboutClick }) => {
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
    { label: 'Immobili in Vendita', icon: Home, onClick: () => { onSearchClick('vendita'); setIsMobileMenuOpen(false); } },
    { label: 'Immobili in Affitto', icon: Home, onClick: () => { onSearchClick('affitto'); setIsMobileMenuOpen(false); } },
    { label: 'Chi Siamo', icon: Info, onClick: () => { onAboutClick(); setIsMobileMenuOpen(false); } },
    { label: 'Contatti', icon: Phone, onClick: () => {
      const footer = document.getElementById('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }},
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-primary/90 backdrop-blur-md py-3 shadow-glass border-b border-white/10 text-white'
            : 'bg-transparent py-5 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
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
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={item.onClick}
                  className="font-medium text-sm hover:text-accent transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-accent hover:after:w-full after:transition-all after:duration-300"
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
                    '0 0 0 0 rgba(212, 175, 55, 0.4)',
                    '0 0 0 10px rgba(212, 175, 55, 0)',
                    '0 0 0 0 rgba(212, 175, 55, 0.4)',
                  ],
                }}
                transition={{
                  boxShadow: {
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut',
                  },
                }}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-accent text-primary-dark font-semibold text-sm hover:bg-accent-hover transition-colors shadow-accent hover:shadow-accent-hover border border-accent/25"
              >
                Valuta la tua Casa
              </motion.button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
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
                    className="p-1 rounded-lg hover:bg-white/10"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex flex-col gap-6">
                  {menuItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.onClick}
                      className="flex items-center gap-4 text-left font-medium text-lg hover:text-accent transition-colors py-2 border-b border-white/5"
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
                  className="w-full py-3 rounded-xl bg-accent text-primary-dark font-semibold text-center hover:bg-accent-hover transition-colors shadow-accent"
                >
                  Valuta la tua Casa
                </button>
                <div className="text-center text-xs text-neutral-400">
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
