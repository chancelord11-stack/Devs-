import React from 'react';
import { useLocation } from 'react-router-dom';
import { ShieldCheck, Scale } from 'lucide-react';

const Legal: React.FC = () => {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('confidentialite');

  return (
    <div className="max-w-3xl mx-auto py-12 animate-fade-in text-gray-300">
      <div className="mb-12 text-center">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
              {isPrivacy ? <ShieldCheck size={32} className="text-nexus-success" /> : <Scale size={32} className="text-nexus-primary" />}
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
              {isPrivacy ? 'Politique de Confidentialité' : 'Conditions Générales'}
          </h1>
          <p className="text-gray-500">Dernière mise à jour : 24 Octobre 2025</p>
      </div>

      <div className="bg-nexus-surface border border-white/10 rounded-2xl p-8 space-y-8">
          <section>
              <h2 className="text-xl font-bold text-white mb-4">1. Préambule</h2>
              <p className="leading-relaxed">
                  Bienvenue sur Nexus AfriTech. En accédant à notre écosystème numérique, vous acceptez tacitement les protocoles de sécurité et les standards de qualité définis ci-après. 
                  Nous nous engageons à protéger l'intégrité de vos données grâce à un cryptage de bout en bout.
              </p>
          </section>

          <section>
              <h2 className="text-xl font-bold text-white mb-4">2. {isPrivacy ? 'Collecte des Données' : 'Utilisation des Services'}</h2>
              <p className="leading-relaxed">
                  {isPrivacy 
                    ? "Nous collectons uniquement les métadonnées nécessaires au bon fonctionnement du matching algorithmique. Vos identifiants biométriques et bancaires sont stockés dans des coffres-forts numériques décentralisés." 
                    : "L'utilisation de la plateforme est strictement réservée aux professionnels vérifiés. Tout comportement jugé toxique par notre IA de modération entraînera une suspension immédiate du compte (Ban Hammer Protocol)."}
              </p>
          </section>

          <section>
              <h2 className="text-xl font-bold text-white mb-4">3. {isPrivacy ? 'Partage avec Tiers' : 'Propriété Intellectuelle'}</h2>
              <p className="leading-relaxed">
                  {isPrivacy
                    ? "Aucune donnée n'est revendue. Le Nexus finance son infrastructure via les commissions de transaction, garantissant ainsi une neutralité totale."
                    : "Le code produit via le Nexus appartient au client dès la libération des fonds (Escrow). Les talents conservent le droit moral sur leurs créations."}
              </p>
          </section>
      </div>
    </div>
  );
};

export default Legal;