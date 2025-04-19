"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../utils/auth-context"
import { getUser, updateUser } from "../utils/db"
import NavBar from "./NavBar"
import { motion } from "framer-motion"

export default function InfoPage() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    experience: "beginner",
    profession: "",
    weight: "",
    height: "",
    medicalConditions: "",
  })
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/auth/signin")
      } else {
        // Check if user already has profile data
        const fetchUserData = async () => {
          try {
            const userData = await getUser(user.uid)
            if (userData && userData.profileComplete) {
              // If profile is already complete, redirect to dashboard
              navigate("/dashboard")
            } else if (userData) {
              // Pre-fill form with any existing data
              setFormData((prevData) => ({
                ...prevData,
                name: user.displayName || "",
                ...userData,
              }))
            } else {
              // Set name from auth if available
              setFormData((prevData) => ({
                ...prevData,
                name: user.displayName || "",
              }))
            }
          } catch (error) {
            console.error("Error fetching user data:", error)
          }
        }

        fetchUserData()
      }
    }
  }, [user, loading, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.age) errors.age = "Age is required"
    if (!formData.gender) errors.gender = "Gender is required"
    if (!formData.weight) errors.weight = "Weight is required"
    if (!formData.height) errors.height = "Height is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      await updateUser(user.uid, {
        ...formData,
        profileComplete: true,
        updatedAt: new Date(),
      })

      navigate("/dashboard")
    } catch (error) {
      console.error("Error saving user info:", error)
      alert("Failed to save your information. Please try again.")
    } finally {
      setIsSubmitting(false)
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Complete Your <span className="text-red-600">HELL</span> Profile
          </h1>

          <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
            <p className="text-gray-300 mb-6">
              We need some information about you to create the perfect workout plan for your goals. This information
              will help us tailor your experience and track your progress.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 bg-gray-800 border ${formErrors.name ? "border-red-500" : "border-gray-700"} rounded-md text-white`}
                  />
                  {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                </div>

                {/* Age */}
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min="16"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 bg-gray-800 border ${formErrors.age ? "border-red-500" : "border-gray-700"} rounded-md text-white`}
                  />
                  {formErrors.age && <p className="mt-1 text-sm text-red-500">{formErrors.age}</p>}
                </div>

                {/* Gender */}
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-300 mb-1">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 bg-gray-800 border ${formErrors.gender ? "border-red-500" : "border-gray-700"} rounded-md text-white`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.gender && <p className="mt-1 text-sm text-red-500">{formErrors.gender}</p>}
                </div>

                {/* Experience Level */}
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">
                    Gym Experience
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  >
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="advanced">Advanced (3+ years)</option>
                  </select>
                </div>

                {/* Profession */}
                <div>
                  <label htmlFor="profession" className="block text-sm font-medium text-gray-300 mb-1">
                    Profession
                  </label>
                  <input
                    type="text"
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    min="30"
                    max="300"
                    value={formData.weight}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 bg-gray-800 border ${formErrors.weight ? "border-red-500" : "border-gray-700"} rounded-md text-white`}
                  />
                  {formErrors.weight && <p className="mt-1 text-sm text-red-500">{formErrors.weight}</p>}
                </div>

                {/* Height */}
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-300 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    min="100"
                    max="250"
                    value={formData.height}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 bg-gray-800 border ${formErrors.height ? "border-red-500" : "border-gray-700"} rounded-md text-white`}
                  />
                  {formErrors.height && <p className="mt-1 text-sm text-red-500">{formErrors.height}</p>}
                </div>
              </div>

              {/* Medical Conditions */}
              <div>
                <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-300 mb-1">
                  Medical Conditions (if any)
                </label>
                <textarea
                  id="medicalConditions"
                  name="medicalConditions"
                  rows="3"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  placeholder="List any medical conditions that might affect your workout routine..."
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg shadow-red-500/50 hover:bg-red-700 hover:shadow-red-700/70 transition-all"
                >
                  {isSubmitting ? "Saving..." : "Save & Continue"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
