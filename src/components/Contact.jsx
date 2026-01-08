// src/components/Contact.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sendContactEmail } from '../lib/emailService';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initialize EmailJS when component mounts
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/index.min.js';
    script.onload = () => {
      // EmailJS is loaded, but we've set up fallbacks in emailService.js
    };
    document.head.appendChild(script);
  }, []);

  const validate = () => {
    const newErrors = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email || !/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Send email via EmailJS or fallback
      const result = await sendContactEmail({
        name: formState.name,
        email: formState.email,
        message: formState.message,
      });
      
      if (result.success) {
        setIsSent(true);
        setSubmitMessage(result.message);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSent(false), 4000);
      } else {
        setSubmitMessage(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <section id="contact" style={styles.section}>
      <div style={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={styles.header}
        >
          <h2 style={styles.heading}>Let's Work Together</h2>
          <p style={styles.subHeading}>Have a project in mind? Let's build something ready for the future.</p>
        </motion.div>

        <div style={styles.contentGrid}>
          {/* Contact Form */}
          <motion.form 
            style={styles.form}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
          >
            <div style={styles.inputGroup}>
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                style={{
                  ...styles.input,
                  borderBottomColor: errors.name ? '#ef4444' : 'rgba(255,255,255,0.1)'
                }}
                value={formState.name}
                onChange={handleChange}
              />
              {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>
            <div style={styles.inputGroup}>
              <input 
                type="email" 
                name="email" 
                placeholder="your.email@example.com" 
                style={{
                  ...styles.input,
                  borderBottomColor: errors.email ? '#ef4444' : 'rgba(255,255,255,0.1)'
                }}
                value={formState.email}
                onChange={handleChange}
              />
              {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>
            <div style={styles.inputGroup}>
              <textarea 
                name="message" 
                placeholder="Tell me about your project..." 
                style={{
                  ...styles.input, 
                  height: '120px', 
                  resize: 'vertical',
                  borderBottomColor: errors.message ? '#ef4444' : 'rgba(255,255,255,0.1)',
                  paddingTop: '1.2rem'
                }}
                value={formState.message}
                onChange={handleChange}
              />
              {errors.message && <span style={styles.error}>{errors.message}</span>}
            </div>

            {submitMessage && (
              <motion.div
                style={{
                  ...styles.successMessage,
                  backgroundColor: isSent ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  borderColor: isSent ? '#22c55e' : '#ef4444',
                  color: isSent ? '#22c55e' : '#ef4444'
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {submitMessage}
              </motion.div>
            )}

            <motion.button 
              type="submit" 
              style={styles.button}
              whileHover={{ scale: 1.02, backgroundColor: '#fff', color: '#000' }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : isSent ? 'Sent! ✓' : 'Send Message'}
            </motion.button>
          </motion.form>

          {/* Contact Info / Socials */}
          <motion.div 
            style={styles.info}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div style={styles.infoCard}>
              <span style={styles.label}>📧 Email</span>
              <a href="mailto:idevraj.ms812@gmail.com" style={styles.link}>idevraj.ms812@gmail.com</a>
            </div>
            
            <div style={styles.infoCard}>
              <span style={styles.label}>🌐 Connect</span>
              <div style={styles.socialLinks}>
                <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" style={styles.link}>Twitter</a>
                <a href="https://github.com/yourhandle" target="_blank" rel="noopener noreferrer" style={styles.link}>GitHub</a>
                <a href="https://linkedin.com/in/yourhandle" target="_blank" rel="noopener noreferrer" style={styles.link}>LinkedIn</a>
              </div>
            </div>
            
            <div style={styles.infoCard}>
              <span style={styles.label}>📍 Location</span>
              <p style={styles.text}>India • Worldwide</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '8rem 2rem',
    background: 'transparent',
    borderTop: '1px solid rgba(255,255,255,0.05)',
    position: 'relative',
    scrollMarginTop: '100px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '4rem',
    textAlign: 'center',
  },
  heading: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: '800',
    marginBottom: '1rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #d4d4d8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-1.5px',
  },
  subHeading: {
    color: '#a1a1aa',
    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
    maxWidth: '600px',
    margin: '0 auto',
  },
  contentGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    background: 'transparent',
    padding: '0',
  },
  input: {
    width: '100%',
    padding: '1.2rem 0',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0',
    color: '#fff',
    fontSize: '1rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '1.2rem 2.5rem',
    background: '#ffffff',
    color: '#000',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(255,255,255,0.1)',
  },
  error: {
    color: '#ef4444',
    fontSize: '0.85rem',
    marginTop: '0.25rem',
    fontWeight: '500',
  },
  successMessage: {
    padding: '1.2rem',
    borderRadius: '12px',
    border: '1px solid',
    fontSize: '0.95rem',
    fontWeight: '500',
    backdropFilter: 'blur(10px)',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  info: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    justifyContent: 'center',
  },
  infoCard: {
    background: 'transparent',
    border: 'none',
    padding: '0',
    flex: '1 1 180px',
    minWidth: '180px',
    textAlign: 'center',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  label: {
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    color: '#666',
    fontWeight: '600',
    marginBottom: '0.75rem',
    display: 'block',
  },
  link: {
    color: '#e4e4e7',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '400',
    transition: 'color 0.3s ease',
    display: 'block',
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  text: {
    color: '#a1a1aa',
    fontSize: '0.95rem',
    margin: 0,
    lineHeight: '1.6',
  }
};

export default Contact;
