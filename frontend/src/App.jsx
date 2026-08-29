import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { useAuth } from './context/AuthContext'; // <-- Import du contexte

// Composants partagés (toujours visibles → import normal)
import Navbar from './components/accueil/Navbar';
import Footer from './components/accueil/Footer';
import PageTitle from './components/PageTitle';

// ─── Pages en LAZY LOADING (Site Public) ─────
const Accueil = lazy(() => import('./pages/Accueil'));
const ClubPage = lazy(() => import('./components/club/ClubPage'));
const TarifsPage = lazy(() => import('./components/tarifs/TarifsPage'));
const PlanningsPage = lazy(() => import('./components/plannings/PlanningsPage'));
const ActivitesPage = lazy(() => import('./components/activites/ActivitesPage'));
const ContactPage = lazy(() => import('./components/Contact/Contact'));
const CoachsPage = lazy(() => import('./components/Coachs/Coachs'));
const MentionsLegales = lazy(() => import('./components/mentions/MentionsLegales'));

// ─── Pages en LAZY LOADING (Admin) ─────
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));

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

// ─── Protection des routes Admin ──────────────────────────────────
const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return <PageLoader />; // On utilise ton loader existant
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

// ─── Layout Principal (Gère la présence ou non de Navbar/Footer) ──
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col">
      <PageTitle />

      {/* On n'affiche PAS la Navbar si on est sur /admin */}
      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        {children}
      </main>

      {/* On n'affiche PAS le Footer si on est sur /admin */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <MainLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>

            {/* ══════════════════════════════════════════
                ROUTES PUBLIQUES
            ══════════════════════════════════════════ */}
            <Route path="/" element={<Accueil />} />
            <Route path="/club" element={<ClubPage />} />
            <Route path="/tarifs" element={<TarifsPage />} />
            <Route path="/plannings" element={<PlanningsPage />} />
            <Route path="/activites" element={<ActivitesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/coachs" element={<CoachsPage />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />

            {/* ══════════════════════════════════════════
                ROUTES ADMIN (Protégées)
            ══════════════════════════════════════════ */}
            <Route path="/admin/login" element={<LoginPage />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
            </Route>

          </Routes>
        </Suspense>
      </MainLayout>

    </BrowserRouter>
  );
}

export default App;