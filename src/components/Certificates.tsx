import { motion } from "motion/react";
import { Award, Zap, Cpu, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { Certificate } from "../types";
import { playHoverSound, playSuccessSound } from "../utils/audio";

export default function Certificates() {
  const certs: Certificate[] = [
    {
      id: "hackerrank-c",
      title: "C Language — Silver Star (Score: 115)",
      issuer: "HackerRank Program Profile",
      icon: "⭐",
      badge: "✓ Verified Core",
      verified: true
    },
    {
      id: "amba",
      title: "AMBA Bus Protocols Verification",
      issuer: "Technical Hub Specialty Track",
      icon: "🔬",
      badge: "✓ Specialized RTL",
      verified: true
    },
    {
      id: "cadence",
      title: "Cadence Online & Digi IC Certificate",
      issuer: "Cadence / Technical Hub System",
      icon: "🖥️",
      badge: "✓ Verified System",
      verified: true
    }
  ];

  // Trigger golden burst particles celebration on certificate interactions
  const triggerCelebration = () => {
    playSuccessSound();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#F59E0B", "#8B5CF6", "#3B82F6", "#ffffff"]
    });
  };

  return (
    <section id="certifications" className="py-24 px-6 bg-transparent border-t border-slate-200 dark:border-white/5 relative overflow-hidden select-none">
      <div className="w-full max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-amber-600 dark:text-amber-400 tracking-[0.2em] uppercase mb-4 block">// technical credentials</span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Certifications & Milestones
          </h2>
          <p className="text-slate-500 dark:text-white/50 text-sm max-w-md mx-auto mt-4 font-light">
            Verified technical accomplishments validating core expertise levels in system development.
          </p>
        </div>

        {/* Certificate Glass cards wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map((cert, idx) => (
            <motion.div
              key={cert.id}
              onClick={triggerCelebration}
              onMouseEnter={playHoverSound}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative p-6 rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md cursor-pointer group flex flex-col justify-between items-center text-center shadow-xl hover:shadow-2xl hover:border-amber-500/30 dark:hover:border-amber-400/30 hover:-translate-y-2 transition-all duration-300 overflow-hidden select-none"
            >
              {/* Golden circular glowing backplate */}
              <div className="absolute top-0 w-32 h-32 bg-amber-500/5 blur-[35px] pointer-events-none group-hover:scale-150 transition-transform duration-500" />
              
              {/* Diagonal animated ribbon */}
              <div className="absolute top-[-10px] left-[-35px] w-24 h-6 bg-gradient-to-r from-amber-500 to-orange-500 text-[8px] font-mono font-bold uppercase text-white flex items-center justify-center rotate-[-35deg] shadow-md opacity-30 group-hover:opacity-100 transition-opacity">
                Verified
              </div>

              <div className="flex flex-col items-center">
                {/* Icon bubble */}
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl mb-6 shadow-lg shadow-black/10 dark:shadow-black/20 group-hover:scale-110 transition-transform duration-300">
                  {cert.icon}
                </div>

                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 dark:text-gray-400 mb-1.5 block">
                  {cert.issuer}
                </span>

                <h3 className="font-display font-bold text-slate-900 dark:text-white text-base leading-snug tracking-tight mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {cert.title}
                </h3>
              </div>

              {/* Verified pill badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-mono tracking-wide uppercase font-bold">
                <Star className="w-3 h-3 fill-current" />
                <span>{cert.badge}</span>
              </span>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
