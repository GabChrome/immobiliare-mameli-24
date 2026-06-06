import React, { useState, useEffect } from 'react';
import { MapPin, Building, Euro, Search, Map, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchFiltersProps {
  filters?: {
    location: string;
    type: string;
    price: string;
    contract: 'tutti' | 'vendita' | 'affitto';
  };
  onSearch: (filters: { 
    location: string; 
    type: string; 
    price: string; 
    contract: 'tutti' | 'vendita' | 'affitto'; 
    isMapActive: boolean; 
  }) => void;
  isMapActive: boolean;
  onMapToggle: (active: boolean) => void;
  initialType?: string;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onSearch,
  isMapActive,
  onMapToggle,
  initialType = '',
}) => {
  const [location, setLocation] = useState('');
  const [type, setType] = useState(initialType);
  const [contract, setContract] = useState<'tutti' | 'vendita' | 'affitto'>('tutti');
  const [price, setPrice] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sync internal state with external filters prop
  useEffect(() => {
    if (filters) {
      if (document.activeElement?.getAttribute('placeholder') !== 'Dove vuoi cercare?') {
        setLocation(filters.location || '');
      }
      setType(filters.type || '');
      setContract(filters.contract || 'tutti');
      setPrice(filters.price || '');
    }
  }, [filters]);

  const locations = ['Busto Arsizio', 'Gallarate', 'Milano', 'Legnano', 'Castellanza', 'Olgiate Olona'];
  
  const filteredSuggestions = locations.filter(loc =>
    loc.toLowerCase().includes(location.toLowerCase())
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ 
      location, 
      type, 
      price, 
      contract, 
      isMapActive 
    });
  };

  const handleSuggestionClick = (loc: string) => {
    setLocation(loc);
    setShowSuggestions(false);
  };

  const handleContractChange = (newContract: 'tutti' | 'vendita' | 'affitto') => {
    setContract(newContract);
    
    // Keep price if it is compatible, otherwise clear it
    if (newContract === 'affitto') {
      const isValidRent = ['400', '600', '800', '1000', '1500', '2000', '3000', '5000'].includes(price);
      if (!isValidRent) setPrice('');
    } else {
      // vendita or tutti
      const isValidSale = ['100000', '150000', '200000', '250000', '300000', '400000', '500000', '750000', '1000000'].includes(price);
      if (!isValidSale) setPrice('');
    }
  };

  const handleResetFilters = () => {
    setLocation('');
    setType('');
    setPrice('');
    setContract('tutti');
    onSearch({ 
      location: '', 
      type: '', 
      price: '', 
      contract: 'tutti', 
      isMapActive 
    });
  };

  const hasActiveFilters = location !== '' || type !== '' || price !== '' || contract !== 'tutti';

  const priceOptionsVendita = [
    { value: '', label: 'Qualsiasi prezzo' },
    { value: '100000', label: 'Fino a € 100.000' },
    { value: '150000', label: 'Fino a € 150.000' },
    { value: '200000', label: 'Fino a € 200.000' },
    { value: '250000', label: 'Fino a € 250.000' },
    { value: '300000', label: 'Fino a € 300.000' },
    { value: '400000', label: 'Fino a € 400.000' },
    { value: '500000', label: 'Fino a € 500.000' },
    { value: '750000', label: 'Fino a € 750.000' },
    { value: '1000000', label: 'Fino a € 1.000.000' },
  ];

  const priceOptionsAffitto = [
    { value: '', label: 'Qualsiasi prezzo' },
    { value: '400', label: 'Fino a € 400 / mese' },
    { value: '600', label: 'Fino a € 600 / mese' },
    { value: '800', label: 'Fino a € 800 / mese' },
    { value: '1000', label: 'Fino a € 1.000 / mese' },
    { value: '1500', label: 'Fino a € 1.500 / mese' },
    { value: '2000', label: 'Fino a € 2.000 / mese' },
    { value: '3000', label: 'Fino a € 3.000 / mese' },
    { value: '5000', label: 'Fino a € 5.000 / mese' },
  ];

  // For 'tutti' we show Vendita price options to cover the higher range
  const currentPriceOptions = contract === 'affitto' ? priceOptionsAffitto : priceOptionsVendita;

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* Tab controls header row */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Permanent tabs: Tutti / Vendita / Affitto */}
          <div className="bg-primary-dark/40 backdrop-blur-md p-1 rounded-xl inline-flex border border-white/10">
            <button
              type="button"
              onClick={() => handleContractChange('tutti')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                contract === 'tutti'
                  ? 'bg-accent text-primary-dark shadow-premium'
                  : 'text-white hover:text-accent'
              }`}
            >
              Tutti
            </button>
            <button
              type="button"
              onClick={() => handleContractChange('vendita')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                contract === 'vendita'
                  ? 'bg-accent text-primary-dark shadow-premium'
                  : 'text-white hover:text-accent'
              }`}
            >
              Vendita
            </button>
            <button
              type="button"
              onClick={() => handleContractChange('affitto')}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                contract === 'affitto'
                  ? 'bg-accent text-primary-dark shadow-premium'
                  : 'text-white hover:text-accent'
              }`}
            >
              Affitto
            </button>
          </div>

          {/* List / Map Toggle Tabs */}
          <div className="bg-primary-dark/40 backdrop-blur-md p-1 rounded-xl inline-flex border border-white/10">
            <button
              type="button"
              onClick={() => onMapToggle(false)}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
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
              className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                isMapActive
                  ? 'bg-accent text-primary-dark shadow-premium'
                  : 'text-white hover:text-accent'
              }`}
            >
              <Map size={14} />
              Mappa Interattiva
            </button>
          </div>
        </div>

        <span className="text-white/80 text-xs font-semibold bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 hidden lg:inline-block">
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
                  className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-neutral-50 text-xs font-semibold text-navy-800 transition-colors flex items-center gap-2 cursor-pointer"
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
              className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-navy-800 focus:ring-0 focus:outline-none mt-0.5 cursor-pointer appearance-none animate-none"
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

        {/* Price Dropdown Selector */}
        <div className="flex-1 flex items-center gap-3 pb-3 md:pb-0 md:pr-4">
          <Euro className="text-accent flex-shrink-0" size={20} />
          <div className="flex-1">
            <label className="block text-[10px] uppercase font-bold text-neutral-450 tracking-wider">
              Prezzo Massimo
            </label>
            <select
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-sm font-semibold text-navy-800 focus:ring-0 focus:outline-none mt-0.5 cursor-pointer appearance-none animate-none"
            >
              {currentPriceOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit & Reset Button area */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Permanent Reset Filters Icon Button */}
          <motion.button
            type="button"
            onClick={handleResetFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-3.5 rounded-full transition-colors cursor-pointer flex items-center justify-center border ${
              hasActiveFilters 
                ? 'hover:bg-neutral-100 text-neutral-450 hover:text-accent border-neutral-200' 
                : 'text-neutral-300 border-neutral-200 opacity-60 cursor-not-allowed'
            }`}
            title="Resetta Filtri"
            disabled={!hasActiveFilters}
          >
            <RotateCcw size={16} />
          </motion.button>

          {/* Submit Search CTA Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 md:flex-none py-4 md:py-3.5 px-8 rounded-xl md:rounded-full bg-primary text-white hover:bg-primary-light transition-colors font-semibold text-sm flex items-center justify-center gap-2 shadow-premium border border-primary/20 cursor-pointer"
          >
            <Search size={16} className="text-accent" />
            <span>Cerca</span>
          </motion.button>
        </div>
      </form>
    </div>
  );
};
