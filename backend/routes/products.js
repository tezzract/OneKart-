const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '../../dataset');

function loadJSON(filename) {
  return JSON.parse(fs.readFileSync(path.join(dataPath, filename), 'utf8'));
}

// GET /api/products - Get all products (with optional filters)
router.get('/', (req, res) => {
  try {
    let products = loadJSON('products.json');
    const { category, search, sort, minPrice, maxPrice } = req.query;

    if (category) {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (minPrice) {
      products = products.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      products = products.filter(p => p.price <= parseFloat(maxPrice));
    }

    if (sort) {
      switch (sort) {
        case 'price-asc':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => b.rating - a.rating);
          break;
        case 'reviews':
          products.sort((a, b) => b.reviews - a.reviews);
          break;
      }
    }

    res.json({ products, total: products.length });
  } catch (err) {
    res.status(500).json({ message: 'Error loading products', error: err.message });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', (req, res) => {
  try {
    const products = loadJSON('products.json');
    const product = products.find(p => p.id === parseInt(req.params.id));

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error loading product', error: err.message });
  }
});

// GET /api/products/category/:categoryId - Get products by category
router.get('/category/:categoryId', (req, res) => {
  try {
    const products = loadJSON('products.json');
    const filtered = products.filter(p => p.categoryId === parseInt(req.params.categoryId));
    res.json({ products: filtered, total: filtered.length });
  } catch (err) {
    res.status(500).json({ message: 'Error loading products', error: err.message });
  }
});

// GET /api/categories - Get all categories
router.get('/meta/categories', (req, res) => {
  try {
    const categories = loadJSON('categories.json');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error loading categories', error: err.message });
  }
});

module.exports = router;
