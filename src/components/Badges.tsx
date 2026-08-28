import { motion } from "motion/react";
import { Cpu, Medal, Shield, Share2 } from "lucide-react";

export default function Badges() {
  const badges = [
    {
      title: "Google–NVIDIA Developer",
      kicker: "Google · NVIDIA Partner",
      description: "Recognized developer profile focused on accelerated neural networks, deep learning, silicon layouts, and GPU architectures.",
      pill: "Developer Badge",
      logos: [
        "https://cdn.simpleicons.org/google/4285F4",
        "https://cdn.simpleicons.org/nvidia/76B900"
      ],
      colorClass: "from-blue-500/10 via-green-500/10 to-transparent",
      borderColor: "hover:border-green-400/30",
      accentIcon: <Cpu className="w-4 h-4 text-green-400" />
    },
    {
      title: "Google Premium Tier Developer",
      kicker: "Google Cloud Premium",
      description: "Premium-tier developer profile for building production-grade full-stack solutions, distributed database clusters, and secure APIs.",
      pill: "Premium Tier",
      logos: [
        "https://cdn.simpleicons.org/googlecloud/4285F4",
        "https://cdn.simpleicons.org/google/4285F4"
      ],
      colorClass: "from-blue-500/10 via-violet-500/10 to-transparent",
      borderColor: "hover:border-blue-400/30",
      accentIcon: <Shield className="w-4 h-4 text-blue-400" />
    },
    {
      title: "Google Campus Partner",
      kicker: "Campus Outreach",
      description: "University-level partner representing technical initiatives, workshop orchestration, student innovation pathways, and mentorship sessions.",
      pill: "Campus Partner",
      logos: [
        "https://cdn.simpleicons.org/google/4285F4"
      ],
      colorClass: "from-blue-500/10 via-amber-500/10 to-transparent",
      borderColor: "hover:border-amber-400/30",
      accentIcon: <Medal className="w-4 h-4 text-amber-400" />
    }
  ];

  return (
    <section id="badges" className="py-16 sm:py-24 px-4 sm:px-6 bg-transparent border-t border-slate-200 dark:border-white/5 relative overflow-hidden select-none">
      <div className="w-full max-w-6xl mx-auto">
        
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-mono text-xs text-blue-500 dark:text-blue-400 tracking-[0.2em] uppercase mb-3 sm:mb-4 block">// credential system</span>
          <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Ecosystem Badges
          </h2>
          <p className="text-slate-500 dark:text-white/50 text-xs sm:text-sm max-w-md mx-auto mt-3 sm:mt-4 font-light">
            Ecosystem validations across Google, NVIDIA accelerated programs, and campus-level outreach.
          </p>
        </div>

        {/* Badges Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {badges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-300 ${badge.borderColor} group overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-black/50`}
            >
              {/* Corner accent glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${badge.colorClass} blur-[40px] pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300`} />
              
              {/* Top border glowing line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500 via-violet-500 to-green-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Logo list row */}
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  {badge.logos.map((logo, lIdx) => (
                    <div key={lIdx} className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-white/10 p-2 flex items-center justify-center shadow-md dark:shadow-lg">
                      <img src={logo} alt="brand logo" className="w-full h-full object-contain filter brightness-95" />
                    </div>
                  ))}
                </div>

                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-1.5 block">
                  {badge.kicker}
                </span>
                
                <h3 className="font-display font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight mb-2 sm:mb-3 leading-snug" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {badge.title}
                </h3>

                <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm font-light leading-relaxed mb-4 sm:mb-6">
                  {badge.description}
                </p>
              </div>

              {/* Pill badge footer indicator */}
              <div className="flex justify-between items-center mt-3 sm:mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-600 dark:text-blue-400 text-[9px] sm:text-[10px] uppercase font-mono tracking-widest font-bold">
                  {badge.accentIcon}
                  <span>{badge.pill}</span>
                </span>
                
                <Share2 className="w-4 h-4 text-slate-400 dark:text-gray-600 group-hover:text-slate-600 dark:group-hover:text-gray-400 transition-colors cursor-pointer" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
