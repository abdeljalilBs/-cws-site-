// src/components/LazyImage.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LazyImage = ({
  src,
  alt,
  className,
  imgClassName,
  eager = false,
  publicId,
  width = 800, // Valeur par défaut
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  // ✅ CORRECTION ICI : Utiliser import.meta.env pour Vite
  // Le préfixe doit être VITE_ et non REACT_APP_
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'qupvgw44';

  // Logique de construction de l'URL
  const finalSrc = (publicId && cloudName)
    ? `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_${width}/${publicId}`
    : src;

  return (
    <div className={`relative overflow-hidden ${className || ''}`} {...props}>
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
        src={finalSrc}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-md'
          } ${imgClassName || ''}`}
      />
    </div>
  );
};

export default LazyImage;