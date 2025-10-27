# 🎯 Landing Page Campagne Diaspora - Documentation

## ✅ Ce qui a été créé

### 1. Page Next.js (`src/app/campaign/diaspora/page.tsx`)
- Route Next.js App Router : `/campaign/diaspora`
- Détection du paramètre `variant` via `useSearchParams`
- Tracking analytics automatique de la variante affichée
- Suspense boundary pour le chargement

### 2. Composant AdLanding (`src/components/AdLanding.tsx`)
- Composant principal de la landing page
- Above-the-fold optimisé avec tous les éléments demandés
- Tracking des événements (variant shown, CTA clicks)
- Intégration WhatsApp via variable d'environnement

### 3. Composant MicroLeadForm (`src/components/MicroLeadForm.tsx`)
- Formulaire simplifié à 4 champs (nom, email, téléphone, pays)
- Modal responsive avec animation
- Page de confirmation après soumission
- Tracking des conversions
- Sauvegarde dans Google Sheets via API existante

### 4. Variables d'environnement
- Ajout de `NEXT_PUBLIC_WHATSAPP_NUMBER` dans `env.example`
- Valeur par défaut : 221777115972 (+221 77 711 59 72)

## 🎨 Spécifications Implémentées

### Above-the-Fold ✅
- **H1** : "Tu galères à trouver quelqu'un de confiance au bled ?"
- **Sous-texte** : "Gérant, gardien, gestionnaire terrain, aide famille..."
- **Badge** : CNI ✓ Casier ✓ Références ✓
- **Preuve sociale** : Image `/Aminata.png` + témoignage court + 5 étoiles
- **CTA principal** : "S'inscrire (2 min)" → Ouvre MicroLeadForm (modal)
- **CTA secondaire** : "Parler via WhatsApp" → wa.me link avec NEXT_PUBLIC_WHATSAPP_NUMBER
- **Mentions** :
  - "Inscription gratuite (2 min)"
  - "Les 20 premiers inscrits ont -50%"
  - "Remplacement 30j gratuit"
- **Trust indicators** : 100% vérifiés, 48h réponse, 0€ inscription

### Analytics ✅
- Détection du paramètre `variant` via `useSearchParams`
- Tracking `variant_shown` avec Google Analytics
- Tracking des clics CTA (primary, whatsapp)
- Tracking de la soumission du formulaire
- Tracking des conversions réussies

## 🚀 Tests Réalisés

### ✅ Tests de fonctionnement
```bash
npm run dev
```

- **Page accessible** : `/campaign/diaspora` → HTTP 200 ✅
- **Avec variant** : `/campaign/diaspora?variant=test-a` → HTTP 200 ✅
- **Pas d'erreurs de linting** : ESLint clean ✅
- **Pas d'erreurs TypeScript** : Types corrects ✅

### Tests manuels recommandés
1. Ouvrir `http://localhost:3000/campaign/diaspora`
2. Vérifier que le H1 est visible
3. Cliquer sur "S'inscrire (2 min)" → Modal s'ouvre
4. Remplir le formulaire → Confirmation affichée
5. Cliquer sur "Parler via WhatsApp" → Ouvre WhatsApp
6. Tester avec `?variant=test-a` → Vérifie console analytics

## 📁 Fichiers Créés

```
kiwoor/
├── src/
│   ├── app/
│   │   └── campaign/
│   │       └── diaspora/
│   │           ├── page.tsx          ✅ NOUVEAU
│   │           └── README.md         ✅ NOUVEAU
│   └── components/
│       ├── AdLanding.tsx             ✅ NOUVEAU
│       └── MicroLeadForm.tsx         ✅ NOUVEAU
├── env.example                       ✅ MODIFIÉ (ajout NEXT_PUBLIC_WHATSAPP_NUMBER)
└── CAMPAIGN_DIASPORA.md              ✅ NOUVEAU
```

## 🎯 Utilisation pour les Campagnes Publicitaires

### Facebook Ads
```
URL de destination : https://kiwoor.com/campaign/diaspora?variant=fb-{{ad.id}}
```

### Google Ads
```
URL finale : https://kiwoor.com/campaign/diaspora?variant=google-{{creative}}
```

### Tracking UTM Complet
```
https://kiwoor.com/campaign/diaspora?variant=fb-test&utm_source=facebook&utm_medium=cpc&utm_campaign=diaspora-jan-2025&utm_content=hero-v1
```

## 📊 A/B Testing

### Variantes Suggérées
- **Control** : `?variant=control`
- **Test A** : `?variant=test-a` (ex: modification du H1)
- **Test B** : `?variant=test-b` (ex: modification de l'offre)

### Événements Trackés
1. **variant_shown** : Affichage de la variante
2. **cta_click** : Clic sur CTA (primary/whatsapp)
3. **lead_form_submit** : Soumission du formulaire
4. **conversion** : Conversion réussie

## 🔧 Configuration Requise

### Variables d'environnement (.env.local)
```bash
# WhatsApp (obligatoire pour le bouton WhatsApp)
NEXT_PUBLIC_WHATSAPP_NUMBER=221777115972

# Google Sheets (déjà configuré)
GOOGLE_SHEETS_PRIVATE_KEY="..."
GOOGLE_SHEETS_CLIENT_EMAIL="..."
GOOGLE_SHEETS_SPREADSHEET_ID="..."
```

### Dépendances
Toutes les dépendances sont déjà installées :
- `next` : ^16.0.0
- `react` : ^19.2.0
- `lucide-react` : ^0.546.0
- `googleapis` : ^164.1.0

## 📈 Optimisations Implémentées

### Performance
- Composants client uniquement là où nécessaire
- Suspense boundary avec fallback
- Images optimisées avec Next.js Image
- Bundle minimal (pas de dépendances lourdes)

### UX
- Formulaire ultra-simplifié (4 champs vs 15+ sur la page principale)
- Modal responsive avec animation fluide
- Page de confirmation immédiate
- Double CTA (inscription + WhatsApp) pour différents profils

### SEO & Analytics
- Google Analytics intégré
- Tracking granulaire des événements
- Support des variantes A/B
- URL propres avec query params

### Mobile-First
- Design responsive complet
- Touch-friendly (boutons larges)
- WhatsApp natif sur mobile
- Modal plein écran sur petits écrans

## 🎉 Résultat

Une landing page **ultra-optimisée pour la conversion** avec :

- ✅ **Above-the-fold impactant** : H1 accrocheur + preuves sociales
- ✅ **Formulaire micro-lead** : 4 champs = 2 minutes
- ✅ **Double CTA** : Inscription + WhatsApp
- ✅ **Trust elements** : Badge vérification, garanties, offres
- ✅ **Analytics complet** : Tracking de toutes les interactions
- ✅ **A/B testing ready** : Support variantes via URL
- ✅ **Mobile-optimized** : Design responsive parfait
- ✅ **Integration complète** : Sauvegarde Google Sheets

## 🚀 Prochaines Étapes

### Déploiement
```bash
# Ajouter NEXT_PUBLIC_WHATSAPP_NUMBER dans Vercel
vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER

# Déployer
npm run deploy
```

### Campagnes
1. Créer les annonces Facebook/Google
2. Utiliser l'URL `/campaign/diaspora?variant=XXX`
3. Monitorer les conversions dans Google Analytics
4. Optimiser selon les variantes performantes

### Optimisations Futures
- [ ] Version vidéo du témoignage
- [ ] Exit-intent popup pour récupérer les abandons
- [ ] Live chat integration (Crisp, Intercom)
- [ ] Social proof counter (inscriptions en temps réel)
- [ ] Multi-step form si besoin de plus d'infos

---

**Créé le** : 27 octobre 2025  
**Commit** : `feat(campaign): add diaspora landing`  
**Status** : ✅ READY FOR PRODUCTION

