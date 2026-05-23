import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProperties } from './components/FeaturedProperties';
import { MapPlaceholder } from './components/MapPlaceholder';
import { ValutazioneForm } from './components/ValutazioneForm';
import { ChiSiamoPage } from './components/ChiSiamoPage';
import { ContattiPage } from './components/ContattiPage';
import { Footer } from './components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Terminal, User } from 'lucide-react';

interface FilterState {
  location: string;
  type: string;
  price: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'contact'>('home');
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    type: '',
    price: '',
  });
  
  const [isMapActive, setIsMapActive] = useState(false);
  const [contactModalProp, setContactModalProp] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isContactSuccess, setIsContactSuccess] = useState(false);
  const [showContactWebhook, setShowContactWebhook] = useState(false);
  const [contactPayload, setContactPayload] = useState<string>('');

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleSearchSubmit = (searchParams: FilterState & { isMapActive: boolean }) => {
    setFilters({
      location: searchParams.location,
      type: searchParams.type,
      price: searchParams.price,
    });
    setIsMapActive(searchParams.isMapActive);

    // Smooth scroll down to listings or map view
    const targetElement = document.getElementById('immobili');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleValuateRouting = () => {
    if (currentPage === 'home') {
      const formElement = document.getElementById('valuta-casa');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setCurrentPage('home');
      // Delay scroll to allow Home page rendering first
      setTimeout(() => {
        const formElement = document.getElementById('valuta-casa');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 350);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSubmitting(true);

    const mockPayload = {
      event: "property_lead_inquiry",
      timestamp: new Date().toISOString(),
      source: "Immobiliare Mameli 24 Web Portal",
      data: {
        propertyInterested: contactModalProp,
        leadDetails: {
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          message: contactForm.message,
        }
      }
    };

    setContactPayload(JSON.stringify(mockPayload, null, 2));

    setTimeout(() => {
      setIsContactSubmitting(false);
      setIsContactSuccess(true);
      setShowContactWebhook(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-navy-900 overflow-x-hidden antialiased">
      
      {/* Sticky Top Header Navigation */}
      <Header
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onValuateClick={handleValuateRouting}
      />

      {/* RENDER CURRENT PAGE RECT-BASED DYNAMICS */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* HOME PAGE */}
          {currentPage === 'home' && (
            <motion.div
              key="home-page-segment"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Header Section */}
              <Hero
                onSearch={handleSearchSubmit}
                isMapActive={isMapActive}
                onMapToggle={(active) => {
                  setIsMapActive(active);
                  const target = document.getElementById('immobili');
                  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              />

              {/* Listings or Interactive Map */}
              <div id="immobili" className="scroll-mt-20">
                {isMapActive ? (
                  <section className="py-20 bg-neutral-100/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      
                      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <div>
                          <span className="text-accent font-bold text-xs uppercase tracking-widest">
                            Ricerca Georeferenziata
                          </span>
                          <h2 className="text-3xl font-bold text-navy-800 mt-2">
                            Esplora la Mappa Interattiva
                          </h2>
                          <p className="text-neutral-450 text-xs sm:text-sm mt-2 font-light">
                            Visualizza istantaneamente la posizione esatta e il prezzo di mercato dei nostri migliori immobili esclusivi.
                          </p>
                        </div>

                        {/* Split list switch */}
                        <button
                          onClick={() => setIsMapActive(false)}
                          className="px-5 py-2.5 bg-white border border-neutral-200 text-navy-800 font-semibold rounded-xl text-xs hover:bg-neutral-50 transition-colors shadow-premium inline-flex items-center gap-2 self-start cursor-pointer"
                        >
                          Torna alla Visualizzazione Lista
                        </button>
                      </div>

                      {/* Advanced vector interactive map */}
                      <MapPlaceholder />

                    </div>
                  </section>
                ) : (
                  <FeaturedProperties
                    filters={filters}
                    isMapActive={isMapActive}
                    onContactClick={(propertyTitle) => {
                      setContactModalProp(propertyTitle);
                      setContactForm({ name: '', email: '', phone: '', message: `Salve, desidero maggiori informazioni in merito all'immobile "${propertyTitle}".` });
                      setIsContactSuccess(false);
                      setShowContactWebhook(false);
                    }}
                  />
                )}
              </div>

              {/* Lead Generation Section: Valuation Multi-step Form */}
              <div id="valuta-casa" className="scroll-mt-20">
                <ValutazioneForm />
              </div>
            </motion.div>
          )}

          {/* CHI SIAMO PAGE */}
          {currentPage === 'about' && (
            <motion.div
              key="about-page-segment"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <ChiSiamoPage />
            </motion.div>
          )}

          {/* CONTATTI PAGE */}
          {currentPage === 'contact' && (
            <motion.div
              key="contact-page-segment"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <ContattiPage />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer Section */}
      <Footer 
        onPageChange={setCurrentPage}
        onValuateClick={handleValuateRouting}
      />

      {/* PROPERTY CONTACT CONVERSION MODAL */}
      <AnimatePresence>
        {contactModalProp && (
          <>
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setContactModalProp(null)}
              className="fixed inset-0 bg-primary-dark/85 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            />

            {/* Modal Dialog Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-x-4 top-[8%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[600px] bg-white rounded-3xl z-[60] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col border border-neutral-100"
            >
              {/* Header */}
              <div className="bg-primary text-white p-6 flex items-center justify-between border-b border-white/10 flex-shrink-0">
                <div>
                  <span className="text-accent text-[10px] font-bold uppercase tracking-wider">Richiesta Informazioni</span>
                  <h4 className="font-bold text-base leading-tight mt-1 line-clamp-1">
                    {contactModalProp}
                  </h4>
                </div>
                <button
                  onClick={() => setContactModalProp(null)}
                  className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-6 bg-white">
                {!isContactSuccess ? (
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1.5">Nome Ufficiale</label>
                        <div className="relative flex items-center">
                          <User className="absolute left-3 text-neutral-400" size={16} />
                          <input
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={e => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Mario Rossi"
                            className="w-full rounded-xl border border-neutral-200 pl-10 pr-4 py-2.5 text-xs font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1.5">Email</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={e => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="mario.rossi@email.it"
                          className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1.5">Telefono</label>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={e => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+39 335 123456"
                          className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1.5">Messaggio</label>
                        <textarea
                          required
                          rows={4}
                          value={contactForm.message}
                          onChange={e => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                          className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none bg-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isContactSubmitting}
                      className="w-full mt-4 py-3 rounded-xl bg-accent text-primary-dark font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-accent border border-accent/25 cursor-pointer"
                    >
                      {isContactSubmitting ? (
                        <span>Invio in corso...</span>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>Invia Richiesta Lead</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 flex flex-col items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-200 shadow-premium">
                      <CheckCircle size={24} />
                    </div>
                    <h5 className="font-bold text-navy-800 text-base">Richiesta Inviata!</h5>
                    <p className="text-neutral-450 text-xs mt-2 max-w-sm leading-relaxed mx-auto">
                      La tua richiesta per <strong>{contactModalProp}</strong> è stata inoltrata con successo. Un consulente di Immobiliare Mameli 24 ti risponderà al più presto.
                    </p>

                    {showContactWebhook && (
                      <div className="w-full mt-6 bg-[#0E1525] rounded-2xl border border-white/5 overflow-hidden text-left shadow-xl flex flex-col">
                        <div className="bg-[#172033] px-4 py-2 border-b border-white/5 flex items-center justify-between">
                          <span className="font-mono text-[9px] font-bold text-neutral-300 flex items-center gap-1.5">
                            <Terminal size={12} className="text-accent" />
                            API Live Request (POST /inquiries)
                          </span>
                          <span className="text-[9px] font-mono text-emerald-400 font-bold uppercase">
                            201 Created
                          </span>
                        </div>
                        <pre className="p-4 font-mono text-[9px] text-emerald-300 overflow-x-auto max-h-[160px] bg-black/20">
                          {contactPayload}
                        </pre>
                      </div>
                    )}

                    <button
                      onClick={() => setContactModalProp(null)}
                      className="mt-6 py-2 px-6 rounded-xl bg-primary text-white hover:bg-primary-light transition-colors text-xs font-semibold cursor-pointer"
                    >
                      Chiudi Finestra
                    </button>
                  </motion.div>
                )}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
