import type { Metadata } from "next";
import "./globals.css";
import { getAnalyticsScripts } from "@/lib/analytics";
import AnalyticsProvider from "@/components/AnalyticsProvider";

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
  const scripts = getAnalyticsScripts();

  return (
    <html lang="fr">
      <head>
        {/* Google Analytics 4 */}
        {scripts.ga4 && (
          <>
            <script async src={scripts.ga4}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Meta Pixel (Facebook) */}
        {scripts.metaPixel && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${scripts.metaPixel}');
                  fbq('track', 'PageView');
                `,
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${scripts.metaPixel}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}

        {/* Microsoft Clarity */}
        {scripts.clarity && (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${scripts.clarity}");
              `,
            }}
          />
        )}
      </head>
      <body className="antialiased">
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
