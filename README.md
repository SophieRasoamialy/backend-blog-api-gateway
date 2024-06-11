# Blog Backend avec JS API Gateway

Ce projet est le backend d'une application de blog. Il est conçu avec une architecture de microservices et utilise JS API Gateway pour orchestrer les requêtes vers les différents services.

## Architecture

L'architecture de ce projet est basée sur des microservices, ce qui signifie que chaque fonctionnalité est gérée par un service distinct. Les principaux services sont :

- **User Service**: Gère les utilisateurs.
- **Post Service**: Gère les publications.
- **Comment Service**: Gère les commentaires sur les publications.
- **Reaction Service**: Gère les réactions (likes, dislikes) sur les publications.

## JS API Gateway

L'API Gateway est le point d'entrée unique pour toutes les requêtes client. Il dirige les requêtes vers les microservices appropriés en fonction du chemin de l'URL. Cela permet d'abstraire la complexité de l'infrastructure microservice et fournit une interface unifiée pour les clients.

## Technologies Utilisées

- **Express.js**: Express.js est un framework rapide, minimaliste et flexible pour Node.js qui est largement utilisé pour construire des applications web, notamment pour la partie backend de l'application.
- **MongoDB**: MongoDB est une base de données NoSQL open-source, orientée document, conçue pour la flexibilité et la scalabilité.
- **Mongoose**: Mongoose est une bibliothèque Node.js qui fournit une couche d'abstraction au-dessus de MongoDB, permettant de définir des schémas de données, de valider les données, de créer des requêtes et plus encore.
- **JS API Gateway**: JS API Gateway est une solution open-source fournissant une passerelle d'API (API Gateway) construite sur Node.js et Express.js. Son objectif est de simplifier la gestion et la sécurisation des API, ainsi que de faciliter la création d'écosystèmes de microservices.

## Installation

1. Cloner le dépôt :

```bash
git clone https://github.com/SophieRasoamialy/backend-blog-api-gateway.git

# Gateway
cd blog-backend/api-gateway && npm install

# User Service
cd blog-backend/user-service && npm install

# Post Service
cd blog-backend/post-service && npm install

# Comment Service
cd blog-backend/comment-service && npm install

# Reaction Service
cd blog-backend/reaction-service && npm install
```
## Lancement de l'Application Backend
# Lancer le Gateway:
```bash
cd blog-backend/api-gateway && node server.js
```
# Lancer les Services:
Sans l'API Gateway, les services seront accessibles aux ports suivants :

- User Service: http://localhost:3001.
- Post Service: http://localhost:3002.
- Comment Service: http://localhost:3003.
- Reaction Service: http://localhost:3004.

Avec l'API Gateway, le serveur sera accessible à l'adresse http://localhost:5000
