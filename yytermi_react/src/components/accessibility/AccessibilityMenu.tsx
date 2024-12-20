import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUniversalAccess, FaAdjust, FaTimes } from 'react-icons/fa';
import { MdKeyboardAlt } from 'react-icons/md';
import { useAccessibilityState } from './hooks/useAccessibilityState';
import { FontSizeControl } from './components/FontSizeControl';
import { ToggleControl } from './components/ToggleControl';
import './styles/accessibility.css';
import React from 'react';

export const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    fontSize,
    contrast,
    grayscale,
    keyboardMode,
    setContrast,
    setGrayscale,
    setKeyboardMode,
    adjustFontSize,
  } = useAccessibilityState();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-20 z-50 bg-primary-blue p-3 rounded-full text-white shadow-lg hover:bg-blue-600 transition-colors"
        aria-label="פתח תפריט נגישות"
      >
        <FaUniversalAccess size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed left-4 top-36 z-50 bg-white/10 backdrop-blur-lg text-white p-6 rounded-lg shadow-xl w-72"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">הגדרות נגישות</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
                aria-label="סגור תפריט נגישות"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <FontSizeControl fontSize={fontSize} onAdjust={adjustFontSize} />
              
              <ToggleControl
                icon={FaAdjust}
                label="ניגודיות גבוהה"
                isActive={contrast}
                onChange={() => setContrast(!contrast)}
              />
              
              <ToggleControl
                icon={FaAdjust}
                label="גווני אפור"
                isActive={grayscale}
                onChange={() => setGrayscale(!grayscale)}
              />
              
              <ToggleControl
                icon={MdKeyboardAlt}
                label="ניווט מקלדת"
                isActive={keyboardMode}
                onChange={() => setKeyboardMode(!keyboardMode)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};