import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Terminal, ArrowRight, ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';

const ROLES = [
    {
        id: 'investor',
        title: 'Investor Portal',
        description: 'Deploy capital, track assets, and view real-time portfolio performance.',
        icon: <Shield className="w-8 h-8 text-purple-400" />,
        href: '/auth/investor',
        color: 'purple'
    },
    {
        id: 'creator',
        title: 'Creator Network',
        description: 'Join the UGC force, promote top-tier apps, and track commissions.',
        icon: <Zap className="w-8 h-8 text-yellow-400" />,
        href: '/auth/creator',
        color: 'yellow'
    },
    {
        id: 'developer',
        title: 'Developer Forum',
        description: 'Claim bounties, join the talent pool, and build the next big thing.',
        icon: <Terminal className="w-8 h-8 text-blue-400" />,
        href: '/auth/developer',
        color: 'blue'
    }
];

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#030303] text-white selection:bg-purple-500/30">
            <Navbar />

            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-900/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-900/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

            <main className="max-w-7xl mx-auto px-6 pt-40 pb-20 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-8 border border-white/5 px-4 py-2 rounded-full hover:bg-white/5"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </button>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 Outfit tracking-tight leading-[1.1]">
                        Welcome to the <br />
                        <span className="gradient-text italic">MVPLABX Gateway.</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        Please select your portal to continue. Your specialized dashboard and tools are one click away.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                    {ROLES.map((role, i) => (
                        <motion.div
                            key={role.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            onClick={() => navigate(role.href)}
                            className="group relative glass rounded-[40px] p-10 border border-white/10 hover:border-white/30 transition-all cursor-pointer bg-zinc-900/50 flex flex-col justify-between overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-${role.color}-500/10 blur-[60px] rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`}></div>

                            <div>
                                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:bg-white/10 transition-colors">
                                    {role.icon}
                                </div>
                                <h3 className="text-2xl font-bold Outfit mb-4">{role.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-10">
                                    {role.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                                <span>Enter Portal</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 pt-10 border-t border-white/5 w-full flex flex-col items-center">
                    <p className="text-gray-500 text-sm mb-4">Secure authentication powered by</p>
                    <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                        <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center p-1">
                            <svg viewBox="0 0 24 24" className="text-white fill-current">
                                <path d="M12 2L2 19h20L12 2zm0 3.8L19.5 17H4.5L12 5.8z" />
                            </svg>
                        </div>
                        <span className="font-bold text-lg tracking-tight">Supabase</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
