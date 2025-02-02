// Importer les variables d'environnement
// ⚠️ au début du fichier, AVANT les autres imports ⚠️
import "dotenv/config";

// importer les dépendances
import path from "path";
import express from "express";
import routes from "./routes.js";

// créer une app
const app = express();

// Configurer le moteur de rendu (EJS)
app.set("view engine", "ejs");

// On indique a express où seront rangé nos vues => dans le dossier views
// app.set("views", path.join(process.cwd(), "views"));
app.set("views", path.join(import.meta.dirname, "views")); //

// Permet de rendre accessible via leur chemin de fichier tous les fichiers présents dans le dossier "public".
// app.use(express.static(path.join(process.cwd(), "static")));
app.use(express.static(path.join(import.meta.dirname, "static")));

// Ajout d'un body parser (avant le router) si besoin de gérer les formulaires HTML
app.use(express.urlencoded({ extended: true })); // permet de récupérer les données du PAYLOAD des <form> et les ajouter à req.body

// Brancher le routeur
app.use(routes);

app.use((req, res) => {
  res.status(404).render("error404", { path: req.path });
});

// ----- serveur à l'écoute ---
const port = process.env.PORT || 3000; // Fallback (valeur par défaut) au cas où le .env ne serait pas défini
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution : http://localhost:${port}`);
});

// process.cwd() : Retourne le répertoire de travail actuel, c'est-à-dire l'endroit où le script a été exécuté (souvent la racine du projet).
// import.meta.dirname : Retourne le répertoire du fichier source où il est utilisé (comme __dirname en CommonJS).
