import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import ProjectCard from '../components/ProjectCard';
import { AlertTriangle } from 'lucide-react';

const MyProjects: React.FC = () => {
  const { projects } = useData();
  const [activeTab, setActiveTab] = useState<'followed' | 'ongoing' | 'completed'>('followed');

  const followedProjects = projects.filter(p => p.isFollowed);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Mes Projets</h1>
      
      {/* Alerts */}
      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6 flex items-start gap-3">
         <AlertTriangle className="text-orange-500 flex-shrink-0" size={20} />
         <div>
           <p className="text-sm text-orange-800 font-bold">Aucune visite sur votre profil cette semaine.</p>
           <p className="text-xs text-orange-700">Pensez à compléter vos réalisations pour attirer plus de clients.</p>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => setActiveTab('followed')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'followed' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Projets suivis ({followedProjects.length})
        </button>
        <button 
          onClick={() => setActiveTab('ongoing')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'ongoing' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          En cours (0)
        </button>
        <button 
          onClick={() => setActiveTab('completed')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'completed' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Terminés (0)
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'followed' && (
          followedProjects.length > 0 ? (
            followedProjects.map(project => (
              <ProjectCard key={project.id} project={project} showActions={true} />
            ))
          ) : (
             <div className="text-center py-12 text-gray-500 bg-white rounded border border-gray-200">
               Vous ne suivez aucun projet pour le moment.
             </div>
          )
        )}
        
        {activeTab === 'ongoing' && (
          <div className="text-center py-12 text-gray-500 bg-white rounded border border-gray-200">
            Aucun projet en cours.
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="text-center py-12 text-gray-500 bg-white rounded border border-gray-200">
            Aucun projet terminé.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProjects;