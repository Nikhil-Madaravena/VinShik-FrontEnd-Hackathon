import React from 'react';
import { Mail, Settings, User } from 'lucide-react';
import ProfileButton from './ProfileButton';

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, Julie 👋
        </h1>
        <p className="text-gray-600">Here's what you need to focus on today</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Mail className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-500 rounded-full"></span>
        </button>
        <button className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-shadow">
          <ProfileButton />
        </button>
      </div>
    </div>
  );
};

export default Header;