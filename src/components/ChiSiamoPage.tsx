import React from 'react';
import { motion } from 'framer-motion';
import { StatsAndReviews } from './StatsAndReviews';
import { Shield, Sparkles, Clock, Target, Calendar, Mail, PhoneCall } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  email: string;
  phone: string;
  image: string;
}

const team: TeamMember[] = [
  {
    name: 'Gabriele Mameli',
    role: 'Fondatore & Senior Broker',
    bio: 'Broker professionista con oltre 20 anni di esperienza nel mercato immobiliare lombardo. Specializzato in stime certificate e trattative di prestigio a Busto Arsizio.',
    email: 'g.mameli@immobiliaremameli24.it',
    phone: '+39 0331 670 833',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Valentina Galli',
    role: 'Specialista Area Gallarate',
    bio: 'Esperta in compravendite residenziali e commerciali nell\'area del Sempione. Valentina si distingue per la cura del cliente e la valorizzazione degli immobili tramite home staging.',
    email: 'v.galli@immobiliaremameli24.it',
    phone: '+39 335 5884063',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Marco Brera',
    role: 'Luxury Property Manager Milano',
    bio: 'Specializzato nel mercato di fascia alta e loft di design a Milano centro. Marco coordina il dipartimento dedicato alle residenze esclusive ed ai clienti internazionali.',
    email: 'm.brera@immobiliaremameli24.it',
    phone: '+39 335 1234567',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
  },
];

const milestones = [
  {
    year: '2011',
    title: 'La Fondazione',
    desc: 'Nasce Immobiliare Mameli 24 a Busto Arsizio, con l\'obiettivo di rivoluzionare il servizio di intermediazione immobiliare puntando sulla massima fiducia e trasparenza sul territorio.',
  },
  {
    year: '2016',
    title: 'Espansione ed Area Gallarate',
    desc: 'L\'agenzia cresce raddoppiando il team di consulenti e consolidando la propria leadership anche su Gallarate e Legnano, con oltre 100 compravendite concluse ogni anno.',
  },
  {
    year: '2021',
    title: 'La Svolta Tecnologica',
    desc: 'Introduzione dei Virtual Tour 360° immersivi ed il protocollo "45 Giorni", offrendo ai proprietari di casa un sistema di vendita ad altissima conversione che azzera le visite a vuoto.',
  },
  {
    year: '2026',
    title: 'Consolidamento e Milano',
    desc: 'Con l\'apertura del desk dedicato alle proprietà esclusive a Milano, Immobiliare Mameli 24 diventa il punto di riferimento assoluto per chi cerca efficienza e solidità in Lombardia.',
  },
];

export const ChiSiamoPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-neutral-50 pt-20"
    >
      {/* Immersive Header Banner */}
      <section className="relative py-24 bg-primary text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt="Immobiliare Mameli 24 Office Background"
            className="w-full h-full object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary-dark" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="px-3 py-1.5 rounded-full bg-accent/15 border border-accent/20 text-accent font-bold text-xs uppercase tracking-widest inline-block">
            Chi Siamo
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-4 leading-tight">
            Valori Storici, Visione Innovativa
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base mt-4 font-light max-w-2xl mx-auto leading-relaxed">
            Dal 2011 guidiamo i proprietari di casa a Busto Arsizio, Gallarate e Milano in un percorso di compravendita trasparente, veloce e supportato dalle migliori tecnologie digitali.
          </p>
        </div>
      </section>

      {/* DETAILED AGENCY BIO SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image collage or styled frame */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-premium">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Living Room Real Estate"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Overlay card */}
              <div className="absolute bottom-[-30px] right-[5%] bg-accent text-primary-dark p-6 rounded-2xl shadow-accent max-w-xs border border-accent-hover hidden sm:block">
                <h4 className="font-extrabold text-2xl leading-none">15 Anni</h4>
                <p className="text-xs font-semibold uppercase tracking-wider mt-1.5 leading-tight">
                  Al servizio del territorio lombardo con broker dedicati.
                </p>
              </div>
            </div>

            {/* Expanded written copy */}
            <div className="flex flex-col gap-5 text-navy-800">
              <span className="text-accent font-bold text-xs uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={14} className="text-accent" />
                La Nostra Identità
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                Non siamo una vetrina passiva, ma una macchina da risultati.
              </h2>
              
              <div className="text-sm font-light text-neutral-450 leading-relaxed flex flex-col gap-4 mt-2">
                <p>
                  Fondata da Gabriele Mameli, <strong>Immobiliare Mameli 24</strong> è nata con l'intento di abbattere le distanze tra le aspettative dei proprietari ed i tempi effettivi di mercato. In un settore in continua evoluzione, abbiamo capito fin da subito che proporre semplicemente le case in vetrina non era più sufficiente.
                </p>
                <p>
                  Per questo abbiamo integrato soluzioni tecnologiche di primissimo livello, come i <strong>Virtual Tour a 360°</strong> ad alta definizione e sistemi avanzati di tracciamento dei lead. Il nostro protocollo di vendita esclusivo ci consente di individuare acquirenti referenziati e di concludere le transazioni con una media straordinaria di soli <strong>45 giorni</strong>.
                </p>
                <p>
                  Che si tratti di un bilocale ristrutturato in centro a Busto Arsizio, di una villa unifamiliare con piscina a Gallarate o di un prestigioso loft di design nel cuore di Milano, operiamo con lo stesso livello di eccellenza, dedizione e trasparenza che ci contraddistingue da oltre tre lustri.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-bold text-xs uppercase tracking-widest">Etica & Trasparenza</span>
            <h3 className="text-3xl font-bold text-navy-800 mt-2">I Quattro Pilastri di Mameli 24</h3>
            <p className="text-neutral-450 text-xs sm:text-sm mt-3 font-light">
              Il nostro codice etico e il metodo operativo che garantiscono il successo di ogni compravendita.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-premium flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                <Shield size={22} />
              </div>
              <h4 className="font-bold text-navy-850 text-base">Fiducia & Legalità</h4>
              <p className="text-neutral-450 text-xs font-light leading-relaxed">
                Operiamo solo con stime certificate basate su dati reali e documentazione trasparente al 100%, tutelando acquirenti e venditori.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-premium flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                <Sparkles size={22} />
              </div>
              <h4 className="font-bold text-navy-850 text-base">Tecnologia Virtuale</h4>
              <p className="text-neutral-450 text-xs font-light leading-relaxed">
                Permettiamo visite immersive a distanza per scremare il target, portando fisicamente in casa tua solo clienti qualificati e decisi.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-premium flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                <Clock size={22} />
              </div>
              <h4 className="font-bold text-navy-850 text-base">Rapidità (45 Giorni)</h4>
              <p className="text-neutral-450 text-xs font-light leading-relaxed">
                Il nostro database attivo di oltre 2.000 acquirenti iscritti ci consente di far incontrare domanda e offerta in tempi record.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-premium flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                <Target size={22} />
              </div>
              <h4 className="font-bold text-navy-850 text-base">Presenza Capillare</h4>
              <p className="text-neutral-450 text-xs font-light leading-relaxed">
                Consulenti dedicati e specializzati per singole zone geografiche garantiscono una profonda conoscenza dei micro-mercati locali.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* MILESTONES TIMELINE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-bold text-xs uppercase tracking-widest">
              La Storia
            </span>
            <h3 className="text-3xl font-bold text-navy-800 mt-2">Le Nostre Tappe Principali</h3>
            <p className="text-neutral-450 text-xs sm:text-sm mt-3 font-light">
              Il cammino che ci ha resi l'agenzia più dinamica a Busto Arsizio, Gallarate e Milano.
            </p>
          </div>

          <div className="relative border-l border-neutral-200/80 ml-4 md:ml-auto md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-[1px] md:before:bg-neutral-200 flex flex-col gap-12 max-w-5xl mx-auto">
            {milestones.map((m, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Circle dot on line */}
                  <div className="absolute left-[-21px] top-1.5 md:left-1/2 md:translate-x-[-50%] w-10 h-10 rounded-full bg-white border-2 border-accent flex items-center justify-center z-10 shadow-premium">
                    <Calendar size={14} className="text-accent" />
                  </div>

                  {/* Empty space/spacer on desktop */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content block */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    className="w-full md:w-1/2 pl-8 md:pl-0 md:px-12"
                  >
                    <div className="bg-neutral-50 p-6 sm:p-8 rounded-3xl border border-neutral-100 shadow-premium">
                      <span className="inline-block px-3 py-1 rounded bg-accent-soft text-accent font-extrabold text-sm font-mono">
                        {m.year}
                      </span>
                      <h4 className="font-bold text-navy-800 text-lg mt-3">{m.title}</h4>
                      <p className="text-neutral-450 text-xs sm:text-sm font-light leading-relaxed mt-2">
                        {m.desc}
                      </p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* TEAM PROFILE SECTION */}
      <section className="py-20 bg-neutral-50 border-t border-neutral-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent font-bold text-xs uppercase tracking-widest">I Nostri Professionisti</span>
            <h3 className="text-3xl font-bold text-navy-800 mt-2">Incontra il Team</h3>
            <p className="text-neutral-450 text-xs sm:text-sm mt-3 font-light">
              Agenti regolarmente abilitati ed iscritti al ruolo pronti ad affiancarti in ogni passo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl border border-neutral-100 shadow-premium overflow-hidden flex flex-col justify-between group transition-all"
              >
                <div>
                  {/* Photo frame */}
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-200 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Description */}
                  <div className="p-6">
                    <h4 className="font-bold text-navy-800 text-lg">{member.name}</h4>
                    <span className="text-accent text-[11px] font-bold uppercase tracking-wider mt-0.5 inline-block">
                      {member.role}
                    </span>
                    <p className="text-neutral-450 text-xs font-light leading-relaxed mt-4">
                      {member.bio}
                    </p>
                  </div>
                </div>

                {/* Direct Contacts actions */}
                <div className="px-6 pb-6 pt-3 flex items-center gap-3 border-t border-neutral-100 mt-2">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex-1 py-2 rounded-xl bg-neutral-50 hover:bg-accent-soft text-navy-800 hover:text-accent font-bold text-[10px] sm:text-xs transition-colors border border-neutral-100 flex items-center justify-center gap-1.5"
                  >
                    <Mail size={12} />
                    Scrivi
                  </a>
                  <a
                    href={`tel:${member.phone.replace(/\s+/g, '')}`}
                    className="flex-1 py-2 rounded-xl bg-primary text-white hover:bg-primary-light font-bold text-[10px] sm:text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <PhoneCall size={12} className="text-accent" />
                    Chiama
                  </a>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* EMBEDDED TRUST STATS & REVIEWS SLIDER */}
      <div className="border-t border-neutral-200/50">
        <StatsAndReviews />
      </div>

    </motion.div>
  );
};
