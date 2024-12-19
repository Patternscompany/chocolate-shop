import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyEstimates() {
  const [estimates, setEstimates] = useState([]);
  const [recentEstimates, setRecentEstimates] = useState([]); // State for recent estimates
  const [loading, setLoading] = useState(true);

  // Fetch all estimates
  useEffect(() => {
    const fetchEstimates = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please log in to view estimates');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/estimates', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEstimates(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching estimates:', error);
        // alert('Failed to load estimates');
        setLoading(false);
      }
    };

    fetchEstimates();
  }, []);

  // Fetch recent estimates
  useEffect(() => {
    const fetchRecentEstimates = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please log in to view recent estimates');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/recent-estimates', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setRecentEstimates(response.data);
      } catch (error) {
        console.error('Error fetching recent estimates:', error);
        alert('Failed to fetch recent estimates');
      }
    };

    fetchRecentEstimates();
  }, []);

  if (loading) {
    return <div>Loading estimates...</div>; // Show loading state
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md">
          {/* Header */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">My Estimates</h1>
          </div>

          {/* Recent Estimates */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Recent Estimates</h2>
            {recentEstimates.length === 0 ? (
              <p className="text-gray-600">No recent estimates available</p>
            ) : (
              <ul className="list-disc ml-6 text-gray-600">
                {recentEstimates.map((estimate) => (
                  <li key={estimate._id}>
                    <strong>{estimate.apartmentType}</strong> - ₹{estimate.costBreakdown.total}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* All Estimates */}
          <div className="p-6">
            {estimates.length === 0 ? (
              <p className="text-gray-600">No estimates available</p>
            ) : (
              <div className="space-y-6">
                {estimates.map((estimate) => (
                  <div
                    key={estimate._id}
                    className="p-4 border border-gray-200 rounded-lg shadow-sm"
                  >
                    <h2 className="text-xl font-bold text-gray-800">
                      Apartment Type: {estimate.apartmentType}
                    </h2>
                    <p className="text-gray-600">Carpet Area: {estimate.carpetArea} sqft</p>
                    <p className="text-gray-600">
                      Modular Kitchen: {estimate.modularKitchen ? 'Yes' : 'No'}
                    </p>

                    <div className="mt-2">
                      <h3 className="text-lg font-semibold text-gray-700">Selected Package</h3>
                      <p className="text-gray-600">
                        <strong>Name:</strong> {estimate.selectedPackage.name} <br />
                        <strong>Price:</strong> ₹{estimate.selectedPackage.price}
                      </p>
                    </div>

                    <div className="mt-2">
                      <h3 className="text-lg font-semibold text-gray-700">Bedrooms</h3>
                      <p className="text-gray-600">{estimate.bedrooms.join(', ')}</p>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-gray-700">Cost Breakdown</h3>
                      <ul className="list-disc ml-6 text-gray-600">
                        <li>Materials: ₹{estimate.costBreakdown.materials}</li>
                        <li>Labor: ₹{estimate.costBreakdown.labor}</li>
                        <li>Design: ₹{estimate.costBreakdown.design}</li>
                        <li>Fixtures: ₹{estimate.costBreakdown.fixtures}</li>
                        <li>
                          <strong>Total:</strong> ₹{estimate.costBreakdown.total}
                        </li>
                      </ul>
                    </div>

                    <p className="text-gray-500 text-sm mt-4">
                      Created on: {new Date(estimate.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyEstimates;
