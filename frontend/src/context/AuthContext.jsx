import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('cws_admin_token');
            if (token) {
                try {
                    const profile = await api.getProfile();
                    setAdmin(profile);
                } catch (error) {
                    localStorage.removeItem('cws_admin_token');
                    setAdmin(null);
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const data = await api.login(email, password);
        localStorage.setItem('cws_admin_token', data.accessToken);
        setAdmin(data);
        return data;
    };

    const logout = async () => {
        try {
            await api.logout();
        } catch (error) {
            console.error("Erreur lors du logout:", error);
        } finally {
            localStorage.removeItem('cws_admin_token');
            setAdmin(null);
        }
    };

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};