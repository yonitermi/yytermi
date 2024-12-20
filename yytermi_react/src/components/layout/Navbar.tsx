import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/10 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white text-2xl font-bold">AITERMI</Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-12 text-right">
            <Link to="/" className="text-white hover:text-blue-300 transition">בית</Link>
            <Link to="/about" className="text-white hover:text-blue-300 transition">אודות</Link>
            <Link to="/services" className="text-white hover:text-blue-300 transition">שירותים</Link>
            <Link to="/contact" className="text-white hover:text-blue-300 transition">צור קשר</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="flex flex-col space-y-4 py-4 text-right">
                <Link to="/" className="text-white hover:text-blue-300 transition" onClick={() => setIsOpen(false)}>בית</Link>
                <Link to="/about" className="text-white hover:text-blue-300 transition" onClick={() => setIsOpen(false)}>אודות</Link>
                <Link to="/services" className="text-white hover:text-blue-300 transition" onClick={() => setIsOpen(false)}>שירותים</Link>
                <Link to="/contact" className="text-white hover:text-blue-300 transition" onClick={() => setIsOpen(false)}>צור קשר</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};