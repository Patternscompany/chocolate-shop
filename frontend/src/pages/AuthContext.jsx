import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(''); // Add username state

  // Check if the user is already logged in (e.g., with a token)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username'); // Retrieve saved username
    if (token && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername); // Set username from localStorage
    }
  }, []);

  const login = (token, username) => {
    localStorage.setItem('token', token); // Save token to storage
    localStorage.setItem('username', username); // Save username to storage
    setIsLoggedIn(true);
    setUsername(username); // Update username state
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('username'); // Remove username
    setIsLoggedIn(false);
    setUsername(''); // Clear username state
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
