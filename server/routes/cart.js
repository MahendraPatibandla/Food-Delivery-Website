const express = require('express');
const router = express.Router();

// Cart is managed client-side with localStorage for this implementation
// This route exists for future server-side cart persistence
router.get('/status', (req, res) => {
  res.json({ message: 'Cart managed client-side' });
});

module.exports = router;
