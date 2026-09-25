import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  LuArrowRight, LuClock, LuDumbbell, LuUsers, LuPlus, LuChevronDown,
  LuWind, LuActivity, LuFlame, LuMove, LuTarget, LuHeartPulse,
  LuZap, LuBike, LuAward, LuSwords, LuTimer
} from 'react-icons/lu';
import { Link } from 'react-router-dom';
import LazyImage from "../LazyImage";

const DISPLAY = "'Anton', sans-serif";
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";

/* ─── Les 3 catégories ───────────────────────────────────────── */
const categories = [
  {
    id: 1,
    label: 'Wellness Training',
    subtitle: 'Des cours doux et techniques pour retrouver équilibre, mobilité et bien-être.',
    desc: "Cette gamme est dédiée au travail postural, à la mobilité, à la souplesse et au renforcement en profondeur. Elle contribue à améliorer votre qualité de mouvement, réduire les tensions musculaires, prévenir les blessures et retrouver un meilleur équilibre entre le corps et l'esprit.",
    icon: <LuWind size={20} />,
    accent: '#d4cfc7',
    glow: 'rgba(212,207,199,0.18)'
  },
  {
    id: 2,
    label: 'Performance Training',
    subtitle: 'Des cours de renforcement musculaire conçus pour développer votre force, votre tonicité et vos capacités physiques.',
    desc: "Cette gamme s'adresse à celles et ceux qui souhaitent gagner en force, sculpter leur silhouette et améliorer leurs performances grâce à des méthodes d'entraînement variées, progressives et encadrées par nos coachs.",
    icon: <LuDumbbell size={20} />,
    accent: '#b3a996',
    glow: 'rgba(179,169,150,0.20)'
  },
  {
    id: 3,
    label: 'Cardio Training',
    subtitle: 'Des entraînements dynamiques pour développer votre endurance, repousser vos limites et améliorer durablement votre condition physique.',
    desc: "Cette gamme est dédiée au développement des capacités cardiovasculaires et respiratoires. Grâce à des méthodes d'entraînement variées et évolutives, améliorez votre endurance, augmentez votre dépense énergétique et progressez quel que soit votre niveau.",
    icon: <LuFlame size={20} />,
    accent: '#d4af37',
    glow: 'rgba(212,175,55,0.22)'
  },
];

/* ─── Tous les cours ────────────────────────────────────────── */
const courses = [
  // ── 1. WELLNESS TRAINING ──
  {
    category: 1,
    name: 'Wellness Pilates',
    icon: <LuTarget size={30} strokeWidth={1.2} />,
    publicId: "cws-site/pilates",
    short: "Renforcez votre corps de l'intérieur.",
    desc: "Inspiré de la méthode Pilates, ce cours développe les muscles profonds, améliore la posture, la stabilité du tronc et la coordination. Idéal pour renforcer durablement son corps tout en douceur.",
    duration: '45min',
    accessories: "Serviette, chaussures propres et bouteille d'eau",
    public: 'Pour tout public'
  },
  {
    category: 1,
    name: 'Wellness Yoga',
    icon: <LuWind size={30} strokeWidth={1.2} />,
    publicId: "cws-site/yoga",
    short: 'Force, mobilité et sérénité.',
    desc: "Un yoga dynamique alternant postures, respiration et enchaînements fluides pour développer souplesse, équilibre, gainage et concentration tout en procurant une véritable sensation de bien-être.",
    duration: '45min',
    accessories: "Serviette + bouteille d'eau",
    public: 'Tout public'
  },
  {
    category: 1,
    name: 'Wellness Move',
    icon: <LuMove size={30} strokeWidth={1.2} />,
    publicId: "cws-site/gym-dos",
    short: 'Bouger mieux au quotidien.',
    desc: "Un cours mêlant renforcement musculaire doux, travail postural, équilibre et coordination. Inspiré notamment de la Gym Dos, il aide à améliorer les gestes du quotidien tout en limitant les douleurs et les déséquilibres musculaires.",
    duration: '45min',
    accessories: "Serviette, chaussures propres et bouteille d'eau",
    public: 'Pour tout public'
  },
  {
    category: 1,
    name: 'Wellness Mobility',
    icon: <LuMove size={30} strokeWidth={1.2} />,
    publicId: "cws-site/mobility",
    short: 'Retrouvez votre liberté de mouvement.',
    desc: "Développez votre mobilité articulaire et musculaire grâce à des exercices ciblés favorisant l'amplitude des mouvements, la fluidité gestuelle et la prévention des raideurs.",
    duration: '45min',
    accessories: "Serviette et bouteille d'eau",
    public: 'Pour tout public'
  },
  {
    category: 1,
    name: 'Wellness Stretch',
    icon: <LuHeartPulse size={30} strokeWidth={1.2} />,
    publicId: "cws-site/stretching",
    short: 'Relâchez les tensions. Gagnez en souplesse.',
    desc: "Un cours consacré aux étirements musculaires et à la récupération permettant de diminuer les tensions, d'améliorer la souplesse, de préserver l'amplitude articulaire et de réduire le risque de blessures.",
    duration: '45min',
    accessories: "Serviette et bouteille d'eau",
    public: 'Pour tout public'
  },

  // ── 2. PERFORMANCE TRAINING ──
  {
    category: 2,
    name: 'TRX Training',
    icon: <LuTarget size={30} strokeWidth={1.2} />,
    publicId: "cws-site/trx-training",
    short: 'Le renforcement musculaire dans sa version la plus complète.',
    desc: "Un entraînement alternant le travail avec les sangles TRX, des exercices au poids du corps ainsi que des mouvements avec barres, disques et petits matériels. Un cours complet qui développe force, stabilité, gainage et condition physique.",
    duration: '45min',
    accessories: "Serviette, chaussures propres et bouteille d'eau",
    public: 'Pour tout public'
  },
  {
    category: 2,
    name: 'CAF',
    icon: <LuZap size={30} strokeWidth={1.2} />,
    publicId: "cws-site/caf",
    short: 'Tonifiez et renforcez le bas du corps.',
    desc: "Le grand classique du renforcement musculaire ciblé sur les cuisses, les abdominaux et les fessiers. Un cours accessible à tous pour gagner en tonicité, améliorer son maintien et sculpter durablement sa silhouette.",
    duration: '45min',
    accessories: "Serviette, chaussures propres et bouteille d'eau",
    public: 'Pour tout public'
  },
  {
    category: 2,
    name: 'Workshop Gym',
    icon: <LuUsers size={30} strokeWidth={1.2} />,
    publicId: "cws-site/open-gym",
    short: 'Apprenez à vous entraîner efficacement.',
    desc: "Un cours pédagogique permettant de maîtriser les bases de la musculation. Découvrez les bonnes techniques sur les machines guidées, avec les haltères et les principaux exercices afin de gagner en autonomie et en confiance dans vos entraînements.",
    duration: '45min',
    accessories: "Serviette, chaussures propres et bouteille d'eau",
    public: 'Pour tout public'
  },
  {
    category: 2,
    name: 'Cross Training Force',
    icon: <LuDumbbell size={30} strokeWidth={1.2} />,
    publicId: "cws-site/cross-training",
    short: 'Développez votre force fonctionnelle.',
    desc: "Un entraînement en circuits alternant différents ateliers de musculation fonctionnelle et de préparation physique. Grâce à des charges adaptées au niveau de chacun, améliorez votre force, votre puissance et votre endurance musculaire dans une ambiance dynamique et motivante.",
    duration: '45min',
    accessories: "Serviette, chaussures propres et bouteille d'eau",
    public: 'Pour tout public'
  },

  // ── 3. CARDIO TRAINING ──
  {
    category: 3,
    name: 'Cardio Training',
    icon: <LuHeartPulse size={30} strokeWidth={1.2} />,
    publicId: "cws-site/cardio-training",
    short: 'Développez votre moteur.',
    desc: "Un entraînement spécifiquement conçu pour améliorer vos capacités cardiovasculaires et respiratoires grâce à l'utilisation d'ergomètres (rameur, SkiErg, Bike...) et d'exercices cardio variés. Idéal pour développer son endurance et brûler un maximum de calories.",
    duration: '45min',
    accessories: "Serviette, gants et bouteille d'eau",
    public: 'Pour tout public'
  },
  {
    category: 3,
    name: 'Boxing Bag',
    icon: <LuSwords size={30} strokeWidth={1.2} />,
    publicId: "cws-site/boxing-bag",
    short: 'Puissance, technique et explosivité.',
    desc: "Un cours sur sac de frappe inspiré de la boxe anglaise et du Muay Thaï. Accessible à tous, il permet d'apprendre les techniques de frappe tout en développant coordination, endurance, explosivité et condition physique dans une ambiance énergique.",
    duration: '45min',
    accessories: "Serviette, gants et bouteille d'eau",
    public: 'Pour tout public'
  },
  {
    category: 3,
    name: 'Masterclass',
    icon: <LuAward size={30} strokeWidth={1.2} />,
    publicId: "cws-site/masterclass",
    short: "L'entraînement ultime.",
    desc: "Inspiré de l'univers Hyrox®, ce cours associe course, ergomètres, exercices fonctionnels et ateliers de préparation physique. Que votre objectif soit le loisir ou la compétition, développez votre endurance, votre force fonctionnelle et votre capacité à enchaîner les efforts.",
    duration: '45min',
    accessories: "Serviette, chaussures propres et bouteille d'eau",
    public: 'Pour tout public'
  },
  {
    category: 3,
    name: 'Cross Biking',
    icon: <LuBike size={30} strokeWidth={1.2} />,
    publicId: "cws-site/cross-biking",
    short: 'Pédalez. Renforcez. Dépassez-vous.',
    desc: "Un cours rythmé alternant des séquences de biking en musique avec des exercices de renforcement du haut du corps et du centre du corps. Une séance complète permettant de solliciter l'ensemble de l'organisme tout en maximisant la dépense calorique.",
    duration: '45min',
    accessories: "Serviette, chaussures propres et bouteille d'eau",
    public: 'Pour tout public'
  },
  {
    category: 3,
    name: 'Cross Training Cardio',
    icon: <LuTimer size={30} strokeWidth={1.2} />,
    publicId: "cws-site/sprint",
    short: "L'intensité au service de votre endurance.",
    desc: "Un entraînement en circuits alternant différents ateliers cardio et fonctionnels, avec un accent particulier sur le développement de l'endurance cardiovasculaire. Les exercices et les charges sont adaptés à chacun afin de progresser efficacement tout en maintaining une intensité élevée.",
    duration: '45min',
    accessories: "Serviette, chaussures propres et bouteille d'eau",
    public: 'Pour tout public'
  },
];

/* ─── Jauge circulaire SVG animée ───────────────────────────── */
const CategoryGauge = ({ count, accent, isVisible }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * 0.25;

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
        <span style={{ fontFamily: DISPLAY }} className="text-3xl leading-none text-white">{count}</span>
        <span className="mt-1 text-[0.55rem] uppercase tracking-[0.15em] text-white/40">{count > 1 ? 'thèmes' : 'thème'}</span>
      </div>
    </div>
  );
};

/* ─── Carte cours (LazyImage + expandable) ──────────────────── */
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

      {/* ══════════════════════════════════════════
          ZONE VISUELLE — LazyImage (photo) ou icône (fallback)
      ══════════════════════════════════════════ */}
      <div className="relative h-48 overflow-hidden bg-[#111]">
        {(course.publicId || course.image) ? (
          // --- PHOTO avec LazyImage (lazy + fade-in crème) ---
          <div className="relative h-full w-full">
            <LazyImage
              publicId={course.publicId}
              src={course.image}
              width={800}
              alt={course.name}
              className="h-full w-full"
              imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
          </div>
        ) : (
          // --- ICÔNE (fallback) ---
          <div className={`h-full w-full flex items-center justify-center relative ${
            course.category === 1 ? 'bg-gradient-to-br from-[#d4cfc7]/[0.08] to-transparent' :
            course.category === 2 ? 'bg-gradient-to-br from-[#b3a996]/[0.10] to-transparent' :
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

      {/* ══════════════════════════════════════════
          CONTENU TEXTE
      ══════════════════════════════════════════ */}
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

  const [activeCategory, setActiveCategory] = useState(1);
  const [expandedCard, setExpandedCard] = useState(null);

  const currentCategory = categories.find(c => c.id === activeCategory);
  const filteredCourses = useMemo(() => courses.filter(c => c.category === activeCategory), [activeCategory]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!selectorVisible) return;
    let v = 0;
    const target = 30;
    const stepTime = 1500 / target;
    const t = setInterval(() => {
      v += 1;
      if (v >= target) { v = target; clearInterval(t); }
      setCount(v);
    }, stepTime);
    return () => clearInterval(t);
  }, [selectorVisible]);

  useEffect(() => { setExpandedCard(null); }, [activeCategory]);

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a]">

      <style>{`
        @keyframes ac-pulse{0%,100%{opacity:.3}50%{opacity:.6}}
        .ac-glow{animation:ac-pulse 4s ease-in-out infinite}
        @media (prefers-reduced-motion: reduce){.ac-glow{animation:none!important}}
      `}</style>

      <motion.div
        animate={{ background: currentCategory.glow }}
        transition={{ duration: 0.8 }}
        className="ac-glow pointer-events-none fixed top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[140px] z-0"
      />

      {/* ══════════════════════════════════════════
          1. HERO — LazyImage eager (priorité + fade-in, pas de flash)
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={heroVisible ? { scale: 1 } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <LazyImage
            publicId="cws-site/cours-collectifs"
            width={1600}
            alt="Cours collectifs CWS"
            eager
            className="w-full h-full opacity-45"
            imgClassName="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 z-[1] bg-[#0a0a0a]/70" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#d4cfc7]/[0.06] blur-[130px] z-[2]" />

        <div className="relative z-10 mx-auto max-w-[1100px] w-full px-6 sm:px-10 lg:px-16 pt-28 pb-24 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ fontFamily: SERIF }}
            className="mb-7 text-2xl md:text-3xl italic text-[#d4cfc7]"
          >
            #TrainBetter
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: DISPLAY }}
            className="mb-8 text-[clamp(2.2rem,8vw,3rem)] uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl lg:text-[6.5rem]"
          >
            <span className="block" style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(212,207,199,0.7)' }}>Les cours</span>
            <span className="text-white block">collectifs</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 max-w-[60ch] text-[1.05rem] md:text-lg font-light italic leading-relaxed text-white/75"
          >
            Chez CWS, retrouvez plus de 30 cours variés avec des coachs diplômés et qualifiés pour corriger vos mouvements et pour vous donner l'énergie nécessaire afin d'atteindre vos objectifs.
          </motion.p>

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
              <div key={i} className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 py-2.5">
                <span className="text-xs sm:text-sm font-medium tracking-wide text-white/75">{point}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.a
          href="#selecteur"
          initial={{ opacity: 0 }}
          animate={heroVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <LuChevronDown size={20} className="text-white/30 group-hover:text-[#d4cfc7] transition-colors duration-500" />
          </motion.div>
        </motion.a>
      </section>

      {/* ══════════════════════════════════════════
          2. SÉLECTEUR DE CATÉGORIE INTERACTIF
      ══════════════════════════════════════════ */}
      <section id="selecteur" ref={selectorRef} className="relative w-full overflow-hidden py-16 md:py-20">
        <div className="relative z-10 mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">

          <div className="mb-12 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={selectorVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-5 flex items-center gap-3"
              >
                <em style={{ fontFamily: SERIF }} className="text-base tracking-[0.14em] uppercase text-[#b3a996] italic">
                  + de <span style={{ fontFamily: DISPLAY }} className="not-italic text-white">{count}</span> cours / semaine
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
                  animate={{ color: currentCategory.accent }}
                  transition={{ duration: 0.5 }}
                >
                  catégorie
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
                <motion.p animate={{ color: currentCategory.accent }} style={{ fontFamily: DISPLAY }} className="text-xl uppercase leading-none">{currentCategory.label}</motion.p>
                <p className="mt-1 text-sm italic text-white/50 max-w-[320px]">{currentCategory.subtitle}</p>
              </div>
              <CategoryGauge count={filteredCourses.length} accent={currentCategory.accent} isVisible={selectorVisible} />
            </motion.div>
          </div>

          {/* Sélecteur 3 Catégories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={selectorVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="group relative overflow-hidden rounded-2xl border px-5 py-5 md:px-6 md:py-6 text-left transition-all duration-500 cursor-pointer"
                  style={{
                    borderColor: isActive ? cat.accent : 'rgba(255,255,255,0.08)',
                    background: isActive ? `${cat.accent}14` : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <motion.div
                    animate={{ width: isActive ? '100%' : '0%', backgroundColor: cat.accent }}
                    transition={{ duration: 0.6 }}
                    className="absolute bottom-0 left-0 h-1"
                  />
                  <div className="flex items-center gap-3 mb-1.5">
                    <span style={{ color: isActive ? cat.accent : 'rgba(255,255,255,0.4)' }} className="transition-colors duration-300">{cat.icon}</span>
                    <span style={{ fontFamily: DISPLAY, color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }} className="text-base md:text-lg uppercase tracking-tight transition-colors duration-300">
                      {cat.label}
                    </span>
                  </div>
                  <p className="text-[0.75rem] md:text-xs italic text-white/40 pl-8 line-clamp-2 leading-relaxed">{cat.subtitle}</p>
                </button>
              );
            })}
          </motion.div>

          {/* Description complète de la gamme */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-12 border-l-2 pl-4 py-1 text-sm md:text-base leading-relaxed text-white/60 italic max-w-3xl"
            style={{ borderColor: currentCategory.accent }}
          >
            {currentCategory.desc}
          </motion.div>

          {/* Grille des Cours — flexbox + dernière ligne centrée + LazyImage */}
          <div className="flex flex-wrap justify-center gap-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
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
                      accent={currentCategory.accent}
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
            className="mt-10 text-center text-xs italic tracking-wide text-white/40 border-t border-white/[0.06] pt-6"
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