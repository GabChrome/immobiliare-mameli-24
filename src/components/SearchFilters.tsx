import React, { useState } from 'react';
import { MapPin, Building, Euro, Search, Map } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchFiltersProps {
  onSearch: (filters: { location: string; type: string; price: string; isMapActive: boolean }) => void;
  isMapActive: boolean;
  onMapToggle: (active: boolean) => void;
  initialType?: string;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  isMapActive,
  onMapToggle,
  initialType = '',
}) => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState(initialType);
  const [price, setPrice] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const locations = ['Busto Arsizio', 'Gallarate', 'Milano', 'Legnano', 'Castellanza', 'Olgiate Olona'];
  
  const filteredSuggestions = locations.filter(loc =>
    loc.toLowerCase().includes(location.toLowerCase())
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ location, type, price, isMapActive });
  };

  const handleSuggestionClick = (loc: string) => {
    setLocation(loc);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Tab controls or header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="bg-primary-dark/40 backdrop-blur-md p-1 rounded-xl inline-flex border border-white/10">
          <button
            type="button"
            onClick={() => onMapToggle(false)}
            className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
              !isMapActive
                ? 'bg-accent text-primary-dark shadow-premium'
                : 'text-white hover:text-accent'
            }`}
          >
            Lista Annunci
          </button>
          <button
            type="button"
            onClick={() => onMapToggle(true)}
            className={`px-4 py-2 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-colors ${
              isMapActive
                ? 'bg-accent text-primary-dark shadow-premium'
                : 'text-white hover:text-accent'
            }`}
          >
            <Map size={14} />
            Mappa Interattiva
          </button>
        </div>

        <span className="text-white/80 text-xs font-medium bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 hidden sm:inline-block">
          ⚡ Oltre <span className="text-accent font-bold">120+ immobili</span> disponibili oggi
        </span>
      </div>

      {/* Main glassmorphic search form */}
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full p-4 md:py-3 md:pl-8 md:pr-3 shadow-2xl border border-white/20 flex flex-col md:flex-row items-stretch md:items-center gap-4 glow-primary"
      >
        {/* Location input with suggestions */}
        <div className="flex-1 relative flex items-center gap-3 border-b md:border-b-0 md:border-r border-neutral-200 pb-3 md:pb-0 md:pr-4">
          <MapPin className="text-accent flex-shrink-0" size={20} />
          <div className="flex-1">
            <label className="block text-[10px] uppercase font-bold text-neutral-450 tracking-wider">
              Località
            </label>
            <input
              type="text"
              value={location}
              onChange={e => {
                setLocation(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Dove vuoi cercare?"
              className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-navy-800 placeholder-neutral-400 focus:ring-0 focus:outline-none mt-0.5"
            />
          </div>

          {/* Location Auto-suggestions drawer */}
          {showSuggestions && location && filteredSuggestions.length > 0 && (
            <div className="absolute top-[calc(100%+12px)] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-2 z-50 flex flex-col gap-1 overflow-hidden">
              {filteredSuggestions.map((loc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onMouseDown={() => handleSuggestionClick(loc)}
                  className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-neutral-50 text-xs font-semibold text-navy-800 transition-colors flex items-center gap-2"
                >
                  <MapPin size={14} className="text-neutral-450" />
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Type Dropdown */}
        <div className="flex-1 flex items-center gap-3 border-b md:border-b-0 md:border-r border-neutral-200 pb-3 md:pb-0 md:pr-4">
          <Building className="text-accent flex-shrink-0" size={20} />
          <div className="flex-1">
            <label className="block text-[10px] uppercase font-bold text-neutral-450 tracking-wider">
              Tipologia
            </label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-navy-800 focus:ring-0 focus:outline-none mt-0.5 cursor-pointer appearance-none"
            >
              <option value="">Tutte le tipologie</option>
              <option value="appartamento">Appartamento</option>
              <option value="villa">Villa Indipendente</option>
              <option value="attico">Attico & Loft</option>
              <option value="rustico">Rustico & Casale</option>
              <option value="ufficio">Ufficio / Commerciale</option>
            </select>
          </div>
        </div>

        {/* Max Budget Dropdown */}
        <div className="flex-1 flex items-center gap-3 pb-3 md:pb-0 md:pr-4">
          <Euro className="text-accent flex-shrink-0" size={20} />
          <div className="flex-1">
            <label className="block text-[10px] uppercase font-bold text-neutral-450 tracking-wider">
              Prezzo Massimo
            </label>
            <select
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-navy-800 focus:ring-0 focus:outline-none mt-0.5 cursor-pointer appearance-none"
            >
              <option value="">Nessun limite</option>
              <option value="150000">€ 150.000</option>
              <option value="250000">€ 250.000</option>
              <option value="350000">€ 350.000</option>
              <option value="500000">€ 500.000</option>
              <option value="750000">€ 750.000</option>
              <option value="1500">€ 1.500 / mese (Affitto)</option>
            </select>
          </div>
        </div>

        {/* Submit Search CTA Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="py-4 md:py-3.5 px-8 rounded-xl md:rounded-full bg-primary text-white hover:bg-primary-light transition-colors font-semibold text-sm flex items-center justify-center gap-2 shadow-premium border border-primary/20"
        >
          <Search size={16} className="text-accent" />
          <span>Cerca</span>
        </motion.button>
      </form>
    </div>
  );
};
