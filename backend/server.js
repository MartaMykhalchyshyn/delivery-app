const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 4000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "127.0.0.1", 
  user: "root", 
  password: "2209", 
  database: "dbdelivery", 
});

connection.connect((err) => {
  if (err) {
    console.error("Помилка підключення до бази даних:", err);
  } else {
    console.log("Підключення до бази даних успішне");
  }
});

app.get("/api/shops", (req, res) => {
  const sql = "SELECT * FROM shops";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Помилка запиту до бази даних:", err);
      res.status(500).json({ error: "Помилка сервера" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/goods/:id", (req, res) => {
  const shopId = req.params.id;

  const sql = "SELECT * FROM goods WHERE shop_id = ?";

  connection.query(sql, [shopId], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length > 0) {
      res.send(results);
    } else {
      res.send("Product not found");
    }
  });
});

app.get("/api/goods/image/:id", (req, res) => {
  const productId = req.params.id;

  const sql = "SELECT image FROM goods WHERE id = ?";

  connection.query(sql, [productId], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length > 0 && results[0].image) {
      res.setHeader("Content-Type", "image/jpeg");
      res.send(results[0].image);
    } else {
      res.status(404).send("Image not found");
    }
  });
});

app.post("/api/orders", (req, res) => {
  const { name, email, total, address, phone, shop_id } = req.body;

  connection.query(
    "INSERT INTO orders (name, email, total, address, phone, shop_id) VALUES (?, ?, ?, ?, ?, ?)",
    [name, email, total, address, phone, shop_id],
    (error, results) => {
      if (error) {
        console.error("Error creating order:", error);
        res.status(500).send("Error creating order");
      } else {
        const orderId = results.insertId;
        res.status(200).json({ orderId: orderId });
      }
    }
  );
});

app.post("/api/orderItems", (req, res) => {
  const orderItems = req.body;

  const orderItemsValues = orderItems.map((item) => [
    item.order_id,
    item.product_id,
    item.quantity,
    item.price,
  ]);

  connection.query(
    "INSERT INTO orderItems (order_id, product_id, quantity, price) VALUES ?",
    [orderItemsValues],
    (error, results) => {
      if (error) {
        console.error("Error creating order items:", error);
        res.status(500).send("Error creating order items");
      } else {
        res.status(200).send("Order items created successfully");
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Сервер працює на порті ${port}`);
});
