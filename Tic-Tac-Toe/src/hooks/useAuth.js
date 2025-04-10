import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../api/authService';
import { authFailure, authRequest, authSuccess, clearError, logoutSuccess } from '../redux/slices/authSlice';
import { resetGame as resetGameAction } from '../redux/slices/gameSlice';

//TODO: Code optimization required
const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = useCallback(async (email, password) => {
    try {
      dispatch(authRequest());
      const data = await AuthService.login(email, password);
      if (data.user && data.token) {
        dispatch(authSuccess({
          user: data.user,
          token: data.token
        }));
      }
      return data;
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      dispatch(authFailure(errorMessage));
      return { error: errorMessage };
    }
  }, [dispatch]);

  const register = useCallback(async (name, email, password) => {
    try {
      dispatch(authRequest());
      const data = await AuthService.register(name, email, password);
      if (data.user && data.token) {
        dispatch(authSuccess({
          user: data.user,
          token: data.token
        }));
      }
      return data;
    } catch (error) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      dispatch(authFailure(errorMessage));
      return { error: errorMessage };
    }
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(resetGameAction());
    AuthService.logout();
    dispatch(logoutSuccess());
  }, [dispatch]);

  const resetAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    resetAuthError
  };
};

export default useAuth; 