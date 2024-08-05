# Miroir-Model 🪡✨🚀

Ce projet est un backend pour un réseau social destiné aux tailleurs, où ils peuvent poster leurs modèles, avoir des followers, commenter, partager, liker des statuts, etc. Il est construit avec Express, Node.js, et MongoDB.

## Fonctionnalités

- Authentification et autorisation des utilisateurs
- Publication de modèles de couture
- Suivi et désabonnement des utilisateurs
- Commentaires sur les modèles et statuts
- Partage de statuts
- Like et dislike des statuts et des commentaires

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js (v14.x ou supérieur)
- MongoDB (v4.x ou supérieur)
- Postman (pour tester l'API)

## Architecture

social-tailor-app/
│
├── config/                  # Configuration (base de données, serveur, etc.)
│   ├── db.js
│   ├── server.js
│
├── controllers/             # Logique des contrôleurs
│   ├── authController.js
│   ├── postController.js
│   ├── userController.js
│   ├── notificationController.js
│   ├── messageController.js
│
├── models/                  # Modèles de données (Schémas Mongoose)
│   ├── user.js
│   ├── post.js
│   ├── comment.js
│   ├── notification.js
│   ├── message.js
│
├── routes/                  # Routes de l'application
│   ├── authRoutes.js
│   ├── postRoutes.js
│   ├── userRoutes.js
│   ├── notificationRoutes.js
│   ├── messageRoutes.js
│
├── middleware/              # Middleware (authentification, validation, etc.)
│   ├── authMiddleware.js
│   ├── validateMiddleware.js
│
├── utils/                   # Utilitaires (gestion des fichiers, etc.)
│   ├── upload.js
│
├── tests/                   # Tests unitaires et d'intégration
│   ├── auth.test.js
│   ├── post.test.js
│
├── .env                     # Variables d'environnement
├── .gitignore
├── package.json
└── server.js                # Point d'entrée de l'application


## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-utilisateur/reseau-social-tailleur.git
    cd reseau-social-tailleur
    ```

2. Installez les dépendances :
    ```bash
    npm install
    ```

3. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement suivantes :
    ```env
    MONGO_URI=mongodb://localhost:27017/reseau_social_tailleur
    PORT=3000
    ```

4. Démarrez le serveur :
    ```bash
    npm start
    ```

Le serveur devrait maintenant être en cours d'exécution sur [http://localhost:3000](http://localhost:3000).

## Tests

Utilisez Postman pour tester les différentes routes et vérifier que tout fonctionne comme prévu. Importez le fichier `postman_collection.json` (s'il existe) dans Postman pour accéder à toutes les routes de l'API.

## Contributions

Les contributions sont les bienvenues ! Veuillez soumettre une pull request pour toute amélioration ou correction de bug.

## License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Si vous avez des questions ou besoin d'aide supplémentaire, n'hésitez pas à me contacter !
