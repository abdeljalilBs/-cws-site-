import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LuChevronsRight } from 'react-icons/lu';

const DISPLAY = "'Anton', sans-serif";

const CtaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="tarifs"
      ref={ref}
      className="relative w-full overflow-hidden bg-white py-24 md:py-32"
    >
      {/* ── Dégradé haut + grain (identique aux autres sections) ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#f5f4f1] to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start">

          {/* ── Eyebrow (même structure que les autres sections) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[#d4cfc7]" />
            <em className="text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-[#b3a996] italic">
              Club de sport premium à La Ville aux Dames (37)
            </em>
          </motion.div>

          {/* ── Titre géant style OUTLINE (contour noir, très grand) ── */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: DISPLAY }}
            className="mb-10 md:mb-12 text-[2rem] uppercase leading-[0.95] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.8rem]"
          >
            <span
              className="block"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1.5px #0a0a0a',
              }}
            >
              Coach Wellness
            </span>
            <span
              className="block"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1.5px #0a0a0a',
              }}
            >
              Sports
            </span>
          </motion.h2>

          {/* ══════════════════════════════════════════════════════
              BOUTON "REJOIGNEZ-NOUS" — Pilule noire WOW (rounded-full)
          ══════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <a
              href="/tarifs"
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
                    animation: 'spinSlowCta 3s linear infinite',
                  }}
                />
                <span className="absolute inset-[3px] rounded-full bg-[#0a0a0a] group-hover:bg-[#f5f4f1] transition-colors duration-500" />
              </span>

              {/* Couche 6 : Texte centré + double chevron */}
              <span className="relative z-10 flex items-center justify-center gap-3 px-10 py-4 md:px-12 md:py-4 text-[#f5f4f1] text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] group-hover:text-[#0a0a0a] transition-colors duration-500">
                Rejoignez-nous
                <LuChevronsRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>

              {/* Particules aux 4 points cardinaux */}
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/40 transition-all duration-500 delay-200" />
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/40 transition-all duration-500 delay-300" />
              <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-1 h-1 rounded-full bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/40 transition-all duration-500 delay-400" />
              <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-1 h-1 rounded-full bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/40 transition-all duration-500 delay-500" />
            </a>
          </motion.div>

        </div>
      </div>

      {/* ══════════════════════════════════════════
          KEYFRAMES (anneau rotatif du bouton)
      ══════════════════════════════════════════ */}
      <style>{`
        @keyframes spinSlowCta {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default CtaSection;