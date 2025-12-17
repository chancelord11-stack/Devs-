import React from 'react';
import { Freelancer } from '../types';
import { Star, MapPin, Award, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FreelancerCardProps {
  freelancer: Freelancer;
}

const FreelancerCard: React.FC<FreelancerCardProps> = ({ freelancer }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/prestataires/${freelancer.id}`);
  };

  return (
    <div 
        onClick={handleClick}
        className="bg-nexus-surface border border-white/5 rounded-xl p-5 hover:border-nexus-primary/50 hover:bg-white/5 transition-all relative group cursor-pointer"
    >
      <div className="flex gap-5">
        <div className="flex-shrink-0 relative">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 group-hover:border-nexus-accent transition-colors">
             <img 
                src={freelancer.avatar} 
                alt={freelancer.name} 
                className="w-full h-full object-cover"
            />
          </div>
          {freelancer.isAvailable && (
             <div className="absolute -bottom-1 -right-1 bg-nexus-surface p-0.5 rounded-full">
                <CheckCircle size={16} className="text-nexus-success fill-nexus-success/20" />
             </div>
          )}
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-white leading-tight group-hover:text-nexus-primary transition-colors truncate pr-4">
                  {freelancer.name}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1 font-mono">
                <MapPin size={12} /> {freelancer.location}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
               <div className="text-lg font-bold text-white font-mono">{freelancer.hourlyRate} €<span className="text-xs text-gray-500 font-sans font-normal">/h</span></div>
            </div>
          </div>
          
          <p className="text-nexus-accent/90 font-medium text-sm mt-2 line-clamp-1">{freelancer.tagline}</p>
          
          <div className="flex items-center gap-2 mt-2 mb-3">
             <div className="flex text-amber-500">
               {[...Array(5)].map((_, i) => (
                 <Star key={i} size={14} fill={i < Math.floor(freelancer.rating) ? "currentColor" : "none"} strokeWidth={2} />
               ))}
             </div>
             <span className="text-sm font-bold text-white">{freelancer.rating}</span>
             <span className="text-xs text-gray-600">({freelancer.reviewCount} avis)</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {freelancer.skills.slice(0, 4).map((skill) => (
              <span key={skill} className="bg-white/5 border border-white/5 text-gray-300 text-xs px-2.5 py-1 rounded-md group-hover:border-white/10 transition-colors">
                {skill}
              </span>
            ))}
            {freelancer.skills.length > 4 && (
              <span className="text-xs text-gray-500 self-center">+{freelancer.skills.length - 4}</span>
            )}
          </div>
          
          <div className="text-xs text-gray-500 border-t border-white/5 pt-3 mt-2 flex items-center gap-1.5">
             <Award size={14} className="text-nexus-primary"/>
             <span className="font-mono text-gray-400"><strong className="text-white">{freelancer.projectsRealized}</strong> missions accomplies sur Nexus</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerCard;