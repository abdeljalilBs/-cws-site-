import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuChevronDown, LuChevronRight, LuMenu, LuX } from 'react-icons/lu'; 

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Détecter le scroll pour accentuer l'effet de la pilule (Glassmorphism)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#' },
    { name: 'Le club', href: '#club' },
    { name: 'Les coachs', href: '#coachs' },
    { name: 'Les activités', href: '#activites', hasDropdown: true },
    { name: 'Les plannings', href: '#plannings' },
    { name: 'Tarifs', href: '#tarifs' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none">
      
      {/* LA PILULE FLOTTANTE (Style Premium / Moderne) */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-full border transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-white/10 shadow-2xl py-2' // Effet verre sombre flouté au scroll
            : 'bg-[#0a0a0a]/40 backdrop-blur-md border-white/5' // Plus transparent tout en haut
        }`}
      >
        
        {/* Logo CWS */}
        <a href="#" className="flex-shrink-0 mr-8">
          <img 
            src="/Image_logo.png" 
            alt="Coach Wellness Sports Logo" 
            className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-8' : 'h-10'}`}
          />
        </a>

        {/* Liens Desktop (Centrés dans la pilule) */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-grow justify-center">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-1"
            >
              {link.name}
              {link.hasDropdown && <LuChevronDown size={14} className="opacity-70" />}
            </a>
          ))}
        </div>

        {/* Bouton Contact (Style Pilule inversée - Blanc sur fond sombre) */}
        <div className="hidden lg:block ml-8">
          <a 
            href="#contact"
            className="group flex items-center gap-2 bg-white hover:bg-gray-200 text-black px-5 py-2 rounded-full font-bold text-sm transition-all duration-300"
          >
            Contact
            <LuChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Bouton Menu Mobile */}
        <button 
          className="lg:hidden text-white focus:outline-none ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>
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
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-gray-200 hover:text-white font-medium flex items-center justify-between py-2 border-b border-white/5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  {link.hasDropdown && <LuChevronDown size={16} />}
                </a>
              ))}
              <a 
                href="#contact"
                className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact <LuChevronRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;