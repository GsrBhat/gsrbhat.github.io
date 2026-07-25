// Web Audio API Programmatic Sound Synthesizer - DISABLED
// All sound effects removed as per user request to ensure maximum performance and clean clicks.

export const playSystemBoot = (enabled: boolean) => {};
export const playClick = (enabled: boolean) => {};
export const playBeep = (
  enabled: boolean, 
  freq = 600, 
  duration = 0.1, 
  type: OscillatorType = "sine"
) => {};
export const playTyping = (enabled: boolean) => {};
export const playSuccess = (enabled: boolean) => {};
export const startAmbientHum = (enabled: boolean) => {};
export const stopAmbientHum = () => {};
