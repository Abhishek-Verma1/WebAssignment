import api from './apiConfig';

//TODO: Code cleaning required

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      throw { message: errorMessage };
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Registration failed';
      throw { message: errorMessage };
    }
  },

  logout: () => {
    return Promise.resolve();
  },
};

export default AuthService; 