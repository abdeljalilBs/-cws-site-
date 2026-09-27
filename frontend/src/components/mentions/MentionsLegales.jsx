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

/* ─── Page Mentions Légales ──────────────────────────────────── */
const MentionsLegales = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-40px' });
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' });

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#0a0a0a] pt-[calc(6rem+env(safe-area-inset-top,0px))] pb-[calc(5rem+env(safe-area-inset-bottom,0px))]">

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
              Informations légales
            </em>
          </motion.div>

          {/* Grand titre */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: DISPLAY }}
            className="mb-4 text-[3rem] sm:text-[4.5rem] uppercase leading-[0.92] tracking-tight text-white"
          >
            Mentions
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(212,207,199,0.5)' }}>
              Légales
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

        {/* ── Contenu légal ── */}
        <div ref={contentRef} className="mt-4">

          <Section title="Éditeur du site" delay={0.05} isInView={contentInView}>
            <p>Le site Coach Wellness Sports est édité par :</p>
            <p className="text-white/90">
              <strong className="text-white font-semibold">Coach Wellness Sports</strong><br />
              20 rue Marie-de-Lorraine, ZAC des Fougerolles, 37700 La Ville-aux-Dames<br />
              Email :{' '}
              <a
                href="mailto:teamonecws@gmail.com"
                className="text-[#d4cfc7] underline underline-offset-4 decoration-[#d4cfc7]/30 hover:decoration-[#d4cfc7] transition-all duration-200"
              >
                teamonecws@gmail.com
              </a>
            </p>
            <p>Le directeur de publication du site est Coach Wellness Sports.</p>
          </Section>

          <Section title="Hébergement" delay={0.1} isInView={contentInView}>
            <p>Le site est hébergé par :</p>
            <p className="text-white/90">
              <strong className="text-white font-semibold">IONOS SARL</strong><br />
              7 place de la Gare, 57200 Sarreguemines, France<br />
              Site web :{' '}
              <a
                href="https://www.ionos.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d4cfc7] underline underline-offset-4 decoration-[#d4cfc7]/30 hover:decoration-[#d4cfc7] transition-all duration-200"
              >
                https://www.ionos.fr
              </a>
            </p>
          </Section>

          <Section title="Propriété intellectuelle" delay={0.15} isInView={contentInView}>
            <p>
              L'ensemble du contenu du site (textes, images, photos, vidéos, éléments graphiques, logos, structure générale…)
              est protégé par la législation en vigueur sur la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, modification ou diffusion, totale ou partielle, sans accord préalable écrit de l'éditeur est interdite.
            </p>
          </Section>

          <Section title="Données personnelles" delay={0.2} isInView={contentInView}>
            <p>
              Des données personnelles peuvent être collectées via le formulaire de contact et par l'utilisation de cookies.
            </p>
            <p>
              Le responsable du traitement est : <strong className="text-white font-semibold">Coach Wellness Sports</strong>
              {' — '}
              <a
                href="mailto:teamonecws@gmail.com"
                className="text-[#d4cfc7] underline underline-offset-4 decoration-[#d4cfc7]/30 hover:decoration-[#d4cfc7] transition-all duration-200"
              >
                teamonecws@gmail.com
              </a>
            </p>
            <p>Le traitement des données est conforme au RGPD et à la législation française.</p>
            <p>Pour plus de détails, consultez notre politique de confidentialité.</p>
            <p>
              Les utilisateurs disposent des droits suivants : accès, rectification, suppression, opposition,
              portabilité, limitation du traitement.
            </p>
            <p>
              Pour exercer vos droits :{' '}
              <a
                href="mailto:teamonecws@gmail.com"
                className="text-[#d4cfc7] underline underline-offset-4 decoration-[#d4cfc7]/30 hover:decoration-[#d4cfc7] transition-all duration-200"
              >
                teamonecws@gmail.com
              </a>
            </p>
          </Section>

          <Section title="Responsabilité" delay={0.25} isInView={contentInView}>
            <p>L'éditeur ne saurait être tenu responsable :</p>
            <ul className="ml-5 list-disc space-y-1 text-white/70">
              <li>d'interruptions temporaires du site,</li>
              <li>de dysfonctionnements indépendants de sa volonté,</li>
              <li>de tout dommage indirect lié à l'utilisation du site.</li>
            </ul>
          </Section>

          <Section title="Liens externes" delay={0.3} isInView={contentInView}>
            <p>
              Le site peut contenir des liens vers des sites tiers. Coach Wellness Sports décline toute
              responsabilité concernant leur contenu ou leur politique de confidentialité.
            </p>
          </Section>

          <Section title="Modification des mentions légales" delay={0.35} isInView={contentInView}>
            <p>
              Les présentes mentions légales peuvent être modifiées à tout moment pour rester conformes
              à la réglementation.
            </p>
          </Section>

          <Section title="Droit applicable" delay={0.4} isInView={contentInView}>
            <p>
              Les présentes mentions légales sont régies par le droit français. En cas de litige,
              les tribunaux français seront seuls compétents.
            </p>
          </Section>

          <Section title="Crédits" delay={0.45} isInView={contentInView}>
            <p>
              Site web conçu et développé par{' '}
              <strong className="text-white font-semibold">l'Agence Nopal</strong>
            </p>
            <p className="text-white/50 text-[0.82rem]">SIRET : 101 365 617 00014</p>
          </Section>

          {/* ── Bouton retour accueil en bas ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
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

export default MentionsLegales;
