import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-20">Loading products...</div>;

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6">Featured Products</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="border rounded-md p-4 flex flex-col hover:shadow-lg transition-shadow bg-white"
          >
            <div className="h-48 flex items-center justify-center mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h2 className="text-md font-semibold line-clamp-2 mb-2">{product.title}</h2>
            <div className="text-yellow-500 font-bold mb-2">${product.price.toFixed(2)}</div>
            <div className="flex items-center space-x-1">
              <div className="text-yellow-400">
                {"★".repeat(Math.round(product.rating.rate))}
                {"☆".repeat(5 - Math.round(product.rating.rate))}
              </div>
              <span className="text-sm text-gray-600">({product.rating.count})</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
