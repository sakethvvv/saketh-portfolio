// Real-time Web Audio API Sound Effects Engine
// Provides high-quality, lightweight micro-interaction synthesized sounds

let sharedAudioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      sharedAudioCtx = new AudioContextClass();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume().catch((err) => {
      console.warn("Failed to resume AudioContext:", err);
    });
  }
  return sharedAudioCtx;
}

/**
 * Plays a rich, warm, organic "pop" click sound
 * Uses dual-tone additive synthesis with rapid exponential decay
 */
export function playClickSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Core transient oscillator
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(850, now);
    osc1.frequency.exponentialRampToValueAtTime(120, now + 0.12);
    
    gain1.gain.setValueAtTime(0.04, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    
    // Warm sub-harmonic frequency oscillator for physical body
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(160, now);
    osc2.frequency.exponentialRampToValueAtTime(80, now + 0.15);
    
    gain2.gain.setValueAtTime(0.02, now);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    // Lowpass filter to keep it cozy and soft on the ears
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(600, now);
    filter.Q.setValueAtTime(1.5, now);

    osc1.connect(gain1);
    osc2.connect(gain2);
    
    gain1.connect(filter);
    gain2.connect(filter);
    
    filter.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    
    osc1.stop(now + 0.16);
    osc2.stop(now + 0.16);
  } catch (e) {
    // Silence audio errors gracefully
  }
}

/**
 * Plays an ultra-subtle, clean, high-frequency "tick" when hovering
 */
export function playHoverSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1600, now);
    osc.frequency.linearRampToValueAtTime(1200, now + 0.02);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(2.0, now);

    // Ultra-soft volume to stay elegant and non-intrusive
    gain.gain.setValueAtTime(0.008, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  } catch (e) {
    // Silence audio errors gracefully
  }
}

/**
 * Plays an elegant upward major-9th chord cascade (arpeggio)
 * Designed for rich overlay triggers and premium panel sweeps
 */
export function playChimeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Harmonious chord notes: C5 (523.25), E5 (659.25), G5 (783.99), B5 (987.77)
    const notes = [523.25, 659.25, 783.99, 987.77];

    notes.forEach((freq, idx) => {
      const delay = idx * 0.055;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Alternating waveform types for a rich harmonic texture
      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, now + delay);
      
      // Frequency sweep for a beautiful shimmering effect
      osc.frequency.linearRampToValueAtTime(freq * 1.02, now + delay + 0.25);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1100, now + delay);
      filter.frequency.exponentialRampToValueAtTime(300, now + delay + 0.3);
      filter.Q.setValueAtTime(1.0, now + delay);

      gain.gain.setValueAtTime(0, now);
      // Soft attack, then exponential decay
      gain.gain.linearRampToValueAtTime(0.016, now + delay + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.38);
    });
  } catch (e) {
    // Silence audio errors gracefully
  }
}

/**
 * Plays a warm, atmospheric card expansion "whoosh" sound
 */
export function playCardOpenSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.35);

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(350, now);
    filter.frequency.exponentialRampToValueAtTime(1800, now + 0.35);
    filter.Q.setValueAtTime(3.0, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.022, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch (e) {
    // Silence audio errors gracefully
  }
}

/**
 * Plays a highly celebratory and uplifting pentatonic cascade
 * Perfect for successful actions (e.g. contact form submits)
 */
export function playSuccessSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // G5, A5, C6, D6, G6
    const notes = [783.99, 880.00, 1046.50, 1174.66, 1567.98];

    notes.forEach((freq, idx) => {
      const delay = idx * 0.06;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(freq, now + delay);

      // Slightly detuned second voice for rich chorus dimension
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freq + 3.5, now + delay);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1800, now + delay);
      filter.Q.setValueAtTime(1.2, now + delay);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.014, now + delay + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.45);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now + delay);
      osc2.start(now + delay);
      
      osc1.stop(now + delay + 0.48);
      osc2.stop(now + delay + 0.48);
    });
  } catch (e) {
    // Silence audio errors gracefully
  }
}
