// History Panel Sidebar
// Part of CalcFlow - Huncho.Dev

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Clock } from 'lucide-react';
import type { HistoryEntry } from '../hooks/useCalculator';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryEntry[];
  onClear: () => void;
  onSelect: (expression: string, result: string) => void;
}

export default function HistoryPanel({ isOpen, onClose, history, onClear, onSelect }: HistoryPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.5 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="fixed right-0 top-0 bottom-0 w-80 max-w-[85vw] glass-surface z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white/70" />
                <h2 className="text-white font-semibold text-lg">History</h2>
              </div>
              <div className="flex items-center gap-1">
                {history.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClear}
                    className="p-2 rounded-xl hover:bg-white/10 text-white/60 hover:text-red-300 transition-colors"
                    aria-label="Clear history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                  aria-label="Close history"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto history-scroll px-3 py-2">
              <AnimatePresence mode="popLayout">
                {history.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full text-white/40"
                  >
                    <Clock className="w-12 h-12 mb-3 opacity-30" />
                    <p className="text-sm">No calculations yet</p>
                  </motion.div>
                ) : (
                  history.map((entry, index) => (
                    <motion.button
                      key={entry.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                        delay: index * 0.02,
                      }}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.12)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelect(entry.expression, entry.result)}
                      className="w-full text-right p-3 rounded-xl mb-1 hover:bg-white/5 transition-colors"
                    >
                      <div className="text-white/50 text-xs truncate">
                        {entry.expression}
                      </div>
                      <div className="text-white font-semibold text-lg tabular-nums mt-0.5">
                        {entry.result}
                      </div>
                    </motion.button>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer count */}
            {history.length > 0 && (
              <div className="px-5 py-3 border-t border-white/10 text-white/40 text-xs text-center">
                {history.length} calculation{history.length !== 1 ? 's' : ''}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
