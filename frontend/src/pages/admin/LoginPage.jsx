import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { LuArrowRight, LuArrowLeft } from 'react-icons/lu';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'Échec de la connexion. Vérifiez vos identifiants.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[100dvh] w-full bg-[#0a0a0a] text-white">

            {/* ══════════════════════════════════════════
          PARTIE GAUCHE : VISUEL & BRANDING (Centré verticalement)
      ══════════════════════════════════════════ */}
            <div className="relative hidden w-1/2 overflow-hidden border-r border-white/5 lg:flex lg:items-center lg:justify-center lg:p-16 xl:p-24">

                {/* Arrière-plan : Filigrane CWS Géant */}
                <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
                    <span
                        className="select-none text-[24rem] font-bold leading-none tracking-tighter text-transparent opacity-[0.03] -webkit-text-stroke-2px-white xl:text-[32rem]"
                        style={{ fontFamily: "'Anton', sans-serif", WebkitTextStroke: "2px rgba(255,255,255,0.1)" }}
                    >
                        CWS
                    </span>
                </div>

                {/* Halos lumineux */}
                <div className="pointer-events-none absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#d4cfc7] opacity-[0.05] blur-[120px]" />
                <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#d4cfc7] opacity-[0.03] blur-[150px]" />

                {/* Contenu Centré */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-lg text-center lg:text-left"
                >
                    <h1
                        className="text-6xl leading-none tracking-tight text-white xl:text-7xl"
                        style={{ fontFamily: "'Anton', sans-serif" }}
                    >
                        C<span className="text-[#d4cfc7]">W</span>S
                    </h1>
                    <p className="mt-4 text-xs font-light uppercase tracking-[0.4em] text-white/40">
                        Coach Wellness Sports
                    </p>

                    <div className="my-10 h-px w-24 bg-gradient-to-r from-[#d4cfc7]/50 to-transparent mx-auto lg:mx-0" />

                    <h2 className="text-4xl font-light leading-tight tracking-tight text-white xl:text-5xl">
                        L'excellence se gère <br />
                        <span className="font-bold text-[#d4cfc7]">dans les détails.</span>
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-white/50">
                        Accédez à votre espace de gestion pour piloter les inscriptions, suivre l'engagement de notre communauté et optimiser l'expérience de nos adhérents au club.
                    </p>
                </motion.div>
            </div>

            {/* ══════════════════════════════════════════
          PARTIE DROITE : FORMULAIRE DE CONNEXION (Centré verticalement)
      ══════════════════════════════════════════ */}
            <div className="relative flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20 xl:px-32">

                {/* Lien de retour vers le site public (en haut à droite) */}
                <Link
                    to="/"
                    className="group absolute right-6 top-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white/50 transition-all duration-300 hover:border-[#d4cfc7]/40 hover:bg-white/[0.05] hover:text-[#d4cfc7] sm:right-12 lg:right-20 xl:right-32"
                >
                    <LuArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
                    Retour au site
                </Link>

                {/* Header Mobile (Visible uniquement sur mobile/tablette) */}
                <div className="absolute left-6 top-8 lg:hidden">
                    <h1 className="text-3xl font-bold tracking-tight text-white" style={{ fontFamily: "'Anton', sans-serif" }}>
                        C<span className="text-[#d4cfc7]">W</span>S
                    </h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Bon retour parmi nous.
                        </h2>
                        <p className="mt-3 text-sm text-white/50">
                            Connectez-vous pour accéder au tableau de bord administrateur.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Message d'erreur */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="overflow-hidden rounded-xl border border-red-500/20 bg-red-500/10"
                            >
                                <p className="px-4 py-3 text-sm text-red-400">{error}</p>
                            </motion.div>
                        )}

                        {/* Champ Email (Sans icône) */}
                        <div className="group space-y-2">
                            <label htmlFor="email" className="block text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white/40 transition-colors group-focus-within:text-[#d4cfc7]">
                                Adresse Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[#d4cfc7]/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-[#d4cfc7]/50"
                                placeholder="admin@cws.com"
                            />
                        </div>

                        {/* Champ Mot de passe (Sans icône) */}
                        <div className="group space-y-2">
                            <label htmlFor="password" className="block text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white/40 transition-colors group-focus-within:text-[#d4cfc7]">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[#d4cfc7]/50 focus:bg-white/[0.04] focus:ring-1 focus:ring-[#d4cfc7]/50"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Bouton Submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#d4cfc7] py-4 text-sm font-bold uppercase tracking-[0.1em] text-[#0a0a0a] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(212,207,199,0.2)] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Connexion en cours...
                                    </span>
                                ) : (
                                    <>
                                        Accéder au Dashboard
                                        <LuArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Pied de page du formulaire */}
                    <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-6">
                        <p className="text-[0.65rem] uppercase tracking-[0.15em] text-white/20">
                            © CWS {new Date().getFullYear()}
                        </p>
                        <p className="text-[0.65rem] uppercase tracking-[0.15em] text-white/20">
                            Accès Restreint
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;