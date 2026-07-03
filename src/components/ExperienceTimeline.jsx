import React from 'react';
import { Calendar, Briefcase, Award, Zap } from 'lucide-react';
import TiltCard from './TiltCard';

const MILESTONES = [
  {
    role: "Full - Stack Developer & AI Engineer",
    company: "Freelance",
    duration: "2025 - Present",
    description: "Orchestrated the transition from traditional backend servers to serverless multi-agent pipelines. Deployed LLMs for automate parsing modules, increasing pipeline processing speed by 40%.",
    icon: <Zap size={16} style={{ color: 'var(--accent-gold)' }} />,
    metrics: ["API latency reduced to 85ms", "Processed 12M+ token operations daily", "Built custom UI workspace in Next.js"]
  },
  {
    role: "Software Intern",
    company: "Outcoach",
    duration: "Feb - June 2026",
    description: "Developed AI-powered automation solutions, automated testing workflows, and data processing pipelines while building responsive React web applications. Integrated APIs and optimized business workflows to improve efficiency and reduce manual effort.",
    icon: <Briefcase size={16} style={{ color: 'var(--text-secondary)' }} />,
    metrics: ["AI & data automation workflows", "Automation testing implementation", "React.js frontend development"]
  },
  {
    role: "Web Developer",
    company: "Zidio Technologies",
    duration: "Oct -Sept 2025",
    description: "Collaborated with a geographically distributed development team to build a complete web application. Developed responsive React.js interfaces, implemented interactive features such as a Tic Tac Toe game, and contributed throughout the development lifecycle from planning to deployment.",
    icon: <Award size={16} style={{ color: 'var(--text-secondary)' }} />,
    metrics: ["Responsive frontend development", "Interactive game development", "End-to-end website development"]
  }
];

const ExperienceTimeline = () => {
  return (
    <section id="experience" style={{ padding: '6rem 0', position: 'relative', zIndex: 5 }}>
      <div className="content-wrapper">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            System <span className="text-gradient">Timeline</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', fontSize: '1rem' }}>
            Chronological log of full-stack systems engineering, neural model operations, and project delivery cycles.
          </p>
        </div>

        {/* Timeline Container */}
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', paddingLeft: '2.5rem' }}>
          
          {/* Vertical line with bronze highlight */}
          <div 
            style={{
              position: 'absolute',
              top: '5px',
              bottom: '5px',
              left: '11px',
              width: '2px',
              background: 'linear-gradient(180deg, rgba(197,168,128,0.01) 0%, rgba(197,168,128,0.2) 50%, rgba(197,168,128,0.01) 100%)',
              boxShadow: '0 0 8px rgba(197, 168, 128, 0.05)'
            }}
          />

          {/* Timeline Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {MILESTONES.map((item, index) => (
              <div key={index} style={{ position: 'relative' }}>
                
                {/* Glowing Node */}
                <div 
                  style={{
                    position: 'absolute',
                    left: '-35px',
                    top: '4px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'var(--bg-slate-darker)',
                    border: '2px solid rgba(197, 168, 128, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 10px rgba(197, 168, 128, 0.12)',
                    zIndex: 2,
                    animation: 'float 3s ease-in-out infinite'
                  }}
                >
                  {item.icon}
                </div>

                {/* Content Panel wrapped inside TiltCard */}
                <TiltCard 
                  style={{ 
                    padding: '2rem',
                    textAlign: 'left',
                    borderColor: 'var(--border-gold-subtle)',
                  }}
                >
                  {/* Timeframe Tag */}
                  <div 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.4rem', 
                      fontSize: '0.75rem', 
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-gold)',
                      marginBottom: '0.75rem',
                      background: 'rgba(197, 168, 128, 0.02)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      border: '1px solid rgba(197, 168, 128, 0.12)'
                    }}
                  >
                    <Calendar size={12} />
                    <span>{item.duration}</span>
                  </div>

                  {/* Title & Organization */}
                  <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
                    {item.role}
                  </h3>
                  <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.25rem', fontWeight: 500 }}>
                    {item.company}
                  </h4>

                  {/* Description */}
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {item.description}
                  </p>

                  {/* Executed Parameters Log */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      // SYSTEM METRICS COMPILED:
                    </div>
                    <ul style={{ listStyleType: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {item.metrics.map((metric, mIdx) => (
                        <li 
                          key={mIdx} 
                          style={{ 
                            fontSize: '0.8rem', 
                            fontFamily: 'var(--font-mono)', 
                            color: 'var(--text-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <span style={{ color: 'var(--accent-gold)' }}>&gt;</span>
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>

                </TiltCard>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExperienceTimeline;
