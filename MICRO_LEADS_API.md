# 📝 API Micro-Leads - Documentation

## ✅ Ce qui a été implémenté

### 1. MicroLeadForm Component (`src/components/MicroLeadForm.tsx`)
Formulaire simplifié avec 3 champs au lieu de 4+ :
- **role** (select) : Type de poste recherché
- **city** (input) : Ville au Sénégal
- **contact** (input) : WhatsApp ou Email

#### Analytics Events
- **form_start** : Déclenché au premier focus sur un champ
- **form_submit** : Déclenché après soumission réussie

#### Fonctionnalités
- Validation HTML5
- États de chargement
- Page de confirmation avec récapitulatif
- Fallback dev (sauvegarde locale si API échoue)

### 2. API Route `/api/submit-form` (MODIFIÉE)
Support de deux types de formulaires :

#### Type: "micro" (nouveau)
```json
{
  "type": "micro",
  "role": "Gérant de boutique",
  "city": "Dakar",
  "contact": "+221771115972",
  "variant": "test-a",
  "utm": {
    "utm_source": "facebook",
    "utm_medium": "cpc",
    "utm_campaign": "diaspora-jan-2025"
  }
}
```

**Sauvegarde dans Google Sheets** : Feuille `MicroLeads`

**Colonnes** :
- Timestamp
- Type
- Variant
- Poste recherché
- Ville
- Contact
- UTM Source
- UTM Medium
- UTM Campaign
- UTM Full (JSON)

#### Type: "full" (existant, mis à jour)
```json
{
  "type": "full",
  "userType": "diaspora",
  "variant": "control",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+33612345678",
  "country": "France",
  "jobType": "Gérant de boutique",
  // ... autres champs
  "utm": {
    "utm_source": "google"
  }
}
```

**Sauvegarde dans Google Sheets** : Feuilles `Diaspora` ou `Locaux`

**Nouvelles colonnes ajoutées** :
- Lead Type (colonne C)
- Variant (colonne D)
- UTM Source (colonne U)

### 3. Webhook Zapier (`/api/webhook/notify-zapier`)
Notification asynchrone à Zapier après soumission réussie.

**Payload envoyé** :
```json
{
  "type": "micro",
  "role": "Gérant de boutique",
  "city": "Dakar",
  "contact": "+221771115972",
  "variant": "test-a",
  "utm": {...},
  "timestamp": "2025-01-27T10:30:00.000Z",
  "notifiedAt": "2025-01-27T10:30:01.000Z",
  "source": "kiwoor-campaign"
}
```

**Comportement** :
- Non bloquant (async)
- Retourne toujours 200 pour ne pas bloquer le formulaire
- Log les erreurs sans fail

### 4. Dev Fallback API (`/api/dev/save-local`)
Sauvegarde locale en cas d'échec de l'API (développement uniquement).

**Fichier** : `/data/leads.json`

**Format** :
```json
[
  {
    "type": "micro",
    "role": "Gérant de boutique",
    "city": "Dakar",
    "contact": "+221771115972",
    "variant": "test-a",
    "id": "local-1737975000000",
    "savedAt": "2025-01-27T10:30:00.000Z"
  }
]
```

### 5. Google Sheets Setup Script (MODIFIÉ)
Mise à jour du script `scripts/setup-google-sheets.js` :
- Crée la feuille `MicroLeads` si elle n'existe pas
- Ajoute les colonnes `Lead Type`, `Variant`, `UTM Source` aux feuilles existantes
- Format automatique des en-têtes

## 📊 Architecture des Données

### Google Sheets Structure

```
Spreadsheet: kiwoor Leads
├── Diaspora (21 colonnes)
│   ├── Timestamp
│   ├── Type User
│   ├── Lead Type ⭐ NOUVEAU
│   ├── Variant ⭐ NOUVEAU
│   ├── Nom complet
│   ├── Email
│   ├── ...
│   └── UTM Source ⭐ NOUVEAU
│
├── Locaux (21 colonnes)
│   ├── (même structure que Diaspora)
│   └── ...
│
└── MicroLeads (10 colonnes) ⭐ NOUVEAU
    ├── Timestamp
    ├── Type
    ├── Variant
    ├── Poste recherché
    ├── Ville
    ├── Contact
    ├── UTM Source
    ├── UTM Medium
    ├── UTM Campaign
    └── UTM Full
```

## 🔧 Configuration

### Variables d'environnement
```bash
# .env.local

# Google Sheets (obligatoire)
GOOGLE_SHEETS_PRIVATE_KEY="..."
GOOGLE_SHEETS_CLIENT_EMAIL="..."
GOOGLE_SHEETS_SPREADSHEET_ID="..."

# WhatsApp (obligatoire)
NEXT_PUBLIC_WHATSAPP_NUMBER=221777115972

# Zapier (optionnel)
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_ID/
```

### Setup Google Sheets
```bash
npm run setup-sheets
```

Cela va :
1. Créer la feuille `MicroLeads` si nécessaire
2. Mettre à jour les en-têtes de `Diaspora` et `Locaux`
3. Formater les en-têtes en vert

## 📈 Analytics Events

### 1. variant_shown
Déclenché quand une variante est affichée.
```javascript
gtag('event', 'variant_shown', {
  variant: 'test-a',
  page: 'campaign_diaspora'
});
```

### 2. cta_click
Déclenché lors du clic sur un CTA.
```javascript
gtag('event', 'cta_click', {
  variant: 'test-a',
  cta_type: 'primary' // ou 'whatsapp'
});
```

### 3. form_start
Déclenché au premier focus sur le formulaire.
```javascript
gtag('event', 'form_start', {
  form: 'micro',
  variant: 'test-a'
});
```

### 4. form_submit
Déclenché après soumission réussie.
```javascript
gtag('event', 'form_submit', {
  form: 'micro',
  variant: 'test-a',
  role: 'Gérant de boutique'
});
```

## 🧪 Tests

### Test Manuel - Page Campaign
```bash
# Ouvrir dans le navigateur
http://localhost:3000/campaign/diaspora?variant=test-a&utm_source=facebook&utm_medium=cpc
```

### Test API - Micro Lead
```bash
curl -X POST http://localhost:3000/api/submit-form \
  -H "Content-Type: application/json" \
  -d '{
    "type": "micro",
    "role": "Gérant de boutique",
    "city": "Dakar",
    "contact": "+221771115972",
    "variant": "test-a",
    "utm": {
      "utm_source": "facebook",
      "utm_medium": "cpc"
    }
  }'
```

### Test API - Webhook Zapier
```bash
curl -X POST http://localhost:3000/api/webhook/notify-zapier \
  -H "Content-Type: application/json" \
  -d '{
    "type": "micro",
    "role": "Gérant de boutique",
    "city": "Dakar",
    "contact": "+221771115972"
  }'
```

### Test Dev Fallback (en dev uniquement)
```bash
curl -X POST http://localhost:3000/api/dev/save-local \
  -H "Content-Type: application/json" \
  -d '{
    "type": "micro",
    "role": "Test",
    "city": "Dakar",
    "contact": "test@test.com"
  }'

# Vérifier le fichier créé
cat data/leads.json
```

## 🚀 Utilisation en Production

### 1. Déploiement Vercel
```bash
# Ajouter les variables d'environnement
vercel env add GOOGLE_SHEETS_PRIVATE_KEY
vercel env add GOOGLE_SHEETS_CLIENT_EMAIL
vercel env add GOOGLE_SHEETS_SPREADSHEET_ID
vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER
vercel env add ZAPIER_WEBHOOK_URL

# Déployer
npm run deploy
```

### 2. Configuration Zapier
1. Créer un Zap avec **Webhooks by Zapier** (Catch Hook)
2. Copier l'URL du webhook
3. Ajouter à `.env.local` : `ZAPIER_WEBHOOK_URL=...`
4. Configurer les actions (ex: Slack, Email, Google Sheets, CRM)

### 3. Campagnes Publicitaires
Utiliser les URLs avec variant et UTM :
```
https://kiwoor.com/campaign/diaspora?variant=fb-test-a&utm_source=facebook&utm_medium=cpc&utm_campaign=diaspora-jan-2025&utm_content=hero-v1
```

## 📊 Analyse des Données

### Google Sheets
- Ouvrir la feuille `MicroLeads`
- Filtrer par `Variant` pour comparer les performances
- Analyser les `UTM Source` pour voir les canaux performants

### Google Analytics
- Events > form_start : Taux d'engagement
- Events > form_submit : Taux de conversion
- Comparer par `variant` pour A/B testing

## 🔍 Debugging

### Logs côté serveur
```bash
# Terminal où tourne npm run dev
✅ Lead saved to MicroLeads (type: micro, variant: test-a)
✅ Zapier notification sent successfully
```

### Logs côté client
```javascript
// Console du navigateur
console.log('Form start tracked');
console.log('Form submit tracked');
```

### Fichier de fallback (dev)
```bash
# Si l'API échoue en dev
cat data/leads.json
```

## 🎯 Métriques Clés

### Formulaire
- **Taux d'abandon** : form_start vs form_submit
- **Temps de remplissage** : Temps entre start et submit
- **Champs populaires** : Quels postes sont les plus demandés

### Campagnes
- **Taux de conversion par variant** : Comparer variants A/B
- **ROI par canal** : Analyser UTM source/medium
- **Géographie** : Quelles villes sont les plus demandées

---

**Créé le** : 27 octobre 2025  
**Version** : 1.0.0  
**Status** : ✅ PRODUCTION READY

