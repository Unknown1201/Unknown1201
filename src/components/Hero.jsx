// src/components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  // Animation settings for the parent container (The Conductor)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2, // Delay between each item
        delayChildren: 0.3
      }
    }
  };

  // Animation settings for each item (The Musicians)
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.spotlight}></div>

      <motion.div 
        style={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 style={styles.h1} variants={itemVariants}>
          <span className="glitch-text" data-text="Apna Kaam.">Apna Kaam.</span><br />
          <span style={styles.gradientText} className="glitch-text" data-text="Apna Style.">Apna Style.</span>
        </motion.h1>
        
        <motion.p style={styles.subtitle} variants={itemVariants}>
          Devraj Sharma / 17 / Full Stack Developer.
        </motion.p>

        <motion.div style={styles.buttonGroup} variants={itemVariants}>
          <motion.a 
            href="#services" 
            style={styles.primaryBtn}
            whileHover={{ scale: 1.05, backgroundColor: "#eee" }}
            whileTap={{ scale: 0.95 }}
          >
            Check Work
          </motion.a>
          
          <motion.a 
            href="#contact" 
            style={styles.secondaryBtn}
            whileHover={{ scale: 1.05, borderColor: "#666", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
          >
            Contact
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

const styles = {
  section: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  spotlight: {
    position: 'absolute',
    top: '-20%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 70%)',
    zIndex: -1,
    pointerEvents: 'none',
  },
  content: {
    zIndex: 1,
    maxWidth: '800px',
    padding: '0 20px',
  },
  h1: {
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    fontWeight: '800',
    letterSpacing: '-0.05em',
    lineHeight: '1.1',
    margin: '0 0 1.5rem 0',
  },
  gradientText: {
    background: 'linear-gradient(to right, #fff, #666)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#888',
    fontFamily: 'monospace',
    marginBottom: '3rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  primaryBtn: {
    background: '#fff',
    color: '#000',
    padding: '12px 32px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '0.9rem',
    display: 'inline-block', // Required for transform animations
  },
  secondaryBtn: {
    background: 'transparent',
    color: '#888',
    border: '1px solid #333',
    padding: '12px 32px',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '0.9rem',
    display: 'inline-block',
  }
};

export default Hero;