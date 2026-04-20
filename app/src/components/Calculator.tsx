// Main Calculator Component
// Part of CalcFlow - Huncho.Dev

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Delete,
  History,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  FlaskConical,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { useCalculator } from '../hooks/useCalculator';
import { useSound } from '../hooks/useSound';
import CalculatorButton from './CalculatorButton';
import CalculatorDisplay from './CalculatorDisplay';
import HistoryPanel from './HistoryPanel';

interface CalculatorProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Calculator({ isDark, onToggleTheme }: CalculatorProps) {
  const {
    display,
    expression,
    isError,
    history,
    memory,
    isScientific,
    inputDigit,
    inputDecimal,
    inputOperator,
    performCalculation,
    clear,
    deleteLast,
    inputPercent,
    scientificFunction,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    memoryStore,
    clearHistory,
    setIsScientific,
  } = useCalculator();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(false);

  const { playClick, playOperator, playEquals, playClear, playError, playDelete } = useSound(soundEnabled);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (key >= '0' && key <= '9') {
        e.preventDefault();
        playClick();
        inputDigit(key);
      } else if (key === '.') {
        e.preventDefault();
        playClick();
        inputDecimal();
      } else if (key === '+' || key === '-') {
        e.preventDefault();
        playOperator();
        inputOperator(key);
      } else if (key === '*') {
        e.preventDefault();
        playOperator();
        inputOperator('*');
      } else if (key === '/') {
        e.preventDefault();
        playOperator();
        inputOperator('/');
      } else if (key === '%') {
        e.preventDefault();
        playOperator();
        inputPercent();
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        playEquals();
        performCalculation();
      } else if (key === 'Backspace') {
        e.preventDefault();
        playDelete();
        deleteLast();
      } else if (key === 'Escape') {
        e.preventDefault();
        playClear();
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDecimal, inputOperator, performCalculation, clear, deleteLast, inputPercent, playClick, playOperator, playEquals, playClear, playDelete]);

  const handleDigit = useCallback((digit: string) => {
    playClick();
    inputDigit(digit);
  }, [playClick, inputDigit]);

  const handleOperator = useCallback((op: string) => {
    playOperator();
    inputOperator(op);
  }, [playOperator, inputOperator]);

  const handleEquals = useCallback(() => {
    playEquals();
    performCalculation();
  }, [playEquals, performCalculation]);

  const handleClear = useCallback(() => {
    playClear();
    clear();
  }, [playClear, clear]);

  const handleDelete = useCallback(() => {
    playDelete();
    deleteLast();
  }, [playDelete, deleteLast]);

  const handleErrorAction = useCallback(() => {
    playError();
  }, [playError]);

  // Wrap functions to play error sound when in error state
  const safeAction = useCallback((action: () => void) => {
    return () => {
      if (isError) {
        handleErrorAction();
        clear();
      } else {
        action();
      }
    };
  }, [isError, handleErrorAction, clear]);

  const basicButtons = [
    { label: 'C', action: handleClear, variant: 'clear' as const, ariaLabel: 'Clear all' },
    { label: '(', action: safeAction(() => { playClick(); }), variant: 'operator' as const, ariaLabel: 'Open parenthesis', display: '(' },
    { label: ')', action: safeAction(() => { playClick(); }), variant: 'operator' as const, ariaLabel: 'Close parenthesis', display: ')' },
    { label: '÷', action: safeAction(() => handleOperator('/')), variant: 'operator' as const, ariaLabel: 'Divide', display: '÷' },
    { label: '7', action: safeAction(() => handleDigit('7')), variant: 'number' as const },
    { label: '8', action: safeAction(() => handleDigit('8')), variant: 'number' as const },
    { label: '9', action: safeAction(() => handleDigit('9')), variant: 'number' as const },
    { label: '×', action: safeAction(() => handleOperator('*')), variant: 'operator' as const, ariaLabel: 'Multiply', display: '×' },
    { label: '4', action: safeAction(() => handleDigit('4')), variant: 'number' as const },
    { label: '5', action: safeAction(() => handleDigit('5')), variant: 'number' as const },
    { label: '6', action: safeAction(() => handleDigit('6')), variant: 'number' as const },
    { label: '-', action: safeAction(() => handleOperator('-')), variant: 'operator' as const, ariaLabel: 'Subtract', display: '−' },
    { label: '1', action: safeAction(() => handleDigit('1')), variant: 'number' as const },
    { label: '2', action: safeAction(() => handleDigit('2')), variant: 'number' as const },
    { label: '3', action: safeAction(() => handleDigit('3')), variant: 'number' as const },
    { label: '+', action: safeAction(() => handleOperator('+')), variant: 'operator' as const, ariaLabel: 'Add', display: '+' },
    { label: '0', action: safeAction(() => handleDigit('0')), variant: 'number' as const, colSpan: 1 },
    { label: '.', action: safeAction(() => { playClick(); inputDecimal(); }), variant: 'number' as const, ariaLabel: 'Decimal point' },
    { label: 'DEL', action: safeAction(handleDelete), variant: 'operator' as const, ariaLabel: 'Delete last digit', icon: <Delete className="w-4 h-4" /> },
    { label: '=', action: safeAction(handleEquals), variant: 'equals' as const, ariaLabel: 'Calculate result' },
  ];

  const scientificButtons = [
    { label: 'sin', action: () => { playClick(); scientificFunction('sin'); } },
    { label: 'cos', action: () => { playClick(); scientificFunction('cos'); } },
    { label: 'tan', action: () => { playClick(); scientificFunction('tan'); } },
    { label: 'log', action: () => { playClick(); scientificFunction('log'); } },
    { label: 'ln', action: () => { playClick(); scientificFunction('ln'); } },
    { label: '√', action: () => { playClick(); scientificFunction('sqrt'); } },
    { label: 'x²', action: () => { playClick(); scientificFunction('x^2'); } },
    { label: 'x³', action: () => { playClick(); scientificFunction('x^3'); } },
    { label: '1/x', action: () => { playClick(); scientificFunction('1/x'); } },
    { label: 'x!', action: () => { playClick(); scientificFunction('n!'); } },
    { label: 'π', action: () => { playClick(); scientificFunction('pi'); } },
    { label: 'e', action: () => { playClick(); scientificFunction('e'); } },
  ];

  const memoryButtons = [
    { label: 'MC', action: () => { playClick(); memoryClear(); }, title: 'Memory Clear' },
    { label: 'MR', action: () => { playClick(); memoryRecall(); }, title: 'Memory Recall' },
    { label: 'M+', action: () => { playClick(); memoryAdd(); }, title: 'Memory Add' },
    { label: 'M-', action: () => { playClick(); memorySubtract(); }, title: 'Memory Subtract' },
    { label: 'MS', action: () => { playClick(); memoryStore(); }, title: 'Memory Store' },
  ];

  return (
    <>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          duration: 0.6,
        }}
        className="animate-float"
      >
        <div className="glass-surface rounded-[2.5rem] w-[380px] max-w-[92vw] overflow-hidden">
          {/* Notch */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-24 h-5 bg-black/40 rounded-full flex items-center justify-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-gray-600" />
              <div className="w-8 h-1.5 rounded-full bg-gray-700" />
            </div>
          </div>

          {/* Display */}
          <CalculatorDisplay display={display} expression={expression} isError={isError} />

          {/* Memory indicator */}
          <AnimatePresence>
            {memory !== 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-5 pb-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-xs font-medium">M = {memory}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="mx-5 h-px bg-white/10 mb-3" />

          {/* Memory buttons row */}
          <div className="px-4 mb-2">
            <div className="grid grid-cols-5 gap-1.5">
              {memoryButtons.map((btn, i) => (
                <motion.button
                  key={btn.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03, type: 'spring', stiffness: 400, damping: 20 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={btn.action}
                  title={btn.title}
                  className="py-1.5 px-1 rounded-lg text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/10 transition-colors tabular-nums"
                >
                  {btn.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Scientific mode toggle */}
          <div className="px-4 mb-2 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playClick();
                setIsScientific(!isScientific);
              }}
              className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs py-1 px-3 rounded-full hover:bg-white/10 transition-colors"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Scientific</span>
              {isScientific ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </motion.button>
          </div>

          {/* Scientific buttons (collapsible) */}
          <AnimatePresence>
            {isScientific && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-2">
                  <div className="grid grid-cols-4 gap-2">
                    {scientificButtons.map((btn, i) => (
                      <CalculatorButton
                        key={btn.label}
                        onClick={btn.action}
                        variant="operator"
                        delay={i * 0.02}
                        ariaLabel={`Scientific function ${btn.label}`}
                      >
                        <span className="text-sm">{btn.label}</span>
                      </CalculatorButton>
                    ))}
                  </div>
                </div>
                <div className="mx-5 h-px bg-white/10 mb-2" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main button grid */}
          <div className="px-4 pb-3">
            <div className="grid grid-cols-4 gap-2.5">
              {basicButtons.map((btn, i) => (
                <CalculatorButton
                  key={btn.label}
                  onClick={btn.action}
                  variant={btn.variant}
                  colSpan={btn.colSpan}
                  delay={i * 0.03}
                  ariaLabel={btn.ariaLabel || btn.label}
                >
                  {btn.icon || (btn.display || btn.label)}
                </CalculatorButton>
              ))}
            </div>
          </div>

          {/* Bottom toolbar */}
          <div className="px-4 pb-5 pt-1">
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => {
                  playClick();
                  setSoundEnabled(!soundEnabled);
                }}
                className={`p-2.5 rounded-full transition-colors ${
                  soundEnabled ? 'text-white/70 hover:text-white hover:bg-white/15' : 'text-white/30 hover:text-white/50 hover:bg-white/10'
                }`}
                title={soundEnabled ? 'Sound on' : 'Sound off'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => {
                  playClick();
                  setHistoryOpen(true);
                }}
                className="p-2.5 rounded-full text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors relative"
                title="History"
              >
                <History className="w-4 h-4" />
                {history.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-400 rounded-full text-[10px] font-bold text-white flex items-center justify-center">
                    {history.length > 9 ? '9+' : history.length}
                  </span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => {
                  playClick();
                  onToggleTheme();
                }}
                className="p-2.5 rounded-full text-white/40 hover:text-yellow-300 hover:bg-white/10 transition-colors"
                title={isDark ? 'Light mode' : 'Dark mode'}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* History Panel */}
      <HistoryPanel
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onClear={() => {
          playClear();
          clearHistory();
        }}
        onSelect={() => {
          playClick();
          setHistoryOpen(false);
        }}
      />
    </>
  );
}
