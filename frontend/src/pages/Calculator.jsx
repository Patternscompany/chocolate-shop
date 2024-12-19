import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Calculator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    apartmentType: '',
    bedrooms: [],
    modularKitchen: false,
    carpetArea: ''
  });

  const apartmentTypes = ['2BHK', '3BHK', '3.5BHK', '4BHK'];
  const bedroomTypes = [
    'Master Bedroom',
    'Kids Room 1',
    'Kids Room 2',
    'Guest Bedroom'
  ];

  const handleBedroomChange = (type) => {
    setFormData(prev => ({
      ...prev,
      bedrooms: prev.bedrooms.includes(type)
        ? prev.bedrooms.filter(item => item !== type)
        : [...prev.bedrooms, type]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store form data in localStorage or state management
    localStorage.setItem('estimateData', JSON.stringify(formData));
    navigate('/explore');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Interior Design Calculator</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-4">
              Select Apartment Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              {apartmentTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({...formData, apartmentType: type})}
                  className={`p-4 rounded-lg border-2 ${
                    formData.apartmentType === type
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-4">
              Select Bedroom Types
            </label>
            <div className="grid grid-cols-2 gap-4">
              {bedroomTypes.map(type => (
                <label
                  key={type}
                  className="flex items-center p-4 rounded-lg border-2 cursor-pointer hover:border-blue-300"
                >
                  <input
                    type="checkbox"
                    checked={formData.bedrooms.includes(type)}
                    onChange={() => handleBedroomChange(type)}
                    className="mr-3"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-4">
              Need Modular Kitchen?
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setFormData({...formData, modularKitchen: true})}
                className={`px-6 py-3 rounded-lg border-2 ${
                  formData.modularKitchen
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, modularKitchen: false})}
                className={`px-6 py-3 rounded-lg border-2 ${
                  formData.modularKitchen === false
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-semibold mb-4">
              Carpet Area (sq ft)
            </label>
            <input
              type="number"
              value={formData.carpetArea}
              onChange={(e) => setFormData({...formData, carpetArea: e.target.value})}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter carpet area in square feet"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Estimate
          </button>
        </form>
      </div>
    </div>
  );
}

export default Calculator;