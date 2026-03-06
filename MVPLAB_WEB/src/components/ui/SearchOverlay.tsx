import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command, ArrowRight, AppWindow, Users, Briefcase, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../../constants';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                isOpen ? onClose() : null; // Handled by Navbar but helpful for global listener
            }
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.tagline.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery)
        ).slice(0, 5);

        setResults(filtered);
    }, [query]);

    const handleSelect = (id: string) => {
        onClose();
        navigate(`/ecosystem/${id}`);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="relative w-full max-w-2xl bg-zinc-900/90 border border-white/10 rounded-[32px] shadow-2xl overflow-hidden glass"
                    >
                        <div className="p-6 border-b border-white/5 flex items-center gap-4">
                            <Search className="w-6 h-6 text-gray-400" />
                            <input
                                ref={inputRef}
                                className="flex-1 bg-transparent border-none outline-none text-white text-xl font-medium placeholder:text-gray-600"
                                placeholder="Search apps, talent, or bounties..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                <Command className="w-3 h-3" /> ESC
                            </div>
                        </div>

                        <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {!query ? (
                                <div className="space-y-6 p-4">
                                    <div>
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Quick Navigation</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { icon: <AppWindow className="w-4 h-4" />, label: "Ecosystem", path: "/our-apps" },
                                                { icon: <Briefcase className="w-4 h-4" />, label: "Bounty Board", path: "/developers" },
                                                { icon: <Users className="w-4 h-4" />, label: "Talent Network", path: "/developers" },
                                                { icon: <Sparkles className="w-4 h-4" />, label: "Invest", path: "/ai-investment" }
                                            ].map((item, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => { onClose(); navigate(item.path); }}
                                                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-left group"
                                                >
                                                    <span className="text-gray-400 group-hover:text-purple-400 transition-colors">{item.icon}</span>
                                                    <span className="text-sm font-bold text-gray-300">{item.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : results.length > 0 ? (
                                <div className="space-y-2 p-2">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 px-2">Ecosystem Results</p>
                                    {results.map((app) => (
                                        <button
                                            key={app.id}
                                            onClick={() => handleSelect(app.id)}
                                            className="w-full flex items-center justify-between p-4 rounded-2xl border border-transparent hover:bg-white/5 hover:border-white/5 transition-all text-left group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl border border-white/5 overflow-hidden">
                                                    <img src={app.image} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-black text-white group-hover:text-purple-400 transition-colors uppercase tracking-wider">{app.name}</h4>
                                                    <p className="text-xs text-gray-500 line-clamp-1">{app.tagline}</p>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-20 text-center opacity-40">
                                    <Search className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                                    <p className="font-bold text-sm">No neural matches for "{query}"</p>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between px-8">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-black">ENTER</span>
                                    <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Select</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-black">↑↓</span>
                                    <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Navigate</span>
                                </div>
                            </div>
                            <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Deep Search v1.0</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
