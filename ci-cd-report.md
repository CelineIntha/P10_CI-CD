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
    - Front-end : 50%
- **Amélioration attendue** : ajouter progressivement des tests unitaires et d'intégration pour couvrir les cas critiques et les fonctionnalités sensibles, en priorité sur le back-end.

### KPI 2 : Temps de résolution des bugs remontés par les utilisateurs
- **Objectif cible** : résolution sous 5 jours ouvrés
- **Mesuré via** : suivi des issues remontées et de leur date de clôture
- **Justification** : les utilisateurs indiquent que certains bugs sont présents depuis plusieurs semaines sans avoir été corrigés.
- **Amélioration attendue** : réduire la frustration client et renforcer la réactivité de l'équipe.

### KPI 3 : Taux de disponibilité de la fonctionnalité critique "poster une blague"
- **Objectif cible** : 99% de disponibilité
- **Mesuré via** : logs d’erreurs serveur, monitoring applicatif, tests automatisés supplémentaires
- **Justification** : le problème de plantage lors de l'envoi de blagues est récurrent et dégrade fortement l’expérience utilisateur.
- **Amélioration attendue** : renforcer les tests end-to-end et améliorer la robustesse du traitement des créations de blague.

### KPI 4 : Délai de première réponse aux utilisateurs (support client)
- **Objectif cible** : répondre sous 48 heures
- **Mesuré via** : temps moyen de réponse aux tickets de support
- **Justification** : certains utilisateurs restent sans réponse plusieurs jours malgré des relances.
- **Amélioration attendue** : définir un processus clair de gestion des tickets avec engagement de réponse rapide et suivi jusqu'à la résolution.

### KPI 5 : Respect des Quality Gates SonarCloud
- **Objectif cible** : 100% des builds doivent passer le Quality Gate de SonarCloud. 
- **Mesuré via** : statut du Quality Gate sur SonarCloud après chaque analyse CI/CD
- **Justification** : le Quality Gate garantit un haut niveau de qualité de code global en intégrant plusieurs indicateurs critiques (bugs, vulnérabilités, duplications, couverture sur le nouveau code, dette technique…).
- **Amélioration attendue** : sensibiliser l'équipe à corriger systématiquement les anomalies détectées et intégrer les bonnes pratiques de qualité dès la phase de développement.

## Analyse des métriques

Les mesures ci-dessous ont été collectées suite aux dernières exécutions du pipeline CI/CD sur la branche principale.

| Composant   | Tests exécutés | Couverture | Quality Gate            |
|-------------|----------------|------------|-------------------------|
| Back-end    | ✅ OK          | 38.8%      | ✅ Passé (non bloquante) |
| Front-end   | ✅ OK          | 50%        | ✅ Passé (non bloquante)    |
| Docker Push | ✅ Exécuté     | N/A        | N/A                     |
> Sources : GitHub Actions et SonarCloud

## Retours utilisateurs

### Points positifs
- Les déploiements sont devenus plus fiables et rapides grâce à la mise en place du pipeline CI/CD.
- Les rapports de tests sont désormais centralisés et consultables directement dans GitHub Actions et SonarCloud.
- La gestion de la qualité de code est facilitée par les Quality Gates de SonarCloud.

### Problèmes identifiés
- La couverture de code reste insuffisante par rapport à l’objectif fixé (notamment côté back-end). 
- Certains bugs utilisateurs mettent encore trop de temps à être résolus. 
- Des plantages ponctuels persistent lors de l’envoi de blagues. 
- Le support client n’est pas toujours réactif (délais de réponse parfois longs). 
- Les tests end-to-end (E2E) manquent encore pour sécuriser les parcours critiques côté front-end.

### Actions prioritaires à mener
- Améliorer la couverture de code en priorisant les tests sur les fonctionnalités sensibles. 
- Réduire les délais de résolution des bugs grâce à un meilleur suivi des tickets. 
- Stabiliser la fonctionnalité de publication de blague avec des tests end-to-end et des scénarios de robustesse. 
- Optimiser le support client pour garantir des premières réponses sous 48h. 
- Respecter systématiquement les Quality Gates SonarCloud en corrigeant les anomalies dès leur détection.

## Recommandations pour la suite

- **Gestion des versions Docker** : ajouter des tags de version (v1.0.0, v1.1.0, etc.) sur les images Docker pour assurer une traçabilité des déploiements et faciliter les rollbacks en cas de problème.
- **Environnement de staging** : mettre en place un environnement de pré-production (staging) permettant de valider les déploiements et exécuter les tests end-to-end avant la mise en production.
- **Surveillance de la qualité de code** : activer des notifications automatiques (par email, Slack ou autres outils de monitoring) sur les échecs des Quality Gates SonarCloud afin de réagir rapidement aux régressions de qualité.