import React, { useEffect, useState } from 'react';
import statueImg from '../assets/chimbu_statue.png';

const MarbleStatue = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Dynamically map global mouse movement to 3D rotation angles
  useEffect(() => {
    const handleMouseMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Compute delta offset from screen center (-0.5 to 0.5)
      const mouseX = (e.clientX / w) - 0.5;
      const mouseY = (e.clientY / h) - 0.5;
      
      // Map to 3D rotation limits (max 18 degrees tilt)
      setRotation({
        x: -mouseY * 18,
        y: mouseX * 18
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
        pointerEvents: 'none'
      }}
    >
      {/* Floating animation container */}
      <div
        style={{
          position: 'relative',
          animation: 'floatHologram 5s ease-in-out infinite',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* 3D Tilting Frame */}
        <div 
          style={{ 
            position: 'relative', 
            width: '320px', 
            height: '320px', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'center',
            transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: 'transform 0.12s ease-out',
            willChange: 'transform'
          }}
        >
          {/* Outer Rotating HUD telemetry ring (dashed gold) */}
          <div
            style={{
              position: 'absolute',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              border: '1.5px dashed rgba(197, 168, 128, 0.45)',
              animation: 'rotateCW 25s linear infinite',
              pointerEvents: 'none'
            }}
          />

          {/* Inner Rotating HUD telemetry ring (dotted gold) */}
          <div
            style={{
              position: 'absolute',
              width: '272px',
              height: '272px',
              borderRadius: '50%',
              border: '1px dotted rgba(197, 168, 128, 0.3)',
              animation: 'rotateCCW 18s linear infinite',
              pointerEvents: 'none'
            }}
          />

          {/* Ambient backlight glow ring behind the avatar */}
          <div
            style={{
              position: 'absolute',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(197, 168, 128, 0.28) 0%, transparent 70%)',
              filter: 'blur(15px)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          {/* Gold glowing circular avatar card */}
          <div
            style={{
              position: 'relative',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              border: '3px solid var(--accent-gold)',
              boxShadow: '0 0 35px rgba(197, 168, 128, 0.35)',
              overflow: 'hidden',
              background: '#0d0d11',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          >
            {/* Color Portrait Image */}
            <img
              src={statueImg}
              alt="Chidambaram S Portrait"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scale(1.05)',
                display: 'block'
              }}
            />

            {/* Futuristic cyber scanline scan overlay */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                width: '100%',
                height: '6px',
                background: 'linear-gradient(180deg, transparent, rgba(197, 168, 128, 0.6) 50%, transparent)',
                animation: 'scanlineMove 3s linear infinite',
                pointerEvents: 'none'
              }}
            />

            {/* Vignette shadow cover */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.85)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>
      </div>

      {/* Inject custom CSS keyframes */}
      <style>{`
        @keyframes floatHologram {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @keyframes rotateCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotateCCW {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes scanlineMove {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </div>
  );
};

export default MarbleStatue;
