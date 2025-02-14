import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  // const [email, setEmail] = useState(''); // Add email state

  // Check if the user is already logged in (e.g., with a token)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username'); // Retrieve saved username
    // const savedEmail = localStorage.getItem('email'); // Retrieve saved email

    if (token && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername); // Set username from localStorage
      // setEmail(savedEmail); // Set email from localStorage
    }
  }, []);

  const login = (token, username) => {
    localStorage.setItem('token', token); // Save token to storage
    localStorage.setItem('username', username); // Save username to storage
    // localStorage.setItem('email', email); // Save email to storage
    setIsLoggedIn(true);
    setUsername(username); // Update username state
    // setEmail(email); // Update email state
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token
    localStorage.removeItem('username'); // Remove username
    // localStorage.removeItem('email'); // Remove email
    setIsLoggedIn(false);
    setUsername(''); // Clear username state
    // setEmail(''); // Clear email state
    window.location.reload(); // Reload the website
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
