const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'app_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send({ error: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/api/data', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO items (name) VALUES (?)', [name], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send({ error: 'Database error' });
    }
    res.status(201).send({ id: result.insertId, name });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
