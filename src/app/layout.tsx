import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "kiwoor - Trouve la personne fiable pour gérer tes affaires au Sénégal",
  description: "Plateforme de confiance pour embaucher au Sénégal depuis la diaspora. Profils 100% vérifiés, contrats légaux, suivi hebdomadaire.",
  icons: {
    icon: '/kiwoor_logo.png',
    shortcut: '/kiwoor_logo.png',
    apple: '/kiwoor_logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

