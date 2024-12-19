import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Summary() {
  const navigate = useNavigate();
  const [estimateData, setEstimateData] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    const estimate = localStorage.getItem('estimateData');
    const pkg = localStorage.getItem('selectedPackage');
    if (estimate && pkg) {
      setEstimateData(JSON.parse(estimate));
      setSelectedPackage(JSON.parse(pkg));
    }
  }, []);

  const costBreakdown = [
    { name: 'Materials', cost: 40 },
    { name: 'Labor', cost: 25 },
    { name: 'Design', cost: 20 },
    { name: 'Fixtures', cost: 15 }
  ];

  const timeline = [
    { phase: 'Design Phase', duration: '2 weeks' },
    { phase: 'Material Procurement', duration: '3 weeks' },
    { phase: 'Construction', duration: '6 weeks' },
    { phase: 'Finishing', duration: '3 weeks' }
  ];

  const handleNext = () => {
    navigate('/details');
  };

  if (!estimateData || !selectedPackage) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Project Summary</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Selected Options</h2>
              <div className="space-y-4">
                <p><strong>Apartment Type:</strong> {estimateData.apartmentType}</p>
                <p><strong>Selected Rooms:</strong> {estimateData.bedrooms.join(', ')}</p>
                <p><strong>Modular Kitchen:</strong> {estimateData.modularKitchen ? 'Yes' : 'No'}</p>
                <p><strong>Carpet Area:</strong> {estimateData.carpetArea} sq ft</p>
                <p><strong>Package:</strong> {selectedPackage.name}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Cost Breakdown</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cost" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Timeline</h2>
              <div className="space-y-6">
                {timeline.map((phase, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">{phase.phase}</h3>
                      <p className="text-gray-600">{phase.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Services Included</h2>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Interior Design Consultation
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Space Planning
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Material Selection
                </li>
                <li className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Project Management
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Next: View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Summary;