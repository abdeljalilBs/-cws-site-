import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    LuPhone, LuMapPin, LuMail, LuSend,
    LuCheck, LuUser, LuChevronDown, LuX, LuShieldCheck, LuArrowRight
} from 'react-icons/lu';

import LazyImage from '../LazyImage';

const API_URL = 'https://cws-backend-sandy.vercel.app/api/contact';
const DISPLAY = "'Anton', sans-serif";
const SERIF = "'Instrument Serif', Georgia, 'Times New Roman', serif";

/* ─── Options du type de demande ────────────────────────────── */
const requestTypes = [
    { value: 'visite', label: 'Visiter le club' },
    { value: 'inscription', label: "M'inscrire" },
    { value: 'coaching', label: 'Info coaching personnalisé' },
    { value: 'autre', label: 'Autre demande' },
];

/* ─── Orbes flottantes animées (fond dynamique) ─────────────── */
const FloatingOrbs = () => (
    <>
        <motion.span
            animate={{ x: [0, 60, -30, 0], y: [0, -50, 40, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute top-[10%] left-[8%] h-72 w-72 rounded-full bg-[#d4cfc7]/[0.05] blur-[100px]"
        />
        <motion.span
            animate={{ x: [0, -50, 40, 0], y: [0, 60, -30, 0], scale: [1, 0.9, 1.15, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute bottom-[15%] right-[10%] h-80 w-80 rounded-full bg-[#b3a996]/[0.05] blur-[110px]"
        />
    </>
);

/* ─── MODAL OTP (Pop-up Premium) ────────────────────────────── */
const OtpModal = ({ isOpen, onClose, onVerify, isLoading, error }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        if (element.nextSibling && element.value !== '') {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const handleSubmitOtp = (e) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length === 6) {
            onVerify(otpString);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#121212] p-8 shadow-2xl"
                    >
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4cfc7]/50 to-transparent" />
                        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-[#d4cfc7]/[0.08] blur-3xl" />

                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors z-10"
                        >
                            <LuX size={20} />
                        </button>

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#d4cfc7]/20 bg-[#d4cfc7]/10 text-[#d4cfc7]">
                                <LuShieldCheck size={28} />
                            </div>

                            <h3 style={{ fontFamily: DISPLAY }} className="text-2xl uppercase tracking-tight text-white mb-2">
                                Vérification
                            </h3>
                            <p className="text-sm text-white/60 mb-8 max-w-[30ch] leading-relaxed">
                                Entrez le code à 6 chiffres envoyé à votre adresse email pour valider votre demande.
                            </p>

                            <form onSubmit={handleSubmitOtp} className="w-full">
                                <div className="flex justify-between gap-2 sm:gap-3 mb-6">
                                    {otp.map((data, index) => (
                                        <input
                                            key={index}
                                            id={`otp-input-${index}`}
                                            type="text"
                                            maxLength="1"
                                            value={data}
                                            onChange={e => handleChange(e.target, index)}
                                            onKeyDown={e => handleKeyDown(e, index)}
                                            className="w-full h-12 sm:h-14 rounded-xl border border-white/10 bg-[#0a0a0a] text-center text-xl font-bold text-white outline-none transition-all duration-300 focus:border-[#d4cfc7]/60 focus:shadow-[0_0_20px_-5px_rgba(212,207,199,0.4)]"
                                            autoFocus={index === 0}
                                        />
                                    ))}
                                </div>

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs mb-4 font-medium tracking-wide"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={isLoading || otp.join('').length !== 6}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative w-full inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#d4cfc7] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-500 hover:bg-white hover:shadow-[0_0_30px_-5px_rgba(212,207,199,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <span className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a]" />
                                    ) : (
                                        <span className="relative z-10">Valider mon code</span>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/* ─── Page Contact / Inscription ────────────────────────────── */
const Contact = () => {
    const formRef = useRef(null);
    const isFormInView = useInView(formRef, { once: true, margin: '-60px' });

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 80);
        return () => clearTimeout(t);
    }, []);

    const formVisible = isFormInView || mounted;

    const [form, setForm] = useState({ prenom: '', nom: '', email: '', tel: '', type: 'visite', message: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, verifying, success
    const [formError, setFormError] = useState('');

    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [otpError, setOtpError] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    // Étape 1 : Envoi du formulaire -> Demande d'OTP
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setFormError('');

        try {
            const response = await fetch(`${API_URL}/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: form.email, firstName: form.prenom })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Erreur serveur.");

            setStatus('otp_required');
            setIsOtpModalOpen(true);
        } catch (error) {
            console.error(error);
            setFormError("Une erreur est survenue lors de l'envoi du code. Veuillez vérifier votre connexion ou réessayer.");
            setStatus('idle');
        }
    };

    // Étape 2 : Vérification OTP -> Envoi final
    const handleVerifyOtp = async (otpCode) => {
        setStatus('verifying');
        setOtpError('');

        try {
            const formDataForBackend = {
                firstName: form.prenom,
                lastName: form.nom,
                phone: form.tel,
                requestType: requestTypes.find(t => t.value === form.type)?.label || form.type,
                message: form.message
            };

            const response = await fetch(`${API_URL}/verify-contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form.email,
                    otp: otpCode,
                    formData: formDataForBackend
                })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Code invalide.");

            setIsOtpModalOpen(false);
            setStatus('success');
            setForm({ prenom: '', nom: '', email: '', tel: '', type: 'visite', message: '' });
        } catch (error) {
            console.error(error);
            setOtpError(error.message);
            setStatus('otp_required');
        }
    };

    return (
        <div className="contact-page relative w-full overflow-hidden bg-[#0a0a0a] min-h-[100dvh] pt-[calc(6rem+env(safe-area-inset-top,0px))] pb-[calc(5rem+env(safe-area-inset-bottom,0px))]">

            <style>{`
                .ct-select{appearance:none;-webkit-appearance:none;background-image:none;}
            `}</style>

            <OtpModal
                isOpen={isOtpModalOpen}
                onClose={() => { setIsOtpModalOpen(false); setStatus('idle'); }}
                onVerify={handleVerifyOtp}
                isLoading={status === 'verifying'}
                error={otpError}
            />

            {/* Image d'ambiance en fond avec overlay sombre */}
            <div className="absolute inset-0 z-0 opacity-20">
                <LazyImage publicId="cws-site/ambiance" width={1600} alt="Ambiance CWS" eager className="w-full h-full" imgClassName="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/90 to-[#0a0a0a]" />
            </div>

            <section id="contact-form" ref={formRef} className="relative z-10 w-full overflow-hidden py-12 md:py-20">
                <FloatingOrbs />

                <div className="relative z-10 mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-16">

                    {/* Header (Épuré : Sans ligne, sans soulignement) */}
                    <div className="mb-16 flex flex-col items-start gap-4">
                        <motion.em
                            initial={{ opacity: 0, y: 20 }}
                            animate={formVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            style={{ fontFamily: SERIF }}
                            className="text-lg tracking-[0.14em] uppercase text-[#b3a996] italic"
                        >
                            Prise de contact & inscription
                        </motion.em>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={formVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            style={{ fontFamily: DISPLAY }}
                            className="relative text-[clamp(2.2rem,8vw,2.8rem)] uppercase leading-[0.94] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5rem]"
                        >
                            Contactez-<span className="text-[#d4cfc7]">nous</span>
                        </motion.h2>
                    </div>

                    <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

                        {/* ── COLONNE GAUCHE : Infos (Style Éditorial / Premium) ── */}
                        <div className="flex flex-col">

                            {/* Bloc Accueil Commercial */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={formVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="group border-t border-white/10 py-10 transition-colors duration-500 hover:border-[#d4cfc7]/40"
                            >
                                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4 group-hover:text-[#d4cfc7] transition-colors">Accueil Commercial</span>
                                <h3 style={{ fontFamily: DISPLAY }} className="text-3xl md:text-4xl uppercase text-white mb-4 tracking-tight">Sur Rendez-vous</h3>
                                <p className="text-white/60 font-light mb-6 max-w-[40ch] leading-relaxed">
                                    Parce que chaque parcours est unique, nous prenons le temps de vous accueillir personnellement pour comprendre vos objectifs.
                                </p>
                                <a href="tel:0677884469" className="inline-flex items-center gap-3 text-xl text-[#d4cfc7] hover:text-white transition-colors group/link" style={{ fontFamily: DISPLAY }}>
                                    06 77 88 44 69
                                    <LuArrowRight size={20} className="transition-transform duration-300 group-hover/link:translate-x-2" />
                                </a>
                            </motion.div>

                            {/* Bloc Horaires */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={formVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="group border-t border-white/10 py-10 transition-colors duration-500 hover:border-[#d4cfc7]/40"
                            >
                                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4 group-hover:text-[#d4cfc7] transition-colors"> Accès Libre 7j/7</span>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center justify-between max-w-[320px] border-b border-white/5 pb-1">
                                        <span className="text-white/70 font-light text-sm">Lundi au jeudi</span>
                                        <span style={{ fontFamily: DISPLAY }} className="text-lg text-white">7h30 — 21h00</span>
                                    </div>
                                    <div className="flex items-center justify-between max-w-[320px] border-b border-white/5 pb-1">
                                        <span className="text-white/70 font-light text-sm">Vendredi</span>
                                        <span style={{ fontFamily: DISPLAY }} className="text-lg text-white">8h30 — 21h00</span>
                                    </div>
                                    <div className="flex items-center justify-between max-w-[320px]">
                                        <span className="text-white/70 font-light text-sm">Samedi & Dimanche</span>
                                        <span style={{ fontFamily: DISPLAY }} className="text-lg text-white">8h30 — 20h00</span>
                                    </div>
                                </div>
                                <p className="text-white/60 font-light max-w-[40ch] leading-relaxed">
                                    Entraînez-vous à votre rythme dans un espace pensé pour la performance et le bien-être.
                                </p>
                            </motion.div>

                            {/* Coordonnées minimalistes */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={formVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="border-t border-white/10 pt-10 mt-4 flex flex-col gap-6"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Localisation</span>
                                    <a href="https://maps.google.com/?q=20+Rue+Marie+de+Lorraine+37700+La+Ville+aux+Dames" target="_blank" rel="noopener noreferrer" className="text-lg text-white/80 hover:text-[#d4cfc7] transition-colors font-light">
                                        20, Rue Marie de Lorraine<br />37700 La Ville-aux-Dames
                                    </a>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Email</span>
                                    <a href="mailto:teamonecws@gmail.com" className="text-lg text-white/80 hover:text-[#d4cfc7] transition-colors font-light">
                                        teamonecws@gmail.com
                                    </a>
                                </div>
                            </motion.div>

                        </div>

                        {/* ── COLONNE DROITE : Formulaire ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={formVisible ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="relative rounded-3xl border border-white/10 bg-[#0a0a0a]/60 backdrop-blur-md p-8 md:p-10 overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4cfc7]/30 to-transparent" />

                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="relative z-10 flex flex-col items-center justify-center text-center py-20"
                                    >
                                        <motion.div
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ duration: 0.6, delay: 0.1, type: 'spring' }}
                                            className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#d4cfc7] text-[#0a0a0a]"
                                        >
                                            <LuCheck size={36} strokeWidth={2.5} />
                                        </motion.div>
                                        <h3 style={{ fontFamily: DISPLAY }} className="text-3xl uppercase tracking-tight text-white mb-3">Demande validée !</h3>
                                        <p className="text-white/60 max-w-[36ch] mb-7 font-light">Merci pour votre confiance. L'équipe CWS a bien reçu vos informations et revient vers vous très vite.</p>
                                        <button onClick={() => setStatus('idle')} className="text-sm uppercase tracking-[0.15em] text-[#d4cfc7] hover:text-white transition-colors border-b border-[#d4cfc7]/30 pb-1">
                                            Faire une autre demande
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="relative z-10 flex flex-col gap-6"
                                    >
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <Field icon={<LuUser size={16} />} label="Prénom" name="prenom" value={form.prenom} onChange={handleChange} placeholder="Votre prénom" required />
                                            <Field icon={<LuUser size={16} />} label="Nom" name="nom" value={form.nom} onChange={handleChange} placeholder="Votre nom" required />
                                        </div>
                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <Field icon={<LuMail size={16} />} label="E-mail" name="email" type="email" value={form.email} onChange={handleChange} placeholder="vous@exemple.com" required />
                                            <Field icon={<LuPhone size={16} />} label="Téléphone" name="tel" type="tel" value={form.tel} onChange={handleChange} placeholder="06 00 00 00 00" />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase tracking-[0.15em] text-white/70">Type de demande</label>
                                            <div className="relative group">
                                                <select
                                                    name="type"
                                                    value={form.type}
                                                    onChange={handleChange}
                                                    className="ct-select w-full rounded-xl border border-white/10 bg-[#050505] px-4 py-4 text-white/90 outline-none transition-all duration-300 focus:border-[#d4cfc7]/60 focus:shadow-[0_0_25px_-5px_rgba(212,207,199,0.3)] cursor-pointer"
                                                >
                                                    {requestTypes.map((t) => (
                                                        <option key={t.value} value={t.value} className="bg-[#0a0a0a]">{t.label}</option>
                                                    ))}
                                                </select>
                                                <LuChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#d4cfc7]" />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs font-bold uppercase tracking-[0.15em] text-white/70">Message</label>
                                            <textarea
                                                name="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                rows={4}
                                                placeholder="Parlez-nous de vos objectifs, vos disponibilités..."
                                                className="w-full resize-none rounded-xl border border-white/10 bg-[#050505] px-4 py-4 text-white/90 placeholder-white/30 outline-none transition-all duration-300 focus:border-[#d4cfc7]/60 focus:shadow-[0_0_25px_-5px_rgba(212,207,199,0.3)]"
                                            />
                                        </div>

                                        {/* Message d'erreur intégré (remplace l'alert) */}
                                        <AnimatePresence>
                                            {formError && (
                                                <motion.p
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="text-red-400/90 text-sm font-medium tracking-wide"
                                                >
                                                    {formError}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>

                                        <motion.button
                                            type="submit"
                                            disabled={status === 'sending'}
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            className="group relative mt-2 inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#d4cfc7] px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#0a0a0a] transition-all duration-500 hover:bg-white hover:shadow-[0_0_40px_-5px_rgba(212,207,199,0.5)] disabled:opacity-60"
                                        >
                                            {status === 'sending' ? (
                                                <>
                                                    <span className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a]" />
                                                    <span className="relative z-10">Envoi du code...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <LuSend size={15} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                                                    <span className="relative z-10">Envoyer ma demande</span>
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>

                    </div>
                </div>
            </section>
        </div>
    );
};

/* ─── Composant Champ Input ────────────────────── */
const Field = ({ icon, label, name, type = 'text', value, onChange, placeholder, required }) => {
    const [focused, setFocused] = useState(false);
    return (
        <div className="flex flex-col gap-2">
            <label className={`text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${focused ? 'text-[#d4cfc7]' : 'text-white/70'}`}>{label}</label>
            <div className="relative">
                <span className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${focused ? 'text-[#d4cfc7] scale-110' : 'text-[#d4cfc7]/40'}`}>{icon}</span>
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full rounded-xl border border-white/10 bg-[#050505] pl-11 pr-4 py-4 text-white/90 placeholder-white/20 outline-none transition-all duration-300 focus:border-[#d4cfc7]/60 focus:shadow-[0_0_25px_-5px_rgba(212,207,199,0.3)]"
                />
            </div>
        </div>
    );
};

export default Contact;