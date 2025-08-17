import React, { useState } from 'react';
import { Search, Plus, FileText, Send, Eye, Edit, Trash2, Download, DollarSign, Calendar, User } from 'lucide-react';

const Quotes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const quotes = [
    {
      id: 'QT-2024-001',
      title: 'Kitchen Renovation Quote',
      client: 'Sarah Johnson',
      clientEmail: 'sarah@johnsonent.com',
      description: 'Complete kitchen remodel including cabinets, countertops, appliances, and electrical work',
      amount: 28500,
      status: 'pending',
      createdDate: '2024-01-15',
      validUntil: '2024-02-15',
      items: [
        { name: 'Custom Cabinets', quantity: 1, price: 12000 },
        { name: 'Granite Countertops', quantity: 45, price: 180 },
        { name: 'Appliance Installation', quantity: 4, price: 800 },
        { name: 'Electrical Work', quantity: 1, price: 2500 },
        { name: 'Labor', quantity: 80, price: 75 }
      ]
    },
    {
      id: 'QT-2024-002',
      title: 'Bathroom Remodel Quote',
      client: 'Michael Davis',
      clientEmail: 'michael@davisprops.com',
      description: 'Master bathroom renovation with luxury fixtures and custom tile work',
      amount: 18750,
      status: 'approved',
      createdDate: '2024-01-12',
      validUntil: '2024-02-12',
      items: [
        { name: 'Luxury Fixtures', quantity: 1, price: 4500 },
        { name: 'Custom Tile Work', quantity: 120, price: 85 },
        { name: 'Plumbing', quantity: 1, price: 3200 },
        { name: 'Labor', quantity: 60, price: 85 }
      ]
    },
    {
      id: 'QT-2024-003',
      title: 'Flooring Installation Quote',
      client: 'Emily Wilson',
      clientEmail: 'emily@wilsonrealty.com',
      description: 'Hardwood flooring installation throughout main living areas',
      amount: 15200,
      status: 'rejected',
      createdDate: '2024-01-10',
      validUntil: '2024-02-10',
      items: [
        { name: 'Hardwood Flooring', quantity: 800, price: 12 },
        { name: 'Installation', quantity: 800, price: 8 },
        { name: 'Finishing', quantity: 1, price: 2800 }
      ]
    },
    {
      id: 'QT-2024-004',
      title: 'Roof Repair Quote',
      client: 'Robert Smith',
      clientEmail: 'robert@smithconst.com',
      description: 'Emergency roof repair and gutter replacement',
      amount: 9500,
      status: 'draft',
      createdDate: '2024-01-18',
      validUntil: '2024-02-18',
      items: [
        { name: 'Roofing Materials', quantity: 1, price: 4200 },
        { name: 'Gutter System', quantity: 1, price: 1800 },
        { name: 'Labor', quantity: 40, price: 85 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return '✓';
      case 'pending': return '⏳';
      case 'rejected': return '✗';
      case 'draft': return '📝';
      default: return '📄';
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || quote.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalQuoteValue = quotes.reduce((sum, quote) => sum + quote.amount, 0);
  const approvedQuotes = quotes.filter(q => q.status === 'approved');
  const pendingQuotes = quotes.filter(q => q.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quotes</h1>
          <p className="text-gray-600 mt-1">Create and manage project quotes and estimates</p>
        </div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Quote</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Quotes</p>
              <p className="text-2xl font-bold text-gray-900">{quotes.length}</p>
            </div>
            <FileText className="w-12 h-12 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingQuotes.length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl">
              ⏳
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">{approvedQuotes.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
              ✓
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalQuoteValue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-500" />
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
              placeholder="Search quotes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredQuotes.map((quote) => (
            <div key={quote.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getStatusIcon(quote.status)}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{quote.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Quote ID: {quote.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                  {quote.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{quote.client}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Valid until {quote.validUntil}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold text-gray-900">${quote.amount.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{quote.description}</p>

              {/* Quote Items Preview */}
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Items ({quote.items.length})</h4>
                <div className="space-y-1">
                  {quote.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between text-xs text-gray-600">
                      <span>{item.name} ({item.quantity}x)</span>
                      <span>${(item.quantity * item.price).toLocaleString()}</span>
                    </div>
                  ))}
                  {quote.items.length > 3 && (
                    <p className="text-xs text-gray-500">+{quote.items.length - 3} more items</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="View">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Download">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                {quote.status === 'draft' && (
                  <button className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 transition-colors flex items-center space-x-1">
                    <Send className="w-3 h-3" />
                    <span>Send</span>
                  </button>
                )}
                
                {quote.status === 'approved' && (
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                    Create Job
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quotes;