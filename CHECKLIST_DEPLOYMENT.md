# ✅ Checklist Déploiement Analytics & A/B Testing - kiwoor

## 📋 AVANT DE COMMENCER

### Pré-requis
- [ ] Compte Google Analytics 4 créé
- [ ] Compte Facebook Business Manager créé  
- [ ] Compte Microsoft Clarity créé
- [ ] Compte Zapier créé
- [ ] Fichier `.env.local` créé à partir de `env.example`

### Outils de test
- [ ] Script de test téléchargé : `scripts/test-analytics-zapier.js`
- [ ] Node.js installé (pour lancer le script)
- [ ] Console développeur du navigateur accessible

---

## 🔧 PHASE 1 : CONFIGURATION ANALYTICS

### Google Analytics 4 (GA4)

#### Configuration de base
- [ ] 1. Aller sur [analytics.google.com](https://analytics.google.com)
- [ ] 2. **Admin** → **Data Streams** → **Add stream** → **Web**
- [ ] 3. URL : `https://votre-domaine.com` (ou localhost en dev)
- [ ] 4. Copier le **Measurement ID** (`G-XXXXXXXXXX`)
- [ ] 5. Ajouter dans `.env.local` : `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`

#### Measurement Protocol (optionnel mais recommandé)
- [ ] 1. **Data Streams** → Cliquez sur votre stream → **Measurement Protocol API secrets**
- [ ] 2. **Create** → Nom : `kiwoor-server-events`
- [ ] 3. Copier l'**API Secret**
- [ ] 4. Ajouter dans `.env.local` : `NEXT_PUBLIC_GA_MEASUREMENT_API_SECRET=your-secret`

#### Test GA4
- [ ] Lancer `npm run dev`
- [ ] Ouvrir la console du navigateur
- [ ] Vérifier le log : `✅ Google Analytics initialized: G-...`
- [ ] Aller sur [analytics.google.com](https://analytics.google.com) → **Reports** → **Realtime**
- [ ] Naviguer sur votre site → Voir l'activité en temps réel

### Meta Pixel (Facebook)

#### Configuration
- [ ] 1. Aller sur [business.facebook.com](https://business.facebook.com)
- [ ] 2. **Events Manager** → **Connect Data Sources** → **Web** → **Meta Pixel**
- [ ] 3. Nom : `kiwoor Pixel` | URL : `https://votre-domaine.com`
- [ ] 4. Copier le **Pixel ID** (15 chiffres)
- [ ] 5. Ajouter dans `.env.local` : `NEXT_PUBLIC_META_PIXEL_ID=123456789012345`

#### Test Meta Pixel
- [ ] Lancer `npm run dev`
- [ ] Console : Vérifier `✅ Meta Pixel initialized: ...`
- [ ] **Events Manager** → **Test Events** → Entrer votre URL
- [ ] Naviguer sur votre site → Voir les événements en temps réel
- [ ] Vérifier l'événement `PageView`

### Microsoft Clarity

#### Configuration
- [ ] 1. Aller sur [clarity.microsoft.com](https://clarity.microsoft.com)
- [ ] 2. **New Project** → Nom : `kiwoor` | URL : `https://votre-domaine.com`
- [ ] 3. **Settings** → **Setup** → Copier le **Project ID** (10 caractères)
- [ ] 4. Ajouter dans `.env.local` : `NEXT_PUBLIC_CLARITY_ID=abcdefghij`

#### Test Clarity
- [ ] Lancer `npm run dev`
- [ ] Console : Vérifier `✅ Microsoft Clarity initialized: ...`
- [ ] [clarity.microsoft.com](https://clarity.microsoft.com) → **Dashboard**
- [ ] Naviguer sur votre site 2-3 minutes
- [ ] Voir les sessions enregistrées (délai ~5-10 min)

---

## 🔗 PHASE 2 : CONFIGURATION ZAPIER

### Créer le Webhook

#### Zap Setup
- [ ] 1. [zapier.com](https://zapier.com) → **Create Zap**
- [ ] 2. **Trigger** : **Webhooks by Zapier** → **Catch Hook**
- [ ] 3. **Copy Webhook URL** (format : `https://hooks.zapier.com/hooks/catch/...`)
- [ ] 4. Ajouter dans `.env.local` : `ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/...`

#### Action (Google Sheets)
- [ ] 1. **Action** : **Google Sheets** → **Create Spreadsheet Row**
- [ ] 2. Connecter votre compte Google
- [ ] 3. Créer/sélectionner une feuille de calcul
- [ ] 4. Mapper les champs :
  - `A1` : Nom → `name`
  - `B1` : Email → `email`
  - `C1` : Téléphone → `phone`
  - `D1` : Rôle → `role`
  - `E1` : Variant → `variant`
  - `F1` : Date → `notifiedAt`

### Test Webhook

#### Test automatique
- [ ] Lancer : `node scripts/test-analytics-zapier.js`
- [ ] Vérifier : `✅ Webhook Zapier fonctionne`
- [ ] Aller dans votre Google Sheets → Voir la ligne de test

#### Test manuel
```bash
# Copier-coller dans le terminal
curl -X POST "VOTRE_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Manuel",
    "email": "test@kiwoor.com",
    "phone": "221777123456",
    "role": "Test",
    "variant": "test-manual"
  }'
```
- [ ] Exécuter la commande
- [ ] Vérifier les données dans Google Sheets

---

## 🧪 PHASE 3 : TESTS A/B

### URLs de Test Générées

Copier-coller ces URLs pour tester :

#### Local (dev)
```
Control:      http://localhost:3000/campaign/diaspora?variant=control
Hero Direct:  http://localhost:3000/campaign/diaspora?variant=test-hero-direct
Offre Gratuit: http://localhost:3000/campaign/diaspora?variant=test-offer-gratuit
CTA Urgent:   http://localhost:3000/campaign/diaspora?variant=test-cta-urgent
Social Proof: http://localhost:3000/campaign/diaspora?variant=test-social-proof
```

#### Production
```
Control:      https://votre-domaine.com/campaign/diaspora?variant=control
Hero Direct:  https://votre-domaine.com/campaign/diaspora?variant=test-hero-direct
Offre Gratuit: https://votre-domaine.com/campaign/diaspora?variant=test-offer-gratuit
CTA Urgent:   https://votre-domaine.com/campaign/diaspora?variant=test-cta-urgent
Social Proof: https://votre-domaine.com/campaign/diaspora?variant=test-social-proof
```

### Test des Variants

#### Test manuel des variants
- [ ] Ouvrir chaque URL dans un nouvel onglet incognito
- [ ] Vérifier que le contenu change (titre, CTA, etc.)
- [ ] Console : Voir `📊 Analytics Event: variant_shown`
- [ ] Vérifier localStorage : `localStorage.getItem('kiwoor_variant')`

#### Test persistance
- [ ] Aller sur une URL avec `?variant=test-hero-direct`
- [ ] Fermer l'onglet
- [ ] Aller sur `/campaign/diaspora` (sans paramètre)
- [ ] Vérifier que le variant `test-hero-direct` est toujours actif

#### Test analytics events
- [ ] Remplir le formulaire sur chaque variant
- [ ] Console : Voir `📊 Analytics Event: form_submit`
- [ ] Vérifier dans GA4 Realtime → Events
- [ ] Vérifier dans Meta Events Manager
- [ ] Vérifier les données dans Google Sheets (via Zapier)

---

## 🚀 PHASE 4 : DÉPLOIEMENT PRODUCTION

### Variables d'environnement

#### Vercel
```bash
# Ajouter dans Vercel Dashboard → Settings → Environment Variables
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_API_SECRET=your-secret
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
NEXT_PUBLIC_CLARITY_ID=abcdefghij
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
```

#### Netlify
```bash
# Ajouter dans Netlify Dashboard → Site Settings → Environment Variables
# Mêmes variables qu'au-dessus
```

### Test en Production

#### Après déploiement
- [ ] Aller sur `https://votre-domaine.com`
- [ ] Console : Vérifier tous les `✅ ... initialized`
- [ ] Test rapide : Remplir le formulaire
- [ ] Vérifier les données dans GA4, Meta, Clarity, Google Sheets

#### URLs de campagne finales
- [ ] Remplacer `localhost:3000` par votre domaine
- [ ] Tester toutes les URLs de variants
- [ ] Ajouter UTM parameters pour le tracking :
```
?variant=control&utm_source=facebook&utm_medium=cpc&utm_campaign=diaspora-test
```

---

## 📊 PHASE 5 : LANCEMENT CAMPAGNES

### Facebook Ads

#### Création des Ad Sets
- [ ] **Campagne** : "kiwoor - Test A/B Diaspora"
- [ ] **Objectif** : Conversions
- [ ] **Ad Set 1** : Control - Budget 20€/jour - URL avec `?variant=control`
- [ ] **Ad Set 2** : Test A - Budget 20€/jour - URL avec `?variant=test-hero-direct`
- [ ] **Durée** : 7 jours minimum

#### Vérification
- [ ] Pixel Meta connecté correctement
- [ ] Événement de conversion `Lead` configuré
- [ ] Audiences similaires configurées

### Google Ads

#### Création des Ads
- [ ] **Campagne** : "kiwoor - Diaspora A/B"
- [ ] **Ad 1** : URL avec `?variant=control`
- [ ] **Ad 2** : URL avec `?variant=test-hero-direct`
- [ ] Budget équivalent sur les 2 ads

### Suivi des Résultats

#### Dashboard GA4
- [ ] **Reports** → **Events** → Filtrer `variant_shown` et `form_submit`
- [ ] Créer un rapport personnalisé avec dimension `variant`
- [ ] Exporter vers Google Sheets pour analyse

#### Calcul des taux de conversion
```
Taux de conversion = (Événements form_submit / Événements variant_shown) × 100

Exemple :
Control: 150 vues, 8 conversions = 5.3%
Test A:  150 vues, 12 conversions = 8.0%
Amélioration: +51% vs Control
```

---

## 🎯 CRITÈRES DE SUCCÈS

### Métriques minimales pour validation

#### Trafic requis (par variant)
- [ ] Minimum 100 visiteurs uniques
- [ ] Minimum 30 conversions
- [ ] Durée minimum 7 jours
- [ ] Pas de modifications pendant le test

#### Significativité statistique
- [ ] Différence minimum 20% entre variants
- [ ] Confiance minimum 95%
- [ ] Test de chi-carré pour validation

#### Exemple d'analyse
```
Variant    | Visiteurs | Conversions | Taux | Amélioration
Control    | 500       | 25          | 5.0% | --
Test A     | 500       | 35          | 7.0% | +40%
Test B     | 500       | 30          | 6.0% | +20%

Winner: Test A (+40% vs Control)
Action: Déployer Test A comme version par défaut
```

---

## 🚨 TROUBLESHOOTING

### Analytics ne fonctionne pas
```bash
# Vérifier les variables
echo $NEXT_PUBLIC_GA_ID
echo $NEXT_PUBLIC_META_PIXEL_ID

# Test script
node scripts/test-analytics-zapier.js
```

### Variants A/B ne changent pas
```javascript
// Console du navigateur
localStorage.clear()
window.location.reload()

// Vérifier le variant actuel
localStorage.getItem('kiwoor_variant')
```

### Zapier ne reçoit pas les données
```bash
# Test manuel
curl -X POST "$ZAPIER_WEBHOOK_URL" -d '{"test":"data"}'

# Vérifier les logs Zapier
# Zapier Dashboard → Zap History
```

---

## 🏁 CHECKLIST FINALE

### Avant de dire "C'est prêt !"

- [ ] ✅ Tous les analytics configurés et testés
- [ ] ✅ Zapier fonctionne et envoie les données
- [ ] ✅ Tous les variants A/B testés manuellement
- [ ] ✅ Variables d'environnement en production
- [ ] ✅ Campagnes publicitaires créées
- [ ] ✅ Dashboard de suivi configuré
- [ ] ✅ Script de test passe sans erreur
- [ ] ✅ Documentation mise à jour

### Fichiers à consulter si problème
- `CONFIGURATION_ANALYTICS_ZAPIER.md` - Guide détaillé
- `ANALYTICS_SYSTEM.md` - Documentation technique
- `AB_TESTING_GUIDE.md` - Guide A/B testing
- `scripts/test-analytics-zapier.js` - Script de test

---

## 🎉 RÉSULTAT ATTENDU

À la fin de cette checklist, vous aurez :

✅ **Analytics complet** : GA4 + Meta Pixel + Clarity trackent tous les événements
✅ **Automatisation** : Leads envoyés automatiquement vers Google Sheets via Zapier  
✅ **Tests A/B** : 5 variants configurés et trackés automatiquement
✅ **Dashboards** : Suivi en temps réel sur tous les outils
✅ **Campagnes prêtes** : URLs optimisées pour Facebook et Google Ads
✅ **Données exploitables** : Métriques pour optimiser vos conversions

**🚀 Vous êtes prêt à lancer vos campagnes et optimiser avec de vraies données !**

---

**Dernière mise à jour** : 27 octobre 2025  
**Version** : 1.0.0  
**Status** : ✅ PRODUCTION READY
