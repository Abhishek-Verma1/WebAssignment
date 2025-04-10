import api from './apiConfig';

//TODO: Can also optimzie in a better way
const GameService = {
  createGameSession: async (startWithPlayer) => {
    try {
      const response = await api.post('/game/create_game_session', {
        startWithPlayer,
      });
      const data = response.data;
      return {
        ...data,
        sessionId: data.id,
        board: typeof data.board === 'string' ? JSON.parse(data.board) : data.board,
        status: data.status || 'ongoing',
        playerTurn: data.currentPlayer === 'x',
      };
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create game session' };
    }
  },

  getGameSession: async (sessionId) => {
    try {
      const response = await api.get(`/game?sessionId=${sessionId}`);
      const data = response.data;
      return {
        ...data,
        board: typeof data.board === 'string' ? JSON.parse(data.board) : data.board,
        status: data.status || 'ongoing',
        playerTurn: data.currentPlayer === 'x',
      };
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get game session' };
    }
  },

  checkBoard: async (board) => {
    try {
      const response = await api.post('/game/check_board', { board });
      return {
        ...response.data,
        status: response.data.status || response.data.gameStatus || 'ongoing',
      };
    } catch (error) {
      throw error.response?.data || { error: 'Failed to check board status' };
    }
  },
};

export default GameService; 