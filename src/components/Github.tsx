import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Github, Star, GitFork, BookOpen, Layers, Activity } from "lucide-react";
import { GithubStats } from "../types";

export default function GithubSection() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to retrieve github telemetry:", err);
        setLoading(false);
      });
  }, []);

  // Generate GitHub contribution grid blocks (53 weeks * 7 days)
  const renderContributionGrid = () => {
    const days = 7 * 53;
    const blocks = [];
    for (let i = 0; i < days; i++) {
      // Create random density commits
      const rand = Math.random();
      let colorClass = "bg-slate-200 dark:bg-slate-900"; // zero
      let count = 0;
      if (rand > 0.85) {
        colorClass = "bg-emerald-900/40 dark:bg-emerald-900"; // low
        count = Math.floor(Math.random() * 2) + 1;
      } else if (rand > 0.7) {
        colorClass = "bg-emerald-700/60 dark:bg-emerald-700"; // mid
        count = Math.floor(Math.random() * 3) + 3;
      } else if (rand > 0.55) {
        colorClass = "bg-emerald-500"; // high
        count = Math.floor(Math.random() * 5) + 6;
      } else if (rand > 0.45) {
        colorClass = "bg-emerald-400"; // maximum
        count = Math.floor(Math.random() * 10) + 11;
      }

      blocks.push(
        <div
          key={i}
          className={`w-[10px] h-[10px] rounded-[2px] transition-colors duration-300 ${colorClass} hover:ring-1 hover:ring-slate-500 dark:hover:ring-white/35 cursor-crosshair`}
          title={`${count} commits on track coordinate`}
        />
      );
    }
    return blocks;
  };

  if (loading || !stats) {
    return (
      <section id="github" className="py-24 px-6 bg-transparent border-t border-slate-200 dark:border-white/5 relative flex justify-center items-center">
        <div className="text-center font-mono text-slate-500 dark:text-gray-500 animate-pulse text-xs">
          Loading Github Telemetry Node...
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-24 px-6 bg-transparent border-t border-slate-200 dark:border-white/5 relative overflow-hidden select-none">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="font-mono text-xs text-blue-500 dark:text-blue-400 tracking-[0.2em] uppercase mb-4 block">// software architecture</span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Open Source Activity
            </h2>
            <p className="text-slate-500 dark:text-white/50 text-xs md:text-sm mt-3 font-light max-w-md">
              Verilog logic repositories and full-stack software schemas tracked on public registries.
            </p>
          </div>

          <a
            href={`https://github.com/${stats.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/[0.03] dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-500/30 text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-bold text-xs tracking-wider uppercase transition-all cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>Visit GitHub Profile</span>
          </a>
        </div>

        {/* Profile Stats summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md rounded-3xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-slate-900 dark:text-white font-extrabold text-xl leading-tight font-mono">{stats.public_repos}</span>
              <span className="text-[10px] uppercase text-slate-500 dark:text-white/40 tracking-wider">Repositories</span>
            </div>
          </div>

          <div className="p-5 bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md rounded-3xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-400 flex items-center justify-center">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="block text-slate-900 dark:text-white font-extrabold text-xl leading-tight font-mono">{stats.total_stars}</span>
              <span className="text-[10px] uppercase text-slate-500 dark:text-white/40 tracking-wider">Total Stars</span>
            </div>
          </div>

          <div className="p-5 bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md rounded-3xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-slate-900 dark:text-white font-extrabold text-xl leading-tight font-mono">{stats.followers}</span>
              <span className="text-[10px] uppercase text-slate-500 dark:text-white/40 tracking-wider">Followers</span>
            </div>
          </div>

          <div className="p-5 bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md rounded-3xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 dark:text-green-400 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-slate-900 dark:text-white font-extrabold text-xl leading-tight font-mono">Active</span>
              <span className="text-[10px] uppercase text-slate-500 dark:text-white/40 tracking-wider">Commit Stream</span>
            </div>
          </div>
        </div>

        {/* Contribution Graph Panel */}
        <div className="p-6 bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md rounded-3xl mb-8 overflow-x-auto">
          <div className="flex items-center justify-between mb-4 min-w-[640px]">
            <h4 className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>sakethvvv / Continuous Contribution Graph</span>
            </h4>
            <div className="flex items-center gap-1.5 text-[9px] text-slate-500 dark:text-gray-500 font-mono">
              <span>Less</span>
              <div className="w-2.5 h-2.5 rounded-[2px] bg-slate-200 dark:bg-slate-900" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-900/40 dark:bg-emerald-900" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-700/60 dark:bg-emerald-700" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500" />
              <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400" />
              <span>More</span>
            </div>
          </div>

          {/* Grid canvas wrapper */}
          <div className="flex flex-col gap-1 min-w-[640px]">
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {renderContributionGrid()}
            </div>
          </div>
        </div>

        {/* Secondary blocks (Donut Chart & Pinned Repos) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* SVG Language Donut Chart Card */}
          <div className="lg:col-span-4 p-6 bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md rounded-3xl flex flex-col justify-between items-center">
            <h3 className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider w-full mb-6">Language Metrics</h3>
            
            <div className="relative w-36 h-36 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background track circle */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" className="text-slate-200 dark:text-white/[0.02]" strokeWidth="8" />
                
                {/* Verilog slice (45%) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8B5CF6" strokeWidth="8" strokeDasharray="113 251.2" strokeDashoffset="0" />
                
                {/* Python slice (35%) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3776AB" strokeWidth="8" strokeDasharray="88 251.2" strokeDashoffset="-113" />
                
                {/* C slice (12%) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#A8B9CC" strokeWidth="8" strokeDasharray="30 251.2" strokeDashoffset="-201" />

                {/* Other slice (8%) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#64748B" strokeWidth="8" strokeDasharray="20 251.2" strokeDashoffset="-231" />
              </svg>
              <div className="absolute text-center">
                <span className="block font-display font-black text-slate-900 dark:text-white text-lg leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>Verilog</span>
                <span className="text-[10px] text-slate-500 dark:text-gray-500 font-mono">45% Volume</span>
              </div>
            </div>

            {/* Language legend map */}
            <div className="w-full space-y-2">
              {stats.languages.map((lang, lIdx) => (
                <div key={lIdx} className="flex justify-between items-center text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="text-slate-700 dark:text-gray-300">{lang.name}</span>
                  </div>
                  <span className="font-mono text-slate-500 dark:text-gray-500">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pinned Repos list */}
          <div className="lg:col-span-8 space-y-4 flex flex-col justify-between">
            {stats.pinned_projects.map((repo, idx) => (
              <motion.a
                key={idx}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-5 rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-blue-500/30 backdrop-blur-md flex items-center justify-between shadow-md hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="max-w-[75%]">
                  <h4 className="text-slate-900 dark:text-white font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-sm mb-1 font-mono">
                    {repo.name}
                  </h4>
                  <p className="text-slate-500 dark:text-gray-500 text-xs font-light leading-normal line-clamp-1">
                    {repo.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-gray-400 font-medium">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.color }} />
                      <span>{repo.language}</span>
                    </span>
                  </div>
                </div>

                {/* Stars / Fork counters */}
                <div className="flex items-center gap-4 text-xs font-mono text-slate-500 dark:text-gray-500">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    <span>{repo.stars}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-slate-400 dark:text-gray-400" />
                    <span>{repo.forks}</span>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
