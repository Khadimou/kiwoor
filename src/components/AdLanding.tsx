'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Shield, MessageCircle } from 'lucide-react';
import MicroLeadForm from './MicroLeadForm';
import DiasporaForm from './DiasporaForm';
import CandidatsForm from './CandidatsForm';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';

interface AdLandingProps {
  variant?: string;
  config?: {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    heroImage?: string;
    testimonialFocus?: boolean;
    offerBadge?: string;
    urgency?: boolean;
    urgencyText?: string;
    socialProof?: boolean;
    testimonialCount?: number;
    isControl?: boolean;
    unifiedMessaging?: boolean;
    targetAudience?: string;
  };
}

export default function AdLanding({ variant, config }: AdLandingProps) {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<'diaspora' | 'candidats' | null>(null);
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '221777115972';

  useEffect(() => {
    // Extract UTM parameters from URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
        const value = params.get(key);
        if (value) utm[key] = value;
      });
      
      setUtmParams(utm);
    }

    // Track variant shown
    if (variant) {
      trackEvent('variant_shown', {
        variant: variant,
      });
    }
  }, [variant]);

  const handleCTAClick = () => {
    setShowForm(true);
    
    // Track CTA click
    trackEvent('cta_click', {
      variant: variant || 'default',
      cta_type: 'primary',
    });
  };

  const handleWhatsAppClick = () => {
    // Track WhatsApp click
    trackEvent('cta_click', {
      variant: variant || 'default',
      cta_type: 'whatsapp',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800">
      {/* Above-the-fold Section */}
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Badge de vérification */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
              <Shield className="text-green-600 mr-2" size={20} />
              <span className="font-semibold text-gray-900">
                CNI ✓ Casier ✓ Références ✓
              </span>
            </div>
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 leading-tight">
            {config?.title || "Tu galères à trouver quelqu'un de confiance au bled ?"}
          </h1>

          {/* Sous-texte */}
          <p className="text-xl md:text-2xl text-white/90 text-center mb-8">
            {config?.subtitle || "Gérant, gardien, gestionnaire terrain, aide famille..."}
          </p>

          {/* Preuve sociale */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Image
                  src="/Aminata.png"
                  alt="Aminata D."
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-semibold text-white">Aminata D.</p>
                  <span className="text-gray-600 text-sm font-medium">Paris → Dakar</span>
                </div>
                <p className="text-gray-700 text-sm italic">
                  &quot;J&apos;ai ouvert une boutique à Dakar depuis Paris. kiwoor m&apos;a trouvé une gérante sérieuse qui m&apos;envoie les rapports chaque semaine. Je dors tranquille !&quot;
                </p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            {config?.unifiedMessaging ? (
              // Deux boutons pour le messaging unifié
              <>
                <button
                  onClick={() => {
                    setFormType('diaspora');
                    setShowForm(true);
                  }}
                  className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-2xl"
                >
                  🌍 Je cherche à embaucher
                </button>
                <button
                  onClick={() => {
                    setFormType('candidats');
                    setShowForm(true);
                  }}
                  className="bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-all transform hover:scale-105 border-2 border-white shadow-2xl"
                >
                  🇸🇳 Je cherche un emploi
                </button>
              </>
            ) : (
              // Bouton unique pour les autres variants
              <>
                <button
                  onClick={handleCTAClick}
                  className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-2xl"
                >
                  {config?.ctaText || "S'inscrire (2 min) 🚀"}
                </button>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Bonjour%2C%20je%20veux%20embaucher%20quelqu'un%20de%20confiance%20au%20S%C3%A9n%C3%A9gal`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-all transform hover:scale-105 border-2 border-white shadow-2xl flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Parler via WhatsApp
                </a>
              </>
            )}
          </div>

          {/* Section unifiée pour les deux audiences */}
          {config?.unifiedMessaging && (
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-4xl mx-auto">
              <h3 className="text-white text-xl font-bold text-center mb-6">Comment ça marche ?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🌍</div>
                  <h4 className="text-white font-semibold mb-2">Pour la Diaspora</h4>
                  <p className="text-gray-700 text-sm">
                    Trouvez des profils vérifiés au Sénégal pour gérer vos affaires en toute confiance
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🇸🇳</div>
                  <h4 className="text-white font-semibold mb-2">Pour les Talents Locaux</h4>
                  <p className="text-gray-700 text-sm">
                    Trouvez des opportunités d'emploi avec des employeurs sérieux de la diaspora
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mentions importantes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
              <CheckCircle className="text-green-300 mx-auto mb-2" size={24} />
              <p className="text-white font-semibold text-sm">
                Inscription gratuite
              </p>
              <p className="text-gray-700 text-xs">(2 min)</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🎁</div>
              <p className="text-white font-semibold text-sm">
                Les 20 premiers
              </p>
              <p className="text-gray-700 text-xs">ont -50%</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-white font-semibold text-sm">
                Remplacement 30j
              </p>
              <p className="text-gray-700 text-xs">gratuit</p>
            </div>
          </div>

          {/* Indicateurs de confiance */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
              <div className="text-white/80 text-sm">Profils vérifiés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">48h</div>
              <div className="text-white/80 text-sm">Réponse garantie</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">0€</div>
              <div className="text-white/80 text-sm">Inscription</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal du formulaire */}
      {config?.unifiedMessaging ? (
        // Formulaires séparés pour le messaging unifié
        <>
          <DiasporaForm 
            isOpen={showForm && formType === 'diaspora'} 
            onClose={() => {
              setShowForm(false);
              setFormType(null);
            }} 
            variant={variant}
            utm={utmParams}
          />
          <CandidatsForm 
            isOpen={showForm && formType === 'candidats'} 
            onClose={() => {
              setShowForm(false);
              setFormType(null);
            }} 
            variant={variant}
            utm={utmParams}
          />
        </>
      ) : (
        // Formulaire unique pour les autres variants
        <MicroLeadForm 
          isOpen={showForm} 
          onClose={() => setShowForm(false)} 
          variant={variant}
          utm={utmParams}
          targetAudience={config?.targetAudience}
        />
      )}
    </div>
  );
}

