import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../App";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading product...</div>;
  if (!product) return <div className="text-center mt-20">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-md shadow-lg p-8 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-96 object-contain"
        />
      </div>
      <div className="md:w-1/2 flex flex-col">
        <h1 className="text-3xl font-extrabold mb-4">{product.title}</h1>
        <div className="flex items-center space-x-2 mb-2">
          <div className="text-yellow-400 text-xl">
            {"★".repeat(Math.round(product.rating.rate))}
            {"☆".repeat(5 - Math.round(product.rating.rate))}
          </div>
          <span className="text-gray-600">({product.rating.count} ratings)</span>
        </div>
        <p className="mb-6 text-gray-700">{product.description}</p>
        <div className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</div>
        <button
          onClick={() => addToCart(product)}
          className="bg-yellow-400 hover:bg-yellow-500 transition text-black font-semibold py-3 rounded shadow"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
