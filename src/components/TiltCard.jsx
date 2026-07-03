import React, { useState, useRef, useEffect } from 'react';

const TiltCard = ({ children, style = {}, className = "", maxTilt = 12 }) => {
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable tilts on touch devices to ensure smooth native scrolling
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 968 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Cursor position relative to card boundaries
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized position relative to center (-0.5 to 0.5)
    const normalizedX = x / rect.width - 0.5;
    const normalizedY = y / rect.top - 0.5; // normalized offset from vertical center
    
    // Calculate rotation angles
    // Vertical mouse offset rotates around horizontal X-axis, and vice-versa
    const rotateX = -(e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2) * maxTilt;
    const rotateY = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2) * maxTilt;
    
    setTiltStyle({
      transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -4px, 15px)`,
      transition: 'transform 0.05s ease-out',
    });

    // Update dynamic reflective glare radial coordinates
    setGlareStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.06) 0%, transparent 65%)`,
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    
    // Smooth snap back to zero rotation
    setTiltStyle({
      transform: 'rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
      transition: 'transform 0.4s ease-out',
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.4s ease-out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel ${className}`}
      style={{
        ...style,
        ...tiltStyle,
        position: 'relative',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glare Sheet Overlay */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            ...glareStyle,
          }}
        />
      )}
      
      {/* Content wrapper with Z-translation to lift child text off the card plane */}
      <div style={{ transform: 'translate3d(0, 0, 20px)', transformStyle: 'preserve-3d', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
