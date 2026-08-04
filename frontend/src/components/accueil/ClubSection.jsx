import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { LuArrowRight, LuArrowLeft } from 'react-icons/lu';

// ─── Import des images depuis assets ─────────────────────────
import materielImg from '../../assets/LE MATÉRIEL.png';
import accesLibreImg from '../../assets/ACCES LIBRE.png';
import ambianceImg from "../../assets/L'AMBIANCE.png";
import coachingImg from '../../assets/COACHING_PERSONNALISÉ.png';
import coursImg from '../../assets/COURS_COLLECTIFS.png';
import hygieneImg from "../../assets/L'HYGIÈNE.png";

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
        decoding="async"        // ⭐ décodage asynchrone
        onLoad={() => setLoaded(true)}
        className={`w-full h-full transition-all duration-700 ease-out ${
          loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-md'
        } ${imgClassName || ''}`}
      />
    </div>
  );
};

const ClubSection = () => {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const idleTimerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const realCards = [
    { image: materielImg, title: "Le Matériel", description: "Chez CWS, le matériel est de qualité professionnelle, et de dernière génération (MATRIX)." },
    { image: accesLibreImg, title: "Accès Libre", description: "Au parc cardio et au plateau musculation, 7 jours sur 7 de 7h30 à 21h30." },
    { image: ambianceImg, title: "L'Ambiance", description: "Une ambiance conviviale, familiale, et chaleureuse pour devenir la meilleure version de soi-même." },
    { image: coachingImg, title: "Coaching Personnalisé", description: "Les coachs CWS sont diplômés, passionnés et experts dans leur métier. Ils sauront vous motiver et vous faire atteindre vos objectifs." },
    { image: coursImg, title: "Cours Collectifs", description: "Chez CWS, retrouvez plus de 37 cours variés avec des coachs diplômés et qualifiés pour corriger vos mouvements." },
    { image: hygieneImg, title: "L'Hygiène", description: "Entraînez-vous dans un club quotidiennement nettoyé, avec des règles d'hygiène respectées." },
  ];

  const N = realCards.length;
  const SETS = 5;                                   // + de marge = fling qui ne sort jamais de la piste
  const MIDDLE_SET_START = N * Math.floor(SETS / 2); // set du milieu (index 2 -> carte 12)
  const extendedCards = Array.from({ length: N * SETS }, (_, i) => ({
    ...realCards[i % N],
    _realIndex: i % N,
    _extIndex: i,
  }));

  const cardStylesRef = useRef([]);
  const [, forceUpdate] = useState(0);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const isDraggingRef = useRef(false);
  // Coupe les transitions CSS uniquement sur la frame du recadrage
  const disableTransitionRef = useRef(false);

  // ─── Largeur carte + gap ───────────────────────────────────
  const getCardStep = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return 440;
    const cards = el.querySelectorAll('[data-card]');
    if (cards.length < 2) return 440;
    return cards[1].offsetLeft - cards[0].offsetLeft;
  }, []);

  // ─── Calcul des styles (PUR : aucun saut ici) ──────────────
  const computeStyles = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardEls = el.querySelectorAll('[data-card]');
    if (!cardEls.length) return;

    const { clientWidth } = el;
    const center = el.scrollLeft + clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    const styles = [];

    cardEls.forEach((cardEl, i) => {
      const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2;
      const dist = center - cardCenter;
      const nd = Math.min(Math.abs(dist) / (clientWidth * 0.5), 1);
      if (Math.abs(dist) < closestDist) { closestDist = Math.abs(dist); closest = i; }
      styles.push({
        scale: 1 - nd * 0.18,
        opacity: 1 - nd * 0.88,
        blur: nd * 8,
        brightness: 1 - nd * 0.6,
        normalizedDist: nd,
      });
    });

    cardStylesRef.current = styles;
    setActiveIndex(closest % N);
    forceUpdate((n) => n + 1);
  }, [N]);

  // ─── Recadrage SILENCIEUX : uniquement à l'arrêt du scroll ──
  const recenterIfNeeded = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isDraggingRef.current) return;
    const cardEls = el.querySelectorAll('[data-card]');
    if (!cardEls.length) return;

    const { clientWidth } = el;
    const center = el.scrollLeft + clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    cardEls.forEach((cardEl, i) => {
      const cc = cardEl.offsetLeft + cardEl.offsetWidth / 2;
      const d = Math.abs(center - cc);
      if (d < closestDist) { closestDist = d; closest = i; }
    });

    // Carte équivalente dans le set du milieu
    const target = MIDDLE_SET_START + (closest % N);
    if (target !== closest && cardEls[target]) {
      // Saut = distance EXACTE entre les 2 cartes -> offset sous-carte préservé, invisible
      disableTransitionRef.current = true;
      el.scrollLeft += cardEls[target].offsetLeft - cardEls[closest].offsetLeft;
      computeStyles(); // rendu SANS transition + nouveaux styles

      // Double rAF : on laisse la frame "sans transition" se peindre,
      // PUIS on rallume. Sinon React fusionne tout et le fondu réapparaît.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          disableTransitionRef.current = false;
          forceUpdate((n) => n + 1);
        });
      });
    }
  }, [computeStyles, N, MIDDLE_SET_START]);

  // ─── Scroll : styles live (RAF) + recadrage différé (idle) ──
  const handleScroll = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        computeStyles();
      });
    }
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(recenterIfNeeded, 140);
  }, [computeStyles, recenterIfNeeded]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', handleScroll, { passive: true });

    const initTimer = setTimeout(() => {
      const cardEls = el.querySelectorAll('[data-card]');
      if (cardEls[MIDDLE_SET_START]) {
        const c = cardEls[MIDDLE_SET_START].offsetLeft + cardEls[MIDDLE_SET_START].offsetWidth / 2;
        el.scrollLeft = c - el.clientWidth / 2;
      }
      computeStyles();
    }, 150);

    return () => {
      clearTimeout(initTimer);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      el.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, computeStyles, MIDDLE_SET_START]);

  // ─── Molette verticale → horizontale ───────────────────────
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      const rect = el.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.5;
          if (!hasInteracted) setHasInteracted(true);
        }
      }
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [hasInteracted]);

  // ─── Auto-scroll hint ──────────────────────────────────────
  useEffect(() => {
    if (!isInView) return;
    const el = scrollRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      const cur = el.scrollLeft;
      el.scrollTo({ left: cur + 120, behavior: 'smooth' });
      setTimeout(() => el.scrollTo({ left: cur, behavior: 'smooth' }), 700);
    }, 1500);
    return () => clearTimeout(timer);
  }, [isInView]);

  // ─── Flèches ───────────────────────────────────────────────
  const scrollToCard = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = getCardStep();
    el.scrollBy({ left: dir === 'right' ? step : -step, behavior: 'smooth' });
    if (!hasInteracted) setHasInteracted(true);
  };

  // ─── Aller à une carte (dots) ──────────────────────────────
  const goToCard = (realIndex) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardEls = el.querySelectorAll('[data-card]');
    const targetExtIndex = MIDDLE_SET_START + realIndex;
    if (cardEls[targetExtIndex]) {
      const c = cardEls[targetExtIndex].offsetLeft + cardEls[targetExtIndex].offsetWidth / 2;
      el.scrollTo({ left: c - el.clientWidth / 2, behavior: 'smooth' });
    }
    if (!hasInteracted) setHasInteracted(true);
  };

  // ─── Drag ──────────────────────────────────────────────────
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartX.current = e.pageX;
    dragScrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    scrollRef.current.scrollLeft = dragScrollLeft.current - (e.pageX - dragStartX.current) * 1.5;
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    if (!hasInteracted) setHasInteracted(true);
    isDraggingRef.current = false;
    setIsDragging(false);
    // Recadrage IMMÉDIAT au relâchement (transitions coupées via disableTransitionRef),
    // pas de fenêtre où le snap et les transitions se battent.
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    recenterIfNeeded();
  };

  const transitionsOn = !isDragging && !disableTransitionRef.current;

  return (
    <section
      id="club"
      ref={sectionRef}
      className="relative w-full bg-[#0a0a0a] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      {/* EN-TÊTE */}
      <div className="relative z-10 text-center mb-14 md:mb-20 px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[#d4cfc7] text-xs sm:text-sm font-semibold italic tracking-[0.1em] uppercase mb-4 drop-shadow-lg"
        >
          Pourquoi nous choisir
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-white font-black uppercase tracking-[0.08em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1] mb-4"
        >
          Découvrir le Club
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-16 md:w-20 h-[1px] bg-[#d4cfc7]/40 mx-auto origin-center mb-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[#b8b0a4] text-sm sm:text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed"
        >
          Un cadre d'exception pensé pour votre bien-être et votre progression.
        </motion.p>
      </div>

      {/* CARROUSEL */}
      <div className="relative z-10">
        <button
          onClick={() => scrollToCard('left')}
          className="absolute left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/15 hover:border-white/40 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:scale-110 shadow-xl"
          aria-label="Précédent"
        >
          <LuArrowLeft size={20} />
        </button>
        <button
          onClick={() => scrollToCard('right')}
          className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/15 hover:border-white/40 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:scale-110 shadow-xl"
          aria-label="Suivant"
        >
          <LuArrowRight size={20} />
        </button>

        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20 pointer-events-none" />

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex items-center gap-10 overflow-x-auto scrollbar-hide px-6 sm:px-12 md:px-20 lg:px-32 py-8 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollSnapType: isDragging ? 'none' : 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex-shrink-0 w-[calc(50vw-190px)] sm:w-[calc(50vw-210px)] md:w-[calc(50vw-230px)]" />

          {extendedCards.map((card, index) => {
            const s = cardStylesRef.current[index] || { scale: 1, opacity: 0, blur: 8, brightness: 0.4, normalizedDist: 1 };
            const isActive = s.normalizedDist < 0.15;

            return (
              <div
                key={`${card.title}-${index}`}
                data-card
                onClick={() => !isActive && goToCard(card._realIndex)}
                className="group relative flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px] rounded-2xl overflow-hidden bg-[#111111] cursor-pointer"
                style={{
                  scrollSnapAlign: 'center',
                  transform: `translate3d(0,0,0) scale(${s.scale})`,
                  opacity: s.opacity,
                  filter: `blur(${s.blur}px) brightness(${s.brightness})`,
                  willChange: 'transform, opacity, filter',
                  transition: transitionsOn
                    ? 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease-out, filter 0.5s ease-out'
                    : 'none',
                  zIndex: isActive ? 10 : Math.round((1 - s.normalizedDist) * 10),
                  border: isActive ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.02)',
                  boxShadow: isActive ? '0 25px 60px -12px rgba(0,0,0,0.7)' : 'none',
                  pointerEvents: s.opacity < 0.1 ? 'none' : 'auto',
                }}
                draggable={false}
              >
                <div className="relative w-full h-52 sm:h-56 md:h-60 overflow-hidden">
                  {/* ⭐ LAZY LOADING sur l'image de la carte */}
                  <LazyImage
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full"
                    imgClassName={`object-cover ${isActive ? 'transition-transform duration-700 ease-out group-hover:scale-110' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
                </div>
                <div className="relative p-6 md:p-7">
                  <span
                    className="absolute top-3 right-4 text-5xl font-black leading-none select-none"
                    style={{ color: isActive ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)' }}
                  >
                    {String(card._realIndex + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className="font-bold uppercase tracking-[0.12em] text-sm sm:text-base mb-3 pr-8"
                    style={{ color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
                  >
                    {card.title}
                  </h3>
                  <div
                    className="h-[1px] mb-4"
                    style={{
                      width: isActive ? '2rem' : '1.5rem',
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                    }}
                  />
                  <p className="text-sm leading-relaxed" style={{ color: isActive ? '#8a8279' : 'rgba(90,85,78,0.4)' }}>
                    {card.description}
                  </p>
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4cfc7]/30 to-transparent" />
                )}
              </div>
            );
          })}

          <div className="flex-shrink-0 w-[calc(50vw-190px)] sm:w-[calc(50vw-210px)] md:w-[calc(50vw-230px)]" />
        </div>
      </div>

      {/* INDICATEURS */}
      <div className="relative z-10 flex flex-col items-center gap-5 mt-10 md:mt-14 px-6">
        <div className="flex items-center gap-3">
          {realCards.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index)}
              className="group flex items-center justify-center"
              aria-label={`Carte ${index + 1}`}
            >
              <span className={`block rounded-full transition-all duration-400 ${
                index === activeIndex ? 'w-8 h-2 bg-white/70' : 'w-2 h-2 bg-white/20 group-hover:bg-white/40'
              }`} />
            </button>
          ))}
        </div>
        <p className="text-white/20 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-light">
          {String(activeIndex + 1).padStart(2, '0')}
          <span className="mx-2 text-white/10">/</span>
          {String(N).padStart(2, '0')}
        </p>
        <AnimatePresence>
          {!hasInteracted && (
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-white/15 text-[10px] tracking-[0.2em] uppercase flex items-center gap-2"
            >
              <span className="inline-block w-4 h-[1px] bg-white/15" />
              Glissez pour explorer
              <span className="inline-block w-4 h-[1px] bg-white/15" />
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default ClubSection;