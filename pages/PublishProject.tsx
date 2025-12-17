import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Cpu, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';

const PublishProject: React.FC = () => {
  const navigate = useNavigate();
  const { addProject } = useData();
  const [isAiMode, setIsAiMode] = useState(true);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    category: 'Développement Web'
  });

  const handleAiGenerate = () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    // Simulation of AI processing
    setTimeout(() => {
        setFormData({
            title: "Plateforme SaaS FinTech avec Dashboard React",
            description: `Basé sur votre demande "${aiPrompt}", voici un brief structuré :

OBJECTIF :
Développer une interface utilisateur responsive pour une application bancaire.

FONCTIONNALITÉS CLÉS :
- Authentification biométrique
- Visualisation de données (Charts)
- Gestion de transactions en temps réel

STACK TECHNIQUE SUGGÉRÉE :
React, TypeScript, Tailwind CSS, Supabase.`,
            budgetMin: '2000',
            budgetMax: '4500',
            category: 'Développement Web'
        });
        setIsGenerating(false);
        setIsAiMode(false); // Switch to edit mode
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    addProject({
      title: formData.title,
      description: formData.description,
      status: 'Ouvert',
      budget: { min: Number(formData.budgetMin) || 0, max: Number(formData.budgetMax) || 0 },
      skills: [formData.category, 'Brief IA'],
      clientId: '#NEXUS_AI'
    });

    navigate('/projets');
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-white mb-6 transition-colors">
        <ArrowLeft size={18} /> Retour au QG
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2">
            <div className="bg-nexus-surface border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                {isAiMode ? (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 bg-nexus-primary/20 text-nexus-primary rounded-full flex items-center justify-center mx-auto mb-6 border border-nexus-primary/50 shadow-[0_0_30px_rgba(124,58,237,0.3)]">
                            <Cpu size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-white font-display mb-2">Générateur de Brief Neural</h1>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">Décrivez votre idée en quelques mots. L'IA du Nexus va structurer le projet, estimer le budget et définir la stack technique.</p>
                        
                        <div className="relative max-w-lg mx-auto">
                            <textarea 
                                value={aiPrompt}
                                onChange={e => setAiPrompt(e.target.value)}
                                className="w-full bg-black/50 border border-nexus-primary/30 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-nexus-primary focus:ring-1 focus:ring-nexus-primary h-32 transition-all"
                                placeholder="Ex: Je veux une app type Uber pour des tracteurs en Côte d'Ivoire..."
                            />
                            <button 
                                onClick={handleAiGenerate}
                                disabled={!aiPrompt || isGenerating}
                                className="absolute bottom-4 right-4 bg-nexus-primary text-white p-2 rounded-lg hover:bg-nexus-primaryHover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {isGenerating ? <Sparkles className="animate-spin" size={20}/> : <ArrowRight size={20} />}
                            </button>
                        </div>
                        
                        <button onClick={() => setIsAiMode(false)} className="mt-8 text-xs text-gray-500 hover:text-white underline">
                            Passer en mode manuel classique
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Finalisation du Protocole</h2>
                            <button type="button" onClick={() => setIsAiMode(true)} className="text-xs text-nexus-primary hover:text-white flex items-center gap-1">
                                <Sparkles size={12}/> Utiliser l'IA
                            </button>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Titre de la mission</label>
                            <input 
                                type="text" 
                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-nexus-accent focus:outline-none transition-colors"
                                value={formData.title}
                                onChange={e => setFormData({...formData, title: e.target.value})}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Catégorie</label>
                                <select 
                                    className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-nexus-accent focus:outline-none appearance-none"
                                    value={formData.category}
                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                >
                                    <option>Développement Web</option>
                                    <option>Mobile & App</option>
                                    <option>Data & IA</option>
                                    <option>Blockchain</option>
                                </select>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Min (€)</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-nexus-accent focus:outline-none"
                                        value={formData.budgetMin}
                                        onChange={e => setFormData({...formData, budgetMin: e.target.value})}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Max (€)</label>
                                    <input 
                                        type="number" 
                                        className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-nexus-accent focus:outline-none"
                                        value={formData.budgetMax}
                                        onChange={e => setFormData({...formData, budgetMax: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Spécifications Techniques</label>
                            <textarea 
                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-nexus-accent focus:outline-none min-h-[200px] font-mono text-sm"
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full bg-nexus-primary hover:bg-nexus-primaryHover text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 border border-white/10">
                            INITIALISER LE PROJET
                        </button>
                    </form>
                )}
            </div>
          </div>

          {/* Sidebar / Info */}
          <div className="space-y-6">
              <div className="bg-nexus-surface/50 border border-nexus-accent/20 p-6 rounded-2xl relative">
                  <div className="absolute top-0 right-0 p-2 opacity-20">
                      <Cpu size={64} />
                  </div>
                  <h3 className="text-nexus-accent font-bold mb-2">Matching Prédictif</h3>
                  <p className="text-sm text-gray-400">
                      Dès publication, le Nexus analysera 42,000 profils pour vous proposer le Top 3 des talents en moins de 0.5s.
                  </p>
              </div>
              
              <div className="bg-black/40 border border-white/5 p-6 rounded-2xl">
                  <div className="flex items-start gap-3">
                      <AlertCircle className="text-nexus-warning shrink-0" size={20} />
                      <div>
                          <h4 className="text-white font-bold text-sm">Escrow Sécurisé</h4>
                          <p className="text-xs text-gray-500 mt-1">Les fonds sont bloqués sur un smart-contract jusqu'à validation des livrables.</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default PublishProject;