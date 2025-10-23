# 🚀 Guide de Déploiement Vercel

## Prérequis

- Un compte [Vercel](https://vercel.com)
- Git installé sur votre machine
- Le CLI Vercel (optionnel mais recommandé)

## Méthode 1 : Déploiement via GitHub (Recommandé)

### 1. Initialiser Git et pousser sur GitHub

```bash
cd C:\Users\Rasso\kiwoor

# Initialiser le dépôt Git
git init

# Ajouter tous les fichiers
git add .

# Faire le premier commit
git commit -m "Initial commit: kiwoor landing page"

# Créer un nouveau dépôt sur GitHub, puis :
git remote add origin https://github.com/VOTRE-USERNAME/kiwoor.git
git branch -M main
git push -u origin main
```

### 2. Déployer sur Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"New Project"**
3. Importez votre dépôt GitHub `kiwoor`
4. Vercel détectera automatiquement Next.js
5. Cliquez sur **"Deploy"**

✅ Votre site sera en ligne en quelques minutes !

## Méthode 2 : Déploiement via CLI Vercel

### 1. Installer Vercel CLI

```bash
npm install -g vercel
```

### 2. Se connecter à Vercel

```bash
vercel login
```

### 3. Déployer

Pour un déploiement de test :
```bash
vercel
```

Pour un déploiement en production :
```bash
vercel --prod
```

## Configuration Automatique

Vercel configurera automatiquement :
- ✅ Build Command : `npm run build`
- ✅ Output Directory : `.next`
- ✅ Install Command : `npm install`
- ✅ Framework : Next.js

## Variables d'Environnement (Futures)

Quand vous ajouterez une base de données, allez dans :
**Settings → Environment Variables** sur Vercel et ajoutez :

```
DATABASE_URL=postgresql://...
ORANGE_MONEY_API_KEY=...
WAVE_API_KEY=...
```

## Domaine Personnalisé

1. Allez dans **Settings → Domains**
2. Ajoutez votre domaine : `www.kiwoor.com`
3. Suivez les instructions pour configurer vos DNS

## URL de Production

Après déploiement, votre site sera accessible à :
- `https://kiwoor.vercel.app`
- Ou votre domaine personnalisé

## Mises à Jour Automatiques

Si vous utilisez GitHub :
- Chaque `git push` sur la branche `main` déclenchera un nouveau déploiement
- Les Pull Requests créeront automatiquement des environnements de preview

## Support

En cas de problème, consultez :
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Next.js](https://nextjs.org/docs)

---

🎉 Votre landing page kiwoor est maintenant prête à être déployée !

