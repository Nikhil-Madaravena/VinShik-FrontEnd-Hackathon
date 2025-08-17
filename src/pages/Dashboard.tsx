import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  Briefcase,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/Header";

// Reusable MetricCard
interface MetricProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  chartColor: string;
  data: { name: string; value: number }[];
}

const MetricCard: React.FC<MetricProps> = ({
  title,
  value,
  change,
  isPositive,
  chartColor,
  data,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-5 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-600">{title}</h4>
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-500" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500" />
        )}
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
      <p
        className={`text-sm ${
          isPositive ? "text-green-600" : "text-red-600"
        } font-medium`}
      >
        {change}
      </p>
      <div className="mt-3 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={chartColor} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartColor.replace("bg-", "").replace("-500", "")}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartColor.replace("bg-", "").replace("-500", "")}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              fillOpacity={0.3}
              fill={`url(#${chartColor})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Review Wilson property quote",
      due: "Due today",
      completed: false,
    },
    {
      id: 2,
      text: "Schedule material delivery",
      due: "Due tomorrow",
      completed: false,
    },
    {
      id: 3,
      text: "Client follow-up call",
      due: "Due in 2 days",
      completed: false,
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const metrics = [
    {
      title: "Active Jobs",
      value: "43.7k",
      change: "+12.2%",
      isPositive: true,
      chartColor: "#3b82f6",
      data: [
        { name: "Mon", value: 100 },
        { name: "Tue", value: 150 },
        { name: "Wed", value: 130 },
        { name: "Thu", value: 170 },
        { name: "Fri", value: 200 },
      ],
    },
    {
      title: "Jobs In Progress",
      value: "92.3k",
      change: "-31.1%",
      isPositive: false,
      chartColor: "#f97316",
      data: [
        { name: "Mon", value: 250 },
        { name: "Tue", value: 220 },
        { name: "Wed", value: 180 },
        { name: "Thu", value: 160 },
        { name: "Fri", value: 140 },
      ],
    },
    {
      title: "Finished Jobs",
      value: "66.3k",
      change: "+3.3%",
      isPositive: true,
      chartColor: "#22c55e",
      data: [
        { name: "Mon", value: 50 },
        { name: "Tue", value: 90 },
        { name: "Wed", value: 100 },
        { name: "Thu", value: 120 },
        { name: "Fri", value: 160 },
      ],
    },
    {
      title: "New Leads",
      value: "92.3k",
      change: "+31.1%",
      isPositive: true,
      chartColor: "#a855f7",
      data: [
        { name: "Mon", value: 80 },
        { name: "Tue", value: 120 },
        { name: "Wed", value: 150 },
        { name: "Thu", value: 180 },
        { name: "Fri", value: 220 },
      ],
    },
  ];

  return (
    <div className="p-8">
      <Header />

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-teal-600" /> Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  New job started: Kitchen Renovation
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Quote approved: Bathroom Remodel
                </p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Client meeting scheduled
                </p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tasks */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600" /> Upcoming Tasks
          </h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center space-x-3 p-3 border rounded-lg transition ${
                  task.completed
                    ? "bg-green-50 border-green-200"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 text-teal-600 rounded"
                />
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      task.completed ? "line-through text-gray-400" : "text-gray-900"
                    }`}
                  >
                    {task.text}
                  </p>
                  <p className="text-xs text-gray-500">{task.due}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Announcements */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-600" /> Announcements
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="p-3 bg-purple-50 rounded-lg">
              New service packages launching next week 🚀
            </li>
            <li className="p-3 bg-yellow-50 rounded-lg">
              Team meeting scheduled for Friday at 10 AM
            </li>
            <li className="p-3 bg-teal-50 rounded-lg">
              🎉 Congratulations on hitting 1,000 clients!
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
