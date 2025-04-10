export const createEmptyBoard = () => {
  return Array(3).fill().map(() => Array(3).fill(0));
};

export const isValidMove = (board, row, col) => {
  return row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === 0;
};
