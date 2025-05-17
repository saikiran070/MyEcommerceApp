import React from "react";
import { useCart } from "../App";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (id, qty) => {
    if (qty < 1) return;
    updateQuantity(id, qty);
  };

  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  if (cart.length === 0) {
    return <div className="text-center mt-20 text-xl">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-md shadow-lg p-6">
      <h1 className="text-3xl font-extrabold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-6 border-b pb-4 last:border-none"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-contain"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <div className="text-yellow-500 font-bold">${item.price.toFixed(2)}</div>
            </div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
              className="w-16 border rounded px-2 py-1"
            />
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition"
            >
              Remove
            </button>
            <div className="ml-6 font-bold text-lg">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="text-right mt-6 text-2xl font-extrabold">
        Total: <span className="text-yellow-600">${totalPrice}</span>
      </div>
    </div>
  );
};

export default Cart;
