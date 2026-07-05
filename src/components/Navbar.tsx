import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun, Volume2, VolumeX, Menu, X, Terminal, Cpu } from "lucide-react";
import { playClickSound, playHoverSound, playChimeSound } from "../utils/audio";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  openCommandPalette: () => void;
}

export default function Navbar({ darkMode, setDarkMode, openCommandPalette }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<any[]>([]);
  const masterGainRef = useRef<GainNode | null>(null);

  // Smooth Section Highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "about", "skills", "badges", "projects", "experience", "certifications", "contact"];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Realtime Web Audio API Synth Engine for Ambient Lofi Chords
  const toggleAmbientMusic = () => {
    playClickSound();
    if (isMusicPlaying) {
      // Smoothly fade out master gain
      if (audioCtxRef.current && masterGainRef.current) {
        const ctx = audioCtxRef.current;
        const masterGain = masterGainRef.current;
        try {
          masterGain.gain.setValueAtTime(masterGain.gain.value, ctx.currentTime);
          masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.0);
        } catch (e) {
          console.warn(e);
        }
      }

      const activeOscillators = oscillatorsRef.current;
      setTimeout(() => {
        activeOscillators.forEach(({ osc, volumeLFO }) => {
          try { osc.stop(); } catch (e) {}
          try { volumeLFO.stop(); } catch (e) {}
        });
      }, 1100);

      oscillatorsRef.current = [];
      setIsMusicPlaying(false);
    } else {
      // Start real-time synthesis
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        if (ctx.state === "suspended") {
          ctx.resume().catch(() => {});
        }

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.2); // Smooth fade-in
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        // Frequencies for a luscious, rich open voicing (A minor 9 / C major 7 blend)
        const freqs = [110.0, 146.83, 164.81, 220.0, 261.63, 329.63]; // A2, D3, E3, A3, C4, E4

        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          // Blend sine and triangle for a warmer, richer analog timber
          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(400, ctx.currentTime);

          // Give each pitch a distinct, slow volume LFO cycle to simulate organic breathing
          const volumeLFO = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          volumeLFO.frequency.setValueAtTime(0.04 + idx * 0.012, ctx.currentTime);
          lfoGain.gain.setValueAtTime(0.015, ctx.currentTime); // LFO amplitude

          volumeLFO.connect(lfoGain);
          lfoGain.connect(oscGain.gain);

          osc.connect(filter);
          filter.connect(oscGain);
          oscGain.connect(masterGain);

          // Set gentle base volume per voice
          oscGain.gain.setValueAtTime(0.02, ctx.currentTime);
          
          // Arpeggiate start timings
          osc.start(ctx.currentTime + idx * 0.15);
          volumeLFO.start();

          oscillatorsRef.current.push({ osc, oscGain, volumeLFO });
        });

        setIsMusicPlaying(true);
      } catch (err) {
        console.error("Web Audio API failed to initiate:", err);
      }
    }
  };

  // Safe cleanup
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(({ osc, volumeLFO }) => {
        try { osc.stop(); } catch (e) {}
        try { volumeLFO.stop(); } catch (e) {}
      });
    };
  }, []);

  const menuItems = [
    { label: "Home", target: "home" },
    { label: "About", target: "about" },
    { label: "Skills", target: "skills" },
    { label: "Badges", target: "badges" },
    { label: "Projects", target: "projects" },
    { label: "Experience", target: "experience" },
    { label: "Credentials", target: "certifications" },
    { label: "Contact", target: "contact" },
  ];

  const handleScrollTo = (targetId: string) => {
    playClickSound();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-6xl rounded-2xl border transition-all duration-300 ${
        scrolled
          ? "bg-white/70 dark:bg-[#0c0e14]/70 border-slate-200/80 dark:border-white/10 backdrop-blur-md shadow-lg shadow-black/[0.03] dark:shadow-black/30 py-3 px-6"
          : "bg-transparent border-transparent py-4 px-6"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Sleek SV monogram */}
        <button
          onClick={() => handleScrollTo("home")}
          onMouseEnter={playHoverSound}
          className="font-display font-extrabold text-xl bg-gradient-to-r from-blue-500 via-violet-500 to-amber-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          SV
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleScrollTo(item.target)}
              onMouseEnter={playHoverSound}
              className={`relative px-4 py-1.5 text-xs font-medium uppercase tracking-wider rounded-lg transition-all duration-200 ${
                activeSection === item.target
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {item.label}
              {activeSection === item.target && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-slate-900/5 dark:bg-white/5 rounded-lg border border-slate-200/50 dark:border-white/10 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Controls block (Search, Synth, Light/Dark, Menu) */}
        <div className="flex items-center gap-2">
          {/* CMD+K trigger */}
          <button
            onClick={() => {
              playChimeSound();
              openCommandPalette();
            }}
            onMouseEnter={playHoverSound}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white bg-slate-900/5 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 rounded-lg transition-all cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <kbd className="hidden sm:inline-block text-[9px] font-mono bg-slate-900/10 dark:bg-white/10 px-1 rounded">⌘K</kbd>
          </button>

          {/* Web Synth Button */}
          <button
            onClick={toggleAmbientMusic}
            onMouseEnter={playHoverSound}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              isMusicPlaying
                ? "bg-blue-500/20 border-blue-500/40 text-blue-600 dark:text-blue-400 animate-pulse"
                : "bg-slate-900/5 dark:bg-white/5 border-slate-200/60 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20"
            }`}
            title="Toggle Ambient Space Synth Tone"
          >
            {isMusicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              playClickSound();
              setDarkMode(!darkMode);
            }}
            onMouseEnter={playHoverSound}
            className="p-2 rounded-lg bg-slate-900/5 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => {
              playClickSound();
              setMobileOpen(!mobileOpen);
            }}
            onMouseEnter={playHoverSound}
            className="md:hidden p-2 rounded-lg bg-slate-900/5 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 overflow-hidden border-t border-slate-200 dark:border-white/10 pt-4"
          >
            <div className="flex flex-col gap-1.5 pb-2">
              {menuItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleScrollTo(item.target)}
                  onMouseEnter={playHoverSound}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.target
                      ? "bg-slate-900/5 dark:bg-white/10 text-slate-900 dark:text-white border-l-2 border-blue-500"
                      : "text-slate-500 dark:text-gray-400 hover:bg-slate-900/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
