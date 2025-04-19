import { useEffect, useState } from "react";
import { useAuth } from "../../utils/auth-context";
import { Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export default function TimeSpent() {
  const { user } = useAuth();
  const [timeData, setTimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchTimeData = async () => {
      if (user) {
        try {
          // Simulating API call with mock data
          // Replace with actual API call
          setTimeout(() => {
            const data = [
              { name: "Chest", value: 240, color: "#ef4444" },
              { name: "Back", value: 280, color: "#f97316" },
              { name: "Legs", value: 320, color: "#eab308" },
              { name: "Shoulders", value: 160, color: "#22c55e" },
              { name: "Arms", value: 180, color: "#3b82f6" },
            ];

            setTimeData(data);
            setTotalTime(data.reduce((acc, curr) => acc + curr.value, 0));
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Error fetching time data:", error);
          setLoading(false);
        }
      }
    };

    fetchTimeData();
  }, [user]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${mins}m`;
    } else {
      return `${mins}m`;
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded">
          <p className="text-white">{`${payload[0].name}: ${formatTime(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 h-full">
        <div className="flex items-center mb-6">
          <Clock className="h-5 w-5 text-red-500 mr-2" />
          <h2 className="text-xl font-bold text-white">Time Spent</h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading time data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-red-500 mr-2" />
          <h2 className="text-xl font-bold text-white">Time Spent</h2>
        </div>
        <div className="text-white font-medium">Total: {formatTime(totalTime)}</div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={timeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {timeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              formatter={(value) => <span className="text-gray-300">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}