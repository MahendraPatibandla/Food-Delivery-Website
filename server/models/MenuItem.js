const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    required: true,
    enum: ['Pizza', 'Burgers', 'Sushi', 'Indian', 'Chinese', 'Desserts', 'Drinks', 'Salads', 'Pasta', 'Tacos'],
  },
  image: { type: String, required: true },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  reviews: { type: Number, default: 0 },
  prepTime: { type: String, default: '20-30 min' },
  isVeg: { type: Boolean, default: false },
  isSpicy: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  calories: { type: Number, default: 0 },
  tags: [String],
  restaurant: { type: String, default: 'QuickBite Kitchen' },
  discount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
