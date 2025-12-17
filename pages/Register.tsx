import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Terminal, Lock, Mail, User, ArrowRight, Loader2, Eye, EyeOff, Briefcase, Code, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

type AccountType = 'client' | 'freelance';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [accountType, setAccountType] = useState<AccountType>('client');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Metadata to store the account type
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { 
            name: name,
            type: accountType
        }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      addToast("Compte créé avec succès ! Vérifiez votre email.", "success");
      // In a real app, we wait for email verification. For this demo flow, we might redirect after a delay.
      setTimeout(() => {
          navigate('/login');
      }, 3000);
    }
  };

  if (success) {
      return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Inscription réussie !</h2>
                <p className="text-slate-600 mb-6">
                    Un email de confirmation a été envoyé à <strong>{email}</strong>. 
                    Veuillez cliquer sur le lien pour valider votre compte {accountType === 'client' ? 'Client' : 'Prestataire'}.
                </p>
                <Link to="/login" className="block w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-indigo-600 transition-colors">
                    Retour à la connexion
                </Link>
            </div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 relative z-10 overflow-y-auto">
        <div className="mx-auto w-full max-w-sm lg:w-[450px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                 <Terminal size={20} strokeWidth={3} />
            </div>
            <span className="font-bold text-2xl text-slate-900 tracking-tight">AfriTech</span>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Créer un compte
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Déjà membre ?{' '}
              <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
                Connexion
              </Link>
            </p>
          </div>

          <div className="mt-8">
            {/* Account Type Selector */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                    type="button"
                    onClick={() => setAccountType('client')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${accountType === 'client' ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-200 hover:border-slate-300'}`}
                >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${accountType === 'client' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <Briefcase size={16} />
                    </div>
                    <div className="font-bold text-slate-900 text-sm">Client</div>
                    <p className="text-[10px] text-slate-500 mt-1 leading-tight">Je veux poster des projets.</p>
                </button>

                <button 
                    type="button"
                    onClick={() => setAccountType('freelance')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${accountType === 'freelance' ? 'border-nexus-primary/80 bg-purple-50 ring-1 ring-purple-500' : 'border-slate-200 hover:border-slate-300'}`}
                >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${accountType === 'freelance' ? 'bg-nexus-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <Code size={16} />
                    </div>
                    <div className="font-bold text-slate-900 text-sm">Prestataire</div>
                    <p className="text-[10px] text-slate-500 mt-1 leading-tight">Je veux réaliser des missions.</p>
                </button>
            </div>

            {/* Info Box based on selection */}
            <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm text-slate-600">
                {accountType === 'client' ? (
                    <p>
                        <span className="font-bold text-slate-900">Profil Client :</span> L'inscription est <span className="text-emerald-600 font-bold">100% gratuite</span>. Postez vos projets et recevez des offres de l'élite tech africaine.
                    </p>
                ) : (
                    <p>
                        <span className="font-bold text-slate-900">Profil Prestataire :</span> Inscription gratuite. Un abonnement sera nécessaire pour envoyer des devis et accéder aux missions premium.
                    </p>
                )}
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">
                  Pseudo / Nom complet
                </label>
                <div className="relative">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none block w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium"
                      placeholder={accountType === 'client' ? "Nom de votre entreprise" : "Votre nom ou pseudo"}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                    </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">
                  Adresse email
                </label>
                <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-medium"
                      placeholder="contact@exemple.com"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all pr-12 font-medium"
                    placeholder="Min. 6 caractères"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                     {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-lg">
                  <p className="text-sm text-rose-700 font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/20 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all transform hover:scale-[1.01] ${accountType === 'client' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-900 hover:bg-slate-800'}`}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Créer mon compte {accountType === 'client' ? 'Client' : 'Prestataire'} <ArrowRight size={18}/></>}
              </button>
              
              <p className="text-xs text-center text-slate-500 mt-4 leading-relaxed">
                 En vous inscrivant comme {accountType === 'client' ? 'client' : 'prestataire'}, vous acceptez nos CGU et confirmez avoir lu notre Politique de Confidentialité.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className={`hidden lg:block relative flex-1 ${accountType === 'client' ? 'bg-indigo-900' : 'bg-slate-900'} transition-colors duration-500`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
        {/* Background Image changes based on role */}
        <div 
            className={`absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-40 transition-opacity duration-500 ${accountType === 'client' ? "bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')]" : "bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')]"}`}
        ></div>
        
        <div className="absolute inset-0 flex flex-col justify-center p-20 z-10">
           <h2 className="text-4xl font-extrabold text-white mb-6 tracking-tight">
               {accountType === 'client' ? "Trouvez les talents qui feront la différence." : "Votre expertise mérite les meilleurs projets."}
           </h2>
           
           <div className="space-y-8">
              <div className="flex items-start gap-4">
                 <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm shadow-inner border border-white/10">
                    {accountType === 'client' ? <User className="text-indigo-300" size={24} /> : <Code className="text-nexus-accent" size={24} />}
                 </div>
                 <div>
                    <h3 className="font-bold text-white text-lg">
                        {accountType === 'client' ? 'Postez vos missions gratuitement' : 'Accès aux missions exclusives'}
                    </h3>
                    <p className="text-indigo-200 mt-1 max-w-md">
                        {accountType === 'client' 
                            ? "Décrivez votre besoin. Notre IA vous connecte aux meilleurs profils freelances en quelques minutes." 
                            : "Développez votre carrière en travaillant avec des startups vérifiées et des grands comptes internationaux."}
                    </p>
                 </div>
              </div>

              <div className="flex items-start gap-4">
                 <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm shadow-inner border border-white/10">
                    <Lock className="text-emerald-300" size={24} />
                 </div>
                 <div>
                    <h3 className="font-bold text-white text-lg">Sécurité Garantie</h3>
                    <p className="text-indigo-200 mt-1 max-w-md">
                        {accountType === 'client'
                            ? "Ne payez que lorsque le travail est validé. Vos fonds sont sécurisés."
                            : "Paiement garanti pour chaque livrable validé. Fini les impayés."}
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Register;