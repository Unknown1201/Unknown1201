// src/components/Intro.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Intro = ({ onComplete }) => {
  // Auto-complete after 2.5s for reliability
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      style={styles.container}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Animated Background Gradients */}
      <div style={styles.gradient1}></div>
      <div style={styles.gradient2}></div>
      <div style={styles.gradient3}></div>

      <div style={styles.content}>
        {/* Animated Logo/Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={styles.logoContainer}
        >
          <h1 style={styles.logo}>Devraj</h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
            style={styles.underline}
          ></motion.div>
        </motion.div>

        {/* Animated Lines */}
        <motion.div style={styles.linesContainer}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '100%', opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5 + i * 0.15,
                ease: "easeOut"
              }}
              style={{
                ...styles.line,
                height: `${2 - i * 0.3}px`,
                marginBottom: '8px'
              }}
            ></motion.div>
          ))}
        </motion.div>

        {/* Animated Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={styles.text}
        >
          Building Premium Digital Experiences
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          onAnimationComplete={onComplete}
          style={styles.progressBar}
        ></motion.div>
      </div>

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * 300 - 150,
            y: Math.random() * 300 - 150,
            opacity: 0
          }}
          animate={{
            x: Math.random() * 600 - 300,
            y: Math.random() * 600 - 300,
            opacity: [0.3, 0.6, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity
          }}
          style={{
            ...styles.particle,
            left: `${50 + Math.random() * 30}%`,
            top: `${30 + Math.random() * 40}%`
          }}
        ></motion.div>
      ))}
    </motion.div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#0a0a0a',
    zIndex: 9999,
    overflow: 'hidden',
  },

  gradient1: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-200px',
    left: '-200px',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },

  gradient2: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '-200px',
    right: '-200px',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },

  gradient3: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '50%',
    right: '10%',
    filter: 'blur(50px)',
    pointerEvents: 'none',
  },

  content: {
    zIndex: 10,
    textAlign: 'center',
    width: '100%',
    maxWidth: '500px',
    padding: '0 20px',
  },

  logoContainer: {
    marginBottom: '2rem',
  },

  logo: {
    fontSize: 'clamp(2.5rem, 8vw, 4rem)',
    fontWeight: '950',
    color: '#fff',
    margin: 0,
    letterSpacing: '-0.03em',
    background: 'linear-gradient(135deg, #ffffff 0%, #e4e4e7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  underline: {
    height: '3px',
    background: 'linear-gradient(90deg, transparent, #ffffff, transparent)',
    borderRadius: '2px',
    marginTop: '1rem',
  },

  linesContainer: {
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },

  line: {
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    borderRadius: '2px',
    maxWidth: '200px',
  },

  text: {
    fontSize: '1rem',
    color: '#a1a1aa',
    fontWeight: '500',
    letterSpacing: '0.5px',
    margin: '0 0 2rem 0',
    lineHeight: 1.6,
  },

  progressBar: {
    height: '2px',
    background: 'linear-gradient(90deg, #ffffff, #a1a1aa)',
    borderRadius: '1px',
    maxWidth: '100px',
    margin: '0 auto',
  },

  particle: {
    position: 'absolute',
    width: '2px',
    height: '2px',
    background: 'rgba(255,255,255,0.6)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
};

export default Intro;
