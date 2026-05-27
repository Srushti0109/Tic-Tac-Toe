import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import clsx from 'clsx';
import { useGame } from '../context/GameContext';

const Cell = ({ value, onClick, isWinningCell, disabled, index }) => {
  const { theme } = useTheme();
  const { isXNext, gameMode, winnerInfo, isThinking } = useGame();
  
  // Calculate anticipation effect - if it's player's turn and they hover
  const canPlay = !disabled && !value && !winnerInfo && !isThinking && !(gameMode === '1p' && !isXNext);

  return (
    <motion.button
      whileHover={canPlay ? { scale: 1.05 } : {}}
      whileTap={canPlay ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled || value !== null}
      className={clsx(
        'glass-btn relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center overflow-hidden',
        canPlay ? 'cursor-pointer group' : 'cursor-default',
        isWinningCell && 'shadow-[0_0_20px_var(--primary)] border-primary z-10'
      )}
    >
      <AnimatePresence>
        {isWinningCell && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      
      {/* SVG drawing for X and O */}
      {value === 'X' && (
        <motion.svg 
          viewBox="0 0 100 100" 
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 absolute z-10 text-glow-primary"
          style={{ stroke: 'var(--primary)' }}
        >
          <motion.path
            d="M 20 20 L 80 80"
            fill="transparent"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
          <motion.path
            d="M 80 20 L 20 80"
            fill="transparent"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.15 }}
          />
        </motion.svg>
      )}
      
      {value === 'O' && (
        <motion.svg 
          viewBox="0 0 100 100" 
          className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 absolute z-10 text-glow-secondary"
          style={{ stroke: 'var(--secondary)' }}
        >
          <motion.path
            d="M 50 10 A 40 40 0 1 1 49.9 10"
            fill="transparent"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </motion.svg>
      )}

      {/* Hover Anticipation Symbol */}
      <AnimatePresence>
        {canPlay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileHover={{ opacity: 0.2, scale: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none text-text text-4xl sm:text-6xl font-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          >
            {isXNext ? 'X' : 'O'}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default Cell;
