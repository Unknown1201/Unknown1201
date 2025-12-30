import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
  const lines = [
    "Initializing Core...",
    "Loading Vercel Engine...",
    "Compiling Glassmorphism...",
    "Welcome, To my Portfolio."
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex < lines.length) {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
      }, 800); // Adjust speed here
      return () => clearTimeout(timeout);
    } else {
      // Wait a bit after the last line before finishing
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, lines.length, onComplete]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ fontFamily: 'monospace', color: '#00ff00', fontSize: '1.2rem', textAlign: 'left' }}>
        {lines.slice(0, currentLineIndex + 1).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: '10px' }}
          >
            {`> ${line}`}
          </motion.div>
        ))}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        >
          _
        </motion.span>
      </div>
    </motion.div>
  );
};

export default Loader;
