import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  MapPin,
  Search,
  Phone,
  Clock,
  Star,
  Map as MapIcon,
  Copy,
  ArrowRight,
} from "lucide-react";

// Leaflet styles & icon fix
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Ensure default icons work in bundlers (Vite/CRA/Next)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Larger icon for the active/selected marker
const activeIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [30, 48],
  iconAnchor: [15, 48],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

type Job = {
  id: number;
  title: string;
  client: string;
  address: string;
  status: "scheduled" | "in-progress" | "completed";
  priority: "high" | "medium" | "low";
  time: string;
  phone: string;
  rating: number;
  description?: string;
  coordinates: { lat: number; lng: number };
};

const FlyToJob: React.FC<{ coordinates: { lat: number; lng: number } | null }> = ({
  coordinates,
}) => {
  const map = useMap();
  useEffect(() => {
    if (!coordinates) return;
    map.flyTo([coordinates.lat, coordinates.lng], 14, { duration: 0.8 });
  }, [coordinates, map]);
  return null;
};

const getPriorityPill = (p: Job["priority"]) => {
  switch (p) {
    case "high":
      return "text-red-700 bg-red-50 ring-1 ring-red-100";
    case "medium":
      return "text-orange-700 bg-orange-50 ring-1 ring-orange-100";
    case "low":
      return "text-green-700 bg-green-50 ring-1 ring-green-100";
    default:
      return "text-gray-700 bg-gray-50 ring-1 ring-gray-100";
  }
};

const getStatusBadge = (s: Job["status"]) => {
  switch (s) {
    case "completed":
      return "bg-green-100 text-green-700";
    case "in-progress":
      return "bg-blue-100 text-blue-700";
    case "scheduled":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const Map: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(1);
  const [filterStatus, setFilterStatus] = useState<"all" | Job["status"]>("all");
  const [filterPriority, setFilterPriority] = useState<"all" | Job["priority"]>("all");
  const [search, setSearch] = useState("");
  const [mapType, setMapType] = useState<"street" | "topo">("street");
  const [sortBy, setSortBy] = useState<"priority" | "status" | "rating">("priority");

  const jobs: Job[] = [
    {
      id: 1,
      title: "Kitchen Renovation",
      client: "Smith Residence",
      address: "123 Oak Street, Downtown",
      status: "in-progress",
      priority: "high",
      time: "09:00 AM - 05:00 PM",
      phone: "+1 (555) 123-4567",
      rating: 4.8,
      description:
        "Full kitchen remodel focusing on cabinetry, countertops, and plumbing fixtures.",
      coordinates: { lat: 40.7128, lng: -74.006 }, // NYC
    },
    {
      id: 2,
      title: "Bathroom Remodel",
      client: "Johnson Property",
      address: "456 Pine Avenue, Midtown",
      status: "scheduled",
      priority: "medium",
      time: "10:00 AM - 04:00 PM",
      phone: "+1 (555) 987-6543",
      rating: 4.9,
      description:
        "Tile replacement, new vanity install, and improved ventilation system.",
      coordinates: { lat: 40.73061, lng: -73.935242 }, // Brooklyn
    },
    {
      id: 3,
      title: "Flooring Installation",
      client: "Davis Home",
      address: "789 Elm Drive, Uptown",
      status: "completed",
      priority: "low",
      time: "08:00 AM - 03:00 PM",
      phone: "+1 (555) 456-7890",
      rating: 5.0,
      description:
        "Hardwood flooring installation and baseboard finishing in living area.",
      coordinates: { lat: 40.6782, lng: -73.9442 }, // Brooklyn South
    },
    {
      id: 4,
      title: "Roof Repair",
      client: "Wilson Estate",
      address: "321 Maple Court, Suburbs",
      status: "in-progress",
      priority: "high",
      time: "07:00 AM - 06:00 PM",
      phone: "+1 (555) 321-0987",
      rating: 4.7,
      description:
        "Shingle replacement and leak sealing near the chimney stack.",
      coordinates: { lat: 40.650002, lng: -73.949997 }, // Queens
    },
  ];

  const priorityRank: Record<Job["priority"], number> = { high: 0, medium: 1, low: 2 };
  const statusRank: Record<Job["status"], number> = { "in-progress": 0, scheduled: 1, completed: 2 };

  const filteredJobs = useMemo(() => {
    const base = jobs.filter((j) => {
      const matchStatus = filterStatus === "all" || j.status === filterStatus;
      const matchPriority = filterPriority === "all" || j.priority === filterPriority;
      const s = search.trim().toLowerCase();
      const matchSearch =
        !s ||
        j.title.toLowerCase().includes(s) ||
        j.client.toLowerCase().includes(s) ||
        j.address.toLowerCase().includes(s);
      return matchStatus && matchPriority && matchSearch;
    });

    return [...base].sort((a, b) => {
      if (sortBy === "priority") {
        return priorityRank[a.priority] - priorityRank[b.priority];
      }
      if (sortBy === "status") {
        return statusRank[a.status] - statusRank[b.status];
      }
      // rating desc
      return b.rating - a.rating;
    });
  }, [jobs, filterStatus, filterPriority, search, sortBy]);

  const activeJob = useMemo(
    () => jobs.find((j) => j.id === selectedJob) ?? null,
    [jobs, selectedJob]
  );

  const handleGetDirections = (job: Job) => {
    const { lat, lng } = job.coordinates;
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      "_blank"
    );
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
        "_blank"
      );
    });
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/[^\d+]/g, "")}`;
  };

  const handleCopyAddress = async (addr: string) => {
    try {
      await navigator.clipboard.writeText(addr);
    } catch {
      // no-op
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Locations</h1>
          <p className="text-gray-600 mt-1">Track and navigate to your job sites</p>
        </div>

        <div className="flex items-center flex-wrap gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs, clients, addresses…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              aria-label="Search jobs"
            />
          </div>

          {/* Filters */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
            aria-label="Filter by priority"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
            aria-label="Sort jobs"
          >
            <option value="priority">Sort: Priority</option>
            <option value="status">Sort: Status</option>
            <option value="rating">Sort: Rating</option>
          </select>

          {/* Map Type */}
          <select
            value={mapType}
            onChange={(e) => setMapType(e.target.value as any)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500"
            aria-label="Map style"
          >
            <option value="street">Street Map</option>
            <option value="topo">Topo</option>
          </select>

          {/* Locate Me */}
          <button
            onClick={handleLocateMe}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-2"
          >
            <MapIcon className="w-4 h-4" />
            Nearby
          </button>
        </div>
      </div>

      {/* Map + List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map with Bottom Drawer */}
        <div className="lg:col-span-2 relative">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden relative">
            <MapContainer center={[40.7128, -74.006]} zoom={12} className="h-[600px] w-full">
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url={
                  mapType === "street"
                    ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    : "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                }
              />

              {filteredJobs.map((job) => (
                <Marker
                  key={job.id}
                  position={[job.coordinates.lat, job.coordinates.lng]}
                  icon={selectedJob === job.id ? activeIcon : new L.Icon.Default()}
                  eventHandlers={{ click: () => setSelectedJob(job.id) }}
                >
                  <Popup>
                    <div className="space-y-1">
                      <h4 className="font-semibold">{job.title}</h4>
                      <p className="text-xs text-gray-600">{job.client}</p>
                      <button
                        onClick={() => handleGetDirections(job)}
                        className="mt-2 w-full bg-teal-600 text-white py-1 px-2 rounded-md text-sm hover:bg-teal-700 flex items-center justify-center gap-1"
                      >
                        Directions <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}

              <FlyToJob coordinates={activeJob?.coordinates ?? null} />
            </MapContainer>

          </div>
        </div>

        {/* Job List */}
        <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2">
          <h3 className="text-lg font-semibold text-gray-900">Jobs</h3>

          {filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job.id)}
              className={`cursor-pointer border p-4 rounded-lg shadow-sm transition ${
                selectedJob === job.id ? "border-teal-500 bg-teal-50" : "border-gray-200 bg-white"
              }`}
              role="button"
              aria-label={`Select job ${job.title}`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">{job.title}</h4>
                <span className={`px-2 py-0.5 text-xs rounded ${getStatusBadge(job.status)}`}>
                  {job.status.replace("-", " ")}
                </span>
              </div>
              <p className="text-sm text-gray-600">{job.client}</p>
              <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{job.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Clock className="w-4 h-4" />
                <span>{job.time}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(job.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm font-medium">{job.rating}</span>
              </div>
              <span className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${getPriorityPill(job.priority)}`}>
                {job.priority} priority
              </span>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedJob(job.id);
                    handleGetDirections(job);
                  }}
                  className="px-3 py-1.5 bg-teal-600 text-white rounded hover:bg-teal-700 text-sm flex items-center gap-1"
                >
                  Directions <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCall(job.phone);
                  }}
                  className="px-3 py-1.5 border border-gray-300 rounded text-gray-800 hover:bg-gray-100 text-sm flex items-center gap-1"
                >
                  Call <Phone className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {filteredJobs.length === 0 && (
            <div className="text-sm text-gray-500">No jobs match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
