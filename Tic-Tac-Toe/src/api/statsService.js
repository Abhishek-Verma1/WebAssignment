import api from './apiConfig';

//TODO: Can also manage in a better way
const StatsService = {

  getUserStats: async () => {
    try {
      const response = await api.get('/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to get user stats' };
    }
  },

  recordGameResult: async (result) => {
    try {
      const response = await api.get('/stats', { result });
      return response.data;
    } catch (error) {
      console.error('Failed to record getUserStats data:', error);
      throw error.response?.data || { error: 'Failed to record getUserStats data:' };
    }
  }
};

export default StatsService; 