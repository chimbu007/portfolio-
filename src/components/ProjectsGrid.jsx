import React, { useState } from 'react';
import { ExternalLink, ShoppingBag, BookOpen, Smartphone, Share2, Phone, Mail as MailIcon } from 'lucide-react';
import TiltCard from './TiltCard';

const GithubIcon = ({ size = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS = [
  {
    title: "Novel Silks",
    category: "Web Dev",
    description: "A luxury silk saree e-commerce platform with dynamic catalogs, secure checkout pipelines, and mobile-responsive collection galleries.",
    tags: ["React", "Node.js", "MySQL", "Razorpay", "Tailwind"],
    demoUrl: "https://novelsilks.com/",
    repoUrl: "https://github.com",
    icon: <ShoppingBag size={22} style={{ color: 'var(--text-secondary)' }} />,
    impact: "➔ 45% increase in online sales | 10k+ catalog visits",
    specs: {
      "role": "Lead Full Stack Developer",
      "problem": "Traditional textile weavers lacking automated online catalogs and checkout pipelines.",
      "solution": "React frontend + Express backend, secure Razorpay API, and compressed image load.",
      "results": "1.2s page paint index and automated inventory catalog sync."
    }
  },
  {
    title: "Solo Spares",
    category: "Web Dev",
    description: "An automotive spare parts marketplace and B2B ordering catalog featuring model-specific vehicle searches and instant quote requests.",
    tags: ["PHP", "WooCommerce", "MySQL", "WordPress", "Bootstrap"],
    demoUrl: "https://solospares.in/",
    repoUrl: "https://github.com",
    icon: <ShoppingBag size={22} style={{ color: 'var(--text-secondary)' }} />,
    impact: "➔ 30% faster B2B ordering | 10,000+ parts indexed",
    specs: {
      "role": "WooCommerce CMS Architect",
      "problem": "Automotive buyers struggling to locate vehicle-specific parts in static catalogs.",
      "solution": "Faceted make, model, and year searches matched to WooCommerce database.",
      "results": "Drastic drop in catalog search errors and automated B2B quote dispatches."
    }
  },
  {
    title: "EduCourse Onboarding",
    category: "Web Dev",
    description: "A conversion-focused online education course landing portal equipped with registration forms and interactive curriculum guides.",
    tags: ["React", "Vite", "TailwindCSS", "Vercel", "Framer Motion"],
    demoUrl: "https://course-page-delta.vercel.app/",
    repoUrl: "https://github.com",
    icon: <BookOpen size={22} style={{ color: 'var(--text-secondary)' }} />,
    impact: "➔ 98.7% form submission success | 35% conversion uplift",
    specs: {
      "role": "Frontend UI/UX Developer",
      "problem": "High drop-off rates on student registration and payment screens.",
      "solution": "React page flow with Framer Motion animations and client analytics telemetry.",
      "results": "A/B tested layout increased conversion rates and optimized page speed."
    }
  },
  {
    title: "WhatsApp Bot (WBA)",
    category: "AI Agents",
    description: "An automated WhatsApp business assistant integrating LLMs with webhook routers to resolve customer queries and register leads automatically.",
    tags: ["Python", "FastAPI", "OpenAI API", "Meta Cloud API", "Redis"],
    demoUrl: "https://wba.arunijone.com/",
    repoUrl: "https://github.com",
    icon: <Smartphone size={22} style={{ color: 'var(--text-secondary)' }} />,
    impact: "➔ 92% support resolution rate | 70% decrease in latency",
    specs: {
      "role": "AI Automation Architect",
      "problem": "Slow response times for user inquiries and high manual support workload.",
      "solution": "FastAPI webhook router, GPT-4o semantic response model, and Redis sessions.",
      "results": "15k+ support queries automatically answered without human agent intervention."
    }
  },
  {
    title: "Social Scheduler (SMA)",
    category: "AI Agents",
    description: "An AI-powered social media automation suite generating content drafts and scheduling postings across digital networks.",
    tags: ["React", "Express", "MongoDB", "AI content API", "Node Cron"],
    demoUrl: "https://sma.arunijone.com/admin",
    repoUrl: "https://github.com",
    icon: <Share2 size={22} style={{ color: 'var(--text-secondary)' }} />,
    impact: "➔ 80% automated content generation | 4 platforms scheduled",
    specs: {
      "role": "Full Stack Engineer",
      "problem": "Marketing teams spending excessive hours drafting and scheduling manual updates.",
      "solution": "Scheduling dashboard connected to Meta/LinkedIn API graphs with Node-Cron.",
      "results": "Automatic LLM generation of captions, hashtags, and optimized timing slots."
    }
  },
  {
    title: "Call Voice Agent (CVA)",
    category: "AI Agents",
    description: "An autonomous voice assistant that answers incoming phone calls, resolves customer inquiries in real time, and logs diagnostic call telemetries.",
    tags: ["Python", "Twilio API", "FastAPI", "OpenAI", "WebSockets"],
    demoUrl: "https://cva.arunijone.com/",
    repoUrl: "https://github.com",
    icon: <Phone size={22} style={{ color: 'var(--text-secondary)' }} />,
    impact: "➔ 100% incoming calls handled | 2.5s avg resolution speed",
    specs: {
      "role": "Conversational AI Developer",
      "problem": "Missed customer calls outside working hours causing lead drop-off.",
      "solution": "Twilio Media WebSockets feeding directly into GPT-4o voice semantic endpoints.",
      "results": "Ultra-low latency speech loops with structured text logging."
    }
  },
  {
    title: "Email Planner (EMA)",
    category: "AI Agents",
    description: "An intelligent email automation pipeline that segments contact lists based on behavior and designs targeted campaign layouts.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "SendGrid API", "LLMs"],
    demoUrl: "https://ema.arunijone.com/",
    repoUrl: "https://github.com",
    icon: <MailIcon size={22} style={{ color: 'var(--text-secondary)' }} />,
    impact: "➔ 38% click-rate increase | 15k+ target emails drafted",
    specs: {
      "role": "Backend & LLM Developer",
      "problem": "Low conversion rates from blast email campaigns lacking customer segmentation.",
      "solution": "PostgreSQL partitioning, Claude 3.5 campaign drafting, and SendGrid SMTP.",
      "results": "Open-rate and click-through analytics metrics logged in real time."
    }
  }
];

const ProjectsGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openSpecs, setOpenSpecs] = useState({});

  const toggleSpecs = (index) => {
    setOpenSpecs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Filter projects by selected tab category
  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" style={{ padding: '6rem 0', position: 'relative', zIndex: 5 }}>
      <div className="content-wrapper">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            Production <span className="text-gradient">Engines</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', fontSize: '1rem' }}>
            A curated index of full-stack repositories coupled with functional artificial intelligence engines.
          </p>
        </div>

        {/* Tab Category Filter Buttons */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.6rem', 
            marginBottom: '3rem', 
            flexWrap: 'wrap'
          }}
        >
          {["All", "AI Agents", "Web Dev"].map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenSpecs({}); // Close diagnostic specs on tab switch
              }}
              style={{
                background: activeCategory === category ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.72)',
                border: activeCategory === category ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(0, 0, 0, 0.05)',
                color: activeCategory === category ? 'var(--text-primary)' : 'var(--text-secondary)',
                padding: '0.5rem 1.4rem',
                borderRadius: '20px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: activeCategory === category ? '0 4px 12px rgba(0, 0, 0, 0.05)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category) {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                }
              }}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid-3">
          {filteredProjects.map((project, index) => (
            <div 
              key={`${project.title}-${activeCategory}`} // Triggers fresh mount for stagger animation on switch
              className="project-card-enter"
              style={{ 
                animationDelay: `${index * 85}ms`,
                height: '100%' 
              }}
            >
              <TiltCard
                style={{
                  padding: '1.75rem',
                  borderColor: openSpecs[index] ? 'var(--border-gold-highlight)' : 'var(--border-gold-subtle)',
                  height: '100%'
                }}
              >
                {/* Title Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}>
                    {project.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', textAlign: 'left', flex: 1, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'left', lineHeight: '1.6', marginBottom: '1.25rem', flex: 1 }}>
                  {project.description}
                </p>

                {/* Metrics Highlight Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1.25rem', padding: '0.75rem 0.85rem', borderRadius: '6px', background: 'rgba(179, 147, 107, 0.04)', border: '1px solid rgba(179, 147, 107, 0.12)' }}>
                  <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
                    Key Performance Metrics
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {project.impact}
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                  {project.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(255,255,255,0.02)',
                        color: 'var(--text-secondary)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Specs Console Panel */}
                {openSpecs[index] && (
                  <div 
                    style={{
                      background: 'rgba(10, 10, 12, 0.98)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      padding: '1rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      textAlign: 'left',
                      color: 'rgba(255, 255, 255, 0.65)',
                      marginBottom: '1.5rem',
                      lineHeight: '1.6'
                    }}
                  >
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.3rem', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                      // SCHEMATIC DIAGNOSTICS:
                    </div>
                    {Object.entries(project.specs).map(([key, val]) => (
                      <div key={key} style={{ marginBottom: '0.25rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>"{key}":</span> "{val}"
                      </div>
                    ))}
                  </div>
                )}

                {/* Interactive Action Deck */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem' }}>
                  {/* Specs Toggle */}
                  <button
                    onClick={() => toggleSpecs(index)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: openSpecs[index] ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!openSpecs[index]) e.target.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      if (!openSpecs[index]) e.target.style.color = 'var(--text-muted)';
                    }}
                  >
                    {openSpecs[index] ? '// Hide Specs' : '// Show Specs'}
                  </button>

                  {/* External links */}
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      <GithubIcon size={18} />
                    </a>
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsGrid;
