import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
    LuMail,
    LuCalendar,
    LuRefreshCw,
    LuUsers,
    LuDownload,
    LuSearch,
    LuTrash2,
    LuX,
    LuTriangleAlert,
} from 'react-icons/lu';

const DashboardPage = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    const [exporting, setExporting] = useState(false);

    // Abonné en attente de confirmation de suppression (null = aucune modale)
    const [confirmDelete, setConfirmDelete] = useState(null);

    // ── FETCH SUBSCRIBERS ───────────────────────────────────────
    const fetchSubscribers = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await api.request('/api/admin/subscribers');
            setSubscribers(data);
        } catch (err) {
            setError('Impossible de charger les abonnés.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubscribers();
    }, []);

    // ── EXPORT PDF ──────────────────────────────────────────────
    // Le PDF est généré côté client à partir des abonnés déjà chargés.
    // Pas de fetch séparé : ça marche en local comme en ligne, sans token.
    const handleExportPDF = () => {
        setExporting(true);
        setError('');
        try {
            if (subscribers.length === 0) {
                setError('Aucun abonné à exporter.');
                return;
            }

            const doc = new jsPDF();

            // ── En-tête du document ──
            doc.setFontSize(18);
            doc.setTextColor(20, 20, 20);
            doc.text('CWS — Liste des abonnés', 14, 20);

            doc.setFontSize(10);
            doc.setTextColor(120, 120, 120);
            doc.text(
                `Exporté le ${new Date().toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}`,
                14,
                27
            );
            doc.text(`Total : ${subscribers.length} abonné(s)`, 14, 33);

            // ── Tableau ──
            const rows = subscribers.map((sub) => [
                sub.email,
                new Date(sub.subscribedAt).toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            ]);

            autoTable(doc, {
                startY: 40,
                head: [['Adresse email', "Date d'inscription"]],
                body: rows,
                theme: 'striped',
                headStyles: {
                    fillColor: [26, 26, 26],
                    textColor: [212, 207, 199],
                    fontStyle: 'bold',
                },
                styles: {
                    fontSize: 10,
                    cellPadding: 3,
                },
                alternateRowStyles: {
                    fillColor: [245, 244, 242],
                },
            });

            doc.save(
                `abonnes_cws_${new Date().toISOString().slice(0, 10)}.pdf`
            );
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la génération du PDF.');
        } finally {
            setExporting(false);
        }
    };

    // ── SUPPRESSION ─────────────────────────────────────────────
    // Étape 1 : on ouvre la modale de confirmation (plus de window.confirm)
    const askDeleteSubscriber = (sub) => {
        setConfirmDelete(sub);
    };

    // Étape 2 : suppression réelle après confirmation dans la modale
    const confirmDeleteSubscriber = async () => {
        if (!confirmDelete) return;

        const id = confirmDelete._id;
        setDeletingId(id);
        setConfirmDelete(null);

        try {
            await api.request(`/api/admin/subscribers/${id}`, {
                method: 'DELETE',
            });
            setSubscribers((prev) => prev.filter((sub) => sub._id !== id));
        } catch (err) {
            console.error(err);
            setError('Erreur lors de la suppression.');
        } finally {
            setDeletingId(null);
        }
    };

    // ── STATISTIQUES ────────────────────────────────────────────
    const totalSubscribers = subscribers.length;
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const newThisMonth = subscribers.filter(
        (sub) => new Date(sub.subscribedAt) >= firstDayOfMonth
    ).length;

    // ── FILTRAGE RECHERCHE ──────────────────────────────────────
    const filteredSubscribers = subscribers.filter((sub) =>
        sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ── ANIMATIONS ──────────────────────────────────────────────
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <div className="mx-auto max-w-6xl space-y-8">

            {/* ── EN-TÊTE ─────────────────────────────────────────── */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <h1
                        className="text-3xl font-bold tracking-tight text-white"
                        style={{ fontFamily: "'Anton', sans-serif" }}
                    >
                        Tableau de Bord
                    </h1>
                    <p className="mt-2 text-sm text-white/50">
                        Gérez les inscriptions à la newsletter et suivez
                        l'engagement de la communauté CWS.
                    </p>
                </div>
                <button
                    onClick={fetchSubscribers}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 self-start rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/70 transition-all hover:bg-white/10 hover:text-white disabled:opacity-50 sm:self-auto"
                >
                    <LuRefreshCw
                        size={14}
                        className={loading ? 'animate-spin' : ''}
                    />
                    Actualiser
                </button>
            </div>

            {/* ── CARTES DE STATISTIQUES ──────────────────────────── */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                {/* Carte 1 : Total Abonnés */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm"
                >
                    <div className="absolute right-[-20px] top-[-20px] h-32 w-32 rounded-full bg-[#d4cfc7]/5 blur-2xl" />
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                                Total Abonnés
                            </p>
                            <p className="mt-2 text-4xl font-bold text-white">
                                {totalSubscribers}
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4cfc7]/10 text-[#d4cfc7]">
                            <LuUsers size={24} />
                        </div>
                    </div>
                </motion.div>

                {/* Carte 2 : Nouveaux ce mois (flèche verte retirée) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm"
                >
                    <div className="absolute right-[-20px] top-[-20px] h-32 w-32 rounded-full bg-[#d4cfc7]/5 blur-2xl" />
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                                Nouveaux (Ce Mois)
                            </p>
                            <p className="mt-2 text-4xl font-bold text-white">
                                {newThisMonth}
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4cfc7]/10 text-[#d4cfc7]">
                            <LuCalendar size={24} />
                        </div>
                    </div>
                </motion.div>

                {/* Carte 3 : Export PDF */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative flex flex-col justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#d4cfc7]/10 to-transparent p-6 backdrop-blur-sm"
                >
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                        Export des données
                    </p>
                    <button
                        onClick={handleExportPDF}
                        disabled={exporting || subscribers.length === 0}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4cfc7] py-3 text-sm font-bold uppercase tracking-wider text-[#0a0a0a] transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(212,207,199,0.2)] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {exporting ? (
                            <LuRefreshCw size={16} className="animate-spin" />
                        ) : (
                            <LuDownload size={16} />
                        )}
                        {exporting ? 'Export en cours...' : 'Télécharger PDF'}
                    </button>
                </motion.div>
            </div>

            {/* ── MESSAGE D'ERREUR GLOBAL ─────────────────────────── */}
            {error && (
                <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm text-red-400 backdrop-blur-sm">
                    <LuTriangleAlert size={18} />
                    <span>{error}</span>
                    <button
                        onClick={() => setError('')}
                        className="ml-auto text-red-400/50 transition-colors hover:text-red-400"
                    >
                        <LuX size={16} />
                    </button>
                </div>
            )}

            {/* ── TABLEAU DES ABONNÉS ─────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-md"
            >

                {/* Barre d'outils */}
                <div className="flex flex-col gap-4 border-b border-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-white">
                        Liste des Abonnés
                    </h2>
                    <div className="relative w-full sm:w-72">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-white/30">
                            <LuSearch size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher un email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-white/10 bg-black/40 py-2 pl-9 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/20 focus:border-[#d4cfc7]/50 focus:ring-1 focus:ring-[#d4cfc7]/50"
                        />
                    </div>
                </div>

                {/* Contenu du tableau */}
                <div className="overflow-x-auto">
                    {loading ? (
                        /* État chargement */
                        <div className="flex h-64 items-center justify-center">
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d4cfc7]/20 border-t-[#d4cfc7]" />
                                <span className="text-xs uppercase tracking-widest text-white/30">
                                    Chargement...
                                </span>
                            </div>
                        </div>
                    ) : filteredSubscribers.length === 0 ? (
                        /* État vide */
                        <div className="flex h-64 flex-col items-center justify-center text-white/30">
                            <LuMail size={48} className="mb-4 opacity-20" />
                            <p className="text-sm">
                                {searchTerm
                                    ? 'Aucun résultat pour cette recherche.'
                                    : 'Aucun abonné pour le moment.'}
                            </p>
                        </div>
                    ) : (
                        /* Tableau */
                        <table className="w-full text-left text-sm">
                            <thead className="bg-black/20 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/40">
                                <tr>
                                    <th className="px-6 py-4">Adresse Email</th>
                                    <th className="px-6 py-4">
                                        Date d'inscription
                                    </th>
                                    <th className="px-6 py-4 text-center">
                                        Statut
                                    </th>
                                    <th className="px-6 py-4 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <motion.tbody
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="divide-y divide-white/5"
                            >
                                {filteredSubscribers.map((sub) => (
                                    <motion.tr
                                        key={sub._id}
                                        variants={itemVariants}
                                        layout
                                        className="group transition-colors hover:bg-white/[0.04]"
                                    >
                                        {/* Colonne Email */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4cfc7]/10 text-[#d4cfc7] transition-transform group-hover:scale-110">
                                                    <LuMail size={14} />
                                                </div>
                                                <span className="font-medium text-white/90">
                                                    {sub.email}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Colonne Date */}
                                        <td className="px-6 py-4 text-white/50">
                                            <div className="flex items-center gap-2">
                                                <LuCalendar
                                                    size={14}
                                                    className="opacity-50"
                                                />
                                                {new Date(
                                                    sub.subscribedAt
                                                ).toLocaleDateString('fr-FR', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </div>
                                        </td>

                                        {/* Colonne Statut */}
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center rounded-full bg-[#d4cfc7]/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-[#d4cfc7] ring-1 ring-inset ring-[#d4cfc7]/20">
                                                Actif
                                            </span>
                                        </td>

                                        {/* Colonne Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() =>
                                                    askDeleteSubscriber(sub)
                                                }
                                                disabled={
                                                    deletingId === sub._id
                                                }
                                                title="Supprimer cet abonné"
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/30 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                                            >
                                                {deletingId === sub._id ? (
                                                    <LuRefreshCw
                                                        size={14}
                                                        className="animate-spin"
                                                    />
                                                ) : (
                                                    <LuTrash2 size={14} />
                                                )}
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </table>
                    )}
                </div>

                {/* Pied de tableau */}
                {!loading && filteredSubscribers.length > 0 && (
                    <div className="border-t border-white/5 bg-black/20 px-6 py-3 text-right text-xs text-white/30">
                        Affichage de {filteredSubscribers.length} sur{' '}
                        {totalSubscribers} abonnés
                    </div>
                )}
            </motion.div>

            {/* ── MODALE DE CONFIRMATION DE SUPPRESSION ───────────── */}
            <AnimatePresence>
                {confirmDelete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        {/* Fond assombri */}
                        <div
                            onClick={() => setConfirmDelete(null)}
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        />

                        {/* Boîte de dialogue */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#141414] p-6 shadow-2xl"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                                    <LuTrash2 size={22} />
                                </div>

                                <h3 className="text-lg font-semibold text-white">
                                    Supprimer cet abonné ?
                                </h3>
                                <p className="mt-2 text-sm text-white/50">
                                    L'abonné{' '}
                                    <span className="font-medium text-white/80">
                                        {confirmDelete.email}
                                    </span>{' '}
                                    sera retiré définitivement de la liste. Cette
                                    action est irréversible.
                                </p>

                                <div className="mt-6 flex w-full gap-3">
                                    <button
                                        onClick={() => setConfirmDelete(null)}
                                        className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-white/70 transition-all hover:bg-white/10 hover:text-white"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        onClick={confirmDeleteSubscriber}
                                        className="flex-1 rounded-xl bg-red-500/90 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-500"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardPage;