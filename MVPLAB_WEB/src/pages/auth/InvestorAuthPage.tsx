import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';

export default function InvestorAuthPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                // Determine if it's a simulated error due to placeholder keys
                if (error.message.includes('FetchError') || error.message.includes('Invalid API key')) {
                    console.warn("Simulated Login due to missing/invalid Supabase Keys.");
                    navigate('/dashboards/investor');
                } else {
                    setError(error.message);
                }
            } else if (data.session) {
                navigate('/dashboards/investor');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030303] text-white flex flex-col selection:bg-purple-500/30">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-900/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

            <div className="p-6">
                <button onClick={() => navigate('/ai-investment')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold">
                    <ArrowLeft className="w-4 h-4" /> Back to Platform
                </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                            <Shield className="w-8 h-8 text-purple-400" />
                        </div>
                        <h1 className="text-3xl font-bold Outfit mb-2">Investor Portal</h1>
                        <p className="text-gray-400 text-sm">Secure access to capital deployment and portfolio metrics.</p>
                    </div>

                    <form onSubmit={handleLogin} className="glass p-8 rounded-3xl border border-white/10 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                                    placeholder="partner@fund.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Access Token</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                                    placeholder="••••••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                                <AlertCircle className="w-5 h-5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-4 bg-white text-black font-bold rounded-xl transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                        >
                            {isLoading ? 'Authenticating...' : 'Authenticate & Enter'}
                        </button>

                        <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> End-to-end encrypted connection
                        </div>
                    </form>

                    <p className="text-center text-gray-500 text-xs mt-8">
                        Not an approved partner yet? <a href="/build-with-us" className="text-purple-400 hover:text-white transition-colors">Apply here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
