import { useState, FormEvent, FocusEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Send, MapPin, Globe, CheckCircle, Navigation } from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playHoverSound, playSuccessSound } from "../utils/audio";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  // Label float state handler
  const isFilled = (val: string) => val.trim().length > 0;

  const handleSendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    playClickSound();
    setIsSending(true);

    // Dynamic paper plane flight duration simulation
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);

      // Trigger standard mail client proxy launch
      const mailtoLink = `mailto:sakethvedullapalli@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent("Sender: " + email + "\n\n" + message)}`;
      window.location.href = mailtoLink;

      // Celebrate success
      playSuccessSound();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.8 },
        colors: ["#3B82F6", "#8B5CF6", "#10B981"]
      });

      // Reset state after delay
      setTimeout(() => {
        setSentSuccess(false);
        setName("");
        setEmail("");
        setMessage("");
      }, 5000);

    }, 1800);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-transparent border-t border-slate-200 dark:border-white/5 relative overflow-hidden select-none">
      
      {/* Background ambient lighting circles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.06),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
        
        {/* Left Column: Direct Access links */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <span className="font-mono text-xs text-blue-500 dark:text-blue-400 tracking-[0.2em] uppercase mb-4 block">// secure gateway</span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-slate-900 dark:text-white mb-6 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            Secure Connection
          </h2>
          <p className="text-slate-500 dark:text-white/50 text-sm md:text-base leading-relaxed mb-10 font-light">
            Open for professional placements, internship opportunities, collaborative hardware-software synthesis projects, or entrepreneurial discussions.
          </p>

          <div className="space-y-4">
            <a
              href="mailto:sakethvedullapalli@gmail.com"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="p-5 rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-blue-500/30 flex items-center gap-4 shadow-lg transition-colors duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-slate-400 dark:text-white/40 text-[10px] uppercase tracking-wider font-semibold">Primary Mail</span>
                <span className="text-slate-800 dark:text-white text-sm font-medium font-mono">sakethvedullapalli@gmail.com</span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/saketh-vedullapalli-186011307/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              onMouseEnter={playHoverSound}
              className="p-5 rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-violet-500/30 flex items-center gap-4 shadow-lg transition-colors duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-slate-400 dark:text-white/40 text-[10px] uppercase tracking-wider font-semibold">LinkedIn Network</span>
                <span className="text-slate-800 dark:text-white text-sm font-medium font-mono">saketh-vedullapalli-186011307</span>
              </div>
            </a>

            <div className="p-5 rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 flex items-center gap-4 shadow-lg">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-slate-400 dark:text-white/40 text-[10px] uppercase tracking-wider font-semibold">Operational Center</span>
                <span className="text-slate-800 dark:text-white text-sm font-medium">Kakinada, Andhra Pradesh, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Form with Floating Labels */}
        <div className="lg:col-span-7 w-full">
          <form
            onSubmit={handleSendEmail}
            className="p-8 md:p-10 rounded-3xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-2xl relative"
          >
            {/* Success state overlay */}
            <AnimatePresence>
              {sentSuccess && (
                <motion.div
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  className="absolute inset-0 rounded-3xl bg-white/95 dark:bg-slate-950/90 flex flex-col justify-center items-center z-20 text-center p-6"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="flex flex-col items-center"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 dark:text-green-400 mb-4 animate-bounce" />
                    <h3 className="font-display font-extrabold text-slate-900 dark:text-white text-xl md:text-2xl mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                      Transmission Sent
                    </h3>
                    <p className="text-slate-500 dark:text-gray-400 text-xs md:text-sm font-light max-w-xs leading-relaxed">
                      Launching mail composer... Direct correspondence routed successfully. I will follow up with you shortly!
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name field */}
              <div className="relative w-full h-[56px] border-b border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20">
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                  className="absolute inset-0 w-full h-full bg-transparent border-none text-slate-800 dark:text-white text-sm outline-none pt-4 font-mono font-medium"
                />
                <label
                  htmlFor="contact-name"
                  className={`absolute left-0 pointer-events-none transition-all duration-300 font-medium ${
                    focusedInput === "name" || isFilled(name)
                      ? "top-1 text-[10px] text-blue-500 dark:text-blue-400 uppercase tracking-widest"
                      : "top-4 text-xs text-slate-400 dark:text-gray-500 uppercase tracking-wider"
                  }`}
                >
                  Identification Name
                </label>
              </div>

              {/* Email field */}
              <div className="relative w-full h-[56px] border-b border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20">
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  className="absolute inset-0 w-full h-full bg-transparent border-none text-slate-800 dark:text-white text-sm outline-none pt-4 font-mono font-medium"
                />
                <label
                  htmlFor="contact-email"
                  className={`absolute left-0 pointer-events-none transition-all duration-300 font-medium ${
                    focusedInput === "email" || isFilled(email)
                      ? "top-1 text-[10px] text-blue-500 dark:text-blue-400 uppercase tracking-widest"
                      : "top-4 text-xs text-slate-400 dark:text-gray-500 uppercase tracking-wider"
                  }`}
                >
                  Return Route Email
                </label>
              </div>
            </div>

            {/* Message field */}
            <div className="relative w-full min-h-[120px] border-b border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 mb-8">
              <textarea
                id="contact-message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setFocusedInput("message")}
                onBlur={() => setFocusedInput(null)}
                className="absolute inset-0 w-full h-full bg-transparent border-none text-slate-800 dark:text-white text-sm outline-none pt-6 resize-none font-sans font-light leading-relaxed"
              />
              <label
                htmlFor="contact-message"
                className={`absolute left-0 pointer-events-none transition-all duration-300 font-medium ${
                  focusedInput === "message" || isFilled(message)
                    ? "top-1 text-[10px] text-blue-500 dark:text-blue-400 uppercase tracking-widest"
                    : "top-4 text-xs text-slate-400 dark:text-gray-500 uppercase tracking-wider"
                }`}
              >
                Transmission details & message
              </label>
            </div>

            {/* Submit button with paper plane flight animation */}
            <button
              type="submit"
              disabled={isSending}
              className={`group relative w-full h-12 rounded-xl flex items-center justify-center font-bold text-xs uppercase tracking-widest text-white cursor-pointer overflow-hidden transition-all duration-500 ${
                isSending ? "bg-blue-600/50 cursor-wait" : "bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/20"
              }`}
            >
              <AnimatePresence mode="wait">
                {isSending ? (
                  <motion.div
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    {/* Glowing paper plane animation that flies right */}
                    <motion.div
                      animate={{ x: [0, 100], y: [0, -30], opacity: [1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    >
                      <Navigation className="w-4 h-4 rotate-90 text-white fill-current" />
                    </motion.div>
                    <span>Launching flight...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span>Initialize Transmission</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
