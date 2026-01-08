// src/App.jsx
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Loader from './components/Loader';
import './index.css';

const ConstructionRibbon = () => (
  <div style={{
    position: 'fixed',
    top: '30px',
    right: '-30px',
    background: '#eab308', // Warning yellow
    color: '#000',
    padding: '5px 40px',
    transform: 'rotate(45deg)',
    zIndex: 9999,
    fontWeight: '800',
    fontSize: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
    letterSpacing: '2px',
    pointerEvents: 'none',
    textTransform: 'uppercase',
    border: '1px solid #000'
  }}>
    Work in Progress
  </div>
);

const StatusBadge = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: 'rgba(0,0,0,0.8)',
      border: '1px solid #333',
      borderRadius: '9999px',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      zIndex: 100,
      backdropFilter: 'blur(5px)',
    }}>
      <motion.div
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#00ff00',
          borderRadius: '50%',
        }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#666',
      }}>
        v0.2 (beta) // Building in Public
      </span>
    </div>
  );
};

function App() {
  // "Stealth" Backend: Managing Cart State locally
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    console.log(`Added ${product.title} to cart`);
    setIsCartOpen(true); // Optional: Open cart when adding
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <Intro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="app-container">
          {/* Mesh Gradient Background */}
          <div className="mesh-gradient mesh-gradient-1"></div>
          <div className="mesh-gradient mesh-gradient-2"></div>
          <div className="mesh-gradient mesh-gradient-3"></div>
          
          {/* Pass cart length to Navbar so the icon updates 
            automatically. This is "State Lifting." 
          */}
          <Navbar 
            cartCount={cart.length} 
            onCartClick={() => setIsCartOpen(true)}
          />
          
          <main>
            <Hero />
            <TechStack />
            <Projects />
            <Services addToCart={handleAddToCart} />
            <Testimonials />
            <Contact />
          </main>
          
          <AnimatePresence>
            {isCartOpen && (
              <Cart 
                cartItems={cart} 
                onClose={() => setIsCartOpen(false)} 
              />
            )}
          </AnimatePresence>
          
          <StatusBadge />

          <Footer />
        </div>
      )}
    </>
  );
}

export default App;