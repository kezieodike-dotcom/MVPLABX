import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Linkedin, Copy } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { BLOG_POSTS } from '../../constants';

// Mock content block mapping for different posts
const contentMap: Record<string, React.ReactNode> = {
    'blog-1': (
        <>
            <p>
                Shipping a viable product in 8 weeks isn't about working harder; it's about eliminating the friction of repetitive architecture. When building MVP LAB X, we realized that 80% of SaaS applications share the exact same foundation: authentication, database schemas, routing, and deployment pipelines.
            </p>
            <h3>The AI-First Foundation</h3>
            <p>
                Rather than writing boilerplate, we leverage large language models to scaffold the initial architecture. This allows our engineering team to immediately focus on the 20% that makes the product unique—the core business logic and AI integrations.
            </p>
            <ul>
                <li><strong>Week 1-2:</strong> Discovery, wireframing, and DB scaffolding.</li>
                <li><strong>Week 3-5:</strong> Core logic implementation and AI API integration.</li>
                <li><strong>Week 6-8:</strong> Hardening, UI polish, and production deployment.</li>
            </ul>
            <blockquote>
                "Speed is a feature. But speed without architecture is just technical debt waiting to explode."
            </blockquote>
            <p>
                By standardizing our tech stack around React, Node, and vector databases, we've created a predictable assembly line for digital products. This is how we consistently beat traditional agency timelines by months.
            </p>
        </>
    ),
    'blog-2': (
        <>
            <p>
                For decades, venture capital has relied on a hit-driven model: invest in 100 startups, hope 1 becomes a unicorn, and write off the rest. But what if you could invest directly into the underlying digital asset—the software itself—rather than the company shell?
            </p>
            <h3>The Rise of the Digital Asset Class</h3>
            <p>
                At MVP LAB X, we are pioneering a model where validated AI products are treated as revenue-generating infrastructure. Instead of betting on unproven teams, our investors deploy capital into platforms that have already shown market pull and are built on proven technical foundations.
            </p>
            <p>
                This approach transforms software development from an expense into an investment vehicle, offering transparent ROI, real-time analytics, and shared equity in the underlying IP. It's not just a new way to build; it's a new way to own the future.
            </p>
        </>
    ),
    'blog-3': (
        <>
            <p>
                Open source changed the world, but it rarely pays the people who actually build it. We wanted to create an ecosystem where contributing to the platform translates directly to financial upside.
            </p>
            <h3>The Referral Engine</h3>
            <p>
                Our community model is simple: if you help build, test, or distribute an MVPLABX product, you share in its success. We've structured this through a system of tracked referrals and bounty pools.
            </p>
            <p>
                When a developer from our network implements a core feature that scales across multiple portfolio apps, they receive ongoing compensation based on the usage of that feature. It's a meritocratic system designed to attract and retain elite engineering talent by aligning their incentives with the growth of the overall ecosystem.
            </p>
        </>
    )
};

const BlogPostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const post = BLOG_POSTS.find(p => p.id === id);

    // Fallback if post not found
    if (!post) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
                <Navbar />
                <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                <Link to="/blogs" className="text-purple-400 hover:text-purple-300 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Navbar />

            <article className="pt-32 pb-24">
                {/* Post Header */}
                <header className="max-w-4xl mx-auto px-6 text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-900/20 rounded-full blur-[120px] -z-10"></div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10">
                            <ArrowLeft className="w-4 h-4" /> Back to insights
                        </Link>

                        <div className="flex justify-center items-center gap-4 text-xs font-bold uppercase tracking-widest text-purple-400 mb-6">
                            <span>{post.category}</span>
                            <span className="text-gray-600">•</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {post.readTime}</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black mb-8 Outfit leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm border-t border-b border-white/5 py-4">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" /> <span className="font-bold text-white">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> <span>{post.date}</span>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Post Content */}
                <div className="max-w-3xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="prose prose-invert prose-purple prose-lg md:prose-xl max-w-none"
                    >
                        <p className="lead text-xl md:text-2xl text-gray-300 font-medium Outfit mb-12">
                            {post.excerpt}
                        </p>

                        {/* Rendering dynamic content based on ID */}
                        {contentMap[post.id] || <p>Content coming soon...</p>}

                    </motion.div>

                    {/* Footer / Share */}
                    <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-lg">
                                X
                            </div>
                            <div>
                                <p className="font-bold Outfit text-lg">MVPLABX Team</p>
                                <p className="text-sm text-gray-400">Core Engineering & Ops</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-500 mr-2 uppercase tracking-widest">Share</span>
                            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-twitter flex items-center justify-center hover:bg-[#1DA1F2] transition-colors group">
                                <Twitter className="w-4 h-4 text-gray-400 group-hover:text-white" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-linkedin flex items-center justify-center hover:bg-[#0077b5] transition-colors group">
                                <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-white" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors group" title="Copy Link">
                                <Copy className="w-4 h-4 text-gray-400 group-hover:text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </div>
    );
};

export default BlogPostPage;
