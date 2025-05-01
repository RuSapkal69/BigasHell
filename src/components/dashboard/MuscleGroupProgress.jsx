import { useEffect, useState } from "react"
import { useAuth } from "../../utils/auth-context"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Activity } from "lucide-react"
import { getUserStats } from "../../utils/db"

export default function MuscleGroupProgress() {
  const { user } = useAuth()
  const [muscleData, setMuscleData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchMuscleData = async () => {
    if (user) {
      try {
        setLoading(true)
        // Get actual user stats from Firebase
        const userStats = await getUserStats(user.uid)

        if (userStats && userStats.muscleGroups) {
          // Convert muscleGroups object to array format needed for chart
          const muscleGroupsData = Object.entries(userStats.muscleGroups).map(([name, data]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize muscle name
            sets: data.sets || 0,
            color: getColorForMuscle(name),
          }))

          setMuscleData(muscleGroupsData)
        } else {
          // Empty array for new users
          setMuscleData([])
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching muscle data:", error)
        setMuscleData([])
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchMuscleData()

    // Listen for exercise completion events to refresh stats
    const handleExerciseCompleted = () => {
      fetchMuscleData()
    }

    window.addEventListener("exercise-completed", handleExerciseCompleted)

    return () => {
      window.removeEventListener("exercise-completed", handleExerciseCompleted)
    }
  }, [user])

  const getColorForMuscle = (muscleName) => {
    const colorMap = {
      chest: "#ef4444",
      back: "#f97316",
      legs: "#eab308",
      shoulders: "#22c55e",
      arms: "#3b82f6",
      biceps: "#3b82f6",
      triceps: "#8b5cf6",
      quads: "#eab308",
      hamstrings: "#f59e0b",
      calves: "#d97706",
      glutes: "#dc2626",
      abs: "#a855f7",
      core: "#a855f7",
      // Add more muscles as needed
    }

    return colorMap[muscleName.toLowerCase()] || "#6b7280" // Default gray color
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded">
          <p className="text-white">{`${payload[0].name}: ${payload[0].value} sets`}</p>
        </div>
      )
    }
    return null
  }

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
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 h-full">
      <div className="flex items-center mb-6">
        <Activity className="h-5 w-5 text-red-500 mr-2" />
        <h2 className="text-xl font-bold text-white">Muscle Group Progress</h2>
      </div>

      {muscleData.length > 0 ? (
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
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <p>No muscle group data yet</p>
          <p className="mt-2 text-sm text-center">
            Complete workouts to see your progress across different muscle groups
          </p>
          <a
            href="/generate-workouts"
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Generate a Workout
          </a>
        </div>
      )}
    </div>
  )
}
