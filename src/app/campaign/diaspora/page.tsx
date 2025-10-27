'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import AdLanding from '@/components/AdLanding';

function DiasporaCampaignContent() {
  const searchParams = useSearchParams();
  const variant = searchParams.get('variant') || 'default';

  useEffect(() => {
    // Track variant shown via analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'variant_shown', {
        variant: variant,
        page: 'campaign_diaspora',
      });
    }
  }, [variant]);

  return <AdLanding variant={variant} />;
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

