import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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

// Animation Variants for "Pro" feel
const pageVariants = {
  initial: { opacity: 0, y: 15, scale: 0.99 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -15, scale: 0.99 }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.4
};

const AnimatedLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const location = useLocation();
    
    return (
        <div className="min-h-screen flex flex-col font-sans text-nexus-text bg-nexus-bg bg-grid-pattern selection:bg-nexus-primary selection:text-white transition-colors duration-300">
            <div className="fixed inset-0 bg-gradient-radial from-nexus-primary/5 via-transparent to-transparent pointer-events-none z-0" />
            <Header />
            <Omnibox />
            <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                        className="w-full h-full"
                    >
                        <Suspense fallback={
                            <div className="h-[50vh] flex items-center justify-center">
                                <div className="relative">
                                    <div className="w-16 h-16 border-t-2 border-b-2 border-nexus-accent rounded-full animate-spin"></div>
                                </div>
                            </div>
                        }>
                            {children}
                        </Suspense>
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};

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
            <Route path="/dashboard" element={<ProtectedRoute><AnimatedLayout><Dashboard /></AnimatedLayout></ProtectedRoute>} />
            
            {/* Projects */}
            <Route path="/projets" element={<ProtectedRoute><AnimatedLayout><Projects /></AnimatedLayout></ProtectedRoute>} />
            <Route path="/projets/:id" element={<ProtectedRoute><AnimatedLayout><ProjectDetails /></AnimatedLayout></ProtectedRoute>} />
            <Route path="/mes-projets" element={<ProtectedRoute><AnimatedLayout><MyProjects /></AnimatedLayout></ProtectedRoute>} />
            <Route path="/publish-project" element={<ProtectedRoute><AnimatedLayout><PublishProject /></AnimatedLayout></ProtectedRoute>} />
            
            {/* Freelancers */}
            <Route path="/prestataires" element={<ProtectedRoute><AnimatedLayout><Freelancers /></AnimatedLayout></ProtectedRoute>} />
            <Route path="/prestataires/:id" element={<ProtectedRoute><AnimatedLayout><FreelancerPublicProfile /></AnimatedLayout></ProtectedRoute>} />
            
            {/* User & System */}
            <Route path="/messages" element={<ProtectedRoute><AnimatedLayout><Messages /></AnimatedLayout></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><AnimatedLayout><Notifications /></AnimatedLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><AnimatedLayout><Profile /></AnimatedLayout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><AnimatedLayout><Settings /></AnimatedLayout></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute><AnimatedLayout><Billing /></AnimatedLayout></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute><AnimatedLayout><Help /></AnimatedLayout></ProtectedRoute>} />
            
            {/* Legal Routes */}
            <Route path="/legal/*" element={<AnimatedLayout><Legal /></AnimatedLayout>} />
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