export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  type: 'freelance' | 'client';
  profileCompletion: number;
  recommendations: number;
  verifications: string[];
  achievements: number;
  rating?: number;
  tagline?: string;
  hourlyRate?: number;
  projectsCount?: number;
  skills: string[];
  location?: string;
  bio?: string;
  rank?: string;
  credits?: number;
  // Social Links
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Project {
  id: string;
  title: string;
  status: 'Ouvert' | 'Fermé' | 'Attribué';
  budget: { min: number; max: number };
  date: string; // Display string (e.g., "Il y a 2h")
  created_at?: string; // ISO String from DB
  offers: number; // Mapped from offers_count
  views: number; // Mapped from views_count
  interactions: number;
  description: string;
  skills: string[];
  clientId: string;
  isFollowed?: boolean;
}

export interface Freelancer {
  id: string;
  name: string;
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  avatar: string;
  tagline: string;
  skills: string[];
  hourlyRate: number;
  projectsRealized: number;
  location: string;
  memberSince: string;
  responseTime: string;
  verifications: string[];
  bio?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
}

export interface MessageThread {
  id: string;
  correspondent: string;
  messages: Message[];
  unread: boolean;
  avatar: string;
  lastMessageDate: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning';
  message: string;
  date: string;
  read: boolean;
}