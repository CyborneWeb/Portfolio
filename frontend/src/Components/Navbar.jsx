import React, { useState } from "react";
import { FaBars, FaTimes, FaHome, FaUser, FaProjectDiagram, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Array of nav items with icons
const navItems = [
  { name: "Home", href: "#home", icon: <FaHome className="inline mr-2" /> },
  { name: "About", href: "#about", icon: <FaUser className="inline mr-2" /> },
  { name: "Projects", href: "#projects", icon: <FaProjectDiagram className="inline mr-2" /> },
  { name: "Contact", href: "#contact", icon: <FaEnvelope className="inline mr-2" /> },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          {/* Centered Nav Items */}
          <div className="flex flex-1 justify-center items-center">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="mx-4 text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 font-medium transition-colors flex items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                {item.name}
              </motion.a>
            ))}
          </div>
          {/* Hamburger Button */}
          <div className="md:hidden flex items-center absolute right-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-900 dark:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
          >
            <div className="flex flex-col items-center py-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-full text-center py-2 text-gray-900 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400 font-medium transition-colors flex items-center justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
