
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Community from './Community';
import { AuthProvider } from './src/context/AuthContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './src/pages/NotFoundPage';

import CommunityPage from './src/pages/CommunityPage';
import AIInvestmentPage from './src/pages/AIInvestmentPage';
import InvestmentReviewsPage from './src/pages/InvestmentReviewsPage';
import FeaturedPage from './src/pages/FeaturedPage';
import LoginPage from './src/pages/LoginPage';
import BuildWithUsPage from './src/pages/BuildWithUsPage';
import OurAppsPage from './src/pages/OurAppsPage';
import DevelopersPage from './src/pages/DevelopersPage';
import BlogsPage from './src/pages/BlogsPage';
import BlogPostPage from './src/pages/BlogPostPage';
import InvestorAuthPage from './src/pages/auth/InvestorAuthPage';
import InvestorDashboard from './src/pages/dashboards/InvestorDashboard';
import CreatorAuthPage from './src/pages/auth/CreatorAuthPage';
import DeveloperAuthPage from './src/pages/auth/DeveloperAuthPage';
import { ProtectedRoute } from './src/components/auth/ProtectedRoute';
import AdminDashboard from './src/pages/admin/AdminDashboard';
import ProductDetailPage from './src/pages/ProductDetailPage';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/ai-investment" element={<AIInvestmentPage />} />
          <Route path="/ai-investment/reviews" element={<InvestmentReviewsPage />} />
          <Route path="/featured" element={<FeaturedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/coming-soon" element={<NotFoundPage />} />
          <Route path="/build-with-us" element={<BuildWithUsPage />} />
          <Route path="/our-apps" element={<OurAppsPage />} />
          <Route path="/developers" element={<DevelopersPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogPostPage />} />
          <Route path="/auth/investor" element={<InvestorAuthPage />} />
          <Route path="/dashboards/investor" element={<InvestorDashboard />} />
          <Route path="/auth/creator" element={<CreatorAuthPage />} />
          <Route path="/auth/developer" element={<DeveloperAuthPage />} />
          <Route path="/ecosystem/:id" element={<ProductDetailPage />} />

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
