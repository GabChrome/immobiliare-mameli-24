import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Terminal, 
  CheckCircle, 
  Info,
  ZoomIn,
  ZoomOut,
  Navigation
} from 'lucide-react';

interface ContactFormState {
  nome: string;
  email: string;
  telefono: string;
  richiesta: 'acquisto' | 'vendita' | 'informazioni' | '';
  messaggio: string;
  privacy: boolean;
}

export const ContattiPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    nome: '',
    email: '',
    telefono: '',
    richiesta: '',
    messaggio: '',
    privacy: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showWebhookLog, setShowWebhookLog] = useState(false);
  const [webhookResponse, setWebhookResponse] = useState<string>('');
  const [mapZoom, setMapZoom] = useState(1.2);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, privacy: e.target.checked }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.telefono || !formData.richiesta || !formData.messaggio || !formData.privacy) return;

    setIsSubmitting(true);

    const webhookPayload = {
      event: "general_contact_lead_received",
      timestamp: new Date().toISOString(),
      source: "Immobiliare Mameli 24 Web Portal",
      data: {
        lead: {
          name: formData.nome,
          email: formData.email,
          phone: formData.telefono,
          inquiryType: formData.richiesta
        },
        message: formData.messaggio,
        consents: {
          privacy: formData.privacy,
          marketing: false
        }
      }
    };

    setWebhookResponse(JSON.stringify(webhookPayload, null, 2));

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setShowWebhookLog(true);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-50 pt-20"
    >
      {/* Immersive Banner */}
      <section className="relative py-20 bg-primary text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
            alt="Immobiliare Mameli 24 Office Interior"
            className="w-full h-full object-cover object-center opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary-dark" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="px-3 py-1.5 rounded-full bg-accent/15 border border-accent/20 text-accent font-bold text-xs uppercase tracking-widest inline-block">
            Contatti
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-4 leading-tight">
            Parliamo del Tuo Progetto Immobiliare
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base mt-4 font-light max-w-2xl mx-auto leading-relaxed">
            Sei pronto a vendere la tua casa in 45 giorni o desideri programmare una visita virtuale esclusiva? Scrivici o vieni a trovarci in sede.
          </p>
        </div>
      </section>

      {/* CORE CONTACT LAYOUT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: CONTACT DETAILS (SPAN 5) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Card Group info */}
              <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 shadow-premium flex flex-col gap-6">
                <h3 className="font-bold text-navy-800 text-xl border-b border-neutral-200/60 pb-3">
                  Informazioni di Contatto
                </h3>

                {/* Detail 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-navy-800 text-xs sm:text-sm">Sede Centrale</h5>
                    <p className="text-neutral-450 text-xs font-light mt-1">
                      Via Nino Bixio, 1/D <br />
                      21052 Busto Arsizio (VA)
                    </p>
                  </div>
                </div>

                {/* Detail 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-navy-800 text-xs sm:text-sm">Telefono Ufficio</h5>
                    <a href="tel:0331670833" className="text-neutral-450 hover:text-accent text-xs font-light mt-1 block">
                      0331 670 833
                    </a>
                    <a href="tel:3355884063" className="text-neutral-450 hover:text-accent text-xs font-light block">
                      Cell: 335 5884063
                    </a>
                  </div>
                </div>

                {/* Detail 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h5 className="font-bold text-navy-800 text-xs sm:text-sm">Indirizzi Email</h5>
                    <a href="mailto:info@immobiliaremameli24.it" className="text-neutral-450 hover:text-accent text-xs font-light mt-1 block">
                      info@immobiliaremameli24.it
                    </a>
                    <span className="text-neutral-450 text-xs font-light block">
                      PEC: immobiliaremameli24@pec.it
                    </span>
                  </div>
                </div>
              </div>

              {/* WEEKLY BUSINESS HOURS CARD */}
              <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-100 shadow-premium flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <Clock className="text-accent" size={20} />
                  <h3 className="font-bold text-navy-800 text-lg">Orari di Apertura</h3>
                </div>

                <div className="flex flex-col gap-2.5 text-xs text-navy-800 mt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200/50">
                    <span className="font-medium">Lunedì – Venerdì</span>
                    <span className="font-semibold">09:00 – 12:30 / 14:30 – 19:30</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-200/50">
                    <span className="font-medium">Sabato</span>
                    <span className="font-semibold">09:00 – 12:30</span>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <span className="font-medium">Domenica</span>
                    <span className="text-neutral-450 font-bold uppercase tracking-wider">Chiuso</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: LEAD CONTACT FORM (SPAN 7) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="bg-neutral-50 rounded-3xl p-6 sm:p-10 border border-neutral-100 shadow-premium">
                
                <h3 className="font-bold text-navy-800 text-xl mb-6">Invia una Richiesta Veloce</h3>

                <AnimatePresence mode="wait">
                  {!submitSuccess ? (
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        {/* Name input */}
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Nome Completo</label>
                          <input
                            type="text"
                            name="nome"
                            required
                            value={formData.nome}
                            onChange={handleInputChange}
                            placeholder="Es. Mario Rossi"
                            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white"
                          />
                        </div>

                        {/* Email input */}
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Es. mario.rossi@email.it"
                            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white"
                          />
                        </div>

                        {/* Phone input */}
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Telefono</label>
                          <input
                            type="tel"
                            name="telefono"
                            required
                            value={formData.telefono}
                            onChange={handleInputChange}
                            placeholder="Es. +39 335 123456"
                            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white"
                          />
                        </div>

                        {/* Selection Type */}
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Tipo di Richiesta</label>
                          <select
                            name="richiesta"
                            required
                            value={formData.richiesta}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white cursor-pointer"
                          >
                            <option value="">Seleziona...</option>
                            <option value="acquisto">Desidero Acquistare</option>
                            <option value="vendita">Desidero Vendere</option>
                            <option value="informazioni">Informazioni Generiche</option>
                          </select>
                        </div>

                        {/* Message field */}
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Messaggio</label>
                          <textarea
                            name="messaggio"
                            required
                            rows={5}
                            value={formData.messaggio}
                            onChange={handleInputChange}
                            placeholder="Scrivi qui il tuo messaggio..."
                            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white resize-none"
                          />
                        </div>

                        {/* GDPR consent */}
                        <div className="sm:col-span-2 flex items-start gap-2.5 mt-1">
                          <input
                            type="checkbox"
                            id="privacy-contact"
                            required
                            checked={formData.privacy}
                            onChange={handleCheckboxChange}
                            className="mt-0.5 rounded border-neutral-300 text-accent focus:ring-accent cursor-pointer"
                          />
                          <label htmlFor="privacy-contact" className="text-[10px] text-neutral-450 leading-relaxed cursor-pointer select-none">
                            Acconsento al trattamento dei dati personali ai fini del riscontro alla mia richiesta in conformità con la GDPR Privacy Policy dell'agenzia.
                          </label>
                        </div>

                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 mt-4 rounded-xl bg-accent text-primary-dark font-bold text-xs flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors shadow-accent border border-accent/20 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>Invio in corso...</span>
                        ) : (
                          <>
                            <Send size={14} />
                            <span>Invia Messaggio</span>
                          </>
                        )}
                      </button>

                    </form>
                  ) : (
                    <motion.div
                      key="contact-success-screen"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6 flex flex-col items-center justify-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-250 shadow-premium animate-bounce">
                        <CheckCircle size={26} />
                      </div>
                      <h4 className="font-bold text-navy-800 text-lg">Messaggio Inviato!</h4>
                      <p className="text-neutral-450 text-xs mt-2 max-w-sm leading-relaxed mx-auto">
                        Grazie per averci contattato. La tua richiesta è stata presa in carico ed un broker di Immobiliare Mameli 24 ti risponderà entro le prossime 24 ore lavorative.
                      </p>
                      
                      <button
                        onClick={() => {
                          setFormData({
                            nome: '',
                            email: '',
                            telefono: '',
                            richiesta: '',
                            messaggio: '',
                            privacy: false
                          });
                          setSubmitSuccess(false);
                          setShowWebhookLog(false);
                        }}
                        className="mt-6 py-2 px-5 rounded-xl bg-primary text-white hover:bg-primary-light transition-colors text-xs font-semibold"
                      >
                        Invia un altro messaggio
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* DETAILED OFFICE GEOLOCATION MAP SECTION */}
      <section className="py-20 bg-neutral-50 border-t border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-accent font-bold text-xs uppercase tracking-widest">
              La Nostra Sede
            </span>
            <h3 className="text-3xl font-bold text-navy-800 mt-2">Vieni a Trovarci a Busto Arsizio</h3>
            <p className="text-neutral-450 text-xs sm:text-sm mt-3 font-light">
              Ci trovi in Via Nino Bixio 1/D, a pochi passi dal centro storico e facilmente raggiungibile.
            </p>
          </div>

          {/* Styled Headquarters Map Vector */}
          <div className="relative w-full h-[450px] bg-[#E2E8F0] rounded-3xl overflow-hidden shadow-premium border border-neutral-200">
            
            {/* Streets canvas */}
            <div 
              className="absolute inset-0 custom-map-container transition-transform duration-500 origin-center flex items-center justify-center"
              style={{ transform: `scale(${mapZoom})` }}
            >
              {/* Street grids */}
              <div className="absolute w-[180%] h-8 bg-white/70 rotate-[-8deg] top-[40%]" />
              <div className="absolute w-[180%] h-12 bg-white/70 rotate-[22deg] top-[65%]" />
              <div className="absolute h-[180%] w-10 bg-white/70 left-[35%] top-[-40%]" />
              <div className="absolute h-[180%] w-8 bg-white/70 left-[62%] top-[-40%] rotate-[-15deg]" />

              {/* Street names labels */}
              <div className="absolute top-[34%] left-[15%] text-[9px] font-bold text-navy-400/80 uppercase select-none tracking-widest">Via Nino Bixio</div>
              <div className="absolute top-[48%] left-[68%] text-[9px] font-bold text-navy-400/80 uppercase select-none tracking-widest">Viale della Gloria</div>
              <div className="absolute top-[78%] left-[30%] text-[9px] font-bold text-navy-400/80 uppercase select-none tracking-widest">Corso Italia</div>

              {/* Gaping center Corporate Pin */}
              <div className="absolute left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] z-20">
                <motion.div
                  animate={{
                    y: [0, -6, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                  className="bg-primary text-white border-2 border-accent px-4 py-2.5 rounded-2xl shadow-accent font-extrabold text-xs flex items-center gap-2 whitespace-nowrap glow-accent"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                  <span>Immobiliare Mameli 24</span>
                </motion.div>
                <div className="w-3 h-3 bg-primary border border-accent rotate-45 mx-auto mt-[-6px] shadow-premium" />
              </div>
            </div>

            {/* Map UI overlays */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <button
                onClick={() => setMapZoom(prev => Math.min(prev + 0.15, 1.7))}
                className="p-2 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-xl shadow-premium text-primary"
              >
                <ZoomIn size={16} />
              </button>
              <button
                onClick={() => setMapZoom(prev => Math.max(prev - 0.15, 0.9))}
                className="p-2 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-xl shadow-premium text-primary"
              >
                <ZoomOut size={16} />
              </button>
              <button
                onClick={() => setMapZoom(1.2)}
                className="p-2 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-xl shadow-premium text-primary"
              >
                <Navigation size={16} />
              </button>
            </div>

            {/* Map bottom floating info info box */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-neutral-150 shadow-2xl max-w-sm z-20 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info size={16} />
              </div>
              <div className="text-xs">
                <h5 className="font-bold text-navy-850">La nostra sede centrale</h5>
                <p className="text-neutral-450 font-light mt-0.5">Ci trovi al civico 1/D di Via Nino Bixio, 21052 Busto Arsizio (VA).</p>
                <p className="text-accent font-bold mt-1.5">✓ Parcheggio riservato clienti sul retro</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* DEVELOPER WEBHOOK SANDBOX LIVE PREVIEW LOGGER */}
      <AnimatePresence>
        {showWebhookLog && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="bg-[#0E1525] rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="bg-[#172033] px-6 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Terminal className="text-accent" size={16} />
                  <span className="font-mono text-xs font-bold text-neutral-200">
                    Developer Contact Webhook Sandbox
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold font-mono text-emerald-400 uppercase">
                    Status: 201 Created
                  </span>
                </div>
              </div>

              <div className="p-6 font-mono text-[11px] text-neutral-300 leading-relaxed overflow-x-auto max-h-[300px]">
                <p className="text-neutral-450 mb-2">// Contact lead webhook target: process.env.VITE_CONTACT_WEBHOOK_URL</p>
                <p className="text-accent mb-2">POST /api/webhooks/contacts HTTP/1.1</p>
                <p className="text-neutral-200 mb-4">Content-Type: application/json</p>
                <pre className="text-emerald-300 bg-black/30 p-4 rounded-xl border border-white/5 overflow-auto">
                  {webhookResponse}
                </pre>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
