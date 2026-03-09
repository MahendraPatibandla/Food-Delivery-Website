const express = require('express');
const Order = require('../models/Order');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

// Create order
router.post('/', protect, async (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethod, specialInstructions } = req.body;
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 2.99;
    const tax = +(subtotal * 0.08).toFixed(2);
    const total = +(subtotal + deliveryFee + tax).toFixed(2);

    const order = await Order.create({
      user: req.user._id,
      items,
      subtotal: +subtotal.toFixed(2),
      deliveryFee,
      tax,
      total,
      deliveryAddress,
      paymentMethod: paymentMethod || 'card',
      paymentStatus: 'paid',
      specialInstructions,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's orders
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all orders
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
