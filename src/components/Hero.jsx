// src/components/Hero.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    const handleMouseMove = (e) => {
      if (!isMobile) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section id="hero" style={isMobile ? mobileStyles.section : styles.section}>
      {/* Animated Background - Desktop */}
      {!isMobile && (
        <>
          <div style={styles.backgroundGradient1}></div>
          <div style={styles.backgroundGradient2}></div>
          <div style={styles.backgroundGradient3}></div>
          <motion.div 
            style={{
              ...styles.spotlight,
              left: `${mousePosition.x / 50}px`,
              top: `${mousePosition.y / 50}px`,
            }}
            animate={{
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          ></motion.div>
        </>
      )}

      {/* Mobile Simplified Background */}
      {isMobile && (
        <div style={mobileStyles.mobileBackground}></div>
      )}

      <motion.div 
        style={isMobile ? mobileStyles.content : styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Headline */}
        <motion.h1 
          style={isMobile ? mobileStyles.h1 : styles.h1}
          variants={itemVariants}
        >
          <span style={isMobile ? mobileStyles.textGradient : styles.textGradient}>
            {isMobile ? 'Build Premium' : 'Crafted Digital'}
          </span>
          <br />
          <span style={isMobile ? mobileStyles.h1Span : styles.h1Span}>
            {isMobile ? 'Web Products' : 'Experiences'}
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          style={isMobile ? mobileStyles.subtitle : styles.subtitle}
          variants={itemVariants}
        >
          {isMobile ? (
            <>
              Full-stack developer building fast, modern web apps
              <span style={{ display: 'block', marginTop: '0.5rem', color: '#888', fontSize: '0.85rem' }}>
                Next.js • React • Node.js
              </span>
            </>
          ) : (
            <>
              Transforming ideas into high-performance digital products with cutting-edge technology.
              <span style={{ display: 'block', marginTop: '0.75rem', color: '#666', fontSize: '0.95rem' }}>
                Next.js • React • Node.js • Full-stack expertise
              </span>
            </>
          )}
        </motion.p>

        {/* Stats - Mobile Simplified */}
        {isMobile ? (
          <motion.div style={mobileStyles.statsContainer} variants={itemVariants}>
            <div style={mobileStyles.statItem}>
              <div style={mobileStyles.statValue}>15+</div>
              <div style={mobileStyles.statLabel}>Projects</div>
            </div>
            <div style={mobileStyles.statItem}>
              <div style={mobileStyles.statValue}>50+</div>
              <div style={mobileStyles.statLabel}>Clients</div>
            </div>
            <div style={mobileStyles.statItem}>
              <div style={mobileStyles.statValue}>2y+</div>
              <div style={mobileStyles.statLabel}>Experience</div>
            </div>
          </motion.div>
        ) : (
          <motion.div style={styles.statsContainer} variants={itemVariants}>
            <motion.div 
              style={styles.stat3DCard}
              whileHover={{ 
                y: -15,
                rotateX: 5,
                boxShadow: '0 30px 60px rgba(255,255,255,0.15)',
              }}
            >
              <div style={styles.statGlowBorder}></div>
              <div style={styles.statContent}>
                <div style={styles.statNumber}>15+</div>
                <div style={styles.statLabel}>Projects Shipped</div>
              </div>
            </motion.div>

            <motion.div 
              style={styles.stat3DCard}
              whileHover={{ 
                y: -15,
                rotateX: 5,
                boxShadow: '0 30px 60px rgba(255,255,255,0.15)',
              }}
            >
              <div style={styles.statGlowBorder}></div>
              <div style={styles.statContent}>
                <div style={styles.statNumber}>50+</div>
                <div style={styles.statLabel}>Satisfied Clients</div>
              </div>
            </motion.div>

            <motion.div 
              style={styles.stat3DCard}
              whileHover={{ 
                y: -15,
                rotateX: 5,
                boxShadow: '0 30px 60px rgba(255,255,255,0.15)',
              }}
            >
              <div style={styles.statGlowBorder}></div>
              <div style={styles.statContent}>
                <div style={styles.statNumber}>2y+</div>
                <div style={styles.statLabel}>Industry Experience</div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div 
          style={isMobile ? mobileStyles.buttonGroup : styles.buttonGroup}
          variants={itemVariants}
        >
          <motion.a 
            href="#services"
            style={isMobile ? mobileStyles.primaryBtn : styles.premium3DBtn}
            whileTap={{ scale: 0.95 }}
          >
            Explore Work
            <span style={{ marginLeft: '0.4rem' }}>→</span>
          </motion.a>

          <motion.a 
            href="#contact"
            style={isMobile ? mobileStyles.secondaryBtn : styles.secondary3DBtn}
            whileTap={{ scale: 0.95 }}
          >
            Start Project
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        {!isMobile && (
          <motion.div 
            style={styles.scrollIndicator}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            variants={itemVariants}
          >
            <div style={styles.scrollLine}></div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

const styles = {
  section: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    padding: '2rem 1.5rem',
    perspective: '1000px',
  },
  
  backgroundGradient1: {
    position: 'absolute',
    width: '1000px',
    height: '1000px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '-300px',
    left: '-400px',
    zIndex: 0,
    pointerEvents: 'none',
    filter: 'blur(60px)',
  },
  
  backgroundGradient2: {
    position: 'absolute',
    width: '700px',
    height: '700px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    bottom: '-200px',
    right: '-250px',
    zIndex: 0,
    pointerEvents: 'none',
    filter: 'blur(50px)',
  },
  
  backgroundGradient3: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
    borderRadius: '50%',
    top: '50%',
    right: '5%',
    zIndex: 0,
    pointerEvents: 'none',
    filter: 'blur(45px)',
  },

  spotlight: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 50%)',
    zIndex: 0,
    pointerEvents: 'none',
    filter: 'blur(50px)',
    transition: 'left 0.3s ease-out, top 0.3s ease-out',
  },

  content: {
    zIndex: 1,
    maxWidth: '1000px',
    width: '100%',
  },

  h1: {
    fontSize: 'clamp(2.2rem, 8vw, 5.5rem)',
    fontWeight: '950',
    letterSpacing: '-0.04em',
    lineHeight: 1.05,
    margin: '0 0 1.5rem 0',
    color: '#fff',
  },

  textGradient: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #e4e4e7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  h1Span: {
    background: 'linear-gradient(135deg, #fff 0%, #e4e4e7 50%, #a1a1aa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
  },

  subtitle: {
    fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
    color: '#a1a1aa',
    fontWeight: '400',
    marginBottom: '3.5rem',
    lineHeight: 1.7,
    maxWidth: '750px',
    margin: '0 auto 3.5rem',
  },

  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
    maxWidth: '700px',
    margin: '0 auto 4rem',
  },

  stat3DCard: {
    position: 'relative',
    padding: '2rem 1.5rem',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '16px',
    backdropFilter: 'blur(20px)',
    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
    cursor: 'pointer',
    transformStyle: 'preserve-3d',
    perspective: '1000px',
    overflow: 'hidden',
  },

  statGlowBorder: {
    position: 'absolute',
    inset: 0,
    borderRadius: '16px',
    padding: '1px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },

  statContent: {
    position: 'relative',
    zIndex: 1,
  },

  statNumber: {
    fontSize: '2.2rem',
    fontWeight: '950',
    color: '#fff',
    marginBottom: '0.8rem',
    letterSpacing: '-0.02em',
  },

  statLabel: {
    fontSize: '0.8rem',
    color: '#666',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },

  buttonGroup: {
    display: 'flex',
    gap: '1.2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '3rem',
  },

  premium3DBtn: {
    position: 'relative',
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
    color: '#000',
    padding: '1rem 2.2rem',
    borderRadius: '12px',
    fontWeight: '800',
    fontSize: '0.95rem',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.7rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 20px 50px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },

  btnText: {
    letterSpacing: '-0.01em',
  },

  btnArrow: {
    fontSize: '1.1rem',
    fontWeight: '900',
    transition: 'transform 0.3s ease',
    display: 'inline-block',
  },

  btnGlow: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },

  secondary3DBtn: {
    position: 'relative',
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    padding: '1rem 2.2rem',
    borderRadius: '12px',
    fontWeight: '800',
    fontSize: '0.95rem',
    border: '1.5px solid rgba(255,255,255,0.15)',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.7rem',
    transition: 'all 0.4s cubic-bezier(0.23, 1, 0.320, 1)',
    backdropFilter: 'blur(10px)',
  },

  scrollIndicator: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },

  scrollLine: {
    width: '1.5px',
    height: '20px',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)',
    borderRadius: '10px',
  },
};

const mobileStyles = {
  section: {
    position: 'relative',
    minHeight: 'calc(100vh - 60px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    padding: '1rem',
  },

  mobileBackground: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)',
    zIndex: 0,
    pointerEvents: 'none',
    filter: 'blur(40px)',
  },

  content: {
    zIndex: 1,
    width: '100%',
    maxWidth: '100%',
  },

  h1: {
    fontSize: '1.6rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    lineHeight: 1.3,
    margin: '0 0 1rem 0',
    color: '#fff',
  },

  textGradient: {
    background: 'linear-gradient(135deg, #ffffff 0%, #e4e4e7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  h1Span: {
    background: 'linear-gradient(135deg, #fff 0%, #e4e4e7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  subtitle: {
    fontSize: '0.9rem',
    color: '#a1a1aa',
    fontWeight: '400',
    lineHeight: 1.5,
    marginBottom: '1.5rem',
  },

  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '0.8rem',
    marginBottom: '2rem',
    width: '100%',
  },

  statItem: {
    flex: 1,
    minWidth: 0,
  },

  statValue: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '0.2rem',
  },

  statLabel: {
    fontSize: '0.65rem',
    color: '#666',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    width: '100%',
    marginBottom: '1rem',
  },

  primaryBtn: {
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
    color: '#000',
    padding: '0.85rem 1rem',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '0.85rem',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(255,255,255,0.1)',
    width: '100%',
  },

  secondaryBtn: {
    background: 'rgba(255,255,255,0.05)',
    color: '#fff',
    padding: '0.85rem 1rem',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '0.85rem',
    border: '1px solid rgba(255,255,255,0.12)',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(8px)',
    width: '100%',
  },
};

export default Hero;