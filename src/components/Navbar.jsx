// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ cartCount, onCartClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [navItemsPosition, setNavItemsPosition] = useState([]);
  const navRef = useRef(null);
  const containerRef = useRef(null);

  const navItems = [
    { id: 'hero', label: 'Home', ariaLabel: 'Go to Home section' },
    { id: 'projects', label: 'Projects', ariaLabel: 'View my projects' },
    { id: 'services', label: 'Services', ariaLabel: 'Explore services' },
    { id: 'testimonials', label: 'Reviews', ariaLabel: 'Read testimonials' },
    { id: 'contact', label: 'Contact', ariaLabel: 'Contact me' }
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate nav item positions for water effect
  useEffect(() => {
    const calculatePositions = () => {
      if (navRef.current) {
        const items = navRef.current.querySelectorAll('li');
        const positions = Array.from(items).map(item => {
          const rect = item.getBoundingClientRect();
          const containerRect = navRef.current.getBoundingClientRect();
          return {
            left: item.offsetLeft,
            width: item.offsetWidth,
            center: item.offsetLeft + item.offsetWidth / 2
          };
        });
        setNavItemsPosition(positions);
      }
    };

    calculatePositions();
    const resizeTimer = setTimeout(calculatePositions, 100);
    window.addEventListener('resize', calculatePositions);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', calculatePositions);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const getActiveIndex = () => navItems.findIndex(item => item.id === activeSection);
  const activeIndex = getActiveIndex();
  const activePosition = navItemsPosition[activeIndex];

  return (
    <>
      <motion.nav 
        ref={containerRef}
        style={styles.nav}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div 
          style={styles.logo} 
          onClick={() => scrollToSection('hero')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Devraj<span style={styles.logoDot}>Sharma</span>
        </motion.div>

        {/* Desktop Navigation Links */}
        <ul style={styles.links} ref={navRef}>
          {/* Animated Water Blob Background */}
          {activePosition && (
            <motion.svg
              style={styles.waterBlob}
              viewBox="0 0 300 60"
              preserveAspectRatio="none"
              initial={false}
              animate={{
                x: activePosition.left - 10
              }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 20,
                mass: 1.2
              }}
            >
              {/* Water-like wavy path */}
              <defs>
                <filter id="blur">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                </filter>
              </defs>
              <path
                d={`M 0,30 Q 0,10 ${activePosition.width / 2},10 T ${activePosition.width},30 L ${activePosition.width},60 L 0,60 Z`}
                fill="rgba(255,255,255,0.08)"
                filter="url(#blur)"
              />
              <path
                d={`M 0,32 Q 0,15 ${activePosition.width / 2},12 T ${activePosition.width},32 L ${activePosition.width},60 L 0,60 Z`}
                fill="rgba(255,255,255,0.04)"
              />
            </motion.svg>
          )}

          {/* Nav Items */}
          {navItems.map((item, index) => (
            <motion.li 
              key={item.id} 
              style={styles.navItem}
              initial={false}
              whileHover="hover"
            >
              <motion.button
                onClick={() => scrollToSection(item.id)}
                style={styles.navLink}
                animate={{
                  color: activeSection === item.id ? '#fff' : '#a1a1aa',
                  fontWeight: activeSection === item.id ? 600 : 500,
                }}
                transition={{ duration: 0.3 }}
                variants={{
                  hover: {
                    color: '#fff',
                    y: -2,
                  }
                }}
              >
                {item.label}
                
                {/* Animated underline */}
                {activeSection === item.id && (
                  <motion.div
                    style={styles.underline}
                    layoutId="activeUnderline"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            </motion.li>
          ))}
        </ul>

        {/* Right Actions */}
        <div style={styles.actions}>
          {/* Cart Button */}
          <motion.button 
            style={styles.cartButton}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCartClick}
          >
            Cart
            <span style={{ marginLeft: '0.35rem', fontWeight: '700' }}>({cartCount})</span>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button 
            style={styles.mobileToggle} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="mobile-menu-btn"
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              animate={mobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {!mobileMenuOpen ? (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              ) : (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              )}
            </motion.svg>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            style={styles.mobileMenu}
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {navItems.map((item, idx) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  ...styles.mobileLink,
                  borderLeftColor: activeSection === item.id ? '#fff' : 'rgba(255,255,255,0.1)',
                  color: activeSection === item.id ? '#fff' : '#a1a1aa',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ x: 5, color: '#fff' }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    position: 'sticky',
    top: '15px',
    margin: '0 auto',
    maxWidth: '1200px',
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
  },
  logo: {
    fontWeight: '900',
    fontSize: '1.3rem',
    cursor: 'pointer',
    letterSpacing: '-0.03em',
    color: '#fff',
    background: 'linear-gradient(135deg, #fff 0%, #e4e4e7 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    userSelect: 'none',
  },
  logoDot: {
    color: '#a1a1aa',
  },
  links: {
    display: 'flex',
    listStyle: 'none',
    gap: '0.5rem',
    alignItems: 'center',
    margin: 0,
    padding: '0.5rem',
    fontSize: '0.9rem',
    position: 'relative',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  waterBlob: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '120px',
    height: '100%',
    zIndex: 0,
    opacity: 0.6,
    filter: 'blur(1px)',
  },
  navItem: {
    position: 'relative',
    zIndex: 2,
  },
  navLink: {
    textDecoration: 'none',
    color: '#a1a1aa',
    transition: 'color 0.3s ease',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0.6rem 1.2rem',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  underline: {
    position: 'absolute',
    bottom: '0',
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #fff, #a1a1aa)',
    borderRadius: '1px',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  cartButton: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '0.65rem 1.1rem',
    borderRadius: '10px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '0.85rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },
  mobileToggle: {
    display: 'none',
    color: '#fff',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    background: 'none',
    border: 'none',
    fontWeight: 'bold',
  },
  mobileMenu: {
    position: 'fixed',
    top: '80px',
    left: '1rem',
    right: '1rem',
    backgroundColor: 'rgba(10, 10, 10, 0.9)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    zIndex: 99,
  },
  mobileLink: {
    color: '#a1a1aa',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '1rem 1.5rem',
    borderLeft: '3px solid rgba(255,255,255,0.1)',
    paddingLeft: 'calc(1.5rem - 3px)',
    display: 'block',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    borderLeftWidth: '3px',
    borderLeftStyle: 'solid',
    borderRadius: '8px',
  }
};

// Responsive styles injected
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    @media (max-width: 768px) {
      nav ul {
        display: none !important;
      }
      
      .mobile-menu-btn {
        display: flex !important;
      }
      
      nav {
        margin: 0 1rem !important;
        padding: 0.8rem 1.2rem !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Navbar;