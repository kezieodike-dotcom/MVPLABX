import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#030303] text-white flex flex-col selection:bg-purple-500/30">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

                <div className="relative z-10 text-center max-w-2xl mx-auto">
                    <p className="font-mono text-purple-500 font-bold tracking-widest uppercase mb-4">Error 404</p>
                    <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter Outfit">Page Not Found</h1>

                    <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-xl mx-auto">
                        The endpoint you're trying to reach doesn't exist or is currently offline. Return to the core ecosystem.
                    </p>

                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
}
