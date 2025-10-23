# 🏗️ Architecture du projet kiwoor

## 📁 Structure des dossiers

```
kiwoor/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Layout racine avec métadonnées SEO
│   │   ├── page.tsx             # Page d'accueil (utilise LandingPage)
│   │   └── globals.css          # Styles globaux + Tailwind CSS v4
│   │
│   ├── components/              # Composants React
│   │   ├── LandingPage.tsx     # Composant principal de la landing page
│   │   └── ui/                 # Composants UI réutilisables
│   │       └── Button.tsx      # Composant Button personnalisé
│   │
│   ├── lib/                    # Utilitaires et helpers
│   │   └── constants.ts        # Constantes de l'application
│   │
│   └── types/                  # Types TypeScript
│       └── index.ts            # Interfaces et types
│
├── public/                     # Assets statiques
│
├── .next/                      # Build Next.js (généré)
├── node_modules/               # Dépendances (généré)
│
├── .env.example               # Template variables d'environnement
├── .eslintrc.json            # Configuration ESLint
├── .gitignore                # Fichiers à ignorer par Git
├── next.config.ts            # Configuration Next.js
├── package.json              # Dépendances et scripts
├── postcss.config.mjs        # Configuration PostCSS
├── tsconfig.json             # Configuration TypeScript
├── vercel.json               # Configuration Vercel
│
├── ARCHITECTURE.md           # Ce fichier
├── DEPLOYMENT.md             # Guide de déploiement
└── README.md                 # Documentation principale
```

## 🎯 Principes d'Architecture

### 1. **App Router de Next.js 15+**
- Utilisation du nouveau système de routing dans `src/app/`
- Server Components par défaut
- Client Components marqués avec `'use client'`

### 2. **TypeScript Strict Mode**
- Typage fort pour éviter les erreurs
- Interfaces définies dans `src/types/`
- IntelliSense amélioré

### 3. **Tailwind CSS v4**
- Import CSS natif : `@import "tailwindcss"`
- Plugin PostCSS : `@tailwindcss/postcss`
- Classes utility-first pour un développement rapide

### 4. **Composants Modulaires**
```
LandingPage (Client Component)
├── Hero Section
├── Problem/Solution Section
├── Testimonials
├── How it Works
├── Features
├── Pricing
├── Signup Form (conditionnel)
│   ├── Common Fields
│   ├── Diaspora Fields (conditionnel)
│   └── Local Fields (conditionnel)
├── FAQ
├── Final CTA
└── Footer
```

### 5. **Gestion d'État**
- `useState` pour l'état local du formulaire
- Pas de Redux/Zustand pour l'instant (à ajouter si nécessaire)

### 6. **SEO Optimisé**
- Métadonnées dans `layout.tsx` et `page.tsx`
- Balises Open Graph pour le partage social
- Balises sémantiques HTML5

## 🔧 Technologies Utilisées

| Technologie | Version | Usage |
|-------------|---------|-------|
| Next.js | 16.0.0 | Framework React avec App Router |
| React | 19.2.0 | Bibliothèque UI |
| TypeScript | 5.9.3 | Typage statique |
| Tailwind CSS | 4.1.16 | Framework CSS |
| Lucide React | 0.546.0 | Icônes modernes |
| PostCSS | 8.5.6 | Traitement CSS |

## 📦 Dépendances Principales

### Production
```json
{
  "next": "^16.0.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "lucide-react": "^0.546.0"
}
```

### Développement
```json
{
  "typescript": "^5.9.3",
  "@types/react": "^19.2.2",
  "@types/node": "^24.9.1",
  "tailwindcss": "^4.1.16",
  "@tailwindcss/postcss": "^4.x",
  "eslint": "^9.38.0",
  "eslint-config-next": "^16.0.0"
}
```

## 🎨 Patterns de Développement

### 1. **Server Components par défaut**
```typescript
// src/app/page.tsx (Server Component)
export default function Home() {
  return <LandingPage />;
}
```

### 2. **Client Components quand nécessaire**
```typescript
// src/components/LandingPage.tsx
'use client';

export default function LandingPage() {
  const [state, setState] = useState();
  // Logique interactive
}
```

### 3. **Types réutilisables**
```typescript
// src/types/index.ts
export interface FormData {
  fullName: string;
  email: string;
  // ...
}
```

### 4. **Constantes centralisées**
```typescript
// src/lib/constants.ts
export const CITIES_SENEGAL = ['Dakar', 'Thiès', ...];
```

## 🚀 Flux de Données

```
Utilisateur
    ↓
Landing Page (Client Component)
    ↓
État local (useState)
    ↓
Formulaire Submit
    ↓
Console.log (Dev)
    ↓
[À implémenter : API Route → Database]
```

## 🔮 Évolutions Futures

### Phase 2 : Backend
```
src/
├── app/
│   └── api/                    # API Routes
│       ├── auth/
│       ├── users/
│       └── submissions/
├── lib/
│   ├── prisma.ts              # Client Prisma
│   └── utils.ts               # Fonctions utilitaires
└── middleware.ts              # Middleware Next.js
```

### Phase 3 : Base de Données
- Prisma ORM
- PostgreSQL (Supabase/Vercel Postgres)
- Schéma pour Users, Profiles, Jobs, etc.

### Phase 4 : Authentification
- NextAuth.js
- OAuth (Google, Facebook)
- Magic Links

### Phase 5 : Dashboard
- Interface utilisateur dashboard
- Gestion des profils
- Messagerie intégrée
- Système de paiements

## 📊 Performance

### Optimisations Actuelles
- ✅ Static Generation (SSG) de la page d'accueil
- ✅ Tailwind CSS purge automatique
- ✅ Next.js Image optimization (ready)
- ✅ TypeScript pour éviter les erreurs runtime

### Métriques Cibles
- Lighthouse Score : 90+
- First Contentful Paint : < 1.5s
- Time to Interactive : < 3.5s

## 🔒 Sécurité

### Implémentations Actuelles
- ✅ TypeScript pour la validation de types
- ✅ ESLint pour la qualité du code
- ✅ .env pour les secrets (à venir)

### À Implémenter
- [ ] Validation côté serveur (Zod)
- [ ] Rate limiting
- [ ] CSRF protection
- [ ] Input sanitization

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vercel Deployment](https://vercel.com/docs)

---

**Dernière mise à jour :** Octobre 2025  
**Version :** 1.0.0  
**Auteur :** Équipe kiwoor

