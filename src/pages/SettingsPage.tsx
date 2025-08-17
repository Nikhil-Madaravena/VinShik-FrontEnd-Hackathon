import React, { useState } from "react";

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings ⚙️</h2>

        {/* Account Settings */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Account</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                type="email"
                defaultValue="julie.anderson@example.com"
                className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Preferences</h3>
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
            <span className="text-gray-700">Dark Mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                darkMode ? "bg-teal-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  darkMode ? "translate-x-6" : ""
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h3 className="text-lg font-semibold text-red-600 mb-2">Danger Zone</h3>
          <button className="w-full px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
