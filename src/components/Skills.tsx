import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Cpu, Layout, Code, Server, Star } from "lucide-react";
import { playClickSound, playHoverSound } from "../utils/audio";

export default function Skills() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = width < 480 ? 380 : 500);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      height = canvas.height = width < 480 ? 380 : 500;
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      setHoveredSkill(null);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      setHoveredSkill(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchstart", handleTouchMove, { passive: true });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd);

    // Dynamic Galaxy Node definition
    class SkillNode {
      name: string;
      orbitRadius: number;
      angle: number;
      speed: number;
      size: number;
      baseColor: string;
      glowColor: string;
      
      // Coordinate offsets for mouse repulsion
      ox: number = 0;
      oy: number = 0;
      x: number = 0;
      y: number = 0;

      constructor(name: string, orbitRadius: number, angle: number, speed: number, color: string, glow: string) {
        this.name = name;
        this.orbitRadius = orbitRadius;
        this.angle = angle;
        this.speed = speed;
        this.size = 26;
        this.baseColor = color;
        this.glowColor = glow;
      }

      update(centerX: number, centerY: number, mx: number, my: number, scale: number) {
        const targetRadius = this.orbitRadius * scale;
        // Target orbit coordinate
        const targetX = centerX + Math.cos(this.angle) * targetRadius;
        const targetY = centerY + Math.sin(this.angle) * targetRadius;

        this.angle += this.speed;

        // Mouse Repulsion math
        const dx = targetX - mx;
        const dy = targetY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let rx = 0;
        let ry = 0;

        const maxRepelDist = 90 * scale;
        if (dist < maxRepelDist) {
          const repelForce = (maxRepelDist - dist) * 0.45; // intensity factor
          rx = (dx / dist) * repelForce;
          ry = (dy / dist) * repelForce;
        }

        // Return spring physics
        this.ox += (rx - this.ox) * 0.1;
        this.oy += (ry - this.oy) * 0.1;

        this.x = targetX + this.ox;
        this.y = targetY + this.oy;
      }

      draw(c: CanvasRenderingContext2D, mx: number, my: number, scale: number, isDark: boolean) {
        const currentSize = this.size * scale;
        const isMouseOver = Math.sqrt((this.x - mx) ** 2 + (this.y - my) ** 2) < currentSize;

        // Draw orbital trailing visual
        c.save();
        if (isDark) {
          c.shadowBlur = isMouseOver ? 16 : 6;
          c.shadowColor = this.glowColor;
        } else {
          c.shadowBlur = isMouseOver ? 10 : 0;
          c.shadowColor = this.glowColor;
        }

        // Draw outer glowing bubble
        c.fillStyle = isMouseOver 
          ? (isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(15, 23, 42, 0.08)") 
          : (isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.015)");
        c.strokeStyle = this.glowColor;
        c.lineWidth = 1.2 * scale;
        c.beginPath();
        c.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        c.fill();
        c.stroke();

        // Draw skill node text
        c.shadowBlur = 0;
        c.fillStyle = isMouseOver 
          ? (isDark ? "#ffffff" : "#0f172a") 
          : (isDark ? "#cbd5e1" : "#475569");
        c.font = `bold ${Math.max(8, Math.round(10.5 * scale))}px 'JetBrains Mono', monospace`;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.fillText(this.name, this.x, this.y);
        c.restore();

        if (isMouseOver) {
          // Notify hover state
          setHoveredSkill(this.name);
        }
      }
    }

    const nodes = [
      new SkillNode("Python", 80, 0, 0.005, "#3776AB", "rgba(59, 130, 246, 0.6)"),
      new SkillNode("C", 95, Math.PI * 0.6, -0.004, "#00599C", "rgba(59, 130, 246, 0.6)"),
      new SkillNode("SQL", 110, Math.PI * 1.3, 0.003, "#F29111", "rgba(245, 158, 11, 0.6)"),
      new SkillNode("Java", 140, Math.PI * 0.2, -0.003, "#007396", "rgba(59, 130, 246, 0.6)"),
      new SkillNode("Verilog", 160, Math.PI * 0.8, 0.002, "#8B5CF6", "rgba(139, 92, 246, 0.6)"),
      new SkillNode("VLSI", 180, Math.PI * 1.5, -0.002, "#8B5CF6", "rgba(139, 92, 246, 0.6)"),
      new SkillNode("React", 215, Math.PI * 0.4, 0.0015, "#61DAFB", "rgba(59, 130, 246, 0.6)"),
      new SkillNode("Node", 230, Math.PI * 1.1, -0.0018, "#339933", "rgba(59, 130, 246, 0.6)"),
      new SkillNode("AI", 245, Math.PI * 1.7, 0.0012, "#E10098", "rgba(139, 92, 246, 0.6)"),
    ];

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Determine light vs dark theme dynamically from document element class list
      const isDark = document.documentElement.classList.contains("dark");

      // Calculate mobile scale factor to prevent orbits overflow
      const scale = Math.min(1.0, width / 550);

      // 1. Draw central anchor "CORE SV"
      ctx.save();
      if (isDark) {
        ctx.shadowBlur = 30;
        ctx.shadowColor = "rgba(59, 130, 246, 0.4)";
        ctx.fillStyle = "rgba(59, 130, 246, 0.15)";
        ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
      } else {
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(59, 130, 246, 0.2)";
        ctx.fillStyle = "rgba(59, 130, 246, 0.08)";
        ctx.strokeStyle = "rgba(59, 130, 246, 0.35)";
      }
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 32 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.fillStyle = isDark ? "#ffffff" : "#0f172a";
      ctx.font = `bold ${Math.max(8, Math.round(10.5 * scale))}px 'Syne', sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SV CORE", cx, cy);
      ctx.restore();

      // 2. Draw faint orbital paths
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(15, 23, 42, 0.05)";
      ctx.lineWidth = 1;
      [80, 110, 160, 230].forEach((radius) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * scale, 0, Math.PI * 2);
        ctx.stroke();
      });

      // 3. Update & Draw nodes
      nodes.forEach((node) => {
        node.update(cx, cy, mouse.x, mouse.y, scale);
        node.draw(ctx, mouse.x, mouse.y, scale, isDark);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchstart", handleTouchMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-16 sm:py-24 px-4 sm:px-6 bg-transparent border-t border-slate-200 dark:border-white/5 relative select-none">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left column: static card descriptions */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <span className="font-mono text-xs text-violet-500 dark:text-violet-400 tracking-[0.2em] uppercase mb-3 sm:mb-4 block">// expertise galaxy</span>
          <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white mb-4 sm:mb-6 tracking-tight leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            The Skill Galaxy
          </h2>
          <p className="text-slate-600 dark:text-white/60 text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 font-light">
            Forget boring progress bars. Play with my interactive tech stack. Drag your mouse or finger across the canvas to interact with the gravitational fields. Let the orbit pathways guide your discovery.
          </p>

          <div className="space-y-3 sm:space-y-4">
            <div
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 flex gap-3 sm:gap-4 items-center hover:border-blue-500/30 transition-all cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Code className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-xs sm:text-sm">Languages</h4>
                <p className="text-slate-500 dark:text-white/50 text-[11px] sm:text-xs">C, Python, SQL, Java.</p>
              </div>
            </div>

            <div
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 flex gap-3 sm:gap-4 items-center hover:border-violet-500/30 transition-all cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <Cpu className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-xs sm:text-sm">VLSI & Hardware Systems</h4>
                <p className="text-slate-500 dark:text-white/50 text-[11px] sm:text-xs">Verilog HDL, AMBA, IC Layout, RTL.</p>
              </div>
            </div>

            <div
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 flex gap-3 sm:gap-4 items-center hover:border-amber-500/30 transition-all cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Layout className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold text-xs sm:text-sm">Frameworks & Tools</h4>
                <p className="text-slate-500 dark:text-white/50 text-[11px] sm:text-xs">React, Node, AI Integration, SQLite, Git.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Galaxy canvas */}
        <div className="lg:col-span-7 relative flex justify-center items-center bg-slate-900/[0.01] dark:bg-white/[0.01] border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl">
          <canvas ref={canvasRef} className="max-w-full block" />
          
          {/* Active hover info badge */}
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bottom-4 px-4 py-2 bg-white/95 dark:bg-slate-950/90 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-mono text-blue-600 dark:text-blue-400 flex items-center gap-1.5 shadow-lg backdrop-blur-md"
            >
              <Star className="w-3.5 h-3.5 fill-current animate-spin" style={{ animationDuration: '3s' }} />
              Interfacing Skill Node: <span className="text-slate-900 dark:text-white font-bold">{hoveredSkill}</span>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
