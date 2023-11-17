const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

// Define an array of table creation SQL statements
const tableCreationStatements = [
    `
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      title TEXT,
      price REAL,
      category TEXT,
      image TEXT
    )
    `,
    `
    CREATE TABLE IF NOT EXISTS carts (
      sessionId TEXT PRIMARY KEY,
      cart TEXT
    )
    `
  ];
  
  // Iterate over the array and execute each table creation statement
  tableCreationStatements.forEach((sql, index, array) => {
    db.run(sql, (err) => {
      if (err) {
        console.error(`Error creating table ${index + 1}: `, err);
      } else {
        console.log(`Table ${index + 1} created successfully`);
      }
  
      // Close the database connection after the last table is created
      if (index === array.length - 1) {
        db.close();
      }
    });
  });