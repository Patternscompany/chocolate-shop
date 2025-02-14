import React, { createContext, useState, useEffect } from 'react';
import { products } from '../assests/assests'; 

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Initialize cart state
  const [currency] = useState('$'); // Example currency
  const userToken = localStorage.getItem('token'); // Retrieve user token from localStorage
  const BASE_URL = 'http://localhost:5001/api/auth'; // Backend base URL

  // Fetch cart data from backend
  useEffect(() => {
    const fetchCart = async () => {
      if (!userToken) {
        console.log("No user token available, skipping fetch");
        return;
      }
  
      try {
        console.log("Fetching cart with token:", userToken);
  
        const response = await fetch(`${BASE_URL}/cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        });
  
        console.log("Response status:", response.status);
  
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to fetch cart:", response.status, response.statusText, errorData);
          return;
        }
  
        const data = await response.json();
        console.log("Cart data received from backend:", data);
  
        setCart(data.items || []); // ✅ Set cart if items exist
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    fetchCart();
  }, [userToken]);
  
  

  // Save cart data to backend
  useEffect(() => {
    const saveCart = async () => {
      if (!userToken) {
        console.error("No user token found. Redirecting to login.");
        return;
      }
    
      // Convert `_id` to `productId`
      const cartItems = cart.map((item) => ({
        productId: item._id.toString(), // Ensure it's a string
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      }));
    
      try {
        console.log("Sending cart data:", cartItems);
        
        const response = await fetch(`${BASE_URL}/cart`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ items: cartItems }),
        });
    
        if (!response.ok) {
          console.error("Error saving cart:", response.status);
          const errorData = await response.json();
          console.error("Error details:", errorData);
        }
      } catch (error) {
        console.error("Error saving cart:", error);
      }
    };
    
      
  
    if (cart.length > 0) {
      saveCart();
    }
  }, [cart, userToken]);
  

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item._id === product._id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
          imageUrl: product.image || "https://your-default-image-url.com/default.jpg", // Default image URL if missing
        },
      ]);
    }
  };
  
  const removeFromCart = async (productId) => {
    if (!userToken) {
      console.error('User is not logged in.');
      return;
    }
  
    try {
      // Remove the item from the local cart state immediately for better UX
      setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  
      // Make an API call to remove the item from the database
      const response = await fetch(`${BASE_URL}/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`, // Pass the token
        },
      });
  
      if (!response.ok) {
        // Log the error and restore the cart state if failed
        const data = await response.json();
        console.error('Failed to remove item from database:', response.status, data.message);
        const itemToReAdd = cart.find((item) => item._id === productId);
        if (itemToReAdd) {
          setCart((prevCart) => [...prevCart, itemToReAdd]);
        }
      } else {
        console.log('Item removed from database successfully.');
      }
    } catch (error) {
      console.error('Error removing item from database:', error);
      // Restore the cart state if an error occurs
      const itemToReAdd = cart.find((item) => item._id === productId);
      if (itemToReAdd) {
        setCart((prevCart) => [...prevCart, itemToReAdd]);
      }
    }
  };
  
  
  

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Context value
  const value = {
    products,
    cart,
    currency,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
