import React, { useEffect, useState } from 'react';
import axios from 'axios';

function About() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:5001/items') // Backend API to get products
          .then((response) => {
              setProducts(response.data);
          })
          .catch((error) => {
              console.error('Error fetching products:', error);
          });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">About Us</h1>
      
      <div>
            {products.map((product) => (
                <div key={product.id}>
                    <img src={`http://localhost:5001${product.image_url}`} alt={product.name} style={{ width: '150px' }} />
                    <h2>{product.name}</h2>
                    <p>${product.price}</p>
                </div>
            ))}
        </div>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <img
            src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&q=80"
            alt="Chocolate Making Process"
            className="rounded-lg shadow-lg w-full h-[400px] object-cover"
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Journey</h2>
          <p className="text-gray-600 mb-6">
            Our story began with a deep passion for crafting exquisite chocolates that delight the senses. 
            From humble beginnings, we've grown into a brand trusted by chocolate lovers around the world. 
            Every piece we create is a celebration of flavor, tradition, and innovation.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            We aim to spread joy and indulgence through our handcrafted chocolates. 
            By using the finest ingredients and sustainable practices, we create treats that bring happiness 
            while caring for our planet and communities.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Craftsmanship and attention to detail</li>
            <li>Commitment to quality ingredients</li>
            <li>Sustainability and eco-friendly practices</li>
            <li>Innovation in flavors and designs</li>
            <li>Customer satisfaction above all</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default About;