
// Fix: Added missing React import to provide the 'React' namespace for React.ReactNode types.
import React from 'react';

export interface NavItem {
  label: string;
  href: string;
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
  status?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
