# 🧪 Guide A/B Testing - kiwoor

## Vue d'ensemble

Système d'A/B testing pour tester différentes variantes de landing pages avec persistance des variants en localStorage.

## 🎯 Fonctionnalités

### 1. Gestion des Variants
- Lecture du paramètre `?variant` depuis l'URL
- Stockage persistant dans `localStorage` (`kiwoor_variant`)
- Tracking automatique via `variant_shown` event
- Priorité URL > localStorage

### 2. Composant ABVariant
Composant React qui gère automatiquement :
- Extraction du variant depuis l'URL
- Persistance en localStorage
- Tracking analytics
- Callback vers le parent

### 3. Hooks et Utilitaires
- `useABVariant()` : Hook pour récupérer le variant actif
- `getABVariant()` : Fonction sync pour récupérer le variant
- `clearABVariant()` : Réinitialiser le variant

## 📁 Architecture

```
src/
├── components/
│   └── ABVariant.tsx           # Composant principal A/B testing
└── app/
    └── campaign/
        └── diaspora/
            └── page.tsx         # Intégration du composant
```

## 🔧 Utilisation

### Intégration dans une page

```tsx
'use client';

import { useState } from 'react';
import ABVariant from '@/components/ABVariant';
import MyLandingPage from '@/components/MyLandingPage';

export default function CampaignPage() {
  const [variant, setVariant] = useState<string | null>('default');

  return (
    <>
      <ABVariant onVariantChange={setVariant} />
      <MyLandingPage variant={variant || 'default'} />
    </>
  );
}
```

### Hook pour récupérer le variant

```tsx
'use client';

import { useABVariant } from '@/components/ABVariant';

export default function MyComponent() {
  const variant = useABVariant();

  return (
    <div>
      {variant === 'test-a' && <TestVersionA />}
      {variant === 'test-b' && <TestVersionB />}
      {!variant && <ControlVersion />}
    </div>
  );
}
```

### Utilitaires

```typescript
import { getABVariant, clearABVariant } from '@/components/ABVariant';

// Récupérer le variant (sync)
const currentVariant = getABVariant();
console.log(currentVariant); // 'test-a' ou null

// Réinitialiser le variant
clearABVariant();
```

## 🧪 Exemples d'URLs

### Variant A
```
https://kiwoor.com/campaign/diaspora?variant=test-a
```
- Stocke `test-a` dans localStorage
- Track event : `variant_shown` avec `variant: 'test-a'`
- L'utilisateur verra toujours `test-a` même sans le paramètre

### Variant B
```
https://kiwoor.com/campaign/diaspora?variant=test-b
```
- Stocke `test-b` dans localStorage
- Remplace le variant précédent

### Control (sans variant)
```
https://kiwoor.com/campaign/diaspora
```
- Si aucun variant stocké : variant = null
- Si variant déjà stocké : utilise le variant stocké

### Avec UTM
```
https://kiwoor.com/campaign/diaspora?variant=fb-hero-v1&utm_source=facebook&utm_medium=cpc
```
- Combine A/B testing et tracking UTM
- Parfait pour les campagnes publicitaires

## 📊 Analytics Events

### Event: variant_shown

Déclenché automatiquement lors du chargement de la page.

**Payload** :
```javascript
{
  variant: 'test-a',           // Nom du variant
  source: 'url',               // 'url' ou 'stored'
  page: '/campaign/diaspora'   // Path de la page
}
```

**Visualiser dans Google Analytics** :
1. Reports → Events
2. Filtrer par `variant_shown`
3. Voir les détails : variant, source, page

**Visualiser dans Meta Pixel** :
1. Events Manager
2. Custom Events
3. `variant_shown`

## 🎨 Cas d'Usage

### Cas 1 : Tester 2 titres différents

**Control (default)** :
```tsx
const title = variant === 'test-a' 
  ? "Tu galères à trouver quelqu'un de confiance ?"
  : "Embauche au Sénégal en toute sécurité";
```

**URLs** :
- Control : `/campaign/diaspora`
- Test A : `/campaign/diaspora?variant=test-a`

### Cas 2 : Tester 3 offres différentes

```tsx
const offer = {
  'default': '-50% les 20 premiers',
  'test-a': 'Essai gratuit 7 jours',
  'test-b': 'Garantie satisfait ou remboursé',
}[variant || 'default'];
```

**URLs** :
- Control : `/campaign/diaspora`
- Test A : `/campaign/diaspora?variant=test-a`
- Test B : `/campaign/diaspora?variant=test-b`

### Cas 3 : Tester landing pages complètement différentes

```tsx
return (
  <>
    <ABVariant onVariantChange={setVariant} />
    {variant === 'redesign' ? (
      <NewLandingPage />
    ) : (
      <CurrentLandingPage />
    )}
  </>
);
```

## 📈 Analyse des Résultats

### Google Analytics

**Créer un rapport personnalisé** :
1. Admin → Custom Definitions → Custom Dimensions
2. Créer : `variant` (Event scope)
3. Reports → Explorations → Create new
4. Axes : `variant` vs `conversions`

**Formule de conversion** :
```
Taux de conversion = (form_submit / variant_shown) * 100
```

### Google Sheets

**Export depuis GA4** :
1. Reports → Events
2. Filtrer `variant_shown` et `form_submit`
3. Export → Google Sheets
4. Analyser dans Sheets

**Calcul manuel** :
```
Variant A : 150 vues, 12 conversions = 8% conversion
Variant B : 150 vues, 18 conversions = 12% conversion
Winner : Variant B (+50% vs A)
```

### Meta Ads Manager

Si vous lancez des pubs Facebook :
1. Créer 2 ad sets avec des URLs différentes
2. Ad Set 1 : `?variant=test-a`
3. Ad Set 2 : `?variant=test-b`
4. Comparer les performances dans Ads Manager

## 🔍 Debugging

### Vérifier le variant stocké

```javascript
// Console du navigateur
localStorage.getItem('kiwoor_variant')
// Output: 'test-a'
```

### Changer manuellement le variant

```javascript
// Console du navigateur
localStorage.setItem('kiwoor_variant', 'test-b')
window.location.reload()
```

### Réinitialiser le variant

```javascript
// Console du navigateur
localStorage.removeItem('kiwoor_variant')
window.location.reload()
```

### Vérifier les events

```javascript
// Console du navigateur (mode dev)
// Vous verrez :
📊 Analytics Event: variant_shown { variant: 'test-a', source: 'url', page: '/campaign/diaspora' }
```

## 🚀 Workflow Recommandé

### Phase 1 : Hypothèse
```
Hypothèse : Un titre plus direct augmentera les conversions de 20%
Variant A (test) : "Tu galères à trouver quelqu'un de confiance ?"
Control : "Embauche au Sénégal en toute sécurité"
```

### Phase 2 : Configuration
```bash
# URLs de campagne
Control : https://kiwoor.com/campaign/diaspora?variant=control
Test A  : https://kiwoor.com/campaign/diaspora?variant=test-a
```

### Phase 3 : Lancement
1. Créer 2 campagnes Facebook/Google Ads
2. Même budget pour chaque variant
3. Durée : 7-14 jours
4. Trafic : minimum 100 visiteurs par variant

### Phase 4 : Analyse
```javascript
// Après 7 jours
Control : 500 vues, 25 conversions = 5.0%
Test A  : 500 vues, 35 conversions = 7.0%

Amélioration : +40% conversions
Significatif : Oui (minimum 30 conversions par variant)
Décision : Déployer Test A en production
```

### Phase 5 : Déploiement
```typescript
// Mettre Test A comme default
const title = "Tu galères à trouver quelqu'un de confiance ?";
```

## ⚙️ Configuration Avancée

### Variant aléatoire (server-side)

Si vous voulez assigner automatiquement un variant :

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Si pas de variant, en assigner un aléatoirement
  if (url.pathname === '/campaign/diaspora' && !url.searchParams.has('variant')) {
    const variants = ['control', 'test-a', 'test-b'];
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    
    url.searchParams.set('variant', randomVariant);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}
```

### Multi-variates

Tester plusieurs éléments en même temps :

```typescript
// ?variant=hero-v1_cta-v2_form-v3
const [hero, cta, form] = (variant || '').split('_');
```

### Segments d'audience

Assigner des variants selon l'audience :

```typescript
const getVariantForUser = (utmSource: string) => {
  if (utmSource === 'facebook') return 'fb-optimized';
  if (utmSource === 'google') return 'google-optimized';
  return 'default';
};
```

## 📋 Checklist A/B Test

### Avant de lancer
- [ ] Hypothèse claire documentée
- [ ] 2+ variants créés
- [ ] URLs configurées avec `?variant=`
- [ ] Events analytics testés
- [ ] Trafic minimum défini (100+ par variant)
- [ ] Durée définie (7-14 jours)

### Pendant le test
- [ ] Vérifier que les variants reçoivent du trafic
- [ ] Surveiller les metrics en temps réel
- [ ] Pas de modifications pendant le test
- [ ] Noter les observations qualitatives

### Après le test
- [ ] Analyser les résultats
- [ ] Calculer la significativité statistique
- [ ] Documenter les learnings
- [ ] Déployer le winner
- [ ] Archiver les variants

## 🎯 Best Practices

### ✅ DO
- Tester une chose à la fois
- Attendre minimum 100 conversions
- Documenter vos hypothèses
- Utiliser des noms de variants descriptifs
- Analyser les données qualitatives aussi

### ❌ DON'T
- Modifier les variants pendant le test
- Arrêter trop tôt (< 7 jours)
- Tester 10 variants en même temps
- Ignorer la significativité statistique
- Oublier de documenter les résultats

## 🎉 Résultat

Vous avez maintenant :
- ✅ **Système A/B complet** : Variant params + localStorage
- ✅ **Tracking automatique** : Events analytics intégrés
- ✅ **Persistance** : Le variant reste actif entre les visites
- ✅ **Flexible** : Facile d'ajouter de nouveaux variants
- ✅ **Production-ready** : Tests OK, documentation complète

---

**Version** : 1.0.0  
**Date** : 27 octobre 2025  
**Auteur** : Équipe kiwoor  
**Status** : ✅ PRODUCTION READY

