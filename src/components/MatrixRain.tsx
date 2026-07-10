'use client';

import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  onClose: () => void;
}

export default function MatrixRain({ onClose }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters list (katakana, binary numbers, alphabets)
    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ10010101ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArr = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops: number[] = Array(columns).fill(1).map(() => Math.floor(Math.random() * -50)); // stagger start positions

    const draw = () => {
      // Semi-transparent black background to create fading trailing effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff88'; // matrix green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw character
        ctx.fillText(text, x, y);

        // Highlight head character
        ctx.fillStyle = '#ffffff';
        ctx.fillText(text, x, y);
        ctx.fillStyle = '#00ff88';

        // Reset drop position if it goes past screen boundary
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment drop y coordinate
        drops[i]++;
      }
    };

    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9995] bg-black/60 backdrop-blur-[2px] cursor-pointer overflow-hidden flex items-center justify-center"
      title="Click anywhere to exit Matrix Digital Rain"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
      
      {/* Floating HUD Escape Indicator */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black/80 border border-matrix/30 text-matrix px-5 py-2.5 rounded-full font-mono text-xs select-none tracking-widest pointer-events-none shadow-[0_0_20px_rgba(0,255,136,0.15)] uppercase animate-pulse">
        [ Click anywhere to exit Matrix ]
      </div>
    </div>
  );
}
