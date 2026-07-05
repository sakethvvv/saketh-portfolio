import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Github, Star, X, Code, Server, Layout, ArrowRight, ShieldCheck, Milestone } from "lucide-react";
import { Project } from "../types";
import { playClickSound, playHoverSound, playCardOpenSound } from "../utils/audio";

export default function Projects() {
  const [filter, setFilter] = useState<"all" | "software" | "vlsi">("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectsData: Project[] = [
    {
      id: "verify-your-cart",
      name: "Verify Your Cart",
      description: "An AI-powered fraud detection system designed to scan e-commerce duplicates, fraudulent listings, and deceptive reviews, keeping shoppers secure.",
      category: "software",
      tags: ["Python", "AI Integration", "Fraud Detection", "SQLite"],
      liveUrl: "https://verify-your-cart.vercel.app",
      githubUrl: "https://github.com/sakethvvv",
      emoji: "🛒",
      accentColor: "rgba(59, 130, 246, 0.5)", // blue
      details: {
        architecture: "Client interface triggers an API route proxying a custom scraping engine and heuristic classification pipeline. High-speed lookup databases handle hash checkups against common fraud blacklists.",
        challenges: "Ensuring near-instant feedback latency while crawling several distributed e-commerce repositories. Resolved by structuring multi-threaded queue pools and local caching layers.",
        timeline: "Built & iterated over 12 weeks during late 2025. Deployed securely on Vercel.",
        stack: ["Python", "SQLite", "Vercel", "Natural Language Processing", "Regex rules"],
        gallery: [
          "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
        ]
      }
    },
    {
      id: "4bit-alu",
      name: "4-Bit Arithmetic Logic Unit (ALU)",
      description: "High-speed hardware logic design executing structural arithmetic and binary logic calculations. Modeled, verified, and simulated on advanced waveform environments.",
      category: "vlsi",
      tags: ["Verilog HDL", "RTL Design", "Digital Logic", "Testbenches"],
      githubUrl: "https://github.com/sakethvvv",
      emoji: "⚙️",
      accentColor: "rgba(139, 92, 246, 0.5)", // violet
      details: {
        architecture: "Hierarchical logic structures consisting of standard full adders, multiplexer trees, and custom boolean gates. Integrated behaviorally and structurally to guarantee absolute timing accuracy.",
        challenges: "Mitigating excessive propagation delays across higher-order bits. Addressed by optimizing carry-lookahead circuitry within the adder submodule.",
        timeline: "Synthesized during Spring 2025 as part of advanced technical accelerators.",
        stack: ["Verilog HDL", "ModelSim", "RTL Verification", "Timing Analysis", "FPGA mapping"],
        gallery: [
          "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
        ]
      }
    },
    {
      id: "fake-product-detector",
      name: "Fake Product Detector",
      description: "Client-facing brand authenticity system checking cryptographic signatures and hash registries to identify counterfeit products and duplicate supply lines.",
      category: "software",
      tags: ["Python", "SQLite", "DBMS", "Hashes"],
      githubUrl: "https://github.com/sakethvvv",
      emoji: "🔍",
      accentColor: "rgba(245, 158, 11, 0.5)", // amber
      details: {
        architecture: "Utilizes decentralized cryptographic verification hashes. SQLite databases index products structurally, enabling lightning-fast relational queries during lookup scans.",
        challenges: "Designing a robust yet lightweight lookup table structure. Solved using optimized index columns and custom query triggers.",
        timeline: "Completed in Fall 2025. Tested with synthetic datasets of over 10,000 product models.",
        stack: ["Python", "SQLite", "Index Optimization", "Hashing (SHA-256)", "Database Trigger logic"],
        gallery: [
          "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"
        ]
      }
    }
  ];

  const filteredProjects = filter === "all" ? projectsData : projectsData.filter(p => p.category === filter);

  // Custom 3D tilt ref and style
  const CardWithTilt = ({ project }: { project: Project }) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [tilt, setTilt] = useState("");
    const [glow, setGlow] = useState({ x: 0, y: 0, opacity: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotX = ((rect.height / 2 - y) / (rect.height / 2)) * 10;
      const rotY = -((rect.width / 2 - x) / (rect.width / 2)) * 10;

      setTilt(`perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`);
      setGlow({ x, y, opacity: 1 });
    };

    const handleMouseLeave = () => {
      setTilt("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
      setGlow(prev => ({ ...prev, opacity: 0 }));
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={playHoverSound}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          playCardOpenSound();
          setSelectedProject(project);
        }}
        style={{ transform: tilt, transition: tilt ? "none" : "all 0.5s ease-out" }}
        className="relative p-6 rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md cursor-pointer group overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-black/30 dark:hover:shadow-black/60 select-none"
      >
        {/* Glow spotlight overlay */}
        <div
          className="absolute pointer-events-none rounded-full blur-[40px] transition-opacity duration-300"
          style={{
            width: "120px",
            height: "120px",
            background: `radial-gradient(circle, ${project.accentColor} 0%, transparent 70%)`,
            left: `${glow.x - 60}px`,
            top: `${glow.y - 60}px`,
            opacity: glow.opacity,
          }}
        />

        {/* Top glowing edge line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500 via-violet-500 to-green-500 opacity-20 group-hover:opacity-100 transition-opacity" />

        <div>
          {/* Card emoji avatar */}
          <div className="w-12 h-12 rounded-xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center justify-center text-2xl mb-6 shadow-md shadow-black/10 dark:shadow-black/30 group-hover:scale-105 transition-transform duration-300">
            {project.emoji}
          </div>

          {/* Title */}
          <h3 className="font-display font-extrabold text-slate-900 dark:text-white text-xl mb-3 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
            {project.name}
          </h3>

          <p className="text-slate-500 dark:text-white/50 text-xs font-light leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((t, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-[9px] font-mono text-slate-500 dark:text-white/50">
                {t}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center border-t border-slate-200/60 dark:border-white/5 pt-4">
            <span className="text-[10px] uppercase font-mono tracking-wider text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-1.5 transition-transform flex items-center gap-1">
              <span>View Specifications</span>
              <ArrowRight className="w-3 h-3" />
            </span>

            {/* Stars icon simulation */}
            <div className="flex items-center gap-1 text-slate-400 dark:text-gray-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500/80" />
              <span className="font-mono font-medium">Verified</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 px-6 bg-transparent border-t border-slate-200 dark:border-white/5 relative overflow-hidden select-none">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs text-blue-500 dark:text-blue-400 tracking-[0.2em] uppercase mb-4 block">// technical portfolio</span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Featured Projects
            </h2>
            <p className="text-slate-500 dark:text-white/50 text-xs md:text-sm mt-3 font-light max-w-md">
              From hardware RTL simulations to full-stack predictive software architectures.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-xl p-1 gap-1 self-start md:self-auto">
            {(["all", "software", "vlsi"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setFilter(cat);
                }}
                onMouseEnter={playHoverSound}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-blue-500 text-white shadow-md shadow-blue-500/10"
                    : "text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat === "vlsi" ? "VLSI / Hardware" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <CardWithTilt project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Fullscreen Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-[#050505]/95 backdrop-blur-md flex justify-center items-center p-4 md:p-8"
            >
              {/* Escape listener clicking backdrop */}
              <div className="absolute inset-0 cursor-zoom-out" onClick={() => { playClickSound(); setSelectedProject(null); }} />

              <motion.div
                initial={{ y: 50, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 50, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-white/10 rounded-3xl overflow-y-auto shadow-2xl p-6 md:p-10 z-10 flex flex-col justify-between"
              >
                {/* Close Button */}
                <button
                  onClick={() => { playClickSound(); setSelectedProject(null); }}
                  onMouseEnter={playHoverSound}
                  className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900/[0.03] dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-900/[0.08] dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{selectedProject.emoji}</span>
                    <div>
                      <h3 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                        {selectedProject.name}
                      </h3>
                      <span className="text-xs uppercase font-mono text-blue-600 dark:text-blue-400 font-bold">
                        {selectedProject.category === "vlsi" ? "VLSI / Silicon logic" : "Software engineering"}
                      </span>
                    </div>
                  </div>

                  {/* Summary / Description */}
                  <p className="text-slate-700 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-8 font-light max-w-2xl">
                    {selectedProject.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-t border-b border-slate-200/60 dark:border-white/5 py-8">
                    {/* Architecture description */}
                    <div>
                      <h4 className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm mb-3">
                        <Server className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                        <span>System Architecture</span>
                      </h4>
                      <p className="text-slate-600 dark:text-gray-400 text-xs leading-relaxed font-light">
                        {selectedProject.details.architecture}
                      </p>
                    </div>

                    {/* Challenges faced */}
                    <div>
                      <h4 className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm mb-3">
                        <ShieldCheck className="w-4 h-4 text-violet-500 dark:text-violet-400" />
                        <span>Technical Challenges & Solutions</span>
                      </h4>
                      <p className="text-slate-600 dark:text-gray-400 text-xs leading-relaxed font-light">
                        {selectedProject.details.challenges}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Timeline */}
                    <div>
                      <h4 className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm mb-3">
                        <Milestone className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                        <span>Development Timeline</span>
                      </h4>
                      <p className="text-slate-600 dark:text-gray-400 text-xs font-light">
                        {selectedProject.details.timeline}
                      </p>
                    </div>

                    {/* Full Stack Tools list */}
                    <div>
                      <h4 className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm mb-3">
                        <Code className="w-4 h-4 text-green-500 dark:text-green-400" />
                        <span>Full Technologies Used</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.details.stack.map((item, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded bg-slate-900/[0.03] dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] font-mono text-slate-700 dark:text-gray-300">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Screenshots gallery Mockups */}
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-4">Architecture & Deployment Gallery</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.details.gallery.map((img, idx) => (
                        <div key={idx} className="relative h-40 md:h-48 rounded-xl overflow-hidden border border-slate-200 dark:border-white/5">
                          <img src={img} alt="project mockup screenshot" className="w-full h-full object-cover filter brightness-75 hover:scale-105 transition-transform duration-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer buttons link */}
                <div className="flex gap-4 mt-8 border-t border-slate-200/60 dark:border-white/5 pt-6 w-full">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClickSound}
                      onMouseEnter={playHoverSound}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-xs tracking-wider uppercase transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Production Demo</span>
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClickSound}
                      onMouseEnter={playHoverSound}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/[0.03] dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-800 dark:text-white font-semibold text-xs tracking-wider uppercase transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>Explore Repository</span>
                    </a>
                  )}
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
