import React from 'react';
import { motion } from 'framer-motion';

const testimonialsData = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Founder, TechStartup Inc",
    image: "👨‍💼",
    text: "Devraj transformed our vision into reality. The portfolio website he built increased our leads by 40% in the first month!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Marketing Manager, GrowthCo",
    image: "👩‍💼",
    text: "Outstanding work! The e-commerce platform is fast, user-friendly, and has improved our conversion rate significantly.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "CEO, FinanceFlow",
    image: "👨‍💻",
    text: "Devraj's SaaS development expertise is exceptional. The dashboard he built saved us thousands in operational costs.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "Product Lead, InnovateCo",
    image: "👩‍🔬",
    text: "Amazing API integration and backend support. Devraj is reliable, communicates well, and delivers on time.",
    rating: 5,
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Director, DigitalVision",
    image: "👨‍🎨",
    text: "The performance optimization work was brilliant. Our site went from 2s to 0.5s load time. Highly recommended!",
    rating: 5,
  },
  {
    id: 6,
    name: "Zara Ali",
    role: "Founder, CreativeStudio",
    image: "👩‍🎨",
    text: "Professional, talented, and affordable. Devraj built exactly what we envisioned. Will definitely work with him again!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Detect when testimonials are visible to start slow auto-scroll
  React.useEffect(() => {
    const sectionEl = document.getElementById('testimonials');
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, []);

  // Slow auto-scroll when in view (mobile horizontal layout)
  React.useEffect(() => {
    if (!isInView || !isMobile || !scrollRef.current) return;

    let rafId;
    const speed = 0.35; // pixels per frame (~21px/sec at 60fps)

    const step = () => {
      const el = scrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 1) {
        el.scrollLeft = 0; // loop back softly
      } else {
        el.scrollLeft += speed;
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, isMobile]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  const layoutStyle = isMobile
    ? styles.horizontalList
    : {
        ...styles.grid,
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
      };

  return (
    <section id="testimonials" style={styles.section}>
      <motion.div
        style={styles.header}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={styles.title}>What Clients Say</h2>
        <p style={styles.subtitle}>
          50+ happy clients trust me with their digital products
        </p>
      </motion.div>

      <motion.div
        style={layoutStyle}
        ref={isMobile ? scrollRef : null}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {testimonialsData.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            style={styles.card}
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(234, 179, 8, 0.15)' }}
          >
            <div style={styles.ratingContainer}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} style={styles.star}>⭐</span>
              ))}
            </div>

            <p style={styles.testimonialText}>"{testimonial.text}"</p>

            <div style={styles.clientInfo}>
              <div style={styles.avatar}>{testimonial.image}</div>
              <div>
                <p style={styles.clientName}>{testimonial.name}</p>
                <p style={styles.clientRole}>{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const styles = {
  section: {
    padding: '4rem 1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
    scrollMarginTop: '100px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
  },
  title: {
    fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '0.5rem',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
    color: '#a1a1aa',
    fontWeight: '500',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2rem',
  },
  horizontalList: {
    display: 'flex',
    gap: '1rem',
    overflowX: 'auto',
    paddingBottom: '0.5rem',
    scrollSnapType: 'x mandatory',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'thin',
    paddingInline: '0.25rem',
  },
  card: {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px',
    padding: '2rem',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    cursor: 'default',
    minWidth: '280px',
    flex: '0 0 80%',
    scrollSnapAlign: 'start',
  },
  ratingContainer: {
    display: 'flex',
    gap: '0.25rem',
    marginBottom: '1rem',
  },
  star: {
    fontSize: '1.1rem',
  },
  testimonialText: {
    color: '#e0e0e0',
    fontSize: '0.95rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  clientInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  avatar: {
    fontSize: '2.5rem',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(234, 179, 8, 0.2)',
    borderRadius: '50%',
    border: '2px solid rgba(234, 179, 8, 0.5)',
  },
  clientName: {
    fontWeight: '700',
    fontSize: '0.95rem',
    color: '#fff',
    margin: '0 0 0.25rem 0',
  },
  clientRole: {
    fontSize: '0.8rem',
    color: '#888',
    margin: '0',
  },
};

export default Testimonials;
