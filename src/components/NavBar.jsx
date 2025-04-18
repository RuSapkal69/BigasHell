import React, { useState } from 'react';
import { Home, Dumbbell, MessageCircle, User, Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className='w-full py-5 sm:px-10 px-5 relative z-20'>
      <nav className='flex w-full items-center justify-between max-w-7xl mx-auto'>
        {/* Logo */}
        <div className="text-white font-bold text-xl">
          <span className="text-red-600">HELL</span>GYM
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center justify-center space-x-8'>
          <NavItem href="#home" icon={<Home size={18} />} text="Home" />
          <NavItem href="#generate" icon={<Dumbbell size={18} />} text="Setup" />
          <NavItem href="#workout" icon={<Dumbbell size={18} />} text="Workout" />
          <NavItem href="#footer" icon={<MessageCircle size={18} />} text="Contact" />
          <NavItem href="signup" icon={<User size={18} />} text="Sign In/Sign Up" />
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-black bg-opacity-95 border-t border-gray-800 z-50">
          <div className="flex flex-col py-4">
            <MobileNavItem href="#home" icon={<Home size={18} />} text="Home" onClick={toggleMenu} />
            <MobileNavItem href="#generate" icon={<Dumbbell size={18} />} text="Setup" onClick={toggleMenu} />
            <MobileNavItem href="#workout" icon={<Dumbbell size={18} />} text="Workout" onClick={toggleMenu} />
            <MobileNavItem href="#footer" icon={<MessageCircle size={18} />} text="Contact" onClick={toggleMenu} />
            <MobileNavItem href="signup" icon={<User size={18} />} text="Sign In/Sign Up" onClick={toggleMenu} />
          </div>
        </div>
      )}
    </header>
  );
};

// Navigation Item Component for Desktop
const NavItem = ({ href, icon, text }) => {
  return (
    <a 
      href={href} 
      className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-300"
    >
      <span>{icon}</span>
      <span>{text}</span>
    </a>
  );
};

// Navigation Item Component for Mobile
const MobileNavItem = ({ href, icon, text, onClick }) => {
  return (
    <a 
      href={href} 
      className="flex items-center space-x-2 px-6 py-3 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-300"
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </a>
  );
};

export default NavBar;