import React from 'react';
import { HeroSection } from '../components/blocks/hero-section-1';
import { Footer } from '../components/layout/Footer';
import { ShieldCheck, TrendingUp, BarChart3, Lock, Users, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { CTA } from '../components/ui/call-to-action';
import { useNavigate } from 'react-router-dom';

const InvestmentFeature = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="glass p-8 rounded-3xl group hover:border-white/20 transition-colors">
        <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-bold Outfit mb-3">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
);

const AIInvestmentPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <HeroSection />

            {/* Core Philosophy Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-purple-900/10 rounded-full blur-[150px] -z-10"></div>
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-4 block">The MVP LAB X Approach</span>
                    <h2 className="text-4xl md:text-5xl font-bold Outfit mb-8 max-w-4xl mx-auto leading-tight">
                        We don't just build software. <br className="hidden md:block" />
                        <span className="text-gray-500">We build revenue-generating assets.</span>
                    </h2>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-16">
                        The traditional agency model is broken. We operate a Co-Build model where our interests align with yours: scalable infrastructure, verified market demand, and shared upside.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <InvestmentFeature
                            icon={<ShieldCheck className="w-6 h-6 text-green-400" />}
                            title="Validated Demand"
                            description="We only invest engineering resources into concepts that have demonstrated market pull or solve critical enterprise inefficiencies."
                        />
                        <InvestmentFeature
                            icon={<TrendingUp className="w-6 h-6 text-purple-400" />}
                            title="Shared Upside"
                            description="By participating in the capital stack, we reduce upfront technical costs in exchange for long-term equity or revenue share."
                        />
                        <InvestmentFeature
                            icon={<BarChart3 className="w-6 h-6 text-blue-400" />}
                            title="Transparent ROI"
                            description="Investors get access to real-time analytics, user growth metrics, and revenue dashboards for all co-built portfolio entities."
                        />
                    </div>
                </div>
            </section>

            {/* Portfolio Highlight Layer */}
            <section className="py-24 bg-zinc-950 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-bold Outfit mb-6">Invest in the Infrastructure of Tomorrow</h2>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                            Our portfolio focuses on AI-native tooling, educational technology infrastructure, and automated operational systems. We build what the market needs next.
                        </p>
                        <ul className="space-y-4 mb-10">
                            {[
                                "B2B SaaS with proven MRR",
                                "AI Marketplaces and Directories",
                                "Automated Enterprise Tooling",
                                "High-margin digital ecosystems"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 font-semibold">
                                    <CheckCircle2 className="w-5 h-5 text-purple-400" /> {item}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => navigate('/auth/investor')} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                            START INVESTING
                        </button>
                    </div>

                    <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
                        <div className="space-y-4 pt-10">
                            <div className="glass p-6 rounded-3xl bg-white/5">
                                <Zap className="w-8 h-8 text-yellow-400 mb-4" />
                                <h4 className="font-bold text-xl mb-1">2.4x</h4>
                                <p className="text-sm text-gray-500">Average Portfolio Growth (YoY)</p>
                            </div>
                            <div className="glass p-6 rounded-3xl bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/20">
                                <Users className="w-8 h-8 text-purple-400 mb-4" />
                                <h4 className="font-bold text-xl mb-1">50+</h4>
                                <p className="text-sm text-gray-400">Co-Build Partners & Founders</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="glass p-6 rounded-3xl bg-black border border-white/10">
                                <Lock className="w-8 h-8 text-blue-400 mb-4" />
                                <h4 className="font-bold text-xl mb-1">$4M+</h4>
                                <p className="text-sm text-gray-400">Total Deployment Value</p>
                            </div>
                            <div className="relative h-48 rounded-3xl overflow-hidden glass border border-white/10">
                                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop" alt="analytics" className="w-full h-full object-cover opacity-50" />
                                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                                    <span className="font-bold Outfit">Real-time Data Access</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <CTA
                title="Ready to allocate capital?"
                description="Join our network of strategic investors and co-build partners. Apply to see our active deal flow."
                primaryLabel="START INVESTING"
                secondaryLabel="Talk to a Partner"
                onPrimaryClick={() => navigate('/auth/investor')}
                onSecondaryClick={() => navigate('/build-with-us')}
                badgeLabel="Accredited Investors"
            />

            <Footer />
        </div>
    );
};

export default AIInvestmentPage;
