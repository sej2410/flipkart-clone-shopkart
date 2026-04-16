require("dotenv").config();
const pool = require("./db"); 

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// --- PRODUCT ROUTES ---

// Get all products (with search and category filter)
app.get("/api/products", async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND name ILIKE $${params.length}`;
    }

    if (category && category !== "All") {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get product details
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    
    if (product.rows.length === 0) return res.status(404).json({ error: "Product not found" });

    const images = await pool.query("SELECT * FROM product_images WHERE product_id = $1", [id]);
    
    res.json({
      ...product.rows[0],
      images: images.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- CART ROUTES (Assuming User ID 1) ---
const DEFAULT_USER_ID = 1;

app.get("/api/cart", async (req, res) => {
  try {
    const cart = await pool.query(
      `SELECT ci.id, ci.quantity, p.id as product_id, p.name, p.price, p.original_price, p.main_image_url, p.brand
       FROM cart_items ci
       JOIN carts c ON ci.cart_id = c.id
       JOIN products p ON ci.product_id = p.id
       WHERE c.user_id = $1`,
      [DEFAULT_USER_ID]
    );
    res.json(cart.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/cart", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    // Get user's cart
    const cartRes = await pool.query("SELECT id FROM carts WHERE user_id = $1", [DEFAULT_USER_ID]);
    const cartId = cartRes.rows[0].id;

    // Upsert cart item
    await pool.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity) 
       VALUES ($1, $2, $3)
       ON CONFLICT (cart_id, product_id) 
       DO UPDATE SET quantity = cart_items.quantity + $3`,
      [cartId, productId, quantity || 1]
    );

    res.json({ message: "Added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    await pool.query("UPDATE cart_items SET quantity = $1 WHERE id = $2", [quantity, id]);
    res.json({ message: "Updated quantity" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM cart_items WHERE id = $1", [id]);
    res.json({ message: "Removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- ORDER ROUTES ---

app.post("/api/orders", async (req, res) => {
  try {
    const { address } = req.body;

    // Get cart items
    const cartRes = await pool.query(
      `SELECT ci.*, p.price 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id
       JOIN carts c ON ci.cart_id = c.id
       WHERE c.user_id = $1`,
      [DEFAULT_USER_ID]
    );

    if (cartRes.rows.length === 0) return res.status(400).json({ error: "Cart is empty" });

    const totalAmount = cartRes.rows.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order
    const orderRes = await pool.query(
      `INSERT INTO orders (user_id, total_amount, shipping_address) 
       VALUES ($1, $2, $3) RETURNING id`,
      [DEFAULT_USER_ID, totalAmount, address]
    );
    const orderId = orderRes.rows[0].id;

    // Create order items
    for (const item of cartRes.rows) {
      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) 
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    // Clear cart
    const cartId = cartRes.rows[0].cart_id;
    await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cartId]);

    res.json({ orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await pool.query(
      `SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC`,
      [DEFAULT_USER_ID]
    );
    res.json(orders.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;