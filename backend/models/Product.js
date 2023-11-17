// models/Product.js
class Product {
    constructor(id, title, price, category, image) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.category = category;
      this.image = image;
    }
  }
  
  module.exports = Product;
  