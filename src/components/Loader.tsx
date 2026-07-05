import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [nameText, setNameText] = useState("");
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const fullText = "Saketh";
    let index = 0;
    
    // 1. Sequential name animation
    const nameInterval = setInterval(() => {
      if (index <= fullText.length) {
        setNameText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(nameInterval);
      }
    }, 120);

    // 2. Progress percentage loader
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600); // Give fade out animation time to finish
          }, 400);
          return 100;
        }
        const step = Math.random() * 15 + 5;
        return Math.min(Math.floor(prev + step), 100);
      });
    }, 100);

    return () => {
      clearInterval(nameInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="loader-root"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
          className="fixed inset-0 bg-[#07090e] z-[9999] flex flex-col items-center justify-center font-sans"
        >
          {/* Subtle mesh background inside loader */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.06),transparent_50%)] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Glowing neon sphere */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute -top-16 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full"
            />

            {/* Letter animated name */}
            <motion.h1 
              className="font-display font-extrabold text-4xl md:text-6xl tracking-tight text-white mb-6 relative overflow-hidden"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-amber-300 bg-clip-text text-transparent">
                {nameText}
              </span>
              <span className="animate-[blink_1s_infinite] text-blue-400">|</span>
            </motion.h1>

            {/* Futuristic loader bar */}
            <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden mb-3 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Progress counter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] tracking-[0.2em] uppercase font-mono text-gray-500"
            >
              Initializing Core Pipeline — {progress}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
