# Social-Media pour Tailleurs 🪡✨🚀

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

## Utilisation

### Routes Utilisateurs

- **Enregistrer un utilisateur**
    ```
    POST /api/users/register
    ```

    Corps de la requête (JSON) :
    ```json
    {
      "username": "nom_utilisateur",
      "email": "email@example.com",
      "password": "mot_de_passe"
    }
    ```

- **Authentifier un utilisateur**
    ```
    POST /api/users/login
    ```

    Corps de la requête (JSON) :
    ```json
    {
      "email": "email@example.com",
      "password": "mot_de_passe"
    }
    ```

- **Obtenir les informations d'un utilisateur**
    ```
    GET /api/users/:id
    ```

### Routes Modèles

- **Créer un nouveau modèle**
    ```
    POST /api/models
    ```

    Corps de la requête (JSON) :
    ```json
    {
      "title": "Titre du modèle",
      "description": "Description du modèle",
      "image": "URL de l'image"
    }
    ```

- **Obtenir tous les modèles**
    ```
    GET /api/models
    ```

- **Obtenir un modèle spécifique**
    ```
    GET /api/models/:id
    ```

## Tests

Utilisez Postman pour tester les différentes routes et vérifier que tout fonctionne comme prévu. Importez le fichier `postman_collection.json` (s'il existe) dans Postman pour accéder à toutes les routes de l'API.

## Contributions

Les contributions sont les bienvenues ! Veuillez soumettre une pull request pour toute amélioration ou correction de bug.

## License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

Si vous avez des questions ou besoin d'aide supplémentaire, n'hésitez pas à me contacter !
