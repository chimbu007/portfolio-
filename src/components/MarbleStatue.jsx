import React, { useEffect, useState } from 'react';
import statueImg from '../assets/chimbu_statue.png';

const MarbleStatue = () => {
  const [processedSrc, setProcessedSrc] = useState(null);

  // Clean background eraser: scans and flood-fills the off-white boundaries
  useEffect(() => {
    const img = new Image();
    img.src = statueImg;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const w = canvas.width;
        const h = canvas.height;

        // Flood-fill background extraction starting from the 4 corners
        const visited = new Uint8Array(w * h);
        const queue = [];

        const addSeed = (x, y) => {
          const idx = y * w + x;
          if (!visited[idx]) {
            visited[idx] = 1;
            queue.push([x, y]);
          }
        };

        // Add seeds along all four edges of the image boundary
        for (let x = 0; x < w; x++) {
          addSeed(x, 0);
          addSeed(x, h - 1);
        }
        for (let y = 0; y < h; y++) {
          addSeed(0, y);
          addSeed(w - 1, y);
        }

        while (queue.length > 0) {
          const [cx, cy] = queue.shift();
          const pixelIdx = (cy * w + cx) * 4;
          const r = data[pixelIdx];
          const g = data[pixelIdx + 1];
          const b = data[pixelIdx + 2];

          // Match off-white studio backgrounds (RGB > 240)
          if (r > 240 && g > 240 && b > 240) {
            data[pixelIdx + 3] = 0; // turn transparent

            // Check 4 cardinal neighbors
            const neighbors = [
              [cx + 1, cy],
              [cx - 1, cy],
              [cx, cy + 1],
              [cx, cy - 1]
            ];

            for (const [nx, ny] of neighbors) {
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                const nidx = ny * w + nx;
                if (!visited[nidx]) {
                  visited[nidx] = 1;
                  queue.push([nx, ny]);
                }
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setProcessedSrc(canvas.toDataURL());
      } catch (err) {
        console.warn("MarbleStatue: Programmatic background removal bypassed (CORS/Canvas Security):", err);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%', // Take full height of parent block to prevent clipping
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
        pointerEvents: 'none'
      }}
    >
      <div 
        style={{ 
          position: 'relative', 
          width: 'min(420px, 80vw)', 
          height: 'min(560px, 60vh)', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Softbox reflection highlight overlay */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '15%',
            width: '70%',
            height: '80%',
            background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.22) 0%, transparent 60%)',
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
            zIndex: 2,
            borderRadius: '50%'
          }}
        />

        {/* Display either processed transparent image or fallback to raw img */}
        <img
          src={processedSrc || statueImg}
          alt="Chimbu Marble Statue"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />

        {/* Pedestal drop shadow */}
        <div
          style={{
            position: 'absolute',
            bottom: '1%', // Repositioned to align perfectly with the pedestal bottom
            left: '50%',
            transform: 'translateX(-50%)',
            width: '62%',
            height: '35px',
            background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.08) 0%, rgba(0,0,0,0.01) 60%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
      </div>
    </div>
  );
};

export default MarbleStatue;
