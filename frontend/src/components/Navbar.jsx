import React, { useState,useContext } from 'react';
import { Link ,useLocation} from 'react-router-dom';
import { Menu, X, Calculator, ChevronDown, User } from 'lucide-react';
import { AuthContext } from '../pages/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const { isLoggedIn, logout,username } = useContext(AuthContext);
  const location = useLocation();
  const hiddenPaths = ['/calculator', '/my-estimates','/details','/summary','/explore'];

  const services = [
    'Interior Design',
    'Space Planning',
    'Renovation',
    'Furniture Design',
    'Lighting Design'
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-800">InteriorPro</h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">About</Link>
            
            <div className="relative">
              <button
                className="text-gray-700 hover:text-gray-900 flex items-center"
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {showServices && (
                <div
                  className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                  onMouseEnter={() => setShowServices(true)}
                  onMouseLeave={() => setShowServices(false)}
                >
                  {services.map((service) => (
                    <Link
                      key={service}
                      to={`/services/${service.toLowerCase().replace(' ', '-')}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/portfolio" className="text-gray-700 hover:text-gray-900">Portfolio</Link>
           
            <Link to="/contact" className="text-gray-700 hover:text-gray-900">Contact</Link>
            <Link to="/my-estimates">
            My Estimates</Link>
            {!hiddenPaths.includes(location.pathname) && (
            <Link
              to="/calculator"
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Calculator
            </Link>
          )}
         {!isLoggedIn ? (
  <>
    <Link to="/login" className="text-gray-700 hover:text-gray-900">Login/signup</Link>
  </>
) : (
  <>
    <Link to="/profile" className="text-gray-700 hover:text-gray-900 flex items-center">
      <User className="h-6 w-6 mr-2" />
      <span className="text-gray-700">{username}</span> {/* Display username here */}
    </Link>
    <button onClick={logout} className="text-gray-700 hover:text-gray-900">Logout</button>
  </>
)}


            
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-gray-900">About</Link>
            <button
              onClick={() => setShowServices(!showServices)}
              className="w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900"
            >
              Services <ChevronDown className="inline ml-1 h-4 w-4" />
            </button>
            {showServices && (
              <div className="pl-6">
                {services.map((service) => (
                  <Link
                    key={service}
                    to={`/services/${service.toLowerCase().replace(' ', '-')}`}
                    className="block px-3 py-2 text-sm text-gray-700 hover:text-gray-900"
                  >
                    {service}
                  </Link>
                ))}
              </div>
            )}
            <Link to="/portfolio" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Portfolio</Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Contact</Link>
            <Link to="/calculator" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Calculator</Link>
            <Link to="/profile" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Profile</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;