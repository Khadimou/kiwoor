# 📊 Système d'Analytics Unifié - kiwoor

## Vue d'ensemble

Système d'analytics centralisé supportant **Google Analytics 4**, **Meta Pixel (Facebook)** et **Microsoft Clarity** avec une API unifiée.

## ✨ Fonctionnalités

### 1. API Unifiée
- **trackEvent()** : Envoie des événements à tous les services configurés
- **initAnalytics()** : Initialise les scripts analytics
- **trackPageView()** : Track les vues de page
- **trackConversion()** : Track les conversions avec valeur
- **identifyUser()** : Identifie un utilisateur

### 2. Chargement Conditionnel
- Les scripts ne se chargent que si les variables d'environnement sont configurées
- Pas de surcharge si un service n'est pas utilisé
- Détection automatique des services disponibles

### 3. Multi-Plateformes
- **Google Analytics 4** : Events standard + Measurement Protocol
- **Meta Pixel** : Events Facebook avec mapping automatique
- **Microsoft Clarity** : Session recording et heatmaps

### 4. Server & Client Side
- Scripts injectés server-side dans `layout.tsx`
- Initialisation client-side via `AnalyticsProvider`
- Support SSR Next.js

## 📁 Architecture

```
src/
├── lib/
│   └── analytics.ts              # API d'analytics centralisée
├── components/
│   └── AnalyticsProvider.tsx    # Provider client-side
└── app/
    └── layout.tsx                # Injection des scripts
```

## 🔧 Configuration

### Variables d'environnement

```bash
# .env.local

# Google Analytics 4 (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_API_SECRET=your-api-secret

# Meta Pixel - Facebook (optionnel)
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# Microsoft Clarity (optionnel)
NEXT_PUBLIC_CLARITY_ID=abcdefghij
```

### Obtenir les IDs

#### Google Analytics 4
1. Aller sur [analytics.google.com](https://analytics.google.com)
2. Admin → Property → Data Streams
3. Copier le Measurement ID (`G-XXXXXXXXXX`)
4. Pour Measurement Protocol : Admin → Data Streams → Measurement Protocol API secrets

#### Meta Pixel
1. Aller sur [business.facebook.com](https://business.facebook.com)
2. Events Manager → Pixels
3. Copier le Pixel ID (15 chiffres)

#### Microsoft Clarity
1. Aller sur [clarity.microsoft.com](https://clarity.microsoft.com)
2. Settings → Setup
3. Copier le Project ID

## 📊 Utilisation

### 1. Tracking d'événements

```typescript
import { trackEvent } from '@/lib/analytics';

// Événement simple
trackEvent('button_click', {
  button_name: 'signup',
  page: 'home',
});

// Événement avec données
trackEvent('form_submit', {
  form: 'micro',
  variant: 'test-a',
  role: 'Gérant de boutique',
});
```

### 2. Tracking de conversions

```typescript
import { trackConversion } from '@/lib/analytics';

// Conversion avec valeur
trackConversion(25.50, 'EUR');
```

### 3. Page views automatiques

```typescript
// Automatique via AnalyticsProvider
// Pas besoin de code manuel
```

### 4. Identifier un utilisateur

```typescript
import { identifyUser } from '@/lib/analytics';

identifyUser('user-123', {
  email: 'user@example.com',
  name: 'John Doe',
  plan: 'premium',
});
```

## 🎯 Événements Mappés

Les événements sont automatiquement mappés vers les événements standard de chaque plateforme :

| Événement kiwoor | Google Analytics | Meta Pixel | Clarity |
|------------------|------------------|------------|---------|
| `form_submit` | `form_submit` | `Lead` | `form_submit` |
| `form_start` | `form_start` | `InitiateCheckout` | `form_start` |
| `cta_click` | `cta_click` | `Contact` | `cta_click` |
| `variant_shown` | `variant_shown` | `PageView` | `variant_shown` |
| `conversion` | `conversion` | `Purchase` | `conversion` |

## 🔍 Debugging

### Mode développement

En mode dev, tous les événements sont loggés dans la console :

```javascript
📊 Analytics Event: form_submit { form: 'micro', variant: 'test-a' }
```

### Vérifier l'initialisation

```javascript
// Dans la console du navigateur
window.dataLayer  // Google Analytics
window.fbq        // Meta Pixel
window.clarity    // Microsoft Clarity
```

### Logs serveur

```
✅ Google Analytics initialized: G-XXXXXXXXXX
✅ Meta Pixel initialized: 123456789012345
✅ Microsoft Clarity initialized: abcdefghij
📊 Analytics Status: { GA4: true, MetaPixel: true, Clarity: true }
```

## 📈 Analyse des Données

### Google Analytics 4

**Rapports → Events**
- Voir tous les événements trackés
- Filtrer par `event_name`
- Analyser les conversions

**Rapports → Custom Reports**
- Créer des rapports sur mesure
- Comparer les variants A/B
- Analyser les funnels

### Meta Pixel

**Events Manager → Event Details**
- Voir les événements en temps réel
- Vérifier les conversions
- Optimiser les campagnes pub

**Test Events**
- Outil de test en temps réel
- Valider les événements avant production

### Microsoft Clarity

**Dashboard → Recordings**
- Voir les sessions utilisateurs
- Identifier les problèmes UX
- Analyser les comportements

**Dashboard → Heatmaps**
- Voir où les utilisateurs cliquent
- Optimiser les CTAs
- Améliorer la navigation

## 🧪 Tests

### Test local

```typescript
// src/lib/analytics.ts
import { trackEvent } from '@/lib/analytics';

// Dans un composant
trackEvent('test_event', {
  test: true,
  timestamp: new Date().toISOString(),
});
```

**Vérifier dans la console** :
```
📊 Analytics Event: test_event { test: true, timestamp: '...' }
```

### Test production

```bash
# Ouvrir la console du navigateur sur production
https://kiwoor.com

# Vérifier que les scripts sont chargés
console.log(window.gtag)      // Google Analytics
console.log(window.fbq)       // Meta Pixel
console.log(window.clarity)   // Microsoft Clarity
```

## 🎛️ Configuration Avancée

### Custom Mapping

Modifier `src/lib/analytics.ts` pour personnaliser le mapping :

```typescript
const fbEventMap: { [key: string]: string } = {
  form_submit: 'Lead',
  purchase_complete: 'Purchase',
  custom_event: 'CustomEvent',
};
```

### Événements conditionnels

```typescript
// Tracker uniquement si l'utilisateur est connecté
if (isUserLoggedIn) {
  trackEvent('premium_feature_used', {
    feature: 'dashboard',
  });
}
```

### Données sensibles

```typescript
// Ne jamais tracker de données sensibles
trackEvent('user_action', {
  action: 'profile_update',
  // ❌ PAS DE: email, password, phone, etc.
  // ✅ OK: user_id (anonymisé), action_type, timestamp
});
```

## 📋 Checklist Déploiement

### Avant Production

- [ ] Configurer les variables d'environnement
- [ ] Tester les événements en dev
- [ ] Vérifier les scripts dans le head
- [ ] Valider avec Meta Pixel Test Events
- [ ] Vérifier GA4 Debug View
- [ ] Tester Clarity recordings

### En Production

- [ ] Déployer avec les env vars
- [ ] Vérifier que les scripts se chargent
- [ ] Envoyer un événement de test
- [ ] Vérifier dans GA4 Realtime
- [ ] Vérifier dans Meta Events Manager
- [ ] Vérifier dans Clarity Dashboard

## 🔒 Privacy & RGPD

### Consentement

```typescript
// Attendre le consentement avant d'initialiser
if (userConsent) {
  initAnalytics();
}
```

### Anonymisation

Google Analytics 4 anonymise automatiquement les IPs.

Pour Meta Pixel :
```typescript
window.fbq('consent', 'grant');  // Avec consentement
window.fbq('consent', 'revoke'); // Sans consentement
```

### Cookie Banner

Intégrer un cookie banner (ex: [Cookiebot](https://www.cookiebot.com/)) pour gérer les consentements.

## 🚀 Performance

### Impact sur le chargement

- **GA4** : ~45KB (async)
- **Meta Pixel** : ~30KB (async)
- **Clarity** : ~25KB (async)
- **Total** : ~100KB chargé en parallèle

### Optimisations

- Scripts chargés en `async`
- Initialisation après le premier paint
- Pas de blocage du rendu
- Chargement conditionnel (seulement si configuré)

## 📚 Resources

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Meta Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
- [Clarity Documentation](https://learn.microsoft.com/en-us/clarity/)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

## 🎉 Résultat

Vous avez maintenant :
- ✅ **API unifiée** : Un seul appel pour tous les services
- ✅ **Multi-plateformes** : GA4 + Meta + Clarity
- ✅ **Performance** : Chargement async et conditionnel
- ✅ **Type-safe** : TypeScript partout
- ✅ **Dev-friendly** : Logs détaillés en dev
- ✅ **Production-ready** : Tests OK, documentation complète

---

**Version** : 1.0.0  
**Date** : 27 octobre 2025  
**Auteur** : Équipe kiwoor

