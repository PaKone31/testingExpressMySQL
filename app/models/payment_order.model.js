'use strict';

const sql = require("./db.js");

// constructor
const PaymentOrder = function(payment_order) {
  this.created_at = payment_order.created_at;
  this.name = payment_order.name;
  this.description = payment_order.description;
};

PaymentOrder.create = (newPaymentOrder, result) => {
  sql.query("INSERT INTO payment_orders SET ?", newPaymentOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created payment_order: ", {
      id: res.insertId,
      ...newPaymentOrder
    });
    result(null, {
      id: res.insertId,
      ...newPaymentOrder
    });
  });
};

PaymentOrder.findById = (payment_orderId, result) => {
  sql.query(`SELECT * FROM payment_orders WHERE id = ${payment_orderId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found payment_order: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found PaymentOrder with the id
    result({
      kind: "not_found"
    }, null);
  });
};

PaymentOrder.getAllWithDates = (dateRanges, result) => {
  console.log(dateRanges);
  sql.query(`SELECT * FROM payment_orders WHERE ${dateRanges}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("payment_orders: ", res);
    result(null, res);
  });
};

PaymentOrder.getAll = result => {
  sql.query("SELECT * FROM payment_orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("payment_orders: ", res);
    result(null, res);
  });
};

PaymentOrder.updateById = (id, payment_order, result) => {
  sql.query(
    "UPDATE payment_orders SET name = ?, description = ? WHERE id = ?",
    [payment_order.name, payment_order.description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found PaymentOrder with the id
        result({
          kind: "not_found"
        }, null);
        return;
      }

      console.log("updated payment_order: ", {
        id: id,
        ...payment_order
      });
      result(null, {
        id: id,
        ...payment_order
      });
    }
  );
};

PaymentOrder.remove = (id, result) => {
  sql.query("DELETE FROM payment_orders WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found PaymentOrder with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("deleted payment_order with id: ", id);
    result(null, res);
  });
};

PaymentOrder.removeAll = result => {
  sql.query("DELETE FROM payment_orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} payment_orders`);
    result(null, res);
  });
};

module.exports = PaymentOrder;
