import React, { useState, useEffect, useRef } from 'react';
import mcqueenLeft from '../assets/mcqueen_left.png';
import mcqueenRight from '../assets/mcqueen_right.png';

// Dynamic color filter to remove neutral grey background gradients (leaving wheels/eyes)
const removeBackground = (imgSrc) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Scan every pixel in the image
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const maxVal = Math.max(r, g, b);
          const minVal = Math.min(r, g, b);
          const diff = maxVal - minVal;

          // Background grey pixels are neutral (diff < 15).
          // We exclude the black tires (r > 52) and the bright white windshield eyes (r < 205).
          if (diff < 15 && r > 52 && r < 205) {
            data[i + 3] = 0; // set pixel to fully transparent
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL());
      } catch (err) {
        console.warn("LightningMcqueen: Background removal failed (Canvas Security):", err);
        resolve(imgSrc);
      }
    };
  });
};

const LightningMcqueen = () => {
  const [leftProcessed, setLeftProcessed] = useState(null);
  const [rightProcessed, setRightProcessed] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [speechText, setSpeechText] = useState("Kachow! ⚡");
  const [showSpeech, setShowSpeech] = useState(false);
  const [carWidth, setCarWidth] = useState(290);
  const [carHeight, setCarHeight] = useState(163);

  // References for direct DOM updates (eliminates React render lagging)
  const carRef = useRef(null);
  const leftCarRef = useRef(null);
  const rightCarRef = useRef(null);

  // Dynamic sizing based on viewport
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCarWidth(120);
        setCarHeight(67);
      } else if (w < 768) {
        setCarWidth(170);
        setCarHeight(95);
      } else {
        setCarWidth(290);
        setCarHeight(163);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lazy global AudioContext reference
  const audioCtxRef = useRef(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }
    // Resume context if it was suspended by browser autoplay policies
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Web Audio API engine rev synthesizer (detuned V8 start + high-frequency harmonics for laptop/phone speakers)
  const playEngineRevSound = () => {
    try {
      const audioCtx = getAudioContext();
      if (!audioCtx) return;

      // Low-pass filter to keep exhaust deep but allow mid-range harmonics
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, audioCtx.currentTime);

      // Osc 1: Sawtooth (main cylinder grunt)
      const osc1 = audioCtx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(110, audioCtx.currentTime); // Pitched slightly higher for small speakers
      osc1.frequency.exponentialRampToValueAtTime(540, audioCtx.currentTime + 0.3); // rev up
      osc1.frequency.exponentialRampToValueAtTime(130, audioCtx.currentTime + 0.75); // settle to idle

      // Osc 2: Triangle (girth)
      const osc2 = audioCtx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(115, audioCtx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(545, audioCtx.currentTime + 0.3);
      osc2.frequency.exponentialRampToValueAtTime(135, audioCtx.currentTime + 0.75);

      // Osc 3: Sawtooth (high harmonic presence so it's fully audible on phones)
      const osc3 = audioCtx.createOscillator();
      osc3.type = 'sawtooth';
      osc3.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc3.frequency.exponentialRampToValueAtTime(1080, audioCtx.currentTime + 0.3);
      osc3.frequency.exponentialRampToValueAtTime(260, audioCtx.currentTime + 0.75);

      // Volume nodes
      const gain1 = audioCtx.createGain();
      gain1.gain.setValueAtTime(0.06, audioCtx.currentTime);

      const gain2 = audioCtx.createGain();
      gain2.gain.setValueAtTime(0.06, audioCtx.currentTime);

      const gain3 = audioCtx.createGain();
      gain3.gain.setValueAtTime(0.015, audioCtx.currentTime); // lower volume for high-pitched harmonics

      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.12); // peak rev
      masterGain.gain.exponentialRampToValueAtTime(0.05, audioCtx.currentTime + 0.6); // idle
      masterGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.25); // fade

      // Connect nodes
      osc1.connect(gain1);
      osc2.connect(gain2);
      osc3.connect(gain3);

      gain1.connect(filter);
      gain2.connect(filter);
      gain3.connect(filter);

      filter.connect(masterGain);
      masterGain.connect(audioCtx.destination);

      osc1.start(audioCtx.currentTime);
      osc2.start(audioCtx.currentTime);
      osc3.start(audioCtx.currentTime);
      
      osc1.stop(audioCtx.currentTime + 1.3);
      osc2.stop(audioCtx.currentTime + 1.3);
      osc3.stop(audioCtx.currentTime + 1.3);
    } catch (e) {
      console.warn("LightningMcqueen: Audio context blocked/failed:", e);
    }
  };

  // Automatically unlock the Audio Context on the first page click
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      getAudioContext();
      window.removeEventListener('click', handleFirstUserInteraction);
    };
    window.addEventListener('click', handleFirstUserInteraction);
    return () => window.removeEventListener('click', handleFirstUserInteraction);
  }, []);

  // Process both images on component mount
  useEffect(() => {
    Promise.all([
      removeBackground(mcqueenLeft),
      removeBackground(mcqueenRight)
    ]).then(([leftSrc, rightSrc]) => {
      setLeftProcessed(leftSrc);
      setRightProcessed(rightSrc);
    });
  }, []);

  // Butter-smooth direct DOM scroll mapping
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updatePosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    const updatePosition = () => {
      const scrollY = window.scrollY;
      const winW = window.innerWidth;
      const startScroll = 180;
      const endScroll = 1200;
      const scrollRange = endScroll - startScroll;
      let progress = (scrollY - startScroll) / scrollRange;
      progress = Math.max(0, Math.min(1, progress));

      const carEl = carRef.current;
      if (!carEl) return;

      // Hide McQueen on mobile viewports (< 768px) to prevent overlapping bottom HUD elements
      if (winW < 768) {
        carEl.style.opacity = '0';
        carEl.style.pointerEvents = 'none';
        return;
      }

      // Toggle container visibility (use opacity & pointer-events to prevent layout reflows)
      if (scrollY > 120) {
        carEl.style.opacity = '1';
        carEl.style.pointerEvents = 'auto';
      } else {
        carEl.style.opacity = '0';
        carEl.style.pointerEvents = 'none';
        return;
      }

      // Calculate translation coordinates
      
      let currentCarWidth = 290;
      if (winW < 480) {
        currentCarWidth = 120;
      } else if (winW < 768) {
        currentCarWidth = 170;
      }

      const isMobileDevice = winW < 768;
      const startX = winW - (isMobileDevice ? currentCarWidth * 0.4 : 50);
      const midX = winW * 0.45;
      const endX = 0;

      const startY = isMobileDevice ? 100 : 180;
      const midY = isMobileDevice ? -150 : -280;
      const endY = 0;

      const startRot = -18;
      const midRot = 0;
      const endRot = 0;

      let x, y, rotation;
      const isRight = progress >= 0.5;

      if (progress < 0.5) {
        const t = progress / 0.5;
        x = startX + (midX - startX) * t;
        y = startY + (midY - startY) * t;
        rotation = startRot + (midRot - startRot) * t;
      } else {
        const t = (progress - 0.5) / 0.5;
        x = midX + (endX - midX) * t;
        y = midY + (endY - midY) * t;
        rotation = midRot + (endRot - midRot) * t + (8 * (1 - t) * t); 
      }

      // Update position coordinates instantly via transform hardware acceleration
      carEl.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg)`;

      // Toggle left and right car models visibility directly on the DOM
      if (leftCarRef.current && rightCarRef.current) {
        if (!isRight) {
          leftCarRef.current.style.opacity = '1';
          leftCarRef.current.style.visibility = 'visible';
          rightCarRef.current.style.opacity = '0';
          rightCarRef.current.style.visibility = 'hidden';
        } else {
          leftCarRef.current.style.opacity = '0';
          leftCarRef.current.style.visibility = 'hidden';
          rightCarRef.current.style.opacity = '1';
          rightCarRef.current.style.visibility = 'visible';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    const messages = [
      "Speed up with Chimbu! ⚡ Kachow!",
      "Speed. I am Speed. Chimbu is the Driver! 🏁"
    ];
    setSpeechText(messages[Math.floor(Math.random() * messages.length)]);
    setShowSpeech(true);

    // Play the V8 engine start-up rev sound
    playEngineRevSound();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setShowSpeech(false);
  };

  const handleCarClick = () => {
    setClicked(true);
    setSpeechText("Kachow! Let's burn some rubber, Chimbu! 🏎️💨");
    setShowSpeech(true);

    // Rev engine sound on click too
    playEngineRevSound();
    
    // Focus console inputs
    const inputBar = document.querySelector('input[type="text"]');
    if (inputBar) {
      inputBar.focus();
    }

    setTimeout(() => {
      setClicked(false);
    }, 1200);
  };

  return (
    <div
      ref={carRef}
      onClick={handleCarClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed',
        bottom: '95px',
        left: '30px', // Parked on the left side of the page
        width: `${carWidth}px`,
        height: `${carHeight}px`,
        zIndex: 9999,
        cursor: 'pointer',
        display: 'flex', // Always flex, visibility managed by opacity & pointerEvents
        opacity: 0,
        pointerEvents: 'none', // Prevent intercepting clicks when hidden
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        transformStyle: 'preserve-3d',
        willChange: 'transform', // tells GPU to prepare for smooth motion
      }}
    >
      {/* Speech Bubble */}
      {showSpeech && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% - 8px)',
            left: '30px',
            background: 'var(--accent-dark)',
            color: '#ffffff',
            padding: '0.6rem 0.9rem',
            borderRadius: '12px 12px 12px 2px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            pointerEvents: 'none',
            animation: 'speechBubbleFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {speechText}
          {/* Arrow */}
          <div
            style={{
              position: 'absolute',
              bottom: '-5px',
              left: '15px',
              width: '0',
              height: '0',
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '6px solid var(--accent-dark)',
            }}
          />
        </div>
      )}

      {/* Main Car Images Stack container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          animation: clicked 
            ? 'mcqueenRev 0.15s infinite' 
            : hovered 
              ? 'mcqueenIdleRumble 0.12s infinite' 
              : 'none',
        }}
      >
        {/* Left Car Image (Visible during climbing: scrollProgress < 0.5) */}
        <img
          ref={leftCarRef}
          src={leftProcessed || mcqueenLeft}
          alt="Lightning McQueen Left"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 1,
            visibility: 'visible',
            transition: 'opacity 0.05s ease',
          }}
        />

        {/* Right Car Image (Visible during slide-down: scrollProgress >= 0.5) */}
        <img
          ref={rightCarRef}
          src={rightProcessed || mcqueenRight}
          alt="Lightning McQueen Right"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity 0.05s ease',
          }}
        />
      </div>

      {/* McQueen rumbles and revs styles */}
      <style>{`
        @keyframes speechBubbleFadeIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes mcqueenIdleRumble {
          0%, 100% { transform: translate(0, 0) scaleY(1); }
          50% { transform: translate(0.5px, -0.5px) scaleY(1.02); }
        }
        @keyframes mcqueenRev {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(1px, -1.2px) rotate(0.6deg); }
          50% { transform: translate(-1px, 1.2px) rotate(-0.6deg); }
          75% { transform: translate(1px, 1.2px) rotate(0.6deg); }
        }
      `}</style>
    </div>
  );
};

export default LightningMcqueen;
