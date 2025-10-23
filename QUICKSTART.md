# ⚡ Quick Start - kiwoor

## 🎯 En 3 Étapes

### 1️⃣ Installation
```bash
cd C:\Users\Rasso\kiwoor
npm install
```

### 2️⃣ Développement
```bash
npm run dev
```
Ouvrez [http://localhost:3000](http://localhost:3000) 🚀

### 3️⃣ Déploiement Vercel
```bash
# Option 1 : Via GitHub (Recommandé)
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VOTRE-USERNAME/kiwoor.git
git push -u origin main

# Puis allez sur vercel.com → New Project → Import depuis GitHub

# Option 2 : Via CLI
npm install -g vercel
vercel login
vercel --prod
```

## 📁 Structure

```
kiwoor/
├── src/
│   ├── app/              # Pages Next.js
│   ├── components/       # Composants React
│   ├── lib/             # Utilitaires
│   └── types/           # Types TypeScript
├── README.md            # Documentation principale
├── DEPLOYMENT.md        # Guide déploiement détaillé
└── package.json         # Dépendances
```

## 🛠️ Commandes Principales

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérifier le code
npm run deploy       # Déployer sur Vercel
```

## ✨ Fonctionnalités

- ✅ Landing page responsive
- ✅ Formulaire inscription diaspora/locaux
- ✅ Design moderne Tailwind CSS
- ✅ TypeScript strict mode
- ✅ SEO optimisé
- ✅ Prêt pour Vercel

## 📚 Documentation Complète

- 📖 **README.md** - Vue d'ensemble
- 🏗️ **ARCHITECTURE.md** - Structure du code
- 🚀 **DEPLOYMENT.md** - Guide de déploiement
- 🤝 **CONTRIBUTING.md** - Guide de contribution
- 📝 **CHANGELOG.md** - Historique des versions

## 🆘 Problèmes Courants

### Build échoue
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Port 3000 occupé
```bash
# Changez le port
npm run dev -- -p 3001
```

### Erreurs TypeScript
```bash
npm run lint
# Corrigez les erreurs indiquées
```

## 🌐 Déploiement Production

Votre site sera accessible à :
- https://kiwoor.vercel.app
- Ou votre domaine personnalisé

## 📞 Support

- 📧 Email : contact@kiwoor.com
- 📚 Docs : Voir fichiers `.md` du projet
- 🐛 Issues : GitHub Issues

---

**C'est tout ! Votre landing page kiwoor est prête ! 🎉**

