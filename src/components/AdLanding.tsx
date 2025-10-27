'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Shield, MessageCircle } from 'lucide-react';
import MicroLeadForm from './MicroLeadForm';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';

interface AdLandingProps {
  variant?: string;
}

export default function AdLanding({ variant }: AdLandingProps) {
  const [showForm, setShowForm] = useState(false);
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
            Tu galères à trouver quelqu&apos;un de confiance au bled ?
          </h1>

          {/* Sous-texte */}
          <p className="text-xl md:text-2xl text-green-100 text-center mb-8">
            Gérant, gardien, gestionnaire terrain, aide famille...
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
                  <span className="text-green-200 text-sm">Paris → Dakar</span>
                </div>
                <p className="text-green-100 text-sm italic">
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
            <button
              onClick={handleCTAClick}
              className="bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              S&apos;inscrire (2 min) 🚀
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
          </div>

          {/* Mentions importantes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
              <CheckCircle className="text-green-300 mx-auto mb-2" size={24} />
              <p className="text-white font-semibold text-sm">
                Inscription gratuite
              </p>
              <p className="text-green-200 text-xs">(2 min)</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🎁</div>
              <p className="text-white font-semibold text-sm">
                Les 20 premiers
              </p>
              <p className="text-green-200 text-xs">ont -50%</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-white font-semibold text-sm">
                Remplacement 30j
              </p>
              <p className="text-green-200 text-xs">gratuit</p>
            </div>
          </div>

          {/* Indicateurs de confiance */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
              <div className="text-green-100 text-sm">Profils vérifiés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">48h</div>
              <div className="text-green-100 text-sm">Réponse garantie</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">0€</div>
              <div className="text-green-100 text-sm">Inscription</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal du formulaire */}
      <MicroLeadForm 
        isOpen={showForm} 
        onClose={() => setShowForm(false)} 
        variant={variant}
        utm={utmParams}
      />
    </div>
  );
}

