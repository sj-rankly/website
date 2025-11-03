"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function FramerExample() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="p-8 space-y-6">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold text-black"
      >
        Framer Motion Examples
      </motion.h2>

      {/* Basic Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-gray-100 rounded-lg"
      >
        <p>This box animates in on mount</p>
      </motion.div>

      {/* Hover Animation */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        className="p-4 bg-blue-100 rounded-lg cursor-pointer"
      >
        <p>Hover and click me!</p>
      </motion.div>

      {/* Conditional Animation */}
      <motion.button
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
      >
        Toggle Animation
      </motion.button>

      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 bg-green-100 rounded-lg"
        >
          <p>This content animates in and out!</p>
        </motion.div>
      )}

      {/* Stagger Animation */}
      <div className="space-y-2">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: item * 0.1 }}
            className="p-2 bg-gray-50 rounded"
          >
            Staggered item {item}
          </motion.div>
        ))}
      </div>

      {/* Path Animation */}
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2 }}
        className="w-32 h-32"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="black"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
