import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect touch device
    const checkMobile = () => {
      const mobile = 
        "ontouchstart" in window || 
        navigator.maxTouchPoints > 0 || 
        window.innerWidth < 768;
      setIsMobile(mobile);
      setHidden(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return () => window.removeEventListener("resize", checkMobile);

    const mouse = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setHidden(false);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Continuous tick loop for smooth lag trail
    let animationFrameId: number;
    const tick = () => {
      const ease = 0.15; // spring factor
      ring.x += (mouse.x - ring.x) * ease;
      ring.y += (mouse.y - ring.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    // Check for interactive hovables
    const addHoverListeners = () => {
      const elements = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, .interactive-card"
      );
      elements.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    addHoverListeners();

    // Set up MutationObserver to re-evaluate when dynamic components load
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isMobile]);

  if (isMobile || hidden) return null;

  return (
    <>
      {/* Precision Core Pointer */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-blue-500 pointer-events-none z-50 transition-transform duration-75"
        style={{ willChange: "transform" }}
      />
      {/* Outer Lag ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-violet-500/50 pointer-events-none z-50 -ml-5 -mt-5 transition-all duration-300 ${
          hovered
            ? "w-10 h-10 border-blue-400 bg-blue-400/10 scale-125"
            : "w-10 h-10"
        }`}
        style={{ willChange: "transform" }}
      />
    </>
  );
}
