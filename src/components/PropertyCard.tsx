import React from 'react';
import { Bed, Bath, Maximize2, Video, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Property {
  id: number;
  title: string;
  price: string;
  priceNum: number;
  location: string;
  address: string;
  beds: number;
  baths: number;
  mq: number;
  image: string;
  contract: 'vendita' | 'affitto';
  badges: string[];
  energyClass: string;
}

interface PropertyCardProps {
  property: Property;
  onContactClick: (title: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onContactClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover border border-neutral-100 flex flex-col h-full group transition-all"
    >
      {/* Property Image & Badges */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Contract Overlay Badge */}
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white shadow-premium ${
          property.contract === 'vendita' ? 'bg-primary' : 'bg-accent text-primary-dark font-black'
        }`}>
          {property.contract}
        </span>

        {/* Feature/Promo Overlap Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-1.5 items-end">
          {property.badges.map((badge, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-primary-dark/80 backdrop-blur-sm text-white font-bold text-[9px] uppercase tracking-wider flex items-center gap-1 border border-white/10"
            >
              {badge.includes('360') && <Video size={10} className="text-accent" />}
              {badge}
            </span>
          ))}

          {/* Energy Class Badge */}
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white font-black text-[9px] uppercase tracking-wider">
            Classe {property.energyClass}
          </span>
        </div>

        {/* Shadow Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Property Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Tag */}
          <div className="flex items-center gap-1 text-accent font-bold text-xl tracking-tight">
            <Tag size={16} className="text-accent/80" />
            <span>{property.price}</span>
          </div>

          {/* Title & Location */}
          <h3 className="font-bold text-navy-800 text-base sm:text-lg mt-2 line-clamp-1 leading-snug group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <p className="text-neutral-450 text-xs mt-1">
            {property.address}, {property.location}
          </p>
        </div>

        {/* Features icons footer */}
        <div className="mt-6 border-t border-neutral-100 pt-5">
          <div className="flex items-center justify-between gap-4 text-xs font-semibold text-neutral-450 mb-5">
            <div className="flex items-center gap-1.5">
              <Bed size={15} className="text-primary-light" />
              <span>{property.beds} Camere</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath size={15} className="text-primary-light" />
              <span>{property.baths} Bagni</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 size={15} className="text-primary-light" />
              <span>{property.mq} Mq</span>
            </div>
          </div>

          <button
            onClick={() => onContactClick(property.title)}
            className="w-full py-3 rounded-xl border border-primary text-primary group-hover:bg-primary group-hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            Vedi Dettaglio & Contatta
          </button>
        </div>
      </div>
    </motion.div>
  );
};
