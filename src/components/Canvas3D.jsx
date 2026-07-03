import React, { useEffect, useRef } from 'react';

const Canvas3D = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let points = [];
    const numPoints = 85;
    const sphereRadius = 180;
    
    // Resize Handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Mouse tracker
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX - window.innerWidth / 2) * 0.12;
      mouse.targetY = (e.clientY - window.innerHeight / 2) * 0.12;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize 3D points inside a sphere
    const initPoints = () => {
      points = [];
      for (let i = 0; i < numPoints; i++) {
        // Spherical coordinate calculations to distribute points evenly
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        
        const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
        const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
        const z = sphereRadius * Math.cos(phi);
        
        points.push({ x, y, z, originalX: x, originalY: y, originalZ: z });
      }
    };

    // 3D rotation math
    const rotateX = (point, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y = point.y * cos - point.z * sin;
      const z = point.y * sin + point.z * cos;
      return { ...point, y, z };
    };

    const rotateY = (point, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = point.x * cos + point.z * sin;
      const z = -point.x * sin + point.z * cos;
      return { ...point, x, z };
    };

    const rotateZ = (point, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = point.x * cos - point.y * sin;
      const y = point.x * sin + point.y * cos;
      return { ...point, x, y };
    };

    initPoints();

    let angleX = 0.003;
    let angleY = 0.002;
    let angleZ = 0.001;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width * 0.75; // Align to the right side on desktop
      const centerY = canvas.height * 0.5;
      
      // Responsive alignment
      const actualCenterX = canvas.width < 968 ? canvas.width * 0.5 : centerX;
      
      // Interpolate mouse coordinates for fluid movement
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const scrollY = window.scrollY;

      // Spin factors based on time + scroll offset
      const currentAngleX = angleX + scrollY * 0.00008 + mouse.y * 0.0001;
      const currentAngleY = angleY + scrollY * 0.00005 + mouse.x * 0.0001;
      
      // Project 3D points to 2D screen coords
      const focalLength = 320;
      const projected = points.map((p) => {
        // Apply rotations
        let rotated = rotateX(p, currentAngleX);
        rotated = rotateY(rotated, currentAngleY);
        rotated = rotateZ(rotated, angleZ);

        // Slow spin for the base parameters
        p.originalX = rotated.x;
        p.originalY = rotated.y;
        p.originalZ = rotated.z;

        // Camera perspective translation
        const zPos = rotated.z + 400; // push depth
        const scale = focalLength / zPos;
        
        return {
          x: rotated.x * scale + actualCenterX,
          y: rotated.y * scale + centerY,
          size: Math.max(0.5, (rotated.z + sphereRadius) / (sphereRadius * 2) * 3 + 1),
          alpha: (rotated.z + sphereRadius) / (sphereRadius * 2) * 0.6 + 0.15, // fade when behind
          z: rotated.z
        };
      });

      // Draw Connections (3D distance check)
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = points[i].originalX - points[j].originalX;
          const dy = points[i].originalY - points[j].originalY;
          const dz = points[i].originalZ - points[j].originalZ;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Only connect nodes close to each other in true 3D space
          if (distance < 98) {
            const minZ = Math.min(projected[i].z, projected[j].z);
            const alphaVal = (minZ + sphereRadius) / (sphereRadius * 2) * 0.18 + 0.02;
            
            ctx.strokeStyle = `rgba(197, 168, 128, ${alphaVal})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Bronze accent node colors
        ctx.fillStyle = `rgba(197, 168, 128, ${p.alpha})`;
        ctx.fill();
        
        // Muted white highlights on front nodes
        if (p.z > 80) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.5})`;
          ctx.fill();
        }
      });

      // Slowly mutate angles over time
      angleZ += 0.0003;

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
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Canvas3D;
