import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  Euro, 
  Percent, 
  Calendar, 
  Send, 
  CheckCircle, 
  Terminal,
  Info
} from 'lucide-react';

interface CalculationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  loanAmount: number;
}

export const CalcolatoreMutuo: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState(250000);
  const [downPayment, setDownPayment] = useState(50000);
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(3.5);

  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showWebhookLog, setShowWebhookLog] = useState(false);
  const [webhookResponse, setWebhookResponse] = useState<string>('');

  // Dynamically calculate downpayment maximum cap to prevent negative loan values
  const maxDownPayment = useMemo(() => {
    return Math.min(downPayment, propertyPrice - 10000);
  }, [downPayment, propertyPrice]);

  // Adjust downpayment if price decreases below current downpayment
  React.useEffect(() => {
    if (downPayment >= propertyPrice) {
      setDownPayment(Math.max(0, propertyPrice - 20000));
    }
  }, [propertyPrice, downPayment]);

  const results: CalculationResult = useMemo(() => {
    const loanAmount = propertyPrice - maxDownPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      const payment = loanAmount / numberOfPayments;
      return {
        monthlyPayment: payment,
        totalInterest: 0,
        totalRepayment: loanAmount,
        loanAmount
      };
    }

    const monthlyPayment = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalRepayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalRepayment - loanAmount;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalRepayment: Math.round(totalRepayment),
      loanAmount
    };
  }, [propertyPrice, maxDownPayment, loanTerm, interestRate]);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone || !leadEmail) return;

    setIsSubmitting(true);

    const webhookPayload = {
      event: "mortgage_consultation_requested",
      timestamp: new Date().toISOString(),
      source: "Immobiliare Mameli 24 Web Portal",
      data: {
        calculationInputs: {
          propertyValue: propertyPrice,
          cashDeposit: maxDownPayment,
          financeTermYears: loanTerm,
          annualInterestRate: interestRate
        },
        calculatedEstimates: {
          monthlyInstalment: results.monthlyPayment,
          loanPrincipal: results.loanAmount,
          accumulatedInterest: results.totalInterest,
          grossRepayment: results.totalRepayment
        },
        applicant: {
          name: leadName,
          phone: leadPhone,
          email: leadEmail,
          newsletterOptIn: true
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
    <section id="calcola-mutuo" className="py-20 bg-navy-50/50 border-t border-neutral-200/50 relative overflow-hidden">
      
      {/* Decorative vectors */}
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3 py-1.5 rounded-full bg-accent/15 border border-accent/20 text-accent font-bold text-xs uppercase tracking-widest inline-block">
            Strumenti Finanziari
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-800 mt-4">
            Calcola la Rata del tuo Mutuo
          </h2>
          <p className="text-neutral-450 text-xs sm:text-sm mt-3 font-light leading-relaxed max-w-2xl mx-auto">
            Simula in tempo reale l'importo della rata mensile in base al prezzo dell'immobile, l'anticipo e la durata, bloccando una consulenza gratuita con i nostri broker accreditati.
          </p>
        </div>

        {/* Calculator Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
          
          {/* SLIDERS INPUT CONSOLE (SPAN 7) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-neutral-100 shadow-premium flex flex-col gap-6 justify-between">
            
            {/* Input 1: Property Value */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-navy-800 uppercase flex items-center gap-1.5">
                  <Euro size={14} className="text-accent" />
                  Valore Immobile
                </label>
                <span className="font-extrabold text-lg text-primary">
                  € {propertyPrice.toLocaleString('it-IT')}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="1000000"
                step="10000"
                value={propertyPrice}
                onChange={e => setPropertyPrice(parseInt(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>€ 50k</span>
                <span>€ 500k</span>
                <span>€ 1M</span>
              </div>
            </div>

            {/* Input 2: Down Payment */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-navy-800 uppercase flex items-center gap-1.5">
                  <Calculator size={14} className="text-accent" />
                  Anticipo in Contanti
                </label>
                <span className="font-extrabold text-lg text-primary flex items-baseline gap-1">
                  € {maxDownPayment.toLocaleString('it-IT')}
                  <span className="text-[10px] text-neutral-450 font-normal">
                    ({Math.round((maxDownPayment / propertyPrice) * 100)}%)
                  </span>
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={propertyPrice - 20000}
                step="5000"
                value={downPayment}
                onChange={e => setDownPayment(parseInt(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>€ 0</span>
                <span>Anticipo max: 90% del valore</span>
              </div>
            </div>

            {/* Row grid for term & interest */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              {/* Input 3: Term Years */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-navy-800 uppercase flex items-center gap-1.5">
                    <Calendar size={14} className="text-accent" />
                    Durata Mutuo
                  </label>
                  <span className="font-extrabold text-base text-primary">
                    {loanTerm} Anni
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="30"
                  step="5"
                  value={loanTerm}
                  onChange={e => setLoanTerm(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[9px] text-neutral-400 font-semibold uppercase">
                  <span>10 anni</span>
                  <span>20 anni</span>
                  <span>30 anni</span>
                </div>
              </div>

              {/* Input 4: Interest Rate */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-navy-800 uppercase flex items-center gap-1.5">
                    <Percent size={14} className="text-accent" />
                    Tasso d'Interesse
                  </label>
                  <span className="font-extrabold text-base text-primary">
                    {interestRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="7"
                  step="0.1"
                  value={interestRate}
                  onChange={e => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <div className="flex justify-between text-[9px] text-neutral-400 font-semibold uppercase">
                  <span>Min: 0.5%</span>
                  <span>Medio: 3.5%</span>
                  <span>Max: 7.0%</span>
                </div>
              </div>

            </div>

            {/* Quick calculations summaries alert */}
            <div className="bg-accent-soft p-4 rounded-2xl border border-accent/20 flex items-start gap-2.5 mt-2">
              <Info size={16} className="text-accent flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-neutral-450 leading-relaxed font-light">
                Stai richiedendo un finanziamento per un capitale netto di <strong>€ {results.loanAmount.toLocaleString('it-IT')}</strong>. Il costo totale degli interessi ammonterà a circa <strong>€ {results.totalInterest.toLocaleString('it-IT')}</strong> spalmati in {loanTerm * 12} mesi.
              </p>
            </div>

          </div>

          {/* CALCULATED RESULTS & LEAD CONVERSION (SPAN 5) */}
          <div className="lg:col-span-5 bg-primary text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between border border-white/5 relative overflow-hidden">
            {/* Subtle glow watermark */}
            <div className="absolute top-[-10%] right-[-10%] w-24 h-24 bg-accent/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="text-[10px] text-accent font-extrabold uppercase tracking-widest block">Rata Mensile Stimata</span>
              
              {/* Payment rate */}
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                  € {results.monthlyPayment.toLocaleString('it-IT')}
                </span>
                <span className="text-xs text-neutral-300 font-light">/ mese</span>
              </div>

              {/* Finance list features */}
              <div className="flex flex-col gap-3 mt-8 border-t border-white/10 pt-6 text-xs font-light text-neutral-200">
                <div className="flex items-center justify-between">
                  <span>Capitale Finanziato:</span>
                  <span className="font-bold text-white">€ {results.loanAmount.toLocaleString('it-IT')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Interessi Totali:</span>
                  <span className="font-bold text-white">€ {results.totalInterest.toLocaleString('it-IT')}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Restituzione Lorda:</span>
                  <span className="font-bold text-white">€ {results.totalRepayment.toLocaleString('it-IT')}</span>
                </div>
              </div>
            </div>

            {/* PRE-QUALIFICATION INQUIRY FORM */}
            <div className="mt-8">
              <h4 className="font-bold text-sm text-accent mb-4">Ricevi un Pre-Accordo di Mutuo</h4>
              
              <AnimatePresence mode="wait">
                {!submitSuccess ? (
                  <form onSubmit={handleLeadSubmit} className="flex flex-col gap-3">
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={e => setLeadName(e.target.value)}
                      placeholder="Nome completo..."
                      className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-neutral-300 focus:outline-none focus:border-accent focus:bg-white/15 transition-all"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="tel"
                        required
                        value={leadPhone}
                        onChange={e => setLeadPhone(e.target.value)}
                        placeholder="Telefono..."
                        className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-neutral-300 focus:outline-none focus:border-accent focus:bg-white/15 transition-all"
                      />
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={e => setLeadEmail(e.target.value)}
                        placeholder="Email..."
                        className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-neutral-300 focus:outline-none focus:border-accent focus:bg-white/15 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 mt-2 rounded-xl bg-accent text-primary-dark font-black text-xs hover:bg-accent-hover transition-colors shadow-accent flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Elaborazione...</span>
                      ) : (
                        <>
                          <Send size={12} />
                          <span>Pre-Qualificati Ora</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4 flex flex-col items-center justify-center bg-white/5 rounded-2xl border border-white/10"
                  >
                    <CheckCircle size={24} className="text-accent mb-2 animate-pulse" />
                    <h5 className="font-bold text-xs text-white">Consulenza Prenotata!</h5>
                    <p className="text-[10px] text-neutral-300 mt-1 max-w-[200px] leading-relaxed">
                      Riceverai un report finanziario personalizzato per e-mail ed un nostro broker ti affiancherà nella delibera.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

        {/* DEVELOPER WEBHOOK SANDBOX LIVE LOGGER PANEL */}
        <AnimatePresence>
          {showWebhookLog && (
            <div className="max-w-6xl mx-auto mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-[#0E1525] rounded-3xl border border-white/10 overflow-hidden shadow-2xl text-left"
              >
                <div className="bg-[#172033] px-6 py-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Terminal className="text-accent" size={16} />
                    <span className="font-mono text-xs font-bold text-neutral-200">
                      Developer Mortgage Webhook Sandbox
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
                  <p className="text-neutral-450 mb-2">// Mortgage lead webhook target: process.env.VITE_MORTGAGE_WEBHOOK_URL</p>
                  <p className="text-accent mb-2">POST /api/webhooks/mortgages HTTP/1.1</p>
                  <p className="text-neutral-200 mb-4">Content-Type: application/json</p>
                  <pre className="text-emerald-300 bg-black/30 p-4 rounded-xl border border-white/5 overflow-auto">
                    {webhookResponse}
                  </pre>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
