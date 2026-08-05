import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';

// Composants partagés (toujours visibles → import normal)
import Navbar from './components/accueil/Navbar';
import Footer from './components/accueil/Footer';
import FloatingControls from './components/accueil/FloatingControls';
import PageTitle from './components/PageTitle';

// ─── Pages en LAZY LOADING (chargées uniquement à la demande) ─────
const Accueil = lazy(() => import('./pages/Accueil'));
const ClubPage = lazy(() => import('./components/club/ClubPage'));
const TarifsPage = lazy(() => import('./components/tarifs/TarifsPage'));
const PlanningsPage = lazy(() => import('./components/plannings/PlanningsPage'));
const ActivitesPage = lazy(() => import('./components/activites/ActivitesPage'));
const ContactPage = lazy(() => import('./components/Contact/Contact'));
const CoachsPage = lazy(() => import('./components/Coachs/Coachs'));
// ─── Loader pendant le chargement d'une page ──────────────────────
const PageLoader = () => (
  <div className="flex min-h-[80vh] items-center justify-center bg-[#0a0a0a]">
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#d4cfc7]/20 border-t-[#d4cfc7]" />
      <span className="text-xs uppercase tracking-[0.2em] text-white/40">Chargement...</span>
    </div>
  </div>
);

// ─── Scroll en haut à chaque changement de page ───────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-[#0a0a0a] min-h-screen">
        <PageTitle />
        <Navbar />
        <FloatingControls />

        {/* ══════════════════════════════════════════
            ROUTES avec Suspense (lazy loading)
            /           → Accueil
            /club       → Le club
            /tarifs     → Tarifs + FAQ
            /plannings  → Plannings
        ══════════════════════════════════════════ */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/club" element={<ClubPage />} />
            <Route path="/tarifs" element={<TarifsPage />} />
            <Route path="/plannings" element={<PlanningsPage />} />
            <Route path="/activites" element={<ActivitesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/coachs" element={<CoachsPage />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;