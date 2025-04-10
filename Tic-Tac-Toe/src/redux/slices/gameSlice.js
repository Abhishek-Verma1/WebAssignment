import { createSlice } from '@reduxjs/toolkit';

//TODO: Need more optimziation 

const createEmptyBoard = () => {
  return [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
};

const initialState = {
  sessionId: null,
  board: createEmptyBoard(),
  gameStatus: 'idle',
  startWithPlayer: true,
  playerTurn: true,
  loading: false,
  error: null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    gameRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    gameFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setGameData: (state, action) => {
      state.loading = false;
      state.sessionId = action.payload.id;

      if (typeof action.payload.board === 'string') {
        try {
          state.board = JSON.parse(action.payload.board);
        } catch (e) {
          state.board = createEmptyBoard();
          console.error('Error in parsing board data :', e);
        }
      } else if (Array.isArray(action.payload.board)) {
        state.board = action.payload.board;
      } else {
        state.board = createEmptyBoard();
      }

      state.gameStatus = action.payload.status || 'ongoing';
      state.startWithPlayer = action.payload.startWithPlayer;

      if (action.payload.currentPlayer) {
        state.playerTurn = action.payload.currentPlayer === 'x';
      } else {
        state.playerTurn = action.payload.startWithPlayer;
      }
    },

    updateBoard: (state, action) => {
      state.loading = false;

      if (typeof action.payload.board === 'string') {
        try {
          state.board = JSON.parse(action.payload.board);
        } catch (e) {
          console.error('Error in parsing board data :', e);
        }
      } else if (Array.isArray(action.payload.board)) {
        state.board = action.payload.board;
      }

      state.gameStatus = action.payload.status || 'ongoing';
      state.playerTurn = action.payload.isPlayerTurn;
    },

    setPlayerMove: (state, action) => {
      const { row, col } = action.payload;
      if (state.board[row] && typeof state.board[row][col] !== 'undefined') {
        state.board = state.board.map(rowArr => [...rowArr]);
        state.board[row][col] = -1;
      }
      state.playerTurn = false;
    },

    resetGame: (state) => {
      state.sessionId = null;
      state.board = createEmptyBoard();
      state.gameStatus = 'idle';
      state.playerTurn = true;
      state.error = null;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  gameRequest,
  gameFailure,
  setGameData,
  updateBoard,
  setPlayerMove,
  resetGame,
  clearError
} = gameSlice.actions;

export default gameSlice.reducer; 