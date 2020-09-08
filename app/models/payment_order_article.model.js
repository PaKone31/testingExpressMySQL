'use strict';

const sql = require("./db.js");

// constructor
const PaymentOrderArticle = function(payment_order_article) {
  this.paymentOrderId = payment_order_article.paymentOrderId;
  this.articleId = payment_order_article.articleId;
};

PaymentOrderArticle.create = (newPaymentOrderArticles, result) => {
  sql.query("INSERT INTO payment_orders_articles (paymentOrderId, articleId, quantity) VALUES ?", [newPaymentOrderArticles], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created payment_orders_articles: ", res.affectedRows);
    result(null, res);
  });
};

PaymentOrderArticle.findById = (payment_order_articleId, result) => {
  sql.query(`SELECT * FROM payment_order_articles WHERE id = ${payment_order_articleId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found payment_order_article: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found PaymentOrderArticle with the id
    result({
      kind: "not_found"
    }, null);
  });
};

PaymentOrderArticle.getAll = result => {
  sql.query("SELECT * FROM payment_order_articles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("payment_order_articles: ", res);
    result(null, res);
  });
};

PaymentOrderArticle.updateById = (id, payment_order_article, result) => {
  sql.query(
    "UPDATE payment_order_articles SET paymentOrderId = ?, articleId = ? WHERE id = ?",
    [payment_order_article.paymentOrderId, payment_order_article.articleId, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found PaymentOrderArticle with the id
        result({
          kind: "not_found"
        }, null);
        return;
      }

      console.log("updated payment_order_article: ", {
        id: id,
        ...payment_order_article
      });
      result(null, {
        id: id,
        ...payment_order_article
      });
    }
  );
};

PaymentOrderArticle.remove = (id, result) => {
  sql.query("DELETE FROM payment_order_articles WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found PaymentOrderArticle with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("deleted payment_order_article with id: ", id);
    result(null, res);
  });
};

PaymentOrderArticle.removeAll = result => {
  sql.query("DELETE FROM payment_order_articles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} payment_order_articles`);
    result(null, res);
  });
};

module.exports = PaymentOrderArticle;
