import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ cartItems, onClose }) => {
  const drawerStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '350px',
    height: '100vh',
    backgroundColor: '#000',
    borderLeft: '1px solid #333',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    boxSizing: 'border-box',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #333',
    paddingBottom: '10px',
  };

  const titleStyle = {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0,
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1.5rem',
    cursor: 'pointer',
  };

  const listStyle = {
    flex: 1,
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #222',
    color: '#ccc',
  };

  const footerStyle = {
    marginTop: '20px',
    borderTop: '1px solid #333',
    paddingTop: '20px',
  };

  const totalStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const checkoutButtonStyle = {
    width: '100%',
    padding: '15px',
    backgroundColor: '#fff',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    alert("Order Placed!");
  };

  return (
    <motion.div
      style={drawerStyle}
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
    >
      <div style={headerStyle}>
        <h2 style={titleStyle}>Your Cart</h2>
        <button style={closeButtonStyle} onClick={onClose}>X</button>
      </div>

      <ul style={listStyle}>
        {cartItems.length === 0 ? (
          <li style={{ color: '#666', textAlign: 'center', marginTop: '20px' }}>Cart is empty</li>
        ) : (
          cartItems.map((item, index) => (
            <li key={index} style={itemStyle}>
              <span>{item.title}</span>
              <span>₹{item.price}</span>
            </li>
          ))
        )}
      </ul>

      <div style={footerStyle}>
        <div style={totalStyle}>
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>
        <button style={checkoutButtonStyle} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </motion.div>
  );
};

export default Cart;
