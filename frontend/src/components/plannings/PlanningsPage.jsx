import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { LuDownload, LuCalendarDays, LuArrowRight, LuChevronRight } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage';

const DISPLAY = "'Anton', sans-serif";
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";

/* ─── Page Plannings ────────────────────────────────────────── */
const PlanningsPage = () => {
  const heroRef = useRef(null);
  const visualRef = useRef(null);
  const ctaRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: '-60px' });
  const isVisualInView = useInView(visualRef, { once: true, margin: '-80px' });
  const isCtaInView = useInView(ctaRef, { once: true, margin: '-80px' });

  // FIX mounted (évite page vide au routage)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const heroVisible = isHeroInView || mounted;
  const visualVisible = isVisualInView || mounted;
  const ctaVisible = isCtaInView || mounted;

  const float = {};

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a]">

      <style>{`
        .pl-stroke{color:transparent;-webkit-text-stroke:1.5px rgba(212,207,199,.5)}
      `}</style>

      {/* ══════════════════════════════════════════
          1. HERO — Façade CWS + titre
      ══════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full min-h-[78dvh] flex items-center justify-center overflow-hidden pt-[calc(5rem+env(safe-area-inset-top,0px))] pb-[calc(2rem+env(safe-area-inset-bottom,0px))]">
        {/* Image de fond — EAGER (visible immédiatement, priorité) */}
        <motion.div
          initial={{ scale: 1.12 }}
          animate={heroVisible ? { scale: 1 } : {}}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <LazyImage
            publicId="cws-site/image-5"
            width={1600}
            alt="CWS"
            eager
            className="w-full h-full"
            imgClassName="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 z-[1] bg-[#0a0a0a]/70" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#d4cfc7]/[0.05] blur-[120px] z-[2]" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6 flex items-center gap-3"
          >
            <em style={{ fontFamily: SERIF }} className="text-base tracking-[0.14em] uppercase text-[#b3a996] italic">
              + de 30 cours / semaine
            </em>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: DISPLAY }}
            className="text-[clamp(2.2rem,8vw,2.8rem)] uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            <span className="text-white block">Planning</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 max-w-[40ch] text-[1rem] font-light leading-relaxed text-white/60"
          >
            Des cours collectifs variés, encadrés par des coachs diplômés, du lundi au dimanche. Trouvez le créneau qui vous ressemble.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. LE PLANNING VISUEL — Image premium + téléchargement
      ══════════════════════════════════════════ */}
      <section ref={visualRef} className="relative w-full overflow-hidden bg-[#0a0a0a] py-24 md:py-32">
        <span className="pl-a1 pointer-events-none absolute top-[-120px] left-1/2 -translate-x-1/2 h-[480px] w-[680px] rounded-full bg-[#d4cfc7] opacity-[0.04] blur-[120px] z-0" />

        <div className="relative z-10 mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">
          {/* Header */}
          <div className="mb-14 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visualVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-5 flex items-center gap-3"
            >
              <em style={{ fontFamily: SERIF }} className="text-base tracking-[0.14em] uppercase text-[#b3a996] italic">
                Cours collectifs
              </em>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={visualVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontFamily: DISPLAY }}
              className="text-[2.2rem] uppercase leading-[0.94] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.8rem]"
            >
              Planning des cours collectifs
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={visualVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 max-w-[44ch] text-[1rem] font-light leading-relaxed text-[#8a8279]"
            >
              Plus de 30 cours variés chaque semaine. Intensité, douceur, cardio ou renforcement, il y en a pour tous les niveaux. Téléchargez le planning complet ci-dessous.
            </motion.p>
          </div>

          {/* Image du planning — pièce premium — LAZY LOADING */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={visualVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group relative mx-auto max-w-4xl"
          >
            {/* Halo derrière */}
            <div className="absolute -inset-6 rounded-3xl bg-[#d4cfc7]/[0.06] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <motion.div
              animate={float}
              className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)]"
            >
              {/* Liseré lumineux haut */}
              <div className="absolute top-0 left-0 right-0 h-px z-10 bg-gradient-to-r from-transparent via-[#d4cfc7]/40 to-transparent" />
              <LazyImage
                publicId="cws-site/plannings"
                width={1200}
                alt="Planning des cours collectifs CWS"
                className="w-full h-auto"
                imgClassName="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
              />
            </motion.div>

            {/* Bouton Télécharger (flottant, centré en bas) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={visualVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex justify-center"
            >
              <a
                href={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'qupvgw44'}/image/upload/cws-site/plannings.png`}
                download="Planning cours collectifs CWS.png"
                className="group/dl relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#d4cfc7] px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-500 hover:bg-white"
              >
                <span className="absolute inset-0 overflow-hidden">
                  <span className="absolute inset-0 -translate-x-full group-hover/dl:translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-in-out" />
                </span>
                <LuDownload size={15} className="relative z-10" />
                <span className="relative z-10">Télécharger le planning</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. CTA FINAL — Réservez votre place
      ══════════════════════════════════════════ */}
      <section ref={ctaRef} className="relative w-full overflow-hidden bg-[#f5f4f1] py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16 flex flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: DISPLAY }}
            className="mb-5 text-[2.2rem] uppercase leading-[0.95] tracking-tight text-[#0a0a0a] sm:text-4xl md:text-5xl"
          >
            Prêt à réserver votre place&nbsp;?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-9 max-w-[42ch] text-[1rem] font-light leading-relaxed text-[#565656]"
          >
            Rejoignez CWS et accédez à tous nos cours collectifs en illimité, encadrés par des coachs diplômés.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/tarifs"
              className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#0a0a0a] px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#f5f4f1] transition-all duration-500 hover:bg-[#1a1a1a]"
            >
              <span className="absolute inset-0 overflow-hidden">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
              </span>
              <span className="relative z-10">Voir les offres</span>
              <LuArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full border border-[#0a0a0a]/20 px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-500 hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white"
            >
              <span className="relative z-10">Nous contacter</span>
              <LuChevronRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default PlanningsPage;