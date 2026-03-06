import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Database,
    Users,
    Plus,
    Trash2,
    Edit,
    Save,
    X,
    Loader2,
    CheckCircle2,
    AlertCircle,
    ArrowLeft,
    Briefcase,
    BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { Navbar } from '../../components/layout/Navbar';

type Tab = 'ecosystem' | 'bounties' | 'investments';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('ecosystem');
    const [products, setProducts] = useState<any[]>([]);
    const [bounties, setBounties] = useState<any[]>([]);
    const [stats, setStats] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // Form states for new product
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        tagline: '',
        description: '',
        image: '',
        href: '#'
    });

    // Form states for new bounty
    const [isAddingBounty, setIsAddingBounty] = useState(false);
    const [newBounty, setNewBounty] = useState({
        title: '',
        budget: '',
        skills: '',
        status: 'Open'
    });

    useEffect(() => {
        if (activeTab === 'ecosystem') fetchProducts();
        if (activeTab === 'bounties') fetchBounties();
        if (activeTab === 'investments') fetchStats();
    }, [activeTab]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.from('products').select('*');
            if (error) throw error;
            setProducts(data || []);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBounties = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.from('bounties').select('*');
            if (error) throw error;
            setBounties(data || []);
        } catch (err) {
            console.error('Error fetching bounties:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.from('platform_stats').select('*');
            if (error) throw error;
            setStats(data || []);
        } catch (err) {
            console.error('Error fetching stats:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from('products').insert([newProduct]);
            if (error) throw error;

            showNotification('Product added to ecosystem successfully!', 'success');
            setIsAddingProduct(false);
            setNewProduct({ name: '', tagline: '', description: '', image: '', href: '#' });
            fetchProducts();
        } catch (err: any) {
            showNotification(err.message, 'error');
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            showNotification('Product removed.', 'success');
            fetchProducts();
        } catch (err: any) {
            showNotification(err.message, 'error');
        }
    };

    const handleAddBounty = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const skillsArray = newBounty.skills.split(',').map(s => s.trim());
            const { error } = await supabase.from('bounties').insert([{
                ...newBounty,
                skills: skillsArray
            }]);
            if (error) throw error;
            showNotification('Bounty posted successfully!', 'success');
            setIsAddingBounty(false);
            setNewBounty({ title: '', budget: '', skills: '', status: 'Open' });
            fetchBounties();
        } catch (err: any) {
            showNotification(err.message, 'error');
        }
    };

    const handleDeleteBounty = async (id: string) => {
        if (!confirm('Are you sure you want to delete this bounty?')) return;
        try {
            const { error } = await supabase.from('bounties').delete().eq('id', id);
            if (error) throw error;
            showNotification('Bounty removed.', 'success');
            fetchBounties();
        } catch (err: any) {
            showNotification(err.message, 'error');
        }
    };

    const handleUpdateStat = async (id: string, newValue: string) => {
        try {
            const { error } = await supabase
                .from('platform_stats')
                .update({ value: newValue })
                .eq('id', id);

            if (error) throw error;
            showNotification('Statistic updated.', 'success');
            fetchStats();
        } catch (err: any) {
            showNotification(err.message, 'error');
        }
    };

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="min-h-screen bg-[#020202] text-white">
            <Navbar />

            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: '-50%' }}
                        animate={{ opacity: 1, y: 20, x: '-50%' }}
                        exit={{ opacity: 0, y: -50, x: '-50%' }}
                        className={`fixed top-24 left-1/2 z-[100] px-6 py-3 rounded-full flex items-center gap-3 backdrop-blur-xl border ${notification.type === 'success'
                            ? 'bg-green-500/10 border-green-500/50 text-green-400'
                            : 'bg-red-500/10 border-red-500/50 text-red-400'
                            }`}
                    >
                        {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="font-bold text-sm tracking-wide">{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="max-w-7xl mx-auto px-6 pt-40 pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em] mb-4"
                        >
                            <ArrowLeft className="w-4 h-4" /> Exit Admin Space
                        </button>
                        <h1 className="text-4xl md:text-5xl font-black Outfit tracking-tight">
                            Control <span className="gradient-text">Center.</span>
                        </h1>
                    </div>

                    <div className="flex items-center bg-zinc-900/50 border border-white/10 rounded-2xl p-1.5 backdrop-blur-xl">
                        {(['ecosystem', 'bounties', 'investments'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab
                                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                                    : 'text-gray-500 hover:text-white'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTab === 'ecosystem' && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold Outfit">Ecosystem Repository</h2>
                            <button
                                onClick={() => setIsAddingProduct(!isAddingProduct)}
                                className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-black hover:bg-purple-500 hover:text-white transition-all"
                            >
                                {isAddingProduct ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                {isAddingProduct ? 'Cancel' : 'Register New App'}
                            </button>
                        </div>

                        {isAddingProduct && (
                            <motion.form
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                onSubmit={handleAddProduct}
                                className="glass rounded-[32px] p-8 border border-purple-500/30 bg-purple-500/5 space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">App Name</label>
                                        <input
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                                            placeholder="e.g. NeuralDocs"
                                            value={newProduct.name}
                                            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Tagline</label>
                                        <input
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                                            placeholder="e.g. Legal AI SaaS"
                                            value={newProduct.tagline}
                                            onChange={e => setNewProduct({ ...newProduct, tagline: e.target.value })}
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Description</label>
                                        <textarea
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 min-h-[100px]"
                                            placeholder="Core value proposition..."
                                            value={newProduct.description}
                                            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Image URL</label>
                                        <input
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                                            placeholder="https://images.unsplash.com/..."
                                            value={newProduct.image}
                                            onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Link</label>
                                        <input
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500"
                                            placeholder="#"
                                            value={newProduct.href}
                                            onChange={e => setNewProduct({ ...newProduct, href: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-purple-600 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-purple-600/30 hover:scale-[1.01] transition-transform">
                                    Publish to Platform
                                </button>
                            </motion.form>
                        )}

                        <div className="grid grid-cols-1 gap-4">
                            {isLoading ? (
                                <div className="flex flex-col items-center py-20 grayscale opacity-50">
                                    <Loader2 className="w-10 h-10 animate-spin mb-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">Hydrating Repository...</span>
                                </div>
                            ) : products.length === 0 ? (
                                <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-20 text-center">
                                    <Database className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                    <p className="text-gray-500 font-bold">No products registered in the live ecosystem.</p>
                                </div>
                            ) : (
                                products.map((product) => (
                                    <div key={product.id} className="group glass bg-zinc-900/40 border border-white/5 rounded-3xl p-6 flex items-center justify-between hover:border-white/20 transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10">
                                                <img src={product.image} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold Outfit">{product.name}</h4>
                                                <p className="text-purple-400 text-xs font-black uppercase tracking-widest mb-1">{product.tagline}</p>
                                                <p className="text-gray-500 text-sm max-w-md truncate">{product.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors tooltip" data-tip="Edit">
                                                <Edit className="w-4 h-4 text-gray-400" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors tooltip"
                                                data-tip="Delete"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'bounties' && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold Outfit">Project Bounties</h2>
                            <button
                                onClick={() => setIsAddingBounty(!isAddingBounty)}
                                className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-black hover:bg-blue-500 hover:text-white transition-all"
                            >
                                {isAddingBounty ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                {isAddingBounty ? 'Cancel' : 'Post New Bounty'}
                            </button>
                        </div>

                        {isAddingBounty && (
                            <motion.form
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                onSubmit={handleAddBounty}
                                className="glass rounded-[32px] p-8 border border-blue-500/30 bg-blue-500/5 space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Project Title</label>
                                        <input
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                                            placeholder="e.g. LLM Optimization"
                                            value={newBounty.title}
                                            onChange={e => setNewBounty({ ...newBounty, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Budget Range</label>
                                        <input
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                                            placeholder="e.g. $5k - $10k"
                                            value={newBounty.budget}
                                            onChange={e => setNewBounty({ ...newBounty, budget: e.target.value })}
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-500">Skills Required (comma separated)</label>
                                        <input
                                            required
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                                            placeholder="Python, CUDA, PyTorch"
                                            value={newBounty.skills}
                                            onChange={e => setNewBounty({ ...newBounty, skills: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-blue-600 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-600/30 hover:scale-[1.01] transition-transform">
                                    Post Bounty to Forum
                                </button>
                            </motion.form>
                        )}

                        <div className="grid grid-cols-1 gap-4">
                            {isLoading ? (
                                <div className="flex flex-col items-center py-20 grayscale opacity-50">
                                    <Loader2 className="w-10 h-10 animate-spin mb-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">Hydrating Board...</span>
                                </div>
                            ) : bounties.length === 0 ? (
                                <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-20 text-center">
                                    <Briefcase className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                    <p className="text-gray-500 font-bold">No bounties listed on the internal board.</p>
                                </div>
                            ) : (
                                bounties.map((bounty) => (
                                    <div key={bounty.id} className="group glass bg-zinc-900/40 border border-white/5 rounded-3xl p-6 flex items-center justify-between hover:border-white/20 transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 font-black">
                                                $
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold Outfit">{bounty.title}</h4>
                                                <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-1">{bounty.status}</p>
                                                <p className="text-gray-500 text-sm">{bounty.budget}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                                <Edit className="w-4 h-4 text-gray-400" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBounty(bounty.id)}
                                                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'investments' && (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold Outfit">Platform Metrics</h2>
                            <p className="text-gray-500 text-sm">Update landing page statistics globally.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {isLoading ? (
                                <div className="flex flex-col items-center py-20 grayscale opacity-50">
                                    <Loader2 className="w-10 h-10 animate-spin mb-4" />
                                    <span className="text-xs font-black uppercase tracking-widest">Fetching Metrics...</span>
                                </div>
                            ) : stats.length === 0 ? (
                                <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-20 text-center">
                                    <BarChart3 className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                    <p className="text-gray-500 font-bold">No platform metrics found in DB. Fallback to static values enabled.</p>
                                </div>
                            ) : (
                                stats.map((stat) => (
                                    <div key={stat.id} className="group glass bg-zinc-900/40 border border-white/5 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-white/20 transition-all">
                                        <div className="flex items-center gap-6 w-full md:w-auto">
                                            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400">
                                                <BarChart3 className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold Outfit">{stat.label}</h4>
                                                <p className="text-gray-500 text-xs font-black uppercase tracking-widest leading-none">Global Variable</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 w-full md:w-auto">
                                            <div className="flex items-center bg-black/40 border border-white/10 rounded-xl px-4 py-2 flex-1 md:flex-none">
                                                {stat.prefix && <span className="text-gray-500 mr-2 font-bold">{stat.prefix}</span>}
                                                <input
                                                    className="bg-transparent border-none outline-none text-white font-black text-xl w-24"
                                                    defaultValue={stat.value}
                                                    onBlur={(e) => {
                                                        if (e.target.value !== stat.value) {
                                                            handleUpdateStat(stat.id, e.target.value);
                                                        }
                                                    }}
                                                />
                                                {stat.suffix && <span className="text-gray-500 ml-2 font-bold">{stat.suffix}</span>}
                                            </div>
                                            <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                                                <Save className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
