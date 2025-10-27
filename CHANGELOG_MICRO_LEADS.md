# 🎯 Changelog - Micro-Leads API Implementation

## Version 2.0.0 - 27 Octobre 2025

### 🎉 Nouvelles Fonctionnalités

#### 1. Formulaire Micro-Lead Simplifié
- **3 champs uniquement** : Role (select), City (input), Contact (input)
- **Analytics intégré** : form_start et form_submit events
- **Fallback dev** : Sauvegarde locale en cas d'échec API
- **État de confirmation** : Page de succès avec récapitulatif

#### 2. API Multi-Types
- **Support "micro"** : Formulaire simplifié pour campagnes
- **Support "full"** : Formulaire complet existant (conservé)
- **Tracking variant** : Paramètre variant dans tous les types
- **Tracking UTM** : Paramètres UTM source/medium/campaign

#### 3. Webhook Zapier
- **Endpoint** : `/api/webhook/notify-zapier`
- **Asynchrone** : Non bloquant pour l'utilisateur
- **Configurable** : Via ZAPIER_WEBHOOK_URL env var
- **Payload complet** : type, role, city, contact, variant, utm

#### 4. Google Sheets Structure
- **Nouvelle feuille** : MicroLeads (10 colonnes)
- **Colonnes ajoutées** : Lead Type, Variant, UTM Source
- **Script mis à jour** : setup-google-sheets.js crée automatiquement

#### 5. Dev Tools
- **API fallback** : `/api/dev/save-local` (dev uniquement)
- **Fichier local** : `/data/leads.json`
- **Debugging** : Logs détaillés côté serveur

### 🔧 Modifications Techniques

#### Fichiers Créés
```
src/
├── app/
│   └── api/
│       ├── webhook/
│       │   └── notify-zapier/
│       │       └── route.ts          ✅ NOUVEAU
│       └── dev/
│           └── save-local/
│               └── route.ts          ✅ NOUVEAU
└── components/
    └── MicroLeadForm.tsx             ✅ MODIFIÉ (breaking change)

MICRO_LEADS_API.md                    ✅ NOUVEAU
CHANGELOG_MICRO_LEADS.md              ✅ NOUVEAU
```

#### Fichiers Modifiés
```
src/
├── app/
│   └── api/
│       └── submit-form/
│           └── route.ts              ✅ MODIFIÉ (support multi-types)
└── components/
    └── AdLanding.tsx                 ✅ MODIFIÉ (extraction UTM)

scripts/
└── setup-google-sheets.js            ✅ MODIFIÉ (3 feuilles)

env.example                           ✅ MODIFIÉ (+ ZAPIER_WEBHOOK_URL)
.gitignore                            ✅ MODIFIÉ (+ /data/)
```

### ⚠️ Breaking Changes

#### 1. MicroLeadForm Interface
**Avant** :
```typescript
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
}
```

**Après** :
```typescript
interface FormData {
  role: string;      // ⚠️ NOUVEAU
  city: string;      // ⚠️ NOUVEAU
  contact: string;   // ⚠️ NOUVEAU (remplace email + phone)
}
```

#### 2. Google Sheets Columns Order
**Avant** :
```
Timestamp | Type | Nom complet | Email | ...
```

**Après** :
```
Timestamp | Type User | Lead Type | Variant | Nom complet | Email | ...
           ^^^^^^^^^  ^^^^^^^^^^  ^^^^^^^^
           RENOMMÉ    NOUVEAU     NOUVEAU
```

**Action requise** : Exécuter `npm run setup-sheets` pour mettre à jour

### 📊 Structure des Données

#### MicroLeads (Nouveau)
```
┌──────────────┬──────┬─────────┬────────────────────┬────────┬──────────────┬────────────┬────────────┬──────────────┬──────────┐
│ Timestamp    │ Type │ Variant │ Poste recherché    │ Ville  │ Contact      │ UTM Source │ UTM Medium │ UTM Campaign │ UTM Full │
├──────────────┼──────┼─────────┼────────────────────┼────────┼──────────────┼────────────┼────────────┼──────────────┼──────────┤
│ 27/10/25 ... │ micro│ test-a  │ Gérant de boutique │ Dakar  │ +221771...   │ facebook   │ cpc        │ diaspora-... │ {...}    │
└──────────────┴──────┴─────────┴────────────────────┴────────┴──────────────┴────────────┴────────────┴──────────────┴──────────┘
```

#### Diaspora/Locaux (Mis à jour)
```
┌──────────────┬───────────┬───────────┬─────────┬──────────────┬───────┬────────────┬──────┬─────────────┬────────────┐
│ Timestamp    │ Type User │ Lead Type │ Variant │ Nom complet  │ Email │ Téléphone  │ Pays │ Type poste  │ UTM Source │
├──────────────┼───────────┼───────────┼─────────┼──────────────┼───────┼────────────┼──────┼─────────────┼────────────┤
│ 27/10/25 ... │ diaspora  │ full      │ control │ John Doe     │ j@... │ +33612...  │ FR   │ Gérant      │ google     │
└──────────────┴───────────┴───────────┴─────────┴──────────────┴───────┴────────────┴──────┴─────────────┴────────────┘
```

### 🚀 Migration Guide

#### 1. Mettre à jour Google Sheets
```bash
npm run setup-sheets
```

Cela va :
- Créer la feuille `MicroLeads`
- Ajouter les colonnes manquantes
- Reformater les en-têtes

#### 2. Configurer Zapier (optionnel)
```bash
# Créer un webhook Zapier
# Ajouter à .env.local
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/
```

#### 3. Mettre à jour les variables d'environnement
```bash
# .env.local
NEXT_PUBLIC_WHATSAPP_NUMBER=221777115972    # Existant
ZAPIER_WEBHOOK_URL=https://...              # Nouveau (optionnel)
```

#### 4. Redéployer
```bash
npm run build
npm run deploy
```

### 📈 Analytics Events

| Event | Trigger | Data |
|-------|---------|------|
| `variant_shown` | Page chargée | variant, page |
| `cta_click` | Click CTA | variant, cta_type |
| `form_start` | Premier focus | form, variant |
| `form_submit` | Soumission réussie | form, variant, role |

### 🧪 Tests

#### Test API Micro-Lead
```bash
curl -X POST http://localhost:3000/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{
    "type": "micro",
    "role": "Gérant de boutique",
    "city": "Dakar",
    "contact": "+221771115972",
    "variant": "test-a",
    "utm": {"utm_source": "facebook"}
  }'
```

**Résultat attendu** :
```json
{
  "success": true,
  "message": "Données sauvegardées avec succès",
  "type": "micro",
  "variant": "test-a"
}
```

#### Test Page Campaign
```
http://localhost:3000/campaign/diaspora?variant=test-a&utm_source=facebook
```

**Vérifier** :
1. H1 visible
2. Click "S'inscrire" → Modal s'ouvre
3. Remplir formulaire → Succès
4. Google Analytics → Events form_start, form_submit

### 🎯 Utilisation en Production

#### URL Campagne avec A/B Testing
```
https://kiwoor.com/campaign/diaspora?variant=fb-hero-v1&utm_source=facebook&utm_medium=cpc&utm_campaign=diaspora-q1-2025&utm_content=hero-cta
```

#### Analyser les Résultats
1. **Google Sheets** : Ouvrir feuille `MicroLeads`
2. **Filtrer par variant** : Comparer conversions A vs B
3. **Analyser UTM** : Quel canal performe le mieux
4. **Google Analytics** : form_start / form_submit ratio

### 📚 Documentation

- **API Complete** : `MICRO_LEADS_API.md`
- **Campaign Landing** : `src/app/campaign/diaspora/README.md`
- **Original Campaign** : `CAMPAIGN_DIASPORA.md`

### ✅ Checklist Déploiement

- [ ] Exécuter `npm run setup-sheets`
- [ ] Vérifier que la feuille `MicroLeads` existe
- [ ] Configurer `ZAPIER_WEBHOOK_URL` (optionnel)
- [ ] Tester le formulaire en local
- [ ] Build sans erreur : `npm run build`
- [ ] Déployer : `npm run deploy`
- [ ] Tester en production
- [ ] Configurer Google Analytics
- [ ] Lancer les campagnes avec variant

### 🐛 Bugs Connus
Aucun bug connu à ce jour.

### 🔮 Prochaines Étapes
- [ ] Dashboard analytics pour comparer variants
- [ ] Auto-response email après soumission
- [ ] SMS notification via Twilio
- [ ] CRM integration (Salesforce, HubSpot)
- [ ] Webhook retry logic avec exponential backoff

---

**Version** : 2.0.0  
**Date** : 27 octobre 2025  
**Auteur** : Équipe kiwoor  
**Commits** :
- `dcf8705` - feat(campaign): add diaspora landing
- `fdf6693` - feat(api): support micro-leads + variant

