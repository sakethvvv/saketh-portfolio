import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Milestone, Rocket, Award, Cpu, Briefcase } from "lucide-react";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress of the section for Apple-style timeline line growth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const glowingProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const milestones = [
    {
      year: "2024",
      title: "B.Tech — Electronics & Communication",
      subtitle: "Aditya University, Surampalem",
      description: "Began engineering curriculum, specializing in digital systems and logic foundations. Maintaining a 7.8 track record.",
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      colorClass: "border-blue-400 bg-blue-500/5",
    },
    {
      year: "2025",
      title: "Silicon Verification & Verilog modeling",
      subtitle: "Technical Hub Specialty Training",
      description: "Undertook rigorous VLSI pathways. Focused on CMOS basics, transistor layouts, and behavioral verification testbenches.",
      icon: <Award className="w-5 h-5 text-violet-400" />,
      colorClass: "border-violet-400 bg-violet-500/5",
    },
    {
      year: "2025",
      title: "Electronic Arts (EA) Intern",
      subtitle: "Software Engineer Intern",
      description: "Integrated performance optimization, Python configurations, and pipeline codebases directly at global video game publisher.",
      icon: <Briefcase className="w-5 h-5 text-amber-400" />,
      colorClass: "border-amber-400 bg-amber-500/5",
    },
    {
      year: "2025 – Present",
      title: "Founded Startup KETH",
      subtitle: "CEO & Founder",
      description: "Launched Knowledge Enhancement for Talent & Hiring to structure technical discovery pipelines for matching vetted developers with corporate hubs.",
      icon: <Rocket className="w-5 h-5 text-green-400" />,
      colorClass: "border-green-400 bg-green-500/5",
    },
  ];

  return (
    <section ref={containerRef} id="timeline" className="py-16 sm:py-24 px-4 sm:px-6 bg-transparent border-t border-slate-200 dark:border-white/5 relative overflow-hidden select-none">
      
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-mono text-xs text-blue-500 dark:text-blue-400 tracking-[0.2em] uppercase mb-3 sm:mb-4 block">// track records</span>
          <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            The Growth Timeline
          </h2>
          <p className="text-slate-500 dark:text-white/50 text-xs sm:text-sm max-w-md mx-auto mt-3 sm:mt-4 font-light">
            Organically growing track record tracing academic milestones and entrepreneurial ventures.
          </p>
        </div>

        {/* Apple Style Scrolling Growing Timeline Body */}
        <div className="relative max-w-3xl mx-auto mt-8 sm:mt-12 pl-6 sm:pl-8 md:pl-0">
          
          {/* Timeline central line track */}
          <div className="absolute left-3 sm:left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-white/5 -translate-x-1/2 pointer-events-none" />

          {/* Animated scrolling glowing line on top of track */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-3 sm:left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-violet-500 to-green-400 origin-top -translate-x-1/2 pointer-events-none"
          />

          {milestones.map((milestone, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className="relative mb-12 sm:mb-16 md:mb-24 flex flex-col md:flex-row items-start md:items-center">
                
                {/* Visual node on timeline line */}
                <div className="absolute left-3 sm:left-4 md:left-1/2 -translate-x-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-800 dark:text-white shadow-md dark:shadow-xl">
                  {milestone.icon}
                </div>

                {/* Left/Right placement block */}
                <div className={`w-full md:w-1/2 flex ${isEven ? "md:justify-end md:pr-14" : "md:justify-start md:pl-14 md:order-2"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40, rotateY: isEven ? -10 : 10 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", duration: 1, bounce: 0.15 }}
                    className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl border bg-slate-900/[0.03] dark:bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-black/40 border-slate-200 dark:border-white/10 select-none max-w-md w-full"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 font-mono text-[10px] sm:text-xs font-bold mb-2 uppercase tracking-wider">
                      {milestone.year}
                    </span>
                    <h3 className="font-display font-bold text-slate-900 dark:text-white text-base sm:text-lg mb-1 leading-snug" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {milestone.title}
                    </h3>
                    <h4 className="text-blue-600 dark:text-blue-400 font-medium text-xs sm:text-sm mb-2 sm:mb-3">
                      {milestone.subtitle}
                    </h4>
                    <p className="text-slate-600 dark:text-white/60 text-xs sm:text-sm font-light leading-relaxed">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>

                {/* Spacer for structure balancing */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
