// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const Product = require('../models/Product');

// Get all products
router.get('/', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const products = rows.map((row) => new Product(row.id, row.title, row.price, row.category, row.image));
    res.json(products);
  });
});

// Get all categories
router.get('/categories', (req, res) => {
  db.all('SELECT DISTINCT category FROM products', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const categories = rows.map((row) => row.category);
    res.json(categories);
  });
});

// Get products by category
router.get('/:category', (req, res) => {
  const category = req.params.category;
  db.all('SELECT * FROM products WHERE category = ?', [category], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const products = rows.map((row) => new Product(row.id, row.title, row.price, row.category, row.image));
    res.json(products);
  });
});

module.exports = router;
