import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { NAV_LINKS } from '../../../constants';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { ButtonGradient } from '../ui/button-gradient';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { SearchOverlay } from '../ui/SearchOverlay';

export const Navbar: React.FC = () => {
    const [menuState, setMenuState] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMegamenu, setActiveMegamenu] = useState<number | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();
    const { user, signOut, isAdmin } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <header>
            <nav
                className="fixed z-50 w-full px-4 pt-6 transition-all duration-500">
                <div className={cn(
                    'mx-auto transition-all duration-700 ease-in-out',
                    isScrolled
                        ? 'max-w-5xl bg-black/40 border border-white/10 backdrop-blur-2xl rounded-full px-6 py-2 shadow-[0_0_50px_rgba(168,85,247,0.15)]'
                        : 'max-w-7xl px-6 py-4'
                )}>
                    <div className="relative flex items-center justify-between gap-6 lg:gap-0">
                        {/* Logo */}
                        <div className="flex items-center justify-between w-full lg:w-auto">
                            <Link
                                to="/"
                                className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-purple-500/20">M</div>
                                <span className="font-black text-2xl tracking-tighter Outfit text-white uppercase hidden sm:block">MVPLABX</span>
                            </Link>

                            <div className="flex items-center gap-2 lg:hidden ml-auto">
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <Search className="size-5" />
                                </button>
                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    className="z-20 p-2 text-white transition-transform active:scale-90">
                                    {menuState ? <X className="size-6" /> : <Menu className="size-6" />}
                                </button>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:block">
                            <ul className="flex items-center gap-1">
                                {NAV_LINKS.map((item, index) => (
                                    <li
                                        key={index}
                                        onMouseEnter={() => setActiveMegamenu(index)}
                                        onMouseLeave={() => setActiveMegamenu(null)}
                                        className="relative px-4 py-2"
                                    >
                                        <div className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-white cursor-pointer transition-colors py-2">
                                            {item.href.startsWith('#') || item.href.includes('/#') ? (
                                                <a href={item.href.startsWith('#') ? `/${item.href}` : item.href}>{item.label}</a>
                                            ) : (
                                                <Link to={item.href}>{item.label}</Link>
                                            )}
                                            {item.megamenu && (
                                                <ChevronDown className={cn("size-3.5 transition-transform duration-300", activeMegamenu === index && "rotate-180")} />
                                            )}
                                        </div>

                                        {/* Megamenu Dropdown */}
                                        <AnimatePresence>
                                            {item.megamenu && activeMegamenu === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                                    className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] pt-4"
                                                >
                                                    <div className="bg-black/90 border border-white/10 backdrop-blur-3xl rounded-[32px] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.5)] grid grid-cols-2 gap-8 overflow-hidden relative">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent pointer-events-none"></div>
                                                        {item.megamenu.map((section, sIdx) => (
                                                            <div key={sIdx}>
                                                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-purple-400 mb-6">{section.title}</h4>
                                                                <ul className="space-y-6">
                                                                    {section.items.map((subItem, iIdx) => (
                                                                        <li key={iIdx}>
                                                                            <Link
                                                                                to={subItem.href}
                                                                                className="flex gap-4 group/item items-start"
                                                                            >
                                                                                <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/item:bg-purple-600 transition-colors shrink-0">
                                                                                    {subItem.icon}
                                                                                </div>
                                                                                <div>
                                                                                    <div className="font-bold text-white mb-1 group-hover/item:text-purple-400 transition-colors">{subItem.label}</div>
                                                                                    <p className="text-xs text-gray-500 leading-relaxed">{subItem.description}</p>
                                                                                </div>
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="hidden lg:flex items-center gap-4">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all group"
                            >
                                <Search className="size-4" />
                                <span className="text-xs font-bold">Search...</span>
                                <span className="text-[10px] font-black opacity-30 group-hover:opacity-60 transition-opacity whitespace-nowrap">CMD K</span>
                            </button>
                            <div className="h-6 w-px bg-white/10 mx-2" />
                            {user ? (
                                <>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 hover:text-white font-bold"
                                        onClick={() => signOut()}
                                    >
                                        <button>Log Out</button>
                                    </Button>
                                    <ButtonGradient
                                        onClick={() => navigate(isAdmin ? '/admin' : '/login')}
                                        className="scale-90"
                                    >
                                        {isAdmin ? 'Admin' : 'Account'}
                                    </ButtonGradient>
                                </>
                            ) : (
                                <>
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-400 hover:text-white font-bold"
                                    >
                                        <Link to="/login">Log In</Link>
                                    </Button>
                                    <ButtonGradient
                                        onClick={() => navigate('/featured')}
                                        className="scale-90"
                                    >
                                        Get Started
                                    </ButtonGradient>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu */}
                        <AnimatePresence>
                            {menuState && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="absolute top-full left-0 right-0 mt-4 bg-black/95 border border-white/10 backdrop-blur-2xl rounded-[32px] p-6 lg:hidden overflow-hidden"
                                >
                                    <ul className="space-y-6">
                                        {NAV_LINKS.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    to={item.href}
                                                    onClick={() => setMenuState(false)}
                                                    className="text-xl font-bold text-white block py-2"
                                                >
                                                    {item.label}
                                                </Link>
                                                {item.megamenu && (
                                                    <ul className="mt-4 space-y-4 pl-4 border-l border-white/10">
                                                        {item.megamenu.map((section) =>
                                                            section.items.map((sub, i) => (
                                                                <li key={i}>
                                                                    <Link
                                                                        to={sub.href}
                                                                        onClick={() => setMenuState(false)}
                                                                        className="text-gray-400 flex items-center gap-3"
                                                                    >
                                                                        <span className="size-1 rounded-full bg-purple-500"></span>
                                                                        {sub.label}
                                                                    </Link>
                                                                </li>
                                                            ))
                                                        )}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
                                        {user ? (
                                            <>
                                                <ButtonGradient onClick={() => navigate(isAdmin ? '/admin' : '/login')} className="w-full">
                                                    {isAdmin ? 'Admin Panel' : 'My Account'}
                                                </ButtonGradient>
                                                <Button variant="outline" className="rounded-full font-bold border-white/10 text-white w-full" onClick={() => signOut()}>
                                                    Log Out
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <ButtonGradient onClick={() => navigate('/featured')} className="w-full">
                                                    Get Started
                                                </ButtonGradient>
                                                <Button variant="outline" className="rounded-full font-bold border-white/10 text-white w-full" onClick={() => navigate('/login')}>
                                                    Log In
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </nav>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </header>
    );
};
