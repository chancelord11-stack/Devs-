import { User, Project, Freelancer, MessageThread } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  email: 'kwame@afritech.com',
  name: 'Kwame Osei',
  type: 'freelance',
  credits: 25,
  rank: 'Elite',
  profileCompletion: 65,
  avatar: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  recommendations: 12,
  verifications: ['identity', 'email', 'phone', 'github'],
  achievements: 8,
  skills: ['React', 'Flutter', 'Node.js', 'Python'],
  bio: "Architecte logiciel basé à Accra. Passionné par la FinTech et les solutions de paiement mobile en Afrique.",
  website: 'https://kwame-dev.africa',
  github: 'https://github.com/kwame01',
  linkedin: 'https://linkedin.com/in/kwame',
  location: 'Accra, Ghana'
};

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Développement Marketplace NFT Solana',
    status: 'Ouvert',
    budget: { min: 3500, max: 8000 },
    date: 'Il y a 2h',
    offers: 12,
    views: 340,
    interactions: 5,
    description: 'Nous recherchons un expert blockchain pour développer le frontend et l\'intégration smart contract d\'une marketplace NFT dédiée à l\'art digital africain.',
    skills: ['React', 'Solidity', 'Rust', 'Web3.js'],
    clientId: 'CryptoArt Africa',
    isFollowed: false
  },
  {
    id: 'p2',
    title: 'Application Mobile FinTech (Flutter)',
    status: 'Ouvert',
    budget: { min: 5000, max: 12000 },
    date: 'Il y a 5h',
    offers: 8,
    views: 210,
    interactions: 2,
    description: 'Développement d\'une super-app financière incluant paiement QR, transfert P2P et épargne rémunérée. Design fourni sur Figma.',
    skills: ['Flutter', 'Firebase', 'Node.js', 'Stripe API'],
    clientId: 'PayFast',
    isFollowed: true
  },
  {
    id: 'p3',
    title: 'Migration E-commerce Prestashop vers Shopify',
    status: 'Ouvert',
    budget: { min: 1500, max: 3000 },
    date: 'Il y a 1j',
    offers: 25,
    views: 500,
    interactions: 10,
    description: 'Migration complète du catalogue produit (500 refs) et développement d\'un thème Shopify 2.0 personnalisé pour une marque de mode.',
    skills: ['Shopify', 'Liquid', 'Migration de données'],
    clientId: 'Client Vérifié',
    isFollowed: false
  },
  {
    id: 'p4',
    title: 'Dashboard Analytique AgriTech',
    status: 'Ouvert',
    budget: { min: 2000, max: 4500 },
    date: 'Il y a 2j',
    offers: 6,
    views: 120,
    interactions: 1,
    description: 'Création d\'un tableau de bord de visualisation de données pour capteurs IoT agricoles (humidité, température). Stack: React + D3.js.',
    skills: ['React', 'D3.js', 'IoT', 'AWS'],
    clientId: 'GreenGrow',
    isFollowed: false
  },
  {
    id: 'p5',
    title: 'Bot Telegram Trading Crypto',
    status: 'Ouvert',
    budget: { min: 800, max: 1500 },
    date: 'Il y a 3j',
    offers: 18,
    views: 400,
    interactions: 8,
    description: 'Script Python pour automatiser des ordres d\'achat/vente sur Binance basé sur des signaux RSI/MACD.',
    skills: ['Python', 'Binance API', 'Trading Algorithmique'],
    clientId: '#Anonyme',
    isFollowed: false
  }
];

export const FREELANCERS: Freelancer[] = [
  {
    id: 'f1',
    name: 'Aminata Diop',
    isAvailable: true,
    rating: 5.0,
    reviewCount: 128,
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    tagline: 'Experte DevOps & Cloud AWS',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    hourlyRate: 85,
    projectsRealized: 42,
    location: 'Dakar, Sénégal',
    memberSince: 'Jan 2022',
    responseTime: '< 1h',
    verifications: ['email', 'phone', 'identity', 'siret'],
    bio: "Spécialiste certifiée AWS avec plus de 7 ans d'expérience. J'aide les entreprises à migrer vers le cloud et à optimiser leurs pipelines CI/CD. J'ai travaillé avec des grands groupes et des startups agiles."
  },
  {
    id: 'f2',
    name: 'Chinedu Eze',
    isAvailable: false,
    rating: 4.9,
    reviewCount: 54,
    avatar: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    tagline: 'Blockchain Developer & Smart Contracts',
    skills: ['Solidity', 'Ethereum', 'Web3', 'Rust'],
    hourlyRate: 110,
    projectsRealized: 15,
    location: 'Lagos, Nigeria',
    memberSince: 'Mar 2023',
    responseTime: '4h',
    verifications: ['email', 'github'],
    bio: "Développeur Blockchain passionné par la DeFi et les NFTs. Je conçois des Smart Contracts sécurisés et optimisés pour Ethereum et Solana."
  },
  {
    id: 'f3',
    name: 'Grace Mutua',
    isAvailable: true,
    rating: 4.7,
    reviewCount: 22,
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    tagline: 'Mobile App Developer (iOS/Android)',
    skills: ['Flutter', 'Dart', 'Firebase', 'UI Design'],
    hourlyRate: 50,
    projectsRealized: 30,
    location: 'Nairobi, Kenya',
    memberSince: 'Nov 2023',
    responseTime: '2h',
    verifications: ['email', 'phone'],
    bio: "Développeuse mobile Flutter expérimentée. Je transforme vos idées en applications fluides et performantes sur iOS et Android."
  },
  {
    id: 'f4',
    name: 'Tunde Bakare',
    isAvailable: true,
    rating: 4.8,
    reviewCount: 15,
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    tagline: 'Senior Frontend Engineer (React/Vue)',
    skills: ['React', 'Vue.js', 'TypeScript', 'Tailwind'],
    hourlyRate: 65,
    projectsRealized: 28,
    location: 'Accra, Ghana',
    memberSince: 'Juil 2022',
    responseTime: '1h',
    verifications: ['email', 'phone', 'identity'],
    bio: "Expert Frontend spécialisé dans React et l'écosystème moderne JavaScript. Je crée des interfaces utilisateurs réactives, accessibles et performantes."
  }
];

export const MESSAGES: MessageThread[] = [
  {
    id: 'm1',
    correspondent: 'TechHub Abidjan',
    messages: [
        { id: '1', text: 'Bonjour Kwame, votre profil nous intéresse pour une mission Fintech.', sender: 'other', timestamp: '10:30' }
    ],
    lastMessageDate: '10:30',
    unread: true,
    avatar: 'https://ui-avatars.com/api/?name=Tech+Hub&background=F59E0B&color=fff'
  },
  {
    id: 'm2',
    correspondent: 'Startup Lagos',
    messages: [
        { id: '1', text: 'Le contrat a été validé.', sender: 'other', timestamp: 'Hier' }
    ],
    lastMessageDate: 'Hier',
    unread: false,
    avatar: 'https://ui-avatars.com/api/?name=Startup+Lagos&background=006B3D&color=fff'
  }
];

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