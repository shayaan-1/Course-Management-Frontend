import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: 'idle',
  error: null,
  role: null,
};

const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL;

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post(`${AUTH_API_BASE_URL}/login`, credentials);
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (userDetails) => {
  const response = await axios.post(`${AUTH_API_BASE_URL}/register`, userDetails);
  return response.data;
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (email) => {
  const response = await axios.post(`${AUTH_API_BASE_URL}/forgot-password`, { email });
  return response.data;
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async ({ token, newPassword }) => {
  try {
    const response = await axios.post(`${AUTH_API_BASE_URL}/reset-password/${token}`, {newPassword });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Server error');
  }
});

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = 'idle';
      state.loggedInUser = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user , role } = action.payload.data;
        state.status = 'succeeded';
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.role = role;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        const { accessToken, refreshToken, user } = action.payload.data;
        state.status = 'succeeded';
        state.user = user;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
