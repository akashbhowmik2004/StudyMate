import { useState, useRef, useEffect } from 'react';
import { ChevronDown, UserCircle } from 'lucide-react';
import { menuItems } from "../lib/ProfileMenueItems.js";
import { auth } from "../lib/axois.js";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";


const NavProfileButton = ({userInfo}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const account = userInfo ?? {};

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(e) {
            if (e.key === 'Escape') setIsOpen(false);
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await auth.post("/logout");
            setIsOpen(false);
            setUser(null);
            navigate("/");
            toast.success("Logged out");
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleMenuItemClick = (path) => {
        setIsOpen(false);
        navigate(path);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                id="user-menu"
                onClick={() => setIsOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                aria-label="User menu"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 pr-2 text-slate-200 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-200/40"
                type="button"
            >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-400/10 text-cyan-200">
                    <UserCircle size={20} />
                </span>

                <span className="hidden text-sm font-medium md:block">{account.username}</span>
                <ChevronDown size={16} className={`text-slate-400 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-white/10 bg-slate-950/95 p-1 shadow-2xl shadow-black/30 backdrop-blur-2xl"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                >
                    <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                        <p className="text-sm font-semibold text-white">{account.username ?? "Account"}</p>
                        {account.email && <p className="text-xs text-slate-400">{account.email}</p>}
                    </div>

                    <div className="py-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => handleMenuItemClick(item.path)}
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
                                    role="menuitem"
                                    type="button"
                                >
                                    <Icon size={16} className="text-slate-400" />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="border-t border-white/10 pt-1">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
                            role="menuitem"
                            type="button"
                        >
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavProfileButton;