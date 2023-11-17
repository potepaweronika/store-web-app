import HomePage from "./components/HomePage";
import ShoppingCart from "./components/ShoppingCart";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

function App() {
  const [isCartPage, setIsCartPage] = useState(false);
  const [cart, setCart] = useState([]); 

  const handleShowShoppingCart = () => {
    setIsCartPage(!isCartPage);
  };

  return (
    <>
      <div className="bg-gradient-to-t from-gray-800 to-gray-900">
        <nav className="flex items-center justify-between">
        <h1 className="p-4 text-4xl text-white font-bold mb-4">Some Web Store</h1>
          <div className="">
            <button className="pr-10" onClick={handleShowShoppingCart}>
              <FaShoppingCart color="white" size={30}/>
            </button>
          </div>
        </nav>
      </div>
      <div>
        {isCartPage ? (<ShoppingCart cart={cart} setCart={setCart}/>) : (<HomePage cart={cart} setCart={setCart}/>)}
      </div>
    </>
  );
}

export default App;
