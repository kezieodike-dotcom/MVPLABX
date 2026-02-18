
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
import { Feature, Product, FAQItem } from './types';

export const NAV_LINKS = [
  { label: 'Platform', href: '#platform' },
  { label: 'Development', href: '#development' },
  { label: 'Investment', href: '#investment' },
  { label: 'Our Apps', href: '#apps' },
  { label: 'Community', href: '#community' },
];

export const ECOSYSTEM_FEATURES: Feature[] = [
  {
    title: 'Custom AI App Development',
    description: 'Bespoke AI solutions built with modern microservices architecture.',
    icon: <Cpu className="w-6 h-6 text-purple-500" />
  },
  {
    title: 'AI Product Incubation',
    description: 'Nurturing concepts from raw ideas to market-ready prototypes.',
    icon: <Rocket className="w-6 h-6 text-blue-500" />
  },
  {
    title: 'Structured AI Investment',
    description: 'Capital deployment into validated high-traction AI digital assets.',
    icon: <TrendingUp className="w-6 h-6 text-emerald-500" />
  },
  {
    title: 'Developer Ecosystem',
    description: 'A global network of talent building the next generation of tools.',
    icon: <Layers className="w-6 h-6 text-orange-500" />
  },
  {
    title: 'AI Education',
    description: 'Programs designed to upskill creators and students for the AI era.',
    icon: <GraduationCap className="w-6 h-6 text-pink-500" />
  },
  {
    title: 'Growth Systems',
    description: 'Community-driven marketing and user acquisition frameworks.',
    icon: <Users className="w-6 h-6 text-cyan-500" />
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'edutu',
    name: 'Edutu',
    tagline: 'Scholarship Discovery Platform',
    description: 'Helping students access funding and global academic opportunities with AI-driven matching.',
    icon: <Award className="w-12 h-12 text-purple-400" />
  },
  {
    id: 'lifeos',
    name: 'Your Life OS',
    tagline: 'Personal Productivity System',
    description: 'A goal-planning system designed to help individuals structure their vision and execution.',
    icon: <Globe className="w-12 h-12 text-blue-400" />
  },
  {
    id: 'certcenter',
    name: 'Certificate Center',
    tagline: 'Verification Platform',
    description: 'Digital verification and management for institutions and training organizations.',
    icon: <ShieldCheck className="w-12 h-12 text-emerald-400" />
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Why does my business need AI integration?",
    answer: "AI integration automates repetitive tasks, uncovers hidden data insights, and enables 24/7 customer engagement, allowing your team to focus on high-level strategic growth.",
    category: "General"
  },
  {
    question: "How long does a custom AI project take?",
    answer: "Typically, a full cycle from strategy to launch takes 8-16 weeks depending on complexity and integration requirements.",
    category: "Implementation"
  },
  {
    question: "Is AI investment safe for traditional investors?",
    answer: "We only open investment for products with validated user traction and transparent revenue models, providing a lower-risk entry into high-growth digital assets.",
    category: "Investment"
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, we provide ongoing operational management, performance optimization, and scaling support as part of our ecosystem model.",
    category: "General"
  }
];
