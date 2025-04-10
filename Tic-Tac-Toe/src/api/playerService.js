import api from './apiConfig';

const PlayerService = {

  //TODO: Code cleaning required

  playerMove: async (board, sessionId) => {
    try {
      const response = await api.post('/game/player_move', {
        board,
        sessionId,
      });
      const data = response.data;
      const result = {
        ...data,
        sessionId: data.id || sessionId,
        board: board,
        status: data.status || 'ongoing',
      };
      return result;
    } catch (error) {
      console.error('player_move API error failing:', error);
      if (error.response) {
        console.error('error response:', error.response.data);
      }
      throw error.response?.data || { error: 'Failed to make player move:' };
    }
  }
};

export default PlayerService; 