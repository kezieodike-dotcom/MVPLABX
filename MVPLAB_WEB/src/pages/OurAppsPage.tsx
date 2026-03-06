import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, ExternalLink, ShieldCheck, Globe, Award, Sparkles, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CTA } from '../components/ui/call-to-action';
import { PRODUCTS } from '../../constants';
import { supabase } from '../utils/supabaseClient';
import { Loader2 } from 'lucide-react';

const MOCK_APPS = [
    ...PRODUCTS,
    {
        id: 'autoflow',
        name: 'AutoFlow AI',
        tagline: 'Enterprise Automation Builder',
        description: 'Drag-and-drop workflow automation for connecting internal tools with LLMs.',
        icon: <Sparkles className="w-12 h-12 text-yellow-400" />,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
        href: '#'
    },
    {
        id: 'nexus',
        name: 'Nexus Security',
        tagline: 'API Gateway & Protection',
        description: 'AI-driven threat detection and rate limiting for high-volume endpoints.',
        icon: <ShieldCheck className="w-12 h-12 text-red-400" />,
        image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=2938&auto=format&fit=crop',
        href: '#'
    },
    {
        id: 'creatorhub',
        name: 'Creator Hub',
        tagline: 'Content Monetization Platform',
        description: 'All-in-one dashboard for creators to manage subscriptions and digital products.',
        icon: <Globe className="w-12 h-12 text-pink-400" />,
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop',
        href: '#'
    }
];


const OurAppsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [apps, setApps] = useState<any[]>(MOCK_APPS);
    const [isLoading, setIsLoading] = useState(false);

    React.useEffect(() => {
        const fetchApps = async () => {
            setIsLoading(true);
            try {
                const { data, error } = await supabase.from('products').select('*');
                if (error) throw error;
                if (data && data.length > 0) {
                    setApps(data);
                }
            } catch (err) {
                console.error('Error fetching apps:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchApps();
    }, []);

    const filteredApps = apps.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Navbar />

            {/* Header */}
            <header className="pt-40 pb-16 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-purple-900/20 to-transparent -z-10"></div>
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 Outfit tracking-tight">
                            Products Developed by <br />
                            <span className="gradient-text">MVP LAB X</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Explore our portfolio of scalable platforms, AI tools, and enterprise infrastructure running in production today.
                        </p>

                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search apps, tools, platforms..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-purple-500 transition-colors text-white text-lg"
                            />
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Grid display */}
            <section className="py-16 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                            <p className="text-gray-500 font-bold Outfit">Syncing Ecosystem Data...</p>
                        </div>
                    ) : filteredApps.length === 0 ? (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold text-gray-500 mb-2">No products found</h3>
                            <p className="text-gray-600">Try adjusting your search query.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredApps.map((app, i) => (
                                <motion.div
                                    key={app.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative glass rounded-[32px] hover:border-white/30 transition-all overflow-hidden flex flex-col h-full bg-zinc-900/50"
                                >
                                    <div className="h-56 overflow-hidden relative border-b border-white/5">
                                        <img src={app.image} alt={app.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                                        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                                            <div className="p-3 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10">{app.icon}</div>
                                            <a href={app.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-md tooltip" data-tip="Visit website">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="mb-4">
                                            <h3 className="text-2xl font-bold Outfit mb-1">{app.name}</h3>
                                            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">{app.tagline}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                                            {app.description}
                                        </p>
                                        <Link to={`/ecosystem/${app.id}`} className="flex items-center justify-between group/link text-sm font-bold text-white w-full py-4 border-t border-white/10 hover:border-white/30 transition-colors">
                                            <span>View Details</span>
                                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <CTA
                title="Want to build the next big thing?"
                description="We help visionaries build scalable apps from scratch. Let's talk about your idea."
                primaryLabel="Build With Us"
                secondaryLabel="View Investment Opportunities"
                badgeLabel="Start building"
                onPrimaryClick={() => window.location.href = '/build-with-us'}
                onSecondaryClick={() => window.location.href = '/ai-investment'}
            />

            <Footer />
        </div>
    );
};

export default OurAppsPage;
