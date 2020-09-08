'use strict';

module.exports = app => {
  const payment_orders = require("../controllers/payment_order.controller.js");

  // Create a new PaymentOrder
  app.post("/payment_orders", payment_orders.create);

  // Retrieve all PaymentOrders with range dates
  app.post("/payment_orders_date", payment_orders.findAllWithDates);
  
  // Retrieve all PaymentOrders
  app.get("/payment_orders", payment_orders.findAll);

  // Retrieve a single PaymentOrder with payment_orderId
  app.get("/payment_orders/:payment_orderId", payment_orders.findOne);

  // Update a PaymentOrder with payment_orderId
  app.put("/payment_orders/:payment_orderId", payment_orders.update);

  // Delete a PaymentOrder with payment_orderId
  app.delete("/payment_orders/:payment_orderId", payment_orders.delete);

  // Create a new PaymentOrder
  app.delete("/payment_orders", payment_orders.deleteAll);
};
