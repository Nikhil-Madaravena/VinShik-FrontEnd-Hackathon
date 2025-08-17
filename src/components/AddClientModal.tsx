import React, { useState } from "react";
import { X } from "lucide-react";

interface AddClientModalProps {
  show: boolean;
  onClose: () => void;
  onAddClient: (client: any) => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ show, onClose, onAddClient }) => {
  const [newClient, setNewClient] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "active",
    rating: 5.0,
    totalJobs: 0,
    totalSpent: 0,
    avatar: "",
  });

  if (!show) return null;

  const handleSubmit = () => {
    if (!newClient.name || !newClient.email) return;

    const avatar =
      newClient.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "NA";

    onAddClient({ ...newClient, avatar });
    setNewClient({
      name: "",
      company: "",
      email: "",
      phone: "",
      status: "active",
      rating: 5.0,
      totalJobs: 0,
      totalSpent: 0,
      avatar: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">Add New Client</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-gray-800" />
          </button>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={newClient.name}
            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Company"
            value={newClient.company}
            onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={newClient.email}
            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newClient.phone}
            onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <select
            value={newClient.status}
            onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
          >
            Add Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;
