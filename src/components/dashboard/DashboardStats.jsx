import { useEffect, useState } from "react";
import { useAuth } from "../../utils/auth-context";
import { Activity, Calendar, Clock, Dumbbell } from 'lucide-react';

export default function DashboardStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    numberofMusclesHitted: 0,
    exercisesDone: 0,
    totalSets: 0,
    totalTime: 0,
  });

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchStats = async () => {
      if (user) {
        try {
          // Simulating API call with mock data
          // Replace with actual API call
          setTimeout(() => {
            setStats({
              numberofMusclesHitted: 12,
              exercisesDone: 86,
              totalSets: 320,
              totalTime: 1080, // in minutes
            });
          }, 1000);
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      }
    };

    fetchStats();
  }, [user]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days`;
    } else {
      return `${hours} hours`;
    }
  };

  const statCards = [
    {
      title: "Muscle Groups Hitted",
      value: stats.numberofMusclesHitted,
      icon: <Activity className="h-6 w-6 text-red-500" />,
      bgColor: "bg-gray-900",
    },
    {
      title: "Exercises",
      value: stats.exercisesDone,
      icon: <Dumbbell className="h-6 w-6 text-red-500" />,
      bgColor: "bg-gray-900",
    },
    {
      title: "Total Sets",
      value: stats.totalSets,
      icon: <Calendar className="h-6 w-6 text-red-500" />,
      bgColor: "bg-gray-900",
    },
    {
      title: "Time in HELL",
      value: formatTime(stats.totalTime),
      icon: <Clock className="h-6 w-6 text-red-500" />,
      bgColor: "bg-gray-900",
    },
  ];

  return (
    <>
      {statCards.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-lg p-6 shadow-lg border border-gray-800`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
              <p className="text-white text-2xl font-bold mt-1">
                {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
              </p>
            </div>
            <div className="p-3 rounded-full bg-gray-800">{stat.icon}</div>
          </div>
        </div>
      ))}
    </>
  );
}