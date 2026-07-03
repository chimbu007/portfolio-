import React, { useEffect, useRef } from 'react';

const ShatterStage = () => {
  const backCanvasRef = useRef(null);
  const frontCanvasRef = useRef(null);

  useEffect(() => {
    const backCanvas = backCanvasRef.current;
    const frontCanvas = frontCanvasRef.current;
    if (!backCanvas || !frontCanvas) return;

    const backCtx = backCanvas.getContext('2d');
    const frontCtx = frontCanvas.getContext('2d');
    let animationFrameId;

    // Resize Handler
    const handleResize = () => {
      const parent = backCanvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      
      backCanvas.width = w;
      backCanvas.height = h;
      frontCanvas.width = w;
      frontCanvas.height = h;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Mouse coordinates tracker
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX - window.innerWidth / 2) * 0.12;
      mouse.targetY = (e.clientY - window.innerHeight / 2) * 0.12;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Vector drawing functions for the logos
    const drawReactLogo = (context, cx, cy, size) => {
      context.save();
      context.strokeStyle = '#00d8ff';
      context.lineWidth = size * 0.08;
      context.translate(cx, cy);
      for (let i = 0; i < 3; i++) {
        context.beginPath();
        context.ellipse(0, 0, size * 0.6, size * 0.22, (i * Math.PI) / 3, 0, Math.PI * 2);
        context.stroke();
      }
      context.beginPath();
      context.arc(0, 0, size * 0.1, 0, Math.PI * 2);
      context.fillStyle = '#00d8ff';
      context.fill();
      context.restore();
    };

    const drawNodeLogo = (context, cx, cy, size) => {
      context.save();
      context.fillStyle = '#6cc24a';
      context.translate(cx, cy);
      context.beginPath();
      context.moveTo(0, -size * 0.55);
      context.lineTo(size * 0.45, -size * 0.3);
      context.lineTo(size * 0.45, size * 0.3);
      context.lineTo(0, size * 0.55);
      context.lineTo(-size * 0.45, size * 0.3);
      context.lineTo(-size * 0.45, -size * 0.3);
      context.closePath();
      context.fill();

      context.strokeStyle = '#ffffff';
      context.lineWidth = size * 0.06;
      context.beginPath();
      context.moveTo(0, -size * 0.55);
      context.lineTo(0, size * 0.55);
      context.stroke();
      context.restore();
    };

    const drawGitLogo = (context, cx, cy, size) => {
      context.save();
      context.fillStyle = '#f05032';
      context.translate(cx, cy);
      context.rotate(Math.PI / 4);
      const dim = size * 0.45;
      context.beginPath();
      context.rect(-dim, -dim, dim * 2, dim * 2);
      context.fill();

      context.rotate(-Math.PI / 4);
      context.strokeStyle = '#ffffff';
      context.lineWidth = size * 0.08;
      context.beginPath();
      context.moveTo(-size * 0.1, -size * 0.3);
      context.lineTo(-size * 0.1, size * 0.3);
      context.stroke();

      context.beginPath();
      context.moveTo(-size * 0.1, 0);
      context.bezierCurveTo(size * 0.1, 0, size * 0.15, size * 0.1, size * 0.15, size * 0.2);
      context.stroke();

      context.fillStyle = '#ffffff';
      context.beginPath();
      context.arc(-size * 0.1, -size * 0.3, size * 0.12, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.arc(-size * 0.1, size * 0.3, size * 0.12, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.arc(size * 0.15, size * 0.2, size * 0.12, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawCoin = (context, cx, cy, size, name) => {
      context.beginPath();
      context.arc(cx, cy, size, 0, Math.PI * 2);
      context.fillStyle = '#121316';
      context.fill();

      context.beginPath();
      context.arc(cx, cy, size, 0, Math.PI * 2);
      const rimGrad = context.createLinearGradient(cx - size, cy - size, cx + size, cy + size);
      rimGrad.addColorStop(0, '#ffffff');
      rimGrad.addColorStop(0.3, '#1f2023');
      rimGrad.addColorStop(0.7, 'rgba(179, 147, 107, 0.35)');
      rimGrad.addColorStop(1, '#0c0d0f');
      context.strokeStyle = rimGrad;
      context.lineWidth = 1.5;
      context.stroke();

      if (name === 'React') drawReactLogo(context, cx, cy, size * 0.8);
      if (name === 'Node') drawNodeLogo(context, cx, cy, size * 0.8);
      if (name === 'Git') drawGitLogo(context, cx, cy, size * 0.8);

      context.fillStyle = '#7a7c82';
      context.font = `600 ${(size * 0.25).toFixed(0)}px var(--font-sans)`;
      context.textAlign = 'center';
      context.fillText(name === 'React' ? 'React.js' : name === 'Node' ? 'Node.js' : 'Git', cx, cy + (size * 0.55));

      context.beginPath();
      context.ellipse(cx, cy - (size * 0.15), size * 0.85, size * 0.6, 0, Math.PI, 0, false);
      const gloss = context.createLinearGradient(cx, cy - size, cx, cy);
      gloss.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      gloss.addColorStop(1, 'rgba(255, 255, 255, 0)');
      context.fillStyle = gloss;
      context.fill();
    };

    let time = 0;

    const animate = () => {
      backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
      frontCtx.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
      time += 0.012;

      // Eased mouse offsets
      mouse.x += (mouse.targetX - mouse.x) * 0.055;
      mouse.y += (mouse.targetY - mouse.y) * 0.055;

      const w = backCanvas.width;
      const h = backCanvas.height;
      const isSmallMobile = w < 480;
      const isTablet = w >= 480 && w < 968;
      const centerX = w / 2;
      const centerY = h / 2;

      const baseCoinSize = isSmallMobile ? 26 : isTablet ? 34 : 44;

      // --- REACT COIN (Right side of pedestal, floats gently) ---
      // Stable horizontal placement with minor float and mouse shift
      const reactCX = (isSmallMobile ? w * 0.86 : isTablet ? w * 0.78 : w * 0.62) - mouse.x * 0.65;
      const reactCY = (isSmallMobile ? h * 0.50 : isTablet ? h * 0.58 : h * 0.54) + Math.sin(time) * 6 - mouse.y * 0.45;
      
      frontCtx.save();
      frontCtx.shadowColor = 'rgba(0,0,0,0.06)';
      frontCtx.shadowBlur = 10;
      frontCtx.shadowOffsetY = 5;
      frontCtx.translate(reactCX, reactCY);
      frontCtx.rotate(0.12 + Math.sin(time * 0.3) * 0.04);
      drawCoin(frontCtx, 0, 0, baseCoinSize, "React");
      frontCtx.restore();

      // --- NODE.JS COIN (Bottom left, sits slightly behind/tilted) ---
      const nodeCX = (isSmallMobile ? w * 0.10 : isTablet ? w * 0.15 : w * 0.18) - mouse.x * 0.4;
      const nodeCY = (isSmallMobile ? h * 0.78 : isTablet ? h * 0.74 : h * 0.72) + Math.sin(time * 0.95 + 1.5) * 5 - mouse.y * 0.25;

      // Render to background context so it sits behind the central statue column
      backCtx.save();
      backCtx.shadowColor = 'rgba(0,0,0,0.06)';
      backCtx.shadowBlur = 10;
      backCtx.shadowOffsetY = 5;
      backCtx.translate(nodeCX, nodeCY);
      backCtx.rotate(0.55 + Math.sin(time * 0.4) * 0.03);
      drawCoin(backCtx, 0, 0, baseCoinSize * 0.9, "Node");
      backCtx.restore();

      // --- GIT COIN (Bottom right, sits in front/tilted) ---
      const gitCX = (isSmallMobile ? w * 0.90 : isTablet ? w * 0.85 : w * 0.82) - mouse.x * 0.3;
      const gitCY = (isSmallMobile ? h * 0.82 : isTablet ? h * 0.82 : h * 0.76) + Math.sin(time * 1.1 + 2.5) * 5 - mouse.y * 0.3;

      frontCtx.save();
      frontCtx.shadowColor = 'rgba(0,0,0,0.06)';
      frontCtx.shadowBlur = 10;
      frontCtx.shadowOffsetY = 5;
      frontCtx.translate(gitCX, gitCY);
      frontCtx.rotate(-0.4 + Math.sin(time * 0.5) * 0.03);
      drawCoin(frontCtx, 0, 0, baseCoinSize * 0.85, "Git");
      frontCtx.restore();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={backCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
      <canvas
        ref={frontCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 4,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default ShatterStage;
