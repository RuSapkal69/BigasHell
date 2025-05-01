import { useState, useEffect } from "react"
import { Check, X, Clock } from "lucide-react"
import { useAuth } from "../utils/auth-context"
import { updateUserStats, logExercise } from "../utils/db"

const ExerciseCard = (props) => {
  const { exercise, i, workoutId, onExerciseComplete } = props
  const { user } = useAuth()
  const [setsCompleted, setSetsCompleted] = useState(0)
  const [setConfirmed, setSetConfirmed] = useState(null) // null, true, false

  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  function handleSetIncrement() {
    setSetsCompleted((setsCompleted + 1) % 4)
    setSetConfirmed(null)
  }

  const handleConfirm = async (isCorrect) => {
    if (isCorrect) {
      setSetConfirmed(true)
      setIsRunning(false) // stop the timer

      if (user) {
        try {
          // Convert timer from seconds to minutes for consistency
          const timeInMinutes = Math.ceil(timer / 60)

          // Log the completed exercise
          await logExercise(user.uid, workoutId || "current-session", {
            name: exercise.name,
            muscles: exercise.muscles,
            sets: 3, // Always 3 sets as per the UI
            reps: exercise.reps,
            unit: exercise.unit,
            time: timeInMinutes,
            completedAt: new Date(),
          })

          // Update user stats - explicitly increment by 1 exercise and 3 sets
          const statsUpdate = {
            exercisesDone: 1, // Increment by 1
            totalSets: 3, // Add 3 sets
            totalTime: timeInMinutes, // Add time spent
          }

          // Update muscle groups stats
          const muscleGroupsUpdate = {}
          exercise.muscles.forEach((muscle) => {
            muscleGroupsUpdate[muscle] = {
              sets: 3, // 3 sets per muscle
              time: timeInMinutes, // Time spent on this muscle
            }
          })

          await updateUserStats(user.uid, statsUpdate, muscleGroupsUpdate)

          console.log("Exercise completed and stats updated!")

          // Notify parent component that exercise is complete (if callback provided)
          if (onExerciseComplete) {
            onExerciseComplete({
              exercise,
              time: timeInMinutes,
              sets: 3,
            })
          }

          // Force refresh of dashboard stats by triggering a custom event
          window.dispatchEvent(new CustomEvent("exercise-completed"))
        } catch (error) {
          console.error("Error updating exercise stats:", error)
        }
      }
    } else {
      setSetsCompleted(0)
      setSetConfirmed(null)
    }
  }

  return (
    <div className="p-4 bg-slate-950 rounded-md text-white flex flex-col gap-6 overflow-auto">
      {/* Header Section */}
      <div className="flex flex-row items-center gap-x-6">
        <h4 className="text-3xl md:text-5xl font-semibold text-slate-400">0{i + 1}</h4>
        <h2 className="capitalize text-lg md:text-2xl font-medium flex-1 truncate">
          {exercise.name.replaceAll("_", " ")}
        </h2>
        <p className="capitalize text-sm text-slate-400 font-semibold">{exercise.type}</p>
      </div>

      {/* Details Section */}
      <div className="flex flex-col gap-4">
        {/* Muscle Groups and Timer in one row */}
        <div className="flex flex-row justify-between items-start gap-4">
          {/* Muscle Groups */}
          <div className="flex flex-col">
            <h3 className="text-slate-400 text-sm">Muscle Groups</h3>
            <p className="capitalize">{exercise.muscles.join(" & ")}</p>
          </div>

          {/* Timer Section */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Clock size={16} />
              <h3>Timer</h3>
            </div>
            <p className="text-lg font-medium">
              {`${Math.floor(timer / 60)
                .toString()
                .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`}
            </p>
            {setConfirmed !== true && (
              <button
                onClick={() => setIsRunning((prev) => !prev)}
                className="text-xs px-2 py-1 rounded border border-slate-700 text-white hover:bg-slate-800 duration-200"
              >
                {isRunning ? "Pause" : "Start"}
              </button>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col bg-slate-950 rounded gap-2 p-2">
          {exercise.description.split("__").map((val, idx) => (
            <div key={idx} className="text-sm">
              {val}
            </div>
          ))}
        </div>

        {/* Reps, Rest, Tempo Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["reps", "rest", "tempo"].map((info) => (
            <div key={info} className="flex flex-col items-center p-2 rounded border border-slate-900">
              <h3 className="capitalize text-sm text-slate-400">{info === "reps" ? `${exercise.unit}` : info}</h3>
              <p className="font-medium">{exercise[info]}</p>
            </div>
          ))}

          {setsCompleted < 3 && (
            <button
              onClick={handleSetIncrement}
              className="flex flex-col p-2 rounded border-[1.5px] 
                border-solid border-blue-900 hover:border-blue-600 w-full duration-200"
            >
              <h3 className="capitalize text-sm text-slate-400">sets Completed</h3>
              <p className="font-medium">{setsCompleted} / 3</p>
            </button>
          )}

          {setsCompleted === 3 && setConfirmed === null && (
            <div className="flex justify-between gap-2">
              <button
                onClick={() => handleConfirm(true)}
                className="flex-1 flex items-center justify-center gap-2 p-2 rounded border border-green-600 text-green-600 hover:bg-green-50 duration-200"
              >
                <Check size={14} /> Done
              </button>
              <button
                onClick={() => handleConfirm(false)}
                className="flex-1 flex items-center justify-center gap-2 p-2 rounded border border-red-600 text-red-600 hover:bg-red-50 duration-200"
              >
                <X size={14} /> Not Done
              </button>
            </div>
          )}

          {setConfirmed === true && (
            <div className="flex flex-col p-2 rounded border-[1.5px] border-green-700 w-full bg-green-50 text-green-700 duration-200">
              <h3 className="font-semibold capitalize text-sm">Set Completed</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExerciseCard

