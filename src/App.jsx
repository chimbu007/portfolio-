import React, { useState, useEffect, useRef } from 'react';
import { Mail, Globe, MapPin, Send, Check, Download } from 'lucide-react';
import MarbleStatue from './components/MarbleStatue';
import ShatterStage from './components/ShatterStage';
import SkillsMatrix from './components/SkillsMatrix';
import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectsGrid from './components/ProjectsGrid';
import Contact from './components/Contact';
import AIPromptBar from './components/AIPromptBar';
import LightningMcqueen from './components/LightningMcqueen';
import ScrollReveal from './components/ScrollReveal';

// Dynamic Decelerating Stats Counter
const AnimatedCounter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1500; // ms
    const end = parseInt(value);
    if (isNaN(end)) {
      setCount(value);
      return;
    }
    const startTime = performance.now();
    const animateCount = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Cubic Out Easing
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [started, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

function App() {
  const [copied, setCopied] = useState(false);

  // Smooth scroll handler for Command Console prompts
  const handleCommand = (cmd) => {
    let targetId = '';
    if (cmd === '/skills') targetId = 'skills-section';
    if (cmd === '/projects') targetId = 'projects-section';
    if (cmd === '/contact') targetId = 'contact-section';
    if (cmd === '/about') targetId = 'about-section';

    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('chidambaramchimbu07@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app-container" style={{ background: 'var(--bg-studio)' }}>
      
      {/* --- PREMIUM LANDING HEADER BLOCK (100vh, scrolls naturally) --- */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          background: 'var(--bg-studio)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Giant Static Background Heading "CHIMBU" */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(6rem, 20vw, 24rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            color: '#000000',
            letterSpacing: '-0.05em',
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0.95
          }}
        >
          CHIMBU
        </div>

        {/* Value Proposition Subheading at the bottom of Hero */}
        <div
          style={{
            position: 'absolute',
            bottom: '7%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            textAlign: 'center',
            width: '90%',
            maxWidth: '680px'
          }}
        >
          <div style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.05rem)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
            AI-Integrated Full Stack Engineer
          </div>
          <p style={{ fontSize: 'clamp(0.9rem, 2.8vw, 1.2rem)', color: 'var(--text-secondary)', lineHeight: '1.5', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
            Building production-ready applications with modern UI and intelligent agent automation.
          </p>
        </div>

        {/* Centered Isolated Marble Statue */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 3, pointerEvents: 'none' }}>
          <MarbleStatue />
        </div>

        {/* Stack coins canvas container */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 4, pointerEvents: 'none' }}>
          <ShatterStage />
        </div>

        {/* Subtle decorative grid/dots in background */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            opacity: 0.03,
            background: 'radial-gradient(circle, #000 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none'
          }}
        />
      </section>

      {/* --- HUD HEADER NAVIGATION --- */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 99,
          background: 'rgba(255, 255, 255, 0.45)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
          transition: 'all 0.4s ease',
        }}
      >
        <div
          className="content-wrapper"
          style={{
            height: '75px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '0.05em'
            }}
          >
            <span className="logo-full">CHIMBU // PORTFOLIO</span>
            <span className="logo-short" style={{ display: 'none' }}>CHIMBU</span>
          </div>

          {/* Centered Slogan */}
          <div 
            style={{ 
              fontSize: '0.8rem', 
              fontWeight: 500, 
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.02em',
              display: 'none'
            }}
            className="desktop-slogan"
          >
            Design. Development. Intelligence.
          </div>

          {/* Action Buttons Container */}
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            {/* Download Resume */}
            <a
              href="/resume.pdf"
              download="Chimbu_Resume.pdf"
              style={{
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                background: 'var(--accent-gold)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                borderRadius: '20px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#000000',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'none';
              }}
            >
              <Download size={12} />
              <span>RESUME</span>
            </a>

            {/* Copy Email */}
            <button
              onClick={handleCopyEmail}
              className="copy-email-btn"
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(0, 0, 0, 0.03)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                borderRadius: '20px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)';
                e.currentTarget.style.background = 'rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
                e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
              }}
            >
              {copied ? (
                <>
                  <Check size={12} />
                  <span>COPIED</span>
                </>
              ) : (
                <>
                  <Mail size={12} />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* --- SCROLLABLE PORTFOLIO DETAILS ZONE (Standard Flow) --- */}
      <main 
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '2rem',
          paddingBottom: '8rem'
        }}
      >
        {/* Ambient Backlight Elements (Blurred luxury glow rings) */}
        <div className="ambient-glow" style={{ top: '5%', left: '-15%' }} />
        <div className="ambient-glow" style={{ top: '35%', right: '-15%', animationDelay: '-4s' }} />
        <div className="ambient-glow" style={{ top: '65%', left: '-20%', animationDelay: '-8s' }} />

        {/* About Intro Card (Scroll-revealed, dynamic stats count-ups) */}
        <section id="about-section" style={{ padding: '4rem 0 3rem', position: 'relative', zIndex: 1 }}>
          <div className="content-wrapper">
            <ScrollReveal>
            <div className="glass-panel about-panel" style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>
                About <span className="text-gradient">Chimbu</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2.8vw, 1.15rem)', lineHeight: '1.75', marginBottom: '2.5rem' }}>
                I am an AI-Integrated Full Stack Developer based in Chennai, India. I bridge the gap between premium frontend aesthetics, scalable backend architectures, and cognitive AI pipelines, building intelligent systems that automate operations, predict trends, and deliver high-performance user experiences.
              </p>
              <div 
                className="about-stats-grid"
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
                  gap: '1.5rem', 
                  borderTop: '1px solid rgba(0,0,0,0.06)', 
                  paddingTop: '2rem' 
                }}
              >
                <div>
                  <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: 800, color: 'var(--accent-gold)' }}>
                    <AnimatedCounter value={1} suffix="+" />
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Years Experience</div>
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: 800, color: 'var(--accent-gold)' }}>
                    <AnimatedCounter value={5} suffix="M+" />
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Token Transactions</div>
                </div>
                <div>
                  <div style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', fontWeight: 800, color: 'var(--accent-gold)' }}>
                    <AnimatedCounter value={7} suffix="+" />
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Deployed Systems</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
          </div>
        </section>

        <div className="glowing-divider" />

        {/* Interactive Skills Deck (Scroll-revealed) */}
        <section id="skills-section" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal delay={100}>
            <SkillsMatrix />
          </ScrollReveal>
        </section>

        <div className="glowing-divider" />

        {/* Dedicated Experience Timeline (Scroll-revealed) */}
        <section id="experience-section" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal delay={100}>
            <ExperienceTimeline />
          </ScrollReveal>
        </section>

        <div className="glowing-divider" />

        {/* Projects Deck (Scroll-revealed) */}
        <section id="projects-section" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal delay={100}>
            <ProjectsGrid />
          </ScrollReveal>
        </section>

        <div className="glowing-divider" />

        {/* Handshake Contact Form (Scroll-revealed) */}
        <section id="contact-section" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal delay={100}>
            <Contact />
          </ScrollReveal>
        </section>
      </main>

      {/* Floating Bottom AI Command HUD */}
      <AIPromptBar onCommandTrigger={handleCommand} />

      {/* Floating Interactive 3D Lightning McQueen Gaze Tracker */}
      <LightningMcqueen />

      {/* Responsive layout helper styles */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-slogan {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
