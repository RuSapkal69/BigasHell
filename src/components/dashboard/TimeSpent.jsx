"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../../utils/auth-context"
import { Clock } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { getUserStats } from "../../utils/db"

export default function TimeSpent() {
  const { user } = useAuth()
  const [timeData, setTimeData] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalTime, setTotalTime] = useState(0)

  const fetchTimeData = async () => {
    if (user) {
      try {
        setLoading(true)
        // Get actual user stats from Firebase
        const userStats = await getUserStats(user.uid)

        if (userStats && userStats.muscleGroups) {
          // Convert muscleGroups object to array format needed for chart
          const timeData = Object.entries(userStats.muscleGroups).map(([name, data]) => ({
            name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize muscle name
            value: data.time || 0,
            color: getColorForMuscle(name),
          }))

          setTimeData(timeData)
          setTotalTime(timeData.reduce((acc, curr) => acc + curr.value, 0))
        } else {
          // Empty array for new users
          setTimeData([])
          setTotalTime(0)
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching time data:", error)
        setTimeData([])
        setTotalTime(0)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchTimeData()

    // Listen for exercise completion events to refresh stats
    const handleExerciseCompleted = () => {
      fetchTimeData()
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

  const formatTime = (minutes) => {
    if (!minutes && minutes !== 0) return "0m"

    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours > 0) {
      return `${hours}h ${mins}m`
    } else {
      return `${mins}m`
    }
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded">
          <p className="text-white">{`${payload[0].name}: ${formatTime(payload[0].value)}`}</p>
        </div>
      )
    }
    return null
  }

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
    )
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

      {timeData.length > 0 ? (
        <div className="h-[14rem]">
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
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <p>No workout time data yet</p>
          <p className="mt-2 text-sm text-center">Complete workouts to see how you're spending your time in the gym</p>
        </div>
      )}
    </div>
  )
}
