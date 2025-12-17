import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { 
  ArrowLeft, Calendar, MapPin, DollarSign, Eye, Clock, 
  ShieldCheck, Share2, Flag, User
} from 'lucide-react';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, toggleFollowProject } = useData();
  const { addToast } = useToast();
  const [proposal, setProposal] = useState('');

  // Find project (or use placeholder if demo data sync issue)
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
        <div className="text-center py-20">
            <h2 className="text-2xl text-white font-bold">Projet introuvable</h2>
            <button onClick={() => navigate('/projets')} className="text-nexus-primary mt-4 hover:underline">Retour au flux</button>
        </div>
    );
  }

  const handleApply = () => {
    if (proposal.length < 20) {
        addToast("Votre message doit contenir au moins 20 caractères.", "error");
        return;
    }
    addToast("Votre proposition a été envoyée au client !", "success");
    setProposal("");
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={18} /> Retour
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 bg-white/5 rounded-bl-2xl border-b border-l border-white/5">
                    <span className="text-xs font-mono text-nexus-success flex items-center gap-1">
                        <span className="w-2 h-2 bg-nexus-success rounded-full animate-pulse"></span>
                        OUVERT AUX OFFRES
                    </span>
                </div>

                <h1 className="text-3xl font-display font-bold text-white mb-4 leading-tight">{project.title}</h1>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full border border-white/5">
                        <User size={14} className="text-nexus-primary" /> {project.clientId}
                    </div>
                    <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full border border-white/5">
                        <MapPin size={14} className="text-nexus-accent" /> Remote
                    </div>
                    <div className="flex items-center gap-1 bg-black/20 px-3 py-1 rounded-full border border-white/5">
                        <Clock size={14} className="text-orange-500" /> Publié {project.date}
                    </div>
                </div>

                <div className="border-t border-white/5 py-6">
                    <h2 className="text-lg font-bold text-white mb-4">Description de la mission</h2>
                    <div className="text-gray-300 leading-relaxed space-y-4 text-sm">
                        <p>{project.description}</p>
                        <p>
                            Dans le cadre de ce projet, nous attendons un code propre, documenté et testé. 
                            Le freelance devra participer aux réunions hebdomadaires de synchronisation.
                        </p>
                        <h3 className="font-bold text-white mt-4">Livrables attendus :</h3>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Code source complet sur GitHub</li>
                            <li>Documentation technique</li>
                            <li>Déploiement sur environnement de staging</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-6">
                    <h2 className="text-lg font-bold text-white mb-4">Compétences requises</h2>
                    <div className="flex flex-wrap gap-2">
                        {project.skills.map(skill => (
                            <span key={skill} className="px-3 py-1.5 bg-nexus-primary/10 border border-nexus-primary/20 text-nexus-primary rounded-lg text-sm font-medium">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Proposal Form */}
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-white mb-2">Envoyer une proposition</h2>
                <p className="text-sm text-gray-500 mb-6">Expliquez pourquoi vous êtes le meilleur pour cette mission.</p>
                
                <textarea 
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:border-nexus-primary outline-none min-h-[150px] mb-4"
                    placeholder="Bonjour, je suis très intéressé par ce projet car..."
                />
                
                <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                        Votre offre inclut la protection Nexus Escrow.
                    </div>
                    <button 
                        onClick={handleApply}
                        className="bg-nexus-primary hover:bg-nexus-primaryHover text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-nexus-primary/20"
                    >
                        Envoyer ma candidature
                    </button>
                </div>
            </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6">
                <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-1">Budget Client</div>
                    <div className="text-3xl font-mono font-bold text-white flex items-center gap-2">
                        {project.budget.max} € <span className="text-sm text-gray-600 font-sans font-normal">max</span>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="flex justify-between text-sm py-2 border-b border-white/5">
                        <span className="text-gray-400">Offres reçues</span>
                        <span className="text-white font-bold">{project.offers}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-white/5">
                        <span className="text-gray-400">Vues</span>
                        <span className="text-white font-bold flex items-center gap-1"><Eye size={12}/> {project.views}</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-b border-white/5">
                        <span className="text-gray-400">Client depuis</span>
                        <span className="text-white font-bold">2023</span>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button 
                        onClick={() => toggleFollowProject(project.id)}
                        className={`flex-1 py-2.5 rounded-lg border border-white/10 font-bold text-sm transition-all flex justify-center items-center gap-2 ${project.isFollowed ? 'bg-white text-black' : 'text-white hover:bg-white/5'}`}
                    >
                        {project.isFollowed ? 'Suivi' : 'Suivre'}
                    </button>
                    <button className="p-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5">
                        <Share2 size={18} />
                    </button>
                    <button className="p-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/30 hover:bg-red-500/10">
                        <Flag size={18} />
                    </button>
                </div>
            </div>

            <div className="bg-gradient-to-br from-nexus-primary/10 to-transparent border border-nexus-primary/20 rounded-2xl p-6">
                <ShieldCheck size={32} className="text-nexus-primary mb-4" />
                <h3 className="font-bold text-white mb-2">Garantie de Paiement</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                    Le paiement est sécurisé sur un compte de séquestre dès le début de la mission. Vous êtes payé automatiquement à la validation des livrables.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;