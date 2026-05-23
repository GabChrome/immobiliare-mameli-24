import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Navigation, MapPin, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MockPin {
  id: number;
  title: string;
  price: string;
  type: string;
  beds: number;
  mq: number;
  x: string; // horizontal percentage position
  y: string; // vertical percentage position
  image: string;
}

const mockPins: MockPin[] = [
  {
    id: 1,
    title: 'Attico Moderno Vista Parco',
    price: '€ 320.000',
    type: 'Vendita',
    beds: 3,
    mq: 110,
    x: '45%',
    y: '35%',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    title: 'Villa Unifamiliare con Piscina',
    price: '€ 580.000',
    type: 'Vendita',
    beds: 4,
    mq: 220,
    x: '25%',
    y: '65%',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    title: 'Trilocale Ristrutturato Centro',
    price: '€ 175.000',
    type: 'Vendita',
    beds: 2,
    mq: 85,
    x: '65%',
    y: '48%',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 4,
    title: 'Bilocale Loft Design',
    price: '€ 950 / mese',
    type: 'Affitto',
    beds: 1,
    mq: 60,
    x: '55%',
    y: '72%',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&q=80',
  },
];

export const MapPlaceholder: React.FC = () => {
  const [selectedPin, setSelectedPin] = useState<MockPin | null>(null);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 1.8));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.8));

  return (
    <div className="relative w-full h-[500px] md:h-[600px] bg-[#E5E9F0] rounded-3xl overflow-hidden shadow-premium border border-navy-100 flex flex-col justify-end">
      
      {/* Dynamic Grid Dot Background simulating a stylized map */}
      <div 
        className="absolute inset-0 custom-map-container transition-transform duration-500 origin-center flex items-center justify-center"
        style={{ 
          transform: `scale(${zoom})`,
        }}
      >
        {/* Mock Streets / Rivers */}
        <div className="absolute w-full h-8 bg-white/60 blur-[1px] rotate-[-12deg] top-[30%]" />
        <div className="absolute w-full h-12 bg-white/60 blur-[1px] rotate-[35deg] top-[60%]" />
        <div className="absolute h-full w-10 bg-white/60 blur-[1px] left-[40%]" />
        <div className="absolute h-full w-6 bg-[#D0E2FF]/80 blur-[2px] left-[70%] rotate-[-45deg]" /> {/* River */}

        {/* Labels of Areas */}
        <div className="absolute top-[20%] left-[20%] text-[10px] md:text-xs font-bold tracking-widest text-navy-400 uppercase select-none">Busto Nord</div>
        <div className="absolute top-[50%] left-[75%] text-[10px] md:text-xs font-bold tracking-widest text-navy-400 uppercase select-none">Gallarate Est</div>
        <div className="absolute bottom-[20%] left-[45%] text-[10px] md:text-xs font-bold tracking-widest text-navy-400 uppercase select-none">Centro Storico</div>

        {/* Map Pins */}
        {mockPins.map(pin => (
          <div
            key={pin.id}
            className="absolute transition-transform duration-300 hover:z-30 cursor-pointer"
            style={{ left: pin.x, top: pin.y, transform: 'translate(-50%, -50%)' }}
            onClick={() => setSelectedPin(pin)}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-premium border font-semibold text-xs whitespace-nowrap transition-all ${
                selectedPin?.id === pin.id
                  ? 'bg-accent text-primary-dark border-accent scale-105 glow-accent'
                  : 'bg-primary text-white border-primary/20 hover:bg-primary-light'
              }`}
            >
              <MapPin size={13} className={selectedPin?.id === pin.id ? 'text-primary-dark' : 'text-accent'} />
              <span>{pin.price}</span>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Floating Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        <button
          onClick={handleZoomIn}
          className="p-2.5 bg-white text-primary hover:bg-neutral-100 rounded-xl shadow-premium border border-neutral-200 transition-colors"
          aria-label="Zoom In"
        >
          <ZoomIn size={18} />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2.5 bg-white text-primary hover:bg-neutral-100 rounded-xl shadow-premium border border-neutral-200 transition-colors"
          aria-label="Zoom Out"
        >
          <ZoomOut size={18} />
        </button>
        <button
          onClick={() => { setSelectedPin(null); setZoom(1); }}
          className="p-2.5 bg-white text-primary hover:bg-neutral-100 rounded-xl shadow-premium border border-neutral-200 transition-colors"
          aria-label="Reset Map"
        >
          <Navigation size={18} />
        </button>
      </div>

      {/* Bottom Floating Info Alert */}
      <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs flex items-center gap-2 shadow-premium border border-white/10 max-w-[280px] md:max-w-xs pointer-events-none">
        <Info size={14} className="text-accent flex-shrink-0" />
        <span>Clicca sui pin della mappa per visualizzare i dettagli degli immobili</span>
      </div>

      {/* Selected Property Overlay Card */}
      <AnimatePresence>
        {selectedPin && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="absolute bottom-6 left-6 right-6 md:left-6 md:right-auto md:w-[350px] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-neutral-100 z-20 flex items-start gap-4"
          >
            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-200">
              <img 
                src={selectedPin.image} 
                alt={selectedPin.title} 
                className="w-full h-full object-cover" 
              />
              <span className="absolute top-1 left-1 px-2 py-0.5 rounded bg-primary text-white text-[9px] font-bold uppercase">
                {selectedPin.type}
              </span>
            </div>
            
            <div className="flex-1 flex flex-col justify-between h-24">
              <div className="relative pr-6">
                <button 
                  onClick={() => setSelectedPin(null)} 
                  className="absolute top-0 right-0 p-0.5 hover:bg-neutral-100 rounded-full text-neutral-450 hover:text-navy-900 transition-colors"
                >
                  <X size={16} />
                </button>
                <h4 className="font-bold text-navy-800 text-sm line-clamp-2 leading-tight">
                  {selectedPin.title}
                </h4>
                <p className="text-accent font-bold text-base mt-1">
                  {selectedPin.price}
                </p>
              </div>

              <div className="flex items-center gap-4 text-neutral-450 text-xs border-t border-neutral-100 pt-1.5 mt-1.5">
                <span>{selectedPin.beds} Camere</span>
                <span>{selectedPin.mq} Mq</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Styled Google Maps Layout Background */}
      <div className="absolute inset-0 bg-[#E5E9F0] pointer-events-none opacity-20 custom-map-container" />
    </div>
  );
};
