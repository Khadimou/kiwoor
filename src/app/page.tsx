import LandingPage from '@/components/LandingPage';

export const metadata = {
  title: 'kiwoor - Trouve la personne fiable pour gérer tes affaires au Sénégal',
  description: 'Plateforme de confiance pour embaucher au Sénégal depuis la diaspora. Profils 100% vérifiés, contrats légaux, suivi hebdomadaire.',
  keywords: 'Sénégal, diaspora, embauche, emploi, gestion, confiance, kiwoor',
  openGraph: {
    title: 'kiwoor - Trouve la personne fiable pour gérer tes affaires au Sénégal',
    description: 'Profils 100% vérifiés, contrats légaux, suivi hebdomadaire',
    type: 'website',
  }
};

export default function Home() {
  return <LandingPage />;
}

