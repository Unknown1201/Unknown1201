// src/components/Navbar.jsx
import React from 'react';
import { motion } from 'framer-motion'; // Import the animation engine

const Navbar = ({ cartCount, onCartClick }) => {
  return (
    <motion.nav 
      style={styles.nav} 
      className="glass-panel"
      // Animation Logic: Slide down from -50px
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="logo" style={styles.logo}>
        Devraj Sharma<span style={{color: '#666'}}>.</span>
      </div>
      
      <ul style={styles.links}>
        <li><a href="#hero" style={styles.link}>Home</a></li>
        <li><a href="#services" style={styles.link}>Services</a></li>
        
        {/* Cart Simulation */}
        <motion.li 
          style={styles.cartButton}
          whileHover={{ scale: 1.05 }} // Tiny interaction on hover
          whileTap={{ scale: 0.95 }}
          onClick={onCartClick}
        >
          Cart ({cartCount})
        </motion.li>
      </ul>
    </motion.nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    position: 'sticky',
    top: '20px',
    margin: '0 20px',
    zIndex: 100,
  },
  logo: {
    fontWeight: '700',
    fontSize: '1.2rem', // Slightly smaller, more refined
    cursor: 'pointer',
    letterSpacing: '-0.02em',
  },
  links: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    fontSize: '0.9rem',
    color: '#888',
  },
  link: {
    textDecoration: 'none',
    color: '#ccc',
    transition: 'color 0.2s',
  },
  cartButton: {
    background: '#222',
    border: '1px solid #333',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#fff',
    fontSize: '0.8rem',
  }
};

export default Navbar;