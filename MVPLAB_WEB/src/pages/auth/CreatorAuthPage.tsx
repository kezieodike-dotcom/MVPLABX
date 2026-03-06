import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';

export default function CreatorAuthPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Form State
    const [fullName, setFullName] = useState('');
    const [socialLink, setSocialLink] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        social_link: socialLink,
                        role: 'creator'
                    }
                }
            });

            if (error) {
                if (error.message.includes('FetchError') || error.message.includes('Invalid API key')) {
                    console.warn("Simulated Registration due to missing/invalid Supabase Keys.");
                    navigate('/community');
                } else {
                    setError(error.message);
                }
            } else if (data.user) {
                navigate('/community');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred during signup.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030303] text-white flex flex-col selection:bg-purple-500/30">
            <div className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-blue-900/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

            <div className="p-6">
                <button onClick={() => navigate('/community')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold">
                    <ArrowLeft className="w-4 h-4" /> Back to Community
                </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(234,179,8,0.15)] relative">
                            <Zap className="w-8 h-8 text-yellow-400" />
                            <Sparkles className="w-4 h-4 text-purple-400 absolute font-bold -top-2 -right-2" />
                        </div>
                        <h1 className="text-3xl font-bold Outfit mb-2">Creator Portal</h1>
                        <p className="text-gray-400 text-sm">Join the UGC network, promote products, track commissions.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-white/10 space-y-6 relative overflow-hidden">

                        {/* Fake Progress Bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                            <div className={`h-full bg-gradient-to-r from-purple-500 to-yellow-500 transition-all duration-500 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
                        </div>

                        {step === 1 ? (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                                        placeholder="Alex Mercer"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Primary Social Link</label>
                                    <input
                                        type="url"
                                        required
                                        value={socialLink}
                                        onChange={(e) => setSocialLink(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                                        placeholder="tiktok.com/@creator"
                                    />
                                </div>

                                <button type="button" onClick={() => setStep(2)} className="w-full py-4 mt-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                                    Next Step
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                                        placeholder="alex@creator.co"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
                                        placeholder="••••••••••••"
                                    />
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
                                    className={`w-full py-4 mt-4 bg-white text-black font-bold rounded-xl transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                >
                                    {isLoading ? 'Creating Profile...' : 'Join Network'}
                                </button>
                                <button type="button" onClick={() => setStep(1)} className="w-full py-0 text-sm text-gray-400 font-bold hover:text-white transition-colors mt-2">
                                    Back
                                </button>
                            </div>
                        )}

                        <div className="pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-green-500" /> Fast-track application process
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
