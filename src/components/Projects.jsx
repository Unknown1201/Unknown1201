// src/components/Projects.jsx
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A comprehensive analytics dashboard for online retailers with real-time data visualization.",
    tags: ["React", "Chart.js", "Node.js"],
    link: "#"
  },
  {
    id: 2,
    title: "AI Content Generator",
    description: "SaaS application leveraging OpenAI's API to help creators generate blog posts and social captions.",
    tags: ["Next.js", "OpenAI API", "Tailwind"],
    link: "#"
  },
  {
    id: 3,
    title: "Portfolio v1",
    description: "My previous portfolio work built with pure HTML/CSS emphasizing performance and SEO.",
    tags: ["HTML5", "SASS", "JavaScript"],
    link: "#"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const Projects = () => {
    return (
        <section id="projects" style={styles.section}>
            <div style={styles.header}>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={styles.heading}
                >
                    Featured Projects
                </motion.h2>
                <div style={styles.line}></div>
            </div>

            <motion.div 
                style={styles.grid}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {projects.map((project) => (
                    <motion.div 
                        key={project.id} 
                        style={styles.card}
                        variants={cardVariants}
                        whileHover={{ y: -5, borderColor: '#fff' }}
                    >
                        <div style={styles.cardHeader}>
                            <h3 style={styles.projectTitle}>{project.title}</h3>
                            <a href={project.link} style={styles.arrowLink}>↗</a>
                        </div>
                        <p style={styles.description}>{project.description}</p>
                        <div style={styles.tags}>
                            {project.tags.map((tag, index) => (
                                <span key={index} style={styles.tag}>{tag}</span>
                            ))}
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
    },
    heading: {
        fontSize: '2.5rem',
        fontWeight: '800',
        color: '#fff',
        marginBottom: '1rem',
        letterSpacing: '-1px',
    },
    line: {
        height: '1px',
        background: 'linear-gradient(90deg, #333 0%, transparent 100%)',
        width: '100%',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
    },
    card: {
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid #333',
        borderRadius: '12px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
        marginBottom: '1rem',
    },
    projectTitle: {
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#fff',
        margin: 0,
    },
    arrowLink: {
        color: '#888',
        textDecoration: 'none',
        fontSize: '1.2rem',
    },
    description: {
        color: '#888',
        lineHeight: '1.6',
        marginBottom: '2rem',
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.8rem',
        marginTop: 'auto',
    },
    tag: {
        fontSize: '0.8rem',
        color: '#cccccc',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '4px 12px',
        borderRadius: '9999px',
    }
};

export default Projects;
