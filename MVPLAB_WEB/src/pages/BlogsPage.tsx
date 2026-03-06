import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { BLOG_POSTS } from '../../constants';

const BlogsPage: React.FC = () => {
    const navigate = useNavigate();

    // The first post is featured
    const featuredPost = BLOG_POSTS[0];
    const regularPosts = BLOG_POSTS.slice(1);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Navbar />

            {/* Header */}
            <header className="pt-40 pb-16 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-purple-900/20 to-transparent -z-10"></div>
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 Outfit tracking-tight">
                            Insights & <span className="gradient-text">Engineering</span>
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                            Thoughts, architectures, and strategies from the MVPLABX team on building AI products and operating an ecosystem.
                        </p>
                    </motion.div>
                </div>
            </header>

            {/* Featured Post */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <span className="text-purple-400 font-bold uppercase tracking-widest text-sm mb-6 block">Featured Post</span>
                    <Link to={`/blogs/${featuredPost.id}`} className="group block">
                        <div className="relative rounded-[40px] overflow-hidden glass border border-white/10 group-hover:border-purple-500/30 transition-all">
                            <div className="flex flex-col md:flex-row min-h-[400px]">
                                <div className="md:w-1/2 relative overflow-hidden bg-zinc-900 border-b md:border-b-0 md:border-r border-white/10">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-black/80 z-10"></div>
                                    <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop" alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" />
                                </div>
                                <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-black/50 backdrop-blur-md">
                                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                                        <span className="text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">{featuredPost.category}</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {featuredPost.date}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold Outfit mb-4 group-hover:text-purple-400 transition-colors">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-sm">
                                                X
                                            </div>
                                            <div className="text-sm">
                                                <p className="font-bold">{featuredPost.author}</p>
                                                <p className="text-gray-500">{featuredPost.readTime}</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Grid Posts */}
            <section className="py-16 min-h-[50vh]">
                <div className="max-w-7xl mx-auto px-6">
                    <h3 className="text-2xl font-bold Outfit mb-8">Latest Articles</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {regularPosts.map((post, i) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link to={`/blogs/${post.id}`} className="group flex flex-col h-full glass rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all bg-zinc-900/50">
                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                                            <span className="text-blue-400">{post.category}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold Outfit mb-4 group-hover:text-purple-400 transition-colors line-clamp-3">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                            <div className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                                <User className="w-4 h-4" /> {post.author}
                                            </div>
                                            <span className="text-white text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Read <ChevronRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-24 border-t border-white/5 relative bg-black">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold Outfit mb-6">Get Updates from the Core.</h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                        Join developers, founders, and investors receiving our latest research, architectural breakdowns, and ecosystem updates.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shrink-0">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BlogsPage;
