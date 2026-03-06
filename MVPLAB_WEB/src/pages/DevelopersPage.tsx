import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, Github, Code2, Search, Briefcase, UserPlus, FileEdit } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';

const MOCK_TALENT = [
    { name: "Sarah Jin", role: "Sr. AI Engineer", stack: ["Python", "PyTorch", "AWS"], rate: "$120/hr", available: true },
    { name: "Marcus Webb", role: "Fullstack Developer", stack: ["React", "Node.js", "PostgreSQL"], rate: "$85/hr", available: true },
    { name: "Elara Vance", role: "Blockchain Architect", stack: ["Solidity", "Rust", "Web3.js"], rate: "$150/hr", available: false },
    { name: "David Chen", role: "UI/UX & Frontend", stack: ["Figma", "Tailwind", "Next.js"], rate: "$75/hr", available: true },
];

const MOCK_BOUNTIES = [
    { title: "Scale LLM Inference Engine", budget: "$5k - $10k", skills: ["Python", "CUDA", "TensorRT"], status: "Open" },
    { title: "React Native Mobile App for SaaS", budget: "$15k", skills: ["React Native", "Expo", "Firebase"], status: "In Progress" },
    { title: "Automate Internal QA Testing", budget: "$2k", skills: ["Cypress", "GitHub Actions"], status: "Open" },
    { title: "Smart Contract Audit", budget: "$8k", skills: ["Solidity", "Security"], status: "Closed" },
];

const DevelopersPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'talent' | 'bounties'>('talent');
    const [bounties, setBounties] = useState<any[]>(MOCK_BOUNTIES);
    const [isLoadingBounties, setIsLoadingBounties] = useState(false);

    useEffect(() => {
        if (activeTab === 'bounties') {
            const fetchBounties = async () => {
                setIsLoadingBounties(true);
                try {
                    if (!(import.meta as any).env.VITE_SUPABASE_URL || (import.meta as any).env.VITE_SUPABASE_URL.includes('placeholder')) {
                        console.log('Using mock bounties due to missing Supabase keys');
                        setIsLoadingBounties(false);
                        return;
                    }
                    const { data, error } = await supabase.from('bounties').select('*');
                    if (error) throw error;
                    if (data && data.length > 0) {
                        setBounties(data);
                    }
                } catch (error) {
                    console.error('Error fetching bounties:', error);
                } finally {
                    setIsLoadingBounties(false);
                }
            };
            fetchBounties();
        }
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-[#030303] text-white selection:bg-purple-500/30">
            <Navbar />

            {/* Header / Hero */}
            <section className="pt-40 pb-16 relative overflow-hidden border-b border-white/5 bg-black">
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none -z-10"></div>
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-500/20">
                            <Terminal className="w-4 h-4" />
                            Developer Network
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 Outfit tracking-tight leading-[1.1]">
                            The World's Elite <br />
                            <span className="gradient-text italic">Builder Market.</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                            Join the network to advertise your skills to top-tier startups, or post a bounty to hire vetted talent for your next microservice.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Forum / Board Section */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Controls & Tabs */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-full md:w-auto">
                            <button
                                onClick={() => setActiveTab('talent')}
                                className={`flex-1 md:flex-none px-8 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'talent' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Talent Directory
                            </button>
                            <button
                                onClick={() => setActiveTab('bounties')}
                                className={`flex-1 md:flex-none px-8 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === 'bounties' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                            >
                                Bounty Board
                            </button>
                        </div>

                        <div className="flex w-full md:w-auto gap-4">
                            {activeTab === 'talent' ? (
                                <button onClick={() => navigate('/auth/developer')} className="flex-1 md:flex-none px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                    <UserPlus className="w-4 h-4" /> Join Network
                                </button>
                            ) : (
                                <button onClick={() => navigate('/build-with-us')} className="flex-1 md:flex-none px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm">
                                    <FileEdit className="w-4 h-4" /> Post a Request
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Interactive Board Display */}
                    <div className="glass rounded-[32px] border border-white/10 min-h-[500px] overflow-hidden bg-black/40 relative">
                        {/* Search header inside board */}
                        <div className="px-8 py-6 border-b border-white/10 bg-white/5 flex items-center gap-4">
                            <Search className="w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab === 'talent' ? 'engineers by stack, role...' : 'projects by budget, language...'}`}
                                className="bg-transparent border-none outline-none text-white w-full text-sm font-medium"
                            />
                        </div>

                        <div className="p-8">
                            <AnimatePresence mode="wait">
                                {activeTab === 'talent' ? (
                                    <motion.div
                                        key="talent"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="grid gap-4"
                                    >
                                        {MOCK_TALENT.map((dev, i) => (
                                            <div key={i} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors group">
                                                <div className="flex items-center gap-6 mb-4 md:mb-0">
                                                    <div className="relative">
                                                        <div className="w-14 h-14 bg-gradient-to-tr from-gray-800 to-gray-700 rounded-full flex items-center justify-center font-bold text-xl uppercase tracking-tighter shadow-inner">
                                                            {dev.name.substring(0, 2)}
                                                        </div>
                                                        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-black ${dev.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg Outfit">{dev.name}</h3>
                                                        <p className="text-gray-400 text-sm font-medium">{dev.role}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                                                    {dev.stack.map(tech => (
                                                        <span key={tech} className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-gray-300">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex items-center w-full md:w-auto justify-between md:justify-end gap-6">
                                                    <span className="font-mono text-purple-400 font-bold">{dev.rate}</span>
                                                    <button className="px-6 py-2 bg-transparent border border-white/20 text-white text-sm font-bold rounded-full hover:bg-white hover:text-black transition-colors opacity-0 group-hover:opacity-100">
                                                        Hire Talent
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="bounties"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="grid gap-4"
                                    >
                                        {isLoadingBounties ? (
                                            <div className="flex justify-center items-center py-12">
                                                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                                            </div>
                                        ) : bounties.map((bounty, i) => (
                                            <div key={i} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                                                <div className="mb-4 md:mb-0 max-w-lg">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest ${bounty.status === 'Open' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : bounty.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                                                            {bounty.status}
                                                        </span>
                                                    </div>
                                                    <h3 className="font-bold text-xl Outfit text-blue-100">{bounty.title}</h3>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                                                    {bounty.skills.map(skill => (
                                                        <span key={skill} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-xs font-bold border border-blue-500/20">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="flex items-center w-full md:w-auto justify-between md:justify-end gap-6">
                                                    <div className="text-right">
                                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Budget</p>
                                                        <span className="font-mono text-white font-bold">{bounty.budget}</span>
                                                    </div>
                                                    <button className={`px-6 py-2 text-sm font-bold rounded-full transition-colors ${bounty.status === 'Open' ? 'bg-white text-black hover:bg-gray-300' : 'bg-white/10 text-gray-500 cursor-not-allowed hidden md:block'}`}>
                                                        Apply
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default DevelopersPage;
