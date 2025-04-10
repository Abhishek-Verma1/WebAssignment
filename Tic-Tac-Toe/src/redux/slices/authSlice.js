import { createSlice } from '@reduxjs/toolkit';

//TODO: Need more optimziation 

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    authSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },

    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },

    clearError: (state) => {
      state.error = null;
    },

    updateUserSuccess: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    }
  },
});

export const {
  authRequest,
  authSuccess,
  authFailure,
  logoutSuccess,
  clearError,
  updateUserSuccess
} = authSlice.actions;

export default authSlice.reducer; 