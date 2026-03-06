import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal, Github, Code2, AlertCircle } from 'lucide-react';
import { supabase } from '../../utils/supabaseClient';

export default function DeveloperAuthPage() {
    const navigate = useNavigate();

    // Form State
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [githubUsername, setGithubUsername] = useState('');
    const [stack, setStack] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    queryParams: {
                        first_name: firstName,
                        last_name: lastName,
                        github_username: githubUsername,
                        stack: stack,
                        role: 'developer'
                    }
                }
            });

            if (error) {
                if (error.message.includes('FetchError') || error.message.includes('Invalid API key')) {
                    console.warn("Simulated OAuth due to missing/invalid Supabase Keys.");
                    navigate('/developers');
                } else {
                    setError(error.message);
                }
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred during GitHub authentication.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030303] text-white flex flex-col selection:bg-purple-500/30">
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

            <div className="p-6">
                <button onClick={() => navigate('/developers')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold">
                    <ArrowLeft className="w-4 h-4" /> Back to Forum
                </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-lg">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                            <Terminal className="w-8 h-8 text-blue-400" />
                        </div>
                        <h1 className="text-3xl font-bold Outfit mb-2">Join the Talent Network</h1>
                        <p className="text-gray-400 text-sm">Create a profile to claim bounties and receive client requests.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl border border-white/10 space-y-6">

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">First Name</label>
                                <input
                                    type="text"
                                    required
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Last Name</label>
                                <input
                                    type="text"
                                    required
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Github className="w-4 h-4" /> GitHub Username
                            </label>
                            <input
                                type="text"
                                required
                                value={githubUsername}
                                onChange={(e) => setGithubUsername(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors font-mono"
                                placeholder="@username"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Primary Stack (e.g. React, Python)</label>
                            <input
                                type="text"
                                required
                                value={stack}
                                onChange={(e) => setStack(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                                placeholder="TypeScript, Next.js, Go"
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
                            className={`w-full py-4 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        >
                            <Code2 className="w-5 h-5" />
                            {isLoading ? 'Connecting to GitHub...' : 'Authenticate with GitHub'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
