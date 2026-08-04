import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  LuArrowRight, LuClock, LuDumbbell, LuUsers, LuPlus, LuChevronDown,
  LuWind, LuActivity, LuFlame, LuMove, LuTarget, LuHeartPulse,
  LuZap, LuBike, LuAward, LuSwords, LuTimer
} from 'react-icons/lu';
import { Link } from 'react-router-dom';

// ─── Photos des cours ────────────────────────────────────────
// Intensité 1
import gymDosImg from '../../assets/GYM_DOS.png';
import pilatesImg from '../../assets/PILATES.png';
import yogaImg from '../../assets/YOGA.png';
import stretchingImg from '../../assets/STRETCHING.png';
import mobilityImg from '../../assets/MOBILITY.png';
// Intensité 2
import cafImg from '../../assets/CAF.png';
import trxImg from '../../assets/TRX TRAINING.png';
import crossTrainingImg from '../../assets/CROSS TRAINING.png';
import crossBikingImg from '../../assets/cross biking.png';
import masterclassImg from '../../assets/MASTERCLASS.png';
import openGymImg from '../../assets/open gym.png';
// Intensité 3
import boxingBagImg from '../../assets/BOXING BAG.png';
import cardioTrainingImg from '../../assets/CARDIO TRAINING.png';
import sprintImg from '../../assets/SPRINT.png';

const DISPLAY = "'Anton', sans-serif";
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";

/* ─── Les 3 niveaux ─────────────────────────────────────────── */
const levels = [
  { id: 1, label: 'Intensité 1', desc: 'Douceur & mobilité', percent: 33, icon: <LuWind size={20} />, accent: '#d4cfc7', glow: 'rgba(212,207,199,0.18)' },
  { id: 2, label: 'Intensité 2', desc: 'Renforcement & énergie', percent: 66, icon: <LuActivity size={20} />, accent: '#b3a996', glow: 'rgba(179,169,150,0.20)' },
  { id: 3, label: 'Intensité 3', desc: 'Haute intensité & cardio', percent: 100, icon: <LuFlame size={20} />, accent: '#d4af37', glow: 'rgba(212,175,55,0.22)' },
];

/* ─── Tous les cours (TOUTES les photos intégrées) ──────────── */
const courses = [
  // ── INTENSITÉ 1 ──
  { level: 1, name: 'Gym Dos', icon: <LuMove size={30} strokeWidth={1.2} />, image: gymDosImg, short: 'Renforcez votre dos en douceur, inspiré du Yoga et du Pilates.', desc: "Inspirée du « Yoga » et du « Pilates », la Gym Dos vous permettra de renforcer en douceur vos muscles afin d'être plus fort.", duration: '45min', accessories: 'Serviette, chaussures propres et bouteille d\'eau', public: 'Pour tout public' },
  { level: 1, name: 'Pilates', icon: <LuTarget size={30} strokeWidth={1.2} />, image: pilatesImg, short: 'Renforcement du maintien de la colonne vertébrale.', desc: "Le Pilates est un cours doux qui a pour objectif de renforcer le maintien de la colonne vertébrale. Grâce à des exercices simples, avec ou sans petit matériel, cet entraînement agira sur votre mobilité et votre posture.", duration: '45min', accessories: 'Serviette, chaussures propres et bouteille d\'eau', public: 'Pour tout public' },
  { level: 1, name: 'Yoga', icon: <LuWind size={30} strokeWidth={1.2} />, image: yogaImg, short: 'Harmonie du corps et de l\'esprit.', desc: "Notre Yoga combine le renforcement profond, l'équilibre et l'assouplissement. Ce qui a pour but de conduire votre corps et votre esprit vers une parfaite harmonie.", duration: '45min', accessories: 'Serviette + bouteille d\'eau', public: 'Tout public' },
  { level: 1, name: 'Stretching', icon: <LuHeartPulse size={30} strokeWidth={1.2} />, image: stretchingImg, short: 'Assouplissement et mobilité au quotidien.', desc: "Le stretching est un cours d'assouplissement qui permet d'améliorer votre mobilité indispensable à votre quotidien.", duration: '45min', accessories: 'Serviette et bouteille d\'eau', public: 'Pour tout public' },
  { level: 1, name: 'Mobility', icon: <LuMove size={30} strokeWidth={1.2} />, image: mobilityImg, short: 'Utilisez 100% de la capacité de votre corps.', desc: "Ce cours est idéal pour pouvoir utiliser la capacité de votre corps à 100%. Il vous permettra d'améliorer vos mouvements et donc vos performances.", duration: '45min', accessories: 'Serviette et bouteille d\'eau', public: 'Pour tout public' },

  // ── INTENSITÉ 2 ──
  { level: 2, name: 'CAF', icon: <LuZap size={30} strokeWidth={1.2} />, image: cafImg, short: 'Cuisses-abdos-fessiers en interval training.', desc: "Le traditionnel « cuisses-abdos-fessiers » sous forme d'interval training, qui assure un renforcement ciblé du bas et du centre du corps.", duration: '45min', accessories: 'Serviette, chaussures propres et bouteille d\'eau', public: 'Pour tout public' },
  { level: 2, name: 'TRX Training', icon: <LuTarget size={30} strokeWidth={1.2} />, image: trxImg, short: 'Renforcement aux sangles, poids du corps.', desc: "Ce cours de renforcement musculaire avec des sangles (TRX) vous permettra de déstabiliser l'ensemble de votre musculature au poids du corps.", duration: '45min', accessories: 'Serviette, chaussures propres et bouteille d\'eau', public: 'Pour tout public' },
  { level: 2, name: 'Cross Training', icon: <LuDumbbell size={30} strokeWidth={1.2} />, image: crossTrainingImg, short: 'Entraînement fonctionnel complet et ludique.', desc: "Entraînement croisé avec du matériel (kettlebell, battle rope, haltères, TRX, assault bike...). C'est un entraînement fonctionnel complet, ludique et varié avec une grande dépense énergétique afin de sculpter votre corps.", duration: '45min', accessories: 'Serviette, chaussures propres et bouteille d\'eau', public: 'Pour tout public' },
  { level: 2, name: 'Cross Biking', icon: <LuBike size={30} strokeWidth={1.2} />, image: crossBikingImg, short: 'Cross Training + Bike, ambiance de feu.', desc: "C'est un mélange de 2 cours (Cross Training + Bike) à grandes dépenses énergétiques. Le cours fonctionnel et complet saura sculpter votre corps dans une ambiance de feu.", duration: '45min', accessories: 'Serviette, chaussures propres et bouteille d\'eau', public: 'Pour tout public' },
  { level: 2, name: 'Masterclass', icon: <LuAward size={30} strokeWidth={1.2} />, image: masterclassImg, short: 'Force + endurance, devenez un athlète complet.', desc: "C'est un cours de préparation physique qui combine la force et l'endurance pour offrir un mélange de challenges et de défis stimulants, il vous permettra de devenir un athlète complet.", duration: '45min', accessories: 'Serviette, chaussures propres et bouteille d\'eau', public: 'Pour tout public' },
  { level: 2, name: 'Open Gym', icon: <LuUsers size={30} strokeWidth={1.2} />, image: openGymImg, short: 'Musculation autonome, conseils d\'un coach.', desc: "L'Open Gym est l'occasion idéale pour s'entraîner en musculation afin de travailler en autonomie aux groupes musculaires tout en bénéficiant des conseils d'un coach.", duration: '45min', accessories: '—', public: 'Pour tout public' },

  // ── INTENSITÉ 3 ──
  { level: 3, name: 'Boxing Bag', icon: <LuSwords size={30} strokeWidth={1.2} />, image: boxingBagImg, short: 'Boxe éducatrice sur sacs de frappe dédiés.', desc: "Boxe éducatrice, bénéficiez de tous les avantages de la boxe sans les inconvénients, sur de véritables sacs de frappe avec une structure dédiée.", duration: '45min', accessories: 'Serviette, gants et bouteille d\'eau', public: 'Pour tout public' },
  { level: 3, name: 'Cardio Training', icon: <LuHeartPulse size={30} strokeWidth={1.2} />, image: cardioTrainingImg, short: 'Développez le muscle le plus important : le cœur.', desc: "Entraînement croisé avec du matériel cardio (vélo, rameur, assault bike, ski erg...) et du poids du corps. C'est un entraînement qui va vous permettre de développer le muscle le plus important de votre corps : le cœur.", duration: '45min', accessories: 'Serviette, gants et bouteille d\'eau', public: 'Pour tout public' },
  { level: 3, name: 'Sprint', icon: <LuTimer size={30} strokeWidth={1.2} />, image: sprintImg, short: 'Haute intensité sur vélo dernière génération.', desc: "C'est un entraînement à haute intensité sur un vélo de dernière génération. Ce cours vous permettra de dépasser vos limites et d'atteindre plus rapidement vos objectifs.", duration: '30min', accessories: 'Serviette, chaussures propres et bouteille d\'eau', public: 'Pour tout public' },
];

/* ─── Jauge circulaire SVG animée ───────────────────────────── */
const IntensityGauge = ({ percent, accent, isVisible }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative h-32 w-32">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <motion.circle
          cx="60" cy="60" r={radius} fill="none"
          stroke={accent}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isVisible ? { strokeDashoffset: offset } : {}}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span style={{ fontFamily: DISPLAY }} className="text-2xl leading-none text-white">{percent}%</span>
        <span className="mt-1 text-[0.55rem] uppercase tracking-[0.15em] text-white/40">intensité</span>
      </div>
    </div>
  );
};

/* ─── Carte cours ───────────────────────────────────────────── */
const CourseCard = ({ course, index, isVisible, accent, expanded, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      onClick={onToggle}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border bg-white/[0.02] transition-colors duration-300 hover:bg-white/[0.04]"
      style={{ borderColor: expanded ? accent : 'rgba(255,255,255,0.07)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
        style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent}66, transparent)` }}
      />

      <div className="relative h-48 overflow-hidden bg-[#111]">
        {course.image ? (
          <>
            <img
              src={course.image}
              alt={course.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
          </>
        ) : (
          <div className={`h-full w-full flex items-center justify-center relative ${
            course.level === 1 ? 'bg-gradient-to-br from-[#d4cfc7]/[0.08] to-transparent' :
            course.level === 2 ? 'bg-gradient-to-br from-[#b3a996]/[0.10] to-transparent' :
            'bg-gradient-to-br from-[#d4af37]/[0.12] to-transparent'
          }`}>
            <span style={{ fontFamily: DISPLAY }} className="pointer-events-none absolute -top-4 -right-2 text-[6rem] leading-none text-white/[0.03] select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div
              className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110"
              style={{ color: accent }}
            >
              {course.icon}
            </div>
          </div>
        )}
      </div>

      <div className="relative p-6 md:p-7">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3
            style={{ fontFamily: DISPLAY, color: expanded ? accent : '#fff' }}
            className="text-xl uppercase leading-tight tracking-tight transition-colors duration-300"
          >
            {course.name}
          </h3>
          <motion.div
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-white/40 transition-colors duration-300 mt-1"
            style={expanded ? { borderColor: accent, color: accent } : {}}
          >
            <LuPlus size={16} />
          </motion.div>
        </div>

        <p className="text-sm italic leading-relaxed text-white/55">{course.short}</p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-sm leading-relaxed text-white/70 border-l-2 pl-3" style={{ borderColor: accent }}>
                {course.desc}
              </p>
              <div className="mt-5 flex flex-col gap-2.5 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2.5 text-xs text-white/50">
                  <LuClock size={14} style={{ color: accent }} />
                  <span>Durée : <span className="text-white/80 font-medium">{course.duration}</span></span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-white/50">
                  <LuDumbbell size={14} className="mt-0.5 flex-shrink-0" style={{ color: accent }} />
                  <span>{course.accessories}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/50">
                  <LuUsers size={14} style={{ color: accent }} />
                  <span>{course.public}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ─── Page Activités ────────────────────────────────────────── */
const ActivitesPage = () => {
  const heroRef = useRef(null);
  const selectorRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: '-60px' });
  const isSelectorInView = useInView(selectorRef, { once: true, margin: '-60px' });
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const heroVisible = isHeroInView || mounted;
  const selectorVisible = isSelectorInView || mounted;
  const ctaVisible = isCtaInView || mounted;

  const [activeLevel, setActiveLevel] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);

  const currentLevel = levels.find(l => l.id === activeLevel);
  const filteredCourses = useMemo(() => courses.filter(c => c.level === activeLevel), [activeLevel]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!selectorVisible) return;
    let v = 0;
    const target = 37;
    const stepTime = 1500 / target;
    const t = setInterval(() => {
      v += 1;
      if (v >= target) { v = target; clearInterval(t); }
      setCount(v);
    }, stepTime);
    return () => clearInterval(t);
  }, [selectorVisible]);

  useEffect(() => { setExpandedCard(null); }, [activeLevel]);

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a]">

      <style>{`
        @keyframes ac-pulse{0%,100%{opacity:.3}50%{opacity:.6}}
        .ac-glow{animation:ac-pulse 4s ease-in-out infinite}
        @media (prefers-reduced-motion: reduce){.ac-glow{animation:none!important}}
      `}</style>

      <motion.div
        animate={{ background: currentLevel.glow }}
        transition={{ duration: 0.8 }}
        className="ac-glow pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[140px] z-0"
      />

      {/* ══════════════════════════════════════════
          1. HERO — NOUVEAU DESIGN (centré, immersif, WOW)
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Image de fond */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={heroVisible ? { scale: 1 } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <img src="/COURS_COLLECTIFS.png" alt="Cours collectifs CWS" className="w-full h-full object-cover opacity-45" onError={(e) => e.target.style.display='none'} />
        </motion.div>
        {/* Overlays */}
        <div className="absolute inset-0 z-[1] bg-[#0a0a0a]/70" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]" />
        {/* Halo central */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#d4cfc7]/[0.06] blur-[130px] z-[2]" />

        {/* Contenu CENTRÉ */}
        <div className="relative z-10 mx-auto max-w-[1100px] w-full px-6 sm:px-10 lg:px-16 pt-28 pb-24 flex flex-col items-center text-center">

          {/* #TrainBetter — grand élément décoratif */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: SERIF }}
            className="mb-7 text-2xl md:text-3xl italic text-[#d4cfc7]"
          >
            #TrainBetter
          </motion.p>

          {/* Titre géant centré */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: DISPLAY }}
            className="mb-8 text-[3rem] uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl lg:text-[6.5rem]"
          >
            <span className="block" style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(212,207,199,0.7)' }}>Les cours</span>
            <span className="text-white block">collectifs</span>
          </motion.h1>

          {/* Description centrée */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 max-w-[60ch] text-[1.05rem] md:text-lg font-light italic leading-relaxed text-white/75"
          >
            Chez CWS, retrouvez plus de 37 cours variés avec des coachs diplômés et qualifiés pour corriger vos mouvements et pour vous donner l'énergie nécessaire afin d'atteindre vos objectifs.
          </motion.p>

          {/* 3 points forts en PILLS horizontales */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 max-w-4xl"
          >
            {[
              "Méthodologie exclusive",
              "Nombre de membres limité",
              "Matériel haut de gamme",
            ].map((point, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 py-2.5"
              >
                <span className="flex h-2 w-2 flex-shrink-0 items-center justify-center rounded-full bg-[#d4cfc7]" />
                <span className="text-xs sm:text-sm font-medium tracking-wide text-white/75">{point}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Indicateur de scroll */}
        <motion.a
          href="#selecteur"
          initial={{ opacity: 0 }}
          animate={heroVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <LuChevronDown size={20} className="text-white/30 group-hover:text-[#d4cfc7] transition-colors duration-500" />
          </motion.div>
        </motion.a>
      </section>

      {/* ══════════════════════════════════════════
          2. SÉLECTEUR D'INTENSITÉ INTERACTIF
      ══════════════════════════════════════════ */}
      <section id="selecteur" ref={selectorRef} className="relative w-full overflow-hidden py-24 md:py-32">
        <div className="relative z-10 mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">

          <div className="mb-12 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={selectorVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-5 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-[#d4cfc7]" />
                <em style={{ fontFamily: SERIF }} className="text-base tracking-[0.14em] uppercase text-[#b3a996] italic">
                  +<span style={{ fontFamily: DISPLAY }} className="not-italic text-white">{count}</span> cours variés
                </em>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={selectorVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ fontFamily: DISPLAY }}
                className="text-[2.2rem] uppercase leading-[0.94] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.8rem]"
              >
                Choisissez votre{' '}
                <motion.span
                  animate={{ color: currentLevel.accent }}
                  transition={{ duration: 0.5 }}
                  className="relative inline-block whitespace-nowrap"
                >
                  <span className="relative z-10">intensité</span>
                  <motion.span
                    animate={{ backgroundColor: currentLevel.accent }}
                    transition={{ duration: 0.5 }}
                    className="absolute -left-0.5 -right-0.5 bottom-[0.12em] z-0 h-[0.34em] origin-left"
                    style={{ scaleX: selectorVisible ? 1 : 0 }}
                  />
                </motion.span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={selectorVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-6 self-start lg:self-auto"
            >
              <div className="text-right hidden sm:block">
                <motion.p animate={{ color: currentLevel.accent }} style={{ fontFamily: DISPLAY }} className="text-xl uppercase leading-none">{currentLevel.label}</motion.p>
                <p className="mt-1 text-sm italic text-white/50">{currentLevel.desc}</p>
              </div>
              <IntensityGauge percent={currentLevel.percent} accent={currentLevel.accent} isVisible={selectorVisible} />
            </motion.div>
          </div>

          {/* Sélecteur 3 Niveaux */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={selectorVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
          >
            {levels.map((lvl) => {
              const isActive = activeLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setActiveLevel(lvl.id)}
                  className="group relative overflow-hidden rounded-2xl border px-5 py-5 md:px-6 md:py-6 text-left transition-all duration-500"
                  style={{
                    borderColor: isActive ? lvl.accent : 'rgba(255,255,255,0.08)',
                    background: isActive ? `${lvl.accent}14` : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <motion.div
                    animate={{ width: isActive ? '100%' : '0%', backgroundColor: lvl.accent }}
                    transition={{ duration: 0.6 }}
                    className="absolute bottom-0 left-0 h-1"
                  />
                  <div className="flex items-center gap-3 mb-1.5">
                    <span style={{ color: isActive ? lvl.accent : 'rgba(255,255,255,0.4)' }} className="transition-colors duration-300">{lvl.icon}</span>
                    <span style={{ fontFamily: DISPLAY, color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }} className="text-base md:text-lg uppercase tracking-tight transition-colors duration-300">
                      {lvl.label}
                    </span>
                  </div>
                  <p className="text-[0.75rem] md:text-sm italic text-white/40 pl-9">{lvl.desc}</p>
                </button>
              );
            })}
          </motion.div>

{/* Grille des Cours — dernière ligne centrée */}
<div className="flex flex-wrap justify-center gap-5">
  <AnimatePresence mode="wait">
    <motion.div
      key={activeLevel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="contents"
    >
      {filteredCourses.map((course, i) => (
        <div key={course.name} className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)]">
          <CourseCard
            course={course}
            index={i}
            isVisible={selectorVisible}
            accent={currentLevel.accent}
            expanded={expandedCard === course.name}
            onToggle={() => setExpandedCard(expandedCard === course.name ? null : course.name)}
          />
        </div>
      ))}
    </motion.div>
  </AnimatePresence>
</div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={selectorVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center text-xs italic tracking-wide text-white/30"
          >
            Cliquez sur un cours pour découvrir le détail · Tous nos cours sont encadrés par des coachs diplômés
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. CTA FINAL
      ══════════════════════════════════════════ */}
      <section ref={ctaRef} className="relative w-full overflow-hidden bg-[#f5f4f1] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16 flex flex-col items-center text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={ctaVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ fontFamily: SERIF }} className="mb-4 text-lg italic text-[#b3a996]">#TrainBetter</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={ctaVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }} style={{ fontFamily: DISPLAY }} className="mb-5 text-[2.2rem] uppercase leading-[0.95] tracking-tight text-[#0a0a0a] sm:text-4xl md:text-5xl">
            Venez vivre l'expérience CWS près de Tours
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={ctaVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="mb-9 max-w-[42ch] text-[1rem] font-light leading-relaxed text-[#565656]">
            Rejoignez-nous et accédez à tous nos cours collectifs en illimité, encadrés par des coachs diplômés.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={ctaVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.35 }}>
            <Link to="/tarifs" className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#0a0a0a] px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#f5f4f1] transition-all duration-500 hover:bg-[#1a1a1a]">
              <span className="absolute inset-0 overflow-hidden"><span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" /></span>
              <span className="relative z-10">Rejoignez-nous</span>
              <LuArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ActivitesPage;