import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../utils/auth-context"
import { getUser } from "../utils/db"

export default function ProtectedRoute({ children, requireProfile = true }) {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (!loading) {
        if (!user) {
          // Redirect to login if not authenticated
          navigate("/auth/signin")
        } else if (requireProfile) {
          // Check if profile is complete when required
          try {
            const userData = await getUser(user.uid)
            if (!userData || !userData.profileComplete) {
              navigate("/info")
            }
          } catch (error) {
            console.error("Error checking user profile:", error)
          }
        }
        setIsChecking(false)
      }
    }

    checkAuth()
  }, [user, loading, navigate, requireProfile])

  if (loading || isChecking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  return children
}
