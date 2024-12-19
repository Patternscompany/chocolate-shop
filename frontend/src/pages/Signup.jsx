import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',  // Add username here
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username, // Include username here
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      alert(response.data.message); // Show success message
      navigate('/login'); // Navigate to login page after successful registration
    } catch (err) {
      console.error("Signup Error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };
  
  
  
  

  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
        
<div>
  <label className="block text-gray-700 mb-2">Username</label>
  <input
    type="text"
    value={formData.username}
    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
    placeholder="Enter your username"
  />
</div>

            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
