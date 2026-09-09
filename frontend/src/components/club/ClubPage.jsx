import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  LuClock, LuCalendarCheck, LuArrowRight, LuMapPin, LuChevronRight
} from 'react-icons/lu';
import { Link } from 'react-router-dom';

// ─── Images (noms vérifiés dans src/assets/) ─────────────────
import histoireImg1 from '../../assets/image-5.png';
import histoireImg2 from '../../assets/image-3.png';
import engagementBg from '../../assets/materiel.png';

const DISPLAY = "'Anton', sans-serif";
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";

/* ══════════════════════════════════════════════════════════════
   ICÔNES SVG SUR-MESURE (style ligne fine premium, dessinées main)
   Chaque icône est unique, trait fin 1.5, cohérente visuellement.
══════════════════════════════════════════════════════════════ */
const iconProps = {
  width: 30, height: 30, viewBox: '0 0 32 32', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round',
};

// 1. Club Premium → écusson / blason (sécurité, prestige)
const IconPremium = () => (
  <svg {...iconProps}>
    <path d="M16 3 L27 7.5 V15 C27 22 22 26.5 16 29 C10 26.5 5 22 5 15 V7.5 Z" />
    <path d="M11.5 16 L14.5 19 L20.5 13" />
  </svg>
);

// 2. Cours collectifs → groupe de personnes stylisé
const IconGroup = () => (
  <svg {...iconProps}>
    <circle cx="16" cy="9" r="3.2" />
    <path d="M10.5 25 C10.5 21.5 13 19.5 16 19.5 C19 19.5 21.5 21.5 21.5 25" />
    <circle cx="7" cy="11.5" r="2.3" />
    <path d="M3 24 C3 21.5 4.8 20 7 20" />
    <circle cx="25" cy="11.5" r="2.3" />
    <path d="M29 24 C29 21.5 27.2 20 25 20" />
  </svg>
);

// 3. Coaching personnalisé → cible + flèche (objectif atteint)
const IconCoaching = () => (
  <svg {...iconProps}>
    <circle cx="15" cy="17" r="9" />
    <circle cx="15" cy="17" r="5" />
    <circle cx="15" cy="17" r="1.4" fill="currentColor" stroke="none" />
    <path d="M22 10 L28 4 M28 4 L24 4.5 M28 4 L27.5 8" />
  </svg>
);

// 4. Qualité → diamant / gemme (exigence, préciosité)
const IconQuality = () => (
  <svg {...iconProps}>
    <path d="M9 5 H23 L28 12 L16 28 L4 12 Z" />
    <path d="M4 12 H28" />
    <path d="M9 5 L13 12 L16 28 M23 5 L19 12 L16 28 M13 12 H19" />
  </svg>
);

// 5. Espace repas → bol / nutrition (énergie, convivialité)
const IconMeal = () => (
  <svg {...iconProps}>
    <path d="M5 14 H27 C27 21 22 26 16 26 C10 26 5 21 5 14 Z" />
    <path d="M12 14 C12 11 13 9 16 7 C19 9 20 11 20 14" />
    <path d="M16 7 V4" />
  </svg>
);

// 6. Matériel → haltère (force, équipement MATRIX)
const IconEquipment = () => (
  <svg {...iconProps}>
    <path d="M5 12 V20 M9 9 V23 M23 9 V23 M27 12 V20" />
    <path d="M9 16 H23" />
    <rect x="3" y="12" width="4" height="8" rx="1" />
    <rect x="25" y="12" width="4" height="8" rx="1" />
  </svg>
);

/* ─── Composant LazyImage ───────────────────────────────────── */
const LazyImage = ({ src, alt, className, imgClassName, eager = false }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#d4cfc7]/15 animate-pulse"
          />
        )}
      </AnimatePresence>
      <img
        src={src} alt={alt}
        loading={eager ? 'eager' : 'lazy'} decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full transition-all duration-700 ease-out ${
          loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-md'
        } ${imgClassName || ''}`}
      />
    </div>
  );
};

/* ─── Les 6 piliers (avec icônes SVG custom) ────────────────── */
const pillars = [
  { icon: <IconPremium />, title: 'Club Premium', text: "Entraînez-vous dans un club entièrement sécurisé, dans une ambiance conviviale et familiale, avec des règles d'hygiène respectées, une désinfection du matériel et des adhérents respectueux, à l'image du club." },
  { icon: <IconGroup />, title: 'Cours collectifs variés', text: "Plus de 30 cours variés avec des coachs diplômés et qualifiés pour corriger vos mouvements et vous donner l'énergie nécessaire afin d'atteindre vos objectifs." },
  { icon: <IconCoaching />, title: 'Coaching personnalisé', text: "L'objectif est de vous faire progresser efficacement, sans risque. Nous vous proposons une activité adaptée à vos objectifs et à vos capacités physiques." },
  { icon: <IconQuality />, title: 'Qualité', text: "Soucieux de votre confort, le nombre de membres est volontairement limité sur l'ensemble des activités pour garantir la tranquillité, la qualité des prestations et l'écoute maximale lors de chacune de vos séances." },
  { icon: <IconMeal />, title: 'Espace repas', text: "Un espace snacking est à votre disposition pour vous restaurer (barres, viennoiseries, micro-ondes...). Cet espace servira notamment pour les collations conviviales de votre salle." },
  { icon: <IconEquipment />, title: 'Matériel', text: "Matériel de très bonne qualité (MATRIX) et de dernière génération, toujours entretenu par des professionnels." },
];

/* ─── Composant Pilier (carte) — nouveau design pro ─────────── */
const PillarCard = ({ pillar, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 md:p-8 overflow-hidden transition-all duration-500 hover:border-[#d4cfc7]/30 hover:bg-white/[0.04]"
    >
      {/* Reflet lumineux haut */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4cfc7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Numéro géant en filigrane */}
      <span
        style={{ fontFamily: DISPLAY }}
        className="pointer-events-none absolute -top-3 -right-1 text-[5rem] leading-none text-white/[0.03] select-none transition-colors duration-500 group-hover:text-[#d4cfc7]/[0.07]"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* ═══ Nouvelle icône : cercle avec anneau SVG custom + effet hover ═══ */}
      <div className="relative z-10 mb-6 mx-auto flex h-16 w-16 items-center justify-center">
        {/* Anneau décoratif qui apparaît au hover */}
        <span className="absolute inset-0 rounded-full border border-[#d4cfc7]/0 transition-all duration-500 group-hover:border-[#d4cfc7]/30 group-hover:scale-110" />
        {/* Fond cercle */}
        <span className="absolute inset-1.5 rounded-full bg-[#0a0a0a] border border-white/10 transition-all duration-500 group-hover:border-[#d4cfc7]/40" />
        {/* Icône SVG custom */}
        <span className="relative z-10 text-[#d4cfc7] transition-all duration-500 group-hover:scale-110 group-hover:text-white">
          {pillar.icon}
        </span>
      </div>

      {/* Titre */}
      <h3
        style={{ fontFamily: DISPLAY }}
        className="relative z-10 mb-3 text-center text-lg uppercase leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-[#d4cfc7]"
      >
        {pillar.title}
      </h3>

      {/* Texte */}
      <p className="relative z-10 text-justify text-sm leading-relaxed text-white/55">
        {pillar.text}
      </p>
    </motion.div>
  );
};

/* ─── Page Club ─────────────────────────────────────────────── */
const ClubPage = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const engageRef = useRef(null);
  const infoRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: '-60px' });
  const isStoryInView = useInView(storyRef, { once: true, margin: '-80px' });
  const isEngageInView = useInView(engageRef, { once: true, margin: '-80px' });
  const isInfoInView = useInView(infoRef, { once: true, margin: '-80px' });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const heroVisible = isHeroInView || mounted;
  const storyVisible = isStoryInView || mounted;
  const engageVisible = isEngageInView || mounted;
  const infoVisible = isInfoInView || mounted;

  const reduce = useReducedMotion();
  const float = reduce ? {} : { y: [0, -18, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } };

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a]">

      <style>{`
        @keyframes cp-drift1{to{transform:translate(-50%,70px) scale(1.15)}}
        @keyframes cp-drift2{to{transform:translate(80px,-60px) scale(1.2)}}
        .cp-a1{animation:cp-drift1 24s cubic-bezier(.25,.46,.45,.94) infinite alternate}
        .cp-a2{animation:cp-drift2 28s cubic-bezier(.25,.46,.45,.94) infinite alternate}
        .cp-stroke{color:transparent;-webkit-text-stroke:1.5px rgba(212,207,199,.5)}
        @media (prefers-reduced-motion: reduce){.cp-a1,.cp-a2{animation:none!important}}
      `}</style>

      {/* ══════════════════════════════════════════
          1. HERO CLUB
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full min-h-screen flex items-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={heroVisible ? { scale: 1 } : {}}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <LazyImage src={engagementBg} alt="Salle CWS" eager className="w-full h-full" imgClassName="object-cover" />
        </motion.div>
        <div className="absolute inset-0 z-[1] bg-[#0a0a0a]/75" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0a0a0a]/70 via-transparent to-transparent" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#d4cfc7]/[0.05] blur-[120px] z-[2]" />

        <div className="relative z-10 mx-auto max-w-[1240px] w-full px-6 sm:px-10 lg:px-16 pt-28 pb-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={heroVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-6 flex items-center gap-3">
              <em style={{ fontFamily: SERIF }} className="text-base tracking-[0.14em] uppercase text-[#b3a996] italic">Le club</em>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={heroVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }} style={{ fontFamily: DISPLAY }} className="mb-7 text-[2.8rem] uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              <span className="cp-stroke block">Coach Wellness</span>
              <span className="text-white block">Sports</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={heroVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="flex items-start gap-3 mb-10">
              <LuMapPin size={20} className="mt-1 flex-shrink-0 text-[#d4cfc7]" />
              <p style={{ fontFamily: SERIF }} className="text-xl md:text-2xl italic text-[#d4cfc7]">
                20, Rue Marie de Lorraine<br />
                37700 La Ville-aux-Dames
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={heroVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.45 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <LuClock size={18} className="text-[#d4cfc7]" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">Horaires du club</span>
                </div>
                <p className="text-white text-lg font-light">Lundi – Dimanche</p>
                <p style={{ fontFamily: DISPLAY }} className="text-2xl text-[#d4cfc7] mt-1">7h30 – 21h30</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-md p-6">
                <div className="flex items-center gap-2.5 mb-3">
                  <LuCalendarCheck size={18} className="text-[#d4cfc7]" />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">Accueil commercial</span>
                </div>
                <p className="text-white text-lg font-light">Sur rendez-vous</p>
                <Link to="/#contact" className="inline-flex items-center gap-1.5 text-sm text-[#d4cfc7] hover:text-white mt-2 transition-colors">
                  Prendre rendez-vous <LuChevronRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. L'HISTOIRE DU CLUB
      ══════════════════════════════════════════ */}
      <section ref={storyRef} className="relative w-full overflow-hidden bg-[#f5f4f1] py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        <div className="relative mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-[4.5rem]">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={storyVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-5 flex items-center gap-3">
                <em style={{ fontFamily: SERIF }} className="text-base tracking-[0.14em] uppercase text-[#b3a996] italic">CWS : Un Club de Sport Premium à La Ville-aux-Dames</em>
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 30 }} animate={storyVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} style={{ fontFamily: DISPLAY }} className="mb-7 text-[2.4rem] uppercase leading-[0.94] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl lg:text-[4rem]">
                L'histoire{' '}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="relative z-10">du club</span>
                  <motion.span initial={{ scaleX: 0 }} animate={storyVisible ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.5, ease: [0.65, 0, 0.35, 1] }} className="absolute -left-0.5 -right-0.5 bottom-[0.12em] z-0 h-[0.34em] origin-left bg-[#d4cfc7]" />
                </span>
              </motion.h2>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={storyVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }} className="mb-8 max-w-[46ch] text-[1.05rem] font-light leading-relaxed text-[#565656]">
                Coach Wellness Sports est un club Premium qui a été fondé par{' '}
                <b className="font-semibold text-[#0a0a0a]">Franck Bourré</b>. Athlète et coach pour des sportifs de haut niveau, il s'est ensuite entouré de{' '}
                <b className="font-semibold text-[#0a0a0a]">Justine Laboille</b> pour diriger la salle. CWS, c'est l'esprit familial et convivial au service du dépassement de soi et de votre réussite sportive.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={storyVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
                <Link to="/tarifs" className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#0a0a0a] px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#f5f4f1] transition-all duration-500 hover:bg-[#1a1a1a]">
                  <span className="absolute inset-0 overflow-hidden"><span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" /></span>
                  <span className="relative z-10">Rejoignez-nous</span>
                  <LuArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={storyVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="relative mx-auto w-full max-w-[520px] lg:max-w-none" style={{ minHeight: 520 }}>
              <div className="absolute inset-y-[3%] left-[3%] right-[-3%] rounded-2xl bg-[#0a0a0a]" style={{ transform: 'rotate(2deg)' }} />
              <div className="group absolute left-[6%] top-[5%] z-[2] h-[62%] w-[68%] overflow-hidden rounded-xl shadow-[0_22px_50px_-18px_rgba(0,0,0,0.5)]">
                <LazyImage src={histoireImg2} alt="Coach CWS" className="h-full w-full" imgClassName="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-105" />
              </div>
              <div className="absolute bottom-[7%] right-[5%] z-[2] h-[62%] w-[68%] rounded-xl border border-[#d4cfc7]" />
              <div className="absolute bottom-[5%] right-[3%] z-[3] h-[62%] w-[68%]">
                <motion.div animate={float} className="group h-full w-full overflow-hidden rounded-xl border-4 border-white shadow-[0_34px_60px_-22px_rgba(0,0,0,0.6)]">
                  <LazyImage src={histoireImg1} alt="Façade CWS" className="h-full w-full" imgClassName="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. L'ENGAGEMENT CWS — 6 piliers (nouvelles icônes pro)
      ══════════════════════════════════════════ */}
      <section ref={engageRef} className="relative w-full overflow-hidden bg-[#0a0a0a] py-24 md:py-32">
        <div className="absolute inset-0 z-0 opacity-[0.12]">
          <LazyImage src={engagementBg} alt="" className="w-full h-full" imgClassName="object-cover" />
        </div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]" />
        <span className="cp-a1 pointer-events-none absolute top-[-120px] left-1/2 -translate-x-1/2 h-[480px] w-[680px] rounded-full bg-[#d4cfc7] opacity-[0.04] blur-[120px] z-[2]" />
        <span className="cp-a2 pointer-events-none absolute bottom-[-140px] right-[-100px] h-[460px] w-[460px] rounded-full bg-[#d4cfc7] opacity-[0.03] blur-[120px] z-[2]" />

        <div className="relative z-10 mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">
          <div className="mb-14 md:mb-20 flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={engageVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-5 flex items-center gap-3">
              <em style={{ fontFamily: SERIF }} className="text-base tracking-[0.14em] uppercase text-[#b3a996] italic">Notre promesse</em>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, y: 30 }} animate={engageVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} style={{ fontFamily: DISPLAY }} className="text-[2.4rem] uppercase leading-[0.94] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.2rem]">
              L'engagement{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">CWS</span>
                <motion.span initial={{ scaleX: 0 }} animate={engageVisible ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.5, ease: [0.65, 0, 0.35, 1] }} className="absolute -left-0.5 -right-0.5 bottom-[0.12em] z-0 h-[0.34em] origin-left bg-[#d4cfc7]" />
              </span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={engageVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }} className="mt-6 max-w-[40ch] text-[1rem] font-light leading-relaxed text-[#8a8279]">
              Six engagements concrets qui font de CWS une salle premium, humaine et encadrée.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, index) => (
              <PillarCard key={pillar.title} pillar={pillar} index={index} isInView={engageVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. CTA FINAL
      ══════════════════════════════════════════ */}
      <section ref={infoRef} className="relative w-full overflow-hidden bg-[#f5f4f1] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16 flex flex-col items-center text-center">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={infoVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ fontFamily: DISPLAY }} className="mb-5 text-[2.2rem] uppercase leading-[0.95] tracking-tight text-[#0a0a0a] sm:text-4xl md:text-5xl">
            Prêt à rejoindre l'aventure CWS ?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={infoVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }} className="mb-9 max-w-[40ch] text-[1rem] font-light leading-relaxed text-[#565656]">
            Découvrez nos formules et trouvez l'abonnement qui vous ressemble.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={infoVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
            <Link to="/tarifs" className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#0a0a0a] px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#f5f4f1] transition-all duration-500 hover:bg-[#1a1a1a]">
              <span className="absolute inset-0 overflow-hidden"><span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" /></span>
              <span className="relative z-10">Voir les offres</span>
              <LuArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ClubPage;