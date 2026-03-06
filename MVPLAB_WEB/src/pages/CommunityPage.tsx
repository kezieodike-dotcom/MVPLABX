import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { ArrowRight, Users, MessageSquare, Zap, Globe, Github, Sparkles } from 'lucide-react';

const CommunityPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 pb-24 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-400 mb-8">
                            <Sparkles className="w-3 h-3 text-purple-400" />
                            A Global Ecosystem
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black mb-8 Outfit tracking-tight leading-[1.1]">
                            Build & Scale <br />
                            <span className="gradient-text italic opacity-90">Together.</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                            We operate a structured ecosystem that empowers developers, creators, students, and founders through referral-based incentives, growth campaigns, and AI mentorship pathways.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button onClick={() => navigate('/auth/creator')} className="group px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                                Join The Movement <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button onClick={() => navigate('/featured')} className="px-8 py-4 bg-transparent text-white border border-white/20 font-bold rounded-full hover:bg-white/5 transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
                                <Github className="w-5 h-5" /> Dev Portal
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-20 border-y border-white/5 bg-zinc-950/50 backdrop-blur-3xl relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
                        {[
                            { label: 'Verified Developers', val: '1.2k+', icon: <Users className="w-6 h-6 text-blue-400" /> },
                            { label: 'UGC Creators', val: '400+', icon: <Zap className="w-6 h-6 text-yellow-400" /> },
                            { label: 'Active Students', val: '8.5k+', icon: <Globe className="w-6 h-6 text-cyan-400" /> },
                            { label: 'Founders & Partners', val: '50+', icon: <MessageSquare className="w-6 h-6 text-purple-400" /> }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, ease: "circOut", duration: 0.5 }}
                                className="glass p-8 rounded-[32px] hover:border-purple-500/20 transition-colors group"
                            >
                                <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex flex-col justify-center items-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <p className="text-4xl md:text-5xl font-black text-white mb-3 Outfit">{stat.val}</p>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Circular Value System */}
            <section className="py-32 bg-black relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        <div className="order-2 lg:order-1 space-y-12">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-6 Outfit leading-tight">The Circular Value <span className="text-purple-400">System</span></h2>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    An optimized incentive structure designed to scale builders and reward operators equally.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { title: 'For Developers', desc: 'Access to high-growth AI products, technical mentorship, and equity-based participation.' },
                                    { title: 'For Creators', desc: 'Monetize influence by promoting validated apps with tracked growth credits and recurring payouts.' },
                                    { title: 'For Founders', desc: 'Scale beyond MVP with a built-in organic growth engine and a vetted talent pipeline.' },
                                    { title: 'For Students', desc: 'Gain real-world engineering experience, build a public portfolio, and enter the AI workforce.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 group glass p-6 rounded-3xl border border-white/5 hover:border-white/20 transition-colors">
                                        <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center font-bold text-white group-hover:text-purple-400 transition-colors shrink-0">
                                            0{i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2 Outfit">{item.title}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative h-[600px] w-full max-w-lg mx-auto lg:ml-auto hidden md:block">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-500/20 blur-[80px] rounded-full mix-blend-screen scale-90 -z-10"></div>
                            <div className="glass h-full rounded-[40px] border border-white/10 p-10 flex flex-col justify-center relative z-10 overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 blur-xl group-hover:opacity-30 group-hover:blur-2xl transition-all duration-700 pointer-events-none">
                                    <Globe className="w-64 h-64 text-purple-400" />
                                </div>
                                <blockquote className="text-3xl font-bold italic mb-8 leading-snug relative z-10 Outfit">
                                    "MVP LAB X isn't just an agency; it's a shared ownership ecosystem. The community is the engine driving every asset scale."
                                </blockquote>
                                <div className="flex items-center gap-4 relative z-10 mt-auto pt-8 border-t border-white/10">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-400 p-[2px]">
                                        <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                                            <span className="font-bold text-lg text-white">PX</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">MVPLABX Foundation</p>
                                        <p className="text-sm text-purple-400 tracking-widest font-bold">CORE OPS</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Bottom CTA Banner */}
            <section className="py-24 relative overflow-hidden bg-black border-t border-white/5">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[100px] -z-10"></div>
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-8 Outfit tracking-tight">Ready to enter <br className="hidden md:block" /><span className="text-gray-500">the ecosystem?</span></h2>
                    <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                        Whether you build, create, or invest — join the fastest growing network of AI native operators.
                    </p>
                    <button onClick={() => navigate('/auth/creator')} className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors inline-flex items-center gap-2 group text-lg">
                        Claim Your Spot <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CommunityPage;
