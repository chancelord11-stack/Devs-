import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, Project, Freelancer, MessageThread, Notification } from '../types';
import { FREELANCERS, MESSAGES as INITIAL_MESSAGES, PROJECTS as DEMO_PROJECTS } from '../constants';
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
  markNotificationRead: (id: string) => void;
  toggleFollowProject: (id: string) => void;
  updateUserProfile: (updates: Partial<User>) => void;
  loadingData: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: authUser } = useAuth();
  
  // We maintain a local user state that can be updated, initialized from AuthContext
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<MessageThread[]>(INITIAL_MESSAGES);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 'n1', type: 'info', message: 'Bienvenue sur Nexus AfriTech ! Complétez votre profil.', date: 'Il y a 1h', read: false },
  ]);
  const [loadingData, setLoadingData] = useState(true);

  // Sync with Auth User initially and on change
  useEffect(() => {
    setLocalUser(authUser);
  }, [authUser]);

  // Fetch Projects from Real Supabase DB
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Supabase fetch error (using demo data):', error.message || error);
          setProjects(DEMO_PROJECTS);
          setLoadingData(false);
          return;
        }

        if (data && data.length > 0) {
          const mappedProjects: Project[] = data.map((p: any) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            status: p.status || 'Ouvert',
            budget: { min: p.budget_min || 0, max: p.budget_max || 0 },
            date: new Date(p.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
            created_at: p.created_at,
            offers: p.offers_count || 0,
            views: p.views_count || 0,
            interactions: 0,
            skills: p.skills || [],
            clientId: p.client_id ? 'Client Vérifié' : '#Anonyme',
            isFollowed: false
          }));
          setProjects(mappedProjects);
        } else {
           setProjects(DEMO_PROJECTS);
        }
      } catch (err) {
        console.error("Unexpected error fetching projects, using demo data", err);
        setProjects(DEMO_PROJECTS);
      } finally {
        setLoadingData(false);
      }
    };

    fetchProjects();
  }, []);

  const addProject = async (newProjectData: Omit<Project, 'id' | 'offers' | 'views' | 'interactions' | 'date'>) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticProject: Project = {
      ...newProjectData,
      id: tempId,
      offers: 0,
      views: 0,
      interactions: 0,
      date: 'À l\'instant'
    };
    setProjects([optimisticProject, ...projects]);

    const isDemo = localStorage.getItem('lanceo_demo_session') === 'active';

    if (!isDemo) {
        const { error } = await supabase.from('projects').insert({
          title: newProjectData.title,
          description: newProjectData.description,
          budget_min: newProjectData.budget.min,
          budget_max: newProjectData.budget.max,
          skills: newProjectData.skills,
          status: 'Ouvert'
        });
        
        if (error) {
            console.error("Error inserting project:", error.message || error);
        }
    }
    
    const notif: Notification = {
      id: `n${Date.now()}`,
      type: 'success',
      message: `Votre projet "${newProjectData.title}" a été publié avec succès.`,
      date: 'À l\'instant',
      read: false
    };
    setNotifications([notif, ...notifications]);
  };

  const sendMessage = (threadId: string, text: string) => {
    setMessages(prev => prev.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          messages: [...thread.messages, { id: `msg${Date.now()}`, text, sender: 'me', timestamp: 'À l\'instant' }],
          lastMessageDate: 'À l\'instant'
        };
      }
      return thread;
    }));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const toggleFollowProject = (id: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, isFollowed: !p.isFollowed } : p));
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (localUser) {
        setLocalUser({ ...localUser, ...updates });
        // In a real app, you would send a PATCH request to Supabase here
    }
  };

  return (
    <DataContext.Provider value={{ 
      user: localUser, 
      projects, 
      freelancers: FREELANCERS, 
      messages, 
      notifications,
      addProject,
      sendMessage,
      markNotificationRead,
      toggleFollowProject,
      updateUserProfile,
      loadingData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};