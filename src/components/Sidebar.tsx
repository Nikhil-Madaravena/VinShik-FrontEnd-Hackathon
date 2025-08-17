import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, Map, Users, Briefcase, FileText, Settings } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/dashboard' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/calendar' },
    { id: 'map', label: 'Map', icon: Map, path: '/map' },
    { id: 'clients', label: 'Clients', icon: Users, path: '/clients' },
    { id: 'jobs', label: 'Jobs', icon: Briefcase, path: '/jobs' },
    { id: 'quotes', label: 'Quotes', icon: FileText, path: '/quotes' },
    { id: 'services', label: 'My Services', icon: Settings, path: '/services' },
  ];

  return (
    <div className="w-64 bg-white h-full shadow-sm border-r border-gray-100 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">
          <span className="text-teal-600">Vin</span>Shik
        </h1>
      </div>
      
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'} // only exact match for home
                  className={({ isActive }) =>
                    `w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />
                      <span className="font-medium">{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
