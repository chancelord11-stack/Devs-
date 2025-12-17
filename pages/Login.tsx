import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowRight, Loader2, Star, Eye, EyeOff, Zap, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithDemo } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (email === 'demo@developpeurs.com' && password === 'demo123') {
        setTimeout(() => {
            loginWithDemo();
            navigate('/dashboard');
        }, 800);
        return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  const fillDemo = () => {
    setEmail('demo@developpeurs.com');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen flex bg-nexus-bg">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 relative z-10 animate-fade-in bg-nexus-bg">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center gap-3 mb-10 group cursor-pointer">
             <div className="w-10 h-10 bg-gradient-to-br from-slate-900 to-indigo-900 text-white rounded-xl flex items-center justify-center shadow-xl shadow-indigo-500/30 group-hover:rotate-12 transition-transform duration-500 border border-white/20">
                 <Zap size={20} className="fill-yellow-400 text-yellow-400" />
            </div>
            <span className="font-black text-2xl text-nexus-text tracking-tight">AfriTech</span>
          </div>

          <div>
            <h2 className="text-4xl font-black text-nexus-text tracking-tight leading-tight mb-2">
              Connexion <br/> Sécurisée.
            </h2>
            <p className="text-nexus-muted font-medium">
              Pas encore inscrit ?{' '}
              <Link to="/register" className="font-bold text-nexus-primary hover:text-orange-500 transition-colors underline decoration-2 decoration-nexus-primary/30 hover:decoration-orange-200">
                Créer un compte
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-nexus-text uppercase tracking-wider mb-2 ml-1">
                  Email professionnel
                </label>
                <div className="relative group">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-5 py-4 bg-nexus-surface border border-nexus-border rounded-2xl placeholder-nexus-muted/50 focus:outline-none focus:ring-2 focus:ring-nexus-primary focus:border-transparent transition-all font-medium text-nexus-text shadow-sm"
                      placeholder="vous@afritech.com"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-nexus-muted group-focus-within:text-nexus-primary transition-colors" />
                    </div>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs font-bold text-nexus-text uppercase tracking-wider mb-2 ml-1">
                  Mot de passe
                </label>
                <div className="relative group">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-5 py-4 bg-nexus-surface border border-nexus-border rounded-2xl placeholder-nexus-muted/50 focus:outline-none focus:ring-2 focus:ring-nexus-primary focus:border-transparent transition-all pr-12 font-medium text-nexus-text shadow-sm"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-nexus-muted hover:text-nexus-text transition-colors cursor-pointer"
                  >
                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-nexus-primary focus:ring-nexus-primary border-nexus-border rounded cursor-pointer bg-nexus-surface"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-nexus-muted font-medium cursor-pointer">
                    Se souvenir
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="flex items-center gap-1 font-bold text-nexus-primary hover:text-orange-500 transition-colors">
                    <Lock size={12} /> Mot de passe oublié ?
                  </Link>
                </div>
              </div>

              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                   <p className="text-sm text-rose-500 font-bold">
                     {error === 'Invalid login credentials' ? 'Identifiants incorrects.' : error}
                   </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-xl shadow-indigo-500/20 text-sm font-bold text-white bg-slate-900 dark:bg-slate-100 dark:text-black hover:bg-nexus-primary dark:hover:bg-nexus-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexus-primary disabled:opacity-50 transition-all transform hover:scale-[1.02] hover:-translate-y-0.5"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Connexion <ArrowRight size={18}/></>}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-nexus-border">
              <button
                onClick={fillDemo}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm font-bold text-amber-600 hover:bg-amber-500/20 transition-all group"
              >
                <Star size={16} className="text-amber-500 fill-amber-500 group-hover:rotate-180 transition-transform duration-500" />
                Tester la démo (Mode Rapide)
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative flex-1 bg-slate-900 overflow-hidden">
        {/* Background Image inspired by African City Lights */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543169862-28aa9c6c21e3?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-indigo-900/50"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>

        <div className="absolute inset-0 flex flex-col justify-end p-24 z-10">
           <div className="max-w-xl">
              <div className="flex gap-2 mb-6">
                  <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/10">Lagos</span>
                  <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/10">Nairobi</span>
                  <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/10">Dakar</span>
              </div>
              <h1 className="text-6xl font-black text-white tracking-tight">
                  Construisez le <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-primary to-orange-500">Futur.</span>
              </h1>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;