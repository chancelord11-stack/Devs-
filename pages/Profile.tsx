import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  MapPin, Star, PenTool, Save, X, Camera, Globe, Github, Linkedin, 
  Mail, Trash2, Link as LinkIcon, AlertCircle, Briefcase, Code2, 
  CheckCircle2, Clock, DollarSign 
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateUserProfile } = useData();
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for form
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    location: '',
    hourlyRate: 0,
    bio: '',
    skills: '',
    website: '',
    github: '',
    linkedin: ''
  });

  if (!user) return null;

  const startEditing = () => {
    setFormData({
        name: user.name,
        tagline: user.tagline || '',
        location: user.location || '',
        hourlyRate: user.hourlyRate || 0,
        bio: user.bio || '',
        skills: user.skills.join(', '),
        website: user.website || '',
        github: user.github || '',
        linkedin: user.linkedin || ''
    });
    setIsEditing(true);
  };

  const saveProfile = () => {
    updateUserProfile({
        name: formData.name,
        tagline: formData.tagline,
        location: formData.location,
        hourlyRate: Number(formData.hourlyRate),
        bio: formData.bio,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
        website: formData.website,
        github: formData.github,
        linkedin: formData.linkedin
    });
    setIsEditing(false);
  };

  const DefaultAvatar = () => (
      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-5xl">
         {user.name.charAt(0)}
      </div>
  );

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-20">
       
       {/* Actions Bar */}
       <div className="flex justify-between items-center mb-6">
           <h1 className="text-2xl font-bold text-white font-display hidden sm:block">Mon Profil Public</h1>
           <div className="flex gap-3 ml-auto">
               {isEditing ? (
                   <>
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors text-sm"
                    >
                        <X size={16} /> Annuler
                    </button>
                    <button 
                        onClick={saveProfile}
                        className="bg-nexus-success hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-emerald-900/20 text-sm"
                    >
                        <Save size={16} /> Enregistrer
                    </button>
                   </>
               ) : (
                    <button 
                        onClick={startEditing}
                        className="bg-nexus-primary hover:bg-nexus-primaryHover border border-white/10 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-indigo-900/20 text-sm"
                    >
                        <PenTool size={16} /> Éditer le profil
                    </button>
               )}
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Main Info (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
              
              {/* Identity Card */}
              <div className="bg-nexus-surface border border-white/10 rounded-2xl overflow-hidden relative">
                  {/* Banner */}
                  <div className="h-40 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 relative">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-nexus-surface to-transparent"></div>
                  </div>

                  <div className="px-8 pb-8">
                      <div className="relative flex flex-col sm:flex-row gap-6 items-end -mt-16">
                          {/* Avatar */}
                          <div className="relative group shrink-0">
                              <div className="w-32 h-32 rounded-2xl border-4 border-nexus-surface shadow-2xl overflow-hidden bg-gray-800">
                                  {user.avatar ? (
                                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                  ) : (
                                      <DefaultAvatar />
                                  )}
                              </div>
                              {isEditing && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl backdrop-blur-sm cursor-pointer border-4 border-transparent">
                                      <Camera size={24} className="text-white" />
                                  </div>
                              )}
                          </div>

                          {/* Name & Tagline */}
                          <div className="flex-1 w-full pb-1">
                              {isEditing ? (
                                  <div className="space-y-3">
                                      <input 
                                        type="text" 
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-xl font-bold text-white focus:border-nexus-primary outline-none"
                                        placeholder="Votre nom"
                                      />
                                      <input 
                                        type="text" 
                                        value={formData.tagline}
                                        onChange={e => setFormData({...formData, tagline: e.target.value})}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-nexus-accent font-medium focus:border-nexus-primary outline-none"
                                        placeholder="Votre titre (ex: Développeur Fullstack)"
                                      />
                                  </div>
                              ) : (
                                  <div>
                                      <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
                                      <p className="text-lg text-nexus-primary font-medium">{user.tagline || 'Membre AfriTech'}</p>
                                      
                                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                                          <div className="flex items-center gap-1">
                                              <MapPin size={14} /> 
                                              {user.location || 'Non renseigné'}
                                          </div>
                                          <div className="flex items-center gap-1 text-nexus-success">
                                              <span className="w-1.5 h-1.5 rounded-full bg-nexus-success"></span> Disponible
                                          </div>
                                          <div className="flex items-center gap-1">
                                              <Clock size={14} /> Membre depuis 2024
                                          </div>
                                      </div>
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              </div>

              {/* Bio & Skills */}
              <div className="bg-nexus-surface border border-white/10 rounded-2xl p-8 space-y-8">
                  <section>
                      <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                          <Briefcase className="text-nexus-accent" size={20} /> À propos
                      </h2>
                      {isEditing ? (
                          <>
                            <textarea 
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-gray-300 focus:border-nexus-primary outline-none min-h-[150px] leading-relaxed"
                                value={formData.bio}
                                onChange={e => setFormData({...formData, bio: e.target.value})}
                                placeholder="Décrivez votre parcours, vos expertises et ce que vous apportez à vos clients..."
                            />
                            <p className="text-right text-xs text-gray-600 mt-1">Markdown supporté</p>
                          </>
                      ) : (
                          <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                            {user.bio || (
                                <div className="flex items-center gap-3 text-gray-500 italic bg-white/5 p-4 rounded-xl border border-white/5">
                                    <AlertCircle size={20} />
                                    Votre bio est vide. Ajoutez une description pour rassurer les clients potentiels.
                                </div>
                            )}
                          </div>
                      )}
                   </section>

                   <section>
                      <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                          <Code2 className="text-nexus-primary" size={20} /> Compétences
                      </h2>
                      {isEditing ? (
                          <div>
                              <input 
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white focus:border-nexus-primary outline-none"
                                value={formData.skills}
                                onChange={e => setFormData({...formData, skills: e.target.value})}
                                placeholder="React, Node.js, Docker... (séparés par des virgules)"
                              />
                          </div>
                      ) : (
                          <div className="flex flex-wrap gap-2">
                             {user.skills.length > 0 ? user.skills.map(skill => (
                                <span key={skill} className="bg-white/5 border border-white/5 text-gray-300 px-3 py-1.5 rounded-lg text-sm font-medium hover:border-nexus-primary/50 hover:text-white transition-colors cursor-default">
                                   {skill}
                                </span>
                             )) : (
                                <span className="text-gray-500 italic text-sm">Aucune compétence listée</span>
                             )}
                          </div>
                      )}
                   </section>
              </div>
          </div>

          {/* RIGHT COLUMN: Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
              
              {/* TJM Card */}
              <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                      <DollarSign size={80} className="text-white" />
                  </div>
                  <div className="mb-4">
                      <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Tarif Journalier</span>
                      <div className="flex items-baseline gap-1 mt-1">
                          {isEditing ? (
                              <input 
                                type="number"
                                className="text-3xl font-bold text-white w-32 bg-transparent border-b border-white/20 focus:border-nexus-primary outline-none"
                                value={formData.hourlyRate}
                                onChange={e => setFormData({...formData, hourlyRate: Number(e.target.value)})}
                              />
                          ) : (
                              <span className="text-4xl font-mono font-bold text-white">{user.hourlyRate || 0} €</span>
                          )}
                          <span className="text-gray-500 font-medium">/ jour</span>
                      </div>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-white/10">
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Niveau</span>
                          <span className="text-nexus-accent font-bold">{user.rank || 'Nouveau'}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Projets réalisés</span>
                          <span className="text-white font-bold">{user.projectsCount || 0}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Note moyenne</span>
                          <div className="flex items-center gap-1 text-amber-400 font-bold">
                              <Star size={14} fill="currentColor" /> {user.rating || '-'}
                          </div>
                      </div>
                  </div>
              </div>

              {/* Socials / Contact */}
              <div className="bg-nexus-surface border border-white/10 rounded-2xl p-6">
                  <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Présence en ligne</h3>
                  
                  {isEditing ? (
                      <div className="space-y-3">
                          <div className="flex items-center gap-3 bg-black/20 p-2 rounded-lg border border-white/5">
                              <Globe size={18} className="text-gray-400" />
                              <input 
                                  value={formData.website}
                                  onChange={e => setFormData({...formData, website: e.target.value})}
                                  className="bg-transparent text-sm text-white w-full outline-none placeholder-gray-600"
                                  placeholder="Site web"
                              />
                          </div>
                          <div className="flex items-center gap-3 bg-black/20 p-2 rounded-lg border border-white/5">
                              <Github size={18} className="text-gray-400" />
                              <input 
                                  value={formData.github}
                                  onChange={e => setFormData({...formData, github: e.target.value})}
                                  className="bg-transparent text-sm text-white w-full outline-none placeholder-gray-600"
                                  placeholder="Github URL"
                              />
                          </div>
                          <div className="flex items-center gap-3 bg-black/20 p-2 rounded-lg border border-white/5">
                              <Linkedin size={18} className="text-gray-400" />
                              <input 
                                  value={formData.linkedin}
                                  onChange={e => setFormData({...formData, linkedin: e.target.value})}
                                  className="bg-transparent text-sm text-white w-full outline-none placeholder-gray-600"
                                  placeholder="LinkedIn URL"
                              />
                          </div>
                      </div>
                  ) : (
                      <div className="space-y-2">
                          {user.website && (
                              <a href={user.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                                  <Globe size={18} /> <span className="text-sm truncate">{user.website}</span>
                              </a>
                          )}
                          {user.github && (
                              <a href={user.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                                  <Github size={18} /> <span className="text-sm">Github Profile</span>
                              </a>
                          )}
                          {user.linkedin && (
                              <a href={user.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                                  <Linkedin size={18} /> <span className="text-sm">LinkedIn Profile</span>
                              </a>
                          )}
                          {!user.website && !user.github && !user.linkedin && (
                              <p className="text-sm text-gray-500 italic p-2">Aucun réseau renseigné.</p>
                          )}
                      </div>
                  )}
              </div>

              {/* Completion Widget */}
              <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white">Complétion du profil</h3>
                      <span className="font-mono font-bold text-nexus-primary">{user.profileCompletion}%</span>
                  </div>
                  <div className="w-full bg-black/40 h-2 rounded-full mb-4 overflow-hidden">
                      <div className="bg-nexus-primary h-full rounded-full transition-all duration-1000" style={{ width: `${user.profileCompletion}%` }}></div>
                  </div>
                  <p className="text-xs text-indigo-200">
                      Un profil complet à 100% augmente vos chances d'être contacté de 3x.
                  </p>
                  {user.profileCompletion < 100 && (
                      <button onClick={startEditing} className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white transition-colors">
                          Compléter maintenant
                      </button>
                  )}
              </div>
          </div>
       </div>
    </div>
  );
};

export default Profile;