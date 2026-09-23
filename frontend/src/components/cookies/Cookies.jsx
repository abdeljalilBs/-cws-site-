import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LuArrowLeft } from 'react-icons/lu';

const DISPLAY = "'Anton', sans-serif";
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";

/* ─── Section component ─────────────────────────────────────── */
const Section = ({ title, children, delay = 0, isInView }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay }}
    className="border-t border-white/10 pt-10 pb-10"
  >
    <h2
      style={{ fontFamily: DISPLAY }}
      className="mb-5 text-xl sm:text-2xl uppercase tracking-tight text-[#d4cfc7]"
    >
      {title}
    </h2>
    <div className="text-[0.92rem] leading-[1.85] text-white/70 space-y-3">
      {children}
    </div>
  </motion.div>
);

/* ─── Page Cookies ───────────────────────────────────────────── */
const Cookies = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-40px' });
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' });

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#0a0a0a]">

      {/* ── Atmosphère de fond ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <span className="absolute top-[-140px] left-1/2 -translate-x-1/2 h-[480px] w-[680px] rounded-full bg-[#d4cfc7] opacity-[0.04] blur-[130px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[780px] px-6 sm:px-10 pt-32 pb-24">

        {/* ── En-tête ── */}
        <section ref={heroRef}>
          {/* Retour accueil */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={heroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 hover:text-[#d4cfc7]"
            >
              <LuArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Retour à l'accueil
            </Link>
          </motion.div>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-5"
          >
            <em style={{ fontFamily: SERIF }} className="text-base tracking-[0.14em] uppercase text-[#b3a996] italic">
              Traceurs et navigation
            </em>
          </motion.div>

          {/* Grand titre */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: DISPLAY }}
            className="mb-4 text-[3rem] sm:text-[4.5rem] uppercase leading-[0.92] tracking-tight text-white animate-pulse"
          >
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(212,207,199,0.5)' }}>
              Cookies
            </span>
          </motion.h1>

          {/* Filet décoratif */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={heroInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="mt-8 h-px origin-left bg-gradient-to-r from-[#d4cfc7]/50 via-[#d4cfc7]/20 to-transparent"
          />
        </section>

        {/* ── Contenu ── */}
        <div ref={contentRef} className="mt-4">

          <Section title="Utilisation des cookies" delay={0.05} isInView={contentInView}>
            <p>Le site utilise des cookies pour :</p>
            <ul className="ml-5 list-disc space-y-1 text-white/70">
              <li>Mesurer l’audience</li>
              <li>Améliorer l’expérience utilisateur</li>
            </ul>
            <p>
              Lors de votre première visite, un bandeau de gestion du consentement vous permet d’accepter ou de refuser tout ou partie des cookies.
            </p>
            <p className="mt-4">
              Nous utilisons les types de cookies suivants :
            </p>
            <ul className="ml-5 list-disc space-y-1 text-white/70">
              <li><strong className="text-white font-semibold">Cookies techniques</strong> : nécessaires au fonctionnement du site</li>
              <li><strong className="text-white font-semibold">Cookies analytiques</strong> : permettent de mesurer l'audience et d'améliorer nos services</li>
            </ul>
          </Section>

          <Section title="Durée de conservation" delay={0.1} isInView={contentInView}>
            <p>
              Les cookies sont conservés pour une durée maximale de 13 mois après leur dépôt.
            </p>
          </Section>

          <Section title="Gestion du consentement" delay={0.15} isInView={contentInView}>
            <p>
              Lors de votre première visite, un bandeau de gestion du consentement vous permet d'accepter ou de refuser tout ou partie des cookies. Vous pouvez également gérer les cookies via les paramètres de votre navigateur.
            </p>
          </Section>

          <Section title="Comment gérer les cookies dans votre navigateur" delay={0.2} isInView={contentInView}>
            <p>Vous pouvez configurer votre navigateur pour :</p>
            <ul className="ml-5 list-disc space-y-1 text-white/70">
              <li>Accepter tous les cookies</li>
              <li>Être averti lorsqu'un cookie est déposé</li>
              <li>Refuser tous les cookies</li>
            </ul>
            <p className="mt-4">
              Pour plus d'informations sur la gestion des cookies, consultez la documentation de votre navigateur.
            </p>
          </Section>

          <Section title="Contact" delay={0.25} isInView={contentInView}>
            <p>
              Pour toute question concernant notre politique de cookies, vous pouvez nous contacter à :{' '}
              <a
                href="mailto:teamonecws@gmail.com"
                className="text-[#d4cfc7] underline underline-offset-4 decoration-[#d4cfc7]/30 hover:decoration-[#d4cfc7] transition-all duration-200"
              >
                teamonecws@gmail.com
              </a>
            </p>
          </Section>

          {/* ── Bouton retour accueil en bas ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-6 border-t border-white/10"
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 px-7 py-3.5 text-[0.78rem] uppercase tracking-[0.2em] text-white/60 transition-all duration-300 hover:border-[#d4cfc7]/50 hover:bg-[#d4cfc7]/5 hover:text-white"
            >
              <LuArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Retour à l'accueil
            </Link>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default Cookies;
