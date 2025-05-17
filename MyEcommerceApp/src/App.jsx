import React, { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import SidebarCart from "./components/SidebarCart";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const App = () => {
  // Cart state with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  // Total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      <Router>
        <header className="bg-yellow-400 p-4 flex justify-between items-center shadow-md">
          <Link to="/" className="text-2xl font-extrabold text-gray-900">
            Amazon Mini
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="relative font-semibold text-gray-900 hover:underline"
          >
            Cart
            <span className="ml-1 bg-gray-900 text-yellow-400 rounded-full px-2 text-sm font-bold absolute -top-2 -right-4">
              {totalItems}
            </span>
          </button>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>

        <SidebarCart isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      </Router>
    </CartContext.Provider>
  );
};

export default App;
