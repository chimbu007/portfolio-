import React, { useState } from 'react';
import { Cpu, Layout, Database, Server, Terminal } from 'lucide-react';
import TiltCard from './TiltCard';

const SKILLS_DATA = [
  {
    category: "AI & Machine Learning",
    icon: <Cpu size={22} />,
    skills: [
      { name: "LLM Orchestration (LangChain, LlamaIndex)", level: 92, speed: "12ms" },
      { name: "Model Integration (OpenAI, Anthropic APIs)", level: 95, speed: "8ms" },
      { name: "AI Workflow Automation)", level: 85, speed: "42ms" }
    ]
  },
  {
    category: "Frontend Development",
    icon: <Layout size={22} />,
    skills: [
      { name: "React.js / Next.js", level: 95, speed: "5ms" },
      { name: "TailwindCSS / Styled Components", level: 93, speed: "4ms" },
      { name: "TypeScript / JavaScript (ES6+)", level: 90, speed: "6ms" }
    ]
  },
  {
    category: "Backend Architecture",
    icon: <Database size={22} />,
    skills: [
      { name: "Node.js / Express.js", level: 93, speed: "14ms" },
      { name: "PostgreSQL / MongoDB", level: 88, speed: "22ms" },
      { name: "RESTful APIs", level: 94, speed: "11ms" },
      { name: "Authentication (JWT, OAuth, Auth0)", level: 91, speed: "15ms" }
    ]
  },
  {
    category: "DevOps & Cloud Systems",
    icon: <Server size={22} />,
    skills: [
      { name: "CI/CD Pipelines (GitHub Actions)", level: 90, speed: "30ms" },
      { name: "AWS Cloud (S3, EC2, Lambda)", level: 83, speed: "50ms" },
      { name: "Basic Linux", level: 88, speed: "25ms" }
    ]
  }
];

const SkillsMatrix = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id="skills" style={{ padding: '6rem 0', position: 'relative', zIndex: 5 }}>
      <div className="content-wrapper">
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            Cognitive <span className="text-gradient">Capabilities</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', fontSize: '1rem' }}>
            A neural matrix mapping my professional skill levels, optimized execution speeds, and full-stack operational capacity.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '3rem', alignItems: 'start' }}>
          
          {/* Categories Navigation Cards */}
          <div className="skills-categories-container">
            {SKILLS_DATA.map((cat, idx) => {
              const isActive = activeCategory === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveCategory(idx)}
                  className={`skills-category-item ${isActive ? 'active' : ''}`}
                >
                  {/* Icon wrapper */}
                  <div className={`skills-category-icon ${isActive ? 'active' : ''}`}>
                    {cat.icon}
                  </div>

                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <h3 className={`skills-category-title ${isActive ? 'active' : ''}`}>
                      {cat.category}
                    </h3>
                    <span className={`skills-category-subtitle ${isActive ? 'active' : ''}`}>
                      {cat.skills.length} core units loaded
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Skill Details Console (Dark UI Shell) */}
          <TiltCard
            className="skills-console-card"
            style={{
              border: '1px solid rgba(179, 147, 107, 0.12)',
              background: 'rgba(15, 16, 18, 0.98)', // Fixed sleek dark slate theme
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Console Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Terminal size={16} style={{ color: 'var(--accent-gold)' }} />
                <span className="skills-console-header-text" style={{ fontFamily: 'var(--font-mono)', color: '#ffffff', fontWeight: '600' }}>
                  MODULE://{SKILLS_DATA[activeCategory].category.toUpperCase().replace(/\s/g, '_')}
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)', fontFamily: 'var(--font-mono)' }}>
                [STATUS: RESPONSIVE]
              </span>
            </div>

            {/* Skills List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', flex: 1 }}>
              {SKILLS_DATA[activeCategory].skills.map((skill, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredSkill(index)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  {/* Skill Label (Using high contrast white/gold on dark Console background) */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.95rem' }}>
                    <span 
                      style={{ 
                        color: hoveredSkill === index ? 'var(--accent-gold)' : '#ffffff',
                        transition: 'color 0.2s ease',
                        fontWeight: hoveredSkill === index ? '600' : '400'
                      }}
                    >
                      {skill.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem' }}>
                      {hoveredSkill === index ? `LATENCY: ${skill.speed}` : `CONFIDENCE: ${skill.level}%`}
                    </span>
                  </div>

                  {/* Level Bar Container */}
                  <div 
                    style={{ 
                      height: '5px', 
                      background: 'rgba(255,255,255,0.06)', 
                      borderRadius: '3px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    {/* Glowing level progress fill using premium gold accent gradient */}
                    <div 
                      style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(179, 147, 107, 0.2) 0%, rgba(179, 147, 107, 0.9) 100%)',
                        boxShadow: hoveredSkill === index ? '0 0 10px rgba(179, 147, 107, 0.4)' : 'none',
                        transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
                        borderRadius: '3px'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer metrics log */}
            <div 
              style={{ 
                marginTop: '2rem', 
                padding: '0.8rem 1rem', 
                borderRadius: '6px', 
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.03)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.4)',
                textAlign: 'left'
              }}
            >
              <p>&gt; System diagnostics: active_nodes = {SKILLS_DATA[activeCategory].skills.length}, operational_readiness = 1.0</p>
              <p>&gt; Neural network load: nominal. Ready to deploy web pipelines.</p>
            </div>

          </TiltCard>
        </div>

      </div>
    </section>
  );
};

export default SkillsMatrix;
