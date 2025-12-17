import React, { useState } from 'react';
import { Search, HelpCircle, FileText, MessageCircle, Mail, ChevronRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Help: React.FC = () => {
  const [search, setSearch] = useState('');
  const { addToast } = useToast();

  const handleContactSupport = () => {
    addToast("Ticket de support créé #8842. Vous recevrez une réponse sous 2h.", "success");
  };

  const categories = [
    { icon: FileText, title: "Commencer sur Nexus", desc: "Création de compte, vérification..." },
    { icon: MessageCircle, title: "Paiements & Escrow", desc: "Facturation, litiges, virements..." },
    { icon: HelpCircle, title: "Gestion de mission", desc: "Livrables, contrats, annulation..." },
  ];

  const faqs = [
    "Comment fonctionne le paiement sécurisé ?",
    "Quels sont les frais de service ?",
    "Comment obtenir le badge 'Vérifié' ?",
    "Puis-je annuler une mission en cours ?"
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12">
      <div className="text-center py-12">
        <h1 className="text-3xl font-display font-bold text-white mb-4">Comment pouvons-nous vous aider ?</h1>
        <div className="relative max-w-lg mx-auto">
            <input 
                type="text" 
                placeholder="Rechercher un article..." 
                className="w-full bg-nexus-surface border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:border-nexus-primary outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-gray-500" size={18} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         {categories.map((cat, i) => (
             <div key={i} className="bg-nexus-surface border border-white/10 p-6 rounded-2xl hover:border-nexus-primary/50 transition-colors cursor-pointer group">
                 <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-nexus-primary group-hover:text-white text-nexus-primary transition-all">
                     <cat.icon size={24} />
                 </div>
                 <h3 className="text-white font-bold mb-2">{cat.title}</h3>
                 <p className="text-sm text-gray-400">{cat.desc}</p>
             </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
              <h2 className="text-xl font-bold text-white mb-6">Questions Fréquentes</h2>
              <div className="space-y-4">
                  {faqs.map((q, i) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-nexus-surface border border-white/5 rounded-xl hover:bg-white/5 cursor-pointer">
                          <span className="text-gray-300 font-medium">{q}</span>
                          <ChevronRight size={16} className="text-gray-500" />
                      </div>
                  ))}
              </div>
          </div>

          <div className="bg-gradient-to-br from-nexus-surface to-black border border-white/10 rounded-2xl p-8 text-center">
              <Mail size={48} className="text-white mx-auto mb-4" />
              <h2 className="text-xl font-bold text-white mb-2">Support Direct</h2>
              <p className="text-gray-400 mb-6 text-sm">
                  Notre équipe d'élite est disponible 24/7 pour résoudre vos problèmes techniques ou administratifs.
              </p>
              <button 
                onClick={handleContactSupport}
                className="bg-white text-black font-bold py-3 px-8 rounded-xl hover:bg-nexus-accent hover:text-white transition-all w-full"
              >
                  Ouvrir un ticket
              </button>
          </div>
      </div>
    </div>
  );
};

export default Help;