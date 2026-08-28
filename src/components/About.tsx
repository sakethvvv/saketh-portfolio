import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Award, Zap, Code, ShieldCheck } from "lucide-react";

// Count Up component that triggers on viewport entrance
function CountUp({ end, decimals = 0, duration = 2 }: { end: number; decimals?: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = ease * end;
      setCount(val);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [end, inView, duration]);

  return <span ref={ref}>{count.toFixed(decimals)}</span>;
}

export default function About() {
  const textRef = useRef<HTMLDivElement | null>(null);
  const textInView = useInView(textRef, { once: true, margin: "-100px" });

  // Word-by-word reveal setup
  const bioText = "I'm Saketh Vedullapalli, an Electronics and Communication Engineering student at Aditya University. My focus bridges two worlds that rarely intersect: the precision of VLSI hardware design and the velocity of modern software development. I am a builder at heart—motivated to solve systemic, scaling challenges by designing, engineering, and launching robust technical solutions.";
  const words = bioText.split(" ");

  // Mouse parallax motion for the highlight cards
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.015;
      const y = (e.clientY - window.innerHeight / 2) * 0.015;
      setMouseOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-6 bg-transparent overflow-hidden select-none">
           {/* Huge background watermarked outline word "ENGINEER" */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[10vw] font-black tracking-widest pointer-events-none opacity-[0.03] dark:opacity-[0.015] leading-none select-none uppercase text-slate-400 dark:text-white/40 transition-opacity hidden sm:block"
        style={{
          fontFamily: "'Syne', sans-serif",
          WebkitTextStroke: "1px currentColor",
        }}
      >
        ENGINEER
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Left Column: Word-by-word reveal biography */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          <span className="font-mono text-xs text-blue-500 dark:text-blue-400 tracking-[0.2em] uppercase mb-3 sm:mb-4 block">// biography</span>
          <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white mb-6 sm:mb-8 tracking-tight leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            The Hardware–Software Synthesis
          </h2>

          {/* Staggered word reveal */}
          <div ref={textRef} className="flex flex-wrap gap-x-1.5 sm:gap-x-2 gap-y-2 sm:gap-y-3 max-w-xl mb-8 sm:mb-12">
            {words.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0.1, y: 10 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: idx * 0.02, ease: "easeOut" }}
                className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-700 dark:text-white/70 font-light leading-relaxed"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
            <div 
              style={{ transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)` }}
              className="p-6 rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 flex items-center justify-center mb-4">
                <Code className="w-5 h-5" />
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-2">Cross-Platform Dev</h4>
              <p className="text-slate-500 dark:text-white/50 text-xs font-light">Synthesizing web architectures, relational indexing databases, and Python orchestration logic.</p>
            </div>

            <div 
              style={{ transform: `translate3d(${-mouseOffset.x}px, ${-mouseOffset.y}px, 0)` }}
              className="p-6 rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 hover:border-violet-500/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-500 dark:text-violet-400 flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold mb-2">Silicon Logic</h4>
              <p className="text-slate-500 dark:text-white/50 text-xs font-light">RTL Design, Timing closure verification testbenches, and hardware modeling in Verilog.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Statistics count-up and academic layout */}
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6 w-full">
          {/* GPA and Graduation counters */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-center"
            >
              <span className="block font-display font-extrabold text-slate-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-1 sm:mb-2 leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
                <CountUp end={7.8} decimals={1} />
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-white/50 uppercase tracking-wider font-semibold truncate">Cumulative CGPA</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-center"
            >
              <span className="block font-display font-extrabold text-slate-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-1 sm:mb-2 leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
                <CountUp end={2028} decimals={0} duration={1.5} />
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-white/50 uppercase tracking-wider font-semibold truncate">Graduation Class</span>
            </motion.div>
          </div>

          {/* Academic Profile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-slate-200 dark:border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Award className="w-20 sm:w-24 h-20 sm:h-24 text-slate-900 dark:text-white" />
            </div>
            <h4 className="text-slate-400 dark:text-white/40 font-mono text-[10px] tracking-[0.2em] uppercase mb-1">affiliated institution</h4>
            <h3 className="text-slate-900 dark:text-white text-lg sm:text-xl font-bold mb-2">Aditya University</h3>
            <p className="text-slate-600 dark:text-white/50 text-xs sm:text-sm font-light leading-relaxed">
              Surampalem, Andhra Pradesh, India. Enrolled in Bachelor of Technology (B.Tech) program in Electronics & Communication Engineering (ECE). Active innovator with university accelerators.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/5 flex flex-wrap gap-2 text-[10px] sm:text-[11px] font-mono text-slate-500 dark:text-gray-400">
              <span className="px-2 py-0.5 rounded bg-slate-200/60 dark:bg-white/5 font-semibold text-blue-600 dark:text-blue-400">2024 – 2028</span>
              <span className="px-2 py-0.5 rounded bg-slate-200/60 dark:bg-white/5">ECE Major</span>
            </div>
          </motion.div>

          {/* Core Mindset Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-tr from-blue-600/10 to-violet-600/10 border border-blue-500/20 shadow-lg relative overflow-hidden"
          >
            <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 mb-2 sm:mb-3">
              <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-bold">Venture Vision</span>
            </div>
            <p className="text-slate-700 dark:text-gray-300 italic text-xs sm:text-sm font-light leading-relaxed">
              "We don't just learn technology — we assemble it, scaling human potential by bridging the gap between raw physical logic and agile digital operations."
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
