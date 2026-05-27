import { checkWinner, checkDraw, evaluate } from '../utils/gameLogic';

export const minimax = (board, depth, isMaximizing, aiPlayer, humanPlayer, alpha = -Infinity, beta = Infinity) => {
  const score = evaluate(board, aiPlayer, humanPlayer);

  // If Maximizer (AI) has won the game
  if (score === 10) return score - depth;

  // If Minimizer (Human) has won the game
  if (score === -10) return score + depth;

  // If it's a draw
  if (checkDraw(board)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = aiPlayer;
        best = Math.max(best, minimax(board, depth + 1, false, aiPlayer, humanPlayer, alpha, beta));
        board[i] = null;
        alpha = Math.max(alpha, best);
        if (beta <= alpha) break; // Alpha-Beta Pruning
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = humanPlayer;
        best = Math.min(best, minimax(board, depth + 1, true, aiPlayer, humanPlayer, alpha, beta));
        board[i] = null;
        beta = Math.min(beta, best);
        if (beta <= alpha) break; // Alpha-Beta Pruning
      }
    }
    return best;
  }
};
