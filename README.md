# DevSecOps Sample Application

Application Node.js/Express avec CI/CD automatisée via GitHub Actions.

## Installation

```bash
npm ci
```

## Démarrage

```bash
npm start
```

## Tests

```bash
npm test
```

Les rapports de test sont générés en JUnit XML et intégrés à GitHub Actions.

## Structure

- `src/server.js` - Serveur Express principal
- `src/server.test.js` - Tests d'intégration
- `.github/workflows/ci.yml` - Pipeline CI/CD
- `jest.config.js` - Configuration Jest avec reporter JUnit

## CI/CD

Le workflow `Application Pipeline` s'exécute automatiquement à chaque `push` :

1. ✅ Checkout du code
2. 📦 Cache npm pour optimiser les builds
3. 📥 Installation des dépendances (`npm ci`)
4. ✔️ Exécution des tests
5. 📊 Publication du rapport JUnit
6. 🔐 Vérification des variables d'environnement et masquage des secrets
