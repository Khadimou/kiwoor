# 🎯 Landing Page Campagne Diaspora

## 📍 URL
`/campaign/diaspora`

## 🎨 Description
Landing page optimisée pour les campagnes publicitaires ciblant la diaspora sénégalaise. Conçue pour maximiser les conversions avec un formulaire ultra-simplifié (4 champs) et des CTA clairs.

## ✨ Fonctionnalités

### Above-the-Fold
- **H1 accrocheur** : "Tu galères à trouver quelqu'un de confiance au bled ?"
- **Badge de vérification** : CNI ✓ Casier ✓ Références ✓
- **Preuve sociale** : Témoignage d'Aminata D. (Paris → Dakar) avec photo
- **Dual CTA** :
  - Primaire : "S'inscrire (2 min)" → Ouvre le formulaire modal
  - Secondaire : "Parler via WhatsApp" → Lien direct WhatsApp
- **Trust indicators** :
  - Inscription gratuite (2 min)
  - Les 20 premiers ont -50%
  - Remplacement 30j gratuit
- **Métriques** : 100% vérifiés, 48h réponse, 0€ inscription

### Formulaire Micro-Lead (Modal)
- **4 champs uniquement** :
  1. Nom complet
  2. Email
  3. Téléphone WhatsApp
  4. Pays de résidence
- **CTA** : "🚀 Recevoir mes profils sous 48h"
- **Confirmation** : Page de succès avec récapitulatif

### Analytics & Tracking
- **Variant tracking** : Track variant via query param `?variant=test-a`
- **Event tracking** :
  - `variant_shown` : Quand une variante est affichée
  - `cta_click` : Clics sur les CTAs
  - `lead_form_submit` : Soumission du formulaire
  - `conversion` : Conversion réussie

## 🔧 Configuration

### Variables d'environnement
```bash
# .env.local
NEXT_PUBLIC_WHATSAPP_NUMBER=221777115972
```

### Paramètres URL
- `variant` : Variante de la page (ex: `?variant=test-a`)

## 📊 A/B Testing
Pour tester différentes variantes, ajoutez le paramètre `variant` :
- `/campaign/diaspora?variant=control`
- `/campaign/diaspora?variant=test-a`
- `/campaign/diaspora?variant=test-b`

Les événements seront trackés avec le nom de la variante.

## 🎯 Utilisation

### Campagnes Facebook Ads
```
URL de destination : https://kiwoor.com/campaign/diaspora?variant=fb-{{ad.id}}
```

### Campagnes Google Ads
```
URL finale : https://kiwoor.com/campaign/diaspora?variant=google-{{creative}}
```

### Tracking UTM
```
https://kiwoor.com/campaign/diaspora?variant=fb-test&utm_source=facebook&utm_medium=cpc&utm_campaign=diaspora-jan-2025
```

## 📱 Responsive
- **Mobile-first** : Optimisé pour mobile (90% du trafic)
- **Desktop** : Layout adapté pour grands écrans
- **Tablet** : Layout intermédiaire fluide

## 🚀 Performance
- **Bundle size** : Minimal (composants client uniquement)
- **Images** : Optimisées avec Next.js Image
- **Loading** : Suspense boundary avec fallback

## 📈 Metrics à surveiller
- **Taux de conversion** : Visiteurs → Soumissions formulaire
- **Taux de rebond** : % qui quittent sans interaction
- **Time on page** : Temps moyen sur la page
- **CTA clicks** : Clics sur les boutons principaux
- **WhatsApp clicks** : Clics sur le bouton WhatsApp

## 🔄 Prochaines optimisations
- [ ] Version vidéo du témoignage
- [ ] Exit-intent popup
- [ ] Live chat integration
- [ ] Social proof counter (inscriptions en temps réel)
- [ ] Multi-step form avec progress bar

