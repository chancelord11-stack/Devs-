import React, { useState } from 'react';
import { ToggleLeft, Bell, Shield, Monitor, Moon, Save, ToggleRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Settings: React.FC = () => {
  const { addToast } = useToast();
  
  // State for toggles
  const [darkMode, setDarkMode] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSave = () => {
      addToast("Configuration système sauvegardée avec succès.", "success");
  };

  const handle2FAToggle = () => {
      setTwoFactorEnabled(!twoFactorEnabled);
      if (!twoFactorEnabled) {
          addToast("Module d'authentification 2FA activé.", "success");
      } else {
          addToast("2FA désactivé.", "info");
      }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12">
      <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">Configuration Système</h1>
      
      <div className="grid gap-8">
         {/* Interface Preferences */}
         <section className="bg-white dark:bg-nexus-surface border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-6">
                <Monitor className="text-nexus-accent" /> Interface
            </h2>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-gray-900 dark:text-white font-medium">Mode Sombre Profond</div>
                        <div className="text-xs text-gray-500">Activé par défaut sur le Nexus pour réduire la fatigue visuelle.</div>
                    </div>
                    <button onClick={() => setDarkMode(!darkMode)} className={`transition-colors ${darkMode ? 'text-nexus-primary' : 'text-gray-400'}`}>
                        {darkMode ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                    </button>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-gray-900 dark:text-white font-medium">Animations Réduites</div>
                        <div className="text-xs text-gray-500">Désactiver les effets de particules et de flou.</div>
                    </div>
                    <button onClick={() => setReducedMotion(!reducedMotion)} className={`transition-colors ${reducedMotion ? 'text-nexus-primary' : 'text-gray-400'}`}>
                        {reducedMotion ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                    </button>
                </div>
            </div>
         </section>

         {/* Notifications (Locked) */}
         <section className="bg-white dark:bg-nexus-surface border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-6">
                <Bell className="text-nexus-warning" /> Flux de Données
            </h2>
            <div className="space-y-4">
                {['Nouvelles missions correspondantes', 'Messages directs', 'Mises à jour système', 'Paiements'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-black/20 rounded-lg border border-gray-200 dark:border-white/5 opacity-80 cursor-not-allowed">
                        <input type="checkbox" checked disabled className="accent-nexus-primary w-4 h-4 cursor-not-allowed" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{item}</span>
                    </div>
                ))}
                <div className="text-xs text-nexus-warning mt-2 italic">* Ces flux sont essentiels au protocole Nexus et ne peuvent être désactivés.</div>
            </div>
         </section>

         {/* Security */}
         <section className="bg-white dark:bg-nexus-surface border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-6">
                <Shield className="text-nexus-success" /> Sécurité Quantique
            </h2>
            <div className="flex justify-between items-center mb-4">
                 <div>
                    <div className="text-gray-900 dark:text-white font-medium">Authentification 2FA</div>
                    <div className="text-xs text-gray-500">Sécuriser l'accès via Authenticator.</div>
                 </div>
                 <button 
                    onClick={handle2FAToggle}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                        twoFactorEnabled 
                        ? 'bg-nexus-success text-white hover:bg-emerald-600' 
                        : 'bg-nexus-primary/10 text-nexus-primary hover:bg-nexus-primary hover:text-white'
                    }`}
                 >
                     {twoFactorEnabled ? 'Activé' : 'Activer'}
                 </button>
            </div>
         </section>

         <div className="flex justify-end">
             <button 
                onClick={handleSave}
                className="bg-slate-900 dark:bg-white text-white dark:text-black font-bold py-3 px-8 rounded-xl hover:bg-nexus-primary dark:hover:bg-nexus-accent hover:text-white transition-all flex items-center gap-2 shadow-lg"
             >
                 <Save size={18} /> Sauvegarder les paramètres
             </button>
         </div>
      </div>
    </div>
  );
};

export default Settings;