import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Omnibox from './components/Omnibox';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Lazy Loading for Performance
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Projects = React.lazy(() => import('./pages/Projects'));
const ProjectDetails = React.lazy(() => import('./pages/ProjectDetails'));
const Freelancers = React.lazy(() => import('./pages/Freelancers'));
const FreelancerPublicProfile = React.lazy(() => import('./pages/FreelancerPublicProfile'));
const Messages = React.lazy(() => import('./pages/Messages'));
const MyProjects = React.lazy(() => import('./pages/MyProjects'));
const PublishProject = React.lazy(() => import('./pages/PublishProject'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Billing = React.lazy(() => import('./pages/Billing'));
const Help = React.lazy(() => import('./pages/Help'));
const Legal = React.lazy(() => import('./pages/Legal'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="min-h-screen flex flex-col font-sans text-nexus-text bg-nexus-bg bg-grid-pattern selection:bg-nexus-primary selection:text-white transition-colors duration-300">
    <div className="fixed inset-0 bg-gradient-radial from-nexus-primary/5 via-transparent to-transparent pointer-events-none z-0" />
    <Header />
    <Omnibox />
    <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
      <Suspense fallback={
        <div className="h-[50vh] flex items-center justify-center">
            <div className="relative">
                <div className="w-16 h-16 border-t-2 border-b-2 border-nexus-accent rounded-full animate-spin"></div>
            </div>
        </div>
      }>
        {children}
      </Suspense>
    </main>
    <Footer />
  </div>
);

const AppRoutes = () => {
    const { user } = useAuth();
    
    return (
        <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            
            {/* Projects */}
            <Route path="/projets" element={<ProtectedRoute><Layout><Projects /></Layout></ProtectedRoute>} />
            <Route path="/projets/:id" element={<ProtectedRoute><Layout><ProjectDetails /></Layout></ProtectedRoute>} />
            <Route path="/mes-projets" element={<ProtectedRoute><Layout><MyProjects /></Layout></ProtectedRoute>} />
            <Route path="/publish-project" element={<ProtectedRoute><Layout><PublishProject /></Layout></ProtectedRoute>} />
            
            {/* Freelancers */}
            <Route path="/prestataires" element={<ProtectedRoute><Layout><Freelancers /></Layout></ProtectedRoute>} />
            <Route path="/prestataires/:id" element={<ProtectedRoute><Layout><FreelancerPublicProfile /></Layout></ProtectedRoute>} />
            
            {/* User & System */}
            <Route path="/messages" element={<ProtectedRoute><Layout><Messages /></Layout></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Layout><Notifications /></Layout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute><Layout><Billing /></Layout></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><Layout><Help /></Layout></ProtectedRoute>} />
            
            {/* Legal Routes */}
            <Route path="/legal/*" element={<Layout><Legal /></Layout>} />
        </Routes>
    );
}

const App: React.FC = () => {
  return (
    <Router>
      <ToastProvider>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-nexus-bg">
              <div className="w-16 h-16 border-t-2 border-b-2 border-nexus-primary rounded-full animate-spin"></div>
          </div>
        }>
          <AppRoutes />
        </Suspense>
      </ToastProvider>
    </Router>
  );
};

export default App;