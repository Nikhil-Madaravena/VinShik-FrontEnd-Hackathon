import React, { useState } from "react";
import {
  Search,
  Plus,
  Phone,
  Mail,
  Star,
  Edit,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import { Dialog } from "@headlessui/react";

const Clients: React.FC = () => {
  const initialClients = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "Johnson Enterprises",
      email: "sarah@johnsonent.com",
      phone: "+1 (555) 123-4567",
      address: "123 Oak Street, Downtown",
      status: "active",
      rating: 4.9,
      totalJobs: 12,
      totalSpent: 45600,
      lastContact: "2024-01-15",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Davis",
      company: "Davis Properties",
      email: "michael@davisprops.com",
      phone: "+1 (555) 987-6543",
      address: "456 Pine Avenue, Midtown",
      status: "active",
      rating: 4.7,
      totalJobs: 8,
      totalSpent: 32400,
      lastContact: "2024-01-12",
      avatar: "MD",
    },
    {
      id: 3,
      name: "Emily Wilson",
      company: "Wilson Realty",
      email: "emily@wilsonrealty.com",
      phone: "+1 (555) 456-7890",
      address: "789 Elm Drive, Uptown",
      status: "inactive",
      rating: 5.0,
      totalJobs: 15,
      totalSpent: 67800,
      lastContact: "2023-12-20",
      avatar: "EW",
    },
  ];

  const [clients, setClients] = useState(initialClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewClient, setViewClient] = useState<any | null>(null);
  const [editClient, setEditClient] = useState<any | null>(null);
  const [deleteClient, setDeleteClient] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddClient = (newClient: any) => {
    setClients([
      ...clients,
      {
        id: clients.length + 1,
        ...newClient,
      },
    ]);
    setIsAddModalOpen(false);
  };

  const handleUpdateClient = (updated: any) => {
    setClients(clients.map((c) => (c.id === updated.id ? updated : c)));
    setEditClient(null);
  };

  const handleDeleteClient = () => {
    if (deleteClient) {
      setClients(clients.filter((c) => c.id !== deleteClient.id));
      setDeleteClient(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">
            Manage your client relationships and contacts
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-600">Total Clients</p>
          <p className="text-2xl font-bold">{clients.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-600">Active Clients</p>
          <p className="text-2xl font-bold">
            {clients.filter((c) => c.status === "active").length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold">
            $
            {clients
              .reduce((sum, c) => sum + c.totalSpent, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-gray-600">Avg Rating</p>
          <p className="text-2xl font-bold">
            {(
              clients.reduce((sum, c) => sum + c.rating, 0) / clients.length
            ).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Clients Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left">Client</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Jobs</th>
                <th className="py-3 px-4 text-left">Spent</th>
                <th className="py-3 px-4 text-left">Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500">
                    No clients found
                  </td>
                </tr>
              )}
              {filteredClients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-medium">
                      {client.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-gray-500">
                        {client.company}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-3 h-3" /> {client.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-3 h-3" /> {client.phone}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        client.status
                      )}`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">{client.totalJobs}</td>
                  <td className="py-4 px-4">
                    ${client.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    {client.rating}
                  </td>
                  <td className="py-4 px-4 flex gap-2">
                    <button
                      onClick={() => setViewClient(client)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditClient(client)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteClient(client)}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Add Client Modal --- */}
      <Dialog open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="font-bold">Add Client</Dialog.Title>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleAddClient({
                  name: formData.get("name"),
                  company: formData.get("company"),
                  email: formData.get("email"),
                  phone: formData.get("phone"),
                  status: "active",
                  rating: 0,
                  totalJobs: 0,
                  totalSpent: 0,
                  lastContact: new Date().toISOString().split("T")[0],
                  avatar: (formData.get("name") as string)
                    ?.split(" ")
                    .map((n) => n[0])
                    .join(""),
                });
              }}
              className="space-y-3"
            >
              <input name="name" placeholder="Name" className="w-full border p-2 rounded" required />
              <input name="company" placeholder="Company" className="w-full border p-2 rounded" required />
              <input name="email" placeholder="Email" className="w-full border p-2 rounded" required />
              <input name="phone" placeholder="Phone" className="w-full border p-2 rounded" required />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-3 py-1 border rounded">Cancel</button>
                <button type="submit" className="px-3 py-1 bg-teal-600 text-white rounded">Save</button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* --- View Client Modal --- */}
      <Dialog open={!!viewClient} onClose={() => setViewClient(null)}>
        {viewClient && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <Dialog.Panel className="bg-white p-6 rounded-lg w-96">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="font-bold">
                  {viewClient.name}
                </Dialog.Title>
                <button onClick={() => setViewClient(null)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p><strong>Company:</strong> {viewClient.company}</p>
              <p><strong>Email:</strong> {viewClient.email}</p>
              <p><strong>Phone:</strong> {viewClient.phone}</p>
              <p><strong>Status:</strong> {viewClient.status}</p>
              <p><strong>Total Jobs:</strong> {viewClient.totalJobs}</p>
              <p><strong>Total Spent:</strong> ${viewClient.totalSpent.toLocaleString()}</p>
              <p><strong>Rating:</strong> {viewClient.rating}</p>
            </Dialog.Panel>
          </div>
        )}
      </Dialog>

      {/* --- Edit Client Modal --- */}
      <Dialog open={!!editClient} onClose={() => setEditClient(null)}>
        {editClient && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <Dialog.Panel className="bg-white p-6 rounded-lg w-96">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="font-bold">Edit Client</Dialog.Title>
                <button onClick={() => setEditClient(null)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleUpdateClient({
                    ...editClient,
                    name: formData.get("name"),
                    company: formData.get("company"),
                    email: formData.get("email"),
                    phone: formData.get("phone"),
                  });
                }}
                className="space-y-3"
              >
                <input name="name" defaultValue={editClient.name} className="w-full border p-2 rounded" required />
                <input name="company" defaultValue={editClient.company} className="w-full border p-2 rounded" required />
                <input name="email" defaultValue={editClient.email} className="w-full border p-2 rounded" required />
                <input name="phone" defaultValue={editClient.phone} className="w-full border p-2 rounded" required />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setEditClient(null)} className="px-3 py-1 border rounded">Cancel</button>
                  <button type="submit" className="px-3 py-1 bg-teal-600 text-white rounded">Update</button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        )}
      </Dialog>

      {/* --- Delete Confirmation Modal --- */}
      <Dialog open={!!deleteClient} onClose={() => setDeleteClient(null)}>
        {deleteClient && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <Dialog.Panel className="bg-white p-6 rounded-lg w-96 text-center">
              <Dialog.Title className="font-bold mb-4">
                Delete {deleteClient.name}?
              </Dialog.Title>
              <p className="text-gray-600 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setDeleteClient(null)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteClient}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </Dialog.Panel>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Clients;
