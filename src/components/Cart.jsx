import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendOrderEmail } from '../lib/emailService';

const Cart = ({ cartItems, onClose, isOpen }) => {
  const [step, setStep] = useState('summary'); // 'summary' | 'form' | 'success'
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', requirements: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const totalPrice = cartItems.reduce((total, item) => {
    // Handling price as string "₹8,000" -> number 8000
    const priceNum = typeof item.price === 'string' 
      ? parseInt(item.price.replace(/[^0-9]/g, '')) 
      : item.price;
    return total + priceNum;
  }, 0);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email) {
        tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) tempErrors.phone = "Phone is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Send order email via EmailJS or fallback
      const result = await sendOrderEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        requirements: formData.requirements || 'No additional requirements',
        items: cartItems,
        total: totalPrice,
      });
      
      if (result.success) {
        setSubmitMessage(result.message);
        setTimeout(() => {
          setStep('success');
        }, 800);
      } else {
        setSubmitMessage(result.message);
        setTimeout(() => {
          setStep('success');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setSubmitMessage('Order received! We will contact you shortly.');
      setTimeout(() => {
        setStep('success');
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      zIndex: 999,
    },
    drawer: {
      position: 'fixed',
      top: 0,
      right: 0,
      width: '100%',
      maxWidth: '450px',
      height: '100vh',
      background: '#0a0a0a',
      borderLeft: '1px solid #222',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-10px 0 40px rgba(0,0,0,0.5)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      borderBottom: '1px solid #222',
    },
    title: {
      fontSize: '1.2rem',
      fontWeight: '700',
      margin: 0,
      color: '#fff',
    },
    closeBtn: {
      background: 'transparent',
      border: 'none',
      color: '#fff',
      fontSize: '1.5rem',
      cursor: 'pointer',
    },
    content: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    item: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
      paddingBottom: '20px',
      borderBottom: '1px solid #222',
    },
    itemName: {
      color: '#fff',
      fontWeight: '600',
      marginBottom: '4px',
    },
    itemDesc: {
      color: '#666',
      fontSize: '0.85rem',
      maxWidth: '220px',
    },
    itemPrice: {
      color: '#fff',
      fontWeight: '600',
    },
    footer: {
      padding: '20px',
      background: '#0a0a0a',
      borderTop: '1px solid #222',
    },
    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      color: '#fff',
      fontWeight: '700',
      fontSize: '1.1rem',
      marginBottom: '20px',
    },
    actionBtn: {
      width: '100%',
      padding: '16px',
      background: '#fff',
      color: '#000',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '1rem',
      cursor: 'pointer',
      flex: 2,
    },
    secondaryBtn: {
      flex: 1,
      padding: '16px',
      background: 'transparent',
      color: '#fff',
      border: '1px solid #333',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    outlineBtn: {
      padding: '10px 20px',
      background: 'transparent',
      border: '1px solid #444',
      color: '#fff',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    emptyState: {
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      color: '#666',
      marginTop: '50%',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
    },
    label: {
      color: '#888',
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    input: {
      padding: '12px',
      background: '#111',
      border: '1px solid #333',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '1rem',
      outline: 'none',
    },
    textArea: {
      padding: '12px',
      background: '#111',
      border: '1px solid #333',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '1rem',
      outline: 'none',
      height: '80px',
      resize: 'vertical',
      fontFamily: 'inherit'
    },
    error: {
        color: '#ef4444',
        fontSize: '0.8rem',
    },
    successState: {
        textAlign: 'center',
        paddingTop: '40%',
    },
    checkIcon: {
        fontSize: '3rem',
        color: '#22c55e',
        marginBottom: '20px',
        border: '2px solid #22c55e',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    successTitle: {
        color: '#fff',
        fontSize: '1.5rem',
        marginBottom: '10px',
    }
  };

  return (
    <>
      <div style={styles.overlay} onClick={onClose} />
      <motion.div
        style={styles.drawer}
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            {step === 'summary' && 'Your Bag'}
            {step === 'form' && 'Checkout'}
            {step === 'success' && 'Done!'}
          </h2>
          <button onClick={onClose} style={styles.closeBtn}>×</button>
        </div>

        {/* CONTENT */}
        <div style={styles.content}>
          {step === 'summary' && (
            <>
              {cartItems.length === 0 ? (
                <div style={styles.emptyState}>
                  <p>Your bag is empty.</p>
                  <button onClick={onClose} style={styles.outlineBtn}>Browse Services</button>
                </div>
              ) : (
                <ul style={styles.list}>
                  {cartItems.map((item, index) => (
                    <li key={index} style={styles.item}>
                      <div>
                        <div style={styles.itemName}>{item.title}</div>
                        <div style={styles.itemDesc}>{item.description}</div>
                      </div>
                      <div style={styles.itemPrice}>{item.price}</div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {step === 'form' && (
            <form onSubmit={handleSubmit} style={styles.form}>
               <div style={styles.inputGroup}>
                 <label style={styles.label}>Full Name</label>
                 <input 
                   style={styles.input} 
                   value={formData.name}
                   name="name"
                   onChange={handleInputChange}
                   placeholder="John Doe"
                 />
                 {errors.name && <span style={styles.error}>{errors.name}</span>}
               </div>

               <div style={styles.inputGroup}>
                 <label style={styles.label}>Email Address</label>
                 <input 
                   style={styles.input} 
                   value={formData.email}
                   name="email"
                   onChange={handleInputChange}
                   placeholder="john@example.com"
                 />
                 {errors.email && <span style={styles.error}>{errors.email}</span>}
               </div>

               <div style={styles.inputGroup}>
                 <label style={styles.label}>Phone Number</label>
                 <input 
                   style={styles.input} 
                   value={formData.phone}
                   name="phone"
                   onChange={handleInputChange} 
                   placeholder="+91 99999 99999"
                   type="tel"
                 />
                 {errors.phone && <span style={styles.error}>{errors.phone}</span>}
               </div>

               <div style={styles.inputGroup}>
                 <label style={styles.label}>Project Requirements (Optional)</label>
                 <textarea 
                   style={styles.textArea} 
                   value={formData.requirements}
                   name="requirements"
                   onChange={handleInputChange}
                 />
               </div>
            </form>
          )}

          {step === 'success' && (
            <div style={styles.successState}>
              <div style={styles.checkIcon}>✓</div>
              <h3 style={styles.successTitle}>Order Recieved!</h3>
              <p style={{color: '#888', lineHeight: '1.5'}}>
                Thank you, {formData.name}. We have received your project details. 
                Our team will contact you at {formData.email} within 24 hours.
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && step !== 'success' && (
          <div style={styles.footer}>
             <div style={styles.totalRow}>
               <span>Subtotal</span>
               <span>₹{totalPrice.toLocaleString()}</span>
             </div>
             
             {step === 'summary' ? (
                <button 
                  style={styles.actionBtn} 
                  onClick={() => setStep('form')}
                >
                  Proceed to Checkout
                </button>
             ) : (
               <div style={{display: 'flex', gap: '10px'}}>
                  <button 
                  style={styles.secondaryBtn} 
                  onClick={() => setStep('summary')}
                  >
                  Back
                  </button>
                  <button 
                    style={styles.actionBtn} 
                    onClick={handleSubmit}
                  >
                    Confirm Order
                  </button>
               </div>
             )}
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Cart;
