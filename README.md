# Gestion d'Inventaire

## Description

Ce projet est une application web de gestion d'inventaire développée dans le cadre d'une montée en compétence.

L'application permet de gérer :

- Les produits
- Les catégories
- Les fournisseurs
- Les stocks
- Les alertes de stock faible
- L'export des produits au format Excel

Le backend est développé avec **Laravel** et le frontend avec **React**.


# Technologies utilisées

## Backend

- Laravel
- PHP 8
- PostgreSQL
- Eloquent ORM

## Frontend

- React
- React Router
- Axios
- Bootstrap 5

# Prérequis

Avant de lancer le projet, installer :

- PHP 8+
- Composer
- Node.js
- npm
- PostgreSQL
- XAMPP (ou Apache)

# Installation du projet

## 1. Cloner le projet

```bash
git clone <url_du_projet>
```

Puis :

```bash
cd gestion-inventaire
```

## 2. Installation du backend Laravel

Installer les dépendances :

```bash
composer install
```

Copier le fichier d'environnement :

```bash
cp .env.example .env
```

Générer la clé de l'application :

```bash
php artisan key:generate
```

## 3. Configuration PostgreSQL

Créer une base de données nommée :

```
gestion_inventaire
```

Modifier le fichier `.env` :

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=gestion_inventaire
DB_USERNAME=postgres
DB_PASSWORD=votre_mot_de_passe
```

## 4. Exécuter les migrations

```bash
php artisan migrate
```

## 5. Lancer Laravel

```bash
php artisan serve
```

Le backend sera disponible sur :

```
http://127.0.0.1:8000
```
# Installation du frontend React

Se placer dans le dossier React :

```bash
cd frontend
```

Installer les dépendances :

```bash
npm install
```

Lancer le serveur :

```bash
npm run dev
```

Le frontend sera disponible sur :

```
http://localhost:5173
```

---

# Fonctionnalités principales

## Produits

- Ajouter un produit
- Modifier un produit
- Supprimer un produit
- Rechercher un produit
- Filtrer par catégorie

## Catégories

- Ajouter
- Modifier
- Supprimer

## Fournisseurs

- Ajouter
- Modifier
- Supprimer

## Tableau de bord

- Nombre total de produits
- Nombre total de catégories
- Nombre total de fournisseurs
- Quantité totale en stock
- Produits en stock faible

## Export

- Export des produits au format Excel

# Test des principales fonctionnalités

1. Ajouter une catégorie.
2. Ajouter un fournisseur.
3. Ajouter un produit.
4. Modifier un produit.
5. Supprimer un produit.
6. Effectuer une recherche.
7. Filtrer les produits par catégorie.
8. Vérifier l'affichage des alertes de stock faible.
9. Exporter la liste des produits au format Excel.

# Structure du projet

Backend :

```
app/
routes/
database/
```

Frontend :

```
src/
components/
pages/
services/
```

# Auteur

Projet réalisé par :

**Linatou Dao**

Dans le cadre d'une montée en compétence sur Laravel, React et PostgreSQL.
