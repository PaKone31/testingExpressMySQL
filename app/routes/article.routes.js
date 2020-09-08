'use strict';

module.exports = app => {
  const articles = require("../controllers/article.controller.js");

  // Create a new Article
  app.post("/articles", articles.create);

  // Retrieve all Articles
  app.get("/articles", articles.findAll);

  // Retrieve frequent Articles
  app.get("/frequent_articles/:howMany", articles.findFrequent);

  // Retrieve a single Article with articleId
  app.get("/articles/:articleId", articles.findOne);

  // Update a Article with articleId
  app.put("/articles/:articleId", articles.update);

  // Delete a Article with articleId
  app.delete("/articles/:articleId", articles.delete);

  // Delete all Articles
  app.delete("/articles", articles.deleteAll);
};
