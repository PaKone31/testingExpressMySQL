'use strict';

const sql = require("./db.js");

// constructor
const Article = function(article) {
  this.name = article.name;
  this.description = article.description;
};

Article.create = (newArticle, result) => {
  sql.query("INSERT INTO articles SET ?", newArticle, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created article: ", {
      id: res.insertId,
      ...newArticle
    });
    result(null, {
      id: res.insertId,
      ...newArticle
    });
  });
};

Article.findById = (articleId, result) => {
  sql.query(`SELECT * FROM articles WHERE id = ${articleId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found article: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Article with the id
    result({
      kind: "not_found"
    }, null);
  });
};

Article.getAll = result => {
  sql.query("SELECT * FROM articles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("articles: ", res);
    result(null, res);
  });
};

Article.updateById = (id, article, result) => {
  sql.query(
    "UPDATE articles SET name = ?, description = ? WHERE id = ?",
    [article.name, article.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Article with the id
        result({
          kind: "not_found"
        }, null);
        return;
      }

      console.log("updated article: ", {
        id: id,
        ...article
      });
      result(null, {
        id: id,
        ...article
      });
    }
  );
};

Article.remove = (id, result) => {
  sql.query("DELETE FROM articles WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Article with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("deleted article with id: ", id);
    result(null, res);
  });
};

Article.removeAll = result => {
  sql.query("DELETE FROM articles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} articles`);
    result(null, res);
  });
};

Article.counterIds = (ids, result) => {
  sql.query("SELECT COUNT(*) AS articlesCount FROM articles WHERE id IN ?", [
    [ids]
  ], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("articles: ", res[0].articlesCount);
    result(null, res[0].articlesCount);
  });
};

Article.getFrequent = (howMany, result) => {
  sql.query(`SELECT t1.id, name, SUM(quantity) AS total_quantity FROM articles t1 INNER JOIN payment_orders_articles t2 ON t1.id = t2.articleId GROUP BY articleId ORDER BY total_quantity DESC LIMIT ${howMany}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Frequent articles: ", res);
    result(null, res);
  });
};

module.exports = Article;
