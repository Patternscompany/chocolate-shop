import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">About Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Interior Design Team"
              className="rounded-lg shadow-lg w-full h-[400px] object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              With over a decade of experience in transforming spaces, we've built a reputation
              for creating beautiful, functional interiors that reflect our clients' unique styles
              and needs. Our passion for design excellence drives everything we do.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We strive to create exceptional living spaces that enhance our clients' quality of
              life while maintaining the highest standards of design and craftsmanship. Our
              commitment to innovation and sustainability sets us apart.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Excellence in design and execution</li>
              <li>Client-focused approach</li>
              <li>Sustainable practices</li>
              <li>Innovation and creativity</li>
              <li>Attention to detail</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;