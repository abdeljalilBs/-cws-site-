import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { LuArrowRight } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage';

const DISPLAY = "'Anton', sans-serif";

const coaches = [
  {
    image: null,
    name: 'NOUVELLE ÉQUIPE',
    role: 'Bientôt disponible',
  },
  {
    image: null,
    name: 'NOUVEAUX COACHS',
    role: 'Prochainement',
  },
];

const CoachCard = ({ coach, index, isInView, reduce }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 + index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative grid items-center gap-10 lg:gap-16 ${
        isReversed ? 'lg:grid-cols-[1fr_1.1fr]' : 'lg:grid-cols-[1.1fr_1fr]'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ══════════════════════════════════════════
          STAGE PHOTO
      ══════════════════════════════════════════ */}
      <div
        className={`relative mx-auto w-full max-w-[420px] lg:max-w-none ${
          isReversed ? 'lg:order-2' : 'lg:order-1'
        }`}
        style={{ minHeight: 480 }}
      >
        {/* Panneau noir incliné derrière */}
        <motion.div
          animate={isHovered && !reduce ? { rotate: isReversed ? 1 : -1, scale: 1.02 } : { rotate: isReversed ? 2 : -2, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute inset-y-[3%] left-[4%] right-[-2%] rounded-2xl bg-[#0a0a0a]"
          style={{ transform: `rotate(${isReversed ? 2 : -2}deg)` }}
        />

        {/* Cadre taupe décalé (profondeur) */}
        <motion.div
          animate={isHovered && !reduce ? { x: isReversed ? -6 : 6, y: -6 } : { x: 0, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute bottom-[6%] right-[8%] z-[2] h-[82%] w-[78%] rounded-xl border border-[#d4cfc7]"
        />

        {/* Photo principale — LAZY LOADING ou Placeholder */}
        <motion.div
          animate={isHovered && !reduce ? { y: -10, scale: 1.02 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="group absolute left-[6%] top-[4%] z-[3] h-[84%] w-[80%] overflow-hidden rounded-xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] bg-[#111]"
        >
          {(coach.publicId || coach.image) ? (
            <LazyImage
              publicId={coach.publicId}
              src={coach.image}
              width={800}
              alt={coach.name}
              className="h-full w-full"
              imgClassName="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-6 text-center">
               <span className="text-sm uppercase tracking-[0.2em] font-semibold text-white/30 italic">En cours de recrutement...</span>
            </div>
          )}
          {/* Overlay dégradé bas sur la photo */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
        </motion.div>

        {/* Numéro géant décoratif */}
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 + index * 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{ fontFamily: DISPLAY }}
          className={`absolute z-[4] text-[7rem] sm:text-[8rem] leading-none text-[#0a0a0a]/[0.06] select-none pointer-events-none ${
            isReversed ? '-left-4 top-0' : '-right-2 bottom-0'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>

        {/* Sceau / badge rond CWS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 + index * 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className={`absolute z-[5] h-[88px] w-[88px] ${
            isReversed ? 'left-[-4%] top-[42%]' : 'right-[-4%] top-[42%]'
          } -translate-y-1/2`}
        >
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            animate={reduce ? {} : { rotate: 360 }}
            transition={reduce ? {} : { duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="50" cy="50" r="47" fill="none" stroke="#d4cfc7" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />
          </motion.svg>
          <div className="absolute inset-[12%] flex flex-col items-center justify-center rounded-full bg-[#0a0a0a] text-center text-white shadow-[0_14px_30px_-8px_rgba(0,0,0,0.5)]">
            <span style={{ fontFamily: DISPLAY }} className="text-[1.1rem] leading-none">CWS</span>
            <span className="mt-[3px] text-[0.42rem] leading-tight tracking-[0.14em] uppercase text-[#d4cfc7]">
              Coach<br />certifié
            </span>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          CONTENU TEXTE — Juste nom + rôle
      ══════════════════════════════════════════ */}
      <div className={`flex flex-col ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
        {/* Eyebrow rôle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
          className="mb-4 flex items-center gap-3"
        >
          <em className="text-xs font-semibold tracking-[0.18em] uppercase text-[#b3a996] italic">
            {coach.role}
          </em>
        </motion.div>

        {/* Nom (typo Anton) */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 + index * 0.2 }}
          style={{ fontFamily: DISPLAY }}
          className="text-[2.6rem] uppercase leading-[0.92] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-[3.4rem]"
        >
          {coach.name}
        </motion.h3>
      </div>

      {/* ── Filet séparateur animé (sauf dernière carte) ── */}
      {index < coaches.length - 1 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
          className="absolute -bottom-10 left-0 right-0 hidden h-px origin-left bg-gradient-to-r from-[#d4cfc7]/40 via-[#0a0a0a]/10 to-transparent lg:block"
        />
      )}
    </motion.div>
  );
};

const CoachesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reduce = useReducedMotion();

  return (
    <section id="coachs" ref={ref} className="relative w-full overflow-hidden bg-white py-24 md:py-32">
      {/* ── Dégradé haut + grain ── */}
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
            HEADER
        ══════════════════════════════════════════ */}
        <div className="mb-16 md:mb-24 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-5 flex items-center gap-3"
            >
              <em className="text-xs font-semibold tracking-[0.18em] uppercase text-[#b3a996] italic">
                L'équipe
              </em>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontFamily: DISPLAY }}
              className="max-w-[12ch] text-[clamp(2rem,7vw,2.4rem)] uppercase leading-[0.94] tracking-tight text-[#0a0a0a] sm:text-5xl md:text-6xl lg:text-[4.4rem]"
            >
              Les coachs{' '}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">CWS</span>
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
            className="max-w-[36ch] pb-1 text-[1.02rem] font-light leading-relaxed text-[#565656]"
          >
            Diplômés, passionnés et à votre écoute. Nos coachs sont le cœur de CWS.
          </motion.p>
        </div>

        {/* ══════════════════════════════════════════
            LISTE DES COACHS
        ══════════════════════════════════════════ */}
        <div className="flex flex-col gap-20 md:gap-28">
          {coaches.map((coach, index) => (
            <CoachCard
              key={coach.name}
              coach={coach}
              index={index}
              isInView={isInView}
              reduce={reduce}
            />
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            BOUTON "EN SAVOIR PLUS SUR LA TEAM" — Aligné à gauche
        ══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-20 md:mt-28 flex justify-center md:justify-end"
        >
          <Link
            to="/coachs"
            className="group relative inline-flex items-center justify-center rounded-full cursor-pointer"
          >
            {/* Couche 1 : Glow externe au hover */}
            <span className="absolute -inset-2 rounded-full bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/10 blur-xl transition-all duration-700" />

            {/* Couche 2 : Fond noir + bordure */}
            <span className="absolute inset-0 rounded-full bg-[#0a0a0a] border border-[#0a0a0a] group-hover:border-[#0a0a0a]/0 transition-all duration-500" />

            {/* Couche 3 : Remplissage crème depuis le centre au hover */}
            <span className="absolute inset-0 rounded-full bg-[#f5f4f1] scale-0 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] origin-center" />

            {/* Couche 4 : Shimmer qui traverse */}
            <span className="absolute inset-0 rounded-full overflow-hidden">
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-in-out delay-300" />
            </span>

            {/* Couche 5 : Anneau rotatif lumineux */}
            <span className="absolute -inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0%, rgba(245,244,241,0.5) 25%, transparent 50%)',
                  animation: 'spinSlowTeam 3s linear infinite',
                }}
              />
              <span className="absolute inset-[3px] rounded-full bg-[#0a0a0a] group-hover:bg-[#f5f4f1] transition-colors duration-500" />
            </span>

            {/* Couche 6 : Texte centré + flèche */}
            <span className="relative z-10 flex items-center justify-center px-10 py-4 md:px-12 md:py-4 text-[#f5f4f1] text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] group-hover:text-[#0a0a0a] transition-colors duration-500">
              En savoir plus sur la team
              <LuArrowRight
                size={15}
                className="absolute right-5 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400"
              />
            </span>

            {/* Particules aux 4 points cardinaux */}
            <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/40 transition-all duration-500 delay-200" />
            <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/40 transition-all duration-500 delay-300" />
            <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-1 h-1 rounded-full bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/40 transition-all duration-500 delay-400" />
            <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-1 h-1 rounded-full bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/40 transition-all duration-500 delay-500" />
          </Link>
        </motion.div>

      </div>

      {/* ══════════════════════════════════════════
          KEYFRAMES (anneau rotatif du bouton)
      ══════════════════════════════════════════ */}
      <style>{`
        @keyframes spinSlowTeam {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default CoachesSection;