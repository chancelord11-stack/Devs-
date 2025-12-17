import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import FreelancerCard from '../components/FreelancerCard';
import Sidebar from '../components/Sidebar';
import { Filter, Search, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Freelancers: React.FC = () => {
  const { freelancers, loadingData } = useData();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: '',
    minBudget: 0,
    maxBudget: 10000
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Filtering Logic
  const filteredFreelancers = freelancers.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (f.skills && f.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesCategory = filters.category === '' || (f.skills && f.skills.includes(filters.category));
      
      return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20 pb-12 animate-fade-in">
        <div className="container mx-auto px-6">
            <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">Base de Talents</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white dark:bg-nexus-surface border border-gray-200 dark:border-white/10 p-5 rounded-2xl">
                     <div className="flex items-center gap-2 mb-4 text-nexus-primary font-bold uppercase text-xs tracking-wider">
                         <Filter size={14} /> Filtres
                     </div>
                     <Sidebar filters={filters} setFilters={setFilters} showBudget={false} />
                </div>
                
                <div className="bg-white dark:bg-nexus-surface border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-emerald-50 dark:bg-nexus-success/5 group-hover:bg-emerald-100 dark:group-hover:bg-nexus-success/10 transition-colors"></div>
                    <div className="relative z-10">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-2">Vous êtes prestataire ?</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Rejoignez l'élite technologique africaine et accédez aux meilleures missions.</p>
                        <button 
                            onClick={() => navigate('/register')}
                            className="w-full bg-nexus-success hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/20"
                        >
                            Créer mon profil
                        </button>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-3">
                <div className="bg-white dark:bg-nexus-surface p-4 border border-gray-200 dark:border-white/10 rounded-xl mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                        <span className="font-bold text-gray-900 dark:text-white">{freelancers.length}</span> experts disponibles
                    </div>
                    
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <input 
                                type="text" 
                                placeholder="Rechercher par nom ou compétence..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-nexus-primary"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                        </div>
                        <select className="bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 text-sm rounded-lg p-2 outline-none focus:border-nexus-primary cursor-pointer">
                            <option>Pertinence</option>
                            <option>Note: décroissant</option>
                            <option>TJM: croissant</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    {loadingData ? (
                        <div className="py-20 text-center">
                            <div className="w-8 h-8 border-2 border-nexus-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-500">Chargement de la base de données...</p>
                        </div>
                    ) : filteredFreelancers.length > 0 ? (
                        filteredFreelancers.map(freelancer => (
                            <div key={freelancer.id} className="animate-fade-in">
                                <FreelancerCard freelancer={freelancer} />
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center bg-white dark:bg-nexus-surface border border-gray-200 dark:border-white/10 rounded-2xl">
                            <UserX size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Aucun talent trouvé</h3>
                            <p className="text-gray-500 mb-6">Essayez de modifier vos filtres ou termes de recherche.</p>
                            <button 
                                onClick={() => { setSearchTerm(''); setFilters({ category: '', minBudget: 0, maxBudget: 10000 }); }}
                                className="text-nexus-primary hover:underline font-medium"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    )}
                </div>
                
                {filteredFreelancers.length > 10 && (
                    <div className="mt-8 flex justify-center">
                        <button className="px-6 py-2 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white hover:border-nexus-primary hover:bg-nexus-primary/10 transition-all">
                            Charger plus de profils
                        </button>
                    </div>
                )}
            </div>
            </div>
        </div>
    </div>
  );
};

export default Freelancers;