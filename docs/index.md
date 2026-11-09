# 🎓 EDL: Expertises digitale et logicielle

Bienvenue dans les travaux pratiques d'**Évolution et Déploiement Logiciel** de l'UMONS!

## 🎯 Objectifs du Cours

Ces travaux pratiques vous apprendront les **pratiques** du développement logiciel moderne :

- ✅ **Tests automatisés** (unitaires, intégration, E2E)
- ✅ **CI/CD** (Intégration et Déploiement Continus)
- ✅ **GitHub Actions** (workflows automatisés)
- ✅ **Déploiement en production** (avec bases de données réelles)
- ✅ **Bonnes pratiques** (TDD, protection de branche, code review)

---

## 📚 Les 3 Travaux Pratiques

### [TP 1 : Tests Unitaires Backend & Frontend](TP-1.md)

**Objectif :** Maîtriser les tests unitaires avec pytest (Python) et Vitest (TypeScript)

**Ce que vous allez apprendre :**

- 🐍 Tests backend avec **pytest** et **FastAPI**
- ⚛️ Tests frontend avec **Vitest** et **React**
- 🎭 **Mocking** : simuler des API, des bases de données
- ☕ **Bonus Java** : Tests avec JUnit 4

**Technologies :**
`Python` · `TypeScript` · `pytest` · `Vitest` · `FastAPI` · `React` · `JUnit`

---

### [TP 2 : CI/CD avec GitHub Actions](TP-2.md)

**Objectif :** Automatiser les tests et le déploiement avec GitHub Actions

**Ce que vous allez apprendre :**

- 🔄 **Workflows GitHub Actions** (backend, frontend, full-stack)
- 🚀 **CI Pipeline** : Tests automatiques à chaque commit
- 🔒 **Protection de branche** : Bloquer les merges si tests échouent
- ⚡ **Optimisation** : Cache, jobs parallèles, tests rapides/lents
- 🎯 **Reusable Workflows** : Orchestrer plusieurs workflows

**Technologies :**
`GitHub Actions` · `YAML` · `CI/CD` · `Workflows`

---

### [TP 3 : Déploiement en Production](TP-3.md)

**Objectif :** Déployer l'application sur Render avec PostgreSQL

**Ce que vous allez apprendre :**

- 🐘 **PostgreSQL** : Migrer de la mémoire à une vraie base de données
- 🚀 **Render** : Déployer backend + frontend + base de données
- 🔐 **Variables d'environnement** et secrets
- 📊 **Monitoring** : Logs, métriques, santé de l'application
- ♻️ **CD** : Déploiement automatique après chaque merge

**Technologies :**
`PostgreSQL` · `Render` · `Environment Variables` · `CD`

---

## 🚀 Commencer

### Prérequis

- ✅ Git installé
- ✅ Python 3.11+ ou UV
- ✅ Node.js 22.12+ (24 LTS recommandé)
- ✅ Compte GitHub
- ✅ Java 17+ pour les exercices bonus

### Installation

1. **Forker le repository** : [github.com/umons-ig/edl-starter](https://github.com/umons-ig/edl-starter)

2. **Cloner votre fork** :

   ```bash
   git clone https://github.com/VOTRE_NOM/edl-starter
   cd edl-starter
   ```

3. **Suivre le TP 1** pour installer les dépendances

---

## 📖 Navigation

Utilisez le menu de gauche pour naviguer entre les différents travaux pratiques.

Chaque TP est **indépendant** mais suit une progression logique :

```text
TP 1 (Tests) → TP 2 (CI/CD) → TP 3 (Déploiement)
```

---

## 🛠️ Stack Technique

**Backend :**

- FastAPI (Python)
- pytest pour les tests
- UV pour la gestion des dépendances
- PostgreSQL en production

**Frontend :**

- React + TypeScript
- Vite pour le build
- Vitest pour les tests
- TailwindCSS pour le style

**DevOps :**

- GitHub Actions pour CI/CD
- Render pour le déploiement
- MkDocs pour la documentation

---

**Prêt à commencer ?** 👉 [TP 1 : Tests Unitaires](TP-1.md)
