import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Calendar, ChevronRight } from "lucide-react"
import { useAuth } from "../../utils/auth-context"
import { getScheduledWorkouts, hasScheduledWorkouts } from "../../utils/db"
import { formatDate } from "../../utils/date"

export default function UpcomingWorkouts() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [hasSchedule, setHasSchedule] = useState(false)

  useEffect(() => {
    fetchUpcomingWorkouts()
  }, [user])

  const fetchUpcomingWorkouts = async () => {
    if (user) {
      try {
        setLoading(true)

        // Check if user has scheduled workouts
        const hasSchedule = await hasScheduledWorkouts(user.uid)
        setHasSchedule(hasSchedule)

        if (hasSchedule) {
          // Get scheduled workouts from Firebase
          const scheduledWorkouts = await getScheduledWorkouts(user.uid)

          // Process the workouts for display
          const processedWorkouts = scheduledWorkouts.map((workout) => {
            // Get the current date
            const today = new Date()
            const currentDayIndex = today.getDay() // 0 = Sunday, 1 = Monday, etc.

            // Calculate days until this workout
            let daysUntil = workout.dayIndex - currentDayIndex
            if (daysUntil <= 0) daysUntil += 7 // If in the past, schedule for next week

            // Calculate the date for this workout
            const workoutDate = new Date(today)
            workoutDate.setDate(today.getDate() + daysUntil)

            return {
              id: workout.id,
              date: workoutDate.toISOString().split("T")[0],
              type: workout.workoutType,
              muscleGroups: workout.muscleGroups || [],
              time: workout.time,
              day: workout.day,
            }
          })

          // Sort by date
          processedWorkouts.sort((a, b) => new Date(a.date) - new Date(b.date))

          setWorkouts(processedWorkouts)
        } else {
          setWorkouts([])
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching upcoming workouts:", error)
        setWorkouts([])
        setLoading(false)
      }
    }
  }

  const handleScheduleClick = () => {
    navigate("/workout-schedule")
  }

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
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 h-full mt-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-red-500 mr-2" />
          <h2 className="text-xl font-bold text-white">Upcoming Workouts</h2>
        </div>
        <button className="text-sm text-red-500 hover:text-red-400" onClick={handleScheduleClick}>
          {hasSchedule ? "Edit Schedule" : "Schedule"}
        </button>
      </div>

      {workouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          {hasSchedule ? (
            <p>No upcoming workouts scheduled</p>
          ) : (
            <>
              <p className="text-center mb-4">
                Welcome to <span className="text-red-600 font-bold">HELLGYM</span>!
              </p>
              <p className="text-center mb-6">Make sure to schedule your workouts day-wise with proper timing.</p>
            </>
          )}
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            onClick={handleScheduleClick}
          >
            {hasSchedule ? "Edit Workout Schedule" : "Schedule Workouts"}
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
                  <p className="text-white font-medium">
                    {workout.day} - {workout.type}
                  </p>
                  <div className="flex items-center mt-1">
                    <p className="text-gray-400 text-sm">{formatDate(workout.date)}</p>
                    <span className="mx-2 text-gray-600">•</span>
                    <p className="text-gray-400 text-sm">{workout.time}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {workout.muscleGroups && workout.muscleGroups.length > 0 && (
                  <div className="flex mr-4">
                    {workout.muscleGroups.slice(0, 3).map((muscle, idx) => (
                      <span key={idx} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded mr-1">
                        {muscle}
                      </span>
                    ))}
                    {workout.muscleGroups.length > 3 && (
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                        +{workout.muscleGroups.length - 3}
                      </span>
                    )}
                  </div>
                )}
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
