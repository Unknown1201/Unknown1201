// src/components/Intro.jsx
import React from 'react';
import { motion } from 'framer-motion';

const DURATION_MS = 2800;

const Intro = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => onComplete && onComplete(), DURATION_MS);
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
      {/* Glow backdrop */}
      <div style={styles.glow1} />
      <div style={styles.glow2} />
      <div style={styles.grid} />

      {/* Moving beams */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{ ...styles.beam, top: `${15 + i * 25}%` }}
          animate={{ x: ['-40%', '110%'] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
        />
      ))}

      <div style={styles.centerStage}>
        {/* Radar rings */}
        {[1, 1.4, 1.8].map((scale, idx) => (
          <motion.div
            key={scale}
            style={styles.ring}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.8, 0.25, 0], scale: [0.7, scale, scale + 0.1] }}
            transition={{ duration: 1.6 + idx * 0.1, repeat: Infinity, ease: 'easeOut', delay: idx * 0.2 }}
          />
        ))}

        {/* Central badge */}
        <motion.div
          style={styles.badge}
          initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            style={styles.badgeCore}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          />
          <div style={styles.badgeText}>DS</div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          style={styles.tagline}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Crafted Digital Experiences
        </motion.div>

        {/* Progress line */}
        <motion.div style={styles.progressTrack}>
          <motion.div
            style={styles.progressFill}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: DURATION_MS / 1000, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#050505',
    zIndex: 9999,
    overflow: 'hidden',
  },

  glow1: {
    position: 'absolute',
    width: '65vw',
    height: '65vw',
    background: 'radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(5,5,5,0) 60%)',
    top: '-20%',
    left: '-10%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },

  glow2: {
    position: 'absolute',
    width: '55vw',
    height: '55vw',
    background: 'radial-gradient(circle, rgba(180,180,200,0.12) 0%, rgba(5,5,5,0) 60%)',
    bottom: '-25%',
    right: '-5%',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },

  grid: {
    position: 'absolute',
    inset: '10%',
    border: '1px solid rgba(255,255,255,0.05)',
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
    backgroundSize: '120px 120px',
    borderRadius: '24px',
    filter: 'blur(0.5px)',
  },

  beam: {
    position: 'absolute',
    left: '-30%',
    width: '25%',
    height: '14px',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)',
    filter: 'blur(8px)',
    pointerEvents: 'none',
  },

  centerStage: {
    position: 'relative',
    zIndex: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.2rem',
    padding: '1.5rem',
    width: 'min(320px, 80vw)',
  },

  ring: {
    position: 'absolute',
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.16)',
    filter: 'blur(0.2px)',
  },

  badge: {
    position: 'relative',
    width: '120px',
    height: '120px',
    borderRadius: '28px',
    background: 'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
    border: '1px solid rgba(255,255,255,0.12)',
    boxShadow: '0 20px 80px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(14px)',
  },

  badgeCore: {
    position: 'absolute',
    inset: '14px',
    borderRadius: '18px',
    background: 'conic-gradient(from 180deg, rgba(255,255,255,0.4), rgba(255,255,255,0.05), rgba(255,255,255,0.4))',
    filter: 'blur(0.3px)',
    opacity: 0.9,
  },

  badgeText: {
    position: 'relative',
    fontWeight: 900,
    letterSpacing: '0.08em',
    fontSize: '1.25rem',
    color: '#fff',
  },

  tagline: {
    fontSize: '0.95rem',
    color: '#d6d6d6',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    fontWeight: 700,
  },

  progressTrack: {
    width: '100%',
    height: '3px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '2px',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #ffffff, #9ca3af)',
  },
};

export default Intro;
