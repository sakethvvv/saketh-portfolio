import { useState } from "react";
import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, Milestone, ArrowRight, RotateCw } from "lucide-react";
import { Experience as ExpType } from "../types";
import { playClickSound, playHoverSound, playCardOpenSound } from "../utils/audio";

export default function Experience() {
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  const toggleFlip = (id: string) => {
    playCardOpenSound();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const experiencesData: ExpType[] = [
    {
      id: "keth",
      company: "KETH",
      role: "Founder & CEO",
      period: "2025 – Present",
      type: "Startup Venture",
      description: "Founded Knowledge Enhancement for Talent & Hiring (KETH). Mapping professional technology pipelines to discover and prepare emerging technical talent.",
      skills: ["Venture Strategy", "Product Design", "Community Building"],
      emoji: "⭐",
      accentClass: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
      highlights: [
        "Orchestrated structured tech skill maps.",
        "Launched community pipelines for matching technical specialists.",
        "Led product validation and systemic milestone pipelines."
      ]
    },
    {
      id: "ea",
      company: "Electronic Arts (EA)",
      role: "Software Engineer Intern",
      period: "Dec 2025 – Feb 2026",
      type: "Professional Internship",
      description: "Contributed directly to software layers, analyzing bottleneck routines, optimizing latency criteria, and building Python scripting models.",
      skills: ["Software Optimization", "Python Scripting", "Pipeline Engineering"],
      emoji: "🎮",
      accentClass: "from-green-500/20 to-teal-500/10 border-green-500/30",
      highlights: [
        "Analyzed pipeline latency routines.",
        "Created custom Python automations for performance checking.",
        "Integrated high-efficiency software tracking submodules."
      ]
    },
    {
      id: "digitech",
      company: "Digi Tech Company",
      role: "IT Technical Intern",
      period: "Aug 2025 – Nov 2025",
      type: "Database Internship",
      description: "Designed relational lookup configurations, engineered SQLite index columns, and automated configuration submodules using Linux terminal routines.",
      skills: ["SQLite DBMS", "Linux Shell", "Database Indexes"],
      emoji: "💻",
      accentClass: "from-blue-500/20 to-indigo-500/10 border-blue-500/30",
      highlights: [
        "Engineered relational SQLite lookup sub-systems.",
        "Automated configuration verification scripts in Bash.",
        "Maintained absolute index lookup speed metrics."
      ]
    },
    {
      id: "techhub",
      company: "Technical Hub",
      role: "VLSI Specialist",
      period: "May 2025 – Present",
      type: "Specialized Hardware Track",
      description: "Synthesized complex Verilog HDL models, evaluated AMBA bus communication protocol timing margins, and ran RTL simulation validations.",
      skills: ["Verilog HDL", "AMBA Protocols", "RTL Verification"],
      emoji: "🔬",
      accentClass: "from-violet-500/20 to-fuchsia-500/10 border-violet-500/30",
      highlights: [
        "Completed 4-bit and 8-bit RTL behavior models.",
        "Synthesized custom testbenches using Cadence and Modelsim.",
        "Analyzed AMBA APB/AHB communication structural timing."
      ]
    }
  ];

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 bg-transparent border-t border-slate-200 dark:border-white/5 relative overflow-hidden select-none">
      <div className="w-full max-w-6xl mx-auto">
        
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-mono text-xs text-blue-500 dark:text-blue-400 tracking-[0.2em] uppercase mb-3 sm:mb-4 block">// career development</span>
          <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Professional Experience
          </h2>
          <p className="text-slate-500 dark:text-white/50 text-xs sm:text-sm max-w-md mx-auto mt-3 sm:mt-4 font-light">
            Real-world exposures bridging entrepreneurial founders, game publishing optimization, and deep logic microarchitectures.
          </p>
        </div>

        {/* 3D Flip Card Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {experiencesData.map((exp) => {
            const isFlipped = !!flippedCards[exp.id];
            return (
              <div
                key={exp.id}
                className="perspective-[1000px] min-h-[320px] h-full w-full cursor-pointer relative"
                onClick={() => toggleFlip(exp.id)}
                onMouseEnter={playHoverSound}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-full h-full relative"
                >
                  
                  {/* FRONT SIDE CARD */}
                  <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md flex flex-col justify-between backface-hidden shadow-xl hover:shadow-2xl hover:border-blue-400/20 transition-colors duration-300 min-h-[320px] h-full">
                    
                    <div>
                      {/* Card Header row */}
                      <div className="flex items-start justify-between gap-2 mb-3 sm:mb-4 flex-wrap sm:flex-nowrap">
                        <div className="flex gap-3 sm:gap-4 items-center">
                          {/* Animated rotating icon on hover */}
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center justify-center text-lg sm:text-xl group-hover:rotate-12 transition-transform shadow-md shadow-black/10 dark:shadow-black/30 shrink-0">
                            {exp.emoji}
                          </div>
                          <div>
                            <h3 className="font-display font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                              {exp.company}
                            </h3>
                            <span className="text-[10px] font-mono text-slate-400 dark:text-white/40 uppercase tracking-widest">{exp.type}</span>
                          </div>
                        </div>

                        {/* Calendar indicator */}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] sm:text-[11px] font-mono text-blue-600 dark:text-blue-400 tracking-wider shrink-0 font-medium">
                          <Calendar className="w-3 h-3" />
                          <span>{exp.period}</span>
                        </span>
                      </div>

                      <h4 className="text-blue-600 dark:text-blue-400 font-bold text-xs sm:text-sm mb-2 sm:mb-3">
                        {exp.role}
                      </h4>

                      <p className="text-slate-600 dark:text-white/60 text-xs sm:text-sm font-light leading-relaxed mb-4 sm:mb-6">
                        {exp.description}
                      </p>
                    </div>

                    {/* Footer tags */}
                    <div className="flex justify-between items-center border-t border-slate-200/60 dark:border-white/5 pt-3 sm:pt-4 gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {exp.skills.slice(0, 2).map((s, sIdx) => (
                          <span key={sIdx} className="px-2 py-0.5 rounded bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-[9px] sm:text-[10px] font-mono text-slate-500 dark:text-white/50">
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Prompt to flip */}
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 hover:text-blue-800 dark:hover:text-white transition-colors shrink-0">
                        <span className="hidden xs:inline">Milestones</span>
                        <span>& Details</span>
                        <RotateCw className="w-3 h-3" />
                      </span>
                    </div>

                  </div>

                  {/* BACK SIDE CARD (FLIPPED achievements list) */}
                  <div 
                    style={{ transform: "rotateY(180deg)" }}
                    className="absolute inset-0 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-white/10 flex flex-col justify-between backface-hidden shadow-2xl min-h-[320px] h-full"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3 sm:mb-4 border-b border-slate-200/60 dark:border-white/5 pb-2.5 sm:pb-3">
                        <Milestone className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                        <h4 className="text-slate-900 dark:text-white font-display font-bold text-xs sm:text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>
                          Core Accomplishments & KPI Metrics
                        </h4>
                      </div>

                      {/* Achievements bullets */}
                      <ul className="space-y-2 sm:space-y-3">
                        {exp.highlights.map((high, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm font-light text-slate-700 dark:text-gray-300 leading-relaxed">
                            <span className="text-blue-500 font-bold mt-0.5">•</span>
                            <span>{high}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Return prompt */}
                    <div className="flex justify-between items-center border-t border-slate-200/60 dark:border-white/5 pt-3 sm:pt-4">
                      <span className="text-[9px] sm:text-[10px] font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest">
                        Saketh Vedullapalli
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1">
                        <span>View Overview</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>

                  </div>

                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
