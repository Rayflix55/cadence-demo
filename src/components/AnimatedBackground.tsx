import { useEffect, useRef } from "react";
import { useStore } from "../store";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Set optimized particle count depending on viewport size to run perfectly on low-end units
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 12 : 20;

    // Resize-Safety: Sync canvas width and height dynamically with container size
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    // Warm, ambient particle color selectors mapping to light/dark themes
    const getThemeColors = (isDark: boolean) => {
      if (isDark) {
        return [
          { color: "255, 107, 53", weight: 0.5 }, // #FF6B35 (Orange)
          { color: "255, 157, 92", weight: 0.3 }, // #FF9D5C (Warm Amber)
          { color: "255, 184, 77", weight: 0.2 }, // #FFB84D (Golden Yellow)
        ];
      } else {
        return [
          { color: "255, 87, 34", weight: 0.7 },  // #FF5722 (Deep Rich Orange)
          { color: "255, 122, 61", weight: 0.3 }, // #FF7A3D (Amber Orange)
        ];
      }
    };

    const getRandomColor = (isDark: boolean) => {
      const palette = getThemeColors(isDark);
      const rand = Math.random();
      let cumulative = 0;
      for (const item of palette) {
        cumulative += item.weight;
        if (rand <= cumulative) return item.color;
      }
      return palette[0].color;
    };

    // Instantiate premium ambient email envelope particles
    const createParticles = () => {
      particles = [];
      const isDark = theme === "dark";
      const w = canvas.width || window.innerWidth;
      const h = canvas.height || window.innerHeight;

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 6 + 12; // 12px to 18px mixed sizes - highly lightweight & responsive
        const baseAlpha = isDark 
          ? Math.random() * 0.16 + 0.20  // elegant subtle overlays
          : Math.random() * 0.10 + 0.10; // softer presence in light mode

        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.10, // Slow drift
          vy: (Math.random() - 0.5) * 0.10,
          size,
          alpha: baseAlpha,
          baseAlpha,
          color: getRandomColor(isDark),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.002, // slow, comforting rotary motion
        });
      }
    };

    createParticles();

    // Redraw loop on theme swap
    const isDark = theme === "dark";
    particles.forEach(p => {
      p.color = getRandomColor(isDark);
      p.baseAlpha = isDark 
        ? Math.random() * 0.16 + 0.20 
        : Math.random() * 0.10 + 0.10;
      p.alpha = p.baseAlpha;
    });

    const drawEnvelope = (
      pCtx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      color: string,
      alpha: number
    ) => {
      const w = size;
      const h = size * 0.62; // standard 1:1.6 layout ratio

      pCtx.save();
      pCtx.translate(x, y);
      pCtx.rotate(rotation);

      // CRITICAL PERFORMANCE FIX FOR LOW-END DEVICES:
      // Remove all shadowColor & shadowBlur operations!
      // This prevents expensive CPU-bound canvas blurring calculations.

      // Border and background fill styling
      pCtx.strokeStyle = `rgba(${color}, ${alpha})`;
      pCtx.fillStyle = `rgba(${color}, ${alpha * 0.08})`; // micro interior tint
      pCtx.lineWidth = 1.25; // elegant fine line weight
      pCtx.lineCap = "round";
      pCtx.lineJoin = "round";

      // 1. Draw core envelope body
      pCtx.beginPath();
      pCtx.rect(-w / 2, -h / 2, w, h);
      pCtx.fill();
      pCtx.stroke();

      // 2. Draw outer boundary triangular seal fold flap lines
      pCtx.beginPath();
      pCtx.moveTo(-w / 2, -h / 2);
      pCtx.lineTo(0, h * 0.08);
      pCtx.lineTo(w / 2, -h / 2);

      // 3. Draw lower corner elements
      pCtx.moveTo(-w / 2, h / 2);
      pCtx.lineTo(-w * 0.16, -h * 0.06);
      pCtx.moveTo(w / 2, h / 2);
      pCtx.lineTo(w * 0.16, -h * 0.06);

      pCtx.stroke();
      pCtx.restore();
    };

    const render = (time: number) => {
      // Clear previous layout beautifully
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Slow sinus wave pacing factor
      const pulseFactor = Math.sin(time * 0.0005);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle gently
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Wrap particles elegantly on limits edge
        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;

        // Twinkling flux pulse based on location coordinates & cycle
        const currentAlpha = Math.max(
          0.04, 
          Math.min(
            p.baseAlpha * 1.5, 
            p.baseAlpha + pulseFactor * 0.06 * (i % 2 === 0 ? 1 : -1)
          )
        );

        // Render custom styled email envelope on coordinate grid
        drawEnvelope(ctx, p.x, p.y, p.size, p.rotation, p.color, currentAlpha);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [theme]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0"
      id="ambient-dust-canvas-wrapper"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full pointer-events-none opacity-90"
        id="ambient-dust-canvas"
      />
    </div>
  );
}
