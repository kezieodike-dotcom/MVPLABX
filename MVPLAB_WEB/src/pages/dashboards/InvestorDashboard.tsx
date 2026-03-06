import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, PieChart, Activity, DollarSign, TrendingUp, Layers } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';

export default function InvestorDashboard() {
    const navigate = useNavigate();

    const [assets, setAssets] = useState<any[]>([
        { name: "NeuralDocs AI", sector: "Legal Tech SaaS", share: "15%", mrr: "$42.5K", status: "Scaling" },
        { name: "FlowState Ops", sector: "Enterprise Infra", share: "20%", mrr: "$12.0K", status: "Building" },
        { name: "CreatorSync", sector: "Creator Economy", share: "10%", mrr: "$85.0K", status: "Profitable" },
    ]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                if (!(import.meta as any).env.VITE_SUPABASE_URL || (import.meta as any).env.VITE_SUPABASE_URL.includes('placeholder')) {
                    console.log('Using mock data for Investor Dashboard due to missing Supabase keys');
                    setIsLoading(false);
                    return;
                }

                const { data, error } = await supabase
                    .from('investments')
                    .select('*');

                if (error) throw error;
                if (data && data.length > 0) {
                    setAssets(data);
                }
            } catch (error) {
                console.error('Error fetching investments:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAssets();
    }, []);

    return (
        <div className="min-h-screen bg-[#030303] text-white selection:bg-purple-500/30">
            {/* Top Navigation Bar */}
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center font-bold">M</div>
                            <span className="font-bold tracking-tight Outfit hidden md:block">Investor Portal</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-400 rounded-full text-xs font-bold border border-green-500/20">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Live Data
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-sm">
                            LP
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold Outfit mb-2">Portfolio Overview</h1>
                    <p className="text-gray-400">Welcome back. Here is your real-time asset performance.</p>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Capital Deployed', value: '$1.25M', trend: '+12.5%', icon: DollarSign },
                        { label: 'Estimated Portfolio Value', value: '$3.80M', trend: '+24.1%', icon: PieChart },
                        { label: 'Active Co-Builds', value: '4 Assets', trend: 'Stable', icon: Layers },
                        { label: 'Realized ARR Share', value: '$145K', trend: '+8.2%', icon: TrendingUp },
                    ].map((kpi, i) => (
                        <div key={i} className="glass p-6 rounded-3xl border border-white/10 hover:border-purple-500/30 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                    <kpi.icon className="w-5 h-5 text-gray-300" />
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.trend.includes('+') ? 'bg-green-500/10 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
                                    {kpi.trend}
                                </span>
                            </div>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{kpi.label}</p>
                            <h3 className="text-3xl font-bold Outfit">{kpi.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Active Assets Table */}
                <div className="glass rounded-3xl border border-white/10 overflow-hidden mb-12">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <Activity className="w-5 h-5 text-purple-400" /> Active Entities
                        </h3>
                        <button className="text-xs font-bold text-purple-400 hover:text-white transition-colors">Download Report</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5 text-xs font-bold text-gray-500 uppercase tracking-widest bg-black/40">
                                    <th className="p-6">Asset Name</th>
                                    <th className="p-6">Sector</th>
                                    <th className="p-6">Equity / Share</th>
                                    <th className="p-6">Current MRR</th>
                                    <th className="p-6 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="p-6 text-center text-gray-500 font-bold">Loading active assets...</td>
                                    </tr>
                                ) : assets.map((row, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-bold text-white">{row.name}</td>
                                        <td className="p-6 text-gray-400">{row.sector}</td>
                                        <td className="p-6 font-mono text-gray-300">{row.share}</td>
                                        <td className="p-6 font-mono font-bold text-green-400">{row.mrr}</td>
                                        <td className="p-6 text-right">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${row.status === 'Profitable' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
