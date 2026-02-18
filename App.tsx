
import React, { useState, useEffect } from 'react';
// Fix: Added missing TrendingUp and Globe imports from lucide-react.
import { 
  ArrowRight, 
  ChevronDown, 
  Menu, 
  X, 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram,
  Monitor,
  Zap,
  Server,
  Shield,
  Activity,
  Plus,
  Minus,
  TrendingUp,
  Globe
} from 'lucide-react';
import { 
  NAV_LINKS, 
  ECOSYSTEM_FEATURES, 
  PRODUCTS, 
  FAQS 
} from './constants';

// --- Sub-components ---

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">M</div>
          <span className="font-bold text-xl tracking-tight Outfit">MoonRow</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
          <button className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-all">
            Start Project
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[70px] bg-black/95 backdrop-blur-xl p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium border-b border-white/10 pb-4">
              {link.label}
            </a>
          ))}
          <button className="w-full py-4 bg-white text-black font-bold rounded-xl mt-4">
            Start Project
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Orbital Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] orbit-path opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] orbit-path opacity-40 border-dashed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] orbit-path opacity-60"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-purple-400 mb-8 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          New: Intelligent Automation Partner
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] Outfit">
          We Build Scalable <br />
          <span className="gradient-text">AI Applications</span> <br />
          for Forward-Thinking Businesses
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          From concept to launch, we design, develop, and scale AI-powered systems that solve real problems and drive measurable growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform">
            Start Your AI Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-transparent text-white font-bold border border-white/20 rounded-full hover:bg-white/5 transition-colors">
            Book a Strategy Call
          </button>
        </div>

        {/* Partners Scroller Mockup */}
        <div className="mt-24 pt-10 border-t border-white/5 opacity-50">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-8 font-semibold">Trusted by Innovative Teams Globally</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center grayscale">
            {['Purina', 'Fusion', 'Cigna', 'ASCC', 'Allianz'].map(name => (
              <span key={name} className="text-xl font-bold tracking-tighter Outfit text-gray-400">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Ecosystem: React.FC = () => {
  return (
    <section id="platform" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-12 h-1 px-1 bg-purple-600 mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 Outfit">More Than a Development Studio</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              While our core focus is building AI applications for clients, we operate a broader AI venture ecosystem designed to support founders, investors, developers, and digital creators.
            </p>
            <p className="text-gray-400 text-lg mb-10">
              This integrated model allows us to not only build products — but help them scale, attract users, and unlock capital opportunities.
            </p>
            <button className="px-8 py-4 glass rounded-full font-bold hover:bg-white/10 transition-colors">
              Learn More About Our Platform
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ECOSYSTEM_FEATURES.map((feature, i) => (
              <div key={i} className="glass p-6 rounded-2xl hover:border-purple-500/50 transition-all group">
                <div className="mb-4 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 Outfit">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Development: React.FC = () => {
  const services = [
    { title: 'AI-powered SaaS', icon: <Monitor className="w-5 h-5" /> },
    { title: 'Intelligent Automation', icon: <Zap className="w-5 h-5" /> },
    { title: 'Intelligence Dashboards', icon: <Activity className="w-5 h-5" /> },
    { title: 'Enterprise AI Tools', icon: <Server className="w-5 h-5" /> },
  ];

  return (
    <section id="development" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-bold uppercase tracking-[0.2em]">Our Focus</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 Outfit">Custom AI Solutions Built to Scale</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, i) => (
            <div key={i} className="bg-gradient-to-b from-white/5 to-transparent p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400 mb-6">
                {service.icon}
              </div>
              <h3 className="font-bold text-xl Outfit">{service.title}</h3>
            </div>
          ))}
        </div>

        <div className="glass rounded-[40px] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-900/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 Outfit">Full Lifecycle Management</h3>
              <div className="space-y-6">
                {['Strategy', 'Architecture', 'Development', 'Launch', 'Optimization', 'Scaling'].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                      {i + 1}
                    </span>
                    <span className="text-lg font-medium text-gray-300">{step}</span>
                  </div>
                ))}
              </div>
              <button className="mt-10 px-8 py-4 bg-purple-600 rounded-full font-bold hover:bg-purple-700 transition-colors">
                Discuss Your AI Project
              </button>
            </div>
            
            <div className="bg-black/40 rounded-3xl p-6 border border-white/10 shadow-2xl">
               <pre className="text-xs md:text-sm font-mono text-purple-300 leading-relaxed overflow-x-auto">
{`async function generateResponse(prompt) {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${API_KEY}\`
    },
    body: JSON.stringify({
      model: 'gemini-3-pro-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: { temperature: 0.7 }
    })
  });
  
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}`}
               </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Investment: React.FC = () => {
  return (
    <section id="investment" className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
            <div className="glass p-8 rounded-3xl relative z-10">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-gray-400 text-sm mb-1 uppercase tracking-widest font-bold">Portfolio Performance</p>
                  <h4 className="text-4xl font-bold Outfit text-emerald-400">+124.8%</h4>
                </div>
                <div className="text-right">
                   <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full">LIVE TRACTION</div>
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: 'Edutu', roi: '14.2%', users: '12k+' },
                  { name: 'Your Life OS', roi: '32.1%', users: '45k+' },
                  { name: 'Certificate Center', roi: '8.4%', users: '5k+' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                    <div>
                      <p className="font-bold Outfit">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.users} Active Users</p>
                    </div>
                    <div className="text-emerald-400 font-bold">+{item.roi}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-emerald-400 text-sm font-bold uppercase tracking-[0.2em]">Validated Assets</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 Outfit">Invest in Validated AI Products</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We scale selected AI applications to measurable user traction before opening structured investment participation. Our model ensures transparency and growth.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-gray-300">
                <Shield className="w-5 h-5 text-emerald-500" />
                Real traction before listing
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Activity className="w-5 h-5 text-emerald-500" />
                Real-time performance visibility
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Revenue-backed digital assets
              </li>
            </ul>
            <button className="px-8 py-4 bg-emerald-600 rounded-full font-bold hover:bg-emerald-700 transition-colors">
              Explore Investment Opportunities
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const AppsShowcase: React.FC = () => {
  return (
    <section id="apps" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold Outfit">Products We've Built</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">We don't just build for clients — we build and operate our own AI-powered applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((app) => (
            <div key={app.id} className="group relative glass p-8 rounded-[32px] hover:border-white/20 transition-all overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors"></div>
              <div className="relative z-10">
                <div className="mb-8">{app.icon}</div>
                <h3 className="text-2xl font-bold Outfit mb-2">{app.name}</h3>
                <p className="text-purple-400 text-sm font-bold mb-4 uppercase tracking-widest">{app.tagline}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {app.description}
                </p>
                <button className="flex items-center gap-2 text-white font-bold text-sm hover:gap-4 transition-all">
                  Visit App <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {/* Coming Soon card */}
          <div className="glass p-8 rounded-[32px] border-dashed border-white/20 flex flex-col items-center justify-center text-center group">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-500 mb-2 Outfit">New Project</h3>
            <p className="text-sm text-gray-600">Currently in development. Coming soon to the ecosystem.</p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <button className="px-10 py-4 glass rounded-full font-bold hover:bg-white/10 transition-colors">
            Explore All Our Products
          </button>
        </div>
      </div>
    </section>
  );
};

const Community: React.FC = () => {
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

        <button className="px-12 py-5 bg-white text-black font-bold rounded-full hover:scale-105 transition-all">
          Join Our Community
        </button>
      </div>
    </section>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold Outfit">Got Questions? <br /> We've Got Answers</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden">
              <button 
                className="w-full p-6 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-bold md:text-lg Outfit">{faq.question}</span>
                {openIndex === i ? <Minus className="text-purple-400" /> : <Plus />}
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-gray-400 leading-relaxed animate-in slide-in-from-top-4 duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="pt-24 pb-10 bg-[#030303] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">M</div>
              <span className="font-bold text-2xl tracking-tight Outfit">MoonRow</span>
            </div>
            <p className="text-gray-500 max-w-xs mb-8">
              Empowering forward-thinking businesses through intelligent automation and validated AI digital assets.
            </p>
            <div className="flex gap-4">
              <Github className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 Outfit">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-white transition-colors cursor-pointer">AI Development</li>
              <li className="hover:text-white transition-colors cursor-pointer">Platform Overview</li>
              <li className="hover:text-white transition-colors cursor-pointer">Investment</li>
              <li className="hover:text-white transition-colors cursor-pointer">Security</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 Outfit">Ecosystem</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-white transition-colors cursor-pointer">Our Apps</li>
              <li className="hover:text-white transition-colors cursor-pointer">Community</li>
              <li className="hover:text-white transition-colors cursor-pointer">Developers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 Outfit">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-white transition-colors cursor-pointer">FAQs</li>
              <li className="hover:text-white transition-colors cursor-pointer">API Access</li>
              <li className="hover:text-white transition-colors cursor-pointer">Documentation</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 Outfit">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-white transition-colors cursor-pointer">Compliance</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 text-xs text-gray-600">
          <p>© 2025 MoonRow Inc. All trademarks are property of their respective owners.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Intellectual Property Rights</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-purple-500/30">
      <Navbar />
      <Hero />
      <Ecosystem />
      <Development />
      
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

      <Investment />
      <AppsShowcase />
      <Community />
      <FAQ />

      {/* Final CTA */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-purple-600/10 blur-[150px]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 Outfit">Ready to Build Your <br /> AI Application?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="px-10 py-5 bg-white text-black font-bold rounded-full text-lg hover:scale-105 transition-all">
              Start Your AI Project
            </button>
            <button className="px-10 py-5 bg-transparent text-white border border-white/20 font-bold rounded-full text-lg hover:bg-white/5 transition-all">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;
