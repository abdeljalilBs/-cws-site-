import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LuInstagram, LuFacebook, LuArrowRight } from 'react-icons/lu';

const DISPLAY = "'Anton', sans-serif";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const phone = '06 77 88 44 69';
  const email = 'teamonecws@gmail.com';
  const address1 = '20, Rue Marie de Lorraine';
  const address2 = '37700 La Ville aux Dames';
  const instagram = 'https://www.instagram.com/coach_wellness_sports?igsh=NGwwMXNuY2t1NTl6';
  const facebook = '#';

  // ─── Colonnes de liens ─────────────────────────────────────
  const linkColumns = [
    {
      links: [
        { label: 'Accueil', href: '#' },
        { label: 'Le club', href: '#club' },
        { label: 'Les coachs', href: '#coachs' },
        { label: 'Tarifs', href: '#tarifs' },
      ],
    },
    {
      links: [
        { label: 'Conditions générales de ventes', href: '#cgv' },
        { label: 'Mentions légales', href: '#mentions' },
        { label: 'Politique de confidentialité', href: '#privacy' },
      ],
    },
  ];

  return (
    <footer ref={ref} className="relative w-full overflow-hidden bg-[#1a1a1a] pt-20 md:pt-24 pb-10">

      {/* ── Grain subtil ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ── Ligne claire fine en haut ── */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

      <div className="relative mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">

        {/* ══════════════════════════════════════════
            GRILLE PRINCIPALE
        ══════════════════════════════════════════ */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* ── COL 1 : Logo ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="lg:col-span-3 flex flex-col"
          >
            <span
              style={{ fontFamily: DISPLAY }}
              className="text-5xl md:text-6xl leading-none tracking-tight text-white"
            >
              CWS
            </span>
            <span className="mt-3 text-[0.65rem] tracking-[0.3em] uppercase text-white/40 font-light">
              Coach Wellness Sports
            </span>
          </motion.div>

          {/* ── COL 2 : Liens navigation ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            {linkColumns[0].links.map((l, i) => (
              <a
                key={i}
                href={l.href}
                className="text-[0.82rem] uppercase tracking-[0.08em] text-white/55 transition-colors duration-300 hover:text-white w-fit"
              >
                {l.label}
              </a>
            ))}
          </motion.div>

          {/* ── COL 3 : Liens légaux ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="lg:col-span-3 flex flex-col gap-3"
          >
            {linkColumns[1].links.map((l, i) => (
              <a
                key={i}
                href={l.href}
                className="text-[0.82rem] uppercase tracking-[0.08em] text-white/55 transition-colors duration-300 hover:text-white w-fit"
              >
                {l.label}
              </a>
            ))}
          </motion.div>

          {/* ── COL 4 : Contact + Newsletter ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="lg:col-span-4 flex flex-col gap-5"
          >
            {/* Coordonnées */}
            <div className="flex flex-col gap-1.5">
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="text-[0.82rem] uppercase tracking-[0.08em] text-white/55 transition-colors duration-300 hover:text-white w-fit"
              >
                {phone}
              </a>
              <a
                href={`mailto:${email}`}
                className="text-[0.82rem] uppercase tracking-[0.08em] text-white/70 transition-colors duration-300 hover:text-white w-fit break-all"
              >
                {email}
              </a>
              <p className="text-[0.82rem] uppercase tracking-[0.08em] text-white/40 leading-relaxed pt-1">
                {address1}<br />{address2}
              </p>
            </div>

            {/* Newsletter (style BXR SUBSCRIBE) */}
            <div className="flex flex-col gap-3 pt-2">
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-white/40 leading-snug max-w-[24ch]">
                Inscrivez-vous pour recevoir nos actualités
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center border-b border-white/20 focus-within:border-white transition-colors duration-300 max-w-[280px]"
              >
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-white/30 outline-none tracking-wide"
                />
                <button
                  type="submit"
                  aria-label="S'inscrire"
                  className="flex-shrink-0 pl-3 text-white/50 hover:text-white transition-colors duration-300"
                >
                  <LuArrowRight size={18} />
                </button>
              </form>
            </div>
          </motion.div>

        </div>

        {/* ══════════════════════════════════════════
            RÉSEAUX SOCIAUX
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-14 md:mt-16 flex items-center gap-5"
        >
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/50 transition-all duration-300 hover:text-white hover:scale-110"
          >
            <LuInstagram size={20} />
          </a>
          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white/50 transition-all duration-300 hover:text-white hover:scale-110"
          >
            <LuFacebook size={20} />
          </a>
        </motion.div>

        {/* ══════════════════════════════════════════
            BARRE BASSE (copyright)
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
        >
          <p className="text-[0.7rem] uppercase tracking-[0.12em] text-white/30">
            © CWS {new Date().getFullYear()}. Tous droits réservés.
          </p>
          <p className="text-[0.7rem] uppercase tracking-[0.12em] text-white/30">
            La Ville aux Dames · 37
          </p>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;