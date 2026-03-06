import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const ComingSoonPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans">
            <Navbar />

            <main className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center relative overflow-hidden">
                {/* Glow effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-purple-400 mb-8 uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                        Coming Soon to the Ecosystem
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black Outfit mb-6 tracking-tight">
                        WORK IN <span className="gradient-text italic">PROGRESS</span>
                    </h1>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                        Our team is currently building the next generation of this module.
                        We're fine-tuning the AI protocols to ensure the best possible experience for our community.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-gray-200 transition-all hover:scale-105"
                        >
                            <Home className="w-5 h-5" />
                            Return Home
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-8 py-4 bg-transparent text-white border border-white/20 font-bold rounded-full flex items-center gap-2 hover:bg-white/5 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Go Back
                        </button>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default ComingSoonPage;
