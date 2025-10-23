# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à kiwoor ! 

## 🚀 Démarrage Rapide

1. **Fork** le projet
2. **Clone** votre fork :
   ```bash
   git clone https://github.com/VOTRE-USERNAME/kiwoor.git
   cd kiwoor
   ```

3. **Installez** les dépendances :
   ```bash
   npm install
   ```

4. **Créez** une branche pour votre fonctionnalité :
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```

5. **Développez** et testez vos modifications :
   ```bash
   npm run dev
   ```

6. **Committez** vos changements :
   ```bash
   git add .
   git commit -m "feat: Description de ma fonctionnalité"
   ```

7. **Poussez** vers votre fork :
   ```bash
   git push origin feature/ma-fonctionnalite
   ```

8. **Ouvrez** une Pull Request

## 📝 Conventions de Code

### TypeScript
- ✅ Utilisez le **strict mode**
- ✅ Typez explicitement les paramètres et retours de fonction
- ✅ Évitez `any`, préférez `unknown` si nécessaire
- ✅ Créez des interfaces dans `src/types/`

### React
- ✅ Utilisez des **composants fonctionnels**
- ✅ Privilégiez les **Server Components** par défaut
- ✅ Marquez `'use client'` uniquement si nécessaire
- ✅ Utilisez des hooks personnalisés pour la logique réutilisable

### Styling
- ✅ Utilisez **Tailwind CSS** pour tous les styles
- ✅ Suivez l'ordre des classes : layout → spacing → colors → typography
- ✅ Évitez les styles inline sauf exception

### Commits
Suivez la convention [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage (sans changement de code)
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Maintenance

Exemples :
```bash
git commit -m "feat: Ajouter formulaire de contact"
git commit -m "fix: Corriger l'affichage mobile du menu"
git commit -m "docs: Mettre à jour le README"
```

## 🧪 Tests

Avant de soumettre une PR :

1. **Vérifiez** qu'il n'y a pas d'erreurs de linting :
   ```bash
   npm run lint
   ```

2. **Testez** le build de production :
   ```bash
   npm run build
   ```

3. **Testez** manuellement votre fonctionnalité

## 📂 Structure des Fichiers

Placez les fichiers aux bons endroits :

- **Composants réutilisables** → `src/components/ui/`
- **Composants de page** → `src/components/`
- **Pages** → `src/app/`
- **Types** → `src/types/`
- **Utilitaires** → `src/lib/`
- **Constantes** → `src/lib/constants.ts`

## 🎯 Priorités de Développement

### Phase 1 (MVP - Actuel) ✅
- [x] Landing page responsive
- [x] Formulaire d'inscription
- [x] Design moderne

### Phase 2 (En cours)
- [ ] API Routes pour soumettre les formulaires
- [ ] Intégration base de données (Prisma + PostgreSQL)
- [ ] Système d'authentification
- [ ] Email de confirmation

### Phase 3 (Futur)
- [ ] Dashboard utilisateur
- [ ] Système de matching
- [ ] Chat intégré
- [ ] Paiements (Orange Money/Wave)

### Phase 4 (Avancé)
- [ ] Notifications push
- [ ] Application mobile (React Native)
- [ ] IA pour matching automatique

## 🐛 Signaler un Bug

Ouvrez une [Issue](https://github.com/VOTRE-USERNAME/kiwoor/issues) avec :

1. **Description** claire du problème
2. **Étapes** pour reproduire
3. **Comportement attendu** vs **comportement actuel**
4. **Screenshots** si pertinent
5. **Environnement** (navigateur, OS, etc.)

## 💡 Proposer une Fonctionnalité

Ouvrez une [Issue](https://github.com/VOTRE-USERNAME/kiwoor/issues) avec :

1. **Description** de la fonctionnalité
2. **Problème** qu'elle résout
3. **Solution proposée**
4. **Alternatives** considérées

## 📋 Checklist PR

Avant de soumettre votre PR, assurez-vous que :

- [ ] Le code compile sans erreur (`npm run build`)
- [ ] Pas d'erreurs ESLint (`npm run lint`)
- [ ] Les types TypeScript sont corrects
- [ ] Le code est commenté si nécessaire
- [ ] La documentation est à jour (README, etc.)
- [ ] Les commit messages suivent les conventions
- [ ] La PR a une description claire

## 🌍 Langues

Le projet est principalement en **français** car il cible la diaspora sénégalaise francophone. Les commentaires de code peuvent être en français ou en anglais.

## 📞 Questions ?

N'hésitez pas à :
- Ouvrir une [Discussion](https://github.com/VOTRE-USERNAME/kiwoor/discussions)
- Contacter l'équipe : contact@kiwoor.com

---

**Merci de contribuer à kiwoor et d'aider la diaspora sénégalaise ! 🇸🇳❤️**

