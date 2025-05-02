import { useState } from "react"
import { Home, Dumbbell, MessageCircle, User, Menu, X, LayoutDashboard, LogOut } from "lucide-react"
import { useAuth } from "../utils/auth-context"
import { Link, useNavigate } from "react-router-dom"

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <header className="w-full py-5 sm:px-10 px-5 relative z-20">
      <nav className="flex w-full items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <span className="text-red-600">HELL</span>GYM
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          <NavItem href="/" icon={<Home size={18} />} text="Home" />
          {user ? (
            <>
              <NavItem href="/generate-workouts" icon={<Dumbbell size={18} />} text="Generate Workout" />
              <NavItem href="/dashboard" icon={<LayoutDashboard size={18} />} text="Dashboard" />
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <NavItem href="/auth/signin" icon={<User size={18} />} text="Sign In/Sign Up" />
          )}
          <NavItem href="/#footer" icon={<MessageCircle size={18} />} text="Contact" />
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black bg-opacity-95 border-t border-gray-800 z-50">
          <div className="flex flex-col py-4">
            <MobileNavItem href="/" icon={<Home size={18} />} text="Home" onClick={toggleMenu} />
            {user ? (
              <>
                <MobileNavItem
                  href="/generate-workouts"
                  icon={<Dumbbell size={18} />}
                  text="Generate Workout"
                  onClick={toggleMenu}
                />
                <MobileNavItem
                  href="/dashboard"
                  icon={<LayoutDashboard size={18} />}
                  text="Dashboard"
                  onClick={toggleMenu}
                />
                <div
                  className="flex items-center space-x-2 px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-300"
                  onClick={() => {
                    handleSignOut()
                    toggleMenu()
                  }}
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </div>
              </>
            ) : (
              <MobileNavItem
                href="/auth/signin"
                icon={<User size={18} />}
                text="Sign In/Sign Up"
                onClick={toggleMenu}
              />
            )}
            <MobileNavItem href="/#footer" icon={<MessageCircle size={18} />} text="Contact" onClick={toggleMenu} />
          </div>
        </div>
      )}
    </header>
  )
}

// Navigation Item Component for Desktop
const NavItem = ({ href, icon, text }) => {
  return (
    <Link
      to={href}
      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-300"
    >
      <span>{icon}</span>
      <span>{text}</span>
    </Link>
  )
}

// Navigation Item Component for Mobile
const MobileNavItem = ({ href, icon, text, onClick }) => {
  return (
    <Link
      to={href}
      className="flex items-center space-x-2 px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-300"
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </Link>
  )
}

export default NavBar
