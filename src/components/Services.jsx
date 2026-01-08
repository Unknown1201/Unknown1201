import React from 'react';
import { motion } from 'framer-motion';

// Discount calculation helper with per-service max discount
const getDiscountedPrice = (originalPrice, maxDiscountOverride) => {
  const priceNum = typeof originalPrice === 'string' 
    ? parseInt(originalPrice.replace(/[^0-9]/g, '')) 
    : originalPrice;
  
  const maxDiscount = maxDiscountOverride || 10000;
  const fiftyPercent = priceNum * 0.5;
  const discountAmount = Math.min(fiftyPercent, maxDiscount);
  const discountPercentage = Math.round((discountAmount / priceNum) * 100);
  
  return {
    original: priceNum,
    discount: discountAmount,
    final: priceNum - discountAmount,
    percentage: discountPercentage
  };
};

const servicesData = [
  {
    id: 1,
    title: "Portfolio Website",
    price: "₹8,000",
    maxDiscount: 4000, // Max ₹4,000 off
    description: "A sleek, personal site to showcase your work. Includes animations, dark mode, and mobile responsiveness.",
    gradient: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)"
  },
  {
    id: 2,
    title: "Corporate Website",
    price: "₹20,000",
    maxDiscount: 8000, // Max ₹8,000 off
    description: "5-10 page professional website for businesses. Includes contact forms, maps, and SEO setup.",
    gradient: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)"
  },
  {
    id: 3,
    title: "E-Commerce Store",
    price: "₹45,000",
    maxDiscount: 15000, // Max ₹15,000 off
    description: "Full online store using Next.js or Shopify. Includes payment gateway, admin dashboard, and cart.",
    gradient: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)"
  },
  {
    id: 4,
    title: "Custom Web App (SaaS)",
    price: "₹65,000+",
    maxDiscount: 20000, // Max ₹20,000 off
    description: "Complex application with user login, databases, dashboards, and subscription handling.",
    gradient: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
    highlight: true
  },
  {
    id: 5,
    title: "API & Backend Dev",
    price: "₹15,000",
    maxDiscount: 6000, // Max ₹6,000 off
    description: "Robust REST or GraphQL APIs using Node.js/Python to power your mobile or web apps.",
    gradient: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)"
  },
  {
    id: 6,
    title: "Performance Upgrade",
    price: "₹5,000",
    maxDiscount: 2000, // Max ₹2,000 off
    description: "Speed up your existing site. Code minification, image optimization, and caching setup.",
    gradient: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 }
  }
};

const Services = ({ addToCart }) => {
  return (
    <section id="services" style={styles.section}>
      <motion.div 
        style={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Discount Banner */}
        <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            style={styles.discountBanner}
        >
            <span style={styles.discountBadge}>LIMITED OFFER</span>
            <span style={styles.discountText}>Get <strong>50% OFF</strong> (up to ₹10,000) on your first order! *T&C Apply</span>
        </motion.div>

        <h2 style={styles.heading}>Services / Pricing</h2>
        <p style={styles.subHeading}>Transparent pricing. No hidden fees. Premium quality.</p>
      </motion.div>

      <motion.div 
        style={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {servicesData.map((service, index) => (
          <motion.div 
            key={service.id} 
            variants={cardVariants}
            style={{
              ...styles.card,
              background: service.gradient,
              border: service.highlight ? '1px solid rgba(234, 179, 8, 0.5)' : '1px solid #222',
              // Bloom effect for highlighted item
              boxShadow: service.highlight 
                ? '0 0 30px rgba(234, 179, 8, 0.15), inset 0 0 20px rgba(234, 179, 8, 0.05)' 
                : 'none',
              zIndex: service.highlight ? 2 : 1,
            }}
            whileHover={{ 
                y: -8, 
                transition: { duration: 0.3 },
                boxShadow: service.highlight 
                    ? '0 0 50px rgba(234, 179, 8, 0.3), inset 0 0 30px rgba(234, 179, 8, 0.1)'
                    : '0 10px 30px rgba(0,0,0,0.5)',
                borderColor: service.highlight ? 'rgba(234, 179, 8, 0.8)' : '#444'
            }}
          >
            <div style={styles.cardContent}>
              <div style={styles.topRow}>
                <h3 style={styles.cardTitle}>{service.title}</h3>
                <div style={styles.priceColumn}>
                  <motion.span 
                    style={{...styles.originalPrice}}
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 0.5, y: -15 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {service.price}
                  </motion.span>
                  <motion.span 
                    style={{
                        ...styles.price, 
                        color: service.highlight ? '#fff' : '#22c55e'
                    }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    ₹{Math.floor(getDiscountedPrice(service.price, service.maxDiscount).final).toLocaleString()}
                  </motion.span>
                  <motion.span 
                    style={styles.discountBadgeSmall}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    {getDiscountedPrice(service.price, service.maxDiscount).percentage}% OFF
                  </motion.span>
                </div>
              </div>
              
              <p style={styles.description}>{service.description}</p>
              
              <motion.button 
                style={{
                    ...styles.button,
                    backgroundColor: service.highlight ? '#eab308' : 'rgba(255,255,255,0.1)',
                    color: service.highlight ? '#000' : '#fff'
                }}
                whileHover={{ scale: 1.02, backgroundColor: service.highlight ? '#facc15' : '#fff', color: '#000' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(service)}
              >
                Select Plan
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const styles = {
  section: {
    padding: '6rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '4rem',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '1rem',
  },
  subHeading: {
    color: '#888',
    fontSize: '1.1rem',
  },
  discountBanner: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '9999px',
    padding: '0.8rem 1.5rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  discountBadge: {
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '0.75rem',
    fontWeight: '800',
    padding: '2px 8px',
    borderRadius: '4px',
    letterSpacing: '0.5px',
  },
  discountText: {
    color: '#e4e4e7',
    fontSize: '0.95rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
  },
  card: {
    borderRadius: '16px',
    padding: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
    gap: '1rem',
  },
  cardTitle: {
    fontSize: '1.4rem',
    fontWeight: '700',
    color: '#fff',
    margin: 0,
    lineHeight: '1.3',
  },
  priceColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },
  originalPrice: {
    fontSize: '1rem',
    fontWeight: '400',
    color: '#666',
    textDecoration: 'line-through',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: '700',
    whiteSpace: 'nowrap',
  },
  discountBadgeSmall: {
    fontSize: '0.7rem',
    fontWeight: '800',
    color: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    padding: '2px 6px',
    borderRadius: '4px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  description: {
    color: '#a1a1aa',
    lineHeight: '1.6',
    flexGrow: 1,
    marginBottom: '2rem',
  },
  button: {
    width: '100%',
    padding: '1rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
  }
};

export default Services;
