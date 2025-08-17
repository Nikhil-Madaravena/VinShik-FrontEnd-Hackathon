import React from "react";

const ProfilePage: React.FC = () => {
  const user = {
    name: "Julie Anderson",
    email: "julie.anderson@example.com",
    role: "Product Manager",
    location: "San Francisco, USA",
    joinDate: "March 2023",
    avatar: "https://i.cc/150?img=47", // dummy avatar
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center space-x-6">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500">{user.role}</p>
            <p className="text-sm text-gray-400">Joined {user.joinDate}</p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-700">Email</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-700">Location</h3>
            <p className="text-gray-600">{user.location}</p>
          </div>
        </div>

        {/* Activity */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <ul className="space-y-3">
            <li className="bg-gray-50 rounded-xl p-3 shadow-sm">
              ✅ Completed task "UI Dashboard Redesign"
            </li>
            <li className="bg-gray-50 rounded-xl p-3 shadow-sm">
              📧 Responded to client emails
            </li>
            <li className="bg-gray-50 rounded-xl p-3 shadow-sm">
              📊 Uploaded quarterly report
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
