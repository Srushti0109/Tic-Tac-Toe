// src/utils/gameLogic.js

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export const checkWinner = (board) => {
  for (let combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: combination };
    }
  }
  return null;
};

export const checkDraw = (board) => {
  return board.every((cell) => cell !== null);
};

// Evaluate board for minimax
export const evaluate = (board, aiPlayer, humanPlayer) => {
  const winObj = checkWinner(board);
  if (winObj) {
    if (winObj.winner === aiPlayer) return 10;
    if (winObj.winner === humanPlayer) return -10;
  }
  return 0; // Draw or no winner yet
};
