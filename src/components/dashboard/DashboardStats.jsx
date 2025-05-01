import { useEffect, useState } from "react"
import { useAuth } from "../../utils/auth-context"
import { Activity, Calendar, Clock, Dumbbell } from "lucide-react"
import { getUserStats } from "../../utils/db"

export default function DashboardStats() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    numberofMusclesHitted: 0,
    exercisesDone: 0,
    totalSets: 0,
    totalTime: 0,
  })
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    if (user) {
      try {
        setLoading(true)
        // Get actual user stats from Firebase
        const userStats = await getUserStats(user.uid)

        if (userStats) {
          setStats({
            numberofMusclesHitted: userStats.numberofMusclesHitted || 0,
            exercisesDone: userStats.exercisesDone || 0,
            totalSets: userStats.totalSets || 0,
            totalTime: userStats.totalTime || 0,
          })
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching stats:", error)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchStats()

    // Listen for exercise completion events to refresh stats
    const handleExerciseCompleted = () => {
      fetchStats()
    }

    window.addEventListener("exercise-completed", handleExerciseCompleted)

    return () => {
      window.removeEventListener("exercise-completed", handleExerciseCompleted)
    }
  }, [user])

  const formatTime = (minutes) => {
    if (!minutes && minutes !== 0) return "0m"

    const days = Math.floor(minutes / (60 * 24))
    const hours = Math.floor((minutes % (60 * 24)) / 60)
    const mins = minutes % 60

    let result = ""

    if (days > 0) {
      result += `${days}d `
    }

    if (hours > 0 || days > 0) {
      result += `${hours}h `
    }

    result += `${mins}m`

    return result.trim()
  }

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
  ]

  if (loading) {
    return (
      <>
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
            <div className="animate-pulse flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-20 bg-gray-800 rounded"></div>
                <div className="h-6 w-16 bg-gray-800 rounded"></div>
              </div>
              <div className="h-12 w-12 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        ))}
      </>
    )
  }

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
  )
}
