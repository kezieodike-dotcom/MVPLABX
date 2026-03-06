import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Shield, Cpu, Layout, MessageSquare, Terminal } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { PRICING_PLANS } from '../../constants';

const BuildWithUsPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    projectDetails: '',
    budget: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send data to backend here
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', company: '', projectDetails: '', budget: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-purple-600/10 text-purple-400 rounded-full text-xs font-bold mb-6 uppercase tracking-widest border border-purple-500/20">
              Agency & Venture Studio
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] Outfit tracking-tight">
              Let's Build Something <br />
              <span className="gradient-text">Extraordinary</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
              From enterprise AI integrations to consumer-facing mobile apps, we design, build, and scale digital products that define the future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold Outfit">Our Development Process</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">We don't just write code. We engineer scalable solutions designed for growth and resilience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <MessageSquare className="w-8 h-8 text-blue-400" />, title: "1. Discovery", desc: "Understanding your vision, market fit, and technical requirements." },
              { icon: <Layout className="w-8 h-8 text-purple-400" />, title: "2. Architecture", desc: "Designing scalable infrastructure, database schemas, and UX/UI." },
              { icon: <Terminal className="w-8 h-8 text-cyan-400" />, title: "3. Engineering", desc: "Rapid, agile development sprints with continuous integration." },
              { icon: <Zap className="w-8 h-8 text-yellow-400" />, title: "4. Scaling", desc: "Launch, monitor, and optimize for peak performance and growth." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-3xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {step.icon}
                </div>
                <div className="mb-6">{step.icon}</div>
                <h3 className="text-xl font-bold Outfit mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Form & Features Split */}
      <section className="py-24 pb-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left: Why Build With Us */}
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6 Outfit">Why Partner With Us?</h2>
              <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                We bring a startup mindset to enterprise engineering. We move fast, prioritize scalable architecture, and embed AI natively into your solutions.
              </p>

              <div className="space-y-8">
                {[
                  { icon: <Cpu className="w-6 h-6 text-purple-400" />, title: "AI-First Development", desc: "Native integration of LLMs, predictive analytics, and automated workflows." },
                  { icon: <Code className="w-6 h-6 text-blue-400" />, title: "Modern Tech Stack", desc: "React, Next.js, Node, Python, and robust cloud-native architecture." },
                  { icon: <Shield className="w-6 h-6 text-green-400" />, title: "Enterprise Security", desc: "Built-in compliance, data encryption, and robust access controls." },
                ].map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full glass flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold Outfit text-lg">{feature.title}</h4>
                      <p className="text-gray-400 mt-1">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:w-1/2">
              <div className="glass p-8 md:p-10 rounded-[32px] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                <h3 className="text-2xl font-bold mb-8 Outfit">Start Your Project</h3>
                
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                      <Zap className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold Outfit mb-2">Request Received</h4>
                    <p className="text-gray-400">Our engineering team will review your project details and get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-400">Name</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-400">Email</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-400">Company (Optional)</label>
                      <input
                        type="text"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white"
                        placeholder="Company Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-400">Estimated Budget</label>
                      <select 
                        name="budget"
                        required
                        value={formState.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#111] border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white appearance-none"
                      >
                        <option value="" disabled>Select a range</option>
                        <option value="10k-25k">$10k - $25k</option>
                        <option value="25k-50k">$25k - $50k</option>
                        <option value="50k-100k">$50k - $100k</option>
                        <option value="100k+">$100k+</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-400">Project Details</label>
                      <textarea
                        name="projectDetails"
                        required
                        value={formState.projectDetails}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 transition-colors text-white resize-none"
                        placeholder="Tell us about your technical requirements, goals, and timeline..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                      Submit Proposition <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Plans snippet */}
      <section className="py-24 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold Outfit mb-12">Looking for structured plans?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {PRICING_PLANS.map((plan, i) => (
                    <div key={i} className={`glass p-8 rounded-3xl ${plan.highlighted ? 'border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.15)] relative' : ''}`}>
                        {plan.highlighted && <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>}
                        <h3 className="text-2xl font-bold Outfit mb-2">{plan.name}</h3>
                        <p className="text-sm text-gray-400 mb-6">{plan.description}</p>
                        <div className="mb-8">
                            <span className="text-4xl font-black">{plan.price}</span>
                            {plan.period && <span className="text-gray-500 ml-2">/{plan.period}</span>}
                        </div>
                        <ul className="space-y-3 mb-8">
                            {plan.features.map((f, j) => (
                                <li key={j} className="flex items-center gap-3 text-sm text-gray-300">
                                    <Shield className="w-4 h-4 text-purple-400" /> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BuildWithUsPage;
