import Hero from './components/Hero';

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden">
      {/* Section Vidéo Immersive (Page d'accueil) */}
      <Hero />
      
      {/* On ajoutera les autres sections ici plus tard (Philosophie, Offres, etc.) */}
    </div>
  );
}

export default App;