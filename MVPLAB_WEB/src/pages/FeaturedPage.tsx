import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Feature } from '../components/blocks/feature-section-with-bento-grid';
import { Features2 } from '../components/blocks/features-2';

const FeaturedPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-purple-600/10 blur-[120px] rounded-full"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-purple-400 mb-8 uppercase tracking-[0.2em]">
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                            Ecosystem Overview
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black Outfit tracking-tight mb-8">
                            THE FUTURE OF <br />
                            <span className="gradient-text italic">AI UTILITY</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
                            Launch your AI venture, earn yield from validated assets, and join a global workforce built on shared success.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <button
                                onClick={() => navigate('/coming-soon')}
                                className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-all text-lg"
                            >
                                Start Building
                            </button>
                            <button
                                onClick={() => navigate('/ai-investment')}
                                className="px-10 py-5 bg-transparent text-white border border-white/20 font-bold rounded-full hover:bg-white/5 hover:scale-105 transition-all flex items-center justify-center gap-2 text-lg"
                            >
                                Explore Yield <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bento Grid Features */}
            <Feature />

            {/* Internal Projects Section */}
            <Features2 />

            {/* CTA Section */}
            <section className="py-32 px-6">
                <div className="max-w-6xl mx-auto glass rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 Outfit tracking-tight">
                            Ready to <span className="gradient-text italic">Dominate</span> the Market?
                        </h2>
                        <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                            Whether you're a founder with a vision or an investor seeking traction, MVPLABX is your high-speed accelerator.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button
                                onClick={() => navigate('/coming-soon')}
                                className="px-12 py-6 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 hover:scale-105 transition-all text-xl shadow-[0_0_40px_rgba(147,51,234,0.3)]"
                            >
                                Discuss Your Project
                            </button>
                        </div>
                        <div className="mt-12 flex items-center justify-center gap-8 text-gray-500 font-bold uppercase tracking-widest text-sm">
                            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-purple-500" /> 14-Day MVP Launch</span>
                            <span className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-purple-500" /> Revenue-Backed Assets</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default FeaturedPage;
