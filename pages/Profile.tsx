import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { 
  MapPin, Star, PenTool, Save, X, Camera, Globe, Github, Linkedin, 
  Briefcase, Code2, AlertCircle, DollarSign, Clock 
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const Profile: React.FC = () => {
  const { user, updateUserProfile } = useData();
  const { addToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    addToast("Profil mis à jour avec succès !", "success");
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            updateUserProfile({ avatar: base64String });
            addToast("Photo de profil mise à jour.", "success");
        };
        reader.readAsDataURL(file);
    }
  };

  const DefaultAvatar = () => (
      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-5xl">
         {user.name.charAt(0)}
      </div>
  );

  return (
    <div className="max-w-6xl mx-auto animate-fade-in pb-20">
       
       <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
       />

       {/* Actions Bar */}
       <div className="flex justify-between items-center mb-6">
           <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display hidden sm:block">Mon Profil Public</h1>
           <div className="flex gap-3 ml-auto">
               {isEditing ? (
                   <>
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-white/10 font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors text-sm"
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
              <div className="bg-white dark:bg-nexus-surface border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden relative shadow-sm">
                  {/* Banner */}
                  <div className="h-40 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 relative">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                  </div>

                  <div className="px-8 pb-8">
                      <div className="relative flex flex-col sm:flex-row gap-6 items-end -mt-16">
                          {/* Avatar */}
                          <div className="relative group shrink-0" onClick={handleAvatarClick}>
                              <div className="w-32 h-32 rounded-2xl border-4 border-white dark:border-nexus-surface shadow-2xl overflow-hidden bg-gray-800">
                                  {user.avatar ? (
                                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                  ) : (
                                      <DefaultAvatar />
                                  )}
                              </div>
                              {isEditing && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl backdrop-blur-sm cursor-pointer border-4 border-transparent hover:bg-black/70 transition-colors">
                                      <Camera size={24} className="text-white" />
                                      <span className="absolute bottom-2 text-[10px] text-white font-bold">MODIFIER</span>
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
                                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-xl font-bold text-gray-900 dark:text-white focus:border-nexus-primary outline-none"
                                        placeholder="Votre nom"
                                      />
                                      <input 
                                        type="text" 
                                        value={formData.tagline}
                                        onChange={e => setFormData({...formData, tagline: e.target.value})}
                                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-nexus-primary font-medium focus:border-nexus-primary outline-none"
                                        placeholder="Votre titre (ex: Développeur Fullstack)"
                                      />
                                      <div className="flex items-center gap-2">
                                          <MapPin size={16} className="text-gray-500" />
                                          <input 
                                            type="text" 
                                            value={formData.location}
                                            onChange={e => setFormData({...formData, location: e.target.value})}
                                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:border-nexus-primary outline-none"
                                            placeholder="Votre ville, Pays (ex: Cotonou, Bénin)"
                                          />
                                      </div>
                                  </div>
                              ) : (
                                  <div>
                                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{user.name}</h1>
                                      <p className="text-lg text-nexus-primary font-medium">{user.tagline || 'Membre AfriTech'}</p>
                                      
                                      <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                                          <div className="flex items-center gap-1">
                                              <MapPin size={14} /> 
                                              {user.location || 'Localisation non définie'}
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
              <div className="bg-white dark:bg-nexus-surface border border-gray-200 dark:border-white/10 rounded-2xl p-8 space-y-8 shadow-sm">
                  <section>
                      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-4">
                          <Briefcase className="text-nexus-accent" size={20} /> À propos
                      </h2>
                      {isEditing ? (
                          <>
                            <textarea 
                                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-gray-300 focus:border-nexus-primary outline-none min-h-[150px] leading-relaxed"
                                value={formData.bio}
                                onChange={e => setFormData({...formData, bio: e.target.value})}
                                placeholder="Décrivez votre parcours, vos expertises et ce que vous apportez à vos clients..."
                            />
                            <p className="text-right text-xs text-gray-500 mt-1">Markdown supporté</p>
                          </>
                      ) : (
                          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                            {user.bio || (
                                <div className="flex items-center gap-3 text-gray-500 italic bg-gray-100 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/5">
                                    <AlertCircle size={20} />
                                    Votre bio est vide. Ajoutez une description pour rassurer les clients potentiels.
                                </div>
                            )}
                          </div>
                      )}
                   </section>

                   <section>
                      <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mb-4">
                          <Code2 className="text-nexus-primary" size={20} /> Compétences
                      </h2>
                      {isEditing ? (
                          <div>
                              <input 
                                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 rounded-xl p-3 text-gray-900 dark:text-white focus:border-nexus-primary outline-none"
                                value={formData.skills}
                                onChange={e => setFormData({...formData, skills: e.target.value})}
                                placeholder="React, Node.js, Docker... (séparés par des virgules)"
                              />
                          </div>
                      ) : (
                          <div className="flex flex-wrap gap-2">
                             {user.skills.length > 0 ? user.skills.map(skill => (
                                <span key={skill} className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-lg text-sm font-medium hover:border-nexus-primary/50 hover:text-nexus-primary dark:hover:text-white transition-colors cursor-default">
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
              <div className="bg-white dark:bg-nexus-surface border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 dark:opacity-5">
                      <DollarSign size={80} className="text-black dark:text-white" />
                  </div>
                  <div className="mb-4">
                      <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Tarif Journalier</span>
                      <div className="flex items-baseline gap-1 mt-1">
                          {isEditing ? (
                              <input 
                                type="number"
                                className="text-3xl font-bold text-gray-900 dark:text-white w-32 bg-transparent border-b border-gray-300 dark:border-white/20 focus:border-nexus-primary outline-none"
                                value={formData.hourlyRate}
                                onChange={e => setFormData({...formData, hourlyRate: Number(e.target.value)})}
                              />
                          ) : (
                              <span className="text-4xl font-mono font-bold text-gray-900 dark:text-white">{user.hourlyRate || 0} €</span>
                          )}
                          <span className="text-gray-500 font-medium">/ jour</span>
                      </div>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-white/10">
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Niveau</span>
                          <span className="text-nexus-accent font-bold">{user.rank || 'Nouveau'}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Projets réalisés</span>
                          <span className="text-gray-900 dark:text-white font-bold">{user.projectsCount || 0}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Note moyenne</span>
                          <div className="flex items-center gap-1 text-amber-500 font-bold">
                              <Star size={14} fill="currentColor" /> {user.rating || '-'}
                          </div>
                      </div>
                  </div>
              </div>

              {/* Socials / Contact */}
              <div className="bg-white dark:bg-nexus-surface border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Présence en ligne</h3>
                  
                  {isEditing ? (
                      <div className="space-y-3">
                          <div className="flex items-center gap-3 bg-gray-50 dark:bg-black/20 p-2 rounded-lg border border-gray-200 dark:border-white/5">
                              <Globe size={18} className="text-gray-400" />
                              <input 
                                  value={formData.website}
                                  onChange={e => setFormData({...formData, website: e.target.value})}
                                  className="bg-transparent text-sm text-gray-900 dark:text-white w-full outline-none placeholder-gray-500"
                                  placeholder="Site web"
                              />
                          </div>
                          <div className="flex items-center gap-3 bg-gray-50 dark:bg-black/20 p-2 rounded-lg border border-gray-200 dark:border-white/5">
                              <Github size={18} className="text-gray-400" />
                              <input 
                                  value={formData.github}
                                  onChange={e => setFormData({...formData, github: e.target.value})}
                                  className="bg-transparent text-sm text-gray-900 dark:text-white w-full outline-none placeholder-gray-500"
                                  placeholder="Github URL"
                              />
                          </div>
                          <div className="flex items-center gap-3 bg-gray-50 dark:bg-black/20 p-2 rounded-lg border border-gray-200 dark:border-white/5">
                              <Linkedin size={18} className="text-gray-400" />
                              <input 
                                  value={formData.linkedin}
                                  onChange={e => setFormData({...formData, linkedin: e.target.value})}
                                  className="bg-transparent text-sm text-gray-900 dark:text-white w-full outline-none placeholder-gray-500"
                                  placeholder="LinkedIn URL"
                              />
                          </div>
                      </div>
                  ) : (
                      <div className="space-y-2">
                          {user.website && (
                              <a href={user.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-nexus-primary dark:hover:text-white transition-colors">
                                  <Globe size={18} /> <span className="text-sm truncate">{user.website}</span>
                              </a>
                          )}
                          {user.github && (
                              <a href={user.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-nexus-primary dark:hover:text-white transition-colors">
                                  <Github size={18} /> <span className="text-sm">Github Profile</span>
                              </a>
                          )}
                          {user.linkedin && (
                              <a href={user.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-nexus-primary dark:hover:text-white transition-colors">
                                  <Linkedin size={18} /> <span className="text-sm">LinkedIn Profile</span>
                              </a>
                          )}
                          {!user.website && !user.github && !user.linkedin && (
                              <p className="text-sm text-gray-500 italic p-2">Aucun réseau renseigné.</p>
                          )}
                      </div>
                  )}
              </div>
          </div>
       </div>
    </div>
  );
};

export default Profile;