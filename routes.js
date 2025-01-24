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

router.get("/article/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find((article) => article.id === id);
  console.log(article.id);
  console.log(typeof article.id);
  console.log(req.params.id);
  console.log(typeof req.params.id);

  // On vérifie que le film demandé dans l'URL existe bien
  // if (!film || isNaN(id)) {
  //   console.log(`Film introuvable pour l'ID ${id}`);
  //   return next();
  // }
  res.render("article", { article , isHomePage: false });
});

export default router;
