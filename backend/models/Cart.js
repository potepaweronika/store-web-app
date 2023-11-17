// models/Cart.js
class Cart {
    constructor(sessionId) {
      this.sessionId = sessionId;
      this.cart = [];
    }
  }
  
  module.exports = Cart;
  