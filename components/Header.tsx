import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Bell, MessageSquare, Menu, ChevronDown, User as UserIcon, LogOut, Settings, 
  Code2, Plus, Zap, Command, LayoutDashboard, Users, HelpCircle, CreditCard, 
  Crown, ShieldCheck, Heart, Gift, Megaphone, Sparkles, TrendingUp, Lock, MapPin,
  Sun, Moon
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { notifications, messages } = useData();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = messages.filter(m => m.unread).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const navClass = ({ isActive }: { isActive: boolean }) => 
    `text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg relative overflow-hidden group ${isActive ? 'text-nexus-text font-bold bg-nexus-surface border border-nexus-border' : 'text-nexus-muted hover:text-nexus-text hover:bg-nexus-surface/50'}`;

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (!user) return null;

  // Helper component for menu items
  const MenuItem = ({ to, icon: Icon, label, badge }: { to: string, icon: any, label: string, badge?: string }) => (
    <Link 
      to={to} 
      onClick={() => setIsDropdownOpen(false)} 
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-nexus-primary/10 text-nexus-muted hover:text-nexus-primary transition-all group"
    >
       <Icon size={16} className="text-gray-500 group-hover:text-nexus-primary transition-colors" />
       <span className="flex-1 text-sm font-medium">{label}</span>
       {badge && <span className="text-[10px] font-bold bg-nexus-primary/20 text-nexus-primary px-1.5 py-0.5 rounded uppercase">{badge}</span>}
    </Link>
  );

  const SectionLabel = ({ label }: { label: string }) => (
    <div className="px-3 py-1 mt-2 mb-1 text-[10px] font-bold text-nexus-muted uppercase tracking-wider">
      {label}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-nexus-border">
      <div className="container mx-auto px-6 h-18 flex items-center justify-between py-3">
        
        {/* Abstract Dynamic Logo */}
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-nexus-primary blur-md opacity-20 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-full h-full bg-nexus-surface border border-nexus-border rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="absolute w-[120%] h-[2px] bg-nexus-accent animate-spin origin-center"></div>
                    <div className="absolute inset-[2px] bg-nexus-surface rounded-md z-10 flex items-center justify-center">
                        <Zap size={14} className="text-nexus-text" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-nexus-text leading-none">NEXUS</span>
                <span className="text-[10px] text-nexus-accent tracking-[0.2em] font-mono leading-none mt-1">AFRITECH</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex gap-1 items-center">
            <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
            
            {/* Logic based on Role */}
            {user.type === 'client' ? (
                <>
                    <NavLink to="/prestataires" className={navClass}>Trouver un Freelance</NavLink>
                    <NavLink to="/mes-projets" className={navClass}>Mes Projets</NavLink>
                </>
            ) : (
                <>
                     <NavLink to="/projets" className={navClass}>Trouver une Mission</NavLink>
                     <NavLink to="/mes-projets" className={navClass}>Mes Offres</NavLink>
                </>
            )}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">
          
          {/* Omnibox Trigger Hint */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-nexus-muted bg-nexus-surface px-3 py-1.5 rounded-md border border-nexus-border">
            <Command size={10} />
            <span>+ K</span>
          </div>

          <button 
             onClick={toggleTheme}
             className="p-2 rounded-lg text-nexus-muted hover:text-nexus-text hover:bg-nexus-surface border border-transparent hover:border-nexus-border transition-all"
             title="Changer de thème"
          >
             {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Only Clients or Verified Freelancers usually post projects, but let's allow Client mainly */}
          {user.type === 'client' && (
              <Link to="/publish-project" className="hidden lg:flex items-center gap-2 bg-nexus-primary hover:bg-nexus-primaryHover text-white text-sm font-bold py-2 px-5 rounded-lg transition-all shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] border border-white/10">
                <Plus size={16} />
                <span>Publier</span>
              </Link>
          )}

          <div className="flex items-center gap-3 border-l border-nexus-border pl-5 ml-2">
            <Link to="/notifications" className="text-nexus-muted hover:text-nexus-text relative p-2 transition-colors hover:bg-nexus-surface rounded-lg" title="Notifications">
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-nexus-accent rounded-full shadow-[0_0_5px_#06b6d4]"></span>
              )}
            </Link>
            <Link to="/messages" className="text-nexus-muted hover:text-nexus-text relative p-2 transition-colors hover:bg-nexus-surface rounded-lg" title="Messages">
              <MessageSquare size={20} />
              {unreadMessages > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-nexus-primary rounded-full shadow-[0_0_5px_#7c3aed]"></span>
              )}
            </Link>
            
            <div className="relative ml-2" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 outline-none group"
              >
                <div className="relative">
                    <img src={user.avatar} alt="User" className="w-9 h-9 rounded-lg object-cover border border-nexus-border group-hover:border-nexus-accent transition-colors" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-nexus-success rounded-full border-2 border-nexus-bg"></div>
                </div>
                <ChevronDown size={14} className="text-nexus-muted group-hover:text-nexus-text transition-transform duration-300" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-16 w-80 glass-panel rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-2 text-sm z-50 animate-fade-in border border-nexus-border overflow-hidden">
                   
                   {/* User Header */}
                   <div className="px-4 py-3 border-b border-nexus-border bg-nexus-surface flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-nexus-primary/20 text-nexus-primary flex items-center justify-center font-bold text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-nexus-text font-display truncate">{user.name}</div>
                        <div className="text-nexus-muted text-xs font-mono truncate">{user.email}</div>
                        <div className="text-[10px] uppercase font-bold text-nexus-accent mt-0.5">{user.type === 'client' ? 'Compte Client' : 'Compte Freelance'}</div>
                      </div>
                   </div>

                   {/* Scrollable Content */}
                   <div className="max-h-[60vh] overflow-y-auto custom-scrollbar px-1 py-2">
                      <MenuItem to="/dashboard" icon={LayoutDashboard} label="Tableau de bord" />
                      
                      <div className="border-t border-nexus-border my-2 mx-2"></div>
                      
                      <SectionLabel label="Mon Activité" />
                      {user.type === 'client' ? (
                          <>
                            <MenuItem to="/mes-projets" icon={Code2} label="Mes Projets" />
                            <MenuItem to="/prestataires" icon={Users} label="Base de Talents" />
                            <MenuItem to="/billing" icon={CreditCard} label="Factures" />
                          </>
                      ) : (
                          <>
                            <MenuItem to="/projets" icon={Code2} label="Chercher Mission" />
                            <MenuItem to="/mes-projets" icon={ShieldCheck} label="Candidatures" />
                            <MenuItem to="/profile" icon={UserIcon} label="Mon CV en ligne" />
                          </>
                      )}

                      <div className="border-t border-nexus-border my-2 mx-2"></div>

                      <SectionLabel label="Paramètres" />
                      <div className="space-y-0.5">
                        <MenuItem to="/profile" icon={UserIcon} label="Éditer Profil" />
                        <MenuItem to="/settings" icon={Settings} label="Préférences" />
                        <MenuItem to="/help" icon={HelpCircle} label="Aide & Support" />
                      </div>
                   </div>

                   {/* Footer */}
                   <div className="mt-1 pt-2 border-t border-nexus-border bg-nexus-surface/50 px-2 pb-1">
                     <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-nexus-muted hover:text-red-400 transition-colors group"
                     >
                        <LogOut size={16} className="group-hover:text-red-400 text-gray-500 transition-colors" />
                        <span className="flex-1 text-left text-sm font-medium">Déconnexion</span>
                     </button>
                   </div>
                </div>
              )}
            </div>
          </div>
          
          <button className="md:hidden text-nexus-text p-2">
            <Menu strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;