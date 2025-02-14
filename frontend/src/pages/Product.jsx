import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { products, addToCart } = useContext(ShopContext); // Get products and addToCart from context
  const [product, setProduct] = useState(null); // Local state for the product
  const [notification, setNotification] = useState(false); // Notification state

  // Find the product based on the ID when products are available
  useEffect(() => {
    if (products && products.length > 0) {
      const selectedProduct = products.find((item) => item._id === parseInt(id));
      setProduct(selectedProduct); // Set the product if found
    }
  }, [id, products]);

  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart
    setNotification(true); // Show notification
    setTimeout(() => setNotification(false), 3000); // Hide after 3 seconds
  };

  // If product is still undefined, show a loading or error message
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg shadow-lg w-full h-[400px] object-cover"
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>
            <p className="text-2xl font-semibold text-blue-600 mb-6">
              {product.price}
            </p>
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
            {notification && (
              <p className="mt-4 text-green-600">Added to cart successfully!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
