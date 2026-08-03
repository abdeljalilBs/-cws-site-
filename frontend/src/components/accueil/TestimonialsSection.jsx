import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import { LuChevronLeft, LuChevronRight, LuQuote, LuStar } from 'react-icons/lu';

const DISPLAY = "'Anton', sans-serif";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      text: "Excellente salle de sport ! Les coachs sont très chaleureux, professionnels et bienveillants. Les cours collectifs sont complets, dynamiques, toujours dans la bonne humeur ! L'ambiance est familiale. J'ai des courbatures tous les jours depuis que je me suis inscrite mais j'y retourne toujours avec grand plaisir !",
      name: "Alida D.",
      role: "Adhérente depuis 2023",
      initials: "AD",
      stars: 5,
    },
    {
      text: "Adhérente depuis 6 mois, j'ai repris une activité sportive après 2 ans d'arrêt à cause de mes problèmes de dos. J'ai trouvé des machines de qualité, des cours collectifs variés mais surtout des coachs bienveillants qui vous aident à réaliser vos objectifs et une ambiance familiale.",
      name: "Estelle D.",
      role: "Adhérente depuis 6 mois",
      initials: "ED",
      stars: 5,
    },
    {
      text: "Des profs au top qui s'adaptent au niveau et aux exigences sportives de chacun. Je suis venu pour faire du complément à mon sport principal et j'ai vraiment trouvé mon bonheur. En plus les plages horaires sont vraiment adaptées et les activités variées pour ceux ou celles qui ont peu de temps ! Efficace et rapide ! Du sur mesure ! Je recommande vivement. Bravo CWS",
      name: "Bruno F.",
      role: "Adhérent depuis 1 an",
      initials: "BF",
      stars: 5,
    },
  ];

  const N = testimonials.length;

  const goTo = useCallback((newIndex, dir = 1) => {
    setDirection(dir);
    setActiveIndex(((newIndex % N) + N) % N);
  }, [N]);

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % N);
  }, [N]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + N) % N);
  }, [N]);

  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [isPaused, isInView, goNext]);

  const cardVariants = {
    enter: (dir) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  };

  const current = testimonials[activeIndex];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-white py-24 md:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Dégradé haut + grain (identique AboutSection) ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#f5f4f1] to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">

        {/* ══════════════════════════════════════════
            HEADER (titre + sous-titre)
        ══════════════════════════════════════════ */}
        <div className="mb-12 md:mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#d4cfc7]" />
              <em className="text-xs font-semibold tracking-[0.18em] uppercase text-[#b3a996] italic">
                #TrainBetter
              </em>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontFamily: DISPLAY }}
              className="max-w-[14ch] text-[2.4rem] uppercase leading-[0.94] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl lg:text-[4.4rem]"
            >
              Ce qu'en pensent{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">nos clients</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute -left-0.5 -right-0.5 bottom-[0.12em] z-0 h-[0.34em] origin-left bg-[#d4cfc7]"
                />
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-[34ch] pb-1 text-[1.02rem] font-light leading-relaxed text-[#565656]"
          >
            Des histoires vraies, des résultats concrets. Découvrez pourquoi nos adhérents nous font confiance depuis des années.
          </motion.p>
        </div>

        {/* ══════════════════════════════════════════
            CONTENU — Contrôles gauche + Carte droite
        ══════════════════════════════════════════ */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-[4.5rem]">

          {/* ── COLONNE GAUCHE — Compteur + dots + flèches ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-8"
          >
            {/* Compteur géant */}
            <div className="flex items-baseline gap-3">
              <span
                style={{ fontFamily: DISPLAY }}
                className="text-[5rem] sm:text-[6rem] md:text-[7rem] leading-none text-[#0a0a0a]"
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-[#d4cfc7] text-2xl font-light">/</span>
              <span
                style={{ fontFamily: DISPLAY }}
                className="text-3xl text-[#d4cfc7]"
              >
                {String(N).padStart(2, '0')}
              </span>
            </div>

            {/* Barre de progression */}
            <div className="relative w-full max-w-[200px] h-[3px] rounded-full bg-[#0a0a0a]/10 overflow-hidden">
              {!isPaused && (
                <motion.div
                  key={`bar-${activeIndex}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 6, ease: 'linear' }}
                  className="absolute inset-0 origin-left bg-[#0a0a0a] rounded-full"
                />
              )}
              {isPaused && (
                <div className="absolute inset-0 bg-[#0a0a0a] rounded-full" />
              )}
            </div>

            {/* Dots */}
            <div className="flex items-center gap-4">
              {testimonials.map((t, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index, index > activeIndex ? 1 : -1)}
                  className="group flex items-center gap-2.5"
                  aria-label={`Avis de ${t.name}`}
                >
                  <span
                    className={`block rounded-full transition-all duration-400 ${
                      index === activeIndex
                        ? 'w-3 h-3 bg-[#0a0a0a]'
                        : 'w-2.5 h-2.5 bg-[#0a0a0a]/15 group-hover:bg-[#d4cfc7]'
                    }`}
                  />
                  <span
                    className={`text-xs font-semibold tracking-wide transition-colors duration-300 ${
                      index === activeIndex
                        ? 'text-[#0a0a0a]'
                        : 'text-[#0a0a0a]/25 group-hover:text-[#b3a996]'
                    }`}
                  >
                    {t.initials}
                  </span>
                </button>
              ))}
            </div>

            {/* Flèches */}
            <div className="flex items-center gap-3">
              <button
                onClick={goPrev}
                className="w-12 h-12 rounded-full border border-[#0a0a0a]/12 flex items-center justify-center text-[#0a0a0a]/40 hover:text-white hover:bg-[#0a0a0a] hover:border-[#0a0a0a] transition-all duration-300 hover:scale-110"
                aria-label="Avis précédent"
              >
                <LuChevronLeft size={20} />
              </button>
              <button
                onClick={goNext}
                className="w-12 h-12 rounded-full border border-[#0a0a0a]/12 flex items-center justify-center text-[#0a0a0a]/40 hover:text-white hover:bg-[#0a0a0a] hover:border-[#0a0a0a] transition-all duration-300 hover:scale-110"
                aria-label="Avis suivant"
              >
                <LuChevronRight size={20} />
              </button>
            </div>
          </motion.div>

          {/* ── COLONNE DROITE — Carte témoignage ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            {/* Panneau noir incliné derrière */}
            <div
              className="absolute inset-y-[3%] left-[3%] right-[-3%] rounded-2xl bg-[#0a0a0a]"
              style={{ transform: 'rotate(1.5deg)' }}
            />

            {/* Carte principale */}
            <div className="relative z-10 rounded-2xl bg-white border border-black/[0.06] px-6 sm:px-10 md:px-12 pt-10 md:pt-12 pb-8 md:pb-10 overflow-hidden shadow-[0_30px_70px_-25px_rgba(0,0,0,0.2)]">

              {/* Reflet en haut */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4cfc7]/50 to-transparent" />

              {/* Guillemet */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                className="mb-7"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#0a0a0a] flex items-center justify-center shadow-lg">
                  <LuQuote size={22} className="text-[#d4cfc7]" />
                </div>
              </motion.div>

              {/* Avis */}
              <div className="relative min-h-[190px] sm:min-h-[170px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full"
                  >
                    {/* Étoiles */}
                    <div className="flex items-center gap-1 mb-5">
                      {Array.from({ length: current.stars }).map((_, i) => (
                        <motion.div
                          key={`${activeIndex}-${i}`}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + i * 0.07, duration: 0.35 }}
                        >
                          <LuStar size={16} className="text-[#d4af37] fill-[#d4af37]" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Texte */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-[#444] text-[0.95rem] sm:text-base md:text-[1.05rem] italic leading-relaxed mb-7 font-light"
                    >
                      "{current.text}"
                    </motion.p>

                    {/* Avatar + Nom */}
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.45 }}
                      className="flex items-center gap-4 border-t border-black/[0.06] pt-5"
                    >
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-[#0a0a0a] flex items-center justify-center shadow-md">
                          <span className="text-[#d4cfc7] font-black text-xs tracking-wide">
                            {current.initials}
                          </span>
                        </div>
                        <motion.svg
                          viewBox="0 0 100 100"
                          className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)]"
                          animate={reduce ? {} : { rotate: 360 }}
                          transition={reduce ? {} : { duration: 22, repeat: Infinity, ease: 'linear' }}
                        >
                          <circle
                            cx="50" cy="50" r="47"
                            fill="none" stroke="#d4cfc7" strokeWidth="1.5"
                            strokeDasharray="2 6" strokeLinecap="round"
                            opacity="0.4"
                          />
                        </motion.svg>
                      </div>

                      <div>
                        <p
                          style={{ fontFamily: DISPLAY }}
                          className="text-[1rem] uppercase tracking-[0.03em] text-[#0a0a0a]"
                        >
                          {current.name}
                        </p>
                        <p className="text-[#b3a996] text-[0.7rem] tracking-[0.15em] uppercase mt-0.5 font-semibold">
                          {current.role}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;