const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { authenticateToken } = require('../middleware/auth');

const usersPath = path.join(__dirname, '../../dataset/users.json');
const productsPath = path.join(__dirname, '../../dataset/products.json');

function loadUsers() {
  return JSON.parse(fs.readFileSync(usersPath, 'utf8'));
}
function saveUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}
function loadProducts() {
  return JSON.parse(fs.readFileSync(productsPath, 'utf8'));
}

// GET /api/cart - Get user's cart
router.get('/', authenticateToken, (req, res) => {
  try {
    const users = loadUsers();
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const products = loadProducts();
    const cartItems = user.cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return { ...item, product };
    }).filter(item => item.product);

    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    res.json({ items: cartItems, subtotal: Math.round(subtotal * 100) / 100, itemCount: cartItems.length });
  } catch (err) {
    res.status(500).json({ message: 'Error loading cart', error: err.message });
  }
});

// POST /api/cart - Add item to cart
router.post('/', authenticateToken, (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) return res.status(400).json({ message: 'Product ID is required' });

    const products = loadProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const users = loadUsers();
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingItem = user.cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    saveUsers(users);
    res.json({ message: 'Item added to cart', cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart', error: err.message });
  }
});

// PUT /api/cart/:productId - Update item quantity
router.put('/:productId', authenticateToken, (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = parseInt(req.params.productId);

    const users = loadUsers();
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const item = user.cart.find(i => i.productId === productId);
    if (!item) return res.status(404).json({ message: 'Item not in cart' });

    if (quantity <= 0) {
      user.cart = user.cart.filter(i => i.productId !== productId);
    } else {
      item.quantity = quantity;
    }

    saveUsers(users);
    res.json({ message: 'Cart updated', cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart', error: err.message });
  }
});

// DELETE /api/cart/:productId - Remove item from cart
router.delete('/:productId', authenticateToken, (req, res) => {
  try {
    const productId = parseInt(req.params.productId);

    const users = loadUsers();
    const user = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = user.cart.filter(i => i.productId !== productId);
    saveUsers(users);
    res.json({ message: 'Item removed from cart', cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: 'Error removing item', error: err.message });
  }
});

module.exports = router;
