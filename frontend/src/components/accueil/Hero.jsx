import { motion } from 'framer-motion';
import { LuChevronDown, LuArrowRight } from 'react-icons/lu';

const Hero = () => {
  // ─── Variants d'animation ──────────────────────────────────
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        delay: i * 0.25,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: (i = 0) => ({
      opacity: 1,
      transition: {
        duration: 1,
        delay: i * 0.25,
      },
    }),
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* ══════════════════════════════════════════
          VIDÉO DE FOND
      ══════════════════════════════════════════ */}
      <video
        id="hero-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        {/* On garde uniquement le MP4 */}
        <source src="/hero-video.mp4" type="video/mp4" />
        Ton navigateur ne supporte pas la vidéo.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent z-[1]" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent z-[1]" />

      {/* Contenu */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-8 md:mb-10"
        >
          <span className="text-[#d4cfc7] text-sm sm:text-base md:text-lg font-semibold italic tracking-[0.1em] uppercase drop-shadow-lg">
            "Ne confiez jamais votre corps à des amateurs"
          </span>
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mb-3 md:mb-4"
        >
          <h1 className="text-white font-black uppercase leading-[1] tracking-[0.08em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Coach Wellness
          </h1>

          <h1 className="text-white font-black uppercase leading-[1] tracking-[0.08em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-1">
            Sports
          </h1>
        </motion.div>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mb-8 md:mb-10"
        >
          <span className="text-[#b8b0a4] text-xs sm:text-sm md:text-base tracking-[0.25em] uppercase font-semibold drop-shadow-lg">
            La Ville-aux-Dames
          </span>
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="w-16 md:w-20 h-[1px] bg-[#d4cfc7]/40 mb-10 md:mb-12 origin-center"
        />

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <a
            href="/tarifs"
            className="group relative inline-flex items-center justify-center rounded-full cursor-pointer"
          >
            <span className="absolute -inset-2 rounded-full bg-white/0 group-hover:bg-white/15 blur-xl transition-all duration-700" />

            <span className="absolute inset-0 rounded-full bg-[#0a0a0a]/70 backdrop-blur-md border border-white/20 group-hover:border-white/0 transition-all duration-500" />

            <span className="absolute inset-0 rounded-full bg-white scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />

            <span className="absolute inset-0 rounded-full overflow-hidden">
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 delay-300" />
            </span>

            <span className="absolute -inset-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.6) 25%, transparent 50%)",
                  animation: "spinSlow 3s linear infinite",
                }}
              />
              <span className="absolute inset-[3px] rounded-full bg-[#0a0a0a] group-hover:bg-white transition-colors duration-500" />
            </span>

            <span className="relative z-10 flex items-center justify-center px-12 py-4 md:px-14 md:py-4 text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] group-hover:text-[#0a0a0a] transition-colors duration-500">
              Découvrir

              <LuArrowRight
                size={14}
                className="absolute right-4 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400"
              />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.a
        href="#club"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <LuChevronDown
            size={16}
            className="text-white/25 group-hover:text-white/50 transition-colors duration-500"
          />
        </motion.div>
      </motion.a>

      <style>{`
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;