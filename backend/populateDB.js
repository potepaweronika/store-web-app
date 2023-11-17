const axios = require('axios');
const db = require('./db'); // Adjust the path based on your project structure

async function populateDatabase() {
  try {
    // Create the 'products' table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        title TEXT,
        price REAL,
        category TEXT,
        image TEXT
      )
    `);
    
    // Fetch data from the fakestoreapi
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;


    // Insert products into the 'products' table
    const insertStmt = db.prepare('INSERT INTO products (title, price, category, image) VALUES (?, ?, ?, ?)');
    products.forEach((product) => {
      insertStmt.run(product.title, product.price, product.category, product.image);
    });
    insertStmt.finalize();

    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating database: ', error);
  } finally {
    // Close the database connection
    db.close();
  }
}

// Run the population script
populateDatabase();
