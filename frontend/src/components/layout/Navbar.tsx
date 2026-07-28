import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    return (
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800 bg-[#09111D] px-3 sm:px-6">

            <div className="flex items-center gap-3">

                <div className="h-8 w-8 rounded-full border border-cyan-500 flex items-center justify-center">
                    ≋
                </div>

                <h1 className="text-sm font-bold tracking-[2px] text-white sm:text-base sm:tracking-[4px]">
                    SWIMCOACH AI
                </h1>

            </div>

            <div className="flex items-center gap-3 sm:gap-8">

                <button
                    onClick={handleLogout}
                    className="text-sm text-slate-400 transition hover:text-white"
                >
                    Выйти из аккаунта
                </button>

            </div>

        </header>
    );
};

export default Navbar;
