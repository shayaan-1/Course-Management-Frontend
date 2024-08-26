import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const AUTHOR_API_BASE_URL = import.meta.env.VITE_AUTHOR_API_BASE_URL;


export const fetchAuthors = createAsyncThunk(`${AUTHOR_API_BASE_URL}/fetchAuthors`, async () => {
  const response = await axios.get(`${AUTHOR_API_BASE_URL}`);
  return response.data;
});

export const addAuthor = createAsyncThunk(`${AUTHOR_API_BASE_URL}/addAuthor`, async (author) => {
  const response = await axios.post(`${AUTHOR_API_BASE_URL}`, author);
  return response.data;
});

const authorSlice = createSlice({
  name: 'authors',
  initialState: {
    authors: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addAuthor.fulfilled, (state, action) => {
        state.authors.push(action.payload);
      });
  },
});


export default authorSlice.reducer;
