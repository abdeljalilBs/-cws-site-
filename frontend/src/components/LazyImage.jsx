import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LazyImage = ({ src, alt, className, imgClassName, eager = false, ...props }) => {
  const [loaded, setLoaded] = useState(false);
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
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full transition-all duration-700 ease-out ${
          loaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-md'
        } ${imgClassName || ''}`}
      />
    </div>
  );
};

export default LazyImage;