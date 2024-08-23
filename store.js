import { configureStore } from '@reduxjs/toolkit';
import authReducer from './src/features/authSlice';
import courseReducer from './src/features/courseSlice';
import authorReducer from './src/features/authorSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    authors: authorReducer,
  },
});

export default store;
