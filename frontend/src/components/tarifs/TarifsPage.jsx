import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion';
import { LuCheck, LuChevronDown, LuArrowRight, LuStar } from 'react-icons/lu';

const DISPLAY = "'Anton', sans-serif";
// Pour le rendu exact de l'accent italique du titre, ajoute la police "Instrument Serif"
// (Google Fonts). Sinon, le fallback serif système prend le relais automatiquement.
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";

/* ─── Les 3 offres ──────────────────────────────────────────── */
const plans = [
  {
    name: 'Abonnement sans engagement',
    badge: null,
    priceLabel: 'À partir de',
    price: 39.9,
    decimals: 2,
    priceSuffix: '€ / mois',
    ctaHref: '#contact',
    featured: false,
    durations: null,
    features: [
      'Accès aux cours collectifs en illimité',
      'Cours collectifs variés et adaptés à tous',
      'Accès libre au plateau musculation',
      'Accès libre au parc cardio',
      'Ambiance chaleureuse et respectueuse',
      'Événements régulièrement organisés',
      'Matériel haut de gamme et de dernière génération',
    ],
  },
  {
    name: 'Abonnement avec engagement',
    badge: 'Le plus avantageux',
    priceLabel: 'Engagement dégressif',
    price: null,
    priceCustom: 'Contactez-nous',
    ctaHref: '#contact',
    featured: true,
    durations: ['1 mois', '3 mois', '6 mois', '12 mois'],
    features: [
      'Accès aux cours collectifs en illimité',
      'Cours collectifs variés et adaptés à tous',
      'Accès libre au plateau musculation',
      'Accès libre au parc cardio',
      'Vestiaires avec douche individuelle',
      'Ambiance chaleureuse et respectueuse',
      'Événements régulièrement organisés',
      'Matériel haut de gamme (MATRIX) et de dernière génération',
    ],
  },
  {
    name: 'Carte à la séance',
    badge: null,
    priceLabel: 'À partir de',
    price: 120,
    decimals: 0,
    priceSuffix: '€',
    ctaHref: '#contact',
    featured: false,
    durations: null,
    features: [
      'Accès aux cours collectifs',
      'Cours collectifs variés et adaptés à tous',
      'Accès au plateau musculation',
      'Accès libre au parc cardio',
      'Carte de 10 séances',
    ],
  },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "Comment faire pour s'inscrire ?",
    a: "L'inscription se fait directement au club ou via notre formulaire de contact. Nous vous accueillons pour une visite, nous échangeons sur vos objectifs, puis nous mettons en place votre abonnement adapté. Aucune démarche compliquée — on s'occupe de tout.",
  },
  {
    q: 'Comment réserver les cours collectifs ?',
    a: "Une fois adhérent, vous accédez à notre planning de cours collectifs. La réservation se fait facilement en ligne ou directement à l'accueil du club. Avec plus de 37 cours variés par semaine, vous trouverez toujours un créneau qui vous convient.",
  },
  {
    q: "Quel est le tarif d'un abonnement ?",
    a: "Nos abonnements sans engagement démarrent à 39,90€ par mois. Pour les formules avec engagement (1, 3, 6 ou 12 mois), les tarifs sont dégressifs et personnalisés selon la durée choisie — contactez-nous pour obtenir un devis adapté à vos besoins.",
  },
  {
    q: 'Quelle est la démarche pour un coaching personnalisé ?',
    a: "Prenez rendez-vous avec l'un de nos coachs diplômés (Justine, Marion ou Bilal). Lors d'un premier échange, nous définissons ensemble vos objectifs, votre niveau et vos disponibilités. Votre coach construit ensuite un programme sur-mesure et vous accompagne séance après séance.",
  },
];

const bandWords = [
  '+37 cours / semaine',
  'Coachs diplômés',
  'Matériel MATRIX',
  'Sans surprise',
  'Parc cardio',
  'Plateau musculation',
  'Ambiance chaleureuse',
];

/* ─── Petit hook media-query ─────────────────────────────────── */
function useMedia(query) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mm = window.matchMedia(query);
    const onChange = () => setMatch(mm.matches);
    onChange();
    mm.addEventListener('change', onChange);
    return () => mm.removeEventListener('change', onChange);
  }, [query]);
  return match;
}

/* ─── Compteur de prix animé ─────────────────────────────────── */
function useCountUp(target, decimals, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active || target == null) return;
    let raf;
    const dur = 1100;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(target * e);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return decimals ? val.toFixed(2).replace('.', ',') : Math.round(val).toString();
}

/* ─── Carte d'offre ──────────────────────────────────────────── */
const PlanCard = ({ plan, index, isInView }) => {
  const tiltRef = useRef(null);
  const reduce = useReducedMotion();
  const fine = useMedia('(hover: hover) and (pointer: fine)');
  const isLg = useMedia('(min-width: 1024px)');
  const [durIndex, setDurIndex] = useState(3);

  const priceStr = useCountUp(plan.price, plan.decimals, isInView);

  const baseTransform =
    plan.featured && isLg ? 'perspective(900px) scale(1.045)' : 'perspective(900px)';

  const handleMove = (e) => {
    if (!fine || reduce) return;
    const el = tiltRef.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    const rx = (y / r.height - 0.5) * -5;
    const ry = (x / r.width - 0.5) * 5;
    el.style.transform = `${baseTransform} rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const handleLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = baseTransform;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative ${
        plan.featured ? 'z-10 lg:-my-2 drop-shadow-[0_44px_90px_rgba(0,0,0,0.55)]' : ''
      }`}
    >
      <div
        ref={tiltRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ transform: baseTransform, transformStyle: 'preserve-3d' }}
        className={`tp-card group relative flex flex-col rounded-[22px] overflow-visible transition-[border-color,box-shadow] duration-500 ${
          plan.featured
            ? 'tp-featured bg-[#f5f4f1] border border-[#d4cfc7]'
            : 'bg-[#111] border border-white/[0.06] hover:border-white/15'
        }`}
      >
        {/* Halo crème pulsé (carte vedette) */}
        {plan.featured && (
          <span className="tp-halo pointer-events-none absolute -inset-8 -z-10 rounded-[30px]" />
        )}

        {/* ══════════════════════════════════════════════════════
            BADGE — Placé AU-DESSUS de la carte (ne chevauche plus le titre)
        ══════════════════════════════════════════════════════ */}
        {plan.badge && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-full bg-[#0a0a0a] px-4 py-1.5 shadow-lg shadow-black/30 whitespace-nowrap">
            <LuStar size={11} className="text-[#d4cfc7] fill-[#d4cfc7]" />
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-[#d4cfc7]">
              {plan.badge}
            </span>
          </div>
        )}

        {/* Liseré lumineux haut */}
        <div
          className={`absolute top-0 left-0 right-0 h-px z-10 rounded-t-[22px] ${
            plan.featured
              ? 'bg-gradient-to-r from-transparent via-[#0a0a0a]/20 to-transparent'
              : 'bg-gradient-to-r from-transparent via-[#d4cfc7]/30 to-transparent'
          }`}
        />

        <div className="relative z-10 flex flex-col h-full p-7 md:p-9">
          {/* Nom */}
          <h3
            style={{ fontFamily: DISPLAY }}
            className={`text-xl md:text-2xl uppercase leading-[0.95] tracking-tight mb-6 ${
              plan.featured ? 'text-[#0a0a0a]' : 'text-white'
            }`}
          >
            {plan.name}
          </h3>

          {/* Prix */}
          <div className="mb-7 min-h-[78px]">
            <p
              className={`text-[0.7rem] uppercase tracking-[0.18em] mb-2 ${
                plan.featured ? 'text-[#0a0a0a]/50' : 'text-[#8a8279]'
              }`}
            >
              {plan.priceLabel}
            </p>

            {plan.price != null ? (
              <div className="flex items-baseline gap-1">
                <span
                  style={{ fontFamily: DISPLAY }}
                  className={`text-5xl md:text-6xl leading-none tabular-nums ${
                    plan.featured ? 'text-[#0a0a0a]' : 'text-white'
                  }`}
                >
                  {priceStr}
                </span>
                <span
                  className={`text-lg font-light ${
                    plan.featured ? 'text-[#0a0a0a]/60' : 'text-[#8a8279]'
                  }`}
                >
                  {plan.priceSuffix}
                </span>
              </div>
            ) : (
              <>
                <p
                  style={{ fontFamily: DISPLAY }}
                  className="text-2xl md:text-3xl uppercase leading-none text-[#0a0a0a]"
                >
                  {plan.priceCustom}
                </p>
                {plan.durations && (
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {plan.durations.map((d, i) => (
                      <button
                        key={d}
                        onClick={() => setDurIndex(i)}
                        className={`rounded-full px-3 py-1.5 text-[0.72rem] font-semibold tracking-wide transition-all duration-300 ${
                          durIndex === i
                            ? 'bg-[#0a0a0a] text-[#f5f4f1] border border-[#0a0a0a]'
                            : 'border border-[#0a0a0a]/20 text-[#0a0a0a]/70 hover:bg-[#0a0a0a] hover:text-[#f5f4f1] hover:border-[#0a0a0a]'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Séparateur */}
          <div className={`h-px w-full mb-7 ${plan.featured ? 'bg-[#0a0a0a]/10' : 'bg-white/10'}`} />

          {/* Avantages (apparition en cascade) */}
          <ul className="flex flex-col gap-3.5 mb-9 flex-1">
            {plan.features.map((f, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.35 + index * 0.15 + i * 0.06 }}
                className="flex items-start gap-3"
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                    plan.featured ? 'bg-[#0a0a0a]' : 'bg-[#d4cfc7]/15'
                  }`}
                >
                  <LuCheck size={12} className={plan.featured ? 'text-[#f5f4f1]' : 'text-[#d4cfc7]'} />
                </span>
                <span
                  className={`text-sm leading-snug ${plan.featured ? 'text-[#0a0a0a]/75' : 'text-white/65'}`}
                >
                  {f}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={plan.ctaHref}
            className={`group/cta relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-500 ${
              plan.featured
                ? 'bg-[#0a0a0a] text-[#f5f4f1] hover:bg-[#1a1a1a]'
                : 'bg-[#f5f4f1] text-[#0a0a0a] hover:bg-white'
            }`}
          >
            <span className="absolute inset-0 overflow-hidden">
              <span className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
            </span>
            <span className="relative z-10">Je m'inscris</span>
            <LuArrowRight
              size={14}
              className="relative z-10 transition-transform duration-300 group-hover/cta:translate-x-1"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── FAQ (accordéon) ────────────────────────────────────────── */
const FaqItem = ({ faq, index, isOpen, onToggle, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      className={`group border-t border-white/10 ${isOpen ? 'is-open' : ''}`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="flex items-center gap-4 min-w-0">
          <span style={{ fontFamily: DISPLAY }} className="text-sm text-[#d4cfc7]/40">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            style={{ fontFamily: DISPLAY }}
            className={`text-base sm:text-lg md:text-xl uppercase leading-tight tracking-tight transition-colors duration-300 ${
              isOpen ? 'text-[#d4cfc7]' : 'text-white group-hover:text-[#d4cfc7]'
            }`}
          >
            {faq.q}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
            isOpen
              ? 'border-[#d4cfc7]/50 text-[#d4cfc7]'
              : 'border-white/15 text-white/50 group-hover:border-[#d4cfc7]/40 group-hover:text-[#d4cfc7]'
          }`}
        >
          <LuChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-7 pl-10 text-sm sm:text-base leading-relaxed text-white/55">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Page Tarifs ────────────────────────────────────────────── */
const TarifsPage = () => {
  const ref = useRef(null);
  const faqRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isFaqInView = useInView(faqRef, { once: true, margin: '-80px' });
  const [openFaq, setOpenFaq] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a]">
      {/* Styles ciblés (effets non exprimables en Tailwind seul) */}
      <style>{`
        .tp-card::before{
          content:"";position:absolute;inset:0;z-index:0;border-radius:22px;opacity:0;
          transition:opacity .4s ease;pointer-events:none;
          background:radial-gradient(340px circle at var(--mx,50%) var(--my,0%),rgba(212,207,199,.14),transparent 60%);
        }
        .tp-card:hover::before{opacity:1}
        .tp-card.tp-featured::before{
          background:radial-gradient(340px circle at var(--mx,50%) var(--my,0%),rgba(10,10,10,.06),transparent 60%);
        }
        .tp-halo{
          background:radial-gradient(closest-side,rgba(212,207,199,.16),transparent 72%);
          animation:tp-pulse 5.5s ease-in-out infinite;
        }
        @keyframes tp-pulse{0%,100%{opacity:.28}50%{opacity:.55}}
        @keyframes tp-drift1{to{transform:translate(-50%,60px) scale(1.15)}}
        @keyframes tp-drift2{to{transform:translate(90px,-50px) scale(1.2)}}
        @keyframes tp-drift3{to{transform:translate(-70px,40px) scale(1.1)}}
        .tp-a1{animation:tp-drift1 22s cubic-bezier(.25,.46,.45,.94) infinite alternate}
        .tp-a2{animation:tp-drift2 26s cubic-bezier(.25,.46,.45,.94) infinite alternate}
        .tp-a3{animation:tp-drift3 30s cubic-bezier(.25,.46,.45,.94) infinite alternate}
        @keyframes tp-scroll{to{transform:translateX(-50%)}}
        .tp-marquee{display:flex;width:max-content;animation:tp-scroll 34s linear infinite}
        .tp-band:hover .tp-marquee{animation-play-state:paused}
        .tp-stroke{
          color:transparent;-webkit-text-stroke:1px rgba(212,207,199,.38);
        }
        @media (prefers-reduced-motion: reduce){
          .tp-a1,.tp-a2,.tp-a3,.tp-marquee,.tp-halo{animation:none!important}
        }
      `}</style>

      {/* Atmosphère de fond */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <span className="tp-a1 absolute top-[-140px] left-1/2 -translate-x-1/2 h-[520px] w-[720px] rounded-full bg-[#d4cfc7] opacity-[0.05] blur-[120px]" />
        <span className="tp-a2 absolute bottom-[-160px] left-[-120px] h-[520px] w-[520px] rounded-full bg-[#d4cfc7] opacity-[0.035] blur-[120px]" />
        <span className="tp-a3 absolute top-[38%] right-[-160px] h-[460px] w-[460px] rounded-full bg-[#d4cfc7] opacity-[0.03] blur-[120px]" />
      </div>
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ══════════ TARIFS ══════════ */}
      <section id="tarifs" ref={ref} className="relative z-[2] w-full pt-28 md:pt-36 pb-24 md:pb-28">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">
          {/* Header */}
          <div className="mb-14 md:mb-20 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-5 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-[#d4cfc7]" />
                <em
                  style={{ fontFamily: SERIF }}
                  className="text-base tracking-[0.14em] uppercase text-[#b3a996] italic"
                >
                  Nos offres
                </em>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ fontFamily: DISPLAY }}
                className="max-w-[13ch] text-[2.7rem] uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.4rem]"
              >
                Trouvez l'offre{' '}
                <span
                  style={{ fontFamily: SERIF }}
                  className="relative inline-block whitespace-nowrap normal-case italic tracking-normal font-normal"
                >
                  <span className="relative z-10">qui vous ressemble</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.9, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
                    className="absolute -left-0.5 -right-0.5 bottom-[0.12em] z-0 h-[0.30em] origin-left rounded-sm bg-[#d4cfc7]"
                  />
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="max-w-[36ch] pb-1 text-[1.02rem] font-light leading-relaxed text-[#8a8279]"
            >
              Des formules claires, sans surprise. Que vous veniez ponctuellement ou que vous vous
              engagiez sur la durée, il y a un abonnement pensé pour vous.
            </motion.p>
          </div>

          {/* Grille (pt-4 ajouté pour laisser la place au badge débordant) */}
          <div className="grid grid-cols-1 gap-6 md:gap-7 lg:grid-cols-3 lg:items-center pt-4">
            {plans.map((plan, index) => (
              <PlanCard key={plan.name} plan={plan} index={index} isInView={isInView} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 text-center text-xs tracking-wide text-white/30"
          >
            Tous nos abonnements incluent un accompagnement humain et des coachs diplômés. Pas
            d'amateurs.
          </motion.p>
        </div>
      </section>

      {/* ══════════ BANDEAU ══════════ */}
      <div
        aria-hidden="true"
        className="tp-band relative z-[2] overflow-hidden border-y border-white/10 bg-white/[0.015] py-7"
      >
        <div className="tp-marquee">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center">
              {bandWords.map((w, i) => (
                <span key={`${dup}-${i}`} className="flex items-center">
                  <span
                    style={{ fontFamily: DISPLAY }}
                    className="tp-stroke px-7 text-2xl uppercase tracking-wide whitespace-nowrap"
                  >
                    {w}
                  </span>
                  <span className="h-[7px] w-[7px] flex-shrink-0 rounded-full bg-[#d4cfc7]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ FAQ ══════════ */}
      <section id="faq" ref={faqRef} className="relative z-[2] w-full bg-[#0d0d0d] py-24 md:py-32">
        <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">
          <div className="mb-12 md:mb-16 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-5 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-[#d4cfc7]" />
                <em
                  style={{ fontFamily: SERIF }}
                  className="text-base tracking-[0.14em] uppercase text-[#b3a996] italic"
                >
                  Questions fréquentes
                </em>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ fontFamily: DISPLAY }}
                className="text-[2.2rem] uppercase leading-[0.94] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.6rem]"
              >
                On répond à vos questions
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isFaqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="max-w-[30ch] pb-1 text-[1rem] font-light leading-relaxed text-[#8a8279]"
            >
              Une question sans réponse ? Contactez-nous, on vous répond rapidement.
            </motion.p>
          </div>

          <div className="border-b border-white/10">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
                isInView={isFaqInView}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TarifsPage;