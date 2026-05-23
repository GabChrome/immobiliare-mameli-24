import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Count-up counter component triggered on scroll viewport intersection
const CountUp: React.FC<{ end: number; duration?: number; prefix?: string; suffix?: string }> = ({
  end,
  duration = 1500,
  prefix = '',
  suffix = '',
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <div ref={elementRef} className="font-extrabold text-4xl sm:text-5xl text-primary flex items-baseline justify-center">
      <span>{prefix}</span>
      <span>{count.toLocaleString('it-IT')}</span>
      <span className="text-accent ml-0.5">{suffix}</span>
    </div>
  );
};

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  location: string;
}

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Gianluca Pozzi',
    role: 'Venditore Appartamento',
    quote: "Ho venduto il mio trilocale a Busto Arsizio in soli 38 giorni grazie ad Immobiliare Mameli 24. Il servizio di Virtual Tour ha attirato solo acquirenti qualificati, riducendo a zero le visite a vuoto. Professionalità estrema ed efficienza incredibile!",
    rating: 5,
    location: 'Busto Arsizio'
  },
  {
    id: 2,
    name: 'Elena Marcora',
    role: 'Acquirente Villa',
    quote: "Trovare la casa dei sogni con loro è stato un viaggio splendido. Ci hanno accompagnato in ogni step con una trasparenza encomiabile. Le visite virtuali ci hanno permesso di scremare moltissimo e focalizzarci sull'immobile giusto immediatamente.",
    rating: 5,
    location: 'Gallarate'
  },
  {
    id: 3,
    name: 'Roberto Valente',
    role: 'Proprietario di Immobile',
    quote: "Ho utilizzato il form di valutazione gratuita del sito Mameli 24 e sono rimasto colpito dalla precisione dei dati. Successivamente sono stato ricontattato da un consulente che ha finalizzato il mandato. Operazione completata con successo!",
    rating: 5,
    location: 'Milano'
  }
];

export const StatsAndReviews: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex(prev => (prev + 1) % mockTestimonials.length);
  };

  const prevReview = () => {
    setCurrentIndex(prev => (prev - 1 + mockTestimonials.length) % mockTestimonials.length);
  };

  // Auto scroll testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextReview();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="chi-siamo" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Blur BG circles */}
      <div className="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] bg-neutral-100/50 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-accent/5 rounded-full blur-3xl z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* STATS SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-20 border-b border-neutral-100">
          
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-neutral-50/50 border border-neutral-100 text-center shadow-premium flex flex-col items-center justify-center gap-2 group hover:border-accent/30 transition-colors"
          >
            <CountUp end={500} prefix="+" suffix="" />
            <h4 className="font-bold text-navy-800 text-sm tracking-wide mt-2">Immobili Venduti</h4>
            <p className="text-neutral-450 text-[11px] font-light max-w-xs mt-1">
              Transazioni concluse con successo a Busto Arsizio, Gallarate e Milano.
            </p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-neutral-50/50 border border-neutral-100 text-center shadow-premium flex flex-col items-center justify-center gap-2 group hover:border-accent/30 transition-colors"
          >
            <CountUp end={98} suffix="%" />
            <h4 className="font-bold text-navy-800 text-sm tracking-wide mt-2">Clienti Soddisfatti</h4>
            <p className="text-neutral-450 text-[11px] font-light max-w-xs mt-1">
              Rapporti basati sulla trasparenza, con referenze a 5 stelle certificate.
            </p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-neutral-50/50 border border-neutral-100 text-center shadow-premium flex flex-col items-center justify-center gap-2 group hover:border-accent/30 transition-colors"
          >
            <CountUp end={15} suffix=" anni" />
            <h4 className="font-bold text-navy-800 text-sm tracking-wide mt-2">Esperienza sul Territorio</h4>
            <p className="text-neutral-450 text-[11px] font-light max-w-xs mt-1">
              Presenza storica sul mercato immobiliare locale, con broker di alto livello.
            </p>
          </motion.div>

        </div>

        {/* TESTIMONIALS SLIDER SECTION */}
        <div className="pt-20 max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs uppercase tracking-widest inline-block">
              Riprova Sociale
            </span>
            <h3 className="text-3xl font-bold text-navy-800 mt-4">
              Cosa Dicono di Noi i Nostri Clienti
            </h3>
          </div>

          <div className="relative bg-neutral-50 rounded-3xl p-8 sm:p-12 border border-neutral-100 shadow-premium glow-primary">
            
            {/* Quote Icon watermark */}
            <Quote className="absolute top-8 left-8 text-neutral-200/80 w-16 h-16 pointer-events-none" />

            <div className="relative z-10 min-h-[180px] flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-6 justify-center sm:justify-start">
                    {[...Array(mockTestimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-accent fill-accent" />
                    ))}
                  </div>

                  {/* Testimonial Quote text */}
                  <blockquote className="text-navy-800 text-sm sm:text-base md:text-lg leading-relaxed font-light italic text-center sm:text-left">
                    "{mockTestimonials[currentIndex].quote}"
                  </blockquote>

                  {/* Author Meta details */}
                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-200/60 pt-6">
                    <div className="text-center sm:text-left">
                      <h5 className="font-bold text-navy-800 text-sm sm:text-base">
                        {mockTestimonials[currentIndex].name}
                      </h5>
                      <p className="text-neutral-450 text-[11px] uppercase tracking-wider font-semibold mt-0.5">
                        {mockTestimonials[currentIndex].role} — {mockTestimonials[currentIndex].location}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold self-center">
                      <Check size={12} className="text-emerald-600" />
                      <span>Recensione Verificata</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Slider Navigation arrows */}
            <div className="absolute bottom-[-24px] right-8 flex items-center gap-2 z-20">
              <button
                onClick={prevReview}
                className="p-2.5 rounded-xl bg-white hover:bg-neutral-100 text-navy-800 transition-all shadow-premium border border-neutral-200 hover:scale-105 active:scale-95"
                aria-label="Previous Review"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextReview}
                className="p-2.5 rounded-xl bg-white hover:bg-neutral-100 text-navy-800 transition-all shadow-premium border border-neutral-200 hover:scale-105 active:scale-95"
                aria-label="Next Review"
              >
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {mockTestimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-6 bg-accent' : 'w-2 bg-neutral-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
