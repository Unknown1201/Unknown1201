// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.topSection}>
          <div style={styles.brandCol}>
            <h3 style={styles.logo}>Devraj Sharma<span style={{color: '#666'}}>.</span></h3>
            <p style={styles.tagline}>Building digital experiences that matter.</p>
          </div>
          
          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Sitemap</h4>
            <a href="#hero" style={styles.link} onClick={(e) => { e.preventDefault(); document.getElementById('hero').scrollIntoView({ behavior: 'smooth' }); }}>Home</a>
            <a href="#projects" style={styles.link} onClick={(e) => { e.preventDefault(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }); }}>Projects</a>
            <a href="#services" style={styles.link} onClick={(e) => { e.preventDefault(); document.getElementById('services').scrollIntoView({ behavior: 'smooth' }); }}>Services</a>
            <a href="#testimonials" style={styles.link} onClick={(e) => { e.preventDefault(); document.getElementById('testimonials').scrollIntoView({ behavior: 'smooth' }); }}>Reviews</a>
            <a href="#contact" style={styles.link} onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>Contact</a>
          </div>

          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Socials</h4>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" style={styles.link}>Twitter</a>
            <a href="https://github.com/yourhandle" target="_blank" rel="noopener noreferrer" style={styles.link}>GitHub</a>
            <a href="https://linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer" style={styles.link}>LinkedIn</a>
            <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" style={styles.link}>Instagram</a>
          </div>

          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Legal</h4>
            <a href="#" style={styles.link}>Privacy Policy</a>
            <a href="#" style={styles.link}>Terms of Service</a>
          </div>
        </div>

        <div style={styles.bottomSection}>
          <p style={styles.copyright}>&copy; {new Date().getFullYear()} Devraj Sharma. All rights reserved.</p>
          <div style={styles.madeWith}>
            <span>Made with</span>
            <span style={{color: '#e25555'}}>❤</span>
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#050505',
    borderTop: '1px solid #111',
    padding: '4rem 2rem 2rem',
    marginTop: 'auto',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  topSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '3rem',
    marginBottom: '4rem',
  },
  brandCol: {
    paddingRight: '2rem',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#fff',
    marginBottom: '1rem',
  },
  tagline: {
    color: '#888',
    lineHeight: '1.6',
    fontSize: '0.95rem',
  },
  colTitle: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
  },
  linksCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  link: {
    color: '#888',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.2s',
    cursor: 'pointer',
    width: 'fit-content',
    ':hover': {
      color: '#fff',
    }
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '2rem',
    borderTop: '1px solid #111',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copyright: {
    color: '#444',
    fontSize: '0.85rem',
  },
  madeWith: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#444',
    fontSize: '0.85rem',
  }
};

export default Footer;
