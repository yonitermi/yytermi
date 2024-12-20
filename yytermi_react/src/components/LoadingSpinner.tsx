import { motion } from 'framer-motion';
import React from 'react';


export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        className="w-10 h-10 border-4 border-primary-blue border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};