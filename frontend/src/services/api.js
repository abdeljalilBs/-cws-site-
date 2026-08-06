// 🔴 En dev: http://localhost:5000 | En prod: ton URL Vercel backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('cws_admin_token');

        const headers = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        };

        try {
            const response = await fetch(`${API_URL}${endpoint}`, {
                ...options,
                headers,
                credentials: 'include', // Crucial pour les cookies HTTP-only (refreshToken)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Une erreur est survenue');
            }
            return data;
        } catch (error) {
            console.error("Erreur API:", error);
            throw error;
        }
    },

    // --- ENDPOINTS ADMIN ---
    login: (email, password) =>
        api.request('/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),

    getProfile: () =>
        api.request('/api/admin/profile'),

    logout: () =>
        api.request('/api/admin/logout', { method: 'POST' }),
};