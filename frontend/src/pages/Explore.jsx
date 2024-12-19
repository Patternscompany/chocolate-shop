import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const packages = [
  {
    name: 'Classic',
    price: 1499,
    features: ['Basic Design', 'Standard Materials', 'Essential Fixtures', '45-day Completion']
  },
  {
    name: 'Comfort',
    price: 1999,
    features: ['Enhanced Design', 'Quality Materials', 'Modern Fixtures', '60-day Completion']
  },
  {
    name: 'Premium',
    price: 2499,
    features: ['Premium Design', 'High-end Materials', 'Designer Fixtures', '75-day Completion']
  },
  {
    name: 'Luxury',
    price: 2999,
    features: ['Luxury Design', 'Imported Materials', 'Custom Fixtures', '90-day Completion']
  }
];

function Explore() {
  const navigate = useNavigate();
  const [estimateData, setEstimateData] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('estimateData');
    if (data) {
      setEstimateData(JSON.parse(data));
    }
  }, []);

  const handleExplore = (pkg) => {
    localStorage.setItem('selectedPackage', JSON.stringify(pkg));
    navigate('/summary');
  };

  const calculatePrice = (basePrice) => {
    if (!estimateData) return basePrice;
    const areaPricing = parseInt(estimateData.carpetArea) * (basePrice / 100);
    const kitchenAddition = estimateData.modularKitchen ? basePrice * 0.2 : 0;
    return Math.round(areaPricing + kitchenAddition);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Choose Your Package</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{pkg.name}</h2>
              <div className="text-3xl font-bold text-blue-600 mb-6">
                ₹{calculatePrice(pkg.price).toLocaleString()}/sqft
              </div>
              
              <ul className="mb-6 space-y-3">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleExplore(pkg)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;