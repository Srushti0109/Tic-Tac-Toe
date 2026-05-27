import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { User, Cpu } from 'lucide-react';
import clsx from 'clsx';

const Scoreboard = () => {
  const { isXNext, gameMode, isThinking, winnerInfo } = useGame();

  const isGameEnd = !!winnerInfo;
  
  return (
    <div className="flex justify-between items-center w-full max-w-md mx-auto mb-8 px-2 sm:px-4">
      <PlayerCard 
        player="X" 
        icon={<User size={20} className="sm:w-6 sm:h-6" />}
        name={gameMode === '1p' ? 'Player' : 'Player 1'}
        isActive={isXNext && !isGameEnd} 
        color="text-primary"
        borderColor="border-primary"
      />

      <div className="flex flex-col items-center justify-center mx-2 sm:mx-4">
        <div className="text-xs sm:text-sm uppercase tracking-widest text-text/50 font-bold mb-1">vs</div>
        <div className="h-8 flex items-center justify-center w-24">
            <AnimatePresence mode="wait">
                {isThinking && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-[10px] sm:text-xs font-mono text-text/70 bg-board px-2 py-1 rounded-full animate-pulse border border-white/5 whitespace-nowrap"
                  >
                    AI thinking...
                  </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      <PlayerCard 
        player="O" 
        icon={gameMode === '1p' ? <Cpu size={20} className="sm:w-6 sm:h-6" /> : <User size={20} className="sm:w-6 sm:h-6" />}
        name={gameMode === '1p' ? 'AI' : 'Player 2'}
        isActive={!isXNext && !isGameEnd} 
        color="text-secondary"
        borderColor="border-secondary"
      />
    </div>
  );
};

const PlayerCard = ({ player, icon, name, isActive, color, borderColor }) => (
  <motion.div 
    animate={{ 
      scale: isActive ? 1.05 : 1,
      opacity: isActive ? 1 : 0.5
    }}
    className={clsx(
      'glass-panel p-2 sm:p-4 flex flex-col items-center min-w-[90px] sm:min-w-[120px] transition-all duration-300 border-2 border-transparent',
      isActive && `shadow-glow ${borderColor}`
    )}
  >
    <div className={clsx('mb-1 sm:mb-2', color)}>{icon}</div>
    <div className="font-bold text-xs sm:text-sm text-center">{name}</div>
    <div className={clsx('text-lg sm:text-2xl font-black mt-1', color)}>
      {player}
    </div>
  </motion.div>
);

export default Scoreboard;
