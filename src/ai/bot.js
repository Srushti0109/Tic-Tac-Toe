import { minimax } from './minimax';
import { checkWinner, checkDraw } from '../utils/gameLogic';

export const getBestMove = (board, aiPlayer, humanPlayer, difficulty) => {
  // If board is empty, take a random corner or center to save time and add variety
  const emptyCells = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
  
  if (emptyCells.length === 9) {
    const firstMoves = [0, 2, 4, 6, 8];
    return firstMoves[Math.floor(Math.random() * firstMoves.length)];
  }

  // Easy: Mostly random, but 20% chance to make best move
  if (difficulty === 'easy') {
    if (Math.random() > 0.2) {
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    }
  }

  // Medium: 60% chance to make the best move, otherwise random but block if in danger
  if (difficulty === 'medium') {
     if (Math.random() > 0.6) {
         // See if we can win or must block in 1 move
         let move = findWinningOrBlockingMove(board, aiPlayer, humanPlayer);
         if (move !== -1) return move;
         return emptyCells[Math.floor(Math.random() * emptyCells.length)];
     }
  }

  // Hard or the % chance for Easy/Medium fell through: Minimax Alpha-Beta
  let bestVal = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = aiPlayer;
      let moveVal = minimax(board, 0, false, aiPlayer, humanPlayer);
      board[i] = null;

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      } else if (moveVal === bestVal && Math.random() > 0.5) {
        // Randomize between equal value moves for variety
        bestMove = i;
      }
    }
  }

  return bestMove;
};

const findWinningOrBlockingMove = (board, aiPlayer, humanPlayer) => {
  // Check win
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = aiPlayer;
      if (checkWinner(board)?.winner === aiPlayer) {
        board[i] = null;
        return i;
      }
      board[i] = null;
    }
  }
  // Check block
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = humanPlayer;
      if (checkWinner(board)?.winner === humanPlayer) {
        board[i] = null;
        return i;
      }
      board[i] = null;
    }
  }
  return -1;
};
