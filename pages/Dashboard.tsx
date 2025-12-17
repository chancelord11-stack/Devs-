import React from 'react';
import { useData } from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Code, ArrowUpRight, Zap, Target
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, projects } = useData();
  const navigate = useNavigate();
  
  if (!user) return null;

  const recentProjects = projects.slice(0, 3);

  // SVG Chart Data Points (Normalized 0-100)
  // Data: 40, 30, 60, 45, 80, 55, 65
  // Y-coords (100 - value): 60, 70, 40, 55, 20, 45, 35
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
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-nexus-surface p-8 lg:p-12">
         {/* Background Decoration */}
         <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-nexus-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
         <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-nexus-accent/10 rounded-full blur-[80px]"></div>

         <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-nexus-success rounded-full animate-ping"></span>
                    <span className="text-xs font-mono text-nexus-success tracking-widest uppercase">Système Opérationnel</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                    Bienvenue, <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-primary to-nexus-accent">{user.name.split(' ')[0]}</span>.
                </h1>
                <p className="text-gray-400 max-w-xl text-lg">
                    Le Nexus a détecté <span className="text-white font-bold">5 nouvelles opportunités</span> correspondant à votre matrice de compétences.
                </p>
                <div className="flex gap-4 mt-8">
                    <button onClick={() => navigate('/projets')} className="bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-nexus-accent hover:text-white transition-all flex items-center gap-2">
                        Explorer le Flux <ArrowRight size={18} />
                    </button>
                    <button onClick={() => navigate('/publish-project')} className="bg-white/5 text-white font-bold py-3 px-6 rounded-lg border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2">
                        Initier un Projet
                    </button>
                </div>
            </div>

            {/* AI MATCHING VISUALIZATION */}
            <div className="hidden lg:block w-80 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-4 relative">
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
                    <span className="text-gray-400">Vues Profil</span>
                    <span className="text-white font-bold">+12%</span>
                </div>
            </div>
         </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-nexus-surface border border-white/5 p-6 rounded-2xl relative group hover:border-nexus-primary/50 transition-colors">
            <div className="absolute top-4 right-4 bg-nexus-primary/10 p-2 rounded-lg text-nexus-primary group-hover:text-white group-hover:bg-nexus-primary transition-all">
                <Target size={20} />
            </div>
            <div className="text-gray-400 text-sm font-medium mb-1">Projets Réalisés</div>
            <div className="text-4xl font-display font-bold text-white">{user.projectsCount || 0}</div>
            <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-nexus-primary w-[70%] relative">
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white blur-[2px]"></div>
                </div>
            </div>
         </div>

         <div className="bg-nexus-surface border border-white/5 p-6 rounded-2xl relative group hover:border-nexus-accent/50 transition-colors">
            <div className="absolute top-4 right-4 bg-nexus-accent/10 p-2 rounded-lg text-nexus-accent group-hover:text-white group-hover:bg-nexus-accent transition-all">
                <Zap size={20} />
            </div>
            <div className="text-gray-400 text-sm font-medium mb-1">TJM Moyen</div>
            <div className="text-4xl font-display font-bold text-white">{user.hourlyRate} €</div>
            <div className="mt-4 flex gap-2 text-xs font-mono text-nexus-success">
                <ArrowUpRight size={14} /> +5.4% vs mois dernier
            </div>
         </div>

         <div className="bg-gradient-to-br from-nexus-surface to-nexus-primary/20 border border-white/5 p-6 rounded-2xl relative flex flex-col justify-center items-center text-center cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => navigate('/publish-project')}>
             <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                 <Code size={24} />
             </div>
             <h3 className="text-white font-bold text-lg">Générer un Brief IA</h3>
             <p className="text-gray-400 text-xs mt-1">Laissez le Nexus structurer votre projet.</p>
         </div>
      </div>

      {/* RECENT FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-4">
             <div className="flex justify-between items-center mb-2">
                 <h2 className="text-xl font-bold text-white font-display">Flux de Mission</h2>
                 <Link to="/projets" className="text-xs font-mono text-nexus-accent hover:underline">VOIR TOUT_</Link>
             </div>
             
             {recentProjects.map((project, idx) => (
                 <div key={project.id} className="group bg-white/5 border border-white/5 hover:border-nexus-primary/50 hover:bg-white/10 p-5 rounded-xl transition-all cursor-pointer flex justify-between items-start" style={{ animationDelay: `${idx * 100}ms` }}>
                     <div>
                         <div className="flex items-center gap-2 mb-1">
                             <span className="bg-nexus-primary/20 text-nexus-primary text-[10px] font-bold px-2 py-0.5 rounded uppercase">{project.clientId}</span>
                             <span className="text-gray-500 text-xs font-mono">{project.date}</span>
                         </div>
                         <h3 className="text-lg font-bold text-white group-hover:text-nexus-primary transition-colors">{project.title}</h3>
                         <div className="flex gap-2 mt-3">
                             {project.skills.slice(0,3).map(s => (
                                 <span key={s} className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded border border-white/5">{s}</span>
                             ))}
                         </div>
                     </div>
                     <div className="text-right">
                         <div className="text-nexus-accent font-bold font-mono">{project.budget.max} €</div>
                         <div className="text-gray-600 text-xs uppercase">Budget Max</div>
                     </div>
                 </div>
             ))}
         </div>

         <div className="bg-nexus-surface border border-white/5 rounded-2xl p-6 h-fit">
             <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Top Talents Nexus</h3>
             <div className="space-y-4">
                 {[1,2,3].map(i => (
                     <div key={i} className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gray-800 border border-white/10 relative overflow-hidden">
                             <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="" className="w-full h-full object-cover opacity-80" />
                         </div>
                         <div>
                             <div className="text-sm font-bold text-white">Agent {100+i}</div>
                             <div className="text-xs text-gray-500">Fullstack • Paris</div>
                         </div>
                         <div className="ml-auto text-xs font-mono text-nexus-success">98% Match</div>
                     </div>
                 ))}
             </div>
             <button onClick={() => navigate('/prestataires')} className="w-full mt-6 py-2 border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white hover:border-white/30 transition-colors uppercase tracking-widest">
                 Accéder à la base
             </button>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;