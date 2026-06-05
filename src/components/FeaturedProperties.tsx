import React, { useState, useMemo, useEffect } from 'react';
import { PropertyCard } from './PropertyCard';
import type { Property } from './PropertyCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Sparkles } from 'lucide-react';

const mockProperties: Property[] = [
  {
    id: 1,
    title: 'Attico Moderno Vista Parco',
    price: '€ 320.000',
    priceNum: 320000,
    location: 'Busto Arsizio',
    address: 'Via della Repubblica 15',
    beds: 3,
    baths: 2,
    mq: 110,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    contract: 'vendita',
    badges: ['Virtual Tour 360°', 'Terrazzo'],
    energyClass: 'A'
  },
  {
    id: 2,
    title: 'Villa Unifamiliare con Piscina',
    price: '€ 580.000',
    priceNum: 580000,
    location: 'Gallarate',
    address: 'Viale dei Cedri 8',
    beds: 4,
    baths: 3,
    mq: 220,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    contract: 'vendita',
    badges: ['Esclusiva', 'Piscina Privata'],
    energyClass: 'A'
  },
  {
    id: 3,
    title: 'Trilocale Ristrutturato Centro',
    price: '€ 175.000',
    priceNum: 175000,
    location: 'Busto Arsizio',
    address: 'Via Giuseppe Garibaldi 22',
    beds: 2,
    baths: 1,
    mq: 85,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
    contract: 'vendita',
    badges: ['Classe A+', 'Ristrutturato'],
    energyClass: 'A'
  },
  {
    id: 4,
    title: 'Bilocale Loft Design',
    price: '€ 950 / mese',
    priceNum: 950,
    location: 'Milano',
    address: 'Corso Garibaldi 104',
    beds: 1,
    baths: 1,
    mq: 60,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80',
    contract: 'affitto',
    badges: ['Virtual Tour 360°', 'Arredato'],
    energyClass: 'A'
  },
];

interface FeaturedPropertiesProps {
  onContactClick: (propertyTitle: string) => void;
  filters: { 
    location: string; 
    type: string; 
    price: string; 
    contract: 'tutti' | 'vendita' | 'affitto';
  };
  isMapActive: boolean;
  onUpdateFilters: (newFilters: { 
    location: string; 
    type: string; 
    price: string; 
    contract: 'tutti' | 'vendita' | 'affitto';
  }) => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  onContactClick,
  filters,
  isMapActive,
  onUpdateFilters,
}) => {
  const [activeTab, setActiveTab] = useState<'tutti' | 'vendita' | 'affitto'>('tutti');

  // Sync activeTab with filters.contract if it changes globally (e.g. from Hero search)
  useEffect(() => {
    if (filters.contract) {
      setActiveTab(filters.contract);
    }
  }, [filters.contract]);

  const handleTabChange = (tab: 'tutti' | 'vendita' | 'affitto') => {
    setActiveTab(tab);
    
    // Keep price if it is compatible, otherwise clear it
    let newPrice = filters.price;
    if (tab === 'affitto') {
      const isValidRent = ['400', '600', '800', '1000', '1500', '2000', '3000', '5000'].includes(filters.price);
      if (!isValidRent) newPrice = '';
    } else {
      const isValidSale = ['100000', '150000', '200000', '250000', '300000', '400000', '500000', '750000', '1000000'].includes(filters.price);
      if (!isValidSale) newPrice = '';
    }

    onUpdateFilters({
      ...filters,
      contract: tab,
      price: newPrice,
    });
  };

  const handleResetAll = () => {
    setActiveTab('tutti');
    onUpdateFilters({
      location: '',
      type: '',
      price: '',
      contract: 'tutti',
    });
  };

  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      // 1. Tab Contract Filter
      if (activeTab !== 'tutti' && property.contract !== activeTab) {
        return false;
      }
      
      // 2. Search Text Location Filter
      if (filters.location) {
        const query = filters.location.toLowerCase();
        const matchesLocation =
          property.location.toLowerCase().includes(query) ||
          property.address.toLowerCase().includes(query);
        if (!matchesLocation) return false;
      }

      // 3. Search Select Type Filter
      if (filters.type) {
        const query = filters.type.toLowerCase();
        const matchesType = property.title.toLowerCase().includes(query) || 
          (query === 'appartamento' && (property.title.toLowerCase().includes('trilocale') || property.title.toLowerCase().includes('bilocale')));
        if (!matchesType) return false;
      }

      // 4. Search Select Price Filter
      if (filters.price) {
        const maxBudget = parseInt(filters.price);
        if (maxBudget > 0) {
          // Special case: if selecting an affitto price but property is vendita, filter out or vice-versa
          if (maxBudget < 5000 && property.contract !== 'affitto') return false;
          if (maxBudget >= 5000 && property.contract !== 'vendita') return false;
          
          if (property.priceNum > maxBudget) return false;
        }
      }

      return true;
    });
  }, [activeTab, filters]);

  return (
    <section id="immobili" className="py-20 bg-neutral-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="flex items-center gap-1 text-accent font-bold text-xs uppercase tracking-widest">
              <Sparkles size={14} className="text-accent" />
              I nostri immobili in evidenza
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mt-2">
              Proposte Esclusive Selezionate
            </h2>
            <p className="text-neutral-450 text-xs sm:text-sm mt-3 font-light max-w-xl leading-relaxed">
              Esplora i nostri migliori appartamenti e ville a Busto Arsizio, Gallarate e Milano dotati di virtual tour 360° immersivo.
            </p>
          </div>

          {/* Filtering Tab Group Button */}
          {!isMapActive && (
            <div className="bg-white p-1 rounded-2xl border border-neutral-200 inline-flex shadow-premium">
              {(['tutti', 'vendita', 'affitto'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs capitalize transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'bg-primary text-white shadow-premium'
                      : 'text-neutral-450 hover:text-navy-800'
                  }`}
                >
                  {tab === 'tutti' ? 'Mostra Tutti' : tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Active Filters Bar */}
        {(filters.location || filters.type || filters.price || (filters.contract && filters.contract !== 'tutti')) && (
          <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-3 rounded-2xl border border-neutral-150 shadow-premium">
            <span className="text-xs font-semibold text-navy-800 mr-2 ml-1">Filtri attivi:</span>
            
            {filters.contract && filters.contract !== 'tutti' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-accent font-bold text-xs capitalize">
                Contratto: {filters.contract}
                <button
                  type="button"
                  onClick={() => handleTabChange('tutti')}
                  className="hover:text-accent-dark font-bold cursor-pointer text-sm"
                >
                  ×
                </button>
              </span>
            )}

            {filters.location && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-accent font-bold text-xs">
                Località: {filters.location}
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ ...filters, location: '' })}
                  className="hover:text-accent-dark font-bold cursor-pointer text-sm"
                >
                  ×
                </button>
              </span>
            )}

            {filters.type && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-accent font-bold text-xs capitalize">
                Tipologia: {filters.type}
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ ...filters, type: '' })}
                  className="hover:text-accent-dark font-bold cursor-pointer text-sm"
                >
                  ×
                </button>
              </span>
            )}

            {filters.price && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-soft text-accent font-bold text-xs">
                Prezzo Max: {parseInt(filters.price) < 5000 ? `€ ${parseInt(filters.price).toLocaleString('it-IT')} / mese` : `€ ${parseInt(filters.price).toLocaleString('it-IT')}`}
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ ...filters, price: '' })}
                  className="hover:text-accent-dark font-bold cursor-pointer text-sm"
                >
                  ×
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetAll}
              className="text-xs font-bold text-neutral-450 hover:text-accent ml-auto mr-1 cursor-pointer transition-colors"
            >
              Cancella Tutti
            </button>
          </div>
        )}

        {/* Results grid container */}
        <AnimatePresence mode="wait">
          {filteredProperties.length > 0 ? (
            <motion.div 
              layout
              key="property-listings-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {filteredProperties.map(property => (
                <motion.div
                  layout
                  key={property.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PropertyCard
                    property={property}
                    onContactClick={onContactClick}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-listings-found"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 bg-white border border-neutral-100 rounded-3xl p-8 max-w-lg mx-auto shadow-premium"
            >
              <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto mb-4 border border-neutral-200">
                <Home size={20} />
              </div>
              <h3 className="font-bold text-navy-800 text-base">Nessun immobile trovato</h3>
              <p className="text-neutral-450 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
                Nessuna proprietà corrisponde ai filtri di ricerca selezionati. Prova a reimpostare la località o a modificare la tipologia.
              </p>
              <button
                onClick={handleResetAll}
                className="mt-6 py-2 px-5 rounded-xl bg-primary text-white hover:bg-primary-light transition-colors text-xs font-semibold cursor-pointer"
              >
                Reimposta filtri
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
