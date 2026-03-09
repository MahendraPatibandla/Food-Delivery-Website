const express = require('express');
const MenuItem = require('../models/MenuItem');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

const SEED_ITEMS = [
  { name: 'Margherita Supreme', description: 'Classic tomato sauce, fresh mozzarella, basil, extra virgin olive oil on wood-fired crust', price: 14.99, category: 'Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', rating: 4.8, reviews: 342, prepTime: '20-25 min', isFeatured: true, isVeg: true, calories: 820 },
  { name: 'BBQ Chicken Feast', description: 'Smoky BBQ sauce, grilled chicken, red onions, jalapeños, cilantro, three-cheese blend', price: 18.99, category: 'Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', rating: 4.7, reviews: 289, prepTime: '22-28 min', isSpicy: true, calories: 980 },
  { name: 'Truffle Mushroom', description: 'White truffle oil, wild mushrooms, fontina cheese, thyme, garlic crème fraîche', price: 21.99, category: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', rating: 4.9, reviews: 156, prepTime: '25-30 min', isVeg: true, isFeatured: true, calories: 760 },
  { name: 'Smash Burger Classic', description: 'Double smashed beef patty, American cheese, pickles, special sauce, brioche bun', price: 13.99, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', rating: 4.8, reviews: 521, prepTime: '15-20 min', isFeatured: true, calories: 750 },
  { name: 'Spicy Sriracha Crunch', description: 'Crispy fried chicken, sriracha mayo, coleslaw, pickled jalapeños, sesame bun', price: 15.99, category: 'Burgers', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400', rating: 4.6, reviews: 378, prepTime: '18-23 min', isSpicy: true, calories: 820 },
  { name: 'Mushroom Swiss Melt', description: 'Beef patty, sautéed mushrooms, Swiss cheese, caramelized onions, truffle aioli', price: 16.99, category: 'Burgers', image: 'https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=400', rating: 4.7, reviews: 243, prepTime: '20-25 min', calories: 890 },
  { name: 'Dragon Roll', description: 'Shrimp tempura, cucumber, avocado topped with tuna, tobiko, sriracha drizzle (8 pieces)', price: 16.99, category: 'Sushi', image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400', rating: 4.9, reviews: 412, prepTime: '15-20 min', isSpicy: true, isFeatured: true, calories: 420 },
  { name: 'Rainbow Sashimi Platter', description: 'Chef selection of 15 premium cuts: salmon, tuna, yellowtail, snapper, octopus', price: 28.99, category: 'Sushi', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400', rating: 4.9, reviews: 198, prepTime: '20-25 min', calories: 380 },
  { name: 'Butter Chicken', description: 'Tender chicken in rich tomato-butter sauce, aromatic spices, served with naan', price: 15.99, category: 'Indian', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', rating: 4.8, reviews: 634, prepTime: '25-30 min', isFeatured: true, calories: 680 },
  { name: 'Paneer Tikka Masala', description: 'Grilled cottage cheese cubes in spiced tomato-cream sauce, basmati rice', price: 14.99, category: 'Indian', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400', rating: 4.7, reviews: 287, prepTime: '20-25 min', isVeg: true, isSpicy: true, calories: 590 },
  { name: 'Kung Pao Chicken', description: 'Wok-tossed chicken, peanuts, dried chilies, Sichuan peppercorns, scallions', price: 13.99, category: 'Chinese', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400', rating: 4.6, reviews: 445, prepTime: '15-20 min', isSpicy: true, calories: 620 },
  { name: 'Dim Sum Basket', description: '12-piece assortment: har gow, siu mai, char siu bao, turnip cake, sesame balls', price: 17.99, category: 'Chinese', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400', rating: 4.8, reviews: 321, prepTime: '20-25 min', calories: 540 },
  { name: 'Tiramisu Classico', description: 'Layers of espresso-soaked ladyfingers, mascarpone cream, premium cocoa dusting', price: 8.99, category: 'Desserts', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400', rating: 4.9, reviews: 567, prepTime: '5-10 min', isVeg: true, isFeatured: true, calories: 380 },
  { name: 'Molten Lava Cake', description: 'Warm chocolate cake with flowing center, vanilla bean ice cream, caramel drizzle', price: 9.99, category: 'Desserts', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400', rating: 4.8, reviews: 423, prepTime: '8-12 min', isVeg: true, calories: 520 },
  { name: 'Craft Lemonade', description: 'Freshly squeezed lemons, mint, honey, sparkling water — choose original or strawberry', price: 4.99, category: 'Drinks', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400', rating: 4.7, reviews: 234, prepTime: '3-5 min', isVeg: true, calories: 120 },
  { name: 'Mango Lassi', description: 'Alphonso mango pulp, yogurt, cardamom, saffron strands, rose water', price: 5.99, category: 'Drinks', image: 'https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=400', rating: 4.8, reviews: 312, prepTime: '3-5 min', isVeg: true, calories: 180 },
  { name: 'Caesar Supreme', description: 'Romaine, housemade anchovy dressing, shaved Parmesan, sourdough croutons, egg', price: 11.99, category: 'Salads', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400', rating: 4.6, reviews: 187, prepTime: '10-15 min', calories: 340 },
  { name: 'Carne Asada Tacos', description: 'Marinated grilled steak, cotija cheese, pico de gallo, avocado crema, corn tortillas (3)', price: 14.99, category: 'Tacos', image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=400', rating: 4.8, reviews: 398, prepTime: '15-20 min', isSpicy: true, isFeatured: true, calories: 560 },
  { name: 'Spaghetti Carbonara', description: 'Guanciale, eggs, Pecorino Romano, black pepper, al dente pasta — Roman style', price: 16.99, category: 'Pasta', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400', rating: 4.8, reviews: 445, prepTime: '18-22 min', calories: 720 },
];

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const { category, search, featured, sort } = req.query;
    let query = { isAvailable: true };

    if (category && category !== 'All') query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (search) query.name = { $regex: search, $options: 'i' };

    let sortOption = {};
    if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    else sortOption = { isFeatured: -1, rating: -1 };

    const items = await MenuItem.find(query).sort(sortOption);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single item
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed menu
router.post('/seed', async (req, res) => {
  try {
    await MenuItem.deleteMany({});
    const items = await MenuItem.insertMany(SEED_ITEMS);
    res.json({ message: `Seeded ${items.length} items` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Create item
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Update item
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Delete item
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
