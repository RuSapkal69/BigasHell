import { useEffect, useState } from "react"
import { useAuth } from "../../utils/auth-context"
import { Calendar } from "lucide-react"
import { getWorkoutHistoryFromSchedule } from "../../utils/db"
import { formatDate } from "../../utils/date"

export default function WorkoutHistory() {
  const { user } = useAuth()
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      if (user) {
        try {
          setLoading(true)
          // Get workout history based on schedule
          const historyWorkouts = await getWorkoutHistoryFromSchedule(user.uid)
          setWorkouts(historyWorkouts || [])
          setLoading(false)
        } catch (error) {
          console.error("Error fetching workout history:", error)
          setWorkouts([])
          setLoading(false)
        }
      }
    }

    fetchWorkoutHistory()
  }, [user])

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
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-red-500 mr-2" />
          <h2 className="text-xl font-bold text-white">Workout History</h2>
        </div>
      </div>

      {workouts.length > 0 ? (
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
                  <p className="text-gray-400 text-sm">{workout.day}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <p>No workout history yet</p>
          <p className="mt-2 text-sm text-center">Your completed workouts will appear here</p>
        </div>
      )}
    </div>
  )
}
