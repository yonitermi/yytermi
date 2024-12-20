import { motion, AnimatePresence } from 'framer-motion';
import { NavLinks } from './NavLinks';
import { FaTimes } from 'react-icons/fa';
import React from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-0 z-[100] bg-gradient-to-br from-blue-900/95 to-purple-900/95"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            minHeight: '100vh',
            overflowY: 'auto'
          }}
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <div className="text-white text-xl font-bold">YYTERMI</div>
              <button
                onClick={onClose}
                className="text-white/90 hover:text-white p-2"
                aria-label="Close menu"
              >
                <FaTimes size={24} />
              </button>
            </div>
          </div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4"
          >
            <NavLinks 
              onLinkClick={onClose} 
              className="text-center space-y-8 text-2xl font-semibold"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};