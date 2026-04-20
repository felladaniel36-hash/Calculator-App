// CalcFlow Calculator App
// Built by Huncho.Dev - A modern, glass-morphism scientific calculator
// https://huncho.dev

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Calculator from './components/Calculator';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('calculator-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('calculator-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), []);

  return (
    <div
      className={`
        min-h-screen w-full
        flex items-center justify-center
        ${isDark ? 'dark-gradient-bg' : 'gradient-bg'}
        relative overflow-hidden
        p-4
      `}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 100, 0],
            y: [0, 60, -80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl"
        />
      </div>

      {/* Calculator */}
      <Calculator isDark={isDark} onToggleTheme={toggleTheme} />
    </div>
  );
}
