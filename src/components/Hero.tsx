import { useEffect, useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Download, Mail, Star, Award, GraduationCap, Server } from "lucide-react";
import { playClickSound, playHoverSound } from "../utils/audio";

export default function Hero() {
  const roles = ["Founder", "Builder", "Engineer", "Developer", "Creator"];
  const [roleIndex, setRoleIndex] = useState(0);

  // Dynamic role rotator
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(roleTimer);
  }, []);

  // 3D Glassmorphism tilt physics
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState("");
  const [glowStyle, setGlowStyle] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalised tilt values (-15deg to 15deg max)
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 12;
    const rotateY = -((rect.width / 2 - x) / (rect.width / 2)) * 12;

    setTiltStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowStyle({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setTiltStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlowStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  const downloadResume = () => {
    window.open("https://docs.google.com/uc?export=download&id=1zQ52vOjoZSN9T8UY922UqqEB5eM5G2_F", "_blank");
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-height-[100vh] flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left column text introduction */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold mb-6 uppercase tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
            Available for Internships & Collaborations
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tight mb-4 text-slate-900 dark:text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Saketh <br />
            <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-amber-500 bg-clip-text text-transparent bg-[size:200%] animate-[shimmer_5s_linear_infinite]">
              Vedullapalli
            </span>
          </motion.h1>

          {/* Role Rotator text reveal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-2xl font-bold tracking-wide uppercase text-slate-600 dark:text-gray-400 mb-6 flex items-center gap-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span>I am a</span>
            <span className="text-blue-500 dark:text-blue-400 relative inline-block min-w-[150px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-600 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mb-8 font-light"
          >
            Electronics & Communication Engineering student at Aditya University (Class of 2028). Building multi-tier architectures merging the precision of <strong>VLSI design</strong> and high-performance **full-stack software systems**.
          </motion.p>

          {/* Premium sweep buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8"
          >
            {/* Primary button with shine sweep */}
            <button
              onClick={() => { playClickSound(); scrollToSection("projects"); }}
              onMouseEnter={playHoverSound}
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all overflow-hidden cursor-pointer shadow-lg shadow-blue-500/15"
            >
              {/* Sweep glow */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              <span>Explore My Work</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary button */}
            <button
              onClick={() => { playClickSound(); downloadResume(); }}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/30 text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>

            {/* Contact quicklink */}
            <button
              onClick={() => { playClickSound(); scrollToSection("contact"); }}
              onMouseEnter={playHoverSound}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-slate-200/60 dark:border-white/5 hover:bg-slate-900/5 dark:hover:bg-white/5 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white font-medium text-sm transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </button>
          </motion.div>

          {/* Trust/Milestone Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" /> Founder of KETH
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" /> VLSI Specialist
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-400/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5" /> ECE Student
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/5 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-600 dark:text-gray-400 text-xs font-semibold">
              <Server className="w-3.5 h-3.5" /> Software Dev
            </span>
          </motion.div>
        </div>

        {/* Right column Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center perspective-[1000px]"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: tiltStyle,
              transition: tiltStyle ? "none" : "all 0.5s ease-out",
            }}
            className="relative w-full max-w-[360px] p-6 rounded-3xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-xl dark:shadow-2xl overflow-hidden group select-none cursor-grab active:cursor-grabbing"
          >
            {/* Dynamic mouse interactive glow overlay */}
            <div
              className="absolute pointer-events-none rounded-full blur-[40px] transition-opacity duration-300"
              style={{
                width: "150px",
                height: "150px",
                background: "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(124,58,237,0.1) 70%, transparent 100%)",
                left: `${glowStyle.x - 75}px`,
                top: `${glowStyle.y - 75}px`,
                opacity: glowStyle.opacity,
              }}
            />

            {/* Glowing top boundary strip */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-amber-500 opacity-60" />

            {/* Avatar profile */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-blue-500 to-violet-500 flex items-center justify-center font-display font-extrabold text-white text-xl tracking-wider">
                SV
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Saketh Vedullapalli
                </h3>
                <p className="text-slate-500 dark:text-gray-500 text-xs">ECE '28 · CGPA 7.8</p>
              </div>
            </div>

            {/* Profile Statistics Grid */}
            <div className="grid grid-cols-3 gap-2.5 mb-6">
              <div className="p-3 bg-slate-900/[0.03] dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-xl text-center">
                <span className="block font-display font-black text-blue-500 dark:text-blue-400 text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>4+</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium">Projects</span>
              </div>
              <div className="p-3 bg-slate-900/[0.03] dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-xl text-center">
                <span className="block font-display font-black text-violet-500 dark:text-violet-400 text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>3+</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium">Interns</span>
              </div>
              <div className="p-3 bg-slate-900/[0.03] dark:bg-white/5 border border-slate-200/50 dark:border-white/5 rounded-xl text-center">
                <span className="block font-display font-black text-amber-500 dark:text-amber-300 text-xl" style={{ fontFamily: "'Syne', sans-serif" }}>5+</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 dark:text-gray-500 font-medium">Certs</span>
              </div>
            </div>

            {/* Technical Chips */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              <span className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-400/15 text-blue-600 dark:text-blue-400 text-[10px] font-mono">Python</span>
              <span className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-400/15 text-blue-600 dark:text-blue-400 text-[10px] font-mono">SQL</span>
              <span className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-400/15 text-blue-600 dark:text-blue-400 text-[10px] font-mono">C Language</span>
              <span className="px-2.5 py-1 rounded bg-violet-500/10 border border-violet-400/15 text-violet-600 dark:text-violet-400 text-[10px] font-mono">Verilog HDL</span>
              <span className="px-2.5 py-1 rounded bg-violet-500/10 border border-violet-400/15 text-violet-600 dark:text-violet-400 text-[10px] font-mono">VLSI Design</span>
              <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-400/15 text-amber-600 dark:text-amber-400 text-[10px] font-mono">AMBA</span>
            </div>

            {/* Active presence dot */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Active System Connection Established
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
