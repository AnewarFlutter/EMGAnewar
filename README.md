# EMG Voitures

## Description du Projet
EMG Voitures est une application web complète avec une API backend en ASP.NET Core et un client frontend. L'application permet la gestion de véhicules avec un système d'authentification.

## Structure du Projet
```
TP/
|___github/workflows/          # CI/CD
├── BackendEMGAnewar/          # API Backend
│   ├── Controllers/           # Contrôleurs API
│   ├── Data/                  # Contexte et configurations BD
│   ├── DTOs/                  # Objets de transfert de données
│   ├── Models/                # Modèles de données
│   └── Program.cs             # Point d'entrée de l'API
├── EMGVoitures.Tests/         # Tests unitaires
└── Client/                    # Application Frontend
    └── ViewEMGAnewar/         # Interface utilisateur React
```

## Prérequis
- .NET 8.0 SDK
- Node.js et npm
- SQLite

## Installation et Démarrage

### Backend (API)
1. Naviguer vers le dossier du backend :
   ```bash
   cd BackendEMGAnewar
   ```
2. Restaurer les packages :
   ```bash
   dotnet restore
   ```
3. Démarrer l'API :
   ```bash
   dotnet run
   ```
   L'API sera accessible à `https://localhost:5042`

### Frontend
1. Naviguer vers le dossier client

```bash
cd Client/ViewEMGAnewar
```

2. Installer les dépendances
```bash
npm install
```
   
4. Démarrer l'application

```bash
npm run dev
```

L'application sera accessible à `http://localhost:3000`



## Tests Unitaires
Les tests unitaires sont situés dans le projet `EMGVoitures.Tests`.
Pour exécuter les tests :
```bash
dotnet test
```

## Connexion Admin
Identifiants par défaut :
- Email : admin@emg.com
- Mot de passe : Admin123!

## Fonctionnalités Principales
- Authentification JWT
- Gestion des véhicules (CRUD)
- Gestion des modèles de voitures
- Rôles utilisateurs (Admin)

## Configuration de la Base de Données
La base de données SQLite est automatiquement créée au premier démarrage. La chaîne de connexion est configurée dans `appsettings.json`.

## Endpoints API Principaux
- `POST /api/auth/login` - Authentification
- `GET /api/vehicles` - Liste des véhicules
- `POST /api/vehicles` - Ajouter un véhicule
- `GET /api/carmodels` - Liste des modèles
- `POST /api/carmodels` - Ajouter un modèle


## Documenttation des apis avec swagger


![Capture d'écran 2025-01-31 231701](https://github.com/user-attachments/assets/1d9a0f90-70bd-45d0-87a8-50d94bcf71b8)


![Capture d'écran 2025-01-31 231719](https://github.com/user-attachments/assets/ed35caaa-9b28-4ccf-9d7c-a7f8a41216fc)


  

## Tests Disponibles
- AuthControllerTests : Tests d'authentification
- VehiclesControllerTests : Tests de gestion des véhicules
- CarModelsControllerTests : Tests de gestion des modèles

## Sécurité
- Authentification JWT
- Validation des données
- Protection CORS
- Gestion des rôles

## Déploiement Local
1. Cloner le repository
2. Configurer la base de données dans `appsettings.json`
3. Démarrer l'API backend
4. Démarrer le client frontend
5. Accéder à l'application via le navigateur

## Contribution
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request




# Documentation de l'Interface EMG Voitures

## Page d'Accueil
Cette page présente l'interface principale de l'application EMG Voitures. Les utilisateurs peuvent y visualiser la liste complète des véhicules disponibles. L'interface offre une présentation claire et organisée des informations essentielles de chaque véhicule.

![Capture d'écran 2025-01-31 230443](https://github.com/user-attachments/assets/68e0d761-a447-41e5-9b17-3769198e14a0)



## Page de Connexion Administrateur
L'écran de connexion permet aux administrateurs d'accéder à leurs fonctionnalités spécifiques. Il comprend :
- Un formulaire de connexion sécurisé
- Des champs pour l'email et le mot de passe
- Un bouton de connexion
- Une validation des données saisies

  ![Capture d'écran 2025-01-31 230513](https://github.com/user-attachments/assets/3e0771f1-dddd-450a-b964-f83ecac649a4)

  

## Interface Administrateur
Une fois connecté, l'administrateur accède à un tableau de bord complet qui lui permet de :
- Visualiser l'ensemble des véhicules
- Accéder aux fonctionnalités de gestion
- Voir les statistiques importantes
- Gérer les différentes catégories de véhicules

  ![Capture d'écran 2025-01-31 230525](https://github.com/user-attachments/assets/5bc09097-9a04-427e-95ed-44ef5951cbac)

## Fonctionnalités de Gestion
L'interface administrateur propose trois actions principales :

### 1. Ajout de Véhicule
- Formulaire complet de saisie
- Champs pour toutes les caractéristiques du véhicule
- Validation des données en temps réel
- Confirmation d'ajout réussi

### 2. Modification
- Accès rapide aux informations existantes
- Modification simple et intuitive
- Sauvegarde automatique des changements
- Historique des modifications

### 3. Suppression
- Confirmation de suppression requise
- Protection contre les suppressions accidentelles
- Notification de suppression réussie
- Option de restauration (si configurée)


![Capture d'écran 2025-01-31 230733](https://github.com/user-attachments/assets/0dc242ae-1d7a-4d49-a6fa-54ff856ca18a)

![Capture d'écran 2025-01-31 230748](https://github.com/user-attachments/assets/5e772a09-eaab-478f-bd7e-22157bfe672c)

![Capture d'écran 2025-01-31 231439](https://github.com/user-attachments/assets/4238251e-b209-4c38-8d18-1b1f3e6f6cf6)

![Capture d'écran 2025-01-31 231604](https://github.com/user-attachments/assets/d8b1eea9-2d96-4a3d-b68c-614a19dfcadf)



## Test de CI/CD et deploiement sur Micrsoft Azure 

![Capture d'écran 2025-01-31 232135](https://github.com/user-attachments/assets/be92cc2e-06ae-4f4a-b9e6-082e75aab43f)





## Url View

https://view-emg-voiture.azurewebsites.net/



