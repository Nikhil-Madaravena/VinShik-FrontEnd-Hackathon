import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  chartColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, chartColor }) => {
  const changeColor = isPositive ? 'text-green-600' : 'text-red-500';
  const changeIcon = isPositive ? TrendingUp : TrendingDown;
  const ChangeIcon = changeIcon;

  // Simple sparkline chart representation
  const generateSparkline = (color: string) => {
    const bars = [];
    const heights = [30, 45, 25, 60, 40, 55, 35, 70, 45, 30, 50, 65];
    
    for (let i = 0; i < 12; i++) {
      bars.push(
        <div
          key={i}
          className={`w-1 ${color} rounded-t opacity-80`}
          style={{ height: `${heights[i]}%` }}
        />
      );
    }
    return bars;
  };

  return (
    <div className="flex justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <div className="flex items-center space-x-2">
            <ChangeIcon className={`w-4 h-4 ${changeColor}`} />
            <span className={`text-sm font-medium ${changeColor}`}>{change}</span>
          </div>
        </div>
        <div className="text-3xl mt-3 font-bold text-gray-900">{value}</div>
      </div>
      <div className="flex items-end space-x-0.5 mt-8 h-12 w-16">
          {generateSparkline(chartColor)}
        </div>
    </div>
  );
};

export default MetricCard;