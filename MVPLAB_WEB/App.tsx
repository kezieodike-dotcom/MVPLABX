import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Menu,
  X,
  Shield,
  Zap,
  Globe,
  Plus,
  Minus,
  Monitor,
  Server,
  Github,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';
import {
  NAV_LINKS,
  PRODUCTS,
  FAQS,
  REVIEWS,
  BLOG_POSTS,
} from './constants';
import { supabase } from './src/utils/supabaseClient';
import { Navbar } from './src/components/layout/Navbar';
import { Footer } from './src/components/layout/Footer';
import FeaturesCards from './src/components/ui/feature-shader-cards';
import { TestimonialsColumn } from './src/components/ui/testimonials-columns-1';
import BlogsShowcase from './src/components/ui/blogs';
import { CTA } from './src/components/ui/call-to-action';
import { motion } from "framer-motion";

// --- Sub-components ---


const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="https://assets-global.website-files.com/658747171711643006830765/658747171711643006830795_hero-bg-compressor.mp4"
        ></video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-400 mb-8 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          New: Intelligent Automation Partner
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-[1.1] Outfit tracking-tight">
          From Idea to Launch <br />
          <span className="gradient-text">We Build Apps &amp; Websites</span> <br />
          That Work
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
          Leveraging cutting-edge AI and a decade of development expertise, we craft digital products that drive growth and deliver exceptional user experiences.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => navigate('/build-with-us')} className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            Build With Us <ArrowRight className="w-5 h-5" />
          </button>
          <button onClick={() => navigate('/ai-investment')} className="group px-8 py-4 bg-transparent text-white font-bold border border-white/20 rounded-full flex items-center gap-2 hover:bg-white/5 transition-colors">
            Invest With Us
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

const StatsBanner: React.FC<{ stats?: any[] }> = ({ stats = [] }) => {
  const defaultStats = [
    { label: 'Products Shipped', value: '12', suffix: '+' },
    { label: 'Value Generated', value: '5', prefix: '$', suffix: 'M+' },
    { label: 'Active Edge Users', value: '250', suffix: 'k+' },
    { label: 'API Uptime', value: '99.9', suffix: '%' }
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <section className="py-16 border-b border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mb-10">Trusted by visionaries at</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-xl font-bold font-mono text-white">NEURAL.</span>
          <span className="text-xl font-bold font-serif italic text-white">Vanguard AI</span>
          <span className="text-xl font-black tracking-tighter text-white">OXTN VCs</span>
          <span className="text-xl font-bold text-white">SYNTHESIS</span>
          <span className="text-xl font-bold tracking-widest text-white">AETHER</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/5 text-center">
          {displayStats.map((stat, i) => (
            <div key={i}>
              <h4 className="text-4xl font-bold text-white mb-2 Outfit">
                {stat.prefix}{stat.value}{stat.suffix}
              </h4>
              <p className="text-xs md:text-sm text-gray-500 uppercase font-bold tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const AppsShowcase: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section id="apps" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold Outfit">Products We've Built</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">We don't just build for clients — we build and operate our own AI-powered applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((app) => (
            <div
              key={app.id}
              onClick={() => navigate('/our-apps')}
              className="group relative glass rounded-[32px] hover:border-white/20 transition-all overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={app.image} alt={app.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <div className="p-2 bg-black/50 backdrop-blur-md rounded-lg inline-block">{app.icon}</div>
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold Outfit mb-2">{app.name}</h3>
                <p className="text-purple-400 text-sm font-bold mb-4 uppercase tracking-widest">{app.tagline}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {app.description}
                </p>
                <button className="flex items-center gap-2 text-white font-bold text-sm hover:gap-4 transition-all pointer-events-none">
                  Visit App <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button onClick={() => navigate('/our-apps')} className="px-10 py-4 glass rounded-full font-bold hover:bg-white/10 transition-colors">
            Explore All Our Products
          </button>
        </div>
      </div>
    </section>
  );
};

const Community: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section id="community" className="py-24 bg-gradient-to-b from-black to-purple-950/20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 Outfit">A Community That Builds <br /> and Scales Together</h2>
        <p className="text-gray-400 text-lg mb-12 max-w-3xl mx-auto">
          We operate a structured ecosystem that empowers developers, creators, students, and founders through referral-based incentives, growth campaigns, and AI mentorship pathways.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { label: 'Developers', val: '1.2k+' },
            { label: 'Creators', val: '400+' },
            { label: 'Students', val: '8.5k+' },
            { label: 'Founders', val: '50+' }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-3xl md:text-4xl font-bold text-white mb-2 Outfit">{stat.val}</p>
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

        <button onClick={() => navigate('/community')} className="px-12 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-all">
          Join Our Community
        </button>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  const firstColumn = REVIEWS.slice(0, 3);
  const secondColumn = REVIEWS.slice(3, 6);
  const thirdColumn = REVIEWS.slice(6, 9);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 text-white rounded-full text-xs font-bold mb-6 uppercase tracking-widest">
            Testimonials
          </div>

          <h2 className="text-4xl md:text-5xl font-bold Outfit">
            What Our Partners Say
          </h2>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            See what our customers, founders, and investors have to say about building with MVP Labs X.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] h-[600px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const navigate = useNavigate();

  return (
    <section id="faq" className="py-24 bg-black">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-bold uppercase tracking-[0.2em]">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 Outfit">Clear Answers. No Confusion.</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'border-purple-500/50' : 'hover:border-white/20'
                }`}
            >
              <button
                className="w-full px-8 py-6 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold text-lg Outfit">{faq.question}</span>
                <span className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-purple-400' : 'text-gray-500'}`}>
                  ▼
                </span>
              </button>
              <div
                className={`px-8 overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button onClick={() => navigate('/build-with-us')} className="group px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-all flex items-center gap-2 mx-auto">
            Got More Questions? Let's Talk
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};


// --- Main App Component ---

const App: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        const { data } = await supabase.from('platform_stats').select('*');
        if (data && data.length > 0) setStats(data);
      } catch (err) {
        console.error('Stats fetch failed:', err);
      }
    };
    fetchLiveStats();
  }, []);

  return (
    <div className="min-h-screen selection:bg-purple-500/30 text-white">
      <Navbar />
      <Hero />
      <StatsBanner stats={stats} />
      <FeaturesCards />

      {/* 10x Speed Highlight */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 bg-purple-600/10 text-purple-400 rounded-full text-xs font-bold mb-6 uppercase tracking-widest">Efficiency Benchmark</div>
          <h2 className="text-7xl md:text-[150px] font-black gradient-text Outfit leading-none mb-10">10<span className="text-4xl md:text-6xl align-middle font-bold">x</span> Faster</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-16">
            Our microservices architecture and proprietary AI frameworks cut repetitive tasks, reduce errors, and boost productivity to unprecedented levels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center gap-4">
              <Shield className="w-8 h-8 text-blue-400" />
              <h4 className="font-bold Outfit">Scalable Architecture</h4>
              <p className="text-sm text-gray-500 text-center">From small teams to enterprises, our system grows with you.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Zap className="w-8 h-8 text-yellow-400" />
              <h4 className="font-bold Outfit">Plug & Play Compatibility</h4>
              <p className="text-sm text-gray-500 text-center">Connect with existing platforms (CRM, ERP, Marketing Tools) in minutes.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Globe className="w-8 h-8 text-cyan-400" />
              <h4 className="font-bold Outfit">Cross-Platform Integration</h4>
              <p className="text-sm text-gray-500 text-center">Works across cloud, hybrid, and on-premise environments.</p>
            </div>
          </div>
        </div>
      </section>

      <AppsShowcase />
      <Community />
      <Testimonials />
      <BlogsShowcase />
      <FAQ />

      {/* Final CTA */}
      <CTA
        onPrimaryClick={() => navigate('/build-with-us')}
        onSecondaryClick={() => navigate('/ai-investment')}
        primaryLabel="Start Building Today"
        secondaryLabel="Invest With Us"
        title="Ready to Build or Invest?"
        description="Whether you want to fully own your next digital product or co-build an AI venture with others — we're ready."
        badgeLabel="Get started"
      />

      <Footer />
    </div>
  );
};

export default App;
