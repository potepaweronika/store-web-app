import { useState, useEffect } from "react";
import axios from "axios";

function HomePage({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseProducts = await axios.get(
          "https://fakestoreapi.com/products"
        );
        const responseCategories = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setProducts(responseProducts.data); // Access the "products" key
        setCategories(responseCategories.data); // Access the "categories" key
        // setSelectedCategory(responseCategories.data[0]);
      } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
      }
    };

    fetchProducts();

    // Check if the window width is below 800px
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAddToCart = (product) => {
    const existingCartItem = cart.find((item) => item.id === product.id);

    if (existingCartItem) {
      // If the item is already in the cart, update the quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className={`flex ${isMobile ? "flex-col" : "flex-row"}`}>
      {/* Side area as a dropdown on small screens */}
      {isMobile ? (
        <div className="w-full p-4 bg-gray-800 text-white">
          <label htmlFor="category">Select a category:</label>
          <select
            id="category"
            className="block bg-white text-black p-2 rounded mt-2"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Categories --</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      ) : (
        // Side area as a list on larger screens
        <div className="p-4 min-h-screen bg-gray-800 text-white w-1/6">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          {categories.map((category) => (
            <div key={category}>
              <button
                onClick={() => setSelectedCategory(category)}
                className={`category py-2 px-4 rounded mb-2 ${
                  selectedCategory === category
                    ? "bg-gray-900"
                    : "hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="container mx-auto my-8 flex-grow w-full sm:w-5/6">
        {/* Map through products based on the selected category */}
        {selectedCategory ? (
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">{selectedCategory}</h2>

            <div className="grid grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-3 gap-4">
              {products
                .filter((product) => product.category === selectedCategory)
                .map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 shadow-md bg-slate-700 flex flex-col justify-between h-full"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-32 w-full object-contain rounded-md mb-2"
                    />
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <div className="flex flex-col items-start justify-end mt-auto">
                      <p className="text-gray-700">${product.price}</p>
                      <button
                        className="mt-2 bg-slate-50 hover:bg-slate-300 text-black font-bold py-2 px-4 rounded outline outline-1"
                        onClick={handleAddToCart.bind(this, product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <p>Please select a category</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
