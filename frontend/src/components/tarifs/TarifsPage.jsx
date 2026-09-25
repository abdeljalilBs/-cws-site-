import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import { LuCheck, LuChevronDown, LuArrowRight, LuInfo } from 'react-icons/lu';

const DISPLAY = "'Anton', sans-serif";
// Pour le rendu exact de l'accent italique du titre, ajoute la police "Instrument Serif"
// (Google Fonts). Sinon, le fallback serif système prend le relais automatiquement.
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";

/* ─── Les 3 offres ──────────────────────────────────────────── */
const plans = [
  {
    name: 'Formules Courte Durée',
    badge: 'Liberté absolue',
    description: "Pour s'entraîner sur une période définie, sans renouvellement automatique ni prélèvement.",
    durations: ['1 mois', '2 mois'],
    priceLabel: 'Modalités d\'engagement',
    priceCustom: 'Paiement Comptant',
    features: [
      'Accès libre au plateau musculation',
      'Accès libre au parc cardio',
      'Accès aux cours collectifs en illimité',
      'Vestiaires avec douches individuelles',
      'Pas de tacite reconduction',
      'Idéal pour s\'entraîner ponctuellement',
    ],
    ctaHref: '/contact',
    featured: false,
  },
  {
    name: 'Abonnements Longue Durée',
    badge: 'Le plus populaire',
    description: "Ancrez le sport dans votre quotidien avec des tarifs dégressifs selon votre engagement.",
    durations: ['6 mois', '1 an'],
    priceLabel: 'Modalités d\'engagement',
    priceCustom: 'Prélèvement Mensuel ou Comptant',
    features: [
      'Accès libre au plateau musculation',
      'Accès libre au parc cardio',
      'Accès aux cours collectifs en illimité',
      'Formules Solo, Duo et Étudiant',
      'Engagement de 6 ou 12 mois minimum',
      'Accompagnement par des coachs certifiés',
      'Vestiaires avec douches individuelles',
    ],
    ctaHref: '/contact',
    featured: true,
  },
  {
    name: 'Carte de Séances',
    badge: 'À votre rythme',
    description: "La solution flexible pour s'entraîner ponctuellement sans aucun engagement de durée.",
    durations: ['10 séances (valable 4 mois)'],
    priceLabel: 'Modalités d\'engagement',
    priceCustom: 'Paiement unique à l\'achat',
    features: [
      'Accès libre au plateau musculation',
      'Accès libre au parc cardio',
      'Accès aux cours collectifs sur réservation',
      'Vestiaires avec douches individuelles',
      'Utilisation à la carte selon votre planning',
    ],
    ctaHref: '/contact',
    featured: false,
  },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "Comment faire pour s'inscrire ?",
    a: "L'inscription se fait directement au club ou via notre formulaire de contact. Nous vous accueillons pour une visite, nous échangeons sur vos objectifs, puis nous mettons en place votre abonnement adapté. Aucune démarche compliquée — on s'occupe de tout.",
  },
  {
    q: 'Comment réserver les cours collectifs ?',
    a: "Une fois adhérent, réservez vos cours collectifs en quelques secondes grâce à notre application dédiée. Consultez le planning, choisissez votre cours et réservez votre place en un simple clic. Avec plus de 30 cours variés chaque semaine, trouvez facilement le créneau qui vous convient.",
  },
  {
    q: "Quel est le tarif d'un abonnement ?",
    a: "Notre tarif d'appel débute à 39,90 € / mois (offre étudiant sous conditions d'engagement). Les tarifs de nos formules varient ensuite selon la durée choisie (1 mois, 2 mois, 6 mois ou 1 an) et les modalités de paiement (comptant ou prélèvement mensuel). Afin de vous proposer la formule la plus adaptée et vous détailler nos offres, nos prix et frais associés vous sont présentés directement par nos conseillers au club ou par e-mail sur simple demande.",
  },
  {
    q: 'Quelle est la démarche pour un coaching personnalisé ?',
    a: "Prenez rendez-vous avec l'un de nos coachs diplômés. Lors d'un premier échange, nous définissons ensemble vos objectifs, votre niveau et vos disponibilités. Votre coach construit ensuite un programme sur-mesure et vous accompagne séance après séance.",
  },
];

/* ─── Petit hook media-query ─────────────────────────────────── */
function useMedia(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mm = window.matchMedia(query);
    const onChange = () => setMatch(mm.matches);
    onChange();
    mm.addEventListener('change', onChange);
    return () => mm.removeEventListener('change', onChange);
  }, [query]);
  return match;
}

/* ─── Carte d'offre ──────────────────────────────────────────── */
const PlanCard = ({ plan, index, isInView }) => {
  const tiltRef = useRef(null);
  const reduce = useReducedMotion();
  const fine = useMedia('(hover: hover) and (pointer: fine)');
  const isLg = useMedia('(min-width: 1024px)');

  const baseTransform =
    plan.featured && isLg ? 'perspective(900px) scale(1.045)' : 'perspective(900px)';

  const handleMove = (e) => {
    if (!fine || reduce) return;
    const el = tiltRef.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    const rx = (y / r.height - 0.5) * -5;
    const ry = (x / r.width - 0.5) * 5;
    el.style.transform = `${baseTransform} rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const handleLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = baseTransform;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative w-full max-w-md mx-auto lg:max-w-none ${
        plan.featured ? 'z-10 lg:-my-2 drop-shadow-[0_44px_90px_rgba(0,0,0,0.55)]' : ''
      }`}
    >
      <div
        ref={tiltRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transform: baseTransform, transformStyle: 'preserve-3d' }}
        className={`tp-card group relative flex flex-col w-full max-w-full rounded-[22px] overflow-hidden sm:overflow-visible box-border transition-[border-color,box-shadow] duration-500 ${
          plan.featured
            ? 'tp-featured bg-[#f5f4f1] border border-[#d4cfc7]'
            : 'bg-[#111] border border-white/[0.06] hover:border-white/15'
        }`}
      >
        {/* Halo crème pulsé (carte vedette) */}
        {plan.featured && (
          <span className="tp-halo pointer-events-none absolute -inset-3 sm:-inset-8 -z-10 rounded-[30px]" />
        )}

        {/* BADGE */}
        {plan.badge && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-full bg-[#0a0a0a] px-3.5 py-1.5 shadow-lg shadow-black/30 whitespace-nowrap max-w-[90vw]">
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-[#d4cfc7]">
              {plan.badge}
            </span>
          </div>
        )}

        {/* Liseré lumineux haut */}
        <div
          className={`absolute top-0 left-0 right-0 h-px z-10 rounded-t-[22px] ${
            plan.featured
              ? 'bg-gradient-to-r from-transparent via-[#0a0a0a]/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-[#d4cfc7]/30 to-transparent'
          }`}
        />

        <div className="relative z-10 flex flex-col h-full w-full p-5 sm:p-7 md:p-9 box-border overflow-hidden">
          {/* Nom */}
          <h3
            style={{ fontFamily: DISPLAY }}
            className={`text-lg sm:text-xl md:text-2xl uppercase leading-[0.95] tracking-tight mb-3 break-words ${
              plan.featured ? 'text-[#0a0a0a]' : 'text-white'
            }`}
          >
            {plan.name}
          </h3>

          {/* Description */}
          <p className={`text-xs leading-relaxed mb-5 break-words ${
            plan.featured ? 'text-[#0a0a0a]/70' : 'text-white/60'
          }`}>
            {plan.description}
          </p>

          {/* Durées */}
          <div className="mb-6">
            <p className={`text-[0.65rem] uppercase tracking-[0.15em] mb-2 ${
              plan.featured ? 'text-[#0a0a0a]/50' : 'text-[#8a8279]'
            }`}>
              Durées
            </p>
            <div className="flex flex-wrap gap-1.5 max-w-full">
              {plan.durations.map((d) => (
                <span
                  key={d}
                  className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide border ${
                    plan.featured
                      ? 'bg-[#0a0a0a]/5 border-[#0a0a0a]/15 text-[#0a0a0a]'
                      : 'bg-white/5 border-white/10 text-[#d4cfc7]'
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Modalité */}
          <div className="mb-7">
            <p className={`text-[0.65rem] uppercase tracking-[0.15em] mb-1.5 ${
              plan.featured ? 'text-[#0a0a0a]/50' : 'text-[#8a8279]'
            }`}>
              {plan.priceLabel}
            </p>
            <p
              style={{ fontFamily: DISPLAY }}
              className={`text-base sm:text-lg md:text-xl uppercase leading-none break-words ${
                plan.featured ? 'text-[#0a0a0a]' : 'text-white'
              }`}
            >
              {plan.priceCustom}
            </p>
          </div>

          {/* Séparateur */}
          <div className={`h-px w-full mb-7 ${plan.featured ? 'bg-[#0a0a0a]/10' : 'bg-white/10'}`} />

          {/* Avantages */}
          <ul className="flex flex-col gap-3 mb-8 flex-1 w-full">
            {plan.features.map((f, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.35 + index * 0.15 + i * 0.05 }}
                className="flex items-start gap-3 w-full"
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                    plan.featured ? 'bg-[#0a0a0a]' : 'bg-[#d4cfc7]/15'
                  }`}
                >
                  <LuCheck size={11} className={plan.featured ? 'text-[#f5f4f1]' : 'text-[#d4cfc7]'} />
                </span>
                <span
                  className={`text-xs md:text-sm leading-snug break-words flex-1 min-w-0 ${plan.featured ? 'text-[#0a0a0a]/75' : 'text-white/65'}`}
                >
                  {f}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            to={plan.ctaHref}
            className={`group/cta relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full w-full px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] sm:tracking-[0.2em] text-center transition-all duration-500 ${
              plan.featured
                ? 'bg-[#0a0a0a] text-[#f5f4f1] hover:bg-[#1a1a1a]'
                : 'bg-[#f5f4f1] text-[#0a0a0a] hover:bg-white'
            }`}
          >
            <span className="absolute inset-0 overflow-hidden">
              <span className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
            </span>
            <span className="relative z-10">Me renseigner</span>
            <LuArrowRight
              size={13}
              className="relative z-10 transition-transform duration-300 group-hover/cta:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── FAQ (accordéon) ────────────────────────────────────────── */
const FaqItem = ({ faq, index, isOpen, onToggle, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      className={`group border-t border-white/10 ${isOpen ? 'is-open' : ''}`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 sm:gap-6 py-5 sm:py-6 text-left overflow-hidden box-border"
      >
        <span className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <span style={{ fontFamily: DISPLAY }} className="text-xs sm:text-sm text-[#d4cfc7]/40 flex-shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            style={{ fontFamily: DISPLAY }}
            className={`text-sm sm:text-lg md:text-xl uppercase leading-tight tracking-tight transition-colors duration-300 break-words flex-1 ${
              isOpen ? 'text-[#d4cfc7]' : 'text-white group-hover:text-[#d4cfc7]'
            }`}
          >
            {faq.q}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            isOpen
              ? 'border-[#d4cfc7]/50 text-[#d4cfc7]'
              : 'border-white/15 text-white/50 group-hover:border-[#d4cfc7]/40 group-hover:text-[#d4cfc7]'
          }`}
        >
          <LuChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="max-w-5xl pb-6 sm:pb-7 pl-6 sm:pl-10 text-xs sm:text-sm md:text-base leading-relaxed text-white/55 break-words">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Page Tarifs ────────────────────────────────────────────── */
const TarifsPage = () => {
  const ref = useRef(null);
  const faqRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isFaqInView = useInView(faqRef, { once: true, margin: '-80px' });
  const [openFaq, setOpenFaq] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full max-w-full overflow-hidden bg-[#0a0a0a] box-border">
      {/* Styles ciblés (effets non exprimables en Tailwind seul) */}
      <style>{`
        .tp-card::before{
          content:"";position:absolute;inset:0;z-index:0;border-radius:22px;opacity:0;
          transition:opacity .4s ease;pointer-events:none;
          background:radial-gradient(340px circle at var(--mx,50%) var(--my,0%),rgba(212,207,199,.14),transparent 60%);
        }
        .tp-card:hover::before{opacity:1}
        .tp-card.tp-featured::before{
          background:radial-gradient(340px circle at var(--mx,50%) var(--my,0%),rgba(10,10,10,.06),transparent 60%);
        }
        .tp-halo{
          background:radial-gradient(closest-side,rgba(212,207,199,.16),transparent 72%);
          animation:tp-pulse 5.5s ease-in-out infinite;
        }
        @keyframes tp-pulse{0%,100%{opacity:.28}50%{opacity:.55}}
        @keyframes tp-drift1{to{transform:translate(-50%,60px) scale(1.15)}}
        @keyframes tp-drift2{to{transform:translate(90px,-50px) scale(1.2)}}
        @keyframes tp-drift3{to{transform:translate(-70px,40px) scale(1.1)}}
        .tp-a1{animation:tp-drift1 22s cubic-bezier(.25,.46,.45,.94) infinite alternate}
        .tp-a2{animation:tp-drift2 26s cubic-bezier(.25,.46,.45,.94) infinite alternate}
        .tp-a3{animation:tp-drift3 30s cubic-bezier(.25,.46,.45,.94) infinite alternate}
        @keyframes tp-scroll{to{transform:translateX(-50%)}}
        .tp-marquee{display:flex;width:max-content;animation:tp-scroll 34s linear infinite}
        .tp-band:hover .tp-marquee{animation-play-state:paused}
        .tp-stroke{
          color:transparent;-webkit-text-stroke:1px rgba(212,207,199,.38);
        }
        @media (prefers-reduced-motion: reduce){
          .tp-a1,.tp-a2,.tp-a3,.tp-marquee,.tp-halo{animation:none!important}
        }
      `}</style>

      {/* Atmosphère de fond */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <span className="tp-a1 absolute top-[-140px] left-1/2 -translate-x-1/2 h-[520px] w-[720px] rounded-full bg-[#d4cfc7] opacity-[0.05] blur-[120px]" />
        <span className="tp-a2 absolute bottom-[-160px] left-[-120px] h-[520px] w-[520px] rounded-full bg-[#d4cfc7] opacity-[0.035] blur-[120px]" />
        <span className="tp-a3 absolute top-[38%] right-[-160px] h-[460px] w-[460px] rounded-full bg-[#d4cfc7] opacity-[0.03] blur-[120px]" />
      </div>
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ══════════ TARIFS ══════════ */}
      <section id="tarifs" ref={ref} className="relative z-[2] w-full max-w-full pt-28 md:pt-36 pb-24 md:pb-28 box-border overflow-hidden">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-8 lg:px-16 box-border">
          {/* Header */}
          <div className="mb-14 md:mb-20 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end w-full">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-5 flex items-center gap-3"
              >
                <em
                  style={{ fontFamily: SERIF }}
                  className="text-base tracking-[0.14em] uppercase text-[#b3a996] italic"
                >
                  Nos abonnements
                </em>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ fontFamily: DISPLAY }}
                className="max-w-full text-[clamp(2rem,7.5vw,2.7rem)] uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.4rem] break-words"
              >
                Trouvez l'offre{' '}
                <span
                  style={{ fontFamily: SERIF }}
                  className="sm:whitespace-nowrap whitespace-normal normal-case italic tracking-normal font-normal"
                >
                  qui vous ressemble
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="max-w-full lg:max-w-[36ch] pb-1 text-sm sm:text-[1.02rem] font-light leading-relaxed text-[#8a8279] break-words"
            >
              Des formules adaptées à votre rythme et vos envies. Que vous veniez pour une séance ou pour vous entraîner toute l'année, nous avons l'offre idéale.
            </motion.p>
          </div>

          {/* ══════════ MISE EN AVANT DU TARIF DE DÉPART ══════════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-16 w-full max-w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-8 md:p-12 text-center backdrop-blur-xl box-border"
          >
            {/* Halos lumineux internes décoratifs */}
            <div className="pointer-events-none absolute -left-1/3 -top-1/2 h-96 w-96 rounded-full bg-[#d4cfc7]/10 blur-[80px]" />
            <div className="pointer-events-none absolute -right-1/3 -bottom-1/2 h-96 w-96 rounded-full bg-[#d4cfc7]/5 blur-[80px]" />
            
            <span className="inline-block rounded-full bg-[#d4cfc7]/10 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[#d4cfc7] mb-6">
              Tarif d'accès
            </span>
            
            <p className="text-xs uppercase tracking-[0.2em] text-[#8a8279] mb-2">Nos formules débutent à</p>
            
            <div className="flex flex-col items-center justify-center sm:flex-row sm:items-baseline gap-1 sm:gap-2 mb-4 max-w-full overflow-hidden">
              <span style={{ fontFamily: DISPLAY }} className="text-3xl xs:text-4xl sm:text-6xl md:text-8xl leading-tight sm:leading-none text-white tracking-tight break-words max-w-full">
                À partir de 39,90 €
              </span>
              <span className="text-base sm:text-xl font-light text-[#b3a996] shrink-0">/ mois</span>
            </div>
            
            <p className="mx-auto max-w-2xl text-xs sm:text-sm md:text-base font-light leading-relaxed text-white/70 break-words">
              Accédez à nos équipements Matrix haut de gamme, à nos espaces de musculation et cardio ainsi qu'à plus de 30 cours collectifs hebdomadaires dispensés par des professionnels certifiés.
            </p>
          </motion.div>

          {/* Grille (pt-4 ajouté pour laisser la place au badge débordant) */}
          <div className="grid grid-cols-1 gap-6 md:gap-7 lg:grid-cols-3 lg:items-stretch pt-4 w-full max-w-full box-border">
            {plans.map((plan, index) => (
              <PlanCard key={plan.name} plan={plan} index={index} isInView={isInView} />
            ))}
          </div>

          {/* ══════════ NOTE DE TRANSPARENCE / ACCÈS ══════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-14 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-5 sm:gap-6 rounded-2xl border border-white/5 bg-white/[0.01] p-5 sm:p-6 md:p-8 backdrop-blur-md box-border overflow-hidden"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#d4cfc7]/10 text-[#d4cfc7]">
              <LuInfo size={22} />
            </div>
            <div className="flex-1 min-w-0 text-center md:text-left">
              <h4 style={{ fontFamily: DISPLAY }} className="text-sm sm:text-base md:text-lg uppercase tracking-wider text-white mb-2 break-words">
                Détails des Tarifs & Accompagnement
              </h4>
              <p className="text-xs md:text-sm font-light leading-relaxed text-white/60 break-words">
                Afin de vous orienter vers la formule la plus adaptée à vos objectifs et d'expliquer nos différentes options (frais d'inscription et de badge d'accès), l'ensemble de notre grille tarifaire détaillée vous sera communiqué directement par l'équipe CWS lors de votre visite ou sur simple demande.
              </p>
            </div>
            <Link
              to="/contact"
              className="w-full sm:w-auto flex-shrink-0 group relative inline-flex items-center justify-center gap-2 rounded-full border border-white/10 hover:border-white/20 px-5 sm:px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#0a0a0a] transition-all duration-300 hover:bg-[#111]"
            >
              <span>Demander les tarifs</span>
              <LuArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center text-[10px] sm:text-xs italic tracking-wide text-white/30 border-t border-white/[0.06] pt-6 break-words"
          >
            Tous nos abonnements incluent un accompagnement humain et des coachs diplômés. Pas d'amateurs.
          </motion.p>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section id="faq" ref={faqRef} className="relative z-[2] w-full max-w-full bg-[#0d0d0d] py-24 md:py-32 box-border overflow-hidden">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-8 lg:px-16 box-border">
          <div className="mb-12 md:mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end w-full">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-5 flex items-center gap-3"
              >
                <em
                  style={{ fontFamily: SERIF }}
                  className="text-base tracking-[0.14em] uppercase text-[#b3a996] italic"
                >
                  Questions fréquentes
                </em>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ fontFamily: DISPLAY }}
                className="text-[clamp(1.6rem,6.5vw,2.2rem)] uppercase leading-[0.94] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.6rem] break-words"
              >
                On répond à vos questions
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="max-w-full lg:max-w-[30ch] pb-1 text-sm sm:text-[1rem] font-light leading-relaxed text-[#8a8279] break-words"
            >
              Une question sans réponse ? Contactez-nous, on vous répond rapidement.
            </motion.p>
          </div>

          <div className="border-b border-white/10 w-full">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                isInView={isFaqInView}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TarifsPage;