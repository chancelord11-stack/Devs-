import React, { useState } from 'react';
import { Project } from '../types';
import { Clock, MapPin, Heart, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

interface ProjectCardProps {
  project: Project;
  showActions?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, showActions = false }) => {
  const { toggleFollowProject } = useData();
  const [hasApplied, setHasApplied] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleOffer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasApplied(true);
    addToast("Candidature envoyée avec succès !", "success");
  };

  const handleCardClick = () => {
    navigate(`/projets/${project.id}`);
  };

  return (
    <div 
        onClick={handleCardClick}
        className="group bg-nexus-surface rounded-xl p-6 border border-white/5 hover:border-nexus-primary/50 hover:bg-white/5 transition-all cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="text-nexus-primary" size={20} />
      </div>

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-bold text-sm text-nexus-primary border border-white/10">
                 {project.clientId.slice(0,2).toUpperCase()}
             </div>
             <div>
                 <div className="flex items-center gap-2">
                     <span className="text-sm font-bold text-white">{project.clientId === 'Client Vérifié' ? 'Client Vérifié' : 'Confidentiel'}</span>
                     {project.clientId === 'Client Vérifié' && <ShieldCheck size={14} className="text-nexus-success" />}
                 </div>
                 <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
                     <span className="flex items-center gap-1"><MapPin size={10} /> Remote</span>
                     <span>•</span>
                     <span className="flex items-center gap-1"><Clock size={10} /> {project.date}</span>
                 </div>
             </div>
        </div>
        <button 
            onClick={(e) => { e.stopPropagation(); toggleFollowProject(project.id); }}
            className={`transition-colors p-2 rounded-full hover:bg-white/10 ${project.isFollowed ? 'text-red-500' : 'text-gray-500 hover:text-white'}`}
        >
            <Heart size={18} fill={project.isFollowed ? "currentColor" : "none"} />
        </button>
      </div>

      <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-nexus-primary transition-colors pr-8">
          {project.title}
      </h3>
      <p className="text-gray-400 text-sm line-clamp-2 mb-6 leading-relaxed">
          {project.description}
      </p>

      <div className="flex items-end justify-between border-t border-white/5 pt-4">
          <div className="flex flex-wrap gap-2">
             {project.skills.slice(0, 3).map(skill => (
                 <span key={skill} className="text-xs px-2 py-1 bg-white/5 text-gray-300 border border-white/5 rounded-md">
                     {skill}
                 </span>
             ))}
          </div>
          <div className="flex items-center gap-6">
              <div className="text-right">
                  <span className="text-xs text-gray-500 block uppercase tracking-wider">Budget</span>
                  <span className="text-sm font-bold text-nexus-accent font-mono">{project.budget.min}-{project.budget.max} €</span>
              </div>
              {showActions && (
                <button 
                    onClick={handleOffer}
                    disabled={hasApplied}
                    className={`text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        hasApplied 
                        ? 'bg-white/10 text-gray-400 cursor-default' 
                        : 'bg-white text-black hover:bg-nexus-primary hover:text-white'
                    }`}
                >
                    {hasApplied ? 'Postulé' : 'Postuler'}
                </button>
              )}
          </div>
      </div>
    </div>
  );
};

export default ProjectCard;