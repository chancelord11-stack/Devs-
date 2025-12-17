import React from 'react';
import { Github, Twitter, Linkedin, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black/40 pt-16 pb-10 mt-20 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-nexus-surface border border-white/10 rounded flex items-center justify-center">
                    <Zap size={12} className="text-white fill-white" />
                </div>
                <span className="font-display font-bold text-lg text-white tracking-widest">NEXUS</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              L'infrastructure décentralisée pour l'élite technologique africaine. Construire le futur, ligne par ligne.
            </p>
          </div>

          <div className="flex gap-16 text-sm">
            <div>
                <h4 className="font-bold text-white mb-4 font-mono text-xs uppercase tracking-wider text-nexus-primary">Navigation</h4>
                <ul className="space-y-3 text-gray-400">
                    <li><Link to="/projets" className="hover:text-nexus-accent transition-colors">Flux Missions</Link></li>
                    <li><Link to="/prestataires" className="hover:text-nexus-accent transition-colors">Base Talents</Link></li>
                    <li><Link to="/publish-project" className="hover:text-nexus-accent transition-colors">Initier Projet</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-white mb-4 font-mono text-xs uppercase tracking-wider text-nexus-primary">Protocole</h4>
                <ul className="space-y-3 text-gray-400">
                    <li><Link to="/legal/cgu" className="hover:text-nexus-accent transition-colors">CGU / Termes</Link></li>
                    <li><Link to="/legal/confidentialite" className="hover:text-nexus-accent transition-colors">Confidentialité</Link></li>
                    <li><Link to="/billing" className="hover:text-nexus-accent transition-colors">Facturation</Link></li>
                </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono">
          <p>© 2025 NEXUS AFRITECH SYSTEM. ALL RIGHTS SECURED.</p>
          <div className="flex gap-6">
             <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Github size={16} /></a>
             <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Twitter size={16} /></a>
             <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;