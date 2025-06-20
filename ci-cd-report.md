# Rapport technique – Workflow CI/CD

## Introduction

Ce document présente le pipeline CI/CD mis en place pour l'application **BobApp**. Il détaille les différentes étapes automatisées, les indicateurs de performance suivis (KPIs), l’analyse des métriques obtenues après exécution, ainsi que les retours utilisateurs et pistes d’amélioration.

## Étapes du workflow CI/CD

### 1. Tests et couverture du back-end
- **Objectif** : Exécuter les tests unitaires du back-end et générer un rapport de couverture.
- **Outils** : Maven, JUnit, JaCoCo, SonarCloud
- **Résultat** : Rapport JUnit + couverture JaCoCo + analyse SonarCloud

### 2. Tests et couverture du front-end
- **Objectif** : Exécuter les tests unitaires Angular avec génération d’un rapport de couverture.
- **Outils** : Angular CLI, Karma, SonarCloud
- **Résultat** : Résultat des tests + couverture LCOV + analyse SonarCloud

### 3. Résumé des tests
- **Objectif** : Centraliser et afficher les résultats des tests dans GitHub via `dorny/test-reporter`.
- **Résultat** : Rapport visible directement dans les pull requests + les tests sont téléchargeables

### 4. Analyse SonarCloud
- **Objectif** : Analyser le code TypeScript du front pour détecter bugs, duplications, code smells et mesurer la couverture.
- **Outil** : `sonar-scanner`
- **Résultat** : Tableau de bord SonarCloud à jour, rapport de code détaillé.

### 5. Build et publication Docker
- **Objectif** : Construire les images Docker du front-end et du back-end, et les publier sur Docker Hub.
- **Conditions** :
    - Exécuté uniquement lors d’une Pull Request vers `main`
    - Exécuté uniquement si tous les jobs précédents sont réussis
- **Images générées** :
    - `celineintha/p10-back`
    - `celineintha/p10-front`
## Indicateurs de performance (KPIs)

### KPI 1 : Taux de couverture de code (obligatoire)
- **Seuil cible** : minimum **80%** sur le front-end et le back-end
- **Mesuré via** : JaCoCo (back) et Karma + SonarCloud (front)
- **Résultat actuel** :
    - Back-end : 38.8%
    - Front-end : 0% 

### KPI 2 : Temps d’exécution du pipeline
- **Seuil cible** : moins de **5 minutes**
- **Raison** : garantir un retour rapide aux développeurs
- **Observation** : ~3 min 45 s sur les dernières exécutions

## Analyse des métriques


| Composant   | Tests exécutés | Couverture | Quality Gate |
|-------------|----------------|------------|---------------|
| Back-end    | ✅ OK          | 38.8%      | ✅ Passed      |
| Front-end   | ✅ OK          | 0%         | ✅ Passed      |
| Docker Push | ✅ Exécuté     | N/A        | N/A           |
> Sources : GitHub Actions et SonarCloud

## Retours utilisateurs

### ✅ Points positifs
- Le déploiement est plus fiable et rapide.
- Les résultats de tests sont visibles directement dans GitHub.

### ⚠️ Problèmes identifiés
- Couverture back-end et front-end encore insuffisante
- Pas encore de tests end-to-end (E2E) sur le front-end

### 🔧 Actions prioritaires à mener
- Ajouter des tests E2E (ex. avec Cypress)
- Optimiser les images Docker 

## Recommandations pour la suite

- Ajouter des tags de version sur les images Docker (`v1.0.0`, etc.)
- Mettre en place un environnement de staging
- Activer des alertes sur les échecs de Quality Gate (email, Slack...)