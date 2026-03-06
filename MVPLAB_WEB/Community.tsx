import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from './src/components/ui/hero-section';
import { Users, Zap, Globe, Trophy, Heart, MessageSquare, ArrowRight, Star } from 'lucide-react';

// Customer/partner logos for the hero section
const communityPartners = [
  { name: 'OpenAI', logo: 'https://html.tailus.io/blocks/customers/openai.svg' },
  { name: 'GitHub', logo: 'https://html.tailus.io/blocks/customers/github.svg' },
  { name: 'Nvidia', logo: 'https://html.tailus.io/blocks/customers/nvidia.svg' },
  { name: 'Nike', logo: 'https://html.tailus.io/blocks/customers/nike.svg' },
  { name: 'Laravel', logo: 'https://html.tailus.io/blocks/customers/laravel.svg' },
  { name: 'Lemon Squeezy', logo: 'https://html.tailus.io/blocks/customers/lemonsqueezy.svg' },
  { name: 'Column', logo: 'https://html.tailus.io/blocks/customers/column.svg' },
  { name: 'Lilly', logo: 'https://html.tailus.io/blocks/customers/lilly.svg' },
];

const Community: React.FC = () => {
  const navigate = useNavigate();

  const membershipTiers = [
    {
      name: 'Builder',
      price: 'Free',
      description: 'For developers just starting their journey',
      features: [
        'Access to community forums',
        'Monthly group calls',
        'Basic AI mentorship',
        'Resource library access',
        'Event invitations',
      ],
      cta: 'Join Free',
      highlighted: false,
    },
    {
      name: 'Founder',
      price: '$49',
      period: '/month',
      description: 'For serious builders scaling their ventures',
      features: [
        'Everything in Builder',
        '1-on-1 mentorship sessions',
        'Priority support',
        'Co-building opportunities',
        'Revenue share programs',
        'Early access to new products',
      ],
      cta: 'Become a Founder',
      highlighted: true,
    },
    {
      name: 'Partner',
      price: '$199',
      period: '/month',
      description: 'For established businesses and investors',
      features: [
        'Everything in Founder',
        'Direct line to our team',
        'Investment opportunities',
        'Co-marketing initiatives',
        'Custom integration support',
        'Quarterly strategy sessions',
      ],
      cta: 'Partner With Us',
      highlighted: false,
    },
  ];

  const communityStats = [
    { label: 'Active Members', value: '12,500+', icon: Users },
    { label: 'Projects Launched', value: '850+', icon: Zap },
    { label: 'Countries Represented', value: '65+', icon: Globe },
    { label: 'Success Stories', value: '200+', icon: Trophy },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'AI Startup Founder',
      content: 'MVPLABX community gave me the technical co-founder I needed. We just closed our seed round!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Solo Developer',
      content: 'The mentorship here is unmatched. Went from idea to $10k MRR in 4 months with their guidance.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 5,
    },
    {
      name: 'Elena Rodriguez',
      role: 'Product Manager',
      content: 'Found my first 100 beta users through the community. The network effect is real.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      rating: 5,
    },
  ];

  const programs = [
    {
      icon: MessageSquare,
      title: 'Peer Mentorship',
      description: 'Connect with experienced founders who have walked the path. Get guidance on technical decisions, go-to-market strategy, and scaling challenges.',
      color: 'purple',
    },
    {
      icon: Zap,
      title: 'Build Sprints',
      description: 'Join focused 2-week sprints where community members build together. Accountability, support, and celebration—every step of the way.',
      color: 'blue',
    },
    {
      icon: Heart,
      title: 'Support Network',
      description: 'Building is hard. Our community provides emotional support, celebration of wins, and help during challenging times.',
      color: 'pink',
    },
    {
      icon: Globe,
      title: 'Global Events',
      description: 'From virtual meetups to in-person conferences, connect with fellow builders worldwide. Share knowledge, find collaborators, and grow together.',
      color: 'cyan',
    },
  ];

  return (
    <div className="min-h-screen bg-black selection:bg-purple-500/30 text-white">
      {/* Hero Section */}
      <HeroSection
        badgeLabel="Join now"
        badgeHint="New: AI Mentorship Program Launched"
        title="A Community That Builds and Scales Together"
        description="Join 12,500+ developers, founders, and innovators building the future of AI. Get mentorship, find co-founders, and accelerate your journey from idea to exit."
        primaryLabel="Join Community"
        secondaryLabel="Explore Programs"
        primaryLink="/community/join"
        secondaryLink="#programs"
        appScreenshot="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=2700&h=1440&fit=crop"
        appScreenshotLight="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=2700&h=1440&fit=crop"
        customers={communityPartners}
        showCustomers={true}
      />

      {/* Stats Section */}
      <section className="py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                <p className="text-4xl md:text-5xl font-bold text-white mb-2 Outfit">{stat.value}</p>
                <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-bold uppercase tracking-[0.2em]">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 Outfit">Programs That Accelerate Your Growth</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              From mentorship to build sprints, we provide the support system you need to turn your vision into reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group glass rounded-3xl p-8 hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-${program.color}-500/10 flex items-center justify-center border border-${program.color}-500/20 mb-6 group-hover:scale-110 transition-transform`}>
                  <program.icon className={`w-7 h-7 text-${program.color}-400`} />
                </div>
                <h3 className="text-2xl font-bold Outfit mb-4">{program.title}</h3>
                <p className="text-gray-400 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-bold uppercase tracking-[0.2em]">Success Stories</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 Outfit">What Our Members Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="glass rounded-3xl p-8 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section id="membership" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-purple-400 text-sm font-bold uppercase tracking-[0.2em]">Membership</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 Outfit">Choose Your Path</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              From free access to premium partnerships—find the level that fits your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {membershipTiers.map((tier, index) => (
              <div
                key={index}
                className={`relative rounded-3xl p-8 flex flex-col transition-all ${
                  tier.highlighted
                    ? 'bg-purple-600 shadow-2xl shadow-purple-900/50 scale-105'
                    : 'glass hover:border-white/20'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs font-bold rounded-full uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="font-bold text-xl Outfit mb-1 text-white">{tier.name}</h3>
                  <p className={`text-sm mb-6 ${tier.highlighted ? 'text-purple-200' : 'text-gray-500'}`}>
                    {tier.description}
                  </p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-black Outfit text-white">{tier.price}</span>
                    {tier.period && (
                      <span className={`text-sm mb-1 ${tier.highlighted ? 'text-purple-200' : 'text-gray-500'}`}>
                        {tier.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((feature, j) => (
                    <li
                      key={j}
                      className={`flex items-start gap-3 text-sm ${
                        tier.highlighted ? 'text-purple-100' : 'text-gray-400'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5 ${
                          tier.highlighted
                            ? 'bg-white/20 text-white'
                            : 'bg-purple-600/20 text-purple-400'
                        }`}
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate('/coming-soon')}
                  className={`w-full py-4 rounded-full font-bold text-sm transition-all hover:scale-105 ${
                    tier.highlighted
                      ? 'bg-white text-purple-700 hover:bg-gray-100'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="py-24 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 Outfit">
            Ready to Join the Movement?
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you're building your first product or scaling your tenth venture, 
            our community provides the support, connections, and resources you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/coming-soon')}
              className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-all flex items-center gap-2"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/coming-soon')}
              className="px-10 py-4 glass rounded-full font-bold hover:bg-white/10 transition-all"
            >
              Talk to Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
