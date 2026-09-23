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

/* ─── Page Politique de Confidentialité ──────────────────────── */
const PolitiqueConfidentialite = () => {
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
              Réglementation RGPD
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
            Politique
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(212,207,199,0.5)' }}>
              de Confidentialité
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

          <Section title="Introduction" delay={0.05} isInView={contentInView}>
            <p>
              La présente politique de confidentialité a pour but d'informer les utilisateurs du site sur la manière dont sont collectées, utilisées et protégées leurs données personnelles.
            </p>
            <p>
              Coach Welness Sports s'engage à ce que la collecte et le traitement de vos données soient conformes au Règlement Général sur la Protection des Données (RGPD) et à la législation française en vigueur.
            </p>
          </Section>

          <Section title="Responsable du traitement" delay={0.1} isInView={contentInView}>
            <p>Le responsable du traitement des données est :</p>
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
          </Section>

          <Section title="Données collectées" delay={0.15} isInView={contentInView}>
            <p>Les données personnelles pouvant être collectées sur le site sont :</p>
            <ul className="ml-5 list-disc space-y-1 text-white/70">
              <li>Nom</li>
              <li>Prénom</li>
              <li>Adresse mail</li>
              <li>Téléphone</li>
              <li>Autres informations saisies dans le champ "message" du formulaire de contact</li>
            </ul>
            <p className="mt-4">
              Chez Coach Welness Sports, nous accordons une grande importance à la confidentialité des données de nos utilisateurs. Ces données sont fournies volontairement par l'utilisateur lors de l'envoi d'un message via le formulaire de contact. Le site peut également collecter automatiquement des données de navigation (adresses IP, données de localisation, type de navigateur, etc.) par le biais de cookies, à des fins statistiques et d'amélioration de l'expérience utilisateur.
            </p>
          </Section>

          <Section title="Finalités du traitement" delay={0.2} isInView={contentInView}>
            <p>Les données sont collectées pour les finalités suivantes :</p>
            <ul className="ml-5 list-disc space-y-1 text-white/70">
              <li>Répondre aux demandes envoyées via le formulaire de contact</li>
              <li>Assurer la gestion et le bon fonctionnement du site</li>
              <li>Analyser l'audience du site et améliorer les services proposés</li>
            </ul>
          </Section>

          <Section title="Destinataires des données" delay={0.25} isInView={contentInView}>
            <p>
              Les données collectées sont destinées uniquement à Coach Welness Sports et ne sont jamais cédées, louées ou vendues à des tiers.
            </p>
          </Section>

          <Section title="Durée de conservation" delay={0.3} isInView={contentInView}>
            <p>Les données personnelles sont conservées :</p>
            <ul className="ml-5 list-disc space-y-1 text-white/70">
              <li>Pour les demandes de contact : pendant 12 mois à compter du dernier échange</li>
              <li>Pour les cookies : jusqu'à 13 mois maximum après dépôt</li>
            </ul>
          </Section>

          <Section title="Droits des utilisateurs" delay={0.35} isInView={contentInView}>
            <p>Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :</p>
            <ul className="ml-5 list-disc space-y-1 text-white/70">
              <li>Droit d'accès</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit d'opposition</li>
              <li>Droit à la portabilité des données</li>
            </ul>
            <p className="mt-4">
              Vous pouvez exercer ces droits en envoyant un e-mail à :{' '}
              <a
                href="mailto:teamonecws@gmail.com"
                className="text-[#d4cfc7] underline underline-offset-4 decoration-[#d4cfc7]/30 hover:decoration-[#d4cfc7] transition-all duration-200"
              >
                teamonecws@gmail.com
              </a>
            </p>
          </Section>

          <Section title="Sécurité" delay={0.4} isInView={contentInView}>
            <p>
              Coach Welness Sports met en œuvre toutes les mesures techniques et organisationnelles nécessaires pour garantir la sécurité et la confidentialité des données personnelles.
            </p>
          </Section>

          <Section title="Modifications" delay={0.45} isInView={contentInView}>
            <p>
              La présente politique de confidentialité peut être modifiée à tout moment afin de garantir sa conformité avec la législation en vigueur.
            </p>
            <p>Nous vous conseillons de consulter régulièrement cette page.</p>
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

export default PolitiqueConfidentialite;
