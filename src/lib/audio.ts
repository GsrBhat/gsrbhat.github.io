// Web Audio API Programmatic Sound Synthesizer
// Zero external asset loading, ultra-fast, customizable, high-fidelity

let audioCtx: AudioContext | null = null;
let ambientOscillator: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    // Handle cross-browser compatibility
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export const playSystemBoot = (enabled: boolean) => {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  const now = ctx.currentTime;
  
  // Create chord frequencies
  const freqs = [110, 220, 330, 440, 880];
  
  freqs.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = index === freqs.length - 1 ? "sine" : "triangle";
    osc.frequency.setValueAtTime(freq, now);
    
    // Sweeps
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 1.2);
    
    gainNode.gain.setValueAtTime(0.0, now);
    gainNode.gain.linearRampToValueAtTime(0.04, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 1.6);
  });
};

export const playClick = (enabled: boolean) => {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1000, now);
  osc.frequency.exponentialRampToValueAtTime(100, now + 0.05);

  gainNode.gain.setValueAtTime(0.03, now);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.07);
};

export const playBeep = (enabled: boolean, freq = 600, duration = 0.1, type: OscillatorType = "sine") => {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);

  gainNode.gain.setValueAtTime(0.02, now);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
};

export const playTyping = (enabled: boolean) => {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  const now = ctx.currentTime;
  
  // Simulate clicky mechanical keyboard sound with a high-pass filtered noise/sine combo
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  // Random click frequency between 1200 and 1800Hz
  const freq = 1200 + Math.random() * 600;
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, now);
  
  gainNode.gain.setValueAtTime(0.015, now);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
  
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  osc.start(now);
  osc.stop(now + 0.04);
};

export const playSuccess = (enabled: boolean) => {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();

  const now = ctx.currentTime;
  const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (major chord chime)
  
  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);
    
    gainNode.gain.setValueAtTime(0.0, now + idx * 0.08);
    gainNode.gain.linearRampToValueAtTime(0.03, now + idx * 0.08 + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.4);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 0.5);
  });
};

export const startAmbientHum = (enabled: boolean) => {
  if (!enabled) {
    stopAmbientHum();
    return;
  }
  
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  
  if (ambientOscillator) return; // already running
  
  const now = ctx.currentTime;
  
  // Core low 55Hz electromagnetic sine hum
  ambientOscillator = ctx.createOscillator();
  ambientGain = ctx.createGain();
  
  ambientOscillator.type = "sine";
  ambientOscillator.frequency.setValueAtTime(55, now);
  
  // Add sub-oscillator at 110Hz to give it a warmer server-room hum feel
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = "triangle";
  subOsc.frequency.setValueAtTime(110, now);
  
  ambientGain.gain.setValueAtTime(0.0, now);
  ambientGain.gain.linearRampToValueAtTime(0.015, now + 1.0); // fade in slowly
  
  subGain.gain.setValueAtTime(0.005, now);
  
  ambientOscillator.connect(ambientGain);
  subOsc.connect(subGain);
  
  ambientGain.connect(ctx.destination);
  subGain.connect(ambientGain); // feed into main ambient gain
  
  ambientOscillator.start(now);
  subOsc.start(now);
  
  // Store reference to keep them together
  const originalStop = ambientOscillator.stop.bind(ambientOscillator);
  ambientOscillator.stop = (time) => {
    try {
      originalStop(time);
      subOsc.stop(time);
    } catch(e) {}
  };
};

export const stopAmbientHum = () => {
  if (ambientOscillator && ambientGain && audioCtx) {
    const now = audioCtx.currentTime;
    try {
      ambientGain.gain.cancelScheduledValues(now);
      ambientGain.gain.setValueAtTime(ambientGain.gain.value, now);
      ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3); // fade out
      
      const osc = ambientOscillator;
      setTimeout(() => {
        try {
          osc.stop();
        } catch(e) {}
      }, 400);
    } catch(e) {}
    
    ambientOscillator = null;
    ambientGain = null;
  }
};
