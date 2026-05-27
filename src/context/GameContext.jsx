import React, { createContext, useContext, useState } from 'react';
import { useGameStorage } from '../hooks/useGameStorage';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // Game Setup State
  const [gameMode, setGameMode] = useState(null); // '1p' or '2p'
  const [difficulty, setDifficulty] = useState('medium'); // 'easy', 'medium', 'hard'

  // Game Play State
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState(null); // { winner: 'X'|'O'|'Draw', line: [] }
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isThinking, setIsThinking] = useState(false);

  // Statistics
  const [stats, setStats] = useGameStorage('tic-tac-toe-stats', {
    playerXWins: 0,
    playerOWins: 0,
    draws: 0,
    aiWins: 0,
    gamesPlayed: 0
  });

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinnerInfo(null);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setIsThinking(false);
  };

  const undoMove = () => {
    if (currentMove > 0 && !isThinking) {
      let moveToGo = currentMove - 1;
      // In 1p mode, undo 2 steps if possible to go back to human turn
      if (gameMode === '1p' && moveToGo > 0) {
          moveToGo -= 1;
      }
      setCurrentMove(moveToGo);
      setBoard([...history[moveToGo]]);
      setIsXNext(moveToGo % 2 === 0);
      setWinnerInfo(null);
      setHistory(prev => prev.slice(0, moveToGo + 1));
    }
  };

  const quitGame = () => {
    setGameMode(null);
    resetGame();
  };

  return (
    <GameContext.Provider value={{
      gameMode, setGameMode,
      difficulty, setDifficulty,
      board, setBoard,
      isXNext, setIsXNext,
      winnerInfo, setWinnerInfo,
      history, setHistory,
      currentMove, setCurrentMove,
      isThinking, setIsThinking,
      stats, setStats,
      resetGame,
      undoMove,
      quitGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
