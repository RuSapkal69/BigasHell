import { useEffect, useState } from "react";
import { useAuth } from "../../utils/auth-context";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Activity } from 'lucide-react';

export default function MuscleGroupProgress() {
  const { user } = useAuth();
  const [muscleData, setMuscleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchMuscleData = async () => {
      if (user) {
        try {
          // Simulating API call with mock data
          // Replace with actual API call
          setTimeout(() => {
            setMuscleData([
              { name: "Chest", sets: 85, color: "#ef4444" },
              { name: "Back", sets: 92, color: "#f97316" },
              { name: "Legs", sets: 78, color: "#eab308" },
              { name: "Shoulders", sets: 62, color: "#22c55e" },
              { name: "Arms", sets: 70, color: "#3b82f6" },
              { name: "Core", sets: 45, color: "#a855f7" },
            ]);
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Error fetching muscle data:", error);
          setLoading(false);
        }
      }
    };

    fetchMuscleData();
  }, [user]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded">
          <p className="text-white">{`${payload[0].name}: ${payload[0].value} sets`}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 h-full">
        <div className="flex items-center mb-6">
          <Activity className="h-5 w-5 text-red-500 mr-2" />
          <h2 className="text-xl font-bold text-white">Muscle Group Progress</h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading muscle data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 h-full">
      <div className="flex items-center mb-6">
        <Activity className="h-5 w-5 text-red-500 mr-2" />
        <h2 className="text-xl font-bold text-white">Muscle Group Progress</h2>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={muscleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#4b5563" }} />
            <YAxis tick={{ fill: "#9ca3af" }} axisLine={{ stroke: "#4b5563" }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="sets" radius={[4, 4, 0, 0]} isAnimationActive={true}>
              {muscleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}