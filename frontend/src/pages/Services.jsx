import React from 'react';
import { useParams } from 'react-router-dom';

function Services() {
  const { service } = useParams();

  const services = [
    {
      title: 'Interior Design',
      description: 'Complete interior design solutions for residential and commercial spaces.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Space Planning',
      description: 'Optimize your space utilization with our expert planning services.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Renovation',
      description: 'Transform your existing space with our renovation services.',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Furniture Design',
      description: 'Custom furniture design and manufacturing services.',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Lighting Design',
      description: 'Create the perfect ambiance with our lighting design solutions.',
      image: 'https://images.unsplash.com/photo-1600607687664-2b3f87e86f3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Our Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;