import api from './apiConfig';

const SystemService = {
  computerMove: async (board, sessionId) => {
    try {
      const response = await api.post('/game/pc_move', {
        board,
        sessionId,
      });
//TODO: Code cleaning required
      const data = response.data;
      return {
        ...data,
        board: typeof data.board === 'string' ? JSON.parse(data.board) : data.board,
        status: data.status || 'ongoing',
      };
    } catch (error) {
      console.error('SystemService  API error failure case:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
      throw error.response?.data || { error: 'Failed to make Computer move' };
    }
  }
};

export default SystemService; 