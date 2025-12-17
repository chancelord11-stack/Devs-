
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Project, Freelancer, MessageThread, Notification } from '../types';
import { MESSAGES as INITIAL_MESSAGES } from '../constants';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface DataContextType {
  user: User | null;
  projects: Project[];
  freelancers: Freelancer[];
  messages: MessageThread[];
  notifications: Notification[];
  addProject: (project: Omit<Project, 'id' | 'offers' | 'views' | 'interactions' | 'date'>) => Promise<void>;
  sendMessage: (threadId: string, text: string) => void;
  applyToProject: (project: Project, proposal: string) => void;
  markNotificationRead: (id: string) => void;
  toggleFollowProject: (id: string) => void;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  formatMoney: (amount: number) => string;
  loadingData: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: authUser, refreshUser } = useAuth();
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [messages, setMessages] = useState<MessageThread[]>(INITIAL_MESSAGES);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (authUser) setLocalUser(authUser);
  }, [authUser]);

  const fetchData = async () => {
    try {
      // Fetch Freelancers from DB
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .eq('type', 'freelance');

      if (profiles) {
        setFreelancers(profiles.map((p: any) => ({
          id: p.id,
          name: p.name || 'Anonyme',
          isAvailable: true,
          rating: p.rating || 5,
          reviewCount: p.reviews_count || 0,
          avatar: p.avatar_url || `https://ui-avatars.com/api/?name=${p.name}`,
          tagline: p.tagline || 'Freelance certifié',
          skills: p.skills || [],
          hourlyRate: p.hourly_rate || 0,
          projectsRealized: p.projects_count || 0,
          location: p.location || 'France',
          memberSince: new Date(p.created_at).getFullYear().toString(),
          responseTime: '1h',
          verifications: p.verified ? ['email', 'identity'] : ['email'],
          bio: p.bio
        })));
      }

      // Fetch Projects from DB
      const { data: dbProjects } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (dbProjects) {
        setProjects(dbProjects.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          status: p.status,
          budget: { min: p.budget_min, max: p.budget_max },
          date: new Date(p.created_at).toLocaleDateString(),
          offers: p.offers_count || 0,
          views: p.views_count || 0,
          interactions: 0,
          skills: p.skills || [],
          clientId: p.client_id || 'Client',
          isFollowed: false
        })));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();

    // REALTIME SUBSCRIPTION
    const channel = supabase.channel('db-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        fetchData();
        refreshUser();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        fetchData();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!authUser) return;
    const dbUpdates: any = {};
    if (updates.name) dbUpdates.name = updates.name;
    if (updates.bio) dbUpdates.bio = updates.bio;
    if (updates.avatar) dbUpdates.avatar_url = updates.avatar;
    if (updates.hourlyRate) dbUpdates.hourly_rate = updates.hourlyRate;
    if (updates.location) dbUpdates.location = updates.location;
    if (updates.tagline) dbUpdates.tagline = updates.tagline;
    if (updates.skills) dbUpdates.skills = updates.skills;

    const { error } = await supabase.from('profiles').update(dbUpdates).eq('id', authUser.id);
    if (error) throw error;
    refreshUser();
  };

  const addProject = async (proj: any) => {
    if (!authUser) return;
    await supabase.from('projects').insert({
      owner_id: authUser.id,
      title: proj.title,
      description: proj.description,
      budget_min: proj.budget.min,
      budget_max: proj.budget.max,
      skills: proj.skills,
      client_id: authUser.name
    });
  };

  // Mock methods (to be completed if needed)
  const sendMessage = () => {};
  const applyToProject = () => {};
  const markNotificationRead = () => {};
  const toggleFollowProject = () => {};

  return (
    <DataContext.Provider value={{ 
      user: localUser, projects, freelancers, messages, notifications,
      addProject, sendMessage, applyToProject, markNotificationRead,
      toggleFollowProject, updateUserProfile, formatMoney, loadingData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
