import { configureStore } from '@reduxjs/toolkit';
import authReducer from './src/features/authSlice';
import authorReducer from './src/features/authorSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    authors: authorReducer,
  },
});

export default store;
