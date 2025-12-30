import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ title, price, description, onAdd }) => {
  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    backdropFilter: 'blur(10px)', // Optional for glass effect enhancement
  };

  const titleStyle = {
    color: '#fff',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.2rem',
    marginBottom: '10px',
    fontWeight: '600',
  };

  const descStyle = {
    color: '#888',
    fontSize: '0.9rem',
    marginBottom: '20px',
    lineHeight: '1.5',
  };

  const priceStyle = {
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#111',
    color: '#fff',
    border: '1px solid #333',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '500',
    marginTop: 'auto',
    alignSelf: 'flex-start',
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    onAdd();
  };

  return (
    <motion.div 
      style={cardStyle}
      whileHover={{ 
        scale: 1.02,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
      }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h3 style={titleStyle}>{title}</h3>
        <p style={descStyle}>{description}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span style={priceStyle}>₹{price}</span>
        <button 
          style={buttonStyle}
          onClick={handleAddClick}
        >
          Add +
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
