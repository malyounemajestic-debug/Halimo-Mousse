// Web Audio API tone generator for Dhikr completion and study timer bell
class SoundFeedbackService {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playChime(type: 'tap' | 'complete' | 'alert' = 'tap') {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'tap') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'complete') {
        // Harmonious chord for dhikr goal reached
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const subOsc = ctx.createOscillator();
          const subGain = ctx.createGain();
          subOsc.connect(subGain);
          subGain.connect(ctx.destination);

          subOsc.type = 'sine';
          subOsc.frequency.setValueAtTime(freq, now + i * 0.08);
          subGain.gain.setValueAtTime(0.15, now + i * 0.08);
          subGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);

          subOsc.start(now + i * 0.08);
          subOsc.stop(now + i * 0.08 + 0.45);
        });
      } else if (type === 'alert') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      }
    } catch {
      // Audio playback silently catches if browser prohibits autoplay
    }
  }

  // Speak Arabic or Somali text using SpeechSynthesis if available
  speakText(text: string, lang: 'ar' | 'en' | 'so' = 'ar'): boolean {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return false;
    }
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (lang === 'ar') {
        utterance.lang = 'ar-SA';
        utterance.rate = 0.85;
      } else if (lang === 'so') {
        utterance.lang = 'so-SO';
        utterance.rate = 0.95;
      } else {
        utterance.lang = 'en-US';
        utterance.rate = 1.0;
      }
      window.speechSynthesis.speak(utterance);
      return true;
    } catch {
      return false;
    }
  }

  stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundFeedback = new SoundFeedbackService();
