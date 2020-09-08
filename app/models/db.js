const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;

  console.log("Successfully connected to the database.");

  let createTables = [`CREATE TABLE IF NOT EXISTS payment_orders (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8`,
    `CREATE TABLE IF NOT EXISTS articles (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    description varchar(255) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8`,
    `CREATE TABLE IF NOT EXISTS payment_orders_articles (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    quantity int NOT NULL,
    paymentOrderId int(11) NOT NULL,
    CONSTRAINT fk_paymentOrder FOREIGN KEY(paymentOrderId) REFERENCES payment_orders(id),
    articleId int(11) NOT NULL,
    CONSTRAINT fk_article FOREIGN KEY(articleId) REFERENCES articles(id)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8`
  ];

  createTables.forEach(itemQuery => {
    connection.query(itemQuery, function(err, result) {
      if (err) throw err;
    });
  });

});

module.exports = connection;
