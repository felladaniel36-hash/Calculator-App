// Display Component - Shows current value and expression
// Part of CalcFlow - Huncho.Dev

import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalculatorDisplayProps {
  display: string;
  expression: string;
  isError: boolean;
}

function CalculatorDisplay({ display, expression, isError }: CalculatorDisplayProps) {
  const displayFontSize = display.length > 12
    ? 'text-3xl'
    : display.length > 9
    ? 'text-4xl'
    : display.length > 6
    ? 'text-5xl'
    : 'text-6xl';

  return (
    <div className="px-5 pt-8 pb-4 min-h-[140px] flex flex-col justify-end">
      {/* Expression line */}
      <AnimatePresence mode="wait">
        <motion.div
          key={expression}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="text-right text-white/60 text-sm font-medium mb-1 h-5 truncate tabular-nums"
        >
          {expression || '\u00A0'}
        </motion.div>
      </AnimatePresence>

      {/* Main display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={display + (isError ? '-error' : '')}
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{ opacity: 0, y: -12 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
          }}
          className={`
            text-right font-semibold tabular-nums display-glow
            ${displayFontSize}
            ${isError ? 'text-red-300' : 'text-white'}
            ${isError ? 'animate-shake' : ''}
          `}
          style={{
            wordBreak: 'break-all',
            lineHeight: 1.1,
          }}
        >
          {display}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default memo(CalculatorDisplay);
