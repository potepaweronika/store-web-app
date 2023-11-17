function ShoppingCart({ cart }) {
  const sum = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <div className="container mx-auto my-8 flex-grow w-full">
      <h1 className="text-2xl font-semibold mb-2">Shopping Cart</h1>
      <div className="mb-2">
        {cart.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 shadow-md bg-slate-700 grid grid-cols-4 justify-items-center items-center mb-4" // flex flex-row justify-start justify-around mb-4
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
            <p className="text-gray-700">
              Quantity: {product.quantity}
            </p>
          </div>
        ))}
      </div>
      <p className="text-xl font-semibold mb-2">Total: ${sum}</p>
    </div>
  );
}

export default ShoppingCart;
