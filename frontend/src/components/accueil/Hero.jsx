import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuChevronDown, LuArrowRight } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Hero = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari iOS requiert explicitement muted et defaultMuted sur l'élément DOM
    video.defaultMuted = true;
    video.muted = true;

    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay bloqué (ex: mode économie d'énergie iOS)
        });
      }
    };

    attemptPlay();

    // En cas de blocage strict (ex: mode économie d'énergie), lance dès la 1ère interaction
    const handleInteraction = () => {
      if (video && video.paused) {
        video.play().catch(() => {});
      }
    };

    window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
    window.addEventListener('scroll', handleInteraction, { once: true, passive: true });
    window.addEventListener('click', handleInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, []);

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
      className="hero-section relative w-full h-[100dvh] min-h-[500px] max-w-full overflow-hidden bg-[#0a0a0a]"
      style={{ height: '100dvh', minHeight: '-webkit-fill-available' }}
    >
      {/* ══════════════════════════════════════════
          VIDÉO DE FOND
      ══════════════════════════════════════════ */}
      <video
        ref={videoRef}
        id="hero-video"
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        src="https://res.cloudinary.com/qupvgw44/video/upload/f_auto,q_auto/cws-site/hero-video"
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        aria-hidden="true"
      >
        Ton navigateur ne supporte pas la lecture de la vidéo.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent z-[1]" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a]/50 to-transparent z-[1]" />

      {/* Contenu */}
      <div
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        style={{
          paddingTop: 'calc(4rem + env(safe-area-inset-top, 0px))',
          paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))',
        }}
      >

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-6 md:mb-8"
        >
          <Link
            to="/plannings"
            id="hero-planning-tab"
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#0a0a0a]/60 hover:bg-black/90 backdrop-blur-xl border border-white/20 hover:border-[#d4cfc7]/60 text-white transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#d4cfc7] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em]">Planning</span>
            <span className="text-white/30 font-light">·</span>
            <span className="text-xs font-light text-[#d4cfc7] tracking-wide">+ de 30 cours / semaine</span>
            <LuArrowRight
              size={14}
              className="text-[#d4cfc7] group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mb-3 md:mb-4"
        >
          <h1 className="text-white font-black uppercase leading-[1] tracking-[0.08em] text-[clamp(2rem,8vw,4rem)] md:text-[clamp(3rem,6vw,5rem)] lg:text-6xl">
            Coach Wellness
          </h1>

          <h1 className="text-white font-black uppercase leading-[1] tracking-[0.08em] text-[clamp(2rem,8vw,4rem)] md:text-[clamp(3rem,6vw,5rem)] lg:text-6xl mt-1">
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
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Bouton Planning (accès direct prioritaire) */}
          <Link
            to="/plannings"
            className="group relative inline-flex items-center justify-center rounded-full cursor-pointer"
          >
            <span className="absolute -inset-2 rounded-full bg-white/0 group-hover:bg-white/15 blur-xl transition-all duration-700" />
            <span className="absolute inset-0 rounded-full bg-white group-hover:bg-[#f5f4f1] transition-all duration-500 shadow-[0_0_35px_rgba(255,255,255,0.2)]" />
            <span className="relative z-10 flex items-center justify-center px-10 py-3.5 md:px-12 md:py-4 text-[#0a0a0a] text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-colors duration-500">
              Planning
              <LuArrowRight
                size={14}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </span>
          </Link>

          {/* Bouton Découvrir */}
          <Link
            to="/tarifs"
            className="group relative inline-flex items-center justify-center rounded-full cursor-pointer"
          >
            <span className="absolute inset-0 rounded-full bg-[#0a0a0a]/70 backdrop-blur-md border border-white/20 group-hover:border-white/50 transition-all duration-300" />
            <span className="relative z-10 flex items-center justify-center px-10 py-3.5 md:px-12 md:py-4 text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] group-hover:text-white transition-colors duration-300">
              Découvrir
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.a
        href="#club"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ bottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}
        className="absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer"
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