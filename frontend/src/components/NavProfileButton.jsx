import {useState, useRef, useEffect} from 'react';
import {UserCircle, LayoutDashboard, Users, Settings, LogOut} from 'lucide-react';
import {menuItems} from "../lib/ProfileMenueItems.js";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Right side - User Menu or Auth Buttons */}
                <div className="flex items-center gap-4" ref={dropdownRef}>
                    {/* User Icon Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-full hover:bg-slate-100 transition-colors duration-200 focus:outline-none"
                            aria-label="User menu"
                            aria-expanded={isOpen}
                        >
                            <UserCircle size={28} className="text-indigo-500"/>
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div
                                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                                <div className="px-4 py-3 border-b border-slate-100">
                                    <p className="text-sm font-semibold text-slate-900">John Doe</p>
                                    <p className="text-xs text-slate-500">john@example.com</p>
                                </div>

                                <div className="py-2">
                                    {menuItems.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <button
                                                key={item.label}
                                                onClick={() => setIsOpen(false)}
                                                className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-3 transition-colors duration-150"
                                            >
                                                <Icon size={18} className="text-slate-600"/>
                                                <span>{item.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="border-t border-slate-100 py-2">
                                    <button
                                        onClick={() => {
                                            console.log('Logout clicked');
                                            setIsOpen(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors duration-150"
                                    >
                                        <LogOut size={18} className="text-red-600"/>
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;