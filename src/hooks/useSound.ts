// Sound Effects Hook
// Part of CalcFlow - Huncho.Dev

import { useCallback, useRef } from 'react';

export function useSound(enabled: boolean = true) {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!enabled) return;
    try {
      const ctx = getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch {
      // Audio context may be blocked, silently fail
    }
  }, [enabled, getContext]);

  const playClick = useCallback(() => {
    playTone(800, 0.06, 'sine');
  }, [playTone]);

  const playOperator = useCallback(() => {
    playTone(600, 0.08, 'triangle');
  }, [playTone]);

  const playEquals = useCallback(() => {
    playTone(1200, 0.12, 'sine');
    setTimeout(() => playTone(1600, 0.15, 'sine'), 80);
  }, [playTone]);

  const playClear = useCallback(() => {
    playTone(400, 0.1, 'sawtooth');
  }, [playTone]);

  const playError = useCallback(() => {
    playTone(200, 0.2, 'sawtooth');
    setTimeout(() => playTone(150, 0.2, 'sawtooth'), 100);
  }, [playTone]);

  const playDelete = useCallback(() => {
    playTone(500, 0.05, 'sine');
  }, [playTone]);

  return {
    playClick,
    playOperator,
    playEquals,
    playClear,
    playError,
    playDelete,
  };
}
