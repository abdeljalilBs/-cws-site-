import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuVolume2, LuVolumeX, LuX, LuSettings2 } from 'react-icons/lu';

const FloatingControls = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [hasAudio, setHasAudio] = useState(true);   // ⭐ sait si la vidéo a du son

  // ─── Au montage : vérifie la piste audio + synchronise l'état ───
  useEffect(() => {
    const video = document.getElementById('hero-video');
    if (!video) return;

    const checkAudio = () => {
      // Si aucune piste audio → on le signale
      if (video.audioTracks && video.audioTracks.length === 0) {
        setHasAudio(false);
        console.warn('⚠️ La vidéo hero-video.mp4 n\'a AUCUNE piste audio. Le son ne pourra jamais sortir.');
      } else {
        console.log('✅ La vidéo a une piste audio. Le son devrait fonctionner.');
      }
    };

    if (video.readyState >= 1) {
      checkAudio();
    } else {
      video.addEventListener('loadedmetadata', checkAudio);
    }

    // Synchronise l'état React avec la vraie valeur muet de la vidéo
    const syncMute = () => setIsMuted(video.muted);
    video.addEventListener('volumechange', syncMute);

    return () => {
      video.removeEventListener('loadedmetadata', checkAudio);
      video.removeEventListener('volumechange', syncMute);
    };
  }, []);

  // ─── Toggle son FORCÉ (contourne le blocage navigateur) ─────
  const toggleMute = async () => {
    const video = document.getElementById('hero-video');
    if (!video) return;

    if (video.muted) {
      // → Activer le son
      video.muted = false;
      video.volume = 1;              // ⭐ force le volume à 100%
      try {
        await video.play();          // ⭐ OBLIGATOIRE : débloque le son sur Chrome/Safari
        setIsMuted(false);
      } catch (err) {
        console.error('❌ Le navigateur bloque le son :', err);
        video.muted = true;
        setIsMuted(true);
      }
    } else {
      // → Couper le son
      video.muted = true;
      setIsMuted(true);
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
          BOUTONS FLOTTANTS
      ══════════════════════════════════════════ */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-10 right-10 z-[60] flex flex-col gap-4"
          >
            {/* Bouton 1 : Activer / Couper le son (grisé si pas de piste audio) */}
            <button
              onClick={toggleMute}
              disabled={!hasAudio}
              className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md transition-all duration-300 border ${!hasAudio
                  ? 'bg-white/10 text-white/30 border-white/10 cursor-not-allowed'
                  : 'bg-[#f5f5dc] hover:bg-white text-[#0a0a0a] border-white/20 hover:scale-110'
                }`}
              aria-label={isMuted ? "Activer le son" : "Couper le son"}
              title={!hasAudio ? "Cette vidéo n'a pas de piste audio" : ""}
            >
              {isMuted ? <LuVolumeX size={24} /> : <LuVolume2 size={24} />}
            </button>

            {/* Bouton 2 : Croix */}
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

      {/* Petit bouton discret */}
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