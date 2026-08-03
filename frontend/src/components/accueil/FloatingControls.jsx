import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuVolume2, LuVolumeX, LuX, LuSettings2 } from 'react-icons/lu';

const FloatingControls = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const toggleMute = () => {
    const video = document.getElementById('hero-video');
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const muteAndHide = () => {
    const video = document.getElementById('hero-video');
    if (video) {
      video.muted = true;
      setIsMuted(true);
    }
    setShowControls(false);
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          BOUTONS FLOTTANTS — FIXES sur toute la page d'accueil
          z-[60] → au-dessus de la navbar (z-50)
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-10 right-10 z-[60] flex flex-col gap-4"
          >
            {/* Bouton 1 : Activer / Couper le son */}
            <button
              onClick={toggleMute}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#f5f5dc] hover:bg-white text-[#0a0a0a] flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 border border-white/20"
              aria-label={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? <LuVolumeX size={24} /> : <LuVolume2 size={24} />}
            </button>

            {/* Bouton 2 : Croix (Coupe le son et ferme) */}
            <button
              onClick={muteAndHide}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0a0a0a]/90 hover:bg-black text-[#f5f5dc] border border-white/20 hover:border-white/40 flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110"
              aria-label="Couper le son et masquer"
            >
              <LuX size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Petit bouton discret (réapparaît après clic sur X) ── */}
      <AnimatePresence>
        {!showControls && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowControls(true)}
            className="fixed bottom-10 right-10 z-[60] w-10 h-10 rounded-full bg-[#0a0a0a]/60 hover:bg-[#0a0a0a]/80 border border-white/20 text-[#f5f5dc] flex items-center justify-center backdrop-blur-md transition-all duration-300"
            aria-label="Afficher les options de la vidéo"
          >
            <LuSettings2 size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingControls;