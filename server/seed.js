const pool = require("./db");

const seed = async () => {
  try {
    console.log("Starting DB seed for ShopKart...");

    // Drop tables if they exist
    await pool.query(`
      DROP TABLE IF EXISTS order_items;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS cart_items;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS product_images;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
    `);

    // Create Tables
    await pool.query(`CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL)`);
    await pool.query(`CREATE TABLE products (
      id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT, 
      price DECIMAL(10, 2) NOT NULL, original_price DECIMAL(10, 2), stock INTEGER DEFAULT 0, 
      category VARCHAR(100), brand VARCHAR(100), rating DECIMAL(3, 1) DEFAULT 0, 
      reviews_count INTEGER DEFAULT 0, main_image_url VARCHAR(500), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    await pool.query(`CREATE TABLE product_images (id SERIAL PRIMARY KEY, product_id INTEGER REFERENCES products(id) ON DELETE CASCADE, url VARCHAR(500) NOT NULL, is_primary BOOLEAN DEFAULT false)`);
    await pool.query(`CREATE TABLE carts (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE UNIQUE)`);
    await pool.query(`CREATE TABLE cart_items (id SERIAL PRIMARY KEY, cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE, product_id INTEGER REFERENCES products(id) ON DELETE CASCADE, quantity INTEGER DEFAULT 1, UNIQUE(cart_id, product_id))`);
    await pool.query(`CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, total_amount DECIMAL(10, 2) NOT NULL, status VARCHAR(50) DEFAULT 'Confirmed', shipping_address TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);
    await pool.query(`CREATE TABLE order_items (id SERIAL PRIMARY KEY, order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE, product_id INTEGER REFERENCES products(id) ON DELETE SET NULL, quantity INTEGER NOT NULL, price_at_purchase DECIMAL(10, 2) NOT NULL)`);

    console.log("Tables created successfully.");

    // Insert Default User
    const userRes = await pool.query(`INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id`, ['Default User', 'user@example.com']);
    const userId = userRes.rows[0].id;
    await pool.query(`INSERT INTO carts (user_id) VALUES ($1)`, [userId]);

    const productsData = [
      // MOBILES
      {
        name: 'Apple iPhone 15 (Blue, 128 GB)',
        description: 'Dynamic Island, 48MP Main camera, A16 Bionic chip.',
        price: 72999, original_price: 79900, stock: 50, category: 'Mobiles', brand: 'Apple', rating: 4.6, reviews_count: 5432,
        main_image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=400',
      },
      {
        name: 'SAMSUNG Galaxy S23 5G (Green, 256 GB)',
        description: '8 GB RAM | 256 GB ROM | 6.1 inch Display | Snapdragon 8 Gen 2.',
        price: 64999, original_price: 89999, stock: 30, category: 'Mobiles', brand: 'SAMSUNG', rating: 4.5, reviews_count: 3201,
        main_image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400',
      },
      // ELECTRONICS
      {
        name: 'Sony Alpha Mirrorless Camera',
        description: 'Real-time Eye AF, 4k movie recording, 16-50mm lens.',
        price: 78990, original_price: 89990, stock: 10, category: 'Electronics', brand: 'SONY', rating: 4.7, reviews_count: 850,
        main_image_url: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=400',
      },
      {
        name: 'Boat Rockerz 450 Bluetooth Headset',
        description: 'Up to 15 Hours Playback, 40mm Drivers, Padded Earcups.',
        price: 1499, original_price: 3990, stock: 100, category: 'Electronics', brand: 'Boat', rating: 4.3, reviews_count: 25000,
        main_image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400',
      },
      // FASHION
      {
        name: 'PUMA Men Sneakers',
        description: 'Casual stylish sneakers for men, durable and comfortable.',
        price: 1599, original_price: 3999, stock: 100, category: 'Fashion', brand: 'PUMA', rating: 4.1, reviews_count: 12500,
        main_image_url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=400',
      },
      {
        name: 'Levi\'s Men Solid Casual Shirt',
        description: '100% Cotton, Slim Fit, Spread Collar, Long Sleeve.',
        price: 1299, original_price: 2599, stock: 80, category: 'Fashion', brand: 'Levi\'s', rating: 4.2, reviews_count: 4500,
        main_image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400',
      },
      // APPLIANCES
      {
        name: 'LG 1.5 Ton 5 Star Split AC',
        description: 'Dual Inverter Compressor, AI Convertible 6-in-1, HD Filter.',
        price: 44990, original_price: 75990, stock: 20, category: 'Appliances', brand: 'LG', rating: 4.4, reviews_count: 1200,
        main_image_url: 'https://plus.unsplash.com/premium_photo-1679943423706-570c6462f9a4?q=80&w=705&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Samsung 183 L Single Door Refrigerator',
        description: 'Digital Inverter, Direct Cool Refrigerator.',
        price: 16490, original_price: 21990, stock: 15, category: 'Appliances', brand: 'Samsung', rating: 4.3, reviews_count: 3400,
        main_image_url: 'https://images.unsplash.com/photo-1722603929403-de9e80c46a9a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      // HOME
      {
        name: 'Urban Ladder Solid Wood Coffee Table',
        description: 'Modern design, handcrafted from Teak wood.',
        price: 8999, original_price: 15999, stock: 40, category: 'Home', brand: 'Urban Ladder', rating: 4.5, reviews_count: 670,
        main_image_url: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=400',
      },
      {
        name: 'Raymond Home Cotton Bed Sheet',
        description: 'Double Bed King Size, 100% Cotton, Geometric Print.',
        price: 1499, original_price: 2999, stock: 120, category: 'Home', brand: 'Raymond', rating: 4.1, reviews_count: 1100,
        main_image_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=400',
      },
      // BEAUTY
      {
        name: 'Neutrogena Hydro Boost Water Gel',
        description: 'Pure Hyaluronic acid, Dermatologist tested, 50g.',
        price: 990, original_price: 1150, stock: 90, category: 'Beauty', brand: 'Neutrogena', rating: 4.6, reviews_count: 9800,
        main_image_url: 'https://images.unsplash.com/photo-1591134608223-67005960e763?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'L\'Oréal Paris Revitalift Serum',
        description: '1.5% Hyaluronic Acid Serum for youthful looking skin.',
        price: 799, original_price: 999, stock: 150, category: 'Beauty', brand: 'L\'Oréal', rating: 4.4, reviews_count: 15000,
        main_image_url: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=400',
      },
      // GROCERY
      {
        name: 'Happilo California Almonds (500g)',
        description: '100% Real, Premium quality, crunch and healthy.',
        price: 499, original_price: 850, stock: 300, category: 'Grocery', brand: 'Happilo', rating: 4.5, reviews_count: 45000,
        main_image_url: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=400',
      },
      {
        name: 'Tata Tea Gold (500g)',
        description: 'Unique blend of CTC tea and long leaves.',
        price: 325, original_price: 350, stock: 500, category: 'Grocery', brand: 'Tata', rating: 4.6, reviews_count: 12000,
        main_image_url: 'https://images.unsplash.com/photo-1737064294408-f89f95ed8102?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }
    ];

    for (const prod of productsData) {
      const prodRes = await pool.query(
        `INSERT INTO products (name, description, price, original_price, stock, category, brand, rating, reviews_count, main_image_url) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
        [prod.name, prod.description, prod.price, prod.original_price, prod.stock, prod.category, prod.brand, prod.rating, prod.reviews_count, prod.main_image_url]
      );
      await pool.query(`INSERT INTO product_images (product_id, url, is_primary) VALUES ($1, $2, $3)`, [prodRes.rows[0].id, prod.main_image_url, true]);
    }

    console.log("Seeded database successfully with 14 products.");
  } catch (err) {
    console.error("Error seeding DB:", err);
  } finally {
    pool.end();
  }
};

seed();
