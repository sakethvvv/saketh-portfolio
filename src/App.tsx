import { useState, useEffect } from "react";
import Background from "./components/Background";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Badges from "./components/Badges";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Timeline from "./components/Timeline";
import Certificates from "./components/Certificates";
import GithubSection from "./components/Github";
import Contact from "./components/Contact";
import CommandPalette from "./components/CommandPalette";

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Sync dark class on document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      {/* Cinematic Loader screen */}
      <Loader onComplete={() => setLoadingComplete(true)} />

      {loadingComplete && (
        <div className="relative text-slate-900 dark:text-white min-h-screen selection:bg-blue-500/30 selection:text-blue-200 transition-colors duration-500">
          {/* Custom micro-interactive particles and mesh backgrounds */}
          <Background darkMode={darkMode} />

          {/* Precision springs cursor trail */}
          <Cursor />

          {/* Glassy Floating Nav controls */}
          <Navbar 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            openCommandPalette={() => setCommandPaletteOpen(true)} 
          />

          {/* Main Portfolio Layout stack */}
          <main className="relative">
            <Hero />
            <About />
            <Skills />
            <Badges />
            <Projects />
            <Experience />
            <Timeline />
            <Certificates />
            <GithubSection />
            <Contact />
          </main>

          {/* Premium Footer */}
          <footer className="py-12 px-6 border-t border-slate-200 dark:border-white/5 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md relative z-10 text-center select-none font-mono text-[10px] text-slate-500 dark:text-gray-600">
            <div>© 2026 Saketh Vedullapalli. Handcrafted with precision. Compiled for Production.</div>
          </footer>

          {/* AI-powered Command Palette Overlay */}
          <CommandPalette 
            isOpen={commandPaletteOpen} 
            onClose={() => setCommandPaletteOpen(false)} 
          />
        </div>
      )}
    </>
  );
}
