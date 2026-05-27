import React from 'react';
import { motion } from 'framer-motion';
import Cell from './Cell';
import { useGame } from '../context/GameContext';

const Board = ({ board, onClick, winningLine, disabled }) => {
  const { winnerInfo } = useGame();
  
  const isWin = winnerInfo && winnerInfo.winner !== 'Draw';
  const isDraw = winnerInfo && winnerInfo.winner === 'Draw';

  const container = {
    hidden: { opacity: 0, scale: 0.9, rotateX: 10 },
    show: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" } }
  };

  // Shake effect on win or draw
  const shakeAnimation = {
    x: isWin || isDraw ? [0, -10, 10, -10, 10, 0] : 0,
    transition: { duration: 0.4 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative mx-auto w-max perspective-1000 z-10"
    >
      <motion.div 
        animate={shakeAnimation}
        className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 p-3 sm:p-5 md:p-6 glass-panel relative z-10"
      >
        {board.map((cell, index) => (
          <motion.div key={index} variants={item}>
            <Cell
              index={index}
              value={cell}
              onClick={() => onClick(index)}
              isWinningCell={winningLine?.includes(index)}
              disabled={disabled}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Board;
