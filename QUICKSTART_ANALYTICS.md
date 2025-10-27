# ⚡ Quickstart - Analytics & A/B Testing (5 minutes)

> Guide ultra-rapide pour configurer Analytics et lancer vos premiers tests A/B

## 🚀 ÉTAPE 1 : Configuration Express (2 min)

### 1. Copier le fichier d'environnement
```bash
cp env.example .env.local
```

### 2. Récupérer vos IDs rapidement

**Google Analytics 4** (30 sec)
1. [analytics.google.com](https://analytics.google.com) → Admin → Data Streams → Copier `G-XXXXXXXXXX`

**Meta Pixel** (30 sec)  
1. [business.facebook.com](https://business.facebook.com) → Events Manager → Pixels → Copier l'ID (15 chiffres)

**Microsoft Clarity** (30 sec)
1. [clarity.microsoft.com](https://clarity.microsoft.com) → New Project → Copier l'ID (10 caractères)

**Zapier** (30 sec)
1. [zapier.com](https://zapier.com) → Create Zap → Webhooks → Catch Hook → Copier l'URL

### 3. Coller dans .env.local
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
NEXT_PUBLIC_CLARITY_ID=abcdefghij
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
```

## 🧪 ÉTAPE 2 : Test Rapide (1 min)

```bash
# Lancer le script de test
node scripts/test-analytics-zapier.js

# Lancer l'app
npm run dev
```

**Vérifications** :
- ✅ Console : `✅ Google Analytics initialized`
- ✅ Console : `✅ Meta Pixel initialized` 
- ✅ Console : `✅ Microsoft Clarity initialized`
- ✅ Script : `Webhook Zapier: ✅`

## 🎯 ÉTAPE 3 : Test A/B Express (2 min)

### URLs de test prêtes à utiliser :

```
✨ Control:      localhost:3000/campaign/diaspora?variant=control
🎯 Hero Direct:  localhost:3000/campaign/diaspora?variant=test-hero-direct  
🎁 Gratuit:      localhost:3000/campaign/diaspora?variant=test-offer-gratuit
⚡ Urgent:       localhost:3000/campaign/diaspora?variant=test-cta-urgent
⭐ Social Proof: localhost:3000/campaign/diaspora?variant=test-social-proof
```

### Test rapide :
1. Ouvrir chaque URL → Voir le contenu changer
2. Remplir le formulaire → Voir les données dans Google Sheets
3. Console → Voir `📊 Analytics Event: variant_shown`

## 🚀 ÉTAPE BONUS : Campagnes Pub (optionnel)

### Facebook/Google Ads URLs :
```
Control: https://votre-domaine.com/campaign/diaspora?variant=control&utm_source=facebook&utm_medium=cpc
Test A:  https://votre-domaine.com/campaign/diaspora?variant=test-hero-direct&utm_source=facebook&utm_medium=cpc  
```

## ✅ CHECKLIST ULTRA-RAPIDE

- [ ] `.env.local` configuré avec vos IDs
- [ ] `npm run dev` → Analytics initialisés dans la console
- [ ] Test script → `✅ Webhook Zapier fonctionne`
- [ ] URLs variants → Contenu change bien
- [ ] Formulaire testé → Données dans Google Sheets
- [ ] Production → Variables env configurées sur Vercel/Netlify

## 📊 RÉSULTAT EN 5 MIN

Vous avez maintenant :
- ✅ **Analytics complet** sur GA4, Meta et Clarity
- ✅ **Zapier automation** vers Google Sheets  
- ✅ **5 variants A/B** prêts à tester
- ✅ **URLs optimisées** pour les campagnes pub

## 🆘 PROBLÈME ?

**Analytics ne marche pas** → Vérifier les IDs dans `.env.local`
**Variants ne changent pas** → Console → `localStorage.clear()` → Reload
**Zapier ne reçoit rien** → Tester l'URL webhook manuellement
**Plus de détails** → Voir `CONFIGURATION_ANALYTICS_ZAPIER.md`

---

**🎉 C'est parti ! Vous pouvez maintenant lancer vos campagnes A/B avec de vraies données.**

**⏱️ Temps total : 5 minutes | 📈 ROI : Infini**
