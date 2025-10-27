'use client';

import { Suspense, useState } from 'react';
import AdLanding from '@/components/AdLanding';
import ABVariant from '@/components/ABVariant';

function DiasporaCampaignContent() {
  const [activeVariant, setActiveVariant] = useState<string | null>('default');

  return (
    <>
      <ABVariant onVariantChange={(variant) => setActiveVariant(variant || 'default')} />
      <AdLanding variant={activeVariant || 'default'} />
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
