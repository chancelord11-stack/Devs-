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

  // Chargement initial des données + Realtime Subscription
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      try {
          // 1. Fetch Freelancers (Profiles)
          const { data: profiles } = await supabase
            .from('profiles')
            .select('*')
            .eq('type', 'freelance')
            .order('updated_at', { ascending: false });

          if (profiles) {
              const mappedFreelancers: Freelancer[] = profiles.map((p: any) => ({
                  id: p.id,
                  name: p.name || 'Utilisateur',
                  isAvailable: true, // Pourrait être une colonne en DB
                  rating: Number(p.rating) || 5.0, 
                  reviewCount: p.reviews_count || 0,
                  avatar: p.avatar_url || `https://ui-avatars.com/api/?name=${p.name || 'User'}&background=random`,
                  tagline: p.tagline || 'Nouveau talent',
                  skills: p.skills || [],
                  hourlyRate: p.hourly_rate || 0,
                  projectsRealized: p.projects_count || 0,
                  location: p.location || 'Non renseigné',
                  memberSince: new Date(p.created_at).getFullYear().toString(),
                  responseTime: '4h',
                  verifications: ['email', p.verified ? 'identity' : null].filter(Boolean) as string[],
                  bio: p.bio
              }));
              setFreelancers(mappedFreelancers);
          }

          // 2. Fetch Projects
          const { data: dbProjects } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
          
          if (dbProjects) {
              const mappedProjects: Project[] = dbProjects.map((p: any) => ({
                  id: p.id,
                  title: p.title,
                  description: p.description,
                  status: p.status,
                  budget: { min: p.budget_min, max: p.budget_max },
                  date: new Date(p.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
                  created_at: p.created_at,
                  offers: p.offers_count,
                  views: p.views_count,
                  interactions: 0,
                  skills: p.skills || [],
                  clientId: p.client_id || 'Client Vérifié',
                  isFollowed: false
              }));
              setProjects(mappedProjects);
          }

      } catch (err) {
          console.error("Error fetching data:", err);
      }
      setLoadingData(false);
    };

    fetchData();

    // --- SETUP REALTIME SUBSCRIPTION ---
    // Cela permet au site de se mettre à jour sans recharger la page
    const channel = supabase.channel('public:db_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        (payload) => {
          console.log('Realtime update projects:', payload);
          fetchData(); // Recharger les données proprement
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        (payload) => {
           console.log('Realtime update profiles:', payload);
           fetchData();
           // Si c'est mon profil qui a changé, mettre à jour le contexte Auth
           if (authUser && payload.new && (payload.new as any).id === authUser.id) {
              refreshUser(); 
           }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authUser, refreshUser]);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
  };

  const addProject = async (newProject: Omit<Project, 'id' | 'offers' | 'views' | 'interactions' | 'date'>) => {
    if (!authUser) return;

    // Insertion directe en base de données
    const { error } = await supabase.from('projects').insert({
        owner_id: authUser.id,
        title: newProject.title,
        description: newProject.description,
        budget_min: newProject.budget.min,
        budget_max: newProject.budget.max,
        skills: newProject.skills,
        client_id: newProject.clientId,
        status: 'Ouvert'
    });

    if (error) {
        console.error("Erreur création projet:", error);
        throw error;
    }
    // Le Realtime mettra à jour la liste automatiquement
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!localUser) return;
    
    // Mapping des champs App -> DB
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.tagline !== undefined) dbUpdates.tagline = updates.tagline;
    if (updates.location !== undefined) dbUpdates.location = updates.location;
    if (updates.hourlyRate !== undefined) dbUpdates.hourly_rate = updates.hourlyRate;
    if (updates.bio !== undefined) dbUpdates.bio = updates.bio;
    if (updates.skills !== undefined) dbUpdates.skills = updates.skills;
    if (updates.website !== undefined) dbUpdates.website = updates.website;
    if (updates.github !== undefined) dbUpdates.github = updates.github;
    if (updates.linkedin !== undefined) dbUpdates.linkedin = updates.linkedin;
    if (updates.avatar !== undefined) dbUpdates.avatar_url = updates.avatar;

    dbUpdates.updated_at = new Date().toISOString();

    const { error } = await supabase
        .from('profiles')
        .update(dbUpdates)
        .eq('id', localUser.id);

    if (error) {
        console.error("Erreur mise à jour profil:", error);
    } else {
        // Optimistic update
        setLocalUser({ ...localUser, ...updates });
        refreshUser();
    }
  };

  const toggleFollowProject = (id: string) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, isFollowed: !p.isFollowed } : p
    ));
  };

  const applyToProject = async (project: Project, proposalContent: string) => {
    if (!authUser) return;

    // Insertion en base
    const { error } = await supabase.from('proposals').insert({
        project_id: project.id,
        freelancer_id: authUser.id,
        content: proposalContent,
        price: project.budget.max, // Valeur par défaut
        status: 'pending'
    });

    if (error) console.error("Erreur candidature:", error);

    // Incrémenter le compteur d'offres localement (optimistic)
    setProjects(prev => prev.map(p => 
        p.id === project.id ? { ...p, offers: p.offers + 1 } : p
    ));
  };

  const sendMessage = (threadId: string, text: string) => {
    setMessages(prev => prev.map(t => 
      t.id === threadId ? {
        ...t,
        messages: [...t.messages, {
          id: Date.now().toString(),
          text,
          sender: 'me',
          timestamp: 'À l\'instant'
        }],
        lastMessageDate: 'À l\'instant'
      } : t
    ));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
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