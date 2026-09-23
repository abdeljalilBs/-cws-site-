import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LuAward, LuDumbbell, LuQuote } from 'react-icons/lu';

// ⬇️ IMPORTS CORRIGÉS selon ton dossier src/assets/
import justineImg from '../../assets/justine.png';
import marionImg from '../../assets/marion.png';
import bilalImg from '../../assets/bilal.png';

const DISPLAY = "'Anton', sans-serif";
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";

/* ─── Données des Coachs (Extraites de l'ancien site) ───────── */
const coachesData = [
    {
        id: 1,
        name: "UNE NOUVELLE ÉQUIPE",
        role: "Bientôt disponible",
        image: null,
        bio: "Nous préparons l'arrivée d'une toute nouvelle équipe pour vous accompagner dans vos objectifs. Restez connectés pour découvrir ceux qui vous guideront vers le sommet !",
        quote: "LE MEILLEUR RESTE À VENIR.",
        sports: ["Fitness", "Musculation", "Cardio", "Cross-training"],
        qualities: ["Passion", "Expertise", "Motivation"],
        formations: ["Diplômés d'État", "Experts en coaching"],
        prestations: ["Perte de poids", "Prise de masse", "Accompagnement"]
    },
    {
        id: 2,
        name: "DE NOUVEAUX COACHS",
        role: "Prochainement",
        image: null,
        bio: "Des passionnés, experts dans leur domaine, rejoindront bientôt le club pour vous offrir un suivi sur-mesure et vous pousser à vous dépasser à chaque séance.",
        quote: "PRÉPAREZ-VOUS À TRANSPIRER.",
        sports: ["Boxe", "Pilates", "Yoga", "Réathlétisation"],
        qualities: ["Dynamisme", "Écoute", "Rigueur"],
        formations: ["BPJEPS", "Spécialistes santé"],
        prestations: ["Bien-être", "Performance", "Entretien"]
    }
];

/* ─── Orbes flottantes animées (fond dynamique) ─────────────── */
const FloatingOrbs = () => (
    <>
        <motion.span
            animate={{ x: [0, 60, -30, 0], y: [0, -50, 40, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute top-[20%] left-[5%] h-72 w-72 rounded-full bg-[#d4cfc7]/[0.03] blur-[100px]"
        />
        <motion.span
            animate={{ x: [0, -50, 40, 0], y: [0, 60, -30, 0], scale: [1, 0.9, 1.15, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute bottom-[10%] right-[5%] h-80 w-80 rounded-full bg-[#b3a996]/[0.03] blur-[110px]"
        />
    </>
);

/* ─── Composant Carte Coach ─────────────────────────────────── */
const CoachCard = ({ coach, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Alterner la disposition (image à gauche / image à droite)
    const isReversed = index % 2 !== 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative grid gap-12 lg:gap-20 items-center py-16 md:py-24 border-b border-white/5 last:border-0 ${isReversed ? 'lg:grid-cols-[1fr_1.2fr]' : 'lg:grid-cols-[1.2fr_1fr]'}`}
        >

            {/* ── Colonne Image ── */}
            <div className={`relative group ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111] aspect-[4/5]">
                    {/* Effet Noir & Blanc -> Couleur au survol + Zoom ou Placeholder */}
                    {coach.image ? (
                        <motion.img
                            src={coach.image}
                            alt={coach.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                            whileHover={{ scale: 1.03 }}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                            <span className="text-white/20 uppercase tracking-[0.3em] font-bold text-sm italic px-4 text-center">En cours de recrutement...</span>
                        </div>
                    )}
                    {/* Dégradé sombre en bas de l'image pour la lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />

                    {/* Badge Rôle sur l'image */}
                    <div className="absolute bottom-6 left-6 right-6">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#0a0a0a]/80 backdrop-blur-md border border-[#d4cfc7]/20 text-[#d4cfc7] text-xs font-bold uppercase tracking-widest shadow-lg">
                            {coach.role}
                        </span>
                    </div>
                </div>
                {/* Élément décoratif premium derrière l'image */}
                <div className={`absolute -z-10 top-8 w-full h-full border border-[#d4cfc7]/10 rounded-2xl ${isReversed ? '-left-8' : '-right-8'}`} />
            </div>

            {/* ── Colonne Contenu ── */}
            <div className={`flex flex-col ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>

                {/* Nom & Citation */}
                <div className="mb-8">
                    <h3 style={{ fontFamily: DISPLAY }} className="text-[clamp(2.5rem,8vw,3rem)] md:text-6xl lg:text-7xl uppercase text-white leading-none mb-6 tracking-tight">
                        {coach.name}
                    </h3>
                    <div className="flex items-start gap-4 p-4 border-l-2 border-[#d4cfc7]/50 bg-white/[0.02] rounded-r-lg">
                        <LuQuote className="text-[#d4cfc7] flex-shrink-0 mt-1 opacity-50" size={28} />
                        <p style={{ fontFamily: SERIF }} className="text-xl md:text-2xl italic text-[#d4cfc7] leading-relaxed">
                            "{coach.quote}"
                        </p>
                    </div>
                </div>

                {/* Bio */}
                <p className="text-white/70 text-lg font-light leading-relaxed mb-10 max-w-xl">
                    {coach.bio}
                </p>

                {/* Grille d'informations (Sports, Qualités) */}
                <div className="grid gap-8 sm:grid-cols-2 mb-10">

                    {/* Sports */}
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
                            <LuDumbbell size={14} className="text-[#d4cfc7]" /> Expertises
                        </h4>
                        <ul className="space-y-2.5">
                            {coach.sports.map((sport, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/80 text-sm font-light">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#d4cfc7]/60" /> {sport}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Qualités */}
                    <div>
                        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
                            <LuAward size={14} className="text-[#d4cfc7]" /> État d'esprit
                        </h4>
                        <ul className="space-y-2.5">
                            {coach.qualities.map((quality, i) => (
                                <li key={i} className="flex items-center gap-3 text-white/80 text-sm font-light">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#d4cfc7]/60" /> {quality}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Prestations (Tags premium) */}
                <div className="pt-8 border-t border-white/10">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Accompagnements</h4>
                    <div className="flex flex-wrap gap-3">
                        {coach.prestations.map((prestation, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-white/60 text-sm hover:border-[#d4cfc7]/40 hover:text-[#d4cfc7] hover:bg-white/[0.05] transition-all duration-300 cursor-default"
                            >
                                {prestation}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Formations (Diplômes) */}
                <div className="mt-8">
                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Certifications</h4>
                    <p className="text-white/40 text-sm font-light leading-relaxed italic">
                        {coach.formations.join("  •  ")}
                    </p>
                </div>

            </div>
        </motion.div>
    );
};

/* ─── Page Coachs ───────────────────────────────────────────── */
const Coachs = () => {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

    return (
        <div className="relative w-full overflow-hidden bg-[#0a0a0a] min-h-[100dvh] pt-32 pb-20">
            <FloatingOrbs />

            <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">

                {/* ── Header de la section ── */}
                <div ref={headerRef} className="mb-20 flex flex-col items-center text-center gap-6">
                    <motion.em
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        style={{ fontFamily: SERIF }}
                        className="text-lg tracking-[0.14em] uppercase text-[#b3a996] italic"
                    >
                        #TRAINBETTER
                    </motion.em>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        style={{ fontFamily: DISPLAY }}
                        className="text-[clamp(2rem,8vw,2.25rem)] sm:text-6xl md:text-7xl uppercase leading-[0.94] tracking-tight text-white"
                    >
                        Les Coachs <span className="text-[#d4cfc7]">CWS</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl text-white/60 text-lg font-light leading-relaxed mt-4"
                    >
                        La qualité de notre concept passe par le professionnalisme de nos coachs. C'est pour cela que tous les coachs sont diplômés, passionnés et à l'écoute de vos besoins.
                        <br /><br />
                        La gestion efficace de la salle permet de s'assurer que chaque adhérent soit satisfait de son expérience avec Coach Wellness Sports.
                    </motion.p>
                </div>

                {/* ── Liste des Coachs ── */}
                <div className="flex flex-col">
                    {coachesData.map((coach, index) => (
                        <CoachCard key={coach.id} coach={coach} index={index} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Coachs;