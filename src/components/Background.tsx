import { useEffect, useRef } from "react";

interface BackgroundProps {
  darkMode?: boolean;
}

export default function Background({ darkMode = true }: BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const darkModeRef = useRef(darkMode);

  // Sync dark mode ref to read it inside the render loop without restarting it
  useEffect(() => {
    darkModeRef.current = darkMode;
  }, [darkMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position locally in a single object
    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle class definition
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 0.6;
      }

      update(mx: number, my: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Push away from mouse or finger touch
        const dx = this.x - mx;
        const dy = this.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * 1.6;
          this.y += (dy / dist) * force * 1.6;
        }
      }

      draw(c: CanvasRenderingContext2D, isDark: boolean) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = isDark
          ? (Math.random() > 0.5 ? "rgba(59, 130, 246, 0.25)" : "rgba(124, 58, 237, 0.25)")
          : (Math.random() > 0.5 ? "rgba(59, 130, 246, 0.18)" : "rgba(124, 58, 237, 0.18)");
        c.fill();
      }
    }

    // Adapt particle count for performance (mobile vs desktop)
    const particleCount = width < 768 ? 25 : 60;
    const connectionRadius = width < 768 ? 85 : 120;
    const particles: Particle[] = Array.from({ length: particleCount }, () => new Particle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = darkModeRef.current;

      // Draw mouse light glow
      if (mouse.x > -500) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          width < 768 ? 180 : 300
        );
        if (isDark) {
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.08)");
          gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.04)");
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        } else {
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.05)");
          gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.02)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Update & Draw particles
      particles.forEach((p) => {
        p.update(mouse.x, mouse.y);
        p.draw(ctx, isDark);
      });

      // Connect particles close to each other
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionRadius) {
            const alpha = ((connectionRadius - dist) / connectionRadius) * 0.15;
            ctx.strokeStyle = isDark
              ? `rgba(139, 92, 246, ${alpha})`
              : `rgba(99, 102, 241, ${alpha * 0.7})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div id="background-root" className="fixed inset-0 -z-50 overflow-hidden bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      {/* 3D Gradient mesh background blobs */}
      <div className="absolute inset-0 opacity-40 dark:opacity-40 mix-blend-multiply dark:mix-blend-screen pointer-events-none transition-all duration-500">
        {/* Aurora Blob 1 */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-blue-300/20 to-violet-300/10 dark:from-blue-600/30 dark:to-violet-600/20 blur-[100px] md:blur-[120px] animate-[float_16s_ease-in-out_infinite]" />
        
        {/* Aurora Blob 2 */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-indigo-300/15 to-fuchsia-300/15 dark:from-indigo-600/20 dark:to-fuchsia-600/25 blur-[100px] md:blur-[130px] animate-[float_20s_ease-in-out_infinite_reverse]" />
        
        {/* Aurora Blob 3 */}
        <div className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-amber-300/5 to-pink-300/5 dark:from-amber-500/10 dark:to-pink-600/10 blur-[90px] md:blur-[100px] animate-[float_12s_ease-in-out_infinite]" />
      </div>

      {/* Grid Pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 116, 139, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 116, 139, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Interactive canvas for particle and glow connection trail */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Animated noise overlay for tactile high-quality paper feeling */}
      <div 
        className="absolute inset-0 opacity-[0.012] dark:opacity-[0.015] pointer-events-none bg-repeat bg-center"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
