import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { 
  ArrowLeft, Star, MapPin, ShieldCheck, CheckCircle, MessageSquare, 
  Briefcase, Globe, Github, Linkedin, Clock, Eye, Phone, Mail, FileCheck, ThumbsUp
} from 'lucide-react';

const FreelancerPublicProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { freelancers } = useData();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'presentation' | 'realizations' | 'reviews'>('presentation');

  const freelancer = freelancers.find(f => f.id === id);

  if (!freelancer) {
    return (
        <div className="text-center py-20 animate-fade-in">
            <h2 className="text-2xl text-white font-bold">Profil introuvable</h2>
            <button onClick={() => navigate('/prestataires')} className="text-nexus-primary mt-4 hover:underline">Retour à la base de talents</button>
        </div>
    );
  }

  const handleContact = () => {
    addToast(`Demande de contact envoyée à ${freelancer.name}`, "success");
  };

  const getVerificationIcon = (type: string) => {
      switch(type) {
          case 'identity': return <ShieldCheck size={16} />;
          case 'email': return <Mail size={16} />;
          case 'phone': return <Phone size={16} />;
          case 'siret': return <FileCheck size={16} />;
          default: return <CheckCircle size={16} />;
      }
  };

  const getVerificationLabel = (type: string) => {
      switch(type) {
          case 'identity': return "Identité vérifiée";
          case 'email': return "Email vérifié";
          case 'phone': return "Téléphone vérifié";
          case 'siret': return "Société vérifiée (SIRET)";
          default: return "Vérifié";
      }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-12">
      
      {/* Breadcrumb / Back */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span onClick={() => navigate('/prestataires')} className="cursor-pointer hover:text-nexus-primary transition-colors">Freelances</span>
        <span>/</span>
        <span className="text-white font-medium">{freelancer.name}</span>
      </div>

      {/* Grid Layout - Codeur.com Style */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN (Main Content) - 8 Cols */}
        <div className="lg:col-span-8 space-y-6">
            
            {/* Header Card */}
            <div className="bg-nexus-surface border border-white/10 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-gray-800 shrink-0 overflow-hidden border-2 border-white/10 relative">
                        <img src={freelancer.avatar} alt={freelancer.name} className="w-full h-full object-cover" />
                        {freelancer.isAvailable && (
                            <div className="absolute bottom-2 right-2 w-4 h-4 bg-nexus-success rounded-full border-2 border-nexus-surface" title="Disponible"></div>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                                    {freelancer.name}
                                    <span title="Identité Vérifiée">
                                        <ShieldCheck className="text-nexus-success fill-nexus-success/10" size={20} />
                                    </span>
                                </h1>
                                <h2 className="text-nexus-primary font-medium text-lg mb-2">{freelancer.tagline}</h2>
                            </div>
                            <div className="hidden sm:block text-right">
                                <div className="flex items-center justify-end gap-1 text-amber-400 font-bold text-lg">
                                    <Star size={18} fill="currentColor" /> {freelancer.rating}
                                </div>
                                <div className="text-xs text-gray-500 underline decoration-gray-700">{freelancer.reviewCount} avis clients</div>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mt-2">
                            <span className="flex items-center gap-1"><MapPin size={14} className="text-nexus-accent"/> {freelancer.location}</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                            <span>Membre depuis {freelancer.memberSince || '2023'}</span>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {freelancer.skills.slice(0, 5).map(skill => (
                                <span key={skill} className="bg-white/5 border border-white/5 text-gray-300 px-3 py-1 rounded-full text-xs font-medium hover:border-nexus-primary/30 transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs System */}
            <div>
                <div className="flex border-b border-white/10 mb-6 overflow-x-auto">
                    <button 
                        onClick={() => setActiveTab('presentation')}
                        className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'presentation' ? 'border-nexus-primary text-nexus-primary' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                    >
                        Présentation
                    </button>
                    <button 
                        onClick={() => setActiveTab('realizations')}
                        className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'realizations' ? 'border-nexus-primary text-nexus-primary' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                    >
                        Réalisations <span className="ml-1 bg-white/10 text-gray-400 px-1.5 py-0.5 rounded text-[10px]">12</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('reviews')}
                        className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'reviews' ? 'border-nexus-primary text-nexus-primary' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                    >
                        Avis Clients <span className="ml-1 bg-nexus-success/10 text-nexus-success px-1.5 py-0.5 rounded text-[10px]">{freelancer.rating}</span>
                    </button>
                </div>

                {/* Tab Content */}
                <div className="bg-nexus-surface border border-white/10 rounded-xl p-8 min-h-[400px]">
                    {activeTab === 'presentation' && (
                        <div className="animate-fade-in space-y-8">
                            <section>
                                <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-nexus-primary pl-3">À propos</h3>
                                <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                                    {freelancer.bio || "Ce freelance n'a pas encore rempli sa description détaillée."}
                                </div>
                            </section>
                            
                            <section>
                                <h3 className="text-lg font-bold text-white mb-4 border-l-4 border-nexus-accent pl-3">Compétences & Outils</h3>
                                <div className="flex flex-wrap gap-2">
                                    {freelancer.skills.map(skill => (
                                        <span key={skill} className="bg-black/30 text-nexus-accent px-4 py-2 rounded-lg text-sm font-medium border border-white/5">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <section className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Langues</div>
                                    <div className="text-white font-medium">Français (Natif), Anglais (Courant)</div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="text-gray-400 text-xs uppercase tracking-wider mb-1">Expérience</div>
                                    <div className="text-white font-medium">5+ années d'expérience</div>
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'realizations' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="group border border-white/5 bg-black/20 rounded-xl overflow-hidden hover:border-nexus-primary/30 transition-all cursor-pointer shadow-lg hover:shadow-nexus-primary/10">
                                    <div className="h-48 bg-gray-800 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                        <img src={`https://source.unsplash.com/random/400x300?website,${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                                        <div className="absolute bottom-3 left-3 z-20">
                                            <span className="text-[10px] bg-nexus-primary px-2 py-0.5 rounded text-white font-bold uppercase">Web App</span>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-white font-bold mb-1 truncate group-hover:text-nexus-primary transition-colors">Plateforme SaaS FinTech v{i}.0</h4>
                                        <p className="text-xs text-gray-500">React, Node.js, AWS</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="space-y-6 animate-fade-in">
                            {/* Review Summary Header */}
                            <div className="bg-white/5 p-6 rounded-xl flex items-center gap-8 mb-8">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-white mb-1">{freelancer.rating}</div>
                                    <div className="flex text-amber-400 justify-center text-xs">
                                        {[...Array(5)].map((_, j) => <Star key={j} size={10} fill="currentColor" />)}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">{freelancer.reviewCount} avis</div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    {[5, 4, 3, 2, 1].map((stars, idx) => (
                                        <div key={stars} className="flex items-center gap-3 text-xs">
                                            <span className="w-3 text-gray-400">{stars}</span>
                                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full bg-amber-400" style={{ width: idx === 0 ? '80%' : idx === 1 ? '15%' : '2%' }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews List */}
                            {[1, 2, 3].map(i => (
                                <div key={i} className="border-b border-white/5 last:border-0 pb-8 last:pb-0">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-nexus-primary/20 flex items-center justify-center text-nexus-primary font-bold border border-nexus-primary/30">
                                                {String.fromCharCode(65+i)}
                                            </div>
                                            <div>
                                                <div className="text-white font-bold text-sm">Client Confidentiel</div>
                                                <div className="text-xs text-gray-500">Projet: Développement Frontend React</div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-600">Il y a {i} mois</div>
                                    </div>
                                    <div className="flex text-amber-400 mb-2">
                                        {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed italic">
                                        "Très satisfait du travail réalisé. Communication fluide et respect des délais. Le code est propre et bien documenté. Je ferai appel à nouveau à ses services pour la suite du projet."
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN (Sidebar) - 4 Cols */}
        <div className="lg:col-span-4 space-y-6">
            
            {/* Commercial Card (Sticky-ish) */}
            <div className="bg-nexus-surface border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nexus-primary to-nexus-accent"></div>
                
                <div className="flex justify-between items-center mb-6">
                     <span className="text-gray-400 text-sm font-medium">Tarif Journalier</span>
                     <div className="text-2xl font-bold text-white font-mono">{freelancer.hourlyRate} €</div>
                </div>

                <div className="space-y-3 mb-6">
                    <button 
                        onClick={handleContact}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
                    >
                        <MessageSquare size={18} /> Contacter
                    </button>
                    <button className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3.5 rounded-lg border border-white/10 transition-all text-sm uppercase tracking-wide">
                        Demander un devis
                    </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
                    <Clock size={12} /> Réponse moyenne : <span className="text-white font-bold">{freelancer.responseTime || '2h'}</span>
                </div>

                <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4 text-center">
                    <div>
                        <div className="text-lg font-bold text-white">{freelancer.projectsRealized}</div>
                        <div className="text-[10px] text-gray-500 uppercase">Missions</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-white">100%</div>
                        <div className="text-[10px] text-gray-500 uppercase">Satisfaction</div>
                    </div>
                </div>
            </div>

            {/* Verifications Card */}
            <div className="bg-nexus-surface border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider border-b border-white/10 pb-2">Vérifications</h3>
                <div className="space-y-3">
                    {(freelancer.verifications || ['email']).map(v => (
                        <div key={v} className="flex items-center gap-3 text-sm text-gray-300">
                             <div className="text-nexus-success">{getVerificationIcon(v)}</div>
                             <span>{getVerificationLabel(v)}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Socials Card */}
            <div className="bg-nexus-surface border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider border-b border-white/10 pb-2">Réseaux</h3>
                <div className="flex gap-4">
                    <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-nexus-primary hover:text-white text-gray-400 transition-colors"><Globe size={20} /></a>
                    <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-nexus-primary hover:text-white text-gray-400 transition-colors"><Github size={20} /></a>
                    <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-nexus-primary hover:text-white text-gray-400 transition-colors"><Linkedin size={20} /></a>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default FreelancerPublicProfile;