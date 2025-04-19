import { useState } from "react";
import { Home, Dumbbell, MessageCircle, User, Menu, X, LayoutDashboard } from "lucide-react";
import { useAuth } from "../utils/auth-context";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full py-5 sm:px-10 px-5 relative z-20">
      <nav className="flex w-full items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <span className="text-red-600">HELL</span>GYM
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          <NavItem to="/#home" icon={<Home size={18} />} text="Home" />
          <NavItem to="/#generate" icon={<Dumbbell size={18} />} text="Setup" />
          <NavItem to="/#workout" icon={<Dumbbell size={18} />} text="Workout" />
          <NavItem to="/#footer" icon={<MessageCircle size={18} />} text="Contact" />
          {user ? (
            <NavItem to="/dashboard" icon={<LayoutDashboard size={18} />} text="Dashboard" />
          ) : (
            <NavItem to="/auth/signin" icon={<User size={18} />} text="Sign In/Sign Up" />
          )}
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
            <MobileNavItem to="/#home" icon={<Home size={18} />} text="Home" onClick={toggleMenu} />
            <MobileNavItem to="/#generate" icon={<Dumbbell size={18} />} text="Setup" onClick={toggleMenu} />
            <MobileNavItem to="/#workout" icon={<Dumbbell size={18} />} text="Workout" onClick={toggleMenu} />
            <MobileNavItem to="/#footer" icon={<MessageCircle size={18} />} text="Contact" onClick={toggleMenu} />
            {user ? (
              <MobileNavItem
                to="/dashboard"
                icon={<LayoutDashboard size={18} />}
                text="Dashboard"
                onClick={toggleMenu}
              />
            ) : (
              <MobileNavItem
                to="/auth/signin"
                icon={<User size={18} />}
                text="Sign In/Sign Up"
                onClick={toggleMenu}
              />
            )}
          </div>
        </div>
      )}
    </header>
  );
};

// Navigation Item Component for Desktop
const NavItem = ({ to, icon, text }) => {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-300"
    >
      <span>{icon}</span>
      <span>{text}</span>
    </Link>
  );
};

// Navigation Item Component for Mobile
const MobileNavItem = ({ to, icon, text, onClick }) => {
  return (
    <Link
      to={to}
      className="flex items-center space-x-2 px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-300"
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </Link>
  );
};

export default NavBar;