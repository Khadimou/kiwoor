'use client';

import { Suspense, useState } from 'react';
import AdLanding from '@/components/AdLanding';
import ABVariant from '@/components/ABVariant';

/**
 * Configuration des variants A/B pour la campagne Diaspora
 * 
 * URLs de test:
 * - Control: /campaign/diaspora?variant=control
 * - Hero Direct: /campaign/diaspora?variant=test-hero-direct  
 * - Offre Gratuite: /campaign/diaspora?variant=test-offer-gratuit
 * - CTA Urgent: /campaign/diaspora?variant=test-cta-urgent
 * - Messaging Unifié: /campaign/diaspora?variant=test-unifie
 */
function DiasporaCampaignContent() {
  const [activeVariant, setActiveVariant] = useState<string | null>('default');

  // Configuration des variants A/B
  const getVariantConfig = (variant: string | null) => {
    switch (variant) {
      case 'test-hero-direct':
        return {
          title: "Tu galères à trouver quelqu'un de confiance au Sénégal ?",
          subtitle: "Découvre la solution qui aide + de 500 diasporans chaque mois",
          ctaText: "Je veux essayer gratuitement",
          heroImage: "/Moussa.png", // Image plus authentique
          testimonialFocus: true
        };
        
      case 'test-offer-gratuit':
        return {
          title: "Embauche au Sénégal en toute sécurité",
          subtitle: "🎁 Essai gratuit 7 jours - Sans engagement - Résultats garantis",
          ctaText: "Commencer l'essai gratuit",
          offerBadge: "GRATUIT 7 JOURS",
          urgency: false
        };
        
      case 'test-cta-urgent':
        return {
          title: "Embauche au Sénégal en toute sécurité", 
          subtitle: "Profils 100% vérifiés • Contrats légaux • Suivi hebdomadaire",
          ctaText: "Réserver ma place (Plus que 12 places)",
          urgency: true,
          urgencyText: "⚡ Places limitées - Promotion se termine dans 24h"
        };
        
      case 'test-unifie':
        return {
          title: "Plateforme de confiance pour l'emploi au Sénégal",
          subtitle: "Connecte diaspora et talents locaux • +500 connexions réussies",
          ctaText: "Rejoindre la communauté",
          heroImage: "/Moussa.png",
          unifiedMessaging: true,
          targetAudience: "both"
        };
        
      case 'control':
      default:
        return {
          title: "Embauche au Sénégal en toute sécurité",
          subtitle: "Profils 100% vérifiés, contrats légaux, suivi hebdomadaire",
          ctaText: "Découvrir kiwoor",
          isControl: true
        };
    }
  };

  const variantConfig = getVariantConfig(activeVariant);

  return (
    <>
      <ABVariant onVariantChange={(variant) => setActiveVariant(variant || 'control')} />
      
      {/* Debug info en développement - version discrète */}
      {process.env.NODE_ENV === 'development' && false && (
        <div className="fixed bottom-4 left-4 bg-black/50 text-white p-2 rounded text-xs z-50 opacity-50 hover:opacity-100">
          <div>🧪 {activeVariant || 'control'}</div>
        </div>
      )}
      
      <AdLanding 
        variant={activeVariant || 'control'} 
        config={variantConfig}
      />
    </>
  );
}

export default function DiasporaCampaignPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    }>
      <DiasporaCampaignContent />
    </Suspense>
  );
}
