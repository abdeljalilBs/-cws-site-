import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Vidéo en arrière-plan (Inspiration BXR London) */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Ton navigateur ne supporte pas la vidéo.
      </video>

      {/* Dégradé sombre pour rendre le texte lisible (Noir chaud / Bleu nuit) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#0a0a0a]"></div>

      {/* Contenu Textuel (Typographie imposante) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6"
        >
          Performance <span className="text-gray-400">&</span> Humain
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-light"
        >
          Une salle premium, humaine et encadrée à La Ville-aux-Dames.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors duration-300"
        >
          Découvrir la salle
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;