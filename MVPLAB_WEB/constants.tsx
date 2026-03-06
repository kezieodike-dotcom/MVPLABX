
import React from 'react';
import {
  Rocket,
  Cpu,
  Layers,
  ShieldCheck,
  TrendingUp,
  Users,
  GraduationCap,
  Briefcase,
  Globe,
  Award
} from 'lucide-react';
import { Feature, Product, FAQItem, BlogPost, PricingPlan, Review } from './types';

export const NAV_LINKS = [
  {
    label: 'Platform',
    href: '/featured',
    megamenu: [
      {
        title: 'Core Features',
        items: [
          { label: 'AI Investment', href: '/ai-investment', icon: <TrendingUp className="w-5 h-5 text-purple-400" />, description: 'Revenue-backed AI assets with verified yield.' },
          { label: 'Featured Ecosystem', href: '/featured', icon: <Cpu className="w-5 h-5 text-blue-400" />, description: 'Overview of our core platform capabilities.' },
        ]
      },
      {
        title: 'Development',
        items: [
          { label: 'Build With Us', href: '/build-with-us', icon: <Rocket className="w-5 h-5 text-cyan-400" />, description: 'Zero-to-one development for visionaries.' },
          { label: 'Developers', href: '/developers', icon: <Users className="w-5 h-5 text-yellow-400" />, description: 'Talent marketplace for the AI era.' },
        ]
      }
    ]
  },
  {
    label: 'Solutions',
    href: '/our-apps',
    megamenu: [
      {
        title: 'Our Products',
        items: [
          { label: 'Validated Assets', href: '/ai-investment', icon: <ShieldCheck className="w-5 h-5 text-green-400" />, description: 'Explore our revenue-generating software.' },
          { label: 'Apps Showcase', href: '/our-apps', icon: <Layers className="w-5 h-5 text-orange-400" />, description: 'Curated gallery of high-traction applications.' },
        ]
      }
    ]
  },
  { label: 'Community', href: '/community' },
  { label: 'Insights', href: '/blogs' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'edutu',
    name: 'Edutu',
    tagline: 'Scholarship Discovery Platform',
    description: 'Helping students access funding and global academic opportunities with AI-driven matching.',
    icon: <Award className="w-12 h-12 text-purple-400" />,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2940&auto=format&fit=crop',
    href: '#'
  },
  {
    id: 'lifeos',
    name: 'Your Life OS',
    tagline: 'Personal Productivity System',
    description: 'A goal-planning system designed to help individuals structure their vision and execution.',
    icon: <Globe className="w-12 h-12 text-blue-400" />,
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2855&auto=format&fit=crop',
    href: '#'
  },
  {
    id: 'certcenter',
    name: 'Certificate Center',
    tagline: 'Verification Platform',
    description: 'Digital verification and management for institutions and training organizations.',
    icon: <ShieldCheck className="w-12 h-12 text-emerald-400" />,
    image: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=2940&auto=format&fit=crop',
    href: '#'
  }
];

export const REVIEWS: Review[] = [
  {
    text: "MVP Labs didn’t just build our app — they structured it for scale. The AI integration was seamless and outperformed our expectations.",
    name: "Sarah Chen",
    role: "CEO, TechFlow",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    text: "Professional team, strong architecture, and clear communication from start to finish. They are our go-to partner for AI dev.",
    name: "Marcus Thorne",
    role: "Founder, E-com solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    text: "They think long-term. That’s rare in this industry. Our platform is robust and highly scalable thanks to their vision.",
    name: "Elena Rodriguez",
    role: "VP Product, SaaS Enterprise",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    text: "The co-build model is a game changer. We shared the risk and the rewards. Truly a collaborative partnership.",
    name: "David Park",
    role: "Managing Director, DP Investments",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    text: "Expertise in AI is evident in every line of code. They helped us implement complex LLM workflows in record time.",
    name: "Jessica Wu",
    role: "CTO, AI Innovations",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    text: "A highly disciplined team that delivers on time. Their microservices approach saved us months of development.",
    name: "James Wilson",
    role: "Engineering Lead, FinTech Group",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    text: "From whiteboard to production in 8 weeks. The speed and quality of execution are unmatched in the agency world.",
    name: "Lisa Maria",
    role: "Founding Partner, Green Ventures",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    text: "Their community driven approach and developer network are world-class. Joining was the best decision for our growth.",
    name: "Arthur Penhaligon",
    role: "Growth Head, Community Hub",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    text: "Scalable architecture that actually lives up to the name. We handled a 10x traffic spike without a single hiccup.",
    name: "Nora Smith",
    role: "Operations Manager, ScaleAI",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&h=256&auto=format&fit=crop"
  }
];

export const INVESTMENT_REVIEWS: Review[] = [
  {
    text: "Investing with MVP LAB X was the best move for our portfolio. Their AI-vetted assets are high-performance and reliable.",
    name: "Robert K. Vance",
    role: "Equity Partner",
    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    text: "The transparency in their co-build model is refreshing. We see the growth metrics in real-time.",
    name: "Michael Sterling",
    role: "Angel Investor",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    text: "A truly scalable approach to AI venture building. The ROI has been consistent and impressive.",
    name: "Sarah Jenkins",
    role: "Managing Director, SV Labs",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    text: "They handle the technical complexity so we can focus on strategic capital allocation. Highly recommended.",
    name: "Avery Chen",
    role: "Venture Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    text: "The speed at which they validate and scale AI products is unmatched. A powerhouse in the AI space.",
    name: "Julian Brooks",
    role: "Tech Investor",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=256&h=256&auto=format&fit=crop"
  },
  {
    text: "MVP LAB X is redefining how AI assets are built and owned. This is the future of venture capital.",
    name: "Natalie Portis",
    role: "Portfolio Manager",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&h=256&auto=format&fit=crop"
  }
];


export const FAQS: FAQItem[] = [
  {
    question: "Do I own my product if I hire MVP Labs?",
    answer: "Yes. If you choose the “Build With Us” path, you retain full ownership from day one.",
    category: "General"
  },
  {
    question: "How is the investment model different?",
    answer: "In the co-build model, multiple participants jointly fund a product. MVP Labs manages development and scaling, and ownership is structured accordingly.",
    category: "Investment"
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes. We offer post-launch optimization, scaling support, and long-term product management.",
    category: "Support"
  },
  {
    question: "Can I invest without technical knowledge?",
    answer: "Yes. We handle all technical development and operational execution.",
    category: "Investment"
  },
  {
    question: "Do you build only AI products?",
    answer: "We specialize in AI-powered systems but also build scalable web and mobile applications.",
    category: "General"
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    category: 'AI Development',
    title: 'How to Ship Your MVP in 8 Weeks Using AI-First Architecture',
    excerpt: 'A step-by-step breakdown of how we take an idea from whiteboard to production-ready app in under two months.',
    readTime: '6 min read',
    author: 'MVPLABX Team',
    date: 'Feb 2026',
  },
  {
    id: 'blog-2',
    category: 'Investment',
    title: 'Why AI Digital Assets Are the Next Frontier for Smart Investors',
    excerpt: 'Exploring how validated AI products with real user traction are opening new doors for structured investment opportunities.',
    readTime: '5 min read',
    author: 'MVPLABX Team',
    date: 'Jan 2026',
  },
  {
    id: 'blog-3',
    category: 'Ecosystem',
    title: 'Building a Developer Ecosystem That Actually Pays Developers',
    excerpt: 'How referral-based incentives and shared revenue models are reshaping how communities grow and sustain themselves.',
    readTime: '4 min read',
    author: 'MVPLABX Team',
    date: 'Jan 2026',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$2,999',
    period: 'project',
    description: 'Perfect for founders who need a polished MVP fast.',
    features: [
      'Up to 5 core features',
      'React / Next.js frontend',
      'REST API + database',
      '2 weeks delivery',
      '1 month post-launch support',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$7,999',
    period: 'project',
    description: 'Full-stack AI application with advanced integrations.',
    features: [
      'Unlimited features',
      'AI/LLM integration',
      'Custom admin dashboard',
      'Auth, payments & notifications',
      '3 months post-launch support',
      'Priority Slack support',
    ],
    cta: 'Start Building',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For businesses that need scale, security, and full ownership.',
    features: [
      'Multi-tenant architecture',
      'Dedicated dev team',
      'CI/CD & DevOps setup',
      'Compliance & security audit',
      '12 months support retainer',
      'Investment pathway access',
    ],
    cta: 'Contact Us',
    highlighted: false,
  },
];
