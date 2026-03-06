import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    ExternalLink,
    ShieldCheck,
    Globe,
    Zap,
    BarChart3,
    Users,
    Code2,
    Sparkles,
    Loader2,
    CheckCircle2
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CTA } from '../components/ui/call-to-action';
import { supabase } from '../utils/supabaseClient';
import { PRODUCTS } from '../../constants';

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            try {
                // Try fetching from Supabase first
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (data) {
                    setProduct(data);
                } else {
                    // Fallback to constants if not found in DB (for mock data parity)
                    const mockProduct = PRODUCTS.find(p => p.id === id);
                    if (mockProduct) {
                        setProduct(mockProduct);
                    }
                }
            } catch (err) {
                console.error('Error fetching product:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                <p className="font-bold Outfit tracking-widest text-xs uppercase opacity-50">Fetching Product DNA...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center">
                <h1 className="text-4xl font-black Outfit mb-4">404: App Not Found</h1>
                <p className="text-gray-500 mb-8 max-w-md">The product DNA you are looking for has either been decommissioned or moved to a private repository.</p>
                <Link to="/featured" className="px-8 py-3 bg-white text-black font-black rounded-full text-sm uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all">
                    Return to Ecosystem
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 pb-20 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-purple-600/10 to-transparent -z-10 blur-[120px]"></div>

                <div className="max-w-7xl mx-auto px-6">
                    <button
                        onClick={() => navigate('/featured')}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em] mb-12"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Ecosystem
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-purple-500/20">
                                <Sparkles className="w-3 h-3" /> Featured Solution
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black Outfit tracking-tight leading-[1.05] mb-6">
                                {product.name}.
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed mb-8 font-medium">
                                {product.description}
                            </p>

                            <div className="flex flex-wrap gap-4 mb-10">
                                <a
                                    href={product.href || '#'}
                                    className="px-8 py-4 bg-white text-black font-black rounded-2xl text-sm uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all flex items-center gap-2 group"
                                >
                                    Open Application <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                                <button className="px-8 py-4 bg-zinc-900 border border-white/10 text-white font-black rounded-2xl text-sm uppercase tracking-widest hover:bg-zinc-800 transition-all">
                                    Technical Docs
                                </button>
                            </div>

                            <div className="flex items-center gap-8 py-6 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-green-500" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Enterprise Ready</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-blue-500" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global CDN</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative"
                        >
                            <div className="aspect-video rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl shadow-purple-500/10">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-purple-600 p-8 rounded-[32px] shadow-xl hidden md:block border border-white/20">
                                <Zap className="w-8 h-8 text-white mb-2" />
                                <p className="text-xs font-black uppercase tracking-widest text-white/70">Performance</p>
                                <p className="text-2xl font-black Outfit">99.9%</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-24 bg-black/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black Outfit mb-4">Core Capabilities.</h2>
                        <p className="text-gray-500 max-w-xl mx-auto font-medium">Built on the MVPLABX Neural Stack for maximum efficiency and speed.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <BarChart3 className="text-blue-400" />, title: "Real-time Metrics", desc: "Live-synced data visualizers for every component." },
                            { icon: <Users className="text-purple-400" />, title: "Multi-tenant", desc: "Enterprise-grade isolation for complex user bases." },
                            { icon: <Code2 className="text-green-400" />, title: "API First", desc: "Complete documentation for headless integration." }
                        ].map((feature, i) => (
                            <div key={i} className="glass p-10 rounded-[40px] border border-white/5 hover:border-white/10 transition-all group">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-bold Outfit mb-4">{feature.title}</h4>
                                <p className="text-gray-500 leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Validation Proof */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="glass rounded-[48px] p-12 md:p-20 border border-zinc-800 bg-gradient-to-br from-zinc-900/50 to-black flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-10 border border-green-500/20">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black Outfit mb-8">Verified Architecture.</h2>
                        <p className="text-gray-400 text-lg mb-12 max-w-2xl">
                            {product.name} has passed the MVPLABX security and performance audit. It is optimized for high-volume traffic and mission-critical operations.
                        </p>
                        <div className="flex gap-12 grayscale opacity-40">
                            <span className="font-black Outfit text-2xl">SOC2</span>
                            <span className="font-black Outfit text-2xl">GDPR</span>
                            <span className="font-black Outfit text-2xl">ISO27001</span>
                        </div>
                    </div>
                </div>
            </section>

            <CTA />
            <Footer />
        </div>
    );
}
