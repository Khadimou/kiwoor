# kiwoor 🇸🇳

Plateforme de confiance pour embaucher au Sénégal depuis la diaspora.

## 🚀 Démarrage

Installez les dépendances :

```bash
npm install
```

Lancez le serveur de développement :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📦 Technologies

- **Next.js 16** - Framework React avec App Router
- **TypeScript** - Typage statique pour un code robuste
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Icônes modernes et légères

## 🏗️ Structure du projet

```
kiwoor/
├── src/
│   ├── app/              # App Router de Next.js
│   │   ├── layout.tsx    # Layout principal
│   │   ├── page.tsx      # Page d'accueil
│   │   └── globals.css   # Styles globaux
│   └── components/       # Composants React
│       └── LandingPage.tsx
├── public/               # Assets statiques
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🎨 Fonctionnalités

- ✅ Landing page responsive
- ✅ Formulaire d'inscription diaspora/locaux
- ✅ Sections témoignages et FAQ
- ✅ Design moderne avec Tailwind CSS
- ✅ SEO optimisé avec métadonnées Next.js

## 🚀 Déploiement sur Vercel

1. Installez Vercel CLI :
```bash
npm i -g vercel
```

2. Déployez :
```bash
vercel deploy
```

3. Pour déployer en production :
```bash
vercel deploy --prod
```

## 📝 Prochaines étapes

- [ ] Intégration base de données (Prisma + PostgreSQL)
- [ ] Système d'authentification
- [ ] Dashboard utilisateur
- [ ] Intégration paiements (Orange Money/Wave)
- [ ] Système de messagerie

## 📄 Licence

© 2025 kiwoor. Tous droits réservés.

Made with ❤️ for the diaspora

