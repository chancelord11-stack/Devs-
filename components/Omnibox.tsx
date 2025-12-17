import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Code2, Users, FileText, Settings, CreditCard, User, X } from 'lucide-react';

const Omnibox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const actions = [
    { label: 'Initier un projet', icon: <FileText size={16} />, path: '/publish-project', shortcut: 'N' },
    { label: 'Chercher un talent', icon: <Users size={16} />, path: '/prestataires', shortcut: 'T' },
    { label: 'Explorer les missions', icon: <Code2 size={16} />, path: '/projets', shortcut: 'M' },
    { label: 'Mon Profil', icon: <User size={16} />, path: '/profile', shortcut: 'P' },
    { label: 'Configuration', icon: <Settings size={16} />, path: '/settings', shortcut: 'S' },
    { label: 'Facturation', icon: <CreditCard size={16} />, path: '/billing', shortcut: 'B' },
  ];

  const filteredActions = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-nexus-surface border border-nexus-border rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center px-4 py-4 border-b border-white/5">
          <Search className="text-gray-500 w-5 h-5" />
          <input 
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white px-4 text-lg placeholder-gray-600 font-mono"
            placeholder="Commande ou recherche..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-400">ESC</span>
            <button onClick={() => setIsOpen(false)}><X className="text-gray-500 w-5 h-5 hover:text-white" /></button>
          </div>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
            {query === '' && <div className="text-xs font-bold text-gray-600 px-3 py-2 uppercase tracking-wider">Actions Rapides</div>}
            
            {filteredActions.map((action, idx) => (
                <button 
                    key={idx}
                    onClick={() => handleSelect(action.path)}
                    className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-nexus-primary/20 hover:text-white text-gray-400 group transition-all"
                >
                    <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center group-hover:bg-nexus-primary group-hover:text-white transition-colors">
                        {action.icon}
                    </div>
                    <span className="flex-1 text-left font-medium">{action.label}</span>
                    {action.shortcut && <span className="text-xs bg-black/40 px-2 py-1 rounded border border-white/5 group-hover:border-nexus-primary/50 text-gray-500">{action.shortcut}</span>}
                </button>
            ))}

            {filteredActions.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                    Aucun résultat pour "{query}"
                </div>
            )}
        </div>
        
        <div className="bg-white/5 px-4 py-2 flex justify-between items-center text-[10px] text-gray-500 border-t border-white/5">
            <div className="flex gap-4">
                <span>Navigate <b className="text-gray-300">↑↓</b></span>
                <span>Select <b className="text-gray-300">↵</b></span>
            </div>
            <span>Nexus OS v2.0</span>
        </div>
      </div>
    </div>
  );
};

export default Omnibox;