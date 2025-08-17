import React, { useState } from "react";
import { X } from "lucide-react";

interface NewEventModalProps {
  onClose: () => void;
  onSave: (event: {
    id: number;
    title: string;
    time: string;
    date: Date;
    type: string;
    location: string;
  }) => void;
}

const NewEventModal: React.FC<NewEventModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("job");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !time || !date) return;

    onSave({
      id: Date.now(),
      title,
      time,
      date: new Date(date),
      type,
      location,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Create New Event</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Type</label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="job">Job</option>
              <option value="meeting">Meeting</option>
              <option value="quote">Quote</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEventModal;
