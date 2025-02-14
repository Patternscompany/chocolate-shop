import React,{ useContext,useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ShopContext } from '../context/shopContext';

function Home() {
  // Use the context
  const { products, addToCart, currency } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10)); // Get the latest 10 products
    }
  }, [products]);

  const handleAddToCart = (product) => {
    addToCart(product); // Add product to cart
    setNotification(true); // Show notification
    setTimeout(() => setNotification(false), 3000); // Hide after 3 seconds
  };
  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <div 
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-left text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Indulge in Pure Luxury</h1>
            <p className="text-xl md:text-2xl mb-8">Discover our handcrafted chocolate collections made from the finest ingredients.</p>
            <Link
              to="/"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
  <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="text-center p-6">
      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">Premium Quality Chocolates</h3>
      <p className="text-gray-600">Indulge in handcrafted chocolates made from the finest ingredients.</p>
    </div>
    <div className="text-center p-6">
      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">Fast & Reliable Delivery</h3>
      <p className="text-gray-600">Enjoy fresh chocolates delivered right to your doorstep on time.</p>
    </div>
    <div className="text-center p-6">
      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">Affordable Luxury</h3>
      <p className="text-gray-600">Savor luxurious chocolates at prices that delight your taste and budget.</p>
    </div>
  </div>
</div>

      </div>
      <div className="relative">
      {/* Notification */}
      {notification && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-2">
          Product added successfully!
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 gap-y-6 px-10">
        {latestProducts.map((product) => (
          <div
            key={product._id}
            className="relative overflow-hidden rounded-lg shadow-lg group"
          >
            <div className="relative group-hover:shadow-xl transition-transform duration-300 ease-in-out">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover transition-all duration-300 cursor-pointer"
              />
 {/* Product Details */}
 <div className="text-center py-4">
              <p className="text-lg font-semibold text-gray-800">{product.name}</p>
              <p className="text-md text-gray-600">
                {currency} {product.price}
              </p>
            </div>
              {/* Add to Cart Button */}
              <div className=" bg-white bg-opacity-50 text-center p-2 duration-500 ease-in-out">
                <button
                  onClick={() => handleAddToCart(product)} // Add to cart
                  className="px-2 py-1 text-sm bg-black text-white font-semibold rounded-lg  sm:px-3 sm:py-2 sm:text-base transition-colors duration-300 ease-in-out"
                >
                  Add to Cart
                </button>
              </div>
            </div>

           
          </div>
        ))}
      </div>
    </div>
    {/* Featured Chocolates Section */}
<div className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">Our Featured Chocolates</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="rounded-lg overflow-hidden shadow-md">
        <img
          src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&q=80"
          alt="Handcrafted Truffles"
          className="w-full h-64 object-cover"
        />
        <div className="p-6 bg-white">
          <h3 className="text-xl font-semibold mb-2">Handcrafted Truffles</h3>
          <p className="text-gray-600">Delicious, rich truffles made with love</p>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden shadow-md">
        <img
          src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80"
          alt="Custom Chocolate Gift Box"
          className="w-full h-64 object-cover"
        />
        <div className="p-6 bg-white">
          <h3 className="text-xl font-semibold mb-2">Custom Chocolate Gift Box</h3>
          <p className="text-gray-600">Perfect for celebrations and special occasions</p>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden shadow-md">
        <img
          src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80"
          alt="Artisan Chocolate Bars"
          className="w-full h-64 object-cover"
        />
        <div className="p-6 bg-white">
          <h3 className="text-xl font-semibold mb-2">Artisan Chocolate Bars</h3>
          <p className="text-gray-600">Unique flavors and premium ingredients</p>
        </div>
      </div>
    </div>
  </div>
</div>

{/* CTA Section */}
<div className="py-20 bg-brown-600 bg-blue-500">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold text-white mb-6">Craving Chocolate? Order Now!</h2>
    <p className="text-xl text-white mb-8">
      Explore our wide variety of handcrafted chocolates and place your order today.
    </p>
    <Link
      to="/shop"
      className="inline-flex items-center bg-white text-brown-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
    >
      Shop Now
      <ArrowRight className="ml-2 h-5 w-5" />
    </Link>
  </div>
</div>

    </div>
  );
}

export default Home;