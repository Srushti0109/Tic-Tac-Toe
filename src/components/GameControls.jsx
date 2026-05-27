import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Undo2, LogOut } from 'lucide-react';
import { useGame } from '../context/GameContext';

const GameControls = () => {
  const { resetGame, undoMove, quitGame, currentMove, isThinking, winnerInfo } = useGame();

  const isGameEnd = !!winnerInfo;

  return (
    <div className="flex gap-2 sm:gap-4 justify-center mt-6 sm:mt-8">
      <ControlButton 
        icon={<Undo2 size={18} />} 
        label="Undo" 
        onClick={undoMove} 
        disabled={currentMove === 0 || isThinking || isGameEnd} 
      />
      <ControlButton 
        icon={<RotateCcw size={18} />} 
        label="Restart" 
        onClick={resetGame} 
      />
      <ControlButton 
        icon={<LogOut size={18} />} 
        label="Quit" 
        onClick={quitGame} 
        danger 
      />
    </div>
  );
};

const ControlButton = ({ icon, label, onClick, disabled, danger }) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
    whileTap={!disabled ? { scale: 0.95 } : {}}
    onClick={onClick}
    disabled={disabled}
    className={`
      flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium
      transition-all duration-200 backdrop-blur-md border border-white/10
      ${disabled ? 'opacity-50 cursor-not-allowed bg-board' : 'cursor-pointer shadow-sm hover:shadow-md'}
      ${danger && !disabled ? 'hover:bg-red-500/20 text-red-400 hover:text-red-300 hover:border-red-500/30' : ''}
      ${!danger && !disabled ? 'bg-cell hover:bg-cell-hover hover:border-white/20 text-text' : ''}
    `}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </motion.button>
);

export default GameControls;
