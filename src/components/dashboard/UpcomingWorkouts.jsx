import { useEffect, useState } from "react";
import { useAuth } from "../../utils/auth-context";
import { Calendar, ChevronRight } from 'lucide-react';

export default function UpcomingWorkouts() {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchUpcomingWorkouts = async () => {
      if (user) {
        try {
          // Simulating API call with mock data
          // Replace with actual API call
          setTimeout(() => {
            setWorkouts([
              {
                id: "1",
                date: "2023-04-18",
                type: "Push",
                muscleGroups: ["chest", "shoulders", "triceps"],
                time: "07:00 AM",
              },
              {
                id: "2",
                date: "2023-04-20",
                type: "Pull",
                muscleGroups: ["back", "biceps"],
                time: "06:30 AM",
              },
              {
                id: "3",
                date: "2023-04-22",
                type: "Legs",
                muscleGroups: ["quads", "hamstrings", "calves"],
                time: "08:00 AM",
              },
            ]);
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Error fetching upcoming workouts:", error);
          setLoading(false);
        }
      }
    };

    fetchUpcomingWorkouts();
  }, [user]);

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 h-full">
        <div className="flex items-center mb-6">
          <Calendar className="h-5 w-5 text-red-500 mr-2" />
          <h2 className="text-xl font-bold text-white">Upcoming Workouts</h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading upcoming workouts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-red-500 mr-2" />
          <h2 className="text-xl font-bold text-white">Upcoming Workouts</h2>
        </div>
        <button className="text-sm text-red-500 hover:text-red-400">Schedule</button>
      </div>

      {workouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <p>No upcoming workouts scheduled</p>
          <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Schedule Workout
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-900 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white font-bold">{workout.type.substring(0, 1)}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{workout.type} Day</p>
                  <div className="flex items-center mt-1">
                    <p className="text-gray-400 text-sm">{formatDate(workout.date)}</p>
                    <span className="mx-2 text-gray-600">•</span>
                    <p className="text-gray-400 text-sm">{workout.time}</p>
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}