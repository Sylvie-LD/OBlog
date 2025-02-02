import articles from './data/articles.json' with {type : 'json'};

export const controller = {
    home : (req,res) => {
      // on va enrichir nos articles avec un résumé
    for (let index = 0; index < articles.length; index++) {
      const text = articles[index].text;
      let words = text.split(' ');
      words = words.slice(0, 30);
      const excerpt = words.join(' ');
      articles[index].excerpt = excerpt;
    }
        res.render("index", { articles });
    },

    article : (req, res, next) =>{
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
  res.render("article", { article });
},

category: (req, res) => {
    const category = req.params.name;
    const filteredArticles = articles.filter((testedArticle) => {
      return testedArticle.category.toLowerCase() === category; 
    });
    res.render('list-avec-bonus', {
      listOfArticles: filteredArticles
    });
  },

  search : (req,res) => {
          res.render("search");
         },

searchResults : (req, res) => {
    const search = req.query.search;
  
    // on cherche les articles qui ont telle catégorie
    const foundCategory = articles.filter((article) => {
      return article.category.toLowerCase().includes(search.toLowerCase());
    });
  
    res.render("searchResults", { foundCategory });
  }




}

