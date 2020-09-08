# testingExpressMySQL

## Prerequisites

-   Install NodeJS
-   Install MySQL
-   Desktop Postman
-   Create user "testingUser" and database "testing_database" in MySQL
-   Inside testingExpressMySQL folder, run "npm install"

## Run project

-   Inside testingExpressMySQL folder, run "node ."
-   Test endpoints with Postman

### Testing endpoints

// Create a new Article
POST -> "/articles"
* JSON -> {name: "string", description: "string"}

// Retrieve all Articles
GET -> "/articles"

// Retrieve all frequent Articles with limit of results
GET -> "/frequent_articles/:howMany"
* :howMany -> Number of result

// Retrieve a single Article with articleId
GET -> "/articles/:articleId"
* :articleId -> ID number from article to find

// Update a Article with articleId
PUT -> "/articles/:articleId"
* :articleId -> ID number from article to find
* JSON -> {name: "string", description: "string"}

// Delete a Article with articleId
DELETE -> "/articles/:articleId"
* :articleId -> ID number from article to delete

// Delete all Articles
DELETE -> "/articles"

// Create a new PaymentOrder
POST -> "/payment_orders"
* JSON -> {name: "string", description: "string", articleIds: [{id: "int", quantity: int}, ...]}

// Retrieve all PaymentOrders with range dates
POST -> "/payment_orders_date"
* JSON -> {gt: "date", gte: "date", lt: "date", lte: "date"}
* gt = Greater than
* gte = Greater or equal than
* lt = Lower than
* lte = Lower or equal than

// Retrieve all PaymentOrders
GET -> "/payment_orders"

// Retrieve a single PaymentOrder with payment_orderId
GET -> "/payment_orders/:payment_orderId"
* :payment_orderId -> ID number from PaymentOrder to find

// Update a PaymentOrder with payment_orderId
PUT -> "/payment_orders/:payment_orderId"
* :payment_orderId -> ID number from PaymentOrder to find
* JSON -> {name: "string", description: "string"}

// Delete a PaymentOrder with payment_orderId
DELETE -> "/payment_orders/:payment_orderId"
* :payment_orderId -> ID number from PaymentOrder to delete

// Delete all PaymentOrders
DELETE -> "/payment_orders"
