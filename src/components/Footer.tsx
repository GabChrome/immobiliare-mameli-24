import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Download, 
  Lock, 
  FileText 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FooterProps {
  onPageChange: (page: 'home' | 'about' | 'contact') => void;
  onValuateClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPageChange, onValuateClick }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    setIsSubmitting(true);
    // Simulate webhook/subscription sync
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
    }, 1500);
  };

  const handleDownload = () => {
    // Generate a mock download trigger
    const mockContent = "Immobiliare Mameli 24 - Guida alla Vendita di Casa in 45 Giorni\n\n1. Prepara il tuo immobile (Home Staging)\n2. Scegli il prezzo corretto\n3. Crea un Virtual Tour Professionale\n4. Filtra i potenziali acquirenti\n5. Concludi la trattativa senza stress.";
    const blob = new Blob([mockContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Guida_Vendita_Casa_Mameli24.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer id="footer" className="bg-primary-dark text-white border-t border-white/10 relative overflow-hidden">
      {/* Subtle lighting overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,168,232,0.1),transparent_40%)] pointer-events-none" />

      {/* Main Footer Links & Info Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-5">
            <button 
              onClick={() => { onPageChange('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded bg-accent flex items-center justify-center text-primary-dark font-extrabold text-lg">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-md leading-tight tracking-wider uppercase">
                  Mameli <span className="text-accent">24</span>
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-400 font-medium">
                  Immobiliare
                </span>
              </div>
            </button>
            
            <p className="text-neutral-400 text-[11px] sm:text-xs leading-relaxed font-light">
              Siamo l'agenzia leader per la vendita rapida di immobili residenziali a Busto Arsizio, Gallarate e Milano. Connessione, innovazione e affidabilità da oltre 15 anni.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="p-2.5 rounded-lg bg-white/5 hover:bg-accent hover:text-primary-dark transition-all text-neutral-300 flex items-center justify-center" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-white/5 hover:bg-accent hover:text-primary-dark transition-all text-neutral-300 flex items-center justify-center" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.71.054 1.14.051 1.96.23 2.673.914.714.685.932 1.547.969 2.702.037.962.047 1.28.047 3.664s-.01 2.702-.047 3.664c-.037 1.155-.255 2.017-.969 2.702-.714.685-1.533.863-2.673.914-.926.043-1.28.053-3.71.053-2.43 0-2.784-.01-3.71-.053-1.14-.051-1.96-.233-2.673-.914-.714-.685-.932-1.547-.969-2.702-.037-.962-.047-1.28-.047-3.664s.01-2.702.047-3.664c.037-1.155.255-2.017.969-2.702.714-.685 1.533-.863 2.673-.914.926-.043 1.28-.053 3.71-.053zm0 2.032c-2.394 0-2.72.01-3.663.053-.878.04-1.353.187-1.671.31-.42.164-.72.36-.1.033.682.311.422.164.72.36.1.033.682-.311.962-.682-.284-1.158-.453-2.034-.492-2.693-.038-.946-.048-1.27-.048-3.667s.01-2.72.048-3.666c.04-.658.208-1.535.492-2.693.284-.682.682-1.158 1.157-1.633.475-.475.95-.873 1.633-1.158.658-.284 1.535-.453 2.692-.492.947-.038 1.27-.048 3.667-.048s2.72.01 3.667.048c.657.039 1.534.208 2.692.492.683.284 1.159.682 1.634 1.157.475.476.873.951 1.158 1.634.284.658.453 1.534.492 2.691.038.947.048 1.27.048 3.667s-.01 2.72-.048 3.667c-.039.657-.208 1.534-.492 2.692-.284.683-.682 1.159-1.158 1.634-.475.475-.951.873-1.634 1.158-.658.284-1.534.453-2.691.492-.947.038-1.27.048-3.667.048zm0 2.827c-2.82 0-5.111 2.29-5.111 5.11 0 2.822 2.29 5.111 5.111 5.111 2.82 0 5.111-2.29 5.111-5.111 0-2.82-2.29-5.11-5.111-5.11zm0 8.207c-1.71 0-3.097-1.387-3.097-3.097 0-1.71 1.387-3.097 3.097-3.097 1.71 0 3.097 1.387 3.097 3.097 0 1.71-1.387 3.097-3.097 3.097zm5.27-8.351c0 .616-.5.111-1.111.111-.616 0-1.111-.495-1.111-1.111 0-.616.495-1.111 1.111-1.111.616 0 1.111.495 1.111 1.111z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-white/5 hover:bg-accent hover:text-primary-dark transition-all text-neutral-300 flex items-center justify-center" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation links */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-accent border-b border-white/5 pb-2">
              Menu Principale
            </h4>
            <nav className="flex flex-col gap-3 text-neutral-400 text-xs font-light">
              <button 
                onClick={() => { onPageChange('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-accent transition-colors flex items-center gap-1.5 text-left cursor-pointer"
              >
                <span>Home Page</span>
              </button>
              <button 
                onClick={() => { onPageChange('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-accent transition-colors flex items-center gap-1.5 text-left cursor-pointer"
              >
                <span>Chi Siamo</span>
              </button>
              <button 
                onClick={() => { onPageChange('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-accent transition-colors flex items-center gap-1.5 text-left cursor-pointer"
              >
                <span>Contatti</span>
              </button>
              <button 
                onClick={onValuateClick}
                className="hover:text-accent transition-colors flex items-center gap-1.5 text-left cursor-pointer"
              >
                <span>Valuta la tua Casa</span>
              </button>
            </nav>
          </div>

          {/* Column 3: Contact details */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-accent border-b border-white/5 pb-2">
              Contatti
            </h4>
            <div className="flex flex-col gap-3 text-neutral-400 text-xs font-light">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <span>
                  Via Nino Bixio, 1/D <br />
                  21052 Busto Arsizio (VA)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <a href="tel:0331670833" className="hover:text-accent transition-colors">
                  0331 670 833
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a href="mailto:info@immobiliaremameli24.it" className="hover:text-accent transition-colors">
                  info@immobiliaremameli24.it
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Lead newsletter with Ebook download */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-accent border-b border-white/5 pb-2">
              Guida Gratuita alla Vendita
            </h4>
            <p className="text-neutral-450 text-[11px] leading-relaxed font-light">
              Iscriviti alla newsletter e scarica subito la nostra guida esclusiva per vendere il tuo immobile in 45 giorni senza provvigioni.
            </p>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <form 
                  key="newsletter-email-form" 
                  onSubmit={handleNewsletterSubmit} 
                  className="flex flex-col gap-2 mt-2"
                >
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={e => setNewsletterEmail(e.target.value)}
                      placeholder="La tua email..."
                      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-accent focus:bg-white/10 transition-all pr-10"
                    />
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="absolute right-1 p-1.5 rounded-lg bg-accent text-primary-dark hover:bg-accent-hover transition-colors cursor-pointer"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  key="newsletter-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col gap-3 mt-2"
                >
                  <button
                    onClick={handleDownload}
                    className="w-full py-2.5 rounded-xl bg-accent text-primary-dark font-black text-xs flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors shadow-accent animate-pulse cursor-pointer"
                  >
                    <Download size={14} />
                    Scarica Guida (PDF)
                  </button>
                  <span className="text-[10px] text-emerald-400 font-semibold text-center">
                    ✓ Iscrizione completata con successo!
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom Bar: Copyright and Legal info */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-neutral-400 font-light">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} Immobiliare Mameli 24. Tutti i diritti riservati.</p>
            <p className="mt-1 text-neutral-500">
              Immobiliare Mameli 24 S.r.l. — Via Nino Bixio 1/D, Busto Arsizio — P.IVA 01234560123 — PEC: immobiliaremameli24@pec.it
            </p>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap justify-center mt-2 sm:mt-0">
            <a href="#privacy" className="hover:text-accent flex items-center gap-1">
              <Lock size={12} />
              <span>Privacy Policy</span>
            </a>
            <a href="#cookies" className="hover:text-accent flex items-center gap-1">
              <FileText size={12} />
              <span>Cookie Policy</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
