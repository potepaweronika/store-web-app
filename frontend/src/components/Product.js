import { useState } from "react";

const Product = ({ product }) => {
  return (
    <div className="product">
      <div className="product-info">
        <div className="input-name">
          <p>{product.title}</p>
        </div>
        <p>{product.price}</p>
      </div>
    </div>
  );
};

export default Product;
