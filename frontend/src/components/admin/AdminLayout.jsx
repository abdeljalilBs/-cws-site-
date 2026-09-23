import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LuLogOut, LuLayoutDashboard, LuUsers } from 'react-icons/lu';

const AdminLayout = () => {
    const { admin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    return (
        <div className="flex min-h-[100dvh] bg-[#111] text-white">
            {/* Sidebar */}
            <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#1a1a1a] md:flex">
                <div className="flex h-16 items-center border-b border-white/10 px-6">
                    <span className="text-xl font-bold tracking-tight">
                        C<span className="text-[#d4cfc7]">W</span>S <span className="text-xs font-normal text-white/40">Admin</span>
                    </span>
                </div>

                <nav className="flex-1 space-y-1 p-4">
                    <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                    >
                        <LuLayoutDashboard size={18} />
                        Tableau de bord
                    </Link>
                    {/* Tu pourras ajouter d'autres liens ici plus tard (ex: Messages contact) */}
                </nav>

                <div className="border-t border-white/10 p-4">
                    <div className="mb-4 px-2">
                        <p className="text-sm font-medium">{admin?.name}</p>
                        <p className="text-xs text-white/40 truncate">{admin?.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
                    >
                        <LuLogOut size={18} />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Header Mobile */}
                <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#1a1a1a] px-6 md:hidden">
                    <span className="text-lg font-bold">CWS Admin</span>
                    <button onClick={handleLogout} className="text-red-400">
                        <LuLogOut size={20} />
                    </button>
                </header>

                <div className="p-6 md:p-8">
                    <Outlet /> {/* C'est ici que s'affichera le contenu (DashboardPage) */}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;