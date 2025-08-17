import React, { useState } from 'react';
import { Plus, Edit, Trash2, DollarSign, Clock, Star, Settings, Search } from 'lucide-react';

const Services: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 1,
      name: 'Kitchen Renovation',
      category: 'Interior',
      description: 'Complete kitchen remodeling including cabinets, countertops, appliances, and electrical work',
      basePrice: 25000,
      duration: '4-6 weeks',
      rating: 4.9,
      completedJobs: 45,
      isActive: true,
      features: ['Custom Cabinets', 'Granite Countertops', 'Appliance Installation', 'Electrical Work']
    },
    {
      id: 2,
      name: 'Bathroom Remodel',
      category: 'Interior',
      description: 'Full bathroom renovation with luxury fixtures, custom tile work, and modern amenities',
      basePrice: 18000,
      duration: '3-4 weeks',
      rating: 4.8,
      completedJobs: 32,
      isActive: true,
      features: ['Luxury Fixtures', 'Custom Tile Work', 'Plumbing Updates', 'Lighting']
    },
    {
      id: 3,
      name: 'Flooring Installation',
      category: 'Interior',
      description: 'Professional installation of hardwood, laminate, tile, and carpet flooring',
      basePrice: 12000,
      duration: '1-2 weeks',
      rating: 4.7,
      completedJobs: 78,
      isActive: true,
      features: ['Material Selection', 'Professional Installation', 'Finishing', 'Cleanup']
    },
    {
      id: 4,
      name: 'Roof Repair & Installation',
      category: 'Exterior',
      description: 'Complete roofing services including repairs, replacements, and gutter systems',
      basePrice: 15000,
      duration: '1-3 weeks',
      rating: 4.6,
      completedJobs: 28,
      isActive: true,
      features: ['Roof Inspection', 'Material Supply', 'Installation', 'Gutter Systems']
    },
    {
      id: 5,
      name: 'Exterior Painting',
      category: 'Exterior',
      description: 'Professional exterior painting services with premium materials and finishes',
      basePrice: 8000,
      duration: '1-2 weeks',
      rating: 4.5,
      completedJobs: 56,
      isActive: true,
      features: ['Surface Preparation', 'Premium Paint', 'Color Consultation', 'Cleanup']
    },
    {
      id: 6,
      name: 'HVAC Installation',
      category: 'Systems',
      description: 'Heating, ventilation, and air conditioning system installation and maintenance',
      basePrice: 12000,
      duration: '2-3 weeks',
      rating: 4.8,
      completedJobs: 23,
      isActive: false,
      features: ['System Design', 'Equipment Installation', 'Ductwork', 'Testing']
    }
  ];

  const categories = ['all', 'Interior', 'Exterior', 'Systems'];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeServices = services.filter(s => s.isActive).length;
  const totalRevenue = services.reduce((sum, s) => sum + (s.basePrice * s.completedJobs), 0);
  const avgRating = services.reduce((sum, s) => sum + s.rating, 0) / services.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
          <p className="text-gray-600 mt-1">Manage your service offerings and pricing</p>
        </div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Services</p>
              <p className="text-2xl font-bold text-gray-900">{services.length}</p>
            </div>
            <Settings className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Services</p>
              <p className="text-2xl font-bold text-gray-900">{activeServices}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</p>
            </div>
            <Star className="w-12 h-12 text-yellow-500 fill-current" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className={`bg-white border rounded-lg p-6 hover:shadow-md transition-shadow ${
              service.isActive ? 'border-gray-200' : 'border-gray-300 opacity-75'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    {!service.isActive && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">Inactive</span>
                    )}
                  </div>
                  <span className="inline-block px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-full font-medium">
                    {service.category}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{service.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>Starting at</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">${service.basePrice.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Duration</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{service.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>Rating</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{service.rating} ({service.completedJobs} jobs)</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Includes:</h4>
                <div className="flex flex-wrap gap-1">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {feature}
                    </span>
                  ))}
                  {service.features.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{service.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                <button className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
                  Create Quote
                </button>
                <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  service.isActive 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}>
                  {service.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;