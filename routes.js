// récupération d'express
import { Router } from "express";

import { controller } from "./controller.js";

// création du router
export const router = Router();

// page d'accueil
router.get("/", controller.home);

// route paramétrée, qui mène vers chaque article

router.get("/article/:id", controller.article);

router.get("/categorie/:name", controller.category);

router.get("/search", controller.search);

router.get("/search/results", controller.searchResults);

export default router;
