import { useState, useEffect } from "react";
import axios from "axios";

function ShoppingCart({ sessionId }) {
  const [cart, setCart] = useState([]);
  const [sum, setSum] = useState(0);

  console.log("Session ID in cart:", sessionId);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        // Make an API request to fetch the user's cart data
        const response = await axios.get(`http://localhost:5000/api/cart/${sessionId}`);

        // Update the cart state with the fetched data
        const currentCart = Array.isArray(response.data.items)
        ? response.data.items
        : [];
        setCart(currentCart);
        console.log("Current cart:", currentCart);

        // Calculate the total sum
        const totalSum = currentCart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setSum(totalSum);
      } catch (error) {
        console.error("Error fetching cart data: ", error);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchCartData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  
  async function handleRemoveItem(sessionId, itemId) {  
    // Remove the item from the cart
    const updatedCart = cart.filter(item => item.id !== itemId);

    // Recalculate the total sum
    const totalSum = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSum(totalSum);

    console.log("Updated cart:", updatedCart);
  
    // Update the cart in the database
    await axios.post(`http://localhost:5000/api/cart/remove/${sessionId}`, {
      cart: updatedCart,
    });
  }

  async function handleQuantityChange(sessionId, itemId, newQuantity) {
    // Find the item and update its quantity
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      } else {
        return item;
      }
    });

    console.log("Updated cart:", updatedCart);

    // Recalculate the total sum
    const totalSum = updatedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSum(totalSum);
  
    // Update the cart in the database
    // Replace this with your actual database query
    await axios.post(`http://localhost:5000/api/cart/update/${sessionId}`, {
      cart: updatedCart,
    });
    }

  // const handleQuantityChange = (productId, newQuantity) => {
  //   // Implement the logic to update the quantity in the local state
  //   // and make a corresponding API request to update the database
  //   // ...

  //   // For now, let's just update the local state as an example
  //   const updatedCart = cart.map((item) =>
  //     item.id === productId ? { ...item, quantity: newQuantity } : item
  //   );
  //   setCart(updatedCart);

  //   // Recalculate the total sum
  //   const totalSum = updatedCart.reduce(
  //     (acc, item) => acc + item.price * item.quantity,
  //     0
  //   );
  //   setSum(totalSum);
  // };

  // const handleRemoveItem = (productId) => {
  //   // Implement the logic to remove the item from the local state
  //   // and make a corresponding API request to update the database
  //   // ...

  //   // For now, let's just update the local state as an example
  //   const updatedCart = cart.filter((item) => item.id !== productId);
  //   setCart(updatedCart);

  //   // Recalculate the total sum
  //   const totalSum = updatedCart.reduce(
  //     (acc, item) => acc + item.price * item.quantity,
  //     0
  //   );
  //   setSum(totalSum);
  // };
  return (
    <div className="container mx-auto my-8 flex-grow w-full">
      <h1 className="text-2xl font-semibold mb-2">Shopping Cart</h1>
      <div className="mb-2">
        {cart.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 shadow-md bg-slate-700 grid grid-cols-4 justify-items-center items-center mb-4"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-32 w-32 object-contain rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold max-w-xs overflow-hidden overflow-ellipsis">
              {product.title}
            </h3>
            <p className="text-gray-700">${product.price}</p>
            <div className="flex items-center">
              <button
                onClick={() =>
                  handleQuantityChange(product.id, product.quantity - 1)
                }
                disabled={product.quantity <= 1}
                className="px-2 py-1 border border-gray-500 rounded"
              >
                -
              </button>
              <p className="mx-2">{product.quantity}</p>
              <button
                onClick={() =>
                  handleQuantityChange(product.id, product.quantity + 1)
                }
                className="px-2 py-1 border border-gray-500 rounded"
              >
                +
              </button>
              <button
                onClick={() => handleRemoveItem(product.id)}
                className="ml-4 text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xl font-semibold mb-2">Total: ${sum}</p>
    </div>
  );
}

export default ShoppingCart;
