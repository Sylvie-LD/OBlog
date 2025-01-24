import path from "path";
import express from "express";
import routes from "./routes.js";

const app = express();

app.set("view engine", "ejs"); // On branche ejs avec express
app.set("views", path.join(process.cwd(), "views")); // On indique a express où seront rangé nos vues => dans le dossier views
app.use(express.static(path.join(process.cwd(), "static"))); // On rend accessible les fichiers static via URL (css, js (front), images, etc.)

app.use(routes);

app.use((req, res) => {
    res.status(404).render('error404', { path: req.path });
});


// ----- serveur à l'écoute ---
const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution : http://localhost:${port}`);
});
