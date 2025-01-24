import express from "express";
//import json -----

import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const articles = JSON.parse(
  await readFile(join(__dirname, "./data/articles.json"), "utf8")
);

// console.log(articles);
//fin import json -----

const app = express();

const router = express.Router();

// page d'accueil
router.get("/", (req, res) => {
  res.render("index", { articles , isHomePage: true });
});

// route paramétrée, qui mène vers chaque article

router.get("/article/:id", (req, res, next) => {
    const id = parseInt(req.params.id, 10); // Convertit en entier
    console.log("Type de req.params.id :", typeof req.params.id); // Affiche "string"
    console.log("Type de id après parseInt :", typeof id); // Affiche "number"
  
    
    // Trouver l'article correspondant
    const article = articles.find((article) => article.id === id);
  
    // si le numéro de l'article n'exite pas on renvoie le middleware d'erreur 404
    if (!article) {
      return next();
    }
  
    // Rendre la page de l'article
    res.render("article", { article, isHomePage: false });
  });

export default router;
