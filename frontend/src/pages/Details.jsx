import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

function Details() {
  const [estimateData, setEstimateData] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [recentEstimates, setRecentEstimates] = useState([]); // State for recent estimates
  const [showRecent, setShowRecent] = useState(false);

  useEffect(() => {
    const estimate = localStorage.getItem('estimateData');
    const pkg = localStorage.getItem('selectedPackage');
    if (estimate && pkg) {
      setEstimateData(JSON.parse(estimate));
      setSelectedPackage(JSON.parse(pkg));
    }
  }, []);

  const calculateCost = (percentage) => {
    if (!selectedPackage || !estimateData) return 0;
    const basePrice = selectedPackage.price;
    const area = parseInt(estimateData.carpetArea);
    const kitchenAddition = estimateData.modularKitchen ? basePrice * 0.2 : 0;
    const totalCost = (area * basePrice / 100) + kitchenAddition;
    return Math.round(totalCost * percentage);
  };

  const calculateTotalCost = () => {
    if (!selectedPackage || !estimateData) return 0;
    const basePrice = selectedPackage.price;
    const area = parseInt(estimateData.carpetArea);
    const kitchenAddition = estimateData.modularKitchen ? basePrice * 0.2 : 0;
    return Math.round((area * basePrice / 100) + kitchenAddition);
  };

  const saveEstimateToDatabase = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to save estimate');
        return;
      }

      const estimatePayload = {
        apartmentType: estimateData?.apartmentType,
        carpetArea: estimateData?.carpetArea,
        modularKitchen: estimateData?.modularKitchen,
        selectedPackage: selectedPackage,
        bedrooms: estimateData?.bedrooms,
        costBreakdown: {
          materials: calculateCost(0.4),
          labor: calculateCost(0.25),
          design: calculateCost(0.2),
          fixtures: calculateCost(0.15),
          total: calculateTotalCost(),
        },
      };

      const response = await axios.post('http://localhost:5000/api/auth/save-estimate', estimatePayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        alert('Estimate saved successfully');
      }
    } catch (error) {
      console.error('Error saving estimate:', error);
      alert('Failed to save estimate');
    }
  };

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
      setShowRecent(true);
    } catch (error) {
      console.error('Error fetching recent estimates:', error);
      alert('Failed to fetch recent estimates');
    }
  };

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();

    const breakdown = [
      ['Interior Design Estimate'],
      [],
      ['Project Details'],
      ['Apartment Type', estimateData?.apartmentType],
      ['Carpet Area', `${estimateData?.carpetArea} sq ft`],
      ['Package Selected', selectedPackage?.name],
      ['Modular Kitchen', estimateData?.modularKitchen ? 'Yes' : 'No'],
      [],
      ['Selected Rooms'],
      ...(estimateData?.bedrooms?.map((room) => [room]) || []),
      [],
      ['Cost Breakdown'],
      ['Category', 'Percentage', 'Amount'],
      ['Materials', '40%', calculateCost(0.4)],
      ['Labor', '25%', calculateCost(0.25)],
      ['Design', '20%', calculateCost(0.2)],
      ['Fixtures', '15%', calculateCost(0.15)],
      [],
      ['Total Estimate', '', calculateTotalCost()],
    ];

    const ws = XLSX.utils.aoa_to_sheet(breakdown);
    XLSX.utils.book_append_sheet(workbook, ws, 'Estimate');
    XLSX.writeFile(workbook, 'interior-design-estimate.xlsx');
  };

  if (!estimateData || !selectedPackage) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <p className="text-gray-600">Loading estimate details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Project Details</h1>
          <div>
            <button
              onClick={saveEstimateToDatabase}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors mr-4"
            >
              Save Estimate
            </button>
            <button
              onClick={downloadExcel}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Download Estimate
            </button>
          </div>
        </div>

        <button
          onClick={fetchRecentEstimates}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors mb-6"
        >
          Recent Estimates
        </button>

        {showRecent && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Recent Estimates</h2>
            {recentEstimates.length > 0 ? (
              <ul className="space-y-4">
                {recentEstimates.map((estimate) => (
                  <li key={estimate._id} className="p-4 bg-white rounded shadow">
                    <p>
                      <strong>Apartment Type:</strong> {estimate.apartmentType}
                    </p>
                    <p>
                      <strong>Total Cost:</strong> ${estimate.costBreakdown.total}
                    </p>
                    <p>
                      <strong>Date:</strong>{' '}
                      {new Date(estimate.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No recent estimates found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
