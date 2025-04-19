import { useEffect, useState } from "react";
import { useAuth } from "../../utils/auth-context";
import { Calendar } from 'lucide-react';

export default function WorkoutHistory() {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchWorkoutHistory = async () => {
      if (user) {
        try {
          // Simulating API call with mock data
          // Replace with actual API call
          setTimeout(() => {
            setWorkouts([
              {
                id: "1",
                date: "2023-04-15",
                type: "Push",
                duration: 65,
                exercises: 5,
                muscleGroups: ["chest", "shoulders", "triceps"],
              },
              {
                id: "2",
                date: "2023-04-13",
                type: "Pull",
                duration: 70,
                exercises: 6,
                muscleGroups: ["back", "biceps"],
              },
              {
                id: "3",
                date: "2023-04-11",
                type: "Legs",
                duration: 75,
                exercises: 7,
                muscleGroups: ["quads", "hamstrings", "calves"],
              },
              {
                id: "4",
                date: "2023-04-09",
                type: "Push",
                duration: 60,
                exercises: 5,
                muscleGroups: ["chest", "shoulders", "triceps"],
              },
              {
                id: "5",
                date: "2023-04-07",
                type: "Pull",
                duration: 65,
                exercises: 6,
                muscleGroups: ["back", "biceps"],
              },
            ]);
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error("Error fetching workout history:", error);
          setLoading(false);
        }
      }
    };

    fetchWorkoutHistory();
  }, [user]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
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
          <h2 className="text-xl font-bold text-white">Workout History</h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading workout history...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-red-500 mr-2" />
          <h2 className="text-xl font-bold text-white">Workout History</h2>
        </div>
        <button className="text-sm text-red-500 hover:text-red-400">View All</button>
      </div>
  
      <div className="space-y-4">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <div>
              <p className="text-white font-medium">{workout.type} Workout</p>
              <div className="flex items-center mt-1">
                <p className="text-gray-400 text-sm">{formatDate(workout.date)}</p>
                <span className="mx-2 text-gray-600">•</span>
                <p className="text-gray-400 text-sm">{workout.duration} min</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-white font-medium">{workout.exercises} exercises</p>
              <div className="flex mt-1">
                {workout.muscleGroups.map((muscle, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded mr-1"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
  };
