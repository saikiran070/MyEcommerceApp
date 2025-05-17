import React from 'react';
import { useCart } from '../App';
import { Link } from 'react-router-dom';

const SidebarCart = ({ isOpen, closeSidebar }) => {
  const { cart, removeFromCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <button className="mb-4 text-red-500 font-bold" onClick={closeSidebar}>
        Close
      </button>
      <h3 className="text-2xl font-bold mb-4">Your Cart</h3>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div key={item.id} className="border-b pb-4 mb-4">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
            <div className="mt-2">
              <Link to={`/product/${item.id}`} className="font-semibold hover:text-yellow-500">
                {item.title}
              </Link>
              <p className="text-gray-600">${item.price} x {item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <Link
        to="/cart"
        className="block mt-4 bg-yellow-500 text-center text-gray-900 py-2 rounded-md hover:bg-yellow-600"
      >
        Go to Cart
      </Link>
    </div>
  );
};

export default SidebarCart;
