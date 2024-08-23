import { configureStore } from '@reduxjs/toolkit';
import authReducer from './src/features/authSlice';
import courseReducer from './src/features/courseSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer, // Add the course reducer
  },
});

export default store;
