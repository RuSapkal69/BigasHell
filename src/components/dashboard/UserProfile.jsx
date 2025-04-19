"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../../utils/auth-context"
import { User, Edit, Calendar, Dumbbell, Briefcase, Weight, Ruler, Heart } from "lucide-react"

export default function UserProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchProfile = async () => {
      if (user) {
        try {
          // Replace with actual API call to get user profile
          // For now using mock data
          setTimeout(() => {
            setProfile({
              name: "John Doe",
              age: 28,
              gender: "male",
              experience: "intermediate",
              profession: "Software Engineer",
              weight: 75,
              height: 180,
              medicalConditions: "None",
              joinDate: "2023-01-15",
            })
            setLoading(false)
          }, 1000)
        } catch (error) {
          console.error("Error fetching profile:", error)
          setLoading(false)
        }
      }
    }

    fetchProfile()
  }, [user])

  const calculateBMI = () => {
    if (!profile) return "N/A"

    const heightInMeters = profile.height / 100
    const bmi = (profile.weight / (heightInMeters * heightInMeters)).toFixed(1)

    let category = ""
    if (bmi < 18.5) category = "Underweight"
    else if (bmi < 25) category = "Normal"
    else if (bmi < 30) category = "Overweight"
    else category = "Obese"

    return `${bmi} (${category})`
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const experienceText = {
    beginner: "Beginner (0-1 years)",
    intermediate: "Intermediate (1-3 years)",
    advanced: "Advanced (3+ years)",
  }

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800 h-full">
        <div className="flex items-center mb-6">
          <User className="h-5 w-5 text-red-500 mr-2" />
          <h2 className="text-xl font-bold text-white">User Profile</h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-gray-400">Loading profile...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <User className="h-5 w-5 text-red-500 mr-2" />
          <h2 className="text-xl font-bold text-white">User Profile</h2>
        </div>
        <button className="flex items-center text-sm text-red-500 hover:text-red-400">
          <Edit className="h-4 w-4 mr-1" /> Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center mr-3">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Name</p>
              <p className="text-white font-medium">{profile.name}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center mr-3">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Age</p>
              <p className="text-white font-medium">{profile.age} years</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center mr-3">
              <Dumbbell className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Experience Level</p>
              <p className="text-white font-medium">{experienceText[profile.experience]}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center mr-3">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Profession</p>
              <p className="text-white font-medium">{profile.profession}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center mr-3">
              <Weight className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Weight</p>
              <p className="text-white font-medium">{profile.weight} kg</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center mr-3">
              <Ruler className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Height</p>
              <p className="text-white font-medium">{profile.height} cm</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center mr-3">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">BMI</p>
              <p className="text-white font-medium">{calculateBMI()}</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center mr-3">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Member Since</p>
              <p className="text-white font-medium">{formatDate(profile.joinDate)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800">
        <h3 className="text-white font-medium mb-2">Medical Conditions</h3>
        <p className="text-gray-300">{profile.medicalConditions || "None reported"}</p>
      </div>
    </div>
  )
}
