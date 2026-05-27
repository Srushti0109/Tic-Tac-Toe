import React, { useEffect, useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useGame } from '../context/GameContext';
import { useTheme } from '../context/ThemeContext';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { checkWinner, checkDraw } from '../utils/gameLogic';
import { getBestMove } from '../ai/bot';
import Board from '../components/Board';
import Scoreboard from '../components/Scoreboard';
import GameControls from '../components/GameControls';
import Dashboard from '../components/Dashboard';
import AIModal from '../components/AIModal';
import { BrainCircuit } from 'lucide-react';

const GameScreen = () => {
  const { 
    board, setBoard, 
    isXNext, setIsXNext, 
    gameMode, difficulty,
    winnerInfo, setWinnerInfo,
    history, setHistory,
    currentMove, setCurrentMove,
    isThinking, setIsThinking,
    stats, setStats
  } = useGame();
  
  const { soundEnabled } = useTheme();
  const { playClick, playWin, playDraw } = useSoundEffects(soundEnabled);
  
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Track if we just mounted to avoid firing effects immediately if state is persisted
  const isInitialMount = useRef(true);

  const executeMove = useCallback((index, player) => {
    playClick();
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    
    const newHistory = history.slice(0, currentMove + 1);
    newHistory.push(newBoard);
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
    
    setIsXNext(!isXNext);
  }, [board, history, currentMove, isXNext, playClick, setBoard, setHistory, setCurrentMove, setIsXNext]);

  // Handle cell click
  const handleMove = useCallback((index) => {
    if (board[index] || winnerInfo || isThinking) return;

    // It's 1p mode and it's AI's turn? Ignore clicks.
    if (gameMode === '1p' && !isXNext) return;

    executeMove(index, isXNext ? 'X' : 'O');
  }, [board, winnerInfo, isThinking, gameMode, isXNext, executeMove]);

  // Check for winner or draw after every board change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Skip win check logic if undo brings us to a past state without a winner, 
    // but we still need to check if that past state actually *has* a winner.
    const winObj = checkWinner(board);
    
    if (winObj && !winnerInfo) {
      setWinnerInfo(winObj);
      playWin();
      fireConfetti();
      updateStats(winObj.winner);
    } else if (checkDraw(board) && !winnerInfo && !winObj) {
      setWinnerInfo({ winner: 'Draw' });
      playDraw();
      updateStats('Draw');
    } else if (!winObj && !checkDraw(board)) {
       // No winner, if 1p mode and it's AI's turn
       if (gameMode === '1p' && !isXNext && !winnerInfo) {
         makeAIMove();
       }
    }
  }, [board, isXNext]); // removed winnerInfo from deps to avoid double counting

  const makeAIMove = () => {
    setIsThinking(true);
    // Simulate thinking delay
    setTimeout(() => {
       const aiMove = getBestMove(board, 'O', 'X', difficulty);
       if (aiMove !== -1) {
         executeMove(aiMove, 'O');
       }
       setIsThinking(false);
    }, 600 + Math.random() * 400); // 600-1000ms delay
  };

  const updateStats = (result) => {
     setStats(prev => {
       const newStats = { ...prev, gamesPlayed: prev.gamesPlayed + 1 };
       if (result === 'X') {
           newStats.playerXWins += 1;
       } else if (result === 'O') {
           newStats.playerOWins += 1;
           if (gameMode === '1p') newStats.aiWins += 1;
       } else if (result === 'Draw') {
           newStats.draws += 1;
       }
       return newStats;
     });
  };

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#ef4444', '#10b981'],
        zIndex: 100
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#ef4444', '#10b981'],
        zIndex: 100
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-start w-full max-w-4xl mx-auto px-2 sm:px-4 z-10 pt-24 sm:pt-28 pb-10 h-full overflow-y-auto custom-scrollbar"
    >
      <Scoreboard />
      
      <div className="relative">
        <Board 
          board={board} 
          onClick={handleMove} 
          winningLine={winnerInfo?.line} 
          disabled={!!winnerInfo || isThinking}
        />
        
        <AnimatePresence>
          {winnerInfo && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: '-50%', x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
              exit={{ opacity: 0, scale: 0.8, y: '-50%', x: '-50%' }}
              className="absolute top-1/2 left-1/2 bg-board/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 text-center z-20 min-w-[220px] sm:min-w-[300px]"
            >
              <h2 className="text-3xl sm:text-5xl font-black mb-3 text-glow-primary bg-clip-text text-transparent bg-gradient-to-br from-primary to-accent">
                {winnerInfo.winner === 'Draw' ? 'DRAW!' : `${winnerInfo.winner} WINS!`}
              </h2>
              <p className="text-text/70 text-sm font-medium">
                {winnerInfo.winner === 'X' ? 'Player 1 takes the crown.' : winnerInfo.winner === 'O' ? (gameMode === '1p' ? 'AI dominates again.' : 'Player 2 takes the crown.') : 'A battle of equals.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <GameControls />
      <Dashboard />
      
      {/* AI Explanation Toggle */}
      {gameMode === '1p' && (
        <div className="mt-8">
          <button 
            onClick={() => setIsAIModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-btn text-xs sm:text-sm font-bold text-text/70 hover:text-text transition-colors"
          >
            <BrainCircuit size={16} className="text-primary" /> How does the AI work?
          </button>
        </div>
      )}

      <AIModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </motion.div>
  );
};

export default GameScreen;
