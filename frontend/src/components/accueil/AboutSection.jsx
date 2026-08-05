import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { LuShieldCheck, LuGraduationCap, LuClock } from 'react-icons/lu';

// ─── Images ──────────────────────────────────────────────────
import image3 from "../../assets/image-3.png";
import image10 from "../../assets/image-10.png";

const DISPLAY = "'Anton', sans-serif";

/* ─── Composant LazyImage (fade-in + placeholder au chargement) ─── */
const LazyImage = ({ src, alt, className, imgClassName }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      {/* Placeholder crème pulsé pendant le chargement */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#d4cfc7]/15 animate-pulse"
          />
        )}
      </AnimatePresence>

      <img
        src={src}
        alt={alt}
        loading="lazy"          // ⭐ lazy loading natif
        decoding="async"        // ⭐ décodage asynchrone (ne bloque pas le rendu)
        onLoad={() => setLoaded(true)}
        className={`w-full h-full transition-all duration-700 ease-out ${
          loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-md'
        } ${imgClassName || ''}`}
      />
    </div>
  );
};

const pillars = [
  {
    icon: <LuShieldCheck size={24} strokeWidth={1.5} />,
    title: 'Premium',
    description:
      "CWS est un club entièrement sécurisé, avec une ambiance conviviale et familiale, et des adhérents respectueux.",
  },
  {
    icon: <LuGraduationCap size={24} strokeWidth={1.5} />,
    title: 'Coachs formés en continu',
    description:
      "La qualité de notre concept passe par le professionnalisme de nos coachs. Tous sont diplômés, passionnés et à l'écoute de vos besoins.",
  },
  {
    icon: <LuClock size={24} strokeWidth={1.5} />,
    title: 'Ouvert 7j/7',
    description:
      "Votre salle est ouverte 7j/7 en accès libre : du lundi au dimanche, de 7h30 à 21h30.",
  },
];

const MARQUEE = ['Discipline', 'Expertise', 'Coachs diplômés', 'Ouvert 7j/7', 'Ambiance premium', 'Résultats'];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reduce = useReducedMotion();

  // Compteur 0 → 100 %
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let v = 0;
    const t = setInterval(() => {
      v += 4;
      if (v >= 100) { v = 100; clearInterval(t); }
      setCount(v);
    }, 20);
    return () => clearInterval(t);
  }, [isInView]);

  const float = reduce ? {} : { y: [0, -16, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } };

  return (
    <section id="about" ref={ref} className="relative w-full overflow-hidden bg-white py-24 md:py-32">
      {/* dégradé haut + grain */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#f5f4f1] to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── HEADER  */}
      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">
        <div className="mb-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-5 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-[#d4cfc7]" />
              <em className="text-xs font-semibold tracking-[0.18em] uppercase text-[#b3a996] italic">
                L'esprit CWS
              </em>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontFamily: DISPLAY }}
              className="max-w-[15ch] text-[2.4rem] uppercase leading-[0.94] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl lg:text-[4.4rem]"
            >
              Ne confiez jamais votre corps à des{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">amateurs</span>
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
            Un club pensé pour progresser sereinement, encadré par des coachs qui
            connaissent leur métier. <b className="font-semibold text-[#0a0a0a]">Pas d'improvisation</b> —
            juste les bons conseils, au bon moment.
          </motion.p>
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="group relative mb-14 overflow-hidden bg-[#0a0a0a]"
      >
        <div
          className="flex w-max"
          style={{ animation: reduce ? 'none' : 'cws-slide 26s linear infinite' }}
        >
          {[0, 1].map((k) => (
            <div key={k} className="flex items-center">
              {MARQUEE.map((word, i) => (
                <span
                  key={i}
                  style={{ fontFamily: DISPLAY }}
                  className="flex items-center whitespace-nowrap py-3 text-[0.95rem] uppercase tracking-[0.14em] text-white"
                >
                  {word}
                  <span className="mx-6 text-[#d4cfc7]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── CONTENT ─ */}
      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[4.5rem]">

          {/* STAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative mx-auto w-full max-w-[540px] lg:max-w-none"
            style={{ minHeight: 560 }}
          >
            {/* panneau noir incliné */}
            <div className="absolute inset-y-[2%] left-[2%] right-[-4%] rounded-2xl bg-[#0a0a0a]" style={{ transform: 'rotate(-2deg)' }} />

            {/* label vertical */}
            <span className="absolute left-[-6px] top-1/2 z-[5] -translate-y-1/2 -rotate-90 text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-black/25 select-none">
              À&nbsp;Propos
            </span>

            {/* photo arrière — LAZY LOADING */}
            <div className="group absolute left-[8%] top-[6%] z-[2] h-[58%] w-[70%] overflow-hidden rounded-xl shadow-[0_22px_50px_-18px_rgba(0,0,0,0.55)]">
              <LazyImage
                src={image3}
                alt="Coaching CWS"
                className="h-full w-full"
                imgClassName="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
            </div>

            {/* cadre taupe */}
            <div className="absolute bottom-[8%] right-[6%] z-[2] h-[58%] w-[70%] rounded-xl border border-[#d4cfc7]" />

            {/* photo avant flottante — LAZY LOADING */}
            <div className="absolute bottom-[6%] right-[4%] z-[3] h-[58%] w-[70%]">
              <motion.div
                animate={float}
                className="group h-full w-full overflow-hidden rounded-xl border-4 border-white shadow-[0_34px_60px_-22px_rgba(0,0,0,0.65)]"
              >
                <LazyImage
                  src={image10}
                  alt="Ambiance CWS"
                  className="h-full w-full"
                  imgClassName="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
              </motion.div>
            </div>

            {/* sceau */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute right-[-7%] top-[44%] z-[6] h-[118px] w-[118px] -translate-y-1/2"
            >
              <motion.svg
                viewBox="0 0 100 100" className="absolute inset-0 h-full w-full"
                animate={reduce ? {} : { rotate: 360 }}
                transition={reduce ? {} : { duration: 22, repeat: Infinity, ease: 'linear' }}
              >
                <circle cx="50" cy="50" r="47" fill="none" stroke="#d4cfc7" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />
              </motion.svg>
              <div className="absolute inset-[11%] flex flex-col items-center justify-center rounded-full bg-[#0a0a0a] text-center text-white shadow-[0_14px_30px_-8px_rgba(0,0,0,0.5)]">
                <span style={{ fontFamily: DISPLAY }} className="text-[1.7rem] leading-none">{count}%</span>
                <span className="mt-[5px] text-[0.5rem] leading-tight tracking-[0.16em] uppercase text-[#d4cfc7]">
                  Coachs<br />diplômés
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* PILLARS */}
          <div className="flex flex-col">
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 26 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                className={`group relative grid grid-cols-[auto_1fr] items-start gap-[1.1rem] border-t border-black/10 py-6 transition-[padding] duration-300 hover:pl-3 ${
                  i === pillars.length - 1 ? 'border-b' : ''
                }`}
              >
                {/* filet supérieur animé au survol */}
                <span className="absolute left-0 top-[-1px] h-px w-0 bg-[#0a0a0a] transition-[width] duration-500 group-hover:w-full group-hover:bg-[#b3a996]" />

                <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[10px] border border-black/[0.12] text-[#0a0a0a] transition-all duration-300 group-hover:border-[#0a0a0a] group-hover:bg-[#0a0a0a] group-hover:text-white">
                  {p.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: DISPLAY }} className="mb-2 text-[1.05rem] uppercase tracking-[0.03em] text-[#0a0a0a]">
                    {p.title}
                  </h3>
                  <p className="text-[0.9rem] leading-relaxed text-[#565656]">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes cws-slide{to{transform:translateX(-50%)}}`}</style>
    </section>
  );
};

export default AboutSection;