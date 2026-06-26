import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, HardHat, ShieldCheck, Factory, Settings } from 'lucide-react';
import './index.css';

// 3D Massive Wireframe Skyscraper Structure
function WireframeBuilding() {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1; // Slow, heavy rotation
    }
  });

  // Create a tower structure using boxes and edges
  const levels = 8;
  const size = 3;
  const height = 1.5;

  const floors = [];
  for (let i = 0; i < levels; i++) {
    // Tapering structure
    const currentSize = size - (i * 0.15);
    floors.push(
      <mesh key={i} position={[0, i * height, 0]}>
        <boxGeometry args={[currentSize, height, currentSize]} />
        <meshBasicMaterial transparent opacity={0.05} color="#374151" />
        <Edges 
          linewidth={2} 
          threshold={15} // Render all edges
          color="#f59e0b" // Safety Golden Yellow
        />
      </mesh>
    );
  }

  const bracing = [];
  for(let i=0; i < levels -1; i++) {
     const currentSize = size - (i * 0.15);
     bracing.push(
        <mesh key={`brace-${i}`} position={[0, i*height + height/2, 0]} rotation={[0, Math.PI/4, 0]}>
             <cylinderGeometry args={[0.02, 0.02, currentSize*1.4, 4]} />
             <meshBasicMaterial color="#f59e0b" />
        </mesh>
     )
  }

  return (
    <group ref={groupRef} position={[0, -5, 0]}>
      {floors}
      {bracing}
    </group>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <img src="./logo.png" alt="HMSOFT E&C" onError={(e) => e.target.style.display='none'} />
          HMSOFT E&C
        </div>
        <nav className="nav-links">
          <a href="#about">Corporate Info</a>
          <a href="#projects">Mega Projects</a>
          <a href="#safety">Safety & ESG</a>
          <a href="#careers">Careers</a>
        </nav>
        <button className="btn-primary">Project Inquiry</button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-3d-bg">
        <Canvas camera={{ position: [5, 2, 10], fov: 60 }}>
          <ambientLight intensity={1} />
          <WireframeBuilding />
        </Canvas>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-content-inner">
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            HMSOFT ENGINEERING & CONSTRUCTION
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building the <br /><span className="highlight-text">Foundation</span> of Tomorrow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Delivering hyper-scale industrial infrastructure, state-of-the-art data centers, and sustainable civil engineering solutions across the globe.
          </motion.p>
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#projects" className="btn-primary">View Portfolio <ArrowRight size={20} /></a>
            <a href="#safety" className="btn-outline">Safety Standards</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MegaProjects() {
  const projects = [
    {
      category: "Infrastructure",
      title: "Global Logistics Hub, Busan",
      desc: "A massive 500,000 sqm automated port facility designed to handle 10 million TEU annually with zero-emission smart cranes.",
      image: "./project1.png"
    },
    {
      category: "Industrial IT",
      title: "Hyper-Scale Data Center Alpha",
      desc: "Tier-4 certified underground data facility featuring advanced geothermal cooling systems and military-grade structural integrity.",
      image: "./project2.png"
    }
  ];

  return (
    <section className="section-padding projects-section" id="projects">
      <div className="section-header">
        <h2>Mega Projects Portfolio</h2>
        <div className="divider"></div>
        <p>Execution at an unprecedented scale. Explore our flagship developments shaping the industrial landscape.</p>
      </div>
      
      <div className="projects-grid">
        {projects.map((proj, idx) => (
          <motion.div 
            key={idx} 
            className="project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
          >
            <div className="project-image-placeholder">
               <img src={proj.image} alt={proj.title} className="project-image" />
            </div>
            <div className="project-content">
              <span className="project-category">{proj.category}</span>
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
              <a href="#" className="project-link">Project Details <ChevronRight size={16} /></a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SafetyESG() {
  return (
    <section className="section-padding safety-section" id="safety">
      <div className="safety-container">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-badge">SAFETY FIRST. ALWAYS.</div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'white', marginBottom: '1.5rem', fontFamily: 'Oswald', textTransform: 'uppercase' }}>
            Zero-Accident <br />Workplace
          </h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '600px' }}>
            At HMSOFT E&C, human life is our highest priority. We enforce rigorous safety protocols, utilizing AI-driven hazard detection and automated equipment to ensure every worker returns home safely.
          </p>
          <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'white' }}>
              <ShieldCheck color="#f59e0b" /> ISO 45001 Certified Safety Management
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: 'white' }}>
              <HardHat color="#f59e0b" /> Mandatory Digital Safety Twin Simulation
            </li>
          </ul>
        </motion.div>
        
        <motion.div 
          className="safety-stats"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="safety-stat-box">
            <h4>0</h4>
            <p>Major Incidents (2026)</p>
          </div>
          <div className="safety-stat-box">
            <h4>100%</h4>
            <p>Compliance Rate</p>
          </div>
          <div className="safety-stat-box">
            <h4>5M+</h4>
            <p>Safe Man-Hours</p>
          </div>
          <div className="safety-stat-box">
            <h4>Top 1%</h4>
            <p>ESG Rating</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col" style={{ gridColumn: 'span 2' }}>
          <div className="logo" style={{ color: 'white', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'Oswald', fontSize: '1.5rem' }}>
            HMSOFT E&C
          </div>
          <p style={{ maxWidth: '400px', marginBottom: '1.5rem' }}>
            Global leaders in heavy industry, civil engineering, and hyper-scale infrastructure development.
          </p>
          <a href="#" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Vendor Portal</a>
        </div>
        
        <div className="footer-col">
          <h4>DIVISIONS</h4>
          <ul>
            <li><a href="#">Civil Engineering</a></li>
            <li><a href="#">Plant Construction</a></li>
            <li><a href="#">Smart Architecture</a></li>
            <li><a href="#">Green Energy</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>COMPANY</h4>
          <ul>
            <li><a href="#">About HMSOFT</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div>© 2026 HMSOFT Engineering & Construction. All Rights Reserved.</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms & Conditions</a>
          <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MegaProjects />
        <SafetyESG />
      </main>
      <Footer />
    </>
  );
}

export default App;
