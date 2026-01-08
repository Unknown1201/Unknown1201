// src/components/TechStack.jsx
import React from 'react';
import { motion } from 'framer-motion';

const technologies = [
  "React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", 
  "MongoDB", "PostgreSQL", "Framer Motion", "Git", "AWS", 
  "Docker", "Figma", "Redux", "GraphQL"
];

const TechStack = () => {
  return (
    <section style={styles.section}>
      <div style={styles.overlayLeft}></div>
      <div style={styles.overlayRight}></div>
      
      <div style={styles.trackContainer}>
        <motion.div 
          style={styles.track}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 25, 
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {/* Double the list for seamless looping */}
          {[...technologies, ...technologies].map((tech, index) => (
            <div key={index} style={styles.item}>
              <span style={styles.text}>{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    position: 'relative',
    padding: '2rem 0',
    overflow: 'hidden',
    background: '#000',
    borderTop: '1px solid #222',
    borderBottom: '1px solid #222',
  },
  trackContainer: {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  track: {
    display: 'inline-flex',
    gap: '3rem',
    whiteSpace: 'nowrap',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  text: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#444', // Darker initially
    fontFamily: 'Inter, sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    cursor: 'default',
    transition: 'color 0.3s ease',
  },
  // Fade masks for the edges
  overlayLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '100px',
    background: 'linear-gradient(90deg, #000 0%, transparent 100%)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  overlayRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '100px',
    background: 'linear-gradient(-90deg, #000 0%, transparent 100%)',
    zIndex: 2,
    pointerEvents: 'none',
  },
};

export default TechStack;
