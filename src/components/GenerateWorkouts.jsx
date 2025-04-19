"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../utils/auth-context"
import { getUser } from "../utils/db"
import NavBar from "./NavBar"
import { motion } from "framer-motion"
import Generator from "./Generator"
import Workout from "./Workout"
import { generateWorkout } from "../utils/functions"

export default function GenerateWorkouts() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [userData, setUserData] = useState(null)
  const [workout, setWorkout] = useState(null)
  const [poison, setPoison] = useState("individual")
  const [muscles, setMuscles] = useState([])
  const [goals, setGoals] = useState("strength_power")
  const [userChecked, setUserChecked] = useState(false)

  useEffect(() => {
    const checkUserProfile = async () => {
      if (!loading && user) {
        try {
          const userDoc = await getUser(user.uid)

          if (!userDoc || !userDoc.profileComplete) {
            // Redirect to info page if profile is not complete
            navigate("/info")
          } else {
            setUserData(userDoc)
          }
        } catch (error) {
          console.error("Error checking user profile:", error)
        }
      } else if (!loading && !user) {
        // Redirect to sign in if not authenticated
        navigate("/auth/signin")
      }

      setUserChecked(true)
    }

    checkUserProfile()
  }, [user, loading, navigate])

  function updateWorkout() {
    if (muscles.length < 1) {
      return
    }
    const newWorkout = generateWorkout({ poison, muscles, goals })
    setWorkout(newWorkout)
    window.location.href = "#workout"
  }

  if (loading || !userChecked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  if (!user || !userData) {
    return null
  }

  const experienceLevel = {
    beginner: "just starting your fitness journey",
    intermediate: "building on your solid foundation",
    advanced: "pushing your limits to new heights",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black text-white">
      <NavBar />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-900 rounded-lg p-8 shadow-lg border border-gray-800 mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Welcome to <span className="text-red-600">HELL</span>, {userData.name}!
            </h1>

            <div className="space-y-6 text-center">
              <p className="text-xl">You're {experienceLevel[userData.experience]} and today is your day to conquer.</p>

              <p className="text-lg text-gray-300">
                Remember, {userData.name}, the pain you feel today will be the strength you feel tomorrow. Your body can
                stand almost anything. It's your mind that you have to convince.
              </p>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => (window.location.href = "#generate")}
                  className="px-8 py-4 bg-red-600 text-white text-lg font-bold rounded-lg shadow-lg shadow-red-500/50 hover:bg-red-700 hover:shadow-red-700/70 transition-all"
                >
                  CREATE YOUR WORKOUT
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <section id="generate" className="bg-gradient-to-br from-black via-blue-900 to-black">
        <Generator
          poison={poison}
          setPoison={setPoison}
          muscles={muscles}
          setMuscles={setMuscles}
          goals={goals}
          setGoals={setGoals}
          updateWorkout={updateWorkout}
        />
      </section>

      {workout && (
        <section id="workout" className="bg-gradient-to-br from-black via-blue-900 to-black">
          <Workout workout={workout} />
        </section>
      )}
    </div>
  )
}
