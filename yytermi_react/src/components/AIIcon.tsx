import { motion } from 'framer-motion';
import React from 'react';

export const AIIcon = () => {
  return (
    <motion.div
      className="w-24 h-24 border-2 border-white/30 rounded-full flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="text-3xl font-bold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        AI
      </motion.div>
    </motion.div>
  );
};