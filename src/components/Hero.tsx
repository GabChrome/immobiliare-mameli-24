import React from 'react';
import { motion } from 'framer-motion';
import { SearchFilters } from './SearchFilters';
import { Video, Award } from 'lucide-react';

interface HeroProps {
  onSearch: (filters: { 
    location: string; 
    type: string; 
    minPrice: string; 
    maxPrice: string; 
    contract: 'vendita' | 'affitto'; 
    isMapActive: boolean; 
  }) => void;
  isMapActive: boolean;
  onMapToggle: (active: boolean) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, isMapActive, onMapToggle }) => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center items-center pt-24 pb-12 overflow-hidden">
      {/* Background Image with elegant overlay gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80"
          alt="Immobiliare Mameli 24 Luxury Interior"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/75 to-primary-dark/80" />
      </div>

      {/* Main Content Containers */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center justify-center flex-grow">
        
        {/* Floating Badges */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-semibold tracking-wider uppercase mb-6"
        >
          <Award size={14} className="text-accent" />
          <span>Agenzia Leader a Busto Arsizio & Varese</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.15]"
        >
          La tua casa ideale a <br className="hidden sm:inline" />
          <span className="text-accent bg-clip-text">Busto Arsizio</span>, Gallarate e Milano.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-neutral-200 max-w-3xl leading-relaxed font-light"
        >
          Vendiamo il tuo immobile in <strong className="text-white font-semibold">45 giorni</strong> o troviamo la casa dei tuoi sogni con <span className="text-accent font-semibold flex-inline items-center gap-1"><Video size={16} className="inline mr-1" />tour virtuali immersivi</span>.
        </motion.p>

        {/* Quick Highlights / Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 mt-8 mb-12 text-xs sm:text-sm font-medium text-neutral-300"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>Virtual Tour 360° Inclusi</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>Zero Provvigioni Acquirente</span>
          </div>
          <div className="flex items-center justify-center gap-2 col-span-2 md:col-span-1">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span>Valutazione in 120 Secondi</span>
          </div>
        </motion.div>

        {/* Search Panel Integration */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120, delay: 0.4 }}
          className="w-full mt-4"
        >
          <SearchFilters 
            onSearch={onSearch}
            isMapActive={isMapActive}
            onMapToggle={onMapToggle}
          />
        </motion.div>
      </div>

      {/* Decorative Bottom Wave/Curve */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-50 to-transparent pointer-events-none z-0" />
    </section>
  );
};
