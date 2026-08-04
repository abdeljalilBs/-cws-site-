import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Image avec lazy loading natif + effet de fade-in au chargement
 * + placeholder flouté pendant le chargement.
 *
 * Props :
 *  - src          : source de l'image
 *  - alt          : texte alternatif
 *  - className    : classes du conteneur (dimensions, position)
 *  - imgClassName : classes supplémentaires pour l'<img> (object-cover, hover scale...)
 *  - eager        : si true → chargement prioritaire (pour les images visibles immédiatement, ex: Hero)
 *                   si false (défaut) → lazy loading au scroll
 */
const LazyImage = ({ src, alt, className, imgClassName, eager = false, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className || ''}`} {...props}>
      {/* Placeholder flouté (fond crème) pendant le chargement */}
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
        loading={eager ? 'eager' : 'lazy'}   // ⭐ eager pour le hero, lazy pour le reste
        decoding="async"                      // ⭐ décodage asynchrone (ne bloque pas le rendu)
        onLoad={() => setLoaded(true)}
        className={`w-full h-full transition-all duration-700 ease-out ${
          loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-md'
        } ${imgClassName || ''}`}
      />
    </div>
  );
};

export default LazyImage;