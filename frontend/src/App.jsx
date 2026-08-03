import Navbar from './components/accueil/Navbar';
import Hero from './components/accueil/Hero';
import FloatingControls from './components/accueil/FloatingControls';
import ClubSection from './components/accueil/ClubSection';
import AboutSection from './components/accueil/AboutSection';
import TestimonialsSection from './components/accueil/TestimonialsSection';
import CoachesSection from './components/accueil/CoachesSection';
import CtaSection from './components/accueil/CtaSection';
import Footer from './components/accueil/Footer';
function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Navbar />
      <FloatingControls />
      <Hero />
      <ClubSection />
      <AboutSection />
      <TestimonialsSection />
      <CoachesSection />
      <CtaSection />
    <Footer />
    </div>
  );
}

export default App;