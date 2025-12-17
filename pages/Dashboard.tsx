import React from 'react';
import { useData } from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Code, ArrowUpRight, Zap, Target, Star
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, projects, freelancers, formatMoney } = useData();
  const navigate = useNavigate();
  
  if (!user) return null;

  const recentProjects = projects.slice(0, 3);
  const topFreelancers = freelancers.slice(0, 3);

  // SVG Chart Data Points (Normalized 0-100)
  const points = [
      [0, 60],
      [16.6, 70],
      [33.3, 40],
      [50, 55],
      [66.6, 20],
      [83.3, 45],
      [100, 35]
  ];

  const linePath = `M ${points.map(p => `${p[0]},${p[1]}`).join(' L ')}`;
  const areaPath = `${linePath} L 100,100 L 0,100 Z`;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* HERO / WELCOME HUD */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-nexus-surface p-8 lg:p-12 shadow-xl dark:shadow-none">
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-nexus-primary/10 dark:bg-nexus-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
         <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-nexus-accent/10 rounded-full blur-[80px]"></div>

         <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-nexus-success rounded-full animate-ping"></span>
                    <span className="text-xs font-mono text-nexus-success tracking-widest uppercase">Système Opérationnel</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white mb-4">
                    Bienvenue, <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-primary to-nexus-accent">{user.name.split(' ')[0]}</span>.
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl text-lg">
                    Le Nexus est actif. {projects.length} nouvelles opportunités correspondent à votre matrice de compétences.
                </p>
                <div className="flex gap-4 mt-8">
                    <button onClick={() => navigate('/projets')} className="bg-slate-900 dark:bg-white text-white dark:text-black font-bold py-3 px-6 rounded-lg hover:bg-nexus-primary dark:hover:bg-nexus-accent hover:text-white transition-all flex items-center gap-2">
                        Explorer le Flux <ArrowRight size={18} />
                    </button>
                    <button onClick={() => navigate('/publish-project')} className="bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-all flex items-center gap-2">
                        Initier un Projet
                    </button>
                </div>
            </div>

            {/* AI MATCHING VISUALIZATION */}
            <div className="hidden lg:block w-80 bg-gray-50 dark:bg-black/40 backdrop-blur-md rounded-xl border border-gray-200 dark:border-white/10 p-4 relative">
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-nexus-accent"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-nexus-accent"></div>
                
                <h3 className="text-xs font-mono text-gray-500 mb-3 uppercase flex justify-between">
                    <span>Performance Réseau</span>
                    <span className="text-nexus-accent">LIVE</span>
                </h3>
                <div className="h-32 w-full">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path 
                            d={areaPath} 
                            fill="url(#chartGradient)" 
                        />
                        <path 
                            d={linePath} 
                            fill="none" 
                            stroke="#06b6d4" 
                            strokeWidth="2" 
                            vectorEffect="non-scaling-stroke" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                        />
                        {/* Data Points */}
                        {points.map((p, i) => (
                             <circle key={i} cx={p[0]} cy={p[1]} r="1.5" fill="#fff" stroke="#06b6d4" strokeWidth="0.5" />
                        ))}
                    </svg>
                </div>
                <div className="flex justify-between text-xs mt-2 font-mono">
                    <span className="text-gray-500">Vues Profil</span>
                    <span className="text-gray-900 dark:text-white font-bold">+12%</span>
                </div>
            </div>
         </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white dark:bg-nexus-surface border border-gray-200 dark:border-white/5 p-6 rounded-2xl relative group hover:border-nexus-primary/50 transition-colors shadow-sm">
            <div className="absolute top-4 right-4 bg-nexus-primary/10 p-2 rounded-lg text-nexus-primary group-hover:text-white group-hover:bg-nexus-primary transition-all">
                <Target size={20} />
            </div>
            <div className="text-gray-500 text-sm font-medium mb-1">Projets Réalisés</div>
            <div className="text-4xl font-display font-bold text-gray-900 dark:text-white">{user.projectsCount || 0}</div>
            <div className="mt-4 h-1 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-nexus-primary w-[70%] relative">
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[2px]"></div>
                </div>
            </div>
         </div>

         <div className="bg-white dark:bg-nexus-surface border border-gray-200 dark:border-white/5 p-6 rounded-2xl relative group hover:border-nexus-accent/50 transition-colors shadow-sm">
            <div className="absolute top-4 right-4 bg-nexus-accent/10 p-2 rounded-lg text-nexus-accent group-hover:text-white group-hover:bg-nexus-accent transition-all">
                <Zap size={20} />
            </div>
            <div className="text-gray-500 text-sm font-medium mb-1">TJM Moyen</div>
            <div className="text-4xl font-display font-bold text-gray-900 dark:text-white">{formatMoney(user.hourlyRate || 0)}</div>
            <div className="mt-4 flex gap-2 text-xs font-mono text-nexus-success">
                <ArrowUpRight size={14} /> +5.4% vs mois dernier
            </div>
         </div>

         <div className="bg-gradient-to-br from-gray-100 to-indigo-100 dark:from-nexus-surface dark:to-nexus-primary/20 border border-gray-200 dark:border-white/5 p-6 rounded-2xl relative flex flex-col justify-center items-center text-center cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => navigate('/publish-project')}>
             <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mb-3 shadow-lg">
                 <Code size={24} />
             </div>
             <h3 className="text-gray-900 dark:text-white font-bold text-lg">Générer un Brief IA</h3>
             <p className="text-gray-500 text-xs mt-1">Laissez le Nexus structurer votre projet.</p>
         </div>
      </div>

      {/* RECENT FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-4">
             <div className="flex justify-between items-center mb-2">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white font-display">Flux de Mission</h2>
                 <Link to="/projets" className="text-xs font-mono text-nexus-accent hover:underline">VOIR TOUT_</Link>
             </div>
             
             {recentProjects.length > 0 ? recentProjects.map((project, idx) => (
                 <div key={project.id} className="group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:border-nexus-primary/50 hover:bg-gray-50 dark:hover:bg-white/10 p-5 rounded-xl transition-all cursor-pointer flex justify-between items-start" style={{ animationDelay: `${idx * 100}ms` }}>
                     <div>
                         <div className="flex items-center gap-2 mb-1">
                             <span className="bg-nexus-primary/20 text-nexus-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">{project.clientId}</span>
                             <span className="text-gray-500 text-xs font-mono">{project.date}</span>
                         </div>
                         <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-nexus-primary transition-colors">{project.title}</h3>
                         <div className="flex gap-2 mt-3">
                             {project.skills.slice(0,3).map(s => (
                                 <span key={s} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-black/30 px-2 py-1 rounded border border-gray-200 dark:border-white/5">{s}</span>
                             ))}
                         </div>
                     </div>
                     <div className="text-right">
                         <div className="text-nexus-accent font-bold font-mono">{formatMoney(project.budget.max)}</div>
                         <div className="text-gray-500 text-xs uppercase">Budget Max</div>
                     </div>
                 </div>
             )) : (
                <div className="p-10 text-center bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl text-gray-500">
                    Aucune mission récente. Postez un projet pour commencer.
                </div>
             )}
         </div>

         <div className="bg-white dark:bg-nexus-surface border border-gray-200 dark:border-white/5 rounded-2xl p-6 h-fit shadow-sm">
             <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-white/10 pb-2">Top Talents Nexus</h3>
             <div className="space-y-4">
                 {topFreelancers.length > 0 ? topFreelancers.map((freelancer, i) => (
                     <div 
                        key={freelancer.id} 
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => navigate(`/prestataires/${freelancer.id}`)}
                     >
                         <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-white/10 relative overflow-hidden">
                             <img src={freelancer.avatar} alt={freelancer.name} className="w-full h-full object-cover" />
                         </div>
                         <div className="flex-1 min-w-0">
                             <div className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-nexus-primary transition-colors">{freelancer.name}</div>
                             <div className="text-xs text-gray-500 truncate">{freelancer.tagline}</div>
                         </div>
                         <div className="text-xs font-mono text-nexus-success flex items-center gap-1">
                             <Star size={10} fill="currentColor" className="text-amber-500" />
                             {freelancer.rating}
                         </div>
                     </div>
                 )) : (
                    <div className="text-xs text-gray-500 italic text-center py-4">
                        La base de talents est actuellement vide.
                    </div>
                 )}
             </div>
             <button onClick={() => navigate('/prestataires')} className="w-full mt-6 py-2 border border-gray-200 dark:border-white/10 rounded-lg text-xs text-gray-500 hover:text-nexus-primary dark:hover:text-white hover:border-nexus-primary dark:hover:border-white/30 transition-colors uppercase tracking-widest">
                 Accéder à la base
             </button>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;