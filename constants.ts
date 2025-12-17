import { User, Project, Freelancer, MessageThread } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  email: 'utilisateur@nexus.com',
  name: 'Utilisateur Nexus',
  type: 'freelance',
  credits: 0,
  rank: 'Nouveau',
  profileCompletion: 20,
  avatar: '',
  recommendations: 0,
  verifications: ['email'],
  achievements: 0,
  skills: [],
  bio: "",
  location: ''
};

// Initialisation vide
export const PROJECTS: Project[] = [];

// Initialisation vide
export const MESSAGES: MessageThread[] = [];

// Initialisation vide - Les données viendront de Supabase (table profiles)
export const FREELANCERS: Freelancer[] = [];

export const CATEGORIES = [
  { name: 'Mobile Money & FinTech', count: 150 },
  { name: 'AgriTech & Solutions Rurales', count: 85 },
  { name: 'Développement Web & PWA', count: 230 },
  { name: 'Data Science & IA Africaine', count: 45 },
  { name: 'Cybersécurité', count: 32 },
  { name: 'E-commerce & Logistique', count: 95 },
  { name: 'Éducation & EdTech', count: 60 },
  { name: 'Santé & e-Health', count: 40 },
  { name: 'Énergie & GreenTech', count: 25 },
  { name: 'Gouvernance & CivicTech', count: 15 },
];