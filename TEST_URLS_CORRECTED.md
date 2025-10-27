# 🧪 Test des URLs A/B - Port 3001

## ✅ CORRECTIONS APPORTÉES

1. **Debug illisible** : ✅ Corrigé (plus de vert, maintenant bleu/jaune lisible)
2. **Variants identiques** : ✅ Corrigé (AdLanding utilise maintenant la config)
3. **Port incorrect** : ✅ Identifié (serveur sur 3001, pas 3000)

## 🎯 URLs CORRECTES À TESTER

**Copiez-collez ces URLs dans votre navigateur :**

```
✨ Control:      http://localhost:3001/campaign/diaspora?variant=control
🎯 Hero Direct:  http://localhost:3001/campaign/diaspora?variant=test-hero-direct  
🎁 Gratuit:      http://localhost:3001/campaign/diaspora?variant=test-offer-gratuit
⚡ Urgent:       http://localhost:3001/campaign/diaspora?variant=test-cta-urgent
⭐ Social Proof: http://localhost:3001/campaign/diaspora?variant=test-social-proof
```

## 🔍 CE QUE VOUS DEVRIEZ VOIR MAINTENANT

### Control (variant=control)
- **Titre** : "Embauche au Sénégal en toute sécurité"
- **Sous-titre** : "Profils 100% vérifiés, contrats légaux, suivi hebdomadaire"
- **CTA** : "Découvrir kiwoor"

### Hero Direct (variant=test-hero-direct)
- **Titre** : "Tu galères à trouver quelqu'un de confiance au Sénégal ?"
- **Sous-titre** : "Découvre la solution qui aide + de 500 diasporans chaque mois"
- **CTA** : "Je veux essayer gratuitement"

### Gratuit (variant=test-offer-gratuit)
- **Titre** : "Embauche au Sénégal en toute sécurité"
- **Sous-titre** : "🎁 Essai gratuit 7 jours - Sans engagement - Résultats garantis"
- **CTA** : "Commencer l'essai gratuit"

### Urgent (variant=test-cta-urgent)
- **Titre** : "Embauche au Sénégal en toute sécurité"
- **Sous-titre** : "Profils 100% vérifiés • Contrats légaux • Suivi hebdomadaire"
- **CTA** : "Réserver ma place (Plus que 12 places)"

### Social Proof (variant=test-social-proof)
- **Titre** : "Embauche au Sénégal en toute sécurité"
- **Sous-titre** : "✅ +500 diasporans nous font confiance • ⭐ 4.8/5 sur Trustpilot"
- **CTA** : "Rejoindre les 500+ membres"

## 🎯 DEBUG AMÉLIORÉ

En haut à droite, vous devriez voir :
```
🧪 A/B Test Debug
Variant: test-hero-direct
Config: 4 props
```

**Couleurs** : Jaune pour le titre, bleu pour le variant, gris pour les props (plus lisible !)

## 🧪 TEST RAPIDE

1. **Ouvrez** chaque URL dans un nouvel onglet
2. **Vérifiez** que le titre et CTA changent bien
3. **Regardez** le debug en haut à droite
4. **Testez** le formulaire sur un variant

## 🚨 SI ÇA NE MARCHE TOUJOURS PAS

1. **Videz le cache** : Ctrl+F5 ou Cmd+Shift+R
2. **Vérifiez** que le serveur tourne sur le port 3001
3. **Console** : Vérifiez s'il y a des erreurs JavaScript

---

**🎉 Maintenant les variants devraient être différents !**
