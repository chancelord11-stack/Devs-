import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Terminal, Mail, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    await supabase.auth.resetPasswordForEmail(email);
    
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                 <Terminal size={24} strokeWidth={3} />
            </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Réinitialisation
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/60 border border-slate-100 sm:rounded-2xl sm:px-10">
          
          {sent ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 mb-4">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg leading-6 font-bold text-slate-900">Email envoyé</h3>
              <p className="mt-2 text-sm text-slate-500">
                Si un compte existe avec l'adresse {email}, vous recevrez un lien pour réinitialiser votre mot de passe.
              </p>
              <div className="mt-6">
                <Link to="/login" className="w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all">
                  Retour à la connexion
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 mb-6 font-medium">
                Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
              </p>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">
                    Adresse email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 border-slate-200 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 py-3 border font-medium bg-slate-50 focus:bg-white transition-colors"
                      placeholder="vous@exemple.com"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/20 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-0.5"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Envoyer le lien'}
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <Link to="/login" className="flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                   <ArrowLeft size={16} /> Retour à la connexion
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;