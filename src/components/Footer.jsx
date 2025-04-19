import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full py-12 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo and Description */}
        <div className="space-y-4">
          <div className="text-2xl font-bold">
            <span className="text-red-600">HELL</span>GYM
          </div>
          <p className="text-gray-400 max-w-xs">
            We hereby assure that whoever goes through our TORTURES and becomes a member of our HELL will achieve the
            body they have always dreamt of.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#generate" className="text-gray-400 hover:text-white transition-colors">
                Setup
              </a>
            </li>
            <li>
              <a href="#workout" className="text-gray-400 hover:text-white transition-colors">
                Workout
              </a>
            </li>
            <li>
              <a href="/auth/signin" className="text-gray-400 hover:text-white transition-colors">
                Sign In
              </a>
            </li>
            <li>
              <a href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                Dashboard
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <Mail size={16} className="text-red-600" />
              <span className="text-gray-400">info@hellgym.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={16} className="text-red-600" />
              <span className="text-gray-400">+1 (555) 123-4567</span>
            </li>
            <li className="text-gray-400">
              123 Inferno Street
              <br />
              Hades City, HE 66666
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} HELLGYM. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
