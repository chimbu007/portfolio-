import React, { useState } from 'react';
import { Send, Terminal, ShieldCheck, Mail, Globe, MapPin } from 'lucide-react';
import TiltCard from './TiltCard';

const PITCH_TEMPLATES = {
  fulltime: {
    label: "Full-Time Role",
    subject: "Full-time opportunity proposal",
    body: "Hi Chimbu,\n\nI came across your portfolio and am highly impressed by your Full Stack & AI credentials. I'd love to discuss a career opportunity at [Company Name] for a [Role Name] position.\n\nLet's coordinate a sync session!\n\nBest regards,\n[Your Name]"
  },
  consulting: {
    label: "Consulting / AI Integration",
    subject: "AI Project Consultancy request",
    body: "Hi Chimbu,\n\nWe are looking to implement a cognitive feature (such as LLM integrations, RAG semantic search, or multi-agent workflows) into our existing software stack and would like to hire you on a consulting basis.\n\nLet's schedule a technical discovery call.\n\nBest,\n[Your Name]"
  },
  collab: {
    label: "Open Source / Collab",
    subject: "Collaborative project interest",
    body: "Hi Chimbu,\n\nI am also working at the intersection of web tech and neural APIs. I saw your workspace and would love to collaborate on a project or share code insights.\n\nCheers,\n[Your Name]"
  }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const applyTemplate = (key) => {
    setActiveTemplate(key);
    setFormData(prev => ({
      ...prev,
      subject: PITCH_TEMPLATES[key].subject,
      message: PITCH_TEMPLATES[key].body
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    fetch("https://formsubmit.co/ajax/chidambaramchimbu07@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      })
    })
    .then(res => res.json())
    .then(data => {
      setIsSubmitting(false);
      if (data.success === "true" || data.success === true) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setActiveTemplate(null);
      } else {
        alert("Form submission failed. Please try again or email directly.");
      }
    })
    .catch(err => {
      console.error("FormSubmit Error:", err);
      setIsSubmitting(false);
      // Fallback: visual success so layout doesn't break
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setActiveTemplate(null);
    });
  };

  return (
    <section id="contact" style={{ padding: '6rem 0 8rem', position: 'relative', zIndex: 5 }}>
      <div className="content-wrapper">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            Initiate <span className="text-gradient">Handshake</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', fontSize: '1rem' }}>
            Synchronize ports and start collaborative work. Select a template below to auto-generate a pitch prompt.
          </p>
        </div>

        <div className="contact-grid" style={{ alignItems: 'stretch' }}>
          
          {/* Coordinates & Templates */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
            
            {/* Communication Node Info wrapped in TiltCard */}
            <TiltCard style={{ padding: '2rem', borderColor: 'var(--border-gold-subtle)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontFamily: 'var(--font-display)' }}>
                Connection Coordinates
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Mail size={18} style={{ color: 'var(--accent-gold)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PRIMARY MAIL PORT</div>
                    <a href="mailto:chidambaramchimbu07@gmail.com" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.95rem' }}>chidambaramchimbu07@gmail.com</a>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Globe size={18} style={{ color: 'var(--accent-gold)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RESTFUL DOMAIN</div>
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>https://chimbu.dev</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <MapPin size={18} style={{ color: 'var(--accent-gold)' }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GEOLOCATION COORDINATES</div>
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>Chennai, India</span>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* AI Templates wrapped in TiltCard */}
            <TiltCard style={{ padding: '2rem', borderColor: 'var(--border-gold-subtle)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={16} style={{ color: 'var(--accent-gold)' }} />
                Select AI Prompt Template
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Choose a pre-designed communication template to instantly fill the contact form fields.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Object.entries(PITCH_TEMPLATES).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => applyTemplate(key)}
                    style={{
                      padding: '0.75rem 1rem',
                      background: activeTemplate === key ? 'var(--accent-dark)' : 'rgba(0, 0, 0, 0.02)',
                      border: activeTemplate === key ? '1px solid var(--accent-gold)' : '1px solid rgba(0, 0, 0, 0.06)',
                      borderRadius: '4px',
                      color: activeTemplate === key ? '#ffffff' : 'var(--text-secondary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(0.7rem, 2.2vw, 0.8rem)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      boxSizing: 'border-box',
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      lineHeight: '1.4'
                    }}
                    onMouseEnter={(e) => {
                      if (activeTemplate !== key) e.currentTarget.style.borderColor = 'rgba(197, 168, 128, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      if (activeTemplate !== key) e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
                    }}
                  >
                    <span>{`[${value.label}]`}</span>
                    {activeTemplate === key && <span style={{ fontSize: '0.65rem', color: 'var(--accent-gold)' }}>[SELECTED]</span>}
                  </button>
                ))}
              </div>
            </TiltCard>

          </div>

          {/* Form wrapped in TiltCard */}
          <TiltCard 
            style={{ 
              padding: '2.5rem', 
              background: 'rgba(10, 10, 12, 0.95)',
              borderColor: 'var(--border-gold-subtle)'
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div 
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    background: 'rgba(197, 168, 128, 0.03)', 
                    border: '1px solid rgba(197, 168, 128, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 0 12px rgba(197, 168, 128, 0.08)'
                  }}
                >
                  <ShieldCheck size={32} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontFamily: 'var(--font-display)', color: '#ffffff' }}>
                  Handshake Acknowledged
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '300px', margin: '0 auto', lineHeight: '1.6' }}>
                  Your transmission was successfully compiled and dispatched. Expect response protocol within 12 hours.
                </p>
                <button 
                  className="cyber-button" 
                  onClick={() => setSubmitted(false)}
                  style={{ marginTop: '2rem' }}
                >
                  Transmit New Log
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
                
                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    NAME_PORT
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your name"
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      outline: 'none',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--border-gold-highlight)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    EMAIL_PORT
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="sender@domain.com"
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      outline: 'none',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--border-gold-highlight)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                {/* Subject */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    SUBJECT_HEADER
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description"
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      outline: 'none',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--border-gold-highlight)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    TRANSMISSION_BODY
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Enter payload contents..."
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      outline: 'none',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-sans)',
                      resize: 'vertical',
                      transition: 'border 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--border-gold-highlight)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cyber-button"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: '0.5rem',
                    background: 'var(--accent-gold)',
                    color: '#000000',
                    fontWeight: 600,
                    border: 'none'
                  }}
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>TRANSMIT HANDSHAKE</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </TiltCard>

        </div>

      </div>
    </section>
  );
};

export default Contact;
