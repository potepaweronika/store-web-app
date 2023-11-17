// routes/cart.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const Cart = require("../models/Cart");

// Get user's cart
// Get user's cart
router.get("/:sessionId", (req, res) => {
  const sessionId = req.params.sessionId || req.sessionID;
  // Fetch cart information from the database based on the session ID
  // You may need to adjust the query based on your database schema
  console.log("sessionid: " + sessionId);
  db.get("SELECT * FROM carts WHERE sessionId = ?", [sessionId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (row) {
      // If the row is found, the user already has a cart, proceed as before
      console.log("row: " + row);
      const cart = new Cart(row.sessionId);
      cart.items = JSON.parse(row.cart); // Convert stored JSON string to an object
      res.json(cart);
    } else {
      // If no row is found, create a new cart for the user and insert it into the database
      const emptyCart = new Cart(sessionId);
      const initialItems = JSON.stringify(emptyCart.items);

      db.run(
        "INSERT INTO carts (sessionId, cart) VALUES (?, ?)",
        [sessionId, initialItems],
        (insertErr) => {
          if (insertErr) {
            res.status(500).json({ error: insertErr.message });
            return;
          }
          
          res.json(emptyCart);
        }
      );
    }
  });
});

// Create or update user's cart
router.post("/:sessionId", (req, res) => {
  const sessionId = req.params.sessionId || req.sessionID;
  const updatedCart = req.body.cart;

  // Check if the session ID already exists in the database
  db.get("SELECT * FROM carts WHERE sessionId = ?", [sessionId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (row) {
      // If the row is found, update the existing cart
      const existingCart = JSON.parse(row.cart);

      // Merge the existing cart with the updated cart
      const mergedCart = mergeCarts(existingCart, updatedCart);

      db.run(
        "UPDATE carts SET cart = ? WHERE sessionId = ?",
        [JSON.stringify(mergedCart), sessionId],
        (updateErr) => {
          if (updateErr) {
            res.status(500).json({ error: updateErr.message + "one" });
            return;
          }
          res.json({
            message: "Cart updated successfully" + JSON.stringify(mergedCart),
          });
        }
      );
    } else {
      // If no row is found, create a new cart for the user and insert it into the database
      const initialItems = JSON.stringify(updatedCart);

      db.run(
        "INSERT INTO carts (sessionId, cart) VALUES (?, ?)",
        [sessionId, initialItems],
        (insertErr) => {
          if (insertErr) {
            res.status(500).json({ error: insertErr.message + "two" });
            return;
          }

          res.json({
            message: "Cart created successfully" + JSON.stringify(updatedCart),
          });
        }
      );
    }
  });
});

// Helper function to merge carts (assuming item uniqueness based on some property like id)
function mergeCarts(existingCart, updatedCart) {
  const mergedCart = Array.isArray(existingCart) ? [...existingCart] : [];

  for (const newItem of updatedCart) {
    const existingItemIndex = mergedCart.findIndex(
      (item) => item.id === newItem.id
    );

    if (existingItemIndex !== -1) {
      // If the item already exists in the cart, update the quantity
      mergedCart[existingItemIndex].quantity += newItem.quantity;
    } else {
      // If the item is not in the cart, add it
      mergedCart.push(newItem);
    }
  }

  return mergedCart;
}

router.post('/remove/:sessionId', (req, res) => {
  const sessionId = req.params.sessionId || req.sessionID;
  const updatedCart = req.body.cart;

  db.run('UPDATE carts SET cart = ? WHERE sessionId = ?', [updatedCart, sessionId]);
});

router.post('/update/:sessionId', (req, res) => { 
  const sessionId = req.params.sessionId || req.sessionID;
  const updatedCart = req.body.cart;

  db.run('UPDATE carts SET cart = ? WHERE sessionId = ?', [updatedCart, sessionId]);
});

module.exports = router;
