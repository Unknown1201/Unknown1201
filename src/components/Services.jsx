import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const servicesData = [
    {
    id: 1,
    title: "Website Next.js",
    price: 18500,
    description: "Smooth Fullsctack Website with Backend"
  },
  {
    id: 3,
    title: "Logo Design",
    price: 1500,
    description: "Minimalist & Vector based"
  },
  {
    id: 2,
    title: "Website HTML",
    price: 12000,
    description: "Smooth and Cool website with SEO"
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const Services = ({ addToCart }) => {
  const sectionStyle = {
    padding: '6rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    // Removed solid black to let the grid texture show through
    position: 'relative',
  };

  const headingStyle = {
    color: '#fff',
    fontSize: '3rem',
    marginBottom: '1rem',
    textAlign: 'center',
    fontWeight: '800',
    letterSpacing: '-0.05em',
    background: 'linear-gradient(to right, #fff, #666)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const subtitleStyle = {
    textAlign: 'center',
    color: '#666',
    marginBottom: '4rem',
    fontSize: '1.1rem',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  };

  return (
    <section id="services" style={sectionStyle}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: -1
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={headingStyle}>
          Premium Services
        </h2>
        <p style={subtitleStyle}>
          High-end digital solutions tailored for your brand. 
          Select a package to start building your legacy.
        </p>
      </motion.div>
      
      <motion.div 
        style={gridStyle}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {servicesData.map((service) => (
          <motion.div key={service.id} variants={itemVariants} style={{ height: '100%' }}>
            <ProductCard 
              title={service.title}
              price={service.price}
              description={service.description}
              onAdd={() => addToCart(service)}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;
