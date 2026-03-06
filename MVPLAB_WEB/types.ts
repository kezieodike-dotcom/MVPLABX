
// Fix: Added missing React import to provide the 'React' namespace for React.ReactNode types.
import React from 'react';

export interface NavItem {
  label: string;
  href: string;
  megamenu?: Array<{
    title: string;
    items: Array<{
      label: string;
      href: string;
      icon: React.ReactNode;
      description: string;
    }>;
  }>;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  href?: string;
  status?: string;
}

export interface Review {
  text: string;
  name: string;
  role: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  author: string;
  date: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}
