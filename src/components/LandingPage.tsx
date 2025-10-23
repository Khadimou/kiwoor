'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  Shield, 
  Users, 
  CheckCircle, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Star, 
  AlertCircle, 
  Video, 
  FileText, 
  MessageCircle 
} from 'lucide-react';

interface FormData {
  // Champs communs
  fullName: string;
  email: string;
  phone: string;
  country: string;
  
  // Champs diaspora (employeur)
  jobType: string;
  location: string;
  salary: string;
  startDate: string;
  urgency: string;
  
  // Champs local (chercheur)
  experience: string;
  availability: string;
  hasReferences: string;
  
  // Feedback
  willingToPay: string;
  maxBudget: string;
  mainConcern: string;
  comments: string;
}

export default function LandingPage() {
  const [userType, setUserType] = useState<'' | 'diaspora' | 'local'>('');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    jobType: '',
    location: '',
    salary: '',
    startDate: '',
    urgency: '',
    experience: '',
    availability: '',
    hasReferences: '',
    willingToPay: '',
    maxBudget: '',
    mainConcern: '',
    comments: ''
  });

  const handleUserTypeSelect = (type: 'diaspora' | 'local') => {
    setUserType(type);
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Envoyer les données à l'API
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userType,
          ...formData
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Données sauvegardées avec succès');
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.error('Erreur lors de la sauvegarde:', result.message);
        alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur de connexion. Veuillez réessayer.');
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Merci ! Vous êtes inscrit(e) 🎉
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            {userType === 'diaspora' 
              ? "Nous avons bien reçu votre demande. Notre équipe va analyser votre besoin et vous contacter sous 48h avec des profils correspondants."
              : "Votre profil a été enregistré ! Nous vous contacterons dès qu'une opportunité correspondant à votre profil sera disponible."
            }
          </p>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-green-900 mb-3">📱 Prochaines étapes :</h3>
            <ul className="text-left space-y-2 text-green-800">
              {userType === 'diaspora' ? (
                <>
                  <li>✅ Vérification de votre demande (24h)</li>
                  <li>✅ Sélection de profils adaptés à vos besoins</li>
                  <li>✅ Entretien téléphonique pour affiner le profil recherché</li>
                  <li>✅ Présentation de 3-5 candidats vérifiés</li>
                </>
              ) : (
                <>
                  <li>✅ Vérification de vos documents</li>
                  <li>✅ Validation de vos références</li>
                  <li>✅ Création de votre profil sur la plateforme</li>
                  <li>✅ Mise en relation avec employeurs potentiels</li>
                </>
              )}
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>🎁 Offre de lancement :</strong> Les 20 premières personnes inscrites bénéficient de <strong>50% de réduction</strong> sur les frais de service !
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Retour à l&apos;accueil
          </button>

          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-600 mb-3">Aidez-nous à grandir :</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Partager sur Facebook
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">
                Partager sur WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/kiwoor_logo.png" 
                alt="kiwoor - Connexion & Confiance" 
                className="h-24 sm:h-32 w-auto"
              />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Trouve la personne fiable pour gérer<br />tes affaires au Sénégal
            </h2>
            
            <p className="text-xl sm:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Tu vis en France, aux USA ou au Canada ? Tu cherches quelqu&apos;un de <strong>confiance</strong> pour gérer ta boutique, ton terrain ou aider ta famille ? On s&apos;occupe de tout.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button
                onClick={() => handleUserTypeSelect('diaspora')}
                className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-xl"
              >
                Je cherche à embaucher 🌍
              </button>
              <button
                onClick={() => handleUserTypeSelect('local')}
                className="bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-all transform hover:scale-105 border-2 border-white shadow-xl"
              >
                Je cherche du travail 🇸🇳
              </button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-green-100 text-sm">Profils vérifiés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">48h</div>
                <div className="text-green-100 text-sm">Réponse garantie</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">0€</div>
                <div className="text-green-100 text-sm">Inscription gratuite</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            On connaît ton problème...
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
              <AlertCircle className="text-red-600 mb-4" size={32} />
              <h3 className="font-bold text-xl text-gray-900 mb-3">Sans kiwoor</h3>
              <ul className="space-y-2 text-gray-700">
                <li>❌ Tu demandes à ta famille mais ils sont déjà occupés</li>
                <li>❌ Tu payes quelqu&apos;un mais il disparaît avec ton argent</li>
                <li>❌ Tu perds des mois à chercher la bonne personne</li>
                <li>❌ Tu stresses parce que tu n&apos;as aucune garantie</li>
                <li>❌ Pas de contrat, pas de suivi, pas de recours</li>
              </ul>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <CheckCircle className="text-green-600 mb-4" size={32} />
              <h3 className="font-bold text-xl text-gray-900 mb-3">Avec kiwoor</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✅ Profils 100% vérifiés (CNI, casier, références)</li>
                <li>✅ Tu reçois 3-5 candidats qualifiés en 48h</li>
                <li>✅ Contrat de travail légal inclus</li>
                <li>✅ Suivi hebdomadaire avec photos/vidéos</li>
                <li>✅ Paiements sécurisés via Orange Money/Wave</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Ils ont trouvé leur personne de confiance
          </h2>
          <p className="text-center text-gray-600 mb-12">Exemples réels de nos futurs utilisateurs</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="/Aminata.png" 
                  alt="Aminata"
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Aminata D.</h4>
                  <p className="text-sm text-gray-600">Paris → Dakar</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;J&apos;ai ouvert une boutique de vêtements à Dakar depuis Paris. kiwoor m&apos;a trouvé une gérante sérieuse qui m&apos;envoie les rapports de ventes chaque semaine. Je dors tranquille !&quot;
              </p>
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="/Moussa.png" 
                  alt="Moussa"
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Moussa B.</h4>
                  <p className="text-sm text-gray-600">New York → Thiès</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;J&apos;ai 3 appartements à louer à Thiès. Mon gestionnaire trouvé sur kiwoor gère tout : locataires, réparations, loyers. Tout est tracé sur la plateforme.&quot;
              </p>
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img 
                  src="/Fatou.png" 
                  alt="Fatou"
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Fatou S.</h4>
                  <p className="text-sm text-gray-600">Montreal → Saint-Louis</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">
                &quot;Mon père est âgé, j&apos;avais besoin de quelqu&apos;un pour l&apos;aider au quotidien. Grâce à kiwoor, j&apos;ai trouvé une aide à domicile vérifiée et de confiance.&quot;
              </p>
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Comment ça marche ?
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">1. Tu décris ton besoin</h3>
              <p className="text-gray-600 text-sm">Gérant, gardien, aide, superviseur... Dis-nous ce dont tu as besoin</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">2. On vérifie tout</h3>
              <p className="text-gray-600 text-sm">CNI, casier judiciaire, références... Aucun profil non vérifié</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">3. Tu choisis</h3>
              <p className="text-gray-600 text-sm">3-5 profils qualifiés en 48h. Tu choisis celui qui te convient</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">4. On gère le reste</h3>
              <p className="text-gray-600 text-sm">Contrat, paiements, suivi... Tu n&apos;as plus qu&apos;à recevoir les rapports</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi kiwoor est différent ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <Shield className="text-green-600 mb-4" size={40} />
              <h3 className="font-bold text-xl text-gray-900 mb-3">100% Vérifié</h3>
              <p className="text-gray-700">
                CNI scannée, casier judiciaire, références appelées. On ne laisse rien au hasard.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <Video className="text-green-600 mb-4" size={40} />
              <h3 className="font-bold text-xl text-gray-900 mb-3">Reporting hebdo</h3>
              <p className="text-gray-700">
                Photos, vidéos, comptes-rendus. Tu sais exactement ce qui se passe au bled.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <FileText className="text-green-600 mb-4" size={40} />
              <h3 className="font-bold text-xl text-gray-900 mb-3">Contrat légal</h3>
              <p className="text-gray-700">
                Contrat de travail conforme au code du travail sénégalais. Tu es protégé.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <MessageCircle className="text-green-600 mb-4" size={40} />
              <h3 className="font-bold text-xl text-gray-900 mb-3">Support FR/Wolof</h3>
              <p className="text-gray-700">
                Chat intégré avec traduction automatique. Communique facilement.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <Clock className="text-green-600 mb-4" size={40} />
              <h3 className="font-bold text-xl text-gray-900 mb-3">Réponse 48h</h3>
              <p className="text-gray-700">
                Tu n&apos;attendras pas des semaines. 48h max pour recevoir des profils.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <Star className="text-green-600 mb-4" size={40} />
              <h3 className="font-bold text-xl text-gray-900 mb-3">Système d&apos;avis</h3>
              <p className="text-gray-700">
                Les meilleurs profils ont des badges. Tu sais à qui tu as affaire.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Preview */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Tarification transparente
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Tu ne payes que si tu es satisfait
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pour la Diaspora</h3>
              <div className="text-4xl font-bold text-green-600 mb-2">
                25%
              </div>
              <p className="text-gray-600 mb-6">du premier mois de salaire</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Profils vérifiés illimités</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Contrat de travail légal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Paiements sécurisés</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Support 7j/7</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">
                Exemple : Salaire 150K FCFA → Tu payes 37,5K FCFA une seule fois
              </p>
            </div>

            <div className="border-2 border-green-500 rounded-xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Gratuit
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pour les Locaux</h3>
              <div className="text-4xl font-bold text-green-600 mb-2">
                0 FCFA
              </div>
              <p className="text-gray-600 mb-6">Inscription 100% gratuite</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Profil en ligne</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Vérification gratuite</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Accès aux offres</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-600 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700">Formation incluse</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">
                Tu ne payes rien. On gagne uniquement quand tu trouves un emploi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Form */}
      {showForm && (
        <div id="signup-form" className="py-16 bg-gradient-to-br from-green-600 to-green-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                {userType === 'diaspora' ? '🌍 Je cherche à embaucher' : '🇸🇳 Je cherche du travail'}
              </h2>
              <p className="text-gray-600 mb-8 text-center">
                Remplis ce formulaire en 2 minutes. On te recontacte sous 48h max.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations de base */}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4">Tes informations</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Prénom Nom"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="ton@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="+33 6 12 34 56 78"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {userType === 'diaspora' ? 'Tu vis où ?' : 'Tu es où ?'} *
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => updateField('country', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        required
                      >
                        <option value="">Sélectionne</option>
                        {userType === 'diaspora' ? (
                          <>
                            <option value="France">France</option>
                            <option value="USA">États-Unis</option>
                            <option value="Canada">Canada</option>
                            <option value="Italie">Italie</option>
                            <option value="Espagne">Espagne</option>
                            <option value="UK">Royaume-Uni</option>
                            <option value="Belgique">Belgique</option>
                            <option value="Autre">Autre pays</option>
                          </>
                        ) : (
                          <>
                            <option value="Dakar">Dakar</option>
                            <option value="Thiès">Thiès</option>
                            <option value="Saint-Louis">Saint-Louis</option>
                            <option value="Kaolack">Kaolack</option>
                            <option value="Ziguinchor">Ziguinchor</option>
                            <option value="Autre">Autre région</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Questions spécifiques diaspora */}
                {userType === 'diaspora' && (
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Ton besoin</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quel type de personne tu cherches ? *
                        </label>
                        <select
                          value={formData.jobType}
                          onChange={(e) => updateField('jobType', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                          required
                        >
                          <option value="">Choisis une option</option>
                          <option value="Gérant boutique/commerce">Gérant de boutique/commerce</option>
                          <option value="Gestionnaire immobilier">Gestionnaire immobilier (locations)</option>
                          <option value="Superviseur terrain/ferme">Superviseur terrain/exploitation agricole</option>
                          <option value="Aide à domicile">Aide à domicile (pour famille)</option>
                          <option value="Chauffeur">Chauffeur personnel/familial</option>
                          <option value="Gardien">Gardien/Veilleur</option>
                          <option value="Assistant administratif">Assistant administratif</option>
                          <option value="Opérateur food truck">Opérateur food truck/restaurant</option>
                          <option value="Autre">Autre (précise en commentaires)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          C&apos;est où au Sénégal ? *
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) => updateField('location', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                          required
                        >
                          <option value="">Sélectionne</option>
                          <option value="Dakar">Dakar</option>
                          <option value="Thiès">Thiès</option>
                          <option value="Saint-Louis">Saint-Louis</option>
                          <option value="Mbour">Mbour</option>
                          <option value="Kaolack">Kaolack</option>
                          <option value="Ziguinchor">Ziguinchor</option>
                          <option value="Autre">Autre ville</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Salaire mensuel prévu *
                        </label>
                        <select
                          value={formData.salary}
                          onChange={(e) => updateField('salary', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                          required
                        >
                          <option value="">Sélectionne une fourchette</option>
                          <option value="50-100K">50 000 - 100 000 FCFA</option>
                          <option value="100-150K">100 000 - 150 000 FCFA</option>
                          <option value="150-200K">150 000 - 200 000 FCFA</option>
                          <option value="200-300K">200 000 - 300 000 FCFA</option>
                          <option value="300K+">Plus de 300 000 FCFA</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quand tu veux commencer ? *
                        </label>
                        <select
                          value={formData.startDate}
                          onChange={(e) => updateField('startDate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                          required
                        >
                          <option value="">Sélectionne</option>
                          <option value="Immédiatement">Immédiatement (sous 1 semaine)</option>
                          <option value="Dans 2-4 semaines">Dans 2-4 semaines</option>
                          <option value="Dans 1-2 mois">Dans 1-2 mois</option>
                          <option value="Dans 3+ mois">Dans plus de 3 mois</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          C&apos;est urgent pour toi ? *
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="urgency"
                              value="Très urgent"
                              checked={formData.urgency === 'Très urgent'}
                              onChange={(e) => updateField('urgency', e.target.value)}
                              className="mr-2"
                              required
                            />
                            <span className="text-gray-700">Très urgent - j&apos;ai besoin de quelqu&apos;un cette semaine</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="urgency"
                              value="Urgent"
                              checked={formData.urgency === 'Urgent'}
                              onChange={(e) => updateField('urgency', e.target.value)}
                              className="mr-2"
                            />
                            <span className="text-gray-700">Urgent - dans les 2-3 semaines</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="urgency"
                              value="Pas urgent"
                              checked={formData.urgency === 'Pas urgent'}
                              onChange={(e) => updateField('urgency', e.target.value)}
                              className="mr-2"
                            />
                            <span className="text-gray-700">Pas urgent - je prends mon temps</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Questions spécifiques locaux */}
                {userType === 'local' && (
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Ton profil</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quel type de travail tu cherches ? *
                        </label>
                        <select
                          value={formData.jobType}
                          onChange={(e) => updateField('jobType', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                          required
                        >
                          <option value="">Choisis</option>
                          <option value="Gérance commerce">Gérance de commerce/boutique</option>
                          <option value="Gestion immobilière">Gestion immobilière</option>
                          <option value="Agriculture">Agriculture/Élevage</option>
                          <option value="Aide à domicile">Aide à domicile/Soins</option>
                          <option value="Chauffeur">Chauffeur</option>
                          <option value="Gardiennage">Gardiennage/Sécurité</option>
                          <option value="Administration">Administration/Secrétariat</option>
                          <option value="Restauration">Restauration/Cuisine</option>
                          <option value="Autre">Autre (précise en commentaires)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tu as combien d&apos;années d&apos;expérience ? *
                        </label>
                        <select
                          value={formData.experience}
                          onChange={(e) => updateField('experience', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                          required
                        >
                          <option value="">Sélectionne</option>
                          <option value="Débutant">Débutant (0-1 an)</option>
                          <option value="1-3 ans">1-3 ans d&apos;expérience</option>
                          <option value="3-5 ans">3-5 ans d&apos;expérience</option>
                          <option value="5+ ans">Plus de 5 ans d&apos;expérience</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tu es disponible quand ? *
                        </label>
                        <select
                          value={formData.availability}
                          onChange={(e) => updateField('availability', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                          required
                        >
                          <option value="">Sélectionne</option>
                          <option value="Immédiatement">Immédiatement</option>
                          <option value="Dans 1-2 semaines">Dans 1-2 semaines</option>
                          <option value="Dans 1 mois">Dans 1 mois</option>
                          <option value="Selon contrat">Selon contrat actuel</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tu as des références (anciens employeurs) ? *
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="hasReferences"
                              value="Oui, plusieurs"
                              checked={formData.hasReferences === 'Oui, plusieurs'}
                              onChange={(e) => updateField('hasReferences', e.target.value)}
                              className="mr-2"
                              required
                            />
                            <span className="text-gray-700">Oui, j&apos;ai plusieurs références vérifiables</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="hasReferences"
                              value="Oui, 1-2"
                              checked={formData.hasReferences === 'Oui, 1-2'}
                              onChange={(e) => updateField('hasReferences', e.target.value)}
                              className="mr-2"
                            />
                            <span className="text-gray-700">Oui, j&apos;ai 1-2 références</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="hasReferences"
                              value="Non"
                              checked={formData.hasReferences === 'Non'}
                              onChange={(e) => updateField('hasReferences', e.target.value)}
                              className="mr-2"
                            />
                            <span className="text-gray-700">Non, c&apos;est mon premier emploi formel</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Questions de feedback (diaspora uniquement) */}
                {userType === 'diaspora' && (
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-4">
                      💡 Aide-nous à améliorer (optionnel mais utile !)
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tu serais prêt à payer combien pour ce service ?
                        </label>
                        <select
                          value={formData.willingToPay}
                          onChange={(e) => updateField('willingToPay', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        >
                          <option value="">Dis-nous franchement</option>
                          <option value="10-15%">10-15% du premier mois</option>
                          <option value="15-25%">15-25% du premier mois</option>
                          <option value="25-35%">25-35% du premier mois</option>
                          <option value="Abonnement mensuel">Je préfère un abonnement mensuel</option>
                          <option value="Gratuit seulement">Seulement si c&apos;est gratuit</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          C&apos;est quoi ta plus grande inquiétude ?
                        </label>
                        <select
                          value={formData.mainConcern}
                          onChange={(e) => updateField('mainConcern', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        >
                          <option value="">Choisis</option>
                          <option value="Confiance">La confiance - peur de me faire arnaquer</option>
                          <option value="Qualité">La qualité - peur que le travail soit mal fait</option>
                          <option value="Suivi">Le suivi - peur de pas avoir de nouvelles</option>
                          <option value="Légal">Le légal - peur des problèmes juridiques</option>
                          <option value="Prix">Le prix - peur que ça coûte trop cher</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Commentaires */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Autres infos importantes ? (optionnel)
                  </label>
                  <textarea
                    value={formData.comments}
                    onChange={(e) => updateField('comments', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder={userType === 'diaspora' 
                      ? "Ex: J'ai besoin de quelqu'un qui parle français, qui connaît la comptabilité..."
                      : "Ex: Je parle wolof, français et anglais, j'ai un diplôme en..."}
                  />
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                    {userType === 'diaspora' 
                      ? '🚀 Recevoir mes profils sous 48h'
                      : '✅ Créer mon profil gratuitement'
                    }
                  </button>
                  
                  <p className="text-center text-sm text-gray-600 mt-4">
                    {userType === 'diaspora'
                      ? "🎁 Les 20 premiers inscrits ont 50% de réduction !"
                      : "🎁 100% gratuit, aucun frais caché"
                    }
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* FAQ */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Questions fréquentes
          </h2>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                C&apos;est vraiment sûr ? Comment vous vérifiez les gens ?
              </h3>
              <p className="text-gray-700">
                Chaque profil est vérifié manuellement : scan CNI, vérification casier judiciaire via nos partenaires officiels, appel des références, et entretien vidéo. On ne laisse RIEN passer.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Ça coûte combien exactement ?
              </h3>
              <p className="text-gray-700">
                25% du premier mois de salaire uniquement. Si ton employé gagne 150K FCFA/mois, tu payes 37 500 FCFA UNE SEULE FOIS. Pas d&apos;abonnement, pas de frais cachés. Les 20 premiers ont 50% de réduction.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Et si ça se passe mal avec la personne ?
              </h3>
              <p className="text-gray-700">
                Le contrat de travail inclut une période d&apos;essai. Si ça ne va pas pendant l&apos;essai, tu peux arrêter sans souci. On te propose aussi un remplacement gratuit dans les 30 premiers jours.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Comment je paye la personne chaque mois ?
              </h3>
              <p className="text-gray-700">
                Via notre système sécurisé Orange Money/Wave. Tu envoies l&apos;argent sur la plateforme, on le transfère à ton employé. Tout est tracé et transparent.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Je peux vraiment trouver quelqu&apos;un en 48h ?
              </h3>
              <p className="text-gray-700">
                Oui ! On a déjà une base de profils vérifiés qui attendent. Dès ton inscription, on te présente 3-5 profils qui matchent ton besoin. Tu choisis, et c&apos;est parti.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                Pourquoi je vous ferais confiance plutôt qu&apos;à ma famille ?
              </h3>
              <p className="text-gray-700">
                Ta famille, c&apos;est précieux pour autre chose ! Nous on s&apos;occupe du professionnel : contrat, suivi, recours en cas de problème. Et surtout, tu gardes de bonnes relations familiales 😊
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à trouver ta personne de confiance ?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Rejoins les dizaines de personnes de la diaspora qui dorment tranquilles grâce à kiwoor
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <button
              onClick={() => handleUserTypeSelect('diaspora')}
              className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-xl"
            >
              Je cherche à embaucher 🌍
            </button>
            <button
              onClick={() => handleUserTypeSelect('local')}
              className="bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-all transform hover:scale-105 border-2 border-white shadow-xl"
            >
              Je cherche du travail 🇸🇳
            </button>
          </div>

          <p className="text-green-100 text-sm">
            ⏰ Offre limitée : Les 20 premiers inscrits ont 50% de réduction !
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img 
                  src="/kiwoor_logo.png" 
                  alt="kiwoor" 
                  className="h-16 w-auto"
                />
              </div>
              <p className="text-sm text-gray-400">
                La plateforme de confiance pour embaucher au Sénégal depuis la diaspora
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Contact</h4>
              <p className="text-sm text-gray-400 mb-2">
                📧 contact@sununaal.com
              </p>
              <p className="text-sm text-gray-400 mb-2">
                📱 WhatsApp: +221 77 711 59 72
              </p>
              <p className="text-sm text-gray-400">
                📍 Dakar, Sénégal
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 kiwoor. Tous droits réservés.</p>
            <p className="mt-2">🇸🇳 Made with ❤️ for the diaspora</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

