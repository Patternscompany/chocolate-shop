import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './pages/AuthContext.jsx';
import ShopContextProvider from './context/shopContext.jsx'; // Import ShopContextProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </AuthProvider>
  </StrictMode>
);
