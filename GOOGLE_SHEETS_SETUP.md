# 📊 Configuration Google Sheets pour kiwoor

Ce guide vous explique comment configurer Google Sheets pour sauvegarder automatiquement les données des formulaires.

## 🚀 Étapes de configuration

### 1. Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API Google Sheets :
   - Allez dans "APIs & Services" > "Library"
   - Recherchez "Google Sheets API"
   - Cliquez sur "Enable"

### 2. Créer un Service Account

1. Dans Google Cloud Console, allez dans "APIs & Services" > "Credentials"
2. Cliquez sur "Create Credentials" > "Service Account"
3. Donnez un nom (ex: "kiwoor-sheets-service")
4. Cliquez sur "Create and Continue"
5. Rôle : "Editor" (ou créez un rôle personnalisé avec accès aux feuilles)
6. Cliquez sur "Done"

### 3. Générer une clé privée

1. Dans la liste des Service Accounts, cliquez sur votre service account
2. Allez dans l'onglet "Keys"
3. Cliquez sur "Add Key" > "Create new key"
4. Choisissez "JSON" et téléchargez le fichier
5. **⚠️ IMPORTANT : Gardez ce fichier secret !**

### 4. Créer une feuille Google Sheets

1. Allez sur [Google Sheets](https://sheets.google.com/)
2. Créez une nouvelle feuille
3. Renommez les onglets :
   - Premier onglet : "Diaspora"
   - Deuxième onglet : "Locaux"
4. Copiez l'ID de la feuille depuis l'URL :
   ```
   https://docs.google.com/spreadsheets/d/[ID_ICI]/edit
   ```

### 5. Partager la feuille avec le Service Account

1. Dans votre feuille Google Sheets, cliquez sur "Share"
2. Ajoutez l'email du service account (trouvé dans le fichier JSON)
3. Donnez les permissions "Editor"
4. Cliquez sur "Send"

### 6. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# Google Sheets Configuration
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nVOTRE_CLE_PRIVEE_ICI\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL="votre-service-account@votre-projet.iam.gserviceaccount.com"
GOOGLE_SHEETS_SPREADSHEET_ID="1ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZ"

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ Remplacez les valeurs par vos vraies données !**

### 7. Initialiser les feuilles

Exécutez le script de configuration :

```bash
npm run setup-sheets
```

Ce script va :
- Créer les en-têtes dans les deux feuilles
- Mettre en forme les en-têtes (couleur verte, texte en gras)
- Vérifier que tout fonctionne

## 🧪 Test de l'intégration

1. Démarrez votre application :
   ```bash
   npm run dev
   ```

2. Allez sur http://localhost:3000
3. Remplissez un formulaire (diaspora ou local)
4. Soumettez le formulaire
5. Vérifiez que les données apparaissent dans Google Sheets

## 📋 Structure des données

### Feuille "Diaspora"
- Timestamp, Type, Nom complet, Email, Téléphone, Pays
- Type de poste, Localisation Sénégal, Salaire, Date de début, Urgence
- Expérience, Disponibilité, Références, Prêt à payer, Budget max
- Préoccupation principale, Commentaires

### Feuille "Locaux"
- Timestamp, Type, Nom complet, Email, Téléphone, Région
- Type de poste recherché, Localisation, Salaire souhaité, Date de début, Urgence
- Expérience, Disponibilité, Références, Prêt à payer, Budget max
- Préoccupation principale, Commentaires

## 🔧 Dépannage

### Erreur "Permission denied"
- Vérifiez que le service account a accès à la feuille
- Vérifiez que l'email du service account est correct

### Erreur "Invalid credentials"
- Vérifiez que la clé privée est correctement formatée (avec \n)
- Vérifiez que l'email du service account correspond

### Erreur "Spreadsheet not found"
- Vérifiez que l'ID de la feuille est correct
- Vérifiez que la feuille existe et est accessible

## 🚀 Déploiement sur Vercel

1. Ajoutez les variables d'environnement dans Vercel :
   - Allez dans votre projet Vercel
   - Settings > Environment Variables
   - Ajoutez les 3 variables GOOGLE_SHEETS_*

2. Redéployez :
   ```bash
   npm run deploy
   ```

## 📊 Avantages de cette solution

✅ **Simple** : Pas de base de données complexe  
✅ **Gratuit** : Google Sheets est gratuit  
✅ **Visuel** : Vous voyez les données en temps réel  
✅ **Exportable** : Facile d'exporter en CSV/Excel  
✅ **Partageable** : Vous pouvez partager avec votre équipe  
✅ **Backup automatique** : Google sauvegarde automatiquement  

## 🔄 Prochaines étapes

Une fois que vous avez des données, vous pourrez :
- Ajouter des filtres et analyses
- Créer des tableaux de bord
- Intégrer avec d'autres outils (Zapier, etc.)
- Migrer vers une vraie base de données plus tard

---

**🎉 Félicitations !** Votre système de sauvegarde Google Sheets est maintenant configuré !
