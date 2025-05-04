"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../utils/auth-context"
import { saveWorkoutSchedule } from "../utils/db"
import NavBar from "./NavBar"
import { Calendar, Clock, Save, ArrowLeft } from "lucide-react"

export default function WorkoutSchedule() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [scheduleData, setScheduleData] = useState([
    { day: "Monday", dayIndex: 1, workoutType: "Push", time: "07:00", muscleGroups: ["chest", "shoulders", "triceps"] },
    { day: "Tuesday", dayIndex: 2, workoutType: "Pull", time: "07:00", muscleGroups: ["back", "biceps"] },
    {
      day: "Wednesday",
      dayIndex: 3,
      workoutType: "Legs",
      time: "07:00",
      muscleGroups: ["quads", "hamstrings", "calves"],
    },
    { day: "Thursday", dayIndex: 4, workoutType: "Rest", time: "07:00", muscleGroups: [] },
    {
      day: "Friday",
      dayIndex: 5,
      workoutType: "Upper",
      time: "07:00",
      muscleGroups: ["chest", "back", "shoulders", "arms"],
    },
    {
      day: "Saturday",
      dayIndex: 6,
      workoutType: "Lower",
      time: "07:00",
      muscleGroups: ["quads", "hamstrings", "calves", "glutes"],
    },
    { day: "Sunday", dayIndex: 0, workoutType: "Rest", time: "07:00", muscleGroups: [] },
  ])

  const workoutTypes = [
    { value: "Push", muscleGroups: ["chest", "shoulders", "triceps"] },
    { value: "Pull", muscleGroups: ["back", "biceps"] },
    { value: "Legs", muscleGroups: ["quads", "hamstrings", "calves"] },
    { value: "Upper", muscleGroups: ["chest", "back", "shoulders", "arms"] },
    { value: "Lower", muscleGroups: ["quads", "hamstrings", "calves", "glutes"] },
    { value: "Full Body", muscleGroups: ["chest", "back", "legs", "shoulders", "arms"] },
    { value: "Rest", muscleGroups: [] },
    { value: "Individual", muscleGroups: [] },
  ]

  const individualMuscleGroups = [
    "biceps",
    "triceps",
    "chest",
    "back",
    "shoulders",
    "quads",
    "hamstrings",
    "glutes",
    "calves",
    "abs",
  ]

  const handleWorkoutTypeChange = (index, value) => {
    const newScheduleData = [...scheduleData]

    // Find the selected workout type
    const selectedType = workoutTypes.find((type) => type.value === value)

    // Update the workout type and muscle groups
    newScheduleData[index].workoutType = value
    newScheduleData[index].muscleGroups = selectedType ? [...selectedType.muscleGroups] : []

    setScheduleData(newScheduleData)
  }

  const handleTimeChange = (index, value) => {
    const newScheduleData = [...scheduleData]
    newScheduleData[index].time = value
    setScheduleData(newScheduleData)
  }

  const handleMuscleGroupChange = (index, muscleGroup, isChecked) => {
    const newScheduleData = [...scheduleData]

    if (isChecked) {
      // Add muscle group if not already included
      if (!newScheduleData[index].muscleGroups.includes(muscleGroup)) {
        newScheduleData[index].muscleGroups.push(muscleGroup)
      }
    } else {
      // Remove muscle group
      newScheduleData[index].muscleGroups = newScheduleData[index].muscleGroups.filter((mg) => mg !== muscleGroup)
    }

    setScheduleData(newScheduleData)
  }

  const handleSaveSchedule = async () => {
    if (!user) return

    try {
      setSaving(true)

      // Save the schedule to Firebase
      await saveWorkoutSchedule(user.uid, scheduleData)

      // Navigate back to dashboard
      navigate("/dashboard")
    } catch (error) {
      console.error("Error saving workout schedule:", error)

      // Show a more specific error message
      let errorMessage = "Failed to save your workout schedule. Please try again."

      if (error.message && error.message.includes("index")) {
        errorMessage = "Database indexing issue. Please try again in a few moments or contact support."
      } else if (error.message && error.message.includes("permission")) {
        errorMessage = "You don't have permission to save workout schedules. Please sign in again."
      }

      alert(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black text-white">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-red-500 mr-2" />
              <h1 className="text-3xl font-bold">Schedule Your Workouts</h1>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-sm text-gray-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
            </button>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 mb-8">
            <p className="text-gray-300 mb-4">
              Welcome to <span className="text-red-600 font-bold">HELLGYM</span>! Plan your workout schedule for the
              week. Choose which workout type you want to do on each day and set your preferred time.
            </p>
            <p className="text-gray-300">
              This schedule will help you stay consistent and track your progress over time.
            </p>
          </div>

          <div className="space-y-6">
            {scheduleData.map((daySchedule, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
                <h2 className="text-xl font-bold mb-4">{daySchedule.day}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Workout Type</label>
                    <select
                      value={daySchedule.workoutType}
                      onChange={(e) => handleWorkoutTypeChange(index, e.target.value)}
                      className="w-full bg-gray-800 text-white rounded p-2 border border-gray-700"
                    >
                      {workoutTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      <Clock className="h-4 w-4 inline mr-1" /> Time
                    </label>
                    <input
                      type="time"
                      value={daySchedule.time}
                      onChange={(e) => handleTimeChange(index, e.target.value)}
                      className="w-full bg-gray-800 text-white rounded p-2 border border-gray-700"
                    />
                  </div>
                </div>

                {daySchedule.workoutType === "Individual" && (
                  <div className="mt-4">
                    <label className="block text-gray-400 text-sm mb-2">Select Muscle Groups</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {individualMuscleGroups.map((muscle) => (
                        <div key={muscle} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`${daySchedule.day}-${muscle}`}
                            checked={daySchedule.muscleGroups.includes(muscle)}
                            onChange={(e) => handleMuscleGroupChange(index, muscle, e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor={`${daySchedule.day}-${muscle}`} className="text-sm capitalize">
                            {muscle}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSaveSchedule}
              disabled={saving}
              className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg flex items-center hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>Saving Schedule...</>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" /> Save Workout Schedule
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
