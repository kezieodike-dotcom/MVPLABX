
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { TestimonialsColumn } from '../components/ui/testimonials-columns-1';
import { INVESTMENT_REVIEWS } from '../../constants';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const InvestmentReviewsPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const firstColumn = INVESTMENT_REVIEWS.slice(0, 2);
    const secondColumn = INVESTMENT_REVIEWS.slice(2, 4);
    const thirdColumn = INVESTMENT_REVIEWS.slice(4, 6);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Navbar />

            <main className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/10 blur-[120px] rounded-full"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <button
                            onClick={() => navigate('/ai-investment')}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-400 mb-8 hover:text-white hover:bg-white/10 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Investment
                        </button>

                        <h1 className="text-4xl md:text-7xl font-bold mb-8 Outfit tracking-tight">
                            What Our <span className="gradient-text italic">Investors</span> Say
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            Discover why leading venture partners and angel investors choose MVP LAB X for high-performance AI asset management.
                        </p>
                    </motion.div>

                    <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] h-[700px] overflow-hidden">
                        <TestimonialsColumn testimonials={firstColumn} duration={20} />
                        <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={25} />
                        <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={22} />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-24 text-center"
                    >
                        <div className="glass p-12 rounded-[40px] border-white/10 max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold mb-6 Outfit">Ready to Invest?</h2>
                            <p className="text-gray-400 mb-8 text-lg">
                                Join our network of sophisticated investors and gain early access to validated AI-first digital products.
                            </p>
                            <button
                                onClick={() => navigate('/coming-soon')}
                                className="px-10 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-all"
                            >
                                Start Your Journey
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default InvestmentReviewsPage;
