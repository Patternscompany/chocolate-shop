 import React,{useContext} from 'react';
 import { Link } from 'react-router-dom';
import { User, Settings, FileText, LogOut } from 'lucide-react';
import { AuthContext } from '../pages/AuthContext';


function Profile() {
  const { isLoggedIn, logout,username } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
                <p className="text-gray-600">john.doe@example.com</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={username}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value="john.doe@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value="+1 (555) 123-4567"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    readOnly
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Account Settings</h2>
                
                <button className="w-full flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Settings className="w-5 h-5 mr-3 text-gray-600" />
                  Edit Profile
                </button>
                <Link to="/my-estimates">
                <button className="w-full flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
               
                 <FileText className="w-5 h-5 mr-3 text-gray-600" />
                 My Estimates
                
                 
                </button>
                </Link>
                <button className="w-full flex items-center p-3 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;