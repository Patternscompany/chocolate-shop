import React from 'react';

function Portfolio() {
  const projects = [
    {
      id: 1,
      title: 'Modern Minimalist Home',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      title: 'Luxury Penthouse',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      title: 'Contemporary Office',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      title: 'Boutique Hotel',
      category: 'Hospitality',
      image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 5,
      title: 'Urban Apartment',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 6,
      title: 'Restaurant Design',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1600607687664-2b3f87e86f3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Our Portfolio</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-lg shadow-md">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-200">{project.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Portfolio;