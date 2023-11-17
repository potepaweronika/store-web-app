import HomePage from "./components/HomePage";
import ShoppingCart from "./components/ShoppingCart";
import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [isCartPage, setIsCartPage] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseSession = await axios.get(
          "http://localhost:5000/api/session"
        );
        setSessionId(responseSession.data.sessionId);
        console.log("Session ID in app:", sessionId);
      } catch (error) {
        console.error("Error fetching data: ", error);
        throw error;
      }
    };

    fetchProducts();
  }, []);

  const handleShowShoppingCart = () => {
    setIsCartPage(!isCartPage); // navigate("/cart");
  };

  return (
    <>
      <div className="bg-gradient-to-t from-gray-800 to-gray-900">
        <nav className="flex items-center justify-between">
          <h1 className="p-4 text-4xl text-white font-bold mb-4">
            Some Web Store
          </h1>
          <div className="">
            <button className="pr-10" onClick={handleShowShoppingCart}>
              <FaShoppingCart color="white" size={30} />
            </button>
          </div>
        </nav>
      </div>
      <div>
          {!isCartPage ? (<HomePage sessionId={sessionId} />) : (<ShoppingCart sessionId={sessionId} />)}
      </div>
    </>
  );
}

export default App;
