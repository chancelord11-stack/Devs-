import React from 'react';
import { ToggleLeft, Bell, Shield, Monitor, Moon, Save } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-display font-bold text-white mb-8">Configuration Système</h1>
      
      <div className="grid gap-8">
         {/* Interface Preferences */}
         <section className="bg-nexus-surface border border-white/10 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                <Monitor className="text-nexus-accent" /> Interface
            </h2>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-white font-medium">Mode Sombre Profond</div>
                        <div className="text-xs text-gray-500">Activé par défaut sur le Nexus pour réduire la fatigue visuelle.</div>
                    </div>
                    <div className="text-nexus-primary"><ToggleLeft size={32} className="rotate-180" /></div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-white font-medium">Animations Réduites</div>
                        <div className="text-xs text-gray-500">Désactiver les effets de particules et de flou.</div>
                    </div>
                    <div className="text-gray-600"><ToggleLeft size={32} /></div>
                </div>
            </div>
         </section>

         {/* Notifications */}
         <section className="bg-nexus-surface border border-white/10 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                <Bell className="text-nexus-warning" /> Flux de Données
            </h2>
            <div className="space-y-4">
                {['Nouvelles missions correspondantes', 'Messages directs', 'Mises à jour système', 'Paiements'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-black/20 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                        <input type="checkbox" defaultChecked className="accent-nexus-primary w-4 h-4" />
                        <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                ))}
            </div>
         </section>

         {/* Security */}
         <section className="bg-nexus-surface border border-white/10 rounded-2xl p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                <Shield className="text-nexus-success" /> Sécurité Quantique
            </h2>
            <div className="flex justify-between items-center mb-4">
                 <div>
                    <div className="text-white font-medium">Authentification 2FA</div>
                    <div className="text-xs text-gray-500">Sécuriser l'accès via Authenticator.</div>
                 </div>
                 <button className="bg-nexus-primary/20 text-nexus-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-nexus-primary hover:text-white transition-all">
                     Activer
                 </button>
            </div>
         </section>

         <div className="flex justify-end">
             <button className="bg-white text-black font-bold py-3 px-8 rounded-xl hover:bg-nexus-accent hover:text-white transition-all flex items-center gap-2">
                 <Save size={18} /> Sauvegarder les paramètres
             </button>
         </div>
      </div>
    </div>
  );
};

export default Settings;