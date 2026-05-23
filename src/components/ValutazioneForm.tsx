import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Maximize2, 
  Settings, 
  User, 
  Mail, 
  Phone, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle,
  Terminal,
  Loader2
} from 'lucide-react';

interface FormData {
  indirizzo: string;
  comune: string;
  metratura: number;
  condizioni: 'da_ristrutturare' | 'buono' | 'nuovo' | '';
  nome: string;
  email: string;
  telefono: string;
  privacyConsent: boolean;
}

export const ValutazioneForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    indirizzo: '',
    comune: 'Busto Arsizio',
    metratura: 85,
    condizioni: '',
    nome: '',
    email: '',
    telefono: '',
    privacyConsent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showWebhookLog, setShowWebhookLog] = useState(false);
  const [webhookResponse, setWebhookResponse] = useState<string>('');

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSelectCondition = (cond: 'da_ristrutturare' | 'buono' | 'nuovo') => {
    setFormData(prev => ({ ...prev, condizioni: cond }));
    setTimeout(() => nextStep(), 300); // Auto advance slightly delayed for visual feedback
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.indirizzo.trim().length > 3 && formData.comune.trim().length > 2;
      case 2:
        return formData.metratura >= 20 && formData.metratura <= 500;
      case 3:
        return formData.condizioni !== '';
      case 4:
        return (
          formData.nome.trim().length > 2 &&
          formData.email.includes('@') &&
          formData.telefono.trim().length > 5 &&
          formData.privacyConsent
        );
      default:
        return false;
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    
    // Simulate webhook dispatch (Make / Zapier webhook endpoint target)
    const webhookPayload = {
      event: "real_estate_valuation_request",
      timestamp: new Date().toISOString(),
      source: "Immobiliare Mameli 24 Web Portal",
      data: {
        location: {
          address: formData.indirizzo,
          city: formData.comune
        },
        specs: {
          squareMeters: formData.metratura,
          condition: formData.condizioni,
          estimatedRange: calculateMockValuation(formData.metratura, formData.condizioni, formData.comune)
        },
        lead: {
          name: formData.nome,
          email: formData.email,
          phone: formData.telefono,
          consents: {
            privacy: formData.privacyConsent,
            marketing: true
          }
        }
      }
    };

    setWebhookResponse(JSON.stringify(webhookPayload, null, 2));

    // Simulate network delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setShowWebhookLog(true);
    }, 2000);
  };

  const calculateMockValuation = (mq: number, cond: string, city: string) => {
    let basePricePerSqm = 1600; // Busto Arsizio average
    if (city.toLowerCase().includes('milano')) basePricePerSqm = 4200;
    else if (city.toLowerCase().includes('gallarate')) basePricePerSqm = 1800;

    let multiplier = 1.0;
    if (cond === 'da_ristrutturare') multiplier = 0.75;
    else if (cond === 'nuovo') multiplier = 1.25;

    const baseVal = mq * basePricePerSqm * multiplier;
    const minVal = Math.round(baseVal * 0.9 / 5000) * 5000;
    const maxVal = Math.round(baseVal * 1.1 / 5000) * 5000;

    return {
      currency: "EUR",
      min: minVal,
      max: maxVal,
      formattedMin: `€ ${minVal.toLocaleString('it-IT')}`,
      formattedMax: `€ ${maxVal.toLocaleString('it-IT')}`
    };
  };

  const stepsInfo = [
    { title: 'Indirizzo', description: 'Dove si trova?' },
    { title: 'Metratura', description: 'Dimensioni casa' },
    { title: 'Condizioni', description: 'Stato attuale' },
    { title: 'Contatto', description: 'Valutazione finale' },
  ];

  return (
    <section id="valuta-casa" className="py-20 bg-primary-dark relative overflow-hidden">
      {/* Dynamic light rays / grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(19,64,116,0.25),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro copy */}
        <div className="text-center max-w-3xl mx-auto mb-16 text-white">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="px-3 py-1.5 rounded-full bg-accent/15 border border-accent/20 text-accent font-bold text-xs uppercase tracking-widest inline-block"
          >
            Valutazione Gratuita & Istantanea
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold mt-4"
          >
            Vuoi vendere casa? Scopri quanto vale in 2 minuti.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-neutral-300 text-sm sm:text-base mt-4 font-light leading-relaxed"
          >
            Il nostro algoritmo intelligente incrocia le quotazioni OMI con l'andamento reale del mercato a Busto Arsizio, Gallarate e Milano per darti un report istantaneo.
          </motion.p>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 border border-white/20 relative">
            
            {/* Step Progress Indicators */}
            {!submitSuccess && (
              <div className="mb-10">
                <div className="flex items-center justify-between">
                  {stepsInfo.map((info, idx) => {
                    const currentIdx = idx + 1;
                    return (
                      <div key={idx} className="flex flex-col items-center flex-1 relative">
                        {/* Connecting Line */}
                        {idx > 0 && (
                          <div 
                            className={`absolute top-5 left-[-50%] right-[50%] h-[2px] z-0 transition-colors duration-300 ${
                              step >= currentIdx ? 'bg-accent' : 'bg-neutral-200'
                            }`}
                          />
                        )}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-all duration-300 ${
                            step === currentIdx
                              ? 'bg-primary text-white border-2 border-accent scale-110 shadow-premium'
                              : step > currentIdx
                              ? 'bg-accent text-primary-dark shadow-accent'
                              : 'bg-neutral-100 text-neutral-450 border border-neutral-200'
                          }`}
                        >
                          {currentIdx}
                        </div>
                        <span className="hidden sm:block text-[11px] font-bold text-navy-800 mt-2 text-center uppercase tracking-wider">
                          {info.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Form Step Contents with transition animation */}
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <form key="valuation-wizard-form" onSubmit={handleFormSubmit}>
                  
                  {/* STEP 1: Address & Municipality */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-5 min-h-[220px]"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="text-accent" size={24} />
                        <div>
                          <h3 className="font-bold text-navy-800 text-lg">Localizzazione Immobile</h3>
                          <p className="text-xs text-neutral-450">Fornisci la via ed il comune del tuo immobile</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-1">
                          <label className="block text-xs font-bold text-neutral-450 uppercase mb-1.5">Comune</label>
                          <select
                            value={formData.comune}
                            onChange={e => setFormData(prev => ({ ...prev, comune: e.target.value }))}
                            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none bg-white cursor-pointer"
                          >
                            <option value="Busto Arsizio">Busto Arsizio</option>
                            <option value="Gallarate">Gallarate</option>
                            <option value="Milano">Milano</option>
                            <option value="Legnano">Legnano</option>
                          </select>
                        </div>
                        
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-bold text-neutral-450 uppercase mb-1.5">Indirizzo e Numero Civico</label>
                          <input
                            type="text"
                            value={formData.indirizzo}
                            onChange={e => setFormData(prev => ({ ...prev, indirizzo: e.target.value }))}
                            placeholder="Es. Via Nino Bixio 1/D"
                            className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Surface Area in Sqm */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-5 min-h-[220px]"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Maximize2 className="text-accent" size={24} />
                        <div>
                          <h3 className="font-bold text-navy-800 text-lg">Superficie dell'Immobile</h3>
                          <p className="text-xs text-neutral-450">Indica la metratura calpestabile o commerciale approssimativa</p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-6 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-neutral-450 uppercase">Superficie</span>
                          <span className="text-2xl font-bold text-primary flex items-baseline gap-1">
                            {formData.metratura} <span className="text-sm text-neutral-450 font-normal">Mq</span>
                          </span>
                        </div>

                        <input
                          type="range"
                          min="20"
                          max="300"
                          value={formData.metratura}
                          onChange={e => setFormData(prev => ({ ...prev, metratura: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-accent"
                        />

                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, metratura: 65 }))}
                            className="py-2 text-xs font-semibold rounded-lg bg-neutral-100 text-navy-800 hover:bg-neutral-200 border border-neutral-200"
                          >
                            Bilocale (~65 Mq)
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, metratura: 90 }))}
                            className="py-2 text-xs font-semibold rounded-lg bg-neutral-100 text-navy-800 hover:bg-neutral-200 border border-neutral-200"
                          >
                            Trilocale (~90 Mq)
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, metratura: 140 }))}
                            className="py-2 text-xs font-semibold rounded-lg bg-neutral-100 text-navy-800 hover:bg-neutral-200 border border-neutral-200"
                          >
                            Villa (~140 Mq)
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Property Condition State */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-5 min-h-[220px]"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Settings className="text-accent" size={24} />
                        <div>
                          <h3 className="font-bold text-navy-800 text-lg">Stato di Conservazione</h3>
                          <p className="text-xs text-neutral-450">Seleziona le condizioni correnti del fabbricato</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                        {/* Da Ristrutturare Card */}
                        <div
                          onClick={() => handleSelectCondition('da_ristrutturare')}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            formData.condizioni === 'da_ristrutturare'
                              ? 'border-accent bg-accent/5 scale-102 shadow-premium'
                              : 'border-neutral-200 hover:border-navy-300 bg-white'
                          }`}
                        >
                          <span className="block text-2xl mb-1">🛠️</span>
                          <h4 className="font-bold text-sm text-navy-800">Da Ristrutturare</h4>
                          <p className="text-[11px] text-neutral-450 mt-1 leading-snug">Richiede importanti interventi ed ammodernamenti strutturali</p>
                        </div>

                        {/* Buono Stato Card */}
                        <div
                          onClick={() => handleSelectCondition('buono')}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            formData.condizioni === 'buono'
                              ? 'border-accent bg-accent/5 scale-102 shadow-premium'
                              : 'border-neutral-200 hover:border-navy-300 bg-white'
                          }`}
                        >
                          <span className="block text-2xl mb-1">🏡</span>
                          <h4 className="font-bold text-sm text-navy-800">Buono Stato</h4>
                          <p className="text-[11px] text-neutral-450 mt-1 leading-snug">Abitabile da subito, impianti funzionanti ma non modernissimi</p>
                        </div>

                        {/* Nuovo Ristrutturato Card */}
                        <div
                          onClick={() => handleSelectCondition('nuovo')}
                          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            formData.condizioni === 'nuovo'
                              ? 'border-accent bg-accent/5 scale-102 shadow-premium'
                              : 'border-neutral-200 hover:border-navy-300 bg-white'
                          }`}
                        >
                          <span className="block text-2xl mb-1">✨</span>
                          <h4 className="font-bold text-sm text-navy-800">Nuovo / Ristrutturato</h4>
                          <p className="text-[11px] text-neutral-450 mt-1 leading-snug">Finiture di pregio, impianti certificati, ottima efficienza energetica</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Contact Details & Submit */}
                  {step === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4 min-h-[220px]"
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <User className="text-accent" size={24} />
                        <div>
                          <h3 className="font-bold text-navy-800 text-lg">Dati di Contatto</h3>
                          <p className="text-xs text-neutral-450">Chi riceverà la stima di mercato professionale?</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Nome Completo</label>
                          <div className="relative flex items-center">
                            <User className="absolute left-3 text-neutral-400" size={16} />
                            <input
                              type="text"
                              value={formData.nome}
                              onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                              placeholder="Es. Mario Rossi"
                              className="w-full rounded-xl border border-neutral-200 pl-10 pr-4 py-2.5 text-xs font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Indirizzo Email</label>
                          <div className="relative flex items-center">
                            <Mail className="absolute left-3 text-neutral-400" size={16} />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="Es. mario.rossi@email.it"
                              className="w-full rounded-xl border border-neutral-200 pl-10 pr-4 py-2.5 text-xs font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-neutral-450 uppercase mb-1">Numero di Telefono</label>
                          <div className="relative flex items-center">
                            <Phone className="absolute left-3 text-neutral-400" size={16} />
                            <input
                              type="tel"
                              value={formData.telefono}
                              onChange={e => setFormData(prev => ({ ...prev, telefono: e.target.value }))}
                              placeholder="Es. +39 335 123456"
                              className="w-full rounded-xl border border-neutral-200 pl-10 pr-4 py-2.5 text-xs font-semibold text-navy-800 focus:border-accent focus:ring-1 focus:ring-accent outline-none"
                              required
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2 flex items-start gap-2.5 mt-2">
                          <input
                            type="checkbox"
                            id="privacyConsent"
                            checked={formData.privacyConsent}
                            onChange={e => setFormData(prev => ({ ...prev, privacyConsent: e.target.checked }))}
                            className="mt-0.5 rounded border-neutral-300 text-accent focus:ring-accent cursor-pointer"
                            required
                          />
                          <label htmlFor="privacyConsent" className="text-[10px] text-neutral-450 leading-relaxed cursor-pointer select-none">
                            Acconsento al trattamento dei dati per la stima dell'immobile e per contatti commerciali successivi in ottemperanza alla normativa GDPR. <a href="#privacy" className="text-accent underline font-semibold">Privacy Policy</a>.
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Action Buttons */}
                  <div className="flex items-center justify-between border-t border-neutral-100 pt-6 mt-8">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="py-3 px-6 rounded-xl hover:bg-neutral-50 text-navy-800 text-xs font-semibold flex items-center gap-2 transition-colors border border-neutral-200"
                      >
                        <ArrowLeft size={16} />
                        Indietro
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 4 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!validateStep()}
                        className={`py-3 px-6 rounded-xl text-white text-xs font-semibold flex items-center gap-2 transition-all ${
                          validateStep()
                            ? 'bg-primary hover:bg-primary-light shadow-premium cursor-pointer'
                            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                        }`}
                      >
                        Avanti
                        <ArrowRight size={16} />
                      </button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={!validateStep() || isSubmitting}
                        whileHover={validateStep() ? { scale: 1.02 } : {}}
                        whileTap={validateStep() ? { scale: 0.98 } : {}}
                        className={`py-3 px-8 rounded-xl text-primary-dark font-bold text-xs flex items-center gap-2 transition-all ${
                          validateStep() && !isSubmitting
                            ? 'bg-accent hover:bg-accent-hover shadow-accent cursor-pointer'
                            : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={16} />
                            Calcolo Stima...
                          </>
                        ) : (
                          <>
                            <CheckCircle size={16} />
                            Ottieni Stima Gratuita
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>

                </form>
              ) : (
                
                /* SUBMIT SUCCESS SCREEN */
                <motion.div
                  key="valuation-success-screen"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-8 min-h-[300px] flex flex-col justify-center items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/20 text-accent flex items-center justify-center mb-6 border border-accent/30 shadow-accent animate-bounce">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-800">Grazie {formData.nome}!</h3>
                  <p className="text-neutral-450 text-sm mt-3 max-w-md leading-relaxed">
                    Abbiamo ricevuto la tua richiesta per l'immobile in <strong>{formData.indirizzo}, {formData.comune}</strong>.
                  </p>

                  <div className="my-8 p-6 bg-accent/5 rounded-2xl border border-accent/20 max-w-md">
                    <span className="text-[10px] text-neutral-450 uppercase tracking-widest font-bold">Valore Estimativo Stimato</span>
                    <h4 className="text-3xl font-extrabold text-primary mt-1">
                      {calculateMockValuation(formData.metratura, formData.condizioni, formData.comune).formattedMin} - {calculateMockValuation(formData.metratura, formData.condizioni, formData.comune).formattedMax}
                    </h4>
                    <p className="text-[10px] text-neutral-450 mt-2 font-medium">
                      *La stima è puramente indicativa. Un nostro agente ti contatterà al numero <strong>{formData.telefono}</strong> per un sopralluogo gratuito.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setStep(1);
                      setFormData({
                        indirizzo: '',
                        comune: 'Busto Arsizio',
                        metratura: 85,
                        condizioni: '',
                        nome: '',
                        email: '',
                        telefono: '',
                        privacyConsent: false
                      });
                      setSubmitSuccess(false);
                      setShowWebhookLog(false);
                    }}
                    className="py-2.5 px-6 rounded-xl bg-primary text-white hover:bg-primary-light transition-colors text-xs font-semibold"
                  >
                    Valuta un altro immobile
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* WEBHOOK SANDBOX LIVE LOGGER PANEL (Awesome feature for proof-of-work) */}
        <AnimatePresence>
          {showWebhookLog && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-3xl mx-auto mt-6 bg-[#0E1525] rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="bg-[#172033] px-6 py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Terminal className="text-accent" size={16} />
                  <span className="font-mono text-xs font-bold text-neutral-200">
                    Developer Webhook Live Preview Sandbox
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold font-mono text-emerald-400 uppercase">
                    Status: 200 OK
                  </span>
                </div>
              </div>

              <div className="p-6 font-mono text-[11px] text-neutral-300 leading-relaxed overflow-x-auto max-h-[300px]">
                <p className="text-neutral-450 mb-2">// Webhook URL target: process.env.VITE_LEAD_WEBHOOK_URL</p>
                <p className="text-accent mb-2">POST /api/webhooks/leads HTTP/1.1</p>
                <p className="text-neutral-200 mb-4">Content-Type: application/json</p>
                <pre className="text-emerald-300 bg-black/30 p-4 rounded-xl border border-white/5 overflow-auto">
                  {webhookResponse}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
