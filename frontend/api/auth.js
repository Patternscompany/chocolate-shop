import axios from 'axios';

// Backend base URL
const API_URL = 'http://localhost:5000/api/auth'; // Replace with your backend URL

// Register a new user
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error; // Optional: Re-throw the error to handle it in the component where it's called
  }
};

// Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // Save the JWT token in localStorage if login is successful
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error; // Optional: Re-throw the error to handle it in the component where it's called
  }
};

// Logout user (clears token on the client)
export const logout = () => {
  localStorage.removeItem('token');
  alert('Logged out successfully!');
};
