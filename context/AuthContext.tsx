import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  session: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
  loginWithDemo: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Demo User Data
  const DEMO_USER: User = {
    id: 'demo-user-id',
    email: 'demo@developpeurs.com',
    name: 'Achbel Neri Sodjinou',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    type: 'freelance',
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind', 'Nouveau'],
    profileCompletion: 85,
    recommendations: 5,
    verifications: ['email', 'phone', 'identity'],
    achievements: 4,
    rank: 'Expert',
    rating: 4.9,
    projectsCount: 12,
    location: 'Paris, France',
    bio: "Développeur Fullstack passionné avec une expertise sur les architectures modernes."
  };

  useEffect(() => {
    // Check for existing Supabase session OR Demo session
    const initSession = async () => {
      // 1. Check Demo LocalStorage
      const demoSession = localStorage.getItem('lanceo_demo_session');
      if (demoSession === 'active') {
        setUser(DEMO_USER);
        setSession({ user: { id: 'demo' } });
        setLoading(false);
        return;
      }

      // 2. Check Real Supabase Session
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session?.user) {
        mapSupabaseUserToAppUser(session.user);
      } else {
        setLoading(false);
      }
    };

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      // Ignore Supabase updates if we are in demo mode
      if (localStorage.getItem('lanceo_demo_session') === 'active') return;

      setSession(session);
      if (session?.user) {
        mapSupabaseUserToAppUser(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const mapSupabaseUserToAppUser = (authUser: any) => {
     // Extract type from metadata, default to 'freelance' if missing
     const accountType = authUser.user_metadata?.type === 'client' ? 'client' : 'freelance';
     
     const appUser: User = {
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata?.name || authUser.email.split('@')[0],
        avatar: authUser.user_metadata?.avatar || `https://ui-avatars.com/api/?background=6366f1&color=fff&name=${authUser.user_metadata?.name || 'User'}`,
        type: accountType,
        skills: ['Nouveau'],
        profileCompletion: 15,
        recommendations: 0,
        verifications: ['email'],
        achievements: 0,
        rank: 'Nouveau',
        rating: 0,
        projectsCount: 0
     };
     setUser(appUser);
     setLoading(false);
  };

  const loginWithDemo = () => {
    localStorage.setItem('lanceo_demo_session', 'active');
    setUser(DEMO_USER);
    setSession({ user: { id: 'demo' } });
  };

  const signOut = async () => {
    if (localStorage.getItem('lanceo_demo_session')) {
        localStorage.removeItem('lanceo_demo_session');
    } else {
        await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut, loginWithDemo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};