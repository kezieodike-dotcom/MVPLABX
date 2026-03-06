import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../../constants';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-black pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-16">
                    <div className="lg:col-span-5">
                        <Link to="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center font-black text-xl shadow-[0_0_20px_rgba(168,85,247,0.3)]">M</div>
                            <span className="font-black text-2xl tracking-tighter Outfit">MVPLAB<span className="text-purple-500">X</span></span>
                        </Link>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mb-8">
                            Empowering founders, developers, and investors to build, scale, and own the future of AI.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                                <span className="font-bold font-serif">X</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                                <span className="font-bold">in</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
                                <span className="font-bold">Gh</span>
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-3 lg:col-start-7">
                        <h4 className="font-bold mb-6 Outfit text-lg uppercase tracking-widest text-white">Platform</h4>
                        <ul className="space-y-4 text-sm text-gray-500 font-medium tracking-wide">
                            {NAV_LINKS.map(link => (
                                <li key={link.label}>
                                    {link.href.startsWith('#') ? (
                                        <a href={`/${link.href}`} className="hover:text-purple-400 transition-colors">{link.label}</a>
                                    ) : (
                                        <Link to={link.href} className="hover:text-purple-400 transition-colors">{link.label}</Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h4 className="font-bold mb-6 Outfit text-lg uppercase tracking-widest text-white">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-500 font-medium tracking-wide">
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-purple-400 transition-colors">Investment Disclaimer</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-medium uppercase tracking-widest">
                    <p>© {new Date().getFullYear()} MVP LAB X Core Operations.</p>
                    <p>Built with precision.</p>
                </div>
            </div>
        </footer>
    );
};
