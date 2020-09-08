'use strict';

const PaymentOrder = require("../models/payment_order.model.js");
const PaymentOrderArticle = require("../models/payment_order_article.model.js");
const Article = require("../models/article.model.js");

// Create and Save a new PaymentOrder
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } else if (!req.body.articleIds || !req.body.articleIds.length) {
    res.status(400).send({
      message: "Missing or empty articleIds."
    });
  } else {
    // Count Articles
    const articles = req.body.articleIds.map(article => (article.id));

    Article.counterIds(articles, (aerr, adata) => {
      if (aerr)
        res.status(500).send({
          message: aerr.message || "Some error occurred while creating the PaymentOrder."
        });
      else if (adata != req.body.articleIds.length)
        res.status(400).send({
          message: "One or some articleIds do not exist."
        });
      else {
        // Create a PaymentOrder
        const payment_order = new PaymentOrder({
          created_at: new Date(),
          name: req.body.name,
          description: req.body.description
        });

        // Save PaymentOrder in the database
        PaymentOrder.create(payment_order, (poerr, podata) => {
          if (poerr)
            res.status(500).send({
              message: poerr.message || "Some error occurred while creating the PaymentOrder."
            });
          else {
            // Create a PaymentOrderArticle
            const payment_orders_articles = req.body.articleIds.map(article => ([podata.id, article.id, article.quantity]));

            // Save PaymentOrderArticle in the database
            PaymentOrderArticle.create(payment_orders_articles, (poaerr, poadata) => {
              if (poaerr)
                res.status(500).send({
                  message: poaerr.message || "Some error occurred while creating the PaymentOrder."
                });
              else res.send(podata);
            });
          }
        });
      }
    });
  }
};

// Retrieve all PaymentOrders from the database.
exports.findAll = (req, res) => {
  PaymentOrder.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving payment_orders."
      });
    else res.send(data);
  });
};

// Retrieve all PaymentOrders witg range dates from the database.
exports.findAllWithDates = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  } else if (!req.body.gt && !req.body.gte && !req.body.lt && !req.body.lte)
    res.status(400).send({
      message: "Invalid content for date range."
    });
  else {
    let rangeDates = "";

    Object.keys(req.body).forEach(range => {
      switch (range) {
        case "gte":
          rangeDates += "created_at >= '" + req.body[range] + "' AND ";
          break;
        case "gt":
          rangeDates += "created_at > '" + req.body[range] + "' AND ";
          break;
        case "lte":
          rangeDates += "created_at <= '" + req.body[range] + "' AND ";
          break;
        case "lt":
          rangeDates += "created_at < '" + req.body[range] + "' AND ";
          break;
      }
    });

    rangeDates = rangeDates.slice(0, -5);

    PaymentOrder.getAllWithDates(rangeDates, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving payment_orders."
        });
      else res.send(data);
    });
  }
};

// Find a single PaymentOrder with a payment_orderId
exports.findOne = (req, res) => {
  PaymentOrder.findById(req.params.payment_orderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PaymentOrder with id ${req.params.payment_orderId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving PaymentOrder with id " + req.params.payment_orderId
        });
      }
    } else res.send(data);
  });
};

// Update a PaymentOrder identified by the payment_orderId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  PaymentOrder.updateById(
    req.params.payment_orderId,
    new PaymentOrder(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found PaymentOrder with id ${req.params.payment_orderId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating PaymentOrder with id " + req.params.payment_orderId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a PaymentOrder with the specified payment_orderId in the request
exports.delete = (req, res) => {
  PaymentOrder.remove(req.params.payment_orderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found PaymentOrder with id ${req.params.payment_orderId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete PaymentOrder with id " + req.params.payment_orderId
        });
      }
    } else res.send({
      message: `PaymentOrder was deleted successfully!`
    });
  });
};

// Delete all PaymentOrders from the database.
exports.deleteAll = (req, res) => {
  PaymentOrder.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all payment_orders."
      });
    else res.send({
      message: `All PaymentOrders were deleted successfully!`
    });
  });
};
