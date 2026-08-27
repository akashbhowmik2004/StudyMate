import { useState, useRef, useEffect } from 'react';
import { ChevronDown, UserCircle } from 'lucide-react';
import { menuItems } from "../lib/ProfileMenueItems.js";
import { auth } from "../lib/axois.js";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../context/useAuth.jsx";
import socket from "../lib/socket.js";

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
            socket.disconnect();
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
                className="flex h-10 items-center gap-2.5 rounded-full border border-white/10 bg-white/5 pl-1.5 pr-3 text-[#EDE7DA] backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 focus:outline-none"
                type="button"
            >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)] overflow-hidden">
                    {account.profilePicture ? (
                        <img src={account.profilePicture} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                        <UserCircle size={16} />
                    )}
                </span>

                <span className="hidden text-sm font-bold md:block">{account.username}</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 mt-3 w-64 origin-top-right overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#12141B]/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                >
                    <div className="mb-1 rounded-xl border border-white/5 bg-white/[0.04] px-4 py-3">
                        <p className="font-['Fraunces',_serif] text-base font-bold text-[#EDE7DA]">{account.username ?? "Account"}</p>
                        {account.email && <p className="mt-0.5 text-xs font-medium text-slate-400 truncate">{account.email}</p>}
                    </div>

                    <div className="py-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => handleMenuItemClick(item.path)}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#EDE7DA]/80 transition-colors hover:bg-white/[0.06] hover:text-[#EDE7DA]"
                                    role="menuitem"
                                    type="button"
                                >
                                    <Icon size={16} className="text-cyan-400/70" />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-1 border-t border-white/5 pt-1">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300"
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