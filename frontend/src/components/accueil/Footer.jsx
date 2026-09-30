import { useState } from 'react';
import { motion } from 'framer-motion';
import { LuInstagram, LuFacebook, LuArrowRight } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage';

const DISPLAY = "'Anton', sans-serif";

const Footer = () => {
  // --- STATES NEWSLETTER ---
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const phone = '06 77 88 44 69';
  const emailContact = 'teamonecws@gmail.com';
  const address1 = '20, Rue Marie de Lorraine';
  const address2 = '37700 La Ville aux Dames';
  const instagram =
    'https://www.instagram.com/coach_wellness_sports?igsh=NGwwMXNuY2t1NTl6';
  const facebook = 'https://www.facebook.com/coachwellnesssports37/';

  const navLinks = [
    { label: 'Accueil', href: '#' },
    { label: 'Le club', href: '/club', isRoute: true },
    { label: 'Les coachs', href: '/coachs', isRoute: true },
    { label: 'Planning', href: '/plannings', isRoute: true },
    { label: 'Tarifs', href: '/tarifs', isRoute: true },
  ];
  const legalLinks = [
    { label: 'Conditions générales de ventes', href: '#cgv' },
    { label: 'Mentions légales', href: '/mentions-legales', isRoute: true },
    { label: 'Politique de confidentialité', href: '/politique-confidentialite', isRoute: true },
    { label: 'Cookies', href: '/cookies', isRoute: true },
  ];

  // --- FONCTION D'ENVOI NEWSLETTER ---
  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    // 🔍 LOGS DE DEBUG : à regarder dans la console (F12)
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    console.log('📤 Newsletter : envoi en cours vers', `${API_URL}/api/newsletter/subscribe`);
    console.log('📧 Email envoyé :', email);

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      console.log('📥 Réponse reçue, status HTTP :', response.status);

      const data = await response.json();
      console.log('📦 Contenu de la réponse :', data);

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || "Merci, c'est noté ✓");
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Une erreur est survenue');
      }
    } catch (err) {
      console.error('❌ Erreur newsletter :', err);
      setStatus('error');
      setMessage('Erreur réseau. Vérifiez que le backend est bien lancé.');
    } finally {
      // Efface uniquement le message après 5s, mais garde le formulaire visible
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  const NavLink = ({ link }) =>
    link.isRoute ? (
      <Link
        to={link.href}
        className="group/l flex w-fit items-center gap-2 py-[5px] text-[0.86rem] tracking-[0.06em] text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-white"
      >
        {link.label}
        <span className="flex w-0 items-center overflow-hidden text-[#d4cfc7] opacity-0 transition-all duration-300 group-hover/l:w-4 group-hover/l:opacity-100">
          <LuArrowRight size={13} />
        </span>
      </Link>
    ) : (
      <a
        href={link.href}
        className="group/l flex w-fit items-center gap-2 py-[5px] text-[0.86rem] tracking-[0.06em] text-white/55 transition-all duration-300 hover:translate-x-1 hover:text-white"
      >
        {link.label}
        <span className="flex w-0 items-center overflow-hidden text-[#d4cfc7] opacity-0 transition-all duration-300 group-hover/l:w-4 group-hover/l:opacity-100">
          <LuArrowRight size={13} />
        </span>
      </a>
    );

  return (
    <footer
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#111]"
    >
      <style>{`
        .foot-watermark{
          font-family:${DISPLAY};
          font-size:clamp(9rem,30vw,26rem);line-height:1;letter-spacing:.05em;white-space:nowrap;
          color:transparent;-webkit-text-stroke:1px rgba(212,207,199,.11);
          -webkit-mask-image:radial-gradient(ellipse 72% 62% at 50% 50%,#000 20%,transparent 82%);
          mask-image:radial-gradient(ellipse 72% 62% at 50% 50%,#000 20%,transparent 82%);
        }
      `}</style>

      {/* ── FILIGRANE CWS EN FOND ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      >
        <span className="foot-watermark select-none">CWS</span>
      </div>

      {/* halo taupe + grain + liseré haut */}
      <div className="pointer-events-none absolute top-[-160px] left-1/2 z-[1] -translate-x-1/2 h-[420px] w-[900px] rounded-full bg-[#d4cfc7] opacity-[0.05] blur-[130px]" />
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute top-0 left-0 right-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#d4cfc7]/35 to-transparent" />

      <div className="relative z-[2] mx-auto max-w-[960px] px-6 pt-20 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] sm:px-10 md:pt-24 lg:px-16">

        {/* ── LOGO seul au-dessus de la grille ── */}
        <div className="mb-10">
          <Link to="/" className="inline-block">
            <LazyImage
              publicId="cws-site/image-logo"
              width={800}
              eager={true}
              alt="Logo CWS"
              className="h-16 sm:h-20 md:h-24 w-auto max-w-[280px] sm:max-w-[360px] aspect-[3/2]"
              imgClassName="object-contain object-left"
            />
          </Link>
        </div>

        {/* ── GRILLE 4 colonnes ── */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[3fr_2fr_3fr_4fr] lg:gap-8">

          {/* Col 1 : Marque */}
          <div>
            {/* En-tête aligné avec "Navigation", "Informations", "Contact" */}
            <div className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#b3a996]">
              Coach Wellness Sports
            </div>
            {/* Contenu aligné avec les liens des autres colonnes */}
            <p className="max-w-[26ch] text-[0.86rem] leading-relaxed text-white/80">
              Un club à taille humaine, du matériel MATRIX et des coachs diplômés pour vous
              accompagner, séance après séance.
            </p>
          </div>

          {/* Col 2 : Navigation */}
          <div>
            <div className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#b3a996]">
              Navigation
            </div>
            <nav className="flex flex-col">
              {navLinks.map((l) => (
                <NavLink key={l.label} link={l} />
              ))}
            </nav>
          </div>

          {/* Col 3 : Informations */}
          <div>
            <div className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#b3a996]">
              Informations
            </div>
            <nav className="flex flex-col">
              {legalLinks.map((l) => (
                <NavLink key={l.label} link={l} />
              ))}
            </nav>
          </div>

          {/* Col 4 : Contact + newsletter */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="mb-4 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#b3a996]">
                Contact
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="w-fit text-[0.86rem] tracking-[0.05em] text-white/80 transition-colors duration-300 hover:text-white"
                >
                  {phone}
                </a>
                <a
                  href={`mailto:${emailContact}`}
                  className="w-fit break-all text-[0.86rem] tracking-[0.05em] text-white/80 transition-colors duration-300 hover:text-white"
                >
                  {emailContact}
                </a>
                <p className="pt-1 text-[0.82rem] leading-[1.7] tracking-[0.05em] text-white/80">
                  {address1}
                  <br />
                  {address2}
                </p>
              </div>
            </div>

            {/* ══════════ FORMULAIRE NEWSLETTER ══════════ */}
            <div>
              <p className="mb-3 max-w-[26ch] text-[0.68rem] uppercase leading-snug tracking-[0.16em] text-white/60">
                Inscrivez-vous pour recevoir nos actualités
              </p>

              <form
                onSubmit={handleSubscribe}
                className="flex max-w-[300px] items-center border-b border-white/20 transition-colors duration-300 focus-within:border-[#d4cfc7]"
              >
                <input
                  type="email"
                  required
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  className="w-full min-w-0 bg-transparent py-2.5 text-sm tracking-wide text-white outline-none placeholder:text-white/30 disabled:opacity-50"
                />
                <button
                  type="submit"
                  aria-label="S'inscrire"
                  disabled={status === 'loading'}
                  className="flex flex-shrink-0 pl-3 text-white/50 transition-colors duration-300 hover:text-[#d4cfc7] disabled:cursor-wait disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <LuArrowRight size={18} />
                  )}
                </button>
              </form>

              {status === 'success' && message && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-[0.9rem] italic text-[#d4cfc7]"
                >
                  {message}
                </motion.p>
              )}

              {status === 'error' && message && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-[0.8rem] text-red-400/90"
                >
                  {message}
                </motion.p>
              )}
            </div>
          </div>
        </div>

        {/* ══════════ RÉSEAUX ══════════ */}
        <div className="mt-14 flex items-center gap-3 md:mt-16">
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4cfc7] hover:bg-[#d4cfc7] hover:text-[#1a1a1a]"
          >
            <LuInstagram size={19} />
          </a>
          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4cfc7] hover:bg-[#d4cfc7] hover:text-[#1a1a1a]"
          >
            <LuFacebook size={19} />
          </a>
        </div>

        {/* ══════════ BAS DE PAGE ══════════ */}
        <div
          className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-7 sm:flex-row sm:items-center"
        >
          <p className="text-[0.68rem] uppercase tracking-[0.12em] text-white/40">
            © CWS {new Date().getFullYear()}. Tous droits réservés.
          </p>
          <p className="text-[0.68rem] uppercase tracking-[0.12em] text-white/40">
            La Ville aux Dames <span className="text-[#b3a996]">·</span> 37
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;