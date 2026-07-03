import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, ChevronRight, X } from 'lucide-react';

const COMMANDS = {
  '/help': 'List all available commands: /skills, /projects, /about, /contact, /clear',
  '/about': 'AI-Integrated Developer. Specializing in React, Node.js, and Neural Network API integrations.',
  '/skills': 'Opening cognitive skills matrix database...',
  '/projects': 'Opening projects dashboard registry...',
  '/contact': 'Initiating communications handshake... Loading contact form.',
  '/clear': 'Clear console logs.',
};

const AIPromptBar = ({ onCommandTrigger }) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([
    { type: 'system', text: 'Chimbu Neural Shell v3.0.0 initialized.' },
    { type: 'system', text: 'Type /help or select quick tags to query system parameters.' }
  ]);
  const [placeholder, setPlaceholder] = useState('');
  const [suggestionIdx, setSuggestionIdx] = useState(0);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const logEndRef = useRef(null);

  const suggestions = ['/help', '/skills', '/projects', '/about', '/contact'];

  // Typing simulator for placeholder
  useEffect(() => {
    let timer;
    let currentText = '';
    let letterIndex = 0;
    let isDeleting = false;

    const type = () => {
      const fullText = `Ask Chimbu AI about: ${suggestions[suggestionIdx]}`;
      
      if (isDeleting) {
        currentText = fullText.substring(0, letterIndex - 1);
        letterIndex--;
      } else {
        currentText = fullText.substring(0, letterIndex + 1);
        letterIndex++;
      }

      setPlaceholder(currentText);

      let typeSpeed = isDeleting ? 30 : 60;

      if (!isDeleting && currentText === fullText) {
        typeSpeed = 1600; // pause at full text
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        setSuggestionIdx((prev) => (prev + 1) % suggestions.length);
        typeSpeed = 300; // pause before next
      }

      timer = setTimeout(type, typeSpeed);
    };

    type();
    return () => clearTimeout(timer);
  }, [suggestionIdx]);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    setIsConsoleOpen(true);
    setLogs((prev) => [...prev, { type: 'input', text: cmd }]);

    if (cmd === '/clear') {
      setLogs([]);
    } else if (COMMANDS[cmd]) {
      setLogs((prev) => [...prev, { type: 'output', text: COMMANDS[cmd] }]);
      if (onCommandTrigger) {
        onCommandTrigger(cmd);
      }
    } else {
      // Direct query fallback: ask details
      setLogs((prev) => [...prev, { type: 'output', text: `Analyzing query "${cmd}"... Loading profile details.` }]);
      if (onCommandTrigger) {
        if (cmd.includes('skill') || cmd.includes('tech') || cmd.includes('languages')) {
          onCommandTrigger('/skills');
        } else if (cmd.includes('project') || cmd.includes('work') || cmd.includes('portfolio')) {
          onCommandTrigger('/projects');
        } else if (cmd.includes('contact') || cmd.includes('email') || cmd.includes('reach')) {
          onCommandTrigger('/contact');
        } else {
          onCommandTrigger('/about');
        }
      }
    }

    setInput('');
  };

  const executeQuickCommand = (cmd) => {
    setIsConsoleOpen(true);
    setLogs((prev) => [...prev, { type: 'input', text: cmd }]);
    
    if (COMMANDS[cmd]) {
      setLogs((prev) => [...prev, { type: 'output', text: COMMANDS[cmd] }]);
      if (onCommandTrigger) {
        onCommandTrigger(cmd);
      }
    }
  };

  return (
    <div 
      className="prompt-hud-container" 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '0.6rem 1.25rem',
        borderRadius: '24px',
        overflow: 'visible'
      }}
    >
      {/* Floating Output Console inside HUD pill, shown above the input */}
      {isConsoleOpen && (
        <div 
          className="glass-panel"
          style={{
            position: 'absolute',
            bottom: '105%',
            left: 0,
            width: '100%',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '16px',
            padding: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            textAlign: 'left',
            boxShadow: 'var(--shadow-hud)',
            maxHeight: 'clamp(110px, 24vh, 180px)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.25rem', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#111', fontWeight: 600 }}>
              <Terminal size={12} />
              <span>Ask Chimbu AI Console</span>
            </div>
            <button 
              onClick={() => setIsConsoleOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <X size={12} />
            </button>
          </div>

          {/* Logs */}
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: 'calc(100% - 25px)' }}>
            {logs.map((log, index) => {
              if (log.type === 'input') {
                return (
                  <div key={index} style={{ marginBottom: '0.3rem', color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>guest@chimbu:~$</span> {log.text}
                  </div>
                );
              }
              if (log.type === 'system') {
                return (
                  <div key={index} style={{ marginBottom: '0.3rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    [SYS] {log.text}
                  </div>
                );
              }
              if (log.type === 'error') {
                return (
                  <div key={index} style={{ marginBottom: '0.3rem', color: '#dc2626' }}>
                    [ERR] {log.text}
                  </div>
                );
              }
              return (
                <div key={index} style={{ marginBottom: '0.3rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {log.text}
                </div>
              );
            })}
            <div ref={logEndRef} />
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
        <div style={{ color: 'rgba(255, 255, 255, 0.45)', marginRight: '0.5rem', display: 'flex', alignItems: 'center' }}>
          <ChevronRight size={16} />
        </div>
        
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            padding: '0.6rem 3rem 0.6rem 0.2rem',
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            outline: 'none',
            caretColor: '#ffffff'
          }}
        />

        <button
          type="submit"
          className="cyber-button"
          style={{
            padding: '0.45rem',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--accent-dark)',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Send size={12} />
        </button>
      </form>

      {/* Suggestion Quick Tags directly below input */}
      <div className="prompt-suggestions-container">
        {suggestions.map((item) => (
          <button
            key={item}
            type="button"
            className="prompt-suggestion-btn"
            onClick={() => executeQuickCommand(item)}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'rgba(255, 255, 255, 0.65)',
              fontSize: '0.75rem',
              padding: '0.2rem 0.6rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.22)';
              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.target.style.background = 'rgba(255, 255, 255, 0.04)';
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AIPromptBar;
