import React from 'react';
import { CreditCard, Download, Activity, TrendingUp } from 'lucide-react';

const Billing: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex justify-between items-end mb-8">
          <h1 className="text-3xl font-display font-bold text-white">Trésorerie & Facturation</h1>
          <div className="text-right">
              <div className="text-sm text-gray-500">Solde disponible (Escrow)</div>
              <div className="text-2xl font-mono text-nexus-success font-bold">2,450.00 €</div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-nexus-surface to-black border border-white/10 p-6 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10"><CreditCard size={64}/></div>
             <div className="text-sm text-gray-400 mb-4">Méthode Principale</div>
             <div className="text-xl text-white font-mono mb-2">•••• •••• •••• 4242</div>
             <div className="flex justify-between text-xs text-gray-500">
                 <span>VISA Corporate</span>
                 <span>EXP 12/28</span>
             </div>
          </div>
          <div className="bg-nexus-surface border border-white/10 p-6 rounded-2xl">
             <div className="text-sm text-gray-400 mb-1">Dépenses ce mois</div>
             <div className="text-2xl text-white font-bold mb-2">850.00 €</div>
             <div className="text-xs text-nexus-success flex items-center gap-1"><TrendingUp size={12}/> +12% vs M-1</div>
          </div>
          <div className="bg-nexus-surface border border-white/10 p-6 rounded-2xl flex flex-col justify-center items-center text-center cursor-pointer hover:bg-white/5 transition-colors">
             <Download className="text-nexus-primary mb-2" size={24} />
             <div className="text-white font-bold text-sm">Télécharger le relevé</div>
             <div className="text-xs text-gray-500">Format PDF / CSV</div>
          </div>
      </div>

      <div className="bg-nexus-surface border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-bold text-white">Historique des Transactions</h3>
              <button className="text-xs text-nexus-accent hover:underline">FILTRER</button>
          </div>
          <div className="divide-y divide-white/5">
              {[1,2,3,4,5].map((i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i % 2 === 0 ? 'bg-nexus-success/10 text-nexus-success' : 'bg-white/5 text-gray-400'}`}>
                              <Activity size={18} />
                          </div>
                          <div>
                              <div className="text-white font-medium text-sm">Mission #{4000+i} - Développement Frontend</div>
                              <div className="text-xs text-gray-500">24 Oct, 2025 • ID: TX-{88888+i}</div>
                          </div>
                      </div>
                      <div className="text-right">
                          <div className={`font-mono font-bold ${i % 2 === 0 ? 'text-nexus-success' : 'text-white'}`}>
                              {i % 2 === 0 ? '+ 1,200.00 €' : '- 450.00 €'}
                          </div>
                          <div className="text-[10px] uppercase text-gray-500">{i % 2 === 0 ? 'Libération Escrow' : 'Paiement Service'}</div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

export default Billing;