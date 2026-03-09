import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

// ─────────────────────────────────────────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────────────────────────────────────────
const AppContext = createContext();

const CATEGORIES = ['All', 'Pizza', 'Burgers', 'Sushi', 'Indian', 'Chinese', 'Desserts', 'Drinks', 'Salads', 'Pasta', 'Tacos'];

const MOCK_MENU = [
  { _id: '1', name: 'Margherita Supreme', description: 'Classic tomato sauce, fresh mozzarella, basil, extra virgin olive oil on wood-fired crust', price: 14.99, category: 'Pizza', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500', rating: 4.8, reviews: 342, prepTime: '20-25 min', isFeatured: true, isVeg: true, calories: 820, restaurant: 'QuickBite Kitchen' },
  { _id: '2', name: 'BBQ Chicken Feast', description: 'Smoky BBQ sauce, grilled chicken, red onions, jalapeños, cilantro, three-cheese blend', price: 18.99, category: 'Pizza', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500', rating: 4.7, reviews: 289, prepTime: '22-28 min', isSpicy: true, calories: 980, restaurant: 'QuickBite Kitchen' },
  { _id: '3', name: 'Truffle Mushroom', description: 'White truffle oil, wild mushrooms, fontina cheese, thyme, garlic crème fraîche', price: 21.99, category: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500', rating: 4.9, reviews: 156, prepTime: '25-30 min', isVeg: true, isFeatured: true, calories: 760, restaurant: 'QuickBite Kitchen' },
  { _id: '4', name: 'Smash Burger Classic', description: 'Double smashed beef patty, American cheese, pickles, special sauce, brioche bun', price: 13.99, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', rating: 4.8, reviews: 521, prepTime: '15-20 min', isFeatured: true, calories: 750, restaurant: 'QuickBite Kitchen' },
  { _id: '5', name: 'Spicy Sriracha Crunch', description: 'Crispy fried chicken, sriracha mayo, coleslaw, pickled jalapeños, sesame bun', price: 15.99, category: 'Burgers', image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500', rating: 4.6, reviews: 378, prepTime: '18-23 min', isSpicy: true, calories: 820, restaurant: 'QuickBite Kitchen' },
  { _id: '6', name: 'Mushroom Swiss Melt', description: 'Beef patty, sautéed mushrooms, Swiss cheese, caramelized onions, truffle aioli', price: 16.99, category: 'Burgers', image: 'https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=500', rating: 4.7, reviews: 243, prepTime: '20-25 min', calories: 890, restaurant: 'QuickBite Kitchen' },
  { _id: '7', name: 'Dragon Roll', description: 'Shrimp tempura, cucumber, avocado topped with tuna, tobiko, sriracha drizzle (8 pieces)', price: 16.99, category: 'Sushi', image: 'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=500', rating: 4.9, reviews: 412, prepTime: '15-20 min', isSpicy: true, isFeatured: true, calories: 420, restaurant: 'QuickBite Kitchen' },
  { _id: '8', name: 'Rainbow Sashimi Platter', description: 'Chef selection of 15 premium cuts: salmon, tuna, yellowtail, snapper, octopus', price: 28.99, category: 'Sushi', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=500', rating: 4.9, reviews: 198, prepTime: '20-25 min', calories: 380, restaurant: 'QuickBite Kitchen' },
  { _id: '9', name: 'Butter Chicken', description: 'Tender chicken in rich tomato-butter sauce, aromatic spices, served with naan', price: 15.99, category: 'Indian', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500', rating: 4.8, reviews: 634, prepTime: '25-30 min', isFeatured: true, calories: 680, restaurant: 'QuickBite Kitchen' },
  { _id: '10', name: 'Paneer Tikka Masala', description: 'Grilled cottage cheese cubes in spiced tomato-cream sauce, basmati rice', price: 14.99, category: 'Indian', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500', rating: 4.7, reviews: 287, prepTime: '20-25 min', isVeg: true, isSpicy: true, calories: 590, restaurant: 'QuickBite Kitchen' },
  { _id: '11', name: 'Kung Pao Chicken', description: 'Wok-tossed chicken, peanuts, dried chilies, Sichuan peppercorns, scallions', price: 13.99, category: 'Chinese', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500', rating: 4.6, reviews: 445, prepTime: '15-20 min', isSpicy: true, calories: 620, restaurant: 'QuickBite Kitchen' },
  { _id: '12', name: 'Dim Sum Basket', description: '12-piece assortment: har gow, siu mai, char siu bao, turnip cake, sesame balls', price: 17.99, category: 'Chinese', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500', rating: 4.8, reviews: 321, prepTime: '20-25 min', calories: 540, restaurant: 'QuickBite Kitchen' },
  { _id: '13', name: 'Tiramisu Classico', description: 'Layers of espresso-soaked ladyfingers, mascarpone cream, premium cocoa dusting', price: 8.99, category: 'Desserts', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500', rating: 4.9, reviews: 567, prepTime: '5-10 min', isVeg: true, isFeatured: true, calories: 380, restaurant: 'QuickBite Kitchen' },
  { _id: '14', name: 'Molten Lava Cake', description: 'Warm chocolate cake with flowing center, vanilla bean ice cream, caramel drizzle', price: 9.99, category: 'Desserts', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500', rating: 4.8, reviews: 423, prepTime: '8-12 min', isVeg: true, calories: 520, restaurant: 'QuickBite Kitchen' },
  { _id: '15', name: 'Craft Lemonade', description: 'Freshly squeezed lemons, mint, honey, sparkling water — choose original or strawberry', price: 4.99, category: 'Drinks', image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500', rating: 4.7, reviews: 234, prepTime: '3-5 min', isVeg: true, calories: 120, restaurant: 'QuickBite Kitchen' },
  { _id: '16', name: 'Mango Lassi', description: 'Alphonso mango pulp, yogurt, cardamom, saffron strands, rose water', price: 5.99, category: 'Drinks', image: 'https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=500', rating: 4.8, reviews: 312, prepTime: '3-5 min', isVeg: true, calories: 180, restaurant: 'QuickBite Kitchen' },
  { _id: '17', name: 'Caesar Supreme', description: 'Romaine, housemade anchovy dressing, shaved Parmesan, sourdough croutons, egg', price: 11.99, category: 'Salads', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500', rating: 4.6, reviews: 187, prepTime: '10-15 min', calories: 340, restaurant: 'QuickBite Kitchen' },
  { _id: '18', name: 'Carne Asada Tacos', description: 'Marinated grilled steak, cotija cheese, pico de gallo, avocado crema, corn tortillas (3)', price: 14.99, category: 'Tacos', image: 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=500', rating: 4.8, reviews: 398, prepTime: '15-20 min', isSpicy: true, isFeatured: true, calories: 560, restaurant: 'QuickBite Kitchen' },
  { _id: '19', name: 'Spaghetti Carbonara', description: 'Guanciale, eggs, Pecorino Romano, black pepper, al dente pasta — Roman style', price: 16.99, category: 'Pasta', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500', rating: 4.8, reviews: 445, prepTime: '18-22 min', calories: 720, restaurant: 'QuickBite Kitchen' },
];

function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('qb_cart') || '[]'); } catch { return []; }
  });
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('qb_user') || 'null'); } catch { return null; }
  });
  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('qb_orders') || '[]'); } catch { return []; }
  });
  const [toast, setToast] = useState(null);

  useEffect(() => { localStorage.setItem('qb_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { if (user) localStorage.setItem('qb_user', JSON.stringify(user)); else localStorage.removeItem('qb_user'); }, [user]);
  useEffect(() => { localStorage.setItem('qb_orders', JSON.stringify(orders)); }, [orders]);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type, id: Date.now() });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const exists = prev.find(i => i._id === item._id);
      if (exists) return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`${item.name} added to cart! 🛒`);
  }, [showToast]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i._id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i._id === id ? { ...i, quantity: qty } : i));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const placeOrder = useCallback((deliveryAddress) => {
    const order = {
      id: 'QB' + Date.now(),
      items: [...cart],
      deliveryAddress,
      subtotal: +cartTotal.toFixed(2),
      deliveryFee: 2.99,
      tax: +(cartTotal * 0.08).toFixed(2),
      total: +(cartTotal + 2.99 + cartTotal * 0.08).toFixed(2),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: '30-45 min',
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    showToast('Order placed successfully! 🎉');
    return order;
  }, [cart, cartTotal, clearCart, showToast]);

  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartCount, cartTotal, user, setUser, orders, placeOrder, showToast, toast }}>
      {children}
    </AppContext.Provider>
  );
}

const useApp = () => useContext(AppContext);

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --brand: #FF4500;
    --brand-deep: #cc3700;
    --brand-glow: rgba(255,69,0,0.25);
    --brand-light: #fff5f2;
    --dark: #0D0D0D;
    --dark2: #161616;
    --dark3: #1f1f1f;
    --surface: #242424;
    --surface2: #2e2e2e;
    --border: rgba(255,255,255,0.08);
    --text: #F5F5F5;
    --text-muted: #999;
    --text-faint: #555;
    --success: #22c55e;
    --warning: #f59e0b;
    --radius: 16px;
    --radius-sm: 10px;
    --shadow: 0 4px 24px rgba(0,0,0,0.4);
    --shadow-lg: 0 20px 60px rgba(0,0,0,0.6);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--dark);
    color: var(--text);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5 { font-family: 'Syne', sans-serif; }

  a { text-decoration: none; color: inherit; }

  button { cursor: pointer; font-family: 'DM Sans', sans-serif; border: none; outline: none; }

  input, textarea, select {
    font-family: 'DM Sans', sans-serif;
    outline: none;
    border: none;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--dark2); }
  ::-webkit-scrollbar-thumb { background: var(--brand); border-radius: 3px; }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideRight {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes toastIn {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-2%, -3%); }
    20% { transform: translate(3%, 2%); }
    30% { transform: translate(-1%, 4%); }
    40% { transform: translate(2%, -2%); }
    50% { transform: translate(-3%, 1%); }
    60% { transform: translate(1%, -4%); }
    70% { transform: translate(-2%, 3%); }
    80% { transform: translate(3%, -1%); }
    90% { transform: translate(-1%, 2%); }
  }

  .animate-fadeUp { animation: fadeUp 0.6s ease forwards; }
  .animate-fadeIn { animation: fadeIn 0.4s ease forwards; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-pulse { animation: pulse 2s ease-in-out infinite; }

  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.4s; }
  .delay-5 { animation-delay: 0.5s; }
`;

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────────────────────────────────────
function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 32, right: 32, zIndex: 9999,
      background: 'var(--dark3)', border: '1px solid var(--border)',
      borderLeft: '4px solid var(--brand)',
      borderRadius: 'var(--radius-sm)', padding: '14px 20px',
      color: 'var(--text)', fontSize: 14, fontWeight: 500,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      animation: 'toastIn 0.3s ease',
      maxWidth: 320,
    }}>
      {toast.msg}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
function Navbar() {
  const { cartCount, user, setUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/menu', label: 'Menu' },
    { to: '/orders', label: 'My Orders' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
        transition: 'all 0.3s ease',
        padding: '0 24px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, fontWeight: 800,
              boxShadow: '0 0 20px var(--brand-glow)',
            }}>🍕</div>
            <span style={{ fontFamily: 'Syne', fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>
              Quick<span style={{ color: 'var(--brand)' }}>Bite</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} style={{
                fontSize: 15, fontWeight: 500, color: location.pathname === to ? 'var(--brand)' : 'var(--text-muted)',
                transition: 'color 0.2s', letterSpacing: '0.3px',
              }}>{label}</Link>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => navigate('/cart')} style={{
              position: 'relative', background: 'var(--dark3)', border: '1px solid var(--border)',
              borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text)', fontSize: 18, transition: 'all 0.2s',
            }}>
              🛒
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -6,
                  background: 'var(--brand)', color: '#fff',
                  borderRadius: '50%', width: 20, height: 20,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700,
                }}>{cartCount}</span>
              )}
            </button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14, color: '#fff',
                }}>{user.name?.charAt(0).toUpperCase()}</div>
                <button onClick={() => { setUser(null); navigate('/'); }} style={{
                  background: 'transparent', color: 'var(--text-muted)', fontSize: 13,
                  padding: '6px 12px', borderRadius: 8, border: '1px solid var(--border)',
                  transition: 'all 0.2s',
                }}>Logout</button>
              </div>
            ) : (
              <button onClick={() => navigate('/login')} style={{
                background: 'var(--brand)', color: '#fff',
                border: 'none', borderRadius: 12, padding: '10px 20px',
                fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
                boxShadow: '0 4px 16px var(--brand-glow)',
              }}>Sign In</button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <span style={{ color: '#f59e0b', fontSize: 13 }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span style={{ color: 'var(--text-muted)', marginLeft: 4 }}>{rating}</span>
    </span>
  );
}

function FoodCard({ item, delay = 0 }) {
  const { addToCart } = useApp();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--dark2)', borderRadius: 20,
        border: `1px solid ${hovered ? 'rgba(255,69,0,0.3)' : 'var(--border)'}`,
        overflow: 'hidden', cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? '0 20px 60px rgba(255,69,0,0.15)' : 'var(--shadow)',
        animation: `fadeUp 0.6s ease ${delay}ms both`,
        position: 'relative',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img src={item.image} alt={item.name} style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.5s ease',
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(13,13,13,0.8) 0%, transparent 50%)',
        }} />

        {/* Badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          {item.isFeatured && (
            <span style={{ background: 'var(--brand)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>
              ⭐ FEATURED
            </span>
          )}
          {item.isVeg && (
            <span style={{ background: '#16a34a', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>
              🌱 VEG
            </span>
          )}
          {item.isSpicy && (
            <span style={{ background: '#dc2626', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>
              🌶 SPICY
            </span>
          )}
        </div>

        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
          borderRadius: 8, padding: '4px 10px', fontSize: 12, color: 'var(--text-muted)',
        }}>⏱ {item.prepTime}</div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3, flex: 1, marginRight: 8 }}>{item.name}</h3>
          <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--brand)', whiteSpace: 'nowrap' }}>
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {item.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StarRating rating={item.rating} />
            <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>{item.reviews} reviews · {item.calories} cal</span>
          </div>
          <button onClick={handleAdd} style={{
            background: added ? 'var(--success)' : 'var(--brand)',
            color: '#fff', border: 'none', borderRadius: 12,
            padding: '10px 18px', fontSize: 13, fontWeight: 700,
            transition: 'all 0.3s',
            boxShadow: added ? '0 4px 16px rgba(34,197,94,0.3)' : '0 4px 16px var(--brand-glow)',
            transform: added ? 'scale(0.97)' : 'scale(1)',
          }}>
            {added ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const featured = MOCK_MENU.filter(i => i.isFeatured).slice(0, 6);

  const stats = [
    { icon: '🏪', value: '500+', label: 'Restaurants' },
    { icon: '🛵', value: '30 min', label: 'Avg Delivery' },
    { icon: '⭐', value: '4.8', label: 'Avg Rating' },
    { icon: '🍽️', value: '10K+', label: 'Daily Orders' },
  ];

  const categoryCards = [
    { name: 'Pizza', emoji: '🍕', color: '#FF4500', bg: 'rgba(255,69,0,0.12)' },
    { name: 'Burgers', emoji: '🍔', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)' },
    { name: 'Sushi', emoji: '🍣', color: '#06b6d4', bg: 'rgba(6,182,212,0.12)' },
    { name: 'Indian', emoji: '🍛', color: '#f97316', bg: 'rgba(249,115,22,0.12)' },
    { name: 'Chinese', emoji: '🥡', color: '#ef4444', bg: 'rgba(239,68,68,0.12)' },
    { name: 'Desserts', emoji: '🍰', color: '#ec4899', bg: 'rgba(236,72,153,0.12)' },
    { name: 'Drinks', emoji: '🍹', color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)' },
    { name: 'Tacos', emoji: '🌮', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse at 70% 50%, rgba(255,69,0,0.08) 0%, transparent 60%), var(--dark)',
        padding: '100px 24px 60px',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute', right: '-100px', top: '50%', transform: 'translateY(-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,69,0,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Floating food emojis */}
        {['🍕', '🍔', '🍣', '🌮', '🍜', '🍰'].map((emoji, i) => (
          <div key={i} style={{
            position: 'absolute', fontSize: 32, opacity: 0.15,
            top: `${15 + i * 12}%`, right: `${8 + (i % 3) * 12}%`,
            animation: `float ${2.5 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            filter: 'blur(0.5px)',
          }}>{emoji}</div>
        ))}

        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,69,0,0.12)', border: '1px solid rgba(255,69,0,0.25)',
              borderRadius: 100, padding: '6px 16px', marginBottom: 32,
              fontSize: 13, fontWeight: 600, color: 'var(--brand)',
              animation: 'fadeUp 0.6s ease',
            }}>
              🚀 Fast delivery in 30 minutes
            </div>

            <h1 style={{
              fontFamily: 'Syne', fontSize: 'clamp(44px, 5vw, 72px)', fontWeight: 800,
              lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 24,
              animation: 'fadeUp 0.6s ease 0.1s both',
            }}>
              Cravings<br />
              <span style={{ color: 'var(--brand)' }}>Delivered</span><br />
              Hot & Fast.
            </h1>

            <p style={{
              fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 420, marginBottom: 40,
              animation: 'fadeUp 0.6s ease 0.2s both',
            }}>
              Order from hundreds of local restaurants. Enjoy premium food at your doorstep in under 30 minutes.
            </p>

            <div style={{ display: 'flex', gap: 16, animation: 'fadeUp 0.6s ease 0.3s both' }}>
              <button onClick={() => navigate('/menu')} style={{
                background: 'var(--brand)', color: '#fff',
                border: 'none', borderRadius: 16, padding: '16px 36px',
                fontSize: 16, fontWeight: 700, transition: 'all 0.3s',
                boxShadow: '0 8px 32px var(--brand-glow)',
                letterSpacing: '0.3px',
              }}>
                Explore Menu →
              </button>
              <button onClick={() => navigate('/menu')} style={{
                background: 'transparent', color: 'var(--text)',
                border: '1px solid var(--border)', borderRadius: 16, padding: '16px 28px',
                fontSize: 16, fontWeight: 600, transition: 'all 0.3s',
                backdropFilter: 'blur(8px)',
              }}>
                View Deals
              </button>
            </div>
          </div>

          {/* Hero visual */}
          <div style={{ position: 'relative', animation: 'fadeUp 0.6s ease 0.2s both' }}>
            <div style={{
              position: 'relative', borderRadius: 32,
              overflow: 'hidden', aspectRatio: '4/3',
              boxShadow: '0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px var(--border)',
            }}>
              <img src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700" alt="Delicious food" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(255,69,0,0.15) 0%, transparent 60%)',
              }} />
            </div>

            {/* Floating card */}
            <div style={{
              position: 'absolute', bottom: -20, left: -30,
              background: 'var(--dark2)', border: '1px solid var(--border)',
              borderRadius: 20, padding: '16px 20px',
              boxShadow: 'var(--shadow-lg)',
              backdropFilter: 'blur(12px)',
              animation: 'float 4s ease-in-out infinite',
            }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Latest Order</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>🍔 Smash Burger Classic</div>
              <div style={{ fontSize: 12, color: 'var(--success)' }}>✓ Delivered in 24 min</div>
            </div>

            <div style={{
              position: 'absolute', top: -15, right: -20,
              background: 'var(--dark2)', border: '1px solid var(--border)',
              borderRadius: 16, padding: '12px 16px',
              boxShadow: 'var(--shadow)',
              animation: 'float 3s ease-in-out infinite',
              animationDelay: '1s',
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>⭐ 4.9</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Top Rated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: 'var(--dark2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontFamily: 'Syne', fontSize: 24, fontWeight: 800, color: 'var(--brand)' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'Syne', fontSize: 40, fontWeight: 800, letterSpacing: '-1px', marginBottom: 12 }}>
              Browse by <span style={{ color: 'var(--brand)' }}>Category</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>From spicy to sweet, we've got every craving covered</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16 }}>
            {categoryCards.map((cat, i) => (
              <button key={i} onClick={() => navigate(`/menu?category=${cat.name}`)} style={{
                background: cat.bg, border: `1px solid ${cat.color}30`,
                borderRadius: 20, padding: '28px 16px', cursor: 'pointer',
                transition: 'all 0.3s', textAlign: 'center',
                animation: `fadeUp 0.6s ease ${i * 60}ms both`,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${cat.color}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{ fontSize: 36, marginBottom: 10 }}>{cat.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: cat.color }}>{cat.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section style={{ padding: '0 24px 80px', background: 'var(--dark)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <h2 style={{ fontFamily: 'Syne', fontSize: 40, fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
                🔥 Featured <span style={{ color: 'var(--brand)' }}>Dishes</span>
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>Hand-picked by our culinary team</p>
            </div>
            <button onClick={() => navigate('/menu')} style={{
              background: 'transparent', color: 'var(--brand)',
              border: '1px solid var(--brand)', borderRadius: 12, padding: '10px 20px',
              fontSize: 14, fontWeight: 600, transition: 'all 0.2s',
            }}>View All →</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {featured.map((item, i) => <FoodCard key={item._id} item={item} delay={i * 80} />)}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        margin: '0 24px 80px', borderRadius: 32,
        background: 'linear-gradient(135deg, var(--brand) 0%, #ff6b35 100%)',
        padding: '60px 48px', position: 'relative', overflow: 'hidden',
        maxWidth: 1280, marginLeft: 'auto', marginRight: 'auto',
      }}>
        <div style={{ position: 'absolute', right: -40, top: -40, fontSize: 160, opacity: 0.1, userSelect: 'none' }}>🛵</div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h2 style={{ fontFamily: 'Syne', fontSize: 36, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
              First order? Get 20% off!
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>Use code <strong>QUICKBITE20</strong> at checkout</p>
          </div>
          <button onClick={() => navigate('/menu')} style={{
            background: '#fff', color: 'var(--brand)',
            border: 'none', borderRadius: 16, padding: '16px 36px',
            fontSize: 16, fontWeight: 800, transition: 'all 0.3s',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>Order Now →</button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
        <div style={{ fontFamily: 'Syne', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Quick<span style={{ color: 'var(--brand)' }}>Bite</span></div>
        <p>© 2024 QuickBite. Premium Food Delivery · Built with MERN Stack</p>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MENU PAGE
// ─────────────────────────────────────────────────────────────────────────────
function MenuPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get('category') || 'All';

  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');

  const filtered = MOCK_MENU
    .filter(i => category === 'All' || i.category === category)
    .filter(i => !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating;
    });

  return (
    <div style={{ paddingTop: 88, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(255,69,0,0.06) 0%, transparent 100%)',
        padding: '40px 24px 32px', borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Syne', fontSize: 36, fontWeight: 800, marginBottom: 24, letterSpacing: '-1px' }}>
            Full <span style={{ color: 'var(--brand)' }}>Menu</span>
          </h1>

          {/* Search & Sort */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 240 }}>
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 16, pointerEvents: 'none' }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search dishes, ingredients..."
                style={{
                  width: '100%', background: 'var(--dark2)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '12px 16px 12px 44px', color: 'var(--text)', fontSize: 15,
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--brand)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{
              background: 'var(--dark2)', border: '1px solid var(--border)',
              borderRadius: 14, padding: '12px 16px', color: 'var(--text)', fontSize: 14, cursor: 'pointer',
            }}>
              <option value="featured">Featured</option>
              <option value="rating">Top Rated</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                background: category === cat ? 'var(--brand)' : 'var(--dark3)',
                color: category === cat ? '#fff' : 'var(--text-muted)',
                border: `1px solid ${category === cat ? 'var(--brand)' : 'var(--border)'}`,
                borderRadius: 100, padding: '8px 18px', fontSize: 13, fontWeight: 600,
                whiteSpace: 'nowrap', transition: 'all 0.2s',
                boxShadow: category === cat ? '0 4px 16px var(--brand-glow)' : 'none',
              }}>{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14 }}>
          {filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'} found
          {category !== 'All' ? ` in ${category}` : ''}
          {search ? ` for "${search}"` : ''}
        </p>
        {filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {filtered.map((item, i) => <FoodCard key={item._id} item={item} delay={i * 40} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🍽️</div>
            <h3 style={{ fontFamily: 'Syne', fontSize: 24, marginBottom: 8 }}>No dishes found</h3>
            <p>Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CART PAGE
// ─────────────────────────────────────────────────────────────────────────────
function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart, placeOrder, user } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=cart, 2=checkout, 3=success
  const [address, setAddress] = useState({ street: '', city: '', state: '', zipCode: '' });
  const [payment, setPayment] = useState('card');
  const [orderId, setOrderId] = useState('');

  const deliveryFee = 2.99;
  const tax = +(cartTotal * 0.08).toFixed(2);
  const total = +(cartTotal + deliveryFee + tax).toFixed(2);

  const handleCheckout = () => {
    if (!user) { navigate('/login'); return; }
    setStep(2);
  };

  const handlePlaceOrder = () => {
    if (!address.street || !address.city) { return; }
    const order = placeOrder(address);
    setOrderId(order.id);
    setStep(3);
  };

  if (step === 3) return (
    <div style={{ paddingTop: 100, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 480, animation: 'fadeUp 0.6s ease' }}>
        <div style={{ fontSize: 80, marginBottom: 24, animation: 'float 3s ease-in-out infinite' }}>🎉</div>
        <h2 style={{ fontFamily: 'Syne', fontSize: 40, fontWeight: 800, marginBottom: 12 }}>Order Confirmed!</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 8 }}>Order ID: <strong style={{ color: 'var(--brand)' }}>#{orderId}</strong></p>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Estimated delivery: <strong>30-45 minutes</strong></p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => navigate('/orders')} style={{ background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: 14, padding: '14px 28px', fontWeight: 700, fontSize: 15 }}>Track Order</button>
          <button onClick={() => navigate('/menu')} style={{ background: 'var(--dark2)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 28px', fontWeight: 600, fontSize: 15 }}>Order More</button>
        </div>
      </div>
    </div>
  );

  if (cart.length === 0) return (
    <div style={{ paddingTop: 100, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🛒</div>
        <h2 style={{ fontFamily: 'Syne', fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Add some delicious food to get started</p>
        <button onClick={() => navigate('/menu')} style={{ background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: 14, padding: '14px 28px', fontWeight: 700, fontSize: 15 }}>Browse Menu</button>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 88, minHeight: '100vh' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>
        {/* Cart Items / Checkout Form */}
        <div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 32, fontWeight: 800, marginBottom: 28, letterSpacing: '-0.5px' }}>
            {step === 1 ? '🛒 Your Cart' : '📦 Checkout'}
          </h1>

          {step === 1 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cart.map(item => (
                <div key={item._id} style={{
                  background: 'var(--dark2)', borderRadius: 16, padding: 20,
                  border: '1px solid var(--border)', display: 'flex', gap: 16, alignItems: 'center',
                  animation: 'fadeUp 0.4s ease',
                }}>
                  <img src={item.image} alt={item.name} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontWeight: 700, marginBottom: 4 }}>{item.name}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>${item.price.toFixed(2)} each</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--dark3)', borderRadius: 10, padding: '6px 12px' }}>
                      <button onClick={() => updateQty(item._id, item.quantity - 1)} style={{ background: 'none', color: 'var(--text)', fontSize: 18, fontWeight: 700, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                      <span style={{ fontWeight: 700, minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQty(item._id, item.quantity + 1)} style={{ background: 'none', color: 'var(--brand)', fontSize: 18, fontWeight: 700, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    </div>
                    <span style={{ fontWeight: 800, color: 'var(--brand)', minWidth: 60, textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item._id)} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: 'var(--dark2)', borderRadius: 20, padding: 28, border: '1px solid var(--border)' }}>
                <h3 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 20, fontSize: 18 }}>Delivery Address</h3>
                {[
                  { key: 'street', label: 'Street Address', placeholder: '123 Main St' },
                  { key: 'city', label: 'City', placeholder: 'New York' },
                  { key: 'state', label: 'State', placeholder: 'NY' },
                  { key: 'zipCode', label: 'ZIP Code', placeholder: '10001' },
                ].map(({ key, label, placeholder }) => (
                  <div key={key} style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 6, fontWeight: 600 }}>{label}</label>
                    <input value={address[key]} onChange={e => setAddress(p => ({ ...p, [key]: e.target.value }))}
                      placeholder={placeholder}
                      style={{ width: '100%', background: 'var(--dark3)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px', color: 'var(--text)', fontSize: 15 }}
                      onFocus={e => e.target.style.borderColor = 'var(--brand)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--dark2)', borderRadius: 20, padding: 28, border: '1px solid var(--border)' }}>
                <h3 style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 20, fontSize: 18 }}>Payment Method</h3>
                {[
                  { value: 'card', label: '💳 Credit / Debit Card' },
                  { value: 'cash', label: '💵 Cash on Delivery' },
                  { value: 'wallet', label: '📱 Digital Wallet' },
                ].map(opt => (
                  <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                    <input type="radio" name="payment" value={opt.value} checked={payment === opt.value} onChange={() => setPayment(opt.value)}
                      style={{ accentColor: 'var(--brand)', width: 18, height: 18 }} />
                    <span style={{ fontWeight: 500 }}>{opt.label}</span>
                  </label>
                ))}
              </div>

              <button onClick={() => setStep(1)} style={{ background: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px', fontSize: 14, fontWeight: 600 }}>
                ← Back to Cart
              </button>
            </div>
          )}
        </div>

        {/* Summary */}
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: 'var(--dark2)', borderRadius: 24, padding: 28, border: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 20, marginBottom: 24 }}>Order Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: 15 }}>
                <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: 15 }}>
                <span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: 15 }}>
                <span>Tax (8%)</span><span>${tax}</span>
              </div>
              <div style={{ height: 1, background: 'var(--border)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 20 }}>
                <span>Total</span><span style={{ color: 'var(--brand)' }}>${total}</span>
              </div>
            </div>

            <button onClick={step === 1 ? handleCheckout : handlePlaceOrder} style={{
              width: '100%', background: 'var(--brand)', color: '#fff',
              border: 'none', borderRadius: 16, padding: '16px', fontSize: 16, fontWeight: 800,
              transition: 'all 0.3s', boxShadow: '0 8px 32px var(--brand-glow)',
              marginBottom: 12,
            }}>
              {step === 1 ? (user ? 'Proceed to Checkout →' : 'Sign In to Checkout') : 'Place Order 🎉'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: 'var(--text-faint)' }}>
              🔒 Secure checkout · Free returns
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ORDERS PAGE
// ─────────────────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending: { label: 'Pending', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: '⏳' },
  confirmed: { label: 'Confirmed', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', icon: '✅' },
  preparing: { label: 'Preparing', color: '#f97316', bg: 'rgba(249,115,22,0.1)', icon: '👨‍🍳' },
  out_for_delivery: { label: 'Out for Delivery', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', icon: '🛵' },
  delivered: { label: 'Delivered', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', icon: '🎉' },
  cancelled: { label: 'Cancelled', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', icon: '❌' },
};

function OrdersPage() {
  const { orders, user } = useApp();
  const navigate = useNavigate();

  if (!user) return (
    <div style={{ paddingTop: 100, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🔐</div>
        <h2 style={{ fontFamily: 'Syne', fontSize: 28, marginBottom: 12 }}>Sign in to view orders</h2>
        <button onClick={() => navigate('/login')} style={{ background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: 14, padding: '14px 28px', fontWeight: 700, fontSize: 15 }}>Sign In</button>
      </div>
    </div>
  );

  if (orders.length === 0) return (
    <div style={{ paddingTop: 100, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>📦</div>
        <h2 style={{ fontFamily: 'Syne', fontSize: 28, marginBottom: 12 }}>No orders yet</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Place your first order to see it here</p>
        <button onClick={() => navigate('/menu')} style={{ background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: 14, padding: '14px 28px', fontWeight: 700, fontSize: 15 }}>Order Now</button>
      </div>
    </div>
  );

  return (
    <div style={{ paddingTop: 88, minHeight: '100vh' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontFamily: 'Syne', fontSize: 36, fontWeight: 800, marginBottom: 32, letterSpacing: '-1px' }}>
          My <span style={{ color: 'var(--brand)' }}>Orders</span>
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {orders.map((order, i) => {
            const sc = STATUS_CONFIG[order.status] || STATUS_CONFIG.confirmed;
            return (
              <div key={order.id} style={{
                background: 'var(--dark2)', borderRadius: 20, padding: 24,
                border: '1px solid var(--border)', animation: `fadeUp 0.5s ease ${i * 80}ms both`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Order #{order.id}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                      {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.color}30`, borderRadius: 100, padding: '6px 14px', fontSize: 13, fontWeight: 700 }}>
                    {sc.icon} {sc.label}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                  {order.items.slice(0, 4).map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--dark3)', borderRadius: 12, padding: '8px 12px' }}>
                      <img src={item.image} alt={item.name} style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover' }} />
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{item.name} <span style={{ color: 'var(--brand)' }}>×{item.quantity}</span></span>
                    </div>
                  ))}
                  {order.items.length > 4 && <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', fontSize: 13 }}>+{order.items.length - 4} more</div>}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                    ⏱ {order.estimatedDelivery} · {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </div>
                  <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 20, color: 'var(--brand)' }}>
                    ${order.total.toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH PAGES
// ─────────────────────────────────────────────────────────────────────────────
function AuthPage({ mode = 'login' }) {
  const { setUser, showToast } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const isLogin = mode === 'login';

  const handleSubmit = async () => {
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      showToast('Please fill all fields', 'error');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const user = { id: Date.now(), name: form.name || form.email.split('@')[0], email: form.email, role: 'user' };
    setUser(user);
    showToast(`Welcome${isLogin ? ' back' : ''}, ${user.name}! 👋`);
    navigate('/');
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'radial-gradient(ellipse at 50% 0%, rgba(255,69,0,0.06) 0%, transparent 60%)' }}>
      <div style={{ width: '100%', maxWidth: 440, animation: 'fadeUp 0.6s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🍕</div>
          <h1 style={{ fontFamily: 'Syne', fontSize: 36, fontWeight: 800, letterSpacing: '-1px', marginBottom: 8 }}>
            {isLogin ? 'Welcome Back' : 'Join QuickBite'}
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            {isLogin ? 'Sign in to your account' : 'Create your free account'}
          </p>
        </div>

        <div style={{ background: 'var(--dark2)', borderRadius: 24, padding: 32, border: '1px solid var(--border)' }}>
          {!isLogin && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 8, fontWeight: 600 }}>Full Name</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="John Doe" type="text"
                style={{ width: '100%', background: 'var(--dark3)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px', color: 'var(--text)', fontSize: 15 }}
                onFocus={e => e.target.style.borderColor = 'var(--brand)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          )}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 8, fontWeight: 600 }}>Email</label>
            <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              placeholder="you@example.com" type="email"
              style={{ width: '100%', background: 'var(--dark3)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px', color: 'var(--text)', fontSize: 15 }}
              onFocus={e => e.target.style.borderColor = 'var(--brand)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 13, color: 'var(--text-muted)', display: 'block', marginBottom: 8, fontWeight: 600 }}>Password</label>
            <input value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              placeholder="••••••••" type="password"
              style={{ width: '100%', background: 'var(--dark3)', border: '1px solid var(--border)', borderRadius: 14, padding: '14px 16px', color: 'var(--text)', fontSize: 15 }}
              onFocus={e => e.target.style.borderColor = 'var(--brand)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <button onClick={handleSubmit} disabled={loading} style={{
            width: '100%', background: 'var(--brand)', color: '#fff',
            border: 'none', borderRadius: 16, padding: '16px', fontSize: 16, fontWeight: 700,
            transition: 'all 0.3s', boxShadow: '0 8px 32px var(--brand-glow)',
            opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer',
          }}>
            {loading ? '⏳ Loading...' : (isLogin ? 'Sign In →' : 'Create Account →')}
          </button>

          <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-muted)', fontSize: 14 }}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Link to={isLogin ? '/register' : '/login'} style={{ color: 'var(--brand)', fontWeight: 700 }}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="*" element={<div style={{ paddingTop: 120, textAlign: 'center' }}><h2>404 — Page not found</h2></div>} />
      </Routes>
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <GlobalStyles />
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}
