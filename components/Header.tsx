import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Bell, MessageSquare, ChevronDown, User as UserIcon, LogOut, Settings, 
  Code2, Plus, Zap, Command, LayoutDashboard, Users, HelpCircle, CreditCard, 
  ShieldCheck, Sun, Moon
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
    `text-sm font-medium transition-all duration-300 px-4 py-2 rounded-lg relative overflow-hidden group ${isActive ? 'text-gray-900 dark:text-white font-bold bg-gray-100 dark:bg-nexus-surface border border-gray-200 dark:border-nexus-border' : 'text-gray-500 dark:text-nexus-muted hover:text-nexus-primary dark:hover:text-white'}`;

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  if (!user) return null;

  const MenuItem = ({ to, icon: Icon, label, badge }: { to: string, icon: any, label: string, badge?: string }) => (
    <Link 
      to={to} 
      onClick={() => setIsDropdownOpen(false)} 
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-nexus-primary/10 text-gray-600 dark:text-nexus-muted hover:text-nexus-primary transition-all group"
    >
       <Icon size={18} className="text-gray-400 group-hover:text-nexus-primary transition-colors" />
       <span className="flex-1 text-sm font-medium">{label}</span>
       {badge && <span className="text-[10px] font-bold bg-nexus-primary/20 text-nexus-primary px-1.5 py-0.5 rounded uppercase">{badge}</span>}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-gray-200 dark:border-nexus-border">
      <div className="container mx-auto px-4 md:px-6 h-18 flex items-center justify-between py-3">
        
        {/* Logo */}
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-nexus-primary blur-md opacity-20 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative w-full h-full bg-white dark:bg-nexus-surface border border-gray-200 dark:border-nexus-border rounded-lg flex items-center justify-center overflow-hidden">
                    <div className="absolute w-[120%] h-[2px] bg-nexus-accent animate-spin origin-center"></div>
                    <div className="absolute inset-[2px] bg-white dark:bg-nexus-surface rounded-md z-10 flex items-center justify-center">
                        <Zap size={14} className="text-black dark:text-white" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-gray-900 dark:text-white leading-none">NEXUS</span>
                <span className="text-[10px] text-nexus-accent tracking-[0.2em] font-mono leading-none mt-1">AFRITECH</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex gap-1 items-center">
            <NavLink to="/dashboard" className={navClass}>Tableau de bord</NavLink>
            <NavLink to="/projets" className={navClass}>Missions</NavLink>
            <NavLink to="/prestataires" className={navClass}>Talents</NavLink>
          </nav>
        </div>

        {/* Right Actions - Unified Menu */}
        <div className="flex items-center gap-3 md:gap-5">
          
          <div className="hidden lg:flex items-center gap-2 text-xs text-gray-500 bg-gray-100 dark:bg-nexus-surface px-3 py-1.5 rounded-md border border-gray-200 dark:border-nexus-border">
            <Command size={10} />
            <span>+ K</span>
          </div>

          <button 
             onClick={toggleTheme}
             className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-nexus-surface transition-all"
             title="Changer de thème"
          >
             {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/publish-project" className="hidden lg:flex items-center gap-2 bg-nexus-primary hover:bg-nexus-primaryHover text-white text-sm font-bold py-2 px-5 rounded-lg transition-all shadow-lg shadow-nexus-primary/20">
            <Plus size={16} />
            <span>Projet</span>
          </Link>

          <div className="flex items-center gap-2 md:gap-3 border-l border-gray-200 dark:border-nexus-border pl-3 md:pl-5 ml-2">
            <Link to="/notifications" className="text-gray-500 dark:text-nexus-muted hover:text-nexus-primary relative p-2 transition-colors hover:bg-gray-100 dark:hover:bg-nexus-surface rounded-lg">
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-nexus-accent rounded-full shadow-[0_0_5px_#06b6d4]"></span>
              )}
            </Link>
            
            <Link to="/messages" className="text-gray-500 dark:text-nexus-muted hover:text-nexus-primary relative p-2 transition-colors hover:bg-gray-100 dark:hover:bg-nexus-surface rounded-lg">
              <MessageSquare size={20} />
              {unreadMessages > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-nexus-primary rounded-full shadow-[0_0_5px_#7c3aed]"></span>
              )}
            </Link>
            
            {/* UNIFIED DROPDOWN */}
            <div className="relative ml-2" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 outline-none group"
              >
                <div className="relative">
                    <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt="User" className="w-9 h-9 rounded-lg object-cover border border-gray-200 dark:border-nexus-border group-hover:border-nexus-accent transition-colors shadow-sm" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-nexus-success rounded-full border-2 border-white dark:border-nexus-bg"></div>
                </div>
                <div className="hidden md:block text-left">
                    <div className="text-xs font-bold text-gray-900 dark:text-white leading-none mb-0.5">{user.name.split(' ')[0]}</div>
                    <ChevronDown size={12} className="text-gray-400" />
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-14 w-72 glass-panel rounded-xl shadow-2xl py-2 text-sm z-50 animate-fade-in border border-gray-200 dark:border-nexus-border overflow-hidden bg-white dark:bg-nexus-bg">
                   
                   <div className="px-4 py-3 border-b border-gray-200 dark:border-nexus-border bg-gray-50 dark:bg-nexus-surface/50">
                      <div className="font-bold text-gray-900 dark:text-white truncate">{user.name}</div>
                      <div className="text-gray-500 text-xs truncate">{user.email}</div>
                   </div>

                   <div className="p-2">
                      <MenuItem to="/profile" icon={UserIcon} label="Mon Profil" />
                      <MenuItem to="/dashboard" icon={LayoutDashboard} label="Tableau de bord" />
                      <MenuItem to="/mes-projets" icon={Code2} label="Mes Projets" />
                      <MenuItem to="/prestataires" icon={Users} label="Base Talents" />
                      
                      <div className="border-t border-gray-200 dark:border-nexus-border my-2 mx-2"></div>
                      
                      <MenuItem to="/billing" icon={CreditCard} label="Finance & Escrow" />
                      <MenuItem to="/settings" icon={Settings} label="Paramètres" />
                      <MenuItem to="/help" icon={HelpCircle} label="Aide" />
                   </div>

                   <div className="mt-1 pt-2 border-t border-gray-200 dark:border-nexus-border bg-gray-50 dark:bg-nexus-surface/50 px-2 pb-2">
                     <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-500 dark:text-nexus-muted hover:text-red-500 transition-colors group"
                     >
                        <LogOut size={16} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                        <span className="flex-1 text-left text-sm font-medium">Déconnexion</span>
                     </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;