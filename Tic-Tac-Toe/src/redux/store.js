import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer, { logoutSuccess } from './slices/authSlice';
import gameReducer from './slices/gameSlice';

const appReducer = combineReducers({
  auth: authReducer,
  game: gameReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logoutSuccess.type) {
    const { auth } = state;
    state = { auth };
  }

  return appReducer(state, action);
};

//TODO: Need more optimziation 

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  blacklist: ['game'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store); 