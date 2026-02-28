const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const db = mysql.createConnection({
  host: "db",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

db.connect(err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  db.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      content TEXT
    )
  `);
});

app.post("/add", (req, res) => {
  db.query(
    "INSERT INTO messages (content) VALUES (?)",
    [req.body.content]
  );

  res.sendStatus(200);
});

app.get("/messages", (req, res) => {
  db.query("SELECT * FROM messages", (err, results) => {
    res.json(results);
  });
});

app.listen(3000, () => console.log("Backend running"));