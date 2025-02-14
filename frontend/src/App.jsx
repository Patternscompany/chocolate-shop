import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Calculator from './pages/Calculator';
import MyEstimates from './pages/MyEstimates';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import Summary from './pages/Summary';
import Details from './pages/Details';
import Cart from './pages/Cart';
import ProductDetails from './pages/Product';

function App() {
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/my-estimates" element={<MyEstimates />} /> {/* Add route for MyEstimates */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/details" element={<Details />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;