# BobApp

BobApp est une application web permettant aux utilisateurs de publier et consulter des blagues.  
Elle repose sur un front-end Angular et un back-end Spring Boot.

## Sommaire
- [Lancement avec Docker Compose](#lancement-du-projet-avec-docker-compose)
- [CI/CD – GitHub Actions](#cicd--github-actions)
- [Docker Hub](#docker-hub)
- [SonarCloud](#sonarcloud)

## Lancement du projet avec Docker Compose

### Prérequis

- Docker installé sur votre machine

### Étapes

Depuis la racine du projet :

```bash
docker-compose up --build
```
Les deux services seront lancés automatiquement :

    front-end accessible sur : http://localhost:4200

    back-end accessible sur : http://localhost:8080

Le front dépend automatiquement du back grâce à **depends_on**.

## CI/CD – GitHub Actions

Un pipeline CI/CD est défini dans .github/workflows/build.yml.

Étapes principales automatisées :
- Tests & couverture back-end
- Tests & couverture front-end
- Analyse qualité de code
- Build & publication Docker

Les rapports sont visibles dans l’onglet Actions de GitHub.

## Docker Hub

Les images générées sont disponibles sur Docker Hub :


Images disponibles sur Docker Hub :
- [`celineintha/p10-back`](https://hub.docker.com/r/celineintha/p10-back)
- [`celineintha/p10-front`](https://hub.docker.com/r/celineintha/p10-front)

## SonarCloud

Accès aux projets SonarCloud :
```
Back-end : https://sonarcloud.io/project/overview?id=CelineIntha_P10_CI-CD
Front-end : https://sonarcloud.io/project/overview?id=celineintha-p10-ci-cd-front
```
