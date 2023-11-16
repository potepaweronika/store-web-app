import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products); // Access the "products" key
      } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto my-8">
    <h1 className="text-3xl font-semibold mb-4">low case store</h1>
  
    {/* Map through unique categories */}
    {Array.from(new Set(products.map((product) => product.category))).map(
      (category) => (
        <div key={category} className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">{category}</h2>
  
          <div className="grid grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-5 gap-0 outline outline-1 divide-x-2 divide-black">
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <div key={product.id} className="bg-white p-4 shadow-md bg-slate-700">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-32 w-auto rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-gray-700">${product.price}</p>
                  {/* Add more details as needed */}
                  <button
                    className="mt-2 bg-slate-50 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded outline outline-offset-2 outline-1 "
                    // Implement your add to cart functionality here
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
          </div>
        </div>
      )
    )}
  </div>  
  );
}

export default App;
