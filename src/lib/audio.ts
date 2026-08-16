// High-Tech Cyber Sound FX & Haptic Audio Manager powered by Howler.js and Web Audio API
// Fully configurable, ultra-low latency, tailored for a professional cybersecurity interface.

import { Howl, Howler } from "howler";
import type { HowlOptions } from "howler";

export interface CyberAudioConfig {
  masterVolume: number; // 0.0 to 1.0 (default 0.15 for subtle haptic feel)
  isMuted: boolean;
  hapticFeedbackEnabled: boolean;
}

class CyberAudioManager {
  private config: CyberAudioConfig = {
    masterVolume: 0.15, // Subtle, non-intrusive default
    isMuted: false,
    hapticFeedbackEnabled: true,
  };

  private soundCache: Map<string, Howl> = new Map();
  private webAudioCtx: AudioContext | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      // Load saved preferences if available
      try {
        const savedMute = localStorage.getItem("apkshield_audio_muted");
        if (savedMute !== null) {
          this.config.isMuted = savedMute === "true";
        }
        const savedVol = localStorage.getItem("apkshield_audio_vol");
        if (savedVol !== null) {
          this.config.masterVolume = Math.min(1, Math.max(0, parseFloat(savedVol) || 0.15));
        }
      } catch {
        // LocalStorage access restricted in some iframes
      }

      // Configure Howler global master settings
      Howler.volume(this.config.masterVolume);
      Howler.mute(this.config.isMuted);

      // Pre-synthesize clean, low-latency audio sprites via Web Audio data URIs or direct oscillators
      this.initSynthesizerFallback();
    }
  }

  private initSynthesizerFallback() {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.webAudioCtx = new AudioCtx();
      }
    } catch {
      // Ignore
    }
  }

  private resumeCtx() {
    if (this.webAudioCtx && this.webAudioCtx.state === "suspended") {
      this.webAudioCtx.resume().catch(() => {});
    }
    if (Howler.ctx && Howler.ctx.state === "suspended") {
      Howler.ctx.resume().catch(() => {});
    }
  }

  /**
   * Set master volume level (0.0 to 1.0)
   */
  public setVolume(volume: number) {
    this.config.masterVolume = Math.min(1, Math.max(0, volume));
    Howler.volume(this.config.masterVolume);
    try {
      localStorage.setItem("apkshield_audio_vol", this.config.masterVolume.toString());
    } catch {}
  }

  public getVolume(): number {
    return this.config.masterVolume;
  }

  /**
   * Toggle or set mute state
   */
  public setMuted(muted: boolean) {
    this.config.isMuted = muted;
    Howler.mute(muted);
    try {
      localStorage.setItem("apkshield_audio_muted", muted.toString());
    } catch {}
  }

  public getMuted(): boolean {
    return this.config.isMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.config.isMuted);
    if (!this.config.isMuted) {
      this.playHover();
    }
    return this.config.isMuted;
  }

  /**
   * Trigger physical haptic vibration if supported on mobile devices
   */
  private triggerHardwareHaptics(pattern: number | number[] = 10) {
    if (this.config.hapticFeedbackEnabled && typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }
  }

  /**
   * Subtle, soft high-tech tactile hover tick (ultra-short, low-volume)
   */
  public playHover() {
    if (this.config.isMuted) return;
    try {
      this.resumeCtx();
      if (!this.webAudioCtx) return;

      const now = this.webAudioCtx.currentTime;
      const osc = this.webAudioCtx.createOscillator();
      const gain = this.webAudioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now); // Subtle high harmonic
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.035);

      const effectiveGain = 0.02 * this.config.masterVolume;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(effectiveGain, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

      osc.connect(gain);
      gain.connect(this.webAudioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Crisp, responsive cyber trigger click (dual harmonic pulse)
   */
  public playClick() {
    if (this.config.isMuted) return;
    this.triggerHardwareHaptics(12);

    try {
      this.resumeCtx();
      if (!this.webAudioCtx) return;

      const now = this.webAudioCtx.currentTime;
      const osc1 = this.webAudioCtx.createOscillator();
      const osc2 = this.webAudioCtx.createOscillator();
      const gain = this.webAudioCtx.createGain();

      osc1.type = "sine";
      osc2.type = "triangle";

      osc1.frequency.setValueAtTime(520, now);
      osc1.frequency.exponentialRampToValueAtTime(1040, now + 0.05);

      osc2.frequency.setValueAtTime(260, now);
      osc2.frequency.exponentialRampToValueAtTime(130, now + 0.06);

      const effectiveGain = 0.05 * this.config.masterVolume;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(effectiveGain, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.webAudioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.07);
      osc2.stop(now + 0.07);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Scanner engagement confirmation chirp
   */
  public playScanEngage() {
    if (this.config.isMuted) return;
    this.triggerHardwareHaptics(20);

    try {
      this.resumeCtx();
      if (!this.webAudioCtx) return;

      const now = this.webAudioCtx.currentTime;
      const osc = this.webAudioCtx.createOscillator();
      const gain = this.webAudioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.05);
      osc.frequency.linearRampToValueAtTime(1760, now + 0.1);

      const effectiveGain = 0.04 * this.config.masterVolume;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(effectiveGain, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.webAudioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Verified Secure chime
   */
  public playSuccess() {
    if (this.config.isMuted) return;
    this.triggerHardwareHaptics([10, 30, 15]);

    try {
      this.resumeCtx();
      if (!this.webAudioCtx) return;

      const now = this.webAudioCtx.currentTime;
      const effectiveGain = 0.03 * this.config.masterVolume;

      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = this.webAudioCtx!.createOscillator();
        const gain = this.webAudioCtx!.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.0001, now + idx * 0.04);
        gain.gain.linearRampToValueAtTime(effectiveGain, now + idx * 0.04 + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.14);

        osc.connect(gain);
        gain.connect(this.webAudioCtx!.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.15);
      });
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Load or play external audio file using Howler
   */
  public playHowl(soundKey: string, src: string | string[], options: Partial<HowlOptions> = {}) {
    if (this.config.isMuted) return;

    try {
      let sound = this.soundCache.get(soundKey);
      if (!sound) {
        sound = new Howl({
          src: Array.isArray(src) ? src : [src],
          volume: (options.volume !== undefined ? options.volume : 0.2) * this.config.masterVolume,
          ...options,
        });
        this.soundCache.set(soundKey, sound);
      }
      sound.play();
    } catch {
      // Fallback
    }
  }
}

export const cyberAudio = new CyberAudioManager();
