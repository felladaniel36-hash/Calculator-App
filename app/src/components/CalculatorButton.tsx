// Calculator Button Component
// Part of CalcFlow - Huncho.Dev

import { memo } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CalculatorButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'number' | 'operator' | 'equals' | 'clear';
  disabled?: boolean;
  colSpan?: number;
  delay?: number;
  ariaLabel?: string;
}

const getButtonStyles = (variant: string) => {
  switch (variant) {
    case 'equals':
      return 'glass-button-accent text-white';
    case 'clear':
      return 'bg-red-500/20 text-red-300 border border-red-400/30';
    case 'operator':
      return 'glass-button-dark text-white/90';
    case 'number':
    default:
      return 'glass-button text-gray-700';
  }
};

function CalculatorButton({
  children,
  onClick,
  variant = 'number',
  disabled = false,
  colSpan = 1,
  delay = 0,
  ariaLabel,
}: CalculatorButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay }}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.92 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        h-14 rounded-2xl font-semibold text-lg
        flex items-center justify-center
        transition-colors duration-100
        ${getButtonStyles(variant)}
        ${colSpan === 2 ? 'col-span-2' : colSpan === 3 ? 'col-span-3' : ''}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
    </motion.button>
  );
}

export default memo(CalculatorButton);
