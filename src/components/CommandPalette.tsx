import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Terminal, ArrowRight, X, Sparkles, Send, Download } from "lucide-react";
import { playClickSound, playHoverSound, playChimeSound } from "../utils/audio";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Suggested questions for quick user discovery
  const suggestions = [
    "What did Saketh do at Electronic Arts?",
    "What is KETH startup?",
    "Tell me about his VLSI expertise.",
    "What programming languages does he master?",
  ];

  // Wrapper for closing with sound
  const handleClose = () => {
    playClickSound();
    onClose();
  };

  // Bind Cmd+K or Ctrl+K shortcut listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) handleClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery("");
      setAiAnswer("");
    }
  }, [isOpen]);

  const handleScrollToSection = (id: string) => {
    playClickSound();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      onClose();
    }
  };

  const askAi = async (promptText: string) => {
    playClickSound();
    if (!promptText.trim()) return;

    setLoading(true);
    setQuery(promptText);
    setAiAnswer("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: promptText }),
      });
      const data = await response.json();
      setAiAnswer(data.reply || "Sorry, I couldn't formulate a response.");
    } catch (err) {
      setAiAnswer("Offline mode fallback: I apologize, but I could not connect to Saketh's primary AI gateway. Please contact him at sakethvedullapalli@gmail.com!");
    } finally {
      setLoading(false);
    }
  };

  const navCommands = [
    { name: "Jump to Hero", section: "home" },
    { name: "Jump to Biography", section: "about" },
    { name: "Jump to Skill Galaxy", section: "skills" },
    { name: "Jump to Ecosystem Badges", section: "badges" },
    { name: "Jump to Project Gallery", section: "projects" },
    { name: "Jump to Experience Timeline", section: "experience" },
    { name: "Jump to Contact Gateway", section: "contact" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-slate-900/40 dark:bg-[#050505]/80 backdrop-blur-md flex justify-center items-start pt-20 px-4 select-none"
          onClick={handleClose}
        >
          {/* Main Card */}
          <motion.div
            initial={{ scale: 0.95, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="w-full max-w-2xl bg-white dark:bg-[#0c0e14] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-white/5 bg-slate-100/40 dark:bg-slate-900/20">
              <Terminal className="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") askAi(query);
                }}
                placeholder="Search command or ask Gemini AI: 'What did Saketh do at EA?'"
                className="w-full bg-transparent border-none text-slate-800 dark:text-white text-sm outline-none font-mono font-medium"
              />
              <button onClick={handleClose} className="p-1 rounded-lg bg-slate-900/[0.03] dark:bg-white/5 hover:bg-slate-900/[0.08] dark:hover:bg-white/10 text-slate-500 dark:text-gray-500 hover:text-slate-800 dark:hover:text-white cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Scrollable contents */}
            <div className="overflow-y-auto p-4 flex flex-col gap-6">
              
              {/* If user is asking AI or has result */}
              {(loading || aiAnswer) && (
                <div className="p-4 rounded-xl bg-blue-500/[0.03] dark:bg-blue-500/5 border border-blue-200 dark:border-blue-400/20">
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-bold mb-3">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>Gemini Core Assistant Response</span>
                  </div>

                  {loading ? (
                    <div className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-gray-500 py-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-ping" />
                      <span>Processing telemetry query...</span>
                    </div>
                  ) : (
                    <div className="text-slate-700 dark:text-gray-300 text-xs md:text-sm font-light leading-relaxed whitespace-pre-line">
                      {aiAnswer}
                    </div>
                  )}
                </div>
              )}

              {/* Suggestions row */}
              <div>
                <h4 className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-gray-500 mb-3 font-semibold">Suggested Questions</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => askAi(s)}
                      onMouseEnter={playHoverSound}
                      className="px-3.5 py-2 text-left rounded-xl bg-slate-900/[0.03] dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-blue-500/40 dark:hover:border-blue-400/30 text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-mono text-xs cursor-pointer transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation quick links */}
              <div>
                <h4 className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-gray-500 mb-2 font-semibold">Jump to Sections</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {navCommands.map((cmd, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleScrollToSection(cmd.section)}
                      onMouseEnter={playHoverSound}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/[0.01] dark:bg-white/[0.02] border border-transparent hover:bg-slate-900/[0.04] dark:hover:bg-white/5 hover:border-slate-200 dark:hover:border-white/5 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white font-mono text-xs text-left cursor-pointer transition-all group"
                    >
                      <span>{cmd.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Command Palette footer */}
            <div className="px-4 py-2 bg-slate-100/60 dark:bg-slate-950/60 border-t border-slate-200 dark:border-white/5 flex justify-between items-center text-[9px] text-slate-500 dark:text-gray-600 font-mono">
              <span>Press <kbd className="bg-slate-900/[0.05] dark:bg-white/5 px-1 py-0.5 rounded">Esc</kbd> to exit palette</span>
              <span>Type query & press <kbd className="bg-slate-900/[0.05] dark:bg-white/5 px-1 py-0.5 rounded">Enter</kbd> to invoke AI</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
