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

  // Sync with Auth User
  useEffect(() => {
    if (authUser) {
        setLocalUser(authUser);
        if (notifications.length === 0) {
            setNotifications([{
                id: 'n_init',
                type: 'info',
                message: 'Bienvenue sur Nexus AfriTech ! Complétez votre profil.',
                date: "À l'instant",
                read: false
            }]);
        }
    }
  }, [authUser]);

  // Fetch Data (Projects & Freelancers)
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      
      try {
          // Fetch Freelancers from Supabase
          const { data: profiles, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('type', 'freelance')
            .order('updated_at', { ascending: false });

          if (profiles) {
              const mappedFreelancers: Freelancer[] = profiles.map((p: any) => ({
                  id: p.id,
                  name: p.name || 'Utilisateur',
                  isAvailable: true,
                  rating: 5.0, 
                  reviewCount: 0,
                  avatar: p.avatar_url || `https://ui-avatars.com/api/?name=${p.name || 'User'}&background=random`,
                  tagline: p.tagline || 'Nouveau talent',
                  skills: p.skills || [],
                  hourlyRate: p.hourly_rate || 0,
                  projectsRealized: 0,
                  location: p.location || 'Non renseigné',
                  memberSince: new Date(p.updated_at || Date.now()).toLocaleDateString(),
                  responseTime: '24h',
                  verifications: ['email'],
                  bio: p.bio
              }));
              setFreelancers(mappedFreelancers);
          }
      } catch (err) {
          console.error("Error fetching freelancers:", err);
      }

      setLoadingData(false);
    };

    fetchData();
  }, []);

  // Détection de la monnaie
  const formatMoney = (amount: number) => {
    if (!localUser?.location) return `${amount} €`;
    
    const cfaCountries = ['Benin', 'Bénin', 'Togo', 'Cote d\'Ivoire', 'Côte d\'Ivoire', 'Senegal', 'Sénégal', 'Mali', 'Burkina', 'Niger'];
    const userCountry = localUser.location;
    
    const isCFA = cfaCountries.some(c => userCountry.toLowerCase().includes(c.toLowerCase()));
    
    if (isCFA) {
        const cfaAmount = (amount * 655).toLocaleString('fr-FR');
        return `${cfaAmount} CFA`;
    }
    
    return `${amount} €`;
  };

  const addProject = async (newProjectData: Omit<Project, 'id' | 'offers' | 'views' | 'interactions' | 'date'>) => {
    const tempId = `p-${Date.now()}`;
    const optimisticProject: Project = {
      ...newProjectData,
      id: tempId,
      offers: 0,
      views: 0,
      interactions: 0,
      date: 'À l\'instant',
      clientId: localUser?.name || 'Moi'
    };
    setProjects([optimisticProject, ...projects]);

    const notif: Notification = {
      id: `n${Date.now()}`,
      type: 'success',
      message: `Votre projet "${newProjectData.title}" est en ligne.`,
      date: 'À l\'instant',
      read: false
    };
    setNotifications([notif, ...notifications]);
  };

  const applyToProject = (project: Project, proposal: string) => {
      const newThreadId = `t_${Date.now()}`;
      const newMessageThread: MessageThread = {
          id: newThreadId,
          correspondent: project.clientId,
          messages: [
              {
                  id: `m_${Date.now()}`,
                  text: `Nouvelle candidature pour : ${project.title}. \n\nMessage: ${proposal}`,
                  sender: 'me',
                  timestamp: "À l'instant"
              }
          ],
          unread: false,
          avatar: `https://ui-avatars.com/api/?name=${project.clientId}&background=random`,
          lastMessageDate: "À l'instant"
      };

      setMessages([newMessageThread, ...messages]);
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

  const updateUserProfile = async (updates: Partial<User>) => {
    if (localUser) {
        // 1. Mise à jour Optimiste (Interface immédiate)
        setLocalUser({ ...localUser, ...updates });
        
        // Check demo mode
        if (localUser.id === 'demo-user-id') {
            console.log("Mode démo : les données ne sont pas persistées en DB.");
            return;
        }

        // 2. Mise à jour Supabase (Persistence)
        try {
            const dbUpdates: any = {};
            if (updates.name) dbUpdates.name = updates.name;
            if (updates.bio) dbUpdates.bio = updates.bio;
            if (updates.tagline) dbUpdates.tagline = updates.tagline;
            if (updates.location) dbUpdates.location = updates.location;
            if (updates.hourlyRate !== undefined) dbUpdates.hourly_rate = updates.hourlyRate;
            if (updates.website !== undefined) dbUpdates.website = updates.website;
            if (updates.avatar) dbUpdates.avatar_url = updates.avatar;
            if (updates.skills) dbUpdates.skills = updates.skills;
            if (updates.github !== undefined) dbUpdates.github = updates.github;
            if (updates.linkedin !== undefined) dbUpdates.linkedin = updates.linkedin;
            
            dbUpdates.updated_at = new Date().toISOString();

            const { error } = await supabase
                .from('profiles')
                .update(dbUpdates)
                .eq('id', localUser.id);

            if (error) {
                console.error("Erreur lors de la sauvegarde Supabase:", error);
                throw error;
            }
            
            // 3. IMPORTANT : Forcer AuthContext à recharger les données fraîches depuis la DB
            await refreshUser();

        } catch (error) {
            console.error("Échec de la sauvegarde:", error);
            // Revert ici si nécessaire
        }
    }
  };

  return (
    <DataContext.Provider value={{ 
      user: localUser, 
      projects, 
      freelancers, 
      messages, 
      notifications,
      addProject,
      sendMessage,
      applyToProject,
      markNotificationRead,
      toggleFollowProject,
      updateUserProfile,
      formatMoney,
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