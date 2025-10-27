# 🚀 Guide Configuration Analytics & Zapier - kiwoor

## Vue d'ensemble

Ce guide vous accompagne pour configurer complètement :
- **Analytics** : Google Analytics 4, Meta Pixel (Facebook), Microsoft Clarity
- **Zapier** : Webhook pour automatiser vos workflows
- **Tests A/B** : Campagnes avec vrais variants pour optimiser les conversions

## 📊 PARTIE 1 : Configuration Analytics

### 🔧 Variables d'environnement

Créez ou mettez à jour votre fichier `.env.local` :

```bash
# ===========================================
# ANALYTICS CONFIGURATION
# ===========================================

# Google Analytics 4 (GA4)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  
NEXT_PUBLIC_GA_MEASUREMENT_API_SECRET=your-measurement-api-secret

# Meta Pixel (Facebook)
NEXT_PUBLIC_META_PIXEL_ID=123456789012345

# Microsoft Clarity
NEXT_PUBLIC_CLARITY_ID=abcdefghij

# ===========================================
# ZAPIER WEBHOOK
# ===========================================
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/

# ===========================================
# AUTRES (déjà configurés)
# ===========================================
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
NEXT_PUBLIC_WHATSAPP_NUMBER=221777115972
```

### 🎯 Google Analytics 4 (GA4)

#### Étape 1 : Créer un compte GA4

1. Allez sur [analytics.google.com](https://analytics.google.com)
2. Créez un compte ou sélectionnez le vôtre
3. Créez une propriété **Google Analytics 4**

#### Étape 2 : Configurer le Data Stream

1. **Admin** → **Data Streams** → **Add stream** → **Web**
2. URL : `https://votre-domaine.com`
3. Nom : `kiwoor - Production`
4. **Copier le Measurement ID** (`G-XXXXXXXXXX`)

#### Étape 3 : Measurement Protocol API (optionnel mais recommandé)

1. **Admin** → **Data Streams** → Cliquez sur votre stream
2. **Measurement Protocol API secrets** → **Create**
3. Nom : `kiwoor-server-events`
4. **Copier l'API Secret**

#### Étape 4 : Variables d'environnement GA4

```bash
NEXT_PUBLIC_GA_ID=G-ABC123DEF4          # Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123DEF4
NEXT_PUBLIC_GA_MEASUREMENT_API_SECRET=abcd1234efgh5678
```

### 📘 Meta Pixel (Facebook)

#### Étape 1 : Accéder au Business Manager

1. Allez sur [business.facebook.com](https://business.facebook.com)
2. Sélectionnez votre Business Manager ou créez-en un

#### Étape 2 : Créer un Pixel

1. **Events Manager** → **Connect Data Sources** → **Web**
2. **Meta Pixel** → **Connect**
3. Nom : `kiwoor Pixel`
4. URL : `https://votre-domaine.com`

#### Étape 3 : Récupérer l'ID

1. **Events Manager** → **Data Sources** → Votre Pixel
2. **Settings** → Copier le **Pixel ID** (15 chiffres)

#### Étape 4 : Variable d'environnement Meta

```bash
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

### 🔍 Microsoft Clarity

#### Étape 1 : Créer un projet

1. Allez sur [clarity.microsoft.com](https://clarity.microsoft.com)
2. **New Project**
3. Nom : `kiwoor`
4. URL : `https://votre-domaine.com`

#### Étape 2 : Récupérer l'ID

1. **Settings** → **Setup**
2. Copier le **Project ID** (10 caractères)

#### Étape 3 : Variable d'environnement Clarity

```bash
NEXT_PUBLIC_CLARITY_ID=abcdefghij
```

### ✅ Test Analytics

Une fois configuré, testez avec cette commande en dev :

```bash
npm run dev
```

Ouvrez la console du navigateur, vous devriez voir :

```
✅ Google Analytics initialized: G-ABC123DEF4
✅ Meta Pixel initialized: 123456789012345  
✅ Microsoft Clarity initialized: abcdefghij
📊 Analytics Status: { GA4: true, MetaPixel: true, Clarity: true }
```

## 🔗 PARTIE 2 : Configuration Zapier

### 🎯 Créer un Webhook Zapier

#### Étape 1 : Nouveau Zap

1. Allez sur [zapier.com](https://zapier.com)
2. **Create Zap**
3. **Trigger** : **Webhooks by Zapier** → **Catch Hook**

#### Étape 2 : Configuration du Webhook

1. **Copy Webhook URL** (format : `https://hooks.zapier.com/hooks/catch/12345/abcdef/`)
2. **Continue** sans tester pour l'instant

#### Étape 3 : Action (exemple avec Google Sheets)

1. **Action** : **Google Sheets** → **Create Spreadsheet Row**
2. Connectez votre compte Google
3. Choisissez votre feuille de calcul
4. Mappez les champs :
   - `Nom` → `name`
   - `Email` → `email` 
   - `Téléphone` → `phone`
   - `Role` → `role`
   - `Variant` → `variant`
   - `Date` → `notifiedAt`

#### Étape 4 : Variable d'environnement

```bash
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/12345/abcdef/
```

### 🧪 Test Webhook

#### Test en développement

```bash
curl -X POST http://localhost:3000/api/webhook/notify-zapier \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "221777123456",
    "role": "Gérant de boutique",
    "variant": "test-a"
  }'
```

#### Test depuis l'interface

1. Allez sur votre page de campagne
2. Remplissez le formulaire
3. Vérifiez que les données arrivent dans Zapier

## 🧪 PARTIE 3 : Tests A/B Réels

### 🎯 Campagne Diaspora - Exemple Concret

#### URLs de Test

```bash
# Control (version actuelle)
https://votre-domaine.com/campaign/diaspora?variant=control

# Test A (nouveau titre)  
https://votre-domaine.com/campaign/diaspora?variant=test-hero-direct

# Test B (nouvelle offre)
https://votre-domaine.com/campaign/diaspora?variant=test-offer-gratuit

# Test C (nouveau CTA)
https://votre-domaine.com/campaign/diaspora?variant=test-cta-urgent
```

#### Configuration des Variants

Modifiez `src/app/campaign/diaspora/page.tsx` :

```typescript
'use client';

import { useState } from 'react';
import ABVariant from '@/components/ABVariant';
import LandingPage from '@/components/LandingPage';

export default function DiasporaPage() {
  const [variant, setVariant] = useState<string | null>(null);

  // Configuration des variants
  const getVariantConfig = (variant: string | null) => {
    switch (variant) {
      case 'test-hero-direct':
        return {
          title: "Tu galères à trouver quelqu'un de confiance au Sénégal ?",
          subtitle: "Découvre la solution qui aide + de 500 diasporans",
          ctaText: "Je veux essayer gratuitement"
        };
        
      case 'test-offer-gratuit':
        return {
          title: "Embauche au Sénégal en toute sécurité",
          subtitle: "Essai gratuit 7 jours - Sans engagement",
          ctaText: "Commencer l'essai gratuit"
        };
        
      case 'test-cta-urgent':
        return {
          title: "Embauche au Sénégal en toute sécurité", 
          subtitle: "Profils 100% vérifiés, contrats légaux",
          ctaText: "Réserver ma place (places limitées)"
        };
        
      default: // control
        return {
          title: "Embauche au Sénégal en toute sécurité",
          subtitle: "Profils 100% vérifiés, contrats légaux",
          ctaText: "Découvrir kiwoor"
        };
    }
  };

  const config = getVariantConfig(variant);

  return (
    <>
      <ABVariant onVariantChange={setVariant} />
      <LandingPage 
        variant={variant || 'control'}
        config={config}
      />
    </>
  );
}
```

### 🚀 Lancer les Campagnes

#### Facebook Ads

1. **Campagne** : "kiwoor - Test A/B Hero"
2. **Objectif** : Conversions
3. **Ad Sets** :
   - Control : Budget 20€/jour → URL avec `?variant=control`
   - Test A : Budget 20€/jour → URL avec `?variant=test-hero-direct`
   - Test B : Budget 20€/jour → URL avec `?variant=test-offer-gratuit`

#### Google Ads

1. **Campagne** : "kiwoor - Diaspora A/B"
2. **Ads** :
   - Control : URL avec `?variant=control`
   - Test A : URL avec `?variant=test-hero-direct`

### 📊 Suivi des Résultats

#### Google Analytics 4

1. **Reports** → **Events**
2. Créer un rapport personnalisé :
   - **Dimension** : `variant` (custom parameter)  
   - **Metrics** : `variant_shown`, `form_submit`
3. Analyser les taux de conversion par variant

#### Tableau de Bord Temps Réel

```javascript
// Console du navigateur pour débugger
localStorage.getItem('kiwoor_variant') // Voir le variant actuel
window.dataLayer // Voir tous les events trackés
```

## 📋 CHECKLIST DE DÉPLOIEMENT

### ✅ Phase 1 : Configuration

- [ ] Variables `.env.local` configurées
- [ ] GA4 : Measurement ID récupéré
- [ ] Meta Pixel : ID récupéré  
- [ ] Clarity : Project ID récupéré
- [ ] Zapier : Webhook URL configurée
- [ ] Tests en développement OK

### ✅ Phase 2 : Déploiement

- [ ] Variables d'environnement sur Vercel/production
- [ ] Test analytics en production
- [ ] Test webhook Zapier en production
- [ ] Vérification des scripts dans le head
- [ ] Events trackés correctement

### ✅ Phase 3 : Campagnes A/B

- [ ] URLs de variants créées
- [ ] Variants testés manuellement
- [ ] Campagnes publicitaires configurées
- [ ] Budget réparti équitablement
- [ ] Durée définie (minimum 7 jours)

### ✅ Phase 4 : Suivi

- [ ] Dashboard GA4 configuré
- [ ] Rapports Meta Pixel OK
- [ ] Clarity recordings actives
- [ ] Webhook Zapier fonctionne
- [ ] Données dans Google Sheets

## 🎯 EXEMPLES DE CAMPAGNES

### Campagne 1 : Test Hero Section

**Hypothèse** : Un titre plus direct augmente les conversions de 25%

**URLs** :
```
Control : ?variant=control
Test A  : ?variant=hero-direct
```

**KPIs** :
- Taux de clic sur CTA
- Taux de soumission formulaire
- Coût par lead

### Campagne 2 : Test Offre

**Hypothèse** : "Essai gratuit" convertit mieux que "Découvrir"

**URLs** :
```
Control : ?variant=control  
Test A  : ?variant=offer-free-trial
```

**KPIs** :
- Conversions
- Quality Score (Google Ads)
- CPM (Facebook)

### Campagne 3 : Test Complet

**Hypothèse** : Landing page réimaginée améliore l'UX

**URLs** :
```
Control : ?variant=control
Test A  : ?variant=redesign-v2
```

**KPIs** :
- Temps sur page
- Taux de rebond  
- Conversions

## 🚨 TROUBLESHOOTING

### Analytics ne se charge pas

```bash
# Vérifier les variables
echo $NEXT_PUBLIC_GA_ID
echo $NEXT_PUBLIC_META_PIXEL_ID
echo $NEXT_PUBLIC_CLARITY_ID

# Vérifier en prod
curl -I https://votre-domaine.com
```

### Zapier ne reçoit pas les données

1. Vérifier l'URL dans `.env.local`
2. Tester manuellement :

```bash
curl -X POST $ZAPIER_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### Variants A/B ne fonctionnent pas

1. Vérifier localStorage : `localStorage.getItem('kiwoor_variant')`
2. Tester les URLs manuellement
3. Vérifier la console pour les events

## 🎉 RÉSULTAT FINAL

Une fois configuré, vous aurez :

✅ **Analytics complet** : GA4 + Meta + Clarity intégrés
✅ **Automation Zapier** : Leads automatiquement dans vos outils
✅ **Tests A/B** : Variants trackés et analysables
✅ **Dashboard unifié** : Toutes les métriques en un endroit
✅ **Production ready** : Scalable et optimisé

---

**🔄 Prochaines étapes** : Une fois ce guide suivi, vous pourrez lancer vos premières campagnes A/B et commencer à optimiser vos conversions avec des données réelles !

**📞 Support** : Si vous avez des questions, consultez les fichiers `ANALYTICS_SYSTEM.md` et `AB_TESTING_GUIDE.md` pour plus de détails techniques.
