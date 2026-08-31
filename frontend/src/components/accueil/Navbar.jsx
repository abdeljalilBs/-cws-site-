import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuChevronRight, LuMenu, LuX, LuLock } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Détecter le scroll pour accentuer l'effet de la pilule (Glassmorphism)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // ─── Liens de navigation ───────────────────────────────────
  const navLinks = [
    { name: 'Accueil', to: '/' },
    { name: 'Le club', to: '/club' },
    { name: 'Les coachs', to: '/coachs' },
    { name: 'Les cours', to: '/activites' },
    { name: 'Les plannings', to: '/plannings' },
    { name: 'Tarifs', to: '/tarifs' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none">

      {/* LA PILULE FLOTTANTE (Style Premium / Moderne) */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-full border transition-all duration-500 ${isScrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-white/10 shadow-2xl py-2'
          : 'bg-[#0a0a0a]/40 backdrop-blur-md border-white/5'
          }`}
      >

        {/* Logo CWS */}
        <Link to="/" className="flex-shrink-0 mr-8">
          <img
            src="/image-logo.png?v=2"
            alt="Coach Wellness Sports Logo"
            className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'}`}
          />
        </Link>

        {/* Liens Desktop (Centrés dans la pilule) */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-grow justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-1"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions à droite (Contact) */}
        <div className="hidden lg:flex items-center gap-4 ml-8">
          {/* Lien Admin retiré temporairement
          <Link
            to="/admin/login"
            title="Espace administrateur"
            className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-gray-400 hover:text-[#d4cfc7] transition-colors duration-300"
          >
            <LuLock size={13} />
            Admin
          </Link>
          */}

          {/* Bouton Contact (Style Pilule inversée - Blanc sur fond sombre) */}
          <Link
            to="/contact"
            className="group flex items-center gap-2 bg-white hover:bg-gray-200 text-black px-5 py-2 rounded-full font-bold text-sm transition-all duration-300"
          >
            Contact
            <LuChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bouton Menu Mobile avec séparateur */}
        <div className="lg:hidden flex items-center gap-4 ml-auto">
          <span className="h-5 w-px bg-white/20" />
          <button
            className="text-white focus:outline-none flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* MENU MOBILE (S'ouvre sous la pilule avec animation fluide) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 left-4 right-4 lg:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl pointer-events-auto"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-gray-200 hover:text-white font-medium flex items-center justify-between py-2 border-b border-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Lien Admin discret (mobile) retiré temporairement
              <Link
                to="/admin/login"
                className="flex items-center gap-2 text-gray-400 hover:text-[#d4cfc7] font-medium py-2 border-b border-white/5 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LuLock size={15} />
                Espace Admin
              </Link>
              */}

              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact <LuChevronRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;